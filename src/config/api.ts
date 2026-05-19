export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_BASE_URL as string | undefined
  const base = (raw?.trim() || 'http://localhost:8080').replace(/\/$/, '')
  return base
}
