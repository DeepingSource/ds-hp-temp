# Product 영역 재편 — 구현 플랜 (spec → code)

> 스펙: `product-reorg-MASTER.md` (v14, 트랙 A·B 전 단계 확정).
> 이 문서: 확정 스펙을 **실제 코드에 적용하는 순차 구현 플랜**. 각 Phase는 독립적으로 빌드-그린·배포 가능한 단위.
> 작성: 2026-06-26 · 상태: 준비(매핑 완료, 미착수)

## 확인된 전제 (블로커 해소)
- ✅ 외부 사이트 `https://saai.store`·`https://storecare.ai` 이미 코드에서 참조(layout sameAs, SolutionTimeline, ProductsView) → nav "For owners" 외부링크(↗) 안전.
- ✅ `/products` 카피 = Keystatic `content/site/products.yaml` → `gen:content` → `generated/site-content.json`. 인덱스 카피 변경은 **yaml 편집 + `npm run gen:content`**.
- ✅ `/products/saai` 내부 페이지 유지(§7.3 라벨 중심 변경, 비주얼 유지). nav "For owners"는 외부 saai.store↗로 별도.
- ✅ `/contact?product=` 처리됨(ContactFormPage:333). productLabels(218–222)에 StoreCount 추가 필요.

## 스펙 → 파일 매핑 (touch points)
| 스펙 | 파일 | 위치 | 액션 |
|---|---|---|---|
| §5 네비 2그룹 | `layout/Header.tsx` | 19–27 NAV 배열 | 2그룹화, trend fit 제거, §7.6 라벨 |
| §5 footer | `layout/Footer.tsx` | 13–18 productLinks | 순서·그룹, store-count 추가, AI POP→saai.store |
| §7.4 인덱스 | `views/ProductsView.tsx` + `content/site/products.yaml` | LIVE/TOOL_STRUCT 38–49, 렌더 88–171 | 2-Tier 재작성 |
| §10.5 D2 루프 | **신규** `mockups/OperatingLoopGraphic.tsx` | — | 순환 SVG(데스크) / 수직 스택(모바일) |
| §7.2 insight 핸드오프 | `views/StoreInsightView.tsx` | 359 `<POSAnalysisSection/>` 제거 | 핸드오프 섹션 + 경계 한 줄 + 인라인 1줄 수정 |
| §7.1/§7.5/§7.6 care 엔터프라이즈 | `views/StoreCareView.tsx` | hero ~106 위 | 엔터프라이즈 섹션 + storecare.ai 분기 CTA |
| §10.5 D3 HQ 대시보드 | **신규** `mockups/HqRollupDashboardMockup.tsx` | — | care 엔터프라이즈 비주얼(가장 큰 작업) |
| §10.5 D4 문 분할 | **신규** `mockups/DoorSplitDiagram.tsx` | — | count↔insight 대비 SVG(공유) |
| §7.3 saai 리라벨 | `views/SaaiView.tsx` + `app/**/products/saai/page.tsx` | 53–80 | saai.store suite 라벨, trend fit=내부 기능 |
| §3 count 승격 | `views/StoreCountView.tsx` | 73– | "Expansion"→Tier1 Measure 재프레이밍 + 경계 한 줄 |
| 크로스참조 | `HomeView`, `SolutionTimeline`, `siteImages`, `ContactFormPage` | — | "AI POP" 잔존 정리, productLabels |

## 순차 Phase (각 = 빌드그린·푸시 단위)

### Phase 1 — 네비 IA + footer (기반·기계적·저위험)
- Header Products 드롭다운 → **Enterprise(count·insight·care·agent, M→A→D→A) + For owners(saai.store↗·storecare.ai↗)** 2그룹. trend fit 제거. EN/KO/JP 라벨(§7.6).
- Footer productLinks 동일 순서·2그룹, store-count 추가.
- (선택) 공유 `productNav.ts` 데이터 모듈로 라벨 SOT화.
- 검증: 3로케일 nav 2그룹 렌더, trend fit 0.

### Phase 2 — /products 2-Tier + 루프 그래픽 (D1 토큰 + D2)
- 신규 `OperatingLoopGraphic` 인라인 SVG(§10.1 토큰: brand #376AE2 단색 + 단계 아이콘 4 + 진행 틴트 언더바). D1 토큰은 globals.css에 필요분만 추가.
- ProductsView 2-Tier 재작성(루프 4카드 + For owners 2). products.yaml 히어로·카드 카피 §7.4 + trend-fit 제거 → `gen:content`.
- 검증: /products 루프+2티어, trend fit 0, 3로케일.

### Phase 3 — store insight 핸드오프 (경계 명확화)
- `<POSAnalysisSection/>` 제거 → 핸드오프 섹션(§7.2: eyebrow/headline/sub + "Powered by store agent" 카드 + 경계 한 줄 + 인라인 "→ store agent drafted…" 수정). EN+KO(§7.5)+JP(§7.6).
- 검증: POS 탭 블록 제거, 핸드오프·경계 렌더, /contact?product=StoreInsight 유지.

### Phase 4 — store care 엔터프라이즈 + D3 HQ 대시보드 (최대 작업)
- 신규 `HqRollupDashboardMockup`(§10.5 D3: 헤더·KPI4·매장 랭킹 테이블·실시간 알림 피드·유형별 막대·SEAL 배지. 상태색=심각도 한정+범례. 캡션 "샘플 화면").
- StoreCareView hero 위 엔터프라이즈 섹션(§7.1/§7.5/§7.6) + split CTA(HQ 상담 / 점주 storecare.ai↗). 기존 폰 목업은 점주 분기 영역으로.
- 검증: 엔터프라이즈 섹션+대시보드, 3로케일.

### Phase 5 — store count Measure 승격 + D4 문 분할
- 신규 `DoorSplitDiagram` 인라인 SVG(§10.5 D4: 좌 문 밖 통행·흡인율 33% / 우 문 안 히트맵·전환 퍼널, 중앙 문 화살표). count↔insight 공유.
- StoreCountView "Expansion"→Measure 재프레이밍 + 경계 한 줄. D4를 count·insight 양 페이지에 대비쌍 배치.
- 검증: count Tier1 톤, D4 양 페이지, 경계 한 줄.

### Phase 6 — saai.store 리라벨 + 크로스참조 정리
- SaaiView §7.3(nav 라벨 saai.store suite, H1 옵션, POP maker=한 툴, trend fit 내부 기능 한 줄). saai 페이지 meta 3로케일.
- HomeView·SolutionTimeline·siteImages "AI POP" 정리. ContactFormPage productLabels에 StoreCount.
- 검증: "AI POP" 제품정체성 표기 0(POP maker 기능명만), 3로케일.

## 제작 방식 (§10.3)
- D2·D4 = 인라인 SVG 컴포넌트(래스터 금지, CSS 변수 테마). 모델: `IntegratedLoopDiagram`(루프), `FunnelDiagram`(퍼널).
- D3 = HTML/컴포넌트 목업(MVP). 모델: `HqMapDashboardMockup`, `MultiStoreDashboardMockup`. 상태색 심각도 한정.
- 수치·통계는 "샘플 화면" 캡션 + 실측 아닌 값은 alt에 미포함(§10.6).

## 오픈 이슈 (스펙 §8, 비차단)
- 가격 표기 통일(insight $/care ₩/count ₩렌탈/saai Free·Pro) — 별도 과제.
- store agent 페이지: insight/saai에서 넘어오는 추천 진입 동선 보강.

## 권장 시작점
**Phase 1(네비) → Phase 2(인덱스+루프)** 가 새 IA를 즉시 가시화하는 기반. 이후 3→4→5→6.
