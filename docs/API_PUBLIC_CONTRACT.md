# GEODOMAS Public Tool Contract — V1

The live GitHub Technology Lab at `/lab/` runs deterministic public tools **client-side**. It does not depend on a public private-data API.

## Static model registry
`knowledge/model_registry.public.json` contains an allowlisted orientation-only model dataset.

## Browser tools
- Model Finder — filters the static public registry.
- Model Spec — returns allowlisted geometry and frame orientation.
- Geometry Summary — computes only public-safe spherical-cap orientation metrics where the registry permits it.
- Frame Summary — exposes only public profile/connection tokens and geometry identity.
- CALC Mesh Analyzer — analyzes a user-selected CALC JSON file locally in the browser; the file is not uploaded by the Technology Lab tool.

## AI Assistant
All conversational/project-assistant CTAs route directly to `https://chat.geodomas.lt/`.

Public GitHub does not proxy the assistant, client records, private ISKRA workspaces or management data.
