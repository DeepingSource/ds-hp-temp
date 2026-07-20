# NEXT 실행 스펙 v1 — 주2~4 + Growth 인프라 선행 문서화 (작성 2026-07-16)

> 실행 주체: AI 코딩 에이전트 (또는 개발자). 공통 규칙은 `docs/SPECS_WEEK1_v1.md` 상단과 동일.
> 정본 보드: Notion「⚡ Growth Planner — Web·MKT·PR」. ⚠️ 표시는 선행 의존이 있어 아직 착수 불가.

---

## A. 주2 — 콘텐츠·페이지

### A1. [2-1] 아웃라이어 워크플로 섹션 (홈 P1) — ⚠️ 카피 의존(C1)
- **Goal**: "아침에 열어 10초·1분에 끝나는" 사용 흐름을 홈에 시각화.
- **구성안**: 3-스텝 타임라인(열람 10초 → 아웃라이어 확인 1분 → 액션) — 기존 `TimelineSpine`/`StaggerContainer` 재사용, 신규 컴포넌트 최소화.
- **의존**: C1 헤드라인·카피 확정(7/23) 전 카피 placeholder 금지 — 확정 카피 수령 후 착수.
- **Acceptance**: 홈 3로케일 반영, 모바일 레이아웃 정상, Reveal 동작(R5 픽스 반영 후), 신규 카피 KO/EN/JP 동기화(2-5).

### A2. [2-3] store insight 페이지 PRD 풀매핑 — ⚠️ PRD 참조 필요
- **Goal**: saai-insight 제품 페이지를 PRD 정의(화면 5종·비교 원리·매출 import·티어 매트릭스)로 완성. **가격 숫자 제외.**
- **참조**: PRD — Notion 「PRD — 회사·제품 홈페이지」 (보드 DOC 행 링크). 에이전트는 PRD 해당 섹션 텍스트를 입력으로 받아야 함.
- **Acceptance**: PRD 체크리스트 항목별 매핑표(구현 위치) 작성 → PRD 대비 누락 0, 3로케일 동기화.

---

## B. 주3 — 픽스·QA·SEO

### B1. [3-5 R5] 빠른 스크롤 시 리빌 미발동 빈 화면
- **대상**: `src/components/ui/Reveal.tsx` (IntersectionObserver 기반). 증상 페이지: About·insight·blog 목록.
- **Fix**: ① threshold 완화 + `rootMargin` 하향 진입 여유 확대 ② 이미 뷰포트 위로 지나간 요소는 즉시 표시(초기 rect 검사) ③ 목록형(blog·글로서리 등 반복 아이템)은 Reveal 래핑 제거 검토 — 사용처 grep 후 목록형만 선별.
- **Acceptance**: 각 증상 페이지에서 빠른 휠/스크롤바 드래그로 최하단 이동 시 빈 블록 0. prefers-reduced-motion에서 전부 즉시 표시.

### B2. [3-6 R6·R7] EN 페이지 로컬 요소 정리
- **대상 파일**: `src/components/corporate/PartnerGrid.tsx` (파트너 칩 "올리브영" 한글 표기 + Kakao 관련 표기), `src/components/ui/CountUp.tsx` (초기 시작값 노출), 데이터: `src/data/generated/site-content.json`은 생성물이므로 **원본 소스(content/ 또는 scripts/gen-site-content.mjs 입력)를 수정**할 것.
- **Fix**: EN 로케일에서 파트너명 영문 표기(OLIVE YOUNG 등)·Kakao 표기 통일. CountUp은 뷰포트 진입 전 최종값 미노출 문제라면 시작값을 0 고정 렌더 또는 SSR에서 최종값 렌더 후 재생 — 기존 구현 확인 후 택1.
- **Acceptance**: /(EN) 전 섹션에서 한글 잔존 0 (의도된 로고 이미지 제외), count-up 초기 페인트 어색함 없음.

### B3. [3-4] QA 1차 — 에이전트 실행 체크리스트
1. `npm run build` 클린 빌드 → 에러·경고 기록.
2. Lighthouse(모바일): 홈·제품 1·pricing·blog 목록·contact — 성능/a11y/SEO 점수 기록, 회귀 기준: 이전 측정 대비 -5 이상 하락 시 이슈화.
3. a11y: 키보드 포커스 순서, 이미지 alt 누락 grep, 색 대비(주요 CTA).
4. 3로케일 전 페이지 렌더 스모크: sitemap.ts 출력 URL 전체를 로컬 서버에 요청 → 200 + 타이틀 존재 확인 스크립트(`scripts/smoke-locales.mjs` 작성).
5. 링크 체커: 내부 링크 404 스캔.
6. contact 폼 실수신: 테스트 제출 → Slack 수신 확인(기존 sendSlackNotification 경로).
7. OG/sitemap/canonical: 대표 페이지별 og:image 렌더, canonical이 BASE_URL 기준인지, hreflang 3종 상호 참조.
- **산출물**: `docs/QA_ROUND1_REPORT.md` — 항목별 통과/이슈 표. 이슈는 보드에 행으로 등록.

### B4. [3-8] SEO 마이그레이션 방어
1. **메타 패리티**: 구 사이트 주요 페이지(유입 상위)의 title/description 대비 신 사이트 대응 페이지 값 비교표 — 검색 유입 지키는 게 목적이므로 의도적 개선 외 공백 금지.
2. **hreflang**: 전 페이지 KO/EN/JP 상호 참조 + x-default 검증 (layout metadata alternates 확인).
3. **구조화 데이터**: Organization(전역) + Product(제품 4종) JSON-LD — 기존 구현 여부 grep 후 누락분 추가. Rich Results Test 통과.
4. **GSC**: 전환 당일 절차(4-4 런북 §C 참조) — 신 sitemap 제출·색인 요청은 코드가 아닌 운영 절차로 문서화만.
- **Acceptance**: 패리티 표 산출(`docs/SEO_PARITY.md`), hreflang·JSON-LD 검증 통과.

### B5. [3-3] 모션 Phase D — 잔여분 (일정 압박 시 최우선 드랍)
- **현황**: D1 라우트 전환은 구현됨(`src/app/template.tsx`, opacity 페이드 + 첫 페인트 스킵 + reduced-motion 가드).
- **잔여**: D2 드래그(대상 컴포넌트: BeforeAfterSlider 개선 여부 확인), D3 앰비언트(히어로 배경 등) — 범위는 DESIGN.md 모션 플랜 참조.
- **가드레일**: template.tsx 주석의 원칙 유지 — transform 금지(fixed 자손 문제), reduced-motion 비활성, LCP 요소 첫 페인트 즉시.
- **드랍 규칙**: CP-3(7/31)에서 QA 이슈 잔량 기준으로 드랍 판정.

### B6. [3-2] PRD 남은 질문 → FAQ — ⚠️ 답변 콘텐츠 의존
- **대상**: `src/app/resources/faq` 기존 구조에 항목 추가 (첫 30일 온보딩 · 권역 권한 · 데이터 갱신 주기).
- **의존**: 답변 카피 확정(Jamin/PM팀). 구조·컴포넌트는 기존 FAQ 패턴 재사용.
- **Acceptance**: 3문항 3로케일 반영, FAQPage JSON-LD 갱신(B4와 연계).

---

## C. 주4 — 전환 런북 (4-3 산출물 초안, 4-4 실행용)

> 이 섹션이 4-3(리허설)의 문서화 산출물 초안. 리허설에서 검증·보완 후 확정.

**C1. 사전 조건 (8/7 Go/No-Go 통과 항목)**
- [ ] 리다이렉트 맵 스테이징 전수 검증 통과 (scripts/verify-redirects.mjs)
- [ ] QA 이슈 크리티컬 0 · 콘텐츠 프리즈 준수 중
- [ ] DNS 관리 콘솔 접근 확보(J-1) · TTL 300s 인하 완료(1-2)
- [ ] Vercel 프로덕션에 deepingsource.io + www 도메인 추가, SSL 발급 확인
- [ ] 롤백 절차 리허설 1회 완료

**C2. 전환 절차 (8/10 월)**
1. Vercel Production env: `NEXT_PUBLIC_ALLOW_INDEXING=true`, `NEXT_PUBLIC_BASE_URL=https://deepingsource.io` → 재배포.
2. DNS 스위치: apex A/ALIAS → Vercel, www CNAME → Vercel (www→apex 리다이렉트는 Vercel 도메인 설정).
3. 전파 확인(TTL 300s 기준 ~10분): `dig` apex/www.
4. /robots.txt = allow 확인, /sitemap.xml 응답 확인.
5. GSC: 신 sitemap 제출, 대표 URL 색인 요청. (구 Webflow 호스팅은 당분간 유지 — DNS 원복 롤백용)
6. GA4·Umami 실계측 수신 확인 (실시간 보고서).
7. 구 URL 301 표본 검증: REDIRECT_MAP_v1 상위 20개 수동/스크립트 확인.
8. 3로케일 스모크: scripts/smoke-locales.mjs 프로덕션 대상 실행.
9. contact 폼 실제 제출 1건 → Slack 수신 확인.

**C3. 롤백 (실패 시)**
- 판정 기준: 전환 후 30분 내 5xx 지속·주요 페이지 렌더 실패·폼 불능 중 1개라도 해당.
- 절차: DNS를 구 Webflow 값으로 원복(TTL 300s → ~10분 복구) → 원인 분석 후 재시도 일정 결정. Vercel env는 되돌릴 필요 없음(도메인이 안 오면 노출 안 됨).

**C4. 직후 모니터링 (8/10–13, 4-5)**
- 404 로그(Vercel)·GSC 커버리지·폼 수신 일 1회 이상 점검 → 이슈는 보드 등록. 이후 OP-0으로 인계.

---

## D. Growth 인프라 (주3 구현 — J-5 키 수령 후)

### D1. [G-2a] 폼 → HubSpot 컨택트 기록 (기존 핸들러 확장)
- **현황(7/16 정찰)**: `src/app/api/contact/route.ts`에 zod 검증 + rate limit + **Slack 알림 이미 구현됨**. newsletter 라우트도 동일 패턴. → 신규 구축 아님, **HubSpot 기록 단계만 추가**.
- **구현**:
  1. `src/lib/hubspot.ts` 신규 — Contacts API 생성/업서트(이메일 기준). env: `HUBSPOT_ACCESS_TOKEN` (J-5 수령분).
  2. contact route: Slack 발송과 병렬로 HubSpot 업서트 — 프로퍼티 매핑: contact→email/phone, name, brandName→company, storeCount, product, plan, inquiryType, message + `lead_tier`(스코어 초안: storeCount 구간 기반) + UTM(아래 D3).
  3. newsletter route: 업서트 + lifecycle=subscriber.
  4. **실패 격리**: HubSpot 오류가 사용자 응답·Slack을 막지 않게 try/catch 분리, 실패 시 Slack 메시지에 `⚠️ HubSpot 기록 실패` 표기.
- **Acceptance**: 테스트 제출 → HubSpot 컨택트 생성 + Slack 수신 + (D2) 백업 기록. HubSpot 토큰 부재 환경에서는 조용히 스킵(로컬·프리뷰).

### D2. [G-2b] 리드 이중 기록 백업
- **제약**: Vercel 서버리스 — 로컬 파일 영속 불가. CSV 파일 방식 불가.
- **옵션**: ① Notion 리드 대장 DB append (API 토큰 필요, SSOT 일관 — **권장**) ② Google Sheets append (서비스 계정 필요) ③ Vercel KV/Blob.
- **구현**: `src/lib/lead-backup.ts` — 옵션 확정 후 단일 함수. HubSpot·Slack과 독립 try/catch, 3중 모두 실패 시에만 500.
- **결정 필요**: 백업 저장소 선택 (Jamin — 권장 ①).

### D3. [G-9a] GA4 전환 이벤트 + UTM 캡처
- **현황**: `trackEvent`(src/components/Analytics) 존재, contact 폼에서 사용 중.
- **구현**: ① 이벤트 명세 통일 — form_submit / magnet_download / event_register / newsletter_subscribe (GA4 전환 마킹은 콘솔 작업으로 문서화) ② 첫 방문 UTM을 sessionStorage에 보존 → 폼 제출 시 hidden 필드로 API 전달 → HubSpot 프로퍼티(utm_source/medium/campaign) 기록 ③ G-9 태깅 규칙 문서와 이벤트명 일치.
- **Acceptance**: UTM 붙은 방문→제출 시 HubSpot 컨택트에 UTM 3종 기록, GA4 DebugView에서 4이벤트 확인.
