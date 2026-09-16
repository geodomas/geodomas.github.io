#!/usr/bin/env bash
set -euo pipefail
ROOT=$(cd "$(dirname "$0")/.." && pwd)
python3 "$ROOT/tools/build_family_pages.py"
python3 "$ROOT/tools/build_sitemap.py"
# GitHub Pages for this repository is currently configured to publish /docs.
# Keep root as the authoring tree and mirror only the public runtime surface.
for dir in assets academy knowledge lab; do
  rm -rf "$ROOT/docs/$dir"
  cp -a "$ROOT/$dir" "$ROOT/docs/$dir"
done
cp "$ROOT/index.html" "$ROOT/docs/index.html"
# In the /docs Pages root, documentation files are already at the web root.
sed -i 's#docs/GEODOMAS_AI_CURRICULUM_V1\.md#GEODOMAS_AI_CURRICULUM_V1.md#g' "$ROOT/docs/index.html"
: > "$ROOT/docs/.nojekyll"
for file in robots.txt sitemap.xml 404.html; do
  cp "$ROOT/$file" "$ROOT/docs/$file"
done
