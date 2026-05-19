import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TitleBar, VideoCard } from '@/components'
import { useAuth } from '@/auth/useAuth'
import { listVideosApi } from '@/api/videoApi'
import { AuthApiError } from '@/types/auth'
import type { VideoListItem } from '@/types/video'
import { LOCAL_DEMO_VIDEO_ID, setPendingVideoPlay } from '@/video/pendingPlay'
import {
  formatVideoDuration,
  openVideoInStandaloneWindow,
  videoStatusLabel,
} from '@/utils/video'

const Home = () => {
  const { accessToken } = useAuth()
  const [videos, setVideos] = useState<VideoListItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!accessToken) {
      setVideos([])
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await listVideosApi(accessToken, {
        page: 1,
        pageSize: 60,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      })
      setVideos(res.videos)
    } catch (e) {
      const msg =
        e instanceof AuthApiError ? e.message : '加载失败，请确认后端已启动'
      setError(msg)
      setVideos([])
    } finally {
      setLoading(false)
    }
  }, [accessToken])

  useEffect(() => {
    void load()
  }, [load])

  return (
    <div className="w-full h-full flex flex-col min-h-0 bg-white dark:bg-[#18191C] transition-colors duration-[750ms] ease-in-out">
      <TitleBar />
      <div className="flex-1 overflow-auto px-10 py-10 min-h-0">
        <div className="mb-8">
          <button
            type="button"
            onClick={() => {
              setPendingVideoPlay({
                videoId: LOCAL_DEMO_VIDEO_ID,
                title: '本地测试 (public/VideoTest.mp4)',
              })
              window.ipcRenderer.send('video-window-create')
            }}
            className="rounded-lg border border-[#E3E5E7] dark:border-[#2F3134] px-4 py-2 text-sm font-medium text-[#18191C] dark:text-[#E3E5E7] hover:bg-[#F6F7F8] dark:hover:bg-[#2F3134] transition-colors"
          >
            打开本地测试视频（无需登录）
          </button>
          <p className="mt-2 text-xs text-[#9499A0] dark:text-[#6C757D]">
            使用 Vite 根路径下的 VideoTest.mp4，用于在 Electron
            中验证播放器是否正常。
          </p>
        </div>
        {!accessToken ? (
          <div className="max-w-lg space-y-3 text-sm text-[#61666D] dark:text-[#A0A5AC]">
            <p>浏览全站视频需要先登录。</p>
            <p>
              请前往{' '}
              <Link to="/profile" className="text-[#3285FF] hover:underline">
                个人主页
              </Link>{' '}
              登录账号（接口需携带 Access Token）。
            </p>
          </div>
        ) : null}

        {accessToken && loading ? (
          <p className="text-sm text-[#61666D] dark:text-[#A0A5AC]">
            正在加载视频列表…
          </p>
        ) : null}

        {accessToken && error ? (
          <div className="space-y-2">
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
            <button
              type="button"
              onClick={() => void load()}
              className="text-sm font-medium text-[#3285FF] hover:underline"
            >
              重试
            </button>
          </div>
        ) : null}

        {accessToken && !loading && !error && videos.length === 0 ? (
          <p className="text-sm text-[#61666D] dark:text-[#A0A5AC]">
            暂无视频，可在个人页上传。
          </p>
        ) : null}

        {accessToken && videos.length > 0 ? (
          <div className="grid grid-cols-4 xl:grid-cols-5 gap-10">
            {videos.map(video => (
              <VideoCard
                key={video.id}
                title={video.title}
                author={
                  video.user?.name ||
                  video.user?.email?.split('@')[0] ||
                  '未知作者'
                }
                thumbUrl={video.thumbnailUrl}
                commentCount={videoStatusLabel(video.status)}
                duration={formatVideoDuration(video.duration)}
                onClick={() => openVideoInStandaloneWindow(video)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Home
