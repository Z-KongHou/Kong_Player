import { BrowserWindow, screen } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { VITE_DEV_SERVER_URL, RENDERER_DIST } from '../main'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let win: BrowserWindow | null

export function createWindow() {
  const screenSize = screen.getPrimaryDisplay()

  win = new BrowserWindow({
    width: Math.floor((screenSize.workAreaSize.height * 0.9 * 16) / 9),
    height: Math.floor(screenSize.workAreaSize.height * 0.9),
    webPreferences: {
      preload: path.join(__dirname, './preload.mjs'),
      zoomFactor: 1.0,
    },
    frame: false,
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  // 添加窗口关闭事件监听，清理引用
  win.on('closed', () => {
    win = null
  })

  return win
}

export function getMainWindow() {
  return win
}

export function setMainWindow(window: BrowserWindow | null) {
  win = window
}
