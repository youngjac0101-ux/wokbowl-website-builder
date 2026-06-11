#!/usr/bin/env python3
"""
sync-menu.py — 从 WokBrain 菜单 SSOT(vault V5.x CSV) 重新生成 src/data/menu.ts。

单一真源: ~/vault/projects/wokstation/05-pos-menu/WOKBOWL_Eposnow_FINAL.csv
改菜单只改 vault CSV(+灌 Supabase menu_items)，跑此脚本同步官网。

用法: python3 scripts/sync-menu.py
"""
import csv, os, re, json

CSV = os.path.expanduser("~/vault/projects/wokstation/05-pos-menu/WOKBOWL_Eposnow_FINAL.csv")
OUT = os.path.join(os.path.dirname(__file__), "..", "src", "data", "menu.ts")
IMG_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images", "menu")

# POS 分类 → 网站 5 分类（排除 modifier/drinks/meal-deals/rice-sides）
CAT_MAP = {
    "Signature Bowls": "wok-bowls", "Build Your Own": "wok-bowls", "Crunchy Wraps": "wok-bowls",
    "Fried Rice": "fried-rice",
    "Chow Mein": "noodles",
    "Wings": "wings",
    "Steamed Bites": "bites", "Fried Bites": "bites", "Snack Boxes": "bites",
}
EXCLUDE = {"Rice & Sides", "Meal Deals", "Drinks"}  # 不在官网展示

# tags: menu_items 标签风格 → 网站 tags(popular/vegan/spicy/new)。CSV 无 tags，按名启发
def tags_for(name):
    t = []
    n = name.lower()
    if any(k in n for k in ["honey chicken", "mongolian", "kung pao"]): t.append("popular")
    if any(k in n for k in ["tofu", "broccoli", "green bean", "vegetable"]): t.append("vegan")
    if any(k in n for k in ["sichuan", "chili", "chilli", "kung pao"]): t.append("spicy")
    if any(k in n for k in ["yuzu", "truffle", "duck"]): t.append("new")
    return t

def slug(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")

# 图片: 按 slug 模糊匹配现有图片，否则按分类默认
imgs = os.listdir(IMG_DIR) if os.path.isdir(IMG_DIR) else []
img_bases = {os.path.splitext(i)[0]: i for i in imgs}
# 手工映射(通用词如 chicken/beef 易误配,精确指定关键菜)
IMG_OVERRIDE = {
    "og-honey-chicken-bowl": "og-honey-chicken.jpg", "traditional-honey-chicken-bowl": "honey-chicken.png",
    "yuzu-honey-chicken-bowl": "honey-chicken.png", "mongolian-smoke-beef-bowl": "mongolian-smoke-beef.jpg",
    "sichuan-fire-beef-bowl": "sichuan-fire-beef.jpg", "sweet-sour-pork-bowl": "sweet-sour-pork-new.jpg",
    "salt-pepper-tofu-bowl": "salt-pepper-tofu.png", "garlic-broccoli-bowl": "garlic-broccoli.png",
    "kung-pao-chicken-bowl": "cashew-chicken.png", "orange-chicken-bowl": "honey-chicken.png",
    "chicken-fried-rice": "chicken-fried-rice.png", "angus-beef-fried-rice": "beef-fried-rice.png",
    "king-prawn-fried-rice": "prawn-fried-rice.png", "combo-fried-rice": "combo-rice.png",
    "chicken-chow-mein": "mongolian-beef.png", "beef-chow-mein": "black-pepper-beef.png",
    "har-gow-3pc": "har-gow.jpg", "chicken-spring-rolls-2pc": "chicken-spring-rolls.png",
    "vegetable-spring-rolls-2pc": "spring-rolls.png", "fried-wontons-3pc": "fried-wontons.png",
    "prawn-crackers": "prawn-crackers.png",
}
def image_for(item_id, name, cat):
    if item_id in IMG_OVERRIDE:
        return f"/images/menu/{IMG_OVERRIDE[item_id]}"
    s = slug(name)
    # 仅精确或强前缀匹配，避免通用词误配
    for base, img in img_bases.items():
        if base == s or (len(base) > 8 and (s.startswith(base) or base.startswith(s))):
            return f"/images/menu/{img}"
    defaults = {"wok-bowls": "og-honey-chicken.jpg", "fried-rice": "chicken-fried-rice.png",
                "noodles": "mongolian-beef.png", "wings": "honey-chicken.png", "bites": "spring-rolls.png"}
    return f"/images/menu/{defaults.get(cat, 'og-honey-chicken.jpg')}"

rows = list(csv.DictReader(open(CSV)))
items = []
for r in rows:
    pos_cat = r["Category Name"]
    if pos_cat in EXCLUDE or pos_cat.startswith("Modifier"):
        continue
    web_cat = CAT_MAP.get(pos_cat)
    if not web_cat:
        continue
    name = r["Product Name"].strip()
    # 去掉 "Bowl"/份量后缀让官网更简洁
    display = re.sub(r"\s+Bowl$", "", name)
    items.append({
        "id": slug(name),
        "name": display,
        "price": float(r["Selling Price"] or 0),
        "description": r["Product Description"].strip() or "Wok-fresh, made to order.",
        "image": image_for(slug(name), name, web_cat),
        "category": web_cat,
        "tags": tags_for(name),
    })

CATS = [("wok-bowls", "Wok Bowls"), ("fried-rice", "Fried Rice"),
        ("noodles", "Noodles"), ("wings", "Wings"), ("bites", "Bites")]
order = {c: i for i, (c, _) in enumerate(CATS)}
items.sort(key=lambda x: order[x["category"]])

def ts_item(it):
    tags = ", ".join(f'"{t}"' for t in it["tags"])
    desc = it["description"].replace('"', '\\"')
    return (f'  {{\n    id: "{it["id"]}",\n    name: "{it["name"]}",\n    price: {it["price"]:.2f},\n'
            f'    description: "{desc}",\n    image: "{it["image"]}",\n    category: "{it["category"]}",\n    tags: [{tags}],\n  }},')

header = '''export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: "wok-bowls" | "fried-rice" | "noodles" | "wings" | "bites";
  tags: string[];
}

export const menuCategories: { id: MenuItem["category"]; label: string }[] = [
''' + "\n".join(f'  {{ id: "{c}", label: "{l}" }},' for c, l in CATS) + '''
];

// AUTO-GENERATED from vault V5.x CSV by scripts/sync-menu.py — do not edit by hand.
export const menuItems: MenuItem[] = [
'''
with open(OUT, "w") as f:
    f.write(header + "\n".join(ts_item(it) for it in items) + "\n];\n")
print(f"generated {len(items)} items → src/data/menu.ts")
from collections import Counter
for c, n in Counter(it["category"] for it in items).items():
    print(f"  {c}: {n}")
