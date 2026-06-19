# A11Y · AEO · SEO 개선 계획 v1 — 화면 단위 접근

**작성** 2026-05-29
**목적** deepingsource.io 전 라우트를 웹접근성(WCAG 2.1 AA)·AEO(Answer Engine Optimization)·SEO 세 관점에서 화면 단위로 점검·개선.
**근거** 코드 직접 검증(2026-05-29) + 3개 병렬 감사. 감사의 오탐(다크 배경 `text-gray-300` 저대비 오판, metadataBase 미인지로 인한 상대 canonical 오판)은 본 계획에서 정정함.

---

## 0. 검증된 현황 한 줄

기초는 갖춰져 있다(generateMetadata 110/114, sitemap.ts·robots.ts·skip-link·hreflang·Organization JSON-LD 존재). **빠진 것은 (1) 다국어 정확성(html lang·robots 도메인·sitemap 동적 라우트), (2) AEO 구조화 데이터(제품·FAQ·용어·breadcrumb), (3) 소수의 a11y 결함(AboutView h1·일부 대비·폼 aria).**

---

## 1. 검증된 격차 (오탐 정정 포함)

### 1A. SEO
| # | 항목 | 검증 결과 | 근거 | 심각도 |
|:-:|---|---|---|:-:|
| S1 | `public/robots.txt`가 **잘못된 도메인** 사이트맵 참조 | 확정 — `Sitemap: https://storeagent.kr/sitemap.xml`. 정적 파일이 `robots.ts`를 덮어씀 | `public/robots.txt` | 🔴 Critical |
| S2 | `<html lang="ko">` 하드코딩 → en(`/`)·jp(`/jp`)가 잘못된 lang | 확정 — 로케일 layout 없음, middleware가 locale 헤더 미설정 | `layout.tsx:90`, `middleware.ts` | 🔴 Critical |
| S3 | 홈 메타데이터 누락 — `/`,`/ko`,`/jp`,`/storeagent/pricing` | 확정 — generateMetadata/metadata export 0 | 4개 page.tsx | 🟠 High |
| S4 | sitemap에 **동적 상세 라우트 누락** — `glossary/[slug]`·`solutions/[slug]` | 확정 — 정적 목록만 포함, 상세 slug 미생성 | `sitemap.ts` | 🟠 High |
| S5 | sitemap 블로그 항목 hreflang alternates 미비 | 확정 — articlePages에 languages 없음 | `sitemap.ts:62-68` | 🟡 Med |
| S6 | `og:locale` 전역 `ko_KR` 고정 | 확정 — 로케일별 og:locale 없음 | `layout.tsx:39` | 🟡 Med |
| ~~S7~~ | ~~상대 canonical 버그~~ | **오탐** — `metadataBase=https://deepingsource.io` 설정됨, Next가 정상 해석 | `layout.tsx:14` | — |

### 1B. AEO
| # | 항목 | 검증 결과 | 대상 | 임팩트 |
|:-:|---|---|---|:-:|
| E1 | 용어집 `DefinedTerm` 스키마 부재 (최대 기회) | 확정 — 40+ 용어, answer-first 정의 구조 양호하나 마크업 0 | `glossary/[slug]` | 🔴 매우높음 |
| E2 | 제품 `SoftwareApplication`/`Product` 스키마 부재 | 확정 | `products/store-*`·`saai` | 🟠 High |
| E3 | `FAQPage` 스키마 부재 (데이터는 완비) | 확정 — `faq-i18n.tsx` 4카테고리 Q&A 정리됨 | `resources/faq` + 제품 FAQ | 🟠 High |
| E4 | `BreadcrumbList` 스키마 + UI 부재 (전 라우트) | 확정 | 모든 내용 페이지 | 🟡 Med |
| E5 | `Article`/`NewsArticle` 보강 (case-studies) | 부분 — blog은 Article 있음, case-studies 미비 | `resources/case-studies` | 🟡 Med |
| E6 | `llms.txt` 부재 | 확정 | `public/llms.txt` | 🟡 Med |
| E7 | answer-first 콘텐츠(질문→짧은 답) 패턴 약함 | 부분 — FAQ/hero는 양호, 섹션 본문은 마케팅 위주 | 전 View | 🟢 Low(고난도) |

### 1C. A11Y (오탐 정정)
| # | 항목 | 검증 결과 | 근거 | 심각도 |
|:-:|---|---|---|:-:|
| A1 | **AboutView h1 누락** | 확정 — 히어로가 `<p>` 마스터 카피만, h1 0개 | `AboutView.tsx` | 🟠 High |
| A2 | html lang 비동적 (= S2) | 확정 | `layout.tsx:90` | 🟠 High |
| A3 | 라이트 배경 `text-gray-400` 소형 텍스트 대비 ~3.2:1 | 부분 확정 — 대상 한정(다크 배경 gray-300은 정상, 오탐 제외) | News/Store* 메타·노트 | 🟡 Med |
| A4 | pricing 페르소나 토글 `aria-pressed` 누락, 슬라이더 `aria-label` | 확정 | `PricingClientView.tsx`·`CameraSimulator.tsx` | 🟡 Med |
| A5 | skip-link 텍스트 한국어 고정 | 확정 — "본문으로 건너뛰기"만 | `layout.tsx:103` | 🟢 Low |
| ~~A6~~ | ~~HomeView h1 누락~~ | **오탐** — h1은 자식 `CorporateHero`에 존재 | — | — |
| ~~A7~~ | ~~다크 배경 text-gray-300 저대비~~ | **오탐** — 다크 위 밝은 회색 = 고대비 | — | — |

---

## 2. 의사결정 포인트 (착수 전 확정)

| # | 결정 | 선택지 | 추천 |
|:-:|---|---|---|
| **DA** | `html lang` 다국어 수정 방식 | (a) middleware가 `x-locale` 요청 헤더 set → root layout이 `headers()`로 읽어 `<html lang>` 동적 설정 **[전 라우트 dynamic 전환 트레이드오프]** / (b) route-group `(en)/(ko)/(jp)` 각자 root layout **[대규모 리팩터, SSG 유지]** / (c) 현행 유지 | **(a)** — 정확성/공수 최적. SSG→dynamic 비용은 콘텐츠 사이트엔 수용 가능(크롤러는 SSR HTML 정상 수신). 다만 정적 캐싱 손실은 명시. |
| **DB** | 진행 순서 | (a) 기술 SEO 퀵윈 → AEO 스키마 → a11y → 콘텐츠 / (b) a11y 우선 / (c) AEO 우선 | **(a)** — Critical(robots·lang·메타) 먼저, 그다음 인용률 높이는 AEO, 그다음 a11y, 콘텐츠 리라이트는 별도. |
| **DC** | AEO 콘텐츠 깊이 | (a) **스키마/마크업만** (카피 무수정) / (b) answer-first 본문 리라이트 포함 | **(a)** — 스키마만으로 인용률 대부분 확보. 본문 리라이트(E7)는 고공수·저확실성 → 별도 작업으로 분리(브랜드 작업의 "요약 필드만"과 동일 원칙). |
| **DD** | breadcrumb 범위 | (a) 스키마 + 시각 UI 둘 다 / (b) 스키마만 | **(a)** — UI는 작은 공용 컴포넌트 1개로 재사용, UX·SEO 동시 이득. |

---

## 3. 실행 계획 (Phase · 파일 · 검증)

### Phase 1 — 기술 SEO/다국어 정확성 (Critical, DA·DB)
| 작업 | 파일 | 검증 |
|---|---|---|
| robots 도메인 정정 — `public/robots.txt` 삭제(robots.ts로 일원화) 또는 도메인 동기화 | `public/robots.txt` / `src/app/robots.ts` | `/robots.txt`가 deepingsource.io sitemap 참조 |
| 홈 4종 메타데이터 추가(로케일 title/desc/canonical/hreflang/og:locale) | `app/page.tsx`·`ko/page.tsx`·`jp/page.tsx`·`storeagent/pricing/page.tsx` | 빌드 후 각 `<head>` 확인 |
| html lang 동적화 (DA=a) — middleware `x-locale` 요청헤더 + layout `headers()`로 `htmlLang[locale]` | `middleware.ts`·`layout.tsx`·`lib/i18n.ts(htmlLang)` | `/`=en·`/ko`=ko·`/jp`=ja 렌더 확인 |
| og:locale 로케일별 + sitemap 동적 라우트(glossary/solutions/[slug]) + 블로그 hreflang | `layout.tsx`·각 메타·`sitemap.ts` | `/sitemap.xml`에 상세 slug+alternates |

### Phase 2 — AEO 구조화 데이터 (DC=a, 스키마만)
공용 JSON-LD 헬퍼 신설 → 라우트별 주입.
| 작업 | 파일 | 검증 |
|---|---|---|
| `lib/structured-data.ts` 헬퍼(JsonLd 컴포넌트 + 빌더) | 신규 | 타입 통과 |
| 용어집 `DefinedTerm` (E1, 최우선) | `glossary/[slug]` + `/ko·/jp` | Rich Results Test 통과 |
| 제품 `SoftwareApplication` (E2) | `products/*` 4종 | 동일 |
| `FAQPage` (E3) — faq 페이지 + 제품 FAQ 섹션 | `resources/faq`, 제품 View | 동일 |
| `BreadcrumbList` + 시각 UI (E4, DD=a) | 공용 `Breadcrumb` 컴포넌트 + 내부 페이지 | 동일 |
| Organization 보강(sameAs·logo·contactPoint) + `WebSite`+SearchAction | `layout.tsx` | 동일 |
| `llms.txt` (E6) | `public/llms.txt`(+ route 또는 정적) | `/llms.txt` 접근 |

### Phase 3 — A11Y (WCAG AA)
| 작업 | 파일 | 검증 |
|---|---|---|
| AboutView h1 추가 (A1) | `AboutView.tsx` | 페이지당 h1 정확히 1개 |
| 라이트 배경 gray-400 소형텍스트 → gray-500/600 상향(대상 한정) (A3) | News/Store* 등 한정 | 대비 ≥4.5:1(소형) |
| pricing 토글 `aria-pressed`, 슬라이더 `aria-label` (A4) | `PricingClientView.tsx`·`CameraSimulator.tsx` | 스크린리더 상태 노출 |
| skip-link 텍스트 로케일화 (A5) | `layout.tsx` | 3 locale |

### Phase 4 — (분리/선택) answer-first 콘텐츠 리라이트 (E7)
DC=a 채택 시 본 Phase는 별도 승인 후 진행. 화면별 hero/섹션을 "질문→짧은 사실 답" 구조로.

---

## 4. 운영 규칙 (기존 패턴 계승)
- 대량 편집 전 dev 중지 → 편집/병렬 에이전트 → `npm run build` → dev 재기동 → Playwright 런타임 검증.
- **Turbopack stale 캐시 주의**: 공용 모듈(i18n·structured-data·layout) 수정 후 검증이 옛 값이면 `.next/dev`·`turbopack` 캐시 삭제 후 재기동(브랜드 작업에서 확인된 이슈).
- 다국어는 오버레이/`i18n` 패턴 유지, 미니사이트(agent.saai.store) 라우트 불변.
- JSON-LD는 `dangerouslySetInnerHTML` + `<` 이스케이프(layout 기존 패턴) 준수.

## 5. 성공 기준 (DoD)
1. `/`=`lang=en`, `/ko`=`lang=ko`, `/jp`=`lang=ja`; robots가 정확 도메인 sitemap 참조.
2. 홈 4종 + 전 공개 라우트 고유 메타 + hreflang(en/ko/jp)+x-default.
3. sitemap에 동적 상세(glossary/solutions/blog) + alternates 포함.
4. 핵심 라우트 JSON-LD: Organization·WebSite·BreadcrumbList(전역)·DefinedTerm(용어)·SoftwareApplication(제품)·FAQPage(FAQ) — Rich Results Test 통과.
5. 페이지당 h1 1개, 라이트 배경 본문 대비 AA, 폼 aria 보강.
6. `npm run build` 그린, lint 클린, 3 locale 런타임 검증.

## 6. 검증 도구
- 빌드 산출물 grep(`lang=`, JSON-LD), Playwright 런타임, Google Rich Results Test(수동), `/sitemap.xml`·`/robots.txt`·`/llms.txt` 직접 확인.

---
*근거: 코드 직접 검증 2026-05-29 + a11y/SEO/AEO 병렬 감사(오탐 정정 반영).*
