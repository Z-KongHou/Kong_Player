import { ipcMain } from 'electron'
import { getMainWindow } from '../windows/mainWindow'
import { createVideoWindow } from '../windows/videoWindow'

export function setupIpcHandlers() {
  ipcMain.on('window-minimize', () => {
    const win = getMainWindow()
    if (!win) {
      console.error('Main window not found for minimize operation')
      return
    }
    win.minimize()
  })
  ipcMain.on('window-maximize', () => {
    const win = getMainWindow()
    if (!win) {
      console.error('Main window not found for maximize operation')
      return
    }
    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  })
  ipcMain.on('window-close', () => {
    const win = getMainWindow()
    if (!win) {
      console.error('Main window not found for close operation')
      return
    }
    win.close()
  })
  ipcMain.on('video-window-create', () => {
    createVideoWindow()
  })
  ipcMain.on('video-window-focus-main', () => {
    const mainWindow = getMainWindow()

    if (!mainWindow) {
      console.error('Main window not found for focus operation')
      return
    }

    // 聚焦主窗口
    mainWindow.focus()
  })
}
