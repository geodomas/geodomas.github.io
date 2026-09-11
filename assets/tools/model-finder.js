export async function findModels(apiBase, query='', family='') {
  const qs = new URLSearchParams();
  if (query) qs.set('q',query); if (family) qs.set('family',family); qs.set('limit','50');
  const res=await fetch(`${apiBase}/api/v1/models?${qs.toString()}`);
  const data=await res.json().catch(()=>({error:'invalid_json'}));
  if(!res.ok) throw new Error(data.error||`HTTP ${res.status}`); return data;
}
