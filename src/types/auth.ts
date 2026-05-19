/** 与 konghou-player-backend `src/types/auth.types.ts` 对齐 */

export interface AuthUser {
  id: string
  email: string
  name?: string
  avatarUrl?: string
  language?: string
  theme?: string
  role: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name?: string
}

export interface AuthTokensPayload {
  user: AuthUser
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface ApiSuccessBody<T> {
  code: number
  message: string
  data: T
}

export interface ApiErrorBody {
  code: number
  message: string
}

export class AuthApiError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string
  ) {
    super(message)
    this.name = 'AuthApiError'
  }
}
