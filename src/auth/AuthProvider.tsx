import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  getProfileApi,
  loginApi,
  logoutApi,
  refreshApi,
  registerApi,
  updateProfileApi,
} from './authApi'
import { AuthContext } from './context'
import {
  clearStoredSession,
  readStoredSession,
  writeStoredSession,
  type StoredSession,
} from './storage'
import type { AuthTokensPayload, AuthUser } from '@/types/auth'

function mergeUser(prev: AuthUser | null, next: AuthUser): AuthUser {
  return {
    language: prev?.language ?? next.language ?? 'zh-CN',
    theme: prev?.theme ?? next.theme ?? 'dark',
    ...prev,
    ...next,
    id: next.id,
    email: next.email,
    role: next.role,
  }
}

function payloadToSession(data: AuthTokensPayload): StoredSession {
  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    user: data.user,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [initializing, setInitializing] = useState(true)

  const applySession = useCallback((session: StoredSession | null) => {
    if (!session) {
      setUser(null)
      setAccessToken(null)
      setRefreshToken(null)
      clearStoredSession()
      return
    }
    setUser(session.user)
    setAccessToken(session.accessToken)
    setRefreshToken(session.refreshToken)
    writeStoredSession(session)
  }, [])

  const applyPayload = useCallback(
    (data: AuthTokensPayload) => {
      applySession(payloadToSession(data))
    },
    [applySession]
  )

  useEffect(() => {
    let cancelled = false

    async function bootstrap() {
      const stored = readStoredSession()
      if (!stored) {
        if (!cancelled) setInitializing(false)
        return
      }

      try {
        const profile = await getProfileApi(stored.accessToken)
        if (cancelled) return
        const mergedUser = mergeUser(stored.user, profile)
        const next: StoredSession = {
          ...stored,
          user: mergedUser,
        }
        applySession(next)
      } catch {
        try {
          const data = await refreshApi(stored.refreshToken)
          if (cancelled) return
          applyPayload(data)
        } catch {
          if (!cancelled) {
            clearStoredSession()
            setUser(null)
            setAccessToken(null)
            setRefreshToken(null)
          }
        }
      } finally {
        if (!cancelled) setInitializing(false)
      }
    }

    void bootstrap()
    return () => {
      cancelled = true
    }
  }, [applyPayload, applySession])

  const login = useCallback(
    async (email: string, password: string) => {
      const data = await loginApi({ email, password })
      applyPayload(data)
    },
    [applyPayload]
  )

  const register = useCallback(
    async (email: string, password: string, name?: string) => {
      const data = await registerApi({ email, password, name })
      applyPayload(data)
    },
    [applyPayload]
  )

  const logout = useCallback(async () => {
    const rt = refreshToken ?? readStoredSession()?.refreshToken
    if (rt) {
      try {
        await logoutApi(rt)
      } catch {
        // 仍清除本地会话
      }
    }
    applySession(null)
  }, [applySession, refreshToken])

  const updateProfile = useCallback(
    async (patch: {
      name?: string
      avatarUrl?: string
      language?: string
      theme?: string
    }) => {
      const token = accessToken ?? readStoredSession()?.accessToken
      if (!token) {
        throw new Error('未登录')
      }
      const updated = await updateProfileApi(token, patch)
      setUser(prev => mergeUser(prev, updated))
      const stored = readStoredSession()
      if (stored) {
        writeStoredSession({
          ...stored,
          user: mergeUser(stored.user, updated),
        })
      }
    },
    [accessToken]
  )

  const hasRole = useCallback(
    (role: string) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return user.role === role
    },
    [user]
  )

  const value = useMemo(
    () => ({
      user,
      accessToken,
      initializing,
      login,
      register,
      logout,
      updateProfile,
      hasRole,
    }),
    [
      user,
      accessToken,
      initializing,
      login,
      register,
      logout,
      updateProfile,
      hasRole,
    ]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
