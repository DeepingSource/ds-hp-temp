# 목업 시스템 v2 — SAAI DS 정합 · 레이아웃 강건화 · 모션 정교화 계획 (v1)

> 작성 2026-07-23 · 대상: `deepingsource.io` 코퍼레이트 사이트
> 선행 문서: `docs/MOCKUP_ELEVATION_ROLLOUT_PLAN_v1.md`(배치·재사용), `docs/MOCKUP_SYSTEM_GUIDE.md`(v1 규약), `DESIGN.md`(사이트 토큰), `design-system/`(SAAI DS export)
> 이 문서는 v1 가이드를 **대체하지 않고 확장**한다 — v1의 콘텐츠 오버라이드 규약·빈 화면 금지 원칙은 그대로 계승.

---

## 0. 확정된 결정 (2026-07-23, Jamin)

| # | 결정 | 내용 |
|---|---|---|
| D1 | **목업 내부 = SAAI DS 전면 채택** | 목업은 "SAAI 제품 화면의 재현"이므로 목업 **내부**만 `design-system/` 토큰을 SSOT로 삼는다. 목업 바깥(섹션·탭·설명 카드)은 기존 사이트 토큰 유지. |
| D2 | **제품 구분색(emerald/violet) 폐지** | SAAI 단일 블루 원칙으로 통일. 제품 구분은 `SaaiHeader` 워드마크(`saai \| care` 등)와 타이포로. 색은 차트/상태 칩에만 SAAI 데이터 hue 사용. |
| D3 | **framer-motion 정교화 (Lottie 미도입)** | 공용 모션 토큰·variants로 규격화. 목업 내부 모션은 SAAI Motion 스펙(`out_quint`, no spring/bounce)을 따른다. |
| D4 | **계획서 우선, 실사용 목업부터 단계 적용** | 실사용 12뷰 + 홈 → 콘텐츠 핍진성 → 고아 22종 순. |

### D1의 원칙 정리 — DESIGN.md와의 관계

`DESIGN.md`의 "사이트 컴포넌트를 `design-system/`에 wire하지 말 것" 원칙은 **유지**한다. 다만 예외 조항을 명문화한다:

> **예외(목업 내부).** `src/components/mockups/**`의 목업 "화면 내부"는 SAAI 제품 UI의 재현이므로 SAAI DS를 따른다. 단, `design-system/`을 **직접 import하지 않고**, codegen으로 생성된 `src/lib/mockup-tokens.gen.ts`(§2-A)를 통해서만 소비한다. 목업 컴포넌트의 **바깥 레이어**(프레임 그림자, 등장 애니메이션, 배지)는 사이트 토큰을 쓴다 — 경계는 `MockupViewport`(§2-B)가 긋는다.

이 예외 조항은 작업 착수 시 `DESIGN.md`와 `MOCKUP_SYSTEM_GUIDE.md`에 반영한다.

---

## 1. 증상 → 근본 원인 진단

| 증상 (Jamin 피드백) | 근본 원인 (코드 근거) |
|---|---|
| ① 목업 간 디자인/색 편차 | `mockup-tokens.ts` 실사용률 낮음(대표 7종 중 2종). 로컬 hex 상수·Tailwind 임의값 산재. `PRODUCT_THEME`의 emerald/violet이 Tailwind 기본 팔레트라 SAAI 톤과 이질적. 그림자·라운딩·타이포 밀도도 컴포넌트별 제각각. |
| ② 페이지에 따라 레이아웃 깨짐 | 사이즈 계약이 없다 — 호출부마다 임의 컨테이너(`max-w-[420px]`, `aspectRatio: '9/19'` + `maxHeight` 등)를 새로 만들고, 목업 내부는 고정 px 타이포로 그려져 있어 컨테이너 폭이 설계 폭과 어긋나면 줄바꿈·오버플로·잘림이 발생. 좁은 폭에서 내부 요소가 재배치되며 밀도가 무너짐. |
| ③ 애니메이션 완성도 편차 | `useMockupLoop`/`useCountUp`은 공용이지만 duration·easing·stagger는 컴포넌트마다 임의. 사이트 spring(`springGentle`)이 목업 내부까지 침투 — SAAI Motion의 "bounce·spring·overshoot 금지" 원칙과 충돌. 전환은 대부분 단순 opacity 페이드. |
| ④ SAAI DS 미반영 | `design-system/`이 read-only export로 격리되어 있고 소비 경로가 없음. `SaaiHeader` 워드마크만 부분 적용. |
| ⑤ 콘텐츠 완결성·핍진성 | `canonical.ts`(강남역점 SOT)가 있으나 파생률이 낮고, 다수 목업이 내부 하드코딩 숫자 사용. 시계열·명부·알림 문구의 상호 정합(합계·요일·시간대·전일 대비 산식) 검증 절차 없음. |

핵심: **v1이 "재사용 구조"를 깔았다면, v2는 "계약(contract)"을 깐다** — 색 계약(SAAI 토큰), 크기 계약(MockupViewport), 모션 계약(motion 토큰), 데이터 계약(canonical v2).

---

## 2. 아키텍처 — Phase 0에서 만드는 4개의 계약

### 2-A. 색·타이포 계약: SAAI 토큰 파이프라인

```
design-system/design.tokens.md (YAML frontmatter, read-only SSOT)
        │  scripts/gen-mockup-tokens.mjs  (신규, npm run gen:mockup-tokens)
        ▼
src/lib/mockup-tokens.gen.ts   ← 자동 생성, 손수정 금지 헤더
        ▼
src/lib/mockup-tokens.ts       ← gen 재export + 목업 전용 파생(MOCKUP_DEVICE 밀도 등)
```

- **생성 대상**: neutrals/blue 스케일, semantic alias(`bg-app`·`fg-primary`·`border-default`…), 상태색, **차트 팔레트 전체**(cat 1–6 + context, sequential blue ramp, diverging, chrome), 타이포 트랙(heading/body/chart-text), `rounded`, `spacing`, `motion`.
- **CSS 변수 스코프**: 생성 스크립트가 `--saai-*` CSS 변수 블록(`.saai-scope { … }`)도 함께 산출해 `globals.css`에 import. `MockupViewport`가 루트에 `.saai-scope`를 자동 부여하므로 목업 내부에서는 Tailwind arbitrary value(`bg-(--saai-bg-app)`, `text-(--saai-fg-secondary)`)나 소수의 프리셋 클래스로 소비한다.
- **기존 토큰 정리**:
  - `PRODUCT_THEME` → **deprecated**. 전환 기간 동안 타입만 유지하고 값은 전부 blue로 alias, Phase 1 완료 시 삭제(D2).
  - `MOCKUP_SCHEME.light/dark` → SAAI semantic alias 기반으로 재정의(다크는 SAAI에 아직 없으므로 기술 페이지 다크 목업용 파생 규칙을 이 파일에 명문화 — "SAAI grey 스케일의 역전 + blue 유지").
  - `MOCKUP_STATUS_*` → SAAI `status-success/warning/error`(green-500/yellow-500/red-500)로 교체. Material hex(#FF9800 등)는 목업 내부에서 퇴출(사이트 UI에는 잔류 — 경계 원칙).
  - `MOCKUP_DEVICE`는 SAAI 타이포 트랙(heading-2xs 13px, body-s 12px, chart-axis 11px…)에 맞춰 재산정. **11px 미만 글자 금지**(SAAI 차트 텍스트 규칙) — 현행 `text-[9px]`/`micro` 계열은 설계 캔버스 기준으로 상향.
- **가드레일**: stylelint의 `src/components/mockups/**` hex 예외를 **철회**하고, "gen 토큰·`--saai-*` 변수만 허용"으로 강화. 실제 브랜드 재현(카카오톡/LINE `#06c755` 등)만 파일 단위 명시 예외.

### 2-B. 크기 계약: `MockupViewport` — 레이아웃 깨짐의 구조적 해결

문제의 본질은 "목업이 유동 폭에 리플로우"하는 것. 해결은 **고정 설계 캔버스 + 비율 스케일**:

```tsx
<MockupViewport design="phone">   {/* 390×844 고정 캔버스 */}
  <StoreCareMockup … />           {/* 내부는 항상 390px 기준으로만 설계 */}
</MockupViewport>
```

- 표준 캔버스 3종: `phone` 390×844 · `desktop` 1280×800 · `card` 480×가변(다이어그램/위젯용, 높이 콘텐츠 추종).
- 래퍼가 컨테이너 폭을 측정(ResizeObserver)해 `transform: scale(w/390)` 적용. **내부 줄바꿈·오버플로가 어떤 페이지에서도 변하지 않는다** — 폰트가 비율대로 축소될 뿐.
- `aspect-ratio`를 래퍼에 예약해 CLS 0. `min/maxScale`로 과대·과소 확대 방지(과소 시 가독성 하한 경고는 /demo 갤러리에서 시각화).
- 프레임(`PhoneFrame` 등)은 Viewport **안쪽**에 포함 — 호출부는 폭만 정하면 끝. `SolutionMockupPreview`의 `aspectRatio: '9/19'` 같은 호출부 임의 컨테이너는 전부 제거.
- 접근성: 스케일된 텍스트는 스크린리더에 그대로 노출되므로 문제 없음. `prefers-reduced-motion` 시 내부 루프 정지(기존 `useMockupLoop` 가드 유지).

### 2-C. 모션 계약: `src/lib/mockup-motion.ts`

SAAI Motion 스펙을 그대로 토큰화(§2-A gen에 포함)하고, 그 위에 목업 공용 variants를 정의:

| variant | 스펙 | 용도 |
|---|---|---|
| `enter` | out_quint · 300ms · y 8px→0 + opacity | 목업 내부 요소 등장 |
| `swap` | out_quint · 300ms · 크로스페이드(+선택적 x 슬라이드) | `useMockupLoop` 시나리오/탭 전환 — 현행 200ms 단순 페이드 대체 |
| `listStagger` | 60ms 간격 · enter 파생 | 리스트/카드 순차 등장 |
| `count` | out_quint 기반 tween (spring 아님) | `useCountUp` 재규격 — 목업 내부 숫자는 spring 금지 |
| `panel` | 480ms · transform+opacity | 대시보드 패널 리사이즈류 |
| `streaming` | 흐르는 그라데이션(`background-clip: text`) | 챗 목업 봇 응답 — 타자기 캐럿/스피너 금지 (SAAI 규칙) |
| `pulse` | 800ms fade | 하이라이트·알림 도착 신호 |

- **경계**: 목업 "등장"(스크롤 리빌)은 사이트 모션(`AnimatedSection`/springGentle) — 페이지의 일부이므로. 목업 "내부" 모션은 위 토큰만. 이 경계도 가이드 v2에 명문화.
- `useMockupLoop`은 유지하되 `transitionDuration` 기본값을 motion 토큰에서 읽도록 변경. `useCountUp` 고정 호출 문제(v1 가이드가 지적한 `MultiStoreDashboard`/`HqMapDashboard` 4회 하드코딩)는 이 기회에 `useCountUpGroup(values[])`로 선행 리팩터.
- 정교화 방향(컴포넌트 공통): 진행 중 상태의 **연속성**(단계 점프 대신 진행 인디케이터), 전환 직전 fade-out과 직후 fade-in의 타이밍 통일, 커서·탭·알림 도착 같은 "손맛" 마이크로 모션의 재사용 컴포넌트화(`<AnimatedCursor>`, `<IncomingBadge>` 등).

### 2-D. 데이터 계약: canonical v2 + 핍진성 체크리스트

- **canonical 확장** (`src/data/mockup-scenarios/canonical.ts`):
  - 시간대별 방문 곡선(1일 24h), 요일별 매출(1주), 카테고리 구성비 — 모든 차트가 이 시계열에서 파생(합계·평균이 KPI 스칼라와 **산술적으로 일치**해야 함).
  - 명부: 매장 20개(멀티매장·지도용, 200점 분포와 정합), 직원/고객 익명 표기 규칙, 알림 문구 사전(경보 유형 × 심각도).
  - 시간 표기: `mockup-time.ts`와 통합 — 목업 속 "오늘/어제/시각"은 항상 상대 규칙으로 생성(빌드 시점 박제 금지).
- **핍진성 체크리스트** (가이드 v2에 수록, 리뷰 시 체크):
  1. 숫자는 canonical 파생인가? (하드코딩 발견 시 canonical로 승격)
  2. 화면 내 합계·비율·전일 대비가 서로 맞는가? (342명·-5%·₩1.24M 등 교차 검증)
  3. 단위·자릿수 표기가 로케일 규칙(KO 만원/EN K/JP 万円)을 따르는가?
  4. 요일·시간대·계절이 서사와 맞는가? (심야에 점심 피크 문구 금지)
  5. 고유명사는 승인된 것만인가? (실명 정책 — 올리브영 건 등 기존 규칙 준수)
  6. 빈 화면·placeholder·lorem 0건인가?
  7. 화면 하나에 CTA 1개 원칙(v5 계승) 유지되는가?

---

## 3. 실행 단계

### Phase 0 — 기반 구축 (선행, 다른 모든 것의 전제)

| # | 작업 | 산출물 |
|---|---|---|
| 0-1 | 토큰 codegen 스크립트 + gen 파일 + `--saai-*` CSS 스코프 | `scripts/gen-mockup-tokens.mjs`, `mockup-tokens.gen.ts`, globals.css 패치 |
| 0-2 | `MockupViewport` 구현 + 프레임 3종 내장화 | `src/components/mockups/MockupViewport.tsx` |
| 0-3 | `mockup-motion.ts` + `useCountUpGroup` 리팩터 | motion 토큰·공용 variants |
| 0-4 | 레퍼런스 마이그레이션 1종 (`ChatMockup` — v1 때도 레퍼런스) | SAAI 토큰·Viewport·motion 전부 적용된 모범 구현 |
| 0-5 | `/demo` 갤러리에 **검증 하네스**: 컨테이너 3폭(320/480/768) × 3로케일 동시 렌더 뷰 | 깨짐·편차를 눈으로 잡는 도구 |
| 0-6 | 가이드 v2 문서화 + DESIGN.md 예외 조항 + lint 가드 강화 | `MOCKUP_SYSTEM_GUIDE.md` v2 |

**Acceptance**: ChatMockup이 3폭×3로케일에서 줄바꿈 변화 0 · CLS 0 · 목업 내부 hex/spring 0건 · `npm run gen:mockup-tokens` 멱등.

### Phase 1 — 실사용 목업 마이그레이션 (노출 빈도 순)

| 배치 | 대상 | 비고 |
|---|---|---|
| 1a | 홈(`HomeView` 계열 4종: SpaceAiAnswerBeat의 Chat/StoreInsight, HomeEnterpriseBeat의 MultiStore, FeatureCarousel의 IntegratedLoop/ActionCard) + `SpatialTrajectoryMockup` | 트래픽 최다. emerald/violet 제거 1차 |
| 1b | 제품 페이지 목업 (StoreCare/StoreInsight/StoreCount/StoreAgent/Saai 뷰) + `StoreInsightDesktopMockup` | 제품 정체성 = SAAI 룩이 가장 중요한 곳 |
| 1c | 솔루션·엔터프라이즈 (`SolutionMockupPreview`, `EnterpriseAppShowcase`, HQ 계열 2종 + **미등록 4종 registry 등록**) | `SolutionMockupPreview`의 PRODUCT_META(emerald/violet 탭)도 워드마크+숫자 구분으로 재설계 |
| 1d | 기술 페이지 다크 3종 (Spatial/Seal/EdgePerf) + 다이어그램류 | 다크 파생 규칙(§2-A) 첫 적용 |

각 배치 공통 작업: Viewport 감싸기 → 호출부 임의 컨테이너 제거 → SAAI 토큰 치환 → motion variants 치환 → 검증 하네스 통과 → 스크린샷 전후 비교.

**Acceptance**: 실사용 뷰 12개+홈에서 emerald/violet 0건, 호출부 사이즈 지정은 "폭"만, /demo 하네스 전 항목 그린.

### Phase 2 — 콘텐츠 핍진성 패스

- canonical v2 확장(§2-D) → 실사용 목업의 하드코딩 숫자 전수 조사·파생 전환.
- 시나리오 파일(storeagent/storecare/storeinsight/enterprise/…) 교차 정합 감사 — 같은 강남역점이 화면마다 다른 숫자를 말하지 않는지.
- KO/EN/JP 3로케일 문구 동기화 + 표기 규칙 적용. 신규 카피는 기존 규칙대로 **Jamin 확정 후 반영(placeholder 금지)**.
- 체크리스트 7항 전 목업 통과 기록(간단한 표로 가이드 v2에 부록).

### Phase 3 — 고아 22종 정리·재배치

- `ROLLOUT_PLAN_v1` §4(목업 없는 22뷰)와 매칭해 재배치 vs `_archive` 이관을 목업별로 결정.
- 재배치 확정분만 v2 마이그레이션 적용(죽일 자산에 공수 쓰지 않음).
- registry(`index.ts`) 최종 정리 — 등록 목록 = 실제 사용 목록.

### Phase 4 (옵션) — 회귀 방지 자동화

- Playwright로 /demo 하네스 스크린샷(3폭×3로케일, reduced-motion 고정) diff — 토큰·모션 변경 시 시각 회귀를 CI에서 잡음.
- `lint:tokens`에 mockup 규칙 추가(§2-A 가드레일)로 재발 방지.

---

## 4. 리스크와 선결 사항

| 리스크 | 대응 |
|---|---|
| emerald/violet 제거로 솔루션 페이지의 "01 감지→02 분석→03 실행" 단계 구분력 약화 | 색 대신 단계 숫자 + `saai \| care/insight/agent` 워드마크 + 활성 탭의 blue 강조로 재설계(1c에서 프로토타입 후 확인). 필요시 SAAI 데이터 hue(cyan/purple)를 "단계 칩" 한정으로 쓰는 절충안을 B안으로 보류. |
| scale() 방식에서 아주 좁은 컨테이너(<280px)의 가독성 | `minScale` + 하네스에서 하한 검증. 폰 목업의 모바일 노출은 대부분 콘텐츠 폭 320px+라 실질 위험 낮음. |
| 다크 목업의 SAAI 파생 규칙이 자의적일 수 있음 | "다크 모드는 아직 없다"(SAAI DS §Colors)를 존중 — 파생 규칙을 mockup-tokens에 주석으로 명문화하고, 추후 SAAI DS에 다크가 생기면 교체. |
| `useCountUp` 고정 호출 리팩터의 파급 | Phase 0-3에서 단독 커밋으로 분리, 기존 시각 결과와 diff 확인 후 진행. |
| 카카오톡/LINE 등 외부 브랜드 재현 색 | 의도적 예외 유지(파일 단위 명시) — v1 결정 계승. |
| 빌드 시점 박제된 시간/날짜 | `mockup-time.ts` 상대 규칙로 통일(Phase 2). |

## 5. 이 계획이 v1 문서들과 갖는 관계

- `MOCKUP_ELEVATION_ROLLOUT_PLAN_v1` — "어디에 무엇을 놓는가"는 계속 그 문서가 답. 본 계획의 Phase 1 배치 순서는 그 문서의 Tier 개념을 계승하되 "노출 빈도" 기준으로 재정렬.
- `MOCKUP_SYSTEM_GUIDE` v1 — 콘텐츠 오버라이드 규약(§2)·훅 제약 경고는 유효. Phase 0-6에서 v2로 개정하며 본 계획의 4개 계약(§2)을 편입.
- `DESIGN.md` — 사이트 토큰의 SSOT 지위 불변. 목업 내부 예외 조항(§0-D1)만 추가.
