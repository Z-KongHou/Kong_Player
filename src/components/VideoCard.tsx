interface VideoCardProps {
  title: string
  author: string
  /** 封面图 URL；无则显示占位 */
  thumbUrl?: string | null
  /** 左下角辅助文案（如状态或互动数） */
  commentCount: string
  /** 右下角时长，如 `12:34` */
  duration: string
  onClick?: () => void
}

const VideoCard = ({
  title,
  author,
  thumbUrl,
  commentCount,
  duration,
  onClick,
}: VideoCardProps) => {
  return (
    <button
      type="button"
      className="group flex w-full flex-col bg-transparent text-left"
      onClick={onClick}
    >
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-black transition-all duration-[750ms] group-hover:border-blue-400 group-hover:shadow-md dark:border-[#3D3F42] dark:group-hover:border-blue-400">
        {thumbUrl ? (
          <img
            src={thumbUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#2F3134] to-[#18191C] text-[11px] text-[#A0A5AC]">
            无封面
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-2 pb-2 pt-8">
          <span className="max-w-[50%] truncate text-[11px] leading-tight text-white drop-shadow-md">
            {commentCount}
          </span>
          <span className="shrink-0 text-[11px] leading-tight text-white tabular-nums drop-shadow-md">
            {duration}
          </span>
        </div>
      </div>

      <div className="min-h-0 bg-transparent px-2.5 pt-2">
        <p className="line-clamp-2 text-left text-xs font-medium text-black dark:text-[#E0E2E5]">
          {title}
        </p>
      </div>

      <div className="bg-transparent px-2.5 pb-2 pt-1">
        <p className="truncate text-left text-[11px] text-gray-500 dark:text-gray-400">
          {author}
        </p>
      </div>
    </button>
  )
}

export default VideoCard
