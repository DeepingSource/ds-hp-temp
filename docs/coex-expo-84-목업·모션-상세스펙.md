# COEX 프랜차이즈 랜딩 — 목업 & 모션 상세 스펙 (2단계 보강)

문서 버전: v1 · 작성일 2026-07-17
범위: `StoreCountCountingMockup`(saai count) · `StoreCareStatusMockup`(saai care) 코드형 React 목업의 **구조 + 모션 타임라인**.
전제: 2단계 계획서(`coex-expo-84-2단계-리드수집·목업-구현계획.md`)의 Part C를 구체화. **코드 미변경 — 스펙만.**

> 이 문서의 코드 스니펫은 **구현 지침용 예시**입니다. 리포 파일을 수정하지 않았습니다.

---

## 0. 리포 모션 시스템 (재사용 규약)

신규 목업은 기존 목업(예: `StoreInsightMockup`, `KakaoAlertMockup`)과 **동일한 규약**을 따릅니다.

| 요소 | 소스 | 용도 |
|---|---|---|
| 진입 감지 | `useScrollAnimation({ threshold: 0.3 })` → `{ ref, isVisible }` | 뷰포트 진입 시 1회 트리거 |
| 순환 루프 | `useMockupLoop` | 시나리오 스텝 반복(care 알림 순환 등) |
| 카운트업 | `useCountUp` 또는 rAF(`1 - Math.pow(1-p,3)` easeOutCubic) | 숫자 증가 |
| 감속 선호 | `usePrefersReducedMotion()` | true면 **최종 상태 즉시 표시**, 순환·크로싱 정지 |
| 스프링 | `@/lib/spring-config` (`springGentle/Snappy/Bubble/Notif`) | framer-motion transition |
| 이징 | `--ease-out-cubic`, `--ease-out-expo` (globals.css) | CSS/transition |
| 디바이스 | `PhoneFrame` + `PhoneScreen`(aspect 393/852, `badgeLabel`) | 폰 프레임/화면 |
| 카메라 텍스처 | `ScanlineOverlay` | 영상 위 스캔라인 |
| 스킴 | `MOCKUP_SCHEME.dark` | 다크 앱(count) |
| 탭 힌트 | `TapIndicator` | 손가락 탭 인디케이터 |

**공통 오케스트레이션 패턴**(모든 목업 동일):
```tsx
const reduced = usePrefersReducedMotion();
const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
useEffect(() => {
  if (!isVisible || !active) return;
  if (reduced) { /* 최종 상태 세팅 후 */ return; }
  let cancelled = false; const timers = [];
  // sched(fn, ms) + requestAnimationFrame로 시퀀스 구성
  return () => { cancelled = true; timers.forEach(clearTimeout); /* cancelAnimationFrame */ };
}, [isVisible, active, reduced]);
```

**공통 규칙**
- `'use client'` + `export default memo(...)`.
- props = `BaseMockupProps`(`active`, `storeName`, `locale`, `className`).
- 숫자 = `tabular-nums`. 애니메이션은 **transform/opacity 위주**(레이아웃 리플로우 금지).
- 이벤트 랜딩에서는 `dynamic(import, { ssr:false })`로 로드(기존 `mockups.tsx` 규약).
- **데이터 분리**: 수치·시나리오는 로케일 무관 파일로 → `src/data/mockup-scenarios/storecount.ts`, `storecare.ts` 신규. 표시 문자열은 컴포넌트 내 `C: Record<Locale, …>`.

---

## 1. saai count — `StoreCountCountingMockup.tsx`

### 1.1 정본 UI (설치설명서 p7·p9·p11 확인)
다크 카운팅 앱. 상단 바 + 상태 칩 + 카메라 뷰(기준선) + 하단 실시간 카드 2개.

```
┌───────────────────────────┐  ← PhoneFrame + PhoneScreen(dark)
│ ∿ store count      [측정 중]│  헤더: 로고 + 우측 버튼(측정 시작/일시정지/완료)
│ ● 측정 중 · 1:10           │  상태 칩(좌상단, 경과시간)
│ ┌───────────────────────┐ │
│ │  [카메라 뷰 + 스캔라인] │ │  영상 위:
│ │   ╱유동인구1  ╱유동인구2│ │   · 유동인구 선 2 (cyan)
│ │   →유입(화살표 안쪽)    │ │   · 유입 선 1 (pink, 화살표)
│ │            + − ⛶       │ │   · 사람 실루엣이 선을 가로지름
│ └───────────────────────┘ │
│ ┌─────────┐ ┌─────────┐   │  하단 실시간 카드:
│ │유동인구  │ │유입      │   │   유동인구 · 통과 카운팅 (cyan)
│ │  127     │ │  23  18%│   │   유입 · 전환율 (pink)
│ └─────────┘ └─────────┘   │
└───────────────────────────┘
```

### 1.2 색 토큰 (앱 전용 — 시나리오 파일 상수)
- 유동인구 = **cyan** `#38BDF8`(sky-400 계열). 선/카드/카운트.
- 유입 = **pink/magenta** `#EC4899`. 선(화살표)/카드/전환율.
- 배경 = `MOCKUP_SCHEME.dark`(gray-950). 카드 = `bg-gray-900/70`.
- (사이트 브랜드 토큰과 분리 — 앱 고유 컬러이므로 `storecount.ts`에 `LINE_FOOTFALL`, `LINE_ENTRY` 등으로 둠.)

### 1.3 기준선(SVG) 구현
- 카메라 영역 위에 `<svg viewBox>` 오버레이. 각 선은 `motion.line`(또는 path) + 끝점 원(핸들).
- **드로잉 애니메이션**: `pathLength` 0→1 (framer-motion `initial={{pathLength:0}} animate={{pathLength:1}}`), `--ease-out-cubic`, 선당 ~480ms, 40ms stagger.
- 유입 선은 끝에 화살표 마커(매장 안쪽 방향). 라벨(`유동인구 1/2`, `유입`)은 선 중앙에 pill.

### 1.4 모션 타임라인 (진입 후 1사이클 ≈ 6.5s, 이후 루프)

| t(ms) | 단계 | 동작 | 수단 |
|---|---|---|---|
| 0 | 영상 페이드인 | 카메라 뷰 opacity 0→1 + `ScanlineOverlay` | motion opacity, 400ms |
| 200 | 상태=준비됨 | 칩 `● 측정 준비됨`(회색) | — |
| 400–1000 | 기준선 드로잉 | 유동1→유동2→유입 순차 `pathLength` | motion.line, stagger 40ms |
| 1100 | 측정 시작 | 칩 morph `준비됨→측정 중 · 0:00`, 버튼 `측정 시작→일시정지/완료` | `AnimatePresence` fade+slide, `springSnappy` |
| 1100→ | 타이머 | 경과시간 mm:ss 증가 | `setInterval` 1s (reduced: 정적 `1:10`) |
| 1400~ | 사람 크로싱 | 실루엣 dot이 선을 가로지름(무작위 간격 800–1600ms). 유동선 통과 시 교차점 **ripple pulse**(springSnappy scale) + 유동 count++; 유입선 통과 시 유입 count++ | rAF 위치 보간 + `AnimatePresence` dot |
| 1400~ | 카드 카운트업 | 유동인구 `0→127`, 유입 `0→23`, 전환율=유입/유동 `→18%` | rAF easeOutCubic, 증가 순간 카드 scale 1→1.06→1(springSnappy) |
| ~6000 | 완료 여운 | 칩 `측정 완료`(선택), 짧게 정지 | — |
| 6500 | 루프 리셋 | 카운트/타이머 초기화 후 1.3부터 반복 | `useMockupLoop` |

### 1.5 reduced-motion
- 기준선 즉시 표시(`pathLength:1`), 크로싱 dot 없음, 타이머 정적(`측정 중 · 1:10`), 카드 최종값(`127 / 23 / 18%`) 즉시, 펄스 없음.

### 1.6 보조(선택) — 상권 리포트 미니 대시보드
- 두 번째 상태로 전환(세그먼트/스와이프)해 성별·연령·시간대별 **유입률** 요약. 기존 `FunnelDiagram`(유동→입장→유입률) 재활용, 막대는 `StoreInsightMockup` 차트 방식(`springGentle`, delay i*0.04).
- CSV 결과(설명서 p10) 값을 시나리오로: 방문 224 / 통행 1,125 / 유입률 19.9%, 성별 남45%·여55%, 연령 20–40대 집중.

---

## 2. saai care — `StoreCareStatusMockup.tsx`

### 2.1 UI (소개서 기준 — 앱 스크린샷은 플레이스홀더 → 신규 디자인)
밝은 스킴(`MOCKUP_SCHEME.light`) 상태 홈 + 감지 알림 + 온도 + 리포트.

```
┌───────────────────────────┐
│ ◎ 스토어케어      오늘 09:41│  헤더
│ 오늘 매장 상태   �séc 92점  │  스코어(카운트업) + 종합 상태칩
│ ┌────┐┌────┐┌────┐┌────┐ │  4기능 상태칩(색):
│ │진열││온도││청결││리포트│ │   진열/온도·신선도/청결·위생/리포트
│ │좋음││주의││좋음││완벽 │ │   좋음=success 주의=warning 나쁨=error 완벽=primary
│ └────┘└────┘└────┘└────┘ │
│ ┌───────────────────────┐ │
│ │ 🔔 진열이 흐트러졌어요   │ │  감지 알림 카드(순환)
│ │  3번 매대 · 방금        │ │
│ └───────────────────────┘ │
└───────────────────────────┘
   ▲ 상단에서 푸시 알림 슬라이드다운
```

### 2.2 색 = 상태 시스템 (사이트 토큰 매핑, 소개서와 일치)
`나쁨=--error` · `주의=--warning` · `좋음=--success` · `완벽=--primary`. 칩 배경은 각 색의 tint(예: `bg-warning/10 text-warning`).

### 2.3 모션 타임라인 (루프 ≈ 8s, `useMockupLoop`)

| t | 단계 | 동작 | 수단 |
|---|---|---|---|
| 0 | 스코어 | `0→92점` 카운트업 + 링/바 채움 | `useCountUp`, `progress-fill` |
| 300 | 상태칩 등장 | 4칩 stagger 등장(y+opacity) | motion, `springGentle`, stagger 70ms |
| 1200 | 상태 변화 데모 | `온도` 칩 `좋음→주의`로 flip(색·라벨 크로스페이드) | `AnimatePresence` `fadeSwitch` |
| 1300 | 푸시 알림 | 상단에서 알림 슬라이드다운 `진열이 흐트러졌어요` | `springNotif`, 유지 2.5s 후 dismiss(`springDismiss`) |
| 1500 | 감지 카드 | 알림 카드 등장(진열→온도→청결 순환) | `AnimatePresence` 카드 스왑, `springGentle` |
| 4000 | 온도 게이지 | 냉장 온도 `3.2→7.8℃` 틱업, 임계 초과 시 칩 `주의`로 | rAF + 색 전환 |
| 8000 | 리셋 | 상태 복구 후 반복 | `useMockupLoop` |

### 2.4 reduced-motion
- 스코어·온도 최종값 즉시, 칩 최종 상태, 푸시 슬라이드/순환 없음(대표 알림 1개 정적 표시).

### 2.5 감지 그리드(섹션 3) 반영안
- 옵션 A(권장): 위 감지 알림 목업을 섹션 3 미디어로 사용(순환 알림으로 "필요할 때만 알림" 강조).
- 옵션 B: 기존 4장 이미지 그리드 유지 + 각 셀에 상태칩(좋음/주의/나쁨) 오버레이가 stagger 페이드인.

---

## 3. 파일·데이터 구조 (신규)

```
src/components/mockups/
├── StoreCountCountingMockup.tsx   # 신규
├── StoreCareStatusMockup.tsx      # 신규
└── index.ts                       # export 2줄 추가

src/data/mockup-scenarios/
├── storecount.ts   # 신규: 라인 좌표, LINE_FOOTFALL/ENTRY 색, 크로싱 스케줄, 카드 타깃(127/23/18%), CSV 요약(224/1125/19.9%)
└── storecare.ts    # 신규: 스코어(92), 4기능 상태, 알림 시퀀스, 온도(3.2→7.8, 임계 5.0)

src/components/events/coex-franchise-expo/mockups.tsx
  # CountMockup/CareMockup가 신규 목업을 dynamic import로 주입하도록 교체
```

문자열은 컴포넌트 내 `C: Record<Locale,…>`(ko 우선), 수치는 위 시나리오 파일.

---

## 4. 모션 파라미터 요약표

| 대상 | 프리셋/이징 | 지속 | 비고 |
|---|---|---|---|
| 기준선 드로잉 | `--ease-out-cubic` | 480ms/선, 40ms stagger | `pathLength` 0→1 |
| 상태 칩 morph | `springSnappy` | — | AnimatePresence |
| 타이머 | linear | 1s tick | reduced: 정적 |
| 카드 카운트업 | easeOutCubic(rAF) | 1200ms | tabular-nums |
| 카운트 증가 펄스 | `springSnappy` | — | scale 1→1.06→1 |
| 크로싱 dot | linear 보간 | 800–1600ms | reduced: 없음 |
| care 상태칩 등장 | `springGentle` | — | stagger 70ms |
| 푸시 알림 인/아웃 | `springNotif`/`springDismiss` | 유지 2.5s | — |
| 감지 카드 스왑 | `springGentle` | — | AnimatePresence |
| 스코어/온도 | rAF + `progress-fill` | 1000ms | reduced: 즉시 |

---

## 5. 접근성 · 성능

- 목업 내 핵심 수치·라벨은 실제 DOM 텍스트(스크린리더). 장식(선·dot·스캔라인)은 `aria-hidden`.
- `PhoneScreen badgeLabel`로 "예시 화면" 표기(실데이터 오해 방지). count 앱 수치엔 "예시" 각주 권장.
- 애니메이션 transform/opacity 한정, `will-change` 신중, `memo` + `active`로 오프스크린 정지.
- 다크(count)·라이트(care) 모두 텍스트 대비 AA. cyan/pink 라벨은 다크 배경 위 충분한 명도.
- `prefers-reduced-motion` 전 경로 폴백(§1.5·§2.4).

---

## 6. 구현 순서 (목업 한정)

1. `storecount.ts` 시나리오 → `StoreCountCountingMockup`(정적 레이아웃) → 기준선 드로잉 → 타이머/상태칩 → 크로싱+카드 카운트업 → reduced 폴백 → 루프.
2. `storecare.ts` 시나리오 → `StoreCareStatusMockup`(상태 홈) → 스코어/상태칩 stagger → 푸시+감지 순환 → 온도 게이지 → reduced 폴백.
3. `index.ts` export → `mockups.tsx` 교체 → count/care 섹션 확인.
4. (선택) 감지 그리드 §2.5 반영, count 보조 대시보드 §1.6.
5. 검증: 데스크톱/모바일, reduced-motion, 다크/라이트 대비, 스크롤 진입 트리거, 오프스크린 정지, 60fps 확인(transform/opacity).

---

### 부록 — 대표 스니펫(예시, 리포 규약 준수)

기준선 드로잉:
```tsx
<motion.line x1={..} y1={..} x2={..} y2={..}
  stroke={LINE_FOOTFALL} strokeWidth={2}
  initial={{ pathLength: reduced ? 1 : 0 }}
  animate={{ pathLength: 1 }}
  transition={reduced ? { duration: 0 } : { duration: 0.48, ease: [0.22,1,0.36,1], delay: i*0.04 }}
/>
```
카드 카운트업(증가 펄스):
```tsx
<motion.div key={footfall} initial={{ scale: 1 }} animate={{ scale: [1, 1.06, 1] }}
  transition={springSnappy}>
  <span className="tabular-nums">{footfall}</span>
</motion.div>
```
푸시 알림 슬라이드다운:
```tsx
<AnimatePresence>{showAlert && (
  <motion.div initial={{ y: -64, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
    exit={{ y: -64, opacity: 0 }} transition={springNotif}> … </motion.div>
)}</AnimatePresence>
```
