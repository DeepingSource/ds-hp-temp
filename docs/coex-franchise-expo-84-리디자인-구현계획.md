# COEX 프랜차이즈 창업박람회 이벤트 페이지 — 전용 랜딩형 리디자인 구현 계획

문서 버전: v1 · 작성일 2026-07-16
대상 페이지: `https://ds-hp-temp.vercel.app/ko/events/coex-franchise-expo-84`
기준 소스: `첨부 브로슈어(SAAI 3단 리플렛 0716)` + 리포 `DS_NEW_HP`

> ⚠️ **이 문서는 계획서입니다. 아직 어떤 코드도 변경하지 않았습니다.**
> 구현 시 신규 파일 추가가 대부분이고, 기존 파일은 **단 1개(`eventRoutes.tsx`)에 1개 분기만** 추가합니다.

---

## 1. 목표와 범위

**목표** — 현재 텍스트 위주의 범용 article 템플릿을, 첨부 브로슈어의 시각적 스토리텔링을 그대로 옮긴 **전용 랜딩형 이벤트 페이지**로 재구성한다.

**확정된 범위 (사용자 결정 사항)**

| 항목 | 결정 |
|---|---|
| 발전 수준 | 전용 랜딩형 리디자인 (신규 섹션 컴포넌트 구성) |
| 비주얼 소스 | 브로슈어 비주얼 재현 (추출 이미지 사용, 전 자산 사용 가능 확인됨) |
| 언어 | 한국어(ko)만 먼저. en/jp는 후속 |
| 코드 변경 | 이번 단계는 계획만. 구현 시에도 기존 파일 편집 최소화 |

---

## 2. 현재 상태 분석

**렌더링 경로**
```
src/app/ko/events/[slug]/page.tsx
  → eventRoutes.tsx : EventDetailPage('ko', params)
      → getEventForRoute(slug,'ko')  // Velite에서 생성된 Event 객체
      → <EventDetailView event={} locale="ko" />   // 모든 이벤트 공유 범용 템플릿
```

**`EventDetailView.tsx`** = 다크 히어로(제목/날짜/장소) + `prose-docs` 안에 `<MDXRemote source={event.body}>` + CTA 버튼 + 목록 링크. 즉 **본문은 마크다운 프로즈**로만 렌더된다.

**콘텐츠 소스** = `content/events/coex-franchise-expo-84.mdx`. 프론트매터(제목·부제·장소·날짜·CTA)와 마크다운 본문(제품 3줄 불릿, 프로그램 목록). 브로슈어의 목업·카드·before/after 등 시각 요소는 전혀 반영돼 있지 않다.

**문제 요약** — 브로슈어는 3분할 제품 스토리(질문형 헤드라인 + 디바이스 목업 + 기능 카드 + before/after)인데, 웹 페이지는 이를 밋밋한 텍스트 3줄로 축약해 정보 밀도·설득력·브랜드 완성도가 모두 떨어진다.

---

## 3. 아키텍처 결정 — slug 분기 방식

범용 `EventDetailView`를 직접 고치면 **다른 모든 이벤트에 영향**을 준다. 따라서 이 이벤트에만 전용 레이아웃을 태우는 **slug 분기** 방식을 쓴다.

**분기 위치**: `src/components/events/eventRoutes.tsx`의 `EventDetailPage()` — 기존 코드 유지 + 아래 한 블록만 추가.

```tsx
// eventRoutes.tsx (구현 시 추가할 유일한 "기존 파일 편집")
import { logicalEventSlug } from '@/data/events/types';
import ExpoLanding from './coex-franchise-expo/ExpoLanding';

export async function EventDetailPage(locale: Locale, params: Params) {
  const { slug } = await params;
  const event = getEventForRoute(slug, locale);
  if (!event) notFound();

  // 전용 랜딩 분기 (ko만; 다른 로케일은 기존 템플릿 유지)
  if (locale === 'ko' && logicalEventSlug(slug) === 'coex-franchise-expo-84') {
    return <ExpoLanding event={event} locale={locale} />;
  }
  return <EventDetailView event={event} locale={locale} />;
}
```

**이 방식의 장점**
- 기존 파일 편집이 **eventRoutes.tsx 1곳, 4~5줄**로 한정 → 브랜치/충돌 위험 최소화.
- `EventDetailView`·`EventsIndexView`·MDX 파이프라인은 **무변경** → 다른 이벤트 회귀 없음.
- 메타데이터(`eventDetailMetadata`)는 그대로 재사용 → SEO/OG 그대로 동작.

**Event 객체는 그대로 활용** — `ExpoLanding`은 `event.title / subtitle / startDate / endDate / venue / ctaLabel / ctaHref`를 props로 받아 히어로·CTA에 그대로 쓴다. 즉 날짜·부스·예약링크의 **단일 소스는 여전히 MDX 프론트매터**다.

**MDX 본문(`event.body`) 처리** — 랜딩은 MDX 본문을 렌더하지 않는다. 두 가지 선택:
- (권장) `coex-franchise-expo-84.mdx` **프론트매터는 유지**, 본문은 짧은 SEO 요약 1~2문단만 남긴다(랜딩에서는 미사용, 검색/미리보기 폴백용).
- 또는 본문 전체 유지(무시됨). 유지해도 무해하나 이중관리가 되므로 축약 권장.

---

## 4. 신규 파일 구조

```
src/components/events/coex-franchise-expo/
├── ExpoLanding.tsx        # 오케스트레이터: 섹션 조립 + event props 매핑
├── data.ts                # 카피/기능카드/스텝 등 콘텐츠 상수 (KR 텍스트 단일 소스)
└── sections/
    ├── ExpoHero.tsx       # 섹션 1 — 히어로
    ├── ProductStory.tsx   # 섹션 2·3·4 공용 (props로 좌우 배치·목업·카드 주입)
    ├── DetectionGrid.tsx  # 섹션 3 전용 — 2×2 감지 그리드
    ├── PopBeforeAfter.tsx # 섹션 4 전용 — before/after + 3스텝
    ├── OnsiteProgram.tsx  # 섹션 5 — 현장 프로그램 카드 3
    └── BoothCta.tsx       # 섹션 6 — 최종 예약 CTA

public/images/events/coex-franchise-expo-84/
├── hero-isometric.webp
├── count-dashboard.webp
├── care-detect-equipment.webp
├── care-detect-safety.webp
├── care-detect-display.webp
├── care-detect-contamination.webp
├── care-app-status.webp
├── pop-before.webp
└── pop-after.webp
```

**기존 파일 변경 목록 (전체)**
1. `src/components/events/eventRoutes.tsx` — 분기 1블록 추가 (위 3장).
2. `content/events/coex-franchise-expo-84.mdx` — (선택) 본문 축약. 프론트매터 무변경.

그 외는 전부 신규 추가 → git diff가 깔끔하고 롤백이 쉽다.

---

## 5. 자산 준비

브로슈어 PDF에서 추출한 이미지(현재 `outputs/brochure-extract/`에 임시 저장)를 webp로 최적화해 위 public 경로에 배치한다.

| 최종 파일명 | 추출 원본 | 원본 크기 | 브로슈어 용도 |
|---|---|---|---|
| `hero-isometric.webp` | p0_img0 | 840×757 | 히어로 아이소메트릭 무인매장 일러스트 |
| `count-dashboard.webp` | p1_img0 | 460×224 | saai count 폰 대시보드 화면 |
| `care-detect-equipment.webp` | p1_img1 | 225×141 | 설비 상태(냉장 온도) |
| `care-detect-safety.webp` | p1_img2 | 225×141 | 안전 상태(이상 행동) |
| `care-detect-display.webp` | p1_img3 | 225×141 | 진열 상태(빈 매대) |
| `care-detect-contamination.webp` | p1_img4 | 225×141 | 오염 상태 |
| `care-app-status.webp` | p1_img5 | 260×372 | 실시간 매장 상태 앱 화면 |
| `pop-before.webp` | p1_img6 | 429×153 | POP 이전(손글씨 할인특가) |
| `pop-after.webp` | p1_img7 | 429×153 | POP 이후(컬러 할인특가) |

**주의**
- 9번째 이미지(p1_img8, CMYK)는 추출이 실패했다. 구현 시 **PDF에서 재추출**(CMYK→RGB 변환) 필요. 확인 결과 나머지 8장으로 전 섹션 커버 가능하므로 필수는 아니다.
- 감지·POP 원본이 저해상도(225px, 429px)라 큰 영역에 쓰면 흐릿할 수 있다 → **표시 크기를 원본에 맞게 절제**하거나, 필요 시 리포 내 고해상 대체 자산 사용:
  - 대체 후보(이미 리포에 존재): `storecare-equipment-detection.webp`, `storecare-front-facing-display.webp`, `storecare-contamination-detection.webp`, `storecare-fridge-door-open.webp`, `storeagent-ai-pop-mockup.webp`, `storecare-dirty-table-2.webp`.
- 변환 명령 예: `cwebp -q 82 input.png -o output.webp` (또는 sharp). 최적화 후 각 파일 목표 100KB 이하.

**로고/심볼** — 히어로·섹션 헤더의 saai 심볼은 리포 기존 `public/images/saai-symbol.svg` 재사용.

---

## 6. 섹션별 상세 스펙

디자인 토큰은 전부 사이트 표준을 따른다: 브랜드 블루 `--primary #376AE2`(`text-primary`, `bg-primary`), 다크 배경 `bg-surface-dark`(+`.section-dark`), 카드 그림자 `shadow-card`, 한글 줄바꿈 `break-keep`, 섹션 여백 `.section`, 버튼 `btn-primary btn-lg`, 대체 섹션 배경 `--layer-section-alt #F7F9FC`.

### 섹션 1 — ExpoHero
**목적**: 브로슈어 표지 재현. 아이소메트릭 일러스트 + 핵심 태그라인 + 일정/부스 + 예약 CTA.

- **레이아웃**: 2열(데스크톱). 좌측 텍스트, 우측 `hero-isometric.webp`. 모바일은 텍스트 위·이미지 아래 1열.
- **배경**: `bg-surface-dark` + 기존 히어로처럼 `bg-primary/10 blur` 글로우 오브 1개.
- **콘텐츠(카피, 브로슈어 그대로)**
  - Eyebrow: `무인매장 창업부터 운영까지`
  - H1: `AI로 더 간편하게` (‘AI’만 `text-primary` 강조)
  - Sub: `상권 분석 · 매장 관리 · POP 제작을 하나의 흐름으로`
  - 메타 배지 2개: 📅 `formatEventDateRange(startDate,endDate,'ko')` → “2026년 8월 25일 – 2026년 8월 27일”, 📍 `event.venue` → “COEX D홀 · 부스 M101” (아이콘 `Calendar`,`MapPin` lucide, 기존 EventDetailView와 동일)
  - Primary CTA: `event.ctaLabel`(“부스 방문 예약”) → `event.ctaHref`
  - (선택) Secondary 앵커: “부스에서 보실 것 ↓” → 섹션 2 스크롤
- **접근성**: 일러스트 `alt="무인매장 아이소메트릭 일러스트"`, H1 단일.
- **기존 자산 재사용**: Breadcrumb(`@/components/ui/Breadcrumb`, `tone="dark"`)을 히어로 상단에 유지 → 기존 페이지와 내비 일관성.

### 섹션 2 — ProductStory: saai count (상권분석)
**공용 컴포넌트 `ProductStory`의 첫 인스턴스.** props로 방향/목업/카드 주입.

- **레이아웃**: 2열, 이미지 우측. 배경 흰색.
- **헤더**
  - 라벨 pill: `saai count` + 부제 `상권분석` (심볼 아이콘 동반)
  - 질문형 H2: `매장을 열고 싶은데, 이 자리가 괜찮은 곳일까?`
  - 리드문: `매장을 열고 싶은 자리의 유동인구와 주요 고객층을 확인해, 매장 입지를 선정하는 데 활용할 수 있습니다.`
- **비주얼**: `count-dashboard.webp`를 **`PhoneFrame`(`@/components/mockups`)로 감싸** 디바이스 목업화. (원본이 화면 캡처이므로 프레임을 씌우면 저해상도 티가 덜 나고 브랜드 완성도↑)
  - 대안: 리포의 인터랙티브 `StoreInsightMockup` 사용 가능하나, “브로슈어 재현” 결정에 따라 **캡처+PhoneFrame** 우선.
- **기능 카드 4개** (2×2 그리드, 각 카드: lucide 아이콘 + 굵은 제목 + 1줄 설명)
  1. `유입 퍼널 분석` — 유동 → 입장 → 유입률 (아이콘 `Filter`)
  2. `성별·연령대 분석` — 통행 vs 입장 비교 (아이콘 `Users`)
  3. `상권 변화 확인` — 시간대별 통행량 & 성연령 추이 (아이콘 `TrendingUp`)
  4. `간편한 설치` — AI 박스 & 모바일 설정 단 5분 (아이콘 `Wrench`)
- **추가 요소**
  - `데이터 다운로드` 강조 라인 — 분석 결과를 엑셀로 (아이콘 `Download`)
  - **개인정보 안심** — 기존 MDX 컴포넌트 `PrivacyNote`(mdx-components) 재사용 또는 동형 카드: “영상은 익명화 상태에서 분석·삭제, 통계정보만 저장”.

### 섹션 3 — ProductStory: saai care (이상 상황 알림)
- **레이아웃**: 2열, 이미지 **좌측**(섹션 2와 좌우 반전해 리듬 형성). 배경 `--layer-section-alt`(옅은 회청).
- **헤더**
  - pill: `saai care` + `이상 상황 알림`
  - H2: `계속 지켜볼 수 없는데, 매장 상태는 괜찮을까?`
  - 리드문: `매대가 비거나 바닥이 오염되고, 냉장고 온도가 오르는 등 확인이 필요한 상황을 AI가 빠르게 감지해 알려드립니다.`
- **전용 컴포넌트 `DetectionGrid`** — 2×2, 각 셀: 사진 + 라벨(굵게) + 설명
  1. `care-detect-equipment.webp` — **설비 상태** · 온도 오르면 알려요
  2. `care-detect-safety.webp` — **안전 상태** · 이상 행동 감지해요
  3. `care-detect-display.webp` — **진열 상태** · 빈 매대 바로 알려요
  4. `care-detect-contamination.webp` — **오염 상태** · 치울 곳만 콕 짚어요
- **보조 비주얼**: `care-app-status.webp`(실시간 매장 상태 앱)를 `PhoneFrame`으로 감싸 우측/하단 배치.
  - 대안: 리포 `KakaoAlertMockup`/`StoreCareMockup`로 “실시간 알림” 인터랙션 강조 가능(후속 개선안).

### 섹션 4 — PopBeforeAfter: saai store (POP메이커)
- **레이아웃**: 배경 흰색. 상단 헤더 중앙정렬, 그 아래 before/after, 그 아래 3스텝.
- **헤더**
  - pill: `saai store` + `POP메이커`
  - H2: `할인특가 행사 중인데, 어떻게 눈에 띄게 알리지?`
  - 리드문: `상품과 문구만 입력하면 포스터부터 진열대 안내물까지, 매장에 필요한 홍보물을 빠르게 만들 수 있습니다.`
- **Before/After** — `pop-before.webp` → (다운 화살표/`ArrowDown` 아이콘) → `pop-after.webp`. 세로 스택(모바일) / 가로 병치(데스크톱). 각 이미지 위 배지: “Before”, “After”.
  - 카피: `POP 하나로 달라집니다` / `그냥 지나치기 쉬운 할인 표시도 매장 인상을 만듭니다. 시선을 잡는 POP로 지나가는 고객까지 멈추게 해보세요`
- **3스텝 플로우** (번호 배지 + 아이콘 + 라벨)
  1. `상품 이미지 올리고` (아이콘 `ImageUp`)
  2. `문구 입력 & 분위기 설정` (아이콘 `Sparkles`/`Wand2`)
  3. `1분 만에 POP 완성!` (아이콘 `Rocket`)

### 섹션 5 — OnsiteProgram (현장 프로그램)
- **레이아웃**: 카드 3개 그리드. 배경 `--layer-section-alt` 또는 다크.
- **콘텐츠**(기존 MDX “현장 프로그램” 재사용)
  1. **5분 설치 체험** — AI 박스와 모바일 설정만으로 시작하는 과정 직접 체험
  2. **POP 1분 제작** — 상품 올리고 문구·분위기 고르면 즉석 완성
  3. **1:1 창업 상담** — 자리·업종에 맞는 구성 상담
- 각 카드 상단 번호/아이콘 + 제목 + 설명.

### 섹션 6 — BoothCta (방문 예약)
- **레이아웃**: 풀폭 배너, `bg-surface-dark` + primary 글로우. 중앙정렬.
- **콘텐츠**
  - H2: `부스 방문을 미리 예약하시면 대기 없이 상담해 드립니다`
  - 메타 재노출: 날짜 · `COEX D홀 · 부스 M101`
  - CTA: `event.ctaLabel` → `event.ctaHref` (`btn-primary btn-lg`, `ArrowRight` 아이콘)
- **과거 이벤트 처리**: `isPastEvent(event)`가 true면 CTA 숨기고 기존 아카이브 배너(EventDetailView의 amber 배너 카피) 노출. 로직 재사용.

---

## 7. `ProductStory` 컴포넌트 설계 (재사용 핵심)

섹션 2·3·4의 공통 뼈대. props 예시:

```ts
interface ProductStoryProps {
  eyebrow: string;          // "saai count"
  eyebrowSub: string;       // "상권분석"
  question: string;         // H2 질문형
  lead: string;             // 리드 문단
  media: React.ReactNode;   // <PhoneFrame>…</PhoneFrame> 또는 그리드
  mediaSide?: 'left' | 'right';   // 좌우 반전 리듬
  features?: { icon: LucideIcon; title: string; desc: string }[];
  footnote?: React.ReactNode;     // PrivacyNote 등
  background?: 'white' | 'alt' | 'dark';
}
```

- 섹션 3의 2×2 감지 그리드, 섹션 4의 before/after는 `media`/전용 하위 컴포넌트로 주입 → `ProductStory`는 헤더·2열 레이아웃·feature 그리드만 담당.
- 카피/아이콘/이미지 매핑은 전부 `data.ts` 상수로 분리 → 추후 en/jp 확장 시 로케일별 상수만 추가.

---

## 8. 재사용 자산·토큰 매핑표

| 필요 요소 | 재사용 대상(리포 내 기존) |
|---|---|
| 디바이스 프레임 | `PhoneFrame`, `TabletFrame` (`@/components/mockups`) |
| 대체 인터랙티브 목업 | `StoreInsightMockup`, `StoreCareMockup`, `KakaoAlertMockup`, `FunnelDiagram` |
| 개인정보 안내 | `PrivacyNote` (`mdx-components.tsx`) |
| 정보/성공 콜아웃 | `Callout` variant `info`/`success` |
| 브레드크럼 | `@/components/ui/Breadcrumb` (`tone="dark"`) |
| 날짜 포맷 | `formatEventDateRange` (`data/events/types.ts`) |
| 과거 이벤트 판정 | `isPastEvent` (`lib/events.ts`) |
| 로케일 링크 | `localeHref` (`lib/i18n`) |
| 버튼 | `.btn-primary .btn-lg` (globals.css) |
| 아이콘 | `lucide-react` (Filter, Users, TrendingUp, Wrench, Download, ImageUp, Sparkles, Rocket, ArrowDown, ArrowRight, Calendar, MapPin, ShieldCheck) |

---

## 9. 반응형 & 접근성 체크리스트

- 모든 2열 섹션은 모바일에서 1열 스택(텍스트 우선, 이미지 후행). `md:` 브레이크포인트 기준.
- 한글 제목·본문 전부 `break-keep` 적용(어절 단위 줄바꿈).
- 이미지 전부 의미 있는 `alt`; 순수 장식(글로우 오브 등)은 `aria-hidden`.
- 히어로 `<h1>` 1개, 각 제품 섹션 `<h2>`, 카드 제목 `<h3>` — 계층 준수.
- 색 대비: 다크 섹션 텍스트 흰색, primary 위 텍스트 대비 AA 확인.
- 인터랙티브 목업을 쓸 경우 `dynamic(..., { ssr:false })` (기존 컨벤션, index.ts 주석 참조).
- 저해상 이미지 확대 방지 — `max-w` 제한, `PhoneFrame`로 물리적 크기 억제.

---

## 10. 검증 절차 (QA)

1. **로컬 빌드**: `npm run build` (`output: export` 정적 빌드) — 타입/린트/정적 파라미터 통과 확인. (`eventStaticParams`가 이 slug 포함하는지 확인.)
2. **로컬 dev 프리뷰**: `/ko/events/coex-franchise-expo-84` 렌더 확인.
3. **회귀 확인**: 다른 이벤트(`sample-event`)와 en/jp 로케일이 **기존 템플릿 그대로** 나오는지 확인(분기 조건 정확성).
4. **반응형 스냅샷**: 360 / 768 / 1280 폭 스크린샷 3종 캡처·검수.
5. **접근성 스캔**: 헤딩 순서·alt·대비 점검(디자인 플러그인 `accessibility-review` 활용 가능).
6. **CTA 링크**: `ctaHref`의 utm 파라미터 유지 확인.

---

## 11. 작업 순서 (구현 착수 시 체크리스트)

1. `git checkout -b feat/coex-expo-landing` (독립 브랜치).
2. 자산 최적화: 8장 webp 변환 → `public/images/events/coex-franchise-expo-84/`. (필요 시 9번째 재추출)
3. `data.ts` 작성 — 전 카피/기능/스텝 상수화.
4. 하위 섹션 컴포넌트 6종 신규 작성.
5. `ExpoLanding.tsx` 오케스트레이터 — event props 매핑 + 섹션 조립.
6. `eventRoutes.tsx`에 slug 분기 1블록 추가 (유일한 공유파일 편집).
7. (선택) `coex-franchise-expo-84.mdx` 본문 축약 — 프론트매터 무변경.
8. 빌드·프리뷰·회귀·반응형·접근성 검증(§10).
9. 스크린샷 첨부해 리뷰 요청 → 머지.

---

## 12. 리스크 & 오픈 이슈

| 항목 | 내용 | 대응 |
|---|---|---|
| 저해상 추출 이미지 | 감지/POP 원본이 225~460px | 표시 크기 억제 or 리포 고해상 대체 자산(§5) |
| CMYK 9번째 이미지 | png 변환 실패 | 필요 시 RGB 재변환. 미사용 가능 |
| MDX 본문 이중관리 | 본문이 랜딩에 미반영 | 본문 축약(SEO 요약만 유지) 권장 |
| 정적 export 제약 | 인터랙티브 목업은 클라이언트 전용 | `dynamic ssr:false` 준수 |
| en/jp 확장 | 이번엔 ko만 | `data.ts` 로케일 분기로 후속 대응 설계 반영 |

---

### 부록 A. 브로슈어 ↔ 페이지 섹션 매핑 요약

| 브로슈어 패널 | 페이지 섹션 | 컴포넌트 |
|---|---|---|
| 표지(아이소메트릭+태그라인) | 1. 히어로 | `ExpoHero` |
| saai count / 상권분석 | 2. 제품 스토리 | `ProductStory` |
| saai care / 이상 상황 알림 | 3. 제품 스토리 | `ProductStory` + `DetectionGrid` |
| saai store / POP메이커 | 4. 제품 스토리 | `PopBeforeAfter` |
| (현장 프로그램·예약: 웹 신설) | 5·6 | `OnsiteProgram`, `BoothCta` |
