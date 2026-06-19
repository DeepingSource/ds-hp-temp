# Design System for SAAI Plus Agent (Web App) — Inspired by Bloomberg Terminal × Notion

## 0. Production Constraints (Read First)

Output
- Web app surfaces only — Plus Agent (the flagship chat-first analytics agent), and its sibling surfaces (store-insight, store-care). No print, no PPT, no marketing landing pages are in scope for this system.
- Reference viewport: **1440 × 900 px desktop**. The system also responds correctly at 1024px, 768px, and 360px — see §8.
- All deliverables compose against the SAAI shell (sidebar + chat column + composer + chart pane) defined in §5.

Brand Assets (mandatory, no substitution)
- Logo: SAAI logo only. Do NOT substitute another brand or composite the SAAI mark with sibling product wordmarks (store-agent / store-care / store-insight) unless the surface is explicitly co-branded. Use the logo file exactly as provided — see Logo Integrity Rule below.
- Marketing mark: The SAAI marketing mark is the "SSAAII" double-letter form. Do NOT "correct" the doubling — it is intentional and trademark-relevant.
- Symbol: The SAAI clover is a single 4-lobe arc-rendered mark. Do NOT redraw, simplify, or recolor the symbol — use the SVG provided.
- Typography: Pretendard KR only (and Pretendard JP for Japanese surfaces) — no exceptions. Do NOT use Inter, Roboto, Noto, system fallbacks, or any other family under any circumstance. Every weight reference below maps to Pretendard's scale; the system uses three weights only — 400 / 500 / 700. If a fallback string is needed for export-safety, use `'Pretendard', system-ui, -apple-system, 'Helvetica Neue', sans-serif`, but the only family that should actually render is Pretendard.

Shell Skeleton — locked regions across the product
Every page in the Plus Agent product places these five regions at identical anchors. The user's eye should never have to relearn the layout when a new conversation opens — only the body of the chat thread changes, never the frame.

| Region | Anchor (1440px desktop) | Contents | Style |
|---|---|---|---|
| Sidebar | x: 0–248 (open) / 0–54 (collapsed); full height | Brand lockup, "New chat", store selector, history, footer actions | BG `{colors.bg.sidebar}` (#F9F9FB), 300ms fold transition, history rows 38px tall |
| Title bar | y: 0–56; x: starts at sidebar edge, full width to right | Store pill (left), conversation title (center-left), overflow menu (right) | BG `{colors.bg.app}` with `backdrop-filter: blur(10px)`, sticky-top, the only glass-morphism surface in the system |
| Chat thread | y: 56–[viewport − 96]; centered, max-width 800px | User bubbles (right), bot bubbles (left, no surface), inline chart cards, recommendation pills | BG transparent over `{colors.bg.app}`, vertical scroll, message-bubble padding 16–24px x × 12px y |
| Composer | y: [viewport − 96]–[viewport − 24]; centered, max-width 800px | Text input + send icon-button, footnote line | BG `{colors.bg.input}` (#FAFAFA), `{rounded.lg}` (10px), `{shadow.input}`, sticky-bottom |
| Chart pane | x: [viewport − chart-width]–viewport; full height; slides in from right | Active chart at full size, chart toolbar | BG `{colors.bg.app}`, 480ms slide-in with `{ease.out-quint}`, compresses chat to `clamp(392px, 50%, 800px)` |

Locked rule: These five regions do not move between pages or conversations. The sidebar starts at x=0, the title bar starts at y=0, the chat column is centered at max-width 800px, the composer is sticky-bottom, the chart pane docks right. **Override is permitted only on three structural surfaces** — the empty state (replaces chat thread + composer with a centered welcome layout), the auth / onboarding screen (no sidebar, no chat thread), and the printable chart export (chart pane only, no shell). Routine "this conversation is unusual" is NOT a valid override.

Hard boundary: The chat thread lives strictly inside the centered 800px column on desktop. It does NOT bleed into the sidebar (left of the column) or under the chart pane (right of the column when open). Inline chart cards must fit within the 800px column even when the chart pane is closed — no "wide" charts that escape the column. If a chart needs more width to be legible, it opens the chart pane to full size; it does not stretch the inline card.

Logo Integrity Rule: The SAAI logo and clover symbol must be placed exactly as provided — original SVG, original proportions, original colors, original transparency. Insert the SVG file as-is. Do NOT add an underline, drop shadow, glow, border, frame, recolor, gradient, opacity change, background fill, opaque box behind the logo, or any other visual treatment. Do NOT crop, stretch, skew, rotate, or duplicate the logo. The only permitted operations are uniform scaling (preserving aspect ratio) to fit the target height in each surface (sidebar lockup ≈24px tall, title bar ≈20px tall), and uniform color inversion to white when placed on the rare dark surface (tooltip context, future dark-mode variant — not currently shipped). A black or white rectangle behind the logo is a defect, not the design — if a generated output shows any line, mark, decoration, or solid box on/behind the logo that is not in the original SVG, treat it as a defect and fix it before shipping.

Wordmark Lockup Rule: Do NOT lock up two product wordmarks (store-agent / store-care / store-insight) in a single mark unless the surface is explicitly co-branded (e.g., a partnership announcement, a cross-product feature page). On the Plus Agent surface, only the SAAI lockup and the store-agent wordmark appear; the sibling product wordmarks are not present.

Chat Thread Density Rule
The chat column must NOT be left half-empty when the bot's reply is genuinely thin. SAAI is an analysis tool — every reply should carry information density. If a reply has only a one-line answer, plan to add evidence: a sparkline KPI tile, a small inline chart, a tabular comparison, or a follow-up recommendation pill stack. Empty space in the middle of a chat thread breaks the analyst-tool brand register; the user starts to read the thread as a chatbot, not as a Bloomberg-Notion hybrid.

Density never overrides the hard boundary. "Filling the column" means filling inside the centered 800px chat column — it does NOT mean breaking out into the sidebar, overlapping the title bar, or pushing under the composer. If pursuing density tempts you to widen a chart card past 800px or extend a message bubble outside the column, the data has too much to say in a single message — split into multiple messages or open the chart pane.

If a reply genuinely has thin content, use one of these density tactics — never decorative padding, never region invasion:
- Pull supporting evidence (a sparkline KPI, a 3-row table, a small chart) into the bot bubble, still inside the 800px column
- Add a "next question" recommendation pill stack at the bottom of the bubble (3 pills max)
- Insert an inline chart card with takeaway title and a "Show chart" CTA that opens the chart pane
- Split the bubble into a 2-column claim / evidence layout (claim left, mini-chart right)
- Use Pattern F (Stacked Insight Layers, see §5) — KPI tile row above, chart middle, evidence cards below

Do NOT pad replies with decorative shapes, illustrations, or generic disclaimers to fake density.

Visualization-First Rule (data-first default)
Plus Agent is a data-first product. Whenever a reply carries data, comparison, process, structure, or relationship — visualize it, do not narrate it in prose. This is a strong default, not a suggestion. (See `CHART_DESIGN_GUIDE.md` for the full decision tree.)

Trigger conditions (if any apply, the reply MUST include a visualization):
- Two or more numbers being compared (KPI tile row or bar chart, never inline prose)
- A trend over time (line chart or sparkline, even with only 2–3 points)
- Composition / share / distribution (bar, donut, or 100% stacked bar)
- A process or sequence (horizontal arrow flow, numbered stages)
- A comparison across categories (grouped/stacked bar or table — chart preferred over table)
- A structural relationship between concepts (diagram, matrix, 2×2)

Visualization options to reach for, in priority order:
1. Charts — line, bar (vertical / horizontal / grouped / stacked), waterfall, CI band, heatmap, sankey, treemap, funnel. Default. Use the chart palette in §2.
2. KPI tiles with sparklines — when a single number deserves emphasis but context still matters
3. Inline chart cards with "Show chart" CTA — when the chart needs the full chart pane to read clearly
4. Tables — last resort, only when individual cell values matter and ranking/comparison is secondary

Constraints (visualization never breaks the layout):
- Inline visualizations live strictly inside the centered 800px chat column. Never bleed into the sidebar or composer regions.
- A single bot bubble should carry 1–2 visualizations max, not 4+. Cramming charts breaks the pacing more than missing them.
- Every chart must have: a takeaway title (Pretendard 700, 14pt), axis labels (Pretendard 400, 11pt minimum), and a source line (Pretendard 400, 10pt, `{colors.fg.muted}`) directly below.
- Chart-internal text is never below 11pt. If forced below, the chart is too dense — split or open the chart pane.
- Pure-prose bot replies are reserved for: definitions, single-quote callouts, explanation of methodology, error / fallback states. Everything carrying data gets a visualization.

Forbidden chart patterns (the four anti-patterns)
- 3D charts of any kind
- Dual Y-axis on the same plot
- Rainbow categorical (more than three distinct hues at once)
- Pie / donut with more than 5 slices

When in doubt, ask: "Could this be a chart instead of a sentence?" If yes, make it a chart.

---

## 1. Visual Theme & Atmosphere

The aesthetic bridges Bloomberg Terminal information density with Notion's Pretendard-led calm. Pure white (#FFFFFF) is the structural background; color enters via charts, status pills, the sky-blue focus halo, and the lone brand blue. Pretendard at 400 / 500 / 700 carries a tooling-tone confidence — not aggressive, not airy, not personable. The voice is fact-first; the palette is restrained; the layout is dense.

Key Characteristics
- White-dominant canvas with grey-scale chrome and a single brand blue carrying every primary action
- Pretendard KR across the entire system, with weight (400 / 500 / 700) doing all hierarchy work — no weight 300 or 800
- Two-track type system: heading at line-height 1.5, body at line-height 1.7
- Default border radius 8px (`{rounded.md}`); buttons 6px (`{rounded.sm}`); inputs 10px (`{rounded.lg}`); the single store-selector pill at 900px
- One brand blue: `{colors.brand-blue}` (#376AE2) for every primary action
- Five data hues quarantined to charts: cyan / purple / yellow / green / red
- Near-black text (#24282D) on white
- No drop shadow above 0.16 opacity — light-and-airy is the brand register
- Tight density: 38px sidebar history rows, 32–38px button heights, desktop-first 32px touch targets
- No gradients except in the two functional indicators (streaming text, recommendation skeleton)

---

## 2. Color Palette & Roles

### Brand Primary
- Brand Blue (#376AE2): the system's only brand color — every primary action, focus ring, selected row, emphasized chart series
- Brand Blue Hover (#3260CE): the primary-button hover state

### Brand Blue Scale (used inside the brand alias)
- #F7F9FD — brand-blue-tint (lightest, hover surface over white)
- #EBF0FC — brand-blue-selected (selected row background)
- #C1D1F6 — sequential ramp step
- #799BEC — focus ring color
- #376AE2 — primary brand
- #3260CE — primary hover
- #274BA0 — chart sequential deep
- #172D5F — chart sequential darkest

### Text
- #24282D — primary text (body, headline, KPI numbers)
- #3D434D — secondary text (chat title bar, secondary labels, empty-state title)
- #565F6C — tertiary text (sidebar section headers, axis labels)
- #787F89 — muted (caption, footnote, idle send icon)
- #B1B5BB — placeholder (composer hint, disabled hint)

### Surface
- #FFFFFF — primary background (canvas, modal, card, message bubble)
- #F9F9FB — sidebar, user bubble (grey 25)
- #FAFAFA — input field background
- rgba(142,148,157,0.10) — hover-soft (transparent buttons)
- rgba(120,127,137,0.10) — hover-grey (outlined buttons, menu items)

### Borders
- #E9E9EA — border-subtle (sidebar section divider, inside menu paper)
- #D9DBDD — border-default (cards, inputs, recommendation pills, inline chart cards)
- #799BEC — border-focus (2px focus ring color)

### Data Palette (charts only — never on chrome)
- #76CCCF — cyan (categorical series #2)
- #B65BE1 — purple (categorical series #3)
- #FAD232 — yellow (status.warning, categorical #4)
- #1AB715 — green (status.success, categorical #5)
- #E05959 — red (status.error, categorical #6 — only when ± series coexist)

### Semantic
- success: #1AB715 (paired with `icon-completed-status`)
- warning: #FAD232 (paired with `icon-warning`)
- error: #E05959 (paired with `icon-sad`)
- info: #376AE2 (paired with link / reference glyph)

### Shadow Library

| Token | Value | Use |
|---|---|---|
| `{shadow.input}` | `0px 2px 10px 0px rgba(135,135,135,0.12)` | Composer input |
| `{shadow.pill}` | `0px 0px 20px 0px rgba(135,135,135,0.12)` | Store-selector pill |
| `{shadow.card}` | `0 2px 6px 0 rgba(0,0,0,0.08)` | Inline chart card, modal |
| `{shadow.menu}` | `0px 1px 2px 0px rgba(0,0,0,0.05)` | Dropdown paper |
| `{shadow.tooltip}` | `0 2px 4px rgba(0,0,0,0.25)` | Tooltip (the only dark surface) |
| `{shadow.focus}` | `0 0 0 2px rgba(122,197,255,0.30)` | Keyboard focus ring |

No inner shadows. No colored shadows. No layered chrome. Drop shadow opacity above 0.16 is forbidden.

### The Two Permitted Gradients (Functional Only)

Gradients are forbidden as decoration. The system permits exactly two gradient surfaces, both as functional motion indicators — not decoration.

1. **Streaming text gradient** — Bot reply tokens streaming in. A horizontal grey gradient applied via `background-clip: text`, animating left-to-right at 1500ms loop. The gradient signals "the answer is still being written."
2. **Recommendation skeleton shimmer** — Recommendation pill outlines pre-load. Horizontal grey gradient shimmer, 1500ms loop. The gradient signals "loading."

Fixed parameters — do NOT vary these:
- Direction: horizontal (0deg → 180deg sweep)
- Stops: light grey (#E9E9EA) → mid grey (#D9DBDD) → light grey, no other colors
- Animation: 1500ms loop, linear, no easing
- Opacity: 1.0 (no transparency layering)

Forbidden gradient locations
- Chart bars / lines / data points — gradients on data create false visual hierarchy. Use flat brand blue or flat data hues.
- Headlines, body text, button surfaces — solid color only.
- Card backgrounds — solid white or sidebar grey only.
- The brand mark, the clover symbol, the focus ring — flat colors only.
- Sidebar, title bar, composer surfaces — flat only.

---

## 3. Typography Rules (Pretendard-only)

### Family
Pretendard KR only (Korean + Latin native, weights 100–900 available but only 400 / 500 / 700 used). Pretendard JP for Japanese surfaces. No other family is permitted under any circumstance — not for headlines, not for data, not for fallback. If a fallback string is required for export-safety, use: `'Pretendard', system-ui, -apple-system, 'Helvetica Neue', sans-serif`, but the only family that should actually render is Pretendard. Pretendard ships with the product.

### Weight Map (functional roles)
- 700 Bold — Slide headlines (rarely used in chat), KPI numbers, chart takeaway titles, single-word body emphasis
- 500 Medium — Card titles, button text, sidebar history rows, sub-heads, label emphasis
- 400 Regular — Body text, chat messages, captions, sources, axis labels, footnotes
- 300 Light and 800 ExtraBold — NOT used in the system. Do not introduce.

### Two-Track Hierarchy (line-height splits headings from body)

| Role | Weight | Size | Line Height | Color |
|---|---|---|---|---|
| Heading 3xl | 700 | 38px | 1.5 | #24282D |
| Heading 2xl | 700 | 34px | 1.5 | #24282D |
| Heading xl | 500 | 27px | 1.5 | #24282D |
| Heading l | 500 | 24px | 1.5 | #24282D |
| Heading m | 500 | 21px | 1.5 | #24282D |
| Heading s | 500 | 17px | 1.5 | #24282D |
| Heading xs | 500 | 15px | 1.5 | #24282D |
| Heading 2xs | 500 | 13px | 1.5 | #24282D |
| Body xl | 400 | 17px | 1.7 | #24282D |
| Body l | 400 | 15px | 1.7 | #24282D |
| Body m (default) | 400 | 13px | 1.7 | #24282D |
| Body s | 400 | 12px | 1.7 | #24282D |
| Empty-state title (special) | 500 | 24px | 1.4 | #3D434D |
| KPI number | 700 | 27–34px | 1.4 | #24282D (or #376AE2 when emphasized) |
| Chart title (takeaway) | 700 | 14px | 1.5 | #24282D |
| Chart axis | 400 | 11px | 1.5 | #787F89 |
| Chart source | 400 | 10px | 1.5 | #787F89 |
| Caption / footnote | 400 | 12px | 1.7 | #787F89 |

### Principles
- Two-track rule: heading-track at 1.5 line-height pairs against body-track at 1.7. A 17px heading and a 17px body paragraph read at distinctly different paces — that's the editorial signature.
- Default body is 13px / 1.7 / weight 400. UI labels, menu items, chat messages, recommendation pills all share this size.
- Headlines above 32pt apply -0.02em to -0.03em tracking to compensate for Pretendard's optical loosening at large sizes. Body stays at 0 tracking.
- Empty-state title is the only surface in the system at line-height 1.4 — a deliberate exception that signals "invitation, not announcement."
- Chart-internal text is never below 11pt. If the data forces below, the chart is too dense.
- No italic except when quoting a source (rare). Italic on Korean reads as broken type.
- Korean–Latin mixing: Pretendard handles both natively, no font swap mid-sentence. English copy reserves ~30–40% extra width vs. Korean.

### Markdown Inline Rules
- **Bold** is reserved for conclusion sentences and headline numbers. Two bold spans in one paragraph erase the emphasis.
- *Italic* is almost never used.
- `code` is reserved for actual code, identifiers, API keys, variable names, token paths.

---

## 4. Component Stylings

### Buttons / Pills

Button Primary
- BG `#376AE2`, text `#FFFFFF`, padding 8px 16px, height 38px, radius `{rounded.sm}` (6px), Pretendard 500 13pt
- Hover: BG → `#3260CE`. No press animation, no scale, no transform.
- Disabled: opacity 0.3, cursor not-allowed
- Use: Send (composer), New chat (sidebar), Refresh suggestions (recommendations), primary CTA in modals

Button Secondary
- BG transparent, text `#24282D`, 1px outline `#D9DBDD`, padding 8px 16px, height 38px, radius `{rounded.sm}` (6px)
- Hover: BG → `rgba(120,127,137,0.10)` (hover-grey)
- Use: secondary actions, outlined "Cancel" in modals

Button Ghost
- BG transparent, text `#3D434D`, no border, radius `{rounded.sm}` (6px)
- Hover: BG → `rgba(142,148,157,0.10)` (hover-soft)
- Use: overflow menu items, inline "View more"

Icon Button
- 32px square, stroke icon at 20px, default tint `#565F6C`, active tint `#376AE2`, no fill
- Use: more, close, settings, share, refresh, send (composer)

Store Selector Pill (the ONLY pill in the system)
- BG `#FFFFFF`, text `#24282D`, radius `{rounded.pill}` (900px), shadow `{shadow.pill}`, padding 8px 16px, height 32px
- Carries store name + chevron — read as state badge, not action
- Use: chat title bar only — do NOT introduce a new pill button anywhere else

### Content Cards (chat thread)

User Message Bubble
- BG `#F9F9FB`, radius `{rounded.md}` (8px), padding 16–24px x × 12px y, right-aligned in 800px column
- Body Pretendard 400, 13pt, 1.7 line-height, color `#24282D`
- No avatar — right-alignment is the speaker signal

Bot Message Bubble
- BG transparent, radius 0, no border, no shadow, left-aligned in 800px column
- Body Pretendard 400, 13pt, 1.7 line-height, color `#24282D`
- Markdown-rendered with heading-s sub-heads; the bot's voice IS the chat column

Inline Chart Card
- BG `#FFFFFF`, 1px outline `#D9DBDD`, radius `{rounded.md}` (8px), shadow `{shadow.card}`, padding 24px x × 20px y
- Carries: thumbnail preview (16:9), takeaway title (Pretendard 700 14pt), source line (Pretendard 400 10pt #787F89), "Show chart" CTA (text-link in `#376AE2`)

Recommendation Pill
- BG `#FFFFFF`, 1px outline `#D9DBDD`, radius `{rounded.md}` (8px), padding 12px 16px
- Hover: outline → `#799BEC`, BG → `#F7F9FD`
- Stack of 3 max under a bot reply or empty state

KPI Tile (inside bot bubble)
- BG `#FFFFFF`, 1px outline `#D9DBDD`, radius `{rounded.md}` (8px), padding 16px
- KPI number Pretendard 700 27–34pt color `#24282D` or `#376AE2` (emphasized only)
- Label Pretendard 500 11pt color `#565F6C`
- Optional sparkline below the number — flat brand blue stroke, no fill

Empty-State Card
- Centered layout, no card frame
- SAAI clover symbol at top
- Title: Pretendard 500, 24pt, 1.4 line-height, color `#3D434D` ("Ask anything about your store") — the only 1.4 line-height surface in the system
- Composer below the title

### Inputs

Composer
- BG `#FAFAFA`, 1px outline `#D9DBDD`, radius `{rounded.lg}` (10px), shadow `{shadow.input}`, padding 16px x × 12px y, max-width 800px, sticky-bottom
- Placeholder Pretendard 400 13pt color `#B1B5BB`
- Send icon-button right-aligned: idle tint `#787F89`, active tint `#376AE2` (flips when input length > 0)
- Footnote below: Pretendard 400 12pt color `#B1B5BB`, e.g. "SAAI may make mistakes. Verify critical answers."

Text Input (forms)
- BG `#FAFAFA`, 1px outline `#D9DBDD`, radius `{rounded.lg}` (10px), padding 12px x × 8px y, height 32–38px
- Focus: outline → 2px `#799BEC`, shadow `{shadow.focus}`

### Charts (per `CHART_DESIGN_GUIDE.md`)
- Primary emphasized series: `#376AE2` flat (never gradient)
- Context series: `#B1B5BB` (grey 200) flat
- Stroke widths: 2px emphasized, 1.5px base, 1px context
- Gridlines: `#E9E9EA` (border-subtle), 1px
- Axis labels: Pretendard 400 11pt color `#787F89` — system minimum, never below
- Data labels (on bars / endpoints): Pretendard 500 11pt color `#24282D`
- Forecast lines: dashed (4 4 dasharray), grey 300, paired with CI band fill `rgba(55,106,226,0.08)`
- Bar Y-axis must start at zero
- Chart title: takeaway, Pretendard 700 14pt
- Source line under chart: Pretendard 400 10pt color `#787F89`
- Direct end-of-line labels preferred over legend boxes (Gestalt proximity)

### Tables (last-resort visualization)
- Header row: BG `#F9F9FB`, Pretendard 500 13pt, color `#24282D`
- Body rows: Pretendard 400 13pt, color `#24282D`, no alternating fill
- Row dividers: 1px `#E9E9EA`
- Cell padding: 8px 12px
- No vertical dividers — column gap carries the separation

### Tooltip (the only dark surface)
- BG `rgba(0,0,0,0.9)`, text `#FFFFFF`, radius `{rounded.sm}` (6px), shadow `{shadow.tooltip}`
- Pretendard 400 12pt, padding 8px 12px
- Triggered on icon-button hover with 200ms delay

### Status Indicators (NEVER use emoji or unicode)
- Complete: `icon-completed-status` (internal asset) + green `#1AB715`
- Pending: `icon-pending-status` + tertiary text `#565F6C`
- Warning: `icon-warning` + yellow `#FAD232`
- Error: `icon-sad` + red `#E05959`

---

## 5. Layout Principles

### Shell Grid (1440 × 900 desktop reference)
- Sidebar: 248px open / 54px collapsed (left edge)
- Title bar: 56px tall (top, sticky)
- Chat column: centered, max-width 800px
- Composer: 72px tall (sticky-bottom, inside chat column)
- Chart pane (when open): docks right, takes `viewport − chat-column` width

### Locked Regions (identical anchors on every page)

| Region | Position | Contents |
|---|---|---|
| Sidebar | x: 0–248 (open) / 0–54 (collapsed); full height | Brand lockup, "New chat", store selector, history, footer actions |
| Title bar | y: 0–56; from sidebar edge to right edge | Store pill, conversation title, overflow menu |
| Chat thread | y: 56–[viewport − 96]; centered, max-width 800px | User bubbles, bot bubbles, inline chart cards, recommendation pills |
| Composer | y: [viewport − 96]–[viewport − 24]; centered, max-width 800px | Text input, send icon, footnote |
| Chart pane (slide-in) | x: [viewport − chart-width]–viewport; full height | Active chart, chart toolbar |

Lock rule: These regions do not shift. The sidebar starts at x=0, the title bar at y=0, the chat column is centered at max-width 800px, the composer is sticky-bottom, the chart pane docks right when open.

Override exceptions: empty state (replaces chat thread + composer with centered welcome layout), auth / onboarding (no sidebar, no chat), printable chart export (chart only, no shell). Routine "this conversation is unusual" is NOT a valid override.

Hard boundary: Chat content lives strictly inside the centered 800px column on desktop. It does NOT bleed into the sidebar (left of the column) or under the chart pane (right of the column when open). Inline charts must fit within 800px even when the chart pane is closed.

### Spacing Scale (within the chat column and components)
- Base unit: 2px
- Steps: 2, 4, 6, 8, 10, 12, 16, 24, 32, 40, 60 px
- Component-internal padding: 16–24px
- Card-to-card gap: 16–24px
- Sidebar section break: 32px
- Headline-to-body gap: 16px
- Bubble-to-bubble gap inside chat: 12px

### Border Radius Scale
- 0px (`{rounded.none}`) — bot message bubble (no surface), section dividers
- 4px (`{rounded.xs}`) — menu items, divider chips
- 6px (`{rounded.sm}`) — buttons, tooltip
- 8px (`{rounded.md}`) — message bubbles, list rows, inline chart cards, KPI tiles, recommendation pills
- 10px (`{rounded.lg}`) — composer input, menu paper, store-selector outline
- 900px (`{rounded.pill}`) — store-selector pill (the only pill in the system)

### Body Composition Patterns (use to maintain chat-thread density)

Pattern A — KPI Strip + Chart (most common for dashboard-style replies)
- Top: 3–4 KPI tiles in a row, each ~180px wide × 88px tall
- Below: a single inline chart card (takeaway title + 16:9 thumbnail + "Show chart" CTA)

Pattern B — Two-Column Compare (claim / evidence)
- Left column (~380px): claim text + 2–3 supporting bullets
- Right column (~380px): a chart, diagram, or KPI tile
- Optional bottom: a single recommendation pill stack

Pattern C — Sequential Insight (multi-step explanation)
- Numbered stages stacked vertically (1, 2, 3...)
- Each stage: stage label + 1–2 line description + optional inline data
- Bottom: takeaway summary in bold

Pattern D — Process Flow (horizontal arrow chain)
- Inline horizontal flow with 4–6 numbered stages
- Each stage: numbered circle + stage label + 1-line description
- Below: outcomes summary or pull-quote

Pattern E — Quote + Evidence (rare, for methodology / definition replies)
- Large pull-text on top (Pretendard 500 17pt)
- Stack of 2–3 supporting data tiles below

Pattern F — Stacked Insight Layers (use when a reply is thin to keep density)
- Top band: KPI tile row (1 row, 3–4 tiles)
- Middle band: one inline chart card
- Bottom band: 3-up recommendation pills (next-question prompts)
- Eliminates empty space without padding

---

## 6. Depth & Elevation

| Level | Treatment | Use |
|---|---|---|
| 0 — Flat | No shadow | Bot message bubbles, section dividers, in-flow text |
| 1 — Hairline | 1px `#D9DBDD` | Recommendation pills, KPI tiles, inline chart cards (border only) |
| 2 — Card | `0 2px 6px 0 rgba(0,0,0,0.08)` | Inline chart card, modal |
| 3 — Input | `0px 2px 10px 0px rgba(135,135,135,0.12)` | Composer input |
| 4 — Pill | `0px 0px 20px 0px rgba(135,135,135,0.12)` | Store-selector pill (radial halo) |
| 5 — Tooltip | `0 2px 4px rgba(0,0,0,0.25)` | Tooltip (the dark surface) |
| 6 — Focus | `0 0 0 2px rgba(122,197,255,0.30)` | Keyboard focus ring |

Use shadows sparingly — at most one shadowed surface adjacent to another. Drop shadow opacity above 0.16 is forbidden. Inner shadows are forbidden. Colored shadows are forbidden.

Z-index: `base` (0) → `sidebar` (10) → `title-bar` (20) → `chart-pane` (30) → `menu-paper` (40) → `modal` (50) → `tooltip` (60). The system enforces these layers strictly.

---

## 7. Do's and Don'ts

### Do
- Anchor the sidebar, title bar, chat column, composer, and chart pane at identical coordinates on every page
- Fill the chat thread with structured, dense content (KPI tiles, inline charts, evidence stacks, recommendation pills)
- Use Pretendard weights (400 / 500 / 700) — not different families — to build hierarchy
- Apply the radius hierarchy by role: 4px rows, 6px buttons, 8px containers, 10px inputs, 900px the single pill
- Reserve the `{shadow.pill}` halo for the single store-selector pill — do not extend to other elements
- Keep body copy at Pretendard 400; use 500 for sub-heads and 700 for KPI numbers and chart titles only
- Cite every data source in 10pt Pretendard 400 `#787F89` directly below the chart or table
- Use the 2px spacing grid — every gap is a token, not a hard-coded pixel value
- Use takeaway chart titles ("Q1 sales fell 12%"), never descriptive titles ("Quarterly sales")
- Place chart labels at line endpoints (direct labels) rather than in legend boxes
- Mark forecast / projection values with dashed grey + CI band — never expose forecast points as solid lines
- Start every bar chart's Y-axis at zero
- Use one of the four internal status icons (complete / pending / warning / error) for every state signal — color is never the sole carrier
- Reference semantic tokens in component code; never reach into primitives like `colors.neutral.grey.500` directly

### Don't
- Don't introduce a second brand color. If a primary action needs more weight, scale type weight or size — never add another hue.
- Don't extend data colors (cyan / purple / yellow / green / red) into chrome. They live in charts and status pills only.
- Don't use any font other than Pretendard — no Inter, Roboto, Noto, system defaults
- Don't put emoji or decorative unicode (✓ ⚠ 🙂) anywhere in the UI. Use the four status icons.
- Don't ship gradients outside the two functional indicators (streaming text, recommendation skeleton). Both are loops, both are diagnostic.
- Don't apply any gradient to chart bars, lines, or data points — gradients on data create false visual hierarchy.
- Don't apply any gradient to text or use gradient-text effects — solid `#24282D` for ink, solid white on the rare dark surface.
- Don't animate buttons on press — no scale, no translate, no rotate. Background-color hover is the only acceptable button feedback.
- Don't extend glass-morphism beyond the chat title bar. Body cards, modals, and menus stay opaque white.
- Don't deviate from the locked region anchors (sidebar / title bar / chat column / composer / chart pane) — same x/y on every page. Override only on the three documented structural exceptions (empty state, auth, chart export).
- Don't let chat content invade the sidebar region (left of column) or push under the chart pane (right of column when open) — if it doesn't fit, split the message or open the chart pane.
- Don't ship the four chart anti-patterns: 3D charts, dual Y-axis, rainbow categorical, pie with more than 5 slices.
- Don't drop chart-internal text below 11pt. If forced below, the chart is too dense — split.
- Don't write marketing copy (exclamation marks, hyperbole, first-person "we"). The voice is fact-first and direct ("you" / direct address).
- Don't lock up two product wordmarks (store-agent / store-care / store-insight) into a single mark unless explicitly co-branded.
- Don't "correct" the SAAI marketing mark's "SSAAII" double-letter form — the doubling is intentional.
- Don't pull icons from Lucide / Heroicons / FontAwesome. Extend the internal 33-icon set when a new affordance is needed.
- Don't introduce new pill-shaped buttons. The store-selector pill is the only true pill — reserved as a state badge.

---

## 8. Responsive Behavior & Embed Notes

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 768px | Sidebar collapses to overlay; chat column 100% width minus 16px gutters; chart pane stacks below thread instead of sliding in; touch targets re-evaluated at 44px minimum |
| Tablet | 768–1024px | Sidebar collapsed by default (54px); chat column up to 600px; chart pane slides in but compresses chat to ~360px |
| Desktop | 1024–1440px | Sidebar open by default (248px); chat column max 800px; full slide-in chart pane |
| Wide | > 1440px | Same as desktop with more breathing room; chat column stays capped at 800px |

### Chart Embed Widths
- Email: 600px native — chart-internal text must remain at 11pt minimum
- App embed: 800px (matches the chat column)
- Mobile: 360px — drop categorical series #4+ before shrinking labels

### Export Notes
- Chart exports (PNG, SVG) include the takeaway title, source line, and embed-width-appropriate font sizing
- Pretendard is embedded in any exported asset that may render off-product (PDF, PowerPoint embed, email)
- Live text is preferred over rasterized text for any in-product chart — keeps a11y intact
- Color contrast is validated at WCAG AA (≥ 4.5:1) for body text and ≥ 3:1 for chart graphic elements (WCAG 1.4.11)

---

## 9. Agent Prompt Guide

### Quick Reference Strip
- Surface: web app, desktop-first (1440 × 900 reference)
- BG: `#FFFFFF` (canvas), `#F9F9FB` (sidebar), `#FAFAFA` (input)
- Headline: Pretendard 500–700, two-track (heading 1.5 / body 1.7)
- Body default: Pretendard 400, 13pt, 1.7 line-height, color `#24282D`
- Source / caption: Pretendard 400, 10–12pt, color `#787F89`
- Brand blue (the only brand color): `#376AE2`, hover `#3260CE`
- Data hues (charts only): cyan `#76CCCF` / purple `#B65BE1` / yellow `#FAD232` / green `#1AB715` / red `#E05959`
- Borders: `#E9E9EA` (subtle), `#D9DBDD` (default), `#799BEC` (focus)
- Radius: 6px buttons, 8px containers, 10px inputs, 900px the single store-pill
- Shadow: light only, max opacity 0.16, no inner / colored shadows
- Logo: SAAI, top-left of sidebar lockup region (≈24px tall in sidebar, ≈20px in title bar — never decorate, recolor, or frame)
- Font: Pretendard KR / JP only (400 / 500 / 700)
- Status: 4 icons (complete / pending / warning / error) — never emoji or unicode
- Gradients: forbidden except two functional indicators (streaming text, recommendation skeleton)
- Charts: takeaway title, direct labels, Y-axis from zero, 11pt minimum, four anti-patterns forbidden

### Example Component Prompts

Empty State (first session)
"Build the empty state for Plus Agent on a `#FFFFFF` canvas. Replace the chat thread region with a centered layout: SAAI clover symbol at top (insert SVG as-is, ≈48px tall, no background fill, no decoration). Below the symbol, a title in Pretendard 500, 24pt, line-height 1.4, color `#3D434D` ("Ask anything about your store") — this is the only line-height-1.4 surface in the system. Below the title, the composer (BG `#FAFAFA`, radius 10px, shadow `{shadow.input}`, max-width 800px, sticky-bottom). Below the composer, a 3-up recommendation pill row (each pill: BG `#FFFFFF`, 1px outline `#D9DBDD`, radius 8px, padding 12px 16px, body Pretendard 400 13pt color `#24282D`). Sidebar at x: 0–248 with brand lockup top, 'New chat' button, store selector, history list, footer actions. Title bar at y: 0–56 with store pill (BG `#FFFFFF`, radius 900px, shadow `{shadow.pill}`) and overflow menu. No chart pane in empty state."

Bot Reply with KPI Strip + Inline Chart Card
"Build a bot message bubble at the bottom of the chat thread. Bubble has transparent BG, no border, left-aligned in centered 800px chat column. Top of bubble: a 1-line takeaway sentence in Pretendard 400, 13pt, color `#24282D` ('Q1 sales fell 12% vs Q4 — driven by store #3.'). Below the takeaway: a row of 4 KPI tiles (each: BG `#FFFFFF`, 1px outline `#D9DBDD`, radius 8px, padding 16px, ~180px wide × 88px tall). Each tile carries: KPI number Pretendard 700 27pt color `#24282D` (or `#376AE2` for the emphasized one), label Pretendard 500 11pt color `#565F6C`. Below the KPI row: an inline chart card (BG `#FFFFFF`, 1px outline `#D9DBDD`, radius 8px, shadow `{shadow.card}`, padding 24px x × 20px y) with takeaway title 'Q1 sales fell 12% vs Q4' (Pretendard 700 14pt color `#24282D`), 16:9 thumbnail of a horizontal bar chart, source line below in Pretendard 400 10pt color `#787F89`, and a 'Show chart' text-link CTA in `#376AE2`. Below the chart card: 3 recommendation pills stacked horizontally with next-question prompts."

Chart Pane (full chart, slide-in)
"Open the chart pane from the right edge with a 480ms `cubic-bezier(0.22, 1, 0.36, 1)` slide-in. The chat column compresses to `clamp(392px, 50%, 800px)` simultaneously. Pane BG `#FFFFFF`, full viewport height. Top of pane: chart toolbar (export, fullscreen, close icon-buttons, each 32px square, stroke icon 20px, default tint `#565F6C`). Below toolbar: takeaway chart title in Pretendard 700, 14pt, color `#24282D`. The chart itself: horizontal bar chart, primary emphasized series flat `#376AE2`, context series flat `#B1B5BB`, gridlines `#E9E9EA` 1px, axis labels Pretendard 400 11pt color `#787F89`, data labels at bar endpoints Pretendard 500 11pt color `#24282D`. Y-axis starts at zero. Below the chart: source line Pretendard 400 10pt color `#787F89`. Sidebar and title bar remain locked at their anchors during the slide-in."

Section Divider in Sidebar History
"Inside the sidebar (BG `#F9F9FB`), insert a section divider between two history groups. Divider: full-width (within sidebar 248px), 1px line in `#E9E9EA`, with a 12pt Pretendard 500 label centered ('YESTERDAY' / 'LAST WEEK', color `#565F6C`, all-caps, letter-spacing 0.5px). Padding 8px above and below the line. The divider is the only place in the sidebar that uses all-caps."

### Iteration Checklist (run before shipping any view)
1. Reference viewport 1440 × 900 desktop? ✓
2. Pretendard everywhere — no Inter, Roboto, Noto, system fallback? ✓
3. SAAI logo and clover at original SVG, no decorations / boxes / recolors / crops? ✓
4. SAAI marketing mark "SSAAII" double-letter form preserved (not "corrected")? ✓
5. All five locked regions (sidebar / title bar / chat column / composer / chart pane) match anchors from the previous view? ✓
6. Chat thread stays strictly inside the centered 800px column — no invasion of sidebar or chart-pane regions? ✓
7. If the reply carries data / comparison / process / structure — is it visualized as a chart, KPI tile, or table (not narrated as prose)? ✓
8. Chat thread filled with structured content — no half-empty middle? ✓
9. Every chart has a takeaway title (not descriptive), direct labels (not legend), Y-axis from zero, source line in 10pt? ✓
10. No chart-internal text below 11pt? ✓
11. None of the four chart anti-patterns (3D, dual Y, rainbow categorical, pie >5)? ✓
12. Body weight 400, sub-heads 500, headlines / KPI numbers 700 — hierarchy holds? ✓
13. Single brand blue carrying every primary action — no second brand color? ✓
14. Data hues (cyan / purple / yellow / green / red) only in charts and status pills — never on chrome? ✓
15. No gradients except the two functional indicators? ✓
16. No emojis or decorative unicode anywhere — only the four status icons for state signals? ✓
17. No press animation on buttons — only background-color hover? ✓
18. No glass-morphism outside the chat title bar? ✓
19. All chart text live (not rasterized)? ✓
20. Color contrast ≥ 4.5:1 for body text, ≥ 3:1 for chart graphic elements? ✓

---

End of system. Apply consistently across every Plus Agent surface and every sibling SAAI product (store-insight, store-care).
