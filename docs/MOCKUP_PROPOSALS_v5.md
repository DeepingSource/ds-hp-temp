# 체험형 데모 확장 계획 v5.1

> **작성** 2026-06-05 · **선행** [v4](./MOCKUP_PROPOSALS_v4.md) 전 항목 구현 완료(`/demo` 24종) · **자매** [MOCKUP_REVIEW_v1.md](./MOCKUP_REVIEW_v1.md)
> **v5 → v5.1** — 합의에 따라 **#15 웹캠 비식별화(비용 대비 효용 낮음) · #20 커버리지 빌더 · #21 POP Maker · #22 번역기 제외(기각)**. 잔여 4종(#16~#19)을 개발 직행 수준으로 상세화. v4 결정 D1~D8과 공통 규칙 상속.

---

## 0. 확정 라인업

| # | 항목 | 역할 | 톤/언어 | 난이도 |
|---|---|---|---|---|
| #16 | StoreDayTimelapse | 세계관 종합 — "한 매장의 하루" | 라이트 · 점주/본부 공용 | 중상 |
| #17 | AlertFatigueComparison | Agent 차별화 한 컷 | 라이트 · 영문 우선(D6) | 하 |
| #18 | PrivacyJourney | 프라이버시 원리 증명 | 다크(D5) · 회색조+블루 | 중 |
| #19 | AgentDaySimulator | 메시지 체화 — 방문자가 승인 | 라이트 · 한글(점주向, D6) | 중상 |

**기각 확정**: #15(실시간 웹캠 비식별화 — 모델 비용·체감 애매), #20(커버리지 빌더), #21(POP Maker), #22(번역기). 이에 따라 #15·#22에 흡수됐던 이월 항목은 §5 백로그로 복귀.

**공통 규칙(상속 + v5 신설분 유지)**: 수치 canonical 파생 · 입력 미전송(서버 호출 0) · 폴백/빈화면 금지 · 결과 화면에서만 CTA 1개 · 데모당 추가 JS ≤ 300KB · reduced-motion 가드 · ko/en/jp 3로케일.

---

## 1. #17 AlertFatigueComparison — "1,247건 vs 3장" (첫 착수)

**목적/청자** — Agent의 핵심 차별화(알림 피로 → 우선순위)를 한 화면 대비로. 본부 의사결정자(페르소나 A·B).
**배치** — `products/store-agent` 상단(PriorityEngineDiagram 위) + `/demo` Experience.

### 레이아웃
- 데스크탑: 좌우 2패널(1:1) + 중앙 세로 구분선 위 카운터 칩. 모바일: 상하 stack(좌패널 높이 축소 60%).
- **좌패널 "Legacy CCTV alerts"** — 회색 결의 generic 알림 행(아이콘+한 줄+타임스탬프)이 위에서 아래로 쌓임. 패널 하단 40%는 blur+fade 그라데이션(읽기 유도 방지). 우상단 카운터 `1,247 alerts today`.
- **우패널 "saai | store agent"** — 기존 ActionCard 카드 3장(영문 변형) 정렬 상태로 등장. 우상단 카운터 `3 priorities`.
- 헤딩(takeaway): ko "하루 1,247건의 알림. 필요한 건 3장입니다." / en "1,247 alerts a day. You need three."

### 데이터/구현
- 좌패널 알림 텍스트: `canonical.hq`의 1,247건 수치 + generic 문구 풀 12종 순환(의미 없는 노이즈임이 보이도록 반복 허용). **DOM 윈도잉 최대 40행** — 가상 스택, 행 재활용.
- 우패널: `actionCards` 데이터 재사용(영문 라벨은 D6 분기).
- 파일: `src/components/mockups/AlertFatigueComparison.tsx` + 문구 풀은 `mockup-scenarios/storeagent.ts`에 추가.

### 애니메이션 타이밍
- 진입(isVisible): 좌패널 쌓임 시작 — 초당 6행 → 3초 후 초당 14행 가속, 카운터 useCountUp 8초에 1,247 도달. 우패널 카드는 2초 시점에 stagger 180ms로 3장 등장 후 **정지**(대비의 핵심: 좌=소란, 우=고요).
- 루프: 12초 휴지 후 리셋(useMockupLoop, pauseOnHover).
- reduced-motion: 좌패널 정적 40행+카운터 1,247 고정, 우 3장 고정.

### 완료 기준
- [ ] 좌패널 쌓임이 읽기 시도를 유발하지 않음(blur 검증) · DOM ≤ 40행 유지
- [ ] 카운터-스택 동기 · 1,247 수치 canonical 파생
- [ ] 모바일 stack에서 대비 구조 유지 · reduced-motion 정적 대비
- [ ] aria-hidden(장식) + 헤딩/요약 텍스트로 의미 전달

**공수**: 1~1.5일.

---

## 2. #18 PrivacyJourney — 프레임 하나의 생애주기

**목적/청자** — "원본이 시스템에 존재하지 않는 구간"의 시각 증명. 규제·심사역·본부 IT.
**배치** — `technology` 허브(AnonymizationMockup 인접) + `/demo`. 다크(D5), 액센트 회색조+블루.

### 구성 — 가로 5단계 스테퍼
| 단계 | 라벨(ko) | 시각 표현 |
|---|---|---|
| ① | 카메라 프레임 | 프레임 카드(추상 CCTV 씬, 얼굴=회색 원형) 등장 |
| ② | 엣지 비식별화 | 프레임 위 모자이크 적용 + `0.03s` 칩(기존 수치 어휘) |
| ③ | 신호 추출 | 6카테고리 칩(Pattern·Detection·Priority·Response·Context·Outcome)이 프레임에서 분리돼 위로 빠져나옴 |
| ④ | **원본 폐기** | 프레임 카드가 픽셀 디졸브로 소멸 — 클라이맥스. 라벨 "원본은 저장되지 않습니다" |
| ⑤ | 이벤트 허브 전달 | 신호 칩만 허브 노드로 이동(IntegratedLoopDiagram의 허브와 동일 어휘) |

- 하단 2열 표(정적): **남는 것**(익명 신호·이벤트 메타) vs **남지 않는 것**(원본 영상·얼굴·개인 식별 정보).
- 단계 노드 클릭 시 해당 단계로 점프(자동 진행은 useMockupLoop 단계당 2.2초, ④만 3초).

### 구현 노트
- 전체 SVG + framer-motion. ④ 디졸브는 SVG mask + 12×9 셀 opacity stagger(셀당 30ms 랜덤 시드 — SSR 안정 위해 결정적 시드).
- 파일: `src/components/mockups/PrivacyJourneyMockup.tsx`. 단계 카피는 `mockup-scenarios/technology.ts`(신설)에.
- 카피 출처: Anonymizer 페이지 스펙의 "Forward analytical signal" 결 + 공통 신호 6카테고리. 헤딩(takeaway): "0.03초 뒤, 원본은 없습니다."

### 완료 기준
- [ ] ④ 소멸 모먼트가 자동 재생/클릭 탐색 모두에서 명확 · reduced-motion 시 단계 정지 화면+표만
- [ ] 6카테고리 어휘가 #1 IntegratedLoopDiagram·#6 SealSdk 로그와 문자열 일치
- [ ] 2열 표 시멘틱(`<table>` caption) · SVG `<title>`·`<desc>`
- [ ] 그라데이션/그림자 금지 준수(다크 내 블루 액센트만)

**공수**: 2일.

---

## 3. #16 StoreDayTimelapse — 강남역점의 하루 (마스터 데모)

**목적/청자** — 24종 목업이 공유하는 세계관을 한 화면에 종합. `/demo` 상단 간판 + 홈 후보. 점주·본부 공용.

### 선행: canonical `dayTimeline` 블록 신설
```ts
// canonical.ts에 추가 — 모든 값은 기존 canonical 수치와 합산 정합(하루 합 = ₩1,245,000 · 342명)
interface DayTimeline {
  hours: { h: number /*6~24*/; sales: number; visitors: number; heat: number[] /*5×5*/ }[];
  events: {
    t: number;            // 분 단위 (예: 14*60+20)
    kind: 'care' | 'agent' | 'insight';
    refId: string;        // 기존 시나리오 id 참조 (fridge-open, 우산 발주 카드 등)
    summary: string;      // 피드 1줄 (30자 규격, Care는 한글)
  }[];
}
```
- 이벤트 배치(초안): 07:10 아침 브리핑(insight) · 09:40 결품 감지(care/shelf-empty) · 11:30 우산 발주 제안(agent) · 14:20 매출 피크 가설(insight) · 16:00 피크 인력 제안(agent) · 18:45 냉장고 문 열림(care/fridge-open) · 23:30 야간 모드 전환(care/intrusion 대기). **총 7이벤트 — 기존 시나리오 id만 참조, 신규 카피 최소화.**
- 이 블록은 타임랩스 전용이 아니라 **SOT 검증 장치**: 시간대 합이 canonical 일계와 어긋나면 빌드 시 console.warn(개발 모드 단언).

### 레이아웃
- 데스크탑(16:10 패널): 상단 바 — 현재 시각 디지털 시계(06:00~24:00) + 재생/일시정지 토글 + 타임 슬라이더(트랙 위에 이벤트 마커 7점, kind별 색: care=emerald, agent=blue, insight=violet — 제품 3색은 D2상 제품 UI 영역이므로 허용).
- 본문 3열: ① 시간대 차트(과거 실선·현재 강조·미래 점선 — 기존 시간 인지형 패턴 재사용) ② 구역 히트맵(시간대별 heat 보간 전환) ③ 이벤트 피드(현재 시각까지 발생분이 위로 쌓임, 카드 미니어처).
- 하단: KPI 4종(매출·방문·체류·전환) — 스크럽 위치까지의 누적값 카운트업.
- 모바일: 시계+슬라이더 고정 상단, 본문 세로 stack(차트→피드, 히트맵은 접기).

### 인터랙션 & 상태
- 상태머신: `playing(자동 30초/바퀴) ↔ scrubbing(드래그 중) ↔ paused`. 드래그 시작 시 자동 정지, 놓으면 paused 유지(자동 재개 안 함 — 사용자 주도권 존중).
- 슬라이더: 드래그(마우스/터치) + 키보드 ←→ 30분, PgUp/PgDn 2시간, Home/End. `role="slider"` + aria-valuetext("14시 30분").
- 이벤트 마커 클릭 → 해당 시각으로 점프 + 피드의 해당 카드 하이라이트.
- 스크럽 성능: 차트·히트맵·KPI는 시각 t의 순수 함수(파생 계산 memo) — 상태는 t 하나만. 60fps 목표, heat 보간은 rAF 스로틀.

### 구현 노트
- 파일: `src/components/mockups/StoreDayTimelapse.tssx` → `.tsx` + `useDayClock` 훅(스크럽/재생 상태) 분리.
- 키오스크 모드 props 유지(`kiosk?: boolean` — 전체화면·무조작 90초 후 자동 리셋): 박람회 터치 모니터 재사용 대비.
- reduced-motion: 자동 재생 비활성(초기 t=현재 실제 시각), 슬라이더 수동만, 카운트업 즉시값.

### 완료 기준
- [ ] 스크럽 60fps(저사양 30fps 폴백: 히트맵 보간 생략) · 자동 재생 30초/바퀴
- [ ] 모든 수치 dayTimeline 파생 + 일계 정합 단언 통과
- [ ] 이벤트 7종이 기존 목업 시나리오와 id 수준 일치(타임랩스에서 본 알림 = StoreCare 목업의 그 알림)
- [ ] 키보드 완주 가능 · aria-valuetext · reduced-motion 경로
- [ ] 키오스크 모드 동작(90초 자동 리셋)

**공수**: 3~4일 (dayTimeline 데이터 0.5일 포함).

---

## 4. #19 AgentDaySimulator — 에이전트와 하루 운영해보기

**목적/청자** — [승인]=사람의 자리 메시지를 분기 체험으로 체화. 점주向(한글, D6).
**배치** — `storeagent/how-it-works` 하단 또는 `/demo`. PhoneFrame 안에서 진행(기존 결 유지).

### 3막 구조 & 상태머신
`intro → decide(카드 3장 순차) → calculating(1.2초) → result → (다시하기 → decide 리셋)`

- **① intro (아침 브리핑)** — BriefingMockup 축약판(날씨+팁 2카드, 자동 재생 5초 또는 [시작] 탭). 카피: "오늘 에이전트가 3가지를 제안합니다. 점주님이 결정하세요."
- **② decide** — 기존 actionCards에서 3장 고정: 우산 발주(날씨) / 삼각김밥 발주(재고) / 피크 인력(대기). 카드마다 [승인]/[보류] 2버튼 — 방문자가 직접 탭(자동 진행 없음). 선택 즉시 카드가 기존 dismiss 모션으로 퇴장(승인=우측+체크, 보류=좌측+회색), 다음 카드 등장.
- **③ calculating** — "하루를 시뮬레이션하는 중" 1.2초(타이핑 도트 재사용).
- **④ result (저녁 결산)** — 일매출 결과 카운트업 + 선택 요약 3행 + 베이스 대비 델타.

### 분기 데이터 (8조합 사전 정의 — canonical 파생)
```ts
// mockup-scenarios/simulator.ts (신설)
const BASE = canonical.dailySales; // ₩1,245,000
const deltas = {
  umbrella: { approve: +38_000, hold: { delta: 0, note: '오후 강수 — 우산 문의 9건 놓침' } },
  onigiri:  { approve: +21_000, hold: { delta: -14_000, note: '15시 품절 — 기회손실' } },
  staffing: { approve: +17_000, hold: { delta: 0, note: '대기 3.2분 유지 — 이탈 2건 추정' } },
};
// 결과 = BASE + Σ(선택별 delta). 8조합 모두 결산 문구 1줄씩 사전 작성(카피 8줄).
```
- **보류가 항상 손해는 아니게** 설계(umbrella·staffing 보류는 delta 0 + 관찰 노트만) — "AI가 강요하지 않는다"는 메시지. 결산에 각주: "이 결과는 사전 정의된 시나리오 분기입니다."
- 결산 카피 8줄은 구현 전 카피 트랙에서 선행 확정(Care 보이스 — 한글, 콕 집어, 숫자 동반).

### 결산 화면 구성
- 헤드: "오늘의 강남역점" + 일매출 결과(useCountUp) + 베이스 대비 `+₩76,000` 칩.
- 선택 요약 3행: 카드명 · 선택 · 결과 1줄(승인=효과, 보류=노트).
- 푸터: [다시 해보기](상태 리셋) + CTA 1개 "내 매장으로 계산해보기 → ROI 계산기(#14)" (§공통 규칙 — CTA는 여기 1곳만).
- 진행 상태는 컴포넌트 메모리만(저장 없음) — 이탈 시 초기화.

### 완료 기준
- [ ] 3분 내 완주 · 자동 진행 없는 수동 결정(②) · 분기 8조합 수치 = deltas 합산과 일치
- [ ] 보류 선택에도 의미 있는 결산 문구 · "사전 정의 시나리오" 각주 노출
- [ ] [승인]/[보류] 터치 타깃 ≥ 44px · 키보드 조작 가능 · reduced-motion 시 모션 없이 단계 전환
- [ ] ROI CTA 1개 외 링크 없음
- [ ] **소급 동시 적용**: 기존 ActionCardMockup 자동 데모도 3승인+1보류+1잔류 리듬으로 변경(REVIEW 3-3) — 시뮬레이터와 같은 dismiss 모션 공유

**공수**: 3일 (카피 8줄 선행 0.5일 포함).

---

## 5. 백로그 (기각 항목에서 복귀한 소작업 포함)

| 항목 | 출처 | 처리 |
|---|---|---|
| **Anonymization 실사 전환(정적)** — cctvImages 스틸 + CSS 모자이크 오버레이로 기존 슬라이더 업그레이드 | REVIEW 1-5 (#15 기각으로 복귀) | E-S2에서 #18과 같은 사이클(같은 페이지 결) — 웹캠 없이도 '그림 같다' 문제는 해소 |
| **채팅 입력 타이핑 시뮬레이션** — 입력창 타이핑→전송 탭→버블 | REVIEW 1-4 (#22 기각으로 복귀) | E-S3에서 ChatMockup 단독 개선으로 |
| AnonymizationMockup 기본 locale ko→en · URL 도메인 `app.saai.ai/*` 통일 | REVIEW 1-3 | E-S1 소작업 |
| 컨테이너 쿼리 타이포 스케일 | REVIEW 2-1 | E-S4 (독립 폴리시) |
| SaaiPlatform 위젯 대시보드 | v4.1 이월 | 계속 보류 — #16 타임랩스 반응 본 후 재논의 |

---

## 6. 스프린트 계획 (개정)

| 스프린트 | 항목 | 선행 조건 | 공수 |
|---|---|---|---|
| **E-S1** | #17 알림 피로 비교 + 소작업(locale/URL) | 없음 — 즉시 착수 | ~2일 |
| **E-S2** | #18 프라이버시 여정 + Anonymization 실사 전환(정적) | 없음 | ~3일 |
| **E-S3** | #19 시뮬레이터(+ActionCard 리듬 소급) + 채팅 타이핑 | **결산 카피 8줄 선행 확정** | ~3.5일 |
| **E-S4** | #16 하루 타임랩스 (+ 컨테이너 쿼리 타이포) | **dayTimeline 블록 설계 리뷰** | ~4일 |

- E-S1·E-S2는 의존성이 없어 병행 가능. #16을 마지막에 둔 이유: dayTimeline이 기존 24종의 수치를 한 화면에서 교차 검증하므로, 소급 수정(#19의 ActionCard 리듬 등)이 끝난 뒤가 안전.
- 카피 선행 2건(E-S3 결산 8줄 · E-S4 이벤트 7건 summary)은 개발과 분리해 먼저 확정 — 막히면 스프린트가 통째로 밀리는 항목.

## 7. 노출 & 체크리스트

- `/demo`에 **Experience** 섹션 신설 — 4종 등록(24종 → 28종). 제품/기술 페이지에는 §1~4 배치 지정 자리 1곳씩만.
- #16·#19는 키오스크/터치 대응 — 박람회 부스 재사용 후보.

- [x] E-S1 — #17 AlertFatigueComparison + AnonymizationMockup 기본 locale ko→en
- [x] E-S2 — #18 PrivacyJourney (다크) · technology 허브 배치
- [x] 카피 선행 — #19 결산 8줄(simulator.ts SIM_COPY.combos) · #16 이벤트 7건(canonicalDay.events, 기존 시나리오 id 참조)
- [x] E-S3 — #19 AgentDaySimulator
- [x] E-S4 — #16 StoreDayTimelapse
- [x] 본 문서 갱신 + `/demo` Experience 반영 (28종)

> **구현·리뷰·빌드 완료 (2026-06-05)** — 체험형 4종 전부 구현: `src/components/mockups/{StoreDayTimelapse,AlertFatigueComparison,PrivacyJourneyMockup,AgentDaySimulator}.tsx`. 선행 데이터: `canonical.ts`의 `canonicalDay`(Σsales=₩1,245,000·Σvisitors=342 정합, SOT 단언 내장) · `simulator.ts`(SIM_DELTAS/8조합 8줄) · `technology.ts`(PRIVACY_COPY·SIGNAL_CATEGORIES) · `storeagent.ts`의 `alertNoisePool`. `/demo`에 **Experience 섹션** 신설 → 총 **28종**. 페이지 배치: #17→`products/store-agent`(PriorityEngine 위), #18→`/technology`(Anonymizer 인접, 다크 밴드). #16·#19는 `/demo` 노출(§7 "또는 /demo" 허용).
>
> **리뷰**: feature-dev:code-reviewer로 4종+데이터 검토 — P0 0건, P1 5건. 수정 4건(타임랩스 play 버튼 44px·네이티브 range 중복 ARIA 제거·heat rAF unmount 가드·PrivacyJourney reduced-motion dissolve 노드 가드). 1건은 false-positive(AlertFatigue reduced-motion early-return으로 이미 안전)로 미수정. 데이터 합·simTotal 8조합·단일 CTA·결정성 시드는 검토 통과.
>
> **빌드**: `npm run build` EXIT=0 · ✓ Compiled successfully · 595/595 정적 페이지. 프로덕션 서버에서 /demo·/technology·/products/store-agent 콘솔 0 에러.
>
> **잔여 백로그(미착수)**: Anonymization 실사 전환(정적 CSS 모자이크) · 채팅 타이핑 시뮬레이션 · ActionCard 리듬 3승인+1보류+1잔류(REVIEW 3-3) · 컨테이너 쿼리 타이포(2-1) · URL 도메인 app.saai.ai 통일 · #16 홈 배치(후보).
