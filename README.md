# Kong Player

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Electron](https://img.shields.io/badge/Electron-38.1.2-blue.svg)](https://electronjs.org/)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)

> 🎬 一个仿BiliBili的桌面端视频播放器应用

Kong Player 是一个基于 Electron + React + TypeScript 开发的桌面端视频播放器应用，灵感来源于BiliBili，旨在为用户提供流畅的视频观看体验。

## ✨ 特性

- 🚀 **现代化技术栈**: Electron + React 19 + TypeScript + Vite
- 🎨 **响应式设计**: 适配不同屏幕尺寸的现代化UI界面
- 📺 **视频播放**: 支持多种视频格式和播放控制
- 🔄 **自动更新**: 内置应用自动更新功能
- 🎯 **跨平台**: 支持 Windows、macOS 和 Linux
- 🔧 **开发友好**: 完整的开发工具链配置

## 🛠️ 技术栈

- **桌面端框架**: [Electron](https://electronjs.org/) v38.1.2
- **前端框架**: [React](https://reactjs.org/) v19.1.1
- **编程语言**: [TypeScript](https://www.typescriptlang.org/) v5.9.2
- **构建工具**: [Vite](https://vitejs.dev/) v7.1.6 + [electron-vite](https://electron-vite.org/) v4.0.1
- **代码规范**: ESLint + Prettier
- **包管理**: pnpm

## 📦 安装

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

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
# 开发模式
pnpm dev

# 代码格式化
pnpm format

# 代码检查
pnpm lint

# 类型检查
pnpm typecheck

# 构建应用
pnpm build

# 构建各平台安装包
pnpm build:win    # Windows
pnpm build:mac    # macOS
pnpm build:linux  # Linux
```

### 项目结构

```
src/
├── main/          # Electron 主进程代码
├── preload/       # 预加载脚本
└── renderer/      # 渲染进程 (React 应用)
    ├── src/
    │   ├── components/  # React 组件
    │   ├── assets/    # 静态资源
    │   ├── App.tsx    # 主应用组件
    │   └── main.tsx   # React 应用入口
    └── index.html     # HTML 模板
```

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

### 构建应用

```bash
# 构建所有平台
pnpm build

# 构建特定平台
pnpm build:win    # Windows 安装包
pnpm build:mac    # macOS 安装包  
pnpm build:linux  # Linux 安装包
```

构建完成后，安装包将生成在 `dist/` 目录中。

### 自动更新

应用已配置自动更新功能，发布新版本后用户将收到更新提示。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！在贡献代码之前，请确保：

1. Fork 本项目
2. 创建您的功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

### 开发规范

- 使用 TypeScript 进行开发
- 遵循 ESLint 和 Prettier 的代码规范
- 编写清晰的提交信息
- 添加必要的注释和文档

## 📝 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

## 🙏 致谢

- [Electron](https://electronjs.org/) - 跨平台桌面应用框架
- [React](https://reactjs.org/) - 用户界面库
- [Vite](https://vitejs.dev/) - 快速的前端构建工具
- [electron-vite](https://electron-vite.org/) - Electron + Vite 集成方案

## 📞 支持

如果您有任何问题或建议，请通过以下方式联系我们：

- 提交 [Issue](https://github.com/your-username/kong-player/issues)
- 发送邮件至: your-email@example.com

---

⭐ 如果这个项目对您有帮助，请给我们一个 Star！
