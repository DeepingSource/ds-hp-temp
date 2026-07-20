# 잔여 작업 — 실행 체크리스트

> **갱신** 2026-07-20 · **목적** [`STATUS.md`](./STATUS.md)에 흩어진 잔여 항목 + 사용자 직접 실행/결정 항목을 **한곳에 모은 실행 리스트**. 완료 이력·근거는 STATUS.md 각 §를 참조.
>
> 읽는 법: **A**는 지금 개발 착수 가능, **B**는 Jamin/사용자 회신을 받으면 개발 전환, **C**는 외부 자산 도착 대기, **D**는 코드 밖 사용자 실행, **E**는 폴더·로컬 자료 정리(사용자 판단).

---

## A. 개발 즉시 착수 가능 (게이트 없음)

현재 **빠른 착수 가능한 비게이트 항목은 없음** — 비게이트 개발분은 대부분 완료(STATUS §16·§17). 남은 것은 아래처럼 결정·자산·규모 게이트가 걸려 있음.

- **Keystatic 고도화 대형 항목**(편집자 루프·온보딩 잔여, STATUS §2) — 개발 가능하나 범위 스코핑 선행 필요. 착수하려면 우선순위 지정 요청.

---

## B. Jamin / 사용자 결정 대기 → 회신 시 개발 진행

| # | 항목 | 필요한 결정 | 근거 |
|---|---|---|---|
| 3-11 | "누구가" 표현 | 7곳 문장별로 "누구나"/"누가" 확정 | STATUS §16 |
| 3-12 | 홈 CTA 문구 | 권장안 "전문가 상담 신청하기" 확정 여부 | STATUS §16 |
| F-4 | 업종→제품 매핑 | 매핑 승인 | STATUS §16 |
| F-6 | 창업 스토리 | about 발췌 검수 | STATUS §16 |
| F-8 | docs 구분 의도 | 허브 강화 vs URL 재구조화 | STATUS §16 |
| F-9 | FAQ 재디자인 | 디자인 시안 방향 | STATUS §16 |
| 파트너 | 7개 브랜드 실명 | CU·코리아세븐·CJ푸드빌·롯데GRS·현대차·롯데월드·국립박물관재단 노출 승인 | STATUS §16 |
| 1-B | SAAI Suite 통합 | 진행 여부(현재 보류) | STATUS §15 |
| 1-D | /solutions 허브 플로우 | 재설계 구조 결정 | STATUS §15 |
| 1-E#2 | 요금↔엔터프라이즈 | threshold 숫자 확정 | STATUS §15 |
| P2/P3 | 홈페이지 개선계획 | 범위·카피 방향(미착수) | STATUS §15 |

---

## C. 외부 자산 대기 → 도착 시 개발

- **F-2 pete-anon 데모 원본** — Anonymizer 기존 데모 영상(`/videos/pete-anon-demo.mp4`) 교체용 원본. 피트님 자산 도착까지 블로킹. (SEAL 콘텐츠 반영 §17 범위 밖)
- **F-3 Vision 모델 리스트 + 데모 영상** — 제품팀 제공.
- **leadership 사진·고봉경 약력** — 자료 도착 후 Company 보강.
- **0-11 about leadership 잘림** — 코드에서 재현 안 됨 → 배포본에서 검증 필요.

---

## D. 사용자 직접 실행 (코드 밖)

- [ ] **배포 검증** — Vercel Deployment Protection 해제(또는 bypass 토큰) 후 배포본 1회 대조.
- [ ] **noindex 게이트 해제** — 운영 env `NEXT_PUBLIC_ALLOW_INDEXING=true` (⚠️ 빌드타임 인라인 → 설정 후 재배포 필수).
- [ ] **도메인 전환** — `deepingsource.io` + GitHub App callback + `NEXT_PUBLIC_SITE_URL` 갱신.
- [ ] **분석 계정** — GA4 / Umami 계정 발급 + Vercel env 설정.
- [ ] **GSC** — sitemap 제출.
- [ ] **leadership 인사 정합** — 자료 CTO(이수민) vs 사이트(CBO 금상호·VP 고봉경) 확인 후 bio 보강.
- [ ] **EN/JP 최종 사인오프** — 기계 검수 완료, 사람 확인만 잔여.
- [ ] **A-2 slug 이중 입력 정리** — 콘텐츠 ~400파일 마이그레이션 + Keystatic 어드민 왕복(GitHub 로그인 환경).
- [ ] **gated docs 활성화**(필요 시) — 문서 `access:gated` + Vercel env 2개(`DOCS_ACCESS_SECRET`·`_CODES`).

---

## E. 프로젝트 폴더 / 로컬 자료 정리

**완료 (2026-07-20):**
- ✅ **중복 PDF 삭제** — 루트 `StoreCount ...복사본.pdf` 2건 제거. 원본은 `~/Downloads/자료 모음 1/`·`~/Downloads/storecount/` 에 보존.
- ✅ **WIP 계획/스펙/피드백 16건 저장소 아카이브** — 루트 → `docs/` 이동 후 커밋(대부분 이미 SHIPPED된 계획서, STATUS §9~§17). 목록: `DOCS_WIKI_PLAN_v1`·`GROWTH_PLANNER_STATUS_REVIEW_260720`·`PLAN_ADDITIONAL_CONTENT_v1`·`PLAN_DEMO_ASSETS_v1`·`PLAN_STOREAGENT_MATERIALS_v1`·`SEAL_페이지_콘텐츠_반영_계획_v1`·`SITE_IMPROVEMENT_PLAN_260716`·`SPECS_NEXT_v1`·`SPECS_WEEK1_v1`·`USERGUIDE_IMPORT_PLAN_v1`·`콘텐츠_수정확장_실행계획_260716`·`2026-07-20_1250_Feedback`·`coex-expo-84-*`·`coex-franchise-expo-84-*`·`DeepingSource_홈페이지_개선계획`·`DeepingSource_홈페이지_콘텐츠_분석`.
- ✅ **저장소 루트 정돈** — 루트 `.md`는 SOT 3개(`DESIGN.md`·`README.md`·`SAAI_AI_Handoff.md`)만 유지.
- ✅ **SEAL 스테이징 폴더 삭제** — public/ 반영 완료 확인 후 `asset-hp-260720/`(65M)·`docs/SEAL_LEGACY_ASSETS/`(11M) 제거, 죽은 gitignore 라인 정리. 원본은 사용자 stock 구매본 보유.

**로컬 전용(gitignore) 유지 — 디스크 보존:**
- 기타 스테이징/작업 폴더: `pop/`, `new-images/`, `asset-prompts/`, `copy-review/`, `storeagent-demo-prep/`
- 소스 파일: `floormap.pdf`(루트 소스 PDF)

**남은 사용자 판단:** 없음 — 폴더 정돈 완료.
