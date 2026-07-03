# 블로그 글 작성 가이드 (Phase 1)

블로그 글은 `content/articles/<카테고리>/<slug>.mdx` 파일입니다. Velite가 빌드 때 읽어
`/resources/blog`(및 `/ko`·`/jp`)에 렌더합니다.

## 새 글 만들기

```bash
npm run new:post -- my-post-slug insight --title "우리 글 제목"
```

- `slug`: 소문자 kebab-case (a-z, 0-9, -). 사이트 전역에서 유일해야 합니다(중복은 빌드가 잡음).
- 카테고리: `guide` · `case-study` · `insight` · `weekly` (기본 `insight`).
- 프론트매터 템플릿이 자동 생성됩니다.

## 프론트매터 필드

| 필드 | 필수 | 설명 |
|---|---|---|
| `slug` | ✓ | 유일한 kebab-case |
| `title` | ✓ | 글 제목 |
| `excerpt` | ✓ | 목록/OG용 한 줄 요약 |
| `category` | ✓ | 위 4개 중 하나 |
| `date` | ✓ | `YYYY-MM-DD` (미래 날짜는 게시 전까지 숨김) |
| `readTime` |  | **생략 시 본문에서 자동 계산** (한국어 문자수 기준) |
| `tags` |  | 문자열 배열 |
| `icon` |  | Lucide 아이콘 이름 (기본 `Newspaper`) |
| `cover` |  | 커버 이미지 공개 경로 (예: `/images/blog/my-post.webp`) |
| `coverAlt` |  | 커버 대체 텍스트 (없으면 제목 사용) |
| `lang` |  | `ko`(기본) · `en` · `jp` |

## 이미지

- 이미지 파일은 **`/public/images/blog/`** 에 둡니다.
- 커버: 프론트매터 `cover: /images/blog/파일명.webp` (2:1 로 크롭 렌더).
- 본문: 마크다운 `![대체텍스트](/images/blog/파일명.webp)` → 반응형 figure 로 렌더.
- 포맷은 `.webp` 권장 (용량↓). 대체 텍스트를 꼭 넣어 접근성을 지키세요.

## 사용 가능한 본문 컴포넌트

`Stat` · `StatGroup` · `Tip` · `Checklist` · `Quote` · `Callout` · `Source` · `PrivacyNote`
(정의: `src/components/blog/mdx-components.tsx`).

## 게시

커밋 후 `main` push → Vercel 자동 빌드(`gen:content` → Velite → `next build`) → 라이브.
