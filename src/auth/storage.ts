import type { AuthUser } from '@/types/auth'

const STORAGE_KEY = 'kong-player-auth-v1'

export interface StoredSession {
  accessToken: string
  refreshToken: string
  user: AuthUser
}

export function readStoredSession(): StoredSession | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredSession
    if (
      typeof parsed?.accessToken === 'string' &&
      typeof parsed?.refreshToken === 'string' &&
      parsed?.user &&
      typeof parsed.user.id === 'string'
    ) {
      return parsed
    }
    return null
  } catch {
    return null
  }
}

export function writeStoredSession(session: StoredSession): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export function clearStoredSession(): void {
  localStorage.removeItem(STORAGE_KEY)
}
