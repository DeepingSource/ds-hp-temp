#!/usr/bin/env bash
# Static export for GitHub Pages (project page at /ds-hp-temp).
# Temporarily removes server-only / dynamic pieces that `output: export` cannot
# build (middleware, /api route handlers, robots/sitemap/og metadata routes),
# then restores them — even on failure. No production source is modified.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

STASH=(
  "src/app/api"
  "src/proxy.ts"
  "src/app/robots.ts"
  "src/app/sitemap.ts"
  "src/app/opengraph-image.tsx"
  "src/app/twitter-image.tsx"
  "src/app/ms-agent/sitemap.ts"
)

BACKUP="$(mktemp -d)"
restore() {
  for p in "${STASH[@]}"; do
    if [ -e "$BACKUP/$p" ]; then
      mkdir -p "$(dirname "$p")"
      rm -rf "$p"
      mv "$BACKUP/$p" "$p"
    fi
  done
  rm -rf "$BACKUP" 2>/dev/null || true
}
trap restore EXIT

for p in "${STASH[@]}"; do
  if [ -e "$p" ]; then
    mkdir -p "$BACKUP/$(dirname "$p")"
    mv "$p" "$BACKUP/$p"
  fi
done

GH_PAGES=1 NEXT_PUBLIC_BASE_PATH="${NEXT_PUBLIC_BASE_PATH-/ds-hp-temp}" npx next build

# GitHub Pages must not run Jekyll (it would drop the _next/ asset folder).
touch out/.nojekyll
echo "✓ static export ready in ./out  (basePath=${NEXT_PUBLIC_BASE_PATH-/ds-hp-temp})"
