# 홈페이지 Tier 0 목업 배치 작업지시서 (v1)

> 작성 2026-07-23 · 대상: `ds-hp-temp` 홈페이지(`src/components/corporate/HomeView.tsx` 및 하위 6개 섹션)
> 선행 문서: `docs/MOCKUP_ELEVATION_ROLLOUT_PLAN_v1.md`(§4 Tier 0 표), `docs/MOCKUP_SYSTEM_GUIDE.md`(콘텐츠 오버라이드 규약)
>
> **이 문서의 성격.** 실제 코드 변경은 아직 하지 않았다 — 이 문서는 "누가 이 작업을 이어받아도 바로 실행할 수 있도록" 섹션별 현재 상태·목표·구체적 변경 지점을 코드 인용과 함께 기록한 작업지시서다. `ROLLOUT_PLAN_v1.md` §4 Tier 0 표의 6개 섹션을 그대로 따르되, 실제 파일을 열어본 결과를 반영해 더 구체화했다.

---

## 0. 공통 원칙

1. **모든 신규 목업은 `next/dynamic`으로 지연 로드한다.** `HomeView.tsx`가 이미 `SpatialTrajectoryMockup`을 이 방식으로 쓰고 있다(`HomeView.tsx:20-22`):
   ```tsx
   const SpatialTrajectoryMockup = dynamic(() => import('@/components/mockups/SpatialTrajectoryMockup'), {
     loading: () => <div className="h-[400px] animate-pulse rounded-2xl bg-gray-100" />,
   });
   ```
   새로 투입하는 목업(`ChatMockup`, `StoreInsightMockup`, `MultiStoreDashboardMockup`/`HqMapDashboardMockup`, `IntegratedLoopDiagram`, `ActionCardMockup`, `KakaoAlertMockup`)도 각 섹션 파일 상단에서 동일 패턴으로 선언한다. 목업 대부분이 framer-motion + 여러 훅을 쓰는 무거운 클라이언트 컴포넌트라, 정적 import하면 홈페이지 초기 번들이 불필요하게 커진다.

2. **`content` prop은 기본값을 신뢰하고, 필요할 때만 연다.** 이번 세션에서 리팩터한 컴포넌트는 전부 `locale`만 넘겨도 완결된 기본 문구로 렌더링된다. 홈페이지 문맥에 맞게 문구를 바꿔야 할 때만 `content={{ ... }}`(부분 병합) 또는 배열형 prop(`scenarios`/`data`, 통째 교체)을 쓴다 — 굳이 모든 필드를 다시 채우지 않는다.

3. **섹션 하나씩 순서대로 작업하고, 매번 로컬 빌드 확인.** 6개 섹션을 한 번에 다 바꾸지 말고, 아래 §2의 순서대로 하나씩 적용 → `npm run build`(또는 `npx tsc --noEmit`) → 눈으로 확인(ko/en/jp 3로케일 + `prefers-reduced-motion`) → 다음 섹션. 홈페이지는 이 사이트에서 가장 트래픽이 큰 페이지라 한 번에 여러 곳을 바꾸면 문제 발생 시 원인 추적이 어렵다.

4. **기존 카피/CTA/링크 구조는 최대한 보존한다.** 이번 작업의 범위는 "텍스트만 있던 자리에 시각 자료를 더하는 것"이지 카피라이팅이나 정보구조 재설계가 아니다. 새 목업은 기존 레이아웃의 빈 시각 슬롯(우측 컬럼, 배경, 카드 안쪽 등)에 추가하거나 기존의 단순한 장식 요소(막대바 2개, 정적 스크린샷 1장 등)를 대체하는 선에서 그친다.

5. **완료 후 각 섹션에 `MOCKUP_SYSTEM_GUIDE.md` §0 표 스타일로 한 줄씩 기록을 남긴다.** 이 문서의 각 섹션 작업이 끝나면 `docs/MOCKUP_SYSTEM_GUIDE.md`에 "Tier 0 배치 완료" 행을 추가해 무엇을 바꿨는지 남긴다(이번 문서 자체는 사전 계획이라 실행 기록은 별도로 쌓는다).

---

## 1. 섹션별 작업 지시

### 1-1. 전환부 — "SAAI는 알고 있습니다" 배경 무드 이미지

- **파일**: `src/components/corporate/CorporateHero.tsx`
- **위치**: 142~156줄, "Transition Bridge" 주석 블록
- **현재 상태**:
  ```tsx
  {/* Transition Bridge — "SAAI는 알고 있습니다" */}
  <div className="mt-16 pt-10 border-t border-gray-200/80 text-center max-w-3xl mx-auto">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-3">
      Transition · SAAI’s Answer
    </div>
    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 break-keep font-display">
      SAAI는 알고 있습니다.
    </h3>
    <p className="mt-2.5 text-sm sm:text-base text-gray-600 break-keep">
      이미 달린 CCTV만으로 매장의 모든 동선과 행동을 데이터와 실시간 실행으로 바꾸는 방법.
    </p>
    <div className="mt-4 flex justify-center">
      <span className="inline-block animate-bounce text-primary text-lg">↓</span>
    </div>
  </div>
  ```
  텍스트 + 화살표뿐. **참고**: 이 블록의 `h3`/`p`가 로케일 분기 없이 한국어로 하드코딩돼 있다 — en/jp에서도 한국어가 그대로 노출되는 기존 버그. 이번 작업 범위는 아니지만 손대는 김에 `homeCopy`나 별도 `Record<Locale,...>` 딕셔너리로 옮기는 걸 권장(§4 참고).
- **목표**: `ROLLOUT_PLAN_v1.md` §4는 `public/images/gen/bg-film00-night-cvs.png` 또는 `iso-city-stores.png`를 배경 무드 이미지로 제안했다.
- **구체적 변경**:
  1. 이 블록을 감싸는 `<div>`에 `relative overflow-hidden` 추가.
  2. `aria-hidden="true"`인 절대배치 배경 레이어를 추가해 두 이미지 중 하나를 `bg-cover bg-center opacity-*`로 깐다. `HomeView.tsx:126-131`(Beat 8 CTA 섹션)이 이미 같은 패턴을 쓰고 있으니 그대로 참고:
     ```tsx
     <div
       aria-hidden="true"
       className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-40"
       style={{ backgroundImage: `url(${BASE}/images/gen/bg-film00-night-cvs.png)` }}
     />
     ```
     `BASE`는 `HomeView.tsx`에만 정의돼 있다(`CorporateHero.tsx`엔 없음) — `CorporateHero.tsx`에도 동일하게 `const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';`를 추가하거나, `BASE` 없이 절대경로 `/images/...`로 시작해도 되는지 다른 이미지 참조 방식(`heroImg`, `siteImages.ts`)과 통일할 것.
  3. 텍스트 대비를 위해 `bg-white/70` 또는 `bg-gradient-to-t from-white via-white/80` 오버레이를 배경과 텍스트 사이에 하나 더 깔 것(현재 섹션 배경이 순백 `#FCFCFE`라 이미지가 그대로 깔리면 가독성이 떨어질 수 있음).
  4. 별도 목업 컴포넌트는 필요 없음 — 정적 이미지 asset 재사용만으로 끝나는 가장 가벼운 작업.

### 1-2. "범용 AI vs SAAI" 비교 카드

- **파일**: `src/components/corporate/SpaceAiAnswerBeat.tsx`
- **위치**: 105~173줄, "Comparison Grid" — 좌측(범용 AI, 108~131줄) / 우측(SAAI, 133~172줄)
- **현재 상태**: 양쪽 다 아이콘(`Bot`/`SaaiSymbol`) + 제목 + 설명 + 체크/엑스 리스트뿐, 실제 화면 목업 없음.
- **목표**: `ROLLOUT_PLAN_v1.md` §4는 좌측에 `ChatMockup`, 우측에 `SpatialTrajectoryMockup` 또는 `StoreInsightMockup`을 제안했다.
- **구체적 변경**:
  1. 두 카드 다 현재 `flex flex-col justify-between`으로 텍스트만 쌓여 있다 — 각 카드 하단(불릿 리스트와 "Generic Text Model"/CTA 사이, 128줄·160줄 부근)에 목업을 위한 시각 슬롯을 추가하거나, 카드 레이아웃 자체를 `grid` 2단(텍스트 위 / 목업 아래, 또는 좌텍스트-우목업)으로 바꾼다. 이 섹션은 다크 배경(`section-dark`)이라 목업의 밝은 phone frame이 잘 도드라질 것 — 대비 확인 필요.
  2. **좌측(범용 AI 카드)**: `ChatMockup`에 일반 텍스트 AI가 매장 맥락을 못 읽는다는 뉘앙스의 `scenarios`를 새로 써서 넣는다(예: 점주가 매장 이슈를 물어봐도 일반론만 답하는 대화) — `ChatMockup`은 `scenarios?: ChatMessage[][]`를 통째 교체 방식으로 받는다(`docs/MOCKUP_SYSTEM_GUIDE.md` §2-3 예시 참고).
  3. **우측(SAAI 카드)**: `StoreInsightMockup`(이번 세션에 리팩터 완료, `content` prop 지원) 또는 `SpatialTrajectoryMockup`(기존에 이미 홈페이지 Beat 7에서 쓰는 중이라 중복 배치가 될 수 있음 — 가급적 `StoreInsightMockup`을 권장). `PRODUCT_THEME.StoreInsight`가 violet 톤이라 이 섹션의 `primary`(블루) 강조와 색이 부딪힐 수 있음 — 카드 안에 넣을 때 프레임 테두리 등으로 시각적 구획을 분리할 것.
  4. 두 목업 다 phone-frame 컴포넌트라 세로로 길다 — 카드 폭(현재 `lg:grid-cols-2`) 안에 넣으면 카드 높이가 크게 늘어날 수 있으니, `scale-[0.85]` 류의 축소 또는 `max-w-[240px] mx-auto` 같은 폭 제한을 함께 검토.

### 1-3. "모든 매장을, 한 매장처럼"

- **파일**: `src/components/corporate/HomeEnterpriseBeat.tsx`
- **위치**: 67~86줄, `lg:col-span-5` 우측 비주얼
- **현재 상태**: (스카우트 조사에서 "라벨 2개뿐"으로 보고됐으나 실제로는) 막대그래프 형태의 미니 장식 — before는 높이 제각각인 회색 막대 7개(`[52,80,36,64,44,88,56]`), after는 파란색 막대 1개(`h-24`, `shadow-card`), 사이에 화살표:
  ```tsx
  <div className="lg:col-span-5">
    <div className="flex items-end justify-center gap-6 sm:gap-8">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-24 items-end gap-1.5" aria-hidden="true">
          {[52, 80, 36, 64, 44, 88, 56].map((h, i) => (
            <span key={i} className="w-2.5 rounded-t-sm bg-gray-200" style={{ height: `${h}px` }} />
          ))}
        </div>
        <span className="text-2xs font-semibold uppercase tracking-[0.15em] text-gray-500">{t.before}</span>
      </div>
      <ArrowRight className="mb-9 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-24 items-end" aria-hidden="true">
          <span className="w-9 rounded-t-md bg-primary shadow-card" style={{ height: '96px' }} />
        </div>
        <span className="text-2xs font-semibold uppercase tracking-[0.15em] text-primary">{t.after}</span>
      </div>
    </div>
  </div>
  ```
- **목표**: `ROLLOUT_PLAN_v1.md` §4는 `MultiStoreDashboardMockup` 또는 `HqMapDashboardMockup`을 제안했다. 이 장식 막대는 완성도가 낮진 않지만(디자인 토큰은 맞게 쓰고 있음) "본사 한 화면" 카피가 약속하는 실제 대시보드 느낌을 주지 못한다.
- **구체적 변경**:
  1. `lg:col-span-5`는 폭이 좁다(전체 12컬럼 중 5) — `MultiStoreDashboardMockup`/`HqMapDashboardMockup` 둘 다 데스크톱 대시보드 목업이라 원래 폭이 넓게 설계됐을 가능성이 높다. 그대로 넣으면 비좁으니 (a) 섹션 그리드 비율을 `lg:col-span-7` / `lg:col-span-5`에서 좀 더 균형 있게(예: 6:6) 조정하거나, (b) 목업을 축소 렌더링(`scale-[0.7]` + `origin-top-left` + 컨테이너 `overflow-hidden`)하는 두 방향 중 결정 필요.
  2. 현재의 막대그래프 자체는 "편차 → 표준" 메시지를 시각적으로 잘 전달하고 있어서, 완전히 들어내기보다 **막대그래프는 유지하고 그 아래나 옆에 목업을 추가로 배치**하는 절충안도 고려할 만하다(§0 원칙 4 "기존 요소 보존" 참고) — 최종 판단은 실제 화면에서 두 방향을 다 렌더링해보고 정할 것을 권장.
  3. 어느 쪽이든 `locale` prop은 그대로 넘기고, 카피는 기본값 사용(별도 `content` 오버라이드 불필요 — "본사 한 화면"이라는 맥락과 두 컴포넌트의 기본 카피가 이미 잘 맞음).

### 1-4. "SAAI 네 글자(S·A·A·I)" 프라미스 레이어

- **파일**: `src/components/corporate/FeatureCarousel.tsx`
- **위치**: 174~200줄, "Promise layer" 섹션
- **현재 상태**: `promise.pillars`(4개, `saaiPromiseLayer[locale]`에서 옴) 배열을 `grid grid-cols-2 lg:grid-cols-4`로 렌더링 — 각 카드는 글자 배지 + 라벨 + 한 줄 설명 + 화살표뿐, 이미지/도식 없음.
- **목표**: `ROLLOUT_PLAN_v1.md` §4는 `public/images/diagrams/four-step-loop.webp` 또는 `IntegratedLoopDiagram`을 제안했다.
- **⚠️ 결정 필요**: `IntegratedLoopDiagram`은 자체 헤딩("세 시간 축이 하나의 운영 루프로 닫힙니다")·리드 문구·3장 원칙 카드·CTA까지 포함한 **완결된 하나의 섹션**이다(Insight/Care/Agent 3제품 통합 다이어그램이지, "S·A·A·I 네 글자" 프레이밍이 아니다). 이 pillars 그리드를 그대로 대체하기엔 메시지 프레임이 다르다 — 두 옵션 중 하나를 정할 것:
  - **(A, 가벼움)** 정적 이미지 `four-step-loop.webp`를 pillars 그리드 위나 아래에 장식 도식으로 추가만 한다. 카피/구조는 그대로 유지.
  - **(B, 무거움)** `IntegratedLoopDiagram`을 pillars 그리드 **다음에 새 서브섹션으로 추가**한다(대체가 아니라 추가) — "네 글자 각각의 의미"(현재 그리드) → "그 넷이 어떻게 하나의 루프로 맞물리는지"(`IntegratedLoopDiagram`)로 이어지는 자연스러운 흐름이 된다. `content` prop으로 `heading`/`lead`를 "SAAI 네 글자가 어떻게 맞물리는지" 쪽으로 살짝 조정하는 것도 고려.
  - 어느 쪽이든 `IntegratedLoopDiagram`은 세로로 긴 SVG 다이어그램이라 `FeatureCarousel.tsx`의 `max-w-4xl`(177줄) 컨테이너 폭 제약과 잘 맞는지 확인.
- **구체적 변경(옵션 B 기준)**: 199번째 줄(`</div>` pillars 그리드 닫힘) 다음, 202줄 "Bridge" 문단 전에 `<IntegratedLoopDiagram locale={locale} className="mt-10" />`를 동적 import로 추가.

### 1-5. "다음을 실행하다(saai agent)" — 캐러셀의 agent 슬라이드

- **파일**: `src/components/corporate/FeatureCarousel.tsx`
- **위치**: `PRODUCTS` 배열의 `agent` 엔트리(59~62줄) + 이미지 패널 렌더링 로직(294~327줄)
- **현재 상태**:
  ```tsx
  {
    key: 'agent', name: productNaming.agent.store, saaiName: productNaming.agent.saai, mode: 'agent', icon: ClipboardCheck, href: '/products/saai-agent',
    images: [{ src: '/images/storeagent-ai-pop-mockup.webp', primary: true }],
  },
  ```
  이미지 패널(294~327줄)은 `active.images[0]`을 `<Image fill>`로 꽉 채워 보여주고, `active.images[1]`이 있으면 우하단에 겹쳐서 작게 추가로 보여주는 구조(`AnimatePresence` + `motion.div` swap). `agent`는 `images[1]`이 없어서 캐러셀이 이 슬라이드일 때 스크린샷 1장만 보인다.
- **목표**: `ROLLOUT_PLAN_v1.md` §4는 `ActionCardMockup` + `KakaoAlertMockup` 투입을 제안했다.
- **⚠️ 결정 필요 — 이 패널은 지금 전부 정적 `<Image>` 기반이라, 살아있는 React 목업 컴포넌트를 끼워 넣으려면 구조를 바꿔야 한다**:
  - **(A, 최소 변경)** 기존 패턴 그대로 유지하고, `agent.images`에 실제 제품 스크린샷을 하나 더 확보해 `images[1]`을 채운다(`ROLLOUT_PLAN_v1.md` §5-3 "실제 제품 스크린샷 요청"과 같은 방향). 코드 변경 없이 asset만 추가하면 끝 — 가장 안전하지만 "목업 활용"이라는 이번 트랙의 취지와는 약간 어긋남.
  - **(B, 목업 투입)** 294~327줄의 이미지 패널을 `active.key === 'agent'`일 때만 `<Image>` 대신 `<ActionCardMockup locale={locale} />`(또는 `KakaoAlertMockup`)를 렌더링하도록 분기한다. 다만 이 패널은 `aspect-[4/3]` 고정 비율 컨테이너인데 `ActionCardMockup`/`KakaoAlertMockup`은 세로로 긴 phone-frame이라 비율이 안 맞는다 — 컨테이너 aspect 제약을 `agent` 슬라이드에서만 예외 처리하거나, 목업을 감싸는 `overflow-hidden` + 상단 정렬 크롭이 필요.
  - **(C, 절충)** 정적 이미지는 그대로 두고, 캐러셀 카드 자체 바깥(우하단 등)에 작은 `ActionCardMockup` 미리보기를 겹쳐서 추가하는 것도 가능 — `images[1]` 오버레이 자리(307~324줄)를 목업으로 대체하는 방식이라 (B)보다 변경 범위가 작다.
  - 최종 방향은 (A)/(B)/(C) 중 실제 화면에서 비교해보고 정할 것을 권장. (B)/(C)는 캐러셀이 자동 순환(`interval: 3600`)하는 동안 목업 자체의 내부 애니메이션(`ActionCardMockup`의 카드 승인 시퀀스는 재생에 10초 이상 걸림)이 슬라이드 전환 주기와 어긋날 수 있다는 점도 감안 — `active` prop을 `active.key === 'agent'`에 연동해 다른 슬라이드일 때는 목업 애니메이션을 정지시킬 것.

---

## 2. 권장 실행 순서

작업 난이도·리스크가 낮은 순서대로:

1. **1-1 전환부 배경 이미지** — 코드 변경 최소, 기존 패턴(Beat 8) 그대로 재사용. 로케일 하드코딩 버그도 함께 고칠지 결정.
2. **1-3 "모든 매장을, 한 매장처럼"** — 컴포넌트 삽입 위치가 명확(우측 컬럼 하나), 결정 사항은 폭 조정 방식뿐.
3. **1-2 "범용 AI vs SAAI" 비교 카드** — 컴포넌트 2개(`ChatMockup`+`StoreInsightMockup`) 동시 투입, 다크 배경 대비 확인 필요.
4. **1-5 agent 캐러셀 슬라이드** — 구조적 분기(A/B/C) 결정이 선행돼야 함, 리스크 가장 큼(캐러셀 전체 레이아웃에 영향).
5. **1-4 "SAAI 네 글자"** — `IntegratedLoopDiagram` 대체/추가 여부(A/B) 결정이 선행돼야 함.

---

## 3. 준비된 목업 재고 (이번 세션에 리팩터 완료, 모두 `content`/`scenarios`/`data` 오버라이드 지원)

`ChatMockup`, `FunnelDiagram`, `MultiStoreDashboardMockup`, `HqMapDashboardMockup`, `IntegratedLoopDiagram`, `KakaoAlertMockup`, `ActionCardMockup`, `StoreInsightMockup`, `RoiCalculatorWidget`, `CaseStudyChartMockup`, `FiveQuestionsMockup`, `OrderFlowMockup`, `AutonomyLadderTimeline` — 각 컴포넌트의 정확한 prop 인터페이스는 `src/components/mockups/<이름>.tsx` 상단의 `export interface`를 확인할 것(`docs/MOCKUP_SYSTEM_GUIDE.md` §0 표에 파일별 변경 요약 있음).

## 4. 이번 조사에서 발견한 부수 이슈 (범위 밖, 별도 기록만)

- `CorporateHero.tsx` 142~156줄의 "SAAI는 알고 있습니다" 전환부 텍스트가 로케일 분기 없이 한국어로 하드코딩돼 있음 — en/jp에서도 한국어 노출. 1-1 작업 시 함께 고치는 걸 권장하나, 이 문서의 스코프(시각 자료 추가)와는 별개 버그라 우선순위는 작업자 판단에 맡김.
