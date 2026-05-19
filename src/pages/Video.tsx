import { useEffect, useState } from 'react'
import { readStoredSession } from '@/auth/storage'
import { getVideoStreamPlaybackUrl } from '@/api/videoApi'
import {
  consumePendingVideoPlay,
  LOCAL_DEMO_VIDEO_ID,
} from '@/video/pendingPlay'

const VideoTitleBar = ({ title }: { title: string }) => {
  const handleMinimize = () => {
    window.ipcRenderer.send('video-window-minimize')
  }

  const handleMaximize = () => {
    window.ipcRenderer.send('video-window-maximize')
  }

  const handleClose = () => {
    window.ipcRenderer.send('video-window-close')
  }

  const handleReturnToMain = () => {
    window.ipcRenderer.send('video-window-focus-main')
  }

  return (
    <div
      className="h-16 flex items-center justify-between select-none app-drag"
      style={{ backgroundColor: '#1E2022' }}
    >
      <div className="flex items-center px-6 no-drag min-w-0 flex-1 gap-3">
        <button
          className="flex shrink-0 items-center space-x-2 px-3 py-2 rounded hover:bg-[#2F3134] transition-colors no-drag"
          onClick={handleReturnToMain}
        >
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span className="text-white font-medium">返回主页面</span>
        </button>
        <p className="truncate text-sm text-[#A0A5AC]">{title}</p>
      </div>

      <div className="flex items-center h-full px-6 space-x-1 no-drag shrink-0">
        <button
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#2F3134] transition-colors no-drag"
          onClick={handleMinimize}
        >
          <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8v1H2z" fill="#fff" />
          </svg>
        </button>

        <button
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#2F3134] transition-colors no-drag"
          onClick={handleMaximize}
        >
          <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
            <path d="M2 2h8v8H2z" fill="none" stroke="#fff" strokeWidth="1" />
          </svg>
        </button>

        <button
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#2F3134] hover:text-white transition-colors no-drag"
          onClick={handleClose}
        >
          <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
            <path d="M3 3l6 6M9 3l-6 6" stroke="#fff" strokeWidth="1" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function Video() {
  const [title, setTitle] = useState('视频')
  const [src, setSrc] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const pending = consumePendingVideoPlay()
    const session = readStoredSession()

    if (!pending) {
      setError('未选择要播放的视频，请从首页或个人页打开。')
      setLoading(false)
      return
    }

    setTitle(pending.title)

    if (pending.videoId === LOCAL_DEMO_VIDEO_ID) {
      setSrc(new URL('VideoTest.mp4', window.location.href).href)
      setLoading(false)
      return
    }

    if (!session?.accessToken) {
      setError('未登录或登录已过期，请先在主窗口登录。')
      setLoading(false)
      return
    }

    let cancelled = false
    ;(async () => {
      try {
        const url = await getVideoStreamPlaybackUrl(
          session.accessToken,
          pending.videoId
        )
        if (!cancelled) setSrc(url)
      } catch (e) {
        const msg = e instanceof Error ? e.message : '无法加载播放地址'
        if (!cancelled) setError(msg)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ backgroundColor: '#18191C' }}
    >
      <VideoTitleBar title={title} />
      <div className="flex-1 flex flex-col min-h-0 p-4">
        {loading ? (
          <p className="text-sm text-[#A0A5AC]">正在获取播放地址…</p>
        ) : null}
        {error ? (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}
        {src ? (
          <video
            className="w-full max-h-full rounded-lg bg-black"
            src={src}
            controls
            playsInline
            autoPlay
          />
        ) : null}
      </div>
    </div>
  )
}
