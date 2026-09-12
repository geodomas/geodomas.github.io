export async function loadProductOntology(){
  const res=await fetch('knowledge/product_ontology.json',{cache:'no-store'});
  if(!res.ok) throw new Error(`HTTP ${res.status}`); return res.json();
}
export async function loadProjectGuide(){
  const res=await fetch('knowledge/project_start_guides.json',{cache:'no-store'});
  if(!res.ok) throw new Error(`HTTP ${res.status}`); return res.json();
}
