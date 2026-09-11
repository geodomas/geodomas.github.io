# GEODOMAS Public API contract — V1

Two separate public tools are intentionally isolated.

## Tool A — Model Spec
`POST /api/v1/model-spec`

Input:
```json
{"model":"GLAMP 50","lang":"en"}
```

This is deterministic and based only on a public-safe model registry derived from approved CALC/product metadata.

Public output keys:
`model`, `family`, `status`, `geometry`, `structure`, `assumptions`, `engineering_required`, `next_step`.

## Tool B — Ask GEODOMAS
`POST /api/v1/assistant-question`

Input:
```json
{"question":"Can I use a 10 m glass dome as a restaurant in Iceland?","lang":"en"}
```

The endpoint does NOT query raw private data automatically. It accepts the user question and creates a controlled assistant-review request. The assistant may receive only explicitly approved context and must return a sanitized public answer.

Public output keys at submission stage:
`request_id`, `status`, `message`, `next_step`.

A later answer endpoint may expose only the approved/sanitized answer object; never raw source context, prompts, internal scores, server paths or management data.
