# GEODOMAS Public API contract — V1 staging

All API endpoints are deny-by-default and return public-safe allowlisted JSON.

## GET `/api/v1/models`
Query: `q`, `family`, `limit` (max 100). Returns only public catalog fields.

## POST `/api/v1/model-spec`
Input: `{"model":"GLAMP 50","lang":"en"}`.
Returns indexed source geometry/frame orientation and engineering gates.

## POST `/api/v1/geometry-summary`
Input: `{"model":"GLAMP 50"}`.
For non-Flat spherical configurations, may return theoretical cap orientation metrics derived from the same slice convention used by GEODOMAS CALC. Flat/aligned configurations are deliberately not approximated.

## POST `/api/v1/frame-summary`
Input: `{"model":"GLAMP 50"}`.
Returns frequency, class/method/symmetry, connection family and public profile token. It does not expose production cutting/BOM unless a future exact CALC-mesh public contract explicitly allows it.

## POST `/api/v1/mesh-summary`
Input: user-supplied JSON exported directly from `calc.geodomas.lt` (max 2 MB). Returns aggregate public-safe topology/geometry metrics only. It is not a production cutting/BOM authority.

## GEODOMAS AI Assistant — live service handoff
Public Lab does **not** expose an `/ask` or `/assistant-question` proxy.

All conversational/project-assistant CTAs route directly to:
`https://chat.geodomas.lt/`

The static GitHub demo does not receive, proxy, cache or enrich those chat requests. The live assistant is a separate GEODOMAS runtime service with its own controlled knowledge and response layer.
