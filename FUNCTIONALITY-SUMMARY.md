# THE WOKBOWL 网站 — 功能总结

> 当前版本功能概览（基于现有代码与配置）

---

## 一、技术栈与脚本

| 项目 | 说明 |
|------|------|
| **框架** | React 18 + TypeScript + Vite |
| **样式** | Tailwind CSS + 全局 CSS 变量（见 CLAUDE.md 设计系统） |
| **路由** | React Router（首页 `/` + 404） |
| **脚本** | `npm run dev` 开发 | `npm run build` 构建 | `npm run lint` 检查 | `npm run test` 测试 |

---

## 二、页面结构（单页滚动）

首页为单页长卷，自上而下区块顺序：

| 序号 | 区块 | 组件 | 说明 |
|------|------|------|------|
| 1 | **导航栏** | `Navbar` | 固定顶部：Logo、桌面导航链接、Order 按钮；移动端汉堡菜单打开侧栏 |
| 2 | **Hero** | `HeroSection` | 首屏：品牌名、标语、副标题、CTA 按钮（含跳转菜单） |
| 3 | **图片带** | `ImageBand` | 全宽图片区（占位/品牌图） |
| 4 | **Our Story / 4F** | `FourFSection` | 品牌故事与 4F 卖点（Fast / Fusion / Fresh / Future） |
| 5 | **菜单** | `MenuSection` | 分类标签 + 菜品卡片网格 |
| 6 | **How It Works** | `HowItWorks` | 三步流程：Pick → Wok → Enjoy |
| 7 | **Find Us** | `FindUs` | 地图与联系信息 |
| 8 | **Order CTA** | `OrderCTA` | 橙色横幅 + 外送平台按钮 |
| 9 | **页脚** | `Footer` | 品牌、链接、社交、版权 |

---

## 三、核心功能

### 1. 导航与锚点

- **桌面端**：Navbar 链接（Menu / Our Story / How It Works / Find Us）点击后**平滑滚动**到对应区块（`#menu`、`#story`、`#how-it-works`、`#find-us`）。
- **移动端侧栏**：打开汉堡菜单后，侧栏内每个导航项**可点击**，会先**关闭侧栏**，再**平滑滚动**到对应区块；与桌面端指向同一批锚点。
- **Skip to content**：无障碍“跳到主内容”链接（键盘聚焦可见）。

### 2. 菜单（Menu）

- **数据驱动**：所有菜品与分类来自 `src/data/menu.ts`（23 道菜品、5 个分类）。
- **分类**：Wok Bowls / Specialised Fried Rice / Shared Wok Boxes / Sides & Snacks / Drinks Station。
- **交互**：
  - 分类标签栏可**左右滑动**（触摸或鼠标拖拽）；
  - **左右箭头**在可滚动时显示，点击可横向滚动标签栏；
  - 点击某分类会切换当前分类并将该标签**滚到可见区域**。
- **卡片**：每道菜显示图片、名称、价格、短描述、标签（如 Popular / Vegan / Spicy）；图片加载失败时显示“Photo coming soon”占位。
- **说明**：仅在「Wok Bowls」分类下显示“All bowls include your choice of base...”；底部固定过敏提示文案。

### 3. 外送与外部链接

- **Order 按钮**：Navbar 与 Order CTA 区块中的“Order Now”等按钮指向**外送平台链接**（UberEats / DoorDash / Menulog），数据来自 `src/data/platformLinks.ts`，新标签打开。

### 4. 站点配置

- 品牌名、标语、地址、电话、营业时间、地图嵌入、社交链接、SEO 等均在 `src/data/siteConfig.ts` 中配置，**无在组件内硬编码**，便于维护。

---

## 四、数据与配置文件

| 文件 | 用途 |
|------|------|
| `src/data/menu.ts` | 菜品列表（id、name、price、description、image、category、tags）、分类列表 `menuCategories` |
| `src/data/siteConfig.ts` | 品牌信息、地址、电话、营业时间、地图 URL、社交链接、`navLinks`（导航文案与锚点） |
| `src/data/platformLinks.ts` | 外送平台链接（ubereats / doordash / menulog 等） |

修改菜单、价格、联系方式、导航文案或外送链接时，只需改上述数据文件，无需改组件逻辑。

---

## 五、当前不做的事（Phase 1 范围外）

- 站内**在线点餐、支付、用户账号**
- **博客 / 文章**
- 多语言（当前仅英文）
- Lovable 相关功能已移除（见历史修改）

---

## 六、开发与部署

- **本地**：`npm run dev` → 默认 `http://localhost:8080`
- **构建**：`npm run build` → 输出到 `dist/`
- **规范**：品牌、设计、结构、禁止项等以 **CLAUDE.md** 为准；功能以本文为概览。

---

*文档更新与代码一致即可；有新增区块或功能时建议同步更新此总结。*
