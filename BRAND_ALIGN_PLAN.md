# SAAI Brand Alignment — Prioritized Execution Plan

> **Source of truth:** `SAAI_AI_Handoff.md`. User decision: FULLY ALIGN the site to the handoff; the handoff wins over the recent NEXTRISE pivot.
> **Status:** REVIEW COMPLETE — this plan is the execution roadmap. No files have been modified yet.
> **Scope verified:** counts re-grepped 2026-06-19 — 비식별 = 45 (src+content), font-semibold = 329, font-extrabold = 17, font-black = 42, bg-gradient = 78+ literals. All 7 `reinventOffline` sites confirmed, Geist confirmed in 4 places.

---

## How to read this plan

- **OBJECTIVE** = grep-confirmable; a mechanical find/replace or single-token swap. Safe to delegate to a coding agent.
- **JUDGMENT** = tone/adjective/title/data-color decision; needs a human or visual verification before shipping.
- **C-immediate** = explicit Part-C ban (must fix). **high/medium/low** = severity within the lens.
- Each item gives `file:line` + the prescribed replacement. Where a fix has a structural ripple (3→4 step loop, font weight cascade), it is flagged.

### Phase summary (EXECUTION ORDER)

| Phase | Theme | Mode | Verify by |
|-------|-------|------|-----------|
| **P1a** | 비식별 → 익명화 sweep (incl. legal/terms/SEAL) | Mechanical (delegable) | `grep -r 비식별 src/ content/` returns 0 |
| **P1b** | Voice/copy retire (REINVENT OFFLINE, Read·Alert·Act loop, source-version comments, category line) | Mixed — mechanical deletes + **judgment copywriting** + **structural (3→4 loop)** | Build passes; visual review of Hero/Home/About/Products |
| **P2** | Typography: config (Geist removal) + weight remap (semibold/extrabold/black) | Mostly mechanical; **per-instance 700-vs-500 = judgment** | `grep -rE 'font-(semibold\|extrabold\|black)' src/` = 0; `grep geist` = 0; visual heading pass |
| **P3** | Gradient removal + One-Blue color | Mechanical deletes; **decorative-glow removal = judgment** | `grep -rE 'bg-gradient\|text-transparent\|bg-clip-text' src/` = 0 (minus exemptions) |
| **P4** | Numbers + charts (sourcing, takeaway titles, One-Blue chart palette) | **Judgment** (data accuracy, takeaway wording) | Visual chart review |

**Mechanical / delegable:** P1a, the delete-only parts of P1b, P2 config + bulk weight swap, P3 dark-section + text-gradient swaps.
**Design-judgment / needs visual verification:** P1b copywriting + the 3→4 loop restructure, P2 700-vs-500 mapping, P3 decorative-glow removal, all of P4.

> **Do P1 before P2/P3.** Copy changes touch the same View files as weight/gradient changes; landing copy first avoids re-editing the same lines twice. Within P1, run **P1a (익명화) first** — it is purely mechanical and unblocks SEAL/Anonymizer/terms which P1b also touches.

---

## Cross-cutting CAVEATS (read before starting)

1. **LEGAL — terms of service.** `src/app/terms/page.tsx:26` (`비식별 처리` → `익명화 처리`) is a contractual service-definition clause. Under Korean PIPA, **익명화(anonymization)** and **비식별(de-identification/가명)** are distinct statutory terms with different compliance standing. Apply the swap per the user directive, but **route this one line through legal/PII-owner sign-off before publishing.** The same caveat applies (lighter) to the privacy-themed article `content/articles/insight/privacy-safe-ai-analytics.mdx` which invokes 개인정보보호법/GDPR — the stronger 익명화 claim should be technically accurate for STORECARE's actual processing.
2. **EN/JP already correct.** For 비식별→익명화, the `en` (`anonymization`) and `jp` (`匿名化`) fields are already compliant in `src/data/models.ts:64-66`, the SEAL/Anonymizer OG metadata, `PrivacyJourneyMockup`, `AnonymizationPipeline`, etc. **Change KO strings ONLY.** Do not touch EN/JP.
3. **Verb forms & double-labels.** `StoreAgentView.tsx:71` `비식별하고` → `익명화하고` (not `익명화고`). `MockupGallery.tsx:138` is double-labeled `비식별화(익명화)` → unify to a single `익명화` (drop the parenthetical). `solutionsData.ts:761` already says `익명화 처리` later in the same sentence — only the leading `비식별 객체` → `익명화 객체`.
4. **External-brand hex / mockup-chrome is EXEMPT** — do NOT force tokens on: Kakao `#fee500`/`#06c755`, macOS window dots, and device-frame metallic gradients (`PhoneFrame`, `MacBookFrame`, `TabletFrame`, Kakao/Push status bars). Recommend the design owner adds an allowlist note to `DESIGN.md` so the token guard skips these paths.
5. **Weight mapping is partly JUDGMENT.** `font-semibold`→`font-medium(500)` for labels/badges/subheads, but `font-bold(700)` for the few heading-scale (`text-2xl+`) instances. Bulk-replace, then manually re-bump the ~4–5 heading instances. Don't blindly map all 329 to 500.
6. **CSS hardcoded weights too.** A Tailwind-class swap won't catch `font-weight: 600` literals in `globals.css` (≈ lines 155, 186, 250). Sweep those in P2 as well.
7. **The 3→4 loop is a STRUCTURE change, not a constant swap.** Read·Alert·Act is 3 steps; the handoff loop (Observe·Analyze·Suggest·Learn) is 4. `ProblemBeat` RIBBON[3], `solutionTaglines` (insight/care/agent), and the 3 store products are all built on 3. This needs an IA/layout decision (see V2), so it is **judgment**, not delegable.
8. **Hardcoded vs imported.** Changing the `readAlertAct` constant only updates `ProblemBeat` + `SolutionTimeline` (the only importers). `ProductPreview`, `ProductsView`, `SpacesShowcase` **hardcode** the triad as literal strings — they need separate manual edits or the fix silently misses 3 surfaces.
9. **Grep completeness before deleting exports.** Before removing `reinventOffline` / `readAlertAct` from `brand-canon.ts`, grep the whole repo (incl. minisite, JP overlay data, structured-data, OG/metadata) for both the camelCase identifier and the literal string to avoid a dangling-import build break.

---

## PHASE 1a — 비식별 → 익명화 sweep (MECHANICAL, delegable)

**Lens:** anonymization / voice. **All OBJECTIVE, all C-immediate.** 45 occurrences across 19 files. Rule: `비식별화`→`익명화`, bare `비식별 X`→`익명화 X`, verb `비식별하고/됩니다`→`익명화하고/됩니다`. **KO only.**
**Verify:** `grep -rn 비식별 src/ content/` returns 0.

| ID | File:line | Current → Fix | Notes |
|----|-----------|---------------|-------|
| ANON-001 | `src/app/terms/page.tsx:26` | `…방문자 데이터 비식별 처리…` → `…익명화 처리…` | **LEGAL — sign-off (caveat 1)** |
| ANON-002 | `src/app/ko/technology/seal/page.tsx:5,7,18,19` | `비식별화` → `익명화` (title+OG meta) | SEO keyword recheck |
| ANON-003 | `src/app/ko/technology/anonymizer/page.tsx:5,7,18,19` | `영상 비식별화 모듈` → `영상 익명화 모듈` | L19: change only the term, keep `개인 식별 정보는 제거하고` intact |
| ANON-004 | `src/components/corporate/SolutionTimeline.tsx:41` | alt `(비식별)` → `(익명화)` | EN L51 `(de-identified)`→`(anonymized)` for parity |
| ANON-005 | `src/components/corporate/views/ModelsView.tsx:41,42,43` | `…비식별화` → `…익명화` (face/body/plate promises) | |
| ANON-006 | `src/components/corporate/views/TechnologyView.tsx:126` | `여러 사람을 동시에 비식별` → `…익명화` | lone holdout; L119/125/134 already 익명화 |
| ANON-007 | `src/components/corporate/views/StoreAgentView.tsx:71` | `즉시 비식별하고` → `즉시 익명화하고` | **verb form (caveat 3)** |
| ANON-008 | `src/components/technology/AnonymizationPipeline.tsx:25,30` | `비식별 데이터` → `익명화 데이터` (×3) | resolves intra-file drift (L24 already `AI 익명화`); EN L36/41 `De-identified`→`Anonymized` for parity |
| ANON-009 | `src/components/mockups/MockupGallery.tsx:135,138,182,190` | `비식별화 데모`→`익명화 데모`; L138 drop parenthetical → `영상 내 인물 익명화 처리 전/후 시퀀스.`; `비식별 도형/프레임`→`익명화 …` | **double-label (caveat 3)** |
| ANON-010 | `src/components/mockups/AnonymizationMockup.tsx:133(×2),136,270` | `AI 비식별화 처리`/`AI 비식별화`/`얼굴 비식별화` → `…익명화`; L270 comment optional | L133 has TWO hits; `anonymized` value feeds aria-label L275 |
| ANON-011 | `src/components/mockups/IntegratedLoopDiagram.tsx:51,54` | `…입력 시점에 비식별화됩니다.`/`입력 시점 비식별화…` → `…익명화…` | L55 already 익명화; product name `SEAL + Anonymizer` stays |
| ANON-012 | `src/components/mockups/index.ts:30` | comment `멀티 매장·비식별화 목업` → `…익명화 목업` | code comment; do NOT rename `AnonymizationMockup` symbol |
| ANON-013 | `src/components/mockups/PrivacyJourneyMockup.tsx:201,208` | `포착 · 비식별화 · …`/`비식별화 후…` → `…익명화…` | SVG title/desc a11y; JP/EN already aligned |
| ANON-014 | `src/data/siteImages.ts:34` | alt `AI 비식별 처리` → `AI 익명화 처리` | L25 already 익명화 |
| ANON-015 | `src/data/solutionsData.ts:761` | `비식별 객체` → `익명화된 객체` | only leading term; sentence already has `익명화 처리` |
| ANON-016 | `src/data/faq-data.tsx:44,173` | `비식별 분석 결과`→`익명화 분석 결과`; `비식별 객체`→`익명화 객체` | `익명화된 …` reads smoother (optional polish) |
| ANON-017 | `src/data/models.ts:64,65,66` | KO `얼굴/전신/번호판 비식별화` → `…익명화` | **KO only — leave en/jp** |
| ANON-018 | `src/data/mockup-scenarios/technology.ts:39` | label `엣지 비식별화` → `엣지 익명화` | leave `마스킹` in desc; L42/46 already `익명` |
| ANON-019 | `content/articles/insight/privacy-safe-ai-analytics.mdx:3,4,11,19,48,54` | title/excerpt/tag/heading/body `비식별화`+`비식별` → `익명화` | **L11 frontmatter tag** — update any tag-index page; **legal accuracy (caveat 1)** |

---

## PHASE 1b — Voice / copy retire (MIXED)

**Lens:** voice. Retire NEXTRISE pivot copy. Run AFTER 1a (overlapping files).

### V1 — Retire "REINVENT OFFLINE" (OBJECTIVE delete + JUDGMENT replacement) · C-immediate
**Rule:** delete the lockup entirely; brand signature becomes `사이를 메웁니다.` (5자). Keep an English mark via the existing `perfectSpace.en` — do NOT reintroduce REINVENT OFFLINE.

- `src/lib/brand-canon.ts:33` — delete `export const reinventOffline = 'REINVENT OFFLINE';`
- `src/components/corporate/CorporateHero.tsx:8,48` — remove import; eyebrow `{reinventOffline} · ANONYMIZED SPATIAL AI` → category provocation `보는 AI를 넘어, 매장을 운영하는 AI` **or** `ANONYMIZED SPATIAL AI` alone
- `src/components/corporate/HomeView.tsx:16,159` — remove import; lockup `{reinventOffline}` → `사이를 메웁니다.`
- `src/components/corporate/views/AboutView.tsx:17,249` — remove import; endcard `{perfectSpace.your} → {perfectSpace.every} · {reinventOffline}` → drop the `· {reinventOffline}` tail (keep the Perfect-Space lockup)

> **JUDGMENT:** the new signature `사이를 메웁니다.` is absent from the entire codebase — add it as a new `brand-canon.ts` constant (e.g. `signature5` / `seam`). The existing `signature` const (line 27) is the *category provocation*, not the 5-char signature — the handoff treats them as separate. Don't silently reuse it. **Grep `reinventOffline` repo-wide first (caveat 9).**

### V2 — Retire "Read·Alert·Act / 읽고·알리고·실행" loop (STRUCTURAL — JUDGMENT) · C-immediate
**Rule:** EN loop → `Observe · Analyze · Suggest · Learn`; KO loop → `Read the Seam(어제) → Follow the Thread(지금) → Tie a Knot(알림) → Weave the Next(다음)`. **3→4 step restructure (caveat 7).**

- **Canon:** `src/lib/brand-canon.ts:52-56` (`readAlertAct`), `:46-48` (`categoryLine` repeats triad)
- **i18n:** `src/lib/i18n.ts:58` (en `reads, flags, and acts`), `:65` (ko `읽고, 알리고, 실행하는`), `:72` (jp — **no handoff wording, flag for translation**)
- **Importers (auto-update via constant):** `ProblemBeat.tsx:97,107` (RIBBON has 3 slots; `methodSteps()` splits on punctuation — **will break with 4 verbs**), `SolutionTimeline.tsx:37,47`
- **Hardcoded (MANUAL edits — caveat 8):** `ProductPreview.tsx:29,41`, `ProductsView.tsx:31,33,55`, `SpacesShowcase.tsx:25`

> **JUDGMENT / DECISION NEEDED:** Does the 4-step loop *replace* the per-product 3-card framing, or live as a separate brand element? EN gives 4 plain verbs; KO gives a poetic 4-step with parentheticals — these don't map 1:1, so a single `Record<Locale,string>` can't hold both (may need per-locale label arrays). **JP has no prescribed replacement — translation required.** Visual-verify Home/Hero/Products after.

### V3 — Source-version comments (OBJECTIVE, comments only) · high
`src/lib/brand-canon.ts:6,8,58,11,23,73` — header cites retired `SAAI_Brand_Architecture_v3.md`, `SAAI_Brand_Copy_Master_v2.md`, `(Copy Master v2 §1)`, and `NEXTRISE launch film` / `Weaving` narrative. Update to cite `SAAI_AI_Handoff.md` (Architecture_v4 / Voice_v2.5 / Copy_Decision_v1); strip NEXTRISE/Weaving framing. Comments only (no user-facing copy) but prevents future re-derivation of retired copy.

### V4 — Category provocation drift 공간 → 매장 (OBJECTIVE) · medium
`brand-canon.ts:27,28`, `ProductsView.tsx:39`, `CtaBand.tsx:23`, `SpatialAiView.tsx:42`, `StoreAgentView.tsx:45` — `보는 AI를 넘어, 공간을 운영하는 AI` → `…매장을 운영하는 AI`. **Exception:** where the "beyond retail" message is intended (`SpacesShowcase`), 공간 may stay.

### V5 — Time-axis taglines (JUDGMENT) · medium
`brand-canon.ts:76`, `SolutionTimeline.tsx:38,40`, `CtaBand.tsx:23`, `ProductsView.tsx:38-40,44`, `TechnologyView.tsx:154-156` — `어제를 읽다 / 지금을 알리다 / 다음을 실행하다` are Read·Alert·Act derivatives. The per-product time-axes (어제/지금/다음) are *sanctioned* by handoff A3-A4; only the 읽다/알리다/실행하다 **verb choice** is non-conformant. Re-derive per A4 (insight=어제·가설 / care=지금·모니터링 / agent=다음·우선순위) and align the flow sentence to the 4-step loop verbs. **A reviewer could accept the plain renderings — judgment call.**

### V6 — Exaggerated adjectives (JUDGMENT, tone) · low
| File:line | Fix | Confidence |
|-----------|-----|-----------|
| `CareerView.tsx:71` | title `최고의 도구` → drop superlative; fact already in `desc` | high (objective-ish) |
| `content/articles/insight/convenience-summer-cold-chain.mdx:16` | `압도적 1위` → `47%로 1위` (figure on same line) | high |
| `content/articles/insight/drugstore-heatmap-hotspot.mdx:20` | `혁신의 중심` → use adjacent `4년 만에 매출 2.6배` | high |
| `content/articles/insight/cross-market-2026-03-16.mdx:43` | `압도적인 양과 가성비` → rewrite (no adjacent figure) | **judgment** |
| `content/articles/insight/logistics-automation-trends-2025.mdx:4` | excerpt `혁신하는` → `자동화하는/바꾸는` | judgment |
| `content/articles/weekly/2026-w02-weekly.mdx:29`, `w06:31` | `최강 한파` = weather idiom, NOT product claim | **recommend NOT auto-fixing** |

> **EXEMPT — do NOT touch:** Perfect-Space `완벽하게/완벽한` (`brand-canon.ts:40-41`, `HomeView.tsx:44`, `company-data.ts:32`) — handoff vision is "PERFECT EVERY SPACE". `NVIDIA Inception` is a real proper noun, keep.

> **No violations found (good):** no surveillance/감시 tone (the 2 감시 hits frame the rejected "before"), no 3-version master copy (proper 택일), no 원셀/all-in-one-cell claims, no clover-loop copy.

---

## PHASE 2 — Typography (config + weight remap)

### T1 — Remove Geist as display font (OBJECTIVE) · C-immediate
1. `src/app/layout.tsx:3` — delete `import { GeistSans } from "geist/font/sans";`
2. `src/app/layout.tsx:109` — `<html lang="en" className={GeistSans.variable}>` → `<html lang="en">`
3. `src/app/globals.css:64` — drop the `var(--font-geist-sans),` lead → `--font-display: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif;` (simplest: make identical to `--font-sans`). **Required** — removing only steps 1-2 leaves a silent fallback + a dangling `var(--font-geist-sans)` reference.
4. `DESIGN.md:37` — `--font-display Geist` → `--font-display Pretendard (KR; JP→PretendardJP)`
5. `package.json:20` — remove `"geist": "^1.7.0"` after the 4 edits (grep confirms only these references).

The 15–17 `.font-display` headings then render Pretendard with **no per-component edits**.

### T2 — Weight remap (OBJECTIVE bulk swap + JUDGMENT mapping) · C-immediate
**Allowed weights: 400 / 500 / 700 only.** Bulk-replace then hand-tune. **Verify:** `grep -rE 'font-(semibold|extrabold|black)' src/` = 0.

- **`font-extrabold` (800) → `font-bold` (700)** — 17 occurrences, all big-number stat displays. **Pure mechanical**, none drop to 500.
  `PartnerGrid.tsx:32,36,40,44` · `B2bQuoteSimulator.tsx:135,139,146` · `TechnologyView.tsx:351,544` · `ProblemBeat.tsx:137,143` · `PricingSection.tsx:62` · `InlinePricingSimulator.tsx:174` · `CameraSimulator.tsx:722` · `KakaoAlertMockup.tsx:308` · `FiveQuestionsMockup.tsx:198` · `mdx-components.tsx:22`
- **`font-black` (900) → `font-bold` (700)** — 42 occurrences. Heading/hero/stat → 700; small `text-xs` chips/badges → `font-medium` (500): specifically `SolutionDetailView.tsx:232,348`. Default 900→700.
  Files: `SolutionDetailView`, `AboutView`, `NewsView`, `InvestorsView`, `CareerView`, `B2bQuoteSimulator`, `SolutionsView/RetailView/PartnershipView/LargeSpaceView/FoodBeverageView/DrugView` (2 each), `TechnologyView/SealView/ResourcesView/GlossaryView/GlossaryDetailView/FaqView/CaseStudiesView` (1 each), `OriginStoryTimeline.tsx:172`, `not-found.tsx:28` (see T3).
- **`font-semibold` (600) → mostly `font-medium` (500); heading-scale → `font-bold` (700)** — 329 occurrences across 110 files. **JUDGMENT.** Bulk `replace_all` per file to `font-medium`, then re-bump the heading-scale (`text-2xl+`) instances to `font-bold`: `RetailView.tsx:246`, `FoodBeverageView.tsx:195`, `DrugView.tsx:195`, `LargeSpaceView.tsx:268` (+ re-grep `text-2xl.*font-semibold` for the reported 5th). Highest concentration: `faq-i18n.tsx`(16), `ModelCatalogMockup.tsx`(11), `privacy/page.tsx`(10), `GlossaryDetailView.tsx`(9), `AnonymizerView.tsx`(9), `faq-data.tsx`(8), `CaseStudiesView.tsx`(8).
- **CSS literals (caveat 6):** sweep `font-weight: 600` in `globals.css` (~155, 186, 250) → `500`.

### T3 — Compound violation `not-found.tsx:28` · C-immediate
`text-[8rem] … font-black … text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5` → `font-bold` + solid color `text-white/15` (drop the 3 gradient/clip classes). Weight is P2; gradient is P3 — fix together on this line. (Same file also has gradient bg L11, semibold L36/67, decorative emerald/violet accents L55-57 — see P3.)

---

## PHASE 3 — Gradient removal + One-Blue color

**Lens:** gradients / color. **Verify:** `grep -rE 'bg-gradient|text-transparent|bg-clip-text|from-|via-|to-' src/` = 0 except exemptions. Tokens exist: `--surface-dark #0B1220`, `--surface-dark-2 #0E1730` (`globals.css:21-22,72-73`).

### G1 — Dark hero/section gradients → solid token (OBJECTIVE) · C-immediate (21)
Replace `bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800` (and variants) with `bg-surface-dark` / `bg-surface-dark-2`. Files: `SolutionDetailView:157`, `SolutionsView:99`, `AboutView:216`, `PartnershipView:176`, `NewsView:172`, `InvestorsView:209`, `CareerView:249`, `ResourcesView:86`, `FaqView:92`, `GlossaryView:69`, `RetailView:144`, `LargeSpaceView:153`, `FoodBeverageView:120`, `DrugView:120`, `CaseStudiesView:504`, `EnterpriseView:212`, `TechnologyView:332`, `HomeView:149` (overlay → solid `bg-surface-dark/80` scrim), `MasterPair:27` (same), `FAQSection:115`, `InlinePricingSimulator:167`.
> **Caveat:** many of these have a SIBLING radial glow on the next line (see G3) — the one-line swap does NOT fully de-gradient them.

### G2 — Text gradients → solid token (OBJECTIVE, double ban) · C-immediate (8)
Delete `text-transparent bg-clip-text bg-gradient-*` → `text-primary` (light) / `text-primary-light`/`text-white` (dark). `SolutionsView:121` (emerald/teal/blue **rainbow** → single `text-primary-light`), `NewsView:184`, `PartnershipView:188`, `CareerView:261`, `InvestorsView:221`, `PricingClientView:491`, `not-found.tsx:28` (T3). Delete `.text-gradient` utility `globals.css:627-632`; its call site `EnterpriseView.tsx:225` → `text-primary-light`.

### G3 — Decorative radial glows / mesh / shimmer (JUDGMENT delete) · C-immediate (11)
Delete the aria-hidden glow overlay `<div>`s entirely (the solid G1 bg stands alone): `HomeView:151`, `AboutView:217` (**indigo `rgba(99,102,241)` — One-Blue violation**), `PartnershipView:177`, `TechnologyView:333`, `NewsView:173`, `InvestorsView:210`, `CareerView:250`, `FAQSection:116`. In `globals.css`: delete `.bg-mesh-light` (669-672, contains teal `--secondary` + **violet `rgba(124,58,237)`**), `.section-divider-top` gradient (598-600 → `border-t border-primary/20`), `.btn-shimmer` (657-665).
> **Caveat:** `.btn-shimmer` is LIVE at `HomeView:165`, `EnterpriseView:234,412`, `StoreAgentContent:220`; `.text-gradient` at `EnterpriseView:225`; `.glow-ring` at `ProductCard:55`. **Update/remove those call sites in the same pass** or class references dangle.

### G4 — Light-section soft fades + bottom masks (OBJECTIVE) · high (19)
`from-gray-50 to-white` etc. → solid `bg-gray-50`/`bg-white`. Bottom `from-white to-transparent` fade masks on dark heros — delete the overlay div. Files: `ContactFormPage:432`, `resources/blog/page:36`, `storeagent/blog/BlogContent:170`, `ko|jp|_/pricing/page:33`, `AgentMockupShowcase:51`, plus dark-hero masks `SolutionDetailView:168`, `SolutionsView:110`, `AboutView:218,289`, `PartnershipView:178`, `NewsView:174`, `InvestorsView:211`, `CareerView:251`, `TechnologyView:334`, `PricingClientView:424`, `MockupGallery:490`, `AlertFatigueComparison:241`.

### G5 — Decorative bars / dividers / progress / card tints (OBJECTIVE) · high (29)
Bars/progress → solid `bg-primary`. Hairline dividers → `border-t border-primary/20`. Card tints `from-primary/[0.04] to-white` → `bg-primary/5`. **Multi-color → One-Blue:** `ArticleCard:106` rainbow bar, `VisionDiagram.tsx` (violet/indigo/blue/emerald tints L62-144), `FeatureSection` (rose/sky/secondary chips L16-50,79,80). Full file list per lens: `SolutionTimeline:123`, `POSAnalysisSection:326`, `ReadingProgress:5`, `Footer:68`, `MinisiteFooter:23`, `StoreAgentContent:124`, `InlinePricingSimulator:65`, `PricingClientView:490`, `B2cPlans:28`, `Retail/LargeSpace/FoodBeverage/Drug View:244/266/193/193`, `StoreInsightMockup:323`, `StoreInsightDesktopMockup:448`, `RoiCalculatorWidget:151`, `storeagent/blog/BlogContent:340`, `.card-accent-top globals.css:699-701`. RoiCalculator slider 2-stop track fill is acceptable as a functional indicator.

### G6 — OG/social image gradients (OBJECTIVE) · medium (2)
`opengraph-image.tsx:17`, `twitter-image.tsx:19` `linear-gradient(135deg, primary→primaryDark)` → solid `BRAND.primary` (#376AE2).

### G7 — Color token: teal secondary (OBJECTIVE) · high
`src/lib/tokens.ts:19` — remove the teal `--secondary` second brand color (One-Blue). This is the root of the teal that leaks into `.text-gradient`, `.bg-mesh-light`, `.section-divider-top`, `.card-accent-top`, FeatureSection.

### EXEMPT — do NOT flag (G-exempt)
- **1px gridline/scanline "gradients"** (CSS idiom for hairlines, no color transition): `globals.css:548-551,580-584,676-678`; `bg-grid-pattern`; `VisionCoordinatesMockup:166`; `SpatialTrajectoryMockup:263`; `AnonymizationMockup:104`; `ScanlineOverlay:8`; hero grids in `SolutionsView/SolutionDetailView/LargeSpace/Retail/FoodBeverage/Drug`; `not-found:18`. **Low — keep** (swap to tiled SVG only if Part-C read literally).
- **Device/mockup chrome** metallic frames: `PhoneFrame`, `MacBookFrame`, `TabletFrame`, `KakaoAlertMockup:175`, `PushNotificationMockup:136`. **Exempt** (caveat 4) — flattening degrades realism.

---

## PHASE 4 — Numbers + charts (JUDGMENT)

**Lens:** numbers-charts. Data-viz discipline is otherwise strong (`CaseStudyChartMockup` is exemplary). **Visual review required.**

| ID | File:line | Issue → Fix | Mode |
|----|-----------|-------------|------|
| NC-01 | `AboutView.tsx:391,393` + `company-data.ts:12-18` | Bare `100%` compliance stat + count stats lack unit/date/source → replace `100%` with a named cert or drop; add `as of YYYY.MM` / `* 자사 집계 기준` footnote | OBJECTIVE (sourcing) |
| NC-02 | `VisionCoordinatesMockup.tsx:45,79,113` | `매출 30%+` bare forward figure → mark as target w/ horizon: `비-리테일 매출 비중 30% 이상 목표 (2027)` | OBJECTIVE |
| NC-03 | `StoreInsightDesktopMockup.tsx:342-348,366-413,448` | Chart on violet/fuchsia + `bg-gradient from-violet-500/5 to-fuchsia-500/5` → recolor to One-Blue ramp; gradient card → solid `bg-primary/5` | OBJECTIVE (color/gradient) **— product's own palette, NOT exempt chrome** |
| NC-04 | `StoreInsightMockup.tsx:323,330-334` | violet→fuchsia gradient + violet accents → `bg-primary/5` + blue token | OBJECTIVE |
| NC-05 | `MultiStoreDashboardMockup.tsx:54,71,88,284` | Label-style title `시간대별 방문자` → takeaway. **CAUTION:** data does NOT peak at 2-4 PM (true max at idx 7 per `enterprise.ts:57-63`); do NOT copy "2–4 PM". Use a true takeaway e.g. `점심·저녁에 방문 몰림`, or fix data/x-axis first | **JUDGMENT — data accuracy** |
| NC-06 | `StoreInsightDesktopMockup.tsx:340-350` | Legend-dependent series → add inline end-labels `오늘`/`AI 예측` (strings exist: L81, L86/116/146). Do AFTER NC-03 recolor | JUDGMENT |
| NC-07 | `POSAnalysisSection.tsx:326` | Chart bar `bg-gradient-to-r from-primary/80 to-primary` → solid `bg-primary` | OBJECTIVE |

> **No causal claims (인과 단정) found in stat copy. No 3D / dual-axis / pie / rainbow in the line/bar charts proper.**

---

## Quick-win delegable batch (do first, zero judgment)

`P1a (all 19 ANON items)` + `T1 (Geist)` + `font-extrabold→font-bold (17)` + `G6 (OG images)` + `G7 (teal token)` + `V3 (canon comments)` — all pure mechanical, no visual review, ~immediate. Everything else needs either the 3→4 loop decision (V2), copy judgment (V1/V5/V6), the 700-vs-500 call (T2 semibold/black), or chart/data review (P4).
