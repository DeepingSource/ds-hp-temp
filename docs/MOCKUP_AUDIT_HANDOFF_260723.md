> **[닫힘 2026-07-23]** 다음 단계 1~5 완료. 이 문서는 `docs/MOCKUP_MASTER_PLAN_v1.md`로 대체됨 (Jamin 결정 D5).

# 목업 시스템 검수 핸드오프 (2026-07-23)

> 이전 Cowork 세션(클라우드)에서 진행하던 작업의 인수인계 문서.
> 배경 계획서: `docs/MOCKUP_SYSTEM_V2_PLAN_v1.md` (같은 날 작성 — 4개 계약 아키텍처 + Phase 계획, Jamin 승인된 결정 D1~D4 포함)
> 이 세션의 목표: **전체 페이지에서 목업 사용처·필요처 조사 + 시나리오 검수 → v2 계획에 구체 반영**

---

## 1. 완료된 것

- v2 계획서 작성·저장 완료 (`docs/MOCKUP_SYSTEM_V2_PLAN_v1.md`). 확정 결정:
  D1 목업 내부 = SAAI DS 전면 채택(codegen 경유) · D2 emerald/violet 폐지, one-blue+데이터 hue · D3 Lottie 미도입, framer-motion 정교화(SAAI Motion 스펙) · D4 실사용 목업 우선.
- 배포 프리뷰(ds-hp-temp.vercel.app/ko) 육안 검수 일부 완료: 홈 전체 + saai care + saai insight(중반까지).

## 2. 육안 검수 발견 사항 (코드 원인 추적 필요 — 미해결)

| # | 발견 | 위치 | 추정 원인/확인 지점 |
|---|---|---|---|
| A1 | 타임스탬프 `2026-0/2 35:33:48` — 존재하지 않는 시각·깨진 날짜 포맷 | 홈 히어로 CCTV 목업(익명 추적 오버레이) | `mockup-time.ts` 포맷 로직 또는 해당 목업의 로컬 시간 표기 코드 |
| A2 | 매장 수 3원 불일치: 홈 푸트노트 "200개 가맹점" vs saai care 히어로 "전국 240개 매장" vs 엔터프라이즈 MacBook 목업 "5개 매장 연결됨" | 홈·saai care | `canonical.ts` `totalStores: 200` 파생 여부. 240·5가 어디 하드코딩인지 grep |
| A3 | 히어로 헤드라인 두 줄 겹침 렌더 (saai care "모든 매장을…", saai insight "어제의…") | 제품 페이지 히어로 | `WordRise` 애니메이션 완료 상태 CSS — 스크린샷 시점 문제인지 실제 겹침인지 재현 확인 |
| A4 | 홈 제품 탭 섹션(store count 탭) 우측 절반 빈 공간 + 깨진 이미지 플레이스홀더 | 홈 제품 탭 스위처(다크) | 제품별 비주얼 자산 누락 or 이미지 경로 오류 |
| A5 | 스크롤 리빌 늦발화로 뷰포트 전체가 빈 화면인 구간 다수 | 홈 Beyond-Retail(3번째 카드 자리), saai care 중반, saai insight 중반 | `AnimatedSection` 발화 임계/스태거 — 빠른 스크롤 시 UX. IntersectionObserver rootMargin 검토 |
| A6 | StoreCare 폰 목업 화면 하단 1/3 빈 여백 (CCTV 썸네일 2개 아래) | saai care 중반 폰 목업 | 콘텐츠 완결성 — 시나리오에 항목 추가 또는 화면 높이 조정 |
| A7 | 파트너 스트립에 "올리브영" 실명 노출 잔존 | 홈 credentials 섹션 | `docs/2026-07-20_1250_Feedback.md` §0.1 (3-10, 런칭 블로커)와 대조 — PartnerGrid.tsx:14-15, contact.yaml. 승인됐으면 무시 |
| A8 | saai care 히어로 HQ 목업의 랭킹 테이블 상태 배지가 우측에서 잘림 | saai care 히어로 | 목업 내부 그리드 폭 — v2 MockupViewport 도입 근거 사례 |
| A9 | ChatMockup(홈 다크 섹션 좌측 "GENERIC TEXT MODEL" 카드) 폰 화면 하단 60% 빈 공간 | 홈 SpaceAiAnswerBeat | 비교 연출 의도일 수 있으나 빈 화면 금지 원칙과 충돌 — 의도 확인 |
| A10 | 홈 퍼널 "-261" 수치가 퍼널 단계 숫자(93/73/52/33/21/16)와 산술적으로 어떻게 도출되는지 불명 | 홈 퍼널 섹션(자체 구현) | 산식 확인, canonical 파생으로 승격 검토 |

검수 안 한 부분: saai insight 하반부, saai agent, store-count, saai(스위트), saai-for-owners, functions, 기술 6종, 솔루션 5종, 엔터프라이즈, 리소스·회사 계열, /demo 갤러리, EN/JP 로케일.

## 3. 다음 단계 (새 세션에서 이 순서로)

1. **사용처 전수조사(코드)**: `grep -rl "components/mockups" src/` + 각 뷰의 import 목록 → `MOCKUP_ELEVATION_ROLLOUT_PLAN_v1.md` §1-2 인벤토리(12/34 뷰 사용, 고아 22종)를 현행 코드로 갱신.
2. **시나리오 교차 검수**: `src/data/mockup-scenarios/` 8종(canonical/storeagent/storecare/storecount/storeinsight/enterprise/simulator/technology) + `storeagent-mock-i18n.ts` — 숫자·매장명·시간이 canonical과 일치하는지, 화면 간 모순(A2 유형) 전수 확인. 각 목업 컴포넌트의 하드코딩 숫자도 함께 (v2 계획 §2-D 체크리스트 7항 기준).
3. **§2 표의 A1~A10 원인 추적·수정 목록화** (수정은 Jamin 확인 후).
4. **갭 맵**: 목업 없는 22뷰 × 고아 목업 22종 매칭 표 — 페이지 목적 기준 재배치 제안.
5. 결과를 `MOCKUP_SYSTEM_V2_PLAN_v1.md` Phase 1~3에 구체 항목으로 반영 (v2 문서 개정).

## 3-1. 진행 상태 (2026-07-23 후속 세션)

§3의 1~5 **완료**. 결과: `docs/MOCKUP_AUDIT_RESULTS_260723.md` (전수조사·A1~A10 원인·시나리오 검수·갭 맵). 반영: `MOCKUP_ELEVATION_ROLLOUT_PLAN_v1.md` §1-2 갱신, `MOCKUP_SYSTEM_V2_PLAN_v1.md` Phase 1~3 구체화. 코드 수정은 미착수(Jamin 확인 대기). 잔여: 배포 SHA 대조 후 육안 검수 재개(§2 미검수 목록).

## 4. 참고 — 검수 시 기준 문서

- 디자인/토큰 원칙: `DESIGN.md`(사이트) · `design-system/design.tokens.md`(SAAI DS, 목업 내부 SSOT 예정)
- 목업 규약: `docs/MOCKUP_SYSTEM_GUIDE.md`(v1) · `src/components/mockups/types.ts`
- 콘텐츠 SOT: `src/data/mockup-scenarios/canonical.ts` (강남역점 · ₩1,245,000 · 방문 342명 · 성과 92점 · 200개 가맹점 · 정상187/주의9/긴급4)
- 미해결 선행 이슈: `useCountUp` 고정 4회 호출(MultiStore/HqMap) → `useCountUpGroup` 리팩터 필요 (v2 계획 §2-C)
