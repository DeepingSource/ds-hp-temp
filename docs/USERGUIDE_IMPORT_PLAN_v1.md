# StoreInsight · StoreCare 사용자 가이드 → 홈페이지 Docs 이식 계획 (v1)

작성일: 2026-07-16 · 대상: `content/docs/*.mdx` 위키형 Docs 시스템

## 결정된 범위

- **콘텐츠 확보**: 두 비공개 레포를 작업 폴더 안에 직접 clone
- **형태**: 전체 가이드 이식 (요약본 아님)
- **언어**: ko(기본) · en · jp 전부

## 현재 시스템 (조사 결과)

- 사이트: `deepingsource.io` Next.js 16, 콘텐츠는 Velite + Keystatic이 **동일한** `content/docs/*.mdx`를 읽음. 둘 다 통과하도록 frontmatter를 지켜야 함.
- URL: `/resources/docs/[slug]` — 로케일 무관 논리 슬러그. ko=접미사 없음, en=`-en`, jp=`-jp`. 번역이 없으면 ko로 자동 폴백.
- 섹션(사이드바 그룹): `getting-started` · `integration` · `privacy` · `analytics` · `manual`
- 이미지: keystatic 기준 `public/images/docs/` (publicPath `/images/docs/`). 기존 StoreInsight 요약 이미지는 `public/images/si-guide/`에 있음.
- **현황**: StoreInsight는 요약 매뉴얼 1개(`store-insight.mdx`, 외부 v3.5 가이드로 링크만) 존재. StoreCare Docs는 없음.

### Frontmatter 계약 (Velite + Keystatic 공통, 반드시 준수)

```yaml
slug: "storeinsight-login"        # 파일명과 일치. 번역은 -en/-jp
title: "..."                      # 70자 이내
excerpt: "..."                    # 목록·메타용 한 줄
section: "manual"                 # 위 5개 중 하나
order: 10                         # 작을수록 위. prev/next 근거
parent: "store-insight"           # (선택) 매뉴얼 챕터 중첩용
icon: "BookOpen"                  # docIconMap에 존재하는 값만
lang: "ko"                        # ko | en | jp
draft: false
access: "public"                  # public | gated
updated: "2026-07-16"             # (선택) YYYY-MM-DD
relatedSlugs: []
relatedTerms: []
```

## 실행 계획

### Phase 0 — 확보 & 인벤토리
- 두 레포를 폴더에 clone (예: `content/_import/storeinsight-user-guide`, `.../storecare-user-guide`). `_import`은 빌드 대상 아님, 작업용.
- 각 레포의 실체 파악: 문서 포맷(mkdocs/docusaurus/plain md 등), 목차(TOC) 구조, 챕터 수, 이미지·에셋 목록, en/jp 번역 존재 여부.
- 산출물: 가이드 챕터 → MDX 파일 매핑 표.

### Phase 1 — 정보구조(IA) 설계
- 제품별 랜딩 + 챕터 중첩 구조 확정:
  - StoreInsight: 기존 `store-insight.mdx`를 매뉴얼 랜딩으로 유지/보강 → 전체 챕터를 `parent: "store-insight"`로 중첩.
  - StoreCare: `store-care.mdx` 랜딩 신규 + 챕터를 `parent: "store-care"`로 중첩.
- 슬러그 규칙: `storeinsight-<chapter>`, `storecare-<chapter>` (충돌·검색성 확보).
- `section`·`order` 배치, 사이드바 노출 순서 확정. (전 챕터 `manual` 권장, 도입/설치 성격 챕터는 `getting-started`/`integration` 검토.)

### Phase 2 — 에셋 이식
- 레포 이미지 → `public/images/docs/storeinsight/`, `.../storecare/`로 복사.
- 본문 이미지 경로를 `/images/docs/...` 절대경로로 일괄 치환. 파일명 정규화(공백·한글 제거).

### Phase 3 — 본문 이식 (ko 먼저)
- 챕터별로 원문 markdown → MDX 변환: frontmatter 부착, 사이트 MDX 컴포넌트/링크 규칙에 맞게 정리(외부 링크·내부 `/resources/docs/...` 경로), 표·콜아웃 등 검토.
- 원문 톤을 유지하되 기존 `store-insight.mdx` 문체(존댓말·간결)와 일관성 유지.

### Phase 4 — 번역 (en · jp)
- 레포에 번역본이 있으면 그대로 이식(`-en`/`-jp`), 없으면 ko 기준으로 번역 생성.
- 슬러그 접미사·frontmatter `lang` 정확히. 누락분은 ko 폴백으로 자동 동작(빌드는 깨지지 않음).

### Phase 5 — 배선 & 내비게이션
- `relatedSlugs`로 챕터 간 연결, `relatedTerms`로 glossary 용어 연결.
- 기존 `store-insight.mdx` 외부 링크 처리 방침 결정(내부 챕터로 대체 or 병행 유지).
- (선택) FAQ 컬렉션 `store-insight`/`store-care` 그룹에 자주 묻는 항목 추가.
- 공개/제한 여부(`access: public|gated`) 확정.

### Phase 6 — 검증
- `npm run gen:content`(Velite) 통과, `npm run build` 성공.
- `npm run lint:frontmatter` 통과, Keystatic에서도 파싱 확인(양쪽 스키마 동시 충족).
- 로컬 `/resources/docs`에서 사이드바·prev/next·이미지·링크·ko/en/jp 폴백 육안 검증.
- 깨진 링크·누락 이미지 점검.

## 확정 필요한 열린 질문

1. **레포에 en/jp 번역이 이미 있는지** — 있으면 Phase 4가 이식, 없으면 번역 생성.
2. **기존 `store-insight.mdx` 요약본** — 전체 가이드 랜딩으로 대체할지, 요약+외부링크를 병행 유지할지.
3. **공개 범위** — 두 가이드를 `public`으로 노출할지, `gated`(액세스 코드)로 제한할지.
4. **섹션 배치** — 전 챕터를 `manual`에 둘지, 설치/연동 챕터는 `integration` 등으로 분산할지.

---
다음 단계: 위 폴더에 두 레포를 clone해 주시면 Phase 0(인벤토리)부터 바로 진행하겠습니다.
