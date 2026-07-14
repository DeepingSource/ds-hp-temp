# ADMIN_TOOLING_PLAN_v1 — CMS·Analytics·카피 관리도구 로드맵

> **버전** v1.0 · **작성일** 2026-07-10 · **상태** SOT (본 트랙)
> **목표** 사이트를 "계속 변경/발전되는 시스템"으로 — ① 블로그 오써링 CMS, ② GA4+Umami 분석, ③ 카피·이미지의 비개발자 편집을 우선순위대로 구축.
> **확정 결정** — 분석: **GA4 + Umami 병행** · 편집자: **비개발 팀원 포함(GitHub 모드)** · 범위: **블로그 먼저, 페이지 카피는 점진 확대**.
> **입력** [blog-keystatic-phase2-proposal.md](./blog-keystatic-phase2-proposal.md) (블로그 CMS 상세안 — 본 문서의 Phase B가 이를 실행 트랙으로 채택)

---

## 0. 현황 (확인됨, 2026-07-10)

| 영역 | 현재 상태 | 격차 |
|---|---|---|
| 스택 | Next 16.1.6 · React 19 · Tailwind 4 · Vercel(ds-hp-temp) + GH Pages export 겸용 | — |
| 블로그 | Velite → `content/articles/**/*.mdx` **196편**(전부 ko) → `/resources/blog`. Phase 1 완료(cover·auto readTime·new-post 스캐폴드) | Keystatic 미연결 — 편집은 파일 직접 수정뿐 |
| 페이지 카피 | Keystatic **로컬 모드** 싱글톤 7개(home·products·storeAgent·saai·solutions·about·contact) → `content/site/*.yaml` → `gen-site-content.mjs` → 앱 import | dev 환경에서만 편집 가능 · 7페이지 외 카피는 코드에 하드코딩 · 이미지 필드 없음 |
| 인증 스캐폴드 | `/api/keystatic`·`/api/auth`·`/api/callback` 라우트 존재, `GITHUB_CLIENT_ID/SECRET` env 자리 확보 | GitHub App 미설치, storage `local` |
| 분석 | Umami 스캐폴딩(env 2종·docker-compose·주석 처리된 `<Analytics />`) | GA4 없음 · Umami 미가동 · **CSP가 외부 스크립트 차단** |

---

## Phase A — Analytics (GA4 + Umami) · 소규모, 최우선

즉시 가치가 나오고 다른 트랙과 독립적이므로 먼저 처리한다.

**A-1. GA4**
- GA4 속성 생성 → 측정 ID를 `NEXT_PUBLIC_GA_ID` env로.
- `@next/third-parties`의 `<GoogleAnalytics gaId=… />`를 `layout.tsx`에 추가(공식 권장, lazy 로드).
- 핵심 이벤트: `contact_submit` · `newsletter_submit` · `demo_click` · 주요 CTA 클릭. 폼 route handler가 이미 있으므로 클라이언트 이벤트만 추가.

**A-2. Umami**
- 호스팅 결정: Umami Cloud(무료 티어) 권장 — 기존 `docker-compose.umami.yml` 자가호스팅은 운영비가 있어 후순위.
- env 2종 설정 후 `layout.tsx`의 `<Analytics />` 주석 해제.

**A-3. CSP 갱신 (필수 게이트)**
- `next.config.ts` headers의 `script-src`/`connect-src`/`img-src`에 `*.googletagmanager.com` `*.google-analytics.com` + Umami 도메인 추가. **누락 시 두 스크립트 모두 조용히 차단됨.**

**A-4. 개인정보**
- GA4는 쿠키 사용 → `/legal/privacy`에 수집 항목 반영. (한국 개인정보보호법 관점에서 고지 필요 — 법무 검토는 별도. 참고: 익명화가 핵심 가치인 브랜드이므로 쿠키리스 Umami를 전면에, GA4는 내부용으로 쓰는 서사도 가능.)

**완료 기준**: 프로덕션에서 GA4 실시간 + Umami 대시보드에 페이지뷰 잡힘. GH Pages export 빌드도 그린.

---

## Phase B — 블로그 CMS (Keystatic articles 컬렉션) · 로컬 모드

[blog-keystatic-phase2-proposal.md](./blog-keystatic-phase2-proposal.md)를 그대로 실행. 요약:

| 단계 | 내용 | 게이트 |
|---|---|---|
| B-S 스파이크(반나절) | 실글 2~3편으로 Keystatic↔Velite 왕복 검증 — ① slug 방식 확정(권장: Velite `s.path()` 경로 유도), ② 커스텀 블록(Stat·Tip·Checklist·Callout·Quote·Source·PrivacyNote) 직렬화 충실도, ③ 프론트매터 호환, ④ 기존 글 무손실 재저장 | **통과해야 진행** |
| B-1 마이그레이션 | 196편 `content/articles/*.mdx`로 평탄화(폴더≠카테고리, 손실 0) — 스크립트·1커밋·가역 | `.velite` slug/개수 불변 |
| B-2 컬렉션 | `articles` collection + component blocks + `fields.image` 커버 | 글 1편 브라우저 E2E 편집 |

최대 리스크는 컴포넌트 블록 직렬화 불일치(B-S ②) — 실패 시 mdxComponents 어댑트 or 블록 축소.

---

## Phase C — 팀 오픈 (GitHub 모드 전환)

비개발 팀원이 브라우저에서 편집 → 자동 커밋 → Vercel 재배포되는 상태가 목표.

1. Keystatic GitHub App 생성·설치(레포: `DeepingSource/ds-hp-temp` → 추후 정식 레포로 이전 시 재설정).
2. `keystatic.config.tsx` storage를 `{ kind: 'github', repo: … }`로 전환, Vercel env(`KEYSTATIC_GITHUB_*`, `NEXT_PUBLIC_SITE_URL`) 설정. API 라우트는 이미 존재.
3. 편집 흐름 결정: main 직커밋(빠름) vs 브랜치+PR(프리뷰 배포로 검수 가능) — **블로그는 직커밋, 페이지 카피는 PR** 권장.
4. 편집자 온보딩: GitHub 계정 + 레포 write 권한, 비개발자용 편집 가이드 문서(README 확장).

**완료 기준**: 비개발 팀원 1명이 실제 글 1편을 발행하고 프로덕션 반영 확인.

---

## Phase D — 페이지 카피·이미지 점진 확대

트래픽·변경 빈도 기준으로 싱글톤을 늘린다. 페이지당 패턴이 이미 확립돼 있어(localized 필드 → yaml → gen-site-content) 기계적 작업.

- **우선 후보**: pricing → technology 허브 → resources 랜딩 → solutions 4종 → legal. (변경 요청이 실제로 오는 페이지부터.)
- **이미지**: 싱글톤에 `fields.image` 도입(`public/images/…` 업로드) — 블로그 cover와 같은 컨벤션. 대상: hero 이미지, 파트너 로고, 팀/오피스 사진처럼 교체 주기가 있는 것만. 레이아웃에 박힌 장식 이미지는 코드에 남긴다.
- **원칙**: "다음 분기에 바뀔 것 같은 텍스트/이미지"만 CMS로. 전부 옮기는 리팩토링은 하지 않는다(작업량 대비 효과 낮음).

---

## 지속 발전 체계 (본 계획 이후)

- **콘텐츠 대시보드**: GA4/Umami 데이터로 글별 성과 → 카테고리별 발행 우선순위 판단(분기 1회 리뷰).
- **다국어**: articles `lang` 필드가 이미 있으므로 en/jp 글 추가는 스키마 변경 없이 가능.
- **정식 도메인 전환 시**: GitHub App·`NEXT_PUBLIC_SITE_URL`·GA4 스트림 URL 재설정 체크리스트 필요(1커밋 분량).

## 실행 순서 & 의존

```
A (analytics) ──독립·즉시──▶ 완료
B-S ▶ B-1 ▶ B-2 ──▶ C (GitHub 모드) ──▶ D (카피 확대, C 이후 병렬 가능)
```

A와 B-S는 병렬 착수 가능. 예상 규모: A ≈ 1일 · B ≈ 2~3일 · C ≈ 1~2일 · D ≈ 페이지당 0.5일.
