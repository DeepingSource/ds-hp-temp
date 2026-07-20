# WEEK1 실행 스펙 v1 — 주1 잔여 작업 (작성 2026-07-16)

> 실행 주체: AI 코딩 에이전트 (또는 개발자). 각 태스크는 독립 실행 가능.
> 정본 보드: Notion「⚡ Growth Planner — Web·MKT·PR」— 완료 시 해당 행 상태를 '완료'로 변경할 것.
>
> **공통 규칙**
> - 수정 범위 최소화: 태스크와 무관한 리팩터링·포매팅 변경 금지. 기존 스타일 준수.
> - 완료 조건: `npm run lint` + `npm run test` 통과, 태스크별 Acceptance 충족.
> - 커밋: 태스크당 1커밋, 메시지에 태스크 ID 포함 (예: `[1-9] contact form SSR skeleton`).
> - 가격 숫자 비노출 원칙 유지 (7/13 결정).

---

## T1. [1-1] 구 사이트 URL 인벤토리 → 301 리다이렉트 맵 (마감 7/17 · 런칭 블로커)

**Goal**: 구 Webflow 사이트(www.deepingsource.io)의 전 URL이 새 IA로 301(1홉) 연결되도록 리다이렉트 맵을 완성한다.

**Context**
- `next.config.ts`에 신 IA 리다이렉트가 이미 존재 (PLAN_v1.1 §2.3): store-*→saai-*, /blog→/resources/blog, /about→/company/about 등. **이 태스크는 "구 사이트 실제 URL 크롤 → 기존 맵과 대조 → 누락분 보완"이다. 맵을 새로 만들지 말 것.**
- 구 사이트는 apex→www 리다이렉트 중이며 sitemap.xml이 `application/rss+xml`로 서빙됨 — 파서가 content-type에 관대해야 함.
- 블로그 45편은 slug 일치 전제 (`/blog/:slug` → `/resources/blog/:slug` 규칙이 이미 존재) — **slug 실제 일치 여부 검증이 핵심**.

**Steps**
1. `scripts/crawl-old-site.mjs` 작성: www.deepingsource.io sitemap.xml 파싱(+ 필요시 내부 링크 크롤 1뎁스) → URL 인벤토리.
2. 인벤토리를 분류: 블로그 / 제품 / 기술 / 회사 / 기타·미니사이트.
3. 각 URL을 기존 redirects + 신규 라우트와 대조 → 상태 판정: `동일 경로 존재` / `기존 redirect 커버` / `누락`.
4. 누락분을 `next.config.ts` redirects에 추가 (exact source 매칭, 체인 1홉 초과 금지 — 기존 주석 규칙 준수).
5. 블로그 slug 대조: 구 사이트 blog slug 목록 vs `content/` 45편 slug — 불일치 항목은 개별 redirect 추가.
6. www/apex 정책 명시: 신 사이트 canonical은 apex(deepingsource.io) — www→apex 리다이렉트는 DNS/호스팅 레벨(Vercel 도메인 설정)에서 처리함을 문서에 기록.
7. 산출물 작성: `docs/REDIRECT_MAP_v1.md` — 표(구 URL | 상태 | 새 URL | 방식) + 검증 방법.
8. 검증 스크립트 `scripts/verify-redirects.mjs`: 로컬/스테이징 대상 전 구 URL HEAD 요청 → 기대 목적지·홉 수 비교, 결과 리포트.

**Acceptance**
- 구 sitemap 전 URL: 200(동일 경로) 또는 301 1홉→200. 404·2홉 이상 0건 (스테이징 기준).
- `docs/REDIRECT_MAP_v1.md` 존재, Notion DOC 행에 링크 추가 가능 상태.

---

## T2. [1-9] Contact 폼 초기 "Loading…" 노출 해소 (마감 7/17)

**Goal**: /contact (EN·KO·JP) 초기 로드에서 "Loading" 텍스트가 보이지 않게 한다.

**Context**
- `src/app/contact/ContactFormPage.tsx`: `'use client'` + `useSearchParams` + `Suspense`. 원인 추정: useSearchParams로 인해 클라이언트 렌더 전까지 Suspense fallback(=content.loading 문자열)이 노출.
- `src/app/contact/page.tsx`는 서버 컴포넌트(메타데이터만). ko/jp 동일 구조.

**Fix 옵션 (택1, A 권장)**
- **A. Suspense 경계 축소**: useSearchParams를 사용하는 부분(사전 선택된 제품 라벨 등)만 별도 클라이언트 컴포넌트로 분리해 그 부분만 Suspense로 감싼다. 폼 골격·컨텍스트 카피는 즉시 렌더.
- B. fallback을 실제 폼 레이아웃과 동일한 스켈레톤 컴포넌트로 교체 (텍스트 "Loading" 제거).

**Acceptance**
- 프로덕션 빌드(`npm run build && npm run start`)에서 /contact, /ko/contact, /jp/contact 초기 페인트에 "Loading"류 텍스트 미노출.
- 폼 제출 플로우 회귀 없음 (searchParams로 제품 사전 선택 시나리오 포함).
- 기존 테스트 + lint 통과. 레이아웃 시프트(CLS) 악화 없음.

---

## T3. [1-6] /demo 내부 목업 노출 차단 — ✅ 구현 완료 확인 (7/16), 검증만 수행

**확인된 구현**: `src/components/corporate/CtaBand.tsx`에서 /demo 링크 제거됨(주석 有) · `src/app/demo/page.tsx`에 `robots: {index:false, follow:false}` + `NODE_ENV === 'production'`이면 `notFound()`.

**검증 절차**
1. `grep -rn "/demo" src/` — 프로덕션 노출 경로에서 잔여 링크 0 확인 (mockup 컴포넌트 내부 참조는 페이지 미노출이면 무방).
2. 프로덕션 빌드에서 GET /demo → 404 확인.
3. `src/app/sitemap.ts` 출력에 /demo 미포함 확인.
4. 완료 시 보드 1-6 상태 '완료' 처리.

---

## T4. [1-5] noindex 게이트 점검 (마감 7/18 · 런칭 블로커)

**Goal**: 프리뷰는 전면 noindex 유지, 프로덕션 전환 시 인덱싱이 확실히 열리도록 게이트를 검증·문서화한다.

**Context**: `src/app/robots.ts` — `NEXT_PUBLIC_ALLOW_INDEXING === 'true'`일 때만 allow. 미설정 시 전면 Disallow. sitemap URL은 `NEXT_PUBLIC_BASE_URL` 기준.

**Steps**
1. Vercel 프로젝트 env 확인: Production에 `NEXT_PUBLIC_ALLOW_INDEXING=true` + `NEXT_PUBLIC_BASE_URL=https://deepingsource.io` 설정 (Preview에는 설정 금지). ⚠️ 단, **전환일(8/10) 전에 프로덕션 도메인이 임시 노출될 경우를 고려** — 전환 당일 켜는 것을 기본으로 하고, 절차를 4-4 전환 체크리스트에 등재.
2. 페이지 레벨 metadata에 개별 `robots` 설정이 있는 페이지 grep → 게이트와 충돌 없는지 확인 (/demo의 noindex는 의도된 것).
3. `src/app/sitemap.ts`가 BASE_URL env를 따르는지 확인.
4. 검증: 프리뷰 배포에서 /robots.txt = Disallow all · 로컬에서 env 주입 빌드 시 allow 출력.

**Acceptance**: 위 4개 검증 통과 + 전환 당일 절차 1줄이 4-4 체크리스트(보드 4-4 행)에 추가됨.

---

## T5. [1-4] pricing 구조 정리 — 숫자 무관 작업만 (마감 7/19)

**Goal**: 가격 데이터 단일 소스화 + 시뮬레이터 상태 축소 + 미사용 코드 제거. **가격 숫자 추가·노출 금지.**

**Context**: `src/lib/pricing-data.ts`(123L) + `pricing-data.test.ts`(56L) · `src/components/pricing/CameraSimulator.tsx`(870L) · `PricingClientView.tsx` · `src/components/sections/PricingSection.tsx` · `/storeagent/pricing`은 이미 /pricing으로 301.

**Steps**
1. 가격 관련 하드코딩 산재 확인: `grep -rn` 으로 플랜명·티어 문자열이 pricing-data.ts 외부에 직접 박힌 곳 식별 → pricing-data.ts 참조로 통일.
2. 테스트를 3플랜 구조와 정합하게 정리 (플랜 수·이름 검증).
3. `CameraSimulator.tsx`: 시나리오 상태 13개 → 3개(플랜과 1:1)로 축소. 축소 후 파일이 과대하면(870L) 데이터 부분만 분리 검토 — 단, 과도한 리팩터링 금지.
4. 미사용 컴포넌트 식별: `PricingSection.tsx` 등 사용처 grep → 미사용 확정 시 삭제 (커밋 메시지에 목록 명시).
5. `/pricing` 3로케일 렌더 확인.

**Acceptance**: vitest·lint 통과 · 가격 숫자 미노출 유지 · 3로케일 /pricing 정상 렌더 · 미사용 컴포넌트 0.

---

## T6. [1-10] 호스팅 결정 — Vercel 유지 vs 대안 (결정: CP-2 7/24)

**요구사항 (이 사이트가 호스팅에 요구하는 것)**
- `redirects()`/middleware 서버 실행 (301 맵 — T1), `/api` 라우트 (Keystatic GitHub 모드 + 예정된 폼→HubSpot·Slack 핸들러 G-2a), Next 16 이미지 최적화, KO/EN/JP 라우팅.

**후보 비교**
| 후보 | 장점 | 단점/리스크 |
|---|---|---|
| **Vercel (현행)** | Next 16 네이티브(redirects·api·이미지 전부 동작), 현재 파이프라인 검증됨 | 트래픽 증가 시 비용, 벤더 종속 |
| Cloudflare (OpenNext) | 비용 우수, 엣지 | 어댑터 경유 — Next 16 호환 검증 필요, 이미지 최적화 별도, 마이그레이션 공수 |
| Netlify | 가능 | Vercel 대비 뚜렷한 이점 없음 |
| GitHub Pages (레포 GH_PAGES 모드) | 무료 | **불가** — 정적 export라 redirects/middleware/api 미동작 → 301 맵·폼 핸들러 전부 상실. 프리뷰 용도로만 유지 |
| 자체 호스팅 (Node) | 통제권 | 1인 운영 체제와 상충 (패치·모니터링 부담) |

**권고**: **8/10 런칭은 Vercel 유지.** 남은 3.5주에 플랫폼 전환은 리스크 대비 이득 없음. 런칭 후 D+90 리뷰에서 실측 데이터(Vercel 청구액·대역폭·이미지 변환량)로 재평가. 재평가 트리거: 월 청구액이 부담 수준 도달 또는 트래픽 급증. 그 시점 1순위 대안은 Cloudflare(OpenNext).

**Action**: CP-2(7/24)에서 확정 → 확정 시 1-2(도메인 사전 작업)를 Vercel 기준으로 진행.
