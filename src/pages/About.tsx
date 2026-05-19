import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="px-4 py-8 bg-white dark:bg-[#18191C] min-h-full transition-colors duration-[750ms]">
      <div className="mb-6">
        <Link
          to="/"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center transition-colors duration-[750ms]"
        >
          <span className="mr-2">←</span> 返回首页
        </Link>
      </div>

      <div className="bg-white dark:bg-[#1E2022] rounded-lg shadow-md dark:shadow-none overflow-hidden border border-transparent dark:border-[#2F3134] transition-colors duration-[750ms]">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-[#E0E2E5] transition-colors duration-[750ms]">
            关于 Kong Player
          </h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-[#E0E2E5] transition-colors duration-[750ms]">
              项目介绍
            </h2>
            <p className="text-gray-700 dark:text-[#A0A5AC] mb-4 transition-colors duration-[750ms]">
              Kong Player 是一个基于 Electron + React + TypeScript + Tailwind
              CSS 构建的桌面视频播放器应用。 该项目旨在提供一个类似 Bilibili
              的视频播放体验，同时具备桌面应用的性能和功能优势。
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-[#E0E2E5] transition-colors duration-[750ms]">
              技术栈
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-[#2F3134] p-4 rounded transition-colors duration-[750ms]">
                <h3 className="font-medium mb-2 text-gray-900 dark:text-[#E0E2E5]">
                  前端技术
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-[#A0A5AC] space-y-1 transition-colors duration-[750ms]">
                  <li>React 18</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>React Router</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-[#2F3134] p-4 rounded transition-colors duration-[750ms]">
                <h3 className="font-medium mb-2 text-gray-900 dark:text-[#E0E2E5]">
                  桌面技术
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-[#A0A5AC] space-y-1 transition-colors duration-[750ms]">
                  <li>Electron</li>
                  <li>Vite</li>
                  <li>Node.js</li>
                  <li>IPC 通信</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-[#E0E2E5] transition-colors duration-[750ms]">
              主要功能
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-[#A0A5AC] space-y-2 transition-colors duration-[750ms]">
              <li>视频播放与控制</li>
              <li>弹幕系统</li>
              <li>视频推荐流</li>
              <li>用户登录与个人中心</li>
              <li>搜索功能</li>
              <li>本地缓存</li>
            </ul>
          </div>

          <div className="border-t border-gray-200 dark:border-[#2F3134] pt-6 transition-colors duration-[750ms]">
            <p className="text-gray-600 dark:text-[#A0A5AC] text-sm transition-colors duration-[750ms]">
              © 2023 Kong Player. 这是一个演示项目，用于展示 Electron + React
              的开发能力。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
