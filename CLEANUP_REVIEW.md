# DS_NEW_HP — Cleanup & Hygiene Review

**Project:** deepingsource.io corporate site (Next.js 16 / React 19 / Tailwind 4 / TypeScript) + STOREAGENT mockups
**Mode:** REVIEW ONLY — nothing in this document has been modified or deleted. All actions are recommendations.
**Date:** 2026-06-19
**Synthesis:** Merged from 6 review lenses (hygiene, dead-code, deps, structure, build-health, docs) with adversarial verification verdicts applied.

> **Hard rule applied:** Any item that adversarial verification marked **keep** or **uncertain** is excluded from removal buckets and listed only in [Section 7 — Do NOT remove / needs human decision](#7-do-not-remove--needs-human-decision). Only **safe-to-remove** / **consolidate** verdicts (and uncontested housekeeping) appear in actionable buckets.

---

## Build health snapshot

| Check | Result | Notes |
|---|---|---|
| `npx tsc --noEmit` | **PASS** (exit 0, 0 errors) | Type safety is the healthy gate |
| `npm run lint` | **FAIL** (exit 1) | 30 errors + 8 warnings; 25× `react-hooks/set-state-in-effect` |
| `npm run lint:tokens` | **PASS** (exit 0) | 2 hardcoded-color warnings (`#376AE2`) |
| `npm test` (vitest) | **FAIL** (exit 1) | 2/6 files, 5/31 tests red (matchMedia mock + pricing-data drift) |
| Version control | **NONE** | No `.git` directory exists (confirmed) |

---

## Executive priority order

1. **Bucket A (P0 safe housekeeping):** `git init`, delete 13 `.DS_Store`, ignore caches — zero behavioral risk, do first.
2. **Bucket E (build health):** fix red lint + tests before any deletion so you have a green baseline to detect regressions.
3. **Bucket B (dead code/assets, verified):** ~45MB of confirmed-unreferenced assets + dead components.
4. **Bucket F (deps/metadata):** declare `sharp`, fix `package.json` identity.
5. **Bucket C/D (structural + docs consolidation):** lower urgency, mostly editorial.

---

## A. P0 — Safe housekeeping

**riskLevel: safe**

| ID | Item | Path(s) | Action | Evidence |
|---|---|---|---|---|
| A-1 | No version control | `/Users/jamin.park/Downloads/DS_NEW_HP` | `git init` + initial commit. Existing `.gitignore` already excludes `node_modules/.next/out/.velite/.playwright-mcp` so no artifacts land. | Confirmed: NO `.git` directory; `.gitignore` is fully populated but inert. (HYG-001, STR-13) |
| A-2 | 13 `.DS_Store` files | root, `src/`, `content/`, `public/`, `public/images/`, `public/images/industries/`, `design-system/`, `assets/` + 5 under `assets/inventory/` | Delete: `find . -name .DS_Store -not -path './node_modules/*' -not -path './.next/*' -not -path './out/*' -not -path './.velite/*' -not -path './.playwright-mcp/*' -delete` | Confirmed 13 files in source dirs (root copy is 20KB). `.gitignore` already lists `.DS_Store`. (HYG-002, STR-10) |
| A-3 | `tsconfig.tsbuildinfo` not ignored | `/tsconfig.tsbuildinfo`, `/.gitignore` | Add `*.tsbuildinfo` to `.gitignore` **before** first commit. | Confirmed: `grep tsbuildinfo .gitignore` returns nothing (rc=1). 249KB incremental TS cache, regenerated every build. (HYG-005) |
| A-4 | Empty `.claude/` dir not ignored | `/.claude`, `/.gitignore` | Add `.claude/` to `.gitignore` (or remove the empty dir). | Empty agent scratch dir, 0 files. (HYG-006) |

> **Sequence note:** Do A-2/A-3/A-4 **before** A-1's initial commit, so caches and cruft never enter history.

---

## B. P1/P2 — Dead code & asset removal (verification = safe-to-remove)

**riskLevel: review** (each verified unreferenced, but run a production build to confirm before bulk-deleting; no git safety net until A-1)

### B-1. Stray root SVG — duplicate of served map · **P1 · verdict: consolidate (keep `public/`, remove root)**
- **Remove:** `/Map_of_South_Korea-blank.svg` (328KB, root, not served)
- **Keep (canonical):** `/public/images/korea-map.svg` (the served, processed copy)
- **Evidence:** Only `src/components/mockups/HqMapDashboardMockup.tsx:286` references the map, via `/images/korea-map.svg` (the public path). The root file's only "match" is internal SVG metadata. `cmp` shows the files differ (root carries Illustrator/inkscape cruft). Confirmed present (328035 bytes). (HYG-003, STR-05)

### B-2. Dead `industries/` component cluster · **P2 · verdict: safe-to-remove**
- **Remove (8 files):** `src/components/industries/{IndustryCardGrid,IndustryFaqSection,IndustryHeroMockup,IndustryHeroPills,IndustryStatsAnimated,IndustryStatsBar,IndustryTestimonialSection,PainPointsSection}.tsx`
- **Remove its feeder:** `src/data/industryContent.ts` (exports `industryData`/`IndustryContent`)
- **Evidence:** Zero external importers (static/dynamic/barrel/route). No `/industries` route. Only mentions are comments in `src/data/siteImages.ts` and a stale note in `docs/inventory/local/INVENTORY.md`. (dc-01, dc-02)
- **DO NOT confuse with** `src/data/industryList.ts` (LIVE — used by SolutionsView/SolutionDetailView/GlossaryDetailView). Keep it.

### B-3. 16 standalone unreferenced components · **P2 · verdict: safe-to-remove**
- **Remove:** `src/components/corporate/DomainShowcase.tsx`, `src/components/corporate/MilestoneStrip.tsx`, `src/components/mockups/TabletScreen.tsx`, `src/components/pricing/PlanComparison.tsx`, `src/components/pricing/PricingCard.tsx`, `src/components/sections/ComparisonSection.tsx`, `src/components/sections/IndustrySlider.tsx`, `src/components/sections/OnboardingStepsSection.tsx`, `src/components/sections/ProductScrollStory.tsx`, `src/components/sections/StatsSection.tsx`, `src/components/shared/FaqAccordion.tsx`, `src/components/storecare/DetectionGallery.tsx`, `src/components/storecare/HowItWorksStepper.tsx`, `src/components/storeinsight/HowItWorksInsightStepper.tsx`, `src/components/ui/ExpandableCaseCard.tsx`, `src/components/ui/InlineContactForm.tsx`
- **Evidence:** Each verified zero external references. `TabletScreen` is NOT in the `mockups/index.ts` barrel. Only hits are doc prose (`INVENTORY.md`) and 2 comments in `siteImages.ts`/`cctvImages.ts`. (dc-03)
- **Orphan chain:** `ProductScrollStory` is the **only** consumer of `src/lib/products-data.ts` → after removal, `products-data.ts` becomes dead too (remove it as well). `prefersReducedMotion` (used by `StatsSection`) has many other consumers — **keep it.**

### B-4. Unreferenced page-data modules · **P2 · verdict: safe-to-remove**
- **Remove:** `src/data/storecare-page-data.ts`, `src/data/storeinsight-page-data.ts`
- **Evidence:** Zero code importers (filename, `@/data/...` alias, and every distinctive export symbol checked). Live pages use `StoreCareView`/`StoreInsightView` + `*-i18n` + `@/lib/structured-data` instead. Only references are stale planning docs. (dc-04)
- **Follow-up:** Update `docs/PLAN_v1*.md`, `CODE_v1.md`, `AUDIT_v1.md` which still cite these as the intended data source (stale).

### B-5. Superseded source PNGs in `public/images/gen/` (~21MB) · **P1 · verdict: safe-to-remove**
- **Remove (9 files):** `public/images/gen/{bg-film01-entrance,bg-film02-beverage-aisle,bg-film03-store-night-street,bg-film04-cafe-counter,bg-film05-fashion-floor,iso-store-blueprint,pop-blank-iced-coffee,pop-blank-summer-drinks,texture-spatial-grid}.png`
- **Evidence:** Zero references. Live site uses optimized `.webp` under `public/images/nextrise/` (e.g. `MasterPair.tsx:26` → `/images/nextrise/bg-film00-night-cvs.webp`). These 9 PNGs have no `.webp` twin. The `cafe-counter`/`fashion-floor` keyword hits in `cctvImages.ts` are false positives → unrelated `/images/cctv/*.webp`. (dc-05)

### B-6. Orphaned product-section images (~2.5MB) — 19 of 20 safe · **P2 · verdict: safe-to-remove (19) / uncertain (1)**
- **Remove (19 files):**
  - about set: `public/images/about-ab-test.webp`, `about-ai-anonymizer.webp`, `about-anonymized-ai.webp`, `about-anonymizer.webp`, `about-conversion.webp`, `about-heatmap.webp`
  - storecare-how: `public/images/storecare-how-{1-capture,2-upload,3-analyze,4-alert,5-perfect}.webp`
  - storecare misc: `public/images/storecare-security.webp`, `storecare-dirty-table.webp`, `storecare-display-detection.webp`, `storecare-fridge-door-open-detection.webp`
  - storecare bg: `public/images/storecare/bg-{cafe,convenience,fashion,logistics}.webp`
- **Evidence:** Zero references. `storecare-how-*` / `storecare/bg-*` are orphans of dead components from B-3 (`HowItWorksStepper`, `DetectionGallery`). The `-2`/`-detection`-less siblings in `cctvImages.ts` are DIFFERENT files (proving the exact targets are unused). (dc-06)
- **⚠ EXCLUDED from removal:** `public/images/about-brand-aerial.webp` → **uncertain** (referenced as a build dest in `scripts/convert-images.mjs:101`). See Section 7.

### B-7. Stale numbered image variants · **P3 · verdict: safe-to-remove**
- **Remove (8 files):** `public/images/storeinsight-case1-beforeafter-3.webp`, `storeinsight-case1-chart5.webp`, `storeinsight-heatmap-pathway.webp`, `storeinsight-shelf-analysis.webp`, `public/images/industries/convenience-hero.webp`, `public/images/industries/unmanned-hero.webp`, `public/images/cctv/cctv-equip-fridge-door-open.webp`, `public/images/about-conversion.webp`
- **Evidence:** Each is an unused suffix variant beside a referenced canonical sibling. `shelf-analysis` hit resolves to a different `/images/si-guide/shelf-analysis.png`. `cctv-equip-fridge-door-open.webp` appears only as a build *dest* in `convert-images.mjs` (output, not consumed). (dc-07)
- *Note:* `about-conversion.webp` also listed in B-6; dedup when executing.

### B-8. One-off migration scripts (inputs deleted, migration complete) · **P3 · verdict: safe-to-remove (medium confidence)**
- **Remove/archive:** `scripts/migrate-to-mdx.mts`, `scripts/mdx-to-md.py`, `scripts/convert-images.mjs`
- **Evidence:** None wired to any npm script/CI/husky. `migrate-to-mdx` inputs (`src/data/articles/**/*.ts`) are gone; outputs (`content/articles/*.mdx`, 196 files) exist and are what Velite indexes. `convert-images` inputs (`new-image/`, `260302_New/`) are gone; outputs already in `public/images/`. (deps-06)
- **⚠ Caveats:** (a) **No git history** → these are the only record of the migration transforms; **archive, don't hard-delete**, until A-1 is done. (b) `convert-images.mjs` is the lone reference to `about-brand-aerial.webp` (B-6) and `cctv-equip-fridge-door-open.webp` (B-7) — removing the script clears that dependency. (c) Separately decide the fate of unused `content/articles-md/` (196 generated `.md` files referenced nowhere).

---

## C. P2/P3 — Structural consolidation

**riskLevel: review** (no deletions; renames touch importers — verify references)

| ID | Item | Path(s) | Action | Evidence |
|---|---|---|---|---|
| C-1 | Hand-mirrored brand hex `#376AE2` in 3 places, no sync guard | `src/app/globals.css`, `src/lib/tokens.ts`, `design-system/dist/saai-tokens.css` | Extend `scripts/check-design-tokens.mjs` to assert `globals.css` `:root` primary == `tokens.ts` `BRAND.primary`, so drift fails the token check. **Do not** wire `design-system/` into the build — it is intentional SAAI reference. | `design-system/dist` is NOT `@import`-ed by `globals.css`; root `DESIGN.md` says "Don't wire site components to design-system/." (STR-02) |
| C-2 | Data-file naming drift (camelCase `*Data.ts` vs kebab `*-data.ts`) | `src/data/`, `src/lib/` | Low-priority cosmetic. If pursued, standardize on kebab (matches `*-i18n` files) gradually; each rename touches importers. | All camelCase base files are LIVE and referenced — **not removable** (verified keep). (STR-07) |
| C-3 | i18n overlay pairs with mismatched stems | `glossaryTerms.ts`↔`glossary-i18n.ts`, `briefingData.ts`↔`storeagent-briefing-i18n.ts`, `area-i18n.ts`, `pos-analysis-i18n.ts`, `storeagent-mock-i18n.ts` | Document the overlay convention once (e.g. `src/data/README.md`); optionally align base-file stems so pairs are self-evident. No deletions. | Overlay pattern is sound and consistent; only stem naming is non-obvious. (STR-08) |
| C-4 | Single-file component folders (folder sprawl) | `src/components/{technology,storeinsight,solutions,products,pages,company,about}/` | Optional flatten only if it aids navigation. Harmless as-is. Reuse is good where it matters (`shared/StepperShell.tsx` shared by 2 steppers). | 7 folders with exactly one `.tsx`. (STR-11) |

> `src/proxy.ts` is **correct** Next.js 16 naming (`middleware`→`proxy`), consumed by LocaleSwitcher/HtmlLangSync/useSiteMode — **not** a stray. No action. (STR-12)

---

## D. Docs consolidation

**riskLevel: safe** (all editorial — add banners/headers, no deletions; verification confirmed all DESIGN docs are live-referenced — see Section 7)

| ID | Item | Path(s) | Action | Evidence |
|---|---|---|---|---|
| D-1 | Three DESIGN docs, unclear authority | `/DESIGN.md` (live SOT), `design-system/DESIGN.md` (SAAI), `docs/DESIGN_v2.md` (Phase-3 plan) | Anoint root `DESIGN.md` as design SOT (already self-declares). Add one-line audience banner to the other two. **Do not merge or delete** — distinct audiences. Consider renaming `design-system/DESIGN.md` → `SAAI_BRAND_SYSTEM.md`. | All three are actively referenced (tokens.ts, styleguide, globals.css comments, INDEX, ~10 docs). (HYG-008, STR-03, docs-01) |
| D-2 | `design-system/` "single source" points at a missing file | `design-system/DESIGN.md` + 15 others cite `constitution/SAAI_MASTER.md` | `find` confirms `constitution/` and `SAAI_MASTER.md` do **not** exist. Add a note that the constitution lives in the upstream SAAI repo and these are a read-only export snapshot (or copy the file in). | 16 files carry a dangling "단일 source" pointer. (docs-02) |
| D-3 | `docs/INDEX.md` presents stale Phase 1–4 plan as live SOT | `docs/INDEX.md`, `PLAN_v1.1.md`, `CODE_v1.md`, `AUDIT_v1.md` | Add dated banner: "Phase 1–4 planning artifacts (2026-05-29), preserved for history; site has shipped past this — see `/DESIGN.md` + live `src/`." Reclassify `_v1/_v2` from "SOT" to "Archive". | INDEX assumes 22→30 routes; actual `find src/app -name page.tsx` = 115. Homepage recut, NEXTRISE pivot, GH Pages deploy not reflected. (docs-03) |
| D-4 | `DESIGN_v2`/`BRAND_v2` cite deliverables/folders that don't exist | `docs/DESIGN_v2.md`, `docs/BRAND_v2.md` | When archiving, annotate that `ui_kits/corporate/` was never built, `audience-corporate` shipped in `src/` instead, and `brand-system/` (41 docs) lives upstream. Also fix root `DESIGN.md` line 7 which references a non-existent `brand-system/` folder. | `find` confirms `ui_kits/corporate/` and `brand-system/` absent. (STR-04, docs-04) |
| D-5 | `BRAND_v2`/`CASE_STUDIES_v1` predate NEXTRISE pivot; carry `(가상)` placeholders | `docs/BRAND_v2.md`, `docs/CASE_STUDIES_v1.md` | Point voice readers to live SOT `src/lib/brand-canon.ts` (REINVENT OFFLINE). Relabel CASE_STUDIES as draft so `(가상)` figures aren't mistaken for publishable data. | `brand-canon.ts` has REINVENT OFFLINE; BRAND_v2 has none; CASE_STUDIES has 32 placeholder markers. (docs-05) |
| D-6 | MOCKUP_PROPOSALS v1–v5 + REVIEW v1/v2 append-only chain | `docs/MOCKUP_*` | Add a 2–3 line "current state" note atop the newest (`MOCKUP_REVIEW_v2.md`) pointing to live SOT (`canonical.ts` + `/demo`). No merge needed. | Live SOT is `canonical.ts`/`storeagent-mock-i18n.ts`, which these predate. (docs-07) |
| D-7 | `docs/` mixes 18 authored docs + 119 scraped inventory files, no README | `docs/`, `docs/inventory/` | Add `docs/README.md` splitting "Authored (historical planning)" vs "inventory/ (scraped reference, do not edit)". **Keep** the inventory. | No `docs/README.md`; only orientation is the stale INDEX. (docs-08) |
| D-8 | `AUDIT_v1` tracks 29 defects (F-01..F-27) against a frozen plan | `docs/AUDIT_v1.md` | Treat as historical when archiving. A fresh audit vs current `src/` would be more useful than reconciling stale F-IDs. | No PLAN_v1.2 / CODE_v1.1 / AUDIT_v2 exist; the defect-tracking loop is orphaned. (docs-09) |

---

## E. Build / type / lint / test health

**riskLevel: review** (code changes; fix and re-run the relevant check)

| ID | Item | Path(s) | Action | Evidence |
|---|---|---|---|---|
| E-1 | `npm test` FAIL — missing `window.matchMedia` mock | `vitest.setup.ts`, `src/hooks/useScrollAnimation.test.tsx` | Add standard jsdom `window.matchMedia` stub to `vitest.setup.ts` → recovers all 4 `useScrollAnimation` tests. | All 4 tests throw `TypeError: window.matchMedia is not a function` at `useScrollAnimation.ts:19`. (bh-test) |
| E-2 | `npm test` FAIL — pricing-data drift (expects 4 plans, has 3) | `src/lib/pricing-data.test.ts`, `src/lib/pricing-data.ts` | Decide with product: add the missing `enterprise` plan (feature rows already reference it) **or** update the test to expect 3. | Test asserts `toHaveLength(4)`; array has free/standard/premium only; feature rows reference a phantom `enterprise` tier. (bh-test) |
| E-3 | `npm run lint` FAIL — 25× `react-hooks/set-state-in-effect` | `src/hooks/useScrollAnimation.ts`, `src/lib/mockup-time.ts`, `src/hooks/useMockupLoop.ts`, `src/components/mockups/*`, `CountUp.tsx`, `IosStatusBar.tsx` | Triage: refactor hotspots to lazy-init/external-store, **or** if accepted for the SSG mockup layer, downgrade the rule to `warn` for `src/components/mockups` + animation hooks. | `✖ 38 problems (30 errors, 8 warnings)`. Same anti-pattern across ~30 files. (bh-lint) |
| E-4 | `npm run lint` — 2× `react/no-unescaped-entities` | `src/lib/faq-data.tsx:172` | Quick fix: escape the apostrophes. Do this first (trivial). | 2 errors at one location. (bh-lint) |
| E-5 | `npm run lint` — 4 unused-var warnings (dead bindings) | `src/data/industryContent.ts` (`categoryMeta`), `src/components/blog/ArticleRenderer.tsx:10` (`canonicalStore`), `src/components/mockups/AlertFatigueComparison.tsx:159` (`active`), (`COMPANY`) | Remove the 4 unused bindings (trivial dead-code). Note `industryContent.ts` itself is removed in B-2. | `@typescript-eslint/no-unused-vars`. (bh-lint-unused) |
| E-6 | `react-hooks/error-boundaries` + `react-hooks/refs` | `src/hooks/useMockupLoop.ts:89` ("Cannot update ref during render") + 2 try/catch-around-hooks | Refactor the ref-update-during-render and the 2 try/catch-around-hook cases. | Part of the 30 lint errors. (bh-lint) |
| E-7 | `lint:tokens` — 2 hardcoded `#376AE2` (non-blocking) | `src/app/layout.tsx:56` (theme-color meta), `src/app/styleguide/page.tsx:17` (swatch demo) | Optional: source theme-color from the token. Both are legitimate literals; not build-blocking. | `lint:tokens` exits 0 with 2 warnings. (bh-lint-tokens) |

> `npx tsc --noEmit` is **clean** — keep it as the CI gate while stabilizing lint/test. (bh-tsc)

---

## F. Dependency & metadata

**riskLevel: safe** (metadata) / **review** (the `sharp` declaration)

| ID | Item | Path(s) | Action | Evidence |
|---|---|---|---|---|
| F-1 | `package.json` identity drift | `/package.json`, `/package-lock.json` | Update `name` (`storeagent-b2c-landing` → e.g. `deepingsource-site`), `description`, `author` (`STOREAGENT Team` → `Deeping Source`). Regenerate lockfile via `npm install`. `private:true` so the name isn't published. | name/desc describe a B2C morning-briefing landing page; repo is the 30-route DeepingSource corporate site. (HYG-007, deps-01/02/03, STR-01, docs-06, bh-metadata) |
| F-2 | `sharp` imported but **not declared** | `scripts/convert-images.mjs:6`, `/package.json` | If the script is kept (see B-8), declare `sharp` in `devDependencies` pinned to `~0.34.x`. If the script is archived per B-8, this resolves itself. | `sharp` absent from package.json; resolvable only transitively via Next.js + Velite. **Verification: keep — do not delete the script blindly; declare the dep.** (deps-04) |
| F-3 | Dormant umami analytics scaffolding | `docker-compose.umami.yml`, `src/components/Analytics.tsx`, `src/app/layout.tsx` | Parked scaffolding, **explicitly marked KEEP** in `docs/CODE_v1.md:114` / `AUDIT_v1.md:233`. Do NOT remove. If keeping: drop the obsolete `version:` key and document as not-yet-wired. | Import commented out (`layout.tsx:13`), render in `{/* */}` (`:141`), no `NEXT_PUBLIC_UMAMI_*` env. **Verification: keep.** (deps-05) |

---

## Suggested execution order

1. **A-2, A-3, A-4** — delete `.DS_Store`, ignore `*.tsbuildinfo` and `.claude/`.
2. **A-1** — `git init` + initial commit (now you have a safety net for everything below).
3. **E-4, E-5, E-1, E-2** — fix the trivial lint + the 2 test failures to get a near-green baseline.
4. **E-3, E-6** — triage the `set-state-in-effect` / refs errors (refactor or rule-downgrade).
5. **B-1** — remove the stray root `Map_of_South_Korea-blank.svg`.
6. **B-5, B-6 (19 files), B-7** — delete confirmed-unreferenced images (~24MB). Run `npm run build` after.
7. **B-2, B-3, B-4** — remove dead components + feeders + page-data; then re-check `products-data.ts` orphan. Run `npm run build` again.
8. **B-8** — archive (not hard-delete) the 3 one-off scripts; then **F-2** resolves.
9. **F-1** — fix `package.json` metadata + regenerate lockfile.
10. **C, D** — structural/docs editorial passes (banners, README, token sync guard) at leisure.

> **Verification gate for Bucket B:** run `npm run build` (full production build) before and after each deletion batch. TypeScript is clean today; a build failure after deletion = a missed dynamic reference, restore and investigate.

---

## 7. Do NOT remove / needs human decision

These were **claimed dead or duplicate by a lens but verification returned `keep` / `uncertain`**. Excluded from all removal buckets. Listed with their proven referencing files.

| Item | Path(s) | Verdict | Why it must stay / who references it |
|---|---|---|---|
| `docs/inventory/` ↔ `assets/inventory/` (claimed duplicates) | `docs/inventory/`, `assets/inventory/` | **keep** (REFUTED) | Not duplicates — `docs/inventory/` is 100% docs (md/html/json), `assets/inventory/` is 100% binaries (svg/webp/png); zero file overlap. Both referenced by docs tooling: `docs/INDEX.md`, `PLAN_v1.md`, `PLAN_v1.1.md`, `CASE_STUDIES_v1.md`, `ASSET_COLLECTION_v1.md`, and the four `INVENTORY.md` files. |
| Repo-root `assets/` (151MB) | `assets/`, `assets/Asset Candidate/`, `assets/inventory/`, `assets/io/` | **keep** | Not served, not a build input — but it is the **editable source-of-record** for `public/` images, tracked by `docs/PLAN_v1*.md`, `DESIGN_v2.md`, `ASSET_COLLECTION_v1.md`, `inventory/*/INVENTORY.md`. Do NOT delete. May relocate to `/design-assets` or add `/assets` to `.gitignore` so 151MB isn't committed — a human/team decision. (HYG-004, dc-08, STR-06) |
| `public/images/about-brand-aerial.webp` | `public/images/about-brand-aerial.webp` | **uncertain** | Referenced as a build dest in `scripts/convert-images.mjs:101`. Regenerable, but the lens's "coincidental substring" rationale was factually wrong. Decide alongside B-8 (if the script is archived, re-evaluate). |
| `public/noise.svg`, `public/logo.svg` | `public/noise.svg`, `public/logo.svg` | **uncertain** | No internal refs, but served at public URLs — could be hit by external pages/emails/embeds. `logo.svg` is NOT identical to the canonical `public/icon.svg`. `noise.svg` is the safer candidate (CSS uses an inline SVG) but was claimed as a pair. Confirm no external reference before removing. (dc-09) |
| `scripts/convert-images.mjs` (the `sharp` finding) | `scripts/convert-images.mjs`, `package.json` | **keep** | Do not delete on the dependency finding. Fix is to **declare `sharp`** (F-2). Separately, B-8 may archive it as a spent one-off — but that is a different rationale, archive not delete. |
| umami stack | `docker-compose.umami.yml`, `src/components/Analytics.tsx`, `src/app/layout.tsx` | **keep** | Explicitly marked "유지 (Umami)" in `docs/CODE_v1.md:114`, audited PASS in `AUDIT_v1.md:233`, "재활용 가능한 자산" in `inventory/local/INVENTORY.md:39`. Parked, intentional. (deps-05) |
| All 3 DESIGN docs | `/DESIGN.md`, `design-system/DESIGN.md`, `docs/DESIGN_v2.md` | **keep** | All live-referenced (tokens.ts, styleguide, globals.css comments, INDEX + ~10 docs, CorporateHero/DomainShowcase). Distinct audiences. Consolidation = banners/renames only, NOT deletion. (STR-03) |
| All camelCase `*Data.ts` base files | `briefingData.ts`, `posAnalysisData.ts`, `solutionsData.ts`, etc. | **keep** | Every one is imported and live (sitemap, routes, corporate views, i18n overlays). The naming-drift finding is cosmetic-only; renames are optional and touch importers. (STR-07) |
| Both FAQ rendering paths | `FAQSection.tsx`, `FaqView.tsx`, `faq-data.tsx`, `faq-i18n.tsx` | **keep** | All four live. `FAQSection` rendered via `StoreAgentContent` on `/storeagent` + `/ms-agent`; `FaqView` on all 3 `/resources/faq` locale routes. The "ko-only vs localized" overlap is a product decision (localize STOREAGENT FAQ?), not dead code. (STR-09) |
| `src/data/industryList.ts` | `src/data/industryList.ts` | **keep** | LIVE — used by SolutionsView/SolutionDetailView/GlossaryDetailView. Easily confused with the dead `industryContent.ts` (B-2). Do NOT remove. (dc-02) |
| `src/lib/prefersReducedMotion.ts` | `src/lib/prefersReducedMotion.ts` | **keep** | Many consumers (CountUp, IndustryStats*, StepperShell, useMockupLoop, mockup-time). Survives the B-3 `StatsSection` removal. (dc-03) |

---

*Generated by the synthesis lead from 6 review lenses + adversarial verification. Review-only: no files were modified.*
