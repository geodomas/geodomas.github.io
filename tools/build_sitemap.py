#!/usr/bin/env python3
import html, json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
SNAP=ROOT/'knowledge/iskra_public_snapshot.json'
BASE='https://geodomas.github.io/'

def slug(v): return str(v).lower().replace('_','-')
def main():
    snap=json.load(open(SNAP))
    urls=[
        ('', '1.0'),
        ('academy/', '0.95'),
        ('academy/compare.html','0.85'),
        ('academy/brief-builder.html','0.85'),
        ('academy/project-start.html','0.90'),
        ('academy/ai-training.html','0.75'),
        ('lab/','0.85'),
    ]
    urls += [(f'academy/families/{slug(f["id"])}.html','0.88') for f in snap['families']]
    lastmod=snap.get('snapshot_date') or '2026-09-16'
    lines=['<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for path,prio in urls:
        lines += ['  <url>',f'    <loc>{html.escape(BASE+path)}</loc>',f'    <lastmod>{lastmod}</lastmod>',f'    <priority>{prio}</priority>','  </url>']
    lines.append('</urlset>')
    (ROOT/'sitemap.xml').write_text('\n'.join(lines)+'\n')
    print(f'generated sitemap with {len(urls)} URLs')
if __name__=='__main__': main()
