> **[실행 2026-07-24]** 본 문서는 `docs/MASTER_WORK_ORDER_v1_260723.md`로 실행됨 — Stage별 완료 기록은 그 문서 부록 C 참조.

# 문제 진단(Diagnosis) v4 — YAML 지식 베이스 + 적응형(Akinator식) 엔진

> 대상: 진단 로직 전체 · 작성일 2026-07-23
> 선행: `diagnosis-v2-plan.md`(대화형 모달, 완료) · `diagnosis-v3-plan.md`(6문항 확장 + 페이싱, 계획)
> 관계: v3 §3의 질문 트리를 **코드가 아닌 데이터로** 구현하고, 그 위에서 적응형 엔진으로 진화하는 경로

---

## 0. 결론 먼저

"시나리오를 YAML/JSON으로 외부화"와 "Akinator처럼 발전"은 택일이 아니라 **순서**다.

1. **E1 — 지식 베이스 외부화**: 질문·선택지·증거(evidence)·시나리오 태그를 `content/diagnosis/` YAML로 이동. 엔진은 처음엔 v3의 6문항 **고정 순서 인터프리터**로 동작 — 사용자 체감 변화 없음, 회귀 리스크 최소.
2. **E2 — 시뮬레이션 하네스**: 전 경로 열거 검증 + 골든 패스 픽스처. 데이터가 된 순간부터 시나리오는 "쓰는 것"이 아니라 "돌려보는 것"이 된다.
3. **E3 — 적응형 선택기 교체**: 같은 데이터 위에서 질문 선택만 점수 기반으로 전환 + Akinator 시그니처인 **확인 스텝**("혹시 이 상황이신가요?") 추가.

이렇게 나누면 각 단계가 독립 배포 가능하고, E3가 마음에 안 들면 E1 상태(고정 순서·데이터 기반)로 남아도 그 자체로 이득이다(CMS 편집 가능, 3로케일 일관 관리, 테스트 가능).

**전제 유지**: 규칙 기반·전부 로컬·정적 배포. LLM 아님. Akinator에서 가져오는 것은 *메커니즘*(후보 점수화, 분별력 기반 질문 선택, 확인-부정-재탐색 루프)이지 말투가 아니다(Quiet Utility 유지).

---

## 1. 왜 데이터 외부화가 먼저인가

현재 질문 구조는 4개 파일에 분산된 하드코딩이다: 흐름은 `useDiagnosisEngine.ts`의 Step 유니온, 질문 카피는 `diagnosis-i18n.ts`, 결과 매핑은 `diagnosisData.ts`의 CLUSTER_MAP, 증거-선택지 연결은 TIEBREAK_QUESTIONS 구조에 암묵적으로. 이 상태에서는:

- 질문 하나 추가 = TS 타입 변경 + 3개 파일 수정 + 3로케일 — v3의 6문항 확장을 하드코딩으로 하면 **다음 확장 때 또 같은 비용**을 치른다.
- 시나리오(21개)가 30~50개로 늘면 고정 트리는 사람 손으로 유지 불가능해진다.
- "시나리오를 여럿 써서 검증"할 방법이 수동 클릭뿐이다.

기존 파이프라인이 이미 정답을 갖고 있다: `content/*.yaml → scripts/gen-site-content.mjs → generated JSON → 타입드 로더`. 진단도 같은 길을 탄다. Keystatic 편집 가능(핸드오프 문서의 "diagnosis-i18n CMS 이관 v2 후보" 항목이 이것으로 해소), 빌드 타임 검증 가능, 런타임 비용 0.

---

## 2. 지식 베이스 스키마

### 2-1. 시나리오 태깅 — `content/solutions/*.yaml`에 `diagnosis` 블록 추가

후보(=결과가 될 수 있는 시나리오)는 이미 content/solutions에 있다. 별도 파일을 만들지 않고 **기존 파일에 태그 블록을 추가**한다 — 시나리오와 태그가 한 파일에 있어야 신규 시나리오 작성 시 태깅 누락이 구조적으로 어렵다.

```yaml
# content/solutions/convenience-night-theft.yaml (추가분)
diagnosis:
  cluster: theft_loss            # 기존 CLUSTER_MAP 대체
  attributes:                    # 엔진이 증거를 대조할 속성들
    symptom: [night, unknown]    # 이 시나리오가 답이 되는 증상 값들
    persona: [hq_sv, exec]       # 적합 페르소나 (가중치용, 배제 아님)
    scale: [small, mid, large]
  prior: 1.0                     # 사전 가중치 (기본 1.0, 대표 시나리오는 상향 가능)
```

- `CLUSTER_MAP`(diagnosisData.ts)은 이 블록에서 파생되도록 교체. "새 시나리오 = YAML 한 파일" 원칙 완성.
- dev 빌드에서 `diagnosis` 블록 누락 시 기존과 동일하게 throw.

### 2-2. 질문 뱅크 — `content/diagnosis/questions/*.yaml` (신규 컬렉션)

```yaml
# content/diagnosis/questions/symptom-theft-timing.yaml
id: symptom-theft-timing
phase: refine                    # context | problem | refine | confirm 중 하나
appliesWhen:                     # 이 질문이 출제 가능한 조건
  industry: [convenience, unmanned]
  cluster: [theft_loss, security_ops]
text:
  ko: 손실이 주로 언제 발생하나요?
  en: When do losses mostly occur?
  jp: ロスは主にいつ発生しますか？
ack:                             # 선택 — 답변 후 반응 멘트 (v3 §4)
  ko: "야간에 집중된다면 실시간 감지가 핵심이겠네요."
  en: "..."
  jp: "..."
options:
  - id: night
    label: { ko: 심야·새벽 시간대에 집중돼요, en: ..., jp: ... }
    evidence:                    # 후보 점수에 적용할 증거
      - { attribute: symptom, value: night, weight: 3 }
  - id: unknown
    label: { ko: 시간대를 특정하기 어려워요, en: ..., jp: ... }
    evidence:
      - { attribute: symptom, value: unknown, weight: 2 }
```

- **phase가 대화의 문법을 지킨다**: context(역할·업종·규모) → problem(문제 영역) → refine(증상·목표) → confirm. 적응형 엔진(E3)도 phase 순서 안에서만 질문을 고르므로 "규모를 묻다가 갑자기 증상을 묻는" 부자연스러움이 원천 차단된다.
- v3 §3의 6문항은 전부 이 스키마로 표현 가능(Q1·Q2는 evidence 대신 `signal: persona/industry` 같은 컨텍스트 세터로, exit 조건 포함).
- 기존 TIEBREAK_QUESTIONS 6종 + v3 신규 증상 질문 6종 + Q3/Q6가 초기 질문 뱅크(약 15~18문항)가 된다.

### 2-3. 흐름 정의 — `content/diagnosis/flow.yaml`

```yaml
selector: fixed                  # fixed(E1) | adaptive(E3) — 엔진 스위치
fixedOrder: [role, industry, scale, problem-cluster, "@refine", goal]
adaptive:
  minQuestions: 4
  maxQuestions: 7
  confirmThreshold: 2.0          # top1/top2 점수비가 이 이상이면 확인 스텝으로
  maxRejects: 1                  # 확인 부정 허용 횟수
exits:                           # 기존 owner/privacy/unsure 이탈 규칙도 데이터로
  - { when: { persona: owner }, to: exit-owner }
  - { when: { option: privacy }, to: exit-privacy }
```

- `selector: fixed → adaptive` 한 줄이 E1→E3 전환 스위치. A/B도 이 값으로.
- 검증·시뮬레이터·UI는 selector와 무관하게 동일하게 동작.

### 2-4. 골든 패스 픽스처 — `content/diagnosis/fixtures/*.yaml`

v3 §7의 시나리오 A~E를 사람이 읽는 문서가 아니라 **실행 가능한 픽스처**로 저장한다.

```yaml
# content/diagnosis/fixtures/sv-convenience-night-urgent.yaml
name: 본사 SV · 편의점 · 야간 도난 · 긴급
answers: [hq_sv, convenience, mid, theft_loss, night, urgent]
expect:
  result: convenience-night-theft
  maxQuestions: 6
  routeCardsInclude: [case-cvs-100, pricing]
```

"시나리오를 여럿 써두고 활용한다"의 실체가 이것이다 — 카피 검토용 대본이자 회귀 테스트이자, 나중에 adaptive 전환 시 **두 셀렉터가 같은 결과에 도달하는지** 비교하는 기준선.

### 2-5. 빌드 파이프라인

- `gen-site-content.mjs`에 diagnosis 섹션 추가: 질문 뱅크 + flow + 시나리오 태그를 `site-content.json`으로 컴파일.
- 빌드 타임 검증(실패 시 빌드 중단): 모든 solutions에 diagnosis 블록 존재 / evidence의 attribute·value가 실제 시나리오 태그에 존재(고아 증거 금지) / 3로케일 라벨 완전성 / fixedOrder의 id가 질문 뱅크에 존재 / 모든 slug가 최소 1개 질문 조합으로 도달 가능.
- Keystatic: `diagnosisQuestions` 컬렉션 + `diagnosisFlow` 싱글톤 추가(기존 solutions 컬렉션 패턴 재사용).

---

## 3. 적응형 엔진 설계 (E3)

### 3-1. 점수 모델 — 베이지안 대신 가중합

21~50개 후보 규모에서 확률적 엄밀함은 과설계다. **설명 가능하고 디버깅 가능한 가중합**을 쓴다.

```
score(candidate) = prior
  + Σ evidence.weight  (답변의 evidence가 후보 태그와 일치)
  - Σ penalty          (명시적 배제: cluster 불일치 등 hard filter는 후보 제거)
```

- industry·cluster는 **하드 필터**(후보군 축소 — 현행 동작 보존), symptom·persona·scale·goal은 **소프트 가중치**.
- 매 답변 후 점수표를 콘솔(dev)에서 볼 수 있게 — "왜 이 결과가 나왔나"를 항상 재현 가능하게 유지. Akinator와의 결정적 차이이자 우리가 지켜야 할 성질.

### 3-2. 질문 선택 — 분별력 최대화의 단순 근사

현재 phase에서 출제 가능한(`appliesWhen` 충족, 미출제) 질문 중, **살아있는 후보들을 가장 잘 갈라놓는 질문**을 고른다:

```
usefulness(q) = 옵션별로 갈리는 후보 부분집합 크기의 균형도
              (예: 후보 6개를 3/3으로 가르는 질문 > 5/1로 가르는 질문 > 6/0인 질문=출제 불가)
```

- 정식 정보 이득(엔트로피) 계산의 단순화 버전. 후보 수십 개 규모에선 결과가 사실상 같고 코드는 훨씬 읽기 쉽다.
- 갈라놓는 후보가 없는 질문(usefulness 0)은 자동으로 건너뛴다 → **1-slug 클러스터에서 질문이 낭비되지 않는다**. 단 v3의 "증상 되받기" 가치를 위해 refine phase 질문 1개는 usefulness 0이어도 최소 출제(minQuestions 보장용, 답은 결과 카피에 반영 — v3 §5).

### 3-3. 확인 스텝 — Akinator 체감의 핵심

종료 조건 충족 시(top1/top2 ≥ confirmThreshold 또는 maxQuestions 도달) 바로 결과를 던지지 않고 **확인 질문**을 낸다:

> "정리하면 — 심야 시간대 도난·손실을 실시간으로 잡고 싶으신 상황, 맞을까요?"
> [네, 맞아요] [조금 달라요]

- **긍정** → 결과. 확인을 거친 결과는 "3클릭 만에 튀어나온 답"과 심리적으로 전혀 다르다 — v3가 지적한 "진단받은 느낌"의 완성.
- **부정** → top1 제외, 질문 재개(refine phase에서 usefulness 재계산). `maxRejects: 1` 초과 시 top2를 "이 사례가 가장 가깝습니다" 톤으로 제시하고 관련 솔루션을 병기(기존 exit-unsure의 변형). 무한 루프 원천 차단.
- 확인 문장은 시나리오별 자유 작문이 아니라 **템플릿 + 태그 조합**(업종 라벨 + 증상 라벨 + 클러스터 라벨)으로 생성 — 50개 시나리오가 되어도 카피 유지비가 늘지 않는다.
- 결과 패널에는 top2를 "혹시 이쪽에 더 가깝다면"으로 병기(현행 relatedSolutions 슬롯 재사용).

### 3-4. 정직성 가드레일

- 자유 텍스트 입력 없음(칩 기반 유지). "무엇이든 물어보세요" 류 카피 금지.
- 확인 스텝 문구는 수집한 답의 요약이지 "AI의 추리" 연출이 아니다. "제 추측엔…" 금지, "정리하면…" 사용.
- adaptive 모드에서도 진행바는 `min~max` 범위 기반으로 표시(예: "4~7문항 중 3번째"가 아니라 잔여 감각만 주는 부드러운 진행 — 구현 시 목업으로 결정).

---

## 4. 고정 트리 vs 적응형 — 정직한 트레이드오프

| 관점 | 고정 6문항(E1까지) | 적응형(E3) |
|---|---|---|
| 예측 가능성·QA | 전 경로 열거 쉬움 | 시뮬레이터 필수(E2가 선행 조건인 이유) |
| 카피 부담 | 순서 고정이라 문맥 의존 카피 가능 | 질문이 어떤 순서로도 자연스러워야 — phase 제약으로 완화 |
| 질문 낭비 | 1-slug 경로에서 형식적 질문 발생 | usefulness 0 질문 자동 스킵 |
| 확장성(시나리오 50개) | 트리 수동 재설계 필요 | 태그만 달면 엔진이 흡수 |
| "진단" 체감 | 문진 리듬으로 확보(v3) | 확인 스텝까지 더해 최상 |
| 구현 리스크 | 낮음 | 중간 — 단 E1/E2 위에서는 셀렉터 교체뿐 |

**판단**: 현재 21개 규모만 보면 E3는 사치지만, 시나리오를 계속 늘릴 계획이라면(솔루션 콘텐츠가 성장 축) E3까지 가는 게 맞다. 단 E1·E2 없이 E3로 직행하는 것은 금지 — 검증 불가능한 적응형은 유지보수 불가능하다.

---

## 5. 시뮬레이션 하네스 (E2)

`scripts/diagnosis-sim.mjs` — 컴파일된 지식 베이스를 로드해 노드 환경에서 엔진을 구동(엔진 코어를 React 무의존 순수 함수로 두는 이유).

- **전 경로 열거**: 모든 답 조합을 BFS로 순회(fixed는 수백, adaptive는 가지치기 포함 수천 수준 — 로컬에서 초 단위). 리포트: slug별 도달 경로 수 / 도달 불가 slug / 경로 길이 분포(min~max 위반) / 확인 부정 루프 종료 보장 / 출제된 적 없는 질문·옵션(dead copy).
- **골든 패스 검증**: fixtures/*.yaml을 돌려 expect 비교. CI(vitest)에 포함 — 카피나 태그 수정이 결과를 바꾸면 즉시 검출.
- **셀렉터 동등성 리포트**(E3 전환 시): 동일 fixture에 대해 fixed vs adaptive 결과·질문 수 비교표 출력 — 전환 승인 근거 자료.
- 엔진 단위 테스트(vitest): 점수 계산·usefulness·종료 조건·reject 루프.

---

## 6. 구현 단계 (v3 계획과의 통합)

```
v3 Phase 1  페이싱·스크롤 수정            ← 변경 없음, 최우선 단독 배포
E1          지식 베이스 외부화 + 고정 6문항  ← v3 Phase 2를 대체 (하드코딩 확장 금지)
E2          시뮬레이터 + 픽스처 + CI
v3 Phase 3  신호 반영 (routing/ResultPanel) ← E1 데이터 스키마 위에서 구현
E3          adaptive 셀렉터 + 확인 스텝     ← flow.yaml 스위치, fixed와 A/B
E4          계측 확장                      ← 질문별 분별 기여도, 확인 부정률, 완료율
```

- **v3 Phase 2는 폐기하고 E1으로 대체한다** — 같은 6문항을 하드코딩으로 한 번, 데이터로 또 한 번 만드는 이중 작업 방지. v3 문서의 질문 트리·카피 초안(§3~§5)은 전부 E1의 YAML 내용물로 승계.
- E3 배포 판단 기준(E4 지표): fixed 대비 완료율 동등 이상 + 평균 질문 수 감소 + 확인 부정률 20% 미만.

## 7. 리스크

- **스키마 과설계**: evidence/weight 체계가 21개 후보에겐 무겁다 → E1에서는 weight를 사실상 1로 통일해 시작, E3에서만 튜닝. 스키마는 앞서가되 값은 단순하게.
- **Keystatic 편집자가 evidence를 망가뜨림**: 빌드 검증(§2-5)이 방어선. 검증 실패 메시지는 편집자가 읽을 수 있는 한국어로.
- **adaptive의 카피 어색함**: phase 제약 + ack 멘트의 조건부 사용으로 완화. E3 목업 단계에서 fixture 대본을 3로케일로 낭독 검수.
- **JSON 번들 증가**: 질문 뱅크 ~18문항 × 3로케일은 수 KB 수준 — 무시 가능.

## 8. 준수 사항

v3 §10 전체 승계. 추가로: 엔진 코어는 React 무의존 순수 함수(`src/lib/diagnosis-engine/`), 모든 랜덤성 금지(동률 시 order 필드로 결정적 타이브레이크 — 시뮬레이터 재현성), `selector` 전환은 flow.yaml 단일 지점.
