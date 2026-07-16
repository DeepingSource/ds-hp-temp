# DeepingSource 제품 라인업 재정비안 — 약속(S·A·A·I) → 제품(운영 루프) 2층 구조

**문서 유형** 홈페이지 라인업 검토·제안 (Web Spec 보조 문서)
**대상 영역** 홈페이지 프로덕트 라인업 섹션 — `FeatureCarousel` (`src/components/corporate/FeatureCarousel.tsx`)
**작성** SA Team · Jamin · **일자** 2026-07-01 · **버전** v2 (Part II 명명 체계 추가)
**기준 SOT**
- Naming Grammar v1.5 §1-17(SAAI 조어 재정의)·§1-18(클로버 의미 은퇴) — `brand-system/01_brand_system/SAAI_Naming_Grammar_v1.md`
- Brand Architecture v4.0 §1 Promise Hierarchy — `SAAI_Brand_Architecture_v4.md`
- External Brand Brief v1.2 §6(익명화)·§7(포지셔닝)·§8(아키텍처) — `02_messaging/SAAI_External_Brand_Brief_v1.md`
- 사이트 카피 캐논 — `DS_NEW_HP/src/lib/brand-canon.ts`

> **결정 반영(2026-07-01):** 구조 방향 = **약속(기둥) → 제품(루프) 2층 분리** 확정. 본 문서는 그 결정을 구조·카피·섹션 배치로 전개한다.

---

## 1. 한 장 요약

사용자가 소개하려는 네 개념 — **Spatial · Anonymized · Agentic · Intelligence** — 은 우산 브랜드 **SAAI의 네 글자 풀어쓰기**(Naming Grammar v1.4 §1-17에서 *Spatial Agentic AI*를 대체한 정본)다. 즉 라인업에 새 개념을 얹는 것이 아니라, **이미 이름 안에 있던 약속을 표면으로 끌어올리는 일**이다.

핵심 진단은 이렇다. 현행 라인업 섹션(`FeatureCarousel`)은 **"하나의 운영 루프, 네 개의 제품"** — 즉 *운영 루프 4단계*(관찰·분석·제안·학습 → count·insight·care·agent)로 잘 짜여 있다. 여기에 S·A·A·I를 얹으려 할 때 가장 흔한 실수는 **네 기둥을 네 제품에 1:1로 겹치는 것**인데, 이는 Naming Grammar v1.5 §1-18이 명시적으로 **은퇴**시킨 "이름 네 글자 = 클로버 네 잎 = 운영 루프" 삼중 잠금과 같은 오류다. **두 개의 4는 성격이 다르다.**

그래서 제안하는 구조는 **두 층의 분리**다.

| 층 | 이름 | 질문 | 성격 |
|---|---|---|---|
| **약속 층** | **S·A·A·I 네 기둥** | *무엇으로 만들어졌나* | 자산 지도 — 모든 제품이 공유하는 근거 |
| **제품 층** | **운영 루프 4제품** | *무엇을 하나* | 운영 지도 — 매일 받는 한 사이클 |

약속 층은 "왜 믿는가"(익명화·공간·에이전틱·학습)를 세우고, 제품 층은 "매일 무엇을 받는가"(count·insight·care·agent)를 보여준다. 라인업 섹션은 **약속 층을 짧은 도입으로 먼저 세우고 → 기존 4제품 캐러셀로 자연히 내려오는** 흐름으로 정제한다.

---

## 2. 현행 진단 — 라인업 섹션은 무엇을 하고 있나

`FeatureCarousel`은 다음을 한다(현행, KO 기준).

- **에이브로우** `Products` · **헤딩** "하나의 운영 루프, 네 개의 제품" · **서브** "문 밖의 흐름부터 다음 한 수까지 — SAAI가 익명으로 잇습니다."
- 다크 스포트라이트 카드가 4제품을 자동 순환: `store count`(Measure) → `store insight`(Analyze) → `store care`(Detect) → `store agent`(Act). 각 제품에 태그라인·설명·제품 이미지.
- CTA "제품 전체 보기" → `/products`.

**강점(유지).** 운영 루프 서사가 명료하고, 제품이 시간축(어제·지금·다음)과 1:1로 붙어 정보구조가 좋다. "SAAI가 익명으로 잇습니다"라는 한 줄에 이미 *익명화*와 *잇기(사이를 메우기)*가 들어 있다.

**공백(정제 대상).**

1. **약속의 근거가 암시로만 존재.** "익명으로 잇습니다"는 결론만 있고, *왜 믿는가*(익명화-first·공간 인지·행동·학습)의 네 기둥이 섹션 안에서 명시되지 않는다. 방문자는 제품 4개는 보지만 **그 아래 공통 토대는 못 본다.**
2. **운영 루프 라벨의 이중화.** 캐러셀 stage는 `Measure·Analyze·Detect·Act`(영문)인데, 브랜드 캐논의 운영 루프 정본은 `관찰·분석·제안·학습 / Observe·Analyze·Suggest·Learn`이다. 라벨이 두 벌로 갈린다 — 정합 필요.
3. **SAAI 풀어쓰기가 라인업에서 안 보인다.** *Spatial Anonymized Agentic Intelligence*가 홈 표지·카테고리 줄에만 있고, 정작 "제품이 왜 이렇게 넷인가"를 설명해야 할 라인업 자리에서 이름의 의미가 놀고 있다.

---

## 3. 핵심 구조 결정 — 왜 "두 층"인가

### 3.1 두 개의 4는 겹치면 안 된다

| | **S·A·A·I (약속의 4)** | **운영 루프 (제품의 4)** |
|---|---|---|
| 정체 | 이름 네 글자 = 브랜드 자산 | 관찰·분석·제안·학습 = 매일의 사이클 |
| 지도 | 자산 지도 (무엇으로 만드나) | 운영 지도 (무엇을 하나) |
| 순서성 | **무순서·병렬** (동시에 참인 네 근거) | **순서·방향·닫힘** (루프) |
| 제품 매핑 | **모든 제품이 넷 다 상속** | 제품별 1:1 (count·insight·care·agent) |

Naming Grammar v1.5 §1-18은 클로버(네 잎)를 운영 루프(관찰·분석·제안·학습)에 의미 연결하는 것을 **완전 은퇴**시켰다. 근거는 *"정적·무순서 네 잎 ↔ 순서·방향·닫힘의 루프 — 형태 불일치"*. **같은 논리가 S·A·A·I에도 그대로 적용된다.** S·A·A·I는 무순서 병렬 근거이고, 운영 루프는 순서 있는 사이클이다. 둘을 1:1로 겹치면 은퇴시킨 오류를 이름 층에서 되살리는 셈이다.

→ **결론:** S·A·A·I는 제품 위에 겹치지 않고, **제품 아래에 토대로 깔린다.** 네 기둥은 네 제품 각각이 딛고 선 공통 지반이다.

### 3.2 CEO 자산 지도 ↔ 운영 지도 프레임과 정합

Naming Grammar §4-5, Architecture v4 §4에 이미 같은 이분법이 미결 항목으로 서 있다 — *"3×3 = 운영 지도(무엇을 실행하는가) · 문법 = 자산 지도(무엇으로 만드나)"*. 본 2층 구조는 그 프레임을 **라인업 섹션에서 처음으로 시각화**하는 것이다: 위(자산/약속) = S·A·A·I, 아래(운영/제품) = 루프 4제품.

---

## 4. 약속 층 — S·A·A·I 네 기둥 (신설)

우산 브랜드 **SAAI = Spatial Anonymized Agentic Intelligence** · 카테고리어 **익명화 공간 AI / Anonymized Spatial AI**. 네 글자를 "모든 제품이 서 있는 네 개의 근거"로 소개한다.

| 글자 | 기둥 | 한 줄 약속 | SOT 근거 자산 |
|:-:|---|---|---|
| **S** | **Spatial · 공간** | POS 너머, 공간의 상태와 흐름을 읽는다. | MTMC 다카메라 추적 — 공간 크기와 무관 (External Brief §7.3) |
| **A** | **Anonymized · 익명화** | 얼굴을 남기지 않는다 — 원본 미보존·사람 미열람·재식별 불가. | SEAL 3약속 · GDPR Recital 26 (External Brief §6) |
| **A** | **Agentic · 에이전틱** | 보는 데서 멈추지 않고 다음 한 수를 제안한다 — 권고는 AI, 결정은 사람. | 관찰·분석·제안·학습 루프 (brand-canon `operatingLoop`) |
| **I** | **Intelligence · 인텔리전스** | 실행 결과를 학습해 운영 기준을 고도화한다. | Store → Site Intelligence 서사 (STK 브로셔 §0.2) |

### 4.1 읽는 순서 vs 딛는 순서 — 반드시 짚을 지점

이름의 **읽는 순서**는 S-A-A-I(Spatial 먼저)지만, 데이터가 **딛는 순서**는 **Anonymized가 1번**이다. SEED 카테고리 strict ordering에서 *익명화가 1번 자리인 이유는 그 위에 쌓이는 모든 것이 익명화된 데이터 위에서만 작동하기 때문*이다(Architecture v3.4 §5.1, v4에서 불변). 라인업 도입 카피는 이 둘을 혼동하지 않게 처리한다 — **네 기둥을 병렬로 세우되, 익명화가 "먼저 서는 자리"임을 한 줄로 명시**한다("모든 것은 익명화 위에서 시작합니다").

### 4.2 카테고리어 표기 규칙 (라인업 섹션 적용)

- 공식 외부 노출: **익명화 공간 AI / Anonymized Spatial AI** (카테고리 정의)
- 우산 풀어쓰기(라인업 도입에서 1회): **Spatial Anonymized Agentic Intelligence (SAAI)**
- 금지: *Smart Store · AI Store · Spatial AI 단독* (External Brief §8.4·컨벤션 플레이북 C4)

---

## 5. 제품 층 — 운영 루프 4제품 (현행 유지 · 라벨 정제)

제품 층은 현행 캐러셀을 유지하되, **stage 라벨을 브랜드 캐논 정본으로 통일**한다.

| 제품 | 시간축 | 운영 루프(정본) | 현행 라벨 | → 정제 |
|---|:-:|:-:|:-:|:-:|
| **store count** | 문 밖 | (도입/측정) | Measure | **Observe · 관찰** |
| **store insight** | 어제 | 분석 | Analyze | **Analyze · 분석** (유지) |
| **store care** | 지금 | 제안(알림) | Detect | **Suggest · 제안** 또는 관찰 어휘 정렬 |
| **store agent** | 다음 | 학습→실행 | Act | **Learn/Act · 다음** |

> **주의:** count는 운영 루프 4단계(관찰·분석·제안·학습)의 정식 멤버가 아니라 *루프의 입구(문 밖 측정)*다. 라벨을 억지로 4단계에 끼우기보다, **"문 밖(count) → 루프 안(insight·care·agent)"** 2단으로 두는 편이 정직하다. 최종 라벨 세트는 브랜드 카운슬 확인 항목(§8).

제품별 태그라인·기능 카테고리는 `brand-canon.ts` 정본을 그대로 쓴다: insight *어제를 읽다 / 공간 분석 AI*, care *지금을 알리다 / 이상 감지 AI*, agent *다음을 실행하다 / 운영 제안 AI*.

---

## 6. 두 층의 브릿지 — 약속이 제품으로 이어지는 흐름

라인업 섹션 안에서 두 층을 잇는 한 문장이 필요하다. 네 기둥(약속)이 어떻게 네 제품(운영)으로 내려오는지.

> **네 개의 근거가 하나의 루프로 돌아갑니다.**
> 익명화된 공간(S·A) 위에서, 에이전틱하게 제안하고(A), 학습으로 고도화합니다(I) — 그 한 바퀴가 store count · insight · care · agent입니다.

이 문장이 "약속 층 → 제품 층" 전환을 담당한다. 시그니처 *사이를 메웁니다*와도 정합한다(네 기둥 사이, 문 밖과 다음 한 수 사이).

---

## 7. 홈페이지 반영 — 섹션 배치안

`HomeView` 현행 흐름은 hero → problem → **product(FeatureCarousel)** → case → trust(익명화) → capability(MTMC) → solutions → CTA → breadth → proof → close 다. 두 층 구조는 **라인업 섹션 내부에 도입 블록을 추가**하는 방식으로, 현행 서사 순서를 깨지 않고 얹는다.

```
[FeatureCarousel — 재구성]
 ├ (신설) 약속 층 도입 : "SAAI, 네 글자에 담은 약속"
 │        Spatial · Anonymized · Agentic · Intelligence 4-업 그리드
 │        + 익명화-first 한 줄("모든 것은 익명화 위에서")
 ├ (브릿지 한 줄)      : "네 개의 근거가 하나의 루프로"
 └ (유지) 제품 층      : count → insight → care → agent 캐러셀
```

- **약속 층 도입**은 무거운 신규 컴포넌트 없이, 캐러셀 상단 헤딩/서브 영역을 **4-업 pill 그리드**로 확장하면 된다(기존 다크 카드 톤 재사용).
- **trust(익명화) 섹션과의 관계:** 약속 층은 익명화를 *네 기둥 중 하나로 짧게* 세우고, 하단 `TrustCharter` 섹션이 익명화를 *깊게* 증명한다 — 중복이 아니라 **예고 → 회수** 구조. (익명화가 #1 차별점이므로 이 예고-회수는 오히려 강화.)
- 익명화 데이터 흐름(RAM 즉시 익명화·원본 미저장)의 상세는 라인업이 아니라 `/technology/seal`·`TrustCharter`에 둔다 — 라인업은 *약속의 이름표*까지만.

---

## 8. 라인업 섹션 카피 뱅크 (재작성 초안 · KO/EN)

기존 `FeatureCarousel` COPY 구조에 얹을 수 있는 형태로.

### 8.1 약속 층 도입 (신설)

**KO**
- 에이브로우: `SAAI`
- 헤딩: **네 글자에 담은 약속** *(Spatial Anonymized Agentic Intelligence)*
- 4-업:
  - **Spatial** — 공간을 읽습니다. POS 너머 흐름까지.
  - **Anonymized** — 얼굴을 남기지 않습니다. 모든 것의 시작.
  - **Agentic** — 다음 한 수를 제안합니다. 결정은 사람이.
  - **Intelligence** — 학습으로 기준을 높입니다.
- 브릿지: **네 개의 근거가, 하나의 루프로 돌아갑니다.**

**EN**
- Eyebrow: `SAAI`
- Heading: **Four letters, one promise** *(Spatial Anonymized Agentic Intelligence)*
- 4-up:
  - **Spatial** — reads the space, beyond the POS.
  - **Anonymized** — leaves no faces. Where everything begins.
  - **Agentic** — proposes the next move. People decide.
  - **Intelligence** — learns, and raises the bar.
- Bridge: **Four foundations, one loop.**

### 8.2 제품 층 (현행 헤딩 정제)

- KO 헤딩: "하나의 운영 루프, 네 개의 제품" → **유지**. 서브만 브릿지와 정합: "네 개의 근거가 도는 한 바퀴 — 문 밖의 흐름부터 다음 한 수까지, SAAI가 익명으로 잇습니다."
- EN 헤딩: "One operating loop, four products" → **유지**.

---

## 9. 미결·의존 (브랜드 카운슬 확인 필요)

1. **SAAI 대외 풀어쓰기 표기 확정** — 외부 기사 *Spatial Agentic AI* vs 내부 SOT *Spatial Anonymized Agentic Intelligence*가 아직 갈린다(STK 브로셔 v1.0 부록 미결). 라인업이 풀어쓰기를 노출하므로 **이 결정이 선행**되어야 한다. 미결 시: 카테고리어(익명화 공간 AI / Anonymized Spatial AI)만 노출하고 풀어쓰기는 툴팁/보조로.
2. **운영 루프 stage 라벨 세트 확정** — count 포함 4단계(Measure·Analyze·Detect·Act)를 정본 관찰·분석·제안·학습으로 통일할지, "문 밖 + 루프 3" 2단으로 둘지(§5).
3. **약속 층 아이콘/모티프** — 네 기둥의 시각 식별자. 클로버는 순수 시각 식별자로만 존속(의미 발화 금지, NG §1-18) — 네 기둥에 클로버 네 잎을 재의미화하지 않는다.

---

## 10. 다음 단계 (제안)

1. §9-1(풀어쓰기 표기)·§9-2(루프 라벨) 브랜드 카운슬 확인 — **선행**.
2. 확정 후 `FeatureCarousel.tsx`에 약속 층 4-업 블록 + 브릿지 한 줄 반영(KO/EN/JP), stage 라벨 캐논 정합.
3. `brand-canon.ts`에 네 기둥 카피를 정본으로 추가(라인업이 인라인 문자열을 갖지 않도록 — 현행 캐논 규칙 준수).
4. 반영 후 홈 라인업 섹션 스크린샷 QA(약속→브릿지→제품 흐름, 익명화 예고-회수 확인).

— SA Team · Jamin · 2026-07-01 · 라인업 2층 구조 v1 초안

---
---

# Part II — Tech와 제품 라인의 명명 (추가 검토)

> **추가 배경:** Part I이 "약속(S·A·A·I) → 제품(운영 루프)"의 *수직 2층*을 세웠다면, Part II는 그 두 층 사이를 잇는 **명명 체계** — tech(SEED)를 어떻게 부르고, 제품을 `saai agent` 식(가치 브랜드)으로 부를지 — 를 다룬다. 기준 SOT는 **Naming Grammar v1.5 §0·§1**(품사=층, 3단 위계)과 **Architecture v4 §0-6 solution-first**.

## 11. 명명 문법 3층 — 사이트 현황 대조

명명 문법의 핵심은 **"이름의 품사가 곧 층"**이다.

| 층 | 품사 | 조어식 | 예 | 고객이 사는 것 | 사이트 현황 |
|---|---|---|---|---|---|
| 🌱 **SEED** (tech) | 기술 명사 | `{TECH}` | SEAL · MTMC · Anonymizer | (안 삼 — 신뢰 근거) | `/technology` ✅ 정합 |
| 💧 **SOURCE** (도구) | **동사** | `saai\|store\|space + {verb}` | store count · saai fit | 도구(행위) | store count를 제품과 **동급 진열** ⚠️ |
| 🍽 **SOLUTION** (제품) | **가치어** | `saai + {value}` | **saai insight · saai care · saai agent** | 결과(가치) | 사이트는 `store {value}`로 노출 ⚠️ |

그리고 SOLUTION 안에는 **3단 위계**가 있다(§1-12):

1. **가치 브랜드** `saai care` — 도메인 무관·영속 (**고객 전달의 기본 단위**, §1-11)
2. **도메인 구현체** `store care` — 매장 구현
3. **고객 에디션** `saai care for {Customer}` — 예: saai care for GS25

## 12. 라이브 불일치 2건 — 진단

### 12.A 고객 표면이 `store {value}`인데, SOT는 `saai {value}`로 열라고 한다

- **현황:** 헤더 내비·`/products`·홈 캐러셀 모두 **store insight · store care · store agent**(도메인 구현체 = 2단)를 1차 이름으로 노출.
- **SOT:** Naming Grammar §1-11 — *"고객 대화·외부 발화는 항상 가치 브랜드(saai {value})로 시작. SOURCE 도구는 내부 설계·입문 장치, 고객 앞 단독 주연 금지."* Architecture v4 §0-6 — *solution-first: 가치로 열고, 구현체로 계약한다.* §0-7 — *saai 척추 회복(검색 고유성).*
- **결과:** 사이트는 지금 **2단(구현체)으로 열고 있어**, 문법이 정한 **1단(가치 브랜드)** 진입을 건너뛴다. saai 척추가 제품 이름에서 사라져, "잘 불리지 않던 saai"(§1-15 명명 실증)를 되돌리려던 리브랜딩 목적과 어긋난다.

### 12.B store count가 3개 제품과 동급 4번째로 진열된다

- **현황:** 홈 캐러셀·내비가 **"네 개의 제품 = count · insight · care · agent"**로 넷을 나란히 둔다.
- **문제:** store count는 **동사(SOURCE 도구)**, 나머지 셋은 **가치어(SOLUTION 결과)**. 문법상 **다른 층**이다. 넷을 동급으로 진열하면 §0의 판별 원리("동사면 도구, 가치어면 결과")가 표면에서 무너진다.
- **단, 실용적 예외 근거:** store count는 단품 판매·입문 도구로서 홈에서 존재감이 필요하다(§0 주석: "단품으로 팔려도 동사라서 도구임이 자명"). → **제거가 아니라 층을 구분해 배치**하는 것이 해법.

## 13. Tech(SEED)를 네 기둥 아래 "증거"로 매핑

Part I의 네 기둥(약속)은 추상이고, **tech(SEED)는 그 약속을 지키는 구체 자산**이다. 사이트 `/technology`가 이미 이 자산들을 갖고 있으므로, **기둥 ↔ tech를 연결**하면 "왜 믿는가"가 클릭 한 번으로 증명된다.

| 기둥 (약속) | 받치는 Tech (SEED) | 사이트 경로 |
|---|---|---|
| **Anonymized** | **SEAL · Anonymizer** (익명화 1번 · GDPR) | `/technology/seal` · `/technology/anonymizer` |
| **Spatial** | **MTMC / Spatial AI** (다카메라 추적) | `/technology/spatial-ai` |
| **Agentic** | **Vision Models + 추론/에이전트 레이어**(두뇌) | `/technology/models` |
| **Intelligence** | **학습 루프**(결과→기준 고도화) | 서사(운영 루프·Site Intelligence) |

> 즉 라인업의 약속 층(Part I §4)에서 각 기둥 pill을 해당 tech 페이지로 연결하면, **약속 → 증거(tech) → 제품**이 한 흐름으로 닫힌다. 익명화만 tech 두 개(SEAL·Anonymizer)를 갖는 것도 "익명화 1번"의 무게와 정합.

## 14. 핵심 결정 — 제품을 `saai agent` 식으로 부를 것인가

사용자 제기(*"saai agent 식으로 명명"*)의 핵심. 세 옵션.

### 옵션 A — 전면 `saai {value}` 전환 (SOT 정본 그대로)

홈·내비·제품 페이지의 1차 이름을 **saai insight · saai care · saai agent**로. `store {value}`는 각 제품 페이지 안에서 "매장 도메인 구현체"로 서술.

- **장점:** 문법 100% 정합. saai 척추 회복(검색 고유성). 가치 브랜드로 열어 도메인 확장(space) 시 이름 안 바뀜.
- **단점:** 대규모 표기 이행(내비·URL·SEO·기존 자산 storecare.ai/saai.store와의 관계 재정리). "store"의 구체성(매장이라는 즉각적 이해)을 1차 표면에서 잃음.

### 옵션 B — 이중 표기: `saai insight`(가치) + `store insight`(구현체) 병기 ★ 권고

홈 라인업·제품 표제에서 **가치 브랜드를 주(主), 구현체를 종(從)**으로 병기. 예: 표제 **saai insight**, 부제 *매장 구현체 — store insight*. 내비는 점진 이행.

- **장점:** solution-first(가치로 연다)를 지키면서 store의 구체성도 보존. §1-12의 3단 위계를 표면에서 그대로 시연. 이행 리스크 낮음(병기 → 단계 전환).
- **단점:** 표기가 길어짐 — 자리마다 주/종 규칙을 명확히 해야 함(아래 §15 규칙).

### 옵션 C — 현행 `store {value}` 유지 + saai는 우산에만

제품은 store로 두고, saai는 우산 브랜드 표기(카테고리 줄·풀어쓰기)에서만.

- **장점:** 이행 비용 0. **단점:** §1-11·§1-15·v4 §0-6/0-7 정본과 계속 어긋남 — 리브랜딩 목적 미달. 비권고.

> **권고: 옵션 B.** 문법 정본(A)을 지향하되 사이트 현실(C)을 감안한 **가교**. 홈 라인업부터 "가치 브랜드 주 + 구현체 종" 병기로 시작해, 안정화 후 내비·URL을 A로 수렴.

> **[결정 갱신 2026-07-16]** URL은 `/products/saai-*`로 전환 완료(SITE_IMPROVEMENT P1-3, 301 리다이렉트). 표기는 **saai 전면 확정 — count 포함**: `productNaming.count`에 `saai: 'saai count'` 추가(콘텐츠_수정확장_실행계획 §7 #2). §12.B·§15의 "count는 SOURCE 도구라 store 유지" 논거는 이 결정으로 대체된다 — count도 제품 층에서 `saai count`(주) + `store count`(종) 병기. SOURCE 도구라는 내부 설계 관점은 유효하나 표면 호명은 saai로 통일.

## 15. 통합 명명 스파인 — 한 장 (약속 → tech → 도구 → 제품)

옵션 B 기준, 라인업이 참조할 **표면별 호명 규칙**.

```
우산 브랜드   SAAI  ·  Spatial Anonymized Agentic Intelligence  ·  익명화 공간 AI
                    │
약속 층(기둥)   Spatial ── Anonymized ── Agentic ── Intelligence     (Part I §4)
                    │           │           │           │
증거 층(tech)   MTMC/       SEAL·        Vision       학습 루프        (SEED · /technology)
              Spatial AI   Anonymizer    Models
                    │
도구 층(SOURCE) store count  (saai fit …)  — 입문 장치, 라인업에서 "루프의 입구"로 별도 배치
                                             [2026-07-16 갱신: 표면 호명은 saai count(주)+store count(종)]
                    │
제품 층(SOLUTION)
   가치 브랜드(주)   saai count  ·  saai insight  ·  saai care  ·  saai agent
   도메인 구현체(종)  store count    store insight    store care    store agent
   고객 에디션        saai care for {Customer}
```

**표면별 규칙(옵션 B):**

| 표면 | 주 이름 | 종(부제) | 비고 |
|---|---|---|---|
| 홈 라인업 카드 | **saai insight** 등 | *store insight* | 가치 브랜드로 표제 |
| 제품 상세 표제 | **saai care** | *매장 구현체 store care* | 본문은 store로 서술 가능 |
| 내비게이션 | (점진) saai care | store care 병기 | URL은 `/products/store-care` 당분간 유지 |
| store count | **store count**(동사 그대로) | — | SOLUTION 아님 — "루프의 입구"로 분리 진열 |
| tech | SEAL·MTMC·Anonymizer | — | 기술 명사 불변 |

## 16. 라인업 섹션 개정 (Part I §7 갱신)

Part I의 라인업 구조에 명명 층을 반영하면:

```
[FeatureCarousel — 재구성 v2]
 ├ 약속 층      : Spatial·Anonymized·Agentic·Intelligence 4-업
 │               (각 pill → 해당 tech 페이지 링크 · §13)
 ├ 브릿지       : "네 개의 근거가 하나의 루프로"
 ├ 제품 층(루프) : saai insight · saai care · saai agent   ← 가치 브랜드 주
 │               (부제로 store insight/care/agent 병기)
 └ 입구         : store count 를 루프 앞 "문 밖" 자리에 분리 표기
```

- 캐러셀 헤딩 "하나의 운영 루프, 네 개의 제품"은 **"하나의 운영 루프, 세 개의 saai 제품 + 문 밖의 store count"** 구조로 정직화(카피는 다듬어 자연스럽게).
- 또는 헤딩 유지하되 store count에 시각적 "입구" 마커(문 아이콘)를 줘 층 차이를 암시.

## 17. Part II 미결 (브랜드 카운슬)

1. **옵션 A/B/C 택일** — 권고 B. 확정 시 홈 라인업부터 병기 적용.
2. **store count 진열 처리** — "4번째 제품" vs "루프의 입구" 분리. §16 두 안 중 택일.
3. **내비/URL 이행 범위** — `/products/store-*` URL 유지하면서 라벨만 saai로 갈지, URL까지 이행할지(SEO 영향 — Part I §의 홈페이지 평가 P0 색인 이슈와 함께 판단).
4. **외부 자산 정렬** — storecare.ai · saai.store를 3단 위계(가치/구현체/에디션) 어디에 붙일지.

— SA Team · Jamin · 2026-07-01 · Part II(tech·제품라인 명명) 추가 → 문서 v2
