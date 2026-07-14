# Deeping Source 코퍼레이트 사이트 — `deepingsource.io`

Next.js 16 (App Router) 기반 회사 사이트. 제품·기술 소개, STOREAGENT 목업, 다국어(en/ko/jp), Keystatic CMS, Velite 블로그를 포함한다.

> 현행 기준(SOT)은 [`DESIGN.md`](./DESIGN.md)와 라이브 `src/` 트리. `docs/`는 history 보존용 계획 산출물이다 — [`docs/README.md`](./docs/README.md) 참고.
> **작업 진행 상태(완료·잔여)는 [`docs/STATUS.md`](./docs/STATUS.md)** — 이어받기·유지보수 시 먼저 본다.

---

## 기술 스택

- **Next.js 16** (App Router, React 19) — 서버 모드 (API 라우트 + proxy 미들웨어)
- **Tailwind CSS v4** + 디자인 토큰 (`globals.css` + `tokens.ts`)
- **Velite** — 블로그/용어집 콘텐츠 (`content/`)
- **Keystatic** — CMS (`/keystatic`, **GitHub 모드** — `DeepingSource/ds-hp-temp`). `articles` 블로그 컬렉션 + **16 싱글톤**(홈·제품·기술·솔루션·업종 4종·리소스·요금·회사·상담 등 페이지 카피 + 법무 2). 편집 가이드는 사이트 `/help` 또는 CMS 「편집 가이드」. 카피는 `content/site/*.yaml` → `gen-site-content.mjs` → `src/data/generated/site-content.json`으로 컴파일된다.
- **Vitest** — 테스트 / **ESLint** — 린트

## 빠른 시작

```bash
npm install
npm run dev          # http://localhost:3000
```

`predev`/`prebuild`가 `gen:content`(사이트 카피 생성)를 자동 실행하고, Velite는 `next.config.ts`에서 빌드된다.

## 스크립트

| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 (서버 모드 — Vercel과 동일) |
| `npm start` | 빌드 결과 서버 실행 |
| `npm run lint` | ESLint |
| `npm run lint:tokens` | 디자인 토큰 가드 |
| `npm run lint:frontmatter` | 블로그 프론트매터 키 ↔ Keystatic 스키마 대조 (유실 방지) |
| `npm run gen:content` | 사이트 카피 YAML → `site-content.json` 생성 (predev/prebuild 자동) |
| `npm run new:post -- <slug> [category]` | 블로그 글 스캐폴드 (`weekly`면 주간 골격) |
| `npm test` | Vitest |

## 환경변수

모든 변수에 코드상 fallback이 있어 **미설정이어도 빌드·실행은 정상**이다. 프로덕션 동작(폼 알림, 애널리틱스, Keystatic GitHub 모드)에만 필요하다. 전체 목록과 설명은 [`.env.example`](./.env.example) 참고.

요약:

| 변수 | 용도 | 미설정 시 |
|---|---|---|
| `NEXT_PUBLIC_BASE_URL` | sitemap/robots | `https://deepingsource.io` |
| `SLACK_WEBHOOK_URL` | contact/newsletter 폼 알림 | 알림만 생략 (폼 제출은 성공) |
| `NEXT_PUBLIC_SITE_URL` | Keystatic GitHub OAuth origin | `https://deepingsource.io` |
| `KEYSTATIC_GITHUB_CLIENT_ID` / `_SECRET` | Keystatic GitHub 모드 OAuth (서버) | `/keystatic` 어드민이 503 (사이트 빌드·배포는 정상) |
| `KEYSTATIC_SECRET` | Keystatic 세션 서명 (`openssl rand -hex 32`) | 상동 |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | GitHub App slug (빌드타임 인라인) | 상동 — 설정 후 **재배포** 필요 |
| `NEXT_PUBLIC_ALLOW_INDEXING` | 운영 도메인에서 색인 허용 | `noindex`/`Disallow:/` (임시 도메인 안전) |
| `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_UMAMI_*` | 애널리틱스 (선택) | 스크립트 미주입 |

> ⚠️ Keystatic GitHub 모드 env는 **Production + Preview 모두**에 설정한다. `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`는 빌드타임에 인라인되므로 값 추가/변경 후 **반드시 재배포**해야 반영된다. 상세 절차는 [`docs/PHASE_C_github-mode-setup.md`](./docs/PHASE_C_github-mode-setup.md).
>
> **GitHub Actions 시크릿**: `VERCEL_DEPLOY_HOOK_URL` — 매일 예약 재빌드(`.github/workflows/schedule-rebuild.yml`, 미래 날짜 블로그 글 발행)용. 없으면 워크플로는 건너뛴다.

---

## 배포

### Vercel — 기본/권장 (서버 모드)

zero-config. repo를 import하고 **Deploy**만 누르면 된다. 환경변수는 전부 선택사항이므로 처음엔 **비워둔 채 배포**해도 동작하고, 필요해질 때 **Settings → Environment Variables**에서 추가한다.

- Framework: **Next.js** (자동 감지)
- Build/Output: 자동 (Override 불필요)
- Node: `engines.node` + `.nvmrc`(22) 로 고정
- `vercel.json` 없음 — redirects/headers는 `next.config.ts`(서버 모드)에 있다.

> ⚠️ **`GH_PAGES` / `NEXT_PUBLIC_BASE_PATH` 는 Vercel에서 절대 설정하지 말 것.** GitHub Pages 정적 export 전용이며, 설정하면 서버 모드(API·미들웨어·이미지 최적화)가 깨진다.

### GitHub Pages — 대체 (정적 export)

서버 기능을 제거한 정적 사본. `DeepingSource/ds-hp-temp` gh-pages 브랜치용.

```bash
bash scripts/build-ghpages.sh   # → ./out (basePath=/ds-hp-temp)
```

이 스크립트는 정적 export가 빌드할 수 없는 server-only 조각(`api/`, `proxy.ts`, `robots`/`sitemap`/`og` 라우트, Keystatic)을 임시로 빼고 빌드한 뒤 복원한다. 소스는 수정되지 않는다.

---

## 프로젝트 구조 (요약)

```
src/app/         App Router 라우트 (en 기본 + /ko, /jp 경로 프리픽스)
src/app/api/     서버 라우트 핸들러 (contact, newsletter, keystatic auth)
src/proxy.ts     미들웨어 — agent.* 호스트 미니사이트 라우팅
src/components/  공유 View·컴포넌트
src/data/        STOREAGENT 목업 데이터 (canonical.ts = SOT)
content/articles/  블로그 MDX (Velite)         content/site/     페이지 카피 YAML (Keystatic 싱글톤)
content/editor/    편집 가이드 MDX (/help)     content/legal/    개인정보·약관 MDX (법무 싱글톤)
scripts/         gen-site-content, build-ghpages, check-design-tokens
docs/            계획 산출물 (history, archive)
```
