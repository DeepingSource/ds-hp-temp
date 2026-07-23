# Spatial AI · Agentic AI — 카피 + 다이어그램 보강 작업지시서 (v1)

> 작성 2026-07-23 · 대상: `/technology/spatial-ai`(`src/components/corporate/views/SpatialAiView.tsx`, `src/components/mockups/SpatialTrajectoryMockup.tsx`), `/technology/agentic-ai`(`content/site/agentic-ai.yaml`, `src/components/corporate/views/AgenticAiTechView.tsx`)
> 선행 문서: `docs/PLAN_SA_AGENTIC_ROLES_v2.md`(agentic-ai 페이지 역할 계약), `docs/MOCKUP_SYSTEM_GUIDE.md`(목업 컨벤션), `docs/MOCKUP_ELEVATION_ROLLOUT_PLAN_v1.md`, `docs/HOMEPAGE_TIER0_WORK_ORDER_v1.md`(같은 형식의 선례)
> 첨부 이미지: `docs/assets/tech-diagrams-v1/`(flywheel-diagram.png · three-pillar-diagram.png · pipeline-diagram.png) — 러프 개념 스케치. 실제 디자인은 디자이너가 이 톤을 참고해 다시 그릴 것.
>
> **이 문서의 성격.** 실제 코드 변경은 아직 하지 않았다. 대화 세션에서 확정된 카피 초안 2건(spatial-ai 5단계 재구성, agentic-ai "차별점" 섹션 v2)과, 그 위에서 새로 나온 다이어그램/이미지 보강 작업을 하나로 묶어 "누가 이어받아도 바로 실행 가능하도록" 정리했다.

---

## 0. 공통 원칙

1. **카피 소스가 페이지마다 다르다.** spatial-ai는 `SpatialAiView.tsx` 안에 `ko`/`en`/`jp` 객체가 하드코딩돼 있어 그 파일을 직접 고친다(Keystatic CMS 연결 없음). agentic-ai는 `content/site/agentic-ai.yaml`(Keystatic CMS)이 소스라 그 파일을 고치고 generated JSON(`src/data/generated/site-content.json`)이 재생성되는지 확인한다.
2. **새 다이어그램은 기존 목업 컨벤션을 그대로 따른다.** `{ active?: boolean; locale?: Locale; className?: string; content?: DeepPartial<...Copy> }` prop 시그니처, `next/dynamic` 지연 로드, `src/components/mockups/index.ts` 등록. `docs/MOCKUP_SYSTEM_GUIDE.md` §0 표에 완료 기록을 남긴다.
3. **새로 만들기 전에 재고부터 확인했다 — 이미 만들어졌는데 어디에도 안 쓰이는 컴포넌트가 3개 있다.** `AutonomyLadderTimeline`, `PosJoinDiagram`, `PrivacyJourneyMockup`. 이번 작업 중 최소 2개는 신규 제작 없이 이 재고를 꽂아 넣는 것으로 끝난다(§3-1, §3-2, §3-6).
4. **영상 데모 2개(익명화)는 유지한다.** 지난 세션에서 "삭제하지 않고 축소"로 확정했다 — 컴포넌트 교체가 아니라 보강 옵션으로만 다룬다(§3-6).
5. **섹션 하나씩 적용 → 로컬 빌드 확인(`npm run build` 또는 `npx tsc --noEmit`) → ko/en/jp 3로케일 + `prefers-reduced-motion` 확인 → 다음 섹션.**
6. **en/jp는 ko 확정 후 동일 구조로 번역한다.** 이 문서의 카피 표는 ko 기준이다.

---

## 1. spatial-ai 카피 변경

**대상 파일**: `src/components/corporate/views/SpatialAiView.tsx`(`ko` 객체, 46~81줄), JSX 섹션 순서(167~303줄)

**순서 변경**: 히어로 → MTMC 목업(199~204줄, 그대로) + 메커니즘 카드 3개(현재 4개 중 1개 분리) → **신설 "운영 임팩트" 섹션** → 데모 2개(206~250줄, 축소·공통 인트로로 묶음) → References/CTA(279~303줄, 그대로)

### 1-1. 히어로 (46~51줄)

| 필드 | 현재 | 변경 |
|---|---|---|
| heroSub | 물리 공간에서 일하려면, 먼저 그 공간을 읽고 흐름을 이해해야 합니다. 익명화 위에서 공간 지능이 일합니다 — 누구인지가 아니라, 무엇을 어떻게 하는지를. | 물리 공간에서 일하려면, 먼저 그 공간을 읽고 흐름을 이해해야 합니다. 딥핑소스는 이미 매장에 달린 CCTV를 하나의 좌표로 묶어, 사람과 사물이 공간에서 무엇을 어떻게 하는지 읽어냅니다. |

heroBadge·heroTitleA·heroTitleB는 변경 없음.

### 1-2. 메커니즘 카드 (67~72줄 `sections` 배열, 4개 → 3개)

| label | title | body |
|---|---|---|
| Spatial AI | 누구인지가 아니라, 무엇을 어떻게 | 비전 AI는 결국 사람을 봅니다. 공간 지능은 그 시선을 바꿉니다 — 누구인지 가려내는 대신, 사람들이 무엇을 어떻게 하는지 읽습니다. |
| Vision Models | SOTA급 비전 모델 | *(기존과 동일, 변경 없음)* |
| MTMC | MTMC — 흩어진 카메라를 하나로 | *(기존과 동일, 변경 없음)* |

기존 4번째(Output) 항목은 삭제하고 아래 1-3 신설 섹션으로 승격.

### 1-3. 신설 — "운영 임팩트" 섹션

JSX 252~277줄(메커니즘 카드) 다음, 206줄(데모) 이전에 새 `AnimatedSection` 블록 추가.

| 필드 | 카피 |
|---|---|
| eyebrow | Output · 운영 임팩트 |
| title | 하나의 공간 좌표로, 매장이 데이터가 됩니다 |
| body | 여러 카메라의 관측이 하나의 좌표계로 모이면, 입장부터 퇴장까지의 동선과 구역별 체류·밀도·이동 패턴이 통째로 드러납니다. 어디서 사람이 머물다 돌아서는지, 어느 구역이 늘 비어 있는지, 무엇이 상품 앞에서 일어나는지 — 그동안 감으로 판단하던 것들이 근거를 갖게 됩니다. 레이아웃을 다시 짤 근거, 인력을 배치할 근거, 다음 캠페인을 설계할 근거. 보는 것에서 그치지 않고 매장을 운영하는 AI로 이어지는 첫 단계입니다. |

### 1-4. 데모 섹션 통합·축소 (206~250줄)

두 `AnimatedSection`(데모 영상 + 얼굴 검출)을 감싸는 공통 인트로 블록을 그 두 섹션 **앞에** 추가하고, 각 섹션의 본문을 아래처럼 줄인다. 영상(`LoopVideo` 2개)과 caption은 그대로 둔다.

**공통 인트로 (신규 텍스트 블록, 두 데모 섹션 위)**

| 필드 | 카피 |
|---|---|
| eyebrow | 이게 가능한 이유 |
| title | 2018년부터 영상 익명화만 파온 회사이기 때문입니다 |
| body | 신원을 지우는 기술이 먼저 있었기에, 공간 전체를 동의 절차나 규제 리스크 없이 분석할 수 있습니다. GDPR·CCPA·국내 개인정보보호법 기준을 충족하면서, 카메라가 사람을 담아도 신원은 입력 시점에 사라지고 분석에 필요한 신호만 남습니다. |

**데모 1** (`demoTitle`/`demoBody`, 53~56줄) — `demoCaption`은 그대로 유지

| 필드 | 현재 | 변경 |
|---|---|---|
| demoTitle | 얼굴은 지워도, 맥락은 읽습니다. | *(그대로)* |
| demoBody | 신원은 되돌릴 수 없게 지우고, AI가 장면을 이해하는 데 필요한 최소 특징만 남깁니다. 그래서 익명화된 영상에서도 성별·연령대, 동선과 자세, 관심과 체류를 읽습니다 — 누구인지는 모른 채로. | 신원은 되돌릴 수 없게 지우고, 장면 이해에 필요한 최소 특징만 남깁니다. |

**데모 2** (`landmarkTitle`/`landmarkBody`, 60~64줄) — `landmarkCaption`은 그대로 유지

| 필드 | 현재 | 변경 |
|---|---|---|
| landmarkTitle | 찾아내는 건, 지우기 위해서입니다 | *(그대로)* |
| landmarkBody | 비전 모델은 얼굴의 특징점을 정밀하게 찾아냅니다 — 누구인지 알아내기 위해서가 아니라, 어디를 지워야 하는지 짚기 위해서입니다. 검출은 그대로 익명화의 첫 단계로 이어집니다. | 얼굴의 특징점을 정밀하게 찾아내는 이유는 하나 — 어디를 지워야 하는지 짚기 위해서입니다. |

### 1-5. References (74~76줄)

| 필드 | 현재 | 변경 |
|---|---|---|
| referencesBody | 딥핑소스의 공간 지능은 CES 전시, KDDI와의 협업, NVIDIA 생태계 등에서 소개·참조된 바 있습니다. 관련 발표·협업 내역은 참고 자료로 안내해 드립니다. | 2018년부터 영상 익명화 기술을 다듬어 온 딥핑소스는, 그 위에서 공간 지능을 CES 전시, KDDI와의 협업, NVIDIA 생태계 등에서 소개·검증해 왔습니다. 관련 발표·협업 내역은 참고 자료로 안내해 드립니다. |

### 1-6. CTA (78~80줄)

| 필드 | 현재 | 변경 |
|---|---|---|
| ctaSub | 카메라 배치, 좌표화 요건, 분석 목표 — 기술 팀이 직접 답변합니다. | 카메라 배치, 좌표화 요건, 분석 목표 — 기술 팀이 직접 답변합니다. 지금 있는 CCTV 그대로, 도입 가능 여부부터 확인해 드립니다. |

ctaTitle·ctaPrimary는 변경 없음.

---

## 2. agentic-ai 카피 변경

**대상 파일**: `content/site/agentic-ai.yaml`, JSX는 `src/components/corporate/views/AgenticAiTechView.tsx`

### 2-1. 신설 — "차별점" 섹션

**위치**: Beat 2(배경, JSX 113~126줄) 뒤, Beat 3(철학, 128~164줄) 앞. `agentic-ai.yaml`에 새 키 블록 추가, `AgenticAiTechView.tsx`에 `Section variant="default"` 하나 삽입(Beat 2와 동일 패턴 재사용 가능).

| 필드 | 카피 |
|---|---|
| eyebrow | 차별점 |
| heading | 에이전트가 잘하는 이유는, LLM이 아닙니다 |
| body 1문단 | 그 판단, 아무나 낼 수 있는 게 아닙니다. |
| body 2문단 | 에이전트의 실력은 이제 어떤 LLM을 쓰는지로 갈리지 않습니다. 프론티어 모델의 성능은 이미 거기서 거기입니다. 진짜 차이는 하네스·온톨로지·도메인 지식에서 납니다 — 모델을 실제 업무에서 안전하게, 반복해서 작동하게 만드는 뼈대, 매장이라는 도메인을 정확히 표현하는 데이터 구조, 그리고 무엇이 중요한 판단인지 아는 지식. 저희는 매장 운영이라는 한 도메인에만 몇 년째 파고들며 이 세 가지를 쌓아왔습니다. |
| body 3문단 | 그 위에 올릴 데이터도 다릅니다. 이미 있는 CCTV를 익명화하고 MTMC로 정합해 쌓아온 공간 데이터 — 동선·체류·전환 — 는 하루아침에 만들 수 없습니다. |
| body 4문단 | LLM은 저희가 만들지 않습니다. 그럴 필요가 없습니다. 저희 일은 이 도구를 하네스와 온톨로지, 도메인 지식으로 실제 물리 공간 위에서 작동하게 만드는 것입니다. |

시각 보강: §3-3 참고(신규 3-pillar 다이어그램).

### 2-2. 베이스라인 소제목 수정 (agentic-ai.yaml `baselineSub`, 81~84줄)

| 필드 | 현재 | 변경 |
|---|---|---|
| baselineSub | 원칙은 선언만으로 지켜지지 않습니다. 네 가지 기술적 기반이 그 원칙을 실제로 가능하게 합니다. | 방금 말한 하네스와 온톨로지, 그 실체가 이 네 가지입니다. |

베이스라인 카드 4개(익명화 파운데이션·공간 컨텍스트·데이터 연결·학습 루프) 자체는 변경 없음 — 이미 위 주장의 증거로 그대로 쓸 수 있다.

---

## 3. 다이어그램/이미지 작업

### 3-1. 자율화 사다리(L0~L5) → 기존 컴포넌트 `AutonomyLadderTimeline`로 교체

- **현재**: `AgenticAiTechView.tsx` 244~270줄, `<ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">`로 L0~L5를 **같은 크기 카드 6개**로 나열. "사다리"라는 이름과 실제 형태(그리드)가 어긋난다.
- **재고 확인 결과**: `src/components/mockups/AutonomyLadderTimeline.tsx`가 이미 존재하고 **어디에도 쓰이지 않고 있다(orphaned)**. 실제 계단형 타임라인(회색→브랜드 블루 그라데이션, L5에 종착 배지, 클릭 시 상세 카드 확장)을 렌더링하며, 기본 ko 카피가 지금 `agentic-ai.yaml`의 ladder 항목과 이름 순서까지 거의 동일하다(L0 관찰만 → L1 정보 안내 → L2 우선순위 권고 → L3 승인 후 실행 → L4 저위험 자동+사후 → L5 자율 주행 매장).
- **⚠️ 반드시 확인할 것 — footnote 충돌.** `AutonomyLadderTimeline`의 기본 footnote는 "80% 승인률 · 검증된 결과 30건" 같은 **구체적 숫자**를 노출한다. 그러나 `AgenticAiTechView.tsx` 231~233줄 주석에 명시돼 있듯 "수치 임계값은 공개하지 않는다(PLAN_SA_AGENTIC_ROLES_v2 §9, 정성적으로만 유지)"는 방침이 있다. **컴포넌트 기본값을 그대로 쓰면 이 방침을 어기게 된다** — `content` prop으로 반드시 `agentic-ai.yaml`의 기존 `ladderNote`("한 칸을 올라가려면 누적 승인률과 결과 검증 데이터가 쌓여야 하고...")를 주입해 숫자를 가릴 것.
- **구체적 변경**:
  1. `AgenticAiTechView.tsx` 상단에 `const AutonomyLadderTimeline = dynamic(() => import('@/components/mockups/AutonomyLadderTimeline'), { loading: () => <div className="h-[320px] animate-pulse rounded-2xl bg-gray-100" /> });`
  2. 234~276줄(Beat 5 전체 `<Section>`)의 `<ol>` 그리드 블록을 `<AutonomyLadderTimeline locale={locale} content={{ footnote: t.ladderNote }} className="mt-14" />`로 교체(정확한 prop 이름은 컴포넌트 인터페이스 확인 후 맞출 것 — `footnote`가 아닐 수 있음).
  3. `ladderEyebrow`/`ladderHeading`/`ladderSub`는 `Section` 상단 텍스트로 그대로 유지(컴포넌트 자체 eyebrow/heading과 중복되지 않도록 컴포넌트 쪽은 헤더 없이 타임라인 파트만 쓰는 옵션이 있는지 인터페이스 확인).

### 3-2. 베이스라인 "데이터 연결" 카드 → 기존 컴포넌트 `PosJoinDiagram`로 보강

- **현재**: `AgenticAiTechView.tsx` 179~227줄 베이스라인 4카드 중 "데이터 연결" 카드는 텍스트 + 아이콘뿐.
- **재고 확인 결과**: `src/components/mockups/PosJoinDiagram.tsx`가 존재하고 미사용 상태. POS 데이터("무엇이·얼마나")와 saai insight 행동 데이터("왜·어디서")가 "매출이 떨어진 날, 원인까지" 하나의 답으로 합쳐지는 걸 시각화한다 — "데이터 연결" 카드의 설명("POS·재고·외부환경이 이어질수록 하나의 매장 맥락")과 메시지가 정확히 맞는다.
- **⚠️ 결정 필요**: 이 컴포넌트는 `index.ts`에 등록돼 있지 않다(직접 경로 `@/components/mockups/PosJoinDiagram`에서 import해야 함) — 등록 여부 확인. 또한 `content` prop을 지원하지 않아 기본 예시(도시락/음료/스낵)가 그대로 노출된다. 이 예시가 agentic-ai 페이지 문맥에 어색하지 않은지 실제 화면에서 확인하고, 어색하면 (a) 그대로 쓰거나 (b) `content` prop을 받도록 컴포넌트를 소폭 리팩터한다.
- **구체적 변경**: "데이터 연결" 카드(`baseline[2]`, id: `data-linking`) 안쪽, 기존 텍스트 아래에 `<PosJoinDiagram locale={locale} className="mt-4" />` 추가.

### 3-3. 신설 "차별점" 섹션 → 3-pillar 다이어그램 (신규 제작)

- 하네스·온톨로지·도메인 지식 세 개를, 바로 아래 이어지는 철학·베이스라인 섹션의 기존 콘텐츠와 화살표로 연결하는 정적 다이어그램.
- **개념 스케치 첨부**: `docs/assets/tech-diagrams-v1/three-pillar-diagram.png`
- 애니메이션이 필요 없는 단순 3단 레이아웃이라 React 목업 컴포넌트로 만들 필요는 없다 — Tailwind 마크업으로 직접 짜거나, 디자이너가 만든 정적 이미지를 `<Image>`로 삽입해도 충분하다. 카피는 §2-1과 동일한 라벨(하네스/온톨로지/도메인 지식) + 하단 3개는 "이미 있는 근거" 태그로 각각 학습 루프+사다리 / 공간 컨텍스트+데이터 연결 / "묻기 전에 먼저 제안한다"를 가리킨다.

### 3-4. 신규 "이해 → 학습 → 최적화 → 전파" 순환 다이어그램 (`LearningFlywheelDiagram`, 신규 컴포넌트)

- **다른 컴포넌트와 혼동 주의**: `src/components/mockups/IntegratedLoopDiagram.tsx`가 이미 있지만 이건 **다른 개념**이다 — saai 3제품(Insight/Care/Agent)이 하나의 "익명화 이벤트 허브"를 공유하는 데이터 플레인 다이어그램이고(`HOMEPAGE_TIER0_WORK_ORDER_v1.md` §1-4에서 홈페이지 배치가 논의 중), 이번에 필요한 건 "시간이 지날수록/매장이 늘수록 더 똑똑해진다"는 컴파운딩 루프다. 이름과 자리를 분리해서 만들 것 — `IntegratedLoopDiagram`을 재활용하려 하지 말 것.
- **개념 스케치 첨부**: `docs/assets/tech-diagrams-v1/flywheel-diagram.png`
- **배치**: agentic-ai 페이지, 베이스라인(Beat 4) "학습 루프" 카드와 자율화 사다리(Beat 5) 사이, 또는 사다리 뒤·CTA 앞. 학습 루프 카드가 "매장 하나 안에서 도는 루프"만 말하고 있어서, 이 다이어그램이 "그 배움이 다른 매장으로도 퍼진다"는 다음 단계를 자연스럽게 이어받는다.
- **컴포넌트 스펙** (§4에 상세)

### 3-5. spatial-ai 메커니즘 카드 → 파이프라인 시각 보강

- **재고 확인 결과**: `VisionCoordinatesMockup.tsx`는 이름과 달리 "Vision 2031"(5개년 회사 로드맵) 다이어그램이라 **이 용도와 무관** — 헷갈리지 말 것.
- 대신 `SpatialTrajectoryMockup.tsx`(35줄, `steps: ['픽셀', '카메라', '공간 좌표']`)가 이미 페이지 상단에서 이 파이프라인을 애니메이션 칩으로 보여주고 있다 — 3개 메커니즘 카드 섹션(§1-2)에는 그 시각 언어를 정적으로 축소 재사용하는 게 새 컴포넌트를 만드는 것보다 낫다.
- **개념 스케치 첨부**: `docs/assets/tech-diagrams-v1/pipeline-diagram.png`(카메라 영상 → 검출·자세·재식별 → 공간 좌표)
- 3개 카드 중 "MTMC" 카드(§1-2 세 번째) 안쪽, 텍스트 아래에 이 파이프라인 스트립을 추가하는 정도로 충분 — 별도 섹션 불필요.

### 3-6. spatial-ai 익명화 섹션 → `PrivacyJourneyMockup` 보강 여부 검토

- **재고 확인 결과**: `PrivacyJourneyMockup.tsx`가 존재, 미사용. 캡처→익명화(모자이크)→신호 추출→픽셀 폐기→이벤트 허브 도착까지 5단계(①~⑤) 프라이버시 여정을 하나의 다이어그램으로 보여준다 — §1-4에서 통합한 "이게 가능한 이유" 공통 인트로의 메시지와 구조적으로 정확히 겹친다.
- **⚠️ 결정 필요**: 지난 세션에서 영상 데모 2개는 "유지"로 확정했다. 이 컴포넌트를 넣는다면 **대체가 아니라 공통 인트로 옆/아래에 추가 보강**하는 용도로 한정할 것. 정확한 기본 카피는 외부 데이터 파일(`@/data/mockup-scenarios/technology`)에서 오므로, 실제 반영 전에 그 파일을 열어 라벨이 spatial-ai 문맥과 어긋나지 않는지 확인 필요.

### 3-7. agentic-ai 히어로 이미지 부재

- **현재**: `AgenticAiTechView.tsx` 87~111줄 히어로는 다크 배경 + 텍스트만, 이미지 슬롯이 아예 없다. spatial-ai 히어로(아이소메트릭 매장 이미지)와 대비된다.
- **⚠️ 결정 필요**: 이 페이지는 파일 상단 주석(21~30줄)에 명시된 역할 계약상 "제품 화면·기능 시나리오 금지"(그건 `/products/saai-agent` 몫) 규칙이 있다. `ActionCardMockup` 같은 제품 목업을 히어로에 쓰면 이 규칙을 어길 소지가 있다. `HOMEPAGE_TIER0_WORK_ORDER_v1.md` §1-1(정적 배경 무드 이미지 + 오버레이, 제품 화면이 아닌 추상적 톤)과 같은 방식을 권장 — 구체적 이미지 asset은 디자인팀 확정 필요.

---

## 4. 신규 컴포넌트 스펙 — `LearningFlywheelDiagram`

```ts
// src/components/mockups/LearningFlywheelDiagram.tsx
interface FlywheelNode { n: string; title: string; desc: string }
interface LearningFlywheelCopy {
  eyebrow: string;
  heading: string;
  lead: string;
  nodes: [FlywheelNode, FlywheelNode, FlywheelNode, FlywheelNode]; // 이해·학습·최적화·전파
  centerLabel: { big: string; small: string };
}
interface LearningFlywheelDiagramProps {
  active?: boolean;
  locale?: Locale;
  className?: string;
  content?: DeepPartial<LearningFlywheelCopy>;
}
```

**기본 ko 카피**

| 필드 | 값 |
|---|---|
| eyebrow | Compounding Loop |
| heading | 한 매장에서 배운 건, 모든 매장이 씁니다 |
| lead | 공간을 읽고(이해) → 판단을 다듬고(학습) → 매장이 나아지고(최적화) → 그 배움이 다른 공간으로 퍼집니다(전파). 이 루프는 멈추지 않습니다 — 공간이 늘수록, 다음 이해는 더 정확해집니다. |
| nodes[0] 이해 | 공간을 읽습니다 / 익명화된 CCTV + MTMC로 동선·체류·밀도를 하나의 좌표로 기록합니다. |
| nodes[1] 학습 | 판단을 학습합니다 / 권고 → 승인/반려 → 실행 → 검증. 사람이 물리친 것도 데이터가 됩니다. |
| nodes[2] 최적화 | 매장이 나아집니다 / 레이아웃·인력·캠페인 판단이 근거를 갖고 정확해집니다. |
| nodes[3] 전파(강조) | 다른 공간으로 퍼집니다 / 한 매장에서 검증된 패턴이, 비슷한 매장의 다음 권고에도 반영됩니다. |
| centerLabel | 계속 도는 루프 / 공간이 늘수록 이해도 깊어집니다 |

**시각 구성**: 다크 카드(`bg-slate-950`~`bg-slate-900` 그라데이션, `SpatialTrajectoryMockup`/`IntegratedLoopDiagram`과 동일 톤). 4개 노드를 상/우/하/좌에 배치하고 곡선 화살표로 시계 방향 순환 연결, "전파→이해" 구간만 실선+브랜드 블루로 강조(나머지는 점선). "전파" 노드에 "핵심" 배지. 중앙에 "계속 도는 루프" 라벨. 참고 이미지: `docs/assets/tech-diagrams-v1/flywheel-diagram.png`(러프 스케치, 최종 비주얼은 디자이너 확인 필요 — 특히 01 노드 텍스트와 화살표가 겹치는 부분은 실제 구현 시 여백 조정).

---

## 5. 준비물 요약 표

| 작업 | 방식 | 상태 |
|---|---|---|
| 자율화 사다리 (§3-1) | 기존 컴포넌트 재사용 | `AutonomyLadderTimeline` 이미 존재, 미사용 — footnote 오버라이드 필수 |
| 데이터 연결 카드 (§3-2) | 기존 컴포넌트 재사용 | `PosJoinDiagram` 이미 존재, 미사용 — index.ts 미등록, content override 미지원 |
| 차별점 3-pillar (§3-3) | 신규, 정적 이미지/마크업으로 충분 | 개념 스케치 완료 |
| 이해-학습-최적화-전파 (§3-4) | 신규 컴포넌트 제작 | 개념 스케치 완료, 스펙 §4 |
| 메커니즘 파이프라인 (§3-5) | 기존 시각 언어 재사용 | `SpatialTrajectoryMockup`의 스텝 칩 패턴 재사용, 새 컴포넌트 불필요 |
| 익명화 여정 (§3-6) | 기존 컴포넌트 재사용 검토 | `PrivacyJourneyMockup` 이미 존재, 미사용 — 대체 아닌 보강으로만 |
| agentic-ai 히어로 이미지 (§3-7) | 신규 이미지 필요 | 방향만 제안, 실제 asset 미정 — 디자인팀 확정 필요 |

---

## 6. 권장 실행 순서

1. **§1 spatial-ai 카피 변경** — 텍스트만 바꾸는 작업, 리스크 가장 낮음.
2. **§2 agentic-ai 카피 변경** — CMS 텍스트만, 리스크 낮음.
3. **§3-1 자율화 사다리 교체** — 기존 컴포넌트 재사용이라 구현은 빠르지만, footnote 오버라이드를 놓치면 방침 위반이 조용히 배포될 수 있어 리뷰 시 반드시 확인.
4. **§3-2 데이터 연결 카드 보강** — 기존 컴포넌트, `index.ts` 등록 여부만 먼저 확인.
5. **§3-5 메커니즘 파이프라인** — 기존 시각 언어 재사용, 가벼움.
6. **§3-3 차별점 3-pillar** — 정적 자산이라 가벼움.
7. **§3-4 이해-학습-최적화-전파 다이어그램** — 신규 컴포넌트 제작, 이번 작업 중 가장 무거움.
8. **§3-6 / §3-7** — 둘 다 "결정 필요" 항목이라 디자인/PM 확정 후 마지막에.

---

## 7. 부수 발견 이슈 (범위 밖, 기록만)

- `IntegratedLoopDiagram`은 `HOMEPAGE_TIER0_WORK_ORDER_v1.md` §1-4에서 홈페이지 배치가 별도로 논의 중이다. 이번 문서의 `LearningFlywheelDiagram`(§3-4)과 시각적으로 톤이 비슷해 보일 수 있으니, 두 문서를 같이 작업하는 사람이 있다면 두 컴포넌트가 서로 다른 메시지(제품 데이터 플레인 vs. 컴파운딩 학습 루프)를 담당한다는 걸 헷갈리지 않도록 공유할 것.
- `PosJoinDiagram`/`PriorityEngineDiagram`/`DoorSplitDiagram`/`PrivacyJourneyMockup`/`AnonymizationMockup` 등 `src/components/mockups/`에 이미 존재하지만 어디에도 안 쓰이는 컴포넌트가 이번에 확인된 것만 5개다. 목업 재고 전체를 한 번 감사해서 "재고 vs 실제 사용" 표를 `MOCKUP_SYSTEM_GUIDE.md`에 추가하면, 앞으로 이런 문서 작성할 때마다 매번 grep으로 재확인하지 않아도 된다 — 별도 작업으로 제안.
- `PriorityEngineDiagram`은 agentic-ai 페이지에 매력적으로 보일 수 있으나, `AgenticAiTechView.tsx` 자체 주석(21~30줄)의 역할 계약("제품 화면·기능 시나리오 금지")에 정면으로 걸린다 — 이 페이지에 절대 쓰지 말 것. `/products/saai-agent` 페이지 몫이다.
