import React from 'react'

interface TitleBarProps {
  title?: string
}

const TitleBar: React.FC<TitleBarProps> = ({ title = 'Kong Player' }) => {
  const handleMinimize = () => {
    window.ipcRenderer.send('window-minimize')
  }

  const handleMaximize = () => {
    window.ipcRenderer.send('window-maximize')
  }

  const handleClose = () => {
    window.ipcRenderer.send('window-close')
  }

  return (
    <div className="h-16 bg-white flex items-center justify-between border-b border-gray-200 select-none">
      {/* 标题区域 */}
      <div className="flex items-center px-2">
        <div className="text-xs text-gray-700 font-medium">{title}</div>
      </div>

      {/* 窗口控制按钮 */}
      <div className="flex items-center h-full px-6 space-x-1">
        {/* 最小化按钮 */}
        <button
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
          onClick={handleMinimize}
        >
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8v1H2z" fill="#666" />
          </svg>
        </button>

        {/* 最大化/还原按钮 */}
        <button
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
          onClick={handleMaximize}
        >
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
            <path d="M2 2h8v8H2z" fill="none" stroke="#666" strokeWidth="1" />
          </svg>
        </button>

        {/* 关闭按钮 */}
        <button
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 hover:text-white transition-colors"
          onClick={handleClose}
        >
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
            <path d="M3 3l6 6M9 3l-6 6" stroke="#666" strokeWidth="1" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default TitleBar
