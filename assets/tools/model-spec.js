// GEODOMAS PUBLIC TOOL: deterministic model specification client.
// Browser-safe by design. No proprietary formulas, prompts or private paths.
export async function getModelSpec(apiBase, model, lang='en') {
  const res = await fetch(`${apiBase}/api/v1/model-spec`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({model, lang})
  });
  const data = await res.json().catch(() => ({error: 'invalid_json'}));
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}
