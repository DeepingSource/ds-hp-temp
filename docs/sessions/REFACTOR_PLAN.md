# Refactor Plan — DS_NEW_HP (live `src/`)

> **Status:** ✅ EXECUTED & SHIPPED (2026-06-19) — endorsed batch applied on `chore/refactor`, merged to `main`, deployed to gh-pages. Retained as execution record.

Scope: code-quality refactoring (reduce duplication / complexity / inconsistency) in **live** code under `src/`.
This is **not** a hygiene pass — but a handful of clearly-dead exports that the prior pass missed are included because they are zero-risk and remove misleading API surface.

Baseline before starting (must stay green after every batch): `tsc` clean, `lint` 0 errors, 31/31 tests pass, `build` OK.
Branch: `chore/refactor` (clean working tree).

**Bar applied:** only changes a senior engineer would clearly endorse as reducing complexity/duplication with real payoff. No speculative abstraction, no single-use extraction, no aesthetic renames. Rejected candidates are listed at the bottom so the considered-and-declined set is visible.

Candidate accounting: **22 findings reviewed → 13 carried forward (8 endorse + 5 needs-care) → 9 rejected.**

---

## Verification commands (per batch)

```bash
npx tsc --noEmit          # types
npm run lint              # 0 errors expected (warnings unchanged)
npm test                  # 31/31
npm run build             # SSG/production build
```

For UI-affecting items (Batch C), additionally do a manual visual diff on `/`, `/ko/*`, `/jp/*` for the touched routes.

---

## Batch A — SAFE (behavior-preserving; ship first)

These are pure deletions or mechanical reuse of an existing idiom. No rendered output changes. Ordered by payoff/effort.

### A1. Delete dead exports in `src/lib/mockup-tokens.ts` — **endorse, ~50 LOC**
- **Files:** `src/lib/mockup-tokens.ts`
- **Change:** Delete `MOCKUP_SIZES` (14-30), `MOCKUP_RESPONSIVE` (33-37), `INDUSTRY_ACCENT` (111-119) and the now-orphaned types `DeviceType` (10), `SizeVariant` (11), `IndustrySlug` (121), `MockupScheme` (107). Fix the file header comment (line 5) that tells pages to "use MOCKUP_SIZES". **Keep** `MOCKUP_SCHEME`, `PRODUCT_THEME`, `MOCKUP_DEVICE`, and `ProductName` (live — it keys `PRODUCT_THEME`; do **not** de-export it).
- **Verified:** grep for all seven symbols outside the file returns zero hits.
- **Payoff:** removes ~⅓ of a shared design-system SoT; kills a dead second responsive-sizing scheme competing with the live one.
- **behaviorRisk:** low (inert class-string tables + unused types; no DOM emit).
- **Verify:** `tsc` + `build`.

### A2. Remove dead `PlanData` interface + unused props on `PricingClientView` — **endorse, ~14 LOC**
- **Files:** `src/components/pricing/PricingClientView.tsx` (lines 12-25)
- **Change:** Delete the `PlanData` interface (12-20) and the `storeCarePlans?` / `storeAgentPlans?` props (24-25). Leave `PricingClientViewProps` as `{ locale?: Locale }`.
- **Verified:** grep shows the three symbols appear **only** at their own declarations; all 3 callers (`src/app/pricing/page.tsx`, `/ko`, `/jp`) pass only `locale`.
- **Payoff:** removes a misleading "injectable plans" API on the largest component (1106 LOC) that the body never reads.
- **behaviorRisk:** low (type-level only; erases at compile time).
- **Verify:** `tsc`.

### A3. Delete dead `IpadStatusBar.tsx` — **endorse, ~67 LOC**
- **Files:** `src/components/ui/IpadStatusBar.tsx` (delete entire file)
- **Change:** Remove the file. No barrel re-exports it; `ui/` has no index.
- **Verified:** repo-wide grep for `IpadStatusBar` returns only its own interface (line 5) + default export (line 30). Sibling `IosStatusBar` is correctly found consumed by `PhoneScreen.tsx`, proving the grep is sound.
- **Payoff:** removes an unused component plus its private duplicate `useCurrentTime` hook and status-icon SVGs.
- **behaviorRisk:** low (nothing imports/renders it).
- **Verify:** `tsc` + `build`.

### A4. Delete dead data constants in live data files — **endorse, ~80 LOC**
- **Files:** `src/data/cctvImages.ts` (`cctvByDetection` 395, `cctvCoverageGrid` 424, **plus** the example-import comment line 8 that names them), `src/data/siteImages.ts` (`industryDashboardImages` 23, `industrySliderImages` 34 + their false "used in …" JSDoc), `src/data/seasonal/catalog/checklists.ts` (`holidayReturnChecks` 71), `src/data/seasonal/catalog/events.ts` (`gangnamJobFair` 17, `elementaryFieldTrip` 44), `src/lib/pricing-data.ts` (`comparisonFeatures` 99)
- **Change:** Delete each unreferenced export and any stale doc/example comment that names it. Leave sibling live exports untouched.
- **Verified:** each symbol appears only at its definition (and, for the cctv pair, an example-import comment). `eventCalendar.ts` imports only the `EventBlock` *type*, not the event constants.
- **Payoff:** removes stranded data and **false** "used in X" JSDoc that actively misleads editors of these registries.
- **behaviorRisk:** low (zero call-sites; render-data only).
- **Verify:** `tsc` + `build` (tsc catches any missed intra-repo import).

### A5. Delete truly-dead helpers `getArticleMetasByCategory`, `springBouncy` — **endorse, ~10 LOC**
- **Files:** `src/lib/article-metadata.ts` (20-22), `src/lib/spring-config.ts` (27)
- **Change:** Delete both. Their siblings (`getAllArticlesMeta`, the other spring presets) are used.
- **Verified:** each appears only at its own definition.
- **Excluded:** `trackEvent`/`trackPageView` in `Analytics.tsx` are intentional staged Umami scaffolding — **leave them.**
- **behaviorRisk:** low.
- **Verify:** `tsc`.

### A6. Delete dead `GRAY` / `STATUS` exports in `src/lib/tokens.ts` — **endorse, ~20 LOC**
- **Files:** `src/lib/tokens.ts` (`GRAY` 23-34, `STATUS` 37-41)
- **Change:** Delete both const blocks. Keep `BRAND` (the only consumed export — `opengraph-image.tsx`, `twitter-image.tsx`).
- **Verified:** only `BRAND` is imported anywhere; the only other `GRAY` hit is the word inside an unrelated comment in `AutonomyLadderTimeline.tsx:205`.
- **Payoff:** shrinks the manual CSS↔JS "KEEP IN SYNC" surface the file's own header warns about.
- **behaviorRisk:** low.
- **Verify:** `tsc` + `build`.

### A7. Extract a 4-line `<Spinner />` and reuse in 3 form sites — **endorse (part a of dup-3), ~9 LOC net**
- **Files:** new `src/components/ui/Spinner.tsx`; consumers `src/components/ui/NewsletterForm.tsx`, `src/components/ui/InlineNewsletterForm.tsx`, `src/app/contact/ContactFormPage.tsx`
- **Change:** Move the byte-identical `<svg className="animate-spin motion-reduce:animate-none h-4 w-4" …>` into a tiny presentational `Spinner` (uses `currentColor`, so callers keep controlling color via parent). Replace the 3 inline copies.
- **Verified:** exactly 3 byte-identical occurrences (confirmed by grep on the class string).
- **Payoff:** removes the most blatant copy-paste in the UI layer; byte-identical render.
- **behaviorRisk:** low.
- **Verify:** `tsc` + visual check of the spinner in any form's submitting state.
- **NOTE:** Do **not** also do part (b) of dup-3 (status-bar `useCurrentTime` unification) — see Rejected.

### A8. Extract `submitQuoteRequest()` for the 3 pricing `/api/contact` POSTs — **endorse, ~40 LOC**
- **Files:** new helper (e.g. `src/lib/contact-lead.ts` or co-located in `src/components/pricing/`); consumers `src/components/pricing/PricingClientView.tsx` (`handleSimulateSubmit` 452-472, `handleB2bSubmit` 474-494), `src/components/pricing/CameraSimulator.tsx` (inline `onSubmit` 775-799)
- **Change:** Add `submitQuoteRequest(payload: { name; contact; storeCount; inquiryType; message }): Promise<boolean>` that POSTs to `/api/contact`, returns `res.ok`, and swallows network errors (matching today's empty catch). Each call-site keeps its own outer guard, `preventDefault`, and state setter; only the fetch+ok-check moves: `if (await submitQuoteRequest({...})) setXSubmitted(true)`.
- **Verified:** the 3 blocks share method/header/5-field payload/`if(res.ok) setXSubmitted(true)`/silent catch; differ only by field values + which flag flips. **Do NOT** fold in the 4th caller `ContactFormPage.tsx:360` — it has different behavior (AbortController + 5s timeout, throws on `!res.ok`, surfaces error text).
- **Payoff:** one typed `/api/contact` payload shape; prevents field drift across the 3 forms.
- **behaviorRisk:** low (behavior bit-identical at each site).
- **Verify:** `tsc` + existing `route.test.ts` still covers the endpoint contract; manually submit one pricing quote form.

---

## Batch B — REVIEW (behavior-preserving, but verify via build/tests/diff)

Larger mechanical changes; verify carefully.

### B1. Move FAQ content + overlay from `src/lib/` to `src/data/` — **endorse, structural, 4 import edits**
- **Files:** `git mv src/lib/faq-data.tsx → src/data/faq-data.tsx`, `git mv src/lib/faq-i18n.tsx → src/data/faq-i18n.tsx`. Update 4 import specifiers: `faq-i18n.tsx:4` (`@/lib/faq-data` → `@/data/faq-data`), `FaqView.tsx:4-5`, `FAQSection.tsx:5`. **Also** add a `faq-i18n → faq-data` row to `src/data/README.md`'s overlay table (note the `.tsx` exception, since answers contain JSX).
- **Verified:** every other content+overlay pair (glossary/solutions/pos) lives in `src/data/`; FAQ is the lone outlier. Blast radius is exactly these 4 static alias imports — grep for `@/lib/faq` finds only them.
- **Payoff:** makes "all page content + i18n overlays live in `src/data/`" a reliable navigation rule (codified in `README.md`).
- **behaviorRisk:** low (pure path move; keep `.tsx`).
- **Verify:** `tsc` + re-grep `@/lib/faq` returns zero + `build`.

### B2. Add a `HeroBadge` primitive; replace ~17 verbatim pill-badge copies — **needs-care, ~17 sites**
- **Files:** new `src/components/ui/HeroBadge.tsx` (built on `cn()`, mirroring `Eyebrow`/`IconChip`); replace 13 dark + 4 light sites across the view files (e.g. `RetailView`, `DrugView`, `AboutView`, `SolutionsView`, `TechnologyView`, `AnonymizerView`, `SpatialAiView`, `SealView`, `ModelsView`, …).
- **Change:** `tone` prop — `dark` → `bg-white/10 border border-white/20 text-white/70 backdrop-blur-sm`; `light` → `bg-primary-lighter text-primary`. `children` for icon+label; margin passed via `className` (e.g. AboutView's `mb-10` vs default `mb-8`).
- **Verified:** dark string is byte-identical ×13, light string ×4. Strong in-repo precedent: `Eyebrow.tsx` does exactly this and is used by 8 files.
- **GUARDRAILS (why needs-care):**
  - `AboutView` wraps an **animated dot `<span>`**, not a lucide icon — `children` handles it, but confirm visually.
  - **Do NOT touch `LargeSpaceView`'s second badge (~line 228)** — it omits `tracking-wide`/`backdrop-blur-sm`, uses `px-3 py-1.5 text-xs mb-6`, and is a section sub-label, not a hero. It is NOT a match.
  - No tests assert classNames — do a visual diff of every converted hero.
- **Payoff:** removes 17 long-class copies; one place to tune the brand hero badge.
- **behaviorRisk:** low *if* scoped to exact matches only.
- **Verify:** `tsc` + `lint` + visual diff of converted heroes on light/dark sections.

---

## Batch C — RISKY / needs-care (could change behavior; gated on confirmation)

### C1. Converge raw internal `href` on `localeHref` in locale-aware views — **needs-care, INTENTIONAL behavior fix, 18 files / ~36 edits**
- **Files (18 view files with raw hrefs):** `ModelsView, SolutionsView, ProductsView, EnterpriseView, StoreCareView, StoreAgentView, AnonymizerView, StoreInsightView, FaqView, LargeSpaceView, TechnologyView, GlossaryDetailView, SpatialAiView, FoodBeverageView, RetailView, DrugView, SealView, SaaiView` — all under `src/components/corporate/views/`. Helper: `src/lib/i18n.ts:42`.
- **Change:** Replace each raw `href="/contact"` (and `/pricing`, `/products`, `/technology/*`, `/resources/*`, `/solutions`, `'/'`) with `href={localeHref(locale, '/contact')}`. Preserve query strings: `localeHref(locale, '/contact') + '?product=StoreAgent'`. Do **not** introduce a new helper — `localeHref` is the converged idiom (already used by 8 views: AboutView, NewsView, InvestorsView, CaseStudiesView, CareerView, ResourcesView, PartnershipView, DocsView).
- **Why this is a real fix, not cosmetic:** `/ko/*` and `/jp/*` are real route trees (confirmed `/ko/contact`, `/jp/contact`, `/ko/pricing`). There is no middleware and no Link wrapper, so a raw `href="/contact"` on a `/ko` page silently sends Korean users to the English page. For `en`, `localeHref('en', x) === x` (output byte-identical).
- **GUARDRAILS (behaviorRisk: high):**
  - **NOT behavior-preserving by design** — that's the point. Treat as an intentional locale-nav fix, not a no-op.
  - The proposal's claim that query-bearing `localeHref` calls already exist is **false** (grep: none). The pattern is trivially correct but new — verify it renders `/ko/contact?product=StoreAgent`.
  - `?product` / `?plan` ARE read by the contact form (`ContactFormPage.tsx:333-334`) — preserving them is load-bearing. `?type=enterprise` is inert (form never reads it) — preserve anyway for byte-equality.
  - No test asserts href prefixes. **Manually smoke-test CTAs on `/ko` and `/jp`** confirming they stay in-locale and query params survive.
- **Payoff:** fixes broken locale continuity for ko/jp visitors; uniform link construction.
- **Verify:** `tsc` + manual route smoke test on `/ko` and `/jp` for each touched CTA.

### C2. Split `PricingClientView` (1106 LOC) into 3 sibling components — **needs-care, large relocation**
- **Files:** `src/components/pricing/PricingClientView.tsx` → new `B2cPlans`, `B2bQuoteSimulator`, `InlinePricingSimulator` in `src/components/pricing/`. Parent keeps persona-toggle state + composition.
- **Change:** Move each block's local state/handlers into its own component, each receiving the full `t` slice (simplest safe contract). Preserve exact `/api/contact` payloads.
- **GUARDRAILS (the original proposal misdescribes the tree — correct before acting):**
  - The persona ternary (~line 544) gates **only** B2C-plans vs B2B-simulator. The **inline lead-gen simulator (924-1072), ROI widget (915-919), and Bundle CTA (1077-1103) render UNCONDITIONALLY for BOTH personas.** Preserve that composition order exactly — do not move always-on sections under the ternary.
  - **Do NOT couple to a `QuoteLeadForm`** — no such component exists (grep: zero refs). Keep this split standalone.
  - **Do NOT split the 130-line `Content` interface.**
  - No rendered-output tests guard these views; self-rated behaviorRisk medium.
- **Pairs with A8** (the two simulators consume `submitQuoteRequest`). Do A8 first.
- **Payoff:** each subtree independently readable; persona orchestration shrinks to a few dozen lines.
- **Verify:** `tsc` + `build` + visual diff on all three locales (`/pricing`, `/ko/pricing`, `/jp/pricing`) for both personas.

### C3. Collapse 3 B2C plan cards into a local descriptor map — **needs-care, ~100 LOC (do only inside C2's `B2cPlans`)**
- **Files:** `src/components/pricing/PricingClientView.tsx` lines 561-659 (or the new `B2cPlans` file).
- **Change:** Local array of card descriptors + one local `PlanCard`. Keep local; do not export.
- **GUARDRAILS (proposal understates variation — faithful all-axes encoding required):**
  - Price node is NOT uniform: cards 1-2 inline literal strings ("10,000원", "100,000원"); card 3 uses `t.agentFree`; **card 2 has an extra `{t.insightBasis}` sub-line** the others lack.
  - The featured (StoreAgent) card differs on **four coupled axes at once**: border color, custom `shadow-[…]`, corner badge div, and `btn-primary` CTA — plus cards 1-2 have a `hover:border-blue-300` the featured card lacks. A single `featured?: boolean` must reproduce **all** of these, not just the badge.
  - Descriptors must carry JSX (price nodes) — this is not a flat-data map.
- **Payoff:** ~100 lines of copy-paste → one descriptor list + one card body; conversion-critical page, so byte-equality matters.
- **behaviorRisk:** medium (touches rendered pricing output).
- **Verify:** `tsc` + **snapshot/visual diff** of the B2C plan cards before/after on all locales.

### C4. `cplx-6` — lone enterprise card stranded in a 2-col grid — **needs-care, FLAG to owner, do not auto-fix**
- **Files:** `src/components/pricing/PricingClientView.tsx` line 873 comment + 874 `grid md:grid-cols-2` wrapper + single card 876-895.
- **Issue:** Comment says "엔터프라이즈 카드 2장" (two cards) but only one renders, leaving it half-width-left at `md+`.
- **Action:** **Flag only.** This is a UI/content question, not a duplication/complexity refactor, and the layout fix (single-column/centered) is a deliberate visual change. The only behavior-preserving slice is editing the stale comment, which leaves the real question unresolved. **Confirm intent with the owner** before any change.

---

## Recommended sequencing

1. **Batch A** (A1→A8) in one PR — all behavior-preserving, fast wins, ~290 LOC removed. Gate on `tsc`/`lint`/`test`/`build`.
2. **B1** (FAQ move) — small, contained; verify imports + README.
3. **B2** (HeroBadge) — separate PR; visual diff required.
4. **A8 then C2 then C3** — pricing-layer sequence (helper → split → card map), each with visual diff on 3 locales.
5. **C1** — its own PR, treated as an intentional locale-nav bugfix with manual ko/jp smoke tests.
6. **C4** — open an issue / ask the owner; no code change yet.

---

## Rejected (intentionally not doing — considered and declined as over-engineering or behavior-changing)

| # | Candidate | Why rejected |
|---|-----------|--------------|
| dup-1 | Shared `useFormSubmit` hook (AbortController + 5s timeout + error mapping) across ContactForm/Newsletter/InlineNewsletter | **Not behavior-preserving.** The 3 sites differ in cleanup (none / `redirectTimeoutRef` + 800ms `router.push` / `abortRef` unmount-abort), error-body parsing (only ContactForm does `response.json()` to surface server error; the others hardcode a string), and success side-effects. Absorbing all three needs a multi-knob hook (body-builder + onSuccess + messages + parse-mode + cleanup-mode) that approaches the complexity it replaces — exactly the "configurability nobody asked for" the brief forbids. The truly-identical skeleton is ~12 lines, not ~30. |
| cplx-1 | Extract one `QuoteLeadForm` UI component across the 3 pricing forms | **Reject.** "Only the body varies" is false — the 3 forms diverge on ~8 markup axes (button `px-6` vs `px-5`, card `p-5` vs `p-4`, check icon `w-8` vs `w-7`, CameraSim has no `<label>`/`id`/`autoComplete`/`aria-hidden`, label `getQuote` vs `emailBtn`, only B2B renders `submittedSub`, recalc margins differ, CameraSim guard adds `!noneSelected`). Plus CameraSimulator is on a separate route with its own i18n dict. A shared component would need a ~10-knob prop explosion **or** normalize markup (changes rendered output). The only real seam — the POST contract — is captured by **A8** instead. |
| cplx-5 | Collapse CameraSimulator's product-toggle cards + "selected features" rows into local maps | Not endorsed in adversarial review; local single-file JSX clusters with low payoff and per-card divergence. Borderline at best; declined to keep the bar high. (If C2/C3 land cleanly and appetite remains, revisit as a small local-only follow-up.) |
| C3 (Container/Section migration) | Migrate 28 views' inline `max-w-*`/`py-*` wrappers onto `Container`/`Section` | **Reject as framed.** Not "purely mechanical": `Section` `variant` only offers white/`#F7F9FC`/dark but views use `bg-gray-50`, `bg-slate-50/900/100`, and 26+ gradients (so the dominant class stays inline); `Section` `pad` lacks `py-16 lg:py-24`; `Container` lacks `max-w-4xl`/`xl`/`md`; and `max-w-2xl` is mostly `<p>` text-width, not gutters. **`Section` wraps `AnimatedSection`** — wrapping currently-static `<section>`s would ADD scroll-reveal = behavior change. Broad 28-file sweep, medium-high risk, marginal payoff. A defensible *tiny* slice (only the ~35 exact `max-w-5xl mx-auto px-4 sm:px-6` gutters + only `bg-white` AnimatedSection wrappers) is a fraction of the claimed value — not worth a dedicated PR. |
| dup-3 part (b) | Unify status-bar `useCurrentTime` to `lib/mockup-time.ts` + extract `StatusIcons` | **Reject.** Local hooks emit `H:MM` (e.g. "9:41", Apple's canonical seed) via `getHours()`; the canonical lib hook emits `HH:MM` ("09:41") — a **visible** change before 10am. Lib hook also early-returns under `prefersReducedMotion` (never ticks); local hooks always tick. And once `IpadStatusBar` is deleted (A3), only one live status bar remains, making `StatusIcons` a single-use abstraction. Ship part (a) `<Spinner/>` only. |
| TD-6 | Drop `export` on internal-only symbols (`FAQCategory`, `StepData`, `absUrl`, `defaultLocale`/`localePrefix`, `formatTime` family) | **Reject.** Visibility-only, cosmetic; the proposal's own author rates it "low value, partly stylistic, safe to skip." These live in library-style modules where exporting utilities is normal. Violates "no tighter surfaces nobody asked for" / "every changed line traces to the request." |
| struct-2 | Rename `corporate/views/` → `views/` (it actually holds all 28 page views) | **Reject (explicitly).** Accurate but would rewrite ~84 import sites across `app/` leaf pages — exactly the mass folder churn the task scopes out, touching no logic. Recorded for awareness only. |
| struct-3 | Enforce a single import style for the `mockups` barrel | **Reject.** The direct (non-barrel) imports are **required**: many mockups load via `next/dynamic({ ssr: false })`, which needs a concrete module path and cannot go through a re-export. The mixed convention is inherent to SSR-off dynamic loading, not disorganization. |
| C4 (`cn()` broad adoption) | Convert ~30 files' template-literal conditional classNames to `cn()` | **Reject as a standalone churn PR.** `cn()` output is order-preserving join (equivalent), so per-site payoff is low and the template literals are readable. Adopt `cn()` only opportunistically when a file is already being edited — not a dedicated sweep. |

**Themes declined:** (1) speculative shared form/UI components whose call-sites diverge in markup/cleanup/error-handling (would force prop explosions or change output); (2) broad design-system "finish the migration" sweeps where the target primitives don't actually cover real usage and could add animation/visual regressions; (3) visibility-only `export`-tightening and aesthetic `cn()`/folder renames with no duplication/complexity payoff; (4) status-bar time-format unification that changes rendered output.
