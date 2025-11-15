import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className='px-4 py-8'>
      <div className='mb-6'>
        <Link
          to='/'
          className='text-blue-600 hover:text-blue-800 flex items-center'
        >
          <span className='mr-2'>←</span> 返回首页
        </Link>
      </div>

      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='p-6'>
          <h1 className='text-3xl font-bold mb-6'>关于 Kong Player</h1>

          <div className='mb-6'>
            <h2 className='text-xl font-semibold mb-3'>项目介绍</h2>
            <p className='text-gray-700 mb-4'>
              Kong Player 是一个基于 Electron + React + TypeScript + Tailwind
              CSS 构建的桌面视频播放器应用。 该项目旨在提供一个类似 Bilibili
              的视频播放体验，同时具备桌面应用的性能和功能优势。
            </p>
          </div>

          <div className='mb-6'>
            <h2 className='text-xl font-semibold mb-3'>技术栈</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='bg-gray-50 p-4 rounded'>
                <h3 className='font-medium mb-2'>前端技术</h3>
                <ul className='list-disc list-inside text-gray-700 space-y-1'>
                  <li>React 18</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>React Router</li>
                </ul>
              </div>
              <div className='bg-gray-50 p-4 rounded'>
                <h3 className='font-medium mb-2'>桌面技术</h3>
                <ul className='list-disc list-inside text-gray-700 space-y-1'>
                  <li>Electron</li>
                  <li>Vite</li>
                  <li>Node.js</li>
                  <li>IPC 通信</li>
                </ul>
              </div>
            </div>
          </div>

          <div className='mb-6'>
            <h2 className='text-xl font-semibold mb-3'>主要功能</h2>
            <ul className='list-disc list-inside text-gray-700 space-y-2'>
              <li>视频播放与控制</li>
              <li>弹幕系统</li>
              <li>视频推荐流</li>
              <li>用户登录与个人中心</li>
              <li>搜索功能</li>
              <li>本地缓存</li>
            </ul>
          </div>

          <div className='border-t pt-6'>
            <p className='text-gray-600 text-sm'>
              © 2023 Kong Player. 这是一个演示项目，用于展示 Electron + React
              的开发能力。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
