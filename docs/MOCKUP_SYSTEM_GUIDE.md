# 목업 시스템 가이드 (v1)

> `docs/MOCKUP_ELEVATION_ROLLOUT_PLAN_v1.md`의 Track A/B("고도화 트랙")를 실제로 착수한 결과물.
> 이 문서는 "목업을 어떻게 짜야 하는가"의 규약이다 — 어느 목업을 어느 페이지에 놓을지는
> ROLLOUT_PLAN 문서를, 컬러·간격·섀도우 원 소스는 `DESIGN.md`를 본다.

## 0. 이번에 실제로 바꾼 것

| 파일 | 변경 | 위험도 |
|---|---|---|
| `src/components/mockups/types.ts` | `DeepPartial<T>`, `mergeMockupContent()` 추가 — 콘텐츠 오버라이드 규약의 공용 유틸 | 순수 추가, 기존 코드 영향 없음 |
| `src/lib/mockup-tokens.ts` | `MOCKUP_SCHEME.light/dark.cardClass`의 섀도우를 `shadow-sm`(중립 회색) → `shadow-card`(사이트 공통 블루-블랙 틴트)로 교체, `cardClassHover`/`cardClassElevated` 신규 추가 | `cardClass`를 실제로 쓰는 컴포넌트의 카드 그림자가 미세하게 바뀜(값 자체는 매우 근접) — git diff로 시각 확인 권장 |
| `src/components/mockups/ChatMockup.tsx` | `scenarios?: ChatMessage[][]` 오버라이드 prop 추가(레퍼런스 구현), 내부 `shadow-sm` 2곳 → `shadow-card` | 신규 prop은 선택적이라 기존 사용처(없음 — 현재 고아 컴포넌트) 영향 없음 |
| `src/components/mockups/FunnelDiagram.tsx` | `content?: DeepPartial<FunnelDiagramCopy>`(부분 병합) + `data?: FunnelData`(퍼널 수치 통째 교체) 오버라이드 prop 추가, 컨테이너에 `shadow-card` 추가, 토큰에 없던 임의값 `text-[9px]` → `text-3xs`로 정리 | `StoreInsightView`에서 실사용 중인 컴포넌트 — prop을 안 넘기면 기존과 동일하게 렌더링되도록 짰지만(옵션 prop + 기본값 fallback), 로컬 빌드 확인 권장 |

| `src/components/mockups/MultiStoreDashboardMockup.tsx` | `content?: DeepPartial<MultiStoreDashboardCopy>`(문구 부분 병합) 오버라이드 prop 추가, `text-[11px]`/`text-[9px]` 임의값 전부 `text-2xs`/`text-3xs` 토큰으로 정리 | 이미 `mockup-tokens.ts` 사용 중이던 컴포넌트라 위험 낮음. **단, 숫자 데이터(`stores`/`chartSets`/`kpiConfigs`)는 이번에 오버라이드 대상에서 제외** — 아래 한계 참고 |

**바로잡음**: 지난 계획 문서에서 "FunnelDiagram이 홈페이지에 쓰인다"고 적었던 건 부정확했다 — 실제로는 `StoreInsightView.tsx`(제품 서브페이지)에서 동적 import로 쓰이고 있고, 홈페이지의 퍼널 시각(어제 들어온 손님 10명 중 8명…)은 별도의 자체 구현이다. `ROLLOUT_PLAN_v1.md`의 해당 서술은 이 근거로 갱신 필요.

**발견한 한계 — `MultiStoreDashboardMockup`은 숫자까지는 아직 오버라이드 못 한다.** 이 컴포넌트는 `kpiConfigs`가 정확히 4개라고 가정하고 `useCountUp`을 4번 개별 호출한다(`revenue`/`visitors`/`alrtCnt`/`perf`). React 훅 규칙상 호출 횟수를 데이터 길이에 따라 가변으로 둘 수 없어서, `stores`/`chartSets`/`kpiConfigs`를 안전하게 오버라이드하려면 먼저 이 4번 호출을 배열 기반의 단일 훅(예: `useCountUpGroup(values[])`)으로 바꾸는 선행 리팩터가 필요하다 — 이번 패스에서는 문구만 오버라이드하고 숫자 구조 변경은 후속 작업으로 남겼다. **다른 목업을 이 패턴으로 옮길 때도 "고정 개수 훅 호출"이 있는지 먼저 확인할 것** — 있으면 콘텐츠 오버라이드보다 먼저 훅 구조부터 봐야 한다.

**아직 안 건드린 것**: `HqMapDashboardMockup`/`IntegratedLoopDiagram` — 아래 §6 순서대로 이어서 진행.

## 1. 세 가지 목표와 대응 방법

사용자가 요청한 세 가지를 각각 다른 층위에서 해결한다 — 하나의 리팩터로 셋 다 되는 게 아니라, 서로 다른 안전장치다.

1. **콘텐츠만 바꿔 재사용** → §2 콘텐츠 오버라이드 규약 (`types.ts`)
2. **우리 디자인 시스템을 따름** → §3 토큰 사용 규칙 (`mockup-tokens.ts` + `DESIGN.md`)
3. **더 사실적** → §3-3 디바이스 크롬(이미 잘 돼 있음, 재사용만 강제) + §3-1 섀도우 통일

## 2. 콘텐츠 오버라이드 규약

### 2-1. 지금까지의 실제 패턴 (감사 결과)

7개 대표 컴포넌트를 열어 확인한 결과, 완성도 자체는 이미 높다(framer-motion, 실제 브라우저/폰 크롬, `useCountUp`/`useMockupLoop`). 문제는 콘텐츠가 컴포넌트 내부의 로케일별 `COPY`/`C` 맵에 박혀 있어서, **같은 컴포넌트를 다른 페이지·다른 숫자로 재사용하려면 파일을 직접 고쳐야 한다**는 점이었다. `ChatMockup`은 한 걸음 더 나아가 `data/mockup-scenarios/storeagent.ts`(구조) + `storeagent-mock-i18n.ts`(번역)로 이미 분리돼 있었지만, 그 데이터도 "전역 공유 파일"이라 페이지별로 다른 대화를 보여주려면 역시 공유 파일을 늘리거나 컴포넌트를 포크해야 했다.

### 2-2. 새 규약

1. 컴포넌트는 지금처럼 **locale별 기본 콘텐츠를 유지**한다 — fallback이자 SSOT. (v5 원칙 "빈 화면 금지" 계승 — 항상 유효한 기본값이 있어야 한다.)
2. 호출부가 다른 콘텐츠를 보여줘야 하면, **그 콘텐츠와 같은 타입의 선택적 prop**을 추가로 받는다. 두 가지 병합 전략 중 상황에 맞게 고른다:
   - **통째 교체** — 배열처럼 "부분만 바꾼다"는 개념이 안 맞는 데이터(예: 대화 시나리오 배열). `override ?? default` 한 줄이면 충분하다. → `ChatMockup.scenarios` 참고.
   - **부분 병합** — 문구 여러 개 중 일부만 바꾸고 싶은 COPY 객체. `mergeMockupContent(defaultCopy, override)`를 쓴다.
3. 새 prop 이름은 그 컴포넌트의 "콘텐츠 단위"를 그대로 부른다(`scenarios`, `content`, `data` 등) — 전부 억지로 `content`로 통일하지 않는다. 타입은 export해서 호출부가 안전하게 오버라이드를 만들 수 있게 한다(`ChatMockup`이 `ChatMessage`를 export하는 이유).

### 2-3. 레퍼런스 구현 — `ChatMockup`

```tsx
// 기본값 그대로 (기존과 동일하게 동작)
<ChatMockup locale="ko" />

// 페이지별 다른 대화로 재사용 — 파일을 복제하지 않는다
<ChatMockup
  locale="ko"
  scenarios={[[
    { role: 'user', text: '오늘 재고 이슈 있어?', time: '09:02' },
    { role: 'ai', text: '냉장고 3번 도어가 12분째 열려 있어요.', time: '09:02',
      action: { icon: AlertTriangle, label: '알림 보내기', color: 'bg-amber-500' } },
  ]]}
/>
```

### 2-4. `mergeMockupContent` 사용 예시 (부분 병합이 필요한 컴포넌트용)

```tsx
// 컴포넌트 내부
interface FunnelCopy { title: Record<Locale,string>; stages: { label: string; value: number }[] }
const DEFAULT_COPY: FunnelCopy = { /* ... 기존 COPY ... */ };

interface FunnelDiagramProps extends BaseMockupProps {
  content?: DeepPartial<FunnelCopy>;
}

export default function FunnelDiagram({ locale = 'ko', content, ...rest }: FunnelDiagramProps) {
  const copy = mergeMockupContent(DEFAULT_COPY, content);
  // ...
}
```

## 3. 디자인 시스템 준수 & 사실적 완성도

### 3-1. 섀도우 — 이번에 고친 것

`DESIGN.md`는 사이트 전체가 "블루-블랙 틴트 섀도우(`shadow-card`/`shadow-card-hover`/`shadow-elevated`), 중립 회색 `shadow-*`는 그대로 두되 쓰지 않는다"를 원칙으로 정해뒀는데, `mockup-tokens.ts`의 `cardClass`가 `shadow-sm`(중립 회색)을 쓰고 있었다. 목업이 페이지 나머지 부분과 미묘하게 다른 depth 언어를 쓰고 있었던 셈 — 지금 고쳐서 `shadow-card` 계열로 통일했다(`cardClassHover`/`cardClassElevated` 단계도 추가). **앞으로 새 카드 UI를 목업 안에 넣을 때는 로컬에서 그림자 값을 새로 만들지 말고 이 3단계 중 하나를 쓴다.**

### 3-2. 토큰 사용 현황 — 남은 작업

대표 7종 중 `mockup-tokens.ts`(`MOCKUP_SCHEME`/`MOCKUP_DEVICE`)를 실제로 쓰는 건 2종(`MultiStoreDashboardMockup`, `ChatMockup`)뿐이었다. 나머지(`FunnelDiagram`, `HqMapDashboardMockup`, `IntegratedLoopDiagram`)는 로컬 hex 상수를 따로 만들거나 Tailwind 임의값을 직접 썼다. `KakaoAlertMockup`의 카카오톡/LINE 브랜드색(`#06c755` 등)은 실제 서비스 스킨 재현이 목적이라 의도적 예외로 유지한다 — 이런 예외는 컴포넌트 상단에 주석으로 이유를 남긴다(`PRODUCT_THEME`의 emerald/violet도 동일하게 문서화해뒀다, `mockup-tokens.ts` 참고).

**남은 토큰화 대상(우선순위):** ~~`FunnelDiagram`~~(완료, §0) → `HqMapDashboardMockup` → `IntegratedLoopDiagram`. 각각 로컬 색상 상수를 `MOCKUP_SCHEME`/`PRODUCT_THEME` 파생으로 교체.

### 3-3. "더 사실적" — 디바이스 크롬은 이미 잘 돼 있다

`PhoneFrame`(아이폰 스타일 알루미늄 베젤·버튼·다중 레이어 섀도우·유리 반사광)과 `PhoneScreen`(iOS 상태바·홈 인디케이터·배지)을 열어보니 이미 상당히 사실적으로 만들어져 있고, 모든 폰 목업이 이걸 공유한다. **새 목업을 만들 때 절대 이 프레임을 다시 구현하지 말 것** — `PhoneFrame`/`PhoneScreen`(폰), `TabletFrame`(태블릿), `MacBookFrame`+`BrowserChrome`(데스크톱)을 그대로 조합해서 쓴다. "사실적으로 만든다"의 8할은 이미 있는 프레임을 재사용하는 것이고, 나머지는 §3-1 섀도우 통일이다.

## 4. 중복 판정 결과

`StoreInsightMockup`/`StoreInsightDesktopMockup`/`StoreCareMockup`/`StoreCareStatusMockup`/`StoreCountCountingMockup` 5종을 실제로 열어 비교했다.

- **`StoreInsightMockup`(폰) vs `StoreInsightDesktopMockup`(데스크톱)** — 진짜 다른 UI 패러다임(폰: 세그먼트 컨트롤+KPI 카드, 데스크톱: 사이드바+히트맵+랭킹)이고 각자 다른 곳에서 이미 쓰이고 있다. **폐기 대상 아님.**
- **`StoreCareMockup`(알림/CCTV 상세) vs `StoreCareStatusMockup`(점수/홈 대시보드)** — 같은 제품의 다른 화면, 상호 보완적. 다만 `StoreCareStatusMockup`은 지금 COEX 이벤트 페이지에만 쓰이고 메인 StoreCare 페이지엔 없다 — **폐기가 아니라 저활용**. `StoreCareDeviceTabs`에 두 번째 탭으로 추가하는 걸 검토.
- **`StoreCountCountingMockup`** — 대응하는 다른 컴포넌트 없음, 독립적. 메인 `StoreCountView`가 이걸 안 쓰고 `DoorSplitDiagram`을 쓰는 건 의도적 선택으로 보이며 문제 없음.

**결론: 삭제할 목업은 없다.** "중복 회피"의 실제 위험은 컴포넌트가 겹치는 게 아니라, **콘텐츠를 못 바꾸니 새 문맥이 생길 때마다 파일을 복제하고 싶어지는 것** — 그게 §2의 콘텐츠 오버라이드 규약으로 막는 대상이다.

## 5. 기존 컴포넌트 마이그레이션 체크리스트

`ROLLOUT_PLAN_v1.md` §3의 P0/P1 컴포넌트부터 이 순서로 적용한다:

1. 컴포넌트의 "콘텐츠 단위"를 식별한다 (COPY 객체? 시나리오 배열? 숫자 데이터?)
2. 그 타입을 `export`한다 (호출부가 오버라이드를 만들 수 있게)
3. `content?:`(부분 병합) 또는 `<단위이름>?:`(통째 교체) prop을 추가한다
4. 기본값 계산 로직은 그대로 두고, 맨 위에서 `override ?? default` 또는 `mergeMockupContent(default, override)`로 한 번만 병합한다
5. 로컬 hex/임의값이 있으면 `MOCKUP_SCHEME`/`PRODUCT_THEME`/`MOCKUP_DEVICE` 파생으로 교체한다(브랜드색 재현 등 의도적 예외는 주석으로 남긴다)
6. `npm run lint:tokens`, `npm run build`, `npm test`로 확인 후 커밋 — **이 문서를 만든 세션은 저장소에서 직접 빌드를 못 돌렸으므로, 이미 반영한 3개 파일(§0)도 로컬에서 한 번 빌드 확인을 권장한다.**

## 6. 다음 순서

`ROLLOUT_PLAN_v1.md` §6 실행 순서의 "기반 작업" 단계에 해당한다. `ChatMockup`(레퍼런스) → `FunnelDiagram` → `MultiStoreDashboardMockup`(모두 완료, §0) 순으로 패턴을 적용했다. 다음은 `HqMapDashboardMockup` → `IntegratedLoopDiagram` 순으로 이어간다. `HqMapDashboardMockup`을 열 때는 `MultiStoreDashboardMockup`에서 막힌 것과 같은 "고정 개수 훅 호출"이 있는지(`useCountUp` x4라고 이전 감사에서 확인됨) 먼저 확인하고, 있으면 이번처럼 문구 오버라이드부터 안전하게 진행한다.

**로컬 검증 권장 시점**: 지금까지 4개 컴포넌트(`ChatMockup`/`FunnelDiagram`/`MultiStoreDashboardMockup`)와 공용 유틸(`types.ts`/`mockup-tokens.ts`)이 바뀌었다. 나머지 두 컴포넌트로 넘어가기 전에 `npm run build`(또는 최소 `npx tsc --noEmit`)를 한 번 돌려 지금까지의 변경이 이 저장소 설정에서 문제없이 컴파일되는지 확인하는 걸 권장한다 — 이 세션은 저장소를 직접 빌드할 수 없어 코드 리뷰만으로 안전성을 판단했다.
