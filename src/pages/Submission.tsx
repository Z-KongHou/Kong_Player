import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { TitleBar, VideoCard } from '@/components'
import { useAuth } from '@/auth/useAuth'
import { deleteVideoApi, listVideosApi, uploadVideoFile } from '@/api/videoApi'
import { AuthApiError } from '@/types/auth'
import type { VideoListItem } from '@/types/video'
import {
  formatVideoDuration,
  openVideoInStandaloneWindow,
  videoStatusLabel,
} from '@/video/helpers'

const Submission = () => {
  const { user, accessToken, initializing } = useAuth()

  const [myVideos, setMyVideos] = useState<VideoListItem[]>([])
  const [videosLoading, setVideosLoading] = useState(false)
  const [videosError, setVideosError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const isLoggedIn = Boolean(user && accessToken)

  const loadMyVideos = useCallback(async () => {
    if (!accessToken || !user?.id) {
      setMyVideos([])
      return
    }
    setVideosLoading(true)
    setVideosError(null)
    try {
      const res = await listVideosApi(accessToken, {
        userId: user.id,
        page: 1,
        pageSize: 60,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      })
      setMyVideos(res.videos)
    } catch (e) {
      const msg = e instanceof AuthApiError ? e.message : '加载我的视频失败'
      setVideosError(msg)
      setMyVideos([])
    } finally {
      setVideosLoading(false)
    }
  }, [accessToken, user?.id])

  useEffect(() => {
    void loadMyVideos()
  }, [loadMyVideos])

  const handlePickFile = () => {
    setUploadError(null)
    fileRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file || !accessToken) return

    setUploadError(null)
    setUploadProgress(0)
    try {
      await uploadVideoFile(accessToken, file, p => setUploadProgress(p))
      setUploadProgress(null)
      await loadMyVideos()
    } catch (err) {
      const msg = err instanceof AuthApiError ? err.message : '上传失败'
      setUploadError(msg)
      setUploadProgress(null)
    }
  }

  const handleDelete = async (video: VideoListItem) => {
    if (!accessToken) return
    const ok = window.confirm(`确定删除「${video.title}」？此操作不可恢复。`)
    if (!ok) return

    setDeletingId(video.id)
    setVideosError(null)
    try {
      await deleteVideoApi(accessToken, video.id)
      await loadMyVideos()
    } catch (err) {
      const msg = err instanceof AuthApiError ? err.message : '删除失败'
      setVideosError(msg)
    } finally {
      setDeletingId(null)
    }
  }

  const displayName = user?.name || user?.email?.split('@')[0] || '我'

  return (
    <div className="w-full h-full flex flex-col min-h-0 bg-white dark:bg-[#18191C] transition-colors duration-[750ms] ease-in-out">
      <TitleBar title="投稿" />
      <div className="flex-1 overflow-auto min-h-0 px-10 py-12">
        <div className="max-w-5xl space-y-8">
          {initializing ? (
            <p className="text-sm text-[#61666D] dark:text-[#A0A5AC]">
              正在同步登录状态…
            </p>
          ) : null}

          {!initializing && !isLoggedIn ? (
            <div className="max-w-lg space-y-3 text-sm text-[#61666D] dark:text-[#A0A5AC]">
              <p>投稿与管理自己的视频需要先登录。</p>
              <p>
                请前往{' '}
                <Link to="/profile" className="text-[#3285FF] hover:underline">
                  个人主页
                </Link>{' '}
                登录。
              </p>
            </div>
          ) : null}

          {isLoggedIn ? (
            <>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E0E2E5]">
                  上传视频
                </h2>
                <input
                  ref={fileRef}
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime,video/x-msvideo,video/x-matroska,video/*"
                  className="hidden"
                  onChange={ev => void handleFileChange(ev)}
                />
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handlePickFile}
                    disabled={uploadProgress !== null}
                    className="rounded-lg bg-[#3285FF] text-white text-sm font-medium px-4 py-2 hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    {uploadProgress !== null
                      ? `上传中 ${uploadProgress}%`
                      : '选择文件并上传'}
                  </button>
                  <button
                    type="button"
                    onClick={() => void loadMyVideos()}
                    disabled={videosLoading}
                    className="rounded-lg border border-[#E8EAED] dark:border-[#2F3134] text-sm px-4 py-2 text-gray-700 dark:text-[#E0E2E5] hover:bg-[#E8EAED]/60 dark:hover:bg-[#2F3134]/60 transition-colors disabled:opacity-50"
                  >
                    刷新列表
                  </button>
                </div>
                {uploadError ? (
                  <p
                    className="text-sm text-red-600 dark:text-red-400"
                    role="alert"
                  >
                    {uploadError}
                  </p>
                ) : null}
              </div>

              <div className="space-y-4 border-t border-[#E8EAED] dark:border-[#2F3134] pt-10">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E0E2E5]">
                  我的投稿
                </h2>
                {videosLoading ? (
                  <p className="text-sm text-[#61666D] dark:text-[#A0A5AC]">
                    正在加载…
                  </p>
                ) : null}
                {videosError ? (
                  <p
                    className="text-sm text-red-600 dark:text-red-400"
                    role="alert"
                  >
                    {videosError}
                  </p>
                ) : null}
                {!videosLoading && !videosError && myVideos.length === 0 ? (
                  <p className="text-sm text-[#61666D] dark:text-[#A0A5AC]">
                    暂无投稿，上传后将显示在这里。
                  </p>
                ) : null}
                {myVideos.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {myVideos.map(video => (
                      <div key={video.id} className="relative group/card">
                        <VideoCard
                          title={video.title}
                          author={displayName}
                          thumbUrl={video.thumbnailUrl}
                          commentCount={videoStatusLabel(video.status)}
                          duration={formatVideoDuration(video.duration)}
                          onClick={() => openVideoInStandaloneWindow(video)}
                        />
                        <button
                          type="button"
                          disabled={deletingId === video.id}
                          onClick={e => {
                            e.stopPropagation()
                            void handleDelete(video)
                          }}
                          className="absolute right-1 top-1 z-10 rounded-md bg-black/65 px-2 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity hover:bg-red-600/90 group-hover/card:opacity-100 focus:opacity-100 disabled:opacity-40"
                          title="删除视频"
                        >
                          {deletingId === video.id ? '删除中…' : '删除'}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Submission
