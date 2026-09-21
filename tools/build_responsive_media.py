#!/usr/bin/env python3
from __future__ import annotations
import hashlib, json, shutil, subprocess
from pathlib import Path
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
SRC=ROOT/'assets/media'
OUT=SRC/'responsive'
SOURCES={
    'hero.webp':[640,960,1440,1920],
    'glamping.webp':[480,800,1200],
    'homes.webp':[480,800,1200],
    'glass.webp':[480,800,1200],
    'academy.webp':[480,800,1200],
}
WEBP_Q='82'
AVIF_Q='55'

def sha256(p:Path)->str:
    h=hashlib.sha256()
    with p.open('rb') as f:
        for chunk in iter(lambda:f.read(1024*1024),b''): h.update(chunk)
    return h.hexdigest()

def run(cmd:list[str]):
    subprocess.run(cmd,check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)

def identify_size(p:Path)->tuple[int,int]:
    out=subprocess.check_output(['identify','-format','%w %h',str(p)],text=True).strip().split()
    return int(out[0]),int(out[1])

def main():
    if not shutil.which('cwebp'): raise SystemExit('cwebp missing')
    if not shutil.which('convert'): raise SystemExit('ImageMagick convert missing')
    OUT.mkdir(parents=True,exist_ok=True)
    expected={'manifest.json'}
    manifest={'schema':2,'webp_quality':int(WEBP_Q),'avif_quality':int(AVIF_Q),'sources':{}}
    for name,widths in SOURCES.items():
        src=SRC/name
        if not src.exists(): raise SystemExit(f'missing source: {src}')
        with Image.open(src) as im: sw,sh=im.size
        rec={'source':name,'source_sha256':sha256(src),'source_width':sw,'source_height':sh,'source_bytes':src.stat().st_size,'variants':[]}
        stem=src.stem
        for w in widths:
            if w>sw: continue
            avif=OUT/f'{stem}-{w}.avif'
            expected.add(avif.name)
            if w==sw:
                webp=src
                webp_path=f'assets/media/{src.name}'
            else:
                webp=OUT/f'{stem}-{w}.webp'
                webp_path=f'assets/media/responsive/{webp.name}'
                expected.add(webp.name)
                run(['cwebp','-quiet','-q',WEBP_Q,'-m','6','-resize',str(w),'0',str(src),'-o',str(webp)])
            run(['convert',str(src),'-resize',f'{w}x','-quality',AVIF_Q,str(avif)])
            with Image.open(webp) as imw: ww,wh=imw.size
            aw,ah=identify_size(avif)
            if ww!=w or aw!=w:
                raise SystemExit(f'bad width for {name} {w}: webp={ww} avif={aw}')
            if abs((ww/wh)-(sw/sh))>0.01 or abs((aw/ah)-(sw/sh))>0.01:
                raise SystemExit(f'bad aspect for {name} {w}: source={sw}x{sh} webp={ww}x{wh} avif={aw}x{ah}')
            rec['variants'].append({
                'width':w,
                'webp':{'height':wh,'path':webp_path,'bytes':webp.stat().st_size,'sha256':sha256(webp)},
                'avif':{'height':ah,'path':f'assets/media/responsive/{avif.name}','bytes':avif.stat().st_size,'sha256':sha256(avif)},
            })
        manifest['sources'][name]=rec
    for p in OUT.iterdir():
        if p.is_file() and p.name not in expected: p.unlink()
    (OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
    count=sum(len(x['variants']) for x in manifest['sources'].values())
    print(f'generated responsive media for {len(SOURCES)} sources: {count} sizes × 2 formats')
if __name__=='__main__': main()
