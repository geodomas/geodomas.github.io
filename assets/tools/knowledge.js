export async function loadProductOntology(){
  const res=await fetch(new URL('../../knowledge/product_ontology.json',import.meta.url),{cache:'no-store'});
  if(!res.ok) throw new Error(`HTTP ${res.status}`); return res.json();
}
export async function loadProjectGuide(){
  const res=await fetch(new URL('../../knowledge/project_start_guides.json',import.meta.url),{cache:'no-store'});
  if(!res.ok) throw new Error(`HTTP ${res.status}`); return res.json();
}
