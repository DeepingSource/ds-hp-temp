# Phase 4 — 요금·엔터프라이즈 단순화 실행계획

> 작성: 2026-06-22 · 출처: `docs/WEB_RENEWAL_PLAN.md` §5 + 코드 정찰
> 상태: **부분 착수** — P0(계산기 중첩 제거) + 엔터프라이즈 제목 정합 완료. CameraSimulator 리팩터·가격 단일소스화 잔여.
> Phase 1~3 커밋: `6ed668b`/`479a57c`/`8681639`.
> ⚠️ 착수 전 **다른 세션과의 동시 편집 충돌**을 반드시 조율할 것. pricing 파일은 한정돼 충돌 위험 높음.

## 0. 현재 상태 (verified 2026-06-22)

- `SAAI 기본형` → `store agent 기본형` **완료** (PricingClientView 3로케일, 커밋됨).
- `PricingClientView.tsx` ~471 `ROI Calculator` + ~482 `<InlinePricingSimulator />` **아직 렌더 중**.
- `CameraSimulator.tsx` `useState` **13개** (목표 3개). `selectedProducts`(:356)는 전송 페이로드(`products:` :373) — 표시 아님.
- 가격 단일 소스 **미채택**: `lib/pricing-data.ts`는 `pricing-data.test.ts`에서만 참조. 컴포넌트들이 각자 숫자 정의 → 화면 간 불일치 위험. (참고: `pricing-data.test.ts`는 4플랜 기대, 현 3플랜 → 사전 존재 실패.)
- 제품명 소문자화/네이밍은 pricing 영역 전부 완료(InlinePricingSimulator 라벨 포함).

## 1. 작업 항목 (계획서 §5 기준)

### P0 — 계산기 중첩 제거 (1순위) ✅ 완료
- [x] `PricingClientView.tsx`: **ROI Calculator 섹션 + `<InlinePricingSimulator />` 렌더 제거**. import(`RoiCalculatorWidget`·`InlinePricingSimulator`) 정리. 결과: 페르소나 토글 → B2cPlans(3티어)/B2bQuoteSimulator → Bundle Synergy CTA(맞춤견적 + `/pricing/simulator` 링크). 간단 추정은 `/pricing/simulator`(CameraSimulator) 경로로 유지.
- [ ] **고아 파일** `components/pricing/InlinePricingSimulator.tsx` — 이제 참조 0(렌더 제거로 dead). 삭제 여부 결정 필요(보류 중). `t` dict의 ROI/inline 키는 무해해 잔존(축소 시 별도 정리).
- [ ] (선택) `B2bQuoteSimulator`·번들도 과하면 「고급 옵션」 접기 — 현재는 페르소나 토글로 분리돼 1화면 1계산기라 보류.

### P1 — CameraSimulator 상태 축소
- [ ] `CameraSimulator.tsx` `useState` 13 → 3 (프리셋·제품·이메일). 냉장고 수/플랜 선택은 **「고급 옵션」 접기**(`<details>` 또는 토글)로 이동.

### P1 — 가격 단일 소스화
- [ ] `lib/pricing-data.ts`를 **유일한 가격 정의처**로. `B2cPlans`/`CameraSimulator`/`InlinePricingSimulator`(존치 시)/`PricingClientView`가 모두 여기서 읽도록 리팩터.
- [ ] `pricing-data.test.ts` 기대치(4플랜)와 실제(3플랜) **정합** — 테스트 또는 데이터 중 하나를 맞출 것.

### P1 — 엔터프라이즈 화면 정합 🟡 부분
- [x] `EnterpriseView.tsx`: 제목↔목업 모순 해소 — "전 매장을 한 화면에서" → "전 매장을, 한눈에"(en "at a glance"/jp "ひと目で"). 목업 2개(MultiStore + HqMap, 최근 개선분) **유지**, 제목을 실제와 일치(계획서 허용안).
- [ ] benefits 중복 카피 1줄 압축, `<br>` 강제 줄바꿈 제거 — 주관적 편집이라 보류.

## 2. 검증
- 각 단계 후 `npx tsc --noEmit` + `npm run build` 그린 유지.
- 3로케일(ko/en/jp) 숫자·라벨 대칭 확인. 단일 소스화 후 **화면 간 가격 일치** 수동 확인.
- `npm run test`의 `pricing-data.test.ts` 통과(현재 사전 실패 상태 해소).

## 3. 리스크
- pricing 파일은 상호 의존(공유 `t`/`Content` 타입, `PricingClientView`가 하위 시뮬레이터에 props 전달) → 부분 제거 시 타입/렌더 회귀 주의.
- 단일 소스 마이그레이션은 숫자 이동 리스크 — 이전/이후 표시 가격 diff를 명시적으로 대조할 것.
- "고정 3티어"가 무엇인지(B2cPlans 현 3티어 유지) 및 "간단 추정 입력 1개"의 입력 항목은 제품 결정 — 착수 전 확인 권장.

---

## 부록 — 잔여 작업 상세 실행계획 (2026-06-22 정찰 기반)

> 정찰 2건 완료: (1) 가격 숫자 분산 감사, (2) CameraSimulator state 맵.

### ✅ 결정됨 (2026-06-22) — store insight 가격 = **공식 `29,000 + 15,000×카메라수`** 정답
> Step B에서 B2cPlans 표기(현 100,000원 고정)를 공식 기반(예: "8대 149,000원~")으로 수정해 통일. CameraSimulator 공식은 그대로 유지.

### ⛔ (해소됨) store insight 가격 불일치 — 기록용
- `B2cPlans.tsx:93` = **100,000원** (8대 기준 고정 표기).
- `CameraSimulator.tsx:17-18` = `INSIGHT_BASE 29,000 + INSIGHT_PER_CAM 15,000 × 카메라수` → 8대 = **149,000원**.
- 두 값이 화면마다 다름. **단일소스화 전에 정답 숫자(또는 공식)를 확정**해야 함. 가능한 해법: (a) 100,000 고정을 정답으로 → CameraSimulator 공식을 100k에 맞게 보정, (b) 공식(29k+15k×n)을 정답으로 → B2cPlans 표기를 공식 기반으로, (c) 실제 사업 숫자 별도 제공.
- 그 외 숫자는 대체로 정합(care basic 14,900 / plus 24,500 / agent std 15,000 / prem 25,000 / 일 500·833원).

### 현 상태 정정
- `pricing-data.ts`는 4플랜(free/standard/premium/enterprise) 보유, **테스트 통과**(이전 메모 "4↔3 불일치"는 오기). 단 이 파일은 **홈 `PricingSection.tsx`에서만** 사용 — /pricing 계산기들은 자체 상수 사용(= drift 원인).

### ✅ 진행 요약 (2026-06-22)
- Step A 완료(`22e082c`): CameraSimulator 13→3 + 고급옵션. Playwright 검증(추정 불변·프리셋 동기).
- Step B 완료(`126a208`): pricing-data.ts 단일소스(B2C_PRICING/B2B_PRICING), 계산기 import, B2cPlans insight 100,000→149,000(공식). vitest 6/6.
- Step C 완료(`5e53be9`): 고아 InlinePricingSimulator 삭제.
- ⏳ 잔여: **B2cPlans care '10,000원~' 결정**(실제 basic 14,900보다 낮음 — 공개가 인상 승인 필요), Step D(Enterprise 카피, 주관).

### Step A — CameraSimulator state 13→3 (저위험, 결정 불필요) ⬅ 먼저 가능
- 13 useState → **3 객체**: `preset{cameraCount,fridgeCount,activePreset}` · `product{useCare,useInsight,useAgent,carePlan,agentPlan,showAdvanced}` · `email{quoteEmail,quoteSubmitted,isSubmitting,error}`.
- **냉장고 슬라이더(446-469) + Step3 플랜 선택(570-648)** → `<details>` 「고급 옵션」으로 이동(`showAdvanced` 토글).
- `estimate`(316) · `selectedProducts`(356) memo의 deps 배열을 새 객체 경로로 갱신. `noneSelected`(354)·`handlePreset`(299-314, 카메라+냉장고 원자적 기록) 참조 일괄 수정.
- **불변식**: 동일 입력 → 동일 estimate 숫자. 가격 상수/공식은 그대로(이 단계는 순수 state 구조 변경). 리팩터 전후 대표 입력 3종의 monthly/oneTime 수치 대조.
- 검증: tsc + build + /pricing/simulator 수동 동작(프리셋 클릭→슬라이더 동기, 고급옵션 접힘/펼침, 합계 일치).

### Step B — 가격 단일소스화 (Step A 후, 선결 결정 필요)
- `pricing-data.ts`에 `B2C_PRICING`/`B2B_PRICING`/스케일링 상수 추가(정찰 §5 스키마 참고).
- `CameraSimulator`·`B2cPlans`·`B2bQuoteSimulator`가 인라인 리터럴 대신 import. store insight 충돌은 선결 결정값으로 통일.
- `pricing-data.test.ts`에 신규 상수 검증 추가.
- 검증: 모든 화면 가격이 단일 소스와 일치(수동 대조).

### Step C — 고아 정리
- `InlinePricingSimulator.tsx`(참조 0) 삭제. `PricingClientView` C dict의 ROI/inline 전용 키 정리.

### Step D — Enterprise 카피 (주관, 선택)
- benefits 중복 카피 1줄 압축, 불필요 `<br>`(224/403 등 무조건 줄바꿈) 제거.

### 권장 순서
A(지금) → [store insight 가격 결정] → B → C → D. A는 결정과 무관하므로 즉시 착수 가능.
