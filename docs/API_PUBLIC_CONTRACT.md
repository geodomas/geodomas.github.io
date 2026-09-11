# GEODOMAS Public API contract — V1

Public UI expects a server-side API base configured in `assets/config.js`.

## POST `/api/v1/model-spec`
Input:
```json
{"model":"GLAMP 50","lang":"en"}
```
Output fields are allowlisted:
`model`, `family`, `status`, `geometry`, `structure`, `assumptions`, `engineering_required`, `next_step`.

## POST `/api/v1/ask`
Input:
```json
{"question":"Can I use a 10 m glass dome as a restaurant in Iceland?","lang":"en"}
```
Output fields are allowlisted:
`answer`, `category`, `status`, `basis`, `assumptions`, `engineering_required`, `next_step`.

Public responses must never expose server paths, prompts, secret keys, raw management records, internal scores or proprietary formulas.
