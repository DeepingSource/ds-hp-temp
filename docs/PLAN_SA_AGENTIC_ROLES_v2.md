# 수정 개발 계획 v2 — saai agent × Agentic AI 역할 재정의

작성일: 2026-07-23 · 대상 저장소: `DS_NEW_HP` · 대상 URL: `/products/saai-agent`, `/technology/agentic-ai`

> v1(통합+리다이렉트안)에서 방향 변경. **두 페이지를 모두 유지하되 역할 계약을 명확히 나눈다.**
> Tech 섹션: Agentic AI에 대한 배경, 딥핑소스가 SAAI에서 Agentic AI를 접근하는 철학, 그리고 베이스라인.
> 제품 페이지: 기술이 아니라 **얻게 되는 것**.

---

## 1. 배경 및 문제 진단

### 피드백 요지 (Core Weekly 260723)

SA와 Agentic AI를 분리한 페이지로 설명하니 헷갈린다. 고객 입장에서 "Agentic AI는 기술, SAAI는 제품"을 인지하기 어렵고, Agentic AI 페이지 내용 대부분이 이미 SA 페이지에 있다. 코어팀의 원래 의도:

- SI의 대시보드는 데이터 **Viewer**
- SA는 **Interactive** 대시보드
- SA의 방향성은 대시보드가 **먼저 제안하고 알림을 주는** 방식 (Proactive) — 액션 카드 섹션이 이 방향성의 적합한 예시

### 코드 레벨 진단 (실제 확인 결과)

혼동의 원인은 "페이지가 두 개"라서가 아니라, **두 페이지가 같은 역할을 하고 있어서**다.

| 항목 | `/products/saai-agent` (StoreAgentView) | `/technology/agentic-ai` (AgenticAiTechView) |
|---|---|---|
| 실제로 말하는 것 | 제품 경험 (발주서 생성, 액션 카드, Enterprise 앱) | **역시 제품 경험** — 발주 자동 생성, 날씨 대응, 진열 제안을 "기술" 프레임으로 반복 |
| 없는 것 | — | 배경(왜 Agentic AI인가) · 철학(어떤 원칙으로 접근하는가) · 베이스라인(무엇이 기술적 기반인가) |
| 카피 관리 | CMS (`content/site/store-agent.yaml`) | 코드 하드코딩 (664줄, CMS 밖) |
| 포지셔닝 | "권고는 AI, 결정은 사람" | "자율형 · 자동 적용 · 제안 정밀도 99.4% (자율 운영)" — 브랜드 캐넌과 충돌 |

즉 Agentic AI 페이지는 기술 페이지의 자리를 차지한 **두 번째 제품 페이지**다. 기술 페이지가 해야 할 일(배경·철학·베이스라인)은 어디에도 없다.

---

## 2. 방향 (결정 사항)

**두 페이지 유지 + 콘텐츠 계약(Content Contract) 재정의.**

| | `/technology/agentic-ai` | `/products/saai-agent` |
|---|---|---|
| 질문 | **Why & How** — 왜 공간에 Agentic AI인가, 어떤 철학과 베이스라인으로 만드는가 | **What you get** — 도입하면 무엇을 얻는가 |
| 화법 | 원리 · 원칙 · 데이터 · 단계 | 장면 · 결과 · 화면 · 숫자(성과) |
| 독자 | 기술 검토자, 본사 IT/DX, 투자자 | 구매 결정권자, 점주, 운영 담당 |
| 금지 | 제품 화면·기능 시나리오 나열 (제품 페이지 몫) | 아키텍처·원리 설명 (기술 페이지 몫) |
| 상호 링크 | 하단 "이 기술이 구동하는 제품 → saai agent" | 하단 "이 제품을 만드는 철학 → Agentic AI" |

**판별 규칙 (앞으로의 콘텐츠 배치 기준):** 어떤 섹션이 화면·기능·시나리오("발주서를 만들어 드립니다")를 말하면 제품 페이지, 원리·데이터·원칙("근거 없이는 권고하지 않는다")을 말하면 기술 페이지.

---

## 3. `/technology/agentic-ai` 전면 리라이트 (핵심 작업)

기존 4개 섹션(온톨로지 시뮬레이터 · 크로스스토어 전파 · MTMC 시뮬레이션 · 플라이휠)은 제품 기능의 목업 재연이므로 해체하고, **배경 → 철학 → 베이스라인 → 제품 연결**의 새 구조로 재작성한다.

### 새 페이지 구조

1. **Hero — 배경.** "대시보드는 공간을 보여줄 뿐, 운영하지 않는다." 공간 데이터는 사람이 다 볼 수 없을 만큼 많아졌고, 보는 AI의 다음은 판단을 돕는 AI라는 문제 제기. (기술 인덱스 3축 서사 "익명화 위에 공간 지능, 그 위에 에이전트 AI"와 접속)

2. **철학 3원칙 섹션.** 딥핑소스가 SAAI에서 Agentic AI를 접근하는 원칙:
   - **① 권고는 AI, 결정은 사람** — 자율 실행이 목표가 아니라, 사람의 결정을 더 좋게 만드는 것이 목표. 승인 없는 실행은 없다.
   - **② 근거 없이 말하지 않는다** — 모든 권고는 데이터 근거를 인용한다. 근거가 없으면 답하지 않는다. (saai chat의 근거 인용 원칙과 동일 계보)
   - **③ 먼저 말을 건다 (Proactive)** — 물어야 답하는 챗봇이 아니라, 매장이 놓치고 있는 것을 먼저 제안하고 알림을 주는 방향. 코어팀 방향성의 철학적 근거를 여기서 선언.

3. **베이스라인 섹션 — 무엇 위에서 시작하는가.** 철학을 가능하게 하는 기술적 기반 4가지 (사실 기반, 수치 과장 없이):
   - **익명화 파운데이션**: 모든 판단은 신원이 제거된 데이터 위에서만 (Anonymizer 페이지 링크)
   - **공간 컨텍스트**: MTMC로 정합된 동선·체류·전환 — "누가"가 아니라 "무엇이 어떻게" (Spatial AI 페이지 링크)
   - **데이터 연결**: 동선 + POS + 재고 + 날씨가 하나의 매장 맥락으로 — 연결이 늘수록 권고가 정교해진다 (기존 온톨로지 셀렉터 UI를 여기에 경량 이식 — 인터랙션은 좋은 자산. 단 "ONTOLOGY ENTITIES 12,480+" 류 장식 수치 제거)
   - **학습 루프**: 권고 → 승인/반려 → 실행 → 결과 검증 → 다음 권고 개선. 사람의 피드백이 시스템의 학습 데이터.

4. **자율화 사다리 (L0→L5) 섹션.** 기존 미사용 컴포넌트 `AutonomyLadderTimeline` 재활용 — "처음부터 자동이 아니다. 권고→승인→자동→검증→학습의 사다리를 카테고리별로 한 칸씩, 그러나 결정과 책임은 끝까지 사람의 자리"라는 내용이 철학+베이스라인+로드맵을 한 번에 보여준다. 승급 조건(승인률 80%↑, 검증 30회↑, 명시적 합의, 충돌 시 롤백)이 곧 딥핑소스의 baseline 선언. **이 페이지의 시그니처 섹션으로 승격 권장.**

5. **제품 연결 CTA.** "이 철학으로 만든 제품" → saai agent 카드 (+ saai care·insight 보조). "무엇을 얻게 되는지는 제품에서 확인하세요."

### 폐기 목록 (기존 AgenticAiTechView에서)

- 크로스스토어 "자동 적용" 섹션 — 철학 ①과 정면 충돌. 전파 개념 자체는 학습 루프의 한 문장으로 축약.
- MTMC 시뮬레이션 토글 (Current/Optimized) — 존재하지 않는 기능의 목업 + 가공 수치(96.4%, +24.5%).
- 플라이휠의 "제안 정밀도 60→99.4% (자율 운영)" — 정밀도 수치와 "자율 운영" 표현 삭제. 개념은 베이스라인 ③ "데이터 연결"에 정성 서사로 흡수.

### 기술 부채 해소 (이번에 같이)

- 카피를 코드에서 CMS로 이관: `content/site/agentic-ai.yaml` 신설 + `keystatic.config.tsx`에 singleton 추가 (technology.yaml과 동일 패턴 — 다이어그램·아이콘 구조는 코드 유지, 문구만 CMS).
- ko/en/jp 3개 로케일 동시 작성.

---

## 4. `/products/saai-agent` — "얻게 되는 것" 중심으로 정돈 (경량 작업)

현재 페이지는 이미 outcome 지향이 강해 구조 변경은 최소화한다.

1. **진화 스토리 섹션 신설 (유지 — v1과 동일).** Viewer(saai insight) → Interactive(saai agent 지금) → Proactive(가는 방향)의 3단계. 이것은 기술 설명이 아니라 "고객이 얻게 되는 경험의 진화"이므로 제품 페이지 몫이 맞다. Proactive 단계는 액션 카드 섹션 앵커(`#proactive`)로 연결해 "이미 이렇게 동작한다"를 증명.
2. **기존 섹션 점검 (카피 미세 수정 수준).** hero·steps는 유지. 각 step이 '기능 이름'이 아니라 '얻는 것'(시간, 매출 기회, 놓치지 않음)으로 읽히는지 카피 리뷰 1회.
3. **기술 배경 링크 밴드 (신규, 1개 컴포넌트가 아닌 소형 밴드).** 페이지 하단 CTA 위에 한 줄: "saai agent가 이렇게 판단하는 이유 — Agentic AI 접근 철학 보기 →" (`/technology/agentic-ai`). 기술 상세를 제품 페이지에 넣지 않고 링크로 위임.
4. v1에서 계획했던 `AgentTechFoundation`(온톨로지·플라이휠 흡수) 섹션은 **취소** — 그 내용은 기술 페이지 몫.

---

## 5. 주변 정리

- `/technology` 인덱스 (`TechnologyView` + `technology.yaml`): 변경 최소. agentic 축 카드 desc가 새 페이지 서사와 맞는지만 확인 ("보는 데서 그치지 않고, 무엇을 바꿀지까지 판단합니다" — 유지 가능).
- 헤더 드롭다운 Agentic AI 설명문구: 현재 "공간 온톨로지·자율 지능" → **"접근 철학·자율화 단계"** 류로 수정 ('자율 지능' 단독 표현은 철학 ①과 충돌).
- URL·사이트맵·리다이렉트: 변경 없음 (v1의 삭제/리다이렉트 작업 전부 불필요).
- SA 페이지 metadata: 유지. Agentic AI 페이지 metadata: description을 철학·베이스라인 중심으로 재작성 ("자율형" 표현 제거).

---

## 6. 카피 방향 초안 (ko, CMS 키 신설분)

`content/site/agentic-ai.yaml` (신설) 주요 키 초안:

```yaml
heroEyebrow: Technology · Agentic AI
heroTitle: 보는 AI의 다음은, 함께 결정하는 AI입니다
heroSub: 공간이 만드는 데이터는 사람이 다 볼 수 없을 만큼 많아졌습니다. 딥핑소스는 그 데이터를 자율 실행이 아니라, 더 나은 결정으로 바꾸는 데 씁니다.
philosophyHeading: 딥핑소스가 Agentic AI를 만드는 세 가지 원칙
philosophy:
  - title: 권고는 AI, 결정은 사람
    desc: 목표는 사람을 대체하는 자동화가 아니라, 사람의 결정을 더 좋게 만드는 것. 승인 없는 실행은 없습니다.
  - title: 근거 없이 말하지 않는다
    desc: 모든 권고는 데이터 근거를 인용합니다. 근거가 없으면, 답하지 않습니다.
  - title: 묻기 전에 먼저 제안한다
    desc: 물어야 답하는 도구가 아니라, 매장이 놓친 것을 먼저 짚어주는 방향으로 갑니다.
baselineHeading: 무엇 위에서 시작하는가 — 네 가지 베이스라인
# baseline 4항목: anonymization / spatial-context / data-linking / learning-loop
ladderHeading: 처음부터 자동이 아닙니다 — L0에서 L5까지
productBridgeHeading: 이 철학으로 만든 제품
productBridgeSub: 무엇을 얻게 되는지는, 제품에서 확인하세요.
```

`content/site/store-agent.yaml` 추가분은 v1 §5의 evolution 키를 유지하고, tech 링크 밴드용 키 1~2개 추가.

(모든 문구는 초안 — 구현 시 브랜드 톤 리뷰 1회. en/jp 번역 포함.)

---

## 7. 파일 단위 변경 목록

| # | 파일 | 작업 |
|---|---|---|
| 1 | `src/components/corporate/views/AgenticAiTechView.tsx` | **전면 리라이트** — 새 4섹션 구조, COPY 딕셔너리 제거하고 CMS 참조로 |
| 2 | `content/site/agentic-ai.yaml` | **신설** — ko/en/jp 카피 |
| 3 | `keystatic.config.tsx` | agenticAi singleton 추가, 카피 그룹에 등록 |
| 4 | `velite.config.ts` | agentic-ai.yaml 수집 대상 추가 (site-content 파이프라인 확인) |
| 5 | `src/components/mockups/AutonomyLadderTimeline.tsx` | 재활용 — locale prop 연결 상태 점검 후 기술 페이지에 배치 |
| 6 | `src/components/sections/AgentEvolutionSection.tsx` | **신설** — SA 페이지 Viewer→Interactive→Proactive 3단계 |
| 7 | `src/components/corporate/views/StoreAgentView.tsx` | 진화 섹션 삽입, `#proactive` 앵커, 하단 기술 링크 밴드 |
| 8 | `content/site/store-agent.yaml` | evolution 키 + 링크 밴드 키 추가 (ko/en/jp) |
| 9 | `src/app/{,ko/,jp/}technology/agentic-ai/page.tsx` | metadata 재작성 ("자율형" 제거, 철학·베이스라인 중심) |
| 10 | `src/components/layout/Header.tsx` | Agentic AI 드롭다운 설명문구 수정 |
| 11 | `content/site/technology.yaml` | (필요 시) agentic 카드 desc 미세 조정 |

라우트 삭제·리다이렉트·사이트맵·푸터 변경 **없음**.

## 8. 작업 단계 및 예상 공수

| Phase | 내용 | 공수 |
|---|---|---|
| 1 | Agentic AI 페이지 리라이트: 구조 4섹션 + CMS 이관 + AutonomyLadder 재활용 (ko/en/jp) | 1.5~2일 |
| 2 | SA 페이지: 진화 섹션 + 앵커 + 링크 밴드 + step 카피 점검 | 0.5~1일 |
| 3 | 주변 정리(헤더 문구·metadata) + QA: 3로케일 정적 빌드, 내부 링크, 반응형, 다크 섹션 | 0.5일 |
| 4 | 카피 리뷰 (철학 3원칙 문구는 대외 포지셔닝 선언이므로 코어팀 컨펌 필수) | 0.5일 |

**총 3~4일.** Phase 1·2 병렬 가능. v1 대비 라우트/리다이렉트 리스크가 없어 배포 순서 제약도 없음.

## 9. 리스크 및 결정 필요 사항

- **철학 3원칙 문구는 대외 선언이다.** 특히 "근거 없이 말하지 않는다", 자율화 사다리의 승급 조건(승인률 80%↑ 등)을 공개할지 — 코어팀 컨펌 필요. 조건 수치는 비공개로 하고 개념만 공개하는 안전한 선택지도 있음.
- **AutonomyLadderTimeline**은 현재 어느 뷰에서도 사용되지 않는 컴포넌트 — 폐기된 기획일 가능성. 내용이 현재 방향과 맞는지 확인 후 사용 (맞지 않으면 동일 구조로 문구만 교체).
- **SEO**: URL 유지로 리스크 낮음. 다만 페이지 주제가 바뀌므로 title/description 갱신에 따른 순위 변동은 자연스러운 수준.
- 크로스스토어 전파·멀티 매장 분석 스토리는 이번 범위에서 제외 — 추후 SA 페이지 "본부 뷰" 섹션 후보로 백로그.
