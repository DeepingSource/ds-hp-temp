# `src/data/` — 데이터 & i18n 오버레이 규칙

이 폴더의 파일은 두 종류이며, 파일명으로 역할이 구분된다.

## 1. Base 데이터 (`*Data.ts` 등 camelCase / 도메인명)

공유 데이터의 **shape + 기본(한국어) 값**을 보유한다. 라우트·View·sitemap이 직접 import 한다.

| Base 파일 | 내용 |
|---|---|
| `solutionsData.ts`, `industryList.ts` | /solutions 카드·산업 목록 |
| `glossaryTerms.ts` | 용어집 항목 |
| `briefingData.ts` | STOREAGENT 모닝 브리핑 |
| `posAnalysisData.ts` | POS 분석 |
| `models.ts`, `siteImages.ts`, `cctvImages.ts`, `storeCareScenarios.ts` | locale 무관 데이터/이미지 매핑 (오버레이 없음) |

## 2. i18n 오버레이 (`*-i18n.ts` kebab)

base 데이터의 **번역 오버레이**. 데이터 shape를 바꾸지 않는다. 형태는 보통
`Record<key, Partial<Record<Locale, {...}>>>` 이며, **View는 `locale !== 'ko'` 일 때만**
오버레이를 읽고, 항목이 없으면 base의 한국어 값으로 **폴백**한다. (예시: `solutions-i18n.ts` 상단 주석 참고)

| 오버레이 | 대상 base |
|---|---|
| `solutions-i18n.ts` | `solutionsData.ts` + `industryList.ts` |
| `glossary-i18n.ts` | `glossaryTerms.ts` |
| `storeagent-briefing-i18n.ts` | `briefingData.ts` |
| `pos-analysis-i18n.ts` | `posAnalysisData.ts` |
| `area-i18n.ts` | 지역 라벨 |
| `storeagent-mock-i18n.ts` | STOREAGENT 목업 렌더 텍스트 (`mockup-scenarios/canonical.ts` 기반) |
| `faq-i18n.tsx` | `faq-data.tsx` (예외: 답변에 JSX 가 있어 둘 다 `.tsx`) |

제품명(store care / Insight / Agent)과 수치(`+18%` 등)는 의도적으로 오버레이하지 않는다.

## 네이밍 규칙

- **Base = 기존 이름 유지** (대부분 camelCase, 일부 legacy). 라이브 import 38곳이 의존하므로 cosmetic 리네임은 하지 않는다.
- **오버레이 = `<도메인>-i18n.ts`** (kebab). 새 오버레이는 이 규칙을 따른다.
- 두 네이밍이 섞인 것은 드리프트가 아니라 **이 규칙의 결과**다.
