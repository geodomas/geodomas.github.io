const REGISTRY_URL = new URL('../../knowledge/model_registry.public.json', import.meta.url);
let cache;
export async function loadRegistry(){
  if(cache) return cache;
  const res=await fetch(REGISTRY_URL,{cache:'no-store'});
  if(!res.ok) throw new Error(`Model registry HTTP ${res.status}`);
  cache=await res.json(); return cache;
}
export function norm(v=''){return String(v).toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,' ').trim()}
export async function findModel(query){
  const d=await loadRegistry(), q=norm(query);
  if(!q) throw new Error('model_required');
  let m=d.models.find(x=>norm(x.id)===q||norm(x.label)===q);
  if(!m) m=d.models.find(x=>norm(x.id).includes(q)||norm(x.label).includes(q)||norm(x.description).includes(q));
  if(!m) throw new Error('model_not_found');
  return m;
}
