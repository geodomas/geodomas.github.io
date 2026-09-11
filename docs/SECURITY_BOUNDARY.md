# GEODOMAS Public Lab — security boundary

## Public deterministic tools
Only explicit, purpose-built scripts may be automated. V1 contains:

- `model-spec.js` — calls only `/api/v1/model-spec`;
- `ask-geodomas.js` — submits a question for assistant review only.

## Forbidden from public automation
A public request must never automatically open or search:

- private operational records;
- client/email records;
- private pricing or margins;
- unrestricted internal specialist workspaces;
- server filesystem paths;
- internal prompts/routing traces;
- credentials or environment secrets.

## Assistant boundary
ASK GEODOMAS is human/assistant mediated. The gateway stores/queues the public question. A controlled assistant chooses approved context, filters the answer, and only then may an answer be exposed publicly.

## Calculator boundary
Calculator/model scripts are allowed only when their input/output contract is explicit and the source dataset has been approved for public exposure. Geometry output is not structural certification.
