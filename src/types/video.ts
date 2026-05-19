/** 与 konghou-player-backend 视频列表/详情结构对齐 */

export type VideoStatus =
  | 'UPLOADING'
  | 'QUEUED'
  | 'TRANSCODING'
  | 'READY'
  | 'FAILED'

export interface VideoListUser {
  id?: string
  email?: string
  name?: string | null
}

export interface VideoListItem {
  id: string
  title: string
  description?: string | null
  tags?: string[]
  category?: string | null
  status: VideoStatus
  duration: number | null
  width?: number | null
  height?: number | null
  thumbnailUrl?: string
  fileSize: string
  mimeType: string
  createdAt: string
  updatedAt: string
  user?: VideoListUser
}

export interface VideoListResult {
  videos: VideoListItem[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
