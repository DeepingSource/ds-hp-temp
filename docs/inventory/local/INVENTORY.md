# 로컬 자산 인벤토리 — DS_NEW_HP 워크스페이스

> 이 문서는 곧 **deepingsource.io 회사 사이트**(storecare.ai · saai.store 우산 포함)로 변환될 본 워크스페이스(`/Users/jamin.park/Downloads/DS_NEW_HP/`)가 *지금 어떤 자산을 손에 쥐고 있는가* 를 한 페이지로 정렬한다.
> 라이브 사이트 인벤토리 3종(`docs/inventory/{deepingsource.io,storecare.ai,saai.store}/INVENTORY.md`)은 *바깥에 나가 있는 것*, 본 문서는 *안에 들어 있는 것*. 두 인벤토리를 교차해야 *지을 새 집의 빈자리*가 보인다.
> 모든 추측은 **(추정)** 으로 표기. 인용은 15단어 이내 직접 인용, 그 외는 의역·요약.

---

## 1. 개요

### 1.1 자산 4대 영역

워크스페이스 루트(`DS_NEW_HP/`)는 *마케팅 카피의 풀* + *디자인 시스템의 코드* + *Next.js 코드베이스* + *콘텐츠·이미지 에셋*의 네 축으로 구성된다.

| 영역 | 폴더 | 규모 |
|---|---|---|
| 브랜드 시스템 | `brand-system/` | 41개 문서 (md/html/pdf/pptx) — 헌장·보이스·페이지 spec·카피 인벤토리·세일즈 덱·광고 시안·박람회 키트 |
| 디자인 시스템 | `design-system/` | 핵심 문서 3종 + dist CSS 13종 + preview HTML 31장 + 아이콘 33종 + 로고 7종 + 폰트 3종 + ui_kits/examples 3트랙 |
| 코드베이스 | `src/` (+ `public/`, `content/`, `assets/`) | Next.js 16 마케팅 사이트 (패키지명 `storeagent-b2c-landing`). 31개 라우트 폴더 · 17개 컴포넌트 디렉토리 · 14개 데이터 모듈 · 196편 MDX 글 |
| 정적 에셋 | `assets/`, `public/` | 톱레벨 22 브랜드/아이콘 파일 + Asset Candidate 98장 + `public/images/` 5개 카테고리(약 113 webp) + 영상 1개 |

### 1.2 코드베이스 스택

`package.json`의 `name`은 `"storeagent-b2c-landing"` — 본래 *StoreAgent 단일 제품의 B2C 랜딩페이지*로 출발한 코드라는 사실이 이름에 박혀 있다. 그러나 실제 `src/app/`은 22개 마케팅 페이지 + 4개 API + minisite 라우팅까지 포함한 *우산 사이트*로 이미 성장해 있다. 패키지명과 실제 IA의 어긋남은 새 사이트로의 전환에서 가장 먼저 정렬해야 할 자리.

스택 핵심은 다음과 같다.

- **런타임** Next.js 16.1.6 / React 19.2.3 / TypeScript 5
- **스타일** Tailwind 4 (`@tailwindcss/postcss`) + 로컬 글로벌 CSS
- **모션** framer-motion 12 — 컴포넌트 단위 인터랙션 다수
- **아이콘** lucide-react 0.574
- **콘텐츠** velite 0.3 + next-mdx-remote 6 — `content/articles/*.mdx`를 빌드 시점에 메타·본문 분리해 정적 콘텐츠 풀로 만듦
- **폼** react-hook-form 7 + zod 4 + @hookform/resolvers 5 — Contact / Newsletter / Inline form
- **폰트** geist + pretendard 패키지 (디자인 시스템은 `Pretendard KR` woff2 3종을 자체 보유)
- **테스트** vitest 3 + Testing Library — Hooks·라이브러리·API 라우트 일부에 테스트 부착

### 1.3 워크스페이스 파일 외 흔적

루트에 `docker-compose.umami.yml` (Umami 분석 self-hosting), `.vercel/`, `.next/`, `.velite/`, `.playwright-mcp/`, `.claude/`, `.gemini/`, `.bkit/`, `.pdca-status.json` 등이 있어 — 본 코드베이스가 *Vercel 배포 + Umami 분석 + Velite MDX 파이프 + Playwright/Claude/Gemini 협업 워크플로*를 거쳐 왔음을 보여준다. 본 인벤토리 범위 밖이지만 새 홈으로 옮길 때 분석/배포 인프라는 그대로 재활용 가능한 자산.

---

## 2. 브랜드 시스템 카탈로그 (41개)

`brand-system/`은 *문서 한 곳에 들어 있는 한 회사의 입과 자세*. 헌장은 외부 Notion에 있지만, 그 헌장 위에 깎인 *부속·페이지·세일즈·광고·박람회* 자산이 본 폴더에 모두 모여 있다. README.md(v1.0)에 자체 "0.1 브랜드 체계 문서" 표가 있어 *읽는 순서까지* SOT로 박힘.

핵심 척추 5종(우선 읽을 자리)부터 정리한다.

- **Brand Architecture v3.3** — *Brand Map v3.0* 의 SOT. Promise Hierarchy 6 Layer(L0 회사 ~ L5 제품) + SEED·SOURCE·SOLUTION 3 Family + strict composition 원칙 + 3-좌표제 `(Family, Domain·Function, Stage)`. v3.3에서 META 4를 *Seam · Thread · Knot · Weave*(Weaving 결)로 정식 명명, ATOMIC 12로 SOURCE family 확장.
- **Brand Brief v1.2** — 전략적 토대 (Why·What·Who·Where). 회사 정보(2018 설립, 김태훈 대표, 강남구 언주로 508 5층) + 한 줄 정체성 + Purpose·Vision·Mission·Positioning을 한 문서에 박음. 외부 에이전시·파트너·투자자·미디어용 SOT.
- **Brand Voice Guidelines v2.2** — *움직이지 않는 한 줄들*. 한 줄 정체성: "공간의 상태와 흐름을 인지하고, 필요한 일을 알려주며, 실행 결과를 학습해 운영 기준을 고도화하는 익명화 공간 AI 플랫폼." 3 척추 원칙(BLUF · 번역의 방향 · 결정은 사람의 자리) + Brand System 아키텍처 + Cross-product 일관성/변주 룰 + 12축 Voice Variation Matrix + Routing Guide.
- **Master Copy Decision v1.0** — *두 마스터 카피*를 최종 결정한 자리. 본사 **모든 매장을 한 매장처럼.** (Every store, like one.) + 점주 **우리 매장이 대표 매장처럼.** (Our store, like the best.). *처럼*의 같은 결, 다른 방향의 대칭 거울.
- **Brand Copy Master v2** — 15줄 카피 척추 (카테고리·회사 한 줄·시그니처·두 마스터·3 SOLUTION 태그라인·4-step Weaving·도발·CTA 등) + 16 SOURCE 태그라인 + Weaving 4단계의 단일 통합 인벤토리.

### 2.1 41개 문서 분류표

| 파일명 | 분류 | 버전 | 작성일 | 한 줄 요약 | 새 홈에서의 활용 (추정) |
|---|---|---|---|---|---|
| README.md | a 헌장·전략 | v1.0 | 2026-05-27 | 22 페이지 spec 매핑 + 브랜드 체계 문서 0.1 표 | `/docs/` 또는 `/about` 내부용 가이드 |
| SAAI_Brand_Architecture_v3.md | a 헌장·전략 | v3.3 | 2026-05-28 | Brand Map v3.0 — SEED·SOURCE·SOLUTION + 3-좌표제 | `/about` · `/company` · `/products` IA의 척추 |
| SAAI_Brand_Architecture_v3.html | a 헌장·전략 | v3.x | 2026-05 | 외부 공유용 Composition Map 시각화 | 투자자/파트너 페이지 임베드 후보 |
| SAAI_Brand_Brief_v1.md | a 헌장·전략 | v1.2 | 2026-05-28 | Strategic Foundation — Purpose·Vision·Promise·Architecture | `/about` Vision 섹션 본문 + 투자자 자료 |
| SAAI_External_Brand_Brief_v1.md | a 헌장·전략 | v1.2 | 2026-05-28 | At a Glance 한 페이지 정체성 + Origin 스토리 | `/about`·`/company` 외부공개판 본문 직접 활용 |
| SAAI_Brand_Voice_Guidelines_v2.md | b 보이스 | v2.2 | 2026-05-28 | umbrella 보이스 hub — 일관성/변주 룰 + 12축 매트릭스 | 모든 페이지 카피 작성·검토 SOT |
| SAAI_Brand_Voice_Store_Insight_v1.md | b 보이스 | v1.0 | — | Insight (가설) 보이스 — 가설 중심 | `/storeinsight` 또는 `/products/store-insight` |
| SAAI_Brand_Voice_StoreCare_v1.md | b 보이스 | v1.0 | — | Care 보이스 — SMB friendly, 이모지 9 허용 | `/storecare` 외부분기 카드 + storecare.ai |
| SAAI_Brand_Voice_StoreAgent_v1.md | b 보이스 | v1.0 | — | Agent 보이스 — executive English-first, L0–L5 | `/storeagent` · minisite agent.* |
| SAAI_Page_Store_Insight_v1.md | c 페이지 카피 | v1.0 | 2026-05-27 | Store Insight 페이지 spec | `/storeinsight` page.tsx 카피 입수 |
| SAAI_Page_StoreCare_v1.md | c 페이지 카피 | v1.0 | 2026-05-27 | StoreCare 페이지 spec | `/storecare` 카드 페이지 + storecare.ai 보완 |
| SAAI_Page_StoreAgent_v1.md | c 페이지 카피 | v1.0 | 2026-05-27 | StoreAgent 10 Zone 풀 카피 spec | `/storeagent` 본문 직접 활용 |
| SAAI_Page_Solutions_Group_v1.md | c 페이지 카피 | v1.0 | 2026-05-27 | Solutions·Industries·Enterprise 통합 spec | `/solutions` · `/industries[/slug]` · `/enterprise` |
| SAAI_Page_Company_Group_v1.md | c 페이지 카피 | v1.0 | 2026-05-27 | About·Company·Cases·Partnership·Contact 통합 spec | `/about` · `/company` · `/contact` 본문 직접 활용 |
| SAAI_Page_Tech_Group_v1.md | c 페이지 카피 | v1.0 | 2026-05-27 | Technology + Spatial AI 통합 spec | `/technology` · 신설 `/spatial-ai` |
| SAAI_Page_Pricing_v1.md | c 페이지 카피 | v1.0 | 2026-05-27 | 8 Zone Pricing spec — 4 시작점 + 시뮬레이터 | `/pricing` · `/pricing/simulator` |
| SAAI_Page_Reference_Group_v1.md | c 페이지 카피 | v1.0 | 2026-05-27 | FAQ·Glossary·Privacy·Terms 통합 spec | 시스템 페이지 4종 |
| SAAI_Product_Pages_Index_v1.md | c 페이지 카피 | v1.0 | 2026-05-27 | 3 제품 통합 인덱스 + 공통 골격 | 제품 페이지 그룹 IA |
| SAAI_Website_Product_Pages_Copy_Spec_v1.md | c 페이지 카피 | v1.0 | 2026-05-27 | 3 제품 통합본 (참고용) | 카피 일괄 검수 reference |
| SAAI_Website_Upgrade_Spec_v1.md | c 페이지 카피 | v1.0 | 2026-05-27 | 현 사이트 13 섹션 → 한 세트 깊이로 보강 spec (Tier A/B/C) | 전환 우선순위 결정 입력 |
| SAAI_Master_Copy_Decision_v1.md | d 마스터·메시징 | v1.0 | 2026-05-28 | 두 마스터 카피 확정 — 본사 + 점주 대칭 거울 | 전체 사이트 시그니처 자리 일괄 박음 |
| SAAI_Brand_Copy_Master_v2.md | d 마스터·메시징 | v2.0 | 2026-05-28 | 15줄 카피 척추 + Weaving 4단계 통합 인벤토리 | Hero·Footer·CTA 카피 풀 |
| SAAI_Brand_Messaging_Strategy_v1.md | d 마스터·메시징 | v1.1 | 2026-05-28 | Promise Hierarchy 6 Layer × 메시징 매트릭스 | 광고·캠페인·콘텐츠 layer 정렬 |
| SAAI_Brand_Naming_Ideation_v6.md | d 마스터·메시징 | v6 | 2026-05-28 | SOURCE 16 단일 명사 + META 4 정식 명명 | 제품·기능 네이밍 SOT |
| SAAI_Copy_Ideation_v3.md | d 마스터·메시징 | v3 | 2026-05 | 카피 아이데이션 v3 (작업 중간 산출) | 카피 보강 시 참조 풀 |
| SAAI_Copy_Inventory_Compiled.md | d 마스터·메시징 | v1.0 | 2026-05-29 | 11개 소스에서 추출한 모든 카피 통합 카탈로그 | 카피 일괄 검색·재활용 인덱스 |
| SAAI_Copy_Inventory_Solutions_Sources_v1.md | d 마스터·메시징 | v1.0 | — | Solutions/Sources 자료 인벤토리 | 솔루션 페이지 자료 풀 |
| SAAI_Brand_Book_v1.html | d 마스터·메시징 | v1 | — | Brand Book v1 외부 공유용 HTML | 외부 공유 1-pager |
| SAAI_Brand_Book_v2.html | d 마스터·메시징 | v2 | — | Brand Book v2 외부 공유용 HTML | 외부 공유 1-pager |
| SAAI_Brand_OnePage_v4.html | d 마스터·메시징 | v4 | — | 1-페이지 Brand 정리 HTML | 외부 미팅용 leave-behind |
| SAAI_Brand_Book_Image_Assets_v1.md | d 마스터·메시징 | v1.0 | — | Brand Book 이미지 자산 인벤토리 | 이미지 자산 매핑 reference |
| SAAI_Brand_Book_Key_Visual_v1.md | d 마스터·메시징 | v1.0 | — | Key Visual 가이드 | Hero key visual 생성 가이드 |
| DS_SAAI_brand_deck.pdf | e 세일즈·마케팅 | — | — | DS·SAAI 통합 브랜드 덱 (PDF) | 영업·투자자 leave-behind |
| SAAI_HQ_Sales_Deck_v1.md | e 세일즈·마케팅 | v1.0 | 2026-05-28 | 12면 본사 영업 세일즈 덱 (25–35분 발표 분량) | `/enterprise` 카피 + 영업팀 자산 |
| SAAI_HQ_Sales_Deck_v1.pptx | e 세일즈·마케팅 | v1.0 | 2026-05-28 | ↑ PPTX 버전 | 미팅용 실물 덱 |
| SAAI_Ad_Concept_Book_v1.md | e 세일즈·마케팅 | v2.1 | 2026-05-28 | 24개 광고 시안 + 6 광고 레이어 (A~F) | 광고·콘텐츠 마케팅 launch pool |
| SAAI_Owner_Campaign_Variations_v1.md | e 세일즈·마케팅 | v1.0 | 2026-05-28 | 점주 마스터 채널별 변주 16안 (카카오·인스타·페이스북·쇼츠) | B2C 캠페인 풀 |
| SAAI_Booth_Kit_Franchise_v1.md | e 세일즈·마케팅 | v2.1 | 2026-05-28 | 한국 프랜차이즈 박람회 1부스(3m × 3m) 키트 | 박람회·이벤트 자산 |
| SAAI_Design_Meeting_Pre_Read_2026-05-27.md | f 미팅·세션 | — | 2026-05-27 | 디자인 정렬 미팅 pre-read | 디자인 의사결정 기록 |
| SAAI_Brand_Ideation_Session_2026-05-28.md | f 미팅·세션 | — | 2026-05-28 | Brand Map v3.1 → v4 아이데이션 작업 문서 | 다음 v4 결정 입력 |
| SAAI_Sync_PLAN_2026-05-28.md | f 미팅·세션 | — | 2026-05-28 | 작업 sync 계획 | 일정·결정 기록 |

분류 카운트: **a 헌장·전략 5** · **b 보이스 4** · **c 페이지 카피 11** · **d 마스터·메시징 12** · **e 세일즈·마케팅 6** · **f 미팅·세션 3** — 총 41개.

### 2.2 핵심 카피 인용 (15단어 이내)

브랜드 시스템 폴더가 *말의 척추*로 박은 자리들을 그대로 옮긴다(모든 인용은 원문):

- **시그니처 5글자** — "사이를 메웁니다."
- **본사 마스터** — "모든 매장을 한 매장처럼." (영문 *Every store, like one.*)
- **점주 마스터** — "우리 매장이 대표 매장처럼." (영문 *Our store, like the best.*)
- **카테고리어** — *익명화 공간 AI / Anonymized Spatial AI / Spatial Agentic AI (SAAI)*
- **글로벌 영문 마스터** — *Perfect Every Space*
- **PR 도발** — "CCTV가, 보는 것 이상을 합니다."
- **4-step Weaving** — *Read the Seam. Follow the Thread. Tie a Knot. Weave the Next.*

세 SOLUTION 태그라인은 *어제의 사이 (Store Insight) · 지금의 사이 (StoreCare) · 다음의 사이 (StoreAgent)*. 이 한 줄들이 새 홈의 Hero·제품 카드·푸터 시그니처에 그대로 박힐 자리.

---

## 3. 디자인 시스템 카탈로그

`design-system/`은 *코드 가까이 있는 디자인의 단일 source*. 단, 본 폴더는 SAAI Plus Agent 제품군에서 출발해 매체별 layer까지 확장된 시스템이므로, deepingsource.io 회사 사이트(*마케팅 톤*)로 옮길 때는 *어느 layer를 가져가고 어느 layer를 잠그느냐* 결정이 따로 필요하다.

### 3.1 핵심 문서 4종

`design.tokens.md`는 *기계 친화 export* — `DESIGN.md alpha` 포맷으로 색·타이포·간격을 YAML 블록에 박았다. neutrals 13단 + brand blue 13단 + data hues(cyan·purple·red·yellow·green) + semantic aliases(`primary`, `bg-app`, `fg-primary`, …) + Pretendard KR/JP/EN family + 4·8 단위 간격 그리드의 *모든 값*이 한 파일에 들어 있다. 코드에 토큰으로 import할 때 SOT.

`DESIGN.md`는 *사람용 가이드*. 같은 토큰 위에 *왜 그렇게 결정했나*를 한국어 본문으로 박았다. 다섯 design_principles — **Quiet utility, not hype** · **One blue does all the work** · **Data colors stay in data** · **Tools not personas** · **Charts confirm, they don't conclude** + **Korean-first typography** — 가 결의 척추. 결을 한 줄로 옮기면 *"블룸버그 터미널과 노션 사이 어딘가의 분석 도구."* 두 문서 모두 상단에서 *원칙·룰의 단일 source는 `constitution/SAAI_MASTER.md` v1.0*임을 명시 — 본 워크스페이스 안엔 `constitution/` 폴더가 보이지 않으므로 SAAI_MASTER는 *외부에 있는 단일 헌장*으로 추정.

`CHART_DESIGN_GUIDE.md`는 데이터 시각화 가이드 v3. Tufte·Knaflic·Cleveland & McGill을 참고문헌으로 둔 학술 인용·확장 레퍼런스 — 마스터로 압축되지 않은 디테일을 보존하는 자리. 의사결정 트리(5초) + 시각 인지 기초(전주의적 속성·게슈탈트) + 차트 유형 선택표 + 색 팔레트·강조 규칙·anti-pattern 4종 차단을 담는다.

`Deepingsource_Web_Transition_Plan_v0.2.md`는 *바로 이 작업*의 상위 결정 문서. v0.1 가정과 v0.2 실측의 diff를 정리(한글 32 페이지·영문 i18n 10 페이지 이미 존재·`/cases` 통합 등) + 결정 6종(유지/재구성/외부분기/통합/삭제/신설) × 페이지 매트릭스 + 신설 6 페이지 위치 확정 + 5건 301 redirect 맵. 본 인벤토리는 v0.2 plan의 *실측 자료 보강* 역할을 한다.

### 3.2 dist/ — 13개 CSS·1 Tailwind preset·1 JSON

dist/는 *코드 import용 export*. README.md 상단에 *Track B v1.4 산출물* + *3개 매체 layer 신규* 표기가 박혀 있어 이 폴더의 위계와 출처가 명확하다.

| 파일 | 역할 |
|---|---|
| saai.css | Web 기본 — 모든 CSS 한 번에 import (다크 포함) |
| saai-fonts.css | @font-face — Pretendard KR + JP |
| saai-tokens.css | Tier 1 Primitive (`--saai-*`) |
| saai-semantic.css | Tier 2 Semantic (`--color-*`) — 라이트 |
| saai-audience.css | body 클래스 분기 (`--color-up` / `--color-down`) — 청자 모드 전환 |
| saai-charts.css | 차트 전용 (`--chart-*`) — 라이트 + 다크 |
| saai-typography.css | heading-* / body-* 유틸 + JP letter-spacing |
| saai-dark.css | 다크 모드 (opt-in 베타, v1.2) |
| saai-medium-print.css | 매체: Print Report (A4) (v1.4 신규) |
| saai-medium-ebook.css | 매체: Ebook (5.5×8.5in) (v1.4 신규) |
| saai-medium-cover.css | 매체: Cover/Marketing (v1.4 신규) |
| saai-tailwind.config.ts | Tailwind preset (darkMode 포함) |
| saai-tokens.json | Figma Tokens Studio v2 (semantic-dark·chart-dark 포함) — `$metadata.version: 1.3.0`, `tokenSetOrder: [primitive, semantic, semantic-dark, audience-plain, audience-analyst, chart, chart-dark]` |
| README.md | dist 사용 가이드 + 매체별 layer 사용법 |

새 홈에서는 *Web 기본 + 다크 베타 + cover/marketing*까지 가져가고 *print·ebook layer*는 사내 리포트/이북에 둔 채 잠그는 분리가 자연스럽다 (추정).

### 3.3 preview/ — 31장 HTML 카드 분류

`preview/`는 *한 컴포넌트가 한 카드*로 분리된 디자인 시스템 미리보기. `_card.css` 공통 셸 위에 30개 카드가 종류별로 박혀 있다.

| 종류 | 카드 (개수) |
|---|---|
| 색 (4) | card-colors-primary.html · card-colors-data.html · card-colors-grey.html · card-colors-semantic.html |
| 타이포 (3) | card-type-headings.html · card-type-body.html · card-type-family.html |
| 차트 (9) | card-chart-anti-truncated.html · card-chart-bar-sorted.html · card-chart-categorical-palette.html · card-chart-ci-band.html · card-chart-emphasis.html · card-chart-heatmap.html · card-chart-line-takeaway.html · card-chart-waterfall.html · (+ card-recommendations.html이 차트 카드 영향권) |
| 토큰·기초 (4) | card-shadows.html · card-radii.html · card-spacing.html · card-icons.html |
| UI 패턴 — 입력·결과 (4) | card-composer.html · card-buttons.html · card-empty-state.html · card-tooltip.html |
| UI 패턴 — 메시지·메뉴 (4) | card-message-bubble.html · card-menu.html · card-sidebar-history.html · card-recommendations.html |
| 브랜드 마크 (3) | card-logos.html · card-symbol-mark.html · card-store-pill.html |

차트 카드 9장이 가장 두꺼운 자리 — *takeaway 제목 · CI band · 강조 1개 · anti-pattern (truncated axis 차단)* 같은 룰을 카드별로 따로 박아 *룰의 시각 증명*까지 dist 안에 함께 들고 있다. UI 키트로 전환 시 그대로 옮길 수 있는 자산.

### 3.4 assets·fonts

- **icons** (`assets/icons/`) 33개 SVG — 화살표 8종(arrow·arrow-down·arrow-up-right·arrow-curve-left-down·arrow-right·arrow-down-left·arrow-notification·arrow-refresh), 상태 4종(completed-status·pending-status·warning·sad), 패널 제어(fold/unfold-snb-collapsed·setting·more·plus·x·bold-x·bold-popup·refresh), 콘텐츠(chart·chat·check·document·export·report·send·store·symbol·bracket·pause·apps).
- **logos** (`assets/logos/`) 7개 SVG — SAAI.svg · logo.svg · logo-with-text.svg · symbol.svg · store-agent.svg · store-care.svg · store-insight.svg.
- **fonts** (`design-system/fonts/`) 3개 woff2 — Pretendard KR Bold/Medium/Regular. (디자인 시스템이 라이브러리 의존을 줄이려 자체 보유)

### 3.5 ui_kits/examples — 3트랙

- **ui_kits/store-agent/** — 현재 README.md 한 파일. *Plus Agent UI 키트 스캐폴드*만 박혀 있고 실제 컴포넌트 export는 아직 부재 (추정 — 향후 확장 자리).
- **examples/lawson-w16/** — Lawson Weekly Report W16 샘플(`lawson_w16_saai.html`, `lawson_w16_saai.pdf`). Print Report 매체의 *실 적용 견본*.
- **examples/tf-kickoff/** — TF Kickoff 6-pager · v5 · intro의 PPTX·PDF 세트 6 파일. Cover/Marketing 매체의 견본.
- **examples/design-references/** — 외부 디자인 참고(`bmw m design example.md` · `prompt by paperlogy example.md` · `prompt by saai example.md` · `saai design example.md`) 4개 노트.

### 3.6 루트 보조 CSS

`design-system/` 루트에 `charts.css`, `colors_and_type.css` 두 파일이 따로 있다 — dist 빌드 이전의 *raw 작업 시트*로 추정. dist가 SOT가 된 이상 새 홈에는 가져갈 필요 없음 (추정).

---

## 4. 코드베이스 IA — `src/app/`

현 라우트는 23개 폴더 + 9개 시스템 파일. *3 제품 + 1 minisite + 마케팅 14 + 시스템 9*의 4축 구조.

### 4.1 라우트 매트릭스

| 경로 | 그룹 | page.tsx | 핵심 컴포넌트 의존 (추정) | 새 IA에서의 운명 (v0.2 plan 정렬, 추정) |
|---|---|---|---|---|
| `/` | 마케팅 홈 | ✓ (+ HomeHero.tsx) | sections/* 14종 + mockups/* | **재구성** — 회사 사이트의 새 Hero로 |
| `/about` | 마케팅 | ✓ | about/OriginStoryTimeline.tsx | **재구성** — Brand Brief Origin 본문 흡수 |
| `/company` | 마케팅 | ✓ | company/VisionDiagram.tsx | **재구성** — 헌장·5년 비전 |
| `/contact` | 마케팅 | ✓ + ContactFormPage.tsx + layout.tsx | ui/InlineContactForm.tsx | **유지** |
| `/enterprise` | 마케팅 | ✓ | sections/* + sales deck 흡수 | **재구성** — 본사 영업 (HQ Sales Deck 흡수) |
| `/faq` | 마케팅 | ✓ + FaqClientSection.tsx + layout.tsx | shared/FaqAccordion.tsx | **유지** |
| `/glossary` | 마케팅 | ✓ + `[slug]/page.tsx` | data/glossaryTerms.ts | **유지** |
| `/industries` | 마케팅 | ✓ + `[slug]/page.tsx` | industries/* 10 컴포넌트 + data/industryContent.ts | **유지** (재카피) |
| `/pricing` | 마케팅 | ✓ + simulator/page.tsx | pricing/* 4 컴포넌트 + lib/pricing-data.ts | **재구성** — 4 시작점 카드 페이지 |
| `/solutions` | 마케팅 | ✓ + `[slug]/page.tsx` | solutions/SolutionMockupPreview.tsx + data/solutionsData.ts | **유지** (재카피) |
| `/thank-you` | 마케팅 | ✓ | — | **유지** |
| `/storeagent` | 제품 | ✓ + blog/ + how-it-works/ + newsletter/ + pricing/ + sample/ | sections/AgentMockupShowcase + mockups/StoreInsight* + pages/StoreAgentContent.tsx | **유지·강화** — Agent 본가 |
| `/storeagent/blog` | 제품/콘텐츠 | ✓ + BlogContent.tsx + `[slug]` + layout | blog/ArticleCard·ArticleRenderer·TableOfContents 등 7종 + lib/articles.ts | **재구성 → `/blog`** (회사 블로그로 격상) |
| `/storeagent/how-it-works` | 제품 | ✓ | mockups/* + storyboard | **외부분기** (sample과 함께 saai.store 연결) |
| `/storeagent/newsletter` | 제품 | ✓ | sections/Newsletter* + ui/NewsletterForm | **외부분기 / 통합** (saai.store 자리) |
| `/storeagent/pricing` | 제품 | ✓ | pricing/* | **통합 → `/pricing`** |
| `/storeagent/sample` | 제품/체험 | ✓ + SamplePageClient.tsx + layout | mockups/* + briefingData | **외부분기 → saai.store** |
| `/storeinsight` | 제품 | ✓ | storeinsight/DeviceSwitcher · HowItWorks* + mockups/StoreInsight* | **유지** (재카피) |
| `/storecare` | 제품 | ✓ | storecare/DetectionGallery · HowItWorksStepper · DeviceSwitcher + data/storeCareScenarios | **외부분기** → storecare.ai (카드 페이지) |
| `/technology` | 기술 | ✓ | technology/AnonymizationPipeline + lib/products-data | **유지·강화** (Tech 본가) |
| `/ms-agent` | minisite 진입 | ✓ + sitemap.ts | — | **유지** (middleware의 minisite 라우팅 타깃) |
| `/privacy` | 시스템 | ✓ | — | **유지** |
| `/terms` | 시스템 | ✓ | — | **유지** |
| `error.tsx` · `not-found.tsx` · `loading.tsx` · `layout.tsx` | 시스템 | — | layout/Header·Footer | **유지** |
| `opengraph-image.tsx` · `twitter-image.tsx` · `icon.svg` · `favicon.ico` | 시스템 | — | — | **유지** (이미지 재생성) |
| `robots.ts` · `sitemap.ts` · `globals.css` | 시스템 | — | — | **유지** (재생성) |
| `/api/auth` · `/api/callback` | API | route.ts | — | **유지** (인증 흐름) |
| `/api/contact` · `/api/newsletter` | API | route.ts + route.test.ts | api-utils.ts | **유지** (폼 백엔드) |

### 4.2 storeagent 5 서브라우트의 의미

`/storeagent/{blog,newsletter,how-it-works,pricing,sample}` 5종은 *본래 StoreAgent를 B2C 랜딩페이지로 출발*한 코드(`package.json`의 `storeagent-b2c-landing`)의 흔적. v0.2 Transition Plan에 따라 — `/blog`는 *회사 블로그로 격상* · `/sample`·`/how-it-works`·`/newsletter`는 *saai.store로 외부분기 카드 페이지* · `/pricing`은 *`/pricing` 통합*. 5 서브라우트가 모두 *옮겨가거나 통합되는* 자리라는 점이 새 IA의 가장 큰 변화.

### 4.3 middleware.ts — minisite 라우팅

루트 `src/middleware.ts`는 *호스트 기반 minisite 분기*. `agent.saai.store` · `agent.local` · 프리뷰 `agent.*` 호스트는 `/` → `/ms-agent`로 rewrite, `/blog` → `/storeagent/blog` 같은 서브경로도 매핑. 메인 사이트 측 동일 redirect 표 별도 보유. `FORCE_MINISITE=true` env로 standalone 배포 모드 지원. 새 회사 사이트로 전환할 때 — minisite 호스트는 *saai.store* 운영을 위해 유지, 메인 도메인 `deepingsource.io`는 별도 분기 필요 (추정).

---

## 5. 컴포넌트 인벤토리

`src/components/`는 17개 디렉토리 + 톱레벨 `Analytics.tsx`·`HomeHero.tsx` 2개. *섹션·UI·목업·페이지별 부속* 4축 구조.

### 5.1 공용 디렉토리 (5)

- **sections/** 14개 — Hero·Comparison·FAQ·Feature·Industry·LiveDemo·Newsletter(2)·Onboarding·POSAnalysis·Pricing·ProductScrollStory·Stats·AgentMockupShowcase. *재사용 가능한 큰 블록*. 새 홈의 Hero·비교·FAQ·뉴스레터 자리에 그대로 후보.
- **ui/** 15개 — Accordion·AnimatedSection·CountUp·ExpandableCaseCard·InlineContactForm·InlineNewsletterForm·IosHomeIndicator·IosSegmentedControl·IosStatusBar·IpadStatusBar·MobileStickyBar·NewsletterForm·StaggerContainer·StaggerItem·TapIndicator. *원자/분자 컴포넌트*. iOS 상태 표시줄 5종은 mockups의 폰 프레임을 위한 부속.
- **shared/** 2개 — FaqAccordion·StepperShell. 매우 작은 공용.
- **layout/** 7개 — Footer·FooterWrapper·Header·HeaderWrapper·LandingStickyCta·MinisiteFooter·MinisiteHeader. 메인 사이트 + minisite 별도 헤더·푸터 분리가 박힌 자리. 새 홈에서는 `deepingsource.io`용 Header/Footer를 한 세트 더 분리하거나 기존 메인을 재정의 필요 (추정).
- **mockups/** 30개 — *가장 두꺼운 자리*. iPhone·Tablet·MacBook 프레임 3종 + BrowserChrome·PhoneScreen·TabletScreen + 12개 시나리오별 mockup(Action·Anonymization·Briefing·CafeTableMap·Chat·ExhibitionHeatmap·FashionVMD·LogisticsSafety·MartHeatmap·PlanogramCheck·PushNotification·UnmannedSummary) + 제품별 mockup 6종(StoreCare/StoreInsight Desktop/Tablet/Default) + ScanlineOverlay + MockupBadge · MockupImage + index.ts + types.ts. *목업 자산 자체가 디자인 시스템에 가까운 분량*. 새 홈에서 제품 페이지의 시각 자산으로 그대로 활용 가능.

### 5.2 페이지별 부속 (10)

- **about/** 1 — OriginStoryTimeline.tsx
- **company/** 1 — VisionDiagram.tsx
- **industries/** 10 — IndustryCardGrid·DeviceSwitcher·FaqSection·HeroMockup·HeroPills·MockupPreview·StatsAnimated·StatsBar (등)
- **pages/** 1 — StoreAgentContent.tsx
- **pricing/** 4 — CameraSimulator·PlanComparison·PricingCard·PricingClientView
- **solutions/** 1 — SolutionMockupPreview.tsx
- **storecare/** 3 — DetectionGallery·HowItWorksStepper·StoreCareDeviceSwitcher
- **storeinsight/** 2 — DeviceSwitcher·HowItWorksInsightStepper
- **technology/** 1 — AnonymizationPipeline.tsx
- **blog/** 7 — ArticleCard·ArticleRenderer·ArticleScrollWrapper·FloatingCta·ReadingProgress·TableOfContents·mdx-components.tsx

이 중 외부분기 결정이 내려진 제품(storecare·storeinsight 일부)의 부속은 *새 홈에서는 비활성*. 단, 시각 자산(DetectionGallery 등)은 외부분기 카드 페이지의 미리보기로 재활용 가능 (추정).

### 5.3 hooks·lib

- **hooks/** 6 — useCountUp · useMockupLoop · usePrefersReducedMotion · useScrollAnimation(+test) · useSiteMode (메인/minisite 모드 분기 추정)
- **lib/** 18 — api-utils(+test) · article-metadata · articles · company-data · easing · faq-data.tsx · minisite-copy.ts · mockup-time · mockup-tokens · prefersReducedMotion · pricing-data(+test) · products-data · slug(+test) · spring-config · timeUtils

`minisite-copy.ts`는 minisite 전용 카피 풀이 함수형으로 박힌 자리 — 새 사이트로 옮길 때 *deepingsource.io copy SOT*도 같은 패턴으로 만들지 결정 필요 (추정).

---

## 6. 데이터 인벤토리 — `src/data/`

| 파일 | 데이터 종류 (추정) | 어느 페이지에서 쓰는지 (추정) |
|---|---|---|
| briefingData.ts | StoreAgent 모닝 브리핑 샘플 | `/storeagent` · `/storeagent/sample` |
| cctvImages.ts | CCTV 입력 이미지 URL 매핑 | `/storecare` · technology · mockup |
| glossaryTerms.ts | 용어집 엔트리 | `/glossary` · `/glossary/[slug]` |
| industryContent.ts | 업종별 본문(컨텐츠) | `/industries/[slug]` |
| industryList.ts | 업종 카탈로그·메타 | `/industries` 카드 그리드 |
| posAnalysisData.ts | POS 분석 mockup 데이터 | sections/POSAnalysisSection |
| siteImages.ts | 사이트 공통 이미지 path 상수 | 전역 |
| solutionsData.ts | 솔루션 카탈로그 | `/solutions` · `/solutions/[slug]` |
| storeCareScenarios.ts | StoreCare 감지 시나리오 풀 | `/storecare` |
| storecare-page-data.ts | `/storecare` 페이지 카피·데이터 | `/storecare` |
| storeinsight-page-data.ts | `/storeinsight` 페이지 카피·데이터 | `/storeinsight` |
| articles/types.ts | velite/MDX 타입 | content/articles 파이프 |
| mockup-scenarios/ 4 | enterprise·storeagent·storecare-extended·storeinsight | 각 제품 mockup·sections |
| seasonal/ 9 | autumn·spring·summer·winter·index·compose·eventCalendar·types + catalog/{checklists,events,tips,weather} | 시즌·캘린더 콘텐츠 |

총 14개 톱레벨 + 하위 모듈. 데이터는 *카피·시각 자산을 분리해 둔* 자리 — 코드 변환에서 *카피만 갈아끼우면 새 홈으로 옮길 수 있는* 잠재력이 크다.

---

## 7. 에셋 카탈로그

### 7.1 `assets/` 톱레벨 22 파일

브랜드 마크·아이콘 핵심 8쌍(svg + png).

| 파일 | 종류 |
|---|---|
| ds_logo.svg / .png | 회사 로고 (DeepingSource) |
| ds_logo_currentcolor.svg / .png | 회사 로고 currentColor 변형 |
| saai_symbol.svg / .png | SAAI 심볼 (네 잎 클로버) |
| saai_wordmark.svg / .png | SAAI 워드마크 ("SSAAII" 더블 글자형 — 의도된 표기) |
| store-agent.svg / .png | StoreAgent 로고 |
| store-care.svg / .png | StoreCare 로고 |
| store-insight.svg / .png | StoreInsight 로고 |
| icon-completed-status.svg / .png | 상태 아이콘: 완료 |
| icon-pending-status.svg / .png | 상태 아이콘: 대기 |
| icon-pause.svg / .png | 상태 아이콘: 일시정지 |
| icon-warning.svg / .png | 상태 아이콘: 경고 |

### 7.2 `assets/Asset Candidate/` — 98개

새 사이트 후보 이미지가 모인 자리. 카테고리별로 다음과 같이 잡힌다 (파일명 기준 추정).

- **about·브랜드 시각** (5) — about-hero · about-showcase-1·3 · Logo and Concept · Operational Priorities
- **anonymization·기술 시각** (4) — Anonymized AI · Anonymizer · ai-anonymizer · anonymization-analysis
- **CCTV 픽업·도식** (3) — CCTV Pickup CVS · Heatmap · Theft Detection · Push Noti SA
- **업종 hero·dashboard** (12) — industries-cafe(hero·dashboard) · convenience(hero·dashboard) · drugstore(hero·dashboard) · exhibition(hero·dashboard) · logistics-hero · mart-hero · unmanned-hero
- **storecare 시리즈** (12) — contamination · dirty-table-2 · display · equipment · fridge-door-open · front-facing-display(+1) · hero · industry-cafe/convenience/retail/warehouse
- **storeinsight case 1–3 시리즈** (37+) — case1 action·beforeafter(5장)·chart(2장) / case2 action(8장)·beforeafter(4장)·chart(13장) / case3 action(5장)·heatmap(5장)·problem(4장) / cross-analysis · product-interaction · dashboard-sample-heatmap-and-pathway(+1) · dashboard-shelf-analysis
- **한글 파일명 도식** (10) — 모니터링 룸 · 변경 동선 예시 · 자동 POP 디자이너 · 전시 공간 변경 예시 · 전시공간 분석 · 진열 변경 예시 · 진열 변경 플로우 변경 · 창고 대시보드 · 테이블 변경 예시
- **영상** (1) — video1.mp4

이 폴더는 *아직 코드에 연결 안 된 후보군*. 새 홈에서 어떤 자산을 가져갈지 골라 `public/images/`로 옮기는 큐레이션 작업이 필요 (추정).

### 7.3 `public/images/` — 5 서브폴더 + 톱레벨

| 위치 | 파일 수 | 비고 |
|---|---|---|
| `public/images/` 톱레벨 | 약 30 webp | about-*(7) · cctv-hero-*(3) · drugstore-hero · storeagent-ai-pop-mockup · storecare-*(15+) · storeinsight-*(7+) |
| `public/images/blog/` | 0 | 비어 있음 — 블로그 글이 외부 cover 사용 또는 미생성 (추정) |
| `public/images/cctv/` | 42 webp | bakery·cafe·counter·checkout·contam-*(5종 시리즈) · cvs-entrance 등 |
| `public/images/industries/` | 29 webp | cafe·convenience·drugstore·exhibition·logistics·mart·unmanned의 hero·dashboard·sub 세트 |
| `public/images/storecare/` | 4 webp | bg-cafe · bg-convenience · bg-fashion · bg-logistics (페이지 배경용) |
| `public/images/technology/` | 6 webp | tech-anon-applied · anon-before-after · edge-device · mtmc-tracking · mtmc-wide · server-rack |

- **`public/videos/`** 1 — unmanned-security-alert.mp4
- **`public/static/`** 0 — 비어 있음 (정적 파일 캐시 자리 추정)
- **`public/admin/`** 2 — config.yml · index.html (Decap/Netlify CMS 같은 admin 진입점 흔적 — 추정)
- **`public/`** 톱레벨 — logo.svg · icon.svg · noise.svg · manifest.json · robots.txt

### 7.4 한 줄 정리

브랜드 마크·아이콘은 `assets/` + `public/`에 *두 자리에 분산*. 코드에서 import하는 자리(`public/`)와 디자인 시스템이 export하는 자리(`design-system/assets/`)를 정렬할 필요 (추정).

---

## 8. 콘텐츠 인벤토리 — `content/articles{,-md}/`

velite가 `content/articles/*.mdx`를 메타·본문 분리해 정적 콘텐츠 풀로 만든다. `content/articles-md/*.md`는 *같은 자료의 plain markdown 미러*(추정 — 머신 분석·LLM 입력용).

| 카테고리 | articles (mdx) | articles-md (md) | 새 홈에서의 매핑 (추정) |
|---|---|---|---|
| case-study | 0 | 0 | 비어 있음 — 새 홈의 `/cases` 자리가 비어 있음을 의미. v0.2 plan은 `/cases`를 `/products/saai`로 통합 결정 |
| guide | 19 | 19 | `/blog` 가이드 섹션 + saai.store archive 보강 풀 |
| insight | 73 | 73 | `/blog` insight 섹션 (가장 큰 풀) |
| season | 25 | 25 | 시즌·이벤트 코너 — saai.store 시즌 카드 ←→ 본 풀 |
| tip | 53 | 53 | `/blog` 운영 팁 |
| weekly | 26 | 26 | 스토어레터 — saai.store *trend-YYYY-MM-DD* 카드와 정렬 필요 |

총 **196 MDX 글** + 동수 md 미러. saai.store 라이브 인벤토리가 잡은 *18개 archive 글*과 비교하면 *본 풀은 약 10배 큰 큐레이션 풀*이라는 점이 핵심. saai.store는 이 풀의 *극히 일부만 노출한 상태*로 추정.

새 홈에서 — *insight·tip·season은 saai.store(B2C 점주)에 기울고, guide·case-study·weekly는 deepingsource.io(B2B 회사)의 블로그·뉴스 자리*에 더 어울린다 (추정).

---

## 9. 라이브 사이트와의 매핑 노트

라이브 인벤토리 3종을 *가볍게 교차 참조*해 다음 자리들이 잡힌다.

### 9.1 deepingsource.io ↔ 본 코드 — 컴포넌트 유사 쌍 (추정)

- 라이브 `/` (홈) ↔ `src/app/page.tsx` + `HomeHero.tsx` + `sections/Hero·Industry·LiveDemo·Comparison·POSAnalysis·Stats·Pricing·FAQ` 14종. *섹션 골격은 거의 1:1로 박혀 있으나*, 라이브는 Webflow 기반 4,325자 본문 — 본 코드 sections는 시각·인터랙션 풍부, 카피만 갈아끼우면 직결.
- 라이브 `/store-insight` (4,896자) ↔ `src/app/storeinsight/page.tsx` + `storeinsight/DeviceSwitcher·HowItWorksInsightStepper` + `mockups/StoreInsight*` 3종. *제품 페이지의 카피·mockup 둘 다 본 코드가 더 두껍다*.
- 라이브 `/storeagent` (4,913자) ↔ `src/app/storeagent/page.tsx` + `pages/StoreAgentContent.tsx` + `sections/AgentMockupShowcase`. 본 코드는 *5 서브라우트*까지 가진 *완성형*, 라이브는 한 페이지만.
- 라이브 `/seal`·`/tech-anonymizer`·`/tech-spatial-ai`·`/tech-store-care-ai` ↔ `src/app/technology/page.tsx` + `technology/AnonymizationPipeline`. 라이브는 *4 페이지 분리*, 본 코드는 *1 페이지 통합*. v0.2 plan의 `/spatial-ai` 신설 결정이 이 자리의 분리 복원.
- 라이브 `/about-us` (4,107자) ↔ `src/app/about/page.tsx` + `about/OriginStoryTimeline`. 본 코드의 Origin 타임라인이 *External Brand Brief의 Origin 본문*과 정합되면 본 코드가 더 두꺼워진다.

### 9.2 storecare.ai ↔ `src/storecare/` — 시각 차이 (추정)

storecare.ai는 *Framer 빌더 기반 5 페이지 B2C SaaS*. 시그니처 "시급 34원으로 24시간 일하는 AI 매니저" + 4 모듈(anomaly·clean·refrig·shelf) + 점주 후기 + 카카오톡 채널 CTA. 본 코드 `src/app/storecare/page.tsx`는 *1 페이지 통합본*에 가깝고 `storecare/DetectionGallery·HowItWorksStepper·DeviceSwitcher` + `data/storeCareScenarios.ts`로 풀려 있어 *기술적 깊이는 본 코드가 더 크다*. 결정: v0.2 plan에 따라 *본 코드의 `/storecare`는 카드 페이지로 축소·외부분기, 실제 운영은 storecare.ai*에서 진행. 본 코드의 시각 자산(DetectionGallery)은 외부분기 카드의 미리보기로 재활용 가능 (추정).

storeinsight 자산은 라이브가 *`/store-insight` 1 페이지(deepingsource.io 내부)*인 반면 본 코드는 `storeinsight-page-data.ts` + mockup 3종으로 *대시보드·디바이스 분기까지* 다룬 풀 — *deepingsource.io로 흡수하기 좋은 상태*.

### 9.3 saai.store ↔ `content/articles*/` — 중복 여부 (추정)

saai.store의 *18 archive 글*과 본 폴더의 *196 MDX 글*은 카테고리어가 다르다 (saai.store: 운영·아르바이트·세금·트렌드·시즌·양수도 / 본 코드: case-study·guide·insight·season·tip·weekly). 직접 매핑:

- saai.store *trend-YYYY-MM-DD*(weekly 스토어레터 5편) ↔ 본 코드 `weekly/` (26편) — *본 코드 풀이 더 크고, saai.store는 그 풀의 5편을 발행*한 상태로 추정.
- saai.store *season-buddhas-birthday* ↔ 본 코드 `season/` (25편) — 일부 중복 가능.
- saai.store *ops-·staff-·tax-·transfer-* ↔ 본 코드 `tip/` (53편)·`guide/` (19편) — 카테고리 슬러그 정렬이 필요. 본 코드가 *부모 풀*, saai.store가 *발행 큐레이션*인 비대칭 구조 (추정).

새 홈에서는 — *deepingsource.io에 회사 블로그 별도 운영(기술·기업·트렌드 위주)*, *saai.store는 점주 B2C archive 발행 채널 유지*로 분리하는 게 자연스럽다 (추정 — v0.2 plan과 정합).

---

## 10. 결론 — 새 홈 빌드의 출발선

본 인벤토리가 잡은 자산만으로 *deepingsource.io 회사 사이트의 출발 준비도*를 영역별로 정성 평가한다.

- **마케팅 카피 풀 — 약 85%** — `brand-system/` 41개가 거의 모든 페이지의 카피 spec을 보유. Master Copy Decision · Brand Copy Master · 11 페이지 spec이 갖춰져 있어 *카피는 옮겨 박는 작업*에 가깝다. 부족분 — *deepingsource.io 회사 사이트만의 IR·뉴스·채용* 카피는 별도 작성 필요 (라이브 인벤토리의 `/career`·`/news` 자리).
- **디자인 토큰 — 약 90%** — `design-system/dist/` 13 CSS + 1 Tailwind preset + 1 JSON이 *Tier 1 Primitive → Semantic → Audience → Charts → Dark → 매체 layer 3종*까지 정렬되어 있고 *constitution/SAAI_MASTER.md*(외부)를 SOT로 참조. 부족분 — 회사 사이트(마케팅 톤)용 *Cover/Marketing layer의 적용 견본*은 examples/tf-kickoff 외 마케팅 페이지 견본 부재.
- **에셋 — 약 60%** — 브랜드 마크 7종 + 아이콘 33종 + Asset Candidate 98장 + `public/images/` 약 113 webp가 있다. 부족분 — 회사 사이트(Brand Book·About·Vision·News)용 *임원·오피스·팀 사진*, *NextRise·KDDI·NVIDIA 파트너 로고 라이센스 자산*, *글로벌 영문 hero* 자산이 보이지 않음.
- **IA — 약 35%** — 현 IA는 *`storeagent-b2c-landing` 시절의 흔적*이 강하다. `/storeagent/{blog,sample,newsletter,how-it-works,pricing}` 5 서브라우트는 모두 *재배치 대상*. v0.2 plan에 따라 — `/cases` 통합 · `/products/[saai|store-insight|storeagent|storecare|seal]` 신설 · `/spatial-ai` 분리 · `/spaces` 추가 · 영문 i18n 10 페이지 · 신설 6 페이지 — 가 모두 진행 필요. *결정은 박혀 있지만 코드는 아직 안 옮겨 간 상태*.
- **코드 라우트 — 약 55%** — `src/app/` 23 폴더 중 *유지 19 + 재구성 5 + 외부분기 5 + 통합 2 + 신설 6*. 유지 비율은 높지만 *재구성 + 신설 + 외부분기*가 절반을 차지. 컴포넌트(`sections/` 14·`mockups/` 30·`ui/` 15)는 *80% 이상 재활용 가능*하나 *layout(헤더·푸터)*과 *minisite-copy 함수*는 회사 사이트용으로 한 세트 더 분기 필요.
- **콘텐츠 — 약 70%** — 196 MDX 글은 *회사 블로그의 무거운 base*. 부족분 — *case-study 0편*, *영문 글 0편* (라이브 deepingsource.io는 en·ko·jp 3 로케일).
- **i18n — 약 10%** — 본 코드는 단일 한국어. 라이브는 en·ko·jp 3 로케일 운영. 새 홈에서 영문 페이지 10개 + 일문 부분 운영을 가져가려면 *Next.js i18n routing*과 *영문 카피 신규 작성*이 큰 자리.

**한 문장 결론.** *카피 풀과 디자인 토큰은 거의 다 갖춰져 있고, 컴포넌트·목업·콘텐츠는 base가 두껍지만, IA 결정의 코드 반영 + i18n + 회사 사이트만의 자산(IR·뉴스·채용·영문 카피·임원/오피스 사진)이 새 홈 빌드의 남은 절반*.

---

## 부록 A · 라이브 사이트 인벤토리와 본 문서의 관계

| 위치 | 역할 |
|---|---|
| `docs/inventory/deepingsource.io/INVENTORY.md` | 라이브 회사 사이트 — 58 고유 경로 · 138 자산 · en·ko·jp 3 로케일의 IA·카피 |
| `docs/inventory/storecare.ai/INVENTORY.md` | 라이브 StoreCare 사이트 — Framer 빌더 · 5 페이지 · 123 자산 |
| `docs/inventory/saai.store/INVENTORY.md` | 라이브 saai.store — Vite SPA + Next.js · 21 페이지 (18 archive) |
| `docs/inventory/local/INVENTORY.md` *(본 문서)* | 본 워크스페이스(`DS_NEW_HP/`) — 41 브랜드 문서 + 디자인 시스템 + Next.js 16 코드베이스 + 196 MDX + 약 350 에셋 |

다음 작업(Task #3 *통합 마스터 플랜 v1.0*)은 위 4개 인벤토리를 *한 매트릭스*로 합쳐 — *어느 라이브 페이지를 어떤 로컬 자산으로 어떻게 짜는가*를 결정하는 자리.
