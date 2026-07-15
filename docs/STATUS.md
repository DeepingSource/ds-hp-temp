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
| 페이지 카피 CMS화 (Phase D) | ✅ 완료 (16 싱글톤: 카피 14 + 법무 2) | [ADMIN_TOOLING_PLAN](./ADMIN_TOOLING_PLAN_v1.md) |
| 홈페이지 피드백 반영 | 🟡 배치 A·B 완료, C·D 일부 | [`피드백-반영-계획-260714.md`](./피드백-반영-계획-260714.md) |
| AEO/SEO 개선 | 🟡 P0·P1-2/1-3·P2-1 완료, P1-1(실데이터)·P2-B(사인오프) 잔여 | [`AEO-SEO-개발계획-260714.md`](./AEO-SEO-개발계획-260714.md) · 이 문서 §6 |
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

- **✅ 완료**: 카피 싱글톤 14(home · products · store-agent · saai · solutions · about · contact · pricing · technology · resources · retail · drug · foodBeverage · largeSpace) + **법무 mdx 2(privacyDoc · termsDoc)**. 어드민 nav 그룹: 시작하기 · 블로그 · 자주 편집 · 페이지 카피(제품/회사/업종) · 법무.
- **잔여(선택)**: 싱글톤 이미지 필드(`fields.image`→`public/images/site/`)를 히어로/로고/팀사진 페이지에 도입.
- **신규 gen 헬퍼**: `arrayItemsLocaleMajor(arr, fields)` — 순서 보존 로케일 배열(인덱스 소비용). idItem은 순서=구조, 재정렬 금지.

### 새 "편집 가능 카피 페이지" 추가 레시피 (유지보수)
1. View 인라인 `Record<Locale, Copy>` dict를 ground-truth로 추출(원본 대조용 ref JSON).
2. `content/site/<page>.yaml` 생성 — field-major(`{ko,en,jp}`). flat/2줄배열/문자열리스트=그대로, 객체배열=`[{id, 필드:{ko,en,jp}}]`.
3. `scripts/gen-site-content.mjs`: `<PAGE>_FLAT` + `toLocaleMajor`, 객체배열은 `arrayItemsLocaleMajor(arr,[필드])`(순서보존) 또는 `arrayByIdLocaleMajor`(id-keyed). 결과객체 + 콘솔로그에 키 추가.
4. **byte-identity 게이트**: `npm run gen:content` 후 생성 JSON이 원본과 0-mismatch인지 대조.
5. `keystatic.config.tsx`: 싱글톤 등록(flat=`localized`·리스트=`localizedList`·객체배열=`idItem`) + `navigation` 그룹에 키 추가(공통 shape는 `solBaseSchema`처럼 스프레드).
6. View: `import siteContent` → `const CMS = siteContent.<page> as unknown as Record<Locale, Copy>` → `const t = CMS[locale]`. 코드 유지: 아이콘/href·SOT숫자·함수형·SVG·metadata.
7. `npm run build` 그린 + 렌더 확인. **장문 문서(법무 등)는 `fields.mdx` 싱글톤 + MDXRemote 렌더**(예: `src/components/legal/LegalDoc.tsx`).

## 4. 홈페이지 피드백 반영 (`피드백-반영-계획-260714.md` · 16항목/4배치)

- **배치 A (카피) ✅**: #5 점주→사장님(B2C 호칭) · #6 흡인율→유입률(3로케일) · #10 DEEPINGSOURCE 표기 통일 · #11 masterCompany→"모든 공간을, 완벽하게"(하드코딩 미러 전량 전파).
- **배치 B (UI) ✅**: #1 언어 스위처 드롭다운 · #2 ProblemBeat 정렬 · #3 히어로 오버레이 박스 제거(이미지에 검출 내장) · #4 GNB 언더바→pill.
- **배치 C**: #8 models 이미지 = 이미 통합됨(확인) ✅ · #4 Spatial AI 모션 = ⬜ (프로토타입 선행).
- **배치 D**: #16 FAQ→문의 링크(부분) ✅ · #9 솔루션 히어로 업종 분화(카피 창작) · #12 블로그 가이드 saai 이관(URL redirect/SEO) · #13 도입사례 페이지화 · #14/15/16 잔여(docs/glossary/faq CMS화) = ⬜.

## 5. 런치 준비 (`LAUNCH_PLAN_v1.md`)

- **완료**: 애널리틱스 배선(GA4+Umami, env 게이트) · 블로그 CMS · Keystatic GitHub 모드 · R2(배포 stale) 해소.
- **잔여**: 도메인 전환(`deepingsource.io`) + GitHub App callback/`NEXT_PUBLIC_SITE_URL` 갱신 · noindex 게이트 해제(`NEXT_PUBLIC_ALLOW_INDEXING=true`) · GSC sitemap · GA4/Umami 계정 발급.

## 5b. 리포지토리·에셋 정리 + 카피 리뷰 (2026-07-14)

- **문서 정리 ✅**: 루트 계획 문서 10개(tracked 8 + untracked 2) → `docs/`로 이동. 루트는 SOT 3개(`DESIGN.md`·`README.md`·`SAAI_AI_Handoff.md`)만 유지. STATUS·docs/README 참조 갱신.
- **스크래치 정리 ✅**(로컬, gitignored): 이미지 생성 덤프 ~483M 삭제(`new-image-generated*`·`new_image_260626`·`_frames_tmp`) + `.DS_Store`. **보존**: `new-images`(미통합 브랜드 자산 후보)·`design-system`·`asset-prompts`·`assets`.
- **카피 리뷰 도구 ✅**: `npm run copy:review` → `scripts/export-copy.mjs` → `copy-review/`(gitignored) 5개 md에 전체 카피 ko/en/jp ≈1400행(CMS 498·brand 26·data-i18n 192·컴포넌트 568·메타 116). 하이브리드 1단계(리뷰). **다음=고빈도 코드 카피 CMS 이관**(§3 레시피, 큰 것부터: `solutions-i18n`·`faq-i18n`·`storeagent-mock-i18n`·`glossary-i18n`).
- **⚠️ 후속(사용자 확인 필요)**:
  - **`deepingsource-hp-cms.2026-07-09.private-key.pem`** — 워킹디렉토리에 GitHub App 개인키 방치. **코드 미사용**(GitHub 모드는 env 인증, config는 주석만) · gitignored(비추적). 보안상 **안전한 곳(비밀번호 관리자/시크릿 스토어)에 백업 후 워킹디렉토리에서 제거 권장**. (키라서 임의 삭제 안 함)
  - **미사용 에셋**: `public/images` 230개 미사용 탐지엔 전용 스크립트 필요 · 미참조 비디오 `public/videos/unmanned-security-alert.mp4` 1개(tracked).
  - **/demo**: 격리 유지(noindex+미연결) — dev-gate 여부 별도 검토.

## 6. AEO/SEO 개선 (`AEO-SEO-개발계획-260714.md`)

### ✅ 완료 (2026-07-14, P0 배치 + 스키마 감사)
| 항목 | 결과 |
|---|---|
| P0-1 FAQ `FAQPage` 스키마 | **이미 구현됨**(`FaqView.tsx` — 렌더 아코디언과 동일 소스로 `faqPage()` 출력). 계획서 "호출 흔적 없음"은 오탐. 빌드 3로케일 HTML에서 `"@type":"FAQPage"` 검증 완료 |
| P0-2 홈 H1 하이브리드 | H1(감성) 아래 키워드 **H2 추가** — `CorporateHero.tsx` `heroKeyword` 딕트("익명화 공간 AI — …" 3로케일). 빌드 HTML `<h2>` 렌더 검증. 마스터 카피 불변 |
| P0-3 메타 Title 길이 | 병기 유지 + 혜택 꼬리만 절삭(사용자 결정). 제품 12개(`store-agent/insight/care/count` × 3로케일) + `storeagent` 미니사이트 title을 `제품명 \| DEEPINGSOURCE`로. OG title은 이미 절삭형이었음 |
| P2-2 스키마 커버리지 감사 | 빌드 산출물 실측: **제품 5(SoftwareApplication)·솔루션 4(Service)·블로그(Article)·글로서리(DefinedTerm) 전부 출력 확인 — 갭 없음.** Organization 신뢰지표 보강: `award`(특허 수, `categoryKeyword.en` 참조)·`knowsAbout`(핵심 토픽) 구조화 필드 추가(`layout.tsx`) |
| P2-1 내부링크 앵커 키워드화 | **감사 결론: 카드 링크(제품/기술)·글로서리 상세는 이미 키워드 리치**(카드 전체가 `<Link>`=제너릭 앵커 아님; 글로서리 상세=관련 용어/업종/CTA 내부링크). 결함 1건 수정: 글로서리 "관련 업종"이 `/industries/${slug}`(301→/solutions, **locale 유실**)로 링크 → **업종→솔루션 허브 매핑(`INDUSTRY_SOLUTION`)으로 `localeHref`+직접 `/solutions/[hub]`** 전환. ~20 용어×3로케일. **메인→글로서리 토픽 클러스터 링크 신설**: 신규 `RelatedGlossary.tsx`(재사용, 용어 제목=키워드 앵커→`/glossary/[slug]`, 로케일 인식) → products·solutions·technology 허브에 각 6개 curated 용어 섹션 삽입(CTA 앞). 3허브×6용어×3로케일 |
| P1-2/1-3 키워드·네이밍 규칙 SOT | **`brand-canon.ts`에 `categoryKeyword` SOT + 역할 분리 규칙 doc 추가** — "Anonymized Spatial AI/익명화 공간 AI/匿名化空間AI"=카테고리 키워드, SAAI=우산 브랜드, `saai/store {…}`=제품명(productNaming). 표기 감사: KO 18건·JP 10건 **100% 일관**, EN 소문자 변형은 대부분 정당한 산문(문장 중간·기술 스택 나열)이라 미변경. 정규화 2건: saai featureNote 정의 글로스, Organization award. 홈 H2를 SOT에서 파생(dogfood). **제품 네이밍 규칙(P1-3)은 이미 §14/§15 option B로 productNaming에 명문화 완료** |

### ⬜ 잔여 (P1/P2 — 카피 결정·창작 수반)
- **P1-1** 제품 현장 사례 → Problem·Solution·Result 구조화(정량 수치 텍스트 노출). **⚠️ 실데이터 게이트**: 현재 사례는 명시적 "예시(illustrative)"(`CaseBand.tsx:13` "Results are NOT [real]", `CaseStudiesView.tsx`에 "예시:" 수치·"(예시 인용)"). 검증된 것처럼 보이는 수치 생성 = 조작이라 **실명·실측 사례 확보 전까지 보류**. 구조(라벨·KPI·인용)는 이미 존재. §4 배치 D #13 도입사례 페이지화와 연계.
- ~~P1-2 허브 hero/메타 전진 배치~~ **✅ 완료(메타 표면)**: technology는 title·desc에 이미 "Anonymized Spatial AI" 보유. products/solutions **메타 description에 키워드 전진 배치**(3로케일) + products `keywords` 배열 추가. **허브 hero(H1/sub)는 의도적 감성/구조 프레이밍**(technology 3축 분해·products 마스터 카피 "SAAI로 익명화")이라 **의도적으로 불변** — SEO 표면만 손댐.
- **P2-1 잔여(선택)**: RelatedGlossary를 resources/pricing 등 나머지 페이지로 확장(현재 3허브만). glossaryDetail `viewCase`("사례 보기"→`/contact`) 앵커↔목적지 불일치 후속 후보.
- **카피 "그래서?" 다리**(P2-B): "Beyond data, to decisions." 류 추상 카피에 혜택 문장 보강 — 마스터 카피 동결, 받침 문장만. 브랜드 SOT 사인오프 필요.
- **아웃라이어 title**: `company/partnership`(3로케일 `— DEEPINGSOURCE Inc. \| 마스터태그라인` 패턴, jp 107자) — 제품 혜택꼬리와 달리 **의도적 마스터 태그라인**이라 별도 결정 필요(미변경).

## 7. 전체페이지 감사 반영 (`DeepingSource_전체페이지_감사_개선안_260714.md`)

> ⚠️ 감사는 **stale Vercel 배포본**(ds-hp-temp, ~7/10 이후 미배포) 기준이라 다수 발견이 이미 로컬 HEAD에 반영돼 있었다. 20여 발견을 현재 코드 기준으로 재검증(워크플로우 6클러스터)해 분류 후 처리.

### ✅ 완료 (2026-07-14, 2커밋 `c057f6e79`·`2b6da0441`)
- **i18n 한글 누출 제거(P0)**: 홈 파트너 pill(PartnerGrid 로케일화)·technology 특허 라벨·솔루션 4뷰 캡션·전시 "3배"→3x/3倍·HqMap 매장명 서초중앙점 등 로케일화.
- **통화 표기 KRW 통일(P1, 사용자 결정)**: 우리 제품 가격 EN/JP → `14,900 KRW`(ko는 `원`). 버그 수정: B2cPlans `원` 누출, CameraSimulator/PricingClientView `円`(엔) → KRW. store-care 시급/월정액 문구 연결(≈/약…꼴/約). 시뮬레이터 평→㎡ 병기. *(일러스트용 시나리오 매장 데이터 ₩는 우리 가격 아님 → 유지.)*
- **제품 네이밍(P1, 사용자 결정)**: /technology "이 기술로 구동되는 제품" → saai 주 라벨(technology.yaml 재생성).
- **/help 노출(P1, 사용자 결정)**: `VERCEL_ENV==='production'`에서 notFound()(로컬·프리뷰 노출). 탈출구 `ENABLE_EDITOR_GUIDE=true`(.env.example 문서화). ⚠️ **임시 도메인(ds-hp-temp)도 production 취급 → /help 비노출**. 임시 도메인에서 편집자에게 /help 링크 공유 중이면 해당 배포에 `ENABLE_EDITOR_GUIDE=true` 설정.
- **법무 EN/JP(P1, 사용자 결정=임시 비구속 안내문)**: LegalDoc `locale`+`kind` prop + EN/JP 안내 배너("한국어본 정본, 공식 번역 준비 중"). 물리 `/ko·/jp/legal/{privacy,terms}` 미러 4개 + proxy TRANSLATED_PATHS 2건. 한국어 본문 불변(법무 텍스트 미조작).
- **데이터 정정(P2)**: CBO Geum(≠Kim)·용어집 카드 영문 부제 중복 제거(index+detail)·블로그 Webflow "Previous Article" URL 잔재 제거(ko+en).

### ⬜ 잔여 (의도적 설계 / 데이터·사인오프 게이트)
- **의도적 설계(변경=결정 필요)**: G4 saai 3중 의미(대문자 SAAI/소문자 saai X/saai.store 케이싱으로 이미 구분) · P2b `/products/saai` slug(타이틀은 이미 saai.store 정합) · H1 "Three stores, one flow"=3(store count=SOURCE라 의도적 제외) · G15 WordRise 등장 모션(브랜드 모티프) · H2 캐러셀 pill/콘텐츠 lag(AnimatePresence mode="wait" 트레이드오프) · H3 "remade online" 목적 카피(브랜드 SOT).
- **G20 보도자료 최신화 ✅ 완료**: NewsView 3로케일 coverage에 실검증 기사 3건 추가(2026.01 이데일리 "매장 자율운영 상용화 원년" · 2025.12 IT데일리 "컴업 2025 스토어케어 공개" · 2025.07 머니투데이 "KDDI·로손 리얼×테크 로손 도쿄 1호점 참여"). 발행일·제목·URL 웹검색+WebFetch 실측 검증(지어내지 않음). 최신 항목 2025.06→2026.01.
- **데이터 게이트(실데이터 필요)**: G18 spatial-ai CES/KDDI/NVIDIA 레퍼런스 링크(실 URL) · G19 docs 허브 "coming soon"(콘텐츠/로드맵 결정) · G21a 블로그 "Insight" 배지=임포트 기사 frontmatter `category` 기본값(에디토리얼 재분류).
- **G10 재프레이밍**: `/thank-you`는 **KO 전용 storeagent 미니사이트** 전용(메인 사이트엔 뉴스레터 폼 없음). "/thank-you만 번역"은 무의미 → 미니사이트 전체 i18n 여부 결정 필요(대형, 보류).
- **⚪ 조치 불필요(오탐/이미 반영)**: G13 case-studies measured/illustrative 뱃지 이미 구현 · G17 "13 vs 18 모델"=스코프된 라벨(13=라이브 오버레이 서브셋) · G1 /demo 이미 noindex(일러스트만, 저위험).

---

## 잔여 항목 우선순위 제안

1. **Phase D 카피 CMS화** 이어가기 (technology → resources → solutions 4종 → legal) — 편집자 커버리지 확대, 저위험·검증 가능.
2. **G-3 FAQ 컬렉션화** — 분기 4회 개발자 수정 실적, 편집자 셀프서비스 전환 효과 큼(대형).
3. **배치 D #12 블로그 가이드 이관** — SEO redirect 결정 필요.
4. **E-1 pricing 폼 다이어트** — 편집 UX(대형).
5. **D-1 프리뷰** — GitHub 로그인 환경에서 검증 가능해지면.
