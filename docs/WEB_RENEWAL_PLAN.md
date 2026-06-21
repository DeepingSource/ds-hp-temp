# DeepingSource 웹사이트 리뉴얼 실행계획 v1

> 작성: 2026-06-20 · 기준: deepingsource.io (DS_NEW_HP) · 5개 영역 병렬 감사 종합
> 본 문서는 단일 백로그 SOT. 항목 완료 시 체크. 모든 카피 수정은 **ko/en/jp 3로케일 대칭** 적용.

---

## 0. 확정된 기준 (Decisions)

- **제품 IA (Brand Map v3.0):** 우산 **SAAI** 아래 3패밀리 — **SEED**(기술: SEAL·anonymizer·spatial AI·vision models) / **SOURCE**(도구: store count·AI POP·trend fit) / **SOLUTION**(store insight 어제·store care 지금·store agent 다음). 단계: Live=전면노출, Building=「곧 출시」 배지, Planned/Paused(space insight·talk)=숨김.
- **네이밍:** 제품명 소문자+띄어쓰기(`store insight`). 약어는 대문자(SAAI·AI·POP·SEAL·MTMC).
- **SAAI = 우산 브랜드(제품 아님).** 기존 "SAAI = B2C 콘텐츠" 자리는 **AI POP**으로 교체.
- **회사명 = DeepingSource**(붙여쓰기), 폰트 = Pretendard. *(리브랜드 "Tipping Source"/"Glacier Indifference"는 근거 없음 → 보류, 정식 브리프·폰트 파일 수령 시 별도 처리.)*
- **홈 Hero 축 = 결과 약속**("우리 매장이 대표 매장처럼" ↔ "모든 매장을 한 매장처럼" 미러), 익명화는 바로 밑 증거.
- **전체 방향:** 텍스트 최소 · 비주얼 크게 · AI 생성 티 제거 · 모바일 최우선.

---

## 1. 전사 공통 (Cross-cutting) — **가장 먼저**

### P0
- [ ] **SAAI 제품화 제거 → AI POP 통일.** 헤더만 고쳐졌고 나머지가 불일치:
  - `Footer.tsx:17` (`/products/saai` `SAAI`) → AI POP
  - `HomeView.tsx:69/75/81` (제품 ItemList `name:'SAAI'`)
  - `ProductsView.tsx:41/65/89/111/121/123/130` (4번째 카드·flowNames·paths·JSON-LD·saai.store)
  - `AboutView.tsx:83/122` ("SAAI 제품"), `SaaiView.tsx` 전체 + `app/products/saai/page.tsx`
  - SAAI는 우산 표기로만 유지. 콘텐츠 제품 라우트는 `/products/ai-pop`(또는 `#ai-pop` 앵커)로.
- [ ] **제품명 소문자화 전역 치환** (`Store Insight/Care/Agent` 스페이스 TitleCase + `StoreInsight/StoreCare/StoreAgent` CamelCase → `store insight/care/agent`). 위반 상위: StoreInsightView(22)·StoreCareView(17)·StoreAgentView(14)·CaseStudiesView(13)·PricingClientView(12)·ProductsView(10)·SolutionTimeline(10)·Footer(3) 등 42파일.
  - **주의:** 폼 value/enum·쿼리(`api/contact/route.ts:15`, `?product=StoreAgent`)는 **표시값과 전송값 분리** — 전송 enum은 건드리지 말 것.
  - UI 노출 라벨 우선: `FaqView.tsx:66-68`(탭), `CaseStudiesView.tsx:34/120/256`(차트), `MinisiteFooter.tsx:40-70`, `SolutionMockupPreview.tsx:13-15/93`.
- [ ] **회사명 통일** `Deeping Source`(스페이스) 68회 → `DeepingSource`. 확인된 핫스팟: `StoreCareView.tsx:46/63/80`, `SaaiView.tsx:37/51/65`, `EnterpriseView.tsx:100/110`.

### P1
- [ ] **익명화 슬로건 1버전 통일 + 비문 수정.** "누가**가** 아니라"(주격 중복 비문) → "**누구**가 아니라". 진원지 `brand-canon.ts:23/46/131`(세 변형 혼재). 파급: `CorporateHero.tsx:27`, `TrustCharter.tsx:29`, `CtaBand.tsx:18/23`, `AnonymizerView.tsx:54/57-59`, `StoreAgentView.tsx:71`.
- [ ] **"사람과 얼굴은 즉시 익명화"(`StoreAgentView.tsx:71`)** 재작성 → sealCharter 톤("영상은 남기지 않습니다. 신원은 즉시 지우고, 동선과 전환만 기록합니다.").
- [ ] **em-dash(—) 스타일 틱 다이어트** + "~고, ~고, ~합니다" 3·4단 병렬 복제 축소.
- [ ] **ProductCard CTA i18n 하드코딩** `ProductCard.tsx:44`(`'바로가기'/'자세히 보기'`) → 로케일화.
- [ ] **모바일 P0 버그:** `AnonymizerView.tsx:276/287` 스펙표 `overflow-hidden`+`whitespace-nowrap` → `overflow-x-auto`(잘림). 무브레이크포인트 그리드 `ProblemBeat.tsx:125`(grid-cols-6)·`not-found.tsx:53`(grid-cols-3) → 모바일 step 추가. `TechnologyView.tsx:542` text-7xl → `sm:` 가드.
- [ ] **Footer 정리:** `Company` 컬럼 한글 라벨 'Company'→'회사', 모바일 2열 그리드, 파트너십/IR 링크는 콘텐츠 정리와 연동.

---

## 2. 제품 영역

- [ ] `/products` 허브 재구성 (사인오프 IA): Hero(짧게) → 우산 프레임 1줄 → **매일 받는 답**(store insight·care·agent, Live, 큰 비주얼) → **확장 도구**(store count·AI POP·trend fit, 「곧 출시」, `#store-count`/`#ai-pop`/`#trend-fit` 앵커) → 기술 기반(SEED) 1줄+링크 → 상담 CTA.
- [ ] 기존 "세 store, 하나의 흐름" 4카드(SAAI 포함)·상단 대시보드 목업 제거.
- [ ] **SaaiView → AI POP 상세로 전환** (또는 SAAI 우산 소개로 리프레이밍, 제품 카드/CTA 제거). 묶인 3기능 분리: POP 메이커→**AI POP**, 트렌드Fit→**trend fit**(표기 교정 `SaaiView.tsx:33/47/61`), 아카이브→AI POP 하위.
- [ ] 상세뷰 텍스트 감량: StoreAgentView 9섹션 → 4~5섹션, StoreInsight Before/After 6줄 → 3줄+비주얼.
- [ ] 카드 desc 1문장화, 제품별 대표 비주얼 확대.

---

## 3. 솔루션 영역  *(이미지 0개 — 최대 작업량)*

- [ ] 6개 뷰 전부 래스터 이미지·도시컷 0개 확인 → **시각 자산 투입이 핵심.**
- [ ] Retail/F&B/Drug **동일 템플릿 중복**(아이콘만 교체) → 레이아웃 변주로 "복붙 인상" 제거.
- [ ] **MTMC 섹션(`LargeSpaceView.tsx:223-261`)** = 도시컷 1순위 투입처. "여러 카메라→하나의 공간"을 텍스트 bullet 3개 → 멀티층 부감 아이소메트릭 다이어그램.
- [ ] 시나리오 본문 1문장 축약, 익명 후기에 일러스트 아바타/실측 라벨.
- [ ] `SolutionMockupPreview.tsx:13-15/93` 제품명 PascalCase → 소문자.
- [ ] `solutionsData.ts:761` "익명화…익명화" 반복 자연화. 기존 `siteImages.ts:25 anonBeforeAfter` 미사용 자산 연결.

---

## 4. 회사 영역

- [ ] **채용(CareerView) 축소:** 가짜 포지션 9개(`:80-97/142-158/204-220`)·프로세스 섹션 삭제 → **Hero + (선택)컬처 + 메일 CTA**. heroSub: "지금 공개된 채용 공고는 없습니다. 함께하고 싶다면 언제든 먼저 이야기를 들려주세요." (CTA `:108`/`mailto`는 이미 적합 → 유지).
- [ ] **파트너십(PartnershipView) 축소:** "Our Partners" 로고 8칸(`:294-315`) 삭제, "8개 브랜드가 신뢰"(`:51/64/79`) 수치 자랑 제거 → **Hero + 프로그램3종 + 온보딩 + CTA**.
- [ ] **IR(InvestorsView) 축소:** 자료실 다운로드 4종(`:332-363`) 삭제 → 메일 1경로 수렴. CTA에 "IR Deck·브랜드 자료는 개별 요청 제공" 1줄 추가.
- [ ] **보도자료(NewsView):** 보류. 단 가짜 커버리지 5건(`:60-66`)은 실자료 확보 전까지 **임시 숨김** 검토.
- [ ] **About 정리(삭제 아님):** 면책 2개(`:79` 리더십 예시, `:90` 통계 추정) 제거, "깎기"(`:72`)→"다듬기", `:70/:183` 비문 수정, companyIntro(`:62`) 2문장 분할(모바일). 리더십 placeholder 카드 축소.

---

## 5. 요금 · 엔터프라이즈

- [ ] **요금제 단순화:** 계산기 5개 중첩(인라인+ROI+B2B+번들+상세) → **고정 3티어 카드(`B2cPlans` 유지) + 입력 1개 간단 추정 + 「맞춤 견적 문의」 CTA**. `PricingClientView.tsx:473-482`(ROI+Inline) 제거 1순위.
- [ ] **가격 단일 소스화:** `lib/pricing-data.ts` 한 곳에서만 정의(현재 4벌 분산 → 화면마다 숫자 상이 위험).
- [ ] `CameraSimulator.tsx` state 11개→3개(프리셋·제품·이메일), 냉장고/플랜 선택은 「고급 옵션」 접기.
- [ ] `PricingClientView.tsx:142-153` "SAAI 기본형"을 제품처럼 쓴 부분 수정(→ store agent 기본 등).
- [ ] **엔터프라이즈:** "전 매장을 한 화면에서"(`:66/297-315`)가 목업 2개와 모순 → 목업 1개로 정리(또는 제목을 실제와 일치). benefits 중복 카피 1줄로 압축, `<br>` 강제 줄바꿈 제거.

---

## 6. 홈 (Hero 등) — 별도 트랙

- [ ] Hero: 결과 약속 미러 + 익명화 증거 1줄 + 큰 비주얼(얼굴 없는 추적, Lottie) + CTA. 긴 CCTV 서브문장 삭제.
- [ ] 중간/마무리 섹션: 13비트 → 약 10비트 압축(제품 묶음 인접, 증거 묶음 인접, 중간 CTA 1개). 「AI 분석 예시」 데모·「필드 시나리오」 정리.
- [ ] MTMC 도식 이미지 교체 또는 삭제(현재 도식 품질 낮음, ID 박스 위치 불일치).

---

## 7. 에셋 요청 리스트 (디자이너 / 생성 AI)

> 톤: 아이소메트릭 도시컷, 무채색+blue 1포인트, 익명(얼굴 없음). 모바일 세로 버전 동반.

1. **[최우선] 대형 몰/하이퍼마켓 멀티층 부감 아이소메트릭** — MTMC 카메라 시야 통합 시각화 (LargeSpace MTMC)
2. **솔루션 히어로 와이드 도시컷** — 편의점·물류센터·몰·카페 공존 도시 부감
3. **업종 5종 아이소메트릭 썸네일** — retail/food-beverage/drug/large-space (+기타)
4. **업종별 매장 내부 아이소메트릭 4점** — 편의점(매대·야간)/카페(주방·홀)/드럭스토어(다카테고리)/대형(혼잡)
5. **시나리오 스팟 일러스트 세트** — 각 뷰 3개 시나리오
6. **익명화 전/후 비교 + 동선 히트맵** — 프라이버시 강조 (siteImages `anonBeforeAfter` 재활용 + 신규 히트맵)
7. **Hero 얼굴 없는 추적 Lottie/모션** — ID 박스가 실제 위치에 정합
8. **제품 대표 화면 캡처** — store insight 히트맵·퍼널 / store care 카카오 알림 / store agent 발주 플로우 (실데이터, 합성 도식 대체)
9. **AI POP 결과물 그리드 · trend fit 스코어 UI** — SOURCE 제품 상세용

---

## 8. 권장 실행 순서

1. **Phase 1 — 공통 P0 (1~2일):** SAAI→AI POP 통일, 제품명 소문자 전역, 회사명 통일. *(코드 일괄 치환 위주, 디자인 영향 적음)*
2. **Phase 2 — 제품 영역:** /products 허브 재구성 + SaaiView→AI POP 전환 + 상세뷰 텍스트 감량.
3. **Phase 3 — 회사 영역 축소:** 채용/파트너십/IR (placeholder 삭제, 빠른 효과).
4. **Phase 4 — 요금 단순화 + 엔터프라이즈 화면 수정.**
5. **Phase 5 — 홈 Hero·내러티브 재구성** (에셋 의존 — 7번 리스트와 병행).
6. **Phase 6 — 솔루션 이미지 투입** (에셋 납품 후) + 모바일 P0 버그 일괄 + 익명화 카피 정리.

*기술·리소스 영역은 네이밍 일괄 치환에만 포함(구조 변경 없음).*
