import { ipcMain } from 'electron'
import { getVideoWindow } from '../windows/videoWindow'

export function setupIpcHandlersOfVideoWindow() {
  ipcMain.on('video-window-minimize', () => {
    const win = getVideoWindow()
    if (!win) {
      console.error('Video window not found for minimize operation')
      return
    }
    win.minimize()
  })
  ipcMain.on('video-window-maximize', () => {
    const win = getVideoWindow()
    if (!win) {
      console.error('Video window not found for maximize operation')
      return
    }
    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  })
  ipcMain.on('video-window-close', () => {
    const win = getVideoWindow()
    if (!win) {
      console.error('Video window not found for close operation')
      return
    }
    win.close()
  })
}
