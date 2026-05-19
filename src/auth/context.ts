import { createContext } from 'react'
import type { AuthUser } from '@/types/auth'

export interface AuthContextValue {
  user: AuthUser | null
  accessToken: string | null
  initializing: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name?: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (patch: {
    name?: string
    avatarUrl?: string
    language?: string
    theme?: string
  }) => Promise<void>
  hasRole: (role: string) => boolean
}

export const AuthContext = createContext<AuthContextValue | null>(null)
