# DESIGN.md — deepingsource.io design system

The single entry point for editing this site's design. Read this before changing
colors, spacing, type, or shared UI.

> ⚠️ **Source of truth lives here, not in `design-system/`.**
> The repo‑root **`design-system/`** folder is a read‑only export of the **SAAI
> product / brand** system (a *different* product; the brand‑system docs live in
> the upstream SAAI repo, not here). This marketing site's tokens
> are defined in **`src/app/globals.css`** (CSS) and **`src/lib/tokens.ts`** (JS).
> Don't wire site components to `design-system/`.
>
> **예외(목업 내부 — MOCKUP_MASTER_PLAN_v1 D1).** `src/components/mockups/**`의
> 목업 "화면 내부"는 SAAI 제품 UI의 재현이므로 SAAI DS를 따른다. 단
> `design-system/`을 직접 import하지 않고 codegen 산출물
> `src/lib/mockup-tokens.gen.ts`(+ `src/app/saai-tokens.gen.css`의 `--saai-*`
> 변수)로만 소비한다 — `npm run gen:mockup-tokens`. 목업 바깥 레이어(프레임
> 그림자·등장 애니메이션·배지)는 사이트 토큰 — 경계는 `MockupViewport`
> (`.saai-scope` 부여)다.

---

## Sources of truth

| Layer | File | Used by |
|---|---|---|
| CSS tokens | `src/app/globals.css` → `:root` + `@theme inline` | Tailwind utilities (`text-primary`, `shadow-card`, …) and `var(--…)` in CSS |
| JS tokens | `src/lib/tokens.ts` (`BRAND`, `GRAY`, `STATUS`) | SVG/canvas mockups, `next/og` image routes — anything that **can't read CSS vars** |
| Mockup palette | `src/lib/mockup-tokens.ts` | the `/demo` mockups only (intentionally separate) |

**When the brand blue changes, update ALL of:** `globals.css :root` (`--primary*` + `--primary-rgb`), `src/lib/tokens.ts` (`BRAND`), `src/app/icon.svg`. (OG/twitter image routes already read `BRAND`.) `manifest.json` `theme_color` + `layout.tsx` `viewport`/`other.theme-color` should match too.

## Tokens (in `globals.css`)

- **Brand blue (ONE blue):** `--primary #376AE2` (+ `-dark #2453C4`, `-light #5B86EA`, `-lighter #E5EDFC`). For alpha in CSS use `rgb(var(--primary-rgb) / <a>)`. Never reintroduce the old `#1E88E5`.
- **Secondary (teal, sparing):** `--secondary #26A69A` / `--secondary-rgb`.
- **Status (Material set — the live one):** `--success #4CAF50`, `--warning #FF9800`, `--error #F44336`. (There is no separate "brand status" palette — it was removed as dead.)
- **Gray:** `--gray-50..900` (Tailwind‑aligned).
- **Section bg:** `--bg-warm`, `--bg-cool`, and `--layer-section-alt` (`#F7F9FC`).
- **Radius:** `--radius-sm/md/lg/xl/2xl` (4/8/12/16/20). `rounded` defaults to 8px.
- **Shadow (blue‑black, never neutral):** utilities `shadow-card`, `shadow-card-hover`, `shadow-elevated` (tinted `rgba(23,45,95,…)`). Tailwind's default `shadow-*` remain untouched.
- **Easing:** `var(--ease-out-cubic)` (default reveal), `var(--ease-out-expo)` (counts). Springs for JS motion: `src/lib/spring-config.ts` (`springGentle`, …).
- **Z‑index scale:** use `z-[var(--z-NAME)]` where NAME is one of sticky · float · header · overlay · modal · toast · skiplink (30/35/40/45/50/60/100). Don't hardcode numeric z-index.
- **Micro‑type:** `text-2xs` (11px), `text-3xs` (10px), `text-4xs` (8px).
- **Fonts:** `--font-sans` Pretendard, `--font-display` Pretendard (KR; JP→PretendardJP), `--font-mono`.

## Shared UI primitives (`src/components/ui/`)

Prefer these over re‑inlining class strings. All accept `className` (appended) for one‑off overrides.

> **Migration status:** the **homepage** (`src/components/corporate/*`) is fully migrated to these primitives — use it as the reference. Sub‑pages (`corporate/views/*`, `sections/*`) are migrated **incrementally**: when you touch a file, swap its inlined section/container/eyebrow/card for the primitives. The `lint:tokens` guard + this doc drive convergence.

| Primitive | Replaces | Notes |
|---|---|---|
| `<Section variant pad>` | `py-20 lg:py-28 bg-*` section shells | wraps `AnimatedSection` (keeps scroll reveal); variant `default`/`alt`/`dark` |
| `<Container size>` | `max-w-* mx-auto px-4 sm:px-6` | size `default`(6xl)/`narrow`(3xl)/`medium`(5xl)/`wide`(7xl)/`prose`(2xl) |
| `<Eyebrow tone>` | uppercase kicker `text-xs font-bold uppercase tracking-[0.2em]` | tone `primary`/`light`(dark bg)/`muted` |
| `<Card as hover>` | `rounded-2xl border border-gray-200 bg-white` | `as={Link}` for clickable; `hover` routes elevation to `shadow-card-hover` |
| `<IconChip size>` | `w-11 h-11 rounded-xl bg-primary-lighter` icon holder | put the icon as children |
| `AnimatedSection` / `StaggerContainer`+`StaggerItem` | scroll reveal / staggered card entrance (springGentle) | already widely used |
| `Breadcrumb` | nav + BreadcrumbList JSON-LD | see breadcrumb system |

## Motion

- Headline reveal: `<WordRise>` (CSS maskRise, `.wr-word`). Section reveal: `AnimatedSection` (`.scroll-visible`). Connector draw: `.draw-line` (scaleX). All honor `prefers-reduced-motion` (see the `@media` block in globals.css).

## AEO / structured data

JSON-LD helpers: `src/lib/structured-data.tsx` (`JsonLd`, `definedTerm`, `softwareApplication`, `faqPage`, `breadcrumbList`, `itemList`, `article`, `definedTermSet`, `service`). See per-page usage in product/technology/glossary/solution Views.

## Editing rules

1. Use a token or a primitive. Don't hardcode hex/rgba in `className` or CSS (stylelint warns; `src/components/mockups/**` is exempt — it uses `mockup-tokens.ts`).
2. Don't hardcode `z-[NN]` — use the z scale.
3. One blue. Status = Material set. Shadows = blue‑black tokens.
4. Visual reference: run the app and open **`/styleguide`** (internal, noindex) to see all tokens + primitives.
