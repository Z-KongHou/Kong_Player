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

# 代码检查（在提交代码前必须运行）
pnpm lint

# 代码格式化
pnpm format

# 格式化检查
pnpm format:check

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
│  ├─ App.tsx             # 根组件（路由容器）
│  ├─ main.tsx            # React 应用入口
│  ├─ components/         # 可复用组件
│  │  ├─ SideBar.tsx      # 侧边栏导航组件
│  │  ├─ TitleBar.tsx     # 标题栏组件
│  │  └─ index.ts         # 组件导出
│  ├─ pages/              # 页面组件
│  │  ├─ Home.tsx         # 首页（包含标题栏）
│  │  ├─ About.tsx        # 关于页面
│  │  └─ LazyLanding.tsx  # 懒加载过渡页面
│  ├─ router/             # 路由配置
│  │  └─ index.tsx        # 路由定义
│  ├─ types/              # TypeScript 类型定义
│  │  └─ electron.ts      # Electron 相关类型
│  ├─ utils/              # 工具函数
│  │  └─ delay.ts         # 延迟工具函数
│  └─ index.css           # 全局样式
├─ dist-electron/         # Electron 构建输出（主进程）
└─ vite.config.ts         # Vite 配置文件
```

## 开发注意事项

1. **在修改代码前**：先阅读相关文件，理解现有的代码风格和架构
2. **使用 TypeScript**：确保所有新代码都有类型定义
3. **组件开发**：查看 `src/components/` 中现有组件的实现风格，保持一致性
4. **路由管理**：新页面需要在 `src/router/index.tsx` 中添加路由配置
5. **IPC 通信**：主进程与渲染进程通信需要在 `electron/main/ipc/` 中处理

## 提交前检查

在提交代码或创建 PR 前，必须运行以下命令：

```bash
# 代码检查（必须通过）
pnpm lint

# 格式化检查（必须通过）
pnpm format:check
```

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
