# 제안 — Keystatic에 블로그 컬렉션 추가 (블로그 오써링 Phase 2)

**목표:** 비개발 팀원이 브라우저(Keystatic /keystatic UI)에서 블로그 글(카피 + 이미지)을
작성·편집하고, 그 결과가 **Velite가 이미 빌드하는 것과 같은 `.mdx` 파일**로 저장되게 한다.
Phase 1에서 깐 `cover` 이미지 필드·컨벤션을 그대로 재사용한다.

**전제(확인됨):** Keystatic `^0.5.50` / Next `16.1.6`. 블로그 = Velite(`content/articles/**/*.mdx`,
196편 전부 ko). Keystatic은 현재 로컬 모드 + 페이지 copy 싱글톤 7개(블로그 미연결).
**디렉터리 ≠ 카테고리**: `season/`·`tip/` 폴더가 `category: guide` 글을 담고 있음 → 폴더는
무의미한 레거시 버킷, 카테고리는 프론트매터에만 존재(분포: guide 97·insight 73·weekly 26).

---

## 1. 컬렉션 설정 (keystatic.config.tsx에 추가)

```ts
articles: collection({
  label: '블로그 글',
  path: 'content/articles/*',          // 플랫 (§3 마이그레이션)
  slugField: 'slug',                    // 파일명 = slug
  format: { contentField: 'body' },     // body → MDX 본문
  columns: ['title', 'date'],
  schema: {
    title:    fields.text({ label: '제목', validation: { isRequired: true } }),
    slug:     fields.slug({ name: { label: 'Slug' } }),   // ⚠ §4 스파이크(slug 조정)
    excerpt:  fields.text({ label: '요약', multiline: true }),
    category: fields.select({ label: '카테고리',
      options: [ {label:'가이드',value:'guide'}, {label:'케이스스터디',value:'case-study'},
                 {label:'인사이트',value:'insight'}, {label:'주간',value:'weekly'} ],
      defaultValue: 'insight' }),
    date:     fields.date({ label: '게시일' }),
    tags:     fields.array(fields.text({label:'태그'}), { label:'태그', itemLabel:p=>p.value }),
    icon:     fields.text({ label: 'Lucide 아이콘', defaultValue:'Newspaper' }),
    cover:    fields.image({ label:'커버', directory:'public/images/blog', publicPath:'/images/blog/' }),
    coverAlt: fields.text({ label:'커버 대체텍스트' }),
    lang:     fields.select({ label:'언어',
      options:[{label:'한국어',value:'ko'},{label:'English',value:'en'},{label:'日本語',value:'jp'}],
      defaultValue:'ko' }),
    body:     fields.mdx({ label:'본문', components: blogComponents }),  // ⚠ §4 스파이크
  },
})
```

- **`readTime`는 필드로 두지 않는다** — Phase 1에서 Velite가 본문에서 자동 추정(오써 부담 0).
- **`cover: fields.image`** → `/public/images/blog/`에 업로드 + 프론트매터에 경로 기록 =
  Phase 1의 `cover` 문자열 필드와 정확히 호환(추가 작업 없음).
- **`body: fields.mdx({components})`** → 커스텀 블록(Stat·Tip·Checklist·Callout·Quote·Source·
  PrivacyNote)을 component blocks로 등록 → 에디터 삽입 메뉴에 노출, `.mdx`엔 JSX로 직렬화.

## 2. 관계도

```
[Keystatic /keystatic UI]  ──write──▶  content/articles/*.mdx (frontmatter YAML + MDX body)
                                              │
                                     [Velite build] ─▶ .velite ─▶ Article ─▶ /resources/blog
```
같은 파일을 쓰고 읽으므로 **중간 변환/싱크 불필요**(페이지 copy의 gen-site-content.mjs 같은 게 없음).

## 3. 마이그레이션 — 디렉터리 플랫화 (권장)

- 현재: `content/articles/{guide,insight,season,tip,weekly}/*.mdx`. 폴더는 카테고리와 무관.
- 변경: `git mv` 스크립트로 전부 `content/articles/*.mdx`로 평탄화. 카테고리는 프론트매터에만
  존재(이미 그러함) → 데이터 손실 0. Velite 패턴 `articles/**/*.mdx`는 평탄 구조도 매칭.
- 이유: Keystatic 컬렉션 `path: 'content/articles/*'`가 깔끔히 1:1 매핑(파일명=slug).
- 대안: `path: 'content/articles/**'`로 폴더 유지 가능하나 slug에 폴더경로가 섞여 지저분 → 비권장.
- 리스크: 196개 파일 이동(스크립트·1커밋·가역). 이동 후 `.velite` 산출물의 slug/개수 불변 검증.

## 4. 스파이크(선행 · 반나절) — Keystatic ↔ Velite 왕복 검증

착수 전, 실제 글 2~3편으로 라운드트립을 증명한다. **여기서 통과하면 나머지는 기계적.**

1. **slug 조정** — Keystatic은 *파일명*을 slug로 쓰고, Velite는 프론트매터 `slug:`를 읽음.
   결정: (a) **Velite가 파일 경로에서 slug 유도**(`s.path()`)하고 프론트매터 slug 제거 = 단일 소스(권장),
   또는 (b) slug를 프론트매터 text로 유지. → (a) 권장.
2. **컴포넌트 블록 충실도(주요 리스크)** — Keystatic `fields.mdx`가 `<Tip>`·`<Stat>` 등을
   next-mdx-remote + `mdx-components.tsx`가 렌더하는 **정확한 JSX 형태**로 직렬화하는지.
   각 블록을 Keystatic에서 삽입 → Velite 렌더 확인. 어긋나면 (i) mdxComponents를 Keystatic 출력에
   맞추거나 (ii) 블록 셋을 축소.
3. **프론트매터 호환** — Keystatic YAML 프론트매터를 Velite 스키마가 그대로 파싱하는지
   (필드명/타입, `fields.date` → `YYYY-MM-DD`가 Velite regex와 일치).
4. **기존 글 라운드트립** — 현재 196편 중 하나를 Keystatic에서 열었을 때 MDX+커스텀 컴포넌트가
   손실 없이 파싱/재저장되는지(가장 중요한 무손실 검증).

## 5. 스토리지 & 인증 (비개발 팀원 = 최종 목표)

- 지금: `storage:{kind:'local'}` — dev 전용 `/keystatic`(정적 export에선 제거됨).
- 팀 편집: `storage:{kind:'github', repo:{owner,name}}` → 편집자가 GitHub 로그인, 편집이
  커밋/PR이 되고 Vercel이 빌드. 필요: Keystatic GitHub App 설치 + `KEYSTATIC_GITHUB_*` env +
  `/api/keystatic` 핸들러. (메모리의 "Phase 2 GitHub auth" 항목.)
- 프리뷰: Vercel PR 프리뷰 배포(브랜치별) 또는 Keystatic 프리뷰 설정.

## 6. 단계별 실행안

| 단계 | 내용 | 게이트 |
|---|---|---|
| S. 스파이크 | 로컬에서 3편 왕복 + 전 블록 검증, slug 방식 확정 | **통과해야 진행** |
| 1. 마이그레이션 | 디렉터리 평탄화(스크립트) + Velite slug=경로 | .velite 불변 검증 |
| 2. 컬렉션 | `articles` collection + component blocks + image 필드 (로컬) | 글 1편 E2E 편집 |
| 3. 팀 오픈 | GitHub 스토리지 + auth + 프리뷰 | 비개발자 1명 실편집 |
| 4. 문서 | 비개발 편집자용 가이드(README 확장) | — |

## 7. 리스크 요약

- **컴포넌트 블록 직렬화 불일치**(스파이크 #2) = 최대 리스크. 실패 시 mdxComponents 어댑트 or 블록 축소.
- **196파일 평탄화** = 1커밋·스크립트·가역, 산출물 불변 검증 필수.
- **GitHub 스토리지 운영비**(App·env·auth) = 비개발 편집의 본질 비용, 감수 대상.
- 대안(비권고): 외부 헤드리스 CMS(Sanity 등) = 이미 통합된 Keystatic 대비 과함 + 196편 마이그레이션.

## 8. 권고

**스파이크(S)부터.** 로컬에서 컴포넌트-블록 왕복만 통과하면 나머지는 저위험. 스파이크 결과로
slug 방식(권장: Velite 경로 유도)과 블록 셋을 확정한 뒤 1→2→3 순으로 진행.
