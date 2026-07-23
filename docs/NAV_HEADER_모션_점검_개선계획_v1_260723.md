# Header(Navigation Bar) 디자인·애니메이션 점검 & 개선 계획 v1

- 작성일: 2026-07-23
- 점검 대상: `src/components/layout/Header.tsx`, `HeaderWrapper.tsx`, `src/components/ui/SlidingIndicator.tsx`, `src/lib/spring-config.ts`, `src/app/globals.css`
- 대조 문서: `DESIGN.md`(토큰/모션 규칙), `docs/motion-animation-plan.md`(사이트 전역 모션 로드맵)
- 방법: 정적 코드 리뷰 기반 진단. 실측(DevTools 프로파일링, 실기기 테스트)은 아직 수행하지 않았으며, 5장 체크리스트로 검증을 제안함.

---

## 0. 결론부터

"안정감이 없고 부드럽지 않다"는 체감의 원인은 한 가지가 아니라 **레이아웃 흔들림 1건 + 무거운 CSS 속성 애니메이션 1건 + 모션 언어 불일치 다수**가 겹쳐서 나는 것으로 보입니다. 우선순위:

1. **가장 큰 범인 후보** — active/hover 시 `font-medium → font-semibold` 전환으로 버튼 텍스트 폭이 바뀌는 미세한 레이아웃 시프트 (3.1). 이미 `SlidingIndicator` pill이 active를 표시하고 있어 폰트 굵기 변화는 불필요한 중복 신호이자 흔들림의 원인입니다.
2. **두 번째 범인 후보** — 스크롤 시 `backdrop-filter`(블러 반경) 자체를 애니메이션하는 방식 (3.3). 블러 반경 트랜지션은 합성(compositing)이 안 되는 무거운 연산이라 저사양 기기·Safari에서 버벅임을 유발하기 쉽습니다.
3. **체감을 계속 미묘하게 깎아먹는 요인** — Header의 트랜지션들이 `DESIGN.md`가 정의한 사이트 전역 이징(`--ease-out-cubic`)·스프링(`springGentle`)을 쓰지 않고 Tailwind 기본값을 그대로 쓰고 있어, 사이트 다른 곳과 감속 곡선이 미묘하게 다릅니다 (3.4).
4. **실제 코드 버그(정정)** — `SlidingIndicator.tsx` 주석은 "reduced motion은 전역 `MotionConfig`가 처리한다"고 되어 있습니다. 최초 진단 시 `src/app/layout.tsx`만 검색해 `MotionConfig`가 "존재하지 않는다"고 적었으나, 구현 단계에서 `src/components/providers/MotionProvider.tsx`가 실제로 `MotionConfig`를 감싸고 있는 것을 확인했습니다. 문제는 부재가 아니라 **적용 범위**였습니다 — `layout.tsx`에서 `<MotionProvider>`가 `<main>{children}</main>` 안쪽만 감싸고 있어서, `<main>` 바깥에 형제로 렌더링되는 `<HeaderWrapper />`(Header)는 이 provider의 바깥에 있었습니다. 즉 헤더의 `SlidingIndicator`/스크롤 진행바는 실제로 `prefers-reduced-motion`의 영향을 받지 못하고 있었습니다 (3.5, 아래에서 정정 반영).

아래는 위 발견을 포함한 8개 항목의 상세 진단과, 리스크/공수 기준으로 나눈 P0/P1/P2 실행 계획입니다.

---

## 1. 진단 요약

| # | 영역 | 사용자 체감 증상 | 근본 원인 | 심각도 |
|---|---|---|---|---|
| 3.1 | 액티브/호버 상태 | 메뉴 버튼에 마우스를 올리거나 페이지 이동 시 버튼 폭이 미세하게 흔들림 | `font-medium`↔`font-semibold` 전환으로 텍스트 폭 변화 (레이아웃 시프트) | **높음** |
| 3.2 | 메가메뉴 열림 트리거 | 네비바를 빠르게 가로지르기만 해도 메가메뉴가 깜빡 열렸다 닫힘 | hover 진입 지연 없음 + hover/click이 같은 state를 동시 제어 | 높음 |
| 3.3 | 스크롤 시 배경 전환 | 스크롤할 때 헤더 배경이 매끈하지 않고 살짝 끊기는 느낌 | `backdrop-filter`(blur 반경) 자체를 트랜지션 — 비합성 속성 | 높음 |
| 3.4 | 전체 모션 리듬 | 헤더 근처만 사이트 다른 곳과 "다르게" 움직이는 느낌 | 사이트 표준 이징 토큰(`--ease-out-cubic`) 대신 Tailwind 기본 easing 사용 | 중간 |
| 3.5 | 접근성/정적 신뢰도 | reduced-motion 설정 사용자도 슬라이딩/진행바 애니메이션을 그대로 봄 | `MotionConfig` 미구현 (주석과 실제 코드 불일치) | 중간 (접근성 이슈) |
| 3.6 | 코드 일관성 | (시각적 증상 없음, 잠재 리스크) | `z-40` 하드코딩 — `DESIGN.md` z-scale 규칙 위반 | 낮음 (잠재 리스크) |
| 3.7 | 스크롤 진행바 노출 범위 | 스크롤이 거의 없는 페이지(요금/회사 등)에도 "읽기 진행률" 바가 뜸 | 전역 헤더에 무조건 렌더링 | 낮음~중간 |
| 3.8 | 모바일 아코디언 타이밍 | 메뉴 열자마자 하위 카테고리를 누르면 리듬이 어긋나 보임 | 상위 패널 `duration-300` vs 하위 아코디언 `duration-200` 불일치 | 낮음 |

---

## 2. 상세 진단

### 3.1 active/hover 폰트 굵기 전환으로 인한 레이아웃 흔들림 — 최우선

`Header.tsx` L172–174 (데스크톱 링크), L197–199 (메뉴 버튼), L401–403 (모바일 링크)에 이어, 구현 단계에서 같은 패턴이 두 곳 더 있는 것을 확인했습니다: L418–420(모바일 상위 메뉴 버튼), L441–443(모바일 하위 카테고리 리프). 총 5곳 모두 동일한 패턴입니다:

```tsx
className={`... ${
  active ? 'text-primary font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
}`}
```

`font-medium`(500)에서 `font-semibold`(600)로 바뀌면 같은 글자라도 렌더링 폭이 달라집니다. 이 버튼들은 `gap-1`로 촘촘히 배치된 flex 네비게이션 안에 있어서, 폭이 바뀌면 옆 항목과의 간격·전체 네비 폭이 함께 미세하게 밀립니다. 이미 활성 상태는 `SlidingIndicator`(배경 pill)로 표현되고 있으므로, 폰트 굵기 변화는 **신호가 중복**되면서 **불안정함의 원인**이 되는 구조입니다.

**개선안**: 활성 상태 표시를 색상(`text-primary`) + 배경 pill로만 하고 `font-semibold`는 제거. 만약 타이포 강조를 유지하고 싶다면, 보이지 않는 `font-semibold` 텍스트를 같은 자리에 겹쳐 두어 폭을 미리 확보하는 방식(고정폭 트릭)을 씁니다.

### 3.2 메가메뉴 hover 트리거 — 의도치 않은 깜빡임

`Header.tsx` L102–109:

```tsx
const handleEnter = useCallback((key: string) => {
  if (closeTimeout.current) clearTimeout(closeTimeout.current);
  setOpenKey(key);            // 진입 즉시 오픈, 지연 없음
}, []);

const handleLeave = useCallback(() => {
  closeTimeout.current = setTimeout(() => setOpenKey(null), 150);
}, []);
```

닫힘에는 150ms 지연(디바운스)이 있지만 **열림에는 지연이 전혀 없습니다.** 사용자가 "요금" 링크로 가려고 "제품" 버튼 위를 스치듯 지나가기만 해도 620px짜리 메가메뉴가 순간적으로 튀어나왔다 사라지는 깜빡임이 발생할 수 있습니다. 여기에 더해 같은 `openKey` state를 `onClick`(토글)과 hover가 동시에 제어하고 있어, 이미 hover로 열려 있는 상태에서 클릭하면 즉시 닫히고 그 상태로 마우스가 버튼 위에 머물러 있어도 다시 열리지 않는(재진입 이벤트가 없으므로) 등 소소한 불일치도 있습니다.

**개선안**: 진입에도 80~120ms 정도의 "hover-intent" 지연을 추가합니다(빠르게 스쳐 지나가는 케이스만 걸러냄). 클릭과 hover가 상태를 다투지 않도록, 클릭 시에는 hover 타이머를 무시하도록 정리합니다.

### 3.3 `backdrop-filter` 애니메이션 — 스크롤 전환이 무거움

`Header.tsx` L147–152:

```tsx
className={`relative transition-[background-color,border-color,backdrop-filter] duration-200 border-b ${
  isScrolled || isMenuOpen || openKey
    ? 'bg-white/95 backdrop-blur-md border-gray-200/80 shadow-sm'
    : 'bg-white/80 backdrop-blur-sm border-gray-100'
}`}
```

`backdrop-blur-sm`(4px)에서 `backdrop-blur-md`(12px)로 블러 반경 자체를 트랜지션합니다. `backdrop-filter`는 매 프레임 뒤 배경을 다시 래스터라이즈해야 해서 GPU 합성이 어려운 속성이고, 특히 Safari(맥/iOS)와 중저가 기기에서 스크롤 중 버벅임을 유발하는 대표적인 패턴입니다. "스크롤할 때 부드럽지 않다"는 체감의 유력한 원인입니다.

**개선안**: 블러 반경은 고정값 하나로 두고, 상태 전환은 `background-color`(opacity)와 `box-shadow`만 트랜지션하도록 축소합니다. 두 단계 블러 느낌이 꼭 필요하다면, 블러가 적용된 레이어와 안 된 레이어를 겹쳐두고 `opacity` 크로스페이드로 대체하는 방법도 있습니다(둘 다 transform/opacity 기반이라 합성 가능).

### 3.4 디자인 토큰과 어긋난 easing

`DESIGN.md`는 "Easing: `var(--ease-out-cubic)`(기본 reveal), `var(--ease-out-expo)`(카운트), JS 모션은 `spring-config.ts`"를 표준으로 명시합니다(`--ease-out-cubic: cubic-bezier(0.22, 1, 0.36, 1)`, `globals.css` L127). 그런데 Header의 배경 전환, 드롭다운 fade/translate, 셰브론 회전 트랜지션은 전부 `duration-200`/`duration-300`만 지정하고 easing은 지정하지 않아 Tailwind 기본값(`cubic-bezier(0.4,0,0.2,1)`)을 그대로 씁니다. 값 자체는 비슷해 보여도 감속 곡선이 달라, 헤더 근처만 사이트 다른 파트(스크롤 리빌 등)와 "결이 다르게" 움직이는 원인이 됩니다.

**개선안**: 최소 조치로 `ease-[var(--ease-out-cubic)]`을 각 트랜지션에 추가합니다. 더 나아가서는 `DESIGN.md`가 이미 "패널 진입 = `springGentle`"이라고 명시한 원칙에 맞춰, 메가메뉴/드롭다운 자체를 CSS transition에서 framer-motion(`AnimatePresence` + `springGentle`)으로 전환하는 방안을 P2로 제안합니다. 이는 `docs/motion-animation-plan.md`의 D1 항목("Header 모바일 메뉴 AnimatePresence")과도 맞닿아 있어 별도 트랙이 아니라 그 계획의 연장으로 진행할 수 있습니다.

### 3.5 reduced-motion 미보장 — `MotionConfig` 스코프 누락 (정정된 진단)

`SlidingIndicator.tsx` L11–12 주석:

> "Reduced motion is handled globally by MotionConfig, which makes the layout move instant."

`MotionConfig`는 실제로 `src/components/providers/MotionProvider.tsx`에 구현되어 있습니다(`<MotionConfig reducedMotion="user">{children}</MotionConfig>`). 문제는 `layout.tsx`에서의 배치 위치입니다:

```tsx
<Suspense fallback={<Header />}>
  <HeaderWrapper />
</Suspense>
<main id="main-content" className="pt-16">
  <MotionProvider>{children}</MotionProvider>   {/* Header는 이 바깥의 형제 */}
</main>
```

`HeaderWrapper`(→ `Header`)가 `<MotionProvider>`의 형제로, 그 바깥에서 렌더링되고 있어 provider가 제공하는 컨텍스트를 받지 못합니다. 즉:

- 액티브 탭 `SlidingIndicator`의 layoutId 슬라이드 애니메이션(`springTabPill`)
- 스크롤 진행바(`useScroll` → `scaleX`)

두 가지 모두 `prefers-reduced-motion: reduce`를 켠 사용자에게도 그대로 재생됩니다. `globals.css`의 전역 reduced-motion 블록(L825~)은 CSS `animation`/`transition`만 무력화하고, framer-motion 레이어드 애니메이션(layout animation, MotionValue 기반 scaleX)은 `MotionConfig` 컨텍스트가 있어야 무력화됩니다.

**개선안**: 새 `MotionConfig`를 추가하는 게 아니라, 기존 `<MotionProvider>`가 `Header`/`Footer`/`LandingStickyCta`까지 포함하도록 감싸는 범위를 넓힙니다(중복 provider 없이 스코프만 확장). 코드 재배치만으로 해결 가능하고 리스크가 거의 없습니다.

### 3.6 `z-40` 하드코딩

`Header.tsx` L146: `<header className="fixed top-0 left-0 right-0 z-40">`.

`DESIGN.md` 편집 규칙 2번: "Don't hardcode `z-[NN]` — use the z scale." 현재 `--z-header: 40`(`globals.css` L67)과 값은 일치하지만, 토큰을 참조하지 않고 숫자를 직접 썼기 때문에 향후 z-scale이 조정되면 헤더만 조용히 어긋날 수 있는 잠재 리스크입니다.

**개선안**: `z-[var(--z-header)]`로 교체.

### 3.7 스크롤 진행바의 전역 노출

`Header.tsx` L376–380의 "reading-progress bar"는 `docs/motion-animation-plan.md` D4 항목("Header 스크롤 진행바")에서 의도적으로 추가된 기능이지만, 현재 구현은 블로그/문서형 페이지뿐 아니라 요금제·회사소개처럼 스크롤이 거의 없는 페이지에도 전역으로 노출됩니다. 콘텐츠 소비형 페이지가 아닌 곳에서는 의미 없는 얇은 선이 헤더 아래 항상 걸려 있어 오히려 "왜 여기 이게 있지" 하는 위화감을 줄 수 있습니다.

**개선안**: 아티클/문서 템플릿에서만 렌더링하도록 스코프를 좁히거나, 페이지의 스크롤 가능 높이가 임계치 미만이면 자동으로 숨기는 로직을 추가합니다.

### 3.8 모바일 아코디언 타이밍 불일치

상위 모바일 메뉴 패널은 `duration-300`(L384), 하위 카테고리 아코디언은 `duration-200`(L425)으로 서로 다릅니다. 메뉴를 열자마자 바로 하위 카테고리를 탭하는 흔한 동선에서 두 애니메이션이 동시에 진행되며 서로 다른 리듬으로 움직이기 때문에 미세하게 어긋나 보일 수 있습니다.

**개선안**: 두 트랜지션을 하나의 duration/easing 값으로 통일합니다.

---

## 3. 개선 계획 (실행 순서)

### P0 — 즉시 적용, 리스크 낮음 (이번 스프린트) — ✅ 반영 완료 (2026-07-23)

| 항목 | 파일 | 조치 | 상태 |
|---|---|---|---|
| 1. 액티브/호버 폰트 굵기 흔들림 제거 | `Header.tsx` (L172-174, 197-199, 401-403, 418-420, 441-443 — 총 5곳) | `font-semibold` 조건부 적용 제거, 색상+pill로만 active 표시 | ✅ 완료 |
| 2. `z-40` → 토큰화 | `Header.tsx` (L146) | `z-[var(--z-header)]` | ✅ 완료 |
| 3. 이징 토큰 정합 | `Header.tsx` 배경/버튼/드롭다운/셰브론/모바일 메뉴 전 트랜지션 | `ease-[var(--ease-out-cubic)]` 추가 (부수적으로 모바일 상위·하위 아코디언 duration도 300ms로 통일 — 3.8 일부 선반영) | ✅ 완료 |
| 4. reduced-motion 실제 보장 | `src/app/layout.tsx` | 신규 `MotionConfig` 추가가 아니라, 기존 `<MotionProvider>`의 감싸는 범위를 `Header`/`Footer`/`LandingStickyCta`까지 확장 (3.5 정정 진단 반영) | ✅ 완료 |

**검증**: 사용자 로컬 저장소에서 `npx eslint src/components/layout/Header.tsx src/app/layout.tsx`, `npx tsc --noEmit` 실행 — `layout.tsx`는 무결점, `Header.tsx`는 이번 변경과 무관한 기존 이슈 1건(L140 `react-hooks/set-state-in-effect`, pathname 변경 시 상태 초기화 useEffect — 이번 수정 대상 밖)만 남아있음을 `git diff` 대조로 확인했습니다. 브라우저 실측(체크리스트 4장)은 아직 미수행이라 사용자 확인이 필요합니다.

### P1 — 상호작용 재설계 — ✅ 반영 완료 (2026-07-23)

| 항목 | 파일 | 조치 | 상태 |
|---|---|---|---|
| 5. hover-intent 도입 | `Header.tsx` `handleEnter`/`handleLeave`/`handleToggleClick` | 진입 100ms 지연 추가(닫힘은 기존 150ms 유지). 모든 상태 변경 지점(Escape, 바깥 클릭, 라우트 변경, 언마운트)에서 `clearOpenCloseTimers()`로 타이머를 정리해 클릭↔hover 경합(닫은 직후 남은 hover 타이머가 다시 열어버리는 문제)을 제거 | ✅ 완료 |
| 6. `backdrop-filter` 트랜지션 제거 | `Header.tsx` (헤더 배경 컨테이너) | 블러 반경을 `backdrop-blur-md` 고정값으로 두고, 트랜지션 대상을 `background-color,border-color,box-shadow`로 축소(블러 반경 자체는 더 이상 애니메이션하지 않음) | ✅ 완료 |
| 7. 모바일 아코디언 타이밍 통일 | `Header.tsx` (모바일 상위 패널·하위 아코디언) | P0 3번 작업 때 함께 `duration-300` + `--ease-out-cubic`로 통일 완료 | ✅ 완료 (P0에서 선반영) |

**검증**: 동일하게 사용자 로컬에서 `npx eslint`, `npx tsc --noEmit` 실행 — 신규 에러 없음(기존 L166 `react-hooks/set-state-in-effect` 1건만 유지, 이번 변경과 무관). `md5sum`으로 전송본과 기기 반영본이 바이트 단위로 일치하는 것도 확인했습니다.

### P2 — 모션 언어 통합 (`motion-animation-plan.md` D1/D6과 병행) — 8·9 반영, 10 실측 대기 (2026-07-23)

| 항목 | 조치 | 상태 |
|---|---|---|
| 8. 메가메뉴 CSS → framer-motion 전환 | `motion.div` + `animate` + `springGentle`. **`AnimatePresence`는 쓰지 않았다** — 아래 사유 참조 | ✅ 완료 (방식 변경) |
| 9. 스크롤 진행바 노출 범위 재검토 | 전역 헤더에 템플릿 플래그를 배선하는 대신, 실제 스크롤 가능 거리를 측정해 `PROGRESS_MIN_SCROLL`(1200px) 미만이면 렌더하지 않음. 라우트 변경·리사이즈·`ResizeObserver(body)`로 재측정 | ✅ 완료 |
| 10. `layoutId` 교차 이동 점검 | 코드 점검까지만 — `springTabPill`(damping 28 / stiffness 420)이 이미 "fast settle, no visible overshoot"로 튜닝돼 있어 정적 리스크는 낮다고 판단. 실제 튐 여부는 브라우저 실측 필요 | ⏸ 실측 대기 |

**⚠️ 8번을 `AnimatePresence`로 하지 않은 이유.** 계획서 원안대로 닫힘 시 언마운트하면 **헤더 드롭다운 링크가 서버 HTML에서 사라진다.** 착수 전 정적 export를 확인한 결과 현재 헤더는 3로케일 모두 하위 링크를 포함해 고유 링크 37개를 SSR에 담고 있고, 이는 전 페이지에 깔리는 내부 링크 표면이다. 언마운트되면 페이지당 30여 개가 크롤 대상에서 빠진다(같은 함정을 `SolutionsExplorer`에서 이미 한 번 겪었다 — `pending-followups` 참조).

그래서 패널은 **항상 마운트한 채로 두고**(`aria-hidden` + `inert`로 a11y·포인터 트리에서만 제외) 모션만 CSS 트랜지션 → framer `animate` + `springGentle`로 옮겼다. 계획의 실제 목적("사이트 표준 스프링으로 모션 언어 통합")은 달성하면서 SSR 링크는 유지된다.

**검증**: 3로케일 헤더 SSR 고유 링크 37개 유지(드롭다운 하위 링크 5/5 샘플 확인) · 짧은 페이지(pricing) 진행바 SSR 미노출 · `tsc` · `next build` 878/878 · 정적 export · eslint 신규 0건.

P0는 시각적 영향은 크지만 변경 범위가 좁아 리뷰 부담이 적고, P1은 상호작용 로직을 손대는 만큼 QA가 필요합니다. P2는 기존 로드맵(D1/D6)과 합쳐서 진행하는 편이 중복 작업을 줄입니다.

---

## 4. 검증 체크리스트

- [ ] macOS "동작 줄이기(Reduce Motion)" 켠 상태에서 헤더/드롭다운/진행바가 정적으로 동작하는지
- [ ] Chrome DevTools CPU 4x throttle + 스크롤 시 배경 전환 프레임 드랍 확인
- [ ] Safari(맥/iOS)에서 `backdrop-filter` 전환 체감 확인 — 가장 취약한 브라우저
- [ ] 마우스로 네비바를 빠르게 좌우로 스치듯 지나갈 때 메가메뉴 깜빡임 여부
- [ ] active 탭에 hover 시 버튼 폭이 흔들리지 않는지 (레이아웃 시프트 0, 실측은 Chrome DevTools Layout Shift Regions)
- [ ] 모바일에서 메뉴 열기 → 하위 카테고리 연속 탭 시 리듬이 맞는지
- [ ] 라우트 전환 시(메뉴형 active → 링크형 active) `SlidingIndicator` 이동이 과하게 튀지 않는지
- [ ] 로케일(ko/en/jp) 전환 시 라벨 폭 변화로 인디케이터가 깨지지 않는지
- [ ] 스크롤이 거의 없는 페이지(요금제 등)에서 진행바가 어색하게 보이지 않는지

---

## 5. 참고 / 관계 문서

- `docs/motion-animation-plan.md`: 사이트 전역 모션 로드맵. D1(모바일 메뉴 AnimatePresence), D4(헤더 스크롤 진행바), D6(SlidingIndicator 프리미티브 추출)이 이번 점검과 맞닿아 있음. 본 문서는 그중 Header에 해당하는 항목들을 실행 가능한 수준으로 구체화한 버전으로 보면 됩니다.
- `DESIGN.md`: 토큰/이징/z-scale 규칙의 근거.
- 코드: `src/components/layout/Header.tsx`, `HeaderWrapper.tsx`, `src/components/ui/SlidingIndicator.tsx`, `src/lib/spring-config.ts`, `src/app/globals.css`(`:root` 토큰, L825~ reduced-motion 블록).

---

## 6. 다음 단계 제안

P0(4개)·P1(3개) 모두 코드에 반영 완료했습니다(`src/components/layout/Header.tsx`, `src/app/layout.tsx`). 남은 건 P2(메가메뉴를 framer-motion `AnimatePresence`+`springGentle`로 전환, 스크롤 진행바 노출 범위 재검토, `layoutId` 교차 이동 실측)인데, 이건 `docs/motion-animation-plan.md`의 D1/D6과 함께 진행하는 편이 중복이 적어 별도 착수 타이밍에 논의하는 걸 권장드립니다. 지금은 4장 체크리스트대로 `npm run dev`로 직접 스크롤·hover·reduced-motion 체감을 확인해 보시는 걸 추천드립니다.
