#!/usr/bin/env bash
# 批量处理菜单图：裁掉右下角（去 Gemini 水印）→ 800x800 正方形 → 输出 .png 到 public/images/menu/（覆盖后刷新网页即同步）
# 用法：把原图放进 ai_raw/，在本目录执行: ./process.sh
# 依赖：ImageMagick (brew install imagemagick / choco install imagemagick)

set -e
cd "$(dirname "$0")"
mkdir -p "../public/images/menu"
OUT="../public/images/menu"

# 裁掉画面右侧和下方各 N%，保留左上 (100-N)%。只去水印用 1–8，裁太多就改小
CROP_PERCENT=1
KEEP=$((100 - CROP_PERCENT))

# 输出文件名：转小写、空格改连字符，与 menu.ts 里路径一致。输出 .png 直接覆盖 public 里的图，网页即更新
slug() { echo "$1" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -d '&()'; }
count=0
for img in *.[jJ][pP][gG] *.[jJ][pP][eE][gG] *.[pP][nN][gG] 2>/dev/null; do
  [ -f "$img" ] || continue
  base="${img%.*}"
  out_base=$(slug "$base")
  echo "Processing: $img -> $OUT/${out_base}.png"
  convert "$img" \
    -crop "${KEEP}%x${KEEP}%+0+0" \
    +repage \
    -resize 800x800^ \
    -gravity center \
    -extent 800x800 \
    -quality 90 \
    "$OUT/${out_base}.png"
  count=$((count + 1))
done

echo "Done. Processed $count image(s) -> $OUT (refresh the site to see changes)"
