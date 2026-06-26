# 익명화 · Tech 자료 → 홈페이지 반영 계획

> 자료 위치: `new_image_260626/` (이미지 2 · 영상 5 · PPTX 1)
> 대상: 홈(`TrustCharter`·Hero) + `/technology/anonymizer` · `/technology/seal` · `/technology/spatial-ai`
> 작성: 2026-06-26 · 상태: 검토용 초안

> **구현 현황 (2026-06-26).** 권리·영상 무관 + 정직성 OK인 **AnonymizerView 시각화 2종 출하 완료** — (1) Mechanism 섹션에 **파이프라인 다이어그램**(입력→신원 영역 검출→입력 시점 익명화[강조]→분석 신호 전달), (2) **"기존 비식별화의 딜레마" 비교표**(원본/마스킹·블러/얼굴교체/SEAL × 법준수·활용도·비식별정확성, SEAL 행 하이라이트). PPTX 내러티브 §4 이식, KO/EN/JP. 인라인 SVG/표·실인물 0·영상 0. "AnonymizerView 시각 자료 0건"(§B) 일부 해소.
>
> **2차 — 실자산 반영 (법무 게이트 해소 후).** 보유 영상·이미지가 **stock 구매·처리본**이라 L1/L2 권리 해소됨(사용자 확인). 웹 처리(ffmpeg 8.1/cwebp) 후 AnonymizerView에 실자료 2종 투입: (1) **before↔after 드래그 슬라이더** — `face-before/after.png`→webp(4.5/11KB), 재사용 컴포넌트 `ui/BeforeAfterSlider.tsx`(pointer/range 접근성), Mechanism 파이프라인 아래. 실제 노이즈 출력 노출. (2) **Pete 킬러 데모** — `pete_face_anonymized2.mov`→`pete-anon-demo.mp4`(1.34MB)+`.webm`(1.47MB)+poster.webp, 재사용 컴포넌트 `ui/LoopVideo.tsx`(IntersectionObserver lazy + reduced-motion), "얼굴은 지워도 맥락은 읽습니다" 밴드(Mechanism↔Limitation). 카피 Part 1 §2/§3, KO/EN/JP. **나머지 보류** — 3분할 `anonymizer_demo`(3840×720, 모바일 세로분할 처리 필요)·SealView full/partial 비교(mpeg4 변환)·home TrustCharter 슬라이더·spatial-ai iStock는 다음 증분. ⚠️ Pete 영상 속 속성 말풍선은 영어(A3 현지화 미해결) — 인접 캡션은 로케일별 제공으로 보완.

---

## 0. 결론부터

이 자료들은 회사의 **1순위 차별점("누구가 아니라 무엇을")을 글로 말하지 않고 보여줄(show, not tell)** 자산입니다. 현재 사이트는 익명화를 **정지 이미지(webp)로만** 설명합니다. 이 폴더에는 그것을 **영상 3종 + 결정적 데모 1종**으로 증명할 재료가 있습니다.

가장 강력한 두 가지:
1. **`pete_face_anonymized2`** — 얼굴은 노이즈로 완전히 파괴됐는데도 AI가 "45세·남성·안경·검은 머리·정면 응시·긴장·발화 중"을 읽어냅니다. 브랜드 명제 그 자체를 한 장면에 담은 데모.
2. **`anonymizer_demo`** — 원본 → 익명화 → *익명 상태로 추적(바운딩박스)* 의 3분할. "원본이 아니라 익명화된 영상을 분석한다"는 구조를 한 화면에 증명.

⚠️ **단, PPTX의 수치는 쓰지 마세요.** PPTX는 2022년 자료(특허 92개·45명·투자 213억)이고, 현 사이트는 특허 103개(등록 66)로 이미 갱신돼 있습니다. PPTX는 **시각·개념·내러티브**만 가져오고, 숫자는 `company-data.ts`를 정본으로 유지합니다.

---

## 1. 자료 인벤토리 (분석 결과)

| 파일 | 내용 | 사양 | 메시지 적합도 | 웹 적합 |
| --- | --- | --- | --- | --- |
| `face-before-anon.png` | 선명한 인물 정면 사진 | 60KB | before/after 슬라이더 좌 | ✅ webp 변환 |
| `face-after-anon.png` | 동일 인물 → 완전 노이즈 | 76KB | before/after 슬라이더 우 | ✅ webp 변환 |
| `pete_face_anonymized2.mov` | 얼굴 노이즈+랜드마크, 말풍선으로 속성 추출(나이·성별·안경·감정·발화) | 1280×900, 5.3s, h264 | ★★★ **킬러 데모** | ⚠️ 트랜스코딩 필요 |
| `anonymizer_demo.mov` | 3분할: 원본 / 익명화 / 익명상태 추적(박스) — 리테일 군중 | 3840×720, 16s, h264 | ★★★ 구조 증명 | ⚠️ 와이드, 모바일 대응 필요 |
| `partial_anonimizer_video_sample.mp4` | 몰 에스컬레이터 실장면(부분 익명화) | 1920×1080, 7s, **mpeg4** | ★★ 부분 익명화 예시 | ❌ 코덱 변환 필수 |
| `full_anonimizer_video_sample.mp4` | 장면 전체 노이즈(완전 익명화) | 640×360, 7s, **mpeg4** | ★ 저해상도, 보조용 | ❌ 저화질·코덱 |
| `iStock-1504624766_SEAL_fld2.mp4` | 식탁 두 인물, 얼굴 랜드마크 메시 | 1800×1080, 6.7s, h264 | ★★ 얼굴 검출 시연 | ⚠️ **iStock 라이선스 확인** |
| `tech-contents.pptx` | 익명화 기술 7장 덱(배경·문제·솔루션·SEAL·강점) | 7 슬라이드 | 내러티브·도식 소스 | 텍스트/도식만 재사용 |

---

## 2. PPTX에서 건질 내러티브 (숫자 제외)

7장 덱은 익명화 기술의 **논리 골격**을 제공합니다. 홈/기술 페이지의 카피·도식으로 재사용 가능:

1. **배경** — 2018 GDPR 이후 개인정보 보호법은 강해지는데, AI의 핵심 자원인 영상 데이터엔 불특정 다수의 개인정보가 담겨 있다.
2. **문제** — 기존 방식은 둘 중 하나다. 데이터 가치를 파괴(마스킹·블러)하거나, 위험을 안고 그냥 쓰거나. (덱의 표: 원본사용/마스킹·블러/얼굴교체 × 법준수·활용도·정확성 → 모두 부족)
3. **솔루션** — AI용 완전히 새로운 익명화. **사람도 AI도 식별 불가하게 만들되, AI가 장면을 인식하는 데 필요한 최소 특징은 보존.** 원본 복원 불가.
4. **SEAL = 부분 익명화** — 전체 익명화는 안전 중심, 부분 익명화(SEAL)는 활용성 중심. 신원 정보만 강하게 지우고 분석은 살린다.
5. **활용** — 익명화된 데이터를 원본처럼 비전 분석: 물체 검출·동작 인식·얼굴 특징점·성별/나이·세그멘테이션·깊이·자세.
6. **강점 3축** — 안전성(픽셀별 위험 비례 익명화), 실시간성(임베디드에서 1080p 실시간), AI 활용도(원본 수준 정확도 보존).

> 이 골격은 이미 `brand-canon.ts`의 SEAL 3약속(원본 미보존·사람 미열람·재식별 불가)과 일치 — 자료가 그 약속을 **증명**합니다.

---

## 3. 자료 → 사이트 섹션 매핑

| 자료 | 권장 위치 | 형태 |
| --- | --- | --- |
| before/after PNG | 홈 `TrustCharter` 상단 | **드래그 before↔after 슬라이더** |
| `pete_face_anonymized2` | 홈 신규 "무엇을 읽는가" 카드 / `spatial-ai` | 자동재생 루프 영상 + 속성 캡션 |
| `anonymizer_demo`(3분할) | `/technology/anonymizer` 히어로 / 홈 `TrustCharter` 보조 | 3분할 영상 (모바일=세로 스택) |
| `partial`·`full` 샘플 | `/technology/seal` (전체 vs 부분 비교) | 2-up 비교 영상 |
| `iStock` 랜드마크 | `spatial-ai` 얼굴검출 설명(라이선스 OK시) | 짧은 루프 |
| PPTX 내러티브 | `/technology/anonymizer` 본문 + 홈 카피 | 텍스트·도식 |
| PPTX "기존 방식 비교표" | `/technology/anonymizer` | 비교 표 |

---

## 4. 우선순위 반영안

### P0 — 홈에서 즉시 임팩트

1. **`TrustCharter`에 before↔after 인터랙티브 슬라이더.** 정지 webp 대신, 사용자가 손잡이를 끌면 선명한 얼굴이 노이즈로 무너지는 체험. SEAL 3약속 바로 위.
2. **홈 신규 카드/밴드 "누구가 아니라, 무엇을 읽습니다."** `pete_face_anonymized2` 루프 영상 + "얼굴은 지워도, 45세·정면 응시·발화 중은 읽습니다" 캡션. 브랜드 명제를 영상으로 증명. (현재 Hero의 익명추적 칩과 짝.)

### P1 — 기술 페이지 깊이

3. **`/technology/anonymizer` 히어로를 `anonymizer_demo` 3분할 영상으로.** 원본→익명화→추적의 구조를 한 화면에. PPTX 문제/솔루션 내러티브를 본문으로.
4. **`/technology/seal` 전체 vs 부분 익명화 비교** — `full`·`partial` 샘플 2-up + PPTX 4번 메시지.
5. **PPTX "기존 방식 한계" 비교표** 이식 (원본/마스킹·블러/얼굴교체의 한계).

### P2 — 보강

6. `spatial-ai`에 얼굴 랜드마크 검출(iStock, 라이선스 확인 후) + "익명화된 데이터를 원본처럼 분석"(PPTX 5).
7. 강점 3축(안전성·실시간성·활용도)을 기술 페이지 지표 밴드로.

---

## 5. 신규 섹션 와이어프레임

### P0-1 — TrustCharter before↔after 슬라이더

```
┌──────────────────────────────────────────────────────┐
│ EYEBROW: 익명화는 첫 단계입니다                          │
│ H2: 누구가 아니라, 무슨 일을 봅니다.                      │
│                                                        │
│  ┌────────── 드래그 슬라이더 ──────────┐                │
│  │ [선명한 얼굴]  ▮◀▶  [완전 노이즈]    │ ← 손잡이 끌기   │
│  └──────────────────────────────────┘                │
│  캡션: 첫 단계에서 익명화. 원본은 어디에도 남지 않습니다.  │
│                                                        │
│  [원본 미보존] [사람 미열람] [재식별 불가]  ← SEAL 3약속 │
└──────────────────────────────────────────────────────┘
```

### P0-2 — "무엇을 읽는가" 데모 밴드

```
┌──────────────────────────────────────────────────────┐
│ 좌) 영상 루프 (pete)      │ 우) 카피                    │
│ ┌─────────────────────┐  │ EYEBROW: 신원이 아니라 정보  │
│ │ 얼굴=노이즈+랜드마크   │  │ H2: 얼굴은 지워도,          │
│ │ 말풍선:              │  │     맥락은 읽습니다.         │
│ │ 45세·남성·안경·       │  │ 본문: 신원은 복원 불가능하게 │
│ │ 정면·긴장·발화 중     │  │ 지우고, 분석에 필요한 최소   │
│ └─────────────────────┘  │ 특징만 남깁니다.            │
│                          │ • 성별·연령  • 동선·자세     │
│                          │ • 관심·체류  • 혼잡도       │
└──────────────────────────────────────────────────────┘
```

### P1-3 — anonymizer 페이지 3분할 히어로

```
┌──────────────────────────────────────────────────────┐
│ H1: 익명화하고도, 그대로 분석합니다.                     │
│ ┌────────┬────────┬────────┐                          │
│ │ 원본    │ 익명화  │ 익명+추적│  ← anonymizer_demo 영상 │
│ │ 군중    │ 노이즈  │ 박스/ID │  (모바일: 세로 스택)     │
│ └────────┴────────┴────────┘                          │
│ 캡션: 분석은 원본이 아니라 익명화된 영상 위에서.          │
└──────────────────────────────────────────────────────┘
```

---

## 6. 카피 초안 (한국어 · ~합니다체)

**P0-2 데모 밴드**
- Eyebrow: 신원이 아니라, 정보를 읽습니다
- H2(대안): A. **얼굴은 지워도, 맥락은 읽습니다.** (추천) / B. 노이즈가 된 얼굴에서도, 매장은 읽힙니다. / C. 누구인지는 지우고, 무슨 일인지는 남깁니다.
- 본문: 신원은 되돌릴 수 없게 지우고, AI가 장면을 이해하는 데 필요한 최소 특징만 남깁니다. 그래서 익명화된 영상에서도 성별·연령대, 동선과 자세, 관심과 체류를 읽습니다 — 누구인지는 모른 채로.
- 캡션: 얼굴은 노이즈. 그래도 읽히는 것 — 연령대·시선·발화. 신원은 없습니다.

**P1-3 anonymizer 히어로**
- H1(대안): A. **익명화하고도, 그대로 분석합니다.** / B. 지우는 순간 분석이 멈추지 않습니다. / C. 원본이 아니라, 익명화된 영상을 분석합니다.
- Sub: 영상은 첫 단계에서 익명화됩니다. 분석은 그 익명화된 영상 위에서 일어나고, 원본은 시스템 어디에도 남지 않습니다.

**기존 방식 비교(PPTX 표 이식)**
- 제목: 기존 비식별화의 딜레마
- 본문: 마스킹·블러는 데이터 가치를 파괴하고, 얼굴 교체는 비식별 여부를 확인하기 어렵습니다. 원본을 그냥 쓰면 위험이 남습니다. SEAL은 셋 다 피합니다 — 식별은 불가능하게, 분석은 원본 수준으로.

---

## 7. 기술 처리 가이드 (영상 웹 반영)

자료 영상을 그대로 올리면 안 됩니다. 권장 처리:

- **코덱 변환 필수.** `partial`·`full` 샘플은 `mpeg4` 코덱이라 일부 브라우저 미지원 → **H.264 mp4 + WebM(VP9/AV1)** 듀얼 인코딩.
- **포스터 프레임** 지정(`poster=`) — 로딩 전 정지컷, LCP 보호.
- **자동재생 루프**: `autoplay muted loop playsinline`, 본문 아래는 **lazy load**(IntersectionObserver), `prefers-reduced-motion` 시 정지+포스터.
- **용량 다이어트**: `anonymizer_demo` 27MB → 타깃 ~2–4MB(해상도 1920폭, CRF 28). 홈 above-the-fold엔 무거운 영상 금지.
- **모바일 대응**: `anonymizer_demo`는 3840×720 와이드 → 모바일은 3패널 세로 스택 또는 가로 스와이프.
- **접근성**: 영상은 장식이 아니므로 인접 텍스트 캡션 필수, `aria-label`.
- **before/after**: PNG → **WebP** 변환(파일 50–70% 감소), 슬라이더는 경량 JS(외부 라이브러리 없이 구현 가능).
- 자산 경로 컨벤션: 기존 `public/images/technology/` · `public/videos/` 와 일치시켜 추가.

---

## 8. 반드시 확인할 것 (오픈 이슈)

1. **iStock 라이선스** — `iStock-1504624766`는 스톡 영상. 웹 게시 가능한 라이선스인지 확인. 불확실하면 자체 촬영분으로 대체.
2. **초상권/모델 릴리스** — `pete_face_anonymized2`, before/after 인물, `partial`(실장면 행인). 얼굴이 노이즈여도 before 컷·말풍선 데모는 **원본 인물 노출**이므로 사용 동의 확인. before/after는 동의된 모델로 재촬영이 가장 안전.
3. **PPTX 수치 사용 금지** — 92개/45명/213억(2022)은 옛 수치. 사이트 정본(특허 103·등록 66) 유지.
4. **"Pete Kim" 말풍선 다국어** — 현재 영어. KO/JP 버전 필요 시 자막 또는 영상 재제작.
5. **임시 파일 정리** — 분석 중 생성된 `_frames_tmp/`는 삭제해도 됩니다.

---

## 부록 — 파일별 권장 액션 요약

| 파일 | 액션 | 산출물 |
| --- | --- | --- |
| before/after PNG | WebP 변환 → 슬라이더 | `tech-anon-slider-before/after.webp` |
| pete_face | 트랜스코딩·트림·KO자막 | mp4+webm+poster |
| anonymizer_demo | 다운스케일·압축·모바일 변형 | mp4+webm+poster(데스크/모바일) |
| partial/full | 코덱 변환·2-up 비교 | mp4+webm |
| iStock | 라이선스 확인 후 변환 | (조건부) |
| PPTX | 내러티브·비교표 텍스트화·도식 재제작 | 카피/표 |

---

# 추가 점검 (2026-06-26) — technology 섹션 전체 + 이미지 생성안

> 요청: `/ko/technology` 등 anonymizer 외 페이지도 점검, 필요 시 신규 이미지 생성안 포함.
> 방법: 라이브(Vercel)는 로그인 보호 → 동일 코드(repo)로 점검.

## A. 핵심 발견 — "합성 목업으로 설명 중, 실제 자료로 증명 가능"

technology 섹션 5개 페이지는 익명화·공간지능을 **거의 전부 합성 CSS/SVG 목업과 실루엣 일러스트로 설명**합니다. 공개된 실제 영상은 `unmanned-security-alert.mp4` 단 1개. 게다가 기존 이미지 생성 규칙(`asset-prompts/02-technology.md`)은 익명화를 **회색-블루 실루엣**으로 표현합니다 — 안전하지만, 제품의 실제 출력(노이즈)과 다릅니다.

이 폴더의 자료는 **제품의 실제 출력(노이즈 익명화 + 분석 생존)** 을 보여주므로, 합성 일러스트보다 훨씬 신뢰도 높은 증거입니다. 원칙 하나를 더합니다 — **익명화 "결과물"은 생성 이미지로 위조하지 않고 실제 자료를 씁니다(브랜드의 정직성 가치와 일치). 신규 생성 이미지는 장면·개념·다이어그램·히어로 배경에 한정합니다.**

## B. 페이지별 점검 결과

| 페이지 | 현재 시각 자료 | 갭 | 투입할 실제 자료 |
| --- | --- | --- | --- |
| `/technology` (TechnologyView) | AnonymizationPipeline(SVG)·AnonymizationMockup(합성)·"Anonymizer Demo"=합성 | "Demo"가 합성이라 증거력 약함 | **`anonymizer_demo` 3분할 영상**으로 Demo 교체 |
| `/technology/anonymizer` (AnonymizerView) | **시각 자료 0건** (Mechanism·Spec·FAQ 전부 텍스트) + EdgePerf 합성 | 익명화 페이지인데 익명화를 못 보여줌 | **before↔after 슬라이더 + Pete 데모 + 3분할 영상** |
| `/technology/seal` (SealView) | SealSdkMockup(합성)·텍스트 | 전체 vs 부분 익명화 시연 없음 | **`full`·`partial` 2-up 비교 영상** (PPTX 4) |
| `/technology/spatial-ai` (SpatialAiView) | `spatial-ai-concept.webp` 1장 + SpatialTrajectory(합성) | "누구가 아니라 무엇을"의 실증 없음 | **Pete 속성 데모 + iStock 랜드마크**(라이선스 시) |
| `/technology/models` (ModelsView) | `face-anon/body-anon/plate-anon.webp`(생성 실루엣) | 실제 익명화 출력 부재 | **실제 before/after**, `partial` 샘플 |

## C. 페이지별 반영안

1. **AnonymizerView (최우선 — 현재 시각 자료 0건).** 히어로에 `anonymizer_demo` 3분할 영상, Mechanism 섹션에 before↔after 슬라이더, "분석은 익명화 위에서도 산다"의 증거로 **Pete 속성 데모**. PPTX의 "기존 방식 비교표"(원본/마스킹·블러/얼굴교체의 한계)를 Limitation 섹션에 이식.
2. **TechnologyView.** "Anonymizer Demo" 섹션의 합성 AnonymizationMockup을 `anonymizer_demo` 실영상으로 교체. 나머지 합성 목업(파이프라인 등)은 보조로 유지.
3. **SealView.** Integration 위에 `full`(안전 중심) vs `partial`(활용성 중심) 2-up 비교 영상 — PPTX 슬라이드 4 메시지 그대로.
4. **SpatialAiView.** "누구인지가 아니라, 무엇을 어떻게" 섹션에 Pete 데모(신원 제거 후에도 읽히는 속성). Vision Models 섹션에 iStock 랜드마크(라이선스 확인 후).
5. **ModelsView.** face 모델 카드에 실제 before/after. 합성 webp는 대체 또는 병행.

## D. 신규 이미지 생성안 (브랜드 정합 · `asset-prompts` 컨벤션)

실제 자료로 못 채우는 자리에만 생성합니다. 팔레트: 브랜드 블루 `#376AE2`(dark `#2453C4`), 절제된 다큐멘터리 톤, 16:9. **익명화 "출력"은 생성 금지(실제 자료 사용).**

1. **AnonymizerView 히어로 배경** — `technology/anon-hero-bg.webp`
   > A restrained editorial wide shot of a modern Korean retail interior from an elevated security-camera angle, soft documentary lighting, generic packaging, no readable faces (shot from behind/above). Cool neutral grade with a faint brand-blue #376AE2 ambient tone. Empty negative space on the left for headline overlay. No text. 16:9.
2. **익명화 파이프라인 다이어그램** — `diagrams/anon-pipeline.webp` (또는 SVG 코드로 생성 가능)
   > A clean minimal horizontal process diagram on white: four nodes "입력 → 신원 영역 검출 → 입력 시점 익명화 → 분석 신호 전달", connected by brand-blue #376AE2 arrows, thin line-icons, generous whitespace, executive black/white + single blue accent. Flat, no 3D, no gradient. 16:9.
3. **기존 방식 한계 비교 비주얼** — `diagrams/anon-vs-legacy.webp` (표/SVG 권장)
   > A comparison matrix illustration: rows "원본사용 / 마스킹·블러 / 얼굴교체 / SEAL", columns "법 준수 · 활용도 · 비식별 정확성", check/cross marks, SEAL row highlighted in brand-blue #376AE2. Minimal, flat, white background. 16:9.
4. **엣지 온디바이스 처리** — 기존 `tech-edge-device.webp` 재사용 가능(이미 프롬프트 존재). 신규 불필요.

> 생성 경로: 사진형(1)은 기존 AI 이미지 파이프라인, 다이어그램(2·3)은 **코드(SVG) 생성이 더 정확·가벼움** — 원하시면 바로 SVG로 제작 가능.

## E. 우선순위 업데이트 (technology 섹션)

- **T0:** AnonymizerView에 실제 자료 3종(슬라이더·3분할·Pete) 투입 — 가장 큰 격차.
- **T0:** TechnologyView "Anonymizer Demo" 합성→실영상 교체.
- **T1:** SealView 전체/부분 비교 영상, PPTX 비교표 이식.
- **T1:** SpatialAiView Pete 데모.
- **T2:** 신규 생성 이미지(히어로·다이어그램), ModelsView 실 출력 교체, iStock(라이선스).

## F. 추가 오픈 이슈

6. **합성 실루엣 vs 실제 노이즈 표현 일관성** — 기존 생성 이미지는 실루엣, 실제 출력은 노이즈. anonymizer/seal/models처럼 신뢰가 중요한 페이지는 **실제 노이즈 자료**로, 장식·장면 컷은 실루엣 생성 이미지로 역할 분담.
7. **다국어 영상** — Pete 말풍선 영어 → `/ko`, `/jp`용 자막/현지화 필요.

---

# 고도화 (2026-06-26) — 카피 완성(KO/EN/JP) + 프로젝트 실행계획

> 톤 기준: `brand-canon.ts`의 확정 EN/JP와 일치(SEAL 3약속·signature 등 기존 번역 재사용). ~합니다체 / 결론 우선 / 수식어 절제 / 익명화 결("신원만 제거, 분석은 보존") 유지.

## Part 1 — 섹션별 카피 완성 (KO / EN / JP)

각 배치마다 **확정안 1개**로 정리(대안은 상위 §6 참고). 헤드라인은 굵게.

### 1) AnonymizerView — 히어로 (3분할 영상)

| 요소 | KO | EN | JP |
| --- | --- | --- | --- |
| H1 | **익명화하고도, 그대로 분석합니다.** | **Anonymized — and still fully analyzed.** | **匿名化しても、そのまま分析します。** |
| Sub | 영상은 첫 단계에서 익명화됩니다. 분석은 그 익명화된 영상 위에서 일어나고, 원본은 시스템 어디에도 남지 않습니다. | Footage is anonymized at the very first step. Analysis runs on that anonymized stream — the original is left nowhere in the system. | 映像は最初の段階で匿名化されます。分析はその匿名化された映像の上で行われ、原本はシステムのどこにも残しません。 |
| 영상 캡션 | 원본 → 익명화 → 익명 상태로 추적. 분석은 원본이 아니라 익명화된 영상 위에서. | Original → anonymized → tracked while anonymized. Analysis runs on the anonymized stream, not the original. | 原本 → 匿名化 → 匿名のまま追跡。分析は原本ではなく、匿名化された映像の上で。 |
| 패널 라벨 | 원본 / 익명화 / 익명+추적 | Original / Anonymized / Anonymized + tracked | 原本 / 匿名化 / 匿名＋追跡 |

### 2) AnonymizerView — Mechanism (before↔after 슬라이더)

| 요소 | KO | EN | JP |
| --- | --- | --- | --- |
| Eyebrow | 익명화는 첫 단계입니다 | Anonymization comes first | 匿名化が最初です |
| H2 | **누구가 아니라, 무슨 일을 봅니다.** | **We see what is happening, not who is there.** | **誰かではなく、何が起きているかを見ます。** |
| 슬라이더 라벨 | 원본 ↔ 익명화 | Original ↔ Anonymized | 原本 ↔ 匿名化 |
| 캡션 | 첫 단계에서 익명화. 원본은 시스템 어디에도 남지 않습니다. | Anonymized at the first step. The original is left nowhere in the system. | 最初の段階で匿名化。原本はシステムのどこにも残しません。 |

### 3) AnonymizerView / SpatialAiView — Pete 속성 데모 (킬러)

| 요소 | KO | EN | JP |
| --- | --- | --- | --- |
| Eyebrow | 신원이 아니라, 정보를 읽습니다 | We read information, not identity | 身元ではなく、情報を読みます |
| H2 | **얼굴은 지워도, 맥락은 읽습니다.** | **The face is erased; the context is read.** | **顔は消しても、文脈は読みます。** |
| 본문 | 신원은 되돌릴 수 없게 지우고, AI가 장면을 이해하는 데 필요한 최소 특징만 남깁니다. 그래서 익명화된 영상에서도 성별·연령대, 동선과 자세, 관심과 체류를 읽습니다 — 누구인지는 모른 채로. | Identity is erased beyond recovery; only the minimum features the AI needs to understand the scene are kept. So even on anonymized footage we read gender and age range, movement and posture, attention and dwell — without ever knowing who. | 身元は復元できないように消し、AIが場面を理解するのに必要な最小限の特徴だけを残します。だから匿名化された映像でも、性別・年代、動線と姿勢、関心と滞在を読みます——誰かは分からないまま。 |
| 영상 캡션 | 얼굴은 노이즈. 그래도 읽히는 것 — 연령대·시선·발화. 신원은 없습니다. | The face is noise. Still readable — age range, gaze, speaking. No identity. | 顔はノイズ。それでも読めるもの——年代・視線・発話。身元はありません。 |

### 4) AnonymizerView — Limitation (PPTX "기존 방식 비교표" 이식)

| 요소 | KO | EN | JP |
| --- | --- | --- | --- |
| H2 | **기존 비식별화의 딜레마** | **The dilemma of conventional de-identification** | **従来の非識別化のジレンマ** |
| 본문 | 마스킹·블러는 데이터 가치를 파괴하고, 얼굴 교체는 비식별 여부를 확인하기 어렵습니다. 원본을 그냥 쓰면 위험이 남습니다. SEAL은 셋 다 피합니다 — 식별은 불가능하게, 분석은 원본 수준으로. | Masking and blur destroy the data's value; face-swapping is hard to verify; using the original leaves risk behind. SEAL avoids all three — identification made impossible, analysis kept at original-grade. | マスキング・ぼかしはデータの価値を壊し、顔の置き換えは確認が難しく、原本のまま使えばリスクが残ります。SEALはその三つを避けます——識別は不可能に、分析は原本水準で。 |

비교표 (행/열 라벨):

| KO | EN | JP |
| --- | --- | --- |
| 행: 원본 사용 / 마스킹·블러 / 얼굴 교체 / **SEAL** | Use original / Masking & blur / Face swap / **SEAL** | 原本使用 / マスキング・ぼかし / 顔の置き換え / **SEAL** |
| 열: 법 준수 / 데이터 활용도 / 비식별 정확성 | Legal compliance / Data utility / De-ID accuracy | 法令遵守 / データ活用度 / 非識別の正確性 |

### 5) TechnologyView — "Anonymizer Demo" 캡션 (합성→실영상 교체)

| 요소 | KO | EN | JP |
| --- | --- | --- | --- |
| 캡션 | 실제 출력입니다 — 합성 일러스트가 아니라, 제품이 만든 익명화 영상. | This is real output — the product's own anonymized footage, not a synthetic illustration. | 実際の出力です——合成イラストではなく、製品が生成した匿名化映像。 |

### 6) SealView — 전체 vs 부분 익명화 (PPTX 슬라이드 4)

| 요소 | KO | EN | JP |
| --- | --- | --- | --- |
| Eyebrow | 전체 vs 부분 익명화 | Full vs partial anonymization | 全体 vs 部分匿名化 |
| H2 | **안전이 먼저냐, 활용이 먼저냐 — 둘 다입니다.** | **Safety first or utility first — both.** | **安全が先か、活用が先か——どちらもです。** |
| 본문 | 전체 익명화는 장면 전체를 지워 안전을 극대화합니다. 부분 익명화(SEAL)는 신원만 강하게 지우고 분석에 필요한 신호는 남겨, 같은 영상을 개인정보 침해 없이 계속 활용합니다. | Full anonymization erases the whole scene for maximum safety. Partial anonymization (SEAL) strips only identity while keeping the signals analysis needs — so the same footage stays usable, with no privacy breach. | 全体匿名化は場面全体を消して安全を最大化します。部分匿名化（SEAL）は身元だけを強く消し、分析に必要な信号は残すため、同じ映像をプライバシー侵害なく使い続けられます。 |
| 라벨 | 전체 익명화 · 안전 중심 / 부분 익명화 · 활용성 중심 | Full · safety-first / Partial · utility-first | 全体・安全重視 / 部分・活用重視 |

### 7) ModelsView — face 모델 before/after 캡션

| 요소 | KO | EN | JP |
| --- | --- | --- | --- |
| 캡션 | 같은 인물, 익명화 전과 후. 우측은 제품의 실제 출력입니다. | The same person, before and after anonymization. The right is the product's real output. | 同じ人物の匿名化前と後。右は製品の実際の出力です。 |

### 8) (연계) Home TrustCharter — before↔after 슬라이더

| 요소 | KO | EN | JP |
| --- | --- | --- | --- |
| Eyebrow | 익명화는 첫 단계입니다 | Anonymization comes first | 匿名化が最初です |
| H2 | **누구가 아니라, 무슨 일을 봅니다.** | **We see what is happening, not who is there.** | **誰かではなく、何が起きているかを見ます。** |
| 캡션 | 손잡이를 끌어 보세요 — 첫 단계에서 익명화됩니다. | Drag the handle — it's anonymized at the first step. | ハンドルを動かしてください——最初の段階で匿名化されます。 |

> 미세 검수 메모: EN은 the/a 관사·시제 일관성 확인, JP는 「——」(전각 대시) 사용 통일. 1·2·8의 H2는 `brand-canon.ts` `sealCharter.tagline`과 동일 문자열 → 코드에서 토큰 재사용 권장(중복 입력 방지).

---

## Part 2 — 프로젝트 실행계획

### 2.1 워크스트림

| 코드 | 워크스트림 | 핵심 산출물 |
| --- | --- | --- |
| **L** | 권리·법무 | iStock 라이선스 판정, 초상권·모델 릴리스 확보 |
| **A** | 자산 처리 | 웹용 영상(mp4+webm+poster), webp, 자막, 신규 이미지/SVG |
| **C** | 카피·현지화 | 위 Part 1 KO/EN/JP를 `*.yaml`/뷰에 반영 |
| **B** | 컴포넌트·통합 | 슬라이더 컴포넌트, 뷰별 미디어 삽입 |
| **Q** | QA·배포 | 성능·접근성·i18n·법무·크로스브라우저 검수 |

### 2.2 태스크 정의 (입력·산출·의존·공수·수용기준)

> 공수: S≈0.5d, M≈1–2d, L≈3–5d (1인 기준 추정, 실제 팀 사정 따라 조정).

| ID | 태스크 | 입력 | 산출 | 의존 | 공수 | 수용 기준 |
| --- | --- | --- | --- | --- | --- | --- |
| L1 | iStock 라이선스 판정 | iStock-1504624766 | 사용 가부 결정 | — | S | 웹 게시 허용 여부 문서화 |
| L2 | 초상권·모델 릴리스 | pete / before·after 인물 / partial 행인 | 동의서 또는 대체 결정 | — | M | 노출 인물 전원 동의 or 재촬영/대체 확정 |
| A1 | 영상 트랜스코딩 | 원본 5종 | mp4(h264)+webm(vp9)+poster | L1,L2 | M | 각 ≤4MB, 듀얼코덱, poster 지정 |
| A2 | before/after webp | PNG 2장 | webp 2장 | L2 | S | 용량 50%↓, 시각 손실 없음 |
| A3 | 자막·현지화 | pete 영상 | KO/JP 자막 트랙 or 재제작 | L2,C | M | 3개 로케일 텍스트 동기 |
| A4 | 신규 이미지/다이어그램 | §D 프롬프트 | 히어로 webp + 파이프라인·비교 SVG | C | M | 브랜드 `#376AE2` 정합, 다크/라이트 대응 |
| C1 | 카피 반영 | Part 1 | yaml/뷰 텍스트 | — | M | 3개 로케일 누락 0 |
| B1 | before/after 슬라이더 컴포넌트 | A2 | 재사용 컴포넌트 | A2 | M | 키보드·터치·reduced-motion 지원 |
| B2 | AnonymizerView 개편 | A1,A2,A3,B1,C1,A4 | 히어로영상+슬라이더+Pete+비교표 | 좌측 전부 | L | 시각자료 0→4, LCP 영향 없음 |
| B3 | TechnologyView Demo 교체 | A1,C1 | 합성→실영상 | A1 | S | 합성 목업 제거/대체 |
| B4 | SealView 전체/부분 비교 | A1,C1 | 2-up 비교 영상 | A1 | M | 두 영상 동기 재생·라벨 |
| B5 | SpatialAiView Pete | A1,A3,C1 | 속성 데모 삽입 | A1,A3 | S | "누구 아닌 무엇" 섹션에 배치 |
| B6 | ModelsView before/after | A2,C1 | face 카드 실출력 | A2 | S | 캡션 3로케일 |
| B7 | (연계) Home TrustCharter 슬라이더 | A2,B1,C1 | 홈 신뢰 섹션 강화 | B1 | S | 홈 P0-1과 통합 |
| Q1 | 성능 QA | B2–B7 | 리포트 | B완료 | S | LCP·CLS·총중량 기준 통과 |
| Q2 | 접근성 QA | B2–B7 | 리포트 | B완료 | S | 캡션·aria·reduced-motion |
| Q3 | i18n QA | C1,A3 | 리포트 | C,A3 | S | ko/en/jp 3경로 정상 |
| Q4 | 법무 최종 | B2–B7 | 승인 | L,B완료 | S | 노출 자산 전수 권리 확인 |
| Q5 | 크로스브라우저 | A1,B | 리포트 | B완료 | S | Safari/Chrome/Firefox 코덱·자동재생 |

### 2.3 단계(스프린트) 순서 + 의존 그래프

```
Phase 0 (병렬, 게이트)      Phase 1 (자산·카피)        Phase 2 (통합)           Phase 3 (검수)
┌─ L1 iStock ─┐            ┌─ A1 트랜스코딩 ─┐         ┌─ B1 슬라이더 ─┐         ┌─ Q1 성능
│             ├──gate────► │  A2 webp        ├──────►  │  B2 Anonymizer├──────► │  Q2 접근성
└─ L2 릴리스 ─┘            │  A3 자막        │         │  B3 Tech demo │         │  Q3 i18n
                          │  A4 이미지/SVG   │         │  B4 Seal      │         │  Q4 법무최종
                          └─ C1 카피반영 ────┘         │  B5 Spatial   │         └─ Q5 브라우저
                                                       │  B6 Models    │
                                                       └─ B7 Home(연계)┘
```

- **크리티컬 패스:** L2 → A1 → B2 → Q. (가장 길고, 법무가 막으면 전체가 막힘.)
- **빠른 성과(quick win):** L 게이트와 무관한 **A4 다이어그램(SVG)**·**C1 카피**·**B3(합성 데모 자리 확보)**를 먼저 진행해 체감 진척 확보.
- **권장 분할:** Sprint 1 = L+A+C(자산·카피·권리), Sprint 2 = B(통합), Sprint 3 = Q+배포.

### 2.4 QA 체크리스트

성능 — 영상 총중량 예산(above-the-fold 0, below lazy), poster 지정, `prefers-reduced-motion` 시 정지+poster, LCP 회귀 없음, 이미지 webp/AVIF.
접근성 — 모든 영상에 인접 텍스트 캡션 + `aria-label`, 슬라이더 키보드 조작·포커스 링, 자막 가독 대비, 자동재생은 muted.
i18n — ko/en/jp 3경로 모든 신규 카피 렌더, 줄바꿈(`break-keep`) 깨짐 없음, Pete 자막 로케일 동기, 숫자/용어 정본 일치.
법무·윤리 — 노출 인물 동의, iStock 라이선스, **익명화 출력 위조 금지(실자료만)**, PPTX 옛 수치 미사용(특허 103 정본).
크로스브라우저 — Safari/iOS `playsinline`·autoplay 정책, webm/mp4 폴백, mpeg4 원본 직접 사용 금지(반드시 변환).

### 2.5 리스크 레지스터

| 리스크 | 영향 | 완화 |
| --- | --- | --- |
| 초상권/라이선스 거절 | 크리티컬 패스 차단 | 동의된 모델로 재촬영 / 실루엣 생성 이미지 폴백 / 해당 영상 제외 |
| 영상 용량으로 LCP 저하 | 성능·SEO | below-fold lazy, poster, 4MB 예산, above-fold는 정지 이미지 |
| 합성(실루엣) vs 실제(노이즈) 혼재 | 톤 불일치 | 신뢰 페이지=실자료, 장식=생성 이미지로 역할 분담(§F-6) |
| Pete 자막 현지화 누락 | jp/ko 품질 | A3에서 3로케일 동시 제작, Q3에서 차단 |
| 코덱 미지원(mpeg4) | 일부 브라우저 재생 실패 | A1에서 h264+vp9 듀얼 인코딩 필수 |

### 2.6 완료 정의 (DoD)

각 B 태스크는 — ① 3개 로케일 카피 반영 ② 실자료/승인 자산만 사용 ③ poster·lazy·reduced-motion 처리 ④ 캡션·aria 적용 ⑤ Q1–Q5 통과 — 를 모두 만족할 때 완료로 본다.
