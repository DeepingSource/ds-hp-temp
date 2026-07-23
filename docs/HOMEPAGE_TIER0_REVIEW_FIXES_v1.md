# 홈페이지 Tier 0 배치 결과 검수 — 수정 작업지시서 (v1)

> 작성 2026-07-23 · 검수 대상: `HOMEPAGE_TIER0_WORK_ORDER_v1.md`에 따라 수정된 4개 파일
> `src/components/corporate/CorporateHero.tsx` · `SpaceAiAnswerBeat.tsx` · `HomeEnterpriseBeat.tsx` · `FeatureCarousel.tsx`
>
> **이 문서의 성격.** Tier 0 배치 작업(목업 홈페이지 투입)이 1차 반영된 상태를 파일 단위로 전수 검수한 결과다. 발견한 문제를 심각도순으로 정리하고, 각 항목에 "현재 코드 → 문제 → 수정 방법"을 실행 가능한 수준으로 적었다. 아래 3가지 방향 결정은 이미 확정됨(2026-07-23 확인):
>
> 1. **S·A·A·I 필러 중복** → 다크 버전(SpaceAiAnswerBeat) 유지, FeatureCarousel 그리드 제거. 단 카피는 brand-canon과 정합.
> 2. **제품 캐러셀 순서** → insight → care → agent (+ count 마지막) 로 통일.
> 3. **범용 AI 카드의 ChatMockup** → ChatMockup에 헤더 오버라이드를 추가하는 소규모 확장 후, 범용 AI 시나리오 주입.

## 심각도 정의

- **P0** — 기능이 실제로 깨졌거나 메시지가 정면으로 모순되는 것. 즉시 수정.
- **P1** — 디자인 시스템/브랜드 규약(SSOT) 위반, 일관성 훼손. 이번 패스에서 함께 수정.
- **P2** — 폴리시·성능·접근성 권장 사항. 여유 될 때.

## 검수에서 문제없음이 확인된 것 (재확인 불필요)

- 새로 참조된 이미지 asset 전부 실존: `storecare-privacy.webp`, `storeinsight-dwell-chart.webp`, `storeinsight-product-interaction.webp`, `si-guide/inflow-rate.png`, `diagrams/spatial-ai-concept.webp`
- `FeatureCarousel`의 필러 카드가 쓰는 `.card` CSS 클래스는 `globals.css:292`에 실존
- `HomeView.tsx`는 미변경 (Beat 순서 그대로)
- 전환부(1-1) i18n 하드코딩 버그가 `transitionBridgeDict`로 해결됨 ✓ (작업지시서 §4 반영 완료)
- `MultiStoreDashboardMockup` 배치(1-3)는 지시서의 절충안(막대그래프 유지 + 목업 추가, 그리드 6:6 재조정)대로 잘 반영됨
- `IntegratedLoopDiagram` 배치(1-4)는 지시서 옵션 B(필러 그리드 다음에 추가) 위치에 정확히 들어감
- agent 캐러셀(1-5)은 지시서 옵션 B(조건부 분기로 라이브 목업 렌더)로 구현됨 — 단 아래 P2-8 오버플로 이슈 있음

---

## P0 — 즉시 수정

### P0-1. `FeatureCarousel` — 제품 탭 클릭·스와이프가 전부 죽었다

**파일**: `FeatureCarousel.tsx` (`goTo` 선언부와 `motion.div`의 drag props)

현재 코드:
```tsx
const { step, hoverProps } = useMockupLoop({ ... });
...
const goTo = (i: number) => {
  // navigate step
};
```

이전 구현은 `useMockupLoop`가 반환하는 진짜 `goTo`를 구조분해로 받아 썼는데, 리라이트 과정에서 **빈 스텁 함수로 대체**됐다. 결과: 제품 탭(nav 버튼) 4개를 클릭해도 아무 일도 안 일어나고, `drag="x"`는 남아 있지만 `onDragEnd` 핸들러가 삭제돼 스와이프 제스처도 슬라이드를 넘기지 못한다(고무줄처럼 튕기기만 함). 또한 인자 `i`가 미사용이라 lint 경고도 발생.

**수정**:
```tsx
const { step, goTo, hoverProps } = useMockupLoop({
  steps: PRODUCTS.length,
  interval: 3800,
  active: sectionShow,
  pauseOnHover: true,
});
// 로컬 goTo 스텁 삭제
```
그리고 `motion.div`에 이전 구현의 스와이프 핸들러 복원:
```tsx
onDragEnd={(_e, info: PanInfo) => {
  const { offset, velocity } = info;
  if (offset.x < -60 || velocity.x < -400) goTo((step + 1) % PRODUCTS.length);
  else if (offset.x > 60 || velocity.x > 400) goTo((step - 1 + PRODUCTS.length) % PRODUCTS.length);
}}
```
(`PanInfo` 타입은 이미 import돼 있음.)

같은 nav 버튼 안의 아래 코드도 정리할 것 — 활성 배경이 이중으로 걸려 있다:
```tsx
{isActive && (
  <motion.span layoutId="activePill" className="absolute inset-0 rounded-xl bg-primary" style={{ zIndex: -1 }} ... />
)}
```
버튼 자체 클래스에 이미 `isActive ? 'bg-primary ...'`가 있어서 이 `motion.span`은 보이지 않는 죽은 요소다(zIndex -1). **둘 중 하나만 남길 것** — 권장: `motion.span`(layout 슬라이딩 애니메이션)을 살리고 버튼 클래스에서 `bg-primary`를 빼서 `text-white`만 남기는 쪽. 간단히 가려면 반대로 `motion.span`을 삭제.

### P0-2. `FeatureCarousel` — 제품 순서를 insight → care → agent → count로 통일 (결정 2 반영)

**파일**: `FeatureCarousel.tsx` (`PRODUCTS` 배열, `dict.steps`)

현재 `PRODUCTS`는 care → insight → agent → count 순서이고 단계 카피가 "1단계 실시간 감지(care) → 2단계 데이터 분석(insight) → 3단계 자율 실행(agent)"인데, 바로 위 "3단계로 시작합니다" 카피(② 어제를 읽고 **insight** · 지금을 알리고 **care** · 다음을 실행 **agent**)와 그 위의 `IntegratedLoopDiagram`(Insight 어제 · Care 지금 · Agent 다음)이 전부 insight-먼저 순서를 쓴다. 같은 화면 안에서 순서가 두 가지로 갈라져 있다.

**수정**:
1. `PRODUCTS` 배열 원소 순서를 insight → care → agent → count로 재배열 (각 원소 내용은 그대로, 순서만).
2. `dict.steps`를 시간 축 내러티브에 맞춰 교체 (3로케일 모두):
   ```
   ko: insight '1단계 · 어제를 읽다',  care '2단계 · 지금을 알리다',  agent '3단계 · 다음을 실행하다',  count '유입 분석 모듈'
   en: insight 'Step 1 · Read yesterday',  care 'Step 2 · Know now',  agent 'Step 3 · Act next',  count 'Footfall Module'
   jp: insight 'ステップ 1 · 昨日を読む',  care 'ステップ 2 · 今を知らせる',  agent 'ステップ 3 · 次を実行する',  count '流入分析モジュール'
   ```
3. `dict.sub`의 나열 순서도 맞출 것 — 현재 ko가 "지켜보고(care) · 읽어내고(insight) · 실행하는(agent)"라서 재배열 필요: "읽어내고(insight) · 지켜보고(care) · 실행하는(agent)" 식으로 (en/jp 동일).

### P0-3. `SpaceAiAnswerBeat` — 범용 AI 카드가 SAAI 어시스턴트를 보여주는 모순 (결정 3 반영)

**파일**: `SpaceAiAnswerBeat.tsx` (좌측 카드) + `src/components/mockups/ChatMockup.tsx` (선행 소규모 확장)

현재 좌측 "범용 AI (ChatGPT · Claude 등)" 카드에 `<ChatMockup locale={locale} />`가 기본 콘텐츠 그대로 들어가 있다. ChatMockup의 기본 콘텐츠는:
- 헤더가 **"SAAI 어시스턴트"** (`storeagent-mock-i18n.ts`의 `CHAT[locale].assistant`)
- 대화 내용이 매장 데이터(₩1,243,000 매출, 우산 +180%, 재고 12개)를 정확히 아는 **가장 똑똑한 SAAI 데모** + 발주 승인 액션 버튼

즉 "범용 AI는 매장 동선과 재고를 모른다"는 카드 불릿 바로 아래에서, SAAI 브랜딩이 박힌 목업이 매장을 완벽히 아는 대화를 시연 중이다. 카드 메시지와 정면 모순.

**수정 (2단계)**:

**(a) 선행: ChatMockup 헤더 오버라이드 확장** — 현재 ChatMockup은 `scenarios`(대화 통째 교체)만 오버라이드 가능하고 헤더 문구(`t.assistant`, `t.subBriefing` 등)는 `getChatI18n(locale)` 고정이다. `MOCKUP_SYSTEM_GUIDE.md` §2 규약대로 부분 병합 prop을 추가:

```tsx
// ChatMockup.tsx에 추가
import { type DeepPartial, mergeMockupContent } from './types';

/** 헤더/크롬 문구 오버라이드 단위 — 대화 내용은 scenarios prop이 담당, 이건 껍데기 문구만 */
export interface ChatChromeCopy {
  assistant: string;
  subBriefing: string;
  subPeak: string;
  subEvening: string;
  inputPlaceholder: string;
}

interface ChatMockupProps {
  ...
  /** 헤더 문구 오버라이드 — 부분 병합. 기본: getChatI18n(locale)의 해당 필드 */
  content?: DeepPartial<ChatChromeCopy>;
}

// 컴포넌트 본문에서 (기존 t 사용부를 치환):
const chrome = mergeMockupContent(
  {
    assistant: t.assistant,
    subBriefing: t.subBriefing,
    subPeak: t.subPeak,
    subEvening: t.subEvening,
    inputPlaceholder: t.inputPlaceholder,
  },
  content,
);
// 이후 헤더 렌더에서 t.assistant → chrome.assistant 등으로 교체
// (t.storeName / t.later / t.sendLabel 등 나머지는 기존 그대로 t에서)
```
`useSequencedLoop` 타이밍·훅 구조는 건드리지 않는 순수 문구 확장이라 위험 낮음. 완료 후 `docs/MOCKUP_SYSTEM_GUIDE.md` §0 표에 한 줄 추가할 것.

**(b) SpaceAiAnswerBeat 좌측 카드에 주입** — 범용 AI가 일반론만 답하는 시나리오(액션 버튼·stats 없음 — 그게 포인트):

```tsx
const genericAiScenarios: Record<Locale, ChatMessage[][]> = {
  ko: [[
    { role: 'user', text: '우리 매장 오늘 뭐가 문제야?', time: '오후 2:00' },
    { role: 'ai', text: '매장의 실시간 상황은 알 수 없지만, 일반적으로 재고 관리와 진열 최적화가 중요합니다. 매출 데이터를 정기적으로 검토해 보세요.', time: '오후 2:00' },
    { role: 'user', text: '그래서 지금 뭘 하면 되는데?', time: '오후 2:01' },
    { role: 'ai', text: '죄송하지만 귀하의 매장 상황을 실시간으로 볼 수 없습니다. 일반적인 소매업 모범 사례로는 고객 동선 분석, 피크타임 인력 배치 등이 있습니다.', time: '오후 2:01' },
  ]],
  en: [[
    { role: 'user', text: "What's wrong with my store today?", time: '2:00 PM' },
    { role: 'ai', text: "I can't see your store's live situation, but generally, inventory management and display optimization matter. Try reviewing your sales data regularly.", time: '2:00 PM' },
    { role: 'user', text: 'So what should I do right now?', time: '2:01 PM' },
    { role: 'ai', text: "I'm unable to observe your store in real time. Common retail best practices include analyzing customer flow and staffing for peak hours.", time: '2:01 PM' },
  ]],
  jp: [[
    { role: 'user', text: 'うちの店、今日何が問題？', time: '午後 2:00' },
    { role: 'ai', text: '店舗のリアルタイムの状況は分かりかねますが、一般的には在庫管理と陳列の最適化が重要です。売上データを定期的に確認してみてください。', time: '午後 2:00' },
    { role: 'user', text: 'で、今何をすればいいの？', time: '午後 2:01' },
    { role: 'ai', text: '申し訳ありませんが、店舗の状況をリアルタイムで見ることはできません。一般的なベストプラクティスとしては、動線分析やピーク時の人員配置などがあります。', time: '午後 2:01' },
  ]],
};

// 좌측 카드에서:
<ChatMockup
  locale={locale}
  scenarios={genericAiScenarios[locale]}
  content={{
    assistant: locale === 'ko' ? '범용 AI 챗봇' : locale === 'jp' ? '汎用AIチャットボット' : 'General AI Chatbot',
    subBriefing: locale === 'ko' ? '일반 상담' : locale === 'jp' ? '一般相談' : 'general chat',
  }}
/>
```
`ChatMessage` 타입은 ChatMockup이 이미 export 중이므로 import해서 쓸 것. 시나리오가 1개면 sub 라벨은 `subBriefing`만 쓰이므로 나머지 sub 오버라이드는 불필요. dynamic import를 쓰는 현재 구조에서는 타입만 정적 import 하면 된다: `import type { ChatMessage } from '@/components/mockups/ChatMockup';`

### P0-4. `SpaceAiAnswerBeat` + `FeatureCarousel` — S·A·A·I 필러 이중 노출 해소 (결정 1 반영)

현재 홈페이지에서 Beat 4(SpaceAiAnswerBeat) 끝에 다크 필러 4장("네 글자에 담은 약속", 새로 쓴 로컬 카피), 바로 이어지는 Beat 5(FeatureCarousel) 앞부분에 라이트 필러 4장(`saaiPromiseLayer` 그리드)이 **연달아 두 번** 나온다.

**수정**:
1. **FeatureCarousel에서 필러 그리드 제거** — "Promise layer — 4 pillars" 주석 블록(`promise.pillars.map` 그리드) 전체 삭제. 이어지는 `{promise.bridge}` 문단은 "약속 → 제품" 연결 문장이므로, 다크 필러 섹션이 바로 위 Beat에 있으니 **유지**한다(자연스럽게 다크 필러를 받아 캐러셀로 연결). `saaiPromiseLayer` import는 bridge 사용 때문에 유지.
2. **다크 필러 카피를 SSOT와 정합** — SpaceAiAnswerBeat의 로컬 `Pillar[]` 카피는 손으로 새로 쓴 것이라 `brand-canon.ts`의 `saaiPromiseLayer`와 어긋난다(예: 로컬 "공간 지능/실시간 익명화/자율적 실행/지능 체계" vs canon의 pillar label·promise). 두 방향 중 하나로 통일하고 포크 상태를 없앨 것:
   - **(권장)** 새 카피가 더 낫다고 판단되면 `brand-canon.ts`의 `saaiPromiseLayer[locale].pillars`를 새 카피로 **승격 갱신**하고, SpaceAiAnswerBeat는 로컬 `pillars` 배열을 지우고 `saaiPromiseLayer[locale].pillars`를 import해서 렌더한다 (다크 스타일은 유지). brand-canon을 갱신하면 이 카피를 쓰는 다른 화면도 함께 확인.
   - 아니면 로컬 카피를 버리고 기존 `saaiPromiseLayer` 카피를 그대로 다크 카드에 렌더.
3. **기술 페이지 링크 복원** — 제거되기 전 라이트 그리드는 각 필러가 `pil.tech`(해당 기술 페이지)로 링크했는데, 새 다크 카드는 링크가 없는 정적 카드다. 다크 카드를 `<Link href={localeHref(locale, pil.tech)}>`로 감싸 "약속 → 그 약속을 증명하는 기술" 내비게이션을 복원할 것 (`saaiPromiseLayer` pillars에 `tech` 필드가 있음).

---

## P1 — 규약/일관성 위반

### P1-1. 중립 섀도우 사용 3곳 — DESIGN.md 섀도우 규칙 위반

사이트 규칙: 중립 회색 `shadow-sm`/`shadow-xl` 대신 블루-블랙 틴트 `shadow-card`/`shadow-card-hover`/`shadow-elevated` (`DESIGN.md`, `MOCKUP_SYSTEM_GUIDE.md` §3-1).

1. `CorporateHero.tsx` 전환부 카드: `... p-8 shadow-sm` → `shadow-card`
2. `HomeEnterpriseBeat.tsx` 편차 막대 카드: `... border border-gray-100 shadow-sm` → `shadow-card`
3. `HomeEnterpriseBeat.tsx` 목업 래퍼: `... rounded-2xl shadow-xl ring-1 ring-gray-900/10` → `shadow-elevated ring-1 ring-gray-900/10` (강조 단계가 필요한 자리이므로 elevated가 맞음)

### P1-2. `CorporateHero` 전환부 — Tailwind 패딩 충돌

```tsx
className="relative mt-16 pt-10 pb-8 border-t border-gray-200/80 ... p-8 shadow-sm"
```
`pt-10`/`pb-8`과 `p-8`이 같은 속성(padding-top/bottom)을 중복 선언 — Tailwind에서 어느 쪽이 이길지는 클래스 순서가 아니라 생성된 CSS 순서에 달려 있어 **비결정적**이다. `p-8`을 `px-8`로 바꿔 명시적으로 정리: `px-8 pt-10 pb-8`.

같은 줄의 `border-t border-gray-200/80`도 재검토 — 이전엔 전환부가 히어로 본문과 구분되는 풀폭 구분선이었지만, 지금은 자체 배경(`bg-gradient-to-b from-gray-50/80 ...`)과 라운드를 가진 카드가 됐다. 카드 상단에 구분선이 그대로 남으면 라운드 카드 윗변에 선이 걸친 어색한 모양이 된다. **`border-t border-gray-200/80` 제거 권장** (시각 확인 후 판단).

### P1-3. `FeatureCarousel` — 캐러셀 자동 순환이 헤딩 가시성에 묶임

```tsx
const { ref: sectionRef, isVisible: sectionShow } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
...
<div ref={sectionRef} className="mx-auto mb-12 max-w-3xl text-center">  {/* ← 섹션 헤딩 */}
```
`sectionShow`가 캐러셀 `useMockupLoop`의 `active`인데, `ref`가 섹션 **헤딩 div**에 붙어 있다. 이 섹션은 필러(제거 예정) + IntegratedLoopDiagram + 3단계 카피 + 캐러셀로 매우 길어서, 사용자가 캐러셀까지 스크롤해 내려오면 헤딩은 이미 화면 밖 → `sectionShow=false` → **정작 캐러셀을 보고 있을 때 자동 순환이 멈춘다**. `ref={sectionRef}`를 캐러셀 `motion.div`(또는 그걸 감싼 래퍼)로 옮길 것.

### P1-4. `FeatureCarousel` — `swap()` 이 reduced-motion을 무시

이전 구현은 `reduced ? { opacity: 0 } : { opacity: 0, x }`로 분기했는데, 새 `swap()`은 모듈 레벨 상수라 `reduced`에 접근 못 하고 항상 y-이동 애니메이션을 준다. v5 공통 규율("prefers-reduced-motion 가드 필수", `ROLLOUT_PLAN_v1.md` §1-5) 위반. `swap`을 컴포넌트 안으로 옮기거나 `swap(y, reduced)` 파라미터를 추가해 reduced일 때 `{ opacity }`만 애니메이션하도록 복원.

---

## P2 — 권장 (폴리시·성능)

### P2-1. `FeatureCarousel` — agent 슬라이드의 폰 목업이 4:3 컨테이너를 세로로 넘친다

이미지 패널은 `relative aspect-[4/3] w-full`인데 agent 분기는 그 안에 `absolute inset-0 flex items-center justify-center` + `max-w-[280px]` 폰 목업을 넣었다. 280px 폭 폰 프레임은 높이가 ~560px+로 4:3 박스(패널 폭 ~520px 기준 높이 ~390px)를 위아래로 넘치고, 넘친 부분은 캐러셀 카드의 `overflow-hidden`에서 잘리거나 인접 요소와 겹친다.

**수정** — agent 슬라이드만 aspect 제약을 풀고 자연 높이로:
```tsx
<div className={active.key === 'agent' ? 'relative w-full flex justify-center py-2' : 'relative aspect-[4/3] w-full'}>
```
agent 분기 내부는 `absolute inset-0 ...` 대신 일반 플로우로 `<div className="w-full max-w-[250px]"><ActionCardMockup locale={locale} /></div>`. (`active={active.key === 'agent'}`는 이 분기 안에서 항상 true라 `active` 생략 가능.) 슬라이드 전환 시 grid 행 높이가 변하는 게 거슬리면 반대로 `max-h`+`overflow-hidden` 크롭 방식도 가능 — 실화면 보고 선택.

### P2-2. `FeatureCarousel` — agent 슬라이드 체류 시간이 목업 애니메이션보다 짧다

`ActionCardMockup`의 승인/보류 시퀀스는 1회 재생에 ~10.2초인데 캐러셀 interval은 3800ms라 애니메이션이 1/3쯤 재생되다 잘린다. `useMockupLoop`는 슬라이드별 `intervals` 배열을 지원한다(`OrderFlowMockup` 참고). 새 순서(insight, care, agent, count) 기준:
```tsx
useMockupLoop({ steps: PRODUCTS.length, intervals: [3800, 3800, 10500, 3800], active: sectionShow, pauseOnHover: true })
```

### P2-3. `HomeEnterpriseBeat` — 불필요한 `'use client'`

이 컴포넌트는 원래 서버 컴포넌트였고(파일 주석에도 "Server-rendered"가 있었음), `next/dynamic`은 `ssr: false` 없이는 서버 컴포넌트에서도 동작한다(`HomeView.tsx`가 같은 패턴을 'use client' 없이 사용 중). 최상단 `'use client';` 제거 — 카피 전체가 클라이언트 번들로 넘어가는 것을 되돌린다.

### P2-4. `HomeEnterpriseBeat` — `scale-95` 레이아웃 잔여 공간

`scale-95 origin-top`은 시각적 크기만 줄이고 레이아웃 박스는 원래 크기로 남아 하단에 ~5% 빈 공간이 생긴다. `max-w-xl`이 이미 폭을 제한하고 있으니 `scale-95 origin-top` 제거 권장(목업이 자연 크기로 렌더). 줄여야 한다면 래퍼에 음수 하단 마진으로 보정.

### P2-5. dynamic loading 플레이스홀더 높이 불일치 (CLS)

새로 추가된 4곳의 `loading:` 플레이스홀더가 전부 `h-64`(256px)인데 실제 목업 높이는 폰 목업 ~560px+, 대시보드 ~480px+다. 로드 완료 순간 레이아웃이 크게 밀린다. 각 자리 실측 높이에 근사하게 조정: 폰 목업(ChatMockup/StoreInsightMockup/ActionCardMockup) `h-[560px]`, MultiStoreDashboardMockup `h-[440px]`, IntegratedLoopDiagram `h-[520px]` 수준에서 시작해 실화면으로 미세 조정.

### P2-6. `CorporateHero` 전환부 배경 — 다이어그램을 텍스처로 쓰는 문제

배경이 `diagrams/spatial-ai-concept.webp`(정보 전달용 도식)를 `opacity-10 mix-blend-multiply`로 깐 상태다. 10% 투명도의 다이어그램 선·라벨은 무드가 아니라 노이즈로 읽히기 쉽다. 원계획(`HOMEPAGE_TIER0_WORK_ORDER_v1.md` §1-1)의 무드 이미지 `gen/bg-film00-night-cvs.png` 또는 `gen/iso-city-stores.png`로 교체 권장 — 단 이건 시각 취향 판단이므로 실화면 비교 후 결정.

### P2-7. `FeatureCarousel` — 느슨한 dict 타입

`steps`/`taglines`/`alt`가 `Record<string, string>`이라 키 오타를 컴파일러가 못 잡는다. `Record<ProductStruct['key'], string>`으로 조이면 P0-2 순서 재배열 시 누락도 자동 검출된다.

### P2-8. 남은 계획 항목 (이번 수정 범위 아님, 기록만)

- `KakaoAlertMockup`은 원계획(1-5)에서 `ActionCardMockup`과 함께 제안됐으나 미투입 — agent 슬라이드가 안정화된 뒤 별도 검토.
- 좌측 범용 AI 목업의 `opacity-80 hover:opacity-100` 처리는 "나쁜 예시" 디임 처리로 보이며 의도적이라면 유지 무방.
- `StoreInsightMockup`(violet 테마)이 블루 SAAI 카드 안에 들어간 색 대비는 규약상 문제없음(제품 구분색 의도적 예외) — 실화면에서만 확인.
- `SpaceAiAnswerBeat`의 캐러셀 카피 리라이트("SAAI SUITE" eyebrow, `desc` 필드 제거 등)는 콘텐츠 판단이라 검수 범위 밖 — P0-2 순서 정합만 반영하면 됨.

---

## 실행 순서 및 마무리

1. P0-1 → P0-2 (`FeatureCarousel` 기능 복원 + 순서 통일; 같은 파일이라 한 번에)
2. P0-3 (a) ChatMockup 확장 → (b) SpaceAiAnswerBeat 주입
3. P0-4 (필러 단일화 — `FeatureCarousel` 그리드 제거 + 다크 카피 SSOT 정합 + 링크 복원)
4. P1 일괄 (섀도우 3곳, 패딩 충돌, sectionRef 이동, reduced-motion)
5. P2 선별 적용
6. **검증**: `npx tsc --noEmit` → `npm run build` → ko/en/jp 3로케일 × 모바일 폭 × `prefers-reduced-motion` 시각 확인. 특히 확인할 것: 캐러셀 탭 클릭/스와이프 동작, agent 슬라이드에서 목업이 카드 밖으로 안 넘치는지, 범용 AI 카드 헤더가 "범용 AI 챗봇"으로 뜨는지, S·A·A·I 필러가 홈에서 한 번만 나오는지.
7. 완료 후 `docs/MOCKUP_SYSTEM_GUIDE.md` §0에 ChatMockup 확장(`content` prop) 행 추가, 이 문서 상단에 처리 결과(✓/보류) 체크 표시.
