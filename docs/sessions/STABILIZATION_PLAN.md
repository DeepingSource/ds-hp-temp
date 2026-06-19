# DS_NEW_HP — Stabilization & Optimization Plan

> **Status:** ✅ EXECUTED & SHIPPED (2026-06-19) — applied (incl. P0 contact-funnel fix), merged to `main`, deployed to gh-pages. Retained as execution record.

Status snapshot: GREEN (tsc 0, lint 0 errors / 30 intentional warnings, 31/31 tests, build OK).
Scope: whole-codebase correctness/robustness bugs + real perf/bundle wins. Evidence-backed, review-only.
Out of scope (separate fix in flight): raw internal `href` locale-nav convergence onto `localeHref`.

Legend: **behaviorChange** = does the fix intentionally change observable behavior? **effort** S/M/L. Every item below survived adversarial verification (verdict = confirmed or needs-care); rejected items are listed at the bottom.

---

## Bucket A — Correctness / robustness BUGS (do first; behavior change is the point)

### A1. [P0] Contact lead form sends `plan`/`product` as `null` → every submission 400s
- **Where:** `src/app/contact/ContactFormPage.tsx:366` (body build); `src/app/api/contact/route.ts:15-16` (schema); `src/app/api/contact/route.ts:33` (raw `safeParse`).
- **Bug:** `planParam`/`productParam` come from `useSearchParams().get(...)` → `string | null`. Line 366 always sends `JSON.stringify({ ...data, plan: planParam, product: productParam })`, so absent params send `null`, not `undefined`. The FormData (`...data`) contains no plan/product keys, so it cannot override the nulls. Zod 4 `.enum([...]).optional()` accepts `undefined` or a valid enum value but **rejects `null`** (verified empirically against installed zod 4.3.6: `{plan:null,product:null}` → fail; `{plan:'standard',product:null}` → fail; `{}` → pass). Every navigation path 400s: the dominant entry points (CtaBand, CorporateHero, HomeView, AboutView, etc.) pass no params, and even `?product=...` paths still 400 on `plan=null`.
- **False-green:** `route.test.ts` only ever omits plan/product (sends `undefined`), so the suite never exercises the broken `null` path.
- **Fix (surgical, client-side):** coerce in `ContactFormPage.tsx:366` —
  `body: JSON.stringify({ ...data, plan: planParam ?? undefined, product: productParam ?? undefined })`.
  (`undefined` JSON values drop the key → schema passes.) Equivalent server-side alternative: `z.enum([...]).nullish()` or a `z.preprocess(v => v ?? undefined, ...)` on both fields.
- **Pairs with A3:** client coercion alone does NOT fix `?plan=free` (out-of-enum). Normalize invalid plan to `undefined` as part of this fix, or fix A3 at the CTA.
- **Payoff:** Restores the entire B2B contact/consultation funnel — currently ~100% of submissions fail with 400, so no leads reach Slack.
- **behaviorChange:** YES. **effort:** S.
- **Verify:** add `route.test.ts` case sending `{plan:null,product:null}` (expect 200/`success`); manually submit plain `/contact` and confirm Slack notification fires.

### A2. [P1] Three pricing quote forms: no in-flight guard, no error feedback (double-submit + silent failure)
- **Where:** `src/components/pricing/InlinePricingSimulator.tsx:37-48` (button :127); `src/components/pricing/B2bQuoteSimulator.tsx:18-29` (button :171); `src/components/pricing/CameraSimulator.tsx:776-794` (button :808); shared helper `src/lib/contact-lead.ts:17-29`.
- **Bug:** Each handler does `if (await submitQuoteRequest(...)) setSubmitted(true)` with **no `isSubmitting` state and no `else`/error branch**. Buttons are never `disabled` and show no spinner → on a slow network the user can fire duplicate POSTs (duplicate Slack leads, bounded only by the 5 req/60s IP rate-limit in `api-utils.ts:7-8`). `submitQuoteRequest` swallows all failures and returns `false`, so on any non-2xx (400/429/500) or network error **nothing happens** — no message, no state change. The two issues compound: a double-submit that trips the 429 returns a failure the UI then silently swallows.
- **Fix:** mirror the proven in-repo pattern in `ContactFormPage.tsx` (`isSubmitting`/`error` state, `setIsSubmitting(true)` before await + reset in `finally`, `disabled={isSubmitting}` + spinner, `role="alert"` error rendered on the `false` return). Reuse existing `errSubmitFailed`/`errGeneric` copy. Optional: upgrade `submitQuoteRequest` to a discriminated result; minimum bar is gate-on-isSubmitting + surface the `false` return.
- **Payoff:** Stops duplicate Slack lead spam from double-clicks; gives users failure feedback so they retry / use email fallback instead of silently bouncing on the highest-intent pricing surfaces.
- **behaviorChange:** YES (intended: disable-while-submitting + surface failure). **effort:** M.
- **Verify:** throttle network in devtools, submit each of the 3 forms; confirm button disables, spinner shows, and a forced non-2xx renders an alert. Confirm no second POST fires on rapid double-click.

### A3. [P2] Free-plan CTA links to `/contact?plan=free`, an enum value the API rejects
- **Where:** `src/lib/pricing-data.ts:37` (`ctaLink: '/contact?plan=free'`); rendered live at `src/components/sections/PricingSection.tsx:103`; enum at `src/app/api/contact/route.ts:16` is `['standard','premium','enterprise']`.
- **Bug:** `plan=free` is forwarded raw (`ContactFormPage.tsx:366`) and `safeParse` rejects it (`invalid_value` → 400). Independent corroboration: `planLabels` (`ContactFormPage.tsx:134-136`) has no `'free'` key, so the form title degrades. PricingSection is shipped on `/storeagent` and `/ms-agent` (not site root — finding said "homepage", minor mislabel). Subsumed by A1: if A1 coerces invalid plan values to `undefined`, this resolves automatically.
- **Fix:** simplest — drop the param (`ctaLink: '/contact'`) for the free tier, OR add `'free'` to the enum + `planLabels`, OR rely on A1's invalid→undefined normalization.
- **Payoff:** Free-tier "start free" clicks (top-of-funnel) can actually submit instead of 400ing.
- **behaviorChange:** YES. **effort:** S.
- **Verify:** click free-tier CTA on `/storeagent`, submit, confirm 200 + Slack.

### A4. [P1] POSAnalysisSection date label double-applies Asia/Seoul TZ → off-by-one for visitors west of Seoul
- **Where:** `src/components/sections/POSAnalysisSection.tsx:179` (`koreaDate` reparse), `:182` (label re-applies TZ).
- **Bug:** Line 179 builds `new Date(d.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }))` — the localized-string-reparse anti-pattern: Seoul wall-clock numbers reparsed in the visitor's local zone. Line 182 then calls `koreaDate.toLocaleDateString(..., { timeZone: 'Asia/Seoul', ... })`, re-applying the Seoul offset a second time. Reproduced at a fixed instant Fri 2026-06-19 16:30 KST: behind-Seoul zones (UTC, London, LA, NY, Honolulu) render `6. 20.` instead of `6. 19.`; at/ahead-of-Seoul zones (Seoul, Tokyo, Sydney) are correct. So it mis-renders for essentially all Americas + Europe visitors. **`dayIndex` (line 181) is correct** (reads `getDay()` directly), so the highlighted "today" forecast column is right while the printed label disagrees by a day — visibly inconsistent.
- **Fix:** compute the label from the original instant with a single TZ application —
  `label: d.toLocaleDateString(t.dateLocale, { timeZone: 'Asia/Seoul', month: 'numeric', day: 'numeric' })`.
  Keep `dayIndex` as-is (already correct). Blast radius minimal: `today.label` is consumed only at line 457, client-side via `useEffect`, already `suppressHydrationWarning`.
- **Payoff:** International visitors see the date that matches the highlighted forecast column; removes a confusing off-by-one.
- **behaviorChange:** YES (corrects the value for behind-Seoul zones; unchanged for Seoul/Tokyo). **effort:** S.
- **Verify:** `TZ=America/Los_Angeles` run a node snippet of the new label expression at a 16:30 KST instant → expect `6. 19.` (ko-KR); spot-check en-US/ja-JP.

### A5. [P3] B2B quote simulator Step-1 "cameras per store" slider has zero effect on the quote
- **Where:** `src/components/pricing/B2bQuoteSimulator.tsx:14` (state), `:66/:73-82` (Step-1 slider), `:123` (per-store cost), `:130` (total). Payload build `:22-26`.
- **Bug:** `b2bCamerasPerStore` is presented as the FIRST input but appears only in its own label/slider; both cost formulas hardcode `24500` and never reference it, and the lead payload omits the camera count entirely. Dragging the prominent Step-1 control changes nothing in the output or the lead — misleading for a quote tool.
- **Fix (gated — `fixIsSafe: false`):** two branches with different risk:
  - SAFE/surgical: remove the cameras-per-store step if StoreCare Plus is intentionally a flat per-store fee.
  - PRICE-CHANGING: fold camera count into the per-store estimate — **requires confirming the pricing model with the team first** (is `24500` flat-per-store or per-camera?). Do NOT apply mechanically.
- **Payoff:** Removes a dead/misleading primary control, or makes the quote reflect the input it appears to control.
- **behaviorChange:** YES. **effort:** S (removal) / M (formula). **Decision required before coding.**
- **Verify:** drag the slider, confirm the per-store + total values respond as intended.

---

## Bucket B — Safe, behavior-preserving perf / bundle wins

### B1. [P1] Homepage eagerly loads framer-motion (43.5 KB gzip) for a below-the-fold mockup
- **Where:** `src/components/corporate/HomeView.tsx:14` (static import), `:105-109` (rendered as section 5, below fold, inside AnimatedSection); `src/components/mockups/SpatialTrajectoryMockup.tsx:1-3` (`'use client'` + framer).
- **Cost (build-verified):** `SpatialTrajectoryMockup` is the ONLY framer-motion importer on the homepage (all 11 sibling sections are framer-free). Its static import drags the framer chunk (`8f6b9388…` / `d69a950…`, gzip 43,454 B) into the initial JS: referenced 17x in `page_client-reference-manifest.js` and preloaded 10x in prerendered `index.html`/`ko.html`/`jp.html`. Framer-free routes (`/legal`, `/resources/blog`) preload it 0x.
- **Fix:** convert to `next/dynamic` with **default SSR** (NOT `ssr:false`) and a sized skeleton, matching the existing precedent in `HeroSection.tsx` (already does this for the framer-using `ActionCardMockup`):
  ```ts
  const SpatialTrajectoryMockup = dynamic(() => import('@/components/mockups/SpatialTrajectoryMockup'), {
    loading: () => <div className="h-[400px] animate-pulse rounded-2xl bg-gray-100" />,
  });
  ```
  Default SSR preserves the ~40 localized prose strings (SEO); only framer's hydration JS is deferred. Empirically proven safe: `storeagent.html` (uses this exact dynamic pattern via `ActionCardMockup`) preloads the framer chunk 0x.
- **Payoff:** Removes ~43.5 KB gzip framer from the highest-traffic page's initial/preloaded JS × 3 locales. Below the fold → deferred hydration imperceptible.
- **behaviorChange:** NO. **effort:** S.
- **Verify:** rebuild, grep `index.html`/`ko.html`/`jp.html` for the framer chunk hash → expect 0 preload refs; visually confirm the section still SSR-renders.

### B2. [P3] VisionDiagram is forced `'use client'` solely by styled-jsx for a CSS-only animation
- **Where:** `src/components/company/VisionDiagram.tsx:1` (`'use client'`), `:158-199` (`<style jsx>` keyframes). Rendered via the server component `AboutView.tsx:263` on the SSG `/company/about` (+ `/ko`, `/jp`).
- **Cost:** No hooks/handlers/browser-APIs/framer — purely presentational. The lone `'use client'` trigger is the styled-jsx block, which ships styled-jsx runtime + this component's JS to the client unnecessarily. It is the only file in `src/` where styled-jsx is the *sole* reason for client status.
- **Fix:** move the 3 keyframe/animation rules (`vision-dash-h`, `vision-dash-v`, `vision-pulse` + the `prefers-reduced-motion` guard) into `globals.css` (alongside existing `scroll-*` animation utilities; that file already hosts ~10 keyframes and a reduced-motion guard). Delete the `<style jsx>` block and the `'use client'` directive → renders as a Server Component. Class names are collision-free (`vision-` prefix unique). `text-3xs` is a CSS custom-property utility, not styled-jsx-dependent, so it survives.
- **Payoff:** Strips one component's JS + its styled-jsx contribution from the `/company/about` client bundle on 3 SSG routes. Small but free; a genuine (rare) RSC conversion.
- **behaviorChange:** NO (pure CSS move). **effort:** S.
- **Verify:** rebuild; confirm `/company/about` renders identically and VisionDiagram no longer appears in the client manifest.

### B3. [P2] AnonymizationMockup re-reconciles static image scenes ~60fps during auto-sweep
- **Where:** `src/components/mockups/AnonymizationMockup.tsx:179-194` (auto-sweep RAF → `setSliderPct` every frame); `OriginalScene` (`:55-64`, rendered `:289`) and `AnonymizedScene` (`:66-115`, rendered `:296`).
- **Cost:** The RAF loop re-renders the whole component ~60fps while on-screen and `active` (the default, since the sweep auto-runs). The two scene subtrees take **no props** and produce static output, yet are plain function components React re-invokes/reconciles every frame. `AnonymizedScene` is non-trivial (a `next/image` + `FACE_REGIONS.map` → 3 mosaic regions, each multiple nested divs + a second `next/image`). Only ~3-4 nodes actually depend on `sliderPct` (clipPath inset, divider `left`, two label widths). The bulk of per-frame reconciliation is wasted — the single largest avoidable per-frame render cost found.
- **Fix:** wrap the two static scenes in `React.memo`:
  `const OriginalScene = memo(function OriginalScene(){...})`, `const AnonymizedScene = memo(function AnonymizedScene(){...})`. Since they take no props, they re-render zero times after mount; each frame only updates the slider-position style nodes. (Optionally also `SceneImage`/`CamOverlay`.)
- **Payoff:** Eliminates per-frame re-reconciliation of ~10-15 DOM nodes + 2 `next/image` elements for the whole time the mockup is visible. Main-thread relief on low-end devices, esp. `/demo` gallery + AnonymizerView.
- **behaviorChange:** NO. **effort:** S.
- **Verify:** React Profiler during auto-sweep → scene subtrees should show 0 renders after mount; slider visual unchanged.

---

## Bucket C — Type-safety tightening

### C1. [P3] `getSeasonalScenario` takes `areaId: string` then casts to `AreaId` (loose boundary)
- **Where:** `src/data/seasonal/index.ts:76` (param), `:79` (`scenarios[areaId as AreaId] ?? scenarios.office`), `:89` (`getNearbyEvents(today, areaId as AreaId)`). Sole caller `src/components/sections/LiveDemoSection.tsx:67`.
- **Issue:** Param type `string` is wider than the value domain (`AreaId = 'office'|'residential'|'university'|'entertainment'`); the two `as AreaId` casts silently assert membership. NOT a live bug today — the only caller passes a bounded `activeArea.id`, line 79 falls back to `scenarios.office`, and `getNearbyEvents` degrades to `[]` for unknown ids (no crash). A typo'd id would produce silently-wrong output, not a crash, and is not currently reachable.
- **Fix:** narrow the param to `AreaId` (import already present) and delete the two casts. If `areaTypes[].id` is typed `string` at its source, tighten it to `AreaId` so the chain is checked end-to-end.
- **Payoff:** Compiler catches a future typo / new arbitrary-string caller at build time instead of silently falling back to office/empty.
- **behaviorChange:** NO (for valid ids). **effort:** S.
- **Verify:** `tsc` clean after narrowing; introduce a deliberate bad id at the call site and confirm it now fails to compile.

---

## Bucket D — a11y / i18n robustness

### D1. [P3] 404 quick-links target pre-redirect product URLs (extra 301 hop; dead-end under static export)
- **Where:** `src/app/not-found.tsx:53-55` (hrefs `/storecare`, `/storeinsight`, `/storeagent`); redirect sources `next.config.ts:42-44`.
- **Issue:** On a server build, each click takes an avoidable 301 hop → `/products/store-*`. Under `GH_PAGES=1 output:'export'` the redirects block is skipped entirely (`next.config.ts:11-16,30-36`), so `/storecare` and `/storeinsight` (redirect-only, no real page) dead-end back to GitHub Pages' 404 — a recovery link that returns to a 404. (Nuance: `/storeagent` IS a real page — the SAAI minisite — so only 2 of 3 dead-end under static export; the 301-hop applies to all 3 on server builds.)
- **Fix:** point quick-links directly at canonical routes `/products/store-care`, `/products/store-insight`, `/products/store-agent` — the same convention `Header.tsx:21-23` / `Footer.tsx:14-16` already use.
- **Payoff:** One-hop resolution on server builds; no dead-end recovery links on the active GH_PAGES target.
- **behaviorChange:** YES (href change). **effort:** S.
- **Verify:** build static export, click each 404 quick-link → lands on the product page, not a 404.

### D2. [P3] Global `error.tsx` and `not-found.tsx` are hardcoded Korean for all locales
- **Where:** `src/app/error.tsx:14,17,24` (`'문제가 발생했습니다'`, retry copy, `'다시 시도'`); `src/app/not-found.tsx:6,35,38,47` (`'페이지를 찾을 수 없습니다'`, etc.). Only one root boundary each (no per-locale variants).
- **Issue:** `defaultLocale='en'` (`i18n.ts:15`) and `<html lang="en">` (`layout.tsx:108`), yet EN/JP visitors hitting a runtime error or 404 see Korean-only recovery copy — an untranslated dead-end for the locales the site otherwise serves.
- **Fix:** `error.tsx` is already a client component — reuse the established `getLocaleFromPath(usePathname())` pattern from `HtmlLangSync.tsx:23-34` to pick a `Record<Locale,string>` dictionary. **Must preserve the minisite nuance:** at path `/` with `x-site-mode=minisite` cookie, resolve to `ko` (as HtmlLangSync does) so the Korean standalone deploy doesn't regress to English. `not-found.tsx` is a server component → either a stacked KO+EN bilingual string (pragmatic), or read the `x-locale` request header that `proxy.ts:100-101` already sets (`next/headers`).
- **Payoff:** EN/JP users get comprehensible error/404 recovery copy.
- **behaviorChange:** YES (intended copy/localization). **effort:** S. Low-frequency path → prioritize accordingly.
- **Verify:** manually hit a 404 / throw under `/`, `/jp`, and the minisite cookie → confirm correct language each (minisite `/` → ko).

---

## Bucket E — needs-care / gated (do NOT apply mechanically)

### E1. [needs-care] StoreDayTimelapse re-renders the full ~200-line tree every autoplay frame
- **Where:** `src/components/mockups/StoreDayTimelapse.tsx:275-285` (RAF `setT` ~60fps); marker map `:460-472`, chart bars `:521-540`, feed `:585-604`.
- **Mechanism (real):** `setT` yields a new fractional `t` every frame → whole body re-renders, but markers (static `events`), chart bars (`currentHour = Math.floor(t/60)`, integer-stable, flips ~18×/loop), and feed (memoized `visibleEvents`) produce identical output on ~59/60 frames. N is small (7 markers, ~18 bars, 25 heat cells already RAF-throttled separately). No layout/paint thrash (bar heights are static-derived; only color className flips at hour boundaries).
- **Why gated:** verdict **worthIt: false** — reconciling ~32 no-op vnodes at 60fps is real but small, zero correctness benefit, and the fix adds two child components + memo boilerplate. Against the no-micro-optimization rule it does NOT clear the bar standalone.
- **Conditional fix (only as a rider if this file is already being refactored):** extract the marker row and chart bar list into `React.memo` children receiving only their real deps (`events`+`jumpToEvent`; `hours`+`series`+`maxVal`+`currentHour`). Props are all stable refs / integer-stable, so the memo correctly skips ~59/60 frames. Behavior-preserving.
- **behaviorChange:** NO. **effort:** M. **Default: skip unless refactoring nearby.**

### E2. [robustness, P3] StoreDayTimelapse `jumpToEvent` schedules an untracked `setTimeout` (leak + stacking)
- **Where:** `src/components/mockups/StoreDayTimelapse.tsx:399-407`.
- **Issue (real but minor):** clicking an event marker runs `setTimeout(() => setHighlightRef(...), 2200)` with no ref tracking / no cleanup — the only untracked timer in a file where every other timer (auto-play rAF :286, kiosk idle :290-304, heat rAF :364-376) is properly cleared. Rapid clicks stack N independent 2.2s timers; unmount within 2.2s fires `setHighlightRef` on an unmounted tree (React 18 swallows it, so silent). Impact small (demo widget, self-guard `cur === e.refId`).
- **Fix (surgical, behavior-preserving):** store the id in a `highlightTimerRef`, `clearTimeout` it at the top of `jumpToEvent` before scheduling, and add `useEffect(() => () => clearTimeout(highlightTimerRef.current), [])`, mirroring the existing `idleTimerRef` pattern at :290-304.
- **Why in E:** genuine but low-value cleanup; safe to do opportunistically, not a headline. **behaviorChange:** NO. **effort:** S.

### E3. [needs-care] PB-2: product/tech Views statically import below-fold framer mockups
- **Where:** `StoreInsightView.tsx` (FunnelDiagram :304, POSAnalysisSection :348), `StoreAgentView.tsx:220-244`, `TechnologyView.tsx`, `EnterpriseView`, `StoreCareView`, `SpatialAiView`, `ModelsView`. 0 `dynamic()` in `src/components/corporate/`.
- **Mechanism (real) but headline OVERSTATED:** the 43.5 KB framer chunk is preloaded ONLY on `store-agent.html`; the other 6 routes preload only the **small** framer chunk (gzip ~12,040 B). Worse, on store-agent the big chunk arrives via `AgentMockupShowcase` (statically imported, rendered :239) — which the proposed fix does NOT touch — so deferring the 4 cited store-agent mockups would NOT remove the 43.5 KB chunk there. The flagship "43.5 KB off product/tech pages" claim does not materialize from the described change.
- **Gated reality:** partial conversion yields ZERO benefit per route — if any sibling framer mockup stays static, the chunk still preloads. The one clean win is **StoreInsightView** (FunnelDiagram is its sole framer source → deferring it drops the ~12 KB chunk). Requires sized skeletons (CLS) + explicit per-route HTML re-verification.
- **Recommendation:** rescope to **store-insight only** (real but modest ~12 KB gz × 3 locales) and optionally a full-route conversion incl. `AgentMockupShowcase` for store-agent. Do NOT accept PB-2 as written. **behaviorChange:** NO. **effort:** M.

---

## Suggested execution order
1. **A1** (P0, S) — restores the lead funnel. Ship with a regression test.
2. **A3** (P2, S) — fold into A1's normalization (free CTA).
3. **A4** (P1, S) — POS date off-by-one.
4. **A2** (P1, M) — quote-form in-flight/error states.
5. **B1** (P1, S) — homepage framer dynamic import (verify build).
6. **D1, D2** (P3, S) — 404 links + error/404 localization.
7. **B3** (P2, S), **B2** (P3, S), **C1** (P3, S) — safe small wins.
8. **A5** — only after pricing-model decision.
9. **E-bucket** — opportunistic / rescoped only; E3 → store-insight only.

---

## Rejected (considered and NOT doing)

These were evaluated and dropped to avoid over-engineering / churn. Themes:

- **StepperShell reduced-motion hydration mismatch (re-2):** mechanism is real, but **StepperShell is dead code** — no import/barrel/dynamic reference anywhere, so it never mounts and the mismatch can't occur. Hardening unreachable code is forbidden churn. *Actionable note instead: flag `src/components/shared/StepperShell.tsx` as orphaned dead code (do not delete without ask).*
- **AnimatedSection → CSS `animation-timeline: view()` consolidation (PB-4):** not a bug (the finding itself says so). `useScrollAnimation` is a single deduped shared chunk, not multiplied per import; per-instance cost is one observer + a self-clearing timeout. The proposed rewrite is unsafe and broad: `.scroll-visible` drives coupled descendant choreography (`.scroll-visible .stagger-child` globals.css:538-545, `.draw-line` :740, 32 delay-*/stagger call-sites) and ~40 components read `isVisible` as a JS boolean (count-ups, timelapse playback) that cannot become CSS-only. `animation-timeline: view()` lacks Safari support, so the `@supports` fallback keeps the JS path anyway. No measured win. Reject.

Theme summary of the rejected set: **(a) hardening/over-engineering of unreachable dead code, and (b) broad, behavior-changing "best-practice" CSS rewrites with no measured benefit and real coupling risk.** Both are exactly the speculative churn the task forbids.
