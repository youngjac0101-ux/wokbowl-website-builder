#!/usr/bin/env python3
# 从 ~/Desktop/WOKBOWL_Menu_Photos/{n}.jpg(.png/.jpeg) 读图 → 压缩接入网站
# 文件夹 = 唯一真源:有几张接几张,菜单 id 按编号对应。
from PIL import Image
import os, glob, re
WEB=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC=os.path.expanduser('~/Desktop/WOKBOWL_Menu_Photos')
# 读有序 id(1-48)
ids={}
src=open(os.path.join(WEB,'src/data/menu.ts')).read()
blocks=re.findall(r'\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*price:\s*[0-9.]+,[\s\S]*?category:\s*"([^"]+)"',src)
def grp(i,c):
    if i.startswith('byo-'):return 2
    if 'wrap' in i:return 3
    return {'wok-bowls':1,'fried-rice':4,'noodles':5,'wings':6,'bites':7}.get(c,9)
ordered=[]
for g in [1,2,3,4,5,6,7]:
    for i,n,c in blocks:
        if grp(i,c)==g: ordered.append((i,n))
for k,(iid,nm) in enumerate(ordered,1): ids[k]=(iid,nm)
# 清旧 web-*,从文件夹重建
for f in glob.glob(os.path.join(WEB,'public/images/menu/web-*.jpg')): os.remove(f)
entries=[]
for n in range(1,49):
    found=None
    for ext in ('jpg','jpeg','png','JPG','PNG','HEIC','heic'):
        p=os.path.join(SRC,f'{n}.{ext}')
        if os.path.exists(p): found=p; break
    if not found: continue
    im=Image.open(found).convert('RGB'); w,h=im.size
    if w>1000: im=im.resize((1000,int(h*1000/w)))
    im.save(os.path.join(WEB,f'public/images/menu/web-{n}.jpg'),quality=82,optimize=True)
    entries.append((n,*ids[n]))
entries.sort()
lines=['// Menu photo overrides — itemId → image. Source of truth:',
'// ~/Desktop/WOKBOWL_Menu_Photos/{dish-number}.jpg  (run scripts/wire-menu-photos.py)',
'export const MENU_PHOTOS: Record<string, string> = {']
for n,iid,nm in entries: lines.append(f'  "{iid}": "/images/menu/web-{n}.jpg", // {n}. {nm}')
lines.append('};')
open(os.path.join(WEB,'src/data/menuPhotos.ts'),'w').write('\n'.join(lines)+'\n')
print(f'接入 {len(entries)} 道')
