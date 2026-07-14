# Keystatic 고도화 계획 v1.2

> 🟢 **진행 상태(2026-07-14)**: Week 1–3 코드 항목 완료 — A-1·B-1·B-2·B-3·B-4·B-5·C-1/2/3·G-1·G-4 + A-1 재발방지 lint. **잔여**: D-1(프리뷰·보류) · G-2(온보딩 실테스트) · G-3(FAQ 컬렉션화) · G-5(docs 거버넌스·부분) · E-1(pricing 폼 다이어트) · A-2·D-2·B-7·F. 통합 현황은 [`STATUS.md`](./STATUS.md).


> **일자** 2026-07-14 · **입력** [keystatic.com/docs](https://keystatic.com/docs/introduction) 전수 검토 + `keystatic.config.tsx` · `src/lib/articles.ts` · `gen-site-content.mjs` · git log(콘텐츠 수정 빈도) · [PHASE_C](./PHASE_C_github-mode-setup.md) · [B-S 스파이크](./blog-keystatic-spike-B-S-findings.md)
> **현재** Keystatic `0.5.50` · GitHub 모드(`DeepingSource/ds-hp-temp`) · `articles` 컬렉션 + 싱글톤 8개 · Velite(블로그) + `gen-site-content.mjs`(페이지 카피 YAML→JSON 컴파일)
> **목표** ① 데이터 유실 리스크 제거 ② **실제 편집자의 글쓰기 루프 완성**(초안→이미지→프리뷰→발행) ③ **접속 즉시 쓸 수 있는 온보딩**(매뉴얼·FAQ가 CMS 안에) ④ 운영 워크플로(브랜치/PR·예약발행) 정착
> **v1.1** 편집자 편의 트랙(§B) 신설. **v1.2** 온보딩·문서화·고빈도 편집 트랙(§G) 신설 — git log 빈도 데이터 기반.

---

## 0. 요약 — 우선순위 한눈에

| 순위 | 항목 | 근거 | 공수 | 성격 |
|---|---|---|---|---|
| **P0** | A-1 `relatedSlugs` 유실 버그 수정 | fields/ignored·relationship | 0.5h | **버그** |
| **P0** | B-1 본문 인라인 이미지 업로드 설정 | fields/mdx options | 2h(+검증) | **편집자 차단 요소** |
| P1 | B-2 초안(draft) 상태 | 스키마+Velite 필터 | 반나절 | 편집자 필수 |
| P1 | B-3 예약 발행 완성 (일일 재빌드) | Vercel cron/deploy hook | 2h | 편집자 필수 |
| P1 | B-4 필드 가이드 내장 (`description`·validation·기본값) | Fields API 공통 옵션 | 반나절 | 편집자 편의 |
| **P1** | G-1 CMS 안의 편집 가이드 + 편집자 FAQ | 가이드 싱글톤 + `/help` | 1d | **온보딩 핵심** |
| P1 | C-1~3 Admin UX 묶음 (내비·entryLayout·columns) | user-interface 등 | 반나절 | 쉬운 개선 |
| **P1** | D-1 실시간 프리뷰 (draft mode + `previewUrl`) | recipes/real-time-previews | 1d | **최대 체감** |
| P1 | G-3 사이트 FAQ의 CMS 컬렉션화 | git log: 분기 4회 코드 수정 | 1–2d | 고빈도 편입 1순위 |
| P2 | G-4 주간 글 신속 생성 (템플릿/복제) | weekly 26편 운영 중 | 반나절 | 반복 작업 단축 |
| P2 | A-2 slug 이중 입력 정리 · B-5 아이콘 select | fields/slug·select | 3h | 실수 방지 |
| P2 | D-2 `branchPrefix` + PR 워크플로 | github-mode | 0.5d | 운영 |
| P2 | E-1 싱글톤 폼 다이어트 | fields/conditional·blocks | 1–2d | UX |
| P2 | G-5 docs/ 거버넌스 (편집자·개발자 문서 분리) | INDEX.md 이미 stale 공지 | 반나절 | 문서 운영 |
| P3 | B-7 CMS 미커버 영역 편입 (Header/Footer·법무 등) | 싱글톤 추가 | 단계적 | 커버리지 |
| P3 | F-1 Reader API 타입 / F-2 Admin 차단 정리 | reader-api·recipe | 0.5d | DX |

**편집자 여정으로 보면**: 접속(G-1 온보딩) → 무엇을 고칠지 찾기(G-1 매핑표·B-4 description) → 편집(B-1 이미지·C 에디터 UX·E 폼 다이어트) → 확인(D-1 프리뷰) → 발행(B-2 초안·B-3 예약) → 막히면(G-1 FAQ·G-5 문서).

---

## A. P0 — 데이터 정합성

### A-1 `relatedSlugs` 유실 버그 ⚠️

- **문제**: `relatedSlugs`가 Velite 스키마·실제 글(예: `summer-prep-guide.mdx` 등 다수)에 존재하고 `getRelatedArticles()`가 실사용하지만, **Keystatic `articles` 스키마에 없음**. Keystatic은 스키마에 없는 프론트매터를 재저장 시 **삭제** → 편집자가 글을 열고 저장만 해도 관련글 링크가 조용히 사라짐.
- **수정 A(권장)**: `fields.array(fields.relationship({ label: '관련 글', collection: 'articles' }))` — 드롭다운 선택(오타 제거 + 편집 가능).
- **수정 B(최소)**: `relatedSlugs: fields.ignored()` — 왕복 보존만.
- **재발 방지**: 프론트매터 키 전수 추출 → 스키마 대조 체크를 `lint` 계열에 추가.
- **검증**: 해당 글 1편 열고 저장 → `git diff` 보존 확인.

### A-2 slug 이중 입력 정리 (스파이크 §2① 후속 · P2)

- `fields.slug({ name })`의 슬러그 입력 2개 노출 혼란. 평탄화 완료로 옵션 (a) 전환 가능: Velite `s.path()` + 프론트매터 `slug:` 제거(1커밋·가역) + `slugField` 정리.
- **게이트**: `.velite` 산출 slug/개수 불변 검증.

---

## B. 편집자 편의 트랙 — "글 하나를 처음부터 끝까지"

편집자가 글 1편을 발행하는 루프: **초안 작성 → 본문 이미지 삽입 → 미리보기 → 발행(즉시/예약)**. 현재 4단계 중 3개가 막혀 있거나 불완전함.

### B-1 본문 인라인 이미지 업로드 ⚠️ (P0 — 사실상 차단 요소)

- **문제**: `fields.mdx`에 **`options.image` 미설정**. 기본값은 이미지를 콘텐츠 파일 옆(`content/articles/`)에 저장 → `public/` 밖이라 **사이트에서 안 보임**. 본문에 이미지를 붙여넣는 순간 깨진 글이 됨(커버만 설정돼 있음).
- **수정**:

```ts
body: fields.mdx({
  label: '본문',
  components: blogComponents,
  options: {
    image: { directory: 'public/images/blog', publicPath: '/images/blog/' },
  },
}),
```

- **검증(스파이크 반나절)**: 붙여넣기·드래그 업로드 → `![...](/images/blog/...)` 직렬화 → Velite 빌드·실렌더 확인. 파일명 충돌 동작 확인.
- **부수 정책**: 파일명 규칙(슬러그 접두)·용량 가이드(webp 권장, 500KB 이하)를 G-1 가이드에 명시. GitHub 모드 특성상 리포에 바이너리가 쌓이므로 상한 필수.

### B-2 초안(draft) 상태 (P1)

- **문제**: 쓰다 만 글의 저장처가 "main 커밋(=발행)"뿐.
- **수정(권장)**: `draft: fields.checkbox({ label: '초안 (사이트에 노출 안 됨)', defaultValue: false })` + Velite `draft: s.boolean().default(false)` + `articles.ts` 필터 `!a.draft`. 목록 `columns`에 노출.
- **대안(병행)**: D-2의 `cms/` 브랜치 저장 — 대형 개편용. 가벼운 초안은 checkbox.
- **주의**: draft 글도 리포에는 커밋됨(public 리포면 노출) — 민감 내용은 브랜치안.

### B-3 예약 발행 완성 (P1)

- **현재 반쪽 동작**: `articles.ts`가 KST 기준 미래 날짜를 이미 필터 → 날짜만 미래로 넣으면 "예약"은 됨. **그러나 정적 빌드라 재빌드 없이는 그 날짜가 와도 안 뜸.**
- **수정**: Vercel Deploy Hook + 스케줄러(Vercel Cron 또는 GitHub Actions `schedule`)로 **매일 00:05 KST 재빌드**.
- **효과**: "다음 주 월요일 발행" 워크플로 완성 — 주간 콘텐츠 운영(G-4)과 직결.

### B-4 필드 가이드 내장 + 검증 강화 (P1)

모든 필드가 `description`·`validation`을 지원하는데 현재 label만 사용. **가이드 문서를 안 읽어도 폼이 안내**하도록:

- **description 전 필드 추가** — excerpt: "목록 카드·검색결과·SNS 공유에 노출되는 1~2문장" / date: "미래 날짜 = 해당일 00시(KST) 이후 자동 발행" / tags: "항목별 추가, 기존 태그 재사용 권장".
- **싱글톤 description에 대상 페이지 URL 명시** — 예: home 싱글톤 첫 필드에 "이 문서 = 홈페이지(`/`) 카피. 저장 후 3분 내 반영". 편집자의 "어느 문서를 고쳐야 하지?" 탐색 시간을 없앰(G-1 매핑표와 이중 안전망).
- **validation** — `date`·`excerpt` isRequired, `title` 길이 상한(OG 잘림 방지).
- **defaultValue** — `date: { kind: 'today' }`.
- **coverAlt 조건화** — `fields.conditional`로 cover 있을 때만 노출+필수(접근성 강제).
- 템플릿 토큰(`{n}`·`{label}`) 있는 필드는 description에 "토큰 삭제 금지" 명시.

### B-5 아이콘 필드 select 전환 (P2)

- `icon: fields.text` 자유 입력 → 오타 시 조용히 깨짐. 사용 중 아이콘 목록을 `fields.select`로 제한(한글 병기 라벨). 신규 아이콘은 개발자가 옵션 추가.

### B-7 CMS 미커버 영역 편입 (P3 — 단계적, G-3과 연동)

| 영역 | 현재 위치 | 편입 우선순위 |
|---|---|---|
| **사이트 FAQ** | `src/data/faq-data.tsx`·`faq-i18n.tsx` (760줄 JSX) | **최상 — G-3으로 승격** (분기 4회 수정 실적) |
| Header/Footer 내비 라벨·법인 정보 | 코드 하드코딩 | 높음 |
| solutions 카피 (`solutionsData.ts`·`solutions-i18n.ts`) | 코드 | 높음 (분기 5회+2회 수정 실적) |
| 이미지 매핑 (`siteImages.ts`) | 코드 | 중 (분기 5회 — 단, 구조상 코드 유지가 맞을 수 있음, 검토) |
| 법무 페이지 (terms/privacy/legal) | 코드 | 중 — `fields.mdx` 싱글톤 후보 |
| glossary | 코드/데이터 | 중 |
| technology·company·demo 등 카피 | 코드 | 낮음~중 — `localized()` 패턴 확장 |

편입마다 `gen-site-content.mjs` 수정 필요 → F-1 스키마 유도 리팩터를 먼저 하면 비용 감소.

---

## C. P1 — Admin UX 손쉬운 개선 (반나절 묶음)

### C-1 내비게이션 그룹핑 + 브랜드 마크 ([user-interface](https://keystatic.com/docs/user-interface))

```ts
ui: {
  brand: { name: 'DeepingSource', mark: ({ colorScheme }) => <img src="/logo.svg" height={24} /> },
  navigation: {
    '시작하기': ['editorGuide'],                    // ← G-1 가이드 싱글톤을 최상단에
    '블로그': ['articles'],
    '자주 편집': ['faqs', 'home', 'pricing'],       // ← G-3 이후: 고빈도 문서 전면 배치
    '페이지 카피 · 제품': ['products', 'storeAgent', 'saai'],
    '페이지 카피 · 회사': ['about', 'solutions', 'contact'],
  },
},
```

그룹명 자체가 온보딩 역할을 함 — 첫 화면에서 "시작하기 → 자주 편집" 순서로 시선 유도.

### C-2 블로그 에디터 전체 폭 ([entry-layout](https://keystatic.com/docs/entry-layout))

`articles`에 `entryLayout: 'content'` — 본문 전체 폭 + 메타데이터 사이드 패널. 한 줄 변경.

### C-3 목록 컬럼 확장

`columns: ['title', 'date']` → `['title', 'date', 'category', 'lang', 'draft']`(B-2 후). 196편+ 스캔성.

---

## D. 워크플로 — 프리뷰와 브랜치

### D-1 실시간 프리뷰 (P1 · [recipes/real-time-previews](https://keystatic.com/docs/recipes/real-time-previews))

**"저장 → 배포 대기" 없이 편집 브랜치를 즉시 미리보기.** GitHub 모드 + Vercel(서버 빌드) 전제 충족(정적 export는 GH_PAGES 빌드에만 적용).

1. `app/preview/start/route.tsx` — draft mode on + `ks-branch` 쿠키 / 2. `app/preview/end/route.tsx` + "End preview" 버튼
3. draft-mode-aware reader: 평시 `createReader`, 프리뷰 시 `createGitHubReader(config, { repo, ref: branch, token: cookies().get('keystatic-gh-access-token')?.value })`
4. `previewUrl` — `articles`: `/preview/start?branch={branch}&to=/ko/resources/blog/{slug}`(실라우트 확인), 싱글톤: 해당 페이지.

**우리 구조 주의**: 페이지 카피는 빌드타임 JSON, 블로그는 Velite 경유 → 프리뷰 라우트는 draft mode일 때 GitHub reader 직접 렌더 경로 필요. **1차 범위 = articles 한정**(1일 내). 싱글톤 프리뷰는 E-1 이후.

### D-2 `branchPrefix` + PR 편집 워크플로 (P2 · [github-mode](https://keystatic.com/docs/github-mode))

- `branchPrefix: 'cms/'` → 브랜치 드롭다운 `cms/*`만 노출·생성.
- 운영 규칙(G-1 가이드에 명문화): 일상 카피 = main 직접 저장 / 신규 글·대형 개편 = `cms/` 브랜치 → PR → Vercel 프리뷰 검수 → 머지.

---

## E. P2 — 싱글톤 폼 다이어트

`pricing` flat 필드 ~80개 = 스크롤 지옥. `fields.object` 섹션화(hero/B2C/차이박스/B2B시뮬/엔터프라이즈/번들/오류문구) + `fields.conditional`(케이스별 노출) + `fields.blocks`(추가·삭제가 필요한 배열만). `idItem` 패턴(구조는 코드)은 유지. YAML 구조 변경 = `gen-site-content.mjs` 동시 수정 + 페이지당 1커밋 마이그레이션. 순서: `pricing` → `about` → 나머지.

---

## F. P3 — DX·정리

### F-1 Reader API 타입 활용 ([reader-api](https://keystatic.com/docs/reader-api))

- 사전 컴파일 방식 유지(클라이언트 동기 import 제약). `Entry<>` 타입으로 드리프트 감지. `*_FIELDS` 수동 배열 제거(스키마에서 유도 — B-7/G-3 편입 비용 절감). sitemap·OG 등 서버 전용은 Reader 직접 호출 전환 가능.

### F-2 프로덕션 Admin 차단 정리 ([recipe](https://keystatic.com/docs/recipes/nextjs-disable-admin-ui-in-production))

GH_PAGES 제외 방식 유지. env 스위치 패턴으로 스테이징/프로덕션 제어 명시화. 선택.

---

## G. 온보딩·문서화·고빈도 편집 트랙 (v1.2 신설)

> 원칙: **접속한 편집자가 문서를 찾아 헤매지 않고 바로 반영할 수 있어야 한다.** 매뉴얼은 CMS 밖(GitHub·Notion)이 아니라 **CMS 안과 폼 안**에 있어야 실제로 읽힌다.

### G-1 CMS 안의 편집 가이드 + 편집자 FAQ (P1 — v1.1 B-6의 확장·구체화)

Keystatic은 대시보드 커스터마이즈(위젯·안내문)를 지원하지 않음 → 우회 설계:

- **`editorGuide` 싱글톤 신설**(`fields.mdx`, `docs/editor/guide.mdx` 저장) — 내비 최상단 '시작하기' 그룹에 배치(C-1). 편집자는 CMS 안에서 가이드를 읽고, **가이드 자체도 CMS로 유지보수**됨(문서 신선도 문제를 구조로 해결).
- **사이트 `/help` 내부 라우트**(noindex)로 같은 문서를 렌더 — CMS 밖에서도 URL 하나로 공유 가능. 첫 권한 부여 메일에 이 URL 포함.
- **가이드 목차(초안)**:
  1. 처음 오셨나요 — GitHub 로그인·권한 요청 절차(스크린샷)
  2. **"이 문구 어디서 고쳐요?" 매핑표** — 사이트 페이지 URL ↔ CMS 문서 이름 대응표(예: `/pricing` → "Pricing — 요금 카피"). 편집자 질문의 대부분이 여기서 해소됨
  3. 블로그 글 쓰기 — 초안(B-2)→이미지 규칙(B-1)→커스텀 블록 8종 사용 기준(언제 Tip vs Callout)→예약 발행(B-3)→프리뷰(D-1)
  4. 페이지 카피 고치기 — 토큰(`{n}` 등) 절대 삭제 금지, 저장 = 즉시 배포(약 3분)
  5. 브랜치로 작업하기(D-2) — 언제 main 직접 저장 vs 브랜치인지
- **편집자 FAQ 섹션**(같은 문서 내, 운영하며 축적): "저장했는데 사이트에 안 보여요(배포 3분 + 캐시)" / "이미지가 깨져요" / "실수로 지웠어요(git 복구 — 개발자 호출 기준)" / "둘이 동시에 같은 문서를 열었어요(마지막 저장이 이김 — 사전 조율)" / "미래 날짜 글이 안 보여요(정상 — 예약 발행)".
- **폼 내 안내(B-4)와 역할 분담**: 폼 description = 필드 단위, 가이드 = 흐름·정책. 같은 내용 이중 기재 금지(단일 출처: 가이드, 폼은 한 줄 요약+참조).

### G-2 첫 접속 30분 온보딩 시나리오 (P1 — G-1의 수용 기준)

신규 편집자 온보딩을 "문서 전달"이 아니라 **검증 가능한 시나리오**로 정의:

1. 권한 부여 메일 수신(로그인 URL + `/help` 링크) → 2. GitHub 로그인 성공 → 3. '시작하기' 가이드 5분 훑기 → 4. 연습용 draft 글 1편 생성(이미지 1장 포함) → 5. 프리뷰 확인 → 6. draft 해제 없이 종료(발행 안 됨을 확인).

이 시나리오가 **개발자 도움 없이 30분 내 완주**되면 온보딩 합격. G-1·B 트랙 완료 후 실제 신규 1명으로 테스트(기존 "편집자 1명 실사용 테스트" 게이트를 이 시나리오로 대체).

### G-3 사이트 FAQ의 CMS 컬렉션화 (P1 — 고빈도 편집 1순위)

- **근거(git log, 4월 이후)**: `faq-data.tsx` 4회 + `faq-i18n.tsx` 4회 수정 — FAQ 문구 수정이 매번 **개발자 코드 작업 + 배포**로 처리되고 있음. 760줄 JSX 하드코딩.
- **설계**: `faqs` 컬렉션 — `question`(localized), `answer`(`fields.mdx`, 링크·리스트 등 현행 JSX 표현을 커버할 최소 컴포넌트), `category`(select), `order`(integer), `pages`(multiselect — 노출 페이지: 통합 FAQ/storeagent/pricing…).
- **마이그레이션**: 기존 JSX answer를 MDX로 변환(수작업+스크립트 반반, `answer`가 함수형인 항목은 locale 링크 처리 규칙 필요) → FAQ 페이지가 컬렉션을 읽도록 전환 → `faq-data.tsx`·`faq-i18n.tsx` 삭제.
- **효과**: 분기 4회의 개발자 티켓이 0이 되고, FAQ가 "자주 편집" 그룹(C-1)에서 편집자 셀프서비스로 전환.
- **다음 후보**: `solutionsData.ts`(5회)·`solutions-i18n.ts`(2회) — FAQ 전환 경험 후 같은 패턴 적용(B-7 표와 연동).

### G-4 주간 글 신속 생성 — 템플릿/복제 (P2)

- **문제**: weekly 26편 운영 = 가장 잦은 반복 작업인데, 매번 빈 폼에서 시작(프론트매터 7개 필드 + 본문 골격 수동).
- **1안(확인 필요)**: Keystatic Admin의 **entry 복제(duplicate)** 지원 여부 확인 → 지원 시 "주간 템플릿" draft 글 1편(본문 골격+블록 배치 완성)을 두고 복제→수정 운영.
- **2안(fallback)**: `new:post` 스크립트를 확장해 weekly 골격 커밋을 만들어 두면 편집자는 Keystatic에서 열어 내용만 채움(개발자가 주초 1회 실행 or Actions 자동화).
- 어느 쪽이든 **주간 글 작성 시간 목표: 골격 작업 0분**, 가이드(G-1) §3에 절차 수록.

### G-5 docs/ 거버넌스 — 편집자 문서와 개발자 문서 분리 (P2)

`docs/`는 현재 30+ 파일이 개발·기획 산출물 중심이고 INDEX.md 스스로 "Phase 1–4 산출물은 archive, 라이브 SOT는 DESIGN.md"라 공지한 상태. 편집자가 진입하면 길을 잃는 구조:

- **`docs/editor/` 신설** — `guide.mdx`(=G-1 싱글톤 저장처)·이미지 규칙·워크플로 다이어그램. **편집자에게 노출되는 유일한 폴더**로 선언.
- **INDEX.md에 독자별 진입점 추가** — 최상단에 "편집자는 `docs/editor/` 또는 사이트 `/help`만 보면 됨 / 개발자는 DESIGN.md → 본 계획" 2줄. (기존 카탈로그는 archive 상태 그대로 보존.)
- **CMS 문서 참조 그래프 갱신** — PHASE_C·스파이크·phase2 제안서·본 계획의 관계를 본 문서 헤더처럼 상호 링크(이미 부분 적용). 완료된 계획 문서에는 상단에 "구현 완료, 현행은 X 참조" 배너(INDEX 방식 답습).
- **신선도 규칙** — CMS 워크플로를 바꾸는 PR은 `docs/editor/guide.mdx` 갱신을 체크리스트에 포함(가이드가 CMS 콘텐츠이므로 편집자 눈에 항상 최신).

---

## 참고 — 검토했으나 보류

- **Keystatic Cloud / Cloud Image**: 유료 + GitHub App과 중복. B-1로 충분.
- **다국어 공식 기능**: 내장 i18n 없음 — `localized()` 트리플 유지. 블로그 `lang` 필드 유지.
- **Markdoc 전환**: 커스텀 블록 8종 MDX 검증 완료(스파이크 GO) → 전환 이유 없음.
- **`target=saai` 이관 큐**: `getBlogArticles()`가 target 미필터 — 사이트 로직 이슈로 별도 트래킹.
- **커스텀 대시보드/위젯**: Keystatic 미지원 — G-1의 가이드 싱글톤 + 내비 그룹핑으로 우회(재확인 불필요).

## 실행 순서 제안

```
Week 1  A-1 relatedSlugs(즉시) → B-1 본문 이미지(스파이크 포함) → C 묶음(반나절) → B-4 필드 가이드·검증
Week 2  B-2 초안 + B-3 예약발행(발행 상태 모델 완성) → D-1 실시간 프리뷰(articles 한정)
Week 3  G-1 가이드·FAQ 싱글톤 + /help → G-2 온보딩 시나리오로 신규 편집자 1명 실테스트(합격 기준: 30분 완주)
        → D-2 branchPrefix → G-4 주간 템플릿 → B-5 아이콘 select → A-2 slug 정리
Week 4  G-3 사이트 FAQ 컬렉션화(마이그레이션 포함) → G-5 docs/ 거버넌스
Week 5+ E 싱글톤 다이어트(pricing부터) → B-7 나머지 편입(solutions 우선) → F 여유 시
```

각 단계 게이트: Keystatic 실편집 1건 + `git diff` 무손실 + `npm run build` 통과. **최종 게이트 = G-2 온보딩 시나리오 30분 완주.**
