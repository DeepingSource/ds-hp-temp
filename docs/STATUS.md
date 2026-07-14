# STATUS — 현재 작업 상태 (완료 · 잔여)

> **갱신** 2026-07-14 · **범위** 활성 작업 스트림의 완료/잔여 구분. 유지보수·이어받기용 단일 진입점.
> **라이브 SOT** 는 여전히 repo-root [`/DESIGN.md`](../DESIGN.md) + 라이브 `src/`. 이 문서는 *진행 상태*만 추적한다.
> 구 Phase 1–4 계획 산출물(`PLAN_v1`·`BRAND_v2`·`DESIGN_v2`·`CODE_v1`·`AUDIT_v1` 등)은 archive — [`docs/README.md`](./README.md) 참고.

읽는 순서: 처음이면 이 문서 → [`/README.md`](../README.md)(빌드/배포) → 편집자면 [`/help`](https://deepingsource.io/help) 또는 Keystatic 「편집 가이드」.

---

## 0. 한눈에

| 스트림 | 상태 | 근거 문서 |
|---|---|---|
| Vercel 배포 정상화 | ✅ 완료 | 이 문서 §1 |
| Keystatic CMS — GitHub 모드 전환 | ✅ 완료 | [PHASE_C](./PHASE_C_github-mode-setup.md) |
| Keystatic 고도화 (편집자 루프·온보딩) | 🟡 Week 1–3 완료, 대형 항목 잔여 | [KEYSTATIC_ENHANCEMENT_PLAN](./KEYSTATIC_ENHANCEMENT_PLAN_v1.md) |
| 페이지 카피 CMS화 (Phase D) | 🟡 8/13 싱글톤 | [ADMIN_TOOLING_PLAN](./ADMIN_TOOLING_PLAN_v1.md) |
| 홈페이지 피드백 반영 | 🟡 배치 A·B 완료, C·D 일부 | `피드백-반영-계획-260714.md` (repo-root) |
| 런치 준비 | 🟡 진행 중 | [LAUNCH_PLAN](./LAUNCH_PLAN_v1.md) |

---

## 1. Vercel 배포 정상화 ✅

- **증상(해결됨)**: `/keystatic` 어드민이 빈 화면. **원인**: 7/13 GitHub 모드 전환 후 Vercel 빌드가 `KEYSTATIC_*` env 누락으로 전멸(`makeRouteHandler` module-scope throw) → 마지막 성공 배포(local 모드 어드민)만 서빙.
- **조치**: ① Vercel env 설정(사용자) ② `src/app/api/keystatic/[...params]/route.ts` 가드 — env 누락 시 `/api/keystatic`만 503, 사이트 빌드는 통과 → **사이트 배포와 CMS env 분리**.
- 참고: 블로그 "189 vs 196" 편수는 오탐(`/resources/blog`는 weekly 제외가 설계, `src/lib/articles.ts`).

## 2. Keystatic CMS

### 현재 구성
- **GitHub 모드** — `DeepingSource/ds-hp-temp`, 어드민 `/keystatic` (GitHub 로그인). env: `KEYSTATIC_GITHUB_CLIENT_ID`·`_SECRET`·`KEYSTATIC_SECRET`·`NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`.
- **싱글톤 9개** — `editorGuide`(편집 가이드) · `home` · `pricing` · `products` · `storeAgent` · `saai` · `solutions` · `about` · `contact`. 저장 → `content/site/*.yaml`(카피) / `content/editor/guide.mdx`(가이드) → `scripts/gen-site-content.mjs` → `src/data/generated/site-content.json`.
- **`articles` 컬렉션** — `content/articles/*.mdx`(Velite가 직접 읽음). 필드: 제목·슬러그·요약·카테고리·게시일·읽기시간·태그·아이콘(select)·커버·본문(이미지 업로드)·언어·타깃·**초안(draft)**·**관련 글(relatedSlugs)**.

### 고도화 플랜 진행 (Week 1–3 완료)
| 항목 | 상태 |
|---|---|
| A-1 relatedSlugs 유실 버그 + 재발방지 lint (`npm run lint:frontmatter`) | ✅ |
| B-1 본문 인라인 이미지 업로드 | ✅ |
| B-2 초안(draft) 상태 | ✅ |
| B-3 예약 발행 (일일 재빌드) | ✅ `.github/workflows/schedule-rebuild.yml` + 시크릿 `VERCEL_DEPLOY_HOOK_URL` |
| B-4 필드 description·validation·기본값 | ✅ |
| B-5 아이콘 select (iconMap 44개) | ✅ |
| C-1/2/3 Admin UX (nav 그룹·entryLayout·columns) | ✅ |
| G-1 편집 가이드 싱글톤 + `/help` | ✅ |
| G-4 주간 글 골격 (`new:post -- <slug> weekly`) | ✅ |
| **D-1 실시간 프리뷰** | ⏸ 보류 — draftMode를 export되는 공유 blog 페이지에 넣으면 GH_PAGES 빌드 깨짐 + GitHub 로그인 없이 검증 불가 |
| **G-2 온보딩 30분 시나리오 실테스트** | ⬜ 프로세스(신규 편집자 1명) |
| **G-3 사이트 FAQ의 CMS 컬렉션화** | ⬜ 대형 (760줄 JSX→MDX 마이그레이션) |
| **G-5 docs/ 거버넌스** | 🟡 이 문서로 부분 착수 |
| **E-1 pricing 싱글톤 폼 다이어트** | ⬜ 대형 (YAML 구조 변경 + gen 동시 수정) |
| A-2 slug 정리 · D-2 branchPrefix · B-7 · F | ⬜ gated/선택 |

## 3. 페이지 카피 CMS화 (Phase D)

- **완료(8)**: home · products · store-agent · saai · solutions · about · contact · **pricing**(84필드, byte-identical 검증).
- **잔여**: technology · resources · solutions 업종 서브페이지 4종 · legal. 이미지 필드는 히어로/로고/팀사진 페이지에서 `fields.image`→`public/images/site/`로 도입.
- **레시피**(재사용): View 카피 추출 → `content/site/<page>.yaml` → `gen-site-content.mjs`에 `<PAGE>_FLAT` 배열+결과객체+로그 추가 → 생성 JSON이 기존과 byte-identical 확인 → View를 `siteContent.<page>` + 코드 상수(함수·토큰·SOT) 머지로 배선.

## 4. 홈페이지 피드백 반영 (`피드백-반영-계획-260714.md` · 16항목/4배치)

- **배치 A (카피) ✅**: #5 점주→사장님(B2C 호칭) · #6 흡인율→유입률(3로케일) · #10 DEEPINGSOURCE 표기 통일 · #11 masterCompany→"모든 공간을, 완벽하게"(하드코딩 미러 전량 전파).
- **배치 B (UI) ✅**: #1 언어 스위처 드롭다운 · #2 ProblemBeat 정렬 · #3 히어로 오버레이 박스 제거(이미지에 검출 내장) · #4 GNB 언더바→pill.
- **배치 C**: #8 models 이미지 = 이미 통합됨(확인) ✅ · #4 Spatial AI 모션 = ⬜ (프로토타입 선행).
- **배치 D**: #16 FAQ→문의 링크(부분) ✅ · #9 솔루션 히어로 업종 분화(카피 창작) · #12 블로그 가이드 saai 이관(URL redirect/SEO) · #13 도입사례 페이지화 · #14/15/16 잔여(docs/glossary/faq CMS화) = ⬜.

## 5. 런치 준비 (`LAUNCH_PLAN_v1.md`)

- **완료**: 애널리틱스 배선(GA4+Umami, env 게이트) · 블로그 CMS · Keystatic GitHub 모드 · R2(배포 stale) 해소.
- **잔여**: 도메인 전환(`deepingsource.io`) + GitHub App callback/`NEXT_PUBLIC_SITE_URL` 갱신 · noindex 게이트 해제(`NEXT_PUBLIC_ALLOW_INDEXING=true`) · GSC sitemap · GA4/Umami 계정 발급.

---

## 잔여 항목 우선순위 제안

1. **Phase D 카피 CMS화** 이어가기 (technology → resources → solutions 4종 → legal) — 편집자 커버리지 확대, 저위험·검증 가능.
2. **G-3 FAQ 컬렉션화** — 분기 4회 개발자 수정 실적, 편집자 셀프서비스 전환 효과 큼(대형).
3. **배치 D #12 블로그 가이드 이관** — SEO redirect 결정 필요.
4. **E-1 pricing 폼 다이어트** — 편집 UX(대형).
5. **D-1 프리뷰** — GitHub 로그인 환경에서 검증 가능해지면.
