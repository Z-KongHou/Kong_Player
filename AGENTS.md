---
description:
alwaysApply: true
---

# AGENTS.md

## 项目简介

Kong Player 是一个基于 Electron + React + TypeScript + Vite 开发的桌面端视频播放器应用框架。

**技术栈**：

- Electron 30.0.1（桌面端框架）
- React 18.2.0（前端框架）
- TypeScript 5.2.2（编程语言）
- Vite 5.1.6（构建工具）
- TailwindCSS 4.1.17（样式框架）
- pnpm（包管理器）

## 可用脚本

在开始任何工作前，请先检查项目状态和依赖是否正确安装。

```bash
# 开发模式（启动 Vite 开发服务器）
pnpm dev

# 类型检查（不产出文件）
pnpm typecheck

# 代码检查
pnpm lint

# 代码格式化
pnpm format

# 格式化检查
pnpm format:check

# 单元测试（单次运行）
pnpm test

# 单元测试（监听模式）
pnpm test:watch

# 一键验收（类型 + lint + 格式 + 测试，提交前推荐）
pnpm verify

# 构建应用
pnpm build

# 预览构建结果
pnpm preview
```

## 开发规范

### 代码规范

- 使用 TypeScript 进行开发
- 遵循 ESLint 的代码规范（.eslintrc.cjs）
- 遵循 Prettier 的格式化规范（.prettierrc）
- 编写清晰的提交信息

### 架构说明

- **主进程** (`electron/main/`): 控制应用窗口、系统交互、IPC通信
- **预加载脚本** (`electron/preload/`): 安全地暴露 API 给渲染进程
- **渲染进程** (`src/`): 标准的 React 应用，使用 Vite 构建，采用 SPA 模式
- **路由管理** (`src/router/`): React Router 配置

### 项目结构

```
├─ electron/              # Electron 主进程和预加载脚本
│  ├─ main/               # 主进程相关文件
│  │  ├─ main.ts          # 主进程入口文件
│  │  ├─ ipc/             # IPC 通信处理
│  │  ├─ services/        # 服务层
│  │  └─ windows/         # 窗口管理
│  └─ preload/            # 预加载脚本
│     └─ preload.ts       # 预加载脚本
├─ public/                # 静态资源
├─ src/                   # React 渲染进程源码
│  ├─ api/                # HTTP 客户端（含 config.ts 接口基址）
│  ├─ auth/               # 登录态与认证 API
│  ├─ components/         # 可复用组件
│  ├─ hooks/              # 自定义 Hook、主题 Context 与 ThemeProvider
│  ├─ main/               # 应用入口（main.tsx、video-player.tsx、全局样式）
│  ├─ pages/              # 页面组件
│  ├─ router/             # 路由配置
│  ├─ types/              # TypeScript 类型定义
│  ├─ utils/              # 通用工具（如 delay）
│  └─ video/              # 播放相关（pendingPlay、helpers、独立窗口样式）
├─ dist-electron/         # Electron 构建输出（主进程）
└─ vite.config.ts         # Vite 配置文件
```

### 分层约束

- Electron 运行时代码必须位于 `electron/`
- React UI 代码必须位于 `src/`
- **禁止**在 React 文件中混入 Electron / Node 直连逻辑

## Electron 架构与安全

Electron 分三层：**主进程** → **预加载** → **渲染进程（React）**。

| 层       | 路径                | 职责                                                        |
| -------- | ------------------- | ----------------------------------------------------------- |
| 主进程   | `electron/main/`    | 应用生命周期、`BrowserWindow`、系统级操作、IPC 处理         |
| 预加载   | `electron/preload/` | 通过 `contextBridge` 向渲染进程暴露安全 API；不写重业务逻辑 |
| 渲染进程 | `src/`              | React UI；通过 preload 暴露的 API 访问桌面能力              |

**安全规则**：渲染进程不得直接使用 Node.js API。React 代码中禁止：

- `require('fs')` / `require('child_process')` / `require('os')` 等

正确通信路径：

```
React → window.api（或 window.ipcRenderer）→ preload → ipcRenderer → ipcMain → 主进程
```

IPC 处理放在 `electron/main/ipc/`；新能力先在 preload 暴露，再在渲染进程调用。

## React 与 TypeScript 规范

- 使用函数组件与 Hooks，保持组件小而可复用，UI 与逻辑分离
- 避免 `any`；优先显式类型；共享类型放在 `src/types/`
- 目录职责：`components/` 可复用 UI；`pages/` 页面级；`hooks/` 逻辑；`utils/` 纯工具函数

## 路由规范

- 路由配置集中在 `src/router/`
- 页面组件放在 `src/pages/`
- **禁止**在 `components/` 中定义全局路由

## UI / 暗色模式

应用使用 **class 模式**暗色主题：根节点切换 `dark` class（见 `ThemeProvider`、`src/main/index.css` 中的 `@custom-variant dark`）。

对 `src/pages/` 下**新增或修改**的页面组件：

- 凡有 **背景、文字、边框、阴影、hover/focus** 的样式，必须提供对应的 **`dark:`** 变体
- 禁止只写浅色样式导致暗色下对比度不足或 UI 不可见
- 暗色配色参考项目既有风格（如 `#18191C`、`#1E2022`、`#2F3134`；文字 `#A0A5AC` / `#E0E2E5`；强调色 `#3285FF` / `blue-400`）
- 主题切换时颜色过渡可与现有页面对齐，例如 `transition-colors duration-[750ms]`
- 与页面一并新增或大幅修改的 `src/components/` 组件，若自带背景/文字/边框，也需补全 `dark:`

实现要点：使用 Tailwind `dark:` 工具类（如 `bg-white dark:bg-[#18191C]`）；除非元素与主题无关（如品牌 Logo），否则不要只写无暗色对应的硬编码色值。

## 视频模块

| 文件                        | 职责                           |
| --------------------------- | ------------------------------ |
| `src/pages/Video.tsx`       | 播放相关页面                   |
| `src/main/video-player.tsx` | 独立播放窗口入口               |
| `src/video/pendingPlay.ts`  | 跨窗口播放队列（localStorage） |
| `src/video/helpers.ts`      | 列表/播放辅助函数              |
| `src/api/videoApi.ts`       | 视频后端 API                   |

**禁止**将视频业务逻辑塞进通用 `components/`。

## 工具函数

- 通用工具放在 `src/utils/`
- 必须是纯函数，**不依赖** React 或 Electron

## Agent / Harness 工作流

凡由 AI 修改本仓库代码，**必须**按以下顺序执行，不得跳过验收步骤。

### 五步流程

1. **读** — 先阅读将改动的目录与同类实现；新建前检查 `src/components/`、`src/utils/`、`src/types/` 是否已有可复用代码
2. **范围** — 只改与任务相关的文件；遵守分层（Electron 仅在 `electron/`，React 仅在 `src/`）；新页面需在 `src/router/index.tsx` 注册路由
3. **实现** — 复杂功能先与用户确认方案；改动页面/UI 时遵守「UI / 暗色模式」；IPC 变更走 `electron/main/ipc/` 与 preload
4. **验** — 结束前**必须**执行 `pnpm verify`；失败则修复直至通过；新增纯函数优先补 `*.test.ts`
5. **报** — 说明改了哪些文件、如何手动验证、已知限制与非目标

### 任务描述模板

在 Issue 或对话开头使用（可复制）：

```markdown
## 目标

（一句话说明要达成什么）

## 范围

（涉及的文件/模块，如 `src/video/`、`electron/main/ipc/`）

## 非目标

（本次不做的内容）

## 验收

- 自动：`pnpm verify`
- 手动：1. … 2. … 3. …
```

### 文档与技能索引

| 场景                                     | 文档                                     |
| ---------------------------------------- | ---------------------------------------- |
| 全局规范（本文件）                       | `AGENTS.md`                              |
| 快速索引                                 | `cursor.md`                              |
| Electron 主进程 / 预加载 / IPC / 窗口    | `.agents/skills/electron/SKILL.md`       |
| 视频播放、独立窗口、`pendingPlay`        | `.agents/skills/video-playback/SKILL.md` |
| 页面/组件暗色模式（Cursor 按 glob 附加） | `.cursor/rules/dark-mode.mdc`            |

涉及视频播放或 Electron 桌面能力时，应先阅读对应 skill，再动手改代码。编辑 `src/pages/` 或 `src/components/` 时 Cursor 会自动附加暗色模式规则。

## 提交前检查

在提交代码或创建 PR 前，必须运行：

```bash
pnpm verify
```

推送到 `main`/`master` 或开启 PR 时，GitHub Actions 工作流 [`.github/workflows/verify.yml`](.github/workflows/verify.yml) 会在 Ubuntu 上执行相同的 `pnpm verify`（不含 Electron 打包）。

## 功能规划

### 已完成

- ✅ 项目基础框架搭建
- ✅ 主进程窗口管理
- ✅ 侧边栏导航组件
- ✅ 标题栏组件
- ✅ 路由系统配置
- ✅ 页面基础布局

### 开发中

- 🔄 视频播放核心功能
- 🔄 UI 界面优化

### 待实现

- 视频播放控制（播放/暂停、进度条、音量控制）
- 视频列表展示
- 搜索功能
- 播放历史记录
- 收藏功能
- 弹幕功能
- 视频下载
- 多语言支持
- 主题切换
- 快捷键支持

## 构建与发布

### 生产构建

```bash
# 构建应用（包含 TypeScript 检查、Vite 构建、Electron 打包）
pnpm build
```

构建完成后：

- 渲染进程代码会打包到 `dist/` 目录
- 主进程代码会编译到 `dist-electron/` 目录
- Electron 应用会打包到平台对应的安装包

### 跨平台构建

```bash
# Windows
pnpm build:win

# macOS
pnpm build:mac

# Linux
pnpm build:linux
```

## 联系方式

- 提交 Issue: https://github.com/Z-KongHou/Kong_Player/issues
- 邮箱: konghou0821@qq.com
