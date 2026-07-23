# HERO_SPACES_PLAN_v1 — Hero 텍스트↔이미지 동기 회전

> 목표: 랜딩 Hero의 `RotatingNoun`(매장을→현장을→전시장을→물류센터를→카페를→무인매장을, 2.2s)과
> 우측 evidence 이미지가 같은 박자로 전환되어 "세상 모든 공간을 SAAI가 reinvent / 완벽하게 만든다"는
> 인상을 준다. 6장 모두 새로 생성, 트래킹 오버레이는 이미지에 베이크, '현장'은 산업·작업 현장으로 해석.

## 0. 결정 사항 (2026-07-23)

| 항목 | 결정 |
|---|---|
| 오버레이(브래킷·ID·동선) | gpt-image-1이 이미지에 직접 베이크 (현 tech-mtmc-wide와 동일 문법) |
| 매장 프레임 | 유지하지 않고 6장 모두 신규 생성 (기존 이미지는 기술 페이지에서 계속 사용) |
| 현장(floor) 해석 | 산업·작업 현장 (안전 모니터링 — "모든 공간" 확장성 강조) |
| 생성 방식 | `openai.images.edit` + 기존 `tech-mtmc-wide.webp`를 스타일 참조로 전달 (프로필 파이프라인 `generate-gpt-avatars.mjs` 패턴) |

## 1. 이미지 세트 — 단어 순서와 1:1 (순서 불변 계약)

`heroQuestion.words` 순서 = 이미지 배열 순서. 모든 장면은 같은 순간을 보는 하나의 시스템처럼
**타임스탬프는 6장 동일**, CAM 번호만 01~06으로 다르게 한다.

| # | 단어(ko/en/jp) | 공간 | 장면 서사 (솔루션 카드 근거) | 파일 |
|---|---|---|---|---|
| 1 | 매장을 / store / 店舗 | 편의점·리테일 | 진열대 통로 + 냉장고 벽 + POS. 5명 중 1명 결제 중 — "진열·동선·결제까지" | `hero-store.webp` |
| 2 | 현장을 / floor / 現場 | 산업·작업 현장 | 공장/작업장 플로어, 안전모 실루엣, 지게차·안전 구역 라인. 동선이 위험 구역을 우회 — 안전 모니터링 | `hero-site.webp` |
| 3 | 전시장을 / showroom / 展示場 | 전시·박물관 | 전시홀, 인기 전시물 앞 체류(동선 밀집) — "관람 동선과 인기 구역, 식별 없이" | `hero-exhibition.webp` |
| 4 | 물류센터를 / warehouse / 物流センター | 물류센터 | 하이랙 통로 + 지게차 + 팔레트 레인, 긴 직선 동선과 교차점 — "넓은 공간의 동선·혼잡·안전" | `hero-logistics.webp` |
| 5 | 카페를 / café / カフェ | 카페 | 카운터 대기열 + 좌석. 줄 서는 동선 + 좌석 체류 — "대기와 좌석 회전" | `hero-cafe.webp` |
| 6 | 무인매장을 / unmanned store / 無人店舗 | 무인매장 | 야간 무인 매장, 셀프 키오스크, 직원 없음, 2~3명만 — "직원 없이도 이상 상황 감지" | `hero-unmanned.webp` |

인원수는 공간 성격에 맞게 변주: 매장 5 · 현장 4 · 전시장 5 · 물류 4 · 카페 5 · 무인 3.
ID 라벨은 항상 1부터 인원수까지.

## 2. 스타일 앵커 (공통 프롬프트 골격)

참조 이미지(`public/images/technology/tech-mtmc-wide.webp`)에서 가져올 요소:
천장 CCTV 광각 부감, 어두운 실사 톤, 회색 익명 실루엣(얼굴·신원 없음), 브랜드 블루 브래킷/ID 라벨/곡선 동선,
좌상단 `CAM 0#`, 우상단 타임스탬프, 로고·워터마크 없음.

공통 템플릿 (영문, `images.edit` 프롬프트):

```
Use the reference image ONLY as a strict style guide — same CCTV surveillance aesthetic,
same elevated wide-angle ceiling-camera perspective, same dark muted color grading, and the
same blue anonymized-tracking overlay language (thin blue corner brackets around each person,
small solid-blue "ID n" labels, smooth glowing blue curved trajectory lines on the floor).
Create a completely NEW scene: {SCENE}.
All {N} people are flat matte gray anonymized silhouettes — no faces, no skin, no identity.
Each silhouette has a blue tracking bracket and a label ID 1 … ID {N}; each has one continuous
trajectory line tracing its path. Top-left white monospace text "CAM 0{K}". Top-right white
monospace timestamp "2026-07-23 15:33:48". Photorealistic Korean interior, realistic clutter,
no readable brand logos, no watermarks, no text other than the overlay UI.
```

### 장면별 {SCENE} 초안

1. **store** — `a modern Korean convenience store interior: aisles of snack shelves, a glass-door freezer wall along one side, a POS checkout counter in front; one silhouette paying at the counter, others browsing aisles`
2. **site** — `an industrial work floor / light manufacturing site: concrete floor with yellow safety-zone floor markings, equipment racks, a parked forklift; silhouettes wear hard-hat outlines; one trajectory visibly curves around a marked hazard zone`
3. **exhibition** — `a bright museum exhibition hall: framed artworks and a central sculpture pedestal; two silhouettes dwelling in front of the most popular exhibit where their trajectory lines cluster and loop`
4. **logistics** — `a large logistics warehouse: tall pallet racking aisles, stacked boxes, a forklift; long straight trajectory lines running down aisles and crossing at an intersection`
5. **cafe** — `a cozy Korean café: espresso bar counter with a short queue of silhouettes, wooden tables and seated silhouettes; the queue trajectory bends from door to counter, seated ones show small dwell loops`
6. **unmanned** — `a small unmanned 24h store at night: self-checkout kiosks glowing, bright interior against dark windows, no staff; only three silhouettes, one near the kiosk`

품질 변수: 장당 후보 2장 생성 → 육안 선별. 실패 축(실루엣이 실사 인물로 나옴 / ID 개수 오류 /
오버레이 색 틀어짐)이 보이면 해당 축만 프롬프트에 부정문 보강 후 재생성.

## 3. 생성 파이프라인 — `scripts/generate-hero-spaces.mjs`

`generate-gpt-avatars.mjs` 구조 복제:

- `openai.images.edit({ model: 'gpt-image-1', image: <tech-mtmc-wide를 png로>, prompt, size: '1536x1024' })`
- 순차 실행 + 500ms 딜레이, 실패 시 로그 후 계속
- 출력: `hero-src/{space}-{cand}.png` (후보 보관) → 선별본을 `sharp`로 16:10 센터 크롭(1536×960) + webp(q80) 변환 → `public/images/hero/hero-{space}.webp`
- CLI 인자: `--only=cafe,site` (부분 재생성), `--candidates=2`
- `OPENAI_API_KEY` 필요 (아바타 스크립트와 동일 환경)

`src/data/siteImages.ts`에 레지스트리 추가:

```ts
export const heroSpaceImages = [
  { key: 'store',      src: '/images/hero/hero-store.webp' },
  { key: 'site',       src: '/images/hero/hero-site.webp' },
  { key: 'exhibition', src: '/images/hero/hero-exhibition.webp' },
  { key: 'logistics',  src: '/images/hero/hero-logistics.webp' },
  { key: 'cafe',       src: '/images/hero/hero-cafe.webp' },
  { key: 'unmanned',   src: '/images/hero/hero-unmanned.webp' },
] as const; // 순서 = heroQuestion.words 순서 (계약)
```

## 4. 프론트 연동 — 회전 상태 끌어올리기

현재 인덱스가 `RotatingNoun` 내부 state라 이미지가 알 수 없다. 다음과 같이 재배선:

1. **`HeroRotationProvider`** (신규, client): `{ index, paused, setPaused }` 컨텍스트.
   interval 2200ms, `usePrefersReducedMotion`이면 회전 정지(index 0 고정). words.length는 prop.
2. **`RotatingNoun`** — 내부 interval 제거, 컨텍스트의 index 소비. sizer/sr-only(fixed)/aria-hidden
   계약과 hover-pause(WCAG 2.2.2)는 그대로 유지 — hover 시 `setPaused(true)`가 단어·이미지를 함께 멈춤.
3. **`CorporateHeroFigure`** — `images: {key, src}[]` prop을 받아 6장을 절대배치로 스택,
   활성 인덱스만 opacity 1 (crossfade ~600ms ease + scale 1.02→1.00 미세 줌). 기존 틸트 패럴랙스·
   트래킹 칩은 유지. 이미지 호버 시에도 `setPaused(true)` (관찰 의도 존중).
4. **LCP 보존** — index 0 이미지만 `priority`, 나머지는 `loading="lazy"` + 마운트 후
   idle 프리로드(첫 전환 전에 로드 완료). 전환은 다음 이미지 로드 완료 시에만 크로스페이드
   (미로드면 현재 프레임 유지 — 깜빡임 방지).
5. **reduced-motion** — 단어가 fixed(공간을)로 멈추는 기존 동작에 맞춰 이미지도 1번(store) 고정.
6. **서버/클라 경계** — `CorporateHero`는 서버 컴포넌트 유지. Provider는 h1+figure를 감싸는
   최소 client 래퍼로만 삽입(LCP 마크업 경로 불변).
7. **a11y/SEO** — figure의 alt·캡션은 회전 문구가 아닌 고정 문구로 교체:
   ko `"여섯 공간 — 같은 CCTV, 같은 익명 추적. 얼굴 없이 흐름만."` (en/jp 대응 번역).
   회전 이미지 스택은 활성 프레임 외 `aria-hidden`.

## 5. 검증 체크리스트

- [ ] 단어↔이미지 인덱스 동기 (ko/en/jp 3로케일, words 순서 동일 확인)
- [ ] hover pause 시 단어·이미지 동시 정지 / reduced-motion 시 완전 정적
- [ ] LCP: 첫 페인트가 기존과 동일 경로(priority 1장), Lighthouse 비교
- [ ] CLS 0 (스택 절대배치, aspect-[16/10] 컨테이너 불변)
- [ ] 6장 스타일 통일 육안 검수 (실루엣 익명성 · 블루 톤 · CAM/타임스탬프 표기)
- [ ] 번들: framer-motion 기존 사용 범위 내, 신규 의존성 없음 (sharp는 devDependency/스크립트 전용)

## 6. 작업 순서

1. `generate-hero-spaces.mjs` 작성 → store 1종 파일럿 생성 → 스타일 판정 (프롬프트 튜닝 루프)
2. 통과 시 6종 × 2후보 전량 생성 → 선별 → webp 산출
3. `siteImages.ts` 레지스트리 + `HeroRotationProvider` + `RotatingNoun`/`CorporateHeroFigure` 개조
4. 3로케일 로컬 확인 → Lighthouse → 커밋/배포
