# 블로그 글 작성 가이드

블로그 글은 `content/articles/<slug>.mdx` 파일입니다(플랫 구조 — 카테고리는 프론트매터에만).
Velite가 빌드 때 읽어 `/resources/blog`(및 `/ko`·`/jp`)에 렌더합니다.

## 브라우저에서 글 쓰기 (비개발자용, 권장)

개발 환경 없이 브라우저만으로 작성·발행할 수 있습니다.

1. **접속**: `https://ds-hp-temp.vercel.app/keystatic` (도메인 전환 후에는 `https://deepingsource.io/keystatic`)
2. **로그인**: "Sign in with GitHub" → 본인 GitHub 계정으로 로그인.
   - 사전 조건: GitHub 계정이 `DeepingSource/ds-hp-temp` 저장소에 **write 권한**으로 초대되어 있어야 합니다(관리자에게 요청).
3. **글 작성**: 왼쪽 메뉴 **블로그 글** → **Create entry** → 폼 채우기.
   - Title·Slug·Excerpt·Category·Date는 필수. Read time은 비워두면 자동 계산됩니다.
   - **커버 이미지**: Cover 필드에서 파일 업로드(2:1 비율 권장, `.webp` 선호) + Cover alt(대체 텍스트) 입력.
   - 본문 에디터의 `+` 메뉴에서 Stat·Tip·Checklist·Callout·Quote 등 블록을 삽입할 수 있습니다.
4. **저장 = 발행**: 우측 상단 **Save** → GitHub `main`에 자동 커밋 → Vercel이 자동 재빌드(수 분 소요) → 라이브 반영.
   - `date`를 미래 날짜로 두면 그 날짜까지 목록에서 숨겨집니다(예약 발행).
5. **수정/삭제**: 목록에서 글 선택 → 수정 후 Save, 삭제는 항목 하단 Delete.

아래 섹션들은 파일을 직접 편집하는 개발자용 안내입니다(같은 파일을 다루므로 두 방식은 병행 가능).

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
