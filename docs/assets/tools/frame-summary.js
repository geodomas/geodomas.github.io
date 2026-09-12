import {findModel} from './registry.js';
export async function getFrameSummary(_apiBase, model) {
  const m=await findModel(model);
  return {model:m.label,family:m.family,status:'orientation',frame:{frequency_v:m.frequency_v,connection_family:m.connection_token,profile_token:m.beam_token,subdivision_class:m.subdiv_class,subdivision_method:m.subdiv_method,symmetry:m.symmetry},assumptions:['Profile/connection values are public-safe source tokens, not verified alloy/grade/wall-thickness certification.','Chord lengths, quantities, cutting angles and BOM are intentionally withheld unless generated from the exact CALC mesh contract.'],engineering_required:true,next_step:'For a production-grade member schedule, request the exact CALC configuration/export and engineering validation.'};
}
