import {findModel} from './registry.js';
export async function getModelSpec(_apiBase, model, _lang='en') {
  const m=await findModel(model);
  return {
    model:m.label,family:m.family,status:m.status||'orientation',
    geometry:{base:m.base,frequency_v:m.frequency_v,sphere_fraction:m.partial,radius_m:m.radius_m,nominal_diameter_m:m.diameter_m_nominal,subdivision_class:m.subdiv_class,subdivision_method:m.subdiv_method,symmetry:m.symmetry},
    structure:{connection_family:m.connection_token,profile_token:m.beam_token,qualification:'orientation_only'},
    assumptions:['Nominal geometry comes from the current public-safe GEODOMAS model registry.','Openings, glazing, foundation, loads and final material grades are project-specific unless separately verified.'],
    engineering_required:true,
    next_step:'Provide location, intended use, occupancy, climate/load basis and required envelope to prepare a project-specific engineering route.'
  };
}
