import { BrowserWindow, screen } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { VITE_DEV_SERVER_URL, RENDERER_DIST } from '../main'
import { getMainWindow } from './mainWindow'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let win: BrowserWindow | null

export function createVideoWindow() {
  // 如果视频窗口已经存在，则直接返回现有窗口并聚焦
  if (win && !win.isDestroyed()) {
    win.focus()
    return win
  }

  const screenSize = screen.getPrimaryDisplay()
  const mainWindow = getMainWindow()

  // 默认位置和大小
  let windowOptions: Electron.BrowserWindowConstructorOptions = {
    width: Math.floor((screenSize.workAreaSize.height * 0.9 * 16) / 9),
    height: Math.floor(screenSize.workAreaSize.height * 0.9),
    minHeight: Math.floor(screenSize.workAreaSize.height * 0.8),
    minWidth: Math.floor((screenSize.workAreaSize.height * 0.8 * 16) / 9),
    webPreferences: {
      preload: path.join(__dirname, './preload.mjs'),
      zoomFactor: 1.0,
    },
    frame: false,
  }

  // 如果主窗口存在，则相对于主窗口进行偏移
  if (mainWindow) {
    const mainWindowBounds = mainWindow.getBounds()
    const baseOffset = 30 // 基础偏移量，单位像素
    const randomOffset = 20 // 随机偏移范围，增加变化性

    // 添加随机因素，使每次位置略有不同
    const randomX = Math.floor(Math.random() * randomOffset) - randomOffset / 2
    const randomY = Math.floor(Math.random() * randomOffset) - randomOffset / 2

    // 计算新窗口位置（相对于主窗口右下方偏移，加上随机因素）
    const newX = mainWindowBounds.x + baseOffset + randomX
    const newY = mainWindowBounds.y + baseOffset + randomY

    // 确保新窗口不会超出屏幕边界
    const screenBounds = screenSize.workArea
    const maxX =
      screenBounds.x + screenBounds.width - (windowOptions.width || 0)
    const maxY =
      screenBounds.y + screenBounds.height - (windowOptions.height || 0)
    const minX = screenBounds.x
    const minY = screenBounds.y

    windowOptions = {
      ...windowOptions,
      x: Math.max(minX, Math.min(newX, maxX)),
      y: Math.max(minY, Math.min(newY, maxY)),
    }
  }

  win = new BrowserWindow(windowOptions)

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(`${VITE_DEV_SERVER_URL}/video-player.html`)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'video-player.html'))
  }

  // 添加窗口关闭事件监听，清理引用
  win.on('closed', () => {
    win = null
  })

  // 添加窗口激活事件监听，确保窗口在前台显示
  win.on('ready-to-show', () => {
    win?.show()
    win?.focus()
  })

  return win
}

export function getVideoWindow() {
  return win
}

export function setVideoWindow(window: BrowserWindow | null) {
  win = window
}
