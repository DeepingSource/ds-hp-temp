> 📌 **읽기 전 — 이 문서의 자리 (2026-06-19 정리)**
> 본 문서는 **SAAI 브랜드 시스템 reference export**(대상: 브랜드/디자인 시스템)이며, **이 사이트(deepingsource.io)의 디자인 SOT 가 아니다.** 라이브 사이트 디자인 SOT 는 repo-root **[`/DESIGN.md`](../DESIGN.md)** + `src/` 다.
> 또한 아래에서 단일 source 로 인용하는 **`constitution/SAAI_MASTER.md` 는 본 repo 에 존재하지 않는다** — SAAI 컨스티튜션은 상위 **SAAI repo** 에 있고, 여기 `design-system/` 폴더는 그 **read-only export 스냅샷**이다(아래 16개 형제 문서도 같은 전제).

# SAAI Design System

> ⚠️ **원칙·룰의 단일 source는 [`constitution/SAAI_MASTER.md`](./constitution/SAAI_MASTER.md) 로 통합되었습니다** (v1.0, 2026-05-04).
> 본 문서는 *Plus Agent 코드에서 추출한 토큰의 머신 친화 export*로 유지된다. raw 토큰값의 source는 본 문서, 원칙·해석은 마스터를 따를 것.

> **Version**: 0.1 (draft) · **Format**: DESIGN.md (alpha) · **Last updated**: 2026-04-28
> **Maintainer**: DeepingSource — SAAI / Plus Agent product team
> **Source of truth (code)**: `apps/plus-agent-front/tailwind.config.ts`

---

## Overview

```yaml
brand:
  name: SAAI
  full_name: "Store Agent / Analytics / Insight"
  parent_org: DeepingSource
  family:
    - id: store-agent
      role: "대화형 분석 에이전트(플래그십). 코드네임 Plus Agent."
    - id: store-insight
      role: "대시보드와 정기 리포트 표면."
    - id: store-care
      role: "고객 지원/모니터링 형제 제품."
  symbol: "네 잎의 클로버 — 원호로 짠 4-lobe 단일 마크."
  wordmark: "SAAI 마케팅 마크는 'SSAAII' 더블 글자형. 의도된 표기이므로 '교정' 금지."
  primary_locale: ko-KR
  supported_locales: [en-US, ko-KR, ja-JP]
  primary_surface: "Plus Agent (store agent) — chat-first 분석 에이전트."

design_principles:
  - id: quiet_utility
    name: "Quiet utility, not hype"
    summary: "마케팅 톤 금지. 정보 우선, 짧고 사실적인 카피."
  - id: one_blue_does_all
    name: "One blue does all the work"
    summary: "프라이머리 액션은 {colors.brand.blue.500} 한 톤. 두 번째 브랜드 색을 도입하지 않는다."
  - id: data_colors_are_data_only
    name: "Data colors stay in data"
    summary: "cyan/purple/yellow/green/red은 차트와 상태 칩에서만. 버튼·내비에 칠하지 않는다."
  - id: tools_not_personas
    name: "Tooling tone, not assistant persona"
    summary: "선언적 명령형으로 기능을 설명한다. 챗봇 페르소나 금지."
  - id: chart_confirms_not_concludes
    name: "Charts confirm, they don't conclude"
    summary: "AI 요약이 결론을 만들고, 차트는 그 결론을 시각으로 검증한다."
  - id: korean_first_typography
    name: "Korean-first typography"
    summary: "Pretendard KR이 본문 리듬을 정한다. 영문도 Pretendard 라틴에 맡긴다."
```

### 무엇을 설계했는가

SAAI는 **소매·점포 운영자용 AI 분석 제품군**의 시각 시스템이다. 플래그십은 **Plus Agent(store agent)** — 채팅 입력으로 점포 데이터에 질문하면 차트·리포트·후속 질문이 인라인으로 렌더링되는 대화형 분석 에이전트다. 이 시스템은 그 제품과 형제 제품(store insight, store care)이 **같은 시각 DNA를 공유**하면서 워드마크만 달리할 수 있도록 만든 토큰 + 컴포넌트 모음이다.

### 어떤 결을 지향하는가

> *"블룸버그 터미널과 노션 사이 어딘가의 분석 도구."*

여백이 화면을 지배하고, 잉크는 절제되며, 단 하나의 브랜드 블루가 모든 프라이머리 액션을 짊어진다. 채팅 인터페이스이지만 **대화형 어시스턴트가 아니라 도구처럼 행동**한다 — 짧은 카피, 감정 표현 없는 상태 아이콘, 장식 없는 차트.

### 이 문서를 어떻게 읽는가

각 섹션은 **YAML 토큰 블록(기계용 SoT)** + **마크다운 본문(사람용 이유 설명)** 으로 구성된다. 토큰 키는 영어 dot-notation (`{colors.brand.blue.500}` 같은 참조 문법)이며, 본문은 한국어로 쓴다. 섹션 순서는 DESIGN.md alpha 스펙의 권장 순서를 따른다 — Overview → Colors → Typography → Layout → Elevation → Shapes → Components → Do's and Don'ts.

> **Status: alpha.** 이 시스템이 다루지 않는 새로운 표면(예: 새 제품군, 다크 모드)이 등장하면 토큰을 추가하기 전에 [Do's and Don'ts](#dos-and-donts)의 확장 정책 항목을 먼저 확인할 것.

---

## Colors

```yaml
colors:
  # ── Neutrals ────────────────────────────────────────────────
  neutral:
    white:   "#FFFFFF"
    black:   "#000000"
    grey:
      "25":  "#F9F9FB"   # 사이드바, 유저 버블, 앱 셸 hover
      "50":  "#E9E9EA"   # 보더(가장 약함), 입력 outline
      "100": "#D9DBDD"   # 카드/사이드바 버튼 기본 보더
      "200": "#B1B5BB"   # placeholder, 차트 컨텍스트
      "300": "#8E949D"   # disabled-secondary 텍스트, axis
      "400": "#787F89"   # 보조 fg, hover bg 산출
      "500": "#565F6C"   # baseline 시리즈, 텍스트 다크
      "600": "#4E5662"
      "700": "#3D434D"   # 기본 fg.secondary
      "800": "#2F343B"
      "900": "#24282D"   # 기본 fg.primary

  # ── Brand: 단일 프라이머리 ────────────────────────────────
  brand:
    blue:
      "25":  "#F7F9FD"
      "50":  "#EBF0FC"   # selected 배경 (히스토리 행)
      "100": "#C1D1F6"
      "200": "#A3BAF2"
      "300": "#799BEC"   # focus, hover-on-card
      "400": "#5F88E8"
      "500": "#376AE2"   # 프라이머리 (모든 primary action)
      "600": "#3260CE"   # primary hover
      "700": "#274BA0"
      "800": "#1E3A7C"
      "900": "#172D5F"

  # ── Data palettes (차트 전용 hue) ─────────────────────────
  # 절대 chrome/내비에 사용하지 않는다 → §components, §do_donts 참조
  data:
    cyan:
      "50":  "#F1FAFA"
      "100": "#D5EFF0"
      "200": "#C0E8E9"
      "300": "#A3DDDF"
      "400": "#91D6D9"
      "500": "#76CCCF"
      "600": "#6BBABC"
      "700": "#549193"
      "800": "#417072"
      "900": "#325657"
    purple:
      "50":  "#F8EFFC"
      "100": "#E8CCF6"
      "200": "#DDB4F1"
      "300": "#CE91EB"
      "400": "#C57CE7"
      "500": "#B65BE1"
      "600": "#A653CD"
      "700": "#8141A0"
      "800": "#64327C"
      "900": "#4C265F"
    red:
      "50":  "#FCEEEE"
      "100": "#F5CCCC"
      "200": "#F1B3B3"
      "300": "#EA9090"
      "400": "#E67A7A"
      "500": "#E05959"   # status.error
      "600": "#CC5151"
      "700": "#9F3F3F"
      "800": "#7B3131"
      "900": "#5E2525"
    yellow:
      "50":  "#FFFBEB"
      "100": "#FEF8E0"
      "200": "#FDF1BF"
      "300": "#FBE68D"
      "400": "#FADE66"
      "500": "#FAD232"   # status.warning
      "600": "#E1BD2D"
      "700": "#C8A828"
      "800": "#967E1E"
      "900": "#705E16"
    green:
      "50":  "#E8F8E8"
      "100": "#B8E9B6"
      "200": "#96DE93"
      "300": "#66CF62"
      "400": "#48C544"
      "500": "#1AB715"   # status.success
      "600": "#18A713"
      "700": "#12820F"
      "800": "#0E650C"
      "900": "#0B4D09"

  # ── Semantic role tokens (사용처별 alias) ─────────────────
  semantic:
    bg:
      app:           "{colors.neutral.white}"
      sidebar:       "{colors.neutral.grey.25}"
      bubble_user:   "{colors.neutral.grey.25}"
      input:         "#FAFAFA"
      hover_soft:    "rgba(142,148,157,0.10)"   # transparent.hover
      hover_grey:    "rgba(120,127,137,0.10)"   # applyOpacity(grey-400, 0.1)
      active_blue:   "{colors.brand.blue.50}"
    fg:
      primary:       "{colors.neutral.grey.900}"
      secondary:     "{colors.neutral.grey.700}"
      tertiary:      "{colors.neutral.grey.500}"
      muted:         "{colors.neutral.grey.400}"
      placeholder:   "{colors.neutral.grey.200}"
      on_brand:      "{colors.neutral.white}"
      link:          "{colors.brand.blue.500}"
    border:
      subtle:        "{colors.neutral.grey.50}"
      default:       "{colors.neutral.grey.100}"
      focus:         "{colors.brand.blue.300}"
    accent:
      primary:       "{colors.brand.blue.500}"
      primary_hover: "{colors.brand.blue.600}"
    status:
      success:       "{colors.data.green.500}"
      warning:       "{colors.data.yellow.500}"
      error:         "{colors.data.red.500}"
      info:          "{colors.brand.blue.500}"

  # ── Chart palette (charts.css의 토큰을 이 트리에 흡수) ─────
  chart:
    categorical:
      "1": "{colors.brand.blue.500}"     # 강조 시리즈 — 메시지가 가리키는 그것
      "2": "{colors.data.cyan.500}"
      "3": "{colors.data.purple.500}"
      "4": "{colors.data.yellow.500}"
      "5": "{colors.data.green.500}"
      "6": "{colors.data.red.500}"        # 양/음 시리즈가 공존할 때만 음수에
    context:
      regular: "{colors.neutral.grey.200}"   # "그 외 모든 시리즈"
      strong:  "{colors.neutral.grey.300}"   # 컨텍스트가 읽혀야 할 때
      baseline: "{colors.neutral.grey.500}"  # 레퍼런스/베이스라인 시리즈
    sequential:                              # 단일-hue blue ramp
      "1": "{colors.brand.blue.25}"
      "2": "{colors.brand.blue.50}"
      "3": "{colors.brand.blue.100}"
      "4": "{colors.brand.blue.300}"
      "5": "{colors.brand.blue.500}"
      "6": "{colors.brand.blue.700}"
      "7": "{colors.brand.blue.900}"
    diverging:                               # red ↔ neutral grey ↔ blue
      neg_3: "{colors.data.red.700}"
      neg_2: "{colors.data.red.500}"
      neg_1: "{colors.data.red.200}"
      mid:   "{colors.neutral.grey.50}"      # 중앙은 회색 — 절대 노랑 금지
      pos_1: "{colors.brand.blue.200}"
      pos_2: "{colors.brand.blue.500}"
      pos_3: "{colors.brand.blue.700}"
    semantic:
      positive: "{colors.data.green.600}"    # 증가, on-target
      negative: "{colors.data.red.600}"      # 감소, miss
      neutral:  "{colors.neutral.grey.400}"  # 워터폴 시작/끝
      warning:  "{colors.data.yellow.600}"
      forecast: "{colors.neutral.grey.300}"  # 항상 dashed 와 페어
    chrome:
      axis:        "{colors.neutral.grey.300}"
      axis_tick:   "{colors.neutral.grey.200}"
      grid:        "{colors.neutral.grey.50}"
      grid_strong: "{colors.neutral.grey.100}"   # zero/target 라인
      tooltip_bg:  "rgba(0,0,0,0.9)"
      tooltip_fg:  "{colors.neutral.white}"
      band:        "rgba(55,106,226,0.08)"       # CI band fill
      band_strong: "rgba(55,106,226,0.16)"
```

### 색의 역할 분담

이 시스템에는 색이 세 종류로 살고 있다 — **중성색(grey)** 이 구조를 만들고, **단일 브랜드 블루**가 모든 프라이머리 액션을 가져가며, **데이터 hue 5종(cyan/purple/red/yellow/green)** 은 차트와 상태 칩에 한정된다. 이 분리가 깨지면 화면이 즉시 시끄러워진다 — 다섯 개의 데이터 색을 내비에 칠하면, 사용자는 어떤 색이 "지금 누르라는 신호"인지 더 이상 구분하지 못한다.

### 단일 블루 원칙

`{colors.brand.blue.500}` 하나가 다음 모든 자리를 책임진다 — 보내기 버튼, 링크 아이콘, 선택된 히스토리 행의 텍스트 색, 포커스 링, 차트의 강조 시리즈. **두 번째 브랜드 색은 도입하지 않는다.** 새로운 강조가 필요하면 굵기·크기·여백으로 위계를 만들거나, `colors.brand.blue` 스케일 안에서 명도를 바꾼다.

### 데이터 색의 의미

- `cyan/purple/yellow/green`은 **카테고리 구분**용이다. 순서를 의미하지 않는다.
- `red`는 **부정/감소/miss**, `green`은 **긍정/달성/증가**, `yellow`는 **경고/임계 근접**으로만.
- 차트에서 한 메시지가 "두 주인공"을 다룰 때만 `categorical.2` (cyan)을 추가한다. 그 외에는 1개 강조 + grey context.

### 호버·액티브 표현

호버는 **색 변화가 아니라 배경 틴트**로 표현한다. 버튼은 `bg.hover_grey` (grey-400 0.1 알파)를, outlined 카드는 `border.focus` + `bg.active_blue`로 살짝 채운다. **누름 시 스케일·이동 애니메이션은 쓰지 않는다.**

### 다크 모드는 아직 없다

`v0.1` 시점 다크 모드 토큰 세트는 정의돼 있지 않다. 의미 토큰(`semantic.fg.primary` 등)을 통해 사용해두면, 다크 모드 도입 시 alias 매핑만 갈아끼우면 된다. 컴포넌트에서 primitive 색 (`colors.neutral.grey.900`)을 직접 참조하지 말고 항상 의미 토큰을 통할 것.

### 접근성

- 본문 텍스트와 배경의 명도 대비는 **≥ 4.5:1** (WCAG AA). `fg.primary`(grey-900) on `bg.app`(white)는 약 13:1로 안전.
- placeholder인 `fg.placeholder`(grey-200)은 본문이 아니라 힌트 전용으로만. 입력값 자체에는 사용 금지.
- 차트 그래픽 요소(막대 경계·축선 등)는 **≥ 3:1** (WCAG 1.4.11).
- **색만으로 정보를 전달하지 않는다**(WCAG 1.4.1) — 상태는 항상 아이콘과 페어 (`{components.icon.status_*}`).

---

## Typography

```yaml
typography:
  family:
    sans: "'PretendardKR', 'Pretendard', system-ui, -apple-system, 'Helvetica Neue', sans-serif"
    sans_jp: "'PretendardJP', 'Pretendard', system-ui, sans-serif"
    mono: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace"

  # 가로 굵기는 3종만 — light/extra-bold 없음
  weight:
    regular: 400
    medium:  500
    bold:    700

  # raw px 스케일 (tailwind.config.ts와 동일 키)
  size:
    "15":   8
    "25":   10
    "50":   11
    "75":   12
    "100":  13   # body-m, 기본 본문
    "200":  15
    "300":  17
    "400":  19
    "500":  21
    "600":  24
    "700":  27
    "800":  30
    "900":  34
    "1000": 38
    "1100": 43

  line_height:
    heading: 1.5
    body:    1.7
    tight:   1.4   # 칩, pill, 캡션, empty-state title 예외

  # ── 두 트랙 스케일: heading은 1.5, body는 1.7 ────────────
  scale:
    heading:
      "3xl":  { size: "{typography.size.1000}", weight: "{typography.weight.bold}",   line_height: "{typography.line_height.heading}" }
      "2xl":  { size: "{typography.size.900}",  weight: "{typography.weight.bold}",   line_height: "{typography.line_height.heading}" }
      "xl":   { size: "{typography.size.700}",  weight: "{typography.weight.medium}", line_height: "{typography.line_height.heading}" }
      "l":    { size: "{typography.size.600}",  weight: "{typography.weight.medium}", line_height: "{typography.line_height.heading}" }
      "m":    { size: "{typography.size.500}",  weight: "{typography.weight.medium}", line_height: "{typography.line_height.heading}" }
      "s":    { size: "{typography.size.300}",  weight: "{typography.weight.medium}", line_height: "{typography.line_height.heading}" }
      "xs":   { size: "{typography.size.200}",  weight: "{typography.weight.medium}", line_height: "{typography.line_height.heading}" }
      "2xs":  { size: "{typography.size.100}",  weight: "{typography.weight.medium}", line_height: "{typography.line_height.heading}" }
    body:
      "xl":   { size: "{typography.size.300}",  weight: "{typography.weight.regular}", line_height: "{typography.line_height.body}" }
      "l":    { size: "{typography.size.200}",  weight: "{typography.weight.regular}", line_height: "{typography.line_height.body}" }
      "m":    { size: "{typography.size.100}",  weight: "{typography.weight.regular}", line_height: "{typography.line_height.body}" }
      "s":    { size: "{typography.size.75}",   weight: "{typography.weight.regular}", line_height: "{typography.line_height.body}" }

  # 차트 안의 텍스트는 별도 — 11pt 미만 금지
  chart:
    title:    { size: 14, weight: "{typography.weight.bold}",    color: "{colors.semantic.fg.primary}" }
    subtitle: { size: 12, weight: "{typography.weight.regular}", color: "{colors.semantic.fg.muted}" }
    axis:     { size: 11, weight: "{typography.weight.regular}", color: "{colors.semantic.fg.muted}" }
    label:    { size: 11, weight: "{typography.weight.medium}",  color: "{colors.semantic.fg.secondary}" }
    annot:    { size: 11, weight: "{typography.weight.medium}",  color: "{colors.semantic.fg.secondary}" }
    source:   { size: 10, weight: "{typography.weight.regular}", color: "{colors.semantic.fg.muted}" }

  # ── 특수 케이스 ──────────────────────────────────────────
  special:
    empty_state_title: { size: 24, weight: "{typography.weight.medium}", line_height: "{typography.line_height.tight}", color: "{colors.semantic.fg.secondary}" }
    caption_pac8:      { size: 12, weight: "{typography.weight.regular}", color: "{colors.semantic.fg.placeholder}" }
```

### 두 트랙 스케일

이 시스템에는 사이즈가 **두 갈래**로 흐른다. **heading-\*** 은 line-height 1.5에 weight 500–700, **body-\*** 는 line-height 1.7에 weight 400. 동일한 폰트 사이즈라도 본문 자리에 들어가면 더 호흡이 길어진다 — 채팅 메시지 안의 마크다운 본문이 빽빽해 보이지 않는 이유다.

기본값은 `body.m` (13px / 1.7). UI 라벨·메뉴 아이템도 거의 모두 이 사이즈를 쓴다. **숫자는 tabular가 아니다** — Pretendard의 비례 숫자를 그대로 쓰며, 표·차트에서 자릿수 정렬이 필요한 경우에만 명시적으로 변경할 것.

### Empty state 예외

빈 상태 타이틀 ("Ask anything about your store")은 **24px / 1.4**로, line-height 1.5 규칙을 깨는 시스템 내 유일한 자리다. 색도 `fg.primary` 대신 `fg.secondary`(grey-700)로 한 단계 약하게 — "주목"이 아니라 "초대"의 톤이기 때문.

### 한국어가 리듬을 정한다

본문 카피의 약 70%가 한국어다. Pretendard KR이 라틴 글리프까지 책임지므로 영문 폰트를 별도 호출하지 않는다. **영문 카피는 한국어 대비 30–40% 길어진다** — 다국어 지원 영역(메시지 버블, 추천 질문 칩 등)은 이 폭을 미리 확보한다.

### 무게는 셋뿐이다

`400 / 500 / 700`만 사용한다. light(300)나 extra-bold(800)는 의도적으로 제외 — 톤이 가벼워지거나 무거워지면 "정보 전달 도구"라는 결이 깨진다.

### 마크다운 인라인 규칙

- **굵게**는 결론 문장이나 핵심 수치에만. 한 단락에 두 번 이상이면 강조가 무력화된다.
- *이탤릭*은 거의 쓰지 않는다 (한국어에서 가독성이 떨어짐). 강조가 필요하면 굵게.
- `code`는 진짜 코드/식별자(API 키, 변수명, 토큰 경로)에만. 일반 명사를 강조하기 위해 쓰지 않는다.

---

## Layout

```yaml
layout:
  base_unit: 2   # 모든 spacing은 2의 배수

  spacing:
    "1":  2
    "2":  4
    "3":  6
    "4":  8
    "5":  10
    "6":  12
    "7":  16
    "8":  24
    "9":  32
    "10": 40
    "11": 60

  shell:
    sidebar:
      width_open:      248
      width_collapsed: 54
      transition_ms:   300
    chat_column:
      max_width: 800
      width_when_chart_open: "clamp(392px, 50%, 800px)"
      align: center
    chart_pane:
      slide_in_from: right
      transition_ms: 480
      easing: "{motion.ease.out_quint}"

  density:
    sidebar_history_row: 38   # px tall
    menu_row_min:        32
    menu_row_max:        36
    button_height_min:   32
    button_height_max:   38
    touch_target_min:    32

  composer:
    sticky: bottom
    max_width: "{layout.shell.chat_column.max_width}"

  title_bar:
    sticky: top
    backdrop_blur: 10           # px
    background: "{colors.semantic.bg.app}"
    flex_shrink: 0

  content_padding:
    card_x: 24
    card_y: 20
    bubble: { x: 16, y: 12 }    # 16-24 범위, 짧은 메시지일수록 16
```

### 2px 그리드

모든 간격은 **2px의 배수**다. 8px이 시각적 호흡, 12px이 그룹 사이, 24px이 섹션 분리. `spacing.7`(16px)이 컴포넌트 안의 기본 간격이고, `spacing.8`(24px) 이상은 섹션 경계에서만 등장한다.

### 두 컬럼 셸

좌측 사이드바(고정 248px / 접힘 54px) + 우측 콘텐츠. 콘텐츠는 다시 최대 800px로 가운데 정렬되어 — 와이드 모니터에서 한 줄이 60자를 넘기지 않도록 묶인다. 차트 패널이 열리면 채팅 칼럼이 `clamp(392px, 50%, 800px)`로 줄어들고 차트가 우측에서 슬라이드 인.

### 밀도는 빡빡한 편

사이드바 히스토리 한 행은 **38px** — 노션(36px)이나 슬랙(28px)과 가까운, "분석 도구" 밀도다. 전화번호부처럼 밀집하진 않지만, 한 화면에 30개 가까운 히스토리가 보여야 하는 시나리오를 가정한다. 터치 타겟 최소는 32px (모바일 가이드라인 44px보다 작음 — 이 제품은 데스크톱 우선).

### 타이틀 바 블러

타이틀 바만 `backdrop-filter: blur(10px)` 위에 흰 배경. 채팅이 스크롤되어 올라올 때 살짝 비치는 효과 — **시스템 전체에서 글래스모피즘은 이 한 자리뿐이다**. 본문 카드, 메뉴, 모달은 모두 불투명 흰색.

### 모바일/임베드

차트는 임베드 시 너비를 가정한다 — **메일 600px, 모바일 360px, 임베드 800px**. 폰트는 차트 안에서도 11pt 미만 금지.

---

## Elevation

```yaml
elevation:
  shadow:
    none:     "none"
    input:    "0px 2px 10px 0px rgba(135,135,135,0.12)"   # 컴포저
    pill:     "0px 0px 20px 0px rgba(135,135,135,0.12)"   # 스토어 pill
    card:     "0 2px 6px 0 rgba(0,0,0,0.08)"               # 인라인 차트 카드
    menu:     "0px 1px 2px 0px rgba(0,0,0,0.05)"           # 드롭다운 paper
    tooltip:  "0 2px 4px rgba(0,0,0,0.25)"                  # 검정 90% 툴팁
    focus:    "0 0 0 2px rgba(122,197,255,0.30)"           # 포커스 링 (sky)

  # 비공식 z-index — 시스템에서 명시적으로 정의된 곳만 모음
  z_index:
    base:        0
    sidebar:     10
    title_bar:   20
    chart_pane:  30
    menu_paper:  40
    modal:       50
    tooltip:     60
```

### 그림자 시스템은 절제된다

**inner shadow는 쓰지 않는다.** 컬러 그림자도 없다. 표면이 띄워진 정도는 6단계로 끝난다 — 컴포저, pill, 카드, 메뉴, 툴팁, 포커스. 이 순서가 그대로 시각적 깊이의 위계다. 컴포저는 입력 자리이므로 가장 부드럽고 넓은 그림자(`shadow.input`), 툴팁은 짧고 진하게(`shadow.tooltip`).

### 포커스 링

키보드 포커스는 sky-blue 30% 알파의 2px ring. 마우스 포커스는 별도 표현하지 않는다(`outline: none` 후 키보드 사용자에게만). 한 번에 한 요소만 ring을 가질 수 있도록 컴포넌트 단에서 보장.

### 깊이 계층

타이틀 바 < 차트 패널 < 메뉴 < 모달 < 툴팁. 같은 zindex 내에서 겹칠 일이 생기지 않도록 컴포넌트가 뜨는 시점이 분리돼 있다 (예: 모달이 떠 있을 때 메뉴를 새로 열 수 없음).

---

## Shapes

```yaml
shapes:
  radius:
    none:  0
    xs:    4    # 메뉴 아이템 행, 디바이더 칩
    sm:    6    # 버튼 (BaseButton 기본), 툴팁
    md:    8    # 메시지 버블, 리스트 행, 차트 카드
    lg:    10   # 입력 바, 메뉴 paper, 스토어 셀렉터 pill outline
    pill:  900  # 채팅 타이틀 바의 store pill — 시스템 내 유일한 진짜 둥금

  border_width:
    "0":  0
    "1":  1     # 모든 보더의 표준
    "2":  2     # 포커스 링에서만

  # 진폭이 있는 모서리만 — 비대칭/clipped corner 등은 시스템에 없음
  corner_style: rounded
```

### 작은 라운딩, 의도된 차이

라운딩 값은 **4 / 6 / 8 / 10** 네 단계가 99%를 차지한다. 차이가 미세해 보이지만 의미가 다르다 — `xs`(4)는 행(row), `sm`(6)은 행위(action), `md`(8)는 컨테이너(bubble), `lg`(10)는 입력(input). 이 매핑을 깨면 행과 버튼이 시각적으로 같은 무게로 보인다.

### `pill: 900`의 단 한 자리

채팅 타이틀 바의 스토어 표시 pill만 진짜로 둥글다. 이 자리만 "현재 어떤 점포를 보고 있는가"라는 **상태 라벨**이고, 행위가 아니기 때문에 라운딩으로 신호한다. **동그란 버튼을 새로 도입하지 말 것.**

### 보더는 1px이 표준

`border_width.2`(2px)는 포커스 링에서만 등장한다. 카드/입력의 보더가 굵어지면 분석 도구 결을 잃는다.

---

## Components

```yaml
components:
  # ── 1차 프리미티브 ────────────────────────────────────────
  button:
    BaseButton:
      role: "프라이머리 액션 (보내기, New chat, Refresh suggestions)"
      variants:
        primary:
          bg:     "{colors.semantic.accent.primary}"
          fg:     "{colors.semantic.fg.on_brand}"
          radius: "{shapes.radius.sm}"
          height: "{layout.density.button_height_max}"
          hover_bg: "{colors.semantic.accent.primary_hover}"
          disabled:
            opacity: 0.3
            cursor:  not-allowed
        secondary:
          bg:     transparent
          fg:     "{colors.semantic.fg.primary}"
          border: "1px solid {colors.semantic.border.default}"
          hover_bg: "{colors.semantic.bg.hover_grey}"
        ghost:
          bg:     transparent
          fg:     "{colors.semantic.fg.secondary}"
          hover_bg: "{colors.semantic.bg.hover_soft}"
      states: [default, hover, focus, active, disabled]
      anti_patterns: ["크기 변환·이동 애니메이션 금지", "프라이머리는 한 화면에 하나"]

  IconButton:
    role: "아이콘 단독 액션 (more, close, settings)"
    size: "{layout.density.touch_target_min}"
    fg_default: "{colors.semantic.fg.tertiary}"
    fg_active:  "{colors.semantic.accent.primary}"

  Icon:
    style: stroke
    color: currentColor
    optical_sizes:
      xs: 12
      s:  16
      m:  20    # 기본
      l:  24
    stroke_width: "1.5–2 px @ native (M)"
    set_size: 33
    naming: "icon-{noun}.svg"
    library: "내부 — Lucide/Heroicons/FA 사용 금지"
    status:
      complete: "icon-completed-status"
      pending:  "icon-pending-status"
      warning:  "icon-warning"
      error:    "icon-sad"

  # ── 2차 컴포넌트 ────────────────────────────────────────
  Sidebar:
    width_open:      "{layout.shell.sidebar.width_open}"
    width_collapsed: "{layout.shell.sidebar.width_collapsed}"
    bg:              "{colors.semantic.bg.sidebar}"
    sections: [brand_lockup, new_chat, store_selector, history, footer_actions]
    history_row:
      height: "{layout.density.sidebar_history_row}"
      hover_bg:    "{colors.semantic.bg.hover_grey}"
      selected_bg: "{colors.semantic.bg.active_blue}"
      selected_fg: "{colors.semantic.accent.primary}"

  ChatTitleBar:
    sticky: top
    bg: "{colors.semantic.bg.app}"
    backdrop_blur: "{layout.title_bar.backdrop_blur}"
    contents: [store_pill, title, more_menu]
    store_pill:
      radius: "{shapes.radius.pill}"
      shadow: "{elevation.shadow.pill}"
      bg:     "{colors.semantic.bg.app}"

  EmptyState:
    layout: centered
    elements: [saai_symbol, title_24px, composer]
    title_color: "{colors.semantic.fg.secondary}"

  MessageThread:
    user_bubble:
      bg:     "{colors.semantic.bg.bubble_user}"
      radius: "{shapes.radius.md}"
      padding_x: "{components.button.BaseButton.variants.primary.height}"   # 24
    bot_bubble:
      bg: transparent
      radius: 0
      max_width: "{layout.shell.chat_column.max_width}"
    inline_chart_card:
      bg:     "{colors.semantic.bg.app}"
      border: "1px solid {colors.semantic.border.default}"
      radius: "{shapes.radius.md}"
      shadow: "{elevation.shadow.card}"
      cta:    "Show chart"
    streaming_indicator:
      style: "background-clip: text + horizontal grey gradient scroll"
      duration_ms: 1500
      anti_patterns: ["typewriter caret 금지", "spinner 금지"]

  Composer:
    shape: rounded-input
    radius: "{shapes.radius.lg}"
    shadow: "{elevation.shadow.input}"
    bg:     "{colors.semantic.bg.input}"
    send_icon:
      idle_fg:    "{colors.semantic.fg.muted}"
      active_fg:  "{colors.semantic.accent.primary}"
      flip_trigger: "input.length > 0"
    placeholder_fg: "{colors.semantic.fg.placeholder}"
    footnote_fg:    "{colors.semantic.fg.placeholder}"
    footnote_size:  "{typography.size.75}"

  Recommendations:
    role: "Refresh suggestions 버튼 + 추천 질문 리스트"
    item:
      radius: "{shapes.radius.md}"
      bg:     "{colors.semantic.bg.app}"
      border: "1px solid {colors.semantic.border.default}"
      hover_border: "{colors.semantic.border.focus}"
      hover_bg:     "{colors.brand.blue.25}"
    skeleton_loader:
      style: "horizontal grey gradient shimmer"
      duration_ms: 1500
      note: "시스템에서 그라데이션을 허용하는 두 자리 중 하나 (다른 하나: streaming_indicator)"

  Menu:
    paper:
      radius: "{shapes.radius.lg}"
      bg:     "{colors.semantic.bg.app}"
      shadow: "{elevation.shadow.menu}"
      border: "1px solid {colors.semantic.border.subtle}"
    item:
      radius: "{shapes.radius.xs}"
      height: "{layout.density.menu_row_min}"
      hover_bg: "{colors.semantic.bg.hover_grey}"

  Tooltip:
    bg:     "rgba(0,0,0,0.9)"
    fg:     "{colors.neutral.white}"
    radius: "{shapes.radius.sm}"
    shadow: "{elevation.shadow.tooltip}"
    note: "검정 90% — 시스템에서 다크 표면을 가진 유일한 컴포넌트"

  Modal:
    base: "MUI Dialog"
    radius: "{shapes.radius.md}"
    shadow: "{elevation.shadow.card}"
    overlay: "rgba(0,0,0,0.4)"

  StoreSelector:
    role: "현재 보고 있는 점포 표시 + 변경"
    pill_outline_radius: "{shapes.radius.lg}"
    required_empty_state:
      keyframe: highlightFadeOut
      duration_ms: 800
      note: "필수값이 비어 있을 때 한 번 펄스"

  # ── 차트 컴포넌트 (charts.css + CHART_DESIGN_GUIDE.md) ────
  Chart:
    types_supported: [line, bar_vertical, bar_horizontal, waterfall, ci_band, heatmap, sankey, treemap, funnel]
    types_forbidden: [3d_anything, double_y_axis, rainbow_categorical, pie_more_than_5_slices]
    title_style: takeaway   # never descriptive
    legend: prefer_direct_labels
    stroke:
      emph: 2
      base: 1.5
      ctx:  1
    point_radius:
      base: 3
      emph: 4.5
    forecast_pattern:
      stroke: dashed
      dasharray: "4 4"
      color: "{colors.chart.semantic.forecast}"
      pair_with: ci_band
    bar_y_axis: must_start_at_zero
    horizontal_threshold: "label_length >= 8 chars"
    sort_default: "by value desc (or time order if temporal)"
```

### 컴포넌트 간 위계

`button` < `IconButton` < `Sidebar / ChatTitleBar / MessageThread / Composer` < `Modal`. 큰 영역 컴포넌트는 작은 프리미티브를 합성한다 — Composer는 `IconButton`(send) + 입력 + footnote의 합성이고, Sidebar는 `IconButton`(toggle) + history rows의 합성이다.

### 상태 표현은 아이콘으로

체크 표시, 경고 등은 **이모지(✓ ⚠ 🙂)나 데코 유니코드를 절대 쓰지 않는다.** 시스템에 정의된 4개 상태 아이콘만 사용 — `complete / pending / warning / error`. 이는 번역·복사·이메일 클라이언트 호환성과 일관성을 동시에 보장한다.

### 차트는 별도 챕터급

차트는 단순 컴포넌트가 아니라 자체 디자인 시스템에 가깝다. 자세한 의사결정 트리·차트 유형 선택·안티패턴은 [`CHART_DESIGN_GUIDE.md`](./CHART_DESIGN_GUIDE.md)를 참조. 이 DESIGN.md는 그 가이드에서 시스템 토큰화한 부분만 담는다.

### 새 컴포넌트가 필요할 때

1. 기존 컴포넌트를 합성해서 만들 수 있는가? — 가능하면 합성으로 끝낸다.
2. 새 토큰이 필요한가? — 기존 토큰의 alias로 충분한지 먼저 확인.
3. 새 라운딩/그림자 값이 필요한가? — **거의 항상 NO.** 새 값을 추가하기 전에 기존 4단계 라운딩 / 6단계 그림자로 표현 가능한지 확인.
4. 정말 새 토큰이 필요하다면 [Do's and Don'ts](#dos-and-donts)의 확장 정책을 따른다.

---

## Motion

```yaml
motion:
  ease:
    out_quint: "cubic-bezier(0.22, 1, 0.36, 1)"   # 주력 — 패널 슬라이드, 차트
    out_bg:    "ease-out"                          # 버튼 배경색 트랜지션
  duration_ms:
    instant:  0
    fast:     150    # 버튼 배경색
    base:     300    # 사이드바 폴드, 일반 affordance
    pane:     480    # 채팅 ↔ 차트 패널 리사이즈
    pulse:    800    # highlightFadeOut (필수 비어있음 신호)
    history_highlight: 1500
    shimmer:  1500
  defaults:
    affordance: "{motion.duration_ms.fast}"
    structural: "{motion.duration_ms.base}"
    panel:      "{motion.duration_ms.pane}"
```

### 차분한 곡선

기본 이징은 `out_quint` — 빠르게 출발해 부드럽게 정착하는 한 방향 곡선. **bounce·spring·overshoot은 쓰지 않는다.** 분석 도구의 정보 톤과 맞지 않는다. 인터랙션 대부분은 `fast`(150ms) 또는 `base`(300ms)로 끝난다.

### 패널 트랜지션

채팅 ↔ 차트 패널의 폭 리사이즈만 480ms로 살짝 길다. transform + opacity가 함께 트랜지션돼 차트가 "옆에서 들어온다"는 느낌이 분명하도록.

### 스트리밍 신호

봇이 토큰을 스트리밍하는 중에는 텍스트 위에 흐르는 그라데이션(`background-clip: text`)으로 신호한다. **타자기 캐럿이나 스피너는 쓰지 않는다** — 텍스트 자체가 살아 움직이는 편이 정보 도구 톤에 가깝다.

> **Note**: Motion은 alpha 스펙의 8개 핵심 섹션에 포함되지 않는다. 이 시스템에서는 인터랙션 비중이 커서 별도 섹션으로 두지만, lint 도구가 `missing-sections` / `section-order`를 검사할 때 이 섹션은 components와 do_donts 사이의 옵셔널 확장으로 취급한다.

---

## Do's and Don'ts

```yaml
guardrails:
  do:
    - id: do_one_blue
      rule: "프라이머리 액션은 brand.blue.500 단일 컬러로."
    - id: do_grey_first
      rule: "차트는 회색조로 그리고 강조 1개에만 색을 입힌다 (Knaflic §7①)."
    - id: do_takeaway_titles
      rule: "차트 제목은 결론(takeaway)을 담는다. 'Q1 매출 12% 감소' YES, '분기별 매출' NO."
    - id: do_direct_labels
      rule: "범례 대신 데이터 끝점에 직접 레이블 (게슈탈트 근접성)."
    - id: do_dash_forecast
      rule: "추정/예측값은 점선 + grey + CI band 페어. 단독 포인트 노출 금지."
    - id: do_zero_baseline_on_bars
      rule: "막대 차트의 Y축은 반드시 0에서 시작."
    - id: do_use_semantic_tokens
      rule: "컴포넌트 코드는 colors.semantic.* 의미 토큰만 참조. primitive (colors.neutral.grey.500 등) 직참조 금지."
    - id: do_icon_for_status
      rule: "상태는 4개 status 아이콘으로만 표시 (complete/pending/warning/error)."
    - id: do_2px_grid
      rule: "모든 spacing은 layout.spacing 토큰으로. 임의 px 값 금지."
    - id: do_korean_units
      rule: "한국 사용자 대상 숫자는 만/억 우선 (1.2억). 포맷터 컨텍스트 사용, 하드코딩 금지."

  dont:
    - id: dont_second_brand_color
      rule: "두 번째 브랜드 색을 도입하지 않는다. 강조가 더 필요하면 명도/굵기/크기로."
    - id: dont_data_color_in_chrome
      rule: "cyan/purple/yellow/green/red을 버튼·내비·카드 배경에 칠하지 않는다."
    - id: dont_emoji
      rule: "UI에 이모지/데코 유니코드 금지. ✓ ⚠ 🙂 → 모두 status 아이콘으로 대체."
    - id: dont_gradient
      rule: "그라데이션 금지. 예외 2개: 추천 리스트 shimmer 스켈레톤, 스트리밍 텍스트. 둘 다 기능적."
    - id: dont_press_animate
      rule: "버튼은 누름 시 스케일/이동/회전 애니메이션을 갖지 않는다."
    - id: dont_glassmorphism
      rule: "blur는 ChatTitleBar 한 자리만. 본문 카드/모달에 글래스모피즘 금지."
    - id: dont_3d_charts
      rule: "3D 차트, 이중 Y축, 무지개 카테고리, 5조각 초과 파이 — 4개 안티패턴은 어떤 경우에도 사용하지 않는다."
    - id: dont_chart_fonts_below_11
      rule: "차트 안의 어떤 텍스트도 11pt 미만으로 두지 않는다."
    - id: dont_marketing_tone
      rule: "느낌표·과장·1인칭 we 금지. 사용자에게 직접 호칭(you / 직접 호칭)으로."
    - id: dont_lockup_logos
      rule: "store-agent / store-care / store-insight 워드마크를 한 번에 두 개 이상 락업하지 않는다 (명시적 공동 브랜딩 제외)."
    - id: dont_break_double_letterform
      rule: "SAAI 마케팅 마크의 'SSAAII' 더블 글자형을 '교정'하지 않는다."
    - id: dont_third_party_icons
      rule: "Lucide/Heroicons/FA에서 새 아이콘을 끌어오지 않는다. 새 affordance가 필요하면 내부 set을 확장한다."

extension_policy:
  new_token:
    when_allowed:
      - "기존 토큰의 alias만으로 표현이 불가능할 때"
      - "새 제품군이 추가돼 새로운 시각 영역이 생길 때"
    process:
      - "primitive 추가 전에 semantic alias로 해결 가능한지 확인"
      - "새 색은 가장 가까운 brand/data 스케일에 흡수 — 새 hue 도입은 마지막 옵션"
      - "PR에 added/changed/removed 토큰을 명시"
  new_component:
    when_allowed:
      - "기존 컴포넌트의 합성으로 만들 수 없을 때"
      - "사용 빈도가 3개 이상 화면에서 반복될 때"
  deprecation:
    process:
      - "토큰/컴포넌트는 즉시 삭제하지 않는다. @deprecated 표시 후 한 마이너 버전 유예."
      - "deprecated 토큰을 참조하는 곳은 lint orphaned-tokens / broken-ref 로 추적."
```

### 가드레일은 시스템의 기억이다

이 섹션의 do/don't는 디자인 결정의 **이유**가 박제된 자리다. "왜 두 번째 브랜드 색을 못 쓰지?"라는 질문이 6개월 뒤 돌아왔을 때, 답은 `dont_second_brand_color` 한 줄에 들어 있다 — 강조의 **위계**는 색의 **개수**가 아니라 명도/굵기/크기로 만든다는 원칙. 이 원칙이 없으면 시간이 갈수록 색이 늘고, 늘어난 색은 결국 어떤 색도 강조가 아닌 상태로 수렴한다.

### 4개의 차트 안티패턴

`dont_3d_charts`에 묶인 네 가지 — **3D, 이중 Y축, 무지개 카테고리, 5조각 초과 파이** — 는 의도가 아니라 결과로 사용자를 속인다. 데이터 시각화 가이드는 이 네 개를 이름으로 금지한다. 신규 차트 유형이 필요해도 이 네 개는 우회로조차 만들지 않는다.

### 음성과 톤의 don't

UI 카피는 **짧고 사실적**이다. 마케팅 톤(느낌표, 형용사 과잉, 1인칭 we)을 쓰지 않는다. 이는 시각 시스템과 한 짝이다 — 시각은 절제됐는데 카피만 신나면 결이 깨진다.

### 익스텐션 정책

이 시스템은 alpha다. 새 토큰·새 컴포넌트가 필요한 순간이 반드시 온다. 그때 따라야 할 절차는 단순하다 — **alias로 해결되는지부터 확인**, 새 primitive는 마지막 옵션, deprecate는 한 마이너 버전 유예.

---

## Appendix A — 토큰 ↔ 기존 CSS 변수 매핑

기존 `colors_and_type.css`와 `charts.css`의 CSS 변수가 이 DESIGN.md의 어느 토큰 경로에 대응하는지 정리.

| CSS variable | DESIGN.md token path |
|---|---|
| `--grey-25` … `--grey-900` | `colors.neutral.grey.{25..900}` |
| `--blue-25` … `--blue-900` | `colors.brand.blue.{25..900}` |
| `--cyan-50` … `--cyan-900` | `colors.data.cyan.{50..900}` |
| `--red-500` (status) | `colors.semantic.status.error` (alias to `colors.data.red.500`) |
| `--bg-sidebar` | `colors.semantic.bg.sidebar` |
| `--fg-primary` | `colors.semantic.fg.primary` |
| `--border-focus` | `colors.semantic.border.focus` |
| `--accent-primary` | `colors.semantic.accent.primary` |
| `--radius-sm` | `shapes.radius.sm` |
| `--shadow-input` | `elevation.shadow.input` |
| `--shadow-focus` | `elevation.shadow.focus` |
| `--space-{1..11}` | `layout.spacing.{1..11}` |
| `--font-sans` | `typography.family.sans` |
| `--fs-100` | `typography.size.100` |
| `--lh-body` | `typography.line_height.body` |
| `--ease-out-quint` | `motion.ease.out_quint` |
| `--dur-pane` | `motion.duration_ms.pane` |
| `--chart-cat-1` | `colors.chart.categorical.1` |
| `--chart-context` | `colors.chart.context.regular` |
| `--chart-forecast` | `colors.chart.semantic.forecast` |
| `--chart-stroke-dash` | `components.Chart.forecast_pattern.dasharray` |

## Appendix B — 사이드 자료

- `design.tokens.md` — 같은 시스템의 **alpha 스펙 호환 버전**. 토큰을 평탄화·하이픈 합성한 머신 친화 export. `lint` / `diff` / `export` / `spec` CLI에서 그대로 동작. 본 `DESIGN.md`가 source of truth, `design.tokens.md`는 도구 호환을 위한 export 대상.
- `colors_and_type.css` — primitive + semantic 토큰의 CSS variable 정의 (소스 트루스).
- `charts.css` — 차트 토큰 + chart preview 카드용 utility class.
- `CHART_DESIGN_GUIDE.md` — 데이터 시각화 가이드라인 v3 (의사결정 트리·차트 유형·안티패턴·AI 리포트 특화 원칙).
- `preview/card-*.html` — 토큰·컴포넌트별 시각 데모 카드 (30+).
- `ui_kits/store-agent/` — Plus Agent UI 키트 (Sidebar, ChatTitleBar, EmptyState, MessageThread, Composer, Recommendations 등).
- `assets/logos/`, `assets/icons/` — 워드마크, 심볼, 33개 내부 아이콘 set.

## Appendix C — 변경 이력

| Version | Date | Note |
|---|---|---|
| 0.1 | 2026-04-28 | 초안. `colors_and_type.css` + `charts.css` + `README.md` + `CHART_DESIGN_GUIDE.md` + `ui_kits/store-agent/README.md` 에서 자동 추출. |
