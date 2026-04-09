import { requestJson } from '@/api/http'
import type {
  AuthTokensPayload,
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from '@/types/auth'

export async function loginApi(body: LoginRequest): Promise<AuthTokensPayload> {
  return requestJson<AuthTokensPayload>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function registerApi(
  body: RegisterRequest
): Promise<AuthTokensPayload> {
  return requestJson<AuthTokensPayload>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function refreshApi(
  refreshToken: string
): Promise<AuthTokensPayload> {
  return requestJson<AuthTokensPayload>('/api/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  })
}

export async function logoutApi(refreshToken: string): Promise<void> {
  await requestJson<null>('/api/auth/logout', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  })
}

export async function getProfileApi(accessToken: string): Promise<AuthUser> {
  return requestJson<AuthUser>('/api/auth/profile', {
    method: 'GET',
    accessToken,
  })
}

export async function updateProfileApi(
  accessToken: string,
  patch: {
    name?: string
    avatarUrl?: string
    language?: string
    theme?: string
  }
): Promise<AuthUser> {
  return requestJson<AuthUser>('/api/auth/profile', {
    method: 'PUT',
    accessToken,
    body: JSON.stringify(patch),
  })
}
