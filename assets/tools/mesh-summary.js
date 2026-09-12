function finite(v){return typeof v==='number'&&Number.isFinite(v)}
const rnd=(n,d)=>Number(n.toFixed(d));
export async function analyzeCalcMesh(_apiBase, file) {
  if(!file) throw new Error('JSON file required');
  if(file.size>2_000_000) throw new Error('File exceeds 2 MB public limit');
  let spec; try{spec=JSON.parse(await file.text())}catch(_){throw new Error('Invalid JSON')}
  if(!spec||typeof spec!=='object') throw new Error('mesh_object_required');
  const meta=spec.meta||{}; if(meta.units!=='meters') throw new Error('units_must_be_meters');
  const verts=spec.vertices||[], edges=spec.edges||[], tris=spec.triangles||[];
  if(verts.length>10000||edges.length>30000||tris.length>20000) throw new Error('mesh_too_large');
  if(!verts.length||!edges.length) throw new Error('vertices_and_edges_required');
  const ids=new Set(); for(const v of verts){if(!finite(v.x)||!finite(v.y)||!finite(v.z))throw new Error('invalid_vertex');ids.add(Number(v.id));}
  const lengths=[]; let boundary=0;
  for(const e of edges){const vv=e.vertices||[];if(vv.length!==2||!ids.has(Number(vv[0]))||!ids.has(Number(vv[1])))throw new Error('edge_vertex_reference_invalid');const L=Number(e.length);if(!(L>0&&Number.isFinite(L)))throw new Error('edge_length_invalid');lengths.push(L);if((e.triangles||[]).length!==2)boundary++;}
  const areas=[]; for(const t of tris){const a=Number(t.area||0);if(!Number.isFinite(a)||a<0)throw new Error('triangle_area_invalid');areas.push(a);}
  const tol=.0005, groups=new Map(); for(const L of lengths){const g=Math.round(L/tol)*tol;groups.set(g,(groups.get(g)||0)+1)}
  const chord=[...groups].sort((a,b)=>a[0]-b[0]).map(([L,q])=>({length_m:rnd(L,4),quantity:q}));
  const val=new Map(); for(const v of verts){const n=Number(v.valence||0);val.set(n,(val.get(n)||0)+1)}
  return {status:'calc_mesh_orientation',source:{generator:meta.generator,units:'meters',model_type:meta.model?.modelType||null},counts:{vertices:verts.length,edges:edges.length,triangles:tris.length,boundary_edges:boundary},frame:{total_edge_length_m:rnd(lengths.reduce((a,b)=>a+b,0),3),min_edge_length_m:rnd(Math.min(...lengths),4),max_edge_length_m:rnd(Math.max(...lengths),4),orientation_chord_groups_0_5mm:chord},surface:{triangulated_area_m2:areas.length?rnd(areas.reduce((a,b)=>a+b,0),3):null},vertex_valence:[...val].sort((a,b)=>a[0]-b[0]).map(([v,q])=>({valence:v,quantity:q})),assumptions:['Input must be a GEODOMAS CALC JSON mesh export in meters.','Chord grouping uses 0.5 mm tolerance for orientation only; it is not a fabrication/cutting schedule.','Connector deductions, saw kerf, end cuts, deformation, stock optimization, waste, material grade and structural verification are not included.'],engineering_required:true,next_step:'For manufacturing, validate the exact CALC configuration and generate a controlled production BOM/cutting schedule in the private engineering workflow.'};
}
