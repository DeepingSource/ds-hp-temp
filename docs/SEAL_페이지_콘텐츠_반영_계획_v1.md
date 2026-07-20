# SEAL 페이지 콘텐츠 반영 계획 v1

> **목적** — 라이브 페이지 `https://www.deepingsource.io/ko/seal` 의 콘텐츠·자산을
> 새 홈페이지 `https://ds-hp-temp.vercel.app/ko/technology/seal`
> (코드: `src/components/corporate/views/SealView.tsx`) 에 반영하기 위한 **작업 계획**.
>
> **이 문서는 계획서입니다. 코드는 수정하지 않았습니다.** 라이브 자산은 `docs/SEAL_LEGACY_ASSETS/`, 신규 자산은 `asset-hp-260720/` 에 수집 완료.
>
> 작성일: 2026-07-20 · 대상 로케일: **ko / en / jp 전부** · 통합 방향: **제품 서사 복원(하이브리드)**
>
> **v1.1 (2026-07-20 추가)** — `asset-hp-260720/` 신규 자산 통합. 이 자산 세트는 SEAL 외에 **Spatial AI**·**Anonymizer** 페이지에도 걸침. 상세는 §3-A.

---

## 0. 한 페이지 요약

라이브 SEAL 페이지는 SEAL을 **영상 비식별화 "제품"** 으로 소개한다 (인트로 영상 → 문제제기 → 얼굴·번호판 before/after → 데이터 유용성 보존 → Vision Tasks 그리드 → 3-step 작동 원리 → 경쟁 비교표 → 활용 사례 → FAQ → 문의). 반면 현재 새 코드(`SealView.tsx`)는 SEAL을 **"SDK"(Secure·Embeddable·Adaptable·Lightweight)** 로 재프레이밍했다.

승인된 방향은 **하이브리드**: 라이브의 제품 서사(비식별화 결과물·Vision Tasks·작동 원리·비교·활용사례·FAQ)를 **주(主)** 로 복원하고, 새 페이지가 이미 갖춘 SDK/통합/법적 근거 자산을 **보조(補)** 로 유지한다. 결과적으로 SEAL을 "제품으로서의 가치(무엇을 지키고 무엇을 남기나)"로 먼저 설득하고, 하단에서 "어떻게 시스템에 넣나(SDK·통합)"로 연결하는 단일 서사를 만든다.

작업은 크게 3덩어리: **(A) 자산 처리** (수집 완료 → 리네이밍·webp 변환·`public/` 배치), **(B) `SealView.tsx` 섹션 재구성** (기존 컴포넌트 재사용), **(C) 3개 로케일 카피 작성** (`ko`/`en`/`jp` Copy 객체 확장).

**추가 (v1.1)** — `asset-hp-260720/` 는 세 페이지에 걸친 자산 세트다: (1) **vision models ×8** → SEAL Vision Tasks 섹션의 CDN 다운로드본을 **로컬 클린본으로 교체**, (2) **anonymized_raw 7개 장면 before/after** → SEAL Before/After에 얼굴+대표 장면 + **Anonymizer 페이지** 실증 갤러리로 분산(둘 다 `BeforeAfterSlider` 드래그 방식), (3) **MTMC_GIF** → **Spatial AI 페이지**의 `SpatialTrajectoryMockup` 기존 SVG 궤적 애니메이션을 **실영상 GIF로 교체**. 상세 §3-A.

---

## 1. 라이브 페이지 콘텐츠 인벤토리 (원본 = 반영 대상)

라이브 페이지의 섹션을 순서대로 정리한다. "→ 새 페이지 처리"는 §3 매핑의 요약.

| # | 라이브 섹션 | 핵심 카피(요약) | 자산 | → 새 페이지 처리 |
|---|---|---|---|---|
| L1 | Hero + 인트로 영상 | "개인 식별 정보 삭제, 필수 AI 기능 유지" / CTA "도입 문의하기" | `seal-intro-video.mp4` | **유지+교체**: 기존 Hero에 인트로 영상 배경/블록 추가 |
| L2 | 문제제기 2문 (체크) | "AI 학습 데이터에서 모든 개인정보가 제거됐는지 확인?" / "모자이크·블러가 AI 정확도를 떨어뜨린다는 사실?" | `check-blue.svg`(아이콘) | **신규 섹션**: Problem 인트로 |
| L3 | 문제 상세 2블록 | ①영상엔 얼굴·번호판(PII) 다수 ②모자이크·블러는 데이터 유용성 훼손 | `problem-01`, `problem-02`, `problem-03` | **신규 섹션**: Problem 2-column |
| L4 | "얼굴·번호판 비식별화 SEAL" | 번호판(크기·디자인 무관)·얼굴(연령·성별·인종 무관) | `plate-original/seal`, `face-original/seal` | **신규 섹션**: BeforeAfterSlider 2쌍 |
| L5 | "데이터 유용성 보존" | 블러·모자이크 학습모델은 오인식, SEAL은 신원 외 특징 보존 | `utility-preserved.webp` | **신규 섹션**: 이미지+본문 |
| L6 | "Proven with Mainstream Vision Tasks" | 8개 비전 태스크에서 개인정보 보호+AI 유용성 입증 | `task-*.webp` ×8 | **신규 섹션**: Vision Tasks 그리드 |
| L7 | "SEAL 작동 원리" | 3-step: 업로드 → 자동 삭제 → 규정 준수 | `flow-01~03(.jpg)` + 모바일 3종 | **신규 섹션**: ProcessStepper / 3-step |
| L8 | "Competitive Comparison" | SEAL vs 블러 vs 마스크: 비식별화·속도·데이터통합·유효성 | (표, 이미지 없음) | **신규 섹션**: 비교표 |
| L9 | "활발히 사용되는 용도" | AI 모델 개발 / 윤리적 AI / 실제 데이터 활용 / 데이터 공유 | (아이콘/텍스트) | **신규 섹션**: Use-case 4카드 |
| L10 | FAQ | 동영상 처리? / 무료체험? / 요금제? / 라벨링? | — | **병합**: 기존 FAQ에 4문항 추가 |
| L11 | Contact 폼 | 문의 양식 | — | **유지**: 기존 `/contact` CTA로 대체(폼 중복 지양) |

### 현재 새 페이지(SealView.tsx)의 기존 섹션 — 보조로 유지/재배치
| 코드 섹션 | 내용 | 하이브리드 처리 |
|---|---|---|
| Hero (`heroBadge` SEAL SDK) | SDK 재프레이밍 헤드라인 | **카피 조정**: 제품 서사 톤으로 재작성(§4) |
| `SealSdkMockup` (코드에디터) | 다크 코드 목업 | **하단 이동**: 통합/SDK 섹션 근처로 |
| S/E/A/L Promise 4카드 | 설계 원칙 | **보조 유지**: "SDK로서의 SEAL" 블록으로 하단 배치 |
| Full vs Partial (LoopVideo ×2) | `seal-full-anon.mp4`·`seal-partial-anon.mp4` | **유지**: L4/L5와 인접 배치(전체 vs 부분 익명화) |
| What Remains + 법적 근거 | 로우데이터 필드·GDPR/PIPA/CCPA | **유지**: L8 비교표 뒤 신뢰 근거로 |
| Integration 4-step | 통합 개요 | **유지**: L7 작동원리와 통합/중복 정리 |
| FAQ Accordion | 8문항 | **병합 대상**(L10) |
| CTA | 문의 유도 | **유지** |

---

## 2. 목표 섹션 순서 (하이브리드 최종 IA)

```
1. Hero            ── 제품 헤드라인 + 인트로 영상 (L1)  [카피 재작성]
2. Problem         ── 왜 비식별화인가: PII·모자이크 딜레마 (L2+L3)  [신규]
3. Before/After    ── 얼굴·번호판 비식별화 실증 (L4)  [신규, BeforeAfterSlider]
4. Full vs Partial ── 전체 vs 부분 익명화 (기존 LoopVideo ×2 + L5 유용성)  [유지+병합]
5. Vision Tasks    ── 8개 비전 태스크 입증 (L6)  [신규 그리드]
6. How it works    ── 3-step 작동 원리 (L7)  [신규, ProcessStepper]
7. Comparison      ── SEAL vs 블러 vs 마스크 (L8)  [신규 비교표]
8. What Remains    ── 남는 로우데이터 + 각국 법 근거 (기존)  [유지]
9. Use cases       ── AI개발·윤리AI·실데이터·데이터공유 (L9)  [신규 4카드]
10. SDK / Integration ── S·E·A·L + 통합 4-step + 코드목업 (기존, 보조)  [하단 통합]
11. FAQ            ── 기존 8문항 + 라이브 4문항 병합 (L10)  [병합]
12. CTA            ── 도입 문의 (기존)  [유지]
```

근거: 제품 가치(2~9)로 먼저 설득 → SDK/통합(10)으로 "어떻게 넣나" 연결 → FAQ/CTA로 전환. 새 페이지가 이미 강점으로 가진 **법적 근거(8)** 와 **전체/부분 익명화 실영상(4)** 을 라이브에 없던 차별 요소로 살린다.

---

## 3. 자산 → 코드 매핑

수집 위치: `docs/SEAL_LEGACY_ASSETS/` (24개, 매니페스트는 해당 폴더 `README.md`).
최종 배치 규칙: 이미지 `public/images/technology/seal/`, 비전태스크 `…/seal/tasks/`, 영상 `public/videos/`.

| 목표 섹션 | 사용 자산(스테이징명) | 최종 경로 | 렌더 컴포넌트 |
|---|---|---|---|
| 1 Hero | `seal-intro-video.mp4` | `public/videos/seal-intro.mp4` | `LoopVideo` 또는 배경 `<video>` + 포스터 |
| 2 Problem | `problem-01-pii-in-video.webp`, `problem-02-blur-degrades.webp`, `problem-03-mosaic-utility.webp` | `…/seal/problem-*.webp` | `next/image` 2~3열 |
| 3 Before/After | `face-original.webp`+`face-seal.webp`, `plate-original.webp`+`plate-seal.webp` | `…/seal/face-*.webp`, `…/seal/plate-*.webp` | **`BeforeAfterSlider`**(기존) ×2 |
| 4 Full vs Partial | (기존) `seal-full-anon.mp4`, `seal-partial-anon.mp4` + `utility-preserved.webp` | 기존 유지 / `…/seal/utility-preserved.webp` | `LoopVideo`(기존) + `next/image` |
| 5 Vision Tasks | `task-*.webp` ×8 | `…/seal/tasks/*.webp` | `next/image` 4×2 그리드 + 캡션 |
| 6 How it works | `flow-01~03.jpg`(+모바일 3종) | `…/seal/flow-*.webp` | `ProcessStepper`(기존) 또는 3카드+이미지 |
| 7 Comparison | 없음(표 데이터만) | — | 신규 `<table>`/카드 매트릭스 |
| 9 Use cases | 없음(아이콘) | `lucide-react` 아이콘 | 4카드 (`Card`) |
| meta | `og-seal.png` | `public/images/og/seal.png` | `metadata.openGraph.images` (선택) |

**재사용 가능한 기존 컴포넌트(확인됨):** `BeforeAfterSlider`, `LoopVideo`, `ProcessStepper`, `Accordion`, `AnimatedSection`, `Card`, `HeroBadge`, `WordRise`, `Breadcrumb`, `Eyebrow`. → 신규로 만들어야 하는 것은 **Vision Tasks 그리드**와 **Comparison 표**뿐(둘 다 SealView 내 인라인 구현 가능, 별도 파일 불필요).

---

## 3-A. `asset-hp-260720/` 신규 자산 통합 (SEAL · Spatial AI · Anonymizer)

원본 위치: `asset-hp-260720/` (사용자 제공, 이미 로컬 존재 — 다운로드 불필요).
이 자산 세트는 **3개 페이지**에 걸친다. 페이지별로 정리한다.

### 3-A.1 vision models ×8 → **SEAL** Vision Tasks 섹션 (§2 섹션5) — CDN본 교체

`vision models/*.webp` (768×520, 일관된 규격)는 §3에서 CDN에서 받은 `task-*.webp` 와 **동일 8개 태스크의 클린 로컬본**이다. → **CDN 다운로드본 대신 이 로컬본을 사용**(품질·규격 일관). 파일명에 원본 오타(`Sementic`, `Recoginition`)가 있어 임포트 시 리네이밍.

| 원본 파일 | 태스크 라벨 | 제안 최종 경로 |
|---|---|---|
| `Action Recoginition.webp` | Action Recognition | `public/images/technology/seal/tasks/action-recognition.webp` |
| `Car Detection.webp` | Car Detection | `…/tasks/car-detection.webp` |
| `Sementic Segmentation.webp` | Semantic Segmentation | `…/tasks/semantic-segmentation.webp` |
| `Depth Estimation.webp` | Depth Estimation | `…/tasks/depth-estimation.webp` |
| `Face Landmark Detection.webp` | Face Landmark Detection | `…/tasks/face-landmark.webp` |
| `Person Attribute.webp` | Person Attribute | `…/tasks/person-attribute.webp` |
| `Pose Estimation.webp` | Pose Estimation | `…/tasks/pose-estimation.webp` |
| `Gender_Young Classification.webp` | Gender/Age Classification | `…/tasks/gender-age.webp` |

→ **§3 매핑의 "5 Vision Tasks" 자산 출처를 `docs/SEAL_LEGACY_ASSETS/task-*.webp` 에서 `asset-hp-260720/vision models/*` 로 대체.** CDN본은 폴백으로 보관.

### 3-A.2 anonymized_raw 7개 장면 → **SEAL Before/After + Anonymizer** (드래그 슬라이더)

7쌍(원본↔익명화): 얼굴·공장·마트·병원·영화관·은행·학교. **7쌍 모두 원본과 익명화의 종횡비가 일치**(검증 완료) → 원본을 1000px 폭으로 다운스케일하면 `BeforeAfterSlider` 에 **크롭 없이 바로** 사용 가능.

**배치(승인: "둘 다 활용"):**
- **SEAL** §2 섹션3 Before/After → 라이브의 얼굴·번호판 2쌍을 **얼굴(이 자산) + 대표 상업 장면 1~2개(예: 마트, 은행)** 로 교체·보강. 리테일 맥락이 SEAL 제품 서사와 직결.
- **Anonymizer** 페이지(`/technology/anonymizer`, `AnonymizerView.tsx`) → 나머지 장면(공장·병원·영화관·학교 등)을 **업종별 익명화 실증 갤러리**(슬라이더 그리드)로. 다양한 공간에서 작동함을 입증.

| 원본 쌍 | 배치 | 제안 최종 경로(원본/익명화) |
|---|---|---|
| `Face.jpg` / `Face-Anonymized.png` (1000×998) | SEAL | `…/seal/scene-face-original.webp` / `…-seal.webp` |
| `마트.jpg` / `마트-익명화.jpg` | SEAL | `…/seal/scene-mart-original.webp` / `…-seal.webp` |
| `은행.jpg` / `은행-익명화.jpg` | SEAL(택1) | `…/seal/scene-bank-*.webp` |
| `공장.jpg` / `공장-익명화.jpg` | Anonymizer | `public/images/technology/anonymizer/scene-factory-*.webp` |
| `병원.jpg` / `병원-익명화.jpg` | Anonymizer | `…/anonymizer/scene-hospital-*.webp` |
| `영화관.jpg` / `영화관-익명화.jpg` | Anonymizer | `…/anonymizer/scene-cinema-*.webp` |
| `학교.jpg` / `학교-익명화.jpg` | Anonymizer | `…/anonymizer/scene-school-*.webp` |

*(SEAL 3장/Anonymizer 4장은 제안 — 최종 장면 배분은 리뷰 시 조정 가능. R7 참조.)*

**슬라이더 컴포넌트:** 기존 `BeforeAfterSlider`(드래그-투-리빌, `next/image` 기반, 접근성 range input 내장 — 확인됨). "after=익명화"를 위에 올려 드래그로 원본이 드러나는 규약. 라벨 카피는 로케일 Copy에 `sceneBeforeAfter[]` 로 추가(§4).

**처리 주의:** 원본 JPG가 최대 17MB(영화관 7952px). → **1000px 폭 webp(q82)로 다운스케일 필수**, 익명화본과 픽셀 정합 확인. Face 원본은 PNG(`Face-Anonymized.png`) → webp 변환.

### 3-A.3 MTMC_GIF → **Spatial AI** 페이지, `SpatialTrajectoryMockup` 실영상 교체

- **정확한 위치:** `src/components/mockups/SpatialTrajectoryMockup.tsx` — 헤딩 `"카메라가 여러 대여도, 같은 사람을 연속 추적합니다 — 얼굴 없이"`(line 33). 이 목업은 `SpatialAiView.tsx`(`/technology/spatial-ai`)의 centerpiece이며 SEAL 페이지가 아님.
- **현재 상태:** 3-카메라 그리드 위에 **손으로 만든 애니메이션 SVG 궤적**(viewBox `0 0 300 70` 데스크톱 / `0 0 100 230` 모바일, line 289·355)이 렌더됨. 실제 영상 없음.
- **승인 결정:** 이 **SVG 궤적 애니메이션을 실영상 MTMC_GIF로 교체**. 사용자 지정대로 이 모듈의 **핵심 비주얼**로 삽입.
- **작업 요지:** ① 그리드+SVG 궤적 블록(대략 line 249~418)을 GIF 렌더로 대체하되, 상단 헤더/eyebrow/lead(line 212~223)와 하단 3-포인트 설명 카드(line 420~)는 유지. ② GIF는 `next/image`(`unoptimized` 또는 정적 import) 또는 `<img>` 로. ③ `alt`/`aria` 는 기존 SVG의 `aria-hidden` 대신 의미 있는 설명 부여.
- **제안 최종 경로:** `public/images/technology/spatial-ai/mtmc-tracking.gif`
- **용량 최적화(권장):** 3.1MB GIF(960×540). GIF 유지 시 그대로 두되, 성능 위해 **loop mp4/webm 트랜스코드 후 `LoopVideo` 사용**을 대안으로 병기(R8). 최초 결정은 "GIF로 교체"이므로 GIF를 기본, mp4는 후속 최적화 옵션.

> **범위 주의:** 3-A.2(Anonymizer)·3-A.3(Spatial AI)은 **SEAL 외 페이지** 수정을 수반한다. 이 계획서가 3개 페이지를 함께 다루지만, 코드 작업은 SEAL → Spatial AI → Anonymizer 순으로 분리 실행 권장.

---

## 4. 카피 작업 (3개 로케일)

`SealView.tsx` 는 `type Copy` + `ko`/`en`/`jp` 3개 객체 + `const C: Record<Locale, Copy>` 구조. 반영 시 **`Copy` 타입에 신규 섹션 필드를 추가**하고 세 객체를 모두 채운다.

추가될 주요 필드(제안):
- `problemEyebrow/Title`, `problemItems[]` (L2·L3)
- `beforeAfterTitle`, `beforeAfterPairs[]` (얼굴/번호판 + 장면 라벨 = L4 + §3-A.2; 각 항목 `{ label, original, seal }` — 예: 얼굴·마트·은행)
- `visionEyebrow/Title/Sub`, `visionTasks[]` (name+파일, L6)
- `howEyebrow/Title`, `howSteps[]` (3-step, L7)
- `compareRows[]` (기능·SEAL·블러·마스크, L8) — *기존 `compare*` 필드와 이름 충돌 주의: 현 코드의 `compareEyebrow/Title/Body` 는 "전체 vs 부분"(섹션4)에 이미 사용 중이므로, 비교표는 `matrix*` 등 새 네임스페이스로 분리*
- `useCaseTitle`, `useCases[]` (L9)
- FAQ: 기존 `faqItems[]` 에 라이브 4문항(동영상/무료체험/요금제/라벨링) 추가

카피 원문(라이브 ko)은 §7 부록에 그대로 보존 — en/jp 는 라이브 영문/일문 페이지(`/seal`, `/jp/seal`)에서 동일 방식으로 추출하거나, 기존 코드의 en/jp 톤에 맞춰 번역. **주의: 라이브 카피는 제품 톤(비식별화 서비스), 기존 코드 카피는 SDK 톤 → 하이브리드 톤으로 통일 필요(§0 방향).**

---

## 5. 자산 처리 파이프라인

1. **리네이밍**: 스테이징 → 최종 경로(§3·§3-A, README 매니페스트 표) 기준으로 복사.
2. **포맷 변환**: `flow-*.jpg`·`Face-Anonymized.png`·장면 원본 `.jpg` → `.webp` (품질 82~85). vision models는 이미 webp(리네이밍만).
   `cwebp -q 82 flow-01.jpg -o flow-01.webp` 형태(또는 `sharp` 스크립트).
3. **영상 최적화**: `seal-intro-video.mp4`(7.0MB) → Hero 사용 시 (a) 해상도/비트레이트 재인코딩으로 2~3MB 목표, (b) 포스터 프레임(`seal-intro-poster.webp`) 추출, (c) `preload="metadata"`·`muted`·`playsInline` 적용. 기존 `LoopVideo` 규약 준수.
4. **반응형 flow**: 데스크톱 `flow-0x` + 모바일 `flow-0x-mobile` 는 `next/image` + CSS 브레이크포인트 또는 `<picture>` 로 스위칭.
5. **장면 원본 다운스케일(§3-A.2)**: `anonymized_raw/*` 원본 JPG는 최대 17MB(7952px). → **1000px 폭 webp(q82)** 로 리사이즈해 익명화본과 종횡비·픽셀 정합(7쌍 모두 비율 일치 확인됨). 슬라이더 정렬 오차 없는지 육안 확인.
6. **MTMC GIF(§3-A.3)**: `MTMC_GIF.gif`(960×540, 3.1MB) → 기본은 GIF 그대로 배치. 후속 최적화로 **loop mp4/webm 트랜스코드**(용량 1/3 이하) 시 `LoopVideo` 로 교체 가능(R8).
7. **라이선스 확인**: 전 자산 자사 소유 여부 최종 확인 후 커밋(§6 리스크).

---

## 6. 실행 순서 · 리스크

**권장 실행 순서 (코드 작업 시)**
1. 자산 처리(§5) → `public/` 배치, 빌드에 안전히 포함되는지 `next build` 확인.
2. `Copy` 타입 + 3로케일 객체에 신규 필드 추가(§4) — 컴파일만 먼저 통과.
3. 섹션 컴포넌트 배치(§2 순서) — 기존 컴포넌트 재사용 우선, Vision 그리드·Comparison 표만 인라인 신규.
4. 반응형·접근성(alt·aria·break-keep) 점검 → 세 로케일 `/ko`·`/`·`/jp` 라우트 렌더 확인.

**리스크 / 결정 필요 사항**
- **R1 서사 충돌**: SDK 톤과 제품 톤이 한 페이지에 공존 → 카피 통일 감수(§0·§4). *리뷰 필요*.
- **R2 필드 네이밍 충돌**: 기존 `compare*`(전체/부분) vs 신규 비교표 → `matrix*` 로 분리(§4).
- **R3 인트로 영상 용량**: 7MB Hero 배경은 LCP 저하 → 재인코딩/포스터 필수(§5-3).
- **R4 Contact 폼**: 라이브는 페이지 내 폼, 새 사이트는 `/contact` 분리 → **폼 중복 대신 CTA 유지** 제안(확정 필요).
- **R5 라이선스**: 자산 저작권 최종 확인 전 커밋 금지.
- **R6 en/jp 카피 출처**: 라이브 `/seal`·`/jp/seal` 에서 원문 추출 필요(현재 ko만 확보).
- **R7 장면 배분(§3-A.2)**: SEAL 3장(얼굴·마트·은행) / Anonymizer 4장(공장·병원·영화관·학교)은 *제안*. 최종 배분·장면 선택은 리뷰 시 조정.
- **R8 MTMC GIF vs mp4(§3-A.3)**: "GIF로 교체" 확정이나, 3.1MB GIF는 LCP·모바일 데이터 부담. loop mp4 트랜스코드를 후속 최적화로 권장 — 채택 여부 결정 필요.
- **R9 다중 페이지 범위**: 이 계획은 SEAL 외 Spatial AI·Anonymizer 코드까지 건드림. 페이지별 배포·QA 분리 필요.

---

## 7. 부록 — 라이브 ko 카피 원문 (보존)

**Hero**: 개인 식별 정보 삭제, 필수 AI 기능 유지 / [도입 문의하기]

**문제제기(L2)**: "AI 학습 데이터에서 모든 개인 정보가 완벽하게 제거되었는지 확인하셨나요?" · "기존의 모자이크나 블러가 AI 모델의 정확도를 떨어뜨릴 수 있다는 사실을 알고 계셨나요?"

**문제 상세(L3)**: ① "영상 데이터에는 수많은 개인 식별 정보 및 번호판이 포함되어 있습니다." — 영상 데이터에 포함된 사람의 얼굴과 자동차 번호판은 개인 식별 정보로 분류됩니다. … 적절한 비식별화 조치를 취해야 합니다. ② "모자이크를 사용하거나 데이터를 흐리게 처리하면 AI 학습을 위한 데이터 유용성을 훼손할 수 있습니다." — … 이렇게 처리된 영상 데이터를 AI 모델 학습에 사용하면 AI 모델의 정확도가 떨어집니다.

**비식별화(L4)**: "영상 데이터에서 얼굴과 번호판을 놓치지 않고 비식별화하는 SEAL" — 자동차 번호판(크기나 디자인에 관계없이) / 사람의 얼굴(연령, 성별, 인종에 관계없이)

**유용성 보존(L5)**: "SEAL은 AI 학습에 필요한 데이터 유용성을 보존할 수 있습니다." — 흐릿하거나 모자이크 처리된 이미지로 학습된 AI 모델은 … 실제 대상을 놓칠 수 있습니다. 그러나 SEAL은 신원을 제외한 필수적인 특징은 그대로 유지하여 … 올바르게 작동하도록 보장합니다.

**Vision Tasks(L6)**: "Proven with Mainstream Vision Tasks" — SEAL 처리된 데이터는 다양한 AI 비전 애플리케이션에 최적화되었으며, 개인 정보 보호를 보장하면서 AI 유용성을 보존합니다. / 태스크: Action Recognition, Car Detection, Semantic Segmentation, Depth Estimation, Face Landmark Detection, Person Attribute, Pose Estimation, Gender/Young Classification

**작동 원리(L7)**: "SEAL 작동 원리" — ① 간단한 스크립트 또는 GUI를 통한 이미지/동영상 업로드 ② 개인 정보 자동 삭제 ③ AI 모델이 개인정보 보호 규정을 준수하도록 하기

**Competitive Comparison(L8)**: 기능 / SEAL / 블러 처리 / 마스크 처리
- 비식별화: 효율적이고 데이터 가치 유지 / 흐릿한 디테일 / 완벽한 데이터 마스킹
- 속도: 실시간 처리 / 느린 합성 / 보통 / 실시간
- 데이터 통합: 중요한 AI 세부 정보 유지 / 선명도 손실 / 세부 정보 가려짐
- 유효성 검증: 완벽한 익명화 / 흐릿하지만 데이터 손실 / 세부 정보 손실됨
  *(라이브 표는 얼굴교체 컬럼도 일부 노출 — 코드화 시 SEAL/블러/마스크 3열로 정리 권장)*

**활용 사례(L9)**: AI 모델 개발(실제 데이터로 정확도를 높이세요) / 윤리적 AI(개인정보 보호 기능으로 윤리적 AI 연구) / 실제 데이터 활용(배포 후 모델 개선) / 데이터 공유(개인정보 문제 없이 데이터셋 공유·장기 보관)

**FAQ(L10)**:
- 동영상도 처리할 수 있나요? — 처리 가능. 최대 10,000개 이미지 무료 평가판 + 샘플 동영상(10분) 무료 평가판 제공.
- 무료 체험이 가능한가요? — 최대 10,000개 무료 체험 이미지 제공.
- 요금제는 어떻게 되나요? — 이미지 수·동영상 길이 기준 요금제, 대량 처리 할인 모델 제공.
- SEAL 처리 후 데이터 라벨링이 가능합니까? — 가능. 작업·수량·형식·라벨 유형 공유 시 견적 및 라벨 제작 서비스 안내.

---

## 8. 산출물 체크리스트 (이 계획 실행 시 완료 기준)

**SEAL 페이지**
- [ ] `docs/SEAL_LEGACY_ASSETS/` 24개 + `asset-hp-260720/vision models` 8개 → `public/…` 배치 + webp
- [ ] Vision Tasks 자산은 **로컬 클린본(§3-A.1)** 사용, CDN본은 폴백
- [ ] `seal-intro-video.mp4` 재인코딩 + 포스터
- [ ] 장면 before/after(얼굴·마트·은행) 1000px webp 다운스케일 + 슬라이더(§3-A.2)
- [ ] `SealView.tsx` `Copy` 타입 신규 필드 + `ko`/`en`/`jp` 카피
- [ ] 섹션 순서 §2 재구성(기존 컴포넌트 재사용) + Vision 그리드·Comparison 표 인라인
- [ ] `/ko`·`/`·`/jp` `/technology/seal` 3라우트 렌더 확인

**Spatial AI 페이지 (§3-A.3)**
- [ ] `MTMC_GIF.gif` → `public/images/technology/spatial-ai/mtmc-tracking.gif`
- [ ] `SpatialTrajectoryMockup.tsx` SVG 궤적 → 실영상 GIF 교체 (헤더·설명카드 유지)
- [ ] `alt`/`aria` 의미 부여, 3라우트 렌더 확인

**Anonymizer 페이지 (§3-A.2)**
- [ ] 장면 4개(공장·병원·영화관·학교) 1000px webp + `AnonymizerView.tsx` 슬라이더 갤러리
- [ ] 3라우트 렌더 확인

**공통**
- [ ] 접근성(alt/aria/break-keep)·반응형·LCP 점검
- [ ] R1·R4·R5·R7·R8·R9 결정 사항 리뷰 완료
