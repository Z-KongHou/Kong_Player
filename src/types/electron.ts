export interface IpcRendererEvent {
  sender: Electron.IpcRenderer
  senderId: number
  ports: MessagePort[]
}

export interface IpcRendererExposed {
  on(
    channel: string,
    listener: (event: IpcRendererEvent, ...args: unknown[]) => void
  ): void
  off(
    channel: string,
    listener: (event: IpcRendererEvent, ...args: unknown[]) => void
  ): void
  send(channel: string, ...args: unknown[]): void
  invoke<T = unknown>(channel: string, ...args: unknown[]): Promise<T>
}

declare global {
  interface Window {
    ipcRenderer: IpcRendererExposed
  }
}
