# DS_NEW_HP — 공개 카피 탈(脫)내부화 계획

> **상태:** 🟡 DRAFT — 합의 대기. 아직 코드/콘텐츠 미수정.
> **작성일:** 2026-06-23
> **문제의식:** 일부 렌더 카피가 내부 사업·전략 문서(`docs/BIZ_SERVICE_PLAN_v1.md` 등)의 프레이밍을 그대로 노출한다. 공개 사이트 방문자(점주·구매자)에게는 부적합한 *내부 시점*이다.
> **관계:** `PAGE_CONTENT_REFINE_PLAN.md`(구조 단순화·중복 제거·시각)와 **별개 트랙**. 이 문서는 *어휘·시점*만 다룬다.
> **카피 SOT:** `SAAI_AI_Handoff.md` · BRAND_v2 보이스(점주 대상, 평이체).

---

## 0. 한 줄 요약

내부 GTM 용어(**WTP·ARPU·유입/습관/수익화·천장 돌파·"검증 중인 가설"**)가 **SaaiView 요금 섹션**에 그대로 노출됨. 고객 편익 시점으로 재작성한다. 그 외 "가설/퍼널" 류는 대부분 *정당한 제품·분석 용어*라 유지.

---

## 1. 증거 스캔 결과 (렌더 카피 한정, 주석 제외)

| 파일:라인 | 표현 | 판정 |
|---|---|---|
| `SaaiView.tsx:80–89,122–131,170–171` | 비즈니스 모델 / 유입·습관 / 수익화 / 천장 돌파 / WTP / ARPU / 클로즈드 베타로 검증 중인 가설 | **P0 — 재작성** (내부 GTM 시점) |
| `StoreAgentContent.tsx:35,122,141` | 로드맵 · "리테일 OS" | **P2 — 경미 검토** (공개 로드맵은 통상 허용, 단 톤 점검) |
| `EnterpriseView.tsx:74` | "가설과 Case 기반 비교로 확인" | **유지** — 본사 검증 사이클(제품 기능) |
| `CaseStudiesView.tsx:141,143,162,277–298` | 가설 / hypothesis ("가설 카드") | **유지** — store insight의 실제 기능명 |
| `StoreInsightMockup.tsx:64–65`, `MockupGallery.tsx:169–172` | 가설 / 퍼널 | **유지** — 대시보드 분석 개념 |
| `ResourcesView.tsx:31`, `DocsView.tsx:39` | 퍼널 | **유지** — 대시보드 리포트 지표(고객 대면) |
| `StoreCountView.tsx:24`, `SaaiView.tsx:13`, `HomeView.tsx:35` | 리플렛 / AHM deck / deck | **무관** — 코드 주석(렌더 안 됨) |

> 결론: **렌더되는 내부 시점 카피는 사실상 SaaiView 요금 섹션 1곳.** 나머지 "가설/퍼널"은 고객이 이해하는 분석 용어이므로 건드리지 않는다.

---

## 2. P0 — SaaiView 요금 섹션 재작성 (제안)

원칙: *우리가 어떻게 돈 버는지*(내부) → *고객이 무엇을 얻는지*(편익). 3로케일 동시. (아래는 ko 제안, en/jp 동일 취지로 미러.)

| 필드 | 현재 (내부 시점) | 제안 (고객 편익) |
|---|---|---|
| `planEyebrow` | `비즈니스 모델` | `요금` |
| `planHeading` | `무료로 유입·습관, Pro로 수익화, 고급으로 천장 돌파` | `무료로 시작하고, 필요한 만큼 더하세요` |
| `planSub` | `…무료로 습관을 만들고, 운영 의사결정을 완주하는 Pro로 수익화합니다.` | `카드 등록 없이 무료로 시작해, 매장 운영에 필요한 기능만 더합니다.` |
| `plans[0].desc` (Free) | `유입 · 습관 · 데이터` | `무료로 시작` |
| `plans[1].desc` (Pro) | `운영 의사결정 완주` | `한 주 운영을 끝까지` |
| `plans[2].tier` | `고급 · 자매 제품` | `프리미엄 · 자매 제품` |
| `plans[2].desc` | `WTP 천장 돌파` | `보안·분석까지 한 번에` |
| `plans[2].items[2]` | `교차 판매로 ARPU 확장` | `store care·insight로 매장 운영 전반까지` |
| `planNote` | `* 가격 모델은 클로즈드 베타로 검증 중인 가설입니다. …` | `* 요금은 베타 운영 중이며 실제 구성은 달라질 수 있습니다.` |

en 미러(요지): "Free to start, add what you need" / drop "monetize"·"WTP"·"ARPU"·"hypothesis under closed-beta validation" → "Pricing is in beta and may change."
jp 미러(요지): 同上 — 「無料で始め、必要な分だけ」/ WTP·ARPU·「検証中の仮説」削除。

영향: `SaaiView.tsx`의 `C.ko/en/jp.plans`·`plan*` 필드만. 레이아웃·로직 변경 없음(순수 카피).

---

## 3. P2 — StoreAgent 로드맵 톤 점검 (선택)

`StoreAgentContent.tsx`의 "로드맵 — 리테일 OS"는 공개 가능하나, "리테일 OS"가 비전 과장으로 읽힐 여지. **결정 필요:** 유지 / "매장 운영 자동화로 확장" 류로 완화. (P0 확정 후 별건.)

---

## 4. 검증 · 롤아웃

1. P0 카피 적용 → `npx tsc --noEmit` → `npm run build`.
2. `/ko·/jp·/products/saai` 시각 검증(요금 섹션 3로케일).
3. 재스캔: `grep -rnE "(WTP|ARPU|수익화|천장 돌파|클로즈드 베타|monetiz|closed-beta)" src/components` → 0건.
4. 커밋 `copy(saai): de-internalize pricing section` → gh-pages 배포.

---

## 5. 합의 포인트

- [ ] P0 재작성 문구(§2) 승인 — 특히 `plans[2]` 자매 제품 표현
- [ ] `planNote` 베타 고지 유지 여부(법무/정확성)
- [ ] P2 로드맵 "리테일 OS" 처리(유지/완화)
