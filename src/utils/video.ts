import type { VideoListItem } from '@/types/video'
import { setPendingVideoPlay } from '@/video/pendingPlay'

export function formatVideoDuration(seconds: number | null): string {
  if (seconds == null || Number.isNaN(seconds)) return '--:--'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function videoStatusLabel(status: VideoListItem['status']): string {
  switch (status) {
    case 'READY':
      return '可播放'
    case 'UPLOADING':
      return '上传中'
    case 'QUEUED':
      return '排队转码'
    case 'TRANSCODING':
      return '转码中'
    case 'FAILED':
      return '失败'
    default:
      return String(status)
  }
}

const NOT_READY_ALERT =
  '该视频尚未转码完成，暂不可播放。请稍后在个人页查看状态。'

/** 在独立播放窗口中打开列表项（需已转码完成）。 */
export function openVideoInStandaloneWindow(video: VideoListItem): void {
  if (video.status !== 'READY') {
    window.alert(NOT_READY_ALERT)
    return
  }
  setPendingVideoPlay({ videoId: video.id, title: video.title })
  window.ipcRenderer.send('video-window-create')
}
