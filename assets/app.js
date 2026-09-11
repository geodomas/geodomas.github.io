import {findModels} from './tools/model-finder.js';
import {getModelSpec} from './tools/model-spec.js';
import {getGeometrySummary} from './tools/geometry-summary.js';
import {getFrameSummary} from './tools/frame-summary.js';
import {submitAssistantQuestion} from './tools/ask-geodomas.js';
const cfg=window.GEODOMAS_PUBLIC_CONFIG||{apiBase:''}; const $=s=>document.querySelector(s);
function setOutput(el,data,ok=true){el.className='result '+(ok?'ok':'error');el.textContent=typeof data==='string'?data:JSON.stringify(data,null,2)}
async function run(form,out,fn){form.addEventListener('submit',async e=>{e.preventDefault();setOutput(out,'Working…');try{setOutput(out,await fn())}catch(err){setOutput(out,`Request rejected: ${err.message}`,false)}})}
run($('#finder-form'),$('#finder-output'),()=>findModels(cfg.apiBase,$('#finder-q').value.trim(),$('#finder-family').value));
run($('#spec-form'),$('#spec-output'),()=>getModelSpec(cfg.apiBase,$('#model').value.trim(),$('#spec-lang').value));
run($('#geometry-form'),$('#geometry-output'),()=>getGeometrySummary(cfg.apiBase,$('#geometry-model').value.trim()));
run($('#frame-form'),$('#frame-output'),()=>getFrameSummary(cfg.apiBase,$('#frame-model').value.trim()));
run($('#ask-form'),$('#ask-output'),()=>submitAssistantQuestion(cfg.apiBase,$('#question').value.trim(),$('#ask-lang').value));
