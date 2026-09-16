#!/usr/bin/env python3
from __future__ import annotations
import html, json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
SNAP=ROOT/'knowledge/iskra_public_snapshot.json'
OUT=ROOT/'academy/families'
BASE='https://geodomas.github.io'
IMG={'GLAMPING':'glamping.webp','HOMES':'homes.webp','GLAZED':'glass.webp','ROOFS':'hero.webp','MONOLIT':'hero.webp','CRYSTAL_DOME':'academy.webp','EDU_LINE':'academy.webp','INFINITY':'academy.webp'}

def esc(v): return html.escape(str(v if v is not None else ''), quote=True)
def slug(v): return str(v).lower().replace('_','-')
def authority(v):
    if 'specialist_current' in str(v): return 'CURRENT SPECIALIST SNAPSHOT'
    if 'public_direction' in str(v): return 'PUBLIC DIRECTION'
    return str(v).replace('_',' ').upper()
def model_items(f):
    direct=f.get('primary_models') or f.get('active_model_families') or f.get('public_reference_models') or []
    if direct: return direct
    if f.get('diameter_routes_m'): return [{'id':f"Ø{x} m route",'status':'public routing'} for x in f['diameter_routes_m']]
    if f.get('standard_diameter_routes_m'):
        a=[{'id':f"Ø{x} m",'status':'standard route'} for x in f['standard_diameter_routes_m']]
        if f.get('special_project_routes_m'):
            a.append({'id':f"Special Ø{f['special_project_routes_m'][0]}–{f['special_project_routes_m'][-1]} m",'status':'special project route'})
        return a
    if f.get('reference_model'): return [f['reference_model']]
    if f.get('base_identity'):
        b=f['base_identity']; return [{'id':f"Ø{b.get('diameter_m','?')} m",'status':f"{b.get('floor_area_m2_approx','?')} m² approx. base identity"}]
    return [{'id':'Project-routed configuration','status':'current public orientation'}]
def model_label(m):
    if isinstance(m,str): return m
    base=m.get('id') or m.get('name') or 'Model route'
    bits=[base]
    if m.get('diameter_m') is not None: bits.append(f"Ø{m['diameter_m']} m")
    if m.get('area_m2') is not None: bits.append(f"{m['area_m2']} m²")
    return ' · '.join(map(str,bits))
def model_status(m):
    if isinstance(m,str): return 'public orientation'
    return m.get('program') or m.get('role') or m.get('status') or m.get('release') or m.get('maturity') or m.get('production_release') or 'public orientation'
def tech_items(f):
    vals=f.get('technology_levels') or f.get('technology_directions') or f.get('facade_modes') or f.get('configurations') or []
    out=[]
    for x in vals:
        out.append(f"{x.get('id')}: {x.get('meaning')}" if isinstance(x,dict) else str(x))
    return out or ['Project-specific configuration.']

def render(f, all_f, snap):
    fid=f['id']; sl=slug(fid); title=f['title']; description=f"{f['summary']} GEODOMAS public product orientation with model routes and verification boundaries."
    canonical=f"{BASE}/academy/families/{sl}.html"; image=f"{BASE}/assets/media/{IMG.get(fid,'academy.webp')}"
    models=model_items(f); tech=tech_items(f); notes=' '.join(f.get('notes') or []) or 'Final structural, envelope, legal and commercial claims remain project-specific.'
    meta=[f"{len(models)} PUBLIC MODEL / ROUTE ITEMS",f"{len(tech)} CONFIGURATION ITEMS",'ENGINEERING GATE PRESERVED']
    best=''.join(f'<li>{esc(x)}</li>' for x in f.get('best_for',[])); advantages=''.join(f'<li>{esc(x)}</li>' for x in f.get('safe_advantages',[])); steps=''.join(f'<li>{esc(x)}</li>' for x in f.get('project_start',[]));
    model_html=''.join(f'<div class="model"><strong>{esc(model_label(m))}</strong><small>{esc(model_status(m))}</small></div>' for m in models)
    tech_html=''.join(f'<li>{esc(x)}</li>' for x in tech)
    rail=''.join(f'<a class="family-rail-item family-{slug(x["id"])}" href="{slug(x["id"])}.html"><span>{esc(x["id"])}</span><b>{esc(x["title"])}</b><i>→</i></a>' for x in all_f if x['id']!=fid)
    meta_html=''.join(f'<span>{esc(x)}</span>' for x in meta)
    return f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f7f3ec">
  <meta name="description" content="{esc(description)}"><title>{esc(title)} · GEODOMAS Academy</title>
  <link rel="canonical" href="{canonical}">
  <meta property="og:type" content="website"><meta property="og:title" content="{esc(title)} · GEODOMAS Academy"><meta property="og:description" content="{esc(description)}"><meta property="og:url" content="{canonical}"><meta property="og:image" content="{image}"><meta property="og:image:alt" content="GEODOMAS {esc(title)}">
  <meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{esc(title)} · GEODOMAS Academy"><meta name="twitter:description" content="{esc(description)}"><meta name="twitter:image" content="{image}">
  <link rel="stylesheet" href="../assets/academy.css">
</head>
<body class="family-page" data-family-id="{esc(fid)}" data-family="{esc(fid)}">
<a class="skip-link" href="#main-content">Skip to content</a>
<header class="topbar">
  <a class="brand" href="../../index.html"><svg class="brand-mark" viewBox="0 0 80 72" aria-hidden="true"><path d="M40 3 9 20 4 52l22 16h28l22-16-5-32L40 3Zm0 0 14 17 17 0M40 3 26 20 9 20m17 0 14 17 14-17m-28 0L4 52m54-32 18 32M40 37 4 52m36-15 36 15M40 37 26 68m14-31 14 31M4 52h72" fill="none" stroke="currentColor" stroke-width="2"/></svg><span><strong>GEODOMAS</strong><small>PRODUCT ACADEMY</small></span></a>
  <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false">Menu</button>
  <nav class="nav"><a href="../index.html">Academy</a><a href="../compare.html">Compare</a><a href="../project-start.html">Start a Project</a><a href="../ai-training.html">AI Training</a><a href="../../lab/">Technology Lab</a><a class="ai-nav" href="https://chat.geodomas.lt/"><span>✦</span> AI Assistant</a></nav>
</header>
<main id="main-content">
  <section class="family-hero-premium">
    <div id="family-visual" class="family-visual"></div><div class="family-shade"></div>
    <div class="shell family-hero-content">
      <a class="breadcrumb" href="../index.html">← Product Academy</a>
      <div class="family-copy"><div id="fid" class="eyebrow light">{esc(fid)} · {esc(authority(f.get('authority','')))}</div><h1 id="title">{esc(title)}</h1><p id="summary">{esc(f['summary'])}</p>
        <div class="family-actions"><a class="btn btn-gold" href="https://chat.geodomas.lt/">✦ Discuss with GEODOMAS AI ↗</a><a class="btn btn-glass" href="../brief-builder.html?family={esc(fid)}">Build project brief →</a><a class="family-compare-link" href="../compare.html?a={esc(fid)}">Compare product families →</a></div>
      </div>
      <div id="family-meta" class="family-meta" aria-live="polite">{meta_html}</div>
    </div>
  </section>
  <nav class="family-subnav" aria-label="Product family sections"><div class="shell"><a href="#family-overview">Overview</a><a href="#family-models">Models & technology</a><a href="#family-project">Project path</a><a href="#family-explore">Explore other systems</a><span id="family-snapshot">PUBLIC SNAPSHOT · {esc(snap.get('snapshot_date','CURRENT'))}</span></div></nav>
  <section id="family-overview" class="family-overview shell reveal">
    <article class="overview-lead"><p class="eyebrow">WHY THIS FAMILY</p><h2 id="difference">{esc(f['difference'])}</h2></article>
    <article class="overview-panel"><p class="eyebrow">BEST FOR</p><ul id="best" class="clean-list">{best}</ul></article>
    <article class="overview-panel"><p class="eyebrow">SAFE ADVANTAGES</p><ul id="advantages" class="clean-list">{advantages}</ul></article>
  </section>
  <section id="family-models" class="models-section reveal"><div class="shell"><div class="section-head split-head"><div><p class="eyebrow">CURRENT PUBLIC ORIENTATION</p><h2>Models and routes</h2></div><p>Model names and maturity states are orientation. Exact project identity still needs the current configuration and required verification.</p></div><div class="model-layout"><div id="models" class="models-grid">{model_html}</div><aside class="tech-panel"><p class="eyebrow">TECHNOLOGY / CONFIGURATION</p><ul id="tech" class="clean-list">{tech_html}</ul></aside></div></div></section>
  <section id="family-project" class="project-path shell reveal"><div><p class="eyebrow">START THE PROJECT</p><h2>Move from product direction to verified project scope.</h2><ol id="start" class="step-list">{steps}</ol></div><aside class="boundary-card"><span>BOUNDARY</span><h3>Orientation is not approval.</h3><p id="notes">{esc(notes)}</p><a href="https://chat.geodomas.lt/">Ask the live assistant what must be verified ↗</a></aside></section>
  <section id="family-explore" class="family-explore shell reveal"><div class="section-head split-head"><div><p class="eyebrow">EXPLORE THE SYSTEM</p><h2>Other GEODOMAS product families</h2></div><p>Move across product systems without losing the current public claim boundaries.</p></div><div id="family-rail" class="family-rail">{rail}</div></section>
  <section class="family-final"><div class="shell"><p class="eyebrow light">NEXT STEP</p><h2>Have a site, target size or use case?</h2><p>Bring the real project context into the live GEODOMAS Assistant.</p><a class="btn btn-gold" href="https://chat.geodomas.lt/">✦ Open GEODOMAS AI ↗</a></div></section>
</main>
<footer class="footer"><div class="shell-wide footer-inner"><div><b>GEODOMAS</b><span>Product Academy · current public orientation</span></div><nav><a href="../index.html">Academy</a><a href="../project-start.html">Start Project</a><a href="../../lab/">Technology Lab</a><a href="https://chat.geodomas.lt/">AI Assistant ↗</a></nav></div></footer>
<a class="floating-ai" href="https://chat.geodomas.lt/"><span>✦</span><b>Ask GEODOMAS AI</b><i>↗</i></a>
<script type="module">import{{bootFamilyStatic}}from'../assets/academy.js';bootFamilyStatic();</script>
</body></html>'''

def main():
    snap=json.load(open(SNAP))
    families=snap['families']; OUT.mkdir(parents=True,exist_ok=True)
    expected=set()
    for f in families:
        name=f'{slug(f["id"])}.html'; expected.add(name); (OUT/name).write_text(render(f,families,snap))
    for p in OUT.glob('*.html'):
        if p.name not in expected: p.unlink()
    print(f'generated {len(expected)} static family pages in {OUT}')
if __name__=='__main__': main()
