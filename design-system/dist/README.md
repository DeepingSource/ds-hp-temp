# SAAI Design System — Code Package (`dist/`)

> 본 폴더는 [`constitution/SAAI_MASTER.md`](../constitution/SAAI_MASTER.md) 부록 A를 *단일 source* 로 한 코드 export.
> Track B **v1.4** 산출물 (2026-05-06) — **매체별 CSS layer 3종 신규** (Print Report A4 · Ebook 5.5×8.5in · Cover/Marketing).
>
> **누가 쓰나?** — 개발자 (CSS 적용) · 디자이너 (Figma Tokens Studio import).
> **무엇이 들어 있나?** — 7개 Web CSS + **3개 Medium CSS** + 1 Tailwind preset + 1 Tokens JSON.
> **어떻게 시작하나?** — §2 빠른 시작 참조.

---

## §1. 파일 구조

```
dist/
├── README.md                  ← 본 파일
│
├── saai.css                   ← Web 기본 — 모든 CSS 한 번에 import (다크 포함)
│
├── saai-fonts.css             ← @font-face — Pretendard KR + JP
├── saai-tokens.css            ← Tier 1 Primitive (--saai-*)
├── saai-semantic.css          ← Tier 2 Semantic (--color-*) — 라이트
├── saai-audience.css          ← body 클래스 분기 (--color-up/--color-down)
├── saai-charts.css            ← 차트 전용 (--chart-*) — 라이트 + 다크
├── saai-typography.css        ← heading-* / body-* 유틸 + JP letter-spacing
├── saai-dark.css              ← 다크 모드 (opt-in 베타, v1.2)
│
├── saai-medium-print.css      ← 매체: Print Report (A4) (v1.4) ★ NEW
├── saai-medium-ebook.css      ← 매체: Ebook (5.5×8.5in) (v1.4) ★ NEW
├── saai-medium-cover.css      ← 매체: Cover/Marketing (v1.4) ★ NEW
│
├── saai-tailwind.config.ts    ← Tailwind preset (darkMode 포함)
└── saai-tokens.json           ← Figma Tokens Studio v2 (semantic-dark·chart-dark 포함)
```

### 매체별 CSS 사용 (v1.4) — 마스터 §8

```html
<!-- Web (기본) — 어떤 SAAI 제품도 본 한 줄로 시작 -->
<link rel="stylesheet" href="dist/saai.css">

<!-- + Print Report (Lawson Weekly Report 등 A4 인쇄 리포트) -->
<link rel="stylesheet" href="dist/saai-medium-print.css">

<!-- + Ebook (CVS-Intelligence 이북 5.5×8.5in 책자) -->
<link rel="stylesheet" href="dist/saai-medium-ebook.css">

<!-- + Cover/Marketing (표지·포스터·세일즈 1-pager) -->
<link rel="stylesheet" href="dist/saai-medium-cover.css">
```

각 매체 CSS 는 *Web 기본 위에 덧입히는 layer*. 매체별로 *@page · 단위 (px↔pt) · 인쇄 함정 · 도메인 컴포넌트* 차이만 정의. 마스터 §8.6 *공유 규칙* (단일 Blue · weight 3단 · 마커 6종 등) 은 매체 무관 유지.

### 다크 모드 진입 (v1.2)

```html
<!-- 1) 사용자 명시 (최우선) -->
<body class="theme-dark">  <!-- 또는 theme-light -->

<!-- 2) OS 자동 감지 — body 클래스 미지정 + (prefers-color-scheme: dark) -->
<body>

<!-- 3) 인쇄는 항상 라이트 강제 -->
```

site/app.js 의 `window.SAAI.setTheme('dark' | 'light' | 'auto')` 도 사용 가능.

### 일본어 지원 (v1.2)

```html
<html lang="ja">
  ...
</html>
```

또는 부분적용 — `<div lang="ja">` 안에서만 PretendardJP + letter-spacing 0.02em 적용.
폰트 파일은 사용자 측에서 `fonts/PretendardJP-{Regular,Medium,Bold}.woff2` 배치 필요 (없으면 system-ui 폴백).

### 의존 그래프

```
saai-fonts.css      (독립)
       │
saai-tokens.css     (독립 — Tier 1 primitive)
       │
       ▼
saai-semantic.css   (Tier 2 — Tier 1 import)
       │
       ▼
saai-audience.css   (semantic import + body 클래스 분기)
       │            │
       ▼            ▼
saai-charts.css   saai-typography.css   (둘 다 semantic 의존)
```

---

## §2. 빠른 시작

### §2.1 CSS 도입 — 가장 빠른 길

HTML `<head>`에 한 줄 추가:

```html
<link rel="stylesheet" href="dist/saai.css">
```

이걸로 모든 토큰·타이포·차트가 활성화됨. `saai.css`가 내부적으로 6개 파일을 올바른 순서로 import.

### §2.2 CSS 도입 — 세밀 제어

각 파일을 직접 import (의존 순서 준수):

```html
<link rel="stylesheet" href="dist/saai-fonts.css">
<link rel="stylesheet" href="dist/saai-tokens.css">
<link rel="stylesheet" href="dist/saai-semantic.css">
<link rel="stylesheet" href="dist/saai-audience.css">
<link rel="stylesheet" href="dist/saai-charts.css">
<link rel="stylesheet" href="dist/saai-typography.css">
```

또는 CSS 안에서:

```css
@import url('./dist/saai.css');
```

### §2.3 사용 예

```html
<body class="audience-plain">
  <h1 class="heading-3xl">SAAI 디자인 시스템</h1>
  <p class="body-base">본문 텍스트는 14px, line-height 1.7</p>

  <button style="
    background: var(--color-primary);
    color: var(--color-text-on-brand);
    padding: var(--space-s) var(--space-m);
    border-radius: var(--radius-button);
    box-shadow: var(--shadow-input);
    transition: background var(--duration-fast) var(--ease);
  ">
    Send
  </button>
</body>
```

### §2.4 Figma 도입

1. Figma에서 **Tokens Studio for Figma** 플러그인 설치
2. 플러그인 열기 → **Settings** → **Sync providers** → **JSON**
3. `dist/saai-tokens.json` 파일 import
4. **Token sets** 에서 `primitive`·`semantic`·`audience-plain` (또는 `audience-analyst`)·`chart` 활성화
5. 원하는 컴포넌트에 토큰 적용

---

## §3. 핵심 룰 — 어기면 PR 거부

> 마스터 §3.1 / 4 Keywords / 부록 C.1 안티패턴 카탈로그 참조.

### §3.1 Tier 1 직접 참조 금지

```css
/* ❌ PR 거부 */
.button { background: var(--saai-blue-500); }

/* ✅ 정답 */
.button { background: var(--color-primary); }
```

이유: Tier 1 (`--saai-*`)이 *raw 값 정의*. Tier 2 (`--color-*`)는 *의미 alias*. 컴포넌트가 Tier 1을 직접 참조하면 *의미*가 코드에 묻혀 향후 변경이 어려워짐.

### §3.2 raw hex / px 직접 선언 금지

```css
/* ❌ PR 거부 */
.button { background: #376AE2; padding: 12px; }

/* ✅ 정답 */
.button { background: var(--color-primary); padding: var(--space-s) var(--space-m); }
```

### §3.3 두 번째 브랜드 색 추가 금지

`--saai-blue-500` (= SAAI Blue) 외에 새로운 *브랜드* 색을 정의하면 SAAI 정체성 위반.
*데이터 색* (cyan/purple/yellow/green/red/pink) 은 *차트·상태 칩 한정*, 버튼·내비에 사용 금지.

### §3.4 weight 600 / 800 / 900 사용 금지

```css
/* ❌ PR 거부 */
h2 { font-weight: 600; }

/* ✅ 정답 — 400 / 500 / 700 한정 */
h2 { font-weight: 700; }   /* 또는 500 */
```

### §3.5 Hero(24px+) 외 line-height 1.5 fixed

```css
/* ❌ 본문에 1.4 사용 */
.body-base { line-height: 1.4; }   /* 위반 */

/* ✅ 정답 — body 1.7, heading 1.5, 24px+ hero 만 1.4 */
.body-base { line-height: var(--saai-body-base-lh); }   /* 1.7 */
```

### §3.6 CJK 본문 12px 미만 클래스 정의 금지

```css
/* ❌ PR 거부 */
.text-xxs { font-size: 10px; }   /* CJK 가독성 fail */

/* ✅ 정답 — 10px·11px 은 차트 메타·source 한정 (axis/label 은 11px 최소) */
```

### §3.7 Diverging 차트 중앙 노란색 금지

```css
/* ❌ 색맹 안전 위반 */
.heatmap-mid { background: #FAD232; }

/* ✅ 정답 */
.heatmap-mid { background: var(--chart-div-mid); }   /* = grey-200 */
```

---

## §4. 마이그레이션 — 기존 `colors_and_type.css` 에서 이동

루트의 기존 `colors_and_type.css` / `charts.css` 는 *Plus Agent 코드 추출* 의 working file 로 보존된다 (legacy banner 부착).
신규 코드는 본 `dist/` 패키지를 사용하고, 기존 코드는 점진 마이그레이션.

### §4.1 변수명 매핑

| 기존 (legacy) | 신규 (SAAI Master spec) | 비고 |
|--------------|--------------------------|------|
| `--blue-500` | `--saai-blue-500` | Tier 1 prefix 추가 |
| `--grey-700` | `--saai-grey-700` | Tier 1 prefix |
| `--bg-app` | `--color-bg-app` | Tier 2 alias 정식 명명 |
| `--fg-primary` | `--color-text-primary` | Tier 2 alias 정식 |
| `--fg-secondary` | `--color-text-body` | 의미 명확화 |
| `--fg-link` | `--color-primary` | 링크색 = 프라이머리 |
| `--accent-primary` | `--color-primary` | 통일 |
| `--status-success` | `--color-positive` | 의미 alias |
| `--status-error` | `--color-negative` | 의미 alias |
| `--shadow-input` | `--shadow-input` | 동일 |
| `--space-7` (16px) | `--space-m` (= `--saai-space-3`) | semantic alias |
| `--space-8` (24px) | (해당 없음 — `--space-l` = 20px 또는 `--space-xl` = 28px 중 선택) | scale 변경 |
| `--fs-100` (13px) | `--saai-body-base-size` (14px) | scale 정리 — Plus Agent 13px → 14px 점진 이동 |
| `--lh-heading` (1.5) | `--saai-heading-*-lh` | scale 정리 |
| `--ease-out-quint` | `--saai-ease-saai` | 명명 정리 |
| `--dur-fast` | `--saai-duration-fast` | prefix |

### §4.2 마이그레이션 단계 (Plus Agent 측 작업)

```
Phase A (1~2주) — 추가만, 기존 변수 유지
  - dist/saai.css import 추가
  - 기존 --blue-500 등은 그대로 둠
  - 신규 코드만 --color-primary 사용
  - 회귀 테스트 통과

Phase B (2~3주) — 점진 변환
  - 기존 컴포넌트 1~2개 단위로 --blue-500 → --color-primary 변환
  - 시각 회귀 PNG diff < 2% 확인

Phase C (장기) — legacy 제거
  - colors_and_type.css 의 기존 변수 alias-only 유지
  - 모든 컴포넌트가 dist/ 사용 확인
  - colors_and_type.css 를 dist/saai.css 의 alias 로 축소
```

### §4.3 변환 자동화 (옵션)

다음 sed 패턴으로 일괄 치환 가능 (검토 후 적용):

```bash
# Tier 1 prefix 추가
find src -name "*.css" -o -name "*.tsx" -o -name "*.ts" | \
  xargs sed -i.bak -E \
    -e 's/--(blue|grey|cyan|purple|red|yellow|green|pink)-([0-9]+)/--saai-\1-\2/g'

# 의미 alias 변환 (가장 흔한 케이스)
find src -name "*.css" -o -name "*.tsx" | \
  xargs sed -i.bak \
    -e 's/--accent-primary\b/--color-primary/g' \
    -e 's/--fg-primary\b/--color-text-primary/g' \
    -e 's/--bg-app\b/--color-bg-app/g'
```

**주의**: 자동 치환 후 *반드시* 시각 회귀 + 코드 리뷰. 패턴이 모든 케이스를 커버하지 않음.

---

## §5. 검증

### §5.1 토큰 도입 직후 점검

```bash
# raw hex 직접 사용 = 0 건이어야 함 (token 정의 자체 제외)
grep -rEn '#[0-9A-Fa-f]{6}\b' src/ | grep -v 'dist/saai-' | grep -v '\.json$' | wc -l

# Tier 1 직접 참조 = 0 건이어야 함 (saai-tokens.css 정의 자체 제외)
grep -rEn 'var\(--saai-' src/ | grep -v 'dist/saai-' | wc -l

# weight 600/800/900 사용 = 0 건이어야 함
grep -rEn 'font-weight:\s*(600|800|900)\b' src/ | wc -l
```

위 3개 모두 `0` 이면 Phase 0 통과.

### §5.2 Figma 측 검증

Tokens Studio 플러그인의 *Inspect* 탭에서:
- 모든 컴포넌트가 토큰을 참조하는가? (raw hex 0건)
- Token set 활성화가 *primitive + semantic + audience-? + chart* 4개인가?

---

## §6. FAQ

**Q. Tailwind 와 같이 쓸 수 있나?**
A. 가능. `tailwind.config.ts`의 `theme.extend.colors` 에 본 토큰을 매핑하면 됨. Track B v1.1 에서 `saai-tailwind.config.ts` 추가 예정.

**Q. 다크 모드는?**
A. 마스터 v1 에는 다크 모드 정책 미포함 (Phase 4). 첫 다크 모드 요청 시 신규 토큰 ~50개 추가 + 본 패키지 v2.0 으로 이동 예정.

**Q. 기존 `--blue-500` 을 그냥 두면 안 되나?**
A. 둘 수는 있으나 *legacy* 로 표시. 신규 코드는 반드시 `--saai-blue-500` 또는 더 좋은 `--color-primary`.

**Q. Figma JSON 을 수정해도 되나?**
A. **금지.** Figma JSON 은 마스터 부록 A 의 export. 변경은 *마스터를 먼저 수정* → 본 JSON 자동 재생성 (수동 — 본 v1.0 은 자동 빌드 도구 미포함).

**Q. CI 슬롯은 언제?**
A. Track B v1.1 — Makefile + 5종 검증 스크립트 (`test-saai-*`).

---

## §7. 변경 이력

| 버전 | 날짜 | 변경 |
|------|------|------|
| v1.0.0 | 2026-05-04 | 초기 export — 6 CSS + 1 JSON. 마스터 부록 A.1~A.6 단일 source. |
| v1.1.0 | 2026-05-04 | Tailwind preset (saai-tailwind.config.ts) 추가. saai-charts.css 의 weight 600 → 700 정정. |
| v1.2.0 | 2026-05-04 | **다크 모드 베타** (saai-dark.css), 차트 다크 분기, **일본어 PretendardJP** + letter-spacing 0.02em, Figma JSON 에 semantic-dark · chart-dark token set 추가. |
| v1.3.0 | 2026-05-04 | (코드 패키지 변경 없음 — Phase 4 완료는 마스터 §4.7 / §7.5 · scripts/lint_a11y.sh · scripts/migrate-saai.sh · ai/a11y_checks.py 신규.) |

---

## §A. 관련 문서

| 문서 | 위치 |
|------|------|
| **단일 source — 마스터 헌법** | [`constitution/SAAI_MASTER.md`](../constitution/SAAI_MASTER.md) |
| **본 패키지 부록 A 정의** | 마스터 §A 부록 A |
| **충돌·중복 인벤토리 (Track A)** | [`constitution/_audit/01_INVENTORY.md`](../constitution/_audit/01_INVENTORY.md) |
| **자기 검증 (Track A)** | [`constitution/_audit/02_VALIDATION.md`](../constitution/_audit/02_VALIDATION.md) |
| **확장 로드맵 (Track B·C)** | [`constitution/_audit/03_ROADMAP.md`](../constitution/_audit/03_ROADMAP.md) |
| **Plus Agent 사례 (legacy CSS)** | [`../colors_and_type.css`](../colors_and_type.css) (working file) |

---

> 본 패키지의 단일 source는 항상 `constitution/SAAI_MASTER.md`. 본 폴더에서 무엇이든 변경하기 전에 마스터를 먼저 수정.
