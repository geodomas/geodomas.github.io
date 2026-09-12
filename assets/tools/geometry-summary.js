import {findModel} from './registry.js';
function fraction(v){
  if(typeof v==='number') return v;
  const s=String(v||''); if(s.includes('/')){const [a,b]=s.split('/').map(Number); return b?a/b:null;}
  const n=Number(s); return Number.isFinite(n)?n:null;
}
const r=(n,d)=>Number(n.toFixed(d));
export async function getGeometrySummary(_apiBase, model) {
  const m=await findModel(model), R=Number(m.radius_m), f=fraction(m.partial), flat=!!m.flat;
  let derived={status:'not_available'}, assumptions=[];
  if(R>0&&f>0&&f<=1&&!flat){
    const z0=R*(1-2*f), h=R-z0, rb=Math.sqrt(Math.max(0,R*R-z0*z0));
    derived={status:'theoretical_spherical_cap_orientation',height_m:r(h,4),base_radius_m:r(rb,4),base_diameter_m:r(2*rb,4),floor_circle_area_m2:r(Math.PI*rb*rb,3),spherical_surface_area_m2:r(2*Math.PI*R*h,3)};
    assumptions.push('Derived metrics use the spherical-cap interpretation of the current CALC slice convention and are orientation values only.');
  }else if(flat){
    derived={status:'not_computed_for_flat_aligned_geometry'};
    assumptions.push('This model is marked Flat/aligned; derived spherical-cap floor/surface metrics are intentionally not fabricated from nominal radius alone.');
  }else assumptions.push('Insufficient indexed source fields for derived geometry; no values were invented.');
  return {model:m.label,family:m.family,status:'orientation',source_geometry:{base:m.base,frequency_v:m.frequency_v,sphere_fraction:m.partial,radius_m:m.radius_m,nominal_diameter_m:m.diameter_m_nominal,subdivision_class:m.subdiv_class,subdivision_method:m.subdiv_method,symmetry:m.symmetry,flat_aligned:flat},derived_geometry:derived,assumptions,engineering_required:true,next_step:'Use the exact CALC mesh/export for chord counts, member lengths, panels and production quantities.'};
}
