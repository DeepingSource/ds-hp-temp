# 문제 진단(Diagnosis) v2 — 대화형 모달 진화 계획

> 대상: `/solutions/diagnosis` (ko/en/jp) · 작성일 2026-07-23
> 방향 확정: **대화형 연출(규칙 기반 유지) · 모달 런처 · 전체 콘텐츠 라우팅 · 계획+목업 선행**

---

## 1. 현재 상태 요약

지금의 진단은 `DiagnosisView`(조용한 히어로) + `DiagnosisGuide`(클라이언트 위저드)로 구성된 **전용 페이지 전용** 기능입니다. 흐름은 역할(Q1) → 업종(Q2) → 문제 클러스터(Q3) → 동점 해소(Q4, 필요 시) → 결과이며, 21개 솔루션 시나리오(`content/solutions/*.yaml`)로 수렴합니다. 로직(`diagnosisData.ts`)과 카피(`diagnosis-i18n.ts`)는 이미 데이터에서 파생되는 견고한 구조입니다.

한계는 세 가지입니다.

1. **진입점이 하나뿐** — `/solutions` 탐색기의 링크 한 곳. 제품·기술·홈 등 트래픽이 실제로 도착하는 페이지에서는 진단의 존재를 알 수 없습니다.
2. **폼처럼 보이는 위저드** — 카드 안의 버튼 목록은 기능적으로 충분하지만, "AI가 함께 찾아준다"는 제품 정체성(공간 AI 회사)이 UI에서 느껴지지 않습니다.
3. **결과의 출구가 좁음** — 결과 카드가 솔루션 상세와 문의로만 이어집니다. 제품 3종(saai care/insight/agent), 기술(Anonymizer/SEAL), 고객 사례, 가격 시뮬레이터라는 이미 존재하는 콘텐츠 자산과 연결되지 않습니다.

## 2. 목표

한 문장으로: **어느 페이지에서든 한 번의 클릭으로 열리는, 대화처럼 흐르는 진단 — 결과는 사이트 전체 콘텐츠로 확산되는 허브.**

- 진입: 모달 런처. 페이지를 떠나지 않고 진단 → 결과 → 콘텐츠 이동.
- 연출: 채팅형 대화 UI. 로직은 지금의 규칙 기반 그대로(비용 0, 응답 예측 가능, 정적 배포 유지).
- 라우팅: 결과에서 솔루션 + 제품 + 기술 + 사례 + 가격 시뮬레이터 + 문의로 분기.
- 톤: SAAI_AI_Handoff의 **Quiet Utility** 준수 — "AI스러움"은 연출(대화 리듬·타이핑·순차 공개)로 내고, 카피는 과장 없이 동료의 톤 유지.

## 3. 아키텍처 — 4개 레이어로 분리

핵심 리팩터링은 "로직 / 대화 연출 / 컨테이너 / 진입점"의 분리입니다. 기존 `DiagnosisGuide`는 로직과 UI가 한 파일에 있어 모달 재사용이 어렵습니다.

```
src/components/corporate/diagnosis/
├── useDiagnosisEngine.ts     ← 헤드리스 훅: 상태 머신 (기존 DiagnosisGuide 로직 추출)
├── DiagnosisConversation.tsx ← 대화형 프레젠테이션 (페이지·모달 공용)
├── DiagnosisModal.tsx        ← 오버레이 컨테이너 (z-modal, 포커스 트랩, ESC)
├── DiagnosisLauncher.tsx     ← 진입점 컴포넌트 (variant: banner | button | inline)
├── ResultPanel.tsx           ← 확장된 결과 카드 (라우팅 허브)
└── routing.ts                ← 결과 → 콘텐츠 라우팅 규칙 (아래 §5)
```

- **`useDiagnosisEngine`**: step/industry/cluster/result 상태와 전이 함수만. 기존 `diagnosisData.ts`·`diagnosis-i18n.ts`를 그대로 소비. 여기에 **답변 이력(transcript)** 배열을 추가해 대화 UI가 지난 문답을 렌더할 수 있게 함.
- **`DiagnosisConversation`**: transcript를 채팅 형태로 렌더. `/solutions/diagnosis` 페이지와 모달이 동일 컴포넌트를 사용 → 페이지는 SEO 캐노니컬로 유지(메타·JSON-LD 불변), 모달은 UX 지름길.
- **`DiagnosisModal`**: `z-[var(--z-modal)]`, `AnimatePresence` 진입/이탈, 바디 스크롤 락, 포커스 트랩, `prefers-reduced-motion` 존중. 열림 상태를 `?diagnosis=1` 쿼리(또는 해시)에 반영해 뒤로가기로 닫히고 공유 가능하게.
- **전역 배선**: 루트 레이아웃(또는 코퍼레이트 셸)에 Provider 하나 — `openDiagnosis(context?)`를 어디서든 호출 가능하게. Next의 정적 배포와 충돌 없음(전부 클라이언트 상태).

## 4. 대화형 연출 — "AI스럽게"의 구체 사양

| 요소 | 사양 |
|---|---|
| 말풍선 | 어시스턴트: 흰 배경 + `border-gray-100`, 좌측 정렬. 사용자 답: `bg-primary-lighter` 우측 정렬. 그라디언트·아바타 일러스트 금지(One Blue) |
| 타이핑 인디케이터 | 어시스턴트 발화 전 400–700ms 점 3개. `prefers-reduced-motion` 시 생략 |
| 질문 제시 | 질문 말풍선 + **퀵리플라이 칩**(기존 OptionButton을 칩으로 재해석). 선택하면 칩 목록은 사라지고 선택 내용이 사용자 말풍선으로 전사 |
| 답 수정 | 사용자 말풍선에 hover 시 "수정" — 클릭하면 해당 시점으로 되감기 (기존 back보다 직관적) |
| 결과 공개 | "조건에 맞는 사례를 확인하고 있어요" 한 박자(800ms) 후 결과 패널이 **섹션 순차 공개**(문제 확인 → 접근 3단계 → 수치 → 다음 콘텐츠). 스트리밍처럼 보이지만 전부 로컬 데이터 |
| 진행 표시 | 상단 얇은 진행바(1/3 → 2/3 → 3/3). 숫자 스텝 라벨은 유지하되 조용하게 |
| 카피 | 기존 diagnosis-i18n 문구 재사용 + 대화 연결어 소량 추가("알겠습니다", "마지막 질문이에요"). 과장 형용사 금지, 결론 먼저 |

**금지선**: 실제 LLM이 아닌 것을 LLM처럼 위장하는 카피("무엇이든 물어보세요") 금지. 자유 입력창은 이번 범위에서 제외 — 칩 기반임을 정직하게 유지. (하이브리드 자유 입력은 §8 후속 과제)

## 5. 결과 라우팅 확장 — 신호 → 콘텐츠 맵

결과 패널 하단에 "다음으로 볼 콘텐츠" 허브를 추가합니다. 라우팅은 전부 **진단 중 수집된 신호**에서 파생되며, `routing.ts` 한 파일에 규칙으로 정리합니다.

| 신호 | 라우팅 대상 | 근거 데이터 |
|---|---|---|
| 결과 시나리오 | `/solutions/[slug]` 상세 (기존 유지) | `solutionsBySlug` |
| 시나리오의 steps 제품 | `/products/saai-care · saai-insight · saai-agent` 딥링크 (단계별 제품 배지를 클릭 가능하게) | `steps[].product` |
| 업종 | 매칭 고객 사례 — cafe→`cafe-sync`, convenience→`cvs-100`, drugstore→`drug-translate` 등 | `content/case-studies/*` (업종 매핑 테이블 신규 1개) |
| 페르소나 = exec | `/pricing/simulator` + `/enterprise` 카드 노출 | Q1 답변 |
| 페르소나 = hq_sv | `/pricing/simulator` (매장 수 프리셋 쿼리 전달 검토) | Q1 답변 |
| privacy 우회 경로 진입 이력 | `/technology/anonymizer` 카드 (현재는 exit 전용 → 결과에도 병기) | Q3 universal |
| relatedTerms | 용어집 (기존 RelatedGlossary 유지) | `relatedTerms` |
| 항상 | `/contact?solution=[slug]` (주 CTA 불변) | — |

원칙: 카드 최대 4장(주 CTA 제외). 신호 우선순위 = 사례 > 제품 > 가격 > 기술. 결과 화면이 링크 목록으로 비대해지지 않게 우선순위 컷.

## 6. 진입점(런처) 배치 계획

`DiagnosisLauncher`는 **컨텍스트를 함께 전달**합니다 — `openDiagnosis({ industry?: 'cafe', persona?: 'exec' })`. 컨텍스트가 있으면 해당 질문을 건너뛰는 대신 **확인 칩**("카페·음식점 현장이시죠?")으로 시작해 오답 진입을 방지합니다.

**전역 내비에는 넣지 않습니다.** 진단은 탐색을 돕는 유틸리티이지 1차 콘텐츠가 아니므로, 헤더에 상시 노출하는 것은 위상 과잉입니다. 진입은 전부 **페이지 맥락 안**에서만 — 사용자가 "무엇을 봐야 할지 고르는 순간"에 나타나는 것이 원칙입니다.

| 위치 | variant | 프리셋 | 유도 문구(예시, Quiet Utility 톤) |
|---|---|---|---|
| 홈 히어로 하단 | banner | 없음 | "우리 매장·공간, 어디서부터 최적화해야 할까요? — 질문 3개면 충분합니다" |
| 업종 솔루션 페이지 (retail/food-beverage/…) | banner | industry | "지금 겪는 문제를 알려주시면, [업종] 사례 중 맞는 답을 찾아드립니다" |
| 제품 페이지 (saai 3종, store-*) | inline | 없음 | "이 제품이 내 문제에 맞는지 확인하기" |
| 기술 페이지 | inline | 없음 | "이 기술이 풀 수 있는 문제 찾기" |
| 404 / thank-you | inline | 없음 | 탐색 재유도 |
| `/solutions` 탐색기 | 기존 링크 유지 | 없음 | (변경 없음) |

모바일: 모달은 풀시트(bottom sheet)로 전환. 런처가 없는 페이지에서는 진단이 노출되지 않는 것이 정상 — 억지로 채우지 않습니다.

## 7. 구현 단계

**Phase 1 — 엔진 분리 + 모달 셸** (기능 동일, 구조만)
`DiagnosisGuide` → `useDiagnosisEngine` + `DiagnosisConversation`(1차는 기존 카드 UI 그대로 이식) + `DiagnosisModal` + Provider. 페이지 회귀 없음 확인. *리스크 낮음, 이후 모든 단계의 토대.*

**Phase 2 — 대화형 연출** (§4)
transcript 렌더·타이핑 인디케이터·칩·수정 되감기·결과 순차 공개. i18n에 대화 연결어 추가(3개 로케일 동시).

**Phase 3 — 런처 전개** (§6)
홈/업종/제품 페이지의 맥락형 배너·인라인 링크. 컨텍스트 프리셋 + 확인 칩. 전역 내비 노출 없음.

**Phase 4 — 라우팅 허브 + 계측** (§5)
`routing.ts` + ResultPanel 확장 + 업종→사례 매핑 테이블. umami 이벤트: `diagnosis_open(source)`, `diagnosis_step`, `diagnosis_result(slug)`, `diagnosis_route_click(target)`, `diagnosis_abandon(step)`. 성공 지표: 진단 시작률(런처 노출 대비), 완료율, 결과→콘텐츠 클릭률, 결과→문의 전환.

각 Phase는 독립 배포 가능. Phase 1+2를 한 PR로 묶는 것도 가능하나, 회귀 리스크 분리를 권장.

## 8. 후속 과제 (이번 범위 밖)

- **하이브리드 자유 입력**: 칩 아래 텍스트 입력 → 키워드 매칭으로 클러스터 라우팅(LLM 없이). 매칭 실패 시 칩으로 유도. Phase 2 이후 A/B로 검증할 가치.
- **실제 LLM 상담**: 정적 배포라 별도 API 필요. 진단 완료율·문의 전환 데이터가 쌓인 뒤 판단.
- diagnosis-i18n의 CMS(Keystatic) 이관 — 기존 핸드오프 문서에 이미 v2 후보로 기록됨.

## 9. 준수 사항 체크리스트

- One Blue(#376AE2) · 그라디언트 금지 · Pretendard 단일 · weight 400/500/700 — 목업부터 적용
- z-index는 `--z-modal`(60) 토큰, 섀도우는 blue-black 토큰만
- `prefers-reduced-motion` 시 타이핑·순차 공개 모두 즉시 표시로 강등
- 모달 접근성: `role="dialog"` + `aria-modal` + 포커스 트랩 + ESC + 배경 스크롤 락
- 수치는 항상 기존 resultsNote(예시 고지) 동반 — 출처 없는 수치 신규 작성 금지
- 정적 배포(현행) 유지 — 서버 의존 없음
