import { getApiBaseUrl } from '@/config/api'
import {
  AuthApiError,
  type ApiErrorBody,
  type ApiSuccessBody,
} from '@/types/auth'

export async function parseJson(res: Response): Promise<unknown> {
  const text = await res.text()
  if (!text) return {}
  try {
    return JSON.parse(text) as unknown
  } catch {
    return {}
  }
}

export function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null
}

export function getMessage(body: unknown, fallback: string): string {
  if (isRecord(body) && typeof body.message === 'string') return body.message
  return fallback
}

export async function requestJson<T>(
  path: string,
  init: RequestInit & { accessToken?: string | null } = {}
): Promise<T> {
  const { accessToken, headers: initHeaders, ...rest } = init
  const headers = new Headers(initHeaders)
  const isFormData =
    typeof FormData !== 'undefined' && rest.body instanceof FormData
  if (!isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`)
  }

  const url = `${getApiBaseUrl()}${path}`
  const res = await fetch(url, { ...rest, headers })
  const body = await parseJson(res)

  if (!res.ok) {
    const errBody = body as ApiErrorBody
    const msg = getMessage(body, res.statusText)
    throw new AuthApiError(errBody.code ?? res.status, msg)
  }

  if (!isRecord(body)) {
    throw new AuthApiError(500, 'Invalid response')
  }

  const code = typeof body.code === 'number' ? body.code : res.status
  if (code >= 400) {
    throw new AuthApiError(code, getMessage(body, 'Request failed'))
  }

  return (body as unknown as ApiSuccessBody<T>).data
}
