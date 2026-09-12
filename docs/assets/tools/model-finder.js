import {loadRegistry,norm} from './registry.js';
export async function findModels(_apiBase, query='', family='') {
  const d=await loadRegistry(); const q=norm(query), fam=norm(family);
  const models=d.models.filter(m=>{
    if(fam&&norm(m.family)!==fam) return false;
    if(!q) return true;
    return [m.id,m.label,m.description,m.family].some(v=>norm(v).includes(q));
  }).slice(0,50).map(m=>({
    model:m.label,family:m.family,description:m.description,nominal_diameter_m:m.diameter_m_nominal,
    frequency_v:m.frequency_v,sphere_fraction:m.partial,status:'orientation'
  }));
  return {status:'orientation',count:models.length,models};
}
