const cfg = window.GEODOMAS_PUBLIC_CONFIG || { apiBase: '' };
const $ = (s) => document.querySelector(s);

function setOutput(el, data, ok=true){
  el.className = 'result ' + (ok ? 'ok' : 'error');
  el.textContent = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
}

async function post(path, payload){
  const res = await fetch(`${cfg.apiBase}${path}`, {
    method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)
  });
  const data = await res.json().catch(()=>({error:'Invalid JSON response'}));
  if(!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

$('#spec-form').addEventListener('submit', async (e)=>{
  e.preventDefault(); const out=$('#spec-output'); setOutput(out,'Calculating…');
  try { setOutput(out, await post('/api/v1/model-spec',{model:$('#model').value.trim(),lang:$('#spec-lang').value})); }
  catch(err){ setOutput(out, `Backend unavailable or request rejected: ${err.message}`, false); }
});

$('#ask-form').addEventListener('submit', async (e)=>{
  e.preventDefault(); const out=$('#ask-output'); setOutput(out,'Routing question…');
  try { setOutput(out, await post('/api/v1/ask',{question:$('#question').value.trim(),lang:$('#ask-lang').value})); }
  catch(err){ setOutput(out, `Backend unavailable or request rejected: ${err.message}`, false); }
});
