# Kong Player

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Electron](https://img.shields.io/badge/Electron-30.0.1-blue.svg)](https://electronjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1.6-blue.svg)](https://vitejs.dev/)

> 🎬 一个基于 Electron + React + TypeScript + Vite 开发的桌面端视频播放器应用框架

Kong Player 是一个现代化的桌面端视频播放器应用框架，采用 Electron + React + TypeScript + Vite + TailwindCSS 技术栈开发，目前处于基础框架搭建阶段。

## ✨ 当前状态

- ✅ **基础框架**: Electron + React 18 + TypeScript + Vite + TailwindCSS 已配置完成
- ✅ **UI组件**: 侧边栏导航、标题栏等基础UI组件已实现
- ✅ **路由系统**: React Router 已配置，支持页面导航
- 🔄 **开发中**: 视频播放核心功能正在开发
- ⏳ **待实现**: 视频播放、播放控制、视频列表等功能

## ✨ 已完成功能

- 🚀 **现代化技术栈**: Electron + React 18 + TypeScript + Vite + TailwindCSS
- ⚡ **极速开发体验**: Vite 提供快速的开发服务器和热更新
- 🎨 **响应式UI框架**: 适配不同屏幕尺寸的现代化 UI 界面框架
- 🔧 **开发友好**: 完整的开发工具链配置 (ESLint + TypeScript + Prettier)
- 📁 **项目结构**: 清晰的项目架构和代码组织

## 🛠️ 技术栈

- **桌面端框架**: [Electron](https://electronjs.org/) v30.0.1
- **前端框架**: [React](https://reactjs.org/) v18.2.0
- **编程语言**: [TypeScript](https://www.typescriptlang.org/) v5.2.2
- **构建工具**: [Vite](https://vitejs.dev/) v5.1.6 + [vite-plugin-electron](https://github.com/electron-vite/vite-plugin-electron)
- **样式框架**: [TailwindCSS](https://tailwindcss.com/) v4.1.17
- **代码规范**: ESLint + TypeScript + Prettier
- **包管理**: pnpm
- **路由**: React Router v7.9.6

## 📦 安装

### 环境要求

- Node.js >= 18.0.0
- 包管理器: pnpm

### 快速开始

```bash
# 克隆项目
git clone https://github.com/Z-KongHou/kong-player.git
cd kong-player

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## 🚀 开发

### 可用脚本

```bash
# 开发模式 (启动Vite开发服务器)
pnpm dev

# 代码检查
pnpm lint

# 代码格式化
pnpm format

# 格式化检查
pnpm format:check

# 构建应用 (TypeScript编译 + Vite构建 + Electron打包)
pnpm build

# 预览构建结果
pnpm preview
```

### 项目结构

```
├─ electron/          # Electron主进程和预加载脚本
│  ├─ main/            # 主进程相关文件
│  │  ├─ main.ts       # 主进程入口文件
│  │  ├─ ipc/          # IPC通信处理
│  │  ├─ services/     # 服务层
│  │  └─ windows/      # 窗口管理
│  └─ preload/         # 预加载脚本
│     └─ preload.ts    # 预加载脚本
├─ public/             # 静态资源
├─ src/                # React渲染进程源码
│  ├─ App.tsx          # 根组件（路由容器）
│  ├─ main.tsx         # React应用入口
│  ├─ components/      # 可复用组件
│  │  ├─ SideBar.tsx   # 侧边栏导航组件
│  │  ├─ TitleBar.tsx  # 标题栏组件
│  │  └─ index.ts      # 组件导出
│  ├─ pages/           # 页面组件
│  │  ├─ Home.tsx      # 首页（包含标题栏）
│  │  ├─ About.tsx     # 关于页面
│  │  └─ LazyLanding.tsx # 懒加载过渡页面
│  ├─ router/          # 路由配置
│  │  └─ index.tsx     # 路由定义
│  ├─ types/           # TypeScript类型定义
│  │  └─ electron.ts   # Electron相关类型
│  ├─ utils/           # 工具函数
│  │  └─ delay.ts      # 延迟工具函数
│  └─ index.css        # 全局样式
├─ dist-electron/      # Electron构建输出 (主进程)
└─ vite.config.ts      # Vite配置文件
```

### 开发架构

本项目采用 **vite-plugin-electron** 插件，实现了：

- **主进程** (`electron/main/`): 控制应用窗口、系统交互、IPC通信
- **预加载脚本** (`electron/preload/`): 安全地暴露 API 给渲染进程
- **渲染进程** (`src/`): 标准的 React 应用，使用 Vite 构建，采用SPA模式
- **路由管理** (`src/router/`): React Router 配置，App.tsx作为路由容器

## 🎯 功能规划

### 已完成

- ✅ 项目基础框架搭建
- ✅ 主进程窗口管理
- ✅ 侧边栏导航组件
- ✅ 标题栏组件
- ✅ 路由系统配置
- ✅ 页面基础布局

### 开发中

- 🔄 视频播放核心功能
- 🔄 UI界面优化

### 待实现

#### 核心功能

- [ ] 视频播放控制 (播放/暂停、进度条、音量控制)
- [ ] 视频列表展示
- [ ] 搜索功能
- [ ] 播放历史记录
- [ ] 收藏功能

#### 高级功能

- [ ] 弹幕功能
- [ ] 视频下载
- [ ] 多语言支持
- [ ] 主题切换
- [ ] 快捷键支持

## 🔧 构建与发布

### 开发环境

```bash
# 启动开发服务器
pnpm dev
```

开发模式下，Vite 会启动一个开发服务器，Electron 会加载这个开发服务器的 URL。

### 生产构建

```bash
# 构建应用 (包含TypeScript检查、Vite构建、Electron打包)
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

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！在贡献代码之前，请确保：

1. Fork 本项目
2. 创建您的功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

### 开发规范

- 使用 TypeScript 进行开发
- 遵循 ESLint 的代码规范
- 编写清晰的提交信息
- 添加必要的注释和文档

## 📁 核心文件说明

### vite.config.ts

配置 Vite 插件，整合 Electron 和 React 开发流程：

```typescript
electron({
  main: { entry: 'electron/main/main.ts' },
  preload: { input: 'electron/preload/preload.ts' },
  renderer: {},
})
```

### electron/main/main.ts

Electron 主进程文件，负责：

- 创建和管理应用窗口
- 处理应用生命周期
- 加载渲染进程
- 初始化IPC通信处理

### electron/preload/preload.ts

预加载脚本，安全地暴露 Electron API 给渲染进程使用。

### src/App.tsx

React根组件，采用SPA模式，仅作为路由容器，负责整体布局结构。

### src/router/index.tsx

React Router配置，定义应用路由结构，包含懒加载和过渡效果处理。

## 📝 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

## 🙏 致谢

- [Electron](https://electronjs.org/) - 跨平台桌面应用框架
- [React](https://reactjs.org/) - 用户界面库
- [Vite](https://vitejs.dev/) - 极速的前端构建工具
- [vite-plugin-electron](https://github.com/electron-vite/vite-plugin-electron) - Vite + Electron 集成方案

## 📞 支持

如果您有任何问题或建议，请通过以下方式联系我们：

- 提交 [Issue](https://github.com/Z-KongHou/Kong_Player/issues)
- 发送邮件至: konghou0821@qq.com

---

⭐ 如果这个项目对您有帮助，请给我们一个 Star！
