import {getModelSpec} from './tools/model-spec.js';
import {submitAssistantQuestion} from './tools/ask-geodomas.js';

const cfg = window.GEODOMAS_PUBLIC_CONFIG || { apiBase: '' };
const $ = (s) => document.querySelector(s);

function setOutput(el, data, ok=true){
  el.className = 'result ' + (ok ? 'ok' : 'error');
  el.textContent = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
}

$('#spec-form').addEventListener('submit', async (e)=>{
  e.preventDefault(); const out=$('#spec-output'); setOutput(out,'Calculating…');
  try { setOutput(out, await getModelSpec(cfg.apiBase,$('#model').value.trim(),$('#spec-lang').value)); }
  catch(err){ setOutput(out, `Backend unavailable or request rejected: ${err.message}`, false); }
});

$('#ask-form').addEventListener('submit', async (e)=>{
  e.preventDefault(); const out=$('#ask-output'); setOutput(out,'Submitting for qualified assistant review…');
  try { setOutput(out, await submitAssistantQuestion(cfg.apiBase,$('#question').value.trim(),$('#ask-lang').value)); }
  catch(err){ setOutput(out, `Gateway unavailable or request rejected: ${err.message}`, false); }
});
