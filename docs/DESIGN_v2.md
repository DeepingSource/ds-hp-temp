> 📌 **읽기 전 — 이 문서의 자리 (2026-06-19 정리)**
> 본 문서는 **Phase 3 디자인 *계획서*(2026-05-29)**이며 history 보존용이다. 라이브 디자인 SOT 는 repo-root **[`/DESIGN.md`](../DESIGN.md)** + `src/` 다.
> 본 v2 가 신설을 제안한 **`ui_kits/corporate/` 는 끝내 만들어지지 않았다** — corporate(회사 사이트) 모드는 `ui_kits/corporate/` 대신 **`src/`** 에 바로 구현되어 출하됐다. 또한 상속 source 로 인용하는 **`brand-system/`(약 41 문서) 는 본 repo 에 없고 상위 SAAI repo** 에 있다.

# 디자인 시스템 v2 — 회사 사이트 모드의 재정렬

> **버전** v2.0 · **작성** 2026-05-29 · **상위 SOT** [PLAN_v1.1.md](./PLAN_v1.1.md) §0.3 (D1–D10) · §1.3 3-레이어 · §2.1 IA · §7 Phase 3 · **자매 문서** [BRAND_v2.md](./BRAND_v2.md) §4 4-레이어 보이스 차별화 · **상속** `design-system/` 13 CSS + 31 preview + ui_kits/store-agent (v1.4, 2026-05-06)
>
> 본 v2 는 13 CSS 와 31 preview 위에 *새 deepingsource.io 회사 사이트 모드* 의 매핑 layer 를 얹는다. v1 의 토큰값·차트룰·UI 룰은 SOT 로 그대로 유지된다.

---

## 0. 한 페이지 요약

### 0.1 v2 의 목적

`design-system/` 13 CSS 는 SAAI Plus Agent — *blueberg 터미널과 노션 사이* 의 *분석 도구* 결로 잘 깎여 있다. 그러나 곧 박을 *deepingsource.io 회사 사이트* 는 *분석 도구* 가 아니라 *우산 회사의 자기소개·제품 진열대·기술 백서·R&D 카탈로그* 가 한 도메인 안에 같이 살아야 하는 자리다. v1 의 한 가지 결로는 이 4 결을 다 담지 못한다.

v2 는 13 CSS 를 *다시 쓰지 않는다*. 대신 — (a) 13 CSS 의 *회사 사이트 적용 모드* 를 표 한 장으로 정의하고, (b) BRAND v2 §4 의 *4-레이어 보이스* (Company · Products · Technologies · Vision Models) 를 *시각 차별화 룰* 로 옮기고, (c) `ui_kits/store-agent/` 옆에 `ui_kits/corporate/` 를 신설할 spec 을 박고, (d) 색·타이포·차트 토큰의 *회사 사이트 모드 정렬* 을 제안하고, (e) 31 preview 카드를 새 IA 30 라우트의 컴포넌트로 매핑한다.

### 0.2 결론 세 줄

1. **One blue does all the work — 회사 사이트에서도 깨지 않는다.** `#376AE2` (blue-500) 가 saai.store 의 `theme-color` 와도 일치한다는 사실이 *우산 = 한 블루* 의 약속을 한 번 더 확인해 준다. 4 도메인 액센트 분리 안 — 본 v2 는 *기각* 권고 (Q1 의 답).
2. **5 layer 모델은 그대로, 6번째 layer (corporate-audience) 만 얹는다.** v1 의 `saai-audience.css` 가 *Operator (점주) vs Analyst (분석가)* 분기였다면, v2 는 그 옆에 *Company audience 모드* 를 추가 — `body.audience-corporate` 한 줄로 회사 사이트 4-레이어 (Company·Products·Technologies·Vision Models) 가 토큰 분기.
3. **Pretendard 한 패밀리, weight 400/500/700 그대로.** D6 의 en path-prefix 도 *Pretendard 라틴* 으로 흡수 — Inter·Manrope 별도 패밀리 신설 *기각* 권고 (Q2 의 답). v1 의 `korean_first_typography` 원칙은 한국어가 본문 리듬의 기준이라는 *결* 이지 *번역의 부정* 이 아니므로, 영문도 같은 패밀리로 갈 때 우산의 결이 깨지지 않는다.

### 0.3 본 v2 가 다루는 것 / 다루지 않는 것

**다룬다.**
- 13 CSS 의 *회사 사이트 적용 모드* (§3)
- BRAND v2 §4 4-레이어 보이스 차별화 → *시각 차별화 룰* 매핑 (§2)
- 31 preview 카드 → 새 IA 30 라우트의 *필요 컴포넌트 매핑* (§4)
- `ui_kits/corporate/` 신설 *목차* (§5)
- 색·타이포·차트 토큰의 회사 사이트 모드 정렬 (§6)
- 신설 디자인 자산의 자리 (§7) — ASSET_COLLECTION_v1 과 정합
- Phase 3 의 W1-W4 작업 분해 (§8)
- 본 v2 안에서 결정해야 할 Open Q 5종 (§9)

**다루지 않는다.**
- 실제 CSS 코드 작성 — Phase 4 의 `CODE_v1.md`
- 컴포넌트 React 구현 — Phase 4
- 자산 가공 (촬영·SVG 변환·크롭) — `ASSET_COLLECTION_v1.md` 별도 트랙
- 41 brand-system 문서의 카피 본문 — Phase 2 의 BRAND_v2
- 다국어 (en/ko/jp) *번역* — D6 정책은 따르지만 번역 작업 자체는 Phase 2-3 카피 트랙

---

## 1. v1 디자인 시스템의 현 상태 정리

### 1.1 5 layer 모델 + 매체 3종

`design-system/dist/` 의 13 CSS 는 다음 5 layer 모델과 매체 3종으로 구성된다 (local INVENTORY §3.2 + saai-charts.css 헤더 인용).

```
Layer 1 — Primitive            saai-tokens.css            (--saai-*)
Layer 2 — Semantic              saai-semantic.css          (--color-*)
Layer 3 — Audience              saai-audience.css          (Operator/Analyst 분기)
Layer 4 — Charts                saai-charts.css            (--chart-*)
Layer 5 — Dark (opt-in)         saai-dark.css              (body.theme-dark)

매체 layer 3종:
  cover                          saai-medium-cover.css      (마케팅·표지)
  print                          saai-medium-print.css      (A4 리포트)
  ebook                          saai-medium-ebook.css      (5.5×8.5in)

지원:
  fonts                          saai-fonts.css             (Pretendard KR/JP)
  typography                     saai-typography.css        (heading-* / body-*)
  tailwind                       saai-tailwind.config.ts    (Tailwind preset)
  통합                            saai.css                    (모두 import)
```

Layer 의존성은 *위에서 아래로* — 컴포넌트 코드는 *반드시 Tier 2 Semantic* (`--color-*`) 만 참조한다. Tier 1 (`--saai-*`) 직접 참조는 PR 거부 (`saai-semantic.css` 헤더 룰).

### 1.2 토큰 SOT 두 자리

- `design.tokens.md` — 사람·기계 친화 YAML export. DESIGN.md alpha 스펙. neutrals 13단 + brand blue 13단 + data hues 5종 (cyan·purple·red·yellow·green) + semantic aliases + Pretendard family + 4·8 그리드 + 컴포넌트 토큰 (button·sidebar·composer·message-bubble·tooltip·menu·chart).
- `dist/saai-tokens.json` — Figma Tokens Studio v2 export. `$metadata.version: 1.3.0`, `tokenSetOrder: [primitive, semantic, semantic-dark, audience-plain, audience-analyst, chart, chart-dark]`.

두 파일은 *값* 이 같다. 한 자리만 갱신하고 다른 자리는 *export 트리거* 로 두는 운영 룰 권고 (Phase 4 자동화 후보).

### 1.3 v1 의 6 원칙 (DESIGN.md 추출)

| # | 원칙 | 한 줄 |
|---|---|---|
| 1 | Quiet utility, not hype | 마케팅 톤 금지. 정보 우선·짧고 사실적 카피. |
| 2 | One blue does all the work | 프라이머리 액션은 blue-500 한 톤. 두 번째 브랜드 색 미도입. |
| 3 | Data colors stay in data | cyan/purple/yellow/green/red 은 차트·상태 칩에서만. |
| 4 | Tools, not personas | 선언적 명령형. 챗봇 페르소나 금지. |
| 5 | Charts confirm, they don't conclude | AI 요약이 결론, 차트는 검증. |
| 6 | Korean-first typography | Pretendard KR 이 본문 리듬의 기준. |

회사 사이트는 *마케팅의 자리* 이므로 #1 *Quiet utility* 가 가장 흔들리기 쉬운 자리다. BRAND v2 §4 의 Company 레이어 *executive English-first · evidence-driven · 헌장 톤* 가 시각으로는 *Quiet utility* 의 결과 정합 — *마케팅 톤 금지* 는 *마케팅 자리에서도 깨지 않는다* 가 v2 의 출발선.

### 1.4 차트 룰 — CHART_DESIGN_GUIDE.md 의 척추

| # | 룰 |
|---|---|
| 1 | 의사결정 트리 5초 — 메시지 한 문장 X → 차트 만들지 마라 |
| 2 | 차트 제목 = 메시지 (주제 X) |
| 3 | 강조 1 + 회색 그 외 — 메시지가 가리키는 시리즈만 색 |
| 4 | Categorical ≤ 6 cap. 7+ 시 small multiples |
| 5 | Sequential 7 step (단방향 blue). 단계 ≠ 7 = 위반 |
| 6 | Diverging 중앙 = grey-200. 노란색 절대 금지 (색맹 안전) |
| 7 | 데이터 라벨 11px 미만 금지 |
| 8 | 4 anti-pattern 차단 — 3D / 이중 Y축 / 무지개 색 / 파이 5조각 초과 |

회사 사이트의 4 레이어 모두 동일하게 적용. 단 *차트의 종류와 톤* 은 레이어별로 다르다 — Company 는 IR 차트 (단정·연도 축), Products 는 KPI 차트 (강조 1 + before/after), Technologies 는 spec 차트 (회색조 + 출처), Vision Models 는 사양 표만 (차트 미사용).

### 1.5 31 preview 카드 분류

`design-system/preview/` 31장의 한 줄 분류.

| 분류 | 카드 수 | 카드명 |
|---|---|---|
| Color | 4 | colors-primary · colors-data · colors-grey · colors-semantic |
| Logo·심볼 | 2 | logos · symbol-mark |
| Typography | 3 | type-family · type-headings · type-body |
| Spacing·Radii·Shadow | 3 | spacing · radii · shadows |
| Icons | 1 | icons |
| Chart | 8 | chart-bar-sorted · chart-categorical-palette · chart-ci-band · chart-emphasis · chart-heatmap · chart-line-takeaway · chart-waterfall · chart-anti-truncated |
| UI 패턴 (앱) | 10 | composer · empty-state · menu · message-bubble · recommendations · sidebar-history · store-pill · tooltip · buttons · (icons 중복 제외) |

색·타이포·차트의 *카탈로그 카드 17종* 은 회사 사이트에서도 거의 그대로 재사용. UI 패턴 10종 은 *Plus Agent 의 chat-first* 결로 깎여 있어 회사 사이트 컴포넌트 (Hero·진열대·임원 카드·매체 그리드 등) 와는 자리가 다르다 — §4 의 매핑 표에서 *재활용 가능* / *신설* 로 분리.

### 1.6 ui_kits/store-agent/ — 기존 1 트랙

`ui_kits/store-agent/README.md` 가 정리한 *Plus Agent chat-first* 의 8 컴포넌트 (Sidebar · ChatTitleBar · EmptyState · MessageThread · Composer · Recommendations · IconButton · Icon). *의도적으로 cosmetic-only* — 상태는 fake, 차트 엔진은 미연결. 이 폴더는 *제품 앱의 reference* 로 잠그고, 회사 사이트는 *형제 폴더 `ui_kits/corporate/` 신설* 이 자연스럽다 (§5).

---

## 2. v2 의 *회사 사이트 모드* 도입

### 2.1 audience layer 의 확장 — `saai-audience.css` 의 자리

현 `saai-audience.css` 는 마스터 §2.5 의 *Operator vs Analyst* 분기 — `body.audience-plain` (점주 친숙 ▲ 빨강) / `body.audience-analyst` (분석가 표준 ▲ 녹). 핵심은 *모드는 톤만 바꾸고 진실은 바꾸지 않는다* — 안전성 룰 (★ 룰·추론 사다리·마커·결손 라벨) 은 모드 무관.

v2 는 이 자리에 *Company audience 모드* 를 *세 번째 분기* 로 추가.

```css
body.audience-corporate {
  /* Company 레이어 기본 — 회사 사이트의 디폴트 */
  /* 시각 차별화 룰은 BRAND v2 §4 의 4-레이어 보이스 매핑 */
}
body.audience-corporate.layer-products      { /* Products 레이어 */ }
body.audience-corporate.layer-technologies  { /* Technologies 레이어 */ }
body.audience-corporate.layer-models        { /* Vision Models 레이어 */ }
```

*audience-corporate* 가 *우산* — 4 도메인 (회사·제품·기술·모델) 의 공통 결을 잡고, `.layer-*` 보조 클래스가 *변주* 를 잡는다. 라우트 prefix 별로 보조 클래스가 자동 박힘 — `/company/*` `/` `/contact` `/legal/*` `/resources/blog · case-studies` 에는 보조 클래스 없음 (Company 디폴트), `/products/*` 는 `.layer-products`, `/technology/anonymizer · /seal · /spatial-ai` 는 `.layer-technologies`, `/technology/models` 는 `.layer-models`. `/solutions/*` 와 `/enterprise · /pricing` 은 BRAND v2 §4.1 의 *Products 레이어* 로 매핑 (영업의 자리).

기존 `audience-plain` / `audience-analyst` 와의 관계 — *서로 직교*. 회사 사이트는 *항상 audience-corporate*, 제품 앱 (Plus Agent) 은 *audience-plain | audience-analyst*. 한 body 에 두 가지가 동시에 박히는 일은 없다.

### 2.2 4-레이어 시각 차별화 룰 (핵심)

BRAND v2 §4 의 4-레이어 *보이스* 를 *시각* 으로 옮긴다. *고정 5축* 은 시각에서도 깨지 않는다 — 카테고리어 표기 (*익명화 공간 AI / Anonymized Spatial AI / SAAI*) · SEAL 3 약속 호명 위치 · BLUF (Hero 결론 먼저) · 금기어 시각화 (*최고의·놀라운* 같은 형용사를 큰 글자로 박지 않음) · 결정과 책임은 사람의 자리 (Agent live demo 의 자율도 사다리 시각화). *변주 7축* 은 레이어별로 의도적으로 다르게.

| 레이어 | 청자 | 1차 시각 모드 | 색 사용 | 타이포 모드 | 그리드 모드 | 차트 모드 | 인터랙션 | 보조 클래스 |
|---|---|---|---|---|---|---|---|---|
| **Company** | 본사·투자자·언론·정부·신규 입사자 | Executive — 흑백 정중 + blue-500 액센트 1색 | 저채도 (grey 우선) | Display 큰 (heading-3xl/2xl Hero) · 본문 한 단 | 12 col · 큰 여백 (page 60px, block 40px) | IR·재무 (연도 축·단정·출처 인용) | 모션 최소 — 페이드인만 (200ms) | (없음, 디폴트) |
| **Products** | 본사 운영팀·IT 결정자 (SC 카드만 SMB) | Product — blue-500 액센트 + data hue 1색 (KPI 강조용) | 중채도 (액센트 1-2개) | Display 중 (heading-xl) · 본문 두 단 가능 | 12 col · 인터랙티브 데모 카드 | KPI 중심 + before/after + Categorical 1+grey | 모션 적용 — live demo (D7) 인터랙션 + 카드 hover | `.layer-products` |
| **Technologies** | 기술 결정자·엔지니어·학계·글로벌 파트너 | Tech — 다이어그램·표 우위, 회색조 | 저채도 (grey + blue-500 link only) | Display 작 (heading-l/m) · 본문 두 단 (백서) | 12 col · spec 표 · 다이어그램 | 결과 인용 차트 (출처 명시·CI band·forecast 점선) | 모션 절제 — 호버 툴팁만 | `.layer-technologies` |
| **Vision Models** | 엔지니어·개발자·도입 R&D | Catalog — 카드 그리드·코드 톤 | 무채색 + blue-500 stage marker 만 | 모노 우선 (코드 ID) · 본문 한 단 (카드 1-2 단락) | 8 col 카탈로그 그리드 (3-4 컬럼) | 사양 표만 (차트 미사용) | 모션 없음 | `.layer-models` |

색 사용의 *우산 룰* — 4 레이어 모두 *one blue does all the work* 를 깨지 않는다. data hue (cyan·purple·red·yellow·green) 는 Products 레이어의 KPI 차트와 Technologies 레이어의 CI band·diverging 차트에서만 *데이터의 자리* 에 박힌다 — Hero · 카드 배경 · 버튼에는 절대 미사용.

### 2.3 *고정 5축 / 변주 7축* 의 시각 매핑

BRAND v2 §4.2 의 Voice Variation Matrix 12축을 시각의 결로 다시 표시.

| 축 | 고정/변주 | 시각의 자리 |
|---|---|---|
| 시간 | 변주 | Company 헤더의 *2031 비전* / Products 카드의 *어제·지금·다음* 3 카드 / Tech 의 *현재 시점* / Models 의 *Live · Building · Planned* stage marker |
| 주 청자 | 변주 | Hero h1 의 폰트 사이즈 (Company 크게 / Products 중간 / Tech 작게 / Models 헤딩 미사용) |
| 톤 형용사 | 변주 | 페이지의 *여백 비율* (Company 큼 / Products 중간 / Tech 적음 / Models 카탈로그 그리드 밀도 높음) |
| 카피 길이 | 변주 | Hero / 본문 / 카드의 글자 수 한도 (Hero ≤ 12 어절) |
| 한글/영문 | 변주 | path-prefix `/` (en 기본) vs `/ko` `/jp` — 폰트 패밀리는 동일 (Pretendard 라틴) |
| 이모지 | *대부분 고정* | Care 외부분기 카드 한정 9 종 허용 — 그 외 모든 자리 금지. 시각으로는 *Care 카드의 이모지 자리* 만 SVG 9 종 sprite 준비 |
| **카테고리어** | **고정** | 푸터·메타·Hero sub 의 표기 *익명화 공간 AI / Anonymized Spatial AI / SAAI* — 모든 페이지 동일 위치 |
| **SEAL 3 약속** | **고정** | `/technology/seal` · `/products/store-care` · 푸터 — *S/E/A/L* 4 글자 호명의 시각 자리 |
| **카피 형식 BLUF** | **고정** | Hero h1 = 결론. h2/sub 가 근거. 모든 페이지 동일 |
| **금기어** | **고정** | *최고의·놀라운·솔루션·!!!* 같은 단어를 큰 글자·강조 색으로 박지 않음 — 디자인 리뷰 체크 |
| **동료의 톤** | **고정** | 챗봇 페르소나 금지 (DESIGN 원칙 #4). 회사 사이트도 동일 — 아바타·말풍선 의인화 미사용 |
| **결정과 책임은 사람의 자리** | **고정** | `/products/store-agent` live demo 의 자율도 사다리 L0→L5 시각화 — *책임선이 분명* 의 시각 |

---

## 3. 13 CSS 의 회사 사이트 모드 매핑

| CSS 파일 | v1 역할 | v2 회사 사이트 적용 모드 | 변경/추가 필요 |
|---|---|---|---|
| saai-tokens.css | Tier 1 Primitive (`--saai-*`) | **그대로 유지** — 토큰값 0 변경 | 없음 (One blue does all the work 유지) |
| saai-semantic.css | Tier 2 Semantic (`--color-*`) | 그대로 유지 + 회사 사이트 신규 semantic alias 1-2 종 검토 | `--color-bg-hero` (Hero 전용 배경) · `--color-bg-section-alt` (섹션 교대 배경) 검토 |
| saai-typography.css | heading-* / body-* + JP letter-spacing | 그대로 유지 + 한 단/두 단 본문 utility 보강 | `.body-two-column` · `.body-one-column` utility 추가 검토 |
| saai-fonts.css | @font-face — Pretendard KR/JP | 그대로 유지. **Pretendard 라틴이 영문 fallback** (Inter·Manrope 미도입) | en 사용 시 `font-feature-settings` 검토 (`ss01` · `cv02` 등 가독성 기능) |
| saai-charts.css | 차트 전용 (`--chart-*`) | 그대로 유지 + Company 레이어 *IR 차트* 보조 토큰 검토 | `--chart-ir-axis` · `--chart-ir-baseline` 분리 검토 (단정·연도 축) |
| saai-dark.css | 다크 모드 (opt-in) | **Company 레이어 Hero 전용 dark 검토** (전 페이지 다크 옵션은 미도입 권고 — Q3 의 답) | Hero section 한정 *`.section-dark`* 유틸리티 검토 |
| saai-audience.css | Operator/Analyst 분기 | **`body.audience-corporate` + `.layer-*` 4 종 추가 (핵심)** | §2.1 의 audience 확장 — Phase 3 W1 의 첫 PR |
| saai-tailwind.config.ts | Tailwind preset | 그대로 유지 + `audience-corporate:` variant 추가 검토 | `audience-corporate:layer-products:...` variant 분기 |
| saai-medium-cover.css | 매체 cover (마케팅·표지) | **회사 사이트와 일부 정합** — Hero key visual 의 cover 결 일부 흡수 가능 | reference 로 참조, 직접 import X |
| saai-medium-print.css | 매체 print (A4 리포트) | 회사 사이트와 무관 — 사내 리포트에 잠금 | 없음 |
| saai-medium-ebook.css | 매체 ebook (5.5×8.5in) | 회사 사이트와 무관 — 이북에 잠금 | 없음 |
| saai.css | 통합 (전부 import) | **회사 사이트는 분리 번들** | `corporate.css` 신설 검토 — Web 기본 5 layer + audience-corporate + dark Hero only. Print·Ebook 미포함 |

### 3.1 신설 corporate.css 의 import 순서

```css
/* corporate.css — 회사 사이트 single bundle (제안) */
@import url('./saai-fonts.css');
@import url('./saai-tokens.css');
@import url('./saai-semantic.css');
@import url('./saai-audience.css');   /* audience-corporate + .layer-* 4종 포함 */
@import url('./saai-charts.css');
@import url('./saai-typography.css');
@import url('./saai-dark.css');        /* Hero 한정 — body.theme-dark 미사용 */
/* medium-print · medium-ebook · medium-cover 미포함 */
```

v1 의 `saai.css` 가 *Web 기본 + 다크 베타* 전부를 한 번에 묶었다면, `corporate.css` 는 *회사 사이트만의 필요* 로 압축. Phase 4 빌드 시 *최종 번들 크기 감소* 의 자리. (Phase 4 결정)

---

## 4. 새 IA 30 라우트의 컴포넌트 인벤토리

PLAN v1.1 §2.1 의 톱-레벨 IA 30 라우트에 대해, *필요 컴포넌트 × 31 preview 매핑 × ui_kits/store-agent 재활용 × 신설* 을 한 표로.

| 라우트 | 레이어 | 필요 컴포넌트 | 31 preview 매핑 | store-agent 재활용 | 신설 |
|---|---|---|---|---|---|
| `/` | Company | Hero key visual · 4 도메인 진열대 · 두 마스터 대칭 · 4-step Weaving 시각 · 파트너 그리드 · 푸터 시그니처 | colors-primary, type-headings, logos, symbol-mark | (없음) | Hero · DomainShowcase · MasterPair · Weaving4Step · PartnerGrid |
| `/products` | Products | 4 카드 진열대 헤더 · 4 카드 + 외부분기 마크 · 비교 표 | colors-data, type-headings, radii, store-pill | store-pill 카드 결 | ProductsShowcase · ExternalBranchCard |
| `/products/store-insight` | Products | Hero · KPI 차트 (어제 funnel) · 인터랙티브 데모 · CTA · 가설 카드 | chart-bar-sorted, chart-emphasis, chart-line-takeaway | recommendations 결 (가설 카드) | KPIChartCard |
| `/products/store-agent` | Products | Hero · live demo (D7) · how-it-works 인라인 · pricing 인라인 · 자율도 사다리 L0→L5 시각 | chart-emphasis, chart-categorical-palette, message-bubble, composer, empty-state, recommendations | **다수 재활용** — composer · message-bubble · empty-state · recommendations 그대로 | AutonomyLadder · LiveDemoSection |
| `/products/store-care` | Products → 외부분기 | Hero (점주 마스터) · 9 이모지 sprite · CTA → storecare.ai · 외부 마크 | type-headings, empty-state, store-pill | (없음) | ExternalBranchCard (Care 변주) · EmojiSprite9 |
| `/products/saai` | Products → 외부분기 | Hero · 3 카드 (POP·아카이브·시즌) · CTA → saai.store · 외부 마크 | colors-data, store-pill | (없음) | ExternalBranchCard (SAAI 변주) |
| `/technology` | Technologies | 3 기술 진열대 카드 · 카테고리어 표기 | type-headings, radii | (없음) | TechShowcase |
| `/technology/anonymizer` | Technologies | Hero (백서 톤) · 메커니즘 다이어그램 · 출처 인용 · spec 표 · FAQ 아코디언 | chart-ci-band, type-body | (없음) | TechSpecTable · TechDiagram |
| `/technology/seal` | Technologies | Hero · 5,049자 본문 · MTMC/Pre-Purchase 추가 · FAQ 5-7 종 | chart-ci-band, type-body, type-headings | (없음) | TechSpecTable · FAQAccordion |
| `/technology/spatial-ai` | Technologies | Hero · 4 메커니즘 섹션 · 좌표계 다이어그램 · CES/KDDI/NVIDIA 결과 인용 | chart-heatmap, chart-ci-band | (없음) | TechDiagram · ResultCitation |
| `/technology/models` | Vision Models | Hero · 카테고리 필터 8종 · 20+ 모델 카드 그리드 · stage marker (Live/Building/Planned) · *모델 요청* CTA | colors-data, type-family, store-pill | (없음) | ModelCatalogCard · CategoryFilter |
| `/solutions` | Products | 4 업종 카드 진열대 · 비교 표 | type-headings, radii | (없음) | SolutionsShowcase |
| `/solutions/retail` | Products | Hero · 시나리오 · before/after KPI · 점주 후기 카드 | chart-bar-sorted, chart-emphasis, message-bubble | message-bubble (후기 카드) | BeforeAfterKPI · TestimonialCard |
| `/solutions/food-beverage` | Products | (동일 패턴) | (동일) | (동일) | (동일 재사용) |
| `/solutions/drug` | Products | (동일 패턴) | (동일) | (동일) | (동일 재사용) |
| `/solutions/large-space` | Products | Hero (본사 마스터 정면) · 3 시나리오 (하이퍼마켓·몰·컨벤션) · MTMC cross-link · 본사 도입 CTA | chart-heatmap, type-headings | (없음) | LargeSpaceScenario |
| `/enterprise` | Company | Hero (본사 정면) · Golden Case 5단계 시각 · 2031 비전 · 본사 leave-behind 다운로드 | chart-emphasis, type-headings | (없음) | GoldenCase5Step · LeaveBehindGrid |
| `/pricing` | Products | 4 시작점 카드 · 시뮬레이터 UI · StoreCare 시작가 + 분기 CTA | colors-primary, store-pill, type-headings | composer 결 (시뮬레이터 입력) | StartingPointCard · PricingSimulator |
| `/pricing/simulator` | Products | 입력 폼 · 추정치 차트 · 결과 카드 | chart-bar-sorted, composer | composer | SimulatorEngine |
| `/company/about` | Company | Vision/Mission · History · 임원 카드 그리드 · 두 마스터 *대칭 거울* 다이어그램 | type-headings, type-body, logos | (없음) | ExecutiveCard · MasterMirrorDiagram |
| `/company/news` | Company | 매체 카드 그리드 (매체 로고 sprite — D10) · 88+ 외부 링크 · 카테고리 필터 | empty-state, store-pill | (없음) | MediaGrid · MediaLogoSprite |
| `/company/career` | Company | Hero (본사 변주) · *우리 팀* 섹션 (임원 사진 활용) · 채용 카드 · 영문 신설 | type-headings, store-pill | (없음) | TeamSection · CareerCard |
| `/company/partnership` | Company | Hero · 파트너 로고 그리드 · 파트너 인용 카드 | logos, store-pill | (없음) | PartnerLogoGrid · PartnerTestimonial |
| `/company/investors` | Company | Hero (마스터 정면) · 2031 비전 · 시장 좌표 · 재무 차트 · 자료 다운로드 4종 (Brand Deck·Brand Book v2·OnePage·IR Deck) · IR 컨택 | chart-emphasis, chart-line-takeaway, type-headings | (없음) | InvestorChart · DownloadGrid |
| `/resources/blog` | Company | 블로그 카드 그리드 · 카테고리 4종 · 검색 | type-headings, empty-state, store-pill | sidebar-history 결 (카테고리 사이드바) | BlogCard · CategorySidebar |
| `/resources/case-studies` | Company | 5 건 case-study 카드 + 본문 · 4-step Weaving · 점주 인용 · before/after | chart-emphasis, type-body, message-bubble | message-bubble (점주 인용) | CaseStudyHero · Weaving4StepInline |
| `/resources/docs` | Technologies | docs 사이드바 + 본문 + 코드 블록 · slug 일괄 정돈 | type-body, sidebar-history | sidebar-history 그대로 | DocsSidebar · CodeBlock |
| `/resources/glossary` | Vision Models | 용어 카드 그리드 · 카테고리 필터 | store-pill, type-family | (없음) | GlossaryCard |
| `/resources/faq` | Products | 아코디언 · 카테고리 필터 | empty-state, type-body | (없음) | FAQAccordion (재사용) |
| `/contact` | Company | Hero · 5 분기 카드 (도입·파트너·미디어·IR·일반) · 폼 · 사무실 정보 | composer, message-bubble, empty-state | composer (폼 입력 결) | ContactBranchCard · OfficeInfo |
| `/legal/privacy` · `/legal/terms` | Company | 본문 (정중·정렬) · TOC · 마지막 갱신일 | type-body, type-headings | (없음) | LegalBody · TOCSidebar |

### 4.1 매핑 요약

| 분류 | 카운트 | 비고 |
|---|---|---|
| 회사 사이트 컴포넌트 총량 (추정) | 약 40-50종 | 그 중 신설 약 30종 |
| 31 preview 카드 활용 | 약 22종 / 31 (71%) | colors·typography·radii·shadows·일부 chart·일부 UI 패턴 |
| ui_kits/store-agent 재활용 | 약 6종 / 8 (75%) | composer · message-bubble · empty-state · recommendations · sidebar-history · IconButton·Icon. Sidebar·ChatTitleBar 는 미재활용 (chat-first 결) |
| 신설 (corporate 전용) | 약 30종 | Hero · DomainShowcase · MasterPair · Weaving4Step · ExecutiveCard · MediaGrid · PartnerGrid · GoldenCase5Step · TechSpecTable · ModelCatalogCard · InvestorChart 등 — §5 의 ui_kits/corporate/ 폴더로 |

---

## 5. ui_kits/corporate/ 신설 spec

기존 `ui_kits/store-agent/` 를 reference 로, 새 `ui_kits/corporate/` 의 *목차* 만 본 v2 에서 박는다. 각 spec 의 *본문* 은 Phase 3 W2 또는 Phase 4 안에서 작성.

### 5.1 폴더 구조 제안

```
design-system/ui_kits/corporate/
├ README.md                       사용 가이드 + 4-레이어 매핑 표
├ tokens/
│  └ corporate-audience.tokens.md  Company audience 토큰 (saai-audience.css 의 audience-corporate + .layer-* 4종)
├ components/
│  ├ Hero.spec.md                  4 레이어별 변주 — Company/Products/Tech/Models
│  ├ DomainShowcase.spec.md        4 도메인 진열대 (홈 핵심)
│  ├ MasterPair.spec.md            두 마스터 대칭 거울 (about 핵심)
│  ├ Weaving4Step.spec.md          4-step Weaving 시각 (홈·case-study)
│  ├ ExecutiveCard.spec.md         임원 카드 — D10 사진 사용
│  ├ MediaGrid.spec.md             매체 카드 그리드 — D10 로고 sprite
│  ├ PartnerGrid.spec.md           파트너 카드 그리드 — D10 로고
│  ├ GoldenCase5Step.spec.md       Golden Case 5단계 — enterprise·case-study
│  ├ CaseStudyHero.spec.md         case-study 본문 hero — 5 건
│  ├ TechSpecTable.spec.md         기술 spec 표 — Technologies 레이어
│  ├ TechDiagram.spec.md           메커니즘·좌표계 다이어그램 — D10 인포그래픽 5종
│  ├ ModelCatalogCard.spec.md      Vision Model 카탈로그 카드
│  ├ DocsSidebar.spec.md           docs 사이드바 — sidebar-history 변주
│  ├ ExternalBranchCard.spec.md    외부분기 카드 (Care/SAAI) — 외부 링크 마크
│  ├ InvestorChart.spec.md         IR 자료 차트 — Company 레이어
│  ├ AutonomyLadder.spec.md        Agent 자율도 L0→L5 사다리 (D7)
│  ├ BeforeAfterKPI.spec.md        솔루션·case-study 의 before/after
│  ├ TestimonialCard.spec.md       점주 후기 — message-bubble 변주
│  ├ ContactBranchCard.spec.md     /contact 5 분기 카드
│  └ EmojiSprite9.spec.md          Care 카드 한정 9 이모지 SVG sprite
├ patterns/                       자주 쓰이는 합성 패턴 (컴포넌트 조합)
│  ├ HeroCompany.md                Company 레이어 Hero 합성
│  ├ ProductsShowcase.md           Products 진열대 합성
│  ├ TechnologyOverview.md         Tech 진열대 합성
│  ├ NewsList.md                   News 카드 그리드 합성
│  └ CaseStudyBody.md              case-study 본문 합성
└ tokens.json                      Corporate audience 토큰 JSON (Figma Tokens Studio export)
```

### 5.2 컴포넌트 spec 의 통일 헤더

각 `*.spec.md` 는 다음 5-section 헤더로 통일.

```
1. 한 줄 정의
2. 4-레이어 매핑 — Company/Products/Tech/Models 중 어느 레이어인가
3. 주요 토큰 — saai-tokens.css · saai-semantic.css 의 어떤 토큰 사용
4. 31 preview 매핑 — 카드 N장과의 관계
5. 사용 예 — 라우트 N개에서의 자리
```

본 v2 에서는 위 5 헤더의 *목차* 까지만. 실제 본문 작성은 *Phase 3 W2* 또는 Phase 4 컴포넌트 구현 직전.

### 5.3 store-agent ↔ corporate 의 관계

| 자리 | store-agent (제품 앱) | corporate (회사 사이트) |
|---|---|---|
| audience layer | `audience-plain` / `audience-analyst` | `audience-corporate` + `.layer-*` |
| 주 패턴 | chat-first (composer · message · recommendation) | hero-first (Hero · 진열대 · 카드 그리드) |
| 모션 | 메시지 streaming · 차트 reveal | 페이드인 · 카드 hover (절제) |
| 색 | One blue + data hue (차트) | One blue + data hue (차트만) — *동일* |
| 타이포 | Pretendard KR weight 400/500/700 | *동일* |
| 차트 | message 안 inline-chart-card | KPI/IR/spec 차트 (레이어별 결 다름) |
| 다크 | opt-in 전체 페이지 | Hero section 한정 |

핵심 — *토큰 SOT 는 한 자리* (saai-tokens.css · saai-semantic.css). 두 ui_kit 모두 같은 토큰 위에 서로 다른 결로 깎인다. *우산은 한 블루* 의 약속이 두 폴더에 같이 박힌다.

---

## 6. 색·타이포·차트 토큰의 회사 사이트 모드 정렬

### 6.1 색 — saai.store `#376AE2` 발견의 의미

saai.store INVENTORY §3.2 의 핵심 발견 — `/pop` 페이지의 `theme-color="#376ae2"` 가 v1 design-system 의 `blue-500` (= `#376AE2`) 과 *정확히 일치*. 4 도메인 (회사·storecare.ai·saai.store·app.deepingsource.io) 이 *이미 같은 블루를 공유하고 있다*.

이 발견의 시각 시스템적 의미는 세 가지.

1. **One blue does all the work 의 약속이 4 도메인에 자연 박힘** — 4 도메인 액센트 분리안 (Q1) 은 *기각* 권고. 회사 사이트의 `corporate-accent` 를 별도 색으로 잡지 않는다.
2. **`saai-accent · storecare-accent` 분리 토큰 미신설 권고** — 4 도메인 우산의 *시각 정체성 통일* 이 이미 박혀 있다. 새 회사 사이트의 외부분기 카드 (`/products/store-care` · `/products/saai`) 에서도 *같은 blue-500* 으로 액센트.
3. **storecare.ai INVENTORY 의 색 추출은 Phase 4 자산 확인 단계로 이관** — 본 v2 시점에는 *외부분기 카드의 액센트* 만 다루므로, storecare.ai 측의 실제 운영 색은 Phase 4 의 *외부분기 마크 합치* 트랙으로.

### 6.2 색 — 신규 semantic alias 검토 2 종

회사 사이트의 자리에서 v1 에 *없는* 의미가 등장. Tier 2 semantic 에 두 alias 추가 검토.

| 신규 alias | 값 (제안) | 자리 |
|---|---|---|
| `--color-bg-hero` | `var(--saai-grey-25)` 또는 `#FCFCFE` | Hero 섹션 배경 — 본문보다 약간 연한 톤 (Company/Products Hero) |
| `--color-bg-section-alt` | `var(--saai-grey-25)` | 섹션 교대 배경 — 페이지 길이가 긴 자리 (case-study · enterprise · solutions) |

두 alias 가 v1 의 *기존 의미 색 5종 한정* (saai-semantic.css 헤더) 룰을 깨는지 — *아니다*. 기존 5 종은 *Brand & Status 의 의미* (`--color-primary` · `--color-positive` · `--color-negative` · `--color-warning` · `--color-deep-red`) 의 룰. 신규는 *Surface 의 의미* 로 다른 자리. (단, Brand Council 한 줄 확인 필요 — Q4 의 답.)

### 6.3 타이포 — en path-prefix (D6) 대응

D6 의 `/` (en 기본) 정책에 따라 영문 카피가 첫 페이지부터 노출. v1 의 `korean_first_typography` 원칙은 어떻게 풀리는가.

| 결정 | 권고 |
|---|---|
| 영문 폰트 패밀리 | **Pretendard 한 패밀리 유지** (Pretendard 라틴 사용). Inter·Manrope 미도입 (Q2 의 답) |
| 영문 weight | 400/500/700 그대로 |
| `font-feature-settings` | `ss01` (number variant) · `cv02` (alt a) 검토 — 영문 가독성 보강 |
| 영문 heading line-height | 1.4 (heading) / 1.6 (body) — 한국어 1.5 / 1.7 보다 약간 좁힘 (영문 결) |
| 영문 letter-spacing | -0.01em (heading) — 한국어 기본값보다 약간 좁힘 |

영문 결을 별도 폰트로 깎으면 *우산의 한 결* 이 깨진다. Pretendard 한 패밀리 위에서 *line-height · letter-spacing · font-feature* 의 세 자리만 영문 변주 — *결의 통일* 과 *영문 가독성* 의 동시 달성.

### 6.4 차트 — 4 레이어별 차트 모드

CHART_DESIGN_GUIDE.md 의 8 룰은 4 레이어 모두 깨지 않는다. 단 *차트의 종류·강조 패턴·축* 은 레이어별로 다르다.

| 레이어 | 주 차트 종류 | 강조 패턴 | 축 | 출처·주석 |
|---|---|---|---|---|
| **Company (IR)** | 라인 (연도 추세) · 막대 (분기 비교) · waterfall (자본 변화) | 강조 1 시리즈 + grey baseline | 연도 (5-10 년) · 단정 0 시작 | 출처 cap/audited/forecast 명시 |
| **Products (KPI)** | 막대 (sorted) · 라인 (takeaway) · before/after 비교 | Categorical 1 (blue-500) + grey 그 외 + Δ%p 라벨 | 짧은 시간축 (주·월) | KPI 변화율의 *가설 1줄* — 자기 점검 #8 |
| **Technologies (백서)** | CI band (정확도) · heatmap (좌표·confusion) · 라인 (forecast 점선) | 회색조 + blue-500 link only | 단위 명시 · 정밀 | 결과 인용 — CES·KDDI·NVIDIA·논문 |
| **Vision Models** | (차트 미사용 — 사양 표만) | — | — | stage marker (Live/Building/Planned) |

기존 `saai-charts.css` 의 토큰은 충분. *IR 차트의 보조 토큰* (`--chart-ir-axis` · `--chart-ir-baseline`) 만 검토 — Q4 일부.

---

## 7. 신설 필요 디자인 자산

PLAN v1.1 §5.2 + ASSET_COLLECTION_v1 §1·§2 와 정합. 본 §7 는 *Phase 3 디자인 트랙* 의 자산 자리만 추림 — 촬영·로고 raw 수집 같은 외부 발주 자산은 ASSET_COLLECTION_v1 의 별도 트랙.

| 자산 | 자리 (라우트) | 트랙 | 비고 |
|---|---|---|---|
| Hero key visual (회사) | `/` | ASSET_COLLECTION §2.3 — 외부 비주얼 디자이너 | DS home 의 indeximg001.webp reference, 새 디자인 시스템 결로 재제작 |
| 4 도메인 진열대 카드 시각 | `/` · `/products` | Phase 3 W2 — 내부 디자인 | 4 카드의 시각 통일 (One blue + 카테고리어 표기) |
| 두 마스터 대칭 거울 시각 | `/` · `/company/about` | Phase 3 W2 — 내부 디자인 | 두 카피의 *대칭 거울* 다이어그램 (Master Copy Decision v1.0 §2.4) |
| 4-step Weaving 시각 | `/` · `/resources/case-studies` | Phase 3 W2 — 내부 디자인 | Brand_Copy_Master_v2 §4-step Weaving 의 시각 합성 |
| Golden Case 5단계 시각 | `/enterprise` · case-study 5건 | Phase 3 W2 — 내부 디자인 | HQ_Sales_Deck_v1 의 5단계를 시각 시퀀스로 |
| 인포그래픽 5종 | `/technology/*` | ASSET_COLLECTION §2.1 — 외부 인포그래픽 디자이너 | Anonymizer 4단계 루프 · MTMC 좌표화 · SEAL SDK 패키지 · Spatial AI · Vision Models 카테고리 8 트리 |
| 매체 로고 sprite (88+) | `/company/news` | ASSET_COLLECTION §1.3 — 내부 수집·흑백 통일 | SVG sprite 표준화 |
| 파트너 로고 sprite | `/` · `/company/partnership` | ASSET_COLLECTION §1.4 — 내부 수집·저작권 정리 | SVG sprite 표준화 |
| Vision Model 카탈로그 카드 시각 | `/technology/models` | Phase 3 W2 — 내부 디자인 | 20+ 카드의 stage marker (Live/Building/Planned) 시각 통일 |
| 자율도 사다리 L0→L5 시각 | `/products/store-agent` | Phase 3 W2 — 내부 디자인 | StoreAgent voice spec 의 자율도 사다리 (D7 live demo) |
| 영문 OG 이미지 | 전 라우트 | ASSET_COLLECTION §2.2 — 자동 생성 (Phase 4) | en/ko/jp 3 세트 |

### 7.1 자산의 *디자인 시스템 정합* 룰

위 자산이 새 디자인 시스템에 박힐 때 깨지지 않아야 할 룰 4종.

1. **색** — One blue + data hue (필요시) 만. *제 4 의 액센트 색* 금지 (4 도메인 색 분리 안 기각의 연장).
2. **타이포** — Pretendard 한 패밀리. 인포그래픽·다이어그램 안의 텍스트도 동일.
3. **그리드** — 12 col (8 col 은 Vision Models 카탈로그만). 자산 안의 그리드도 동일 비율.
4. **여백** — `--saai-space-*` 토큰의 자리 (xxs 2 / xs 4 / sm 6 / md 8 / lg 10 / xl 12 / xxl 16 / section 24 / group 32 / block 40 / page 60). 자산 안의 여백도 같은 사다리.

---

## 8. Phase 3 작업 분해

PLAN v1.1 §7 Phase 3 의 산출물 (DESIGN_v2 · ui_kits/corporate/ · dist CSS 갱신) 을 W1-W4 4 주로 분해. 본 v2 가 Phase 3 의 입력.

### 8.1 W1 — 토큰 확장 + Open Q 결재

| 일 | 작업 | 산출물 |
|---|---|---|
| 1-2 | §9 Open Q 5 종 결재 (Q1·Q2·Q3·Q4·Q5) | 결정 메모 (본 v2 의 후속) |
| 3 | `saai-audience.css` 의 `body.audience-corporate` + `.layer-*` 4 종 추가 PR | dist CSS 갱신 PR (#1) |
| 3 | `saai-semantic.css` 의 신규 alias 2 종 추가 (Q4 결과 반영) | dist CSS 갱신 PR (#2) |
| 4 | `saai-typography.css` 의 영문 변주 utility 추가 (line-height·letter-spacing·font-feature) | dist CSS 갱신 PR (#3) |
| 5 | `saai-charts.css` 의 IR 보조 토큰 검토 + PR | dist CSS 갱신 PR (#4) |

### 8.2 W2 — ui_kits/corporate/ 신설 + 컴포넌트 spec 본문

| 일 | 작업 | 산출물 |
|---|---|---|
| 1 | `ui_kits/corporate/` 폴더 신설 + README + tokens 매핑 표 | 폴더 + 색인 |
| 1-2 | §5.1 의 핵심 5 컴포넌트 spec 본문 작성 — Hero · DomainShowcase · MasterPair · Weaving4Step · ExecutiveCard | 5 종 spec.md |
| 3 | 추가 5 컴포넌트 spec — MediaGrid · PartnerGrid · GoldenCase5Step · CaseStudyHero · TechSpecTable | 5 종 spec.md |
| 4 | 나머지 spec 10종 + patterns 5 종 | 15 종 spec.md |
| 5 | tokens.json export (Figma Tokens Studio) | tokens.json |

### 8.3 W3 — 자산 가공 (병렬, ASSET_COLLECTION §3 와 정합)

| 트랙 | 작업 | 산출물 |
|---|---|---|
| A | 임원·오피스 사진 가공 — 크롭·압축·OG variant | `assets/new/people/*` · `assets/new/office/*` |
| B | 매체 로고 sprite — 88+ raw 를 흑백 통일·SVG 표준화 | `assets/new/media-logos.svg` (sprite) |
| C | 파트너 로고 sprite — raw 저작권 정리 + SVG 표준화 | `assets/new/partner-logos.svg` (sprite) |
| D | 인포그래픽 5종 SVG 제작 (외부 디자이너) | `assets/new/infographics/*.svg` |
| E | Hero key visual 1-2 종 (외부 비주얼 디자이너) | `assets/new/hero/*.webp` |

### 8.4 W4 — Phase 4 전 준비

| 일 | 작업 | 산출물 |
|---|---|---|
| 1 | `corporate.css` 단일 번들 생성 (§3.1 의 import 순서) | dist/corporate.css |
| 2 | 31 preview 카드에 *4-레이어 변주* 추가 검토 — Company/Products/Tech/Models 모드 토글 | preview 갱신 PR |
| 3 | `ui_kits/corporate/` 의 tokens.json 을 saai-tokens.json 과 merge | 통합 tokens.json |
| 4 | Phase 4 의 코드 변환 입력으로 dist CSS · ui_kits/corporate · 자산을 한 자리에서 정리 | Phase 4 입력 색인 |
| 5 | DESIGN_v2 의 잔여 항목 검수 + Phase 4 핸드오프 | 핸드오프 메모 |

---

## 9. Open Questions — Phase 3 안에서 결정 필요

본 v2 작성 시점의 *판단 권고* 와 *결재 필요* 자리를 5 종으로.

**Q1. 4 도메인 액센트 색 — 통합 1색 vs 분리 4색**
- *판단 권고* — **통합 1 색 (blue-500 = `#376AE2`).** saai.store INVENTORY §3.2 의 `theme-color` 발견이 *4 도메인이 이미 같은 블루를 공유* 함을 보여주는 결정적 단서. *One blue does all the work* 원칙을 회사 사이트에서도 깨지 않는다.
- *결재 자리* — Brand Council 한 줄 확인 (Phase 3 W1).

**Q2. 영문 폰트 — Pretendard 라틴 vs Inter / Manrope 신설**
- *판단 권고* — **Pretendard 라틴 유지.** Inter·Manrope 미도입. 영문 변주는 `font-feature-settings · line-height · letter-spacing` 3 자리에서만.
- *결재 자리* — Brand Council 한 줄 확인 (Phase 3 W1).

**Q3. Company audience 의 다크 모드 — Hero 만 dark vs 전 페이지 dark 옵션**
- *판단 권고* — **Hero section 한정 다크.** `.section-dark` 유틸리티 신설. 전 페이지 다크 옵션은 회사 사이트에 미도입 (마케팅·정보 사이트의 다크는 *읽기 부담* 증가).
- *결재 자리* — 디자인 결정 (Phase 3 W1).

**Q4. Tier 2 Semantic 의 신규 alias 추가 — `--color-bg-hero` · `--color-bg-section-alt` · `--chart-ir-axis` · `--chart-ir-baseline`**
- *판단 권고* — **추가 (Surface 의미는 기존 5 종 의미 색 룰과 직교).** IR 차트 보조 토큰은 *분리 검토 후 추가* (Company 레이어의 자리가 *진짜로* 다른지 확인 후).
- *결재 자리* — 디자인 시스템 메인테이너 결정 + 마스터 §3.2 업데이트 동반 필요 (Phase 3 W1).

**Q5. `ui_kits/corporate/` 구현 시점 — Phase 3 W2 spec 만 vs Phase 4 React 구현**
- *판단 권고* — **Phase 3 W2 = spec.md 본문 + tokens.json 까지.** React/HTML 구현은 Phase 4 의 코드 변환과 통합. 단 *핵심 5 컴포넌트* (Hero · DomainShowcase · MasterPair · Weaving4Step · ExecutiveCard) 는 *클릭스루 HTML mockup* 까지 Phase 3 W4 안에 — Phase 4 빌드의 시각 reference.
- *결재 자리* — 프로젝트 매니저 (Phase 3 W1).

---

## 10. 다음 단계

본 v2 의 출구는 세 자리.

- **Phase 3 산출물 1** — §3·§6 의 dist CSS 갱신 4 PR (audience 확장 · semantic alias · typography 영문 변주 · charts IR 토큰)
- **Phase 3 산출물 2** — `ui_kits/corporate/` 폴더 신설 + 25 spec.md + 5 patterns.md + tokens.json (§5)
- **Phase 3 산출물 3 (병렬, ASSET_COLLECTION 와 정합)** — Hero key visual · 인포그래픽 5 종 · 매체·파트너 로고 sprite · 임원·오피스 사진 가공 (§7)

본 v2 가 Phase 4 의 `docs/CODE_v1.md` 로 넘기는 입력은 다음 4 자리.

- §3 의 *13 CSS 매핑 표* → 코드의 CSS import 순서·번들 분리의 입력
- §4 의 *30 라우트 × 컴포넌트 인벤토리 표* → 코드의 컴포넌트 트리 구성의 입력
- §5 의 *ui_kits/corporate/ 25 spec* → React 컴포넌트 구현 spec
- §6 의 *색·타이포·차트 4 레이어 정렬* → 라우트 별 클래스 박는 방식 (`body.audience-corporate.layer-*`) 의 입력

본 v2 가 BRAND v2 와 cross-link 되는 자리는 세 자리.

- BRAND v2 §4 *4-레이어 보이스* ↔ 본 v2 §2.2 *4-레이어 시각 차별화 룰*
- BRAND v2 §4.2 *고정 5축 / 변주 7축* ↔ 본 v2 §2.3 *시각 매핑*
- BRAND v2 §3 *30 라우트 마스터 카피 사용처* ↔ 본 v2 §4 *30 라우트 컴포넌트 인벤토리*

본 v2 가 ASSET_COLLECTION_v1 과 cross-link 되는 자리는 §7 — 11 자산의 *수집·가공 트랙* 은 ASSET_COLLECTION_v1, *디자인 시스템 정합 룰* 은 본 v2 §7.1.

— *끝.*
