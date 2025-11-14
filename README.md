# Kong Player

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Electron](https://img.shields.io/badge/Electron-30.0.1-blue.svg)](https://electronjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1.6-blue.svg)](https://vitejs.dev/)

> 🎬 一个仿BiliBili的桌面端视频播放器应用

Kong Player 是一个基于 Electron + React + TypeScript + Vite 开发的桌面端视频播放器应用，灵感来源于BiliBili，旨在为用户提供流畅的视频观看体验。

## ✨ 特性

- 🚀 **现代化技术栈**: Electron + React 18 + TypeScript + Vite
- ⚡ **极速开发体验**: Vite提供快速的开发服务器和热更新
- 🎨 **响应式设计**: 适配不同屏幕尺寸的现代化UI界面
- 📺 **视频播放**: 支持多种视频格式和播放控制
- 🔄 **自动更新**: 内置应用自动更新功能
- 🎯 **跨平台**: 支持 Windows、macOS 和 Linux
- 🔧 **开发友好**: 完整的开发工具链配置 (ESLint + TypeScript)

## 🛠️ 技术栈

- **桌面端框架**: [Electron](https://electronjs.org/) v30.0.1
- **前端框架**: [React](https://reactjs.org/) v18.2.0
- **编程语言**: [TypeScript](https://www.typescriptlang.org/) v5.2.2
- **构建工具**: [Vite](https://vitejs.dev/) v5.1.6 + [vite-plugin-electron](https://github.com/electron-vite/vite-plugin-electron)
- **代码规范**: ESLint + TypeScript
- **包管理**: pnpm/npm/yarn

## 📦 安装

### 环境要求

- Node.js >= 18.0.0
- 包管理器: pnpm/npm/yarn

### 快速开始

```bash
# 克隆项目
git clone https://github.com/your-username/kong-player.git
cd kong-player

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## 🚀 开发

### 可用脚本

```bash
# 开发模式 (同时启动Vite和Electron)
pnpm dev

# 代码检查和格式化
pnpm lint

# 构建应用 (TypeScript编译 + Vite构建 + Electron打包)
pnpm build

# 预览构建结果
pnpm preview
```

### 项目结构

```
├─ electron/          # Electron主进程和预加载脚本
│  ├─ main.ts        # 主进程入口文件
│  ├─ preload.ts     # 预加载脚本
│  └─ electron-env.d.ts
├─ public/           # 静态资源
├─ src/              # React渲染进程源码
│  ├─ App.tsx        # 根组件
│  ├─ main.tsx       # React应用入口
│  ├─ assets/        # 组件静态资源
│  ├─ components/    # React组件
│  ├─ App.css        # 根组件样式
│  └─ index.css      # 全局样式
├─ dist/             # Vite构建输出 (渲染进程)
├─ dist-electron/    # Electron构建输出 (主进程)
└─ vite.config.ts    # Vite配置文件
```

### 开发架构

本项目采用 **vite-plugin-electron** 插件，实现了：

- **主进程** (`electron/main.ts`): 控制应用窗口、系统交互
- **预加载脚本** (`electron/preload.ts`): 安全地暴露API给渲染进程
- **渲染进程** (`src/`): 标准的React应用，使用Vite构建

## 🎯 功能规划

### 核心功能
- [ ] 视频播放控制 (播放/暂停、进度条、音量控制)
- [ ] 视频列表展示
- [ ] 搜索功能
- [ ] 播放历史记录
- [ ] 收藏功能

### 高级功能
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

开发模式下，Vite会启动一个开发服务器，Electron会加载这个开发服务器的URL。

### 生产构建

```bash
# 构建应用 (包含TypeScript检查、Vite构建、Electron打包)
pnpm build
```

构建完成后：
- 渲染进程代码会打包到 `dist/` 目录
- 主进程代码会编译到 `dist-electron/` 目录
- Electron应用会打包到平台对应的安装包

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
配置Vite插件，整合Electron和React开发流程：
```typescript
electron({
  main: { entry: 'electron/main.ts' },
  preload: { input: 'electron/preload.ts' },
  renderer: {}
})
```

### electron/main.ts
Electron主进程文件，负责：
- 创建和管理应用窗口
- 处理应用生命周期
- 加载渲染进程

### electron/preload.ts
预加载脚本，安全地暴露Electron API给渲染进程使用。

## 📝 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

## 🙏 致谢

- [Electron](https://electronjs.org/) - 跨平台桌面应用框架
- [React](https://reactjs.org/) - 用户界面库
- [Vite](https://vitejs.dev/) - 极速的前端构建工具
- [vite-plugin-electron](https://github.com/electron-vite/vite-plugin-electron) - Vite + Electron 集成方案

## 📞 支持

如果您有任何问题或建议，请通过以下方式联系我们：

- 提交 [Issue](https://github.com/your-username/kong-player/issues)
- 发送邮件至: your-email@example.com

---

⭐ 如果这个项目对您有帮助，请给我们一个 Star！
