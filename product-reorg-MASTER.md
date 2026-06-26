# DeepingSource — Product 영역 재편 · 마스터 문서

**단일 작업 문서.** 재편 결정 → 구조 → 페이지 변경 → 확정 카피가 모두 여기 누적된다.
버전 v14 · 2026-06-26 · 상태: 트랙 A·B 전 단계 완료 · 대상: `deepingsource.io` (임시 배포: ds-hp-temp-*.vercel.app)
1차 독자: HQ · 엔터프라이즈 / 동기: 제품 라인 자체 정리

> 사용법: 각 작업은 §9 백로그 순서대로 진행하고, 산출 카피는 §7에 채워 넣는다. 이전 분리 파일(spec, care-copy)은 이 문서로 통합됨.

---

## 1. 배경 · 목표

현재 `/products`는 6개 제품을 한 평면에 나열하고 "세 시간축(insight→care→agent)"으로 묶으려 하지만, 실제로는 **3개 사업·3개 도메인**(엔터프라이즈 카메라 분석 / SMB 보안 / SMB 카메라리스 앱)이 섞여 다음 문제가 있다.

- 조직 축이 절반만 작동 — 시간축이 6개 중 3개만 설명, count·AI POP은 "Expansion tools"로 억지 배치
- `trend fit`이 네비 독립 제품 / saai.store 1단계 기능, 두 의미로 중복
- "오늘 뭘·얼마나 발주"가 insight·agent·saai 세 곳에서 중복
- `store count` ⊂ `store insight`로 보이는데 경계 설명 부재
- "AI POP" 라벨이 saai.store suite 전체를 한 툴 이름으로 축소, SAAI 브랜드와 충돌

## 2. 확정 결정 (3건)

| # | 결정 | 선택 | 근거 |
|---|---|---|---|
| ① | count를 별도 제품 vs insight 흡수 | **별도 제품 유지** | count=문 밖(상권·출점), insight=문 안(내부 최적화) |
| ② | care에 엔터프라이즈 얼굴 부여 | **부여 (dual-face)** | 1차 독자 HQ → 다점포 손실예방·컴플라이언스, 점주는 storecare.ai |
| ③ | 추천·발주 엔진 중복 | **store agent 단일화** | insight·saai 추천 블록을 agent로 집약 |

---

## 3. 새 제품 아키텍처 (2-Tier)

### Tier 1 — Enterprise Operating Loop (`deepingsource.io`, 카메라+POS)
문 밖 → 문 안 → 실시간 → 행동의 단일 루프. 산출이 다시 입력으로 피드백.

| 단계 | 제품 | 한 줄 정의 | 결정 대상 |
|---|---|---|---|
| 01 · Measure | **store count** | 문 *밖* — 상권·통행·흡인율(capture rate) | 출점·리뉴얼·타깃 |
| 02 · Analyze | **store insight** | 문 *안* — flow·dwell·conversion, 어제·왜 | 머천다이징 |
| 03 · Detect | **store care** | 지금 — 이상·도난·위생·설비 | 손실예방·컴플라이언스 |
| 04 · Act | **store agent** | 다음 — 추천·발주·자율운영 L0–L5 | 실행 |

**추천·발주 단일 엔진 = store agent.** 다른 페이지의 추천 블록은 모두 여기로 링크.

### Tier 2 — For Owners · B2C (별도 사이트, Tier 1과 시각 분리)

| 제품/사이트 | 정의 | 비고 |
|---|---|---|
| **saai.store** | 카메라리스 점주 suite · 주간 운영 루프 | 기존 "AI POP" → suite 이름 승격 |
| **storecare.ai** | store care의 점주(SMB) 얼굴 | Tier 1 Detect와 같은 제품, 두 얼굴 |

- saai.store 툴: trend fit · store letter · POP maker · planogram guide · chat · 운영 가이드 아카이브
- `trend fit` = saai 발주 기능 (네비 최상위에서 제거)

---

## 4. 제품별 라벨 (AS-IS → TO-BE)

| 제품 | AS-IS 라벨 | TO-BE 라벨 | 그룹 |
|---|---|---|---|
| store count | Footfall · capture rate | 문 밖 — 상권·통행·흡인율 (Measure) | Tier 1 |
| store insight | Reads yesterday · analytics | 문 안 — flow·dwell·conversion (Analyze) | Tier 1 |
| store care | Flags the now · detection | 지금 — 손실예방·컴플라이언스 (Detect) | Tier 1 + 2 |
| store agent | Acts on next · ops copilot | 다음 — 추천·발주·자율운영 (Act) | Tier 1 |
| AI POP (saai) | POP & content | saai.store — 점주 suite | Tier 2 |
| trend fit | Coming soon · ordering | (삭제 — saai 내부 기능) | — |

## 5. 네비게이션 IA

### Before (평면 6개)
```
Products: All / store insight / store care / store agent / store count / AI POP / trend fit
```
### After (2그룹)
```
Products
 ├ All products
 ├ ENTERPRISE — 매장 운영 루프
 │   ├ store count    · 문 밖, 상권·통행·흡인율 (Measure)
 │   ├ store insight  · 문 안, flow·dwell·conversion (Analyze)
 │   ├ store care     · 지금, 손실예방·컴플라이언스 (Detect)
 │   └ store agent    · 다음, 추천·발주·자율운영 (Act)
 └ FOR OWNERS — B2C (별도 사이트)
     ├ saai.store     · 카메라리스 점주 suite  ↗
     └ storecare.ai   · 점주용 보안·이상 알림  ↗
```
- trend fit 최상위 제거, footer 네비도 동일 순서 동기화.

## 6. 페이지별 변경 (Before / After)

| 페이지 | Before | After |
|---|---|---|
| `/products` | SOLUTION 3개 + Expansion(count·AI POP) + trend fit coming soon | Tier 1 루프 4개(M→A→D→A 순) + "For owners(B2C)" 섹션 |
| `/products/store-insight` | STOREAGENT 추천·발주 블록 포함 | 그 블록 삭제 또는 "Powered by store agent" 카드로 축소, 어제·왜까지만 (→ §7.2) |
| `/products/store-care` | SMB 단일 톤 | 엔터프라이즈 섹션 신설 + 점주는 storecare.ai 분기 (→ §7.1) |
| `/products/saai` | 라벨 "AI POP" | 라벨·H1을 saai.store suite로, trend fit=기능 표기 |
| `/products/store-count` | "Expansion tools" | Tier 1 Measure로 승격, insight와 경계 1줄 명시 |
| trend fit | 독립 앵커+네비 | 네비 제거, saai 루프 ①로만 |

---

## 7. 확정/작성 카피

### 7.1 store care — 엔터프라이즈 섹션  ✅ v1 확정 (헤드라인 A)
삽입 위치: `/products/store-care` 기존 SMB 콘텐츠 *위*. 언어: EN(현 페이지 보이스). KO는 §7.5, JP는 §7.6.

**Eyebrow** — For multi-store HQ · loss prevention & compliance

**Headline** — Every store watched to the same standard — from one screen.
> store care의 "one more employee"를 fleet으로 확장. HQ 가치는 더 많은 눈이 아니라 *하나의 표준*. "one screen"은 count·insight의 "전국 한 화면"과 라인 일치.
> _대안 B:_ One standard of watchfulness, across every store you run. _대안 C(LP 강조):_ Loss prevention that never clocks out — at one store, or a thousand.

**Subheadline** — store care puts the same trained eye on theft, hygiene, and equipment in every location — and rolls every alert up to headquarters. No raw footage, ever.

**3 pillars**
1. **Loss prevention, standardized** — Theft and after-hours anomalies caught by one consistent standard in every store — not the judgment of whoever's on shift. Patterns that repeat across locations surface on the HQ screen, so you act on the trend, not just the incident.
2. **Hygiene & equipment, on the record** — Fridge temperatures, floor spills, blocked exits, doors left open — checked around the clock and time-stamped. Turn "we're pretty sure it's fine" into an audit trail you can show.
3. **The whole fleet, one screen** — Like store count and store insight, store care rolls up to HQ. Rank stores by incidents, see which sites need a visit, and step in before a small lapse becomes a recall.

**Privacy** — Anonymized at the point of capture by SEAL. No footage is stored and identities are erased on the spot — only the events are kept. Compliance you can defend, without trading away privacy to get it.

**CTA (split)**
- Primary (HQ): **Talk to us about a fleet rollout** → `/contact?product=StoreCare`
- Secondary (owner): **Running a single store? Start on storecare.ai** → `https://storecare.ai`

**Proof strip** — 실측치만 사용(지어내지 않음). 후보: 사고 대응시간 before→after / 위생·온도 기준 충족 점포 % / 주당 fleet 이상 감지 건수.

**Meta(엔터프라이즈 변형 시)** — Title: `store care for multi-store HQ | DeepingSource — One standard, every store` · Desc: `Loss prevention, hygiene and equipment compliance across every store, rolled up to HQ on one screen. Anonymized by SEAL — no footage stored.`

### 7.2 store insight — STOREAGENT 대체 카피  ✅ v1 확정 (Step 2)
대상: `/products/store-insight` 중반의 **"POS Intelligence — AI sorts out what you should do today"** 블록(office/residential/university/nightlife 탭 + 주간매출·추천발주·오늘의 액션 브리핑). 이 블록은 store agent의 일이므로 **제거하고**, 그 자리에 아래 *경계·핸드오프* 섹션으로 교체. 언어: EN.

**왜 교체하나** — insight가 "추천 발주·오늘 할 일"까지 보여주면 agent와 중복되고 "추천은 한 곳" 원칙이 깨진다. insight는 *어제·왜*에서 멈추고, 결정·실행은 agent로 넘긴다.

**Eyebrow** — From insight to action

**Headline** — We show you why. store agent decides what to do.
> 경계를 한 문장으로. insight=원인, agent=행동. 페이지 끝 기존 CTA "See store agent"와 연결.
> _대안 B:_ Yesterday explained. Tomorrow's move lives in store agent.

**Subheadline** — store insight reads yesterday and explains it. The moment it's time to decide what to stock, restock, or staff, that's store agent — one engine for every recommendation.

**Handoff card — "Powered by store agent"**
- Title: Turn an insight into an action card
- Body: Beverage dwell up 2×? store insight flags the cause. store agent drafts the move — order quantity, supplier, timing — for your approval. One click from any insight.
- CTA: **See store agent →** → `/products/store-agent`

**경계 한 줄 (hero 또는 features 인근 배치)** — store count reads the footfall outside. store insight explains what happened inside, and why. store agent decides what to do next.
> count·insight·agent 세 제품의 역할을 한 줄로 못박아 페이지 간 혼선 제거.

**기존 인라인 문구 1줄 수정** — "AI Insight Report … → Display-expansion action card created" → **"→ store agent drafted a display-expansion action card."**
> 액션 카드 생성 주체를 agent로 귀속(중복 제거의 핵심 디테일).

### 7.3 saai.store 라벨/H1 리라이트  ✅ v1 확정 (Step 4)
대상: `/products/saai`. 변경은 **정체성·라벨 중심**(현 페이지 내부 구조는 이미 suite형이라 비주얼은 유지).

- **네비 라벨** — EN: `saai.store · Camera-less owner suite` / KO: `saai.store · 카메라리스 점주 suite` (기존 "AI POP" 폐기)
- **H1** — 현행 "From ordering to POP, in one flow." 유지 가능. 강화안:
  - _EN A:_ A store owner's whole week — in one app. / _KO A:_ 점주의 한 주 전체를, 앱 하나에.
  - _EN B(현행 유지):_ From ordering to POP, in one flow. / _KO B:_ 발주부터 POP까지, 하나의 흐름으로.
- **POP maker 위치** — suite 안의 **한 툴**로 표기(제품 정체성이 아님). "AI POP"이라는 명칭은 POP maker 기능명으로만 한정.
- **trend fit 표기 한 줄** — EN: `trend fit is the ordering step inside saai.store — not a separate product.` / KO: `trend fit은 saai.store 안의 발주 단계입니다 — 별도 제품이 아닙니다.`

### 7.4 `/products` 인덱스 — 2-Tier 재카피  ✅ v1 확정 (Step 4)
"SOLUTION / Expansion tools / coming soon" 3분할 폐기 → **운영 루프 + For owners** 2섹션.

**Hero** — Eyebrow: PRODUCTS
- _H1:_ Every store, like one. _(브랜드 태그 유지)_ / KO: 모든 매장을 한 매장처럼.
- _Sub(EN):_ Four products, one operating loop — from the footfall outside to the next move. Anonymized by SAAI. / _KO:_ 네 개의 제품, 하나의 운영 루프 — 문 밖의 통행부터 다음 한 수까지. SAAI로 익명화.

**Section 1 — Enterprise · the operating loop** (KO: 엔터프라이즈 · 매장 운영 루프)
| 제품 | EN 카드 한 줄 | KO 카드 한 줄 |
|---|---|---|
| store count · Measure | Reads the footfall outside — trade area, footfall, capture rate. | 문 밖을 읽다 — 상권·통행량·흡인율. |
| store insight · Analyze | Reads inside — flow, dwell, conversion. Yesterday, and why. | 문 안을 읽다 — 동선·체류·전환. 어제, 그리고 왜. |
| store care · Detect | Watches now — theft, hygiene, equipment, across every store. | 지금을 지키다 — 도난·위생·설비를 전 매장에서. |
| store agent · Act | Decides next — one engine for every recommendation and order. | 다음을 정하다 — 모든 추천과 발주를 하나의 엔진에서. |

**Section 2 — For owners · B2C (separate sites)** (KO: 점주를 위한 · B2C (별도 사이트))
| 사이트 | EN | KO |
|---|---|---|
| saai.store ↗ | Camera-less suite for store owners — ordering to POP. | 카메라리스 점주 suite — 발주부터 POP까지. |
| storecare.ai ↗ | Security and anomaly alerts for a single store. | 한 매장을 위한 보안·이상 알림. |

- 하단 공통 라인 유지: "SEAL · anonymizer · spatial AI · vision models — the tech that powers every product." → `/technology`
- `trend fit` "Coming soon" 최상위 카드 **제거**(saai.store 내부로).

### 7.5 KO 로컬라이즈  ✅ v1 확정 (Step 3)
§7.1·§7.2 확정 EN을 한국어 사이트(`/ko/...`) 보이스로. 직역이 아니라 현 KO 페이지 톤(차분·근거 중심·짧은 단정문) 기준. JP는 §7.6.

#### (가) store care — 엔터프라이즈 섹션 (KO)
- **Eyebrow** — 다점포 본사를 위한 · 손실예방 & 컴플라이언스
- **Headline** — 모든 매장을 같은 기준으로 지켜봅니다 — 한 화면에서.
  - _대안 B:_ 매장이 몇 개든, 지켜보는 기준은 하나. _대안 C(LP 강조):_ 멈추지 않는 손실예방 — 한 매장이든, 천 개든.
- **Subheadline** — store care는 도난·위생·설비를 모든 매장에서 같은 눈으로 살피고, 모든 알림을 본사로 모읍니다. 원본 영상은 남기지 않습니다.
- **3 기둥**
  1. **표준화된 손실예방** — 도난과 영업 외 시간 이상 징후를, 그날 누가 근무하든 같은 기준으로 감지합니다. 여러 매장에서 반복되는 패턴은 본사 화면에 떠오릅니다. 개별 사건이 아니라 추세에 대응하세요.
  2. **위생·설비, 기록으로** — 냉장 온도, 바닥 누수, 막힌 비상구, 열린 문 — 24시간 점검하고 시각을 남깁니다. "아마 괜찮겠지"를 보여줄 수 있는 감사 증빙으로 바꿉니다.
  3. **전 매장을 한 화면에** — store count·store insight처럼 store care도 본사로 모입니다. 사고 건수로 매장을 정렬하고, 방문이 필요한 곳을 가려내고, 작은 실수가 리콜이 되기 전에 개입하세요.
- **Privacy** — SEAL이 촬영하는 순간 익명화합니다. 원본은 저장하지 않고 신원은 즉시 지워지며, 사건만 남습니다. 프라이버시를 내주지 않고도 지켜내는 컴플라이언스.
- **CTA** — 본사: **다점포 도입 상담하기** → `/contact?product=StoreCare` · 점주: **한 매장만 운영하세요? storecare.ai에서 시작** → `https://storecare.ai`

#### (나) store insight — 핸드오프 (KO)
- **Eyebrow** — 분석에서 실행으로
- **Headline** — 이유는 insight가, 무엇을 할지는 store agent가 정합니다.
  - _대안 B:_ 어제를 설명합니다. 내일의 한 수는 store agent에.
- **Subheadline** — store insight는 어제를 읽고 그 이유를 설명합니다. 무엇을 채우고, 보충하고, 누구를 배치할지 정해야 하는 순간 — 그건 store agent의 일입니다. 모든 추천은 하나의 엔진에서.
- **핸드오프 카드** — 제목: 인사이트를 액션 카드로 / 본문: 음료 체류가 2배? store insight가 원인을 짚으면, store agent가 발주량·공급처·시점까지 담아 승인용 카드로 만듭니다. 어떤 인사이트에서든 클릭 한 번. / CTA: **store agent 보기 →** → `/products/store-agent`
- **경계 한 줄** — store count는 문 밖의 통행을, store insight는 문 안에서 무슨 일이 왜 일어났는지를, store agent는 다음에 무엇을 할지를 — 각각 맡습니다.

### 7.6 네비·footer 최종 라벨 + JP 로컬라이즈  ✅ v1 확정 (Step 5)

**네비/footer 라벨 (EN / KO / JP)** — 2그룹 구조 공통 적용. footer 제품 목록도 동일 순서·그룹.

| 항목 | EN | KO | JP |
|---|---|---|---|
| 그룹1 헤더 | Enterprise — operating loop | 엔터프라이즈 — 매장 운영 루프 | エンタープライズ — 店舗オペレーションループ |
| store count | Measure · footfall outside | 문 밖 · 상권·통행·흡인율 | 店の外 · 商圏・通行・捕捉率 |
| store insight | Analyze · flow·dwell·conversion | 문 안 · 동선·체류·전환 | 店の中 · 動線・滞在・転換 |
| store care | Detect · loss prevention·compliance | 지금 · 손실예방·컴플라이언스 | いま · 防損・コンプライアンス |
| store agent | Act · recommend·order | 다음 · 추천·발주·자율운영 | 次の一手 · 推奨・発注・自律運営 |
| 그룹2 헤더 | For owners — B2C (separate sites) | 점주를 위한 — B2C (별도 사이트) | 店長向け — B2C（別サイト） |
| saai.store ↗ | Camera-less owner suite | 카메라리스 점주 suite | カメラレス店長スイート |
| storecare.ai ↗ | Security & anomaly alerts | 점주용 보안·이상 알림 | 店長向けセキュリティ・異常アラート |

- `trend fit` 최상위 네비/footer에서 제거(전 언어 공통).

**JP 핵심 카피**
- _/products 히어로_ — H1: `すべての店舗を、一つの店舗のように。` / Sub: `4つのプロダクト、ひとつのオペレーションループ — 店の外の通行から、次の一手まで。SAAIで匿名化。`
- _인덱스 카드_ — count: `店の外を読む — 商圏・通行量・捕捉率。` / insight: `店の中を読む — 動線・滞在・転換。昨日と、その理由。` / care: `いまを守る — 防損・衛生・設備を全店で。` / agent: `次を決める — すべての推奨と発注をひとつのエンジンで。` / saai.store↗: `店長のためのカメラレススイート — 発注からPOPまで。` / storecare.ai↗: `一店舗のためのセキュリティ・異常アラート。`
- _store care 엔터프라이즈_ — Eyebrow: `多店舗本部向け · 防損 & コンプライアンス` / Headline: `すべての店舗を同じ基準で見守る — ひとつの画面で。` / Sub: `store care は盗難・衛生・設備をすべての店舗で同じ目で見張り、すべてのアラートを本部に集約します。元映像は残しません。`
- _store insight 핸드오프_ — Eyebrow: `分析から実行へ` / Headline: `理由は insight が、次の一手は store agent が決めます。` / Sub: `store insight は昨日を読み、その理由を説明します。何を仕入れ、補充し、誰を配置するか — それは store agent の役割。すべての推奨はひとつのエンジンから。`
- _saai.store_ — 라벨: `saai.store · カメラレス店長スイート` / trend fit: `trend fit は saai.store 内の発注ステップ — 単独プロダクトではありません。`

---

## 8. 오픈 이슈
- 가격 표기 통일: insight($/mo)·care(₩/mo)·count(₩/mo 렌탈)·saai(Free/Pro/Premium) 통화·모델 일관화 — 별도 과제
- 측정: 재편 후 `/products`→개별 제품 CTR, care 엔터프라이즈 섹션 문의 전환 추적
- store agent 페이지: 추천 엔진 흡수 → insight/saai에서 넘어오는 진입 동선 보강

## 9. 작업 백로그 (순차 진행)

**트랙 A — 구조·카피**
- [x] **Step 0** — 구조·결정 확정, 네비 IA 다이어그램
- [x] **Step 1** — store care 엔터프라이즈 섹션 카피 v1 (§7.1, 헤드라인 A 확정)
- [x] **Step 2** — store insight STOREAGENT 대체 카피 (§7.2, 헤드라인 A 확정)
- [x] **Step 3** — care·insight KO 로컬라이즈 (§7.5)
- [x] **Step 4** — saai.store 라벨/H1 리라이트(§7.3), /products 인덱스 카피(§7.4) (EN+KO)
- [x] **Step 5** — 네비·footer 라벨 최종(EN/KO/JP), JP 핵심 카피(§7.6)

**트랙 B — 디자인·이미지** (§10 계획 참조)
- [x] **Step D1** — 운영 루프 비주얼 시스템 정의 (4단계 아이콘·색·라벨 토큰) — SVG 시안 확정(§10.1)
- [x] **Step D2** — `/products` 인덱스 루프 그래픽 — 순환 레이아웃 시안 확정(§10.5)
- [x] **Step D3** — store care HQ 롤업 대시보드 목업 (다점포 사고 화면) — HTML 시안 확정(§10.5)
- [x] **Step D4** — store count "문 밖" / insight "문 안" 대비 비주얼 — 문 분할 시안 확정(§10.5)
- [x] **Step D5** — 이미지 자산 교체표 + alt·형식 원칙 확정(§10.6)
- [x] **Step D6** — 디자인 핸드오프 스펙 (토큰·컴포넌트·상태·반응형·a11y) 확정(§10.7)

## 10. 디자인 · 이미지 발전 계획

카피 재편이 끝나면 비주얼이 같은 이야기를 해야 한다. 핵심 원칙: **운영 루프(Measure→Analyze→Detect→Act)가 시각적으로도 하나의 시스템으로 읽히고, Tier 1(엔터프라이즈)과 Tier 2(점주)가 한눈에 구분될 것.**

### 10.1 비주얼 시스템 — 운영 루프 (Step D1)  ✅ v1 확정 (SVG 시안 → 토큰)
**원칙:** 루프는 **브랜드 블루 한 색 패밀리**, 단계는 **아이콘**으로 구분. 채도/명도로 위계를 만들고 무지개색은 금지. Tier 1=블루, Tier 2=중립.

| 단계 | 제품 | 배지 색 | 진행 언더바 틴트 | 아이콘 모티프 |
|---|---|---|---|---|
| 01 Measure | store count | `#376AE2` | `#C7D8F7` | 문(세로선) + 안쪽 화살표 |
| 02 Analyze | store insight | `#376AE2` | `#8FB0F0` | 3×3 히트맵 셀 |
| 03 Detect | store care | `#376AE2` | `#5C86E8` | 점 + 레이더 펄스 |
| 04 Act | store agent | `#376AE2` (강조 링) | `#2E5BD0` | 카드 + 체크 |

**토큰**
- 브랜드 블루 `#376AE2` — 배지·아이콘·화살표(전 단계 공통). 다크모드 `#5B86E8`.
- 진행 틴트 4스텝 `#C7D8F7 → #8FB0F0 → #5C86E8 → #2E5BD0` — **언더바에만** 사용(단계 진행 신호).
- 중립 `#E3E6EB` (surface `#F6F7F9`) — Tier 2·비활성.
- Act 배지에 2px 강조 링 = "추천·발주 단일 엔진" 시각 신호.
- 아이콘: 24×24 viewBox, 흰색 stroke 2px / 라운드 캡, 배지 원(r=24) 위에 36px.

**Tier 2 분리:** saai.store·storecare.ai는 중립 칩 + 외부링크(↗) 표식. 루프 칩과 채도로 구분.

### 10.2 페이지별 이미지 자산 (신규 / 수정 / 유지)

| 페이지 | 자산 | 액션 | 비고 |
|---|---|---|---|
| `/products` | 운영 루프 그래픽 | **신규(D2)** | 현 IA 다이어그램을 프로덕션 비주얼로 |
| store care | HQ 롤업 대시보드 | **신규(D3)** | 현재는 SMB 폰 목업뿐 — 다점포 사고 화면 필요 |
| store care | 기존 폰 알림 목업 | 유지 | 점주 분기 영역으로 이동 |
| store count | 문 밖 카운팅 비주얼 | 수정(D4) | insight "문 안"과 대비쌍으로 |
| store insight | 히트맵·퍼널·대시보드 | 유지 | STOREAGENT 브리핑 이미지는 **제거**(카피 §7.2) |
| saai (→saai.store) | POP/스위트 목업 | 유지 | 라벨만 suite로, 비주얼 유지 |

> 이 표는 **개요**다. 자산 슬롯·형식·alt·상태의 **단일 출처는 §10.6 교체표**. store count는 §10.6에서 "문 밖↔문 안 대비(신규 D4)" + "top-down webp(유지)"로 분리 관리.

### 10.3 신규 비주얼 — 제작 방식
- **여기서 목업 가능(Claude):** 운영 루프 그래픽(SVG), care HQ 대시보드 목업(HTML/SVG), count vs insight 대비 도식. → 시안 빠르게 반복.
- **디자인팀 핸드오프 필요:** 실사진/실데이터 스크린샷, 최종 일러스트레이션, webp 최적화·반응형 구현. → Step D6 핸드오프 스펙으로 전달.
- 사진/통계는 **실측·실데이터만**(카피 원칙과 동일, 가짜 수치 금지).

### 10.4 제작 순서
D1(시스템) → D2(인덱스 루프) → D3(care HQ 목업, 가장 손 많이 감) → D4(count/insight 대비) → D5(자산 교체·alt·webp) → D6(핸드오프). D1이 나머지의 토큰을 정의하므로 먼저.

### 10.5 확정 시안 결정 로그
- **D1 (비주얼 시스템):** 토큰 보드 형식 — 브랜드 블루 한 색 + 아이콘 4종 + 진행 틴트 언더바 + Tier 2 중립. (§10.1 토큰)
- **D2 (인덱스 그래픽):** **순환(cycle) 레이아웃 채택** — count(상)→insight(우)→care(하)→agent(좌) 시계방향, 중앙 SAAI 허브("모든 매장을 한 매장처럼 · ↻ 결과가 다시 입력으로"). 선형(D1) 대신 원형을 택한 이유: 인덱스 히어로에서 "하나의 *루프*"를 한눈에 전달하고 피드백 순환을 형태 자체로 표현. 하단에 점주(saai.store·storecare.ai) 중립 칩 분리. agent에 강조 링 유지.
- **D3 (care HQ 대시보드):** HTML 목업 — 헤더(saai|store care·HQ, 전국 240개·LIVE) → KPI 4(오늘 이상감지·위생/온도 충족%·미해결 알림·방문 필요) → 매장 랭킹 테이블(사고 건수+상태 pill) + 실시간 알림 피드(유형 자동분류) → 유형별 이상 막대 + SEAL 익명화 배지. **색 규칙:** 브랜드 블루=제품 크롬, 상태색(정상/주의/위험)은 **심각도에만** + 범례. 캡션 "샘플 화면·데이터 예시". care 페이지 엔터프라이즈 섹션(§7.1)의 "전 매장 한 화면" 비주얼로 사용.
- **D4 (count vs insight 경계):** 좌(문 밖/count)–문–우(문 안/insight) 분할 도식. 좌=통행 1,160 점 + **흡인율 33%** KPI(들어옴 382 ÷ 지나감 1,160). 중앙 문을 넘는 화살표가 "흡인율=입장/통행"을 insight로 핸드오프. 우=히트맵(동선·체류) + 전환 퍼널(입장382→체류317→구매65). 하단 경계 한 줄. §7.5 "경계 한 줄" 카피의 시각 버전. store count·store insight 페이지에 상호 대비쌍으로 배치.

---

### 10.6 이미지 자산 교체표 (Step D5)  ✅ v1 확정

**제작 형식 원칙**
- D2·D4 = **인라인 SVG 컴포넌트로 출고**(래스터 금지). 스케일·다크모드 자동 대응, 텍스트 선택·접근성 유리. CSS 변수로 테마 토큰 연결.
- D3(대시보드) = 마케팅 페이지엔 **정적 webp 스크린샷(2x)** 또는 실제 컴포넌트. MVP는 webp, `loading="lazy"`, 라이트/다크 2종.
- 신규/유지 래스터는 webp, Next/Image `sizes` 지정, hero만 `priority`, 나머지 `lazy`. 의미 없는 장식 이미지는 `alt=""`.

| 페이지 | 자산 슬롯 | 액션 | 소스 | 형식 |
|---|---|---|---|---|
| `/products` | 히어로 운영 루프 | **신규** | D2 | 인라인 SVG |
| store care | HQ 롤업 대시보드 | **신규** | D3 | webp 2x (또는 컴포넌트) |
| store care | 점주 폰 알림 목업 | 유지·이동 | 기존 | webp (점주 분기 영역) |
| store count | 문 밖↔문 안 대비 | **신규** | D4 | 인라인 SVG |
| store count | top-down 카운팅 webp | 유지 | 기존 | webp |
| store insight | 문 밖↔문 안 대비 | **신규(공유)** | D4 | 인라인 SVG |
| store insight | 히트맵·퍼널·대시보드 | 유지 | 기존 | webp |
| store insight | STOREAGENT 브리핑 이미지 | **제거** | — | (카피 §7.2) |
| saai(→saai.store) | POP/스위트 목업 | 유지 | 기존 | webp |

**alt 텍스트 (신규 비주얼, EN / KO)**
- D2 `/products` 루프 — EN: `DeepingSource operating loop: store count, insight, care and agent as a clockwise cycle around the SAAI hub.` / KO: `store count·insight·care·agent가 SAAI 허브를 중심으로 시계방향 순환을 이루는 운영 루프 다이어그램.`
- D3 care HQ 대시보드 — EN: `store care HQ dashboard: fleet-wide incidents, hygiene and temperature compliance, store ranking and a live alert feed across stores.` / KO: `전국 매장의 이상 감지·위생/온도 컴플라이언스·매장 랭킹·실시간 알림을 한 화면에 보여주는 store care 본사 대시보드.`
- D4 count↔insight — EN: `Split diagram: store count measures footfall and capture rate outside the door; store insight reads flow, dwell and conversion inside.` / KO: `문을 기준으로 store count는 문 밖의 통행·흡인율을, store insight는 문 안의 동선·체류·전환을 다루는 분할 도식.`

**alt 작성 원칙** — 무엇을 보여주는지 1문장, 제품명·핵심 지표 포함, "이미지/스크린샷" 단어 생략, 장식용은 `alt=""`. KPI 수치는 alt에 넣지 않음(시안 샘플값이므로).

### 10.7 디자인 핸드오프 스펙 (Step D6)  ✅ v1 확정
개발 전달용. 토큰은 CSS 변수로, 라이트/다크 쌍으로 정의.

**색 토큰 (light / dark)**
| 토큰 | light | dark | 용도 |
|---|---|---|---|
| `--brand` | `#376AE2` | `#5B86E8` | 배지·아이콘·화살표·CTA·링크 |
| `--brand-soft` | `#EAF0FD` | `#1F2A44` | 강조 배경·허브 |
| `--tint-1..4` | `#C7D8F7 / #8FB0F0 / #5C86E8 / #2E5BD0` | 동일 | 단계 진행(언더바 전용) |
| `--ink` / `--muted` | `#16181D` / `#6B7280` | `#EDEDEE` / `#9AA1AD` | 본문 / 보조 |
| `--surface` / `--surface-2` / `--border` | `#FFF` / `#F6F7F9` / `#E3E6EB` | `#1D1F24` / `#23262C` / `#393D45` | 면·구분선 |
| `--ok / --warn / --risk` | `#16A34A / #C2700A / #D12C2C` | (+ soft bg) | **심각도 상태에만** |

**타이포** — `--font-voice` → Inter/system. H1 28/700, H2 17/700, 카드명 15/700, 태그 10–11/700 (tracking .07em), 본문 13, 캡션 10.5. 숫자 KPI 22–46/800.
**기타** — radius: 카드/칩 12–14, pill 20, 배지 원형. 간격 8pt 그리드. 아이콘 24px viewBox, stroke 2px 흰색.

**컴포넌트**
- `StageBadge` — 원형(r24) `--brand` + 흰 아이콘(4종: measure/analyze/detect/act). variant: `emphasis`(Act, 2px 링).
- `StageChip` / `ProductCard` — 태그·제품명·한 줄. 하단 `--tint-n` 언더바(선형 레이아웃 시). state: hover(테두리 `--brand`), focus-visible.
- `LoopGraphic` — 인라인 SVG. desktop=순환(D2), mobile=수직 스택.
- `KpiCard` — 라벨+값. 값 색은 기본 `--ink`, 경고/위험 KPI만 상태색.
- `StatusPill` — `정상/주의/위험` **텍스트+색**(색 단독 금지).
- `AlertFeedItem` — 좌측 4px 심각도 바 + 제목 + 메타.
- `NavGroup` — 드롭다운 2그룹(Enterprise / For owners). For owners 항목엔 외부링크 `↗`.
- `TierTwoChip` — 중립 칩 + `↗`.

**반응형 (브레이크포인트 ~640 / ~960)**
- LoopGraphic: ≥960 순환 / 640–960 순환 유지(축소) / <640 **수직 스택**(StageChip 4개 + "↻ 결과가 다시 입력으로" 텍스트).
- HQ 대시보드: KPI 4→2→1열, 메인 2열→스택, 테이블 <640 가로 스크롤.
- 네비: 데스크톱 그룹 드롭다운 → 모바일 아코디언 2섹션.

**접근성 (WCAG 2.1 AA)**
- 대비: 본문/보조 텍스트 AA 충족 확인. `--brand` 텍스트는 대형/굵게에 한정, 소형 본문은 `--ink`.
- 포커스: `:focus-visible` 2px `--brand` 링 + 2px offset, 모든 인터랙티브.
- 색 의존 금지: 상태는 항상 텍스트 라벨 동반(StatusPill).
- 모션: `prefers-reduced-motion` 시 루프/펄스 애니메이션 정지.
- `prefers-color-scheme` 다크 토큰 필수. alt는 §10.6.
- 시맨틱: 네비 `<nav>`, 대시보드 표는 `<table>` + `<th scope>`, 히든 요약 `h2.sr-only`.

**구현 노트** — D2·D4 인라인 SVG(CSS 변수 상속). D3는 webp 2x(라이트/다크) 또는 컴포넌트. Next/Image `sizes`·hero `priority`·그 외 `lazy`.

---

## 11. 일관성 점검 결과 (v13)

**수정 완료**
1. 헤더 버전 v2 → v12(+상태 표기).
2. §7.1 교차참조 "KO/JP는 §7.3" → "KO는 §7.5, JP는 §7.6" (§7.3은 saai 라벨).
3. §7.5 "JP는 Step 5에서" → "§7.6".

**검증 통과**
- 결정 3건(§2)이 §3·§4·§5·§6·§7 전반과 충돌 없음(count 별도·care 양면·agent 단일).
- 네비 라벨(§5)과 3개 언어 라벨표(§7.6) KO 항목 일치.
- §7 소절 번호 7.1~7.6 문서 순서 오름차순.
- 비주얼 토큰(§10.1)과 핸드오프 색 토큰(§10.7) 값 일치(#376AE2 외).

**폴리시 적용 완료 (v14)**
1. ✅ KO 네비/라벨의 영어 'footfall' → "상권·통행·흡인율"로 통일(§3·§4·§5·§7.6).
2. ✅ §10.2를 개요로 명시하고 **§10.6을 자산 단일 출처**로 못박음.

**잔여 폴리시 (비차단)**
3. §7 step 태그 비단조(7.5=Step3가 7.3·7.4=Step4 뒤). 문서 순서는 정상이며 의도된 배치 — 표기 유지.
4. saai.store H1의 JP 미작성(라벨·trend fit만 번역). 필요 시 추가.
5. 백로그의 "헤드라인 A 확정"은 §7.1·§7.2의 main 헤드라인을 의미(별도 A 라벨 없음, 대안 B/C 병기).

---

## 작업 로그
- 2026-06-26 · v1 스펙 + care 카피 분리 작성 → **v2 단일 마스터로 통합·정제**, 헤드라인 A 확정.
- 2026-06-26 · v3 · Step 2 완료 — insight STOREAGENT 블록 제거 + 핸드오프 카피(§7.2), 경계 한 줄·액션카드 귀속 수정 포함.
- 2026-06-26 · v4 · Step 3 완료 — care·insight KO 로컬라이즈(§7.5). 디자인·이미지 발전 계획(§10) + 트랙 B 백로그(D1~D6) 추가.
- 2026-06-26 · v5 · Step 4 완료 — saai.store 라벨/H1(§7.3), /products 인덱스 2-Tier 재카피(§7.4) EN+KO. §7 소절 번호 정렬.
- 2026-06-26 · v6 · Step D1 완료 — 운영 루프 비주얼 시스템 SVG 시안 → 토큰 확정(§10.1): 브랜드 블루 한 색 + 단계 아이콘 4종 + 진행 틴트 + Tier 2 중립 분리.
- 2026-06-26 · v7 · Step D2 완료 — /products 인덱스 운영 루프 그래픽 순환 레이아웃 시안 확정(§10.5).
- 2026-06-26 · v8 · Step D3 완료 — store care HQ 롤업 대시보드 HTML 목업 확정(§10.5). 상태색은 심각도 한정 + 범례.
- 2026-06-26 · v9 · Step D4 완료 — count(문 밖) vs insight(문 안) 문 분할 대비 시안 확정(§10.5).
- 2026-06-26 · v10 · Step D5 완료 — 이미지 자산 교체표·형식 원칙·신규 비주얼 alt(EN/KO) 확정(§10.6).
- 2026-06-26 · v11 · Step D6 완료 — 디자인 핸드오프 스펙(토큰·컴포넌트·반응형·a11y) 확정(§10.7). **트랙 B(디자인) 전체 완료.** 잔여: 트랙 A Step 5(네비·footer 최종+JP).
- 2026-06-26 · v12 · Step 5 완료 — 네비·footer 3개 언어 라벨 + JP 핵심 카피(§7.6). **트랙 A·B 전 단계 완료.** 잔여는 §8 오픈 이슈(가격 표기 통일·측정·agent 동선)만.
- 2026-06-26 · v13 · 일관성 점검 — 헤더 버전 v2→v12, 교차참조 수정(§7.1 "KO/JP는 §7.3"→§7.5/§7.6, §7.5 "Step 5에서"→§7.6). 잔여 폴리시 권고는 §11.
- 2026-06-26 · v14 · 폴리시 ①② 반영 — KO 'footfall'→"상권·통행·흡인율" 통일, §10.6을 자산 단일 출처로 명시.
