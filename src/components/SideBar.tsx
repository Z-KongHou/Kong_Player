import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  path?: string
}

const SunIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      clipRule="evenodd"
    />
  </svg>
)

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
)

const SideBar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  const topNavItems: NavItem[] = [
    {
      id: 'home',
      label: '首页',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
      path: '/',
    },
    {
      id: 'featured',
      label: '精选',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
    },
    {
      id: 'dynamic',
      label: '动态',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: 'mine',
      label: '我的',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      ),
      path: '/profile',
    },
  ]

  const bottomNavItems: NavItem[] = [
    {
      id: 'upload',
      label: '投稿',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clipRule="evenodd"
          />
        </svg>
      ),
      path: '/submission',
    },
    {
      id: 'message',
      label: '消息',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
    },
    {
      id: 'theme',
      label: '主题',
      icon: null,
    },
    {
      id: 'settings',
      label: '设置',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.532 1.532 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.532 1.532 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ]

  const handleNavClick = (item: NavItem) => {
    if (item.id === 'theme') {
      toggleTheme()
      return
    }
    if (item.path) {
      navigate(item.path)
    }
  }

  const isActive = (item: NavItem) => {
    if (item.path) {
      return location.pathname === item.path
    }
    return false
  }

  const renderNavItem = (item: NavItem) => {
    const icon =
      item.id === 'theme' ? (
        theme === 'light' ? (
          <SunIcon />
        ) : (
          <MoonIcon />
        )
      ) : (
        item.icon
      )
    return (
      <button
        key={item.id}
        onClick={() => handleNavClick(item)}
        className={`
          flex flex-col items-center justify-center space-y-1.5 p-2 rounded-lg w-full
          transition-all duration-200 ease-in-out transition-colors duration-[750ms] cursor-pointer
          dark:text-[#A0A5AC] dark:hover:text-[#3285FF]
          ${
            isActive(item)
              ? 'text-[#3285FF] dark:text-[#3285FF]'
              : 'text-[#61666D] hover:text-[#3285FF]'
          }
        `}
      >
        <span className="transition-colors duration-200 ease-in-out">
          {icon}
        </span>
        <span className="text-[11px] leading-none transition-colors duration-200 ease-in-out">
          {item.label}
        </span>
      </button>
    )
  }

  return (
    <div className="w-16 h-full bg-[#F6F7F8] dark:bg-[#1E2022] flex flex-col transition-colors duration-[750ms] ease-in-out">
      {/* 上半部分导航 */}
      <div className="flex-1 py-6">
        <div className="px-2 space-y-3">{topNavItems.map(renderNavItem)}</div>
      </div>

      {/* 分割线 */}
      <div className="px-2">
        <div className="border-t border-[#E8EAED] dark:border-[#2F3134] transition-colors duration-[750ms]" />
      </div>

      {/* 下半部分导航 */}
      <div className="py-6">
        <div className="px-2 space-y-3">
          {bottomNavItems.map(renderNavItem)}
        </div>
      </div>
    </div>
  )
}

export default SideBar
