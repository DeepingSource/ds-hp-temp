# DOCS_WIKI_PLAN v2 — 문서 위키화 · Glossary 통합 · Gated Docs · Docs IA 개편 · 콘텐츠 전반 CMS 정비

> **일자** 2026-07-15 (v1 같은 날 v2 승격 — 파일명은 v1 유지, [KEYSTATIC_ENHANCEMENT_PLAN_v1](./KEYSTATIC_ENHANCEMENT_PLAN_v1.md)의 관례)
> **입력** `src/app/resources/docs/*`(17개 하드코딩 페이지) · `DocsView.tsx` · 17개 상세 페이지 사이드바 구조 · `glossaryTerms.ts`(19)·`glossary-i18n.ts` · `faq-data.tsx`·`faq-i18n.tsx` · `NewsView.tsx`(커버리지 하드코딩) · `company-data.ts` · `solutionsData.ts`·`solutions-i18n.ts` · `leadership.ts`·`company-milestones.ts` · `pricing-data.ts` · `models.ts` · `keystatic.config.tsx` · `velite.config.ts` · `src/proxy.ts` · STATUS.md 배치 D · [ADMIN_TOOLING_PLAN_v1](./ADMIN_TOOLING_PLAN_v1.md) · [KEYSTATIC G-3·E-1·B-7](./KEYSTATIC_ENHANCEMENT_PLAN_v1.md)
> **목표** ① `/resources/docs` **위키화**(수시 수정·추가) ② glossary **CMS 통합**(URL 유지) ③ **gated docs**(공유 액세스 코드) ④ **Docs 탐색 IA 개편**(상세 페이지 간 이동 단절 해소) ⑤ **여타 하드코딩 콘텐츠의 단계적 CMS 편입**(전수 인벤토리 기반)
> **결정(사용자 확인)** 인증 = 공유 액세스 코드 · glossary = URL 유지 + CMS만 통합 · 수 분 반영 지연 OK → **Keystatic 유지**
> **v2 변경** §1.2 Docs IA 진단 신설 · §2 콘텐츠 전수 인벤토리 신설 · D6(IA 목표 구조)·D7(편입 판별 기준) 추가 · Phase 6(콘텐츠 편입 웨이브) 추가 · 비개발 문서(코드 미변경)

---

## 0. 요약 — 우선순위 한눈에

| 순위 | Phase | 내용 | 공수(추정) | 산출물 |
|---|---|---|---|---|
| **P0** | 1 | docs 파이프라인 + **위키 레이아웃 셸**(`content/docs` + Velite + Keystatic 컬렉션 + `[slug]` 라우트 + `DocsLayout`) | 3–4d | 문서 = MDX 파일 1개, 전 문서 공유 사이드바 |
| **P0** | 2 | 17페이지 TSX→MDX 마이그레이션 + **IA 개편 완성**(허브 재구성·prev/next·TOC) | 3–4d | URL 불변, 문서 간 탐색 단절 해소 |
| P1 | 3 | glossary CMS 이관 + docs↔glossary 상호 링크 | 1.5–2d | URL·DefinedTerm 유지, 같은 CMS 그룹에서 편집 |
| P1 | 4 | Gated docs — 액세스 코드 + `proxy.ts` 게이트 + SEO/export 제외 | 1.5–2d | `access: gated` 문서 코드 열람 |
| P1 | 5 | 위키 운영성 — 편집 가이드·PR 워크플로·frontmatter lint | 1–2d | 편집자 셀프서비스 |
| **P1** | 6-W1 | 콘텐츠 편입 Wave 1 — **뉴스 커버리지**·**회사 상수**·**FAQ**(=G-3 흡수) | 2–3d | 고빈도 콘텐츠 CMS 편집 가능 |
| P2 | 6-W2 | Wave 2 — leadership·마일스톤·career 카피 | 1–1.5d | about/career 저빈도 콘텐츠 편입 |
| P3 | 6-W3 | Wave 3 — solutions 구조 데이터·pricing(E-1 연계)·models — **착수 전 판별 게이트** | 판단 후 | 과편입 방지 |

총 13–19일(Wave 3 제외). Phase 1→2 순차, 3·4·6-W1은 Phase 1 후 병렬 가능.

**핵심 판단 (v1에서 유지)**: 새 도구를 들이지 않는다. "Keystatic 컬렉션 → `content/*` → Velite/생성 스크립트 → 렌더" 패턴이 블로그·케이스스터디·페이지카피·법무 4곳에서 검증돼 있고, 본 플랜은 이 패턴을 나머지 콘텐츠로 확장하는 것이다. CMS 대안 비교와 재검토 트리거는 §7.

---

## 1. 현재 상태 진단

### 1.1 docs — 콘텐츠가 코드에 갇혀 있음
- `src/app/resources/docs/` 아래 **17개 상세 페이지가 각각 독립 TSX**. 본문·목차·아이콘·메타데이터가 컴포넌트 코드에 하드코딩.
- 허브(`DocsView.tsx`)의 사이드바 `navSections`도 **ko/en/jp 3벌 하드코딩** — 문서 1개 추가에 최소 4곳 수정 필요. 위키식 운영 불가능.
- 로케일: 상세는 base 경로에만 물리 존재(본문 ko), `/ko`·`/jp`는 `proxy.ts` rewrite로 동일 페이지 서빙. 허브만 로케일별 물리 페이지.

### 1.2 docs — 탐색(IA) 진단 ★v2 신설
17개 상세 페이지 전부(`lg:w-64` sticky aside 17/17)에서 확인된 구조적 문제:

| # | 문제 | 증상 |
|---|---|---|
| IA-1 | **상세 페이지 사이드바가 "그 문서의 인페이지 앵커"만 표시** | 다른 문서로 가려면 "← 제품 문서로"로 허브 복귀 후 재선택 — 문서 간 직행 불가. 위키의 기본인 "형제 문서 목록"이 없음 |
| IA-2 | **문서 간 링크가 전부 수작업** | 페이지마다 "다음 단계" 카드를 하드코딩(예: cctv-integration→environment-requirements). 문서 추가/삭제 시 끊긴 링크·누락 발생, 일관성 없음 |
| IA-3 | **허브 정보 중복·과밀** | 사이드바 내비와 본문 카드 그리드가 같은 `navSections`를 두 번 렌더. 사이 공지·featured 매뉴얼·coming-soon이 끼어 스크롤이 김 |
| IA-4 | **계층 없음** | `store-insight` 매뉴얼(364줄)이 단일 페이지 — 매뉴얼이 커지면(store agent·care 예정) 챕터 분할 수단이 없음. slug 공간이 완전 평면 |
| IA-5 | **위키 신뢰 신호 부재** | 최종 수정일·prev/next·문서 내 검색 없음. glossary와 상호 링크 없음(관련 용어가 있어도 연결 안 됨) |

원인은 하나다 — **내비게이션이 콘텐츠가 아니라 코드에 있기 때문**. 콘텐츠화(Phase 1–2)가 곧 IA 수리의 전제이며, 목표 구조는 D6.

### 1.3 glossary — CMS 밖 TS 데이터
- 19개 용어가 `glossaryTerms.ts`(649줄, ko 본문) + `glossary-i18n.ts`(292줄, en/jp 카드 번역)에 분산.
- `GlossaryView`·`GlossaryDetailView`(`/glossary/[slug]`)가 렌더. `structured-data.tsx`의 **DefinedTerm/DefinedTermSet**(AEO 핵심)이 이 데이터를 소비.

### 1.4 이미 갖춰진 것 (재사용 자산)
- **Keystatic GitHub 모드** 운영 중 — `/keystatic` 편집→커밋→Vercel 재배포.
- **MDX 렌더 경로**: `next-mdx-remote` + blog `mdx-components.tsx`(커스텀 블록, Keystatic 직렬화 검증 — B-S 스파이크). **blog `TableOfContents.tsx`·`ReadingProgress.tsx`는 docs 상세의 우측 TOC로 재사용 가능.**
- **Velite 컬렉션 패턴**: `articles`·`caseStudies` — draft 필터·`-ko/-jp` 접미사 로케일 관례·예약 재빌드.
- **`gen-site-content.mjs`**: YAML→JSON 컴파일 관례(서버/클라 양쪽 동기 import) — 콘텐츠 편입 Wave의 표준 경로 중 하나.
- **`src/proxy.ts`**: 전 요청 통과 — gated 게이트를 얹을 자리.

### 1.5 제약
- **GH Pages 정적 export**(`GH_PAGES=1`)에는 proxy·API 없음 → gated는 Vercel 배포에서만 유효, export 빌드에서는 gated 문서를 빌드에서 제외(§D5).
- Keystatic GitHub 모드 반영 수 분 지연 — 허용(사용자 확인).

---

## 2. 콘텐츠 표면 전수 인벤토리 ★v2 신설

코드베이스의 콘텐츠성 데이터 전체와 처리 방침. **기존 계획과의 관할 중복 방지**를 위해 담당 트랙을 명시한다.

### 2.1 이미 CMS (현상 유지)
| 콘텐츠 | 소스 | 비고 |
|---|---|---|
| 블로그 196편 | `content/articles/*.mdx` | articles 컬렉션 |
| 케이스스터디 | `content/case-studies/*.mdx` | caseStudies 컬렉션 |
| 페이지 카피 14종 | `content/site/*.yaml` → gen-site-content | 싱글톤. 확장은 ADMIN_TOOLING·B-7 관할 |
| 법무 | `content/legal/*.mdx` | privacyDoc·termsDoc |
| 편집 가이드 | `content/editor/guide.mdx` → `/help` | G-1 |

### 2.2 하드코딩 — 본 플랜 편입 대상
| 콘텐츠 | 소스(규모) | 변경 빈도 | 편입 형태 | Phase |
|---|---|---|---|---|
| **docs 17페이지** | `src/app/resources/docs/*`(3,455줄) | 수시(위키화 목표) | `docs` 컬렉션(MDX) | **1–2** |
| **glossary 19용어** | `glossaryTerms.ts`+`glossary-i18n.ts`(941줄) | 월간+ | `glossary` 컬렉션(구조화) | **3** |
| **뉴스 커버리지** | `NewsView.tsx` 내 3로케일×8건 하드코딩 | **보도자료마다**(고빈도·고시급) | `newsCoverage` 컬렉션 — date·outlet·category·title(3loc)·url. 구조 단순, 반나절 | **6-W1** |
| **회사 상수** | `company-data.ts`(35줄 — 특허 수 103/66/37·주소·태그라인) | 특허 등록·조직 변경마다 | `company` 싱글톤 → gen-site-content 경로. **특허 수는 사이트 전역 CountUp 등에서 소비 — 오타 시 전역 파급이라 validation(정수·min) 필수** | **6-W1** |
| **FAQ** | `faq-data.tsx`(260)+`faq-i18n.tsx`(501) | 분기 4회(git log — G-3 근거) | `faq` 컬렉션. **⚠ answer가 React 노드(JSX·Link 포함) → mdx 필드 전환 필요.** KEYSTATIC G-3를 본 플랜이 흡수 실행 | **6-W1** |
| **leadership·마일스톤** | `leadership.ts`(107)+`company-milestones.ts`(56) | 저빈도(분기 미만) | about 관련 싱글톤 확장 또는 소컬렉션 | 6-W2 |
| **career 인재풀 카피** | `CareerView.tsx` 인라인 | 저빈도 | `content/site/career.yaml` 싱글톤 신설(기존 패턴) | 6-W2 |

### 2.3 하드코딩 — 판별 게이트 후 결정 (Wave 3, 성급 편입 금지)
| 콘텐츠 | 소스(규모) | 판단 |
|---|---|---|
| solutions 구조 데이터 | `solutionsData.ts`(1,139)+`solutions-i18n.ts`(842) | 히어로·시나리오 카피는 **이미 `content/site/{retail,drug,…}.yaml` 싱글톤에 있음** — 남은 것은 causes/steps/results 구조 데이터. 디자인 결합 강함(productColor 등). **편집 빈도 실측 후**(git log 분기 1회 미만이면 코드 잔류) |
| pricing | `pricing-data.ts`(117) | 금액·정책은 민감 — **E-1(pricing 폼 다이어트)과 한 묶음으로만** 진행. 단독 편입 금지 |
| models | `models.ts`(77) | 기술 스펙, 저빈도 — 보류 |

### 2.4 편입 제외 (코드가 SOT — CMS화하지 않음)
`mockup-scenarios`·`briefingData.ts`·`storeCareScenarios.ts`·`seasonal`·`cctvImages.ts`·`siteImages.ts`·`storeagent-mock-i18n.ts` 등 **데모/목업 데이터** — 디자인·애니메이션과 강결합, 편집자가 만질 물건이 아님(docs/README "목업 데이터 SOT = canonical.ts" 유지). `brand-canon.ts`(보이스 SOT)·`breadcrumb-labels.ts`·`i18n.ts` 등 **시스템 상수**도 제외. Header/Footer 카피는 KEYSTATIC B-7 관할로 남긴다.

---

## 3. 아키텍처 결정 (D1–D7)

### D1. CMS = Keystatic 유지
v1과 동일 — 운영 중·비용 0·git 이력=위키 변경 이력·패턴 4회 검증. 대안·재검토 트리거 §7.

### D2. docs 콘텐츠 모델
```
content/docs/
  product-overview.mdx          ← ko 원본 (파일명 = slug)
  product-overview-en.mdx       ← 선택: 로케일 번역 (-ko/-jp 접미사 관례)
  store-insight.mdx             ← 매뉴얼 표지(개요)
  store-insight--login.mdx      ← 매뉴얼 챕터 (parent 참조, IA-4 대응)
```
frontmatter (Velite `docs` 컬렉션):

| 필드 | 타입 | 비고 |
|---|---|---|
| `slug` | string | 파일명과 동일 (Keystatic slugField) |
| `title` / `excerpt` | string | 목록·메타 |
| `section` | enum `getting-started`·`integration`·`privacy`·`analytics`·`manual` | 사이드바 그룹 = 현행 4그룹+매뉴얼 |
| `order` | number | 섹션 내 정렬 — **prev/next 자동 생성의 근거(IA-2 해소)** |
| `parent` | string, optional | **매뉴얼 챕터화(IA-4)** — 1단계 중첩만 허용. URL은 평면 유지(`/resources/docs/[slug]`), 사이드바에서만 중첩 표시 |
| `icon` | select | BLOG_ICON_NAMES 패턴 |
| `lang` | enum ko/en/jp, default ko | 기존 관례 |
| `draft` | boolean | 목록·라우트 제외. **"coming soon"은 draft 스텁으로 표현**(G19 연계) |
| `access` | enum `public`·`gated`, default public | Phase 4 스위치 |
| `updated` | date, optional | 최종 수정일 노출(IA-5). 생략 시 git 커밋일 폴백(후순위) |
| `relatedSlugs` | relationship array | "이어서 읽기" — A-1 유실버그 수정 방식 적용 |
| `relatedTerms` | array, optional | **glossary 상호 링크(IA-5)** — 상세 하단 "관련 용어" 자동 렌더 |
| `body` | MDX | blog mdx-components 재사용 + docs 전용 블록(§4 Phase 1) |

### D3. glossary 콘텐츠 모델 — URL 유지, 데이터만 이관
v1과 동일: `content/glossary/*` 구조화 필드(자유 MDX 아님 — DefinedTerm이 구조 소비), en/jp 카드 번역은 같은 엔트리의 `localized()` 필드로 통합, 라우트·뷰·JSON-LD는 데이터 소스만 교체. **추가(v2)**: glossary 상세에 "이 용어를 쓰는 문서" 역링크(docs의 `relatedTerms` 역인덱스) — 두 콘텐츠의 실질 통합은 URL이 아니라 **상호 링크 그래프**로 달성.

### D4. 라우팅 — 정적 17디렉토리 → 동적 1개
v1과 동일: `[slug]/page.tsx` + `generateStaticParams`, URL 불변·리다이렉트 불필요. 허브 내비는 velite 데이터로 생성, UI 카피만 로케일 레코드 잔류.

### D5. Gated — 공유 액세스 코드
v1과 동일: frontmatter `access: gated` → 빌드 시 `gated-docs.json` 생성(gen-site-content 스텝) → `proxy.ts`에서 쿠키 검증·`/resources/docs/access` 리다이렉트 → `POST /api/docs-access` HMAC 서명 쿠키(30일). env `DOCS_ACCESS_SECRET`·`DOCS_ACCESS_CODES`(고객사별 라벨). sitemap·robots·RSS 제외, **GH_PAGES export에서는 빌드 자체 제외 + CI 산출물 검사**.

### D6. Docs 위키 IA 목표 구조 ★v2 신설
```
┌ Breadcrumb: Resources › Docs › [섹션] › [문서]
├─────────────┬──────────────────────────┬───────────────┐
│ 좌: 전역     │ 본문                      │ 우: 인페이지    │
│ 사이드바     │  제목 · 최종수정일         │ TOC           │
│ (전 문서     │  MDX 본문                 │ (h2/h3 자동,   │
│  섹션 트리·  │  ────────────────        │  blog TableOf- │
│  현재 강조·  │  관련 용어(glossary 칩)    │  Contents 재사용)│
│  매뉴얼 중첩·│  이어서 읽기(related)      │               │
│  gated 🔒)  │  ← prev · next →(자동)    │               │
└─────────────┴──────────────────────────┴───────────────┘
```
- **좌 사이드바를 허브·상세가 공유**(`DocsLayout` — `src/app/resources/docs/layout.tsx`): IA-1 해소. 데이터는 velite에서 생성, 현재 문서 강조, `parent` 중첩 표시, gated는 잠금 아이콘.
- **prev/next는 section·order에서 자동 계산**: IA-2 해소. 수작업 "다음 단계" 카드는 `relatedSlugs`로 대체.
- **허브 재구성**: 사이드바가 전 목록을 담당하므로 본문은 ① 히어로 ② 제품별 매뉴얼(표지 카드) ③ 섹션별 대표 카드 축약 ④ 최근 갱신 문서(updated 기준, 위키 신호) — IA-3 해소. 공지 배너는 문서 수가 채워지는 Phase 2 완료 시 제거.
- **모바일**: 사이드바는 상단 collapsible(디스클로저)로 접힘, TOC는 본문 상단 요약으로.
- **검색(IA-5)**: P2·선택 — 빌드 시 docs+glossary 인덱스 JSON → 허브 경량 클라이언트 검색. 문서 40+ 시점 착수(그 전에는 사이드바로 충분).

### D7. 콘텐츠 편입 판별 기준 ★v2 신설 (Wave 공통, 과편입 방지)
편입 형태는 3종뿐이며 아래 순서로 판별한다:
1. **반복 항목 + 자유 본문** → Velite **컬렉션**(MDX) — docs·FAQ.
2. **반복 항목 + 고정 구조** → Keystatic 컬렉션(구조화 필드, MDX 아님) — glossary·뉴스 커버리지.
3. **페이지 1개 분량 카피/상수** → **싱글톤**(`content/site` YAML → gen-site-content) — 회사 상수·career.
편입 조건(모두 충족): ⓐ 변경 빈도 분기 1회 이상(git log 실측) ⓑ 편집 주체가 비개발자 ⓒ 디자인 로직과 분리 가능. **하나라도 미달이면 코드 잔류**(§2.3–2.4) — "모든 것의 CMS화"가 목표가 아니라 **편집 병목 제거**가 목표.

---

## 4. 단계별 실행 계획

### Phase 1 — docs 파이프라인 + 위키 레이아웃 셸 (P0, 3–4d)
| # | 작업 | 파일 |
|---|---|---|
| 1-1 | Velite `docs` 컬렉션(D2) + `src/lib/docs.ts`(로드·필터·섹션 그룹핑·prev/next·역링크 헬퍼) | `velite.config.ts` · 신규 lib |
| 1-2 | Keystatic `docs` 컬렉션 — blog content-components 재사용 + docs 전용 블록 `Steps`·`ParamTable`·`Screenshot`. 이미지 `public/images/docs` | `keystatic.config.tsx` |
| 1-3 | **`DocsLayout`(전역 사이드바, D6) + `[slug]` 라우트 + `DocDetailView`**(우측 TOC=blog TableOfContents 재사용·최종수정일·관련 용어·prev/next) | `src/app/resources/docs/layout.tsx`·`[slug]/page.tsx`·`DocDetailView.tsx` 신규 |
| 1-4 | 파일럿 2건 변환 — `product-overview`(일반) + `cctv-integration`(다음 단계 카드 있는 페이지) → 기존과 시각 비교 + prev/next 자동화 확인 | `content/docs/*` |

**AC**: 파일럿 2건이 기존 URL에서 동등 품질 렌더 + 전역 사이드바에서 형제 문서로 직행 가능. **충실도 미달 시 여기서 중단·블록 재설계**(게이트).

### Phase 2 — 마이그레이션 + IA 완성 (P0, 3–4d)
- 2-1 나머지 15페이지 MDX 변환(단순→복잡 순, `store-insight`는 **표지+챕터 분할(D2 parent) 시험 적용** 마지막).
- 2-2 허브 재구성(D6) — navSections 하드코딩 제거, "coming soon"→draft 스텁, 최근 갱신 목록 추가.
- 2-3 frontmatter lint(`check-article-frontmatter.mjs` 패턴): section enum·slug 일치·relatedSlugs/parent 실존·order 중복 검사.
- 2-4 sitemap 보강 — **현재 docs 상세 17개가 sitemap에 없음(허브만 등록)** → public docs를 velite 기반으로 추가(gated·draft 제외).

**AC**: 17문서 URL 동일 렌더 · 정적 디렉토리 0개 · 임의 상세→다른 상세 2클릭 이내 이동 · 새 문서 추가가 Keystatic 단독 완결 · sitemap에 public 상세 포함.

### Phase 3 — glossary 이관 (P1, 1.5–2d)
v1과 동일(컬렉션화·`scripts/migrate-glossary.mjs` 1회 변환·소비처 임포트 교체·TS 파일 삭제) + **v2 추가**: docs `relatedTerms` ↔ glossary 역링크 렌더, Keystatic 내비 `'문서 · 용어사전': ['docs', 'glossary']`.
**AC**: 19용어 URL·본문·DefinedTerm JSON-LD 무변화(빌드 diff) · 용어↔문서 상호 링크 동작.

### Phase 4 — Gated docs (P1, 1.5–2d)
v1과 동일: 4-1 gated-docs.json 생성+proxy 게이트 · 4-2 access 페이지(3로케일)+`POST /api/docs-access`(기존 `api-utils.ts` rate limiter 재사용 — `isRateLimited` 이미 존재) · 4-3 SEO/export 제외+허브 잠금 UI · 4-4 `access` 필드 description 가이드 내장.
**AC**: 무쿠키 전수 차단(ko/jp 포함)·export 산출물 부재·번들 시크릿 스캔·rate limit 동작.

### Phase 5 — 위키 운영성 (P1→P2, 1–2d)
- 5-1 편집자 가이드(`editorGuide`·`/help`)에 docs·glossary·FAQ·뉴스 섹션 추가(새 문서·챕터·gated 전환·이미지 규격).
- 5-2 (선택) `branchPrefix`+PR 모드(D-2) — 법무·gated 문서 우선 적용.
- 5-3 (선택·문서 40+ 시) 검색 인덱스(D6).

### Phase 6 — 콘텐츠 편입 웨이브 ★v2 신설
**Wave 1 (P1, 2–3d)** — 고빈도·고시급:
- 6-1 **뉴스 커버리지 컬렉션**: `content/news/*.yaml`(date·outlet·category·url + title 3로케일) → `NewsView` 데이터 교체. 보도자료가 나올 때마다 개발자 없이 등록 — 편입 대상 중 ROI 최고.
- 6-2 **회사 상수 싱글톤**: `content/site/company.yaml` → gen-site-content → `company-data.ts`는 생성 JSON re-export로 축소. 특허 수 등 숫자 필드 validation(정수·min) 내장.
- 6-3 **FAQ 컬렉션(=KEYSTATIC G-3 흡수 실행)**: answer JSX → **MDX 필드** 전환(내부 링크는 표준 마크다운 링크로 — `localeHref` 처리 방식을 렌더러에서 해석), `faq-data.tsx`+`faq-i18n.tsx`(761줄) 대체. 소비처 = FaqView + 제품별 FAQ 섹션(commonFaqs·storeCareFaqs·storeInsightFaqs 카테고리 필드로 표현).

**Wave 2 (P2, 1–1.5d)**: leadership·마일스톤(about 싱글톤/소컬렉션) · career 인재풀 카피(`content/site/career.yaml`).

**Wave 3 (P3, 게이트)**: 착수 전 D7 조건 실측(git log 편집 빈도) 후 GO/NO-GO — solutions 구조 데이터·pricing(**E-1과 한 묶음**)·models. NO-GO면 코드 잔류를 명시적 결정으로 기록.

---

## 5. 리스크 & 대응

| 리스크 | 영향 | 대응 |
|---|---|---|
| TSX→MDX 충실도 저하(기존 페이지는 자유 JSX) | 품질·일정 | Phase 1-4 파일럿 게이트(2건). 특수 레이아웃은 docs 전용 블록으로 흡수, 불가 시 해당 페이지만 TSX 잔류 허용(목록·내비는 velite 단일 소스 유지) |
| gated 문서 GH Pages export 포함 | **비공개 유출** | 빌드 제외 + CI 산출물 grep 검사 |
| proxy 게이트 우회(프리페치·RSC·이미지) | 부분 유출 | 경로 프리픽스 전수 커버 + gated 이미지 디렉토리 분리 검토(1차는 경로 게이트, 이미지 URL 추측 리스크 수용 여부 명시) |
| 액세스 코드 유출 | 접근 통제 상실 | env 교체+재배포 전체 무효화(쿠키에 코드 버전) · 고객사별 코드로 blast radius 축소 |
| **FAQ answer JSX→MDX 변환 손실**(링크·목록·강조) | FAQ 품질 저하 | Wave 1에서 FAQ 5건 파일럿 → 렌더 diff 후 일괄. `localeHref` 링크는 렌더러 커스텀 anchor로 해석 |
| **IA 개편이 마이그레이션과 결합돼 스코프 팽창** | P0 지연 | D6 중 Phase 1–2 필수는 사이드바·prev/next·TOC만. 검색·최근갱신·역링크는 이후 Phase로 분리돼 있음 — 순서 준수 |
| **Wave 3 과편입**(solutions 등 디자인 결합 데이터) | 편집자가 깨뜨릴 수 있는 표면 확대 | D7 판별 게이트 — 조건 미달 시 코드 잔류가 정답임을 명문화 |
| Keystatic 컬렉션 증가(docs·glossary·faq·news)로 admin 과밀 | 편집자 혼란 | 내비 그룹 재편(`'문서 · 용어사전'`·`'뉴스 · FAQ'`)+C-1~3 관례·entryLayout 적용 |
| `relatedSlugs`/`parent` 유실(A-1 동종) | 데이터 유실 | relationship 필드 방식 처음부터 적용 + 2-3 lint |
| 기존 트랙(KEYSTATIC 잔여·배치 D)과 일정 충돌 | 리소스 분산 | 본 플랜이 **G-3(FAQ)·배치 D #14/15/16(docs·glossary·faq CMS화)을 흡수** — STATUS.md에 관할 이관 기록. E-1·B-7·D-1은 기존 플랜 관할 유지 |

---

## 6. 검증 계획 (전체 완료 기준)
1. **회귀**: 이관 전후 전 URL 렌더 diff(docs 17·glossary 19·faq·news) · sitemap·JSON-LD diff(gated 제외분만 감소, docs 상세는 **추가**).
2. **IA**: ① 임의 문서→임의 문서 2클릭 이내 ② 허브 재방문 없이 섹션 종주 가능 ③ 모바일 사이드바 동작 ④ prev/next가 order와 일치.
3. **편집 루프(비개발자 실테스트, G-2와 병합)**: 새 문서 발행 / 문서 수정 / 매뉴얼 챕터 추가 / 용어 추가 / gated 전환 / 보도자료 등록 / FAQ 추가 — 7개 시나리오.
4. **보안**: gated 무쿠키 전수 차단·export 산출물 검사·번들 시크릿 스캔.
5. **테스트 코드**: `docs.ts`(그룹핑·prev/next·역링크)·gated 판정·액세스 API vitest(기존 `api-utils.test.ts` 관례).

---

## 7. 대안 검토 — 왜 Keystatic을 유지하는가 (v1 유지)

| 옵션 | 장점 | 단점 | 판정 |
|---|---|---|---|
| **Keystatic 유지 (선택)** | 운영 중·비용 0·git 이력=위키 히스토리·패턴 4회 검증·온보딩 진행 중 | 반영 수 분·에디터가 Notion급 아님·동시 편집은 git 수준 | ✅ 현 요구 충족 |
| Payload/Directus (DB CMS) | 즉시 반영·세밀 권한·대규모 강함 | DB/호스팅 신설·콘텐츠가 git 밖·이관 비용 大 | 과투자 |
| Outstatic/Decap/TinaCMS | git 기반 동종 | Keystatic 대비 이점 없음(Decap 잔재는 제거됨) | 이유 없음 |
| GitBook/Mintlify (외부 SaaS) | 검색·버저닝 내장 | 도메인·디자인 분리, gated=상위 플랜, 통합 IA(AEO 자산) 훼손 | 부적합 |
| Notion 연동 렌더 | 편집 UX 최상 | 렌더 파이프라인 신설·rate limit·구조화 데이터 재작업·이중 관리 | 부적합 |

**보완(플랜 내)**: 수 분 지연→D-1 프리뷰(기존 잔여) · 컬렉션 증가→내비 그룹·entryLayout · 이력 가시성→PR 모드.
**재검토 트리거**: ① 개인 단위 접근 추적/회수(고객 포털화)→Auth.js+DB 세션 승격 ② 문서 100+ & 편집자 5+ 동시 ③ 즉시 반영이 계약 요건→ISR+Reader API 또는 DB CMS 재평가.

---

## 부록 A — 새 파일/변경 파일
**신규**: `content/docs/*.mdx`(17+·챕터 포함) · `content/glossary/*`(19) · `content/news/*.yaml` · `content/site/company.yaml`·`career.yaml` · `content/faq/*` · `src/app/resources/docs/layout.tsx`·`[slug]/page.tsx`·`access/page.tsx` · `src/app/api/docs-access/route.ts` · `DocDetailView.tsx` · `src/lib/docs.ts` · `src/data/generated/gated-docs.json`(생성물) · `scripts/migrate-glossary.mjs`·frontmatter lint
**변경**: `velite.config.ts` · `keystatic.config.tsx` · `src/proxy.ts` · `DocsView.tsx` · `GlossaryView/GlossaryDetailView` · `structured-data.tsx` · `sitemap.ts` · `gen-site-content.mjs` · `NewsView.tsx` · `FaqView.tsx`+제품 FAQ 소비처 · `company-data.ts`(re-export化) · `editorGuide`/`help` · `STATUS.md`(관할 이관 기록)
**삭제**: `src/app/resources/docs/<17개 정적 디렉토리>` · `glossaryTerms.ts` · `glossary-i18n.ts` · `faq-data.tsx` · `faq-i18n.tsx`(Wave 1 후)
**env 추가**: `DOCS_ACCESS_SECRET` · `DOCS_ACCESS_CODES` (Vercel Production+Preview)
