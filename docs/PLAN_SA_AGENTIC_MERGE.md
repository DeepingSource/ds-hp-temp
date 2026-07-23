# 수정 개발 계획 — saai agent × Agentic AI 페이지 재정리

작성일: 2026-07-23 · 대상 저장소: `DS_NEW_HP` · 대상 URL: `/products/saai-agent`, `/technology/agentic-ai`

---

## 1. 배경 및 문제 진단

### 피드백 요지 (Core Weekly 260723)

SA(saai agent)와 Agentic AI를 분리한 페이지로 설명하니 헷갈린다. 고객 입장에서 "Agentic AI는 기술, SAAI는 제품"이라는 구분을 인지하기 어렵고, Agentic AI 페이지에 있는 내용 대부분이 이미 SA 페이지에 포함되어 있다. 코어팀의 원래 의도는 SI(saai insight)의 대시보드가 결국 SA로 바뀌는 그림이다:

- 현재 SI의 대시보드는 데이터 **Viewer**의 역할
- SA는 **Interactive** 대시보드의 형태
- SA가 가려는 방향은 대시보드가 **먼저 제안을 주고 알림을 주는** 방식 (Proactive)

이 관점에서 SA 페이지의 **액션 카드** 섹션은 매우 적합한 예시다. ("굳이 얘기하지 않아도 노티를 주는 기능 — 웹페이지가 이 방향성을 꽤 잘 보여주고 있다")

### 코드 레벨 진단 (실제 확인 결과)

| 항목 | `/products/saai-agent` (StoreAgentView) | `/technology/agentic-ai` (AgenticAiTechView) |
|---|---|---|
| 카피 관리 | CMS (`content/site/store-agent.yaml` → Keystatic) | **코드 하드코딩** (`COPY` 딕셔너리, 664줄) |
| 포지셔닝 | "권고는 AI, 결정은 사람" · 대시보드→행동 | "자율형" · "자동 적용" · "제안 정밀도 99.4% (자율 운영)" |
| 핵심 콘텐츠 | 4단계 프로세스, Enterprise 웹앱 데모, 액션 카드·챗·푸시 목업, 기능 매트릭스 | 온톨로지 그래프, 크로스스토어 전파, MTMC 시뮬레이션, 데이터 플라이휠 |
| 중복 영역 | 발주 자동 생성, 날씨 대응 제안, POS·동선 결합 | 동일 소재를 "기술 설명" 프레임으로 반복 |

문제는 세 겹이다:

1. **IA 혼동** — 같은 이야기를 두 URL에서 다른 프레임으로 한다. 고객은 제품/기술 구분 의도를 읽지 못한다.
2. **포지셔닝 충돌** — SA는 "권고는 AI, 결정은 사람"인데 Agentic AI 페이지는 "자율 운영·자동 적용"을 말한다. 브랜드 캐넌과 어긋나는 데다, 검증 불가한 수치(99.4%, 96.4%, +34% 등)가 하드코딩되어 있다.
3. **관리 이원화** — Agentic AI 페이지 카피는 CMS 밖에 있어 카피 정합성 관리가 안 된다.

---

## 2. 방향 (결정 사항)

> **권장안 채택: Agentic AI 상세 페이지를 SA 제품 페이지로 흡수하고, 기존 URL은 리다이렉트한다.**
> 기술 스토리는 `/technology` 인덱스의 3축 스택(Anonymizer · Spatial AI · Agentic AI) 요약으로 충분하며, "Agentic AI가 무엇을 하는가"의 증명은 제품 페이지가 담당한다.

원칙 세 가지:

1. **기술은 제품으로 증명한다.** Agentic AI를 별도 페이지로 설명하지 않고, saai agent 페이지 안에서 "이 제품을 구동하는 기술"로 보여준다. `/technology` 인덱스의 Agentic AI 축 카드는 유지하되 상세 링크가 saai agent로 향한다.
2. **SI → SA 진화 서사를 명시한다.** Viewer → Interactive → Proactive 3단계를 SA 페이지의 새 섹션으로 만들고, 액션 카드 목업을 Proactive 단계의 실물 증거로 연결한다.
3. **포지셔닝은 하나로.** "권고는 AI, 결정은 사람"으로 통일. "자율 운영" 표현과 근거 없는 정밀도 수치는 흡수 과정에서 제거한다.

검토했던 대안 (기각 사유):

- **B. 얇은 브릿지 페이지로 축소** — 페이지 수는 유지되므로 "왜 두 개인가"라는 근본 혼동이 남는다. 변경량 대비 효과가 작다.
- **C. 두 페이지 역할 분리 유지** — 기술/제품 분리는 만든 쪽 논리다. 피드백이 지적한 게 정확히 이 구조이므로 기각.

---

## 3. 페이지별 상세 설계

### 3.1 `/products/saai-agent` — 확장 (핵심 작업)

새 섹션 순서 (▶ = 신규, ✎ = 수정):

1. Hero — 유지. 서브카피는 이미 "대시보드는 숫자를 보여줍니다. saai agent는 그 숫자로 무엇을 할지까지 말합니다"로 방향성이 맞음.
2. ▶ **진화 스토리 섹션 (신규 컴포넌트 `AgentEvolutionSection`)** — 3단계 스텝 UI:
   - **① Viewer — saai insight**: "어제를 읽는 대시보드. 숫자를 보여준다." (saai insight 페이지로 상호 링크)
   - **② Interactive — saai agent (지금)**: "물어보면 답하고, 발주서까지 만든다."
   - **③ Proactive — saai agent가 가는 방향**: "묻기 전에 먼저 제안하고, 알림을 준다." → 바로 아래 액션 카드 데모로 스크롤 연결
   - 카피 초안은 §5 참조. 기존 `ProcessStepper` 재활용 가능하나 3단계 진화 축은 별도 시각 언어(타임라인형)를 권장.
3. How it works (4단계 ProcessStepper) — 유지.
4. EnterpriseAppShowcase — 유지.
5. AgentMockupShowcase (액션 카드·챗·푸시) — ✎ 섹션 도입 문구를 "Proactive의 실제 모습"으로 재프레이밍. 진화 섹션 ③에서 앵커(`#proactive`)로 연결.
6. ▶ **기술 파운데이션 섹션 (신규 컴포넌트 `AgentTechFoundation`)** — Agentic AI 페이지에서 살릴 콘텐츠를 압축 흡수 (콘텐츠 이동 매핑은 §4):
   - 데이터 연결 스토리: MTMC 동선 + POS + 재고 + 날씨가 하나의 맥락으로 (기존 온톨로지 인터랙티브 셀렉터를 경량화해 이식)
   - 데이터 플라이휠: "연결되는 데이터가 늘수록 제안이 정교해진다" — 단, 정밀도 % 수치는 제거하고 정성 표현으로
   - 섹션 하단에 `/technology` 3축 스택으로 가는 링크 ("이 기술의 바탕: Anonymizer · Spatial AI 보기")
7. Pricing teaser · ModeFunctionSection · CTA — 유지.

메타데이터: 기존 유지 + keywords에 'Agentic AI', '공간 온톨로지' 등 구 페이지 키워드 병합 (SEO 승계).

### 3.2 `/technology/agentic-ai` — 제거 + 리다이렉트

- `src/app/technology/agentic-ai/page.tsx`, `src/app/ko/...`, `src/app/jp/...` 3개 라우트 삭제.
- `src/components/corporate/views/AgenticAiTechView.tsx` 삭제.
- 리다이렉트: `src/proxy.ts`의 `mainSiteRedirects`에 3개 엔트리 추가 (308):
  - `/technology/agentic-ai` → `/products/saai-agent`
  - `/ko/technology/agentic-ai` → `/ko/products/saai-agent`
  - `/jp/technology/agentic-ai` → `/jp/products/saai-agent`
  - 주의: `output: 'export'` 모드에서는 next.config redirects가 무시되므로 반드시 proxy.ts 쪽에 넣는다 (기존 패턴과 동일).
- `TRANSLATED_PATHS`(proxy.ts)에서 `/technology/agentic-ai` 제거.
- `src/app/sitemap.ts`에서 해당 경로 제거.

### 3.3 `/technology` 인덱스 — 링크 방향 수정

- 3축 스택(`stack[]`)의 Agentic AI 카드는 유지 (기술 서사 자체는 회사 스토리에 필요).
- ✎ `TechnologyView.tsx`: agentic 카드의 "자세히 보기(learnMore)" href를 `/technology/agentic-ai` → `/products/saai-agent`로 변경. 라벨을 "saai agent에서 보기" 류로 바꿔 제품으로 간다는 것을 명시 (technology.yaml에 라벨 키 추가).
- ✎ `content/site/technology.yaml`: agentic 축 `desc`를 "권고는 AI, 결정은 사람" 톤에 맞게 한 줄 보강 (현재 문구 "무엇을 바꿀지까지 판단합니다"는 유지 가능 — '판단'까지는 OK, '자율 실행'은 금지).
- 헤더/푸터: `Header.tsx` Technology 드롭다운과 `Footer.tsx`의 Agentic AI 항목 제거 또는 `/products/saai-agent`로 변경. **권장: 제거** (기술 메뉴에 제품 링크가 섞이면 다시 혼동) — Technology 메뉴는 Anonymizer · Spatial AI (+ models/seal) 로 정리.

---

## 4. 콘텐츠 이동 매핑 (AgenticAiTechView → 이후 위치)

| 기존 섹션 | 처리 | 이동 위치 / 사유 |
|---|---|---|
| Hero ("스스로 행동하고 학습을 전파하는") | **폐기** | "자율" 프레임이 포지셔닝 충돌. 서사는 SA hero가 이미 담당 |
| 1. 온톨로지 인터랙티브 (MTMC/POS/재고/날씨 셀렉터) | **압축 이식** | SA `AgentTechFoundation`. 4개 데이터 소스 카드 + 설명 박스 구조는 재활용 가치 높음. "ONTOLOGY ENTITIES 12,480+" 같은 장식 수치는 제거 |
| 2. 크로스스토어 전파 (1호점→50개 지점) | **축약 후 이식 여부 보류** | "자동 적용"이 아니라 "본부가 검증된 패턴을 전 지점에 배포"로 고쳐 쓰면 SA의 멀티 매장 분석(이번 주 출시 기능)과 연결 가능. 1차 릴리즈에서는 제외하고 추후 멀티 매장 섹션에서 다루는 것을 권장 |
| 3. MTMC 시뮬레이션 (Current/Optimized 토글) | **폐기** | 제품에 없는 기능의 목업 + 가공 수치(96.4% 등). 제품이 따라가면 그때 제품 스크린샷으로 |
| 4. 데이터 플라이휠 (STAGE 1–4) | **재작성 이식** | SA `AgentTechFoundation`. 정밀도 %(60/80/92/99.4) 삭제, "연결할수록 정교해진다" 정성 서사로 |
| Bottom CTA | **폐기** | SA CTA가 담당 |

---

## 5. 카피 초안 (ko 기준, CMS 키로 추가)

`content/site/store-agent.yaml`에 추가할 키 (en/jp 번역 포함 3개 로케일):

```yaml
evolutionEyebrow: 대시보드의 다음
evolutionHeading: 보여주는 대시보드에서, 먼저 말 거는 대시보드로
evolutionSub: saai insight가 어제를 읽어주면, saai agent는 오늘 무엇을 할지 함께 정합니다. 그리고 이제, 묻기 전에 먼저 제안합니다.
evolutionSteps:
  - id: viewer
    tag: "① Viewer"
    title: 숫자를 보여주다 — saai insight
    desc: 방문·체류·전환을 읽는 대시보드. 어제의 매장을 정확히 보여줍니다.
  - id: interactive
    tag: "② Interactive"
    title: 물으면 답하다 — saai agent
    desc: 무엇이든 물어보면 근거와 함께 답하고, 발주서까지 만들어 드립니다.
  - id: proactive
    tag: "③ Proactive"
    title: 먼저 제안하다 — saai agent가 가는 방향
    desc: 말하지 않아도 먼저 알림을 줍니다. 액션 카드가 오늘의 할 일을 짚어드립니다.
techEyebrow: 기술 파운데이션 · Agentic AI
techHeading: 매장의 데이터가, 하나의 맥락이 됩니다
techSub: CCTV 동선(MTMC)·POS·재고·날씨가 연결될수록 제안은 정교해집니다. 권고는 AI가, 결정은 언제나 사람이.
```

(문구는 초안 — 기존 브랜드 톤인 "~하다/~합니다" 혼용 리듬과 브랜드 캐넌(`brand-canon.ts`)의 제품 표기 규칙에 맞춰 구현 시 카피 리뷰 1회 권장.)

---

## 6. 파일 단위 변경 목록

| # | 파일 | 작업 |
|---|---|---|
| 1 | `src/components/corporate/views/StoreAgentView.tsx` | 신규 섹션 2개 삽입, AgentMockupShowcase 앞 앵커 추가 |
| 2 | `src/components/sections/AgentEvolutionSection.tsx` | **신규** — 3단계 진화 타임라인 |
| 3 | `src/components/sections/AgentTechFoundation.tsx` | **신규** — 데이터 연결 + 플라이휠 (AgenticAiTechView에서 이식·경량화) |
| 4 | `content/site/store-agent.yaml` | 신규 카피 키 추가 (ko/en/jp) |
| 5 | `keystatic.config.tsx` | `storeAgent` singleton 스키마에 신규 필드 추가 |
| 6 | `src/app/{,ko/,jp/}technology/agentic-ai/page.tsx` | 삭제 (3개) |
| 7 | `src/components/corporate/views/AgenticAiTechView.tsx` | 삭제 |
| 8 | `src/proxy.ts` | `mainSiteRedirects` 3건 추가, `TRANSLATED_PATHS`에서 제거 |
| 9 | `src/app/sitemap.ts` | 경로 제거 |
| 10 | `src/components/layout/Header.tsx` | Technology 드롭다운에서 Agentic AI 제거 |
| 11 | `src/components/layout/Footer.tsx` | Agentic AI 링크 제거 |
| 12 | `src/components/corporate/views/TechnologyView.tsx` | agentic 카드 learnMore href → `/products/saai-agent` |
| 13 | `content/site/technology.yaml` | agentic 카드 링크 라벨 키 추가·desc 미세 수정 |
| 14 | `src/app/{,ko/,jp/}products/saai-agent/page.tsx` | metadata keywords 병합 |

## 7. 작업 단계 및 예상 공수

| Phase | 내용 | 공수 |
|---|---|---|
| 1 | SA 페이지 확장: 신규 컴포넌트 2개 + CMS 키 + Keystatic 스키마 (ko/en/jp) | 1.0~1.5일 |
| 2 | agentic-ai 라우트 제거 + 리다이렉트 + 사이트맵/헤더/푸터/기술 인덱스 정리 | 0.5일 |
| 3 | QA: 3개 로케일 빌드 확인(`output: export` 정적 빌드 통과), 리다이렉트 3건 검증, 내부 링크 데드링크 스캔(`grep -r "technology/agentic-ai"`가 0건이어야 함), 반응형·다크 섹션 시각 확인 | 0.5일 |
| 4 | 카피 리뷰 (브랜드 톤·en/jp 번역 감수) | 0.5일 |

**총 2.5~3일.** Phase 1과 2는 독립적이라 병렬 가능하나, 배포는 반드시 함께 (리다이렉트 없이 페이지만 지우면 404).

## 8. 리스크 및 결정 필요 사항

- **SEO**: `/technology/agentic-ai`가 이미 색인됐다면 308 리다이렉트로 승계되나, canonical·hreflang 갱신 확인 필요. 사이트맵 재제출 권장.
- **크로스스토어 전파 콘텐츠** (§4 보류 항목): 이번 주 출시된 멀티 매장 분석 기능과 묶어 SA 페이지에 "본부 뷰" 섹션으로 살릴지 — 코어팀 확인 후 후속 작업으로.
- **Technology 메뉴 항목 수 감소**: 헤더 드롭다운이 2~4개로 줄어드는 레이아웃 확인 필요.
- 이 계획은 사용자 컨펌 전 가정 2건을 포함: (a) 통합+리다이렉트 방향, (b) 진화 스토리 섹션 신설. 다른 방향을 원하면 §2의 대안 B/C 기준으로 재산정.
