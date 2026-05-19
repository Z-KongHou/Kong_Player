const PENDING_VIDEO_PLAY_KEY = 'kong-player-pending-play-v1'

/** 占位 ID：使用 `public/VideoTest.mp4`（开发/打包后均为站点根目录下的 `VideoTest.mp4`）做 Electron 播放联调 */
export const LOCAL_DEMO_VIDEO_ID = '__local_videotest__' as const

export interface PendingVideoPlay {
  videoId: string
  title: string
}

/**
 * 使用 localStorage：Electron 默认 session 下多窗口共享，便于主窗口写入、独立播放窗口读取。
 */
export function setPendingVideoPlay(payload: PendingVideoPlay): void {
  localStorage.setItem(PENDING_VIDEO_PLAY_KEY, JSON.stringify(payload))
}

export function consumePendingVideoPlay(): PendingVideoPlay | null {
  const raw = localStorage.getItem(PENDING_VIDEO_PLAY_KEY)
  localStorage.removeItem(PENDING_VIDEO_PLAY_KEY)
  if (!raw) return null
  try {
    const p = JSON.parse(raw) as Partial<PendingVideoPlay>
    if (typeof p.videoId !== 'string') return null
    return {
      videoId: p.videoId,
      title: typeof p.title === 'string' ? p.title : '视频',
    }
  } catch {
    return null
  }
}
