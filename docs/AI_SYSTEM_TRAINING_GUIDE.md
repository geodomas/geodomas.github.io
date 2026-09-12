# Training an AI system to understand GEODOMAS

## Goal
Teach product taxonomy first, technical vocabulary second, deterministic CALC usage third, and project/claim boundaries throughout.

## Canonical public load order
1. `knowledge/product_ontology.json`
2. `knowledge/project_start_guides.json`
3. `knowledge/curriculum/curriculum.json`
4. `knowledge/curriculum/glossary.json`
5. `knowledge/ai_training_corpus.jsonl`
6. `knowledge/curriculum/qa_examples.jsonl`
7. Evaluate with `knowledge/curriculum/evaluation.jsonl`
8. For geometry questions, use deterministic public CALC/model tools.
9. For project-specific engineering, legal, pricing or private-data questions, do not guess; route to qualified assistant/human review.

## Core distinctions the AI must preserve
- geometry preset ≠ finished product;
- product family ≠ package level;
- package price ≠ total project cost;
- marketing/use-case label ≠ engineering certification;
- public geometry ≠ production BOM;
- public assistant ≠ unrestricted private-data agent.

## Technical vocabulary order
F(V) → subdivision class → subdivision method → symmetry → sphere part/height → base alignment → frame profile/connector system → CALC mesh/export.

## Canonical public family order
GLAMPING → HOMES → GLAZED → ROOFS → MONOLIT → CRYSTAL_DOME → NATURAL_HOME → INFINITY.

Additional public directions not yet fully trained in V1: EDUCATION, EVENT, TECHNICAL_PACKAGES.
