// import React from 'react'

const VideoTitleBar = () => {
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
      {/* 返回主页面按钮区域 */}
      <div className="flex items-center px-6 no-drag">
        <button
          className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-[#2F3134] transition-colors no-drag"
          onClick={handleReturnToMain}
        >
          {/* 小房子图标 - 参考首页设计风格 */}
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          {/* 返回文字 */}
          <span className="text-white font-medium">返回主页面</span>
        </button>
      </div>

      {/* 窗口控制按钮 */}
      <div className="flex items-center h-full px-6 space-x-1 no-drag">
        {/* 最小化按钮 */}
        <button
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#2F3134] transition-colors no-drag"
          onClick={handleMinimize}
        >
          <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8v1H2z" fill="#fff" />
          </svg>
        </button>

        {/* 最大化/还原按钮 */}
        <button
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#2F3134] transition-colors no-drag"
          onClick={handleMaximize}
        >
          <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none">
            <path d="M2 2h8v8H2z" fill="none" stroke="#fff" strokeWidth="1" />
          </svg>
        </button>

        {/* 关闭按钮 */}
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
  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ backgroundColor: '#18191C' }}
    >
      <VideoTitleBar />
      <div className="flex-1">
        <div
          className="w-full h-full"
          style={{ backgroundColor: '#18191C' }}
        ></div>
      </div>
    </div>
  )
}
