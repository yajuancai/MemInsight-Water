# Membraneinsight water — 有机膜结构–性能数据库

科研数据工作台：**检索 · 筛选 · 分析 · 导出**

## 一键本地打开（推荐）

在项目文件夹中 **双击** 以下任一文件即可启动网站（会自动打开浏览器）：

- `打开 Membraneinsight Water.bat`
- `start.bat`

默认地址：**http://localhost:5173**

> 请勿直接双击 `index.html`，需通过上述脚本启动开发服务器。

可将 `打开 Membraneinsight Water.bat` **发送到桌面快捷方式**，随时双击打开。

## 功能概览

| 章节 | 功能 |
|------|------|
| 首页 | 科技风入口、膜孔道动画、实时统计 |
| 数据库总览 | 六大模块卡片 + 结构–性能知识网络 |
| 数据筛选工作台 | 多条件筛选、滑块、排序、自定义列、XLSX 导出 |
| 可视化分析 | 散点 / 热力 / 箱线 / 雷达图 |
| 导出与工作区 | 收藏、保存筛选、批量对比、论文数据集 |
| AI 工具 | 路线图占位（可扩展） |
| 团队 | 使命、能力、成员、Research Impact |

- **中英文切换**（顶栏）
- **白天 / 黑夜模式**（默认深色科研风）
- **纵向全屏滚动**（scroll-snap + 右侧章节指示器）

## 在线分享（GitHub Pages）

将项目上传到 GitHub 后，可自动生成公开链接供他人访问（无需本地安装 Node.js）。

### 第一次部署

1. 安装 [Git](https://git-scm.com/download/win) 并重启终端  
2. 在 [GitHub](https://github.com/new) 新建仓库（例如 `MemInsight-Water`，**不要**勾选 “Add a README”）  
3. 在项目文件夹打开终端，执行：

```bash
cd "e:\cyj-LLM\MemInsight Water"
git init
git add .
git commit -m "Initial commit: Membraneinsight water"
git branch -M main
git remote add origin https://github.com/你的用户名/MemInsight-Water.git
git push -u origin main
```

4. 打开 GitHub 仓库 → **Settings** → **Pages** → **Build and deployment**  
   - Source 选 **Deploy from a branch**  
   - Branch 选 **gh-pages**，文件夹选 **/ (root)**  
   - ⚠️ 不要选 `main` 分支根目录，否则会白屏（发布的是未构建源码）  
5. 推送代码后，在 **Actions** 等待 **Deploy to GitHub Pages** 跑完（约 2–3 分钟），访问：

`https://你的用户名.github.io/MemInsight-Water/`

> 仓库名必须与 URL 中的路径一致。若仓库名不同，链接中的 `MemInsight-Water` 请改成你的仓库名。

之后每次 `git push`，网站会自动更新。

---

```bash
cd "e:\cyj-LLM\MemInsight Water"
npm install
npm run dev
```

浏览器打开终端显示的地址（一般为 `http://localhost:5173`）。

## 技术栈

- React 18 + TypeScript + Vite
- Tailwind CSS（dark mode）
- i18next（中/英）
- Recharts（图表）
- xlsx（导出）
- Framer Motion（首页动画）

## 数据说明

当前使用 `src/data/mockMembranes.ts` 中的 **120 条模拟记录**。接入真实后端时，替换该数据源并保持 `MembraneRecord` 类型即可。

## 后续扩展建议

1. REST / GraphQL API 对接真实文献与性能库  
2. 筛选工作台分页与虚拟滚动（大数据量）  
3. AI 章节对接 LLM 自然语言检索  
4. 各总览模块独立路由或弹层详情表  
