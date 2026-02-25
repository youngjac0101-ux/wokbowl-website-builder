# 菜单图批量处理（去水印）

网页显示的菜单图来自 **`public/images/menu/`**。只有用本脚本**重新生成并覆盖**那里的文件，页面上的图才会变。

## 为什么“图片没变”？

- 脚本会**覆盖** `public/images/menu/` 里同名的 PNG，不会改别的地方。
- 必须同时满足：
  1. **把原始图（带水印）放进 `ai_raw/`**
  2. **本机已安装 ImageMagick**
  3. **在 `ai_raw/` 目录下执行** `./process.sh`（或 `bash process.sh`）

如果从没在 `ai_raw/` 里放过图、或没装 ImageMagick、或没在正确目录运行脚本，`public` 里的图就不会被更新，网页会一直是最开始的那批。

## 使用步骤

```bash
# 1. 安装 ImageMagick（未安装则脚本不会生效）
# macOS:
brew install imagemagick
# Windows (管理员 PowerShell):
choco install imagemagick
# 或用 Git Bash / WSL 运行脚本

# 2. 把要处理的原图（含右下角水印）复制到 ai_raw/ 目录

# 3. 在项目里进入 ai_raw 并执行
cd ai_raw
./process.sh
# Windows 无 Git Bash 时可用: bash process.sh
```

脚本会：裁掉右下角一定比例（去水印）→ 缩成 800×800 → 输出到 `public/images/menu/` 的 **.png**，文件名与菜单一致（如 `mongolian-beef.png`），**直接覆盖**原文件。

## 替换图后仍看到旧图？

浏览器会缓存图片。可以：

1. **强刷**：`Ctrl+Shift+R`（Windows）或 `Cmd+Shift+R`（Mac）
2. **改版本号**：在项目根目录建或改 `.env`，加一行  
   `VITE_MENU_IMAGE_VERSION=2`  
   换图后改成 `3`、`4`… 再刷新，就会重新拉新图。

## 调整

- **水印还在**：在 `process.sh` 里把 `CROP_PERCENT=25` 调大（如 28、30），再跑一次。
- **输出尺寸**：脚本里 `800x800` 可改。
