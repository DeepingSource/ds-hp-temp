## Overview

SAAI's chat surface is a near-pure white canvas (`{colors.bg.app}` — #FFFFFF) holding **Pretendard KR** body in fact-first sentence case. The system has no decorative voltage of its own; brand energy comes from **inline analytics** — sparkline KPIs, takeaway-titled charts that slide in from the right, recommendation pills that finish the thought — placed inside the chat thread as the assistant's reply unfolds. UI chrome around the data stays minimal: 1px hairline borders (`{colors.border.default}`), sentence-case button labels with no fill until pressed, and a single brand blue carrying every primary action.

The **SAAI brand blue** — `{colors.brand-blue}` (#376AE2) — is the system's only voltage. It appears on the Send button, the focus ring, the selected history row, the link icon, and the single emphasized chart series. It is never paired with a second brand color and never used as a decorative background — the lone blue carries the entire affordance grammar.

Type voice runs **Pretendard KR** in three weights: regular (400) for body and chart text, medium (500) for sub-heads and labels, bold (700) for headlines and KPI numbers. The system splits hierarchy into two tracks — heading runs at line-height 1.5, body at line-height 1.7. Same pixel size, different rhythm — the body track breathes longer between lines, which is what keeps long Korean replies from feeling dense.

**Key Characteristics:**
- Near-pure white canvas (`{colors.bg.app}` — #FFFFFF) with grey-scale chrome and a single brand blue. The system inverts almost nothing — there is no dark mode in v0.1.
- Body copy stays sentence-case Pretendard 400 at line-height 1.7. Marketing tone (exclamation marks, hyperbole, first-person "we") is forbidden.
- Brand blue (`{colors.brand-blue}`) carries every primary action — send, focus ring, selected row, emphasized chart series. Never extended to a second hue.
- Data hues (cyan / purple / yellow / green / red) are quarantined to charts and status pills. They never appear in chrome — buttons, navigation, card backgrounds.
- Cards and surfaces use `{rounded.md}` (8px) by default. The few exceptions: `{rounded.lg}` (10px) on the composer and menu paper; `{rounded.pill}` (900px) on the single store-selector pill — the only true pill in the system.
- Spacing is tight and 2px-aligned: `{spacing.md}` (16px) inside components, `{spacing.lg}` (24px) between groups, `{spacing.xl}` (32px) at section breaks.
- Density runs analyst-tool tight: 38px sidebar history rows, 32–38px button heights, 32px minimum touch targets. The product is desktop-first.

## Colors

### Brand & Accent
- **Brand Blue** (`{colors.brand-blue}` — #376AE2): The system's primary accent. Used on every primary action (Send, "New chat", "Refresh suggestions"), focus rings, link glyphs, selected-row text color, and the single emphasized chart series. **The only brand color in the system.**
- **Brand Blue Hover** (`{colors.brand-blue-hover}` — #3260CE): The hover state for primary buttons. The 500 → 600 transition is the system's only color-based hover signal.
- **Brand Blue Selected Bg** (`{colors.brand-blue-selected}` — #EBF0FC): The selected-row background — used on history rows in the sidebar that match the active conversation, and on hovered recommendation pills.
- **Brand Blue Tint** (`{colors.brand-blue-tint}` — #F7F9FD): The lightest blue tint, used on hover surfaces over white cards.
- **Focus Blue** (`{colors.focus-blue}` — #799BEC): The focus-ring color, paired with the 2px focus ring shadow.

### Surface
- **Canvas** (`{colors.bg.app}` — #FFFFFF): The default page floor across every surface — chat column, modal, card, message bubble. True white.
- **Sidebar Soft** (`{colors.bg.sidebar}` — #F9F9FB): Sidebar background and user message bubble. A tint barely off-white that signals "container that holds list items."
- **Input Field** (`{colors.bg.input}` — #FAFAFA): Composer and search input background. One step warmer than canvas to read as "place to type."
- **Hover Soft** (`rgba(142,148,157,0.10)`): Generic hover tint for transparent buttons and ghost actions.
- **Hover Grey** (`rgba(120,127,137,0.10)`): A slightly stronger hover tint for outlined buttons and menu items.

### Hairlines & Borders
- **Border Subtle** (`{colors.border-subtle}` — #E9E9EA): The thinnest divider tone — used between sidebar sections and inside the menu paper.
- **Border Default** (`{colors.border.default}` — #D9DBDD): The default 1px outline on cards, inline chart cards, recommendation pills, and inputs.
- **Border Focus** (`{colors.focus-blue}` — #799BEC): The 2px focus ring color — same hue family as the brand, one step lighter.

### Text
- **Foreground Primary** (`{colors.fg.primary}` — #24282D): All body copy, headline, and KPI numbers. ~13:1 contrast on white canvas.
- **Foreground Secondary** (`{colors.fg.secondary}` — #3D434D): Chat title bar, secondary nav labels, the empty-state title.
- **Foreground Tertiary** (`{colors.fg.tertiary}` — #565F6C): Subtle metadata, sidebar section headers, axis labels.
- **Foreground Muted** (`{colors.fg.muted}` — #787F89): Caption, footnote, the idle send-icon, chart axis text.
- **Foreground Placeholder** (`{colors.fg.placeholder}` — #B1B5BB): Composer placeholder and disabled hint text. Never used for actual input values.
- **Foreground On Brand** (#FFFFFF): White text used on top of `{colors.brand-blue}` button surfaces.

### Data Palette (Charts Only)
These five hues live exclusively inside charts and status pills. They never appear on buttons, navigation, or background fills.

- **Cyan** (`{colors.data.cyan}` — #76CCCF): Categorical chart series #2 — the second protagonist when one chart carries two emphasized stories.
- **Purple** (`{colors.data.purple}` — #B65BE1): Categorical series #3.
- **Yellow** (`{colors.data.yellow}` — #FAD232): `status.warning` and categorical series #4.
- **Green** (`{colors.data.green}` — #1AB715): `status.success` (delta increase, on-target) and categorical series #5.
- **Red** (`{colors.data.red}` — #E05959): `status.error` (delta decrease, miss) and categorical series #6 — only used when positive and negative series coexist on the same chart.

### Semantic
- **Success** (`{colors.success}` — #1AB715): Used with the `icon-completed-status` glyph.
- **Warning** (`{colors.warning}` — #FAD232): Used with `icon-warning`.
- **Error** (`{colors.error}` — #E05959): Used with `icon-sad`.
- **Info** (`{colors.brand-blue}` — #376AE2): Used with the link / reference glyph.

Color alone is never used to convey state (WCAG 1.4.1) — every status hue is paired with one of four internal status icons.

## Typography

### Font Family
**Pretendard KR** is the system's only display + body typeface. Pretendard's Latin glyphs handle every English token; no separate Latin family is loaded. The fallback stack walks `'Pretendard', system-ui, -apple-system, 'Helvetica Neue', sans-serif`. Japanese surfaces swap to **Pretendard JP**.

The system uses three weights only:

- **400 Regular** for body, captions, sources, footnotes — the default voice
- **500 Medium** for sub-heads, labels, button text, sidebar history rows — the structured voice
- **700 Bold** for headlines, KPI numbers, and rare body emphasis — the conclusion voice

Light (300) and ExtraBold (800) are deliberately excluded. The tone gets either too airy or too marketing-bombastic the moment those weights enter.

### Hierarchy

| Token | Size | Weight | Line Height | Use |
|---|---|---|---|---|
| `{typography.heading-3xl}` | 38px | 700 | 1.5 | Hero / alternative empty-state title |
| `{typography.heading-2xl}` | 34px | 700 | 1.5 | Section headlines, dashboard titles |
| `{typography.heading-xl}` | 27px | 500 | 1.5 | Sub-section headlines |
| `{typography.heading-l}` | 24px | 500 | 1.5 | Card titles, empty-state title (special: 1.4 line-height) |
| `{typography.heading-m}` | 21px | 500 | 1.5 | Chat-title-bar title |
| `{typography.heading-s}` | 17px | 500 | 1.5 | Inline chart titles, recommendation headers |
| `{typography.heading-xs}` | 15px | 500 | 1.5 | List-section headers |
| `{typography.heading-2xs}` | 13px | 500 | 1.5 | Label and caption emphasis |
| `{typography.body-xl}` | 17px | 400 | 1.7 | Lead body, expanded message |
| `{typography.body-l}` | 15px | 400 | 1.7 | Long-form chat reply |
| `{typography.body-m}` | 13px | 400 | 1.7 | **Default body** — chat messages, menu items, UI labels |
| `{typography.body-s}` | 12px | 400 | 1.7 | Composer footnote, fine print |
| `{typography.chart-title}` | 14px | 700 | 1.5 | Chart takeaway titles |
| `{typography.chart-axis}` | 11px | 400 | 1.5 | Axis labels — system minimum, never below |

### Principles
The system pairs **heading-track** (line-height 1.5) against **body-track** (line-height 1.7). Same pixel size, different rhythm — a 17px headline and a 17px body paragraph read at distinctly different paces because the body track breathes longer between lines. This split is what keeps long Korean replies from feeling dense.

Default body is `{typography.body-m}` (13px / 1.7). UI labels, menu items, and chat messages all share this size — the "Bloomberg Terminal × Notion" density is achieved by Pretendard at 13px, not by miniaturizing chrome.

Headlines above 32pt apply -0.02em to -0.03em tracking to compensate for Pretendard's optical loosening at large sizes. Body text stays at 0 tracking.

### Empty State Exception
The empty-state title ("Ask anything about your store") runs **24px / 1.4**, the only surface in the system that breaks the 1.5 heading line-height rule. The color also drops one step from `{colors.fg.primary}` to `{colors.fg.secondary}` — the tone is invitation, not announcement.

### Korean–Latin Mixing
Pretendard KR carries both Korean and Latin glyphs natively — there is no font swap inside a sentence. English copy runs ~30–40% longer than Korean for the same content, so multi-locale surfaces (message bubbles, recommendation pills) reserve that width upfront.

### Markdown Inline Rules
- **Bold** is reserved for conclusion sentences and headline numbers. Two bold spans in the same paragraph erase the emphasis.
- *Italic* is almost never used — Korean italic reads as broken type. Use bold for emphasis instead.
- `code` is reserved for actual code, identifiers, API keys, variable names, and token paths. Never used to "highlight" common nouns.

### Note on Font Substitutes
Pretendard is open-source under SIL OFL — it ships with the product and is not substituted. There is no fallback to Inter, Roboto, or system fonts under any production circumstance; the fallback stack exists only to bridge the moment between font loading and first paint.

## Layout

### Spacing System
- **Base unit:** 2px.
- **Tokens:** `{spacing.xxs}` 2px · `{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.smd}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 40px · `{spacing.section}` 60px.
- **Component-internal padding:** `{spacing.md}` (16px) is the default breathing space inside cards, message bubbles, and recommendation pills.
- **Group separation:** `{spacing.lg}` (24px) between adjacent components.
- **Section break:** `{spacing.xl}` (32px) at the boundary between major regions (sidebar sections, chat → composer).
- **Card content padding:** 24px horizontal × 20px vertical for inline chart cards; 16–24px x × 12px y for message bubbles (16 for short, 24 for long).

### Two-Column Shell
The app uses a fixed two-column layout:

- **Sidebar (left):** 248px when open, 54px when collapsed. 300ms transition between states. Background `{colors.bg.sidebar}`.
- **Content column (right):** Takes the remaining width, then centers a chat column at **max-width 800px**. On wide monitors the chat never exceeds ~60 characters per line.
- **Chart pane (slide-in right):** When a chart opens to full size, the chat column compresses to `clamp(392px, 50%, 800px)` and the chart pane slides in from the right at 480ms with `{motion.ease.out-quint}`.

### Density Philosophy
The system runs analyst-tool tight, not phone-app loose. Sidebar history rows are **38px** — between Notion's 36px and Slack's 28px. Touch targets bottom out at 32px — desktop-first, not mobile-first. Buttons range 32–38px tall. The intended mental model: a power user can scan ~30 history rows on one screen.

### Title Bar Blur
The chat title bar is the **only** glass-morphism surface in the system — `backdrop-filter: blur(10px)` over white. As the chat scrolls behind it, the content slightly tints through. Body cards, modals, and menus all use opaque white. Never extend blur to other surfaces.

### Whitespace Philosophy
SAAI uses whitespace as a tool, not as a default. Empty space inside the chat column is rare — the bot's reply, the inline chart, and the next recommendation pill stack tightly. Whitespace appears at section breaks (sidebar group → group, message → composer) where it functions as a thinking pause. The system never adds atmospheric padding to "balance" a sparse layout — if a region looks empty, the surface is missing content, not space.

### Embed Widths
Charts must remain legible across three embed widths: **email 600px**, **app embed 800px**, **mobile 360px**. Chart-internal text never drops below 11pt regardless of viewport — if the data would force smaller text, the chart is too dense and must split.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Body sections, bot message bubbles, section dividers |
| Hairline | 1px `{colors.border.default}` | Sidebar history hover, recommendation pills, inline chart cards |
| `{shadow.input}` | `0px 2px 10px 0px rgba(135,135,135,0.12)` | Composer input — soft, broad, inviting |
| `{shadow.pill}` | `0px 0px 20px 0px rgba(135,135,135,0.12)` | Store-selector pill — radial halo |
| `{shadow.card}` | `0 2px 6px 0 rgba(0,0,0,0.08)` | Inline chart card inside chat thread |
| `{shadow.menu}` | `0px 1px 2px 0px rgba(0,0,0,0.05)` | Dropdown paper — almost flat |
| `{shadow.tooltip}` | `0 2px 4px rgba(0,0,0,0.25)` | Tooltip — short, dark |
| `{shadow.focus}` | `0 0 0 2px rgba(122,197,255,0.30)` | Keyboard focus ring |

The system uses **no inner shadows, no colored shadows, no layered chrome**. Depth comes entirely from the six-step shadow ladder above and the contrast between white canvas and slightly-elevated cards. Drop shadow above 0.16 opacity is forbidden — light-and-airy is the brand register.

### Z-Index Order
`base` (0) → `sidebar` (10) → `title-bar` (20) → `chart-pane` (30) → `menu-paper` (40) → `modal` (50) → `tooltip` (60). The system enforces these layers strictly: a modal cannot open while another is showing, a menu cannot open over a modal.

### Focus State
Keyboard focus shows the 2px sky-blue 30% ring (`{shadow.focus}`). Mouse focus is suppressed (`outline: none`). Only one element can hold focus at a time — components are responsible for blurring siblings before claiming the ring.

### Decorative Depth
- **Streaming text gradient**: While the bot streams tokens, the rendered text carries a horizontal grey gradient that animates left-to-right at 1500ms loop, applied via `background-clip: text`. This is one of two places the system permits a gradient (the other: recommendation skeleton shimmer). The gradient is a **functional indicator** — depth via motion, not via shadow.
- **Recommendation skeleton**: Before recommendation pills load, a horizontal grey gradient shimmer fills the pill outline (1500ms loop). The other permitted gradient surface.
- **Sky-blue focus halo**: The focus ring is the closest thing to color-based depth; it carries no shadow color, only a 2px ring at 30% alpha.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Bot message bubble (no surface), section dividers |
| `{rounded.xs}` | 4px | Menu items, divider chips |
| `{rounded.sm}` | 6px | **Default button radius** (BaseButton), tooltip |
| `{rounded.md}` | 8px | Message bubbles, list rows, inline chart cards |
| `{rounded.lg}` | 10px | Composer input, menu paper, store-selector pill outline |
| `{rounded.pill}` | 900px | The single store-selector pill — the only true rounded surface in the system |

The radius hierarchy maps to **role**, not size: `xs` (4) marks rows, `sm` (6) marks actions, `md` (8) marks containers, `lg` (10) marks inputs. Breaking the mapping makes a row look like a button at a glance.

### The Single Pill
Only the chat title bar's store-selector is fully rounded. That position is a **state label** — "the store you are currently viewing" — not an action, and the radius is the signal. Do not introduce a new pill-shaped button anywhere in the system; the radius is reserved.

### Border Width
The standard border is **1px**. The 2px width appears only inside the focus ring. Bumping card borders to 2px erases the analyst-tool restraint.

### Corner Style
All corners are uniformly rounded — no asymmetric, clipped, or chamfered corners. The system has no inverted-radius treatments and no decorative notches.

## Components

### Sidebar

**`Sidebar`** — Left rail, 248px open / 54px collapsed, 300ms fold transition. Background `{colors.bg.sidebar}`. Sections (top to bottom): brand lockup, "New chat" button, store selector, conversation history, footer actions.

**`history-row`** — 38px tall, `{rounded.xs}` corners, hover tint hover-grey. The active row inverts to `{colors.brand-blue-selected}` background with `{colors.brand-blue}` text. Truncates at the right edge with no ellipsis tooltip — the conversation title becomes the canonical label.

### Chat Title Bar

**`chat-title-bar`** — Sticky top bar containing the store pill, conversation title, and overflow menu. Background `{colors.bg.app}` with `backdrop-filter: blur(10px)` — the only glass-morphism surface in the system.

**`store-pill`** — Fully rounded (`{rounded.pill}`), white background, `{shadow.pill}` halo. Carries the store name and a chevron — read as a state badge, not a button.

### Buttons

**`button-primary`** — The signature primary action (Send, New chat, Refresh suggestions). Background `{colors.brand-blue}`, text white, `{rounded.sm}` corners (6px), height 38px. Hover swaps to `{colors.brand-blue-hover}`. Disabled drops to 0.3 opacity. **No press animation, no scale, no transform.**

**`button-secondary`** — Transparent background, `{colors.fg.primary}` text, 1px `{colors.border.default}` outline. Hover tint hover-grey. Same dimensions as primary.

**`button-ghost`** — Transparent background, `{colors.fg.secondary}` text, no border. Hover tint hover-soft. Used for inline secondary actions (overflow menu items, "View more").

**`icon-button`** — 32px square, stroke-style icon at 20px optical size, `{colors.fg.tertiary}` default tint. Active state colors the icon `{colors.brand-blue}`. Used for `more`, `close`, `settings`, `share`, `refresh`.

**`text-link`** — Inline action labels rendered in `{colors.brand-blue}` at the surrounding body weight. No underline, no chevron — the color shift is the affordance.

### Cards & Containers

**`message-bubble-user`** — User message, background `{colors.bg.sidebar}` (grey 25 — barely off-white), `{rounded.md}` corners, padding 24px × 12px. Right-aligned in the chat column. Carries no avatar; the right-alignment is the speaker signal.

**`message-bubble-bot`** — Bot reply, **transparent background, no radius, no border**. The bot's voice IS the chat column — no card frame. Max-width 800px. Markdown-rendered with `body-m` body and `heading-s` sub-heads.

**`inline-chart-card`** — A "Show chart" card embedded inside the bot reply when a chart attachment is ready. Background `{colors.bg.app}`, 1px `{colors.border.default}` outline, `{rounded.md}` corners, `{shadow.card}` shadow. Carries a thumbnail preview and a "Show chart" CTA that opens the chart pane to full size.

**`recommendation-pill`** — Recommendation entries under the empty state and after each bot reply. White background, 1px `{colors.border.default}` outline, `{rounded.md}` corners. Hover thickens the border to `{colors.focus-blue}` and tints the background `{colors.brand-blue-tint}`.

### Inputs & Forms

**`composer`** — The sticky-bottom input. Background `{colors.bg.input}` (#FAFAFA), `{rounded.lg}` corners (10px), `{shadow.input}` (the soft 10px blur shadow). Max-width matches the chat column (800px). Internal: text input + right-aligned send `icon-button` + footnote (12px placeholder color, e.g. "SAAI may make mistakes. Verify critical answers.").

**`composer-send-icon`** — Idle tint `{colors.fg.muted}`, active tint `{colors.brand-blue}`. The flip is triggered the moment input length exceeds zero — no animation, just an instant color switch.

**`text-input`** — Standard text input on white surfaces. Background `{colors.bg.input}`, 1px `{colors.border.default}` outline, `{rounded.lg}` corners, height 32–38px. Focus thickens the outline to 2px `{colors.focus-blue}` and adds the focus ring shadow.

### Signature Components

**`empty-state`** — Centered layout with the SAAI clover symbol, a 24px / 1.4 / weight 500 title in `{colors.fg.secondary}` ("Ask anything about your store"), and the composer below. The title intentionally breaks the system-wide 1.5 line-height rule — it's the only surface in the system at 1.4. Color is one step lighter than primary because the tone is invitation.

**`streaming-indicator`** — While the bot streams tokens, the rendered text carries a horizontal grey gradient that animates left-to-right at 1500ms loop, applied via `background-clip: text`. **Typewriter caret and spinners are forbidden.**

**`recommendation-skeleton`** — Before recommendation pills load, a horizontal grey gradient shimmer fills the pill outline (1500ms loop). The other permitted gradient surface in the system.

### Tooltip

**`tooltip`** — The single dark surface in the system. Background `rgba(0,0,0,0.9)`, white text, `{rounded.sm}` corners, `{shadow.tooltip}`. Used sparingly — most affordances explain themselves through copy.

### Modal

**`modal`** — MUI Dialog base, `{rounded.md}` corners, `{shadow.card}`. Overlay `rgba(0,0,0,0.4)`. Modals never trigger while another modal is open, and menus cannot open over a modal.

### Charts (Reference: `CHART_DESIGN_GUIDE.md`)

Charts are a system-within-a-system. Supported types: line, vertical bar, horizontal bar, waterfall, CI band, heatmap, sankey, treemap, funnel.

- **Title style**: takeaway, never descriptive. "Q1 sales fell 12%" YES. "Quarterly sales" NO.
- **Legends**: prefer direct end-of-line labels (Gestalt proximity) over a separate legend box.
- **Stroke widths**: 2px emphasized, 1.5px base, 1px context.
- **Forecast pattern**: dashed stroke (`4 4` dasharray) in `{colors.chart.forecast}` (grey 300), always paired with a confidence-interval band fill.
- **Bar Y-axis**: must start at zero, no exceptions.
- **Sort default**: by value descending (or by time order if temporal).
- **Horizontal threshold**: switch to horizontal bars when category labels exceed 8 characters.

## Do's and Don'ts

### Do
- Run every primary action on `{colors.brand-blue}`. The single-blue rule is the system's spine.
- Render charts in greys with one emphasized series in brand blue — let the takeaway title carry the conclusion (Knaflic §7).
- Use takeaway chart titles ("Q1 sales fell 12%"), never descriptive titles ("Quarterly sales").
- Place chart labels at line endpoints (direct labels) rather than in a legend box.
- Mark forecast/projection values with dashed stroke + grey + confidence-interval band. Never expose forecast points as solid lines.
- Start every bar chart's Y-axis at zero.
- Reference semantic tokens (`{colors.fg.primary}`, `{colors.brand-blue}`) in component code. Never directly reach into `colors.neutral.grey.500` or other primitives.
- Use one of the four internal status icons (complete / pending / warning / error) for every state signal. Color is never the sole carrier.
- Place every spacing value on the 2px grid. Hard-coded pixel values are a code-smell.
- Format Korean-locale numbers with 만/억 first (1.2억). Use the formatter context, never inline strings.

### Don't
- Don't introduce a second brand color. If a primary action needs more weight, scale the type or thicken the weight — don't add another hue.
- Don't extend data colors (cyan / purple / yellow / green / red) into chrome. They live in charts and status pills only.
- Don't put emoji or decorative unicode (✓ ⚠ 🙂) anywhere in the UI. Use the four status icons.
- Don't ship a gradient outside the two functional exceptions: the streaming text indicator and the recommendation shimmer skeleton. Both are loops, both are diagnostic.
- Don't animate buttons on press — no scale, no translate, no rotate. Background-color hover is the only acceptable button feedback.
- Don't extend glass-morphism beyond the chat title bar. Body cards, modals, and menus stay opaque white.
- Don't ship the four chart anti-patterns: 3D charts, dual Y-axis, rainbow categorical, pie with more than 5 slices. No exceptions, no workarounds.
- Don't drop chart-internal text below 11pt. If the data forces it, the chart is too dense — split.
- Don't write marketing copy (exclamation marks, hyperbole, first-person "we"). The voice is fact-first and direct ("you" or direct address).
- Don't lock up two product wordmarks (store-agent / store-care / store-insight) in one mark unless the surface is explicitly co-branded.
- Don't "correct" the SAAI marketing mark's "SSAAII" double-letter form. The doubling is intentional.
- Don't pull icons from Lucide / Heroicons / FontAwesome. Extend the internal 33-icon set when a new affordance is needed.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 768px | Sidebar collapses to overlay; chat column 100% width; chart pane stacks below thread instead of sliding in |
| Tablet | 768–1024px | Sidebar collapsed by default (54px); chat column up to 600px; chart pane slides in but compresses chat to ~360px |
| Desktop | 1024–1440px | Sidebar open by default (248px); chat column max 800px; full slide-in chart pane |
| Wide | > 1440px | Same as desktop with more breathing room; chat column stays capped at 800px |

### Touch Targets
- `button-primary` minimum height is 32px; standard 38px. Below the WCAG mobile 44px minimum — the system is desktop-first.
- `icon-button` is exactly 32px square.
- `text-input` height is 32–38px.
- Sidebar history rows are 38px — comfortable for mouse, tight for touch.

### Collapsing Strategy
- Sidebar collapses to a 54px icon rail at desktop, then to a hidden overlay at < 768px (open via hamburger).
- The chart pane slide-in animation reverses on mobile — charts append below the relevant message rather than docking right.
- Tooltip placement adjusts to viewport edges — never bleeds off-screen.
- Chart-card thumbnails maintain native aspect ratio; the system never letterboxes.

### Chart Embed Widths
- **Email**: 600px native — charts must remain legible at this width with 11pt minimum font.
- **App embed**: 800px (matches the chat column).
- **Mobile**: 360px — charts collapse simpler series (drop `categorical.4`+ before shrinking labels).

## Iteration Guide

1. Focus on ONE component at a time. Reference its YAML key (`{components.composer}`, `{components.message-bubble-bot}`).
2. New components default to `{rounded.md}` (8px). Only use `{rounded.pill}` if the surface is genuinely a state badge, never an action.
3. Variants (hover, active, disabled) live as states inside the component definition, not as separate components.
4. Use semantic tokens (`{colors.fg.*}`, `{colors.brand-blue}`) everywhere. Direct primitive references belong only inside the semantic alias layer.
5. Default and active/pressed only — hover behavior is documented but the visual delta is small (background tint only).
6. Body stays Pretendard 400 / line-height 1.7. Lifting weight to 500 for body breaks the analyst-tool tone.
7. The single brand blue is non-negotiable. New emphasis comes from weight × size × spacing, never from a new hue.
8. When in doubt about emphasis: tighter spacing before bolder type, bolder type before brighter color.

## Known Gaps

- **Dark mode** is not defined in v0.1. The semantic alias layer is built so a future dark mode can swap primitives without touching component code, but the dark palette itself is unspecified.
- **Mobile-first density** is not yet documented. The system runs desktop-first (32px touch targets); a mobile-spec extension would need to redefine the touch-target minimum upward to 44px.
- **Internationalization beyond ko / en / ja** is not in scope. RTL layouts (Arabic, Hebrew) would require sidebar mirroring rules not currently defined.
- **Animation choreography** for multi-step flows (empty state → first message → chart slide-in) is described in component pieces but not as a sequenced narrative.
- **Color contrast for status pills on tinted backgrounds** is not yet validated — the data palette assumes a white floor; status pills on the sidebar grey-25 surface should be re-checked.
- **Print and PDF export** styles for charts are documented in `CHART_DESIGN_GUIDE.md` but not yet folded into this design system as primary tokens.
- **The configurator surface** (Plus Agent settings, store-management dialog) was not in the analyzed screens; its toggle grid, comparison panels, and commit dialog are not documented here.
- **Voice-input affordance** for the composer is reserved as a future variant; the microphone icon is in the internal set but its hover, recording, and error states are not yet specified.
