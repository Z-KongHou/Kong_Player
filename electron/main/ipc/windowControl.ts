import { ipcMain } from 'electron'
import { getMainWindow } from '../windows/mainWindow'

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
}
