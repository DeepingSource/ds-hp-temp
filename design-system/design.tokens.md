---
version: alpha
name: SAAI Design System
description: |
  DeepingSource SAAI 제품군(store agent / store insight / store care)의 공통 시각 시스템.
  플래그십 표면은 Plus Agent — chat-first 분석 에이전트.
  본 파일은 DESIGN.md alpha 스펙(github.com/google-labs-code/design.md)을 준수하는
  머신 친화 export. 사람이 읽는 풍부한 가이드는 동일 폴더의 DESIGN.md 참조.
colors:
  # ── Neutrals ────────────────────────────────────────────
  white:           "#FFFFFF"
  black:           "#000000"
  grey-25:         "#F9F9FB"
  grey-50:         "#E9E9EA"
  grey-100:        "#D9DBDD"
  grey-200:        "#B1B5BB"
  grey-300:        "#8E949D"
  grey-400:        "#787F89"
  grey-500:        "#565F6C"
  grey-600:        "#4E5662"
  grey-700:        "#3D434D"
  grey-800:        "#2F343B"
  grey-900:        "#24282D"

  # ── Brand: 단일 프라이머리 (이 시스템의 유일한 브랜드 색) ─
  blue-25:         "#F7F9FD"
  blue-50:         "#EBF0FC"
  blue-100:        "#C1D1F6"
  blue-200:        "#A3BAF2"
  blue-300:        "#799BEC"
  blue-400:        "#5F88E8"
  blue-500:        "#376AE2"
  blue-600:        "#3260CE"
  blue-700:        "#274BA0"
  blue-800:        "#1E3A7C"
  blue-900:        "#172D5F"

  # ── Data hues (차트·상태 칩 전용 — chrome 사용 금지) ────
  cyan-50:         "#F1FAFA"
  cyan-100:        "#D5EFF0"
  cyan-200:        "#C0E8E9"
  cyan-300:        "#A3DDDF"
  cyan-400:        "#91D6D9"
  cyan-500:        "#76CCCF"
  cyan-600:        "#6BBABC"
  cyan-700:        "#549193"
  cyan-800:        "#417072"
  cyan-900:        "#325657"
  purple-50:       "#F8EFFC"
  purple-100:      "#E8CCF6"
  purple-200:      "#DDB4F1"
  purple-300:      "#CE91EB"
  purple-400:      "#C57CE7"
  purple-500:      "#B65BE1"
  purple-600:      "#A653CD"
  purple-700:      "#8141A0"
  purple-800:      "#64327C"
  purple-900:      "#4C265F"
  red-50:          "#FCEEEE"
  red-100:         "#F5CCCC"
  red-200:         "#F1B3B3"
  red-300:         "#EA9090"
  red-400:         "#E67A7A"
  red-500:         "#E05959"
  red-600:         "#CC5151"
  red-700:         "#9F3F3F"
  red-800:         "#7B3131"
  red-900:         "#5E2525"
  yellow-50:       "#FFFBEB"
  yellow-100:      "#FEF8E0"
  yellow-200:      "#FDF1BF"
  yellow-300:      "#FBE68D"
  yellow-400:      "#FADE66"
  yellow-500:      "#FAD232"
  yellow-600:      "#E1BD2D"
  yellow-700:      "#C8A828"
  yellow-800:      "#967E1E"
  yellow-900:      "#705E16"
  green-50:        "#E8F8E8"
  green-100:       "#B8E9B6"
  green-200:       "#96DE93"
  green-300:       "#66CF62"
  green-400:       "#48C544"
  green-500:       "#1AB715"
  green-600:       "#18A713"
  green-700:       "#12820F"
  green-800:       "#0E650C"
  green-900:       "#0B4D09"

  # ── Semantic aliases (의미 기반 — 컴포넌트 코드는 이걸 참조) ─
  primary:         "{colors.blue-500}"
  primary-hover:   "{colors.blue-600}"
  on-primary:      "{colors.white}"
  bg-app:          "{colors.white}"
  bg-sidebar:      "{colors.grey-25}"
  bg-bubble-user:  "{colors.grey-25}"
  bg-input:        "#FAFAFA"
  bg-active:       "{colors.blue-50}"
  fg-primary:      "{colors.grey-900}"
  fg-secondary:    "{colors.grey-700}"
  fg-tertiary:     "{colors.grey-500}"
  fg-muted:        "{colors.grey-400}"
  fg-placeholder:  "{colors.grey-200}"
  fg-link:         "{colors.blue-500}"
  border-subtle:   "{colors.grey-50}"
  border-default:  "{colors.grey-100}"
  border-focus:    "{colors.blue-300}"
  status-success:  "{colors.green-500}"
  status-warning:  "{colors.yellow-500}"
  status-error:    "{colors.red-500}"
  status-info:     "{colors.blue-500}"

  # ── Chart palette ───────────────────────────────────────
  # 강조 1 + 회색 그 외 — 메시지가 가리키는 시리즈만 색을 갖는다
  chart-cat-1:         "{colors.blue-500}"
  chart-cat-2:         "{colors.cyan-500}"
  chart-cat-3:         "{colors.purple-500}"
  chart-cat-4:         "{colors.yellow-500}"
  chart-cat-5:         "{colors.green-500}"
  chart-cat-6:         "{colors.red-500}"
  chart-context:       "{colors.grey-200}"
  chart-context-strong: "{colors.grey-300}"
  chart-baseline:      "{colors.grey-500}"
  # Sequential (단일 hue blue ramp)
  chart-seq-1:         "{colors.blue-25}"
  chart-seq-2:         "{colors.blue-50}"
  chart-seq-3:         "{colors.blue-100}"
  chart-seq-4:         "{colors.blue-300}"
  chart-seq-5:         "{colors.blue-500}"
  chart-seq-6:         "{colors.blue-700}"
  chart-seq-7:         "{colors.blue-900}"
  # Diverging (red ↔ neutral grey ↔ blue) — 중앙은 회색, 절대 노랑 금지
  chart-div-neg-3:     "{colors.red-700}"
  chart-div-neg-2:     "{colors.red-500}"
  chart-div-neg-1:     "{colors.red-200}"
  chart-div-mid:       "{colors.grey-50}"
  chart-div-pos-1:     "{colors.blue-200}"
  chart-div-pos-2:     "{colors.blue-500}"
  chart-div-pos-3:     "{colors.blue-700}"
  # Semantic — directional change에만, 장식 금지
  chart-positive:      "{colors.green-600}"
  chart-negative:      "{colors.red-600}"
  chart-neutral:       "{colors.grey-400}"
  chart-warning:       "{colors.yellow-600}"
  chart-forecast:      "{colors.grey-300}"
  # Chrome
  chart-axis:          "{colors.grey-300}"
  chart-axis-tick:     "{colors.grey-200}"
  chart-grid:          "{colors.grey-50}"
  chart-grid-strong:   "{colors.grey-100}"
  chart-tooltip-bg:    "rgba(0,0,0,0.9)"
  chart-tooltip-fg:    "{colors.white}"
  chart-band:          "rgba(55,106,226,0.08)"
  chart-band-strong:   "rgba(55,106,226,0.16)"

typography:
  # ── Heading track (line-height 1.5, weight 500–700) ────
  heading-3xl:
    fontSize: 38px
    fontWeight: 700
    lineHeight: 1.5
  heading-2xl:
    fontSize: 34px
    fontWeight: 700
    lineHeight: 1.5
  heading-xl:
    fontSize: 27px
    fontWeight: 500
    lineHeight: 1.5
  heading-l:
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.5
  heading-m:
    fontSize: 21px
    fontWeight: 500
    lineHeight: 1.5
  heading-s:
    fontSize: 17px
    fontWeight: 500
    lineHeight: 1.5
  heading-xs:
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.5
  heading-2xs:
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.5

  # ── Body track (line-height 1.7, weight 400) ───────────
  body-xl:
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.7
  body-l:
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.7
  body-m:
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.7
  body-s:
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.7

  # ── Special (track 규칙을 깨는 자리) ───────────────────
  empty-state-title:
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.4
  caption:
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4

  # ── Chart text (모두 11pt 이상) ────────────────────────
  chart-title:
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.4
  chart-subtitle:
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
  chart-axis-label:
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.4
  chart-data-label:
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.4
  chart-source:
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.4

rounded:
  none: 0
  xs:   4px      # 메뉴 아이템 행, 디바이더 칩
  sm:   6px      # 버튼, 툴팁
  md:   8px      # 메시지 버블, 리스트 행, 차트 카드
  lg:   10px     # 입력 바, 메뉴 paper, 스토어 셀렉터 outline
  full: 900px    # 채팅 타이틀 바의 store pill (시스템 내 유일한 진짜 둥금)

spacing:
  none:    0
  xxs:     2px
  xs:      4px
  sm:      6px
  md:      8px
  lg:      10px
  xl:      12px
  xxl:     16px
  section: 24px
  group:   32px
  block:   40px
  page:    60px

components:
  # ── Buttons ────────────────────────────────────────────
  button-primary:
    backgroundColor: "{colors.primary}"
    color:           "{colors.on-primary}"
    borderRadius:    "{rounded.sm}"
    height:          38px
    paddingX:        "{spacing.xxl}"
    typography:      "{typography.body-m}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-primary-disabled:
    opacity: 0.3
    cursor:  not-allowed
  button-secondary:
    backgroundColor: transparent
    color:           "{colors.fg-primary}"
    borderColor:     "{colors.border-default}"
    borderWidth:     1px
    borderRadius:    "{rounded.sm}"
    height:          38px
  button-secondary-hover:
    backgroundColor: "rgba(120,127,137,0.10)"
  button-ghost:
    backgroundColor: transparent
    color:           "{colors.fg-secondary}"
    borderRadius:    "{rounded.sm}"
  button-ghost-hover:
    backgroundColor: "rgba(142,148,157,0.10)"

  # ── Icons ──────────────────────────────────────────────
  icon-button:
    size:           32px
    color:          "{colors.fg-tertiary}"
    borderRadius:   "{rounded.sm}"
  icon-button-active:
    color:          "{colors.primary}"
  icon-default:
    sizeXs: 12px
    sizeSm: 16px
    sizeMd: 20px
    sizeLg: 24px
    strokeWidth: 1.5px
    color:        currentColor

  # ── Chrome ─────────────────────────────────────────────
  sidebar:
    widthOpen:       248px
    widthCollapsed:  54px
    backgroundColor: "{colors.bg-sidebar}"
    transitionMs:    300
  sidebar-history-row:
    height:          38px
    borderRadius:    "{rounded.md}"
  sidebar-history-row-hover:
    backgroundColor: "rgba(120,127,137,0.10)"
  sidebar-history-row-selected:
    backgroundColor: "{colors.bg-active}"
    color:           "{colors.primary}"

  chat-title-bar:
    backgroundColor: "{colors.bg-app}"
    backdropBlur:    10px
    flexShrink:      0
    sticky:          top
  store-pill:
    backgroundColor: "{colors.bg-app}"
    borderRadius:    "{rounded.full}"
    boxShadow:       "0px 0px 20px 0px rgba(135,135,135,0.12)"
    paddingX:        "{spacing.xl}"
    paddingY:        "{spacing.sm}"

  empty-state:
    layout:          centered
    typography:      "{typography.empty-state-title}"
    color:           "{colors.fg-secondary}"

  # ── Messages ───────────────────────────────────────────
  message-bubble-user:
    backgroundColor: "{colors.bg-bubble-user}"
    borderRadius:    "{rounded.md}"
    paddingX:        "{spacing.xxl}"
    paddingY:        "{spacing.xl}"
    typography:      "{typography.body-m}"
  message-bubble-bot:
    backgroundColor: transparent
    typography:      "{typography.body-m}"
    color:           "{colors.fg-primary}"
  inline-chart-card:
    backgroundColor: "{colors.bg-app}"
    borderColor:     "{colors.border-default}"
    borderWidth:     1px
    borderRadius:    "{rounded.md}"
    boxShadow:       "0 2px 6px 0 rgba(0,0,0,0.08)"
    padding:         "{spacing.section}"

  # ── Input ──────────────────────────────────────────────
  composer:
    backgroundColor: "{colors.bg-input}"
    borderRadius:    "{rounded.lg}"
    boxShadow:       "0px 2px 10px 0px rgba(135,135,135,0.12)"
    typography:      "{typography.body-m}"
    placeholderColor: "{colors.fg-placeholder}"
  composer-send-idle:
    color: "{colors.fg-muted}"
  composer-send-active:
    color: "{colors.primary}"
  composer-footnote:
    typography: "{typography.caption}"
    color:      "{colors.fg-placeholder}"

  # ── Recommendations ────────────────────────────────────
  recommendation-item:
    backgroundColor: "{colors.bg-app}"
    borderColor:     "{colors.border-default}"
    borderWidth:     1px
    borderRadius:    "{rounded.md}"
    typography:      "{typography.body-m}"
  recommendation-item-hover:
    borderColor:     "{colors.border-focus}"
    backgroundColor: "{colors.blue-25}"

  # ── Overlays ───────────────────────────────────────────
  menu-paper:
    backgroundColor: "{colors.bg-app}"
    borderColor:     "{colors.border-subtle}"
    borderWidth:     1px
    borderRadius:    "{rounded.lg}"
    boxShadow:       "0px 1px 2px 0px rgba(0,0,0,0.05)"
  menu-item:
    height:          32px
    borderRadius:    "{rounded.xs}"
    typography:      "{typography.body-m}"
  menu-item-hover:
    backgroundColor: "rgba(120,127,137,0.10)"

  tooltip:
    backgroundColor: "rgba(0,0,0,0.9)"
    color:           "{colors.white}"
    borderRadius:    "{rounded.sm}"
    boxShadow:       "0 2px 4px rgba(0,0,0,0.25)"
    typography:      "{typography.body-s}"

  modal:
    backgroundColor: "{colors.bg-app}"
    borderRadius:    "{rounded.md}"
    boxShadow:       "0 2px 6px 0 rgba(0,0,0,0.08)"
    overlay:         "rgba(0,0,0,0.4)"

  # ── Focus ring (시스템 공통) ──────────────────────────
  focus-ring:
    boxShadow: "0 0 0 2px rgba(122,197,255,0.30)"
---

## Overview

SAAI는 DeepingSource의 소매·점포 운영자용 AI 분석 제품군이다. 플래그십은 **Plus Agent (store agent)** — 채팅 입력으로 점포 데이터에 질문하면 차트·리포트·후속 질문이 인라인으로 렌더링되는 대화형 분석 에이전트.

이 시스템의 결은 *"블룸버그 터미널과 노션 사이 어딘가의 분석 도구"* — 여백이 화면을 지배하고, 잉크는 절제되며, 단 하나의 브랜드 블루(`{colors.primary}`)가 모든 프라이머리 액션을 짊어진다. 채팅 인터페이스이지만 **대화형 어시스턴트가 아니라 도구처럼 행동**한다.

> 더 풍부한 컨텍스트(브랜드 패밀리, 음성/톤, 디자인 원칙, 변경 이력)는 같은 폴더의 `DESIGN.md` 참조. 이 파일은 도구 호환을 위한 머신 친화 export — `lint` / `diff` / `export` / `spec` CLI에서 그대로 동작하도록 alpha 스펙(version: alpha)을 100% 준수한다.

## Colors

색은 세 종류로 살아 있다 — **중성색(grey-\*)** 이 구조를 만들고, **단일 브랜드 블루(blue-\*)** 가 모든 프라이머리 액션을 가져가며, **데이터 hue 5종(cyan/purple/red/yellow/green)** 은 차트와 상태 칩에 한정된다. 이 분리가 깨지면 화면이 즉시 시끄러워진다.

**의미 토큰만 컴포넌트에서 참조**한다. `{colors.primary}`, `{colors.bg-sidebar}` 같은 alias가 모든 사용처에 입혀지고, 컴포넌트 코드는 primitive(`{colors.blue-500}`)을 직접 참조하지 않는다 — 다크 모드 도입 시 alias 매핑만 갈아끼우면 끝나도록.

차트 팔레트는 세 패밀리로 갈린다 — **Categorical 6**(인지 한계, 강조 1 + 컨텍스트), **Sequential 7**(단일 hue blue ramp), **Diverging neg-3 ↔ mid ↔ pos-3**(중앙은 항상 회색, 절대 노랑 금지). semantic 토큰(`chart-positive`, `chart-negative`, `chart-forecast`)은 directional change에만, 장식 금지.

접근성: 본문 텍스트 ≥ 4.5:1, 차트 그래픽 ≥ 3:1 (WCAG AA / 1.4.11). 색만으로 정보 전달 금지 — 상태는 항상 아이콘과 페어.

## Typography

폰트는 **Pretendard KR**(영문/숫자 포함) 단일 패밀리. JP 로케일에서만 PretendardJP로 교체. 가중치는 `400 / 500 / 700` 셋뿐 — light/extra-bold 없음.

스케일은 **두 트랙**이다. `heading-*` (line-height 1.5, weight 500–700)와 `body-*` (line-height 1.7, weight 400). 같은 사이즈라도 본문 자리에 들어가면 호흡이 길어진다 — 채팅 메시지의 마크다운이 빽빽해 보이지 않는 이유.

기본값은 `{typography.body-m}` (13px / 1.7). UI 라벨, 메뉴 아이템, 카드 본문 모두 이 크기. 차트 안의 텍스트는 **11pt 미만 금지** — 모바일/임베드/메일에서도 가독성 보장.

`empty-state-title`은 line-height 1.4로 트랙 규칙을 깨는 시스템 내 유일한 자리. "주목"이 아니라 "초대"의 톤이라 색도 `fg-secondary`로 한 단계 약하게.

## Layout

**2px 그리드.** 모든 spacing은 `{spacing.*}` 토큰의 배수다. 임의 px 값은 쓰지 않는다.

**두 컬럼 셸**: 좌측 사이드바(248px / 54px collapsed) + 우측 콘텐츠. 콘텐츠는 max-width 800px로 가운데 정렬. 차트 패널이 열리면 채팅 칼럼이 `clamp(392px, 50%, 800px)`로 줄고 차트가 우측에서 슬라이드 인 (480ms `cubic-bezier(0.22, 1, 0.36, 1)`).

밀도는 빡빡한 분석 도구 스타일 — 사이드바 히스토리 행 38px, 메뉴 행 32–36px, 버튼 32–38px, 터치 타겟 최소 32px. 데스크톱 우선 시스템.

타이틀 바만 `backdrop-filter: blur(10px)`. 본문 카드, 메뉴, 모달은 모두 불투명 흰색 — **글래스모피즘은 이 한 자리뿐**.

차트 임베드 너비 가정: 메일 600px, 모바일 360px, 임베드 800px.

## Elevation

> alpha 스펙은 별도 elevation/shadow 토큰 그룹을 정의하지 않는다. 그림자 값은 컴포넌트의 `boxShadow` 필드에 인라인 문자열로 들어간다. 시스템 표준 그림자는 6단계로 끝난다.

- **Composer (`shadow-input`)**: `0px 2px 10px 0px rgba(135,135,135,0.12)` — 입력 자리, 가장 부드럽고 넓음
- **Store pill (`shadow-pill`)**: `0px 0px 20px 0px rgba(135,135,135,0.12)` — 사방으로 연한 글로우
- **Inline chart card (`shadow-card`)**: `0 2px 6px 0 rgba(0,0,0,0.08)` — 일반 카드 깊이
- **Menu paper (`shadow-menu`)**: `0px 1px 2px 0px rgba(0,0,0,0.05)` — 드롭다운, 가장 얕음
- **Tooltip (`shadow-tooltip`)**: `0 2px 4px rgba(0,0,0,0.25)` — 짧고 진한 그림자, 검정 90% 표면과 페어
- **Focus ring (`focus-ring.boxShadow`)**: `0 0 0 2px rgba(122,197,255,0.30)` — 키보드 포커스만

**inner shadow 금지. 컬러 그림자 금지.** 새 그림자 값을 추가하기 전에 위 6개로 표현 가능한지 먼저 확인.

깊이 계층: base(0) < sidebar(10) < title-bar(20) < chart-pane(30) < menu-paper(40) < modal(50) < tooltip(60).

## Shapes

라운딩은 4단계 + 1 (`{rounded.xs/sm/md/lg/full}`). 차이가 미세해 보이지만 의미가 다르다 — `xs`는 행(row), `sm`은 행위(action), `md`는 컨테이너(bubble/card), `lg`는 입력(input). 이 매핑을 깨면 행과 버튼이 시각적으로 같은 무게로 보인다.

`{rounded.full}` (900px)는 **채팅 타이틀 바의 스토어 pill 한 자리에서만** 등장한다. 이 자리만 행위가 아니라 상태 라벨("현재 어떤 점포를 보고 있는가")이라 라운딩으로 신호한다. **동그란 버튼을 새로 도입하지 말 것.**

보더 두께는 1px이 표준. 2px는 포커스 링에서만.

## Components

컴포넌트 위계: `button-*` < `icon-button` < `sidebar / chat-title-bar / message-bubble-* / composer` < `modal`. 큰 영역 컴포넌트는 작은 프리미티브를 합성한다 — `composer`는 send `icon-button` + 입력 + footnote의 합성, `sidebar`는 toggle `icon-button` + history rows의 합성.

**상태 표현은 status 아이콘 4개로만.** complete / pending / warning / error. 이모지(✓ ⚠ 🙂)나 데코 유니코드 절대 금지 — 번역·복사·메일 클라이언트 호환성과 일관성을 동시에 보장.

**차트는 별도 가이드** — 의사결정 트리, 차트 유형 선택, 안티패턴, AI 리포트 특화 원칙은 동일 폴더의 `CHART_DESIGN_GUIDE.md` 참조. 본 파일은 차트의 토큰만 담는다.

새 컴포넌트가 필요할 때:
1. 기존 컴포넌트를 합성해서 만들 수 있는가? — 가능하면 합성으로 끝낸다.
2. 새 토큰이 필요한가? — 기존 토큰의 alias로 충분한지 먼저 확인.
3. 새 라운딩/그림자가 필요한가? — **거의 항상 NO**.
4. 정말 새 토큰이 필요하면 [Do's and Don'ts](#dos-and-donts)의 확장 정책을 따른다.

## Do's and Don'ts

**Do**

- 프라이머리 액션은 `{colors.primary}` 단일 컬러로
- 차트는 회색조로 그리고 강조 1개에만 색을 입힌다 (Knaflic §7①)
- 차트 제목은 결론(takeaway)을 담는다 — *"Q1 매출 12% 감소"* YES, *"분기별 매출"* NO
- 범례 대신 데이터 끝점에 직접 레이블 (게슈탈트 근접성)
- 추정/예측값은 점선 + grey + CI band 페어. 단독 포인트 노출 금지
- 막대 차트의 Y축은 반드시 0에서 시작
- 컴포넌트 코드는 의미 토큰(`{colors.primary}`, `{colors.bg-sidebar}`)만 참조. primitive(`{colors.blue-500}`) 직참조 금지
- 상태는 4개 status 아이콘으로만 표시
- 모든 spacing은 `{spacing.*}` 토큰. 임의 px 값 금지
- 한국 사용자 대상 숫자는 만/억 우선 (1.2억). 포맷터 컨텍스트 사용, 하드코딩 금지

**Don't**

- 두 번째 브랜드 색을 도입하지 않는다. 강조가 더 필요하면 명도/굵기/크기로
- cyan/purple/yellow/green/red을 버튼·내비·카드 배경에 칠하지 않는다 (data hue은 차트·상태 전용)
- UI에 이모지/데코 유니코드 금지. ✓ ⚠ 🙂 → 모두 status 아이콘으로 대체
- 그라데이션 금지. 예외 2개: 추천 리스트 shimmer 스켈레톤, 스트리밍 텍스트. 둘 다 기능적
- 버튼은 누름 시 스케일/이동/회전 애니메이션을 갖지 않는다
- blur는 `chat-title-bar` 한 자리만. 본문 카드/모달에 글래스모피즘 금지
- 3D 차트, 이중 Y축, 무지개 카테고리, 5조각 초과 파이 — 4개 안티패턴은 어떤 경우에도 금지
- 차트 안의 어떤 텍스트도 11pt 미만으로 두지 않는다
- 마케팅 톤(느낌표, 형용사 과잉, 1인칭 we) 금지. 사용자에게 직접 호칭으로
- store-agent / store-care / store-insight 워드마크를 한 번에 두 개 이상 락업하지 않는다 (명시적 공동 브랜딩 제외)
- SAAI 마케팅 마크의 'SSAAII' 더블 글자형을 '교정'하지 않는다
- Lucide / Heroicons / FontAwesome에서 새 아이콘을 끌어오지 않는다 — 새 affordance는 내부 set 확장으로

**확장 정책**

새 토큰을 추가할 때: ① alias만으로 표현이 불가능한지 먼저 확인 → ② primitive 추가 전에 semantic alias로 해결 가능한지 검토 → ③ 새 색은 가장 가까운 brand/data 스케일에 흡수, 새 hue 도입은 마지막 옵션. 토큰/컴포넌트는 즉시 삭제하지 않고 `@deprecated` 표시 후 한 마이너 버전 유예 — `orphaned-tokens` / `broken-ref` 린트로 추적.
