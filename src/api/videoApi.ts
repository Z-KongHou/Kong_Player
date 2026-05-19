import { getApiBaseUrl } from '@/api/config'
import { getMessage, isRecord, parseJson, requestJson } from '@/api/http'
import { AuthApiError } from '@/types/auth'
import type { VideoListResult } from '@/types/video'

export interface ListVideosParams {
  userId?: string
  page?: number
  pageSize?: number
  sortBy?: 'createdAt' | 'updatedAt' | 'views' | 'title'
  sortOrder?: 'asc' | 'desc'
  search?: string
}

export async function listVideosApi(
  accessToken: string,
  params: ListVideosParams = {}
): Promise<VideoListResult> {
  const q = new URLSearchParams()
  if (params.userId) q.set('userId', params.userId)
  if (params.page != null) q.set('page', String(params.page))
  if (params.pageSize != null) q.set('pageSize', String(params.pageSize))
  if (params.sortBy) q.set('sortBy', params.sortBy)
  if (params.sortOrder) q.set('sortOrder', params.sortOrder)
  if (params.search) q.set('search', params.search)
  const qs = q.toString()
  const path = `/api/videos${qs ? `?${qs}` : ''}`
  return requestJson<VideoListResult>(path, { method: 'GET', accessToken })
}

/**
 * 调用流地址接口（带鉴权），解析 302/206 的 Location，供 `<video src>` 使用。
 */
export async function getVideoStreamPlaybackUrl(
  accessToken: string,
  videoId: string,
  resolution?: string
): Promise<string> {
  const u = new URL(
    `${getApiBaseUrl()}/api/videos/${encodeURIComponent(videoId)}/stream`
  )
  if (resolution) u.searchParams.set('resolution', resolution)

  const res = await fetch(u.toString(), {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
    redirect: 'manual',
  })

  if (
    res.status === 301 ||
    res.status === 302 ||
    res.status === 303 ||
    res.status === 307 ||
    res.status === 308
  ) {
    const loc = res.headers.get('Location')
    if (loc) return loc
  }
  if (res.status === 206) {
    const loc = res.headers.get('Location')
    if (loc) return loc
  }

  const body = await parseJson(res)
  throw new AuthApiError(res.status, getMessage(body, '无法获取播放地址'))
}

interface InitializeUploadData {
  uploadId: string
  videoId: string
  totalChunks: number
  chunkSize: number
}

export async function uploadVideoFile(
  accessToken: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<{ videoId: string }> {
  const init = await requestJson<InitializeUploadData>(
    `/api/videos/upload/initialize`,
    {
      method: 'POST',
      accessToken,
      body: JSON.stringify({
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type || 'video/mp4',
      }),
    }
  )

  const { uploadId, totalChunks, chunkSize } = init
  const etags: Record<string, string> = {}

  for (let i = 1; i <= totalChunks; i++) {
    const start = (i - 1) * chunkSize
    const end = Math.min(start + chunkSize, file.size)
    const blob = file.slice(start, end)
    const form = new FormData()
    form.append('chunk', blob)
    form.append('chunkSize', String(blob.size))

    const chunkUrl = `${getApiBaseUrl()}/api/videos/upload/${encodeURIComponent(uploadId)}/chunks/${i}`
    const res = await fetch(chunkUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: form,
    })
    const body = await parseJson(res)
    if (!res.ok) {
      throw new AuthApiError(
        isRecord(body) && typeof body.code === 'number'
          ? body.code
          : res.status,
        getMessage(body, res.statusText)
      )
    }
    if (isRecord(body) && typeof body.code === 'number' && body.code >= 400) {
      throw new AuthApiError(body.code, getMessage(body, '分片上传失败'))
    }
    const data = isRecord(body)
      ? (body.data as Record<string, unknown> | undefined)
      : undefined
    const etag =
      data && typeof data.etag === 'string'
        ? data.etag
        : data && typeof data.ETag === 'string'
          ? data.ETag
          : ''
    if (etag) etags[String(i)] = etag

    onProgress?.(Math.round((i / totalChunks) * 100))
  }

  const complete = await requestJson<{ videoId: string }>(
    `/api/videos/upload/${encodeURIComponent(uploadId)}/complete`,
    {
      method: 'POST',
      accessToken,
      body: JSON.stringify({ etags }),
    }
  )

  return { videoId: complete.videoId }
}

export async function deleteVideoApi(
  accessToken: string,
  videoId: string
): Promise<void> {
  await requestJson<{ success?: boolean; message?: string }>(
    `/api/videos/${encodeURIComponent(videoId)}`,
    { method: 'DELETE', accessToken }
  )
}
