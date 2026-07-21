# SAAI 제품 체계 재설계 — saai suite 도입 v1

작업일: 2026-07-20 · 대상: /ko/products 및 하위 제품 페이지 5종
근거: brand-system(Brand Architecture v4 · Naming Grammar v1.5 · External Brand Brief v1) + 실제 페이지 감사

---

## 0. 한 줄 요약

개별 제품 페이지(insight·care·agent·count·functions)는 **이미 완성도가 높고 아키텍처와 대부분 정합**한다. 이번 작업의 핵심은 새 문구를 쓰는 것이 아니라 **① saai suite 개념을 위계에 정식 삽입, ② 페이지 간 라벨·네이밍 일관성 확보, ③ 명백한 버그(기능 페이지 영문·구 SAAI 카피) 정리**다.

---

## 1. 확정 제품 위계 (brand-system 정본 + 이번 결정)

```
DeepingSource (회사)
└ SAAI  (플랫폼·우산 · 익명화 공간 AI)
   비전: Perfect Every Space — "모든 공간을, 완벽하게"
   │
   ├ saai suite  ★신규★  (엔터프라이즈 SOLUTION 패키지)
   │  = 세 모드가 하나의 익명화 루프로
   │   ├ saai insight — ANALYZE · 어제 (분석·이해)
   │   ├ saai care    — DETECT  · 지금 (감지·알림)
   │   ├ saai agent   — ACT     · 다음 (제안·실행/위임)
   │   └ 학습(LEARN)  · 다시 — 결과가 다시 입력으로 (루프 닫힘, 제품 아님)
   │
   ├ SOURCE 도구 (입문 다리)
   │   store count(OBSERVE·유입) + 기능 라이브러리 12개(count·census·trail·gaze·
   │   wait·tide·keep·shelf·motion·fit·pop·talk) — 한 기능이 세 모드를 가로지름
   │
   └ SEED 기술 기반 (믿는 근거)
       SEAL · anonymizer · spatial AI · vision models

B2C 구현 (별도 사이트): saai.store · storecare.ai
```

**핵심 원칙 (정본)**
- **solution-first:** 가치 브랜드(saai {value})로 열고, 구현체(store {value})로 계약하고, 도구(store count)는 입문의 다리.
- **Branded House + saai 척추:** 모든 제품은 SAAI 우산 아래, 디지털 표면엔 saai 동반 노출.
- **운영 루프:** 어제를 읽고(insight) → 지금을 짚고(care) → 다음을 제안·실행하고(agent) → 다시 배운다(학습).

---

## 2. saai suite 정의 (신규 · 위계의 빈칸을 메움)

정본엔 "세 가치 브랜드를 하나로 묶어 파는 엔터프라이즈 패키지"의 이름이 없었다. **saai suite가 그 자리다.**

> **saai suite** — saai insight·care·agent가 하나의 익명화 운영 루프로 도는 **엔터프라이즈 제품 패키지**. SAAI 우산 아래 SOLUTION 계열의 묶음 단위. 그 아래 SOURCE 도구(store count·기능 라이브러리)가 입문, SEED(SEAL 등)가 기술 기반.

- **한 줄 소개(제안):** "엔터프라이즈는 saai suite 하나로 — 세 모드가 한 루프."
- 표기: 소문자 `saai suite` (로고·본문 공통, saai 척추 유지).
- ⚠ brand-system 정식 반영 필요 항목 — 담당자 확인 권장(위계에 신규 층 추가).

---

## 3. 라벨 · 시간축 · 네이밍 표준 (전 페이지 공통)

| 모드 | 영문 라벨 | 시간축 | 한 줄 |
|---|---|---|---|
| saai insight | **ANALYZE** | 어제 | 어제를 읽어, 왜 그랬는지까지 |
| saai care | **DETECT** | 지금 | 지금을 감지해, 필요한 순간만 |
| saai agent | **ACT** | 다음 | 다음을 정해, 실행까지 (권고는 AI·결정은 사람) |
| (학습) | LEARN | 다시 | 결과가 다시 입력으로 |
| store count | **OBSERVE** | 입문 | 유입을 세는 첫 걸음 → insight로 |

**⚠ 라벨 충돌 — agent:** 현재 기능 페이지는 agent를 **"Advise"**(권고)로 표기. 우리 결정은 **ACT**(실행). agent의 포지셔닝("보는 AI를 넘어, 운영하는 AI" · "다음을 실행하다")엔 ACT가 더 맞으므로 **전 페이지 ACT로 통일** 권장(기능 페이지 Advise→ACT). "권고는 AI가, 결정은 사람이"는 서술 문장으로 안전선 유지.

**네이밍 표기 규칙 (정본 기반)**
- 가치 브랜드(헤드라인): `saai insight` · `saai care` · `saai agent`.
- 구현체(대시보드·계약): `store insight` · `store care` · `store agent`.
- SOURCE 도구(기능): `store count` … `store talk` (전부 `store {verb}`).
- **혼용 주의:** count 페이지가 eyebrow는 `saai count`, 본문·기능표는 `store count`로 섞임. 원칙상 count는 SOURCE 도구이므로 **본문 표기는 `store count`로 통일**, 페이지 진입(solution-first)만 `saai count` 허용.

---

## 4. /products 페이지 IA 재편 (suite 반영)

| # | 섹션 | 방향 |
|---|---|---|
| 1 | 히어로 | "모든 공간을, 완벽하게" + **suite 한 줄**("엔터프라이즈는 saai suite 하나로 — 세 모드가 한 루프") |
| 2 | 운영 루프 다이어그램 | insight(어제)→care(지금)→agent(다음)→학습(다시) · count는 OBSERVE 입문 층으로 바깥에 |
| 3 | **saai suite = 3모드** (핵심) | insight·care·agent 카드 · 라벨 ANALYZE·DETECT·ACT · 각 "자세히 보기" |
| 4 | SOURCE 도구·기능 라이브러리 | store count(입문) + 12기능×3모드 매트릭스 진입 |
| 5 | SEED 기술 기반 | SEAL·anonymizer·spatial AI·vision models |
| 6 | 카테고리 | "카테고리는 하나 — 익명화 공간 AI" (유지) |
| 7 | B2C 구현 | saai.store · storecare.ai (별도 사이트) |
| 8 | 용어 + CTA | 유지 |

**현재 /products에서 고칠 것**
- 루프 라벨 `관찰(care)` → **DETECT(care)**, `제안(agent)` → **ACT(agent)**. 순서 지금·어제·다음 → **어제·지금·다음·다시**.
- **SAAI 네 글자 섹션이 구 카피** — 랜딩과 동일하게 수정: Anonymized "얼굴을 남기지 않습니다"→"누구인지 남기지 않습니다" / Agentic "다음 한 수를 제안합니다"→"무엇을 바꿀지 짚어줍니다" / Intelligence "학습으로 기준을 높입니다"→"쓸수록 정확해집니다".
- "SAAI Suite — 세 모드가 하나의 루프로" 섹션 → **saai suite 정식 도입 문구**로 승격.

---

## 5. 페이지별 감사 & 방향

### 5.1 saai insight — 상태: ★ 우수 (기준 페이지)
- H1 "POS가 못 센 것을 봅니다." · 퍼널(1,160→382→317→65) · 문 밖/문 안 · insight→agent 핸드오프 · 숫자 읽는 법(기간비교·또래보정·출처구분) · 12기능×모드까지 완비.
- **유지.** 손볼 것: (1) ref상 "saai count"와 "store count"가 한 페이지에 혼재 → `store count`로 통일. (2) "예시" 주석 일관 유지. (3) 라벨 노출 시 ANALYZE 통일.
- 이 페이지의 구조가 **care·agent·count 페이지의 표준 템플릿**이 되어야 함(문제→대시보드→before/after→기능×모드→핸드오프→CTA).

### 5.2 saai care — 상태: 양호
- H1 "누가 일해도, 언제나 완벽한 매장." · "지금을 알리다" · 본사 다점포 대시보드 + storecare.ai(B2C) 이중 구조.
- 방향: (1) 라벨 **DETECT·지금** 명시. (2) B2C(storecare.ai)와 엔터프라이즈(saai care) 경계를 더 또렷이 — 이 페이지는 **엔터프라이즈(본사)** 중심, B2C는 링크로. (3) "saai count·saai insight처럼 saai care도 본사로 모입니다" → suite 소속임을 한 줄로.

### 5.3 saai agent — 상태: 양호
- H1 "보는 AI를 넘어, 운영하는 AI." · "다음을 실행하다" · 대화형 화면·액션 카드·발주서.
- 방향: (1) 라벨 **ACT·다음**. (2) 히어로 서브 "매장의 다음 한 수를 함께 결정합니다"의 **"다음 한 수" 제거** → "다음에 무엇을 할지 함께 결정합니다"(전 페이지 통일). (3) "권고는 AI, 결정은 사람" 카드 유지(안전선).

### 5.4 store count — 상태: 양호 (이미 '기능' 포지셔닝 완료)
- "count는 기능입니다 — 네 번째 제품이 아닙니다" → **우리 결정과 정확히 일치.** 유지.
- 방향: (1) 표기 `saai count`↔`store count` 혼용 → **`store count`로 통일**(진입만 saai 허용). (2) OBSERVE·입문 도구 위상 명시("insight로 가는 첫 걸음"). (3) 라벨 OBSERVE.

### 5.5 기능 라이브러리(functions) — 상태: ⚠ 버그(영문 렌더링)
- **본문이 한국어 미번역 · 영문 폴백 상태** — 최우선 수정(개발). 매트릭스·설명 전부 국문화 필요.
- 라벨: care=Detect·insight=Analyze·agent=**Advise** → **ACT로 교체**(§3).
- 구조(12기능×3모드 매트릭스 + "count is a function" + "한 줄 추가로 세 제품 경험")는 훌륭 — 국문화만.

---

## 6. 개발 / QA 액션 아이템 (제품 라인)

1. **functions 페이지 국문화** — 본문 전체 영문 폴백. 최우선.
2. **agent 라벨 통일** — 기능 페이지 "Advise" → **ACT**.
3. **/products 루프 라벨·순서** — care=DETECT, agent=ACT, 순서 어제·지금·다음·다시.
4. **/products SAAI 네 글자 섹션 구 카피** — 랜딩 §3 수정본으로 교체(누구인지/무엇을 바꿀지/쓸수록 정확).
5. **네이밍 혼용 정리** — count·insight 페이지의 `saai X`↔`store X` 혼용을 규칙(§3)대로.
6. **"다음 한 수" 잔존** — agent 히어로 등 제품 라인 전체에서 제거.
7. **saai suite 정식 반영** — /products "SAAI Suite" 섹션을 정식 개념으로 승격 + brand-system 위계 갱신(담당자 확인).

---

## 7. 랜딩 파급 (앞선 랜딩 개정안 v1 갱신 필요)

- **섹션4:** count를 4번째 탭에서 제외 → *3개 모드(insight·care·agent) + count 입문 도구* 구조로. 라벨 ANALYZE·DETECT·ACT + OBSERVE(count 입문).
- **섹션7:** ANALYZE·DETECT·ACT 유지(정합).
- **섹션2 루프 칩:** 어제·지금·다음·다시 (정합).
- suite 개념을 랜딩 제품 섹션에도 한 줄 반영 검토.

---

*근거: brand-system/01_brand_system/SAAI_Brand_Architecture_v4.md · SAAI_Naming_Grammar_v1.md · 02_messaging/SAAI_External_Brand_Brief_v1.md / 실제 페이지 5종 감사(2026-07-20)*
