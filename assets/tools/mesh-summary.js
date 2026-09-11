export async function analyzeCalcMesh(apiBase, file) {
  if (!file) throw new Error('JSON file required');
  if (file.size > 2_000_000) throw new Error('File exceeds 2 MB public limit');
  const text=await file.text(); let payload;
  try{payload=JSON.parse(text)}catch(_){throw new Error('Invalid JSON')}
  const res=await fetch(`${apiBase}/api/v1/mesh-summary`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  const data=await res.json().catch(()=>({error:'invalid_json'})); if(!res.ok) throw new Error(data.error||`HTTP ${res.status}`); return data;
}
