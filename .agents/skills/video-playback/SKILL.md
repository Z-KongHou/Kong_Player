---
name: video-playback
description: Kong Player 视频列表、独立播放窗口、pendingPlay 跨窗口队列与播放地址加载。在修改 Video 页、video-player 入口、pendingPlay、videoApi、helpers 或 video-window IPC 时使用。
---

# Video Playback（Kong Player）

## 何时使用

- 从首页/个人页打开独立播放窗口
- 跨窗口传递「待播放」视频（`videoId` + `title`）
- 播放页 UI、标题栏、返回主窗口
- 拉取后端流地址或本地演示片 `VideoTest.mp4`

## 必读文件

| 文件                                   | 职责                                              |
| -------------------------------------- | ------------------------------------------------- |
| `src/pages/Video.tsx`                  | 独立窗口播放页（消费队列、`<video>`、标题栏 IPC） |
| `src/main/video-player.tsx`            | 播放窗口 React 入口（加载 `Video.tsx`）           |
| `video-player.html`                    | 播放窗口 HTML 入口                                |
| `src/video/pendingPlay.ts`             | `localStorage` 队列：写入 / 消费待播项            |
| `src/video/helpers.ts`                 | 列表辅助、`openVideoInStandaloneWindow`           |
| `src/api/videoApi.ts`                  | 列表 API、`getVideoStreamPlaybackUrl`             |
| `electron/main/windows/videoWindow.ts` | 创建/复用 `BrowserWindow`                         |
| `electron/main/ipc/windowControl.ts`   | `video-window-create`、`video-window-focus-main`  |
| `electron/main/ipc/videoControl.ts`    | 播放窗最小化/最大化/关闭                          |

## 播放流程

```
列表页 / Home
  → setPendingVideoPlay({ videoId, title })   // 写入 localStorage
  → window.ipcRenderer.send('video-window-create')
  → 主进程 createVideoWindow()               // 加载 video-player.html
  → Video.tsx mount
  → consumePendingVideoPlay()                // 读出并清除队列
  → LOCAL_DEMO_VIDEO_ID ? 本地 mp4 : getVideoStreamPlaybackUrl(token, id)
  → <video src={...} controls autoPlay />
```

**顺序很重要**：必须先 `setPendingVideoPlay`，再 `video-window-create`，否则播放页会报「未选择要播放的视频」。

## 架构要点

- **跨窗口队列**：`pendingPlay` 使用 `localStorage`（同 Electron session 下多窗口共享）
- **仅 `READY` 可播**：`openVideoInStandaloneWindow` 对非 `READY` 状态 `alert` 并 return
- **本地演示**：`LOCAL_DEMO_VIDEO_ID`（`__local_videotest__`）映射到 `public/VideoTest.mp4`
- **鉴权**：远程流需主窗口已登录；`readStoredSession()` 取 `accessToken` 再请求播放 URL
- **渲染进程 IPC**：通过 `window.ipcRenderer`（preload 暴露），禁止在 React 中直接使用 Node API

### IPC 频道（播放窗）

| 频道                      | 方向          | 说明                                   |
| ------------------------- | ------------- | -------------------------------------- |
| `video-window-create`     | 渲染 → 主进程 | 创建或聚焦播放窗（`windowControl.ts`） |
| `video-window-focus-main` | 渲染 → 主进程 | 聚焦主窗口                             |
| `video-window-minimize`   | 渲染 → 主进程 | 最小化播放窗                           |
| `video-window-maximize`   | 渲染 → 主进程 | 最大化/还原播放窗                      |
| `video-window-close`      | 渲染 → 主进程 | 关闭播放窗                             |

## 禁止

- 将播放业务逻辑塞进通用 `src/components/`（应留在 `src/video/`、`Video.tsx`、`videoApi`）
- 在 renderer 使用 `fs` / `child_process` 等 Node 模块
- 跳过 `pendingPlay` 直接改播放窗 state（会破坏主窗 → 播放窗传参）
- 未转码完成（非 `READY`）仍调用 `openVideoInStandaloneWindow`

## 测试与验收

- 纯函数：为 `src/video/helpers.ts` 中 `formatVideoDuration`、`videoStatusLabel` 等补充 `*.test.ts`
- 端到端：仓库内执行 `pnpm verify`
- 手动：
  1. 主窗口登录后，从列表打开 `READY` 视频 → 独立窗能播放
  2. 非 `READY` 项 → 提示不可播放
  3. Home 演示按钮 → `VideoTest.mp4` 可播
  4. 播放窗「返回主页面」→ 主窗口获得焦点

## 相关规范

- 全局分层与 Harness 流程：`AGENTS.md`
- Electron 通用 IPC/安全：`.agents/skills/electron/SKILL.md`
