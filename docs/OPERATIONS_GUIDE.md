# 운영 가이드 — 콘텐츠 · PR · 이벤트 · 네이밍

> 대상: 비개발 편집자 + 유지보수 담당. 사이트 콘텐츠를 코드 없이 운영하는 절차.
> 편집 도구: **Keystatic** (`/keystatic`, GitHub 모드 — 편집이 `DeepingSource/ds-hp-temp` 에 커밋됨).
> 관련: [STATUS.md](./STATUS.md) · [SITE_IMPROVEMENT_PLAN_260716.md](./SITE_IMPROVEMENT_PLAN_260716.md) · `src/lib/brand-canon.ts`(네이밍 SOT)

---

## 0. 한눈에 — 무엇을 어디서 편집하나

| 콘텐츠 | 편집 위치(Keystatic) | 저장 위치 | 발행 방식 |
|---|---|---|---|
| 블로그 글 | 블로그 | `content/articles/*.mdx` | `draft` 해제 + `category: insight` |
| 케이스스터디 | 케이스스터디 | `content/case-studies/*.mdx` | `draft` 해제 |
| 제품 문서 | 문서 · 용어 사전 | `content/docs/*.mdx` | `draft` 해제 (`access: gated` = 코드 필요) |
| 용어 사전 | 문서 · 용어 사전 | `content/glossary/*.yaml` | 저장 즉시 |
| FAQ | FAQ | `content/faq/*.mdx` | `draft` 해제 |
| 이벤트 | 이벤트 | `content/events/*.mdx` | `draft` 해제 + 노출 기간 |
| 솔루션 시나리오 | 페이지 카피 · 업종 | `content/solutions/*.yaml` | 저장 즉시 |
| 미디어 커버리지 | 자주 편집 → 뉴스 | `content/site/news.yaml` | 저장 즉시 |
| 회사 정보·연혁·경영진·채용 | 자주 편집 / 페이지 카피 · 회사 | `content/site/*.yaml` | 저장 즉시 |
| 페이지 카피(홈·제품·요금 등) | 페이지 카피 · * | `content/site/*.yaml` | 저장 즉시 |

편집 → 저장 시 GitHub에 커밋 → **Vercel 자동 재배포**(수 분). 반영 지연은 정상.

---

## 1. 콘텐츠 생성 파이프라인 (블로그 기준)

```
Keystatic 작성 → draft 검수 → (velite 빌드) → 배포 → 확인
```

1. **작성**: `/keystatic` → 블로그 → 새 항목. 제목·슬러그·카테고리·본문 입력.
   - 카테고리 기준: **`insight` 만 사이트에 공개**. `guide`·`weekly` 는 현재 목록 비노출(`draft` 또는 필터).
   - 이미지: 본문 에디터로 업로드 → `public/images/blog/` 에 저장, 마크다운 이미지로 삽입.
2. **검수(draft)**: `draft: true` 로 두고 내용 확인. draft 는 사이트·목록·sitemap 어디에도 안 뜸.
3. **발행**: `draft` 해제 후 저장. `date` 가 미래면 그 날짜까지 자동 비노출(KST 기준).
4. **확인**: 재배포 후 `/resources/blog` 및 상세 URL 확인. ko 목록은 18건씩 "더 보기"로 점진 로드.

**개발자 보조(로컬)**: `npm run new:post`(스캐폴드) · `npm run lint:frontmatter`(frontmatter 검증) · `npm run gen:content`(싱글톤 카피 재생성).

---

## 2. PR · 보도자료 파이프라인

```
보도자료 초안 → 내부 검수 → 배포처 발송 → 게재 확인 → news 등록 → (선택) 블로그 insight 전환
```

1. **초안·검수**: 법무/브랜드 검토. 네이밍은 §5 규칙 준수.
2. **배포·게재 확인**: 매체 게재 후 **실제 링크·날짜·매체명** 확보. (추측/미게재 링크 금지.)
3. **news 등록**: `/keystatic` → 뉴스 → 커버리지 항목 추가.
   - 필드: `date`(예: 2026.01) · `url`(기사 링크) · `outlet`(매체, 로케일별) · `category`(보도자료/미디어 언급 등) · `title`(로케일별).
   - **원칙: 실제 게재된 기사만 등록.** 미확인·추측 기사는 넣지 않는다.
4. **블로그 전환(선택)**: 자사 관점 해설이 필요하면 `insight` 글로 재작성.

**정기 검색(분기 1회)**: `"deepingsource"` · `"딥핑소스"` · `"Deeping Source"` + 제품명/수상명 조합으로 신규 기사 검색 → news 에 반영.

---

## 3. 이벤트 페이지 운영 (컨벤션·박람회·웨비나)

```
생성 → 노출 기간 설정 → 진행 → 종료 후 자동 아카이브
```

1. **생성**: `/keystatic` → 이벤트 → 새 항목(또는 `sample-event` 복제).
   - 필수: `title` · `slug`(= `/events/<슬러그>`) · `startDate`. 선택: `endDate` · `venue` · `subtitle` · `cover` · `ctaLabel`/`ctaHref`.
2. **노출 기간**:
   - `publishFrom` — 이 날짜부터 목록에 노출(사전 공개 방지). 비우면 즉시.
   - `publishUntil` — **이 날짜가 지나면 목록에서 자동 제외**되고, 페이지는 "지난 이벤트" 아카이브로 남음(URL 유지).
3. **초청 전용**: `noindex` 체크 → 검색·sitemap 제외(링크 아는 사람만 접근).
4. **QR**: 인쇄물엔 단축 경로 `/e/<슬러그>` 사용 → `/events/<슬러그>` 로 리다이렉트.
5. **발행**: `draft` 해제 후 저장.

번역: 같은 슬러그에 `-en`/`-jp` 접미사 파일로 추가하면 해당 로케일에서 자동 노출(없으면 한국어 폴백).

---

## 4. 문서(docs)의 gated 전환

- 특정 문서를 공유 코드로 잠그려면 문서 `access` 를 `gated` 로 설정.
- **활성화 조건**: Vercel env `DOCS_ACCESS_SECRET` + `DOCS_ACCESS_CODES`(`라벨:코드` 형식, 고엔트로피) 설정 필요. 미설정 시 아무도 열람 불가(fail-closed).
- 코드는 방문자에게 별도 전달. 자세한 건 `.env.example` 참고.

---

## 5. 네이밍 규칙 (brand-canon SOT)

> 단일 출처: `src/lib/brand-canon.ts` 의 `productNaming`. 표기 변경은 항상 여기부터.

- **saai** = 가치 브랜드(Spatial · Anonymized · Agentic · Intelligence). 제품은 **saai {insight · care · agent}** 로 우선 표기.
- **store** = 도메인 구현 표기(saai.store / storecare.ai 등)로만 사용. count 는 store 도구.
- 4단계 운영 루프: **관찰(store care) → 분석(store insight) → 실행(store agent) → 학습**.
- 신규 카피·문서·보도자료에서 제품을 지칭할 때 saai 표기를 우선하고, 도메인/URL 맥락에서만 store 를 쓴다.
- SEO: 제품 JSON-LD 의 `alternateName` 에 구명(store insight 등)을 유지해 검색 연속성을 확보한다.

---

## 6. 배포 · 인덱싱 참고

- 편집 커밋 → Vercel 자동 재배포(수 분). GH Pages 정적 export(`GH_PAGES=1`)에는 proxy·API·gated 문서가 제외됨.
- 색인: 운영 도메인에서만 `NEXT_PUBLIC_ALLOW_INDEXING=true`. 임시/프리뷰 도메인은 noindex.
- 문제 발생 시: 개발자에게 문의(빌드 로그·frontmatter 오류·이미지 경로 확인).
