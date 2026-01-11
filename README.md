# 抬头望星 (Look Up At The Stars) - 现代化工具箱

## 项目概述
"抬头望星"是一个现代化的网页工具箱应用，采用静态网站架构，无需后端服务器支持，提供美观、高效的日常工具集合。

## 技术栈

### 前端 (Client)
- **框架**: Lit (Web Components)
- **构建工具**: Vite
- **语言**: JavaScript (ES6+)
- **样式**: CSS Variables, Glassmorphism (玻璃拟态)
- **特性**: 响应式设计, 动态主题, SPA路由, 纯前端运行

## 项目结构

```
root/
├── src/
│   ├── components/     # Web Components 组件库
│   │   ├── app-header.js       # 顶部导航栏
│   │   ├── app-sidebar.js      # 侧边栏 (含搜索)
│   │   ├── app-main.js         # 主内容区 (路由管理)
│   │   ├── settings-panel.js   # 设置面板 (主题/布局)
│   │   ├── auth-modal.js       # 登录/注册模态框
│   │   ├── timer-tool.js       # 计时器工具
│   │   ├── unit-converter.js   # 单位转换工具
│   │   ├── calculator-tool.js  # 计算器工具
│   │   └── ...
│   ├── app-root.js     # 根组件
│   └── index.css       # 全局样式与变量
├── index.html          # 入口文件
├── vite.config.js      # Vite 配置文件
└── package.json        # 项目配置
```

## 功能模块详情

### 1. 用户系统
- **模拟登录**: 前端模拟登录流程，无真实后端交互。
- **本地存储**: 用户状态保存在 LocalStorage。

### 2. 界面与交互
- **组件库**: 自定义日期选择器 (Date Picker)，玻璃拟态计算器等。
- **布局**: 顶部导航 + 左侧侧边栏 + 右侧内容区。
- **视觉**: 全局玻璃拟态设计。
- **主题**: 支持 6 种预设配色及自定义 HSL 颜色调节。

### 3. 工具箱
- **计时器**: 支持毫秒级计时，开始/暂停/重置。
- **单位转换**: 支持长度、重量、温度等多种单位实时转换。
- **计算器**: 基础算术运算，支持键盘输入。

### 4. 设置系统
- **个性化**: 
  - 支持6种界面语言 (中/繁/英/日/韩/阿)。
  - 字体大小调节 (12px-24px)。
  - 自定义主题色与6种预设主题。
  - 深色模式切换 (Dark Mode)，支持自动禁用主题配置。
- **系统配置**: 
  - 动画开关与速度调节。
  - 高对比度模式。
  - 通知偏好设置 (桌面通知/音效)。
  - 隐私权限管理。
- **数据管理**:
  - 本地存储所有设置。
  - 模拟云端同步（演示用）。
  - 设置备份与恢复 (本地文件/模拟云端快照)。
- **账户安全**:
  - 模拟密码修改。

## 开发与部署

### 环境要求
- Node.js v18+ (推荐 v20)

### 本地开发

1. **安装依赖**
   ```bash
   npm install
   ```

2. **启动开发服务器**
   ```bash
   npm run dev
   ```

### 部署到 GitHub Pages

1. **构建项目**
   ```bash
   npm run build
   ```
   构建产物将输出到 `dist` 目录。

2. **推送代码**
   将项目推送到 GitHub 仓库。

3. **开启 GitHub Pages**
   在 GitHub 仓库设置中，选择 `Settings` -> `Pages`。
   在 `Build and deployment` -> `Source` 中选择 `GitHub Actions` 或 `Deploy from a branch` (通常选择 `gh-pages` 分支或直接使用 `main` 分支的 `/root` 如果配置了 workflow，或者手动将 `dist` 目录内容推送到 `gh-pages` 分支)。

   **推荐方式 (使用 gh-pages 包)**:
   
   1. 安装 gh-pages:
      ```bash
      npm install gh-pages --save-dev
      ```
   
   2. 在 `package.json` 中添加脚本:
      ```json
      "scripts": {
        "deploy": "gh-pages -d dist"
      }
      ```
   
   3. 运行部署:
      ```bash
      npm run build
      npm run deploy
      ```
