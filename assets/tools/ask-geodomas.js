// GEODOMAS PUBLIC TOOL: submit a question to the assistant-review gateway.
// This script never receives private knowledge, prompts, management data or routing internals.
export async function submitAssistantQuestion(apiBase, question, lang='en') {
  const res = await fetch(`${apiBase}/api/v1/assistant-question`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({question, lang})
  });
  const data = await res.json().catch(() => ({error: 'invalid_json'}));
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}
