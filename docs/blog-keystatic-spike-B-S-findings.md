# Phase B-S 스파이크 결과 — Keystatic ↔ Velite 왕복 검증

> **일자** 2026-07-10 · **판정: GO** (조건: 아래 2개 인프라 수정 선반영 — 이미 적용됨)
> **입력** [blog-keystatic-phase2-proposal.md](./blog-keystatic-phase2-proposal.md) · [ADMIN_TOOLING_PLAN_v1.md](./ADMIN_TOOLING_PLAN_v1.md) Phase B
> **방법** 격리 폴더 `content/_spike/`에 실글 3편(weather-operations·night-shift-optimization·privacy-safe-ai-analytics, 블록 6종 커버) + 임시 `spikeArticles` 컬렉션으로 브라우저 E2E 편집·저장·재빌드. Velite 패턴 `articles/**`는 `_spike`를 스캔 안 해 기존 196편/라우팅 무영향. **검증 후 전부 제거함(throwaway).**

---

## 0. 결론 요약

- ✅ **기존 MDX 글이 Keystatic 에디터에 손실 없이 로드**됨(프론트매터 전 필드 + 커스텀 블록 6종).
- ✅ **저장(재직렬화) 후 Velite 재빌드 성공 + 렌더 동등**. 소스 바이트 드리프트는 있으나 렌더 결과 불변.
- ✅ 컴포넌트 블록 API가 8종 전부에 깔끔히 매핑(`block`/`wrapper`).
- ⚠️ **최대 리스크였던 컴포넌트 블록 직렬화 불일치는 렌더 동등으로 통과** — remark-gfm 미사용 덕분(§3).
- 🔧 **인프라 버그 2건 발견·수정**(§1). 이게 없었으면 `/keystatic` admin이 Next 16에서 아예 안 떴음.

---

## 1. 인프라 수정 2건 (적용 완료 — 블로그 트랙 전 단계의 전제조건)

Next 16 업그레이드 이후 `/keystatic` admin UI가 **공백으로 렌더되던 회귀**를 스파이크 중 발견·수정. 싱글톤 편집 포함 CMS 전체에 영향.

| # | 파일 | 문제 | 수정 |
|---|---|---|---|
| 1 | `src/app/keystatic/[[...params]]/page.tsx` | `@keystatic/core/ui`의 `react-server` export 조건이 서버에서 `<Keystatic>`를 `return null` 스텁으로 해석 → Next 16 RSC에서 admin이 아무것도 안 그림 | 파일 최상단 `'use client'` 추가 → 클라이언트 UI 로드 |
| 2 | `next.config.ts` headers | 완화 CSP 블록이 `/admin/:path*`만 타깃하는데 실제 라우트는 `/keystatic/*` → strict 사이트 CSP(`unsafe-eval` 없음)가 admin/HMR eval을 차단 | `/keystatic/:path*` CSP 블록 신설(unsafe-eval·unpkg·github·google-fonts) + strict catch-all에서 `keystatic` 제외 |

**운영 노트**: 수정 후 **일반 `npm run dev`(Turbopack)로 `/keystatic` 정상 동작**(webpack 불필요). 프로덕션(Vercel)에선 react-refresh가 없어 무관.

---

## 2. 스파이크 4대 질문 결과

### ① slug 방식
- `slugField: 'slug'` + `fields.slug({ name: { label: 'Slug' } })` 사용 시 **프론트매터 `slug:`가 왕복 생존** → Velite `slug: s.string()` **무변경**으로 작동(옵션 b).
- ⚠️ 단, `fields.slug({name})`는 에디터에 **Slug 입력을 2개**(name용 "Slug" + 실제 파일명 "Slug*") 노출 = UX 혼란.
- **B-2 권장**: 옵션 (a) — Velite가 파일 경로에서 slug 유도(`s.path()`)하고 프론트매터 `slug:` 제거 = 단일 소스. 단 이는 **B-1 평탄화 선행 필수**(중첩 폴더면 `s.path()`에 폴더명이 섞임). 평탄화 전까지는 옵션 b가 안전.

### ② 컴포넌트 블록 직렬화 (최대 리스크)
`@keystatic/core/content-components`의 `block`(children 없음)·`wrapper`(children 있음)로 8종 매핑:

| 컴포넌트 | 헬퍼 | 직렬화 결과 | 판정 |
|---|---|---|---|
| `Stat` | `block` | `<Stat label=".." value=".." change=".." />` self-closing **보존** | ✅ |
| `StatGroup` | `wrapper` | `<StatGroup>` + 내부 `<Stat/>` 사이 빈 줄 | ✅ 렌더 동등 |
| `Tip` | `wrapper` | `<Tip title="..">` + children 2칸 들여쓰기 | ✅ 렌더 동등 |
| `Callout` | `wrapper` | `<Callout>` → `<Callout variant="info">` (기본값 명시) | ✅ 동일 렌더 |
| `Checklist` | `wrapper` | `- [ ]` → `* \[ ]` (bullet 변환 + 대괄호 이스케이프) | ✅ §3 참조 |
| `Quote` | `wrapper` | `<Quote author="..">` + children | ✅ |
| `Source`·`PrivacyNote` | `wrapper` | children만 (코퍼스 전체 미사용 — 정의만) | ✅ |

### ③ 프론트매터 호환
- `date: '2026-03-16'` → `date: 2026-03-16` (따옴표 제거). **Velite YAML 파서가 문자열 `"2026-03-16"`로 유지 → regex 통과**(Date 강제변환 없음). ✅ 안전.
- `title` 따옴표 제거, `lang: ko`·`target: company` 기본값 명시 추가 → 전부 무해(Velite 기본값과 일치).

### ④ 기존 글 무손실 재저장
- 강제 저장(요약 1필드 변경)으로 전체 재직렬화 → Velite 빌드 통과(197/197), `date`·`readTime`·`category`·`body`(Checklist 포함) 정상. 실제 블로그 페이지 렌더 스크린샷으로 StatGroup·Stat·Tip·Callout·Checklist 전부 정상 확인.

---

## 3. Checklist 이스케이프가 안전한 이유 (핵심 근거)

Keystatic은 `- [ ] 항목` → `* \[ ] 항목`으로 저장(대괄호 이스케이프). 안전한 이유:
- 파이프라인은 `next-mdx-remote@6.0.0` **기본 옵션 — remark-gfm 미사용**(코드베이스 grep 확인).
- gfm 없음 → 원본 `- [ ] 항목`도 태스크리스트가 아닌 **리터럴 `[ ] 항목`** 으로 파싱됨.
- 이스케이프 `\[ ]` 역시 리터럴 `[ ]` → **양쪽 모두 `<li>[ ] 항목</li>`로 동일 렌더**.
- ⚠️ 만약 향후 remark-gfm을 도입하면 이 동등성이 깨짐(원본=체크박스, 이스케이프=리터럴). 그때는 mdxComponents.Checklist를 이스케이프 출력에 맞춰 조정 필요.

---

## 4. B-2 실행용 검증된 레시피

```tsx
// keystatic.config.tsx — imports
import { config, fields, singleton, collection } from '@keystatic/core';
import { wrapper, block } from '@keystatic/core/content-components';

// 블로그 커스텀 블록 = src/components/blog/mdx-components.tsx 와 1:1.
// Stat = block(children 없음), 나머지 = wrapper(children 있음). ContentView는 에디터 프리뷰용.
const blogComponents = {
  Stat: block({ label: 'Stat', schema: {
    label: fields.text({ label: '라벨' }), value: fields.text({ label: '값' }),
    change: fields.text({ label: '변화 (선택)' }),
  }, ContentView: ({ value }) => <div><strong>{value.value}</strong> — {value.label}</div> }),
  StatGroup: wrapper({ label: 'StatGroup', schema: {}, ContentView: ({ children }) => <div>{children}</div> }),
  Tip: wrapper({ label: 'Tip', schema: { title: fields.text({ label: '제목' }) },
    ContentView: ({ value, children }) => <div><strong>{value.title}</strong>{children}</div> }),
  Checklist: wrapper({ label: 'Checklist', schema: {}, ContentView: ({ children }) => <div>{children}</div> }),
  Callout: wrapper({ label: 'Callout', schema: { variant: fields.select({ label: '유형',
    options: [{label:'Info',value:'info'},{label:'Warning',value:'warning'},{label:'Success',value:'success'}],
    defaultValue: 'info' }) }, ContentView: ({ children }) => <div>{children}</div> }),
  Quote: wrapper({ label: 'Quote', schema: { author: fields.text({ label: '저자' }) },
    ContentView: ({ value, children }) => <div>{children} — {value.author}</div> }),
  Source: wrapper({ label: 'Source', schema: {}, ContentView: ({ children }) => <div>{children}</div> }),
  PrivacyNote: wrapper({ label: 'PrivacyNote', schema: {}, ContentView: ({ children }) => <div>{children}</div> }),
};

// collection (B-1 평탄화 후):
articles: collection({
  label: '블로그 글',
  path: 'content/articles/*',            // ← B-1: 196편 평탄화 필요
  slugField: 'slug',                     // 옵션 b. 옵션 a면 Velite s.path()+슬러그필드 재검토
  format: { contentField: 'body' },
  columns: ['title', 'date'],
  schema: {
    title: fields.text({ label: '제목', validation: { isRequired: true } }),
    slug: fields.slug({ name: { label: 'Slug' } }),
    excerpt: fields.text({ label: '요약', multiline: true }),
    category: fields.select({ label: '카테고리', options: [
      {label:'가이드',value:'guide'},{label:'케이스스터디',value:'case-study'},
      {label:'인사이트',value:'insight'},{label:'주간',value:'weekly'}], defaultValue: 'insight' }),
    date: fields.date({ label: '게시일' }),
    readTime: fields.integer({ label: '읽기 시간(분, 선택)' }),
    tags: fields.array(fields.text({ label: '태그' }), { label: '태그', itemLabel: (p) => p.value }),
    icon: fields.text({ label: 'Lucide 아이콘', defaultValue: 'Newspaper' }),
    cover: fields.image({ label: '커버', directory: 'public/images/blog', publicPath: '/images/blog/' }),
    coverAlt: fields.text({ label: '커버 대체텍스트' }),
    lang: fields.select({ label: '언어', options: [
      {label:'한국어',value:'ko'},{label:'English',value:'en'},{label:'日本語',value:'jp'}], defaultValue: 'ko' }),
    target: fields.select({ label: '타깃', options: [
      {label:'company',value:'company'},{label:'saai',value:'saai'}], defaultValue: 'company' }),
    body: fields.mdx({ label: '본문', components: blogComponents }),
  },
}),
```

---

## 5. B-1 / B-2 잔여 작업 & 리스크

- **B-1 (평탄화)**: `content/articles/{guide,insight,season,tip,weekly,case-study}/*.mdx` 196편을 `content/articles/*.mdx`로 `git mv`. 스크립트·1커밋·가역. `.velite` slug/개수(196) 불변 검증. ⚠️ **파일명 `_` 접두는 Velite가 무시**하므로 슬러그 충돌·언더스코어 주의.
- **B-2 (컬렉션)**: 위 레시피 반영 + 글 1편 브라우저 E2E. slug 방식 최종 결정(옵션 a vs b).
- **드리프트 정책**: Keystatic 첫 저장 시 기존 글이 재직렬화되며 `date` 따옴표 제거·`variant="info"` 등 diff 발생(렌더 무영향). 대량 diff를 원치 않으면 "편집 시에만 재저장" 정책 유지.
- **remark-gfm 도입 금지**(도입 시 §3 Checklist 동등성 깨짐 — 도입하려면 mdxComponents.Checklist 동시 조정).
