export async function getGeometrySummary(apiBase, model) {
  const res=await fetch(`${apiBase}/api/v1/geometry-summary`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model})});
  const data=await res.json().catch(()=>({error:'invalid_json'})); if(!res.ok) throw new Error(data.error||`HTTP ${res.status}`); return data;
}
