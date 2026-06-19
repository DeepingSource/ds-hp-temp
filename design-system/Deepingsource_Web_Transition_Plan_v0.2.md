---
title: saai-web → deepingsource.io 전환 계획서 v0.2
subtitle: v0.1 실측 검증 후 IA 매트릭스·Phase 재정렬
company: 딥핑소스 (Deeping Source Inc.)
version: v0.2
date: 2026-05-28
author: SA Team · Jamin
target_repo: /Users/jamin.park/Downloads/SAAI Design System/saai-web → 향후 deepingsource.io 빌드
parent: Deepingsource_Web_Transition_Plan_v0.1.md
brand_architecture:
  - deepingsource.io — 회사 사이트 (본 작업 대상)
  - saai.store — B2C (별도 운영 중)
  - storecare.ai — StoreCare (별도 운영 중)
charter: The Charter of Spatial Agentic AI v0.7.4
---

# saai-web → deepingsource.io 전환 계획서 v0.2

> v0.1을 실측한 결과 페이지 카운트·i18n 진척도가 가정과 달랐다. v0.2는 *어떻게 만들 것인가*가 아니라 *지금 어디에 있는가*에서 다시 출발한다.

## 0. v0.1 대비 변경 요약

| 영역 | v0.1 가정 | v0.2 실측 | 결정 |
|---|---|---|---|
| 한글 페이지 수 | 28 | 32 (+4) | IA 매트릭스 재작성 |
| 영문 i18n | v0.4로 미룸 | /en/* 10 페이지 **이미 존재** | Phase 2와 동시 갱신 |
| /cases (+[slug]) | 미인식 | 실재 | **/products/saai로 통합** (외부분기) |
| /spaces · /spatial-ai | 미인식 | 실재 | **둘 다 유지** (역할 분담) |
| /partnership | /ms-agent로 명명 | /partnership으로 명명됨 | 명칭 통일 (v0.2는 /partnership) |
| 신설 6 페이지 | 계획됨 | 0 구축 | Phase 3~4 그대로 유지 |
| 총 페이지 (한글+영문+시스템) | 31 (목표) | 44 (현재) → **약 50~52** (목표) | 카운트 갱신 |

핵심 한 문장 — **v0.1의 골격은 유효하다. 단, IA 매트릭스와 Phase 5의 i18n 워크는 갱신이 필요하다.**

---

## 1. 갱신된 페이지 결정 매트릭스

### 1.1 결정 6종 + 카운트 (한글 32 페이지 기준)

| 결정 | 의미 | v0.1 | v0.2 |
|---|---|---|---|
| **유지** | 그대로 둠 | 17 | **19** |
| **재구성** | 골격·콘텐츠 대폭 변경 | 5 | **5** |
| **외부분기** | 안내 카드로 축소 + 외부 도메인 링크 | 3 | **5** (+/cases, +/cases/[slug]) |
| **통합** *(신설 결정)* | 다른 페이지로 흡수 후 301 | 0 | **2** (/cases, /cases/[slug]) |
| **삭제** | 폴더 자체 제거 | 0 | 0 |
| **신설** | deepingsource.io 신규 페이지 | 6 | **6** (불변) |

한글 32 페이지 → 신설 6 → **목표 36 한글 페이지** (통합 처리로 카운트 +2 줄어듬)
\+ 영문 i18n 10 페이지 (Phase 2에서 동시 갱신) → **총 46 페이지**

### 1.2 v0.1 결정표 갱신분만 (변경되는 항목)

| 현 경로 | v0.1 결정 | v0.2 결정 | 비고 |
|---|---|---|---|
| `/cases` | 미인식 | **통합** | `/products/saai` Hero·사례 섹션으로 흡수. 301 → `/products/saai#cases` |
| `/cases/[slug]` | 미인식 | **통합** | 사례 데이터는 `lib/data/cases.ts` 유지, UI는 `/products/saai`에서 노출. 개별 slug 301 → `/products/saai#case-${slug}` |
| `/spaces` | 미인식 | **유지** | 적용 공간 카탈로그. `/industries`와 차이: industries=업종 / spaces=공간 단위 |
| `/spatial-ai` | 미인식 | **유지·강화** | 기술 설명 본본문. `/technology`와 차이: technology=R&D 자산 / spatial-ai=카테고리 정의 |
| `/partnership` | /ms-agent로 명명 | **유지** (명칭 통일) | 파트너십 자료실. v0.2 이후 모든 문서에서 `/partnership` 사용 |
| `/storeagent/blog` | 재구성 → `/blog` | **재구성 → `/blog`** (변경 없음) | storeagent 종속에서 회사 블로그로 격상 |

### 1.3 외부분기 5건 — 301 redirect 맵 (Phase 5 입력)

```
/cases                       → /products/saai#cases
/cases/[slug]                → /products/saai#case-${slug}
/storecare                   → 카드 페이지 (자체) → storecare.ai
/storeagent/sample           → 카드 페이지 (자체) → saai.store
/pricing, /pricing/simulator → /pricing 카드 페이지로 변경 (자체 유지·재구성)
/storeagent/pricing          → /pricing 카드 페이지로 통합
```

### 1.4 신설 6 페이지 — 위치 확정

| 새 경로 | 위치 | v0.1 대비 변경 |
|---|---|---|
| `/products` | app/products/page.tsx | 불변 |
| `/products/saai` | app/products/saai/page.tsx | **`/cases` 콘텐츠 흡수** |
| `/careers` | app/careers/page.tsx | 불변 |
| `/history` | app/history/page.tsx | 불변 |
| `/press` | app/press/page.tsx | 불변 |
| `/investors` | app/investors/page.tsx (P2 선택) | 불변 |

---

## 2. i18n 동시 갱신 정책 (v0.2 신설)

### 2.1 현 영문 라우팅

```
/en              (홈)
/en/about
/en/cases
/en/company
/en/enterprise
/en/partnership
/en/spaces
/en/storeagent
/en/storecare
/en/storeinsight
```

10 페이지. 한글 페이지의 부분집합(주요 페이지만 영문화). 신설 6 페이지·`/products` 허브 영문 미존재.

### 2.2 Phase 2~4에서의 영문 동시 갱신 원칙

1. **한글 변경 시 영문 동시 작업** — `app/page.tsx` 변경 시 `app/en/page.tsx`도 동시 PR
2. **카피 소스 분리** — `lib/copy/home.ts` (한글) ↔ `lib/copy/home.en.ts` (영문) 또는 `home.ts`가 `{ko, en}` 객체 반환. 현재 구조 확인 후 결정
3. **신설 6 페이지** — `/products`, `/careers`, `/history`, `/press` 영문본 동시 빌드. `/investors`는 P2 유지
4. **`/en/cases` 처리** — 통합 결정 동일 적용. `/en/cases` → `/en/products/saai#cases` 301

### 2.3 Phase 별 영문 작업 추가

| Phase | 한글 작업 | 영문 추가 작업 |
|---|---|---|
| 2 | `/` Hybrid 재구성 | `/en` Hybrid 동시 갱신 |
| 3 | `/products` 허브 + 외부분기 | `/en/products` 신설 + `/en/cases` 통합 301 |
| 4 | `/careers`·`/history`·`/press` 신설 | `/en/careers`·`/en/history`·`/en/press` 동시 신설 |
| 5 | 도메인 전환·301·sitemap | `hreflang` 태그 + 영문 sitemap 분기 |

---

## 3. /spaces vs /spatial-ai vs /technology vs /industries 역할 분담 (v0.2 신설)

4 페이지의 역할이 흐려질 위험 → 명확히 구분.

| 페이지 | 1차 질문 | 1차 자산 | 페르소나 |
|---|---|---|---|
| `/spatial-ai` | **카테고리 정의** — 공간 AI란 무엇인가 | 카테고리 정의 문구, 헌장 §1~§2, 4단계 루프 | 신규 방문자·언론·인재 |
| `/technology` | **R&D 자산** — 우리의 기술적 우위 | 특허 169·NVIDIA Inception·논문·아키텍처 다이어그램 | 투자자·기술 리더·파트너 |
| `/spaces` | **적용 공간 카탈로그** — 공간 단위 (편의점·약국·카페·매대 등) | 공간별 카드·핵심 메트릭 | 본사·다점포 운영자 |
| `/industries` | **업종별 도입 사례** — 업종 단위 (리테일·F&B·약국 등) | 업종 카드 + `/cases` 흡수 후 사례 일부 노출 | 업종별 의사결정자 |

### 3.1 콘텐츠 중복 회피 규칙

- 카테고리 정의 문구는 `/spatial-ai`만
- 특허·NVIDIA·논문은 `/technology`만
- 공간 단위 분류는 `/spaces`만
- 업종 단위 분류는 `/industries`만
- 다른 페이지에서 위 4 토픽을 다룰 때는 *해당 페이지로 링크*

---

## 4. Phase 로드맵 갱신 (v0.1 §8 갱신분)

### Phase 1 — IA·메시지 결정 (W1, 5 영업일) — **본 v0.2가 산출물**

**완료 항목**
- ~~`Deepingsource_Web_Transition_Plan_v0.2.md`~~ ✓ (본 문서)
- 페이지 결정 매트릭스 32 → 36 한글 + 10 영문 = 46 총 페이지
- /cases 통합 결정 (외부분기 5건 확정)
- /spaces vs /spatial-ai vs /technology vs /industries 역할 분담

**잔여 항목 (Phase 2 시작 전)**
- `SAAI_Copy_Deck_v0.2.md` — 회사 페이지 6개 카피 추가
- 영문 카피 원천 결정 (한·영 1파일 vs 분리)
- /investors 포함 여부 확정 (P1 vs P2)

**Gate**: v0.2 합의 + 카피 골격 1차 리뷰 통과

### Phase 2 — 홈 Hybrid 재구성 (한글 + 영문 동시) (W2, 5 영업일)

**파일 (v0.1 §8 + v0.2 추가)**
- `app/page.tsx`, `app/en/page.tsx` 동시 변경
- `lib/copy/home.ts` (한·영 통합 또는 분리)
- `components/sections/ProductLineupCards.tsx` 신규
- `components/sections/CompanyTrustStrip.tsx` 신규
- 외부 도메인 카드 컴포넌트 (↗ 표시)

**Gate**: 한·영 빌드 통과 + 5질문 자가점검 + LCP < 2.0s

### Phase 3 — `/products` 허브 + /cases 통합 + 외부분기 (W3, 5 영업일)

**파일**
- `app/products/page.tsx`, `app/en/products/page.tsx` (신설)
- `app/products/saai/page.tsx`, `app/en/products/saai/page.tsx` (신설, `/cases` 흡수)
- `app/cases/page.tsx`, `app/cases/[slug]/page.tsx`, `app/en/cases/page.tsx` → **삭제 또는 301 stub**
- `app/storecare/page.tsx`, `app/en/storecare/page.tsx` (재구성 — 외부분기)
- `app/storeagent/sample/page.tsx` (재구성)
- `app/storeagent/pricing/page.tsx` (재구성·통합)
- `app/pricing/page.tsx`, `app/pricing/simulator/page.tsx` (재구성)
- `next.config.ts` — redirects 5건 추가

**Gate**: 외부 링크 모두 `rel="noopener"`·`target="_blank"`·↗ 표기 + 301 매트릭스 5건 확인

### Phase 4 — `/careers` · `/history` · `/press` 신설 (한·영 동시) (W4, 5 영업일)

**파일 (v0.1 + 영문)**
- `app/careers/page.tsx`, `app/en/careers/page.tsx`
- `app/history/page.tsx`, `app/en/history/page.tsx`
- `app/press/page.tsx`, `app/en/press/page.tsx`
- `lib/copy/careers.ts`, `history.ts`, `press.ts` (한·영 통합 또는 분리)
- `lib/data/timeline.ts`, `press-items.ts`

**Gate**: 6 카피 슬롯 자가점검 통과 (한·영 각각)

### Phase 5 — 도메인 전환 + SEO 마이그 + hreflang (W5~6, 10 영업일)

**v0.1 작업 + v0.2 추가**
- DNS·SSL 설정
- **301 리다이렉트 매트릭스 5건** (§1.3) — `next.config.ts`
- **sitemap.xml + sitemap-en.xml 분리**
- **hreflang 태그** — 한·영 페이지 쌍 매핑 (10 페이지 → 6 신설 추가 = 16 쌍)
- robots.txt 갱신
- schema.org Organization (v0.1 §9.4)
- Lighthouse·CrUX 측정

**Gate**: 모바일 LCP < 2.0s · 한·영 페이지 hreflang 정확성 · Search Console 양 언어 색인 요청

### Phase 6 (선택) — `/investors` + Beyond Retail (W7+)

i18n이 Phase 2~4로 옮겨졌으므로 Phase 6은 `/investors` + 마스터 v0.4 일정으로 가벼워짐.

---

## 5. 자가점검 갱신 (v0.1 §11 + v0.2 추가)

| # | 점검 | v0.1 → v0.2 |
|---|---|---|
| T1 | 헌장 5질문 통과 | 불변 |
| T2 | 3사이트 분리 라우팅 명확 | 불변 |
| T3 | 외부분기 ↗ + rel="noopener" | **5건으로 확대** (/cases 추가) |
| T4 | 신설 6 카피 헌장 어휘 통과 | 불변 |
| T5 | 메시지 마스터 5행 자수 ≤ 20 | 불변 |
| T6 | 301 매트릭스 점검 | **5건 + 영문 5건 = 10건** |
| T7 | sitemap.xml 갱신 | **한·영 분리 sitemap** |
| T8 | 모바일 LCP < 2.0s | 불변 |
| T9 | Asset Spec v0.2 갱신 | 불변 |
| T10 | 카피덱 v0.2 갱신 | **한·영 모두** |
| **T11 (신설)** | hreflang 태그 정확성 | 16 페이지 쌍 매핑 검증 |
| **T12 (신설)** | /spaces /spatial-ai /technology /industries 역할 중복 0 | §3.1 4개 회피 규칙 |

---

## 6. 위험 갱신 (v0.1 §12 + v0.2 추가)

| 신규 위험 | 완화 |
|---|---|
| **i18n 동시 작업 부담 ×2** — 한글만 변경하고 영문 누락 위험 | Phase 별 Gate에 *한·영 동시 통과* 항목 추가. CI에 `/en/*` 빌드 검사 |
| **`/cases` slug별 백링크 손실** — 통합 시 슬러그가 사라짐 | 각 slug → `/products/saai#case-${slug}` 앵커 301. 본문에 `id`로 앵커 보존 |
| **`/spaces`와 `/industries` 사용자 혼동** — 두 페이지 모두 *적용 영역* 같음 | §3 역할 분담 + 헤더 네비에 둘을 별도 카테고리로 노출 (예: 제품 메뉴 vs 솔루션 메뉴) |
| **`/spatial-ai`와 `/technology` 콘텐츠 표류** | §3.1 회피 규칙 + Phase 2에 콘텐츠 감사 1회 추가 |

---

## 7. v0.2 산출물 체크리스트

- [x] `Deepingsource_Web_Transition_Plan_v0.2.md` (본 문서)
- [ ] `SAAI_Copy_Deck_v0.2.md` — 회사 6 페이지 + 영문본 추가
- [ ] `SAAI_Web_Asset_Spec_v0.2.md` — 회사 자산 8개 + 영문 OG 추가
- [ ] 영문 카피 원천 구조 결정 (한·영 통합 vs 분리)
- [ ] Phase 2 진입 합의

---

## 부록 A. v0.1 § 인용 가이드

v0.2는 *변경 사항만* 명시합니다. 다음 v0.1 섹션은 그대로 유효합니다:

- v0.1 §0 Executive Summary — *6~7주 일정* 그대로
- v0.1 §2 브랜드 아키텍처 — 3사이트 구조 불변
- v0.1 §3 회사 메시지 마스터 5행 — 카피 그대로
- v0.1 §5 Hybrid 홈 와이어 — 불변
- v0.1 §6 신설 6 페이지 카피 골격 — 불변
- v0.1 §7 헌장 5질문 매핑 — 불변
- v0.1 §9 SEO 마이그 — schema.org Organization 그대로
- v0.1 §10 Asset Spec 차이 — 불변
- v0.1 §13 Phase 5 산출물 체크리스트 — §5 T6·T7·T11 갱신만 반영

## 부록 B. 변경 이력

### v0.2 (2026-05-28) — 실측 검증 후 IA 갱신
- 실측 페이지 카운트 반영: 한글 28 → 32, 영문 0 → 10 (이미 존재)
- `/cases` (+[slug]) 처리 결정: `/products/saai`로 **통합** (외부분기 5건으로 확대)
- `/spaces`, `/spatial-ai` 처리 결정: **둘 다 유지** + 4 페이지 역할 분담 (§3)
- `/ms-agent` → `/partnership` 명칭 통일
- i18n 동시 갱신 정책 신설 (§2): Phase 2~4에서 한·영 동시 작업
- Phase 6 → Phase 2~4로 i18n 워크 이동
- T11 (hreflang), T12 (역할 중복 0) 자가점검 신설

### v0.1 (2026-05-26)
- 초안 — v0.1 §부록 B 참조

---

*saai-web → deepingsource.io 전환 계획서 · v0.2 · 2026-05-28 · SA Team · Jamin Park*
*v0.1 §0~§14 골격 위에 §0 변경 요약 + §1~§3 IA 갱신 + §4 Phase 갱신 + §5~§6 자가점검·위험 갱신.*
