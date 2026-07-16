# 런칭 게이트 — 검증 노트 (SPECS_WEEK1 T1·T3·T4 산출물)

> 작성 2026-07-16 · 대상: 8/10 전환(4-4 런북) 실행자. Notion 「Growth Planner」 4-4 행과 함께 참조.
> 관련: [REDIRECT_MAP_v1.md](./REDIRECT_MAP_v1.md) · `scripts/verify-redirects.mjs` · `src/app/robots.ts` · `src/app/sitemap.ts`

## 1. noindex 게이트 (1-5)

`src/app/robots.ts` — `NEXT_PUBLIC_ALLOW_INDEXING === 'true'`일 때만 `Allow: /`, 미설정 시 전면 `Disallow: /`.

**검증 (프로덕션 빌드·로컬 실측)**
| 조건 | /robots.txt | 결과 |
|---|---|---|
| env 미설정(프리뷰) | `User-Agent: * / Disallow: /` | ✅ 전면 차단 |
| `NEXT_PUBLIC_ALLOW_INDEXING=true` (빌드 시) | `Allow: /` + AI 크롤러 allow + `Disallow: /admin/,/api/` | ✅ 허용 |
| sitemap URL | `NEXT_PUBLIC_BASE_URL ?? https://deepingsource.io` 기준 | ✅ |
| sitemap 내 noindex 페이지(/demo·/styleguide·/help·/resources/docs/access) | 미포함 (274 URL) | ✅ 제외 |
| 개별 robots noindex 페이지 ↔ 전역 게이트 | 충돌 없음(allow 상태에서도 개별 noindex 유지) | ✅ |

**⚠️ 전환 당일 핵심 주의 — 재배포 필수**
`NEXT_PUBLIC_*` 변수는 **빌드타임에 번들로 인라인**된다. Vercel 대시보드에서 env만 바꾸면 반영되지 않는다 — **반드시 Redeploy**해야 robots.txt·sitemap의 도메인/allow가 갱신된다.

**4-4 전환 절차(1줄)**: Vercel Production env `NEXT_PUBLIC_ALLOW_INDEXING=true` + `NEXT_PUBLIC_BASE_URL=https://deepingsource.io` 설정 → **Redeploy(재배포)** → `/robots.txt`가 `Allow: /`인지, `/sitemap.xml`이 apex 도메인인지 확인. (Preview 환경엔 절대 설정 금지.)

## 2. /demo 내부 목업 차단 (1-6)

`src/proxy.ts` 게이트 + `src/app/demo/page.tsx` fail-safe 게이트(이중 방어).

**검증**: 프로덕션 빌드에서 `/demo`·`/ko/demo`·`/jp/demo` = **404**(3로케일), 목업 비노출. `ENABLE_MOCKUP_DEMO=true` 설정 시에만 200+갤러리 노출. 정상 페이지(`/contact`)는 200 유지.

**주의**: 이 프로젝트는 **Turbopack 프로덕션 빌드**를 쓰는데, dynamic 페이지의 `notFound()`가 **상태코드 200을 반환**한다(본문은 not-found UI라 목업은 안 새지만 SEO상 200은 부적절). 그래서 확실한 404는 `proxy.ts`(미들웨어)에서 존재하지 않는 경로로 rewrite해 얻는다 — page.tsx의 `notFound()` 단독에 의존하지 말 것. `/styleguide` 등 다른 내부 페이지도 동일 이슈 가능성이 있으므로 런칭 전 상태코드 실측 권장.

## 3. 구 URL → 301 리다이렉트 (1-1)

`scripts/crawl-old-site.mjs`로 구 사이트(163 URL) 크롤 → `scripts/verify-redirects.mjs`로 대조. 전 URL이 route/redirect로 커버(누락 0). HTTP 검증(`--http`)에서 163/163 = 200(≤1홉)/외부 앱 리다이렉트, 2홉·404 0건. 상세는 [REDIRECT_MAP_v1.md](./REDIRECT_MAP_v1.md).

**스테이징 전수 검증(4-1 게이트)**: `node scripts/verify-redirects.mjs --http https://<staging>` → 실패 0건 확인 후 Go.
