# `saai care` 제품 페이지 정제 계획안

대상: `https://ds-hp-temp.vercel.app/ko/products/saai-care`
소스: `src/app/ko/products/saai-care/page.tsx` → `src/components/corporate/views/StoreCareView.tsx`
작성 근거: 실제 페이지 스크린샷(반복 재현) + 소스코드 직접 확인 (`StoreCareView.tsx`, `HqRollupDashboardMockup.tsx`, `WordRise.tsx`, `useScrollAnimation.ts`, `globals.css`, `AnimatedSection.tsx`) + 기존 프로젝트 문서(`MOCKUP_ELEVATION_ROLLOUT_PLAN_v1.md`, `MOCKUP_SYSTEM_GUIDE.md`)

---

## 0. 결론 요약

이 페이지가 "복잡해졌다"고 느껴지는 원인과 Hero 목업이 "깨져 보인다"는 원인은 **서로 다른 층위의 문제**입니다.

| 문제 | 층위 | 원인 |
|---|---|---|
| Hero 목업이 깨져 보임 | 버그(재현됨) | 스크롤-리빌 애니메이션이 "이미 화면에 보이는" Hero 콘텐츠에도 걸려 있고, 그 안전장치(fast-path)가 실전에서 발동하지 않아 최대 3초간 헤드라인·대시보드 표가 비어 보임 |
| 일체감 부족 | 설계/구조 | 콘텐츠 문제가 아니라 **섹션 10개, 다크·라이트 톤 전환 5회, 서로 다른 카드 패턴 7종 이상**이 한 페이지에 누적된 구조 문제 |

아래에서 각각 재현 증거와 코드 근거를 먼저 제시하고, 그 다음 단계별 실행 계획을 제안합니다.

---

## 1. 현재 상태 진단

### 1-1. 페이지 구조 인벤토리 (Beat 1~7 + 부속 섹션)

`StoreCareView.tsx` 기준으로 실제로는 **10개의 시각적으로 구분되는 섹션**이 순서대로 이어집니다.

| # | 섹션 | 배경 톤 | 카드/모듈 패턴 |
|---|---|---|---|
| 1 | Hero | `bg-slate-900` (dark) | 배지 + WordRise 헤드라인 + `HqRollupDashboardMockup` |
| 2 | Scale Risk (Agitation) | `bg-slate-950` (dark, Hero보다 더 어두움) | 인용구 텍스트만 |
| 3 | Value Ladder | 기본(흰색) | 화살표로 연결된 2분할 카드 (B2C→B2B) |
| 4 | HQ Rollup & Pillars | `bg-gray-50` | 01/02/03 번호가 붙은 필러 카드 |
| 5 | Device Tabs (인터랙티브) | 흰색 | 세그먼트 컨트롤 + 폰 프레임 목업 |
| 6 | Privacy (SEAL 3 Pledges) | `bg-slate-900` (dark) | 아이콘+타이틀 카드 3개 |
| 7 | B2B FAQ | `Section variant="alt"` | 아코디언형 Q&A 카드 6개 |
| 8 | ModeFunctionSection (mode="care") | 흰색 | 2×2 아이콘 그리드 (제품 공통 컴포넌트) |
| 9 | RelatedGlossary | 흰색 | 용어 카드 4개 (제품 공통 컴포넌트) |
| 10 | Final CTA | `bg-slate-950` (dark) | 중앙 정렬 CTA |

**다크 → 라이트 전환이 5번** 일어나고(①→②는 dark 유지, ②→③ 전환, ③→⑥ 전환, ⑥→⑦ 전환, ⑦→⑩ 전환), 그마저도 dark 섹션끼리 `slate-900`과 `slate-950`을 번갈아 써서 다크 구간 안에서도 톤이 미묘하게 안 맞습니다.

### 1-2. Hero 목업 "깨짐" — 재현 증거

같은 URL을 새로고침하며 시간차 스크린샷을 찍은 결과, **매번 동일한 패턴**이 재현되었습니다.

- **t = 0s (내비게이션 직후)**: 배지("DETECT · 24시간 실시간 이상 감지")는 즉시 보이지만, 그 아래 헤드라인 영역은 완전히 비어 있음. 우측 `HqRollupDashboardMockup`의 "매장 랭킹 — 사고 건수" 표는 헤더만 있고 행(강남 2호점 등)이 전부 빈 칸.
- **t = 1s**: 헤드라인 자리에 텍스트 대신 작은 획(가로선) 조각만 보임. 표는 여전히 비어 있음.
- **t = 3s**: 헤드라인 "모든 매장을, 한 매장처럼 지켜봅니다."가 갑자기 통째로 나타남(애니메이션 없이 팝인). 표 행과 실시간 알림 목록, 하단 바 그래프도 동시에 채워짐.

즉 사용자가 처음 페이지를 열었을 때 최대 3초간 Hero의 핵심 콘텐츠(제목, 대시보드 수치)가 비어 있거나 조각난 형태로 보입니다 — 사용자가 말한 "이상하게 깨진" 인상의 정체입니다.

### 1-3. Hero 목업 "깨짐" — 코드 근거

**원인 1 — 대시보드 표/알림/바 그래프**: `HqRollupDashboardMockup.tsx`의 표 행과 바 그래프는 `useScrollAnimation()`이 반환하는 `isVisible` 값에 따라 `opacity: isVisible ? 1 : 0`으로 그려집니다(197~221행, 254~274행). 즉 스크롤해서 화면에 "들어올 때" 나타나도록 설계된 리빌 애니메이션인데, 이 컴포넌트는 **Hero, 즉 페이지 최초 진입 시점부터 이미 화면 안에** 있습니다.

`useScrollAnimation.ts`는 이런 경우를 위한 안전장치를 갖고 있습니다.

```ts
// 이미 뷰포트에 있으면 즉시 visible 처리(fast-path)
if (element.getBoundingClientRect().top <= window.innerHeight) {
  setIsVisible(true);
  return;
}
// 3초 안에 옵저버가 안 걸리면 강제로 visible 처리(safety-net)
const timeout = setTimeout(() => setIsVisible(true), 3000);
```

실측 결과 이 fast-path가 실전에서 즉시 발동하지 않고, **safety-net인 3000ms 타임아웃이 실제로 발동하는 패턴과 정확히 일치**합니다(t=3s에 한꺼번에 나타남). Hero처럼 "무조건 최초 뷰포트에 있는" 요소에 스크롤-리빌 훅을 그대로 쓰는 것 자체가 설계상 어긋나 있고, 안전장치도 최악의 경우 3초를 그대로 소진합니다.

**원인 2 — 헤드라인(WordRise)**: `WordRise.tsx`는 순수 CSS 애니메이션으로 문서화되어 있고(`.wr-word { animation: wordRise 0.6s ... }`, `globals.css` 707~711행), 단어당 stagger 60ms를 감안해도 전체 reveal은 1초 안에 끝나야 정상입니다. 그런데 실측은 t=1s에도 조각난 상태, t=3s에 완성 — **CSS 애니메이션 자체의 문제라기보다, 이 프리뷰 배포 환경에서 첫 페인트/하이드레이션이 지연되면서 함께 밀린 것으로 추정**됩니다(폰트 로딩 지연 vs JS 번들·하이드레이션 지연 여부는 Lighthouse/Performance 탭 실측이 필요 — §4 검증 항목 참고).

**중요**: `AnimatedSection.tsx`(Beat 2~10 대부분이 이걸로 감싸여 있음)도 동일한 `useScrollAnimation` 훅을 씁니다. 아래쪽 섹션들에서는 사용자가 스크롤해서 진입할 때쯤엔 이미 JS가 로드돼 있어 문제가 안 보였지만, **훅 자체의 fast-path 신뢰성 문제는 페이지 전역에 잠재**해 있습니다.

### 1-4. 일체감 부족 — 구조적 원인

1. **톤 전환 과다**: 위 1-1 표대로 5번의 dark/light 전환. 인접 구간끼리도 `slate-900`/`slate-950`이 섞여 다크 섹션 간 통일감도 없음.
2. **카드 언어 난립**: Value Ladder(화살표 2분할) / HQ Pillars(번호 카드) / Device Tabs(폰 프레임) / Privacy(아이콘 카드) / FAQ(아코디언) / ModeFunctionSection(2×2 그리드) / RelatedGlossary(용어 카드) — 한 페이지에서 최소 7종의 서로 다른 카드 형태가 등장합니다. 이는 콘텐츠 밀도 문제가 아니라 **디자인 시스템 재사용 부족** 문제입니다.
3. **Eyebrow 라벨 처리 불일치**: `threatEyebrow`, `ladderEyebrow`, Hero `badge`는 `COPY` 객체를 통해 3개 로케일 번역이 되어 있는 반면, `"HEADQUARTERS ROLLUP"`, `"B2B FAQ"`, `"PRIVACY COMPLIANCE & RECONCILIATION"`, `"ENTERPRISE CARE"`는 `StoreCareView.tsx`에 하드코딩된 영어 문자열입니다(286, 362, 330, 391행). en/jp 페이지에서도 이 네 곳만 갑자기 영어가 튀어나와 다국어 일관성이 깨지고, 색상도 섹션마다 제각각(`primary-light`/`rose-400`/`emerald-400`)이라 "하나의 시스템"이라는 인상을 주지 못합니다.
4. **목업 컴포넌트의 토큰 미준수**: 팀이 이미 작성한 `MOCKUP_SYSTEM_GUIDE.md`(§3-1, 3-2)에 따르면 `mockup-tokens.ts`의 `MOCKUP_SCHEME`/`PRODUCT_THEME`를 실제로 쓰는 목업은 44종 중 극소수이며, `HqRollupDashboardMockup`도 로컬 `sevCls` hex/Tailwind 임의값을 직접 씁니다. 페이지 나머지 부분과 미묘하게 다른 색 언어를 쓰고 있다는 뜻으로, 이미 팀 내부에서도 인지된 이슈입니다.
5. **제품 무관 boilerplate가 스토리 흐름을 끊음**: `ModeFunctionSection`과 `RelatedGlossary`는 Care 전용 콘텐츠가 아니라 전 제품 공통 컴포넌트입니다. Hero→위협→가치번역→롤업→디바이스→프라이버시→CTA로 이어지던 B2B 세일즈 내러티브가 끝나기 직전에, 맥락이 다른 "기능 라이브러리"와 "용어집"이 끼어들며 흐름이 끊깁니다.

---

## 2. 정제 방향 (설계 원칙)

1. **Hero는 스크롤-리빌 대상에서 제외한다.** 최초 뷰포트에 있는 콘텐츠는 항상 즉시 보이는 것이 기본값이어야 하며, "관찰 의도"를 표현하고 싶다면 게이팅이 아니라 짧고 장식적인 fade-in(200ms 이하, 실패해도 콘텐츠가 숨겨지지 않는 방식)만 허용한다.
2. **다크/라이트 전환은 최소화한다.** 인접한 dark 섹션은 하나의 블록으로 합치고, 페이지 전체 전환 횟수를 5회 → 2~3회로 줄인다.
3. **카드 셸을 하나로 통일한다.** Value Ladder/HQ Pillars/Privacy 카드가 같은 radius·border·shadow·padding 토큰을 쓰도록 정리한다(`MOCKUP_SYSTEM_GUIDE.md`의 섀도우 통일 원칙을 페이지 카드에도 적용).
4. **Eyebrow는 전부 COPY화 + 색상 팔레트를 2~3종으로 제한한다.**
5. **제품 무관 boilerplate는 메인 내러티브 뒤로 분리 배치하거나 톤을 낮춘다.**

---

## 3. 실행 계획

### Phase 1 — Hero 버그 수정 (P0, 즉시)

| # | 작업 | 대상 파일 |
|---|---|---|
| 1-1 | `HqRollupDashboardMockup`의 표 row/바 그래프를 `isVisible` 게이팅에서 분리 — 기본값을 "보임"으로 시작하고, 필요 시 마운트 시점 기준의 짧은 CSS transition만 적용 | `src/components/mockups/HqRollupDashboardMockup.tsx` |
| 1-2 | Hero처럼 항상 최초 뷰포트인 요소는 애초에 `useScrollAnimation`을 타지 않도록 — Hero 전용 정적 래퍼 사용 또는 훅 옵션에 `assumeVisible` 플래그 추가 | `src/hooks/useScrollAnimation.ts`, `src/components/corporate/views/StoreCareView.tsx` |
| 1-3 | fast-path(`getBoundingClientRect().top <= window.innerHeight`)가 왜 실전에서 발동하지 않는지 원인 특정 — layout effect 타이밍, `reducedMotion` 의존성 재실행 여부 점검 | `src/hooks/useScrollAnimation.ts` |
| 1-4 | WordRise 헤드라인 지연이 폰트 로딩(FOIT)인지 JS/하이드레이션 지연인지 Lighthouse/Performance 탭으로 실측 후 대응(폰트라면 `font-display: swap` 점검, 번들이라면 Hero 인접 client 컴포넌트 경량화) | `src/app/globals.css`, 폰트 설정 |

### Phase 2 — 톤·카드 통일 (P1)

| # | 작업 |
|---|---|
| 2-1 | dark 섹션 톤을 `slate-900` 하나로 통일(또는 반대로 `950`으로 통일), Hero+Scale Risk를 하나의 연속 dark 블록으로, Privacy+Final CTA를 하나의 dark 블록으로 병합 검토 |
| 2-2 | Value Ladder / HQ Pillars / Privacy 카드의 radius·border·shadow·padding을 공통 토큰으로 정리 |
| 2-3 | 하드코딩된 4개 eyebrow(`HEADQUARTERS ROLLUP`, `B2B FAQ`, `PRIVACY COMPLIANCE & RECONCILIATION`, `ENTERPRISE CARE`)를 `COPY` 객체로 이동해 ko/en/jp 번역 추가, eyebrow 색상을 2~3종으로 축소 |
| 2-4 | `HqRollupDashboardMockup`의 `sevCls` 등 로컬 색상 정의를 `MOCKUP_SCHEME`/`PRODUCT_THEME` 파생으로 교체 (`MOCKUP_SYSTEM_GUIDE.md` §3-2 남은 작업과 동일 트랙) |

### Phase 3 — 정보 구조 재편 (P2, 선택)

| # | 작업 |
|---|---|
| 3-1 | `ModeFunctionSection`/`RelatedGlossary`를 메인 내러티브(Hero~Final CTA) 뒤가 아니라 시각적으로 더 낮은 톤(예: 여백·구분선 강화)으로 분리해 "부록"임을 명확히 하거나, 페이지 최하단으로 순서 조정 |
| 3-2 | HQ Rollup Pillars(Beat 4)와 Device Tabs(Beat 5)가 둘 다 "본사가 보는 화면"을 다루므로 순서 재배치 또는 통합 검토 |

### Phase 4 — 검증

- [ ] 새로고침 5회 반복, Hero 콘텐츠가 매번 300ms 이내에 완전히 보이는지 확인 (현재 최대 3초)
- [ ] Lighthouse Performance/CLS Before-After 비교
- [ ] ko/en/jp 3로케일에서 eyebrow 라벨이 전부 번역되어 보이는지 확인
- [ ] `prefers-reduced-motion` 환경에서 Hero가 항상 즉시 100% 보이는지 확인
- [ ] 다크→라이트 전환 횟수가 실제로 줄었는지 페이지 전체 스크린샷으로 재확인

---

## 참고 — 이미 존재하는 팀 문서와의 연결점

- `docs/MOCKUP_ELEVATION_ROLLOUT_PLAN_v1.md`: 목업 44종의 토큰화·재사용성 문제를 이미 프로젝트 레벨에서 인지하고 있으며, `HqRollupDashboardMockup`은 미등록 상태로 즉시 registry 등록이 필요하다고 명시되어 있습니다(§3). 이번 Phase 2-4는 그 트랙과 그대로 합류시키면 됩니다.
- `docs/MOCKUP_SYSTEM_GUIDE.md`: 섀도우·토큰 통일 원칙(§3-1)이 이미 정의돼 있어 Phase 2-2/2-4에 그대로 적용 가능합니다.
- `docs/STATUS.md`(§15)의 미착수 항목 "제품 목업 개선(care 포함)"이 이번 계획의 Phase 2와 맞닿아 있습니다.
