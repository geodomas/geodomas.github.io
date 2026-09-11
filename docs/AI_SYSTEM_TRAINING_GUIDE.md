# Training an AI system to understand GEODOMAS

## Goal
The AI should first learn the GEODOMAS product taxonomy and boundaries, then learn how to route a user to the right family, then use CALC/model tools for geometry, and only after that escalate project-specific claims.

## Training order
1. Load `knowledge/product_ontology.json`.
2. Load `knowledge/project_start_guides.json`.
3. Use `knowledge/ai_training_corpus.jsonl` as routing/boundary examples.
4. For geometry questions, call public deterministic CALC/model tools.
5. For project-specific engineering, legal, pricing or private-data questions, do not guess; route to qualified assistant/human review.

## Core distinctions the AI must preserve
- geometry preset ≠ finished product;
- product family ≠ package level;
- package price ≠ total project cost;
- marketing use case ≠ engineering approval;
- public geometry ≠ production BOM;
- public assistant ≠ unrestricted private-data agent.

## Canonical public family order
GLAMPING → HOMES → GLAZED → ROOFS → MONOLIT → CRYSTAL_DOME → NATURAL_HOME → INFINITY.

Additional directions currently exposed by the public GEODOMAS network but not fully trained in V1: EDUCATION, EVENT, TECHNICAL_PACKAGES.
