> 작성 2026-07-20 · Cowork 세션에서 Growth Planner「상태=진행중」14건을 코드베이스(`ds-hp-temp`, main 브랜치, 로컬 HEAD `ceb2f8c1e`)와 대조.
> 대조 소스: `docs/STATUS.md`(7/16 갱신), `docs/SPECS_WEEK1_v1.md`, `docs/SPECS_NEXT_v1.md`, `docs/LAUNCH_GATES_v1.md`, `DeepingSource_홈페이지_개선계획.md`·`_콘텐츠_분석.md`(7/20, untracked), git log, 라이브 프리뷰(`ds-hp-temp.vercel.app`) 실측.
> 목적: 다음 개발 세션이 바로 착수할 수 있도록 항목별 "코드 상태 → 남은 작업 → 파일 위치"를 정리. Notion 상태 변경은 제안만 하고 실제 반영은 별도.

---

## 요약표

| ID | 작업 | Notion 상태 | 코드베이스 실측 | 제안 |
|---|---|---|---|---|
| 1-9 | Contact 폼 Loading | 진행중 | ✅ 완료(7/16, T2) | **완료로 변경** — 실브라우저 재검증만 |
| 1-5 | noindex 게이트 | 진행중 | ✅ 코드 완료(T4), 전환일 env+재배포 필요 | **완료로 변경**, 4-4 체크리스트에 재배포 조건 명시 |
| 1-4 | pricing 구조 정리 | 진행중 | ✅ 완료(T5) | **완료로 변경** |
| 1-3 | CMS Phase C 마무리 | 진행중 | 🟡 GitHub 모드 env 로컬 설정 확인됨, 실제 팀원 발행 테스트 여부 불명 | Jamin이 실제 테스트 1회 수행 후 완료 처리 |
| 3-10 | 올리브영 실명 노출 | 진행중(긴급) | ❌ 미수정 — `PartnerGrid.tsx`·`contact.yaml` 등 6곳 | 아래 §3-10 조치안 참조 |
| 3-11 | "누구가" 오탈자 처리 | 진행중 | 🟡 오탈자 확정(Jamin), 대체어는 "누구나" vs "누가" 케이스별 검토 중 | `brand-canon.ts` 등 7곳 — 아래 §3-11 표 참조, 문구 확정 전까지 진행중 유지 |
| 3-12 | "진단받기" CTA | 진행중 | 위치 특정됨(`HomeView.tsx:46`, 1곳) | G-5 피벗 문구로 교체, 수정 쉬움 |
| 2-1 | 아웃라이어 워크플로 섹션 | 진행중 | ⛔ **미착수 — C1 카피 확정(7/23) 전 착수 금지가 스펙에 명시** | 착수 대기가 정상, "진행중"은 오분류 → **대기로 재변경** 제안 |
| 2-3 | store insight PRD 풀매핑 | ✅ 완료(7/20, Jamin 지시) | PRD 원문 대조는 보류 | **완료 처리, 재개하지 않음** — 필요 시 별도 항목으로 재등록 |
| 2-7 | 블로그 목록 export | 진행중 | 데이터 있음(`content/articles/` 247개 mdx), 스크립트만 없음 | 30분 내 처리 가능, 아래 §2-7 참조 |
| C1 | 홈·제품·회사·가격 카피 검수 | 진행중(Jamin) | 참고용 소스 위치 정리함 | Jamin 리뷰 진행, 코드 작업 아님 |
| 1-2 | 도메인 전환 사전작업 | 진행중 | 코드 요소 없음(DNS/TTL/Vercel 설정) | 순수 운영 — 코드베이스 대조 대상 아님 |
| J-5 | HubSpot API 키 요청 | 진행중 | 코드는 대기 중인 소비처만 있음(G-2a, 아직 미착수) | 순수 운영 — Jamin 발송 필요 |
| G-1 | Lead funnel 정의 | 진행중 | 전략 문서, 코드 없음 | 변경 없음 |

---

## Go-live 블로커 계열 (1-x)

### 1-9 — Contact 폼 초기 "Loading…" 노출 ✅
- **파일**: `src/components/corporate/views/ContactView.tsx`
- **조치 내역(STATUS.md §12 T2)**: `useSearchParams`를 감싸던 전면 `Suspense`를 제거 — 폼 골격은 즉시 렌더되고, URL 쿼리로 사전 선택되는 라벨만 `useEffect`로 지연 적용.
- **검증됨**: 3로케일 초기 페인트에서 Loading 텍스트 노출 0.
- **남은 일**: 코드는 끝났음. Jamin이 `ds-hp-temp.vercel.app/ko/contact`를 새로고침 3회 정도 눈으로 확인하고 Notion 완료 처리.

### 1-5 — noindex 게이트 점검 ✅ (전환일 주의사항 有)
- **파일**: `src/app/robots.ts`, `src/app/layout.tsx`, `.env.example`
- **로직**: `NEXT_PUBLIC_ALLOW_INDEXING === 'true'`일 때만 `Allow: /`. 현재 프리뷰는 env 미설정 → 전면 `Disallow: /` (의도대로 정상).
- **검증됨**(`docs/LAUNCH_GATES_v1.md` §1): sitemap 274 URL에서 noindex 페이지 제외 확인, 개별 noindex와 전역 게이트 충돌 없음.
- **⚠️ 8/10 전환 당일 필수 절차** — `NEXT_PUBLIC_*`는 빌드타임에 인라인되므로 Vercel 대시보드에서 env만 바꾸면 반영 안 됨. **`NEXT_PUBLIC_ALLOW_INDEXING=true` + `NEXT_PUBLIC_BASE_URL=https://deepingsource.io` 설정 → 반드시 Redeploy** → `/robots.txt`·`/sitemap.xml` 재확인. 이 문구를 4-4(전환 실행) 체크리스트에 그대로 옮겨둘 것.
- **남은 일**: 코드 작업 없음. 완료 처리하고, 위 재배포 조건만 4-4 항목에 인계.

### 1-4 — pricing 구조 정리 (숫자 무관) ✅
- **파일**: `src/lib/pricing-data.ts`
- **확인됨**: 마지막 잔여였던 plans 가격 문자열 중복이 `won(B2C_PRICING.storeAgent.standard/premium)` 파생으로 이미 정리되어 있음(byte-identical 생성 검증 완료, STATUS.md §12 T5).
- **남은 일**: 없음. 완료 처리.

### 1-3 — CMS Phase C 마무리 (GitHub App 설치 + 발행 테스트) 🟡
- **확인됨**: `.env.local`에 `KEYSTATIC_GITHUB_CLIENT_ID`·`_SECRET`·`KEYSTATIC_SECRET`·`NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` 4개 키가 모두 설정되어 있고, `docs/STATUS.md` §2가 "GitHub 모드 — `DeepingSource/ds-hp-temp`, 어드민 `/keystatic`"을 현재 구성으로 명시 — **코드/설정 자체는 완료 상태**.
- **불확실한 점**: Notion `J-2`(CMS 발행 테스트 담당=Jamin)는 이미 완료 처리되어 있는데, 이게 "담당자 재배정"만 반영된 것인지 "실제 비개발 팀원이 글 1편을 발행→프로덕션 반영까지 확인"한 것인지 문구상 불명확.
- **남은 일**: Jamin이 `/keystatic`에서 실제로 글 1편을 만들어 발행 → 프로덕션 사이트에 반영되는지 눈으로 1회 확인. 되면 1-3·완료 기준(ADMIN_TOOLING_PLAN Phase C) 충족.

### 1-2 — 도메인 전환 사전작업
- DNS 확인·TTL 인하·Vercel pre-add는 코드 저장소에 흔적이 남지 않는 운영 작업. 코드베이스 대조 대상이 아님 — 진행 상황은 Jamin·Vercel 대시보드 기준으로 별도 확인 필요.

---

## 카피/콘텐츠 QA (오늘 신규 발견분 포함)

### 3-10 — 라이브 미리보기 "올리브영" 실명 노출 (긴급, 런칭 블로커) ❌ 미수정
7/20 Cowork 세션에서 라이브 프리뷰 육안 확인 → 코드에서 소스 6곳 확정:

| 파일 | 위치 |
|---|---|
| `src/components/corporate/PartnerGrid.tsx` | 14-15행, ko/en 배열 리터럴 첫 항목 |
| `content/site/contact.yaml` | 22-23, 34-35, 78-79행 (partnerText·mobileTrustBrands·brandPlaceholder) |
| `src/data/generated/site-content.json` | 위 yaml의 생성 산출물 — yaml 수정 후 `npm run gen:content`로 재생성 |

- **배경**: 오늘 J-3 결정 = OliveYoung 실명·수치 사용 **미승인 확정 → 익명 진행**. `DeepingSource_홈페이지_개선계획.md` P3-1도 동일 리스크를 "분석 최대 리스크"로 이미 지목("허가 확보 후 배치, 허가 불가 시 업종+규모 준실명 표기라도 격상").
- **조치안**: `PartnerGrid.tsx`의 `'올리브영'`/`'Olive Young'`을 준실명 표기(예: `'국내 1위 헬스&뷰티 스토어'`/`'Korea's #1 H&B retailer'`)로 교체하거나, 이미 승인된 브랜드만 남기고 목록에서 제거. `contact.yaml` 3곳도 동일 원칙 적용 후 `npm run gen:content` 재생성 + byte-diff 확인.
- **참고**: `PL-5`(Post-launch, OliveYoung 실명본 완성·교체)는 승인 이후를 위해 그대로 유지 — 지금은 되돌릴 수 있는 방식(준실명 치환)으로만 처리.

### 3-11 — "누구가" 오탈자 처리 🟡 대체어 케이스별 검토 중
- **[7/20 정정, Jamin]**: "누구가"는 오탈자로 확정. 다만 일괄로 "누가"로 바꾸는 게 아니라 문맥별로 **"누구나"(anyone/전체) vs "누가"(who, 대비 주어)** 중 무엇이 맞는지 케이스별 재검토 필요.
- **grep 결과 — 7개 위치, 전부 동일 "[X]가 아니라 [Y]를/을" 대비 구문 패턴**:

| # | 파일 | 문장 |
|---|---|---|
| 1 | `ProblemBeat.tsx:25` (코드 주석, 비노출) | "보는 AI를 넘어, 누구가 아니라 무엇을" |
| 2 | `ModelsView.tsx:46` | "...공간을 읽습니다. 누구가 아니라, 무엇을 어떻게." |
| 3 | `AnonymizerView.tsx:83` | "누구가 아니라, 무엇을 어떻게. Anonymizer는..." |
| 4 | `SealView.tsx:64` | "...신원을 지우고, 누구가 아니라 무엇을 어떻게만 남깁니다..." |
| 5 | `SealView.tsx:95` (FAQ 답변) | "...누구가 아니라, 무엇을 어떻게." |
| 6 | `brand-canon.ts:56` (SOT) | "이미 달린 CCTV 위에서, 누구가 아니라 무엇을 어떻게..." |
| 7 | `brand-canon.ts:245` (SOT, tagline) | "누구가 아니라, 무슨 일을 봅니다." |

- **검토 의견(참고용, 최종 확정 아님)**: 7곳 전부 "신원(who)이 아니라 행동/내용(what)"을 대비시키는 동일 구조 — 브랜드 핵심 메시지(누구인지는 안 보고 무엇을 하는지만 본다)를 담음. "누구나"(anyone)로 바꾸면 "누구나 아니라 무엇을"이 되어 대비 의미가 성립하지 않아 보임 — "누가"가 문법·의미상 더 맞을 가능성이 높지만, **최종 단어는 Jamin 확정 후 반영**.
- **남은 일**: Jamin이 케이스별로 "누구나"/"누가" 확정 → `brand-canon.ts`(SOT) 우선 수정 → 나머지 6곳은 동일 문자열이라 일괄 치환 가능. 확정 전까지 Notion 상태는 진행중 유지.

### 3-12 — 하단 CTA "우리 매장 진단받기" 문구 재검토
- **파일**: `src/components/corporate/HomeView.tsx:46` (`close: '우리 매장 진단받기'`) — 코드상 이 문자열은 **1곳뿐**이라 수정 자체는 간단.
- **배경**: 7/16 G-5 결정으로 "무료 매장 진단"은 카메라 설치·연동 선행 문제로 철회, 대안(① 익명 샘플 인사이트 리포트 ② 효과 추정 시뮬레이션 ③ 전문가 상담/현장 실사 미팅)으로 피벗됨. 현재 문구는 그 이전 버전 그대로 남아있는 것으로 보임.
- **조치안**: G-5 대안 중 하나를 문구화(예: "전문가 상담 신청하기" 또는 "매장 진단 리포트 받기" — ③ 상담이 카메라 무관이라 가장 안전) — **문구 확정은 카피 톤이라 Jamin 확인 후 반영 권장.**

### 2-1 — 아웃라이어 워크플로 섹션 (홈 P1) ⛔ 착수 대기가 정상
- **스펙**(`docs/SPECS_NEXT_v1.md` §A1): "아침에 열어 10초·1분에 끝나는" 흐름을 3-스텝 타임라인으로 시각화. 기존 `TimelineSpine`/`StaggerContainer` 재사용, 신규 컴포넌트 최소화.
- **⚠️ 명시된 의존성**: "C1 헤드라인·카피 확정(7/23) 전 카피 placeholder 금지 — 확정 카피 수령 후 착수." C1(핵심 헤드라인·메시지 최종안)이 아직 대기 상태(마감 7/23)이므로 **이 항목은 현재 실제로 시작할 수 없는 게 맞음.**
- **제안**: Notion 상태를 "진행중"에서 "대기"로 되돌리는 게 정확함 — 지금 "진행중"으로 두면 다른 사람이 착수 중이라고 오인할 수 있음. C1 확정되는 대로 자동으로 착수 조건 충족.

### 2-3 — store insight 페이지 PRD 풀매핑 ✅ 완료 처리(7/20, Jamin 지시)
- **스펙**(`docs/SPECS_NEXT_v1.md` §A2): saai-insight 페이지를 PRD 정의(화면 5종·비교 원리·매출 import·티어 매트릭스, 가격 숫자 제외)로 완성 예정이었음.
- **[7/20] Jamin 결정**: PRD 원문(화면 5종·비교원리·매출 import·티어 매트릭스) 확보를 기다리지 않고 **이 항목은 완료 처리, 다음 작업으로 진행**. saai insight 페이지 자체는 현행 유지.
- **후속**: PRD 기반 심화가 다시 필요해지면 별도 Growth Planner 항목으로 재등록.

### 2-7 — 블로그 196+45편 목록 export (C3 큐레이션용) 🟢 바로 처리 가능
- **확인**: `content/articles/*.mdx` 247개 파일 존재(로케일 접미사 `-en`/`-jp` 제외 시 239개). `src/lib/articles.ts`에 이미 "weekly 제외" 등 노출 규칙이 구현되어 있어(STATUS.md §1 참고: "189 vs 196 편수 차이는 오탐, 설계상 weekly 제외") 이 로직을 그대로 재사용하면 실제 노출 후보 목록을 뽑을 수 있음.
- **남은 일**: `scripts/`에 짧은 export 스크립트 하나 추가 — frontmatter(title/slug/category/date/lang/draft)를 읽어 `docs/BLOG_CURATION_LIST.csv`로 저장. `src/lib/articles.ts`의 필터 로직을 그대로 import해서 "현재 노출되는 것 vs 전체"를 구분해주면 Jamin이 C3(노출/비노출 선별)를 바로 진행 가능. 공수 30분~1시간 내외로 추정.

### C1 — 홈·제품·회사·가격 본문 카피 검수·확정 (Jamin, 코드 작업 아님)
검수 시 참조할 실제 소스 위치를 정리해둠 (전부 `content/site/*.yaml`, 필드-메이저 KO/EN/JP 구조):

| 영역 | 파일 |
|---|---|
| 홈 | `content/site/home.yaml` |
| 제품(saai count/insight/care/agent) | `content/site/products.yaml`, `store-agent.yaml`, `saai.yaml` |
| 회사 | `content/site/about.yaml` |
| 가격 | `content/site/pricing.yaml` |
| 업종별(오늘 새로 만짐) | `content/site/retail.yaml`, `food-beverage.yaml`, `drug.yaml`(→`drug-store` 예정), `large-space.yaml` |

- 참고: 오늘 오전 커밋(`ceb2f8c1e`)에서 홈 히어로 서브카피 + 4개 업종 히어로가 이미 한 차례 재작성됨(가치사슬 강조·템플릿 반복 해소) — C1 검수 시 이 최신 버전을 기준으로 보면 됨.
- yaml 수정 후에는 `npm run gen:content`로 `src/data/generated/site-content.json` 재생성 필요 — 이 부분은 Claude(개발 세션) 몫.

---

## 전략/운영 (코드 대조 대상 아님)

- **J-5 (HubSpot API 키 요청)**: 소비처 코드(`G-2a` 폼→HubSpot 연동)는 아직 대기 상태로 착수 전 — 키가 없어도 코드 작업이 막혀있는 건 아니지만, 키 없이는 G-2a 시작이 불가하므로 순서상 먼저 필요. 운영 작업.
- **G-1 (Lead funnel 정의)**: 전략 문서(Notion) 완결도가 높고 코드 종속성 없음. 위에서 다룬 항목 아님.

---

## 다음 세션에 바로 넘길 수 있는 것 (우선순위 제안)

1. **3-10 올리브영 실명 제거** — 6곳 위치 확정됨, 즉시 착수 가능(런칭 블로커)
2. **2-7 블로그 목록 export** — 스크립트 하나로 해결, C3 대기시간 단축
3. **3-12 CTA 문구 교체** — 위치 1곳, 문구만 Jamin 확정되면 즉시 반영
4. **3-11 "누구나" vs "누가"** — 7곳 케이스별로 Jamin 최종 확정 필요(§3-11 표 참조), 확정되면 `brand-canon.ts` 우선 수정 후 일괄 치환
5. 2-1은 **C1 카피 확정(7/23) 전까지 착수 불가** — Notion 상태 "대기"로 정리. 2-3은 완료 처리됨(재작업 없음)
