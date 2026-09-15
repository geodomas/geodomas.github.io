const j=async url=>{const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw new Error(`HTTP ${r.status}`);return r.json();};
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const slug=s=>String(s||'').toLowerCase().replace(/[^a-z0-9_]+/g,'-');
function familyModels(f){return f.primary_models||f.active_model_families||f.public_reference_models||[];}
function modelLabel(m){if(typeof m==='string')return m;const a=[m.id||m.name];if(m.diameter_m)a.push(`Ø${m.diameter_m} m`);if(m.area_m2)a.push(`${m.area_m2} m²`);return a.filter(Boolean).join(' · ');}
function humanAuthority(v=''){if(v.includes('specialist_current'))return'CURRENT SPECIALIST SNAPSHOT';if(v.includes('public_direction'))return'PUBLIC DIRECTION';return String(v).replaceAll('_',' ').toUpperCase();}
async function copyText(text){if(navigator.clipboard?.writeText){try{await navigator.clipboard.writeText(text);return true;}catch(_){}}const t=document.createElement('textarea');t.value=text;t.setAttribute('readonly','');t.style.position='fixed';t.style.opacity='0';document.body.appendChild(t);t.select();let ok=false;try{ok=document.execCommand('copy');}catch(_){}t.remove();return ok;}
function chrome(){
 const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav'),header=document.querySelector('.topbar');
 const setHeader=()=>header?.classList.toggle('scrolled',window.scrollY>12);setHeader();window.addEventListener('scroll',setHeader,{passive:true});
 toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Close':'Menu';});
 nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{if(nav.classList.contains('open')){nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');if(toggle)toggle.textContent='Menu';}}));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');if(toggle){toggle.textContent='Menu';toggle.focus();}}});
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver'in window)){document.querySelectorAll('.reveal').forEach(x=>x.classList.add('visible'));return;}
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(x=>io.observe(x));
}
export async function bootIndex(){
 chrome();
 const [snap,router]=await Promise.all([j('../knowledge/iskra_public_snapshot.json'),j('../knowledge/project_router.json')]);
 const dateEl=document.querySelector('#snapshot-date');if(dateEl)dateEl.textContent=`${snap.snapshot_date||'current'} · ${(snap.status||'curated_public_snapshot').replaceAll('_',' ').toUpperCase()}`;
 const grid=document.querySelector('#families');
 grid.innerHTML=snap.families.map((f,i)=>`<a class="family-card family-${slug(f.id)}" href="family.html?id=${encodeURIComponent(f.id)}"><div class="family-card-media"><span>${String(i+1).padStart(2,'0')} · ${esc(f.id)}</span></div><div class="family-card-body"><span class="tag">${esc(humanAuthority(f.authority))}</span><h3>${esc(f.title)}</h3><p>${esc(f.summary)}</p><div class="chips">${(f.best_for||[]).slice(0,3).map(x=>`<span>${esc(x)}</span>`).join('')}</div><div class="more">Explore family →</div></div></a>`).join('');
 const sel=document.querySelector('#intent');sel.innerHTML=router.routes.map(x=>`<option value="${esc(x.id)}">${esc(x.label)}</option>`).join('');
 const out=document.querySelector('#route-result');
 document.querySelector('#route-btn').onclick=()=>{const x=router.routes.find(r=>r.id===sel.value);const f=snap.families.find(y=>y.id===x.family);out.innerHTML=`<strong>${esc(x.family)} — ${esc(f?.title||x.family)}</strong>\n\n${esc(x.why)}\n\nNext: ${esc((f?.project_start||[]).slice(0,4).join(' → '))}\n\nBoundary: ${esc(router.boundary)}<div class="route-actions"><a href="family.html?id=${encodeURIComponent(x.family)}">Open family →</a><a href="brief-builder.html?family=${encodeURIComponent(x.family)}">Build project brief →</a><a href="https://chat.geodomas.lt/">Ask GEODOMAS AI ↗</a></div>`;};
 document.querySelector('#route-btn').click();
}
export async function bootFamily(){
 chrome();
 const id=new URLSearchParams(location.search).get('id')||'GLAMPING';const snap=await j('../knowledge/iskra_public_snapshot.json');const f=snap.families.find(x=>x.id===id);
 if(!f){document.querySelector('main').innerHTML='<section class="shell section"><h1>Unknown product family.</h1><a href="index.html">← Back to Academy</a></section>';return;}
 document.body.dataset.family=id;document.title=`${f.title} · GEODOMAS Academy`;
 let meta=document.querySelector('meta[name="description"]');const description=`${f.summary} GEODOMAS public product orientation with model routes and verification boundaries.`;if(meta)meta.content=description;
 let canonical=document.querySelector('link[rel="canonical"]');if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical);}canonical.href=`${location.origin}${location.pathname}?id=${encodeURIComponent(id)}`;
 const setMeta=(selector,value)=>{const el=document.querySelector(selector);if(el)el.setAttribute('content',value);};setMeta('meta[property="og:title"]',`${f.title} · GEODOMAS Academy`);setMeta('meta[property="og:description"]',description);setMeta('meta[property="og:url"]',canonical.href);setMeta('meta[name="twitter:title"]',`${f.title} · GEODOMAS Academy`);setMeta('meta[name="twitter:description"]',description);
 const imageByFamily={GLAMPING:'glamping.webp',HOMES:'homes.webp',GLAZED:'glass.webp',ROOFS:'hero.webp',MONOLIT:'hero.webp',CRYSTAL_DOME:'academy.webp',EDU_LINE:'academy.webp',INFINITY:'academy.webp'};const socialImage=`${location.origin}/assets/media/${imageByFamily[id]||'academy.webp'}`;setMeta('meta[property="og:image"]',socialImage);setMeta('meta[name="twitter:image"]',socialImage);
 const compareLink=document.querySelector('.family-compare-link');if(compareLink)compareLink.href=`compare.html?a=${encodeURIComponent(id)}`;
 const startLink=document.querySelector('.family-actions a[href="project-start.html"]');if(startLink)startLink.href=`brief-builder.html?family=${encodeURIComponent(id)}`;
 const snapEl=document.querySelector('#family-snapshot');if(snapEl)snapEl.textContent=`PUBLIC SNAPSHOT · ${snap.snapshot_date||'CURRENT'}`;
 document.querySelector('#fid').textContent=`${f.id} · ${humanAuthority(f.authority)}`;document.querySelector('#title').textContent=f.title;document.querySelector('#summary').textContent=f.summary;document.querySelector('#difference').textContent=f.difference;
 document.querySelector('#best').innerHTML=(f.best_for||[]).map(x=>`<li>${esc(x)}</li>`).join('');
 document.querySelector('#advantages').innerHTML=(f.safe_advantages||[]).map(x=>`<li>${esc(x)}</li>`).join('');
 document.querySelector('#start').innerHTML=(f.project_start||[]).map(x=>`<li>${esc(x)}</li>`).join('');
 const models=familyModels(f);document.querySelector('#models').innerHTML=models.length?models.map(m=>`<div class="model"><strong>${esc(modelLabel(m))}</strong><small>${esc(typeof m==='object'?(m.program||m.role||m.status||m.release||m.maturity||'public orientation'):'public orientation')}</small></div>`).join(''):'<div class="model"><strong>Project-routed family</strong><small>This family uses configuration or diameter routes rather than one public model list.</small></div>';
 const tech=f.technology_levels||f.technology_directions||f.facade_modes||f.configurations||[];document.querySelector('#tech').innerHTML=tech.map(x=>`<li>${esc(typeof x==='string'?x:`${x.id}: ${x.meaning}`)}</li>`).join('')||'<li>Project-specific configuration.</li>';
 document.querySelector('#notes').textContent=(f.notes||[]).join(' ')||'Final structural, envelope, legal and commercial claims remain project-specific.';
 const meta=[];if(models.length)meta.push(`${models.length} PUBLIC MODEL / ROUTE ITEMS`);if(tech.length)meta.push(`${tech.length} CONFIGURATION ITEMS`);meta.push('ENGINEERING GATE PRESERVED');document.querySelector('#family-meta').innerHTML=meta.map(x=>`<span>${esc(x)}</span>`).join('');
 const rail=document.querySelector('#family-rail');if(rail)rail.innerHTML=snap.families.filter(x=>x.id!==id).map(x=>`<a class="family-rail-item family-${slug(x.id)}" href="family.html?id=${encodeURIComponent(x.id)}"><span>${esc(x.id)}</span><b>${esc(x.title)}</b><i>→</i></a>`).join('');
}
export async function bootTraining(){
 chrome();const [c,g]=await Promise.all([j('../knowledge/curriculum/curriculum.json'),j('../knowledge/curriculum/glossary.json')]);
 document.querySelector('#modules').innerHTML=c.modules.map(m=>`<article class="module-card"><span class="tag">${esc(m.id)} · ${esc(m.level)}</span><h3>${esc(m.title)}</h3><p>${esc((m.objectives||[]).join(' · '))}</p><div class="more">PASS CONDITION<br>${esc(m.pass_condition||'')}</div></article>`).join('');
 document.querySelector('#glossary').textContent=g.terms.map(x=>`${x.term} — ${x.public_definition}${x.do_not_claim?`\nGuard: ${x.do_not_claim}`:''}`).join('\n\n');
}
export async function bootStart(){
 chrome();const g=await j('../knowledge/project_start_guides.json');const u=g.universal_start;
 document.querySelector('#steps').innerHTML=u.steps.map(x=>`<article class="step-card"><span class="tag">STEP ${String(x.step).padStart(2,'0')}</span><h3>${esc(x.name)}</h3><p>${esc(x.ask.join(' · '))}</p></article>`).join('');
 document.querySelector('#definition').textContent=`${g.project_definition.principle}\n\n${g.project_definition.operational_route.join(' → ')}\n\n${g.project_definition.meaning}\n\n${g.project_definition.important}`;
 document.querySelector('#brief').innerHTML=g.minimum_client_brief.map(x=>`<li>${esc(x)}</li>`).join('');
}

function comparisonRoutes(f){
 const direct=familyModels(f); if(direct.length)return direct.map(modelLabel);
 if(f.diameter_routes_m)return f.diameter_routes_m.map(x=>`Ø${x} m route`);
 if(f.standard_diameter_routes_m){const a=f.standard_diameter_routes_m.map(x=>`Ø${x} m`);if(f.special_project_routes_m?.length)a.push(`special Ø${f.special_project_routes_m[0]}–${f.special_project_routes_m.at(-1)} m`);return a;}
 if(f.configurations)return f.configurations;
 if(f.reference_model)return [modelLabel(f.reference_model)];
 if(f.base_identity)return [`Ø${f.base_identity.diameter_m||'?'} m · ${f.base_identity.floor_area_m2_approx||'?'} m² approx.`];
 return ['Project-routed configuration'];
}
function comparisonTech(f){
 const t=f.technology_levels||f.technology_directions||f.facade_modes||f.configurations||[];
 return t.map(x=>typeof x==='string'?x:`${x.id}: ${x.meaning}`);
}
function compareCard(f,label){
 const routes=comparisonRoutes(f).slice(0,12),tech=comparisonTech(f).slice(0,10);
 return `<article class="compare-card family-${slug(f.id)}"><div class="compare-card-image"><span>${esc(label)} · ${esc(f.id)}</span></div><div class="compare-card-head"><small>${esc(humanAuthority(f.authority))}</small><h2>${esc(f.title)}</h2><p>${esc(f.summary)}</p></div><div class="compare-block"><span>BEST FOR</span><ul>${(f.best_for||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><div class="compare-block"><span>WHAT MAKES IT DIFFERENT</span><p>${esc(f.difference)}</p></div><div class="compare-block"><span>SAFE ADVANTAGES</span><ul>${(f.safe_advantages||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><div class="compare-block"><span>PUBLIC MODEL / ROUTE ORIENTATION</span><div class="compare-models">${routes.map(x=>`<em>${esc(x)}</em>`).join('')}</div></div><div class="compare-block"><span>TECHNOLOGY / CONFIGURATION</span>${tech.length?`<ul>${tech.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'<p>Project-specific configuration.</p>'}</div><div class="compare-block"><span>START THE PROJECT</span><ul>${(f.project_start||[]).slice(0,6).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><div class="compare-card-foot compare-card-actions"><a href="family.html?id=${encodeURIComponent(f.id)}">Open ${esc(f.id)} family →</a><a href="brief-builder.html?family=${encodeURIComponent(f.id)}">Build brief →</a></div></article>`;
}
export async function bootCompare(){
 chrome();
 const snap=await j('../knowledge/iskra_public_snapshot.json');
 const opts=snap.families.map(f=>`<option value="${esc(f.id)}">${esc(f.title)}</option>`).join('');
 const a=document.querySelector('#compare-a'),b=document.querySelector('#compare-b'),share=document.querySelector('#compare-share');a.innerHTML=opts;b.innerHTML=opts;
 const params=new URLSearchParams(location.search),valid=id=>snap.families.some(f=>f.id===id);a.value=valid(params.get('a'))?params.get('a'):'GLAMPING';b.value=valid(params.get('b'))?params.get('b'):'HOMES';
 const render=()=>{let fa=snap.families.find(x=>x.id===a.value),fb=snap.families.find(x=>x.id===b.value);if(fa?.id===fb?.id){const alt=snap.families.find(x=>x.id!==fa.id);fb=alt;b.value=alt.id;}const url=new URL(location.href);url.searchParams.set('a',fa.id);url.searchParams.set('b',fb.id);history.replaceState(null,'',url.pathname+url.search);document.title=`${fa.title} vs ${fb.title} · GEODOMAS Compare`;document.querySelector('#compare-results').innerHTML=compareCard(fa,'FAMILY A')+compareCard(fb,'FAMILY B');};
 document.querySelector('#compare-run').addEventListener('click',render);a.addEventListener('change',render);b.addEventListener('change',render);
 document.querySelector('#compare-swap').addEventListener('click',()=>{const av=a.value;a.value=b.value;b.value=av;render();});
 share.addEventListener('click',async()=>{const ok=await copyText(location.href);const old=share.textContent;share.textContent=ok?'Link copied ✓':'Copy failed';share.classList.toggle('copy-ok',ok);setTimeout(()=>{share.textContent=old;share.classList.remove('copy-ok');},1700);});
 render();
}

function briefVal(id){const e=document.querySelector(id);return (e?.value||'').trim()||'Not defined';}
function buildBrief(){
 const family=document.querySelector('#brief-family'); const familyLabel=family?.selectedOptions?.[0]?.textContent||'Not selected';
 return `GEODOMAS PROJECT BRIEF — PUBLIC ORIENTATION\n\nProject / reference: ${briefVal('#brief-name')}\nLocation / site: ${briefVal('#brief-location')}\nIntended use: ${briefVal('#brief-use')}\nProduct family direction: ${familyLabel}\nTarget size / area: ${briefVal('#brief-size')}\nPeople / occupancy: ${briefVal('#brief-occupancy')}\nNumber of units: ${briefVal('#brief-units')}\nSeasonality: ${briefVal('#brief-season')}\nEnvelope / material direction: ${briefVal('#brief-envelope')}\nDesired project stage: ${briefVal('#brief-stage')}\nTimeline: ${briefVal('#brief-timeline')}\nBudget range: ${briefVal('#brief-budget')}\n\nSITE / ACCESS / UTILITIES\n${briefVal('#brief-site')}\n\nMAIN QUESTION / DECISION NEEDED\n${briefVal('#brief-question')}\n\nREQUESTED GEODOMAS NEXT STEP\n1. Confirm or correct the product-family route.\n2. Identify missing Project Definition inputs.\n3. Separate public orientation from project-specific engineering/commercial/legal verification.\n4. Recommend the next responsible action.\n\nBOUNDARY\nThis browser-generated brief is not a technical design, structural verification, permit conclusion, binding price, lead-time promise or installation scope.`;
}
export async function bootBriefBuilder(){
 chrome();
 const snap=await j('../knowledge/iskra_public_snapshot.json'),form=document.querySelector('#brief-form'),family=document.querySelector('#brief-family');
 family.innerHTML='<option value="">Not selected yet</option>'+snap.families.map(f=>`<option value="${esc(f.id)}">${esc(f.id)} — ${esc(f.title)}</option>`).join('');
 const requested=new URLSearchParams(location.search).get('family');if(snap.families.some(f=>f.id===requested))family.value=requested;
 const output=document.querySelector('#brief-output'),state=document.querySelector('#brief-state'),bar=document.querySelector('#brief-progress-bar'),label=document.querySelector('#brief-progress-label'),wrap=document.querySelector('.brief-progress-wrap');
 const core=['#brief-location','#brief-use','#brief-family','#brief-size','#brief-stage','#brief-question'];
 const progress=()=>{const n=core.filter(id=>(document.querySelector(id)?.value||'').trim()).length;label.textContent=`${n} / ${core.length}`;bar.style.width=`${Math.round(n/core.length*100)}%`;wrap.classList.toggle('complete',n===core.length);};
 const generate=()=>{output.textContent=buildBrief();state.textContent='GENERATED LOCAL';};document.querySelector('#brief-generate').addEventListener('click',generate);
 form.addEventListener('input',progress);form.addEventListener('change',progress);
 form.addEventListener('reset',()=>setTimeout(()=>{output.textContent='Fill the project inputs, then generate the brief.';state.textContent='LOCAL ONLY';progress();},0));
 document.querySelector('#brief-copy').addEventListener('click',async e=>{if(!output.textContent||output.textContent.startsWith('Fill the project'))generate();const ok=await copyText(output.textContent);const btn=e.currentTarget,old=btn.textContent;btn.textContent=ok?'Copied ✓':'Copy failed';btn.classList.toggle('copy-ok',ok);setTimeout(()=>{btn.textContent=old;btn.classList.remove('copy-ok');},1800);});
 progress();
}
