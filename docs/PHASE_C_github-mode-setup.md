# Phase C 준비 — Keystatic GitHub 모드 전환 가이드

> **목표** 비개발 팀원이 브라우저(`/keystatic`)에서 편집 → 자동 커밋 → Vercel 재배포.
> **현재** Keystatic = 로컬 모드(`storage: { kind: 'local' }`). 편집이 로컬 파일에만 반영됨.
> **전제** Phase A·B 완료(analytics 배선 · 블로그 `articles` 컬렉션 동작).
> ⚠️ **이 전환은 GitHub App 생성·설치(사용자 GitHub 권한)가 선행돼야 함.** App/env 없이 storage만
> `github`로 바꾸면 로컬 편집이 깨지므로, 아래 1~3을 먼저 끝낸 뒤 4(코드 전환)를 진행한다.

---

## 0. 먼저: 레거시 정리 대상 (혼동 주의)

현재 리포에 **Decap CMS 잔재**가 있음 — Keystatic과 무관하니 헷갈리지 말 것:
- `src/app/api/auth/route.ts` · `src/app/api/callback/route.ts` (Decap OAuth 프록시)
- `.env.example`의 `GITHUB_CLIENT_ID` · `GITHUB_CLIENT_SECRET` (Decap용, Keystatic이 안 씀)

Keystatic이 실제로 쓰는 것: **`/api/keystatic/[...params]/route.ts`**(이미 존재) + 아래 §2의 `KEYSTATIC_*` env.
→ Phase C 전환 시 Decap 잔재는 **삭제 권장**(선택, 별도 커밋).

---

## 1. GitHub App 생성 (가장 쉬운 길 = Keystatic 가이드 플로우)

Keystatic은 App을 대신 만들어주는 UI를 제공한다.

1. 먼저 §4의 코드 전환(storage=github)을 **로컬 브랜치에서** 해두고 `npm run dev` 실행.
2. `http://localhost:3000/keystatic` 접속 → env 미설정 상태면 **“Create GitHub App”** 버튼 표시.
3. 버튼 클릭 → GitHub App 생성 화면(manifest 자동 채움). App 이름 지정(예: `deepingsource-cms`).
4. 생성 완료되면 Keystatic이 **`KEYSTATIC_GITHUB_CLIENT_ID`·`KEYSTATIC_GITHUB_CLIENT_SECRET`·
   `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`** 값을 화면에 표시 → `.env.local`에 복사.
5. 생성된 App을 **대상 레포에 Install**(GitHub → App settings → Install App → `DeepingSource/ds-hp-temp` 선택).

**수동 생성**을 원하면(위 플로우 대신):
- GitHub → Settings → Developer settings → GitHub Apps → New GitHub App
- **Permissions**: Repository → *Contents* = **Read & write**, *Metadata* = Read-only,
  (PR 모드 쓸 경우) *Pull requests* = Read & write
- **Callback URL**: `https://<배포도메인>/api/keystatic/github/oauth/callback`
  (로컬 테스트용으로 `http://localhost:3000/api/keystatic/github/oauth/callback`도 추가)
- **Webhook**: 비활성(Active 체크 해제)
- 생성 후 **Client secret 발급** + **App slug**(URL의 앱 이름) 확보 + 레포에 Install.

---

## 2. 환경 변수 (로컬 `.env.local` + Vercel 양쪽)

| 변수 | 값 | 위치 |
|---|---|---|
| `KEYSTATIC_GITHUB_CLIENT_ID` | App의 Client ID | 서버(비공개) |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | App의 Client secret | 서버(비공개) |
| `KEYSTATIC_SECRET` | 임의 난수(세션 서명용). 예: `openssl rand -hex 32` | 서버(비공개) |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | App slug(공개 URL명) | 공개 |

- Vercel: Project → Settings → Environment Variables 에 4개 모두 등록(Production + Preview).
- `NEXT_PUBLIC_SITE_URL`(이미 `.env.example`에 있음)을 배포 도메인과 일치시킬 것.

---

## 3. 편집 흐름 결정 (커밋 방식)

| 콘텐츠 | 권장 | 이유 |
|---|---|---|
| 블로그(`articles`) | **main 직커밋** | 발행 빠름, 리뷰 부담 적음 |
| 페이지 카피(싱글톤) | **브랜치 + PR** | Vercel PR 프리뷰로 검수 후 머지 |

Keystatic 설정: 직커밋은 기본. PR 모드는 config에 `storage: { kind: 'github', repo, branchPrefix: ... }`
또는 컬렉션별 정책으로 조정(전환 시 결정).

---

## 4. 코드 전환 (App·env 준비 완료 후 1커밋)

`keystatic.config.tsx`:

```diff
- storage: { kind: 'local' },
+ storage: {
+   kind: 'github',
+   repo: { owner: 'DeepingSource', name: 'ds-hp-temp' },
+ },
```

- API 라우트(`/api/keystatic/[...params]`)는 이미 GitHub 모드를 지원(`makeRouteHandler`) — 수정 불필요.
- CSP: `/keystatic` 블록에 이미 `https://api.github.com https://github.com` 허용됨(Phase B 수정) — 수정 불필요.
- ⚠️ 전환 후 **로컬에서 `/keystatic`을 열려면 GitHub 로그인**이 필요(로컬 파일 직접 편집 불가).
  개발자가 파일을 직접 고치는 건 여전히 가능(에디터/CLI).

---

## 5. 검증 (완료 기준)

1. Vercel 배포본 `/keystatic` 접속 → GitHub 로그인 → 컬렉션 보임.
2. **비개발 팀원 1명**이 GitHub 계정 + 레포 write 권한으로 로그인.
3. 블로그 글 1편 편집·저장 → 커밋 생성 확인 → Vercel 재배포 → 프로덕션 반영 확인.
4. 페이지 카피 싱글톤 1개 편집 → (PR 모드면) PR 생성 + 프리뷰 확인.

---

## 6. 편집자 온보딩 (문서 확장)

- 편집자에게 필요한 것: GitHub 계정 + `DeepingSource/ds-hp-temp` write 권한.
- `content/articles/README.md`(작성 가이드)를 비개발자 눈높이로 확장:
  `/keystatic` 접속 → 로그인 → “블로그 글” → New → 폼 작성(제목·요약·카테고리·커버·본문 블록) → Save.
- 커스텀 블록 사용법(Stat·Tip·Checklist·Callout 등) 스크린샷 안내 추가 권장.

---

## 7. 정식 도메인 전환 시 재설정 체크리스트 (1커밋 분량)

- GitHub App **Callback URL**을 새 도메인으로 갱신(또는 도메인 추가).
- Vercel `NEXT_PUBLIC_SITE_URL` = 새 도메인.
- (레포 이전 시) App 재설치 + `keystatic.config` `repo` owner/name 갱신.
- GA4 스트림 URL / Umami(또는 대체 analytics) 사이트 URL 갱신.

---

## 리스크 & 메모

- **GitHub App 운영비 = 무료**(GitHub App 자체는 무료). 유일한 비용은 설정 수고.
- 로컬 모드 편의(로그인 없이 편집)를 유지하고 싶으면: **개발 브랜치는 local, 배포는 github**로
  분기하는 방법도 있으나 config 분기 복잡도↑ → 권장 안 함. 팀 편집이 목표면 github 단일화.
- **Keystatic Cloud**(managed 인증, `keystatic.cloud`)도 대안 — App 직접 관리 없이 OAuth 위임.
  단 외부 서비스 의존 추가. 자체 App(위 가이드)이 의존성 최소.
