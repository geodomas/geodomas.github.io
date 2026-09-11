# GEODOMAS Public API contract — V1 staging

All endpoints are deny-by-default and return public-safe allowlisted JSON.

## GET `/api/v1/models`
Query: `q`, `family`, `limit` (max 100). Returns only public catalog fields.

## POST `/api/v1/model-spec`
Input: `{"model":"GLAMP 50","lang":"en"}`.
Returns indexed source geometry/frame orientation and engineering gates.

## POST `/api/v1/geometry-summary`
Input: `{"model":"GLAMP 50"}`.
For non-Flat spherical configurations, may return theoretical cap orientation metrics derived from the same slice convention used by GEODOMAS CALC (`threshold = 1 - 2×partial`). Flat/aligned configurations are deliberately not approximated.

## POST `/api/v1/frame-summary`
Input: `{"model":"GLAMP 50"}`.
Returns frequency, class/method/symmetry, connection family and public profile token. Does not expose chord schedule/BOM unless a future exact CALC-mesh public contract explicitly allows it.

## POST `/api/v1/assistant-question`
Input: public question + language. Submission only. No automatic private-data lookup.

Public responses never expose private server paths, prompts, raw management data, credentials, internal routing scores or proprietary production logic.
