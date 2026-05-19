import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { ThemeContext, type Theme } from './theme-context'

const THEME_STORAGE_KEY = 'kong-player-theme'

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored
  return 'light'
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getStoredTheme)

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
