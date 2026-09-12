# Training an AI system to understand GEODOMAS

## Goal
Teach current product taxonomy first, technical vocabulary second, deterministic CALC usage third, and project/claim boundaries throughout.

## Public truth priority
1. `knowledge/iskra_public_snapshot.json` — current curated specialist overlay.
2. `knowledge/product_ontology.json` — human-readable product ontology aligned to that snapshot.
3. `knowledge/project_start_guides.json` — public project-start / Project Definition logic.
4. `knowledge/curriculum/curriculum.json` and glossary — technical vocabulary and response protocol.
5. Q&A examples — training examples, not authority over the files above.

Older marketing/session labels must not override the current specialist snapshot.

## Canonical public load order
1. `knowledge/iskra_public_snapshot.json`
2. `knowledge/product_ontology.json`
3. `knowledge/project_start_guides.json`
4. `knowledge/curriculum/curriculum.json`
5. `knowledge/curriculum/glossary.json`
6. `knowledge/ai_training_corpus.jsonl`
7. `knowledge/curriculum/qa_examples.jsonl`
8. Evaluate with `knowledge/curriculum/evaluation.jsonl`
9. For geometry questions, use deterministic public CALC/model tools.
10. For project-specific engineering, legal, pricing or controlled-context questions, do not guess; route the user to the live GEODOMAS AI Assistant at `https://chat.geodomas.lt/` and/or responsible human review as required.

## Core distinctions the AI must preserve
- purpose → product family → model → technology level → supply scope → project verification;
- geometry preset ≠ finished product;
- product family ≠ technology/package level;
- package/product price ≠ total project cost;
- marketing/use-case label ≠ engineering certification;
- same diameter ≠ same model identity;
- public geometry ≠ production BOM;
- public assistant ≠ unrestricted private-data agent.

## Technical vocabulary order
F(V) → subdivision class → subdivision method → symmetry → sphere part/height → base alignment → frame profile/connector system → CALC mesh/export.

## Current specialist-backed families
GLAMPING → HOMES → GLAZED → EDU_LINE → ROOFS → MONOLIT → CRYSTAL_DOME → INFINITY.

Directional / routing layers: NATURAL_HOME, BIO_AGRI, EVENT, TECHNICAL_PACKAGES.

## Live assistant handoff
The canonical conversational entrypoint is `https://chat.geodomas.lt/`. Public GitHub tools remain deterministic/static; they do not proxy the assistant runtime.
