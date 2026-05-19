# Kong Player — AI 上下文索引

**完整规范以 [AGENTS.md](./AGENTS.md) 为准**（always-on，请勿与本文重复维护）。

## 按需阅读

| 场景                                                      | 文档                                                                               |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 全局架构、分层、暗色模式、视频模块、AI 行为               | [AGENTS.md](./AGENTS.md)                                                           |
| Electron 主进程 / 预加载 / IPC / 窗口                     | [.agents/skills/electron/SKILL.md](./.agents/skills/electron/SKILL.md)             |
| 视频播放、独立窗口、`pendingPlay`                         | [.agents/skills/video-playback/SKILL.md](./.agents/skills/video-playback/SKILL.md) |
| 页面/组件暗色模式（编辑 `pages`/`components` 时自动附加） | [.cursor/rules/dark-mode.mdc](./.cursor/rules/dark-mode.mdc)                       |
| CI 验收（push / PR）                                      | [`.github/workflows/verify.yml`](.github/workflows/verify.yml)                     |

本文档仅作索引；具体规则已迁移至 `AGENTS.md`，不再在此重复。
