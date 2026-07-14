# LAUNCH_PLAN_v1 — deepingsource.io 라이브 전환 4주 플랜

> 작성 2026-07-13 · 목표 라이브 **2026-08-10(월)** (여유 3일) · 상태 SOT
> 팀 공유·진행 체크: [Notion — Homepage 2026](https://app.notion.com/p/39c51b20830580c39995dd2871e03fcb) (이 문서와 동기 유지)
> 확정 전제: ① 가격 정본은 런칭 전 확정 불가 → **가격 노출 없이 live**, 가격 앵커(★9)는 post-launch ② 범위 = 런칭 필수 + 홈 P1 + P2 + 모션 Phase D 전부 ③ 기존 deepingsource.io는 **별도 호스팅에 라이브 중** → 리다이렉트 맵 필수

---

## 0. 현재 위치 (2026-07-13 검증)

**완료:** 제품 재편 6단계(SHIPPED) · 회사 영역 P0+P1 · 익명화 실자산 4차 · 모션 A~C · 홈 P0 중 비교원리·매출허브 · 애널리틱스 Phase A(GA4+Umami) · 블로그 CMS Phase B(196+45편) · Keystatic GitHub 모드 전환 커밋(7/13)

**잔여 = 이 문서의 전부:** go-live 트랙(신규) · 가격 구조 정리 · CMS Phase C 마무리 · 홈 P1 · 회사 보강 · P2 · 모션 D · QA

---

## 주 1 (7/13–7/19) — 런칭 리스크를 앞으로

가장 불확실한 것(도메인·리다이렉트·CMS 팀오픈)을 먼저 소진한다.

| # | 작업 | 담당 | 완료 기준 |
|---|---|---|---|
| 1-1 | **기존 사이트 URL 인벤토리 → 301 리다이렉트 맵** — 구 사이트 전 URL 크롤, 새 IA 매핑(블로그 45편 slug 일치 확인 포함), 매핑 불가 URL은 최근접 페이지로 | Claude | `docs/REDIRECT_MAP_v1.md` + `next.config.ts` redirects 초안 |
| 1-2 | **도메인 전환 사전 작업** — DNS 관리 주체·레지스트라 확인, TTL 300s로 인하, Vercel 프로덕션 프로젝트에 도메인 pre-add | Jamin(액세스) + Claude(가이드) | DNS 접근 확인 + TTL 인하 완료 |
| 1-3 | **CMS Phase C 마무리** — GitHub App 설치, 비개발 팀원 1명 실제 글 1편 발행 → 프로덕션 반영 | Jamin(팀원 섭외) + Claude | ADMIN_PLAN Phase C 완료 기준 충족 |
| 1-4 | **pricing 구조 정리 (숫자 무관 작업만)** — `pricing-data.ts` 단일소스화, `pricing-data.test.ts` 정합(3플랜), CameraSimulator useState 13→3, 고아 InlinePricingSimulator 삭제 | Claude | PHASE4 P1 항목 클로즈, 빌드·테스트 그린 |
| 1-5 | **noindex 게이트 점검** — preview noindex가 프로덕션 도메인에서 해제되는 조건 확인·수정 | Claude | 프로덕션 빌드에서 index 가능 확인 |

**주1 게이트:** DNS 액세스 미확보 시 → 전환일 유지 불가, 즉시 에스컬레이션.

## 주 2 (7/20–7/26) — 홈 P1 + 회사 보강

| # | 작업 | 담당 | 비고 |
|---|---|---|---|
| 2-1 | 아웃라이어 워크플로 섹션 ("아침에 열어 10초·1분") | Claude | 발전계획 §3 P1-5 |
| 2-2 | OliveYoung 사례 구체화 — **실명·수치 사용 승인 확인 선행** | Jamin(승인) → Claude | 미승인 시 익명 실증 사례로 (launch-blocking 아님) |
| 2-3 | store insight 페이지 PRD 풀매핑 — 화면 5종·비교원리·매출 import·티어 매트릭스(가격 숫자 제외) 이관·심화 | Claude | 발전계획 §3 P1-7 |
| 2-4 | 회사 영역 보강 — 경영진 사진·고봉경 약력 | Jamin(자료) → Claude | 자료 미제공 시 현행 유지 |
| 2-5 | 신규 카피 3로케일(KO/EN/JP) 동기화 | Claude | 매 작업 단위에 포함 |

## 주 3 (7/27–8/2) — P2 + 모션 D + QA 1차

| # | 작업 | 담당 | 비고 |
|---|---|---|---|
| 3-1 | AI 어시스트 로드맵 밴드 (Explain·Ask·Study) | Claude | 발전계획 P2-8 |
| 3-2 | PRD 남은 질문 → FAQ/문서 (첫 30일·권역 권한·갱신 주기) | Claude | P2-9 |
| 3-3 | 모션 Phase D (PR5: 라우트 전환·드래그·앰비언트) — reduced-motion·LCP 가드레일 준수 | Claude | 일정 압박 시 **가장 먼저 드랍** |
| 3-4 | **QA 1차** — Lighthouse(모바일 포함)·a11y·3로케일 전 페이지·전 링크 체커·contact 폼 실수신·OG/sitemap/canonical·GH Pages export 그린 | Claude | 이슈 리스트 → 주4 픽스 |

## 주 4 (8/3–8/10) — 프리즈 → 전환

| 일자 | 작업 |
|---|---|
| 8/3(월) | **콘텐츠 프리즈.** 이후 버그픽스만 |
| 8/3–8/5 | QA 이슈 픽스 · 리다이렉트 맵 스테이징 검증(구 URL 전수 curl) · 최종 빌드 |
| 8/6–8/7 | 전환 리허설: Vercel 프로덕션 도메인 연결 절차 문서화, 롤백 플랜(DNS 원복) 확정 |
| **8/10(월)** | **전환 실행:** DNS 스위치 → noindex 해제 확인 → GSC sitemap 제출 → GA4/Umami 실계측 확인 → 구 URL 301 표본 검증 → 전 로케일 스모크 테스트 |
| 8/10–8/13 | 모니터링: 404 로그·GSC 커버리지·폼 수신. 여유 3일 = 핫픽스 버퍼 |

---

## 배포 버전 시각 리뷰 (2026-07-13 · ds-hp-temp.vercel.app)

데스크톱 뷰포트, EN/KO/JP 로케일 스팟체크. 콘솔 에러 0. 홈·pricing·case studies·docs 구조·contact 폼 필드는 양호.

### R-P0 — 런칭 블로킹 (주1에 편입)

| # | 발견 | 조치 |
|---|---|---|
| R1 | **`/demo`가 내부 목업 리뷰 페이지** ("목업 데모 리뷰 · 총 28종", EN 로케일에서도 한국어) — 홈 CTA "See the live demo"가 여기로 연결 | 공개용 데모 페이지로 교체 or CTA 재타깃. 최소한 noindex + 네비·CTA에서 숨김 |
| R2 | **배포 뒤처짐 확정(7/14 진단)** — 배포판(`ds-hp-temp.vercel.app`) 블로그 KO 189편 vs 로컬 196편, `/keystatic`이 GitHub 로그인 없이 local 모드로 뜸(→ 서버리스 FS 못 읽어 "0 entries" 빈 화면). 즉 7/13 GitHub 모드 전환 커밋(`de5b9f6ea`) 미배포 = **Keystatic 어드민 빈 화면의 근본 원인** | Vercel Git 연동 상태 확인 후 최신 main 배포. 검증: `/keystatic` 진입 시 GitHub 로그인 화면 → 로그인 후 싱글톤 7종+articles 241편 로드, 블로그 KO 196편 |
| R3 | **KO 네비 "Company" 미번역** — 제품·기술·솔루션·**Company**·리소스 (JP는 정상 "会社") | Header KO 라벨 수정 |
| R4 | **Contact 페이지 초기 "Loading…" 노출** — 폼 hydration 수 초 지연 | SSR 폴백/스켈레톤, 또는 클라이언트 경계 축소 |

### R-P1 — 품질 (주2~3에 편입)

| # | 발견 | 조치 |
|---|---|---|
| R5 | 빠른 스크롤 시 **리빌 미발동 빈 화면** — About·store insight 중반·blog 목록에서 뷰포트 전체가 공백으로 보이는 구간 | Reveal viewport threshold 완화, 목록성 콘텐츠(blog 그리드)는 리빌 제거 검토 |
| R6 | EN 페이지에 로컬 요소 잔존 — 파트너 칩 "올리브영"(EN 홈), pricing "KakaoTalk" | EN 표기(Olive Young / KakaoTalk 유지 여부) 정리 |
| R7 | 홈 파트너 통계 count-up이 낮은 시작값(2 Patents)으로 먼저 보임 | 뷰포트 진입 타이밍/시작값 조정 (minor) |
| R8 | Docs 매뉴얼 "Coming soon" 2건 (store agent·store care) | 런칭 전 1건이라도 채울지, 문구 유지할지 결정 |

## 리스크 & 결정 대기

| 리스크 | 대응 |
|---|---|
| 가격 정본 미확정 | 가격 노출 없이 live. 가격 앵커(★9)·티어 카피는 post-launch 백로그. pricing 페이지는 현행 라이브 가격 유지 |
| OliveYoung 승인 지연 | 익명 사례로 fallback, 승인 후 교체 |
| 사진·약력 미제공 | 현행 유지 — launch-blocking 아님 |
| DNS 액세스 지연 | 주1 내 미해결 시 목표일 재협상 (유일한 하드 블로커) |
| CMS 팀원 테스트 실패 | 런칭과 무관 트랙 — live 후 계속 |

## Post-launch 백로그 (8/13~)

가격 앵커(★9)+가격 페이지 티어 스토리(정본 확정 후) · CMS Phase D(페이지 카피·이미지 확대) · 회사 P2(채용솔루션 연동·미디어킷 PDF) · 블로그 EN/JP · Umami 셀프호스팅 검토
