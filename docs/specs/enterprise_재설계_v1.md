# /enterprise 재설계 스펙 v1 — 본사 전환 퍼널 (구조 재설계)

작업일: 2026-07-21 · 대상: `/ko/enterprise` (`EnterpriseView.tsx` · `content/site/contact.yaml` · `MasterPair.tsx`)
전제(세션 확정): ① 전환 1순위 = 프랜차이즈·체인 본사 ② 랜딩과 그라운딩 포지셔닝 정합 ③ CTA = **제안/상담 요청(폼 + 이메일)** — 미팅 예약 위젯 보류, 제출 → **Slack + CSV/시트 + HubSpot** 파이프라인 ④ **구조 재설계**(현행 자산은 재활용).
근거: 랜딩_전환재정렬_v2 + 현행 `EnterpriseView` 감사 + brand-copywriting(오길비 위계).

## 0. 왜 재설계인가

현행 `/enterprise`는 이미 본사용으로 탄탄함(히어로·MasterPair 이관·Golden Case 5단계·대시보드·프로세스·상담 CTA). 문제는 **① 맞춤 제안이라는 핵심 약속이 스파인으로 안 서 있고 ② 랜딩의 그라운딩 논리와 톤이 안 이어지고 ③ 신뢰(본사 로고)가 늦게 나오고 ④ CTA가 폼 단일 트랙**이라는 것. → 자산은 살리되 **전환 서사 순서를 다시** 짠다.

## 1. 포지셔닝·약속 (오길비)

- **포지셔닝:** 매장이 늘수록 편차·관측 불가로 고생하는 프랜차이즈 본사에게 — 전국 매장을 *직접 읽어* 당신의 브랜드에 맞는 운영 표준을 만들어 주는 익명화 공간 AI.
- **약속(하나):** **"매뉴얼이 아니라, 당신의 매장에서 나온 제안."** (범용 BI·범용 AI와의 결정적 차이 = 당신 체인을 읽고 맞춘다)
- **빅 아이디어:** 랜딩의 그라운딩("공간 신호를 받아야 당신의 답")을 본사 스케일로 — **"전국 매장을 읽어, 당신의 체인에 맞춘다."**
- **보이스:** `~합니다`체 · 임원 신뢰 톤 · 리스크 제거 언어(파일럿부터).

## 2. IA 재설계 (섹션 순서 · 역할)

| # | 섹션 | 역할 | 자산 |
|---|---|---|---|
| 1 | **히어로** | 약속 + CTA(제안 요청·이메일) | 신규 카피 · 다크 |
| 2 | **신뢰 띠** (사회적 증거 조기 노출) | 본사 로고·특허·SOC2 — B2B 결정자 신뢰 선점 | contact.yaml 브랜드 + 신뢰 칩 |
| 3 | **본사의 통증** | 편차·현장 관측 지연·감 의존 → 근본="매장 안을 못 읽음" | 현행 challenges 재구성 |
| 4 | **약속: 당신의 체인에 맞는 제안** ★스파인 | 범용이 아니라 맞춤 — *어떻게* 맞추나 | 신규(그라운딩→본사) |
| 5 | **어떻게: Golden Case 5단계** | 맞춤 제안의 엔진(발견·검증·번역·전파·재측정) | 현행 유지·강화 |
| 6 | **한눈에: 다점포 대시보드** | 관측 회복 — 전국을 한 화면 | 현행 목업(라벨 정리) |
| 7 | **본부 ↔ 매장 약속** | 본사=표준화 · 점주=대표매장 | MasterPair(유지) |
| 8 | **도입 방식 + 리스크 제거** | 상담→파일럿→확산 · 기존 CCTV | 현행 프로세스 |
| 9 | **반론 처리 (FAQ 소)** | 개인정보·하드웨어·비용·기간 | 신규(공용 FAQ 컴포넌트) |
| 10 | **마지막 CTA** | 제안 요청(폼) + 이메일 문의 | 신규 · 리드 파이프라인 |

## 3. 히어로 최종안

### [KO]
> (eyebrow) Enterprise · 익명화 공간 AI
> (H1) **당신의 체인을 읽고 — 당신의 체인에 맞는 제안.**
> (sub) 프랜차이즈 본사를 위한 익명화 공간 AI. 매뉴얼이 아니라, 전국 매장을 읽어 잘되는 운영을 찾고 당신의 브랜드에 맞춰 전 매장에 옮깁니다. 쓰던 CCTV로, 얼굴 없이.
> (CTA) **[맞춤 제안 요청]**(primary · 폼) · **[이메일 문의]**(secondary · mailto)
> (신뢰 라인) BGF CU · 코리아세븐 · CJ푸드빌 · 국내 1위 H&B — 이미 함께합니다.

**대안 H1**
- 매뉴얼로 안 좁혀지던 매장 편차, 데이터로 좁힙니다. *(문제·비교형)*
- 전국 매장을 하나의 기준으로 — 본사가 매장 안을 읽는 순간. *(관측·그라운딩)*
- 가장 잘되는 매장을, 전국의 기준으로. *(편차·복제 — 랜딩 티저와 직결)*

### [EN]
> (eyebrow) Enterprise · Anonymized Spatial AI
> (H1) **Read your chain — and get a proposal built for it.**
> (sub) Anonymized Spatial AI for franchise HQ. Not a playbook — we read every store, find what works, and roll it out tuned to your brand. On the CCTV you already have, without faces.
> (CTA) Request a tailored proposal · Email us

### [JP]
> (eyebrow) Enterprise · 匿名化空間AI
> (H1) **あなたのチェーンを読み、あなたのチェーンに合う提案を。**
> (sub) フランチャイズ本部のための匿名化空間AI。マニュアルではなく — 全店舗を読み、うまくいく運営を見つけ、御社ブランドに合わせて全店へ展開します。すでにあるCCTVで、顔なしで。
> (CTA) 最適なご提案を相談 · メールでお問い合わせ

## 4. 스파인 섹션 — 당신의 체인에 맞는 제안 (신규 · §4)

> (eyebrow) 왜 맞춤인가
> (H) **범용 제안은, 당신의 매장을 본 적이 없습니다.**
> (본문) 컨설팅 리포트도, 범용 AI도 일반론을 줍니다 — 당신의 동선도, 진열도, 손님도 본 적이 없으니까. 딥핑소스는 전국 매장을 **직접 읽어** 잘되는 이유를 찾고, 당신의 브랜드 기준에 맞춰 제안합니다.
> (3단 · 어떻게 맞추나)
> ① **읽습니다** — 전국 매장의 공간 신호(동선·체류·진열·이상)를 익명으로.
> ② **찾습니다** — 잘되는 매장의 패턴을, 당신 체인 데이터 안에서.
> ③ **맞춥니다** — 그 패턴을 당신의 브랜드 표준으로 번역해 전 매장에.
> (연결) 이 세 단계를 도는 엔진이 아래 **Golden Case 5단계**입니다. ↓

## 5. CTA & 리드 파이프라인 (미팅 예약 → 제안 요청 + 알림/CRM)

**CTA (예약 위젯 보류 — 현재 구현 부담)**
- **Primary — "맞춤 제안 요청"** → `/contact?type=enterprise` 폼.
- **Secondary — "이메일 문의"** → `mailto:`(담당 주소). 폼 대신 바로 메일 쓰는 리드용.
- 미팅은 폼/메일 접수 후 담당자가 조율(현행 "영업일 1–2일 내 연락" 유지). 예약 위젯은 백로그(§9-6).

**현행 파이프라인 — 이미 구현됨 (`src/app/api/contact/route.ts`)**
- 폼 제출 → zod 검증 → **Slack Incoming Webhook 알림**(`SLACK_WEBHOOK_URL`, server-only).
- 스키마 필드 **이미 존재**: `name · contact · storeCount · affiliationType · brandName · product · plan · inquiryType · message`. → 본사용 필드(매장수·소속·브랜드·문의유형)가 이미 다 있음 — **라벨·노출만 enterprise 맥락으로.**
- rate limit(IP)·에러 처리 완비. **단, 저장 없음(Slack 발사 후 소실)·CRM 없음.**
- ✅ **Slack 알림은 Vercel에 `SLACK_WEBHOOK_URL`만 넣으면 즉시 동작.**

**고도화 (이 스펙의 개발 항목)**
1. **소스 태깅** — `contactSchema`에 `source`(enterprise·pricing·general) 추가 → Slack·저장·CRM에 태그. 랜딩/enterprise/pricing 리드 구분·라우팅.
2. **Slack 강화** — enterprise 리드는 `🏢 [ENTERPRISE]` 프리픽스 + storeCount·brand 강조. (선택) 전용 채널용 별도 웹훅.
3. **리드 저장(CSV/시트) · 신규** — 서버리스라 파일 CSV는 비영속. 옵션:
   - (a) **Google Sheets append (추천)** — 팀이 CSV처럼 열람·내보내기. Sheets API + 서비스계정 키(env).
   - (b) DB(Vercel Postgres/KV) — 쿼리·대시보드 유리하나 셋업 큼.
   - (c) 이메일 다이제스트 — 최소 구현.
4. **HubSpot 연동 · 신규** — 제출 시 컨택트 업서트(+딜):
   - (a) **HubSpot Forms API (단순)** — 제출을 HubSpot 폼으로 포워딩, 매핑 최소.
   - (b) Contacts/Deals API 업서트 — 파이프라인·스코어링까지. `HUBSPOT_TOKEN` env.
   - `route.ts`에서 Slack→Sheets→HubSpot **개별 try/catch**(하나 실패해도 리드 유실·응답 지연 없게), 실패는 서버 로그.
5. **정합** — `/api/newsletter`도 같은 `sendSlackNotification`(`api-utils`) 사용 → 파이프라인 유틸을 공용 확장하면 contact·newsletter·enterprise 일관. 폼 UI는 `ContactFormPage.tsx` 재사용.

**배치:** 히어로·마지막 CTA 두 곳에 Primary(제안 요청)+Secondary(이메일). 중간 섹션 CTA는 1개.

## 6. 자산 재활용 / 신설 매핑

| 섹션 | 처리 | 파일 |
|---|---|---|
| 히어로 | 카피 교체 + CTA 2트랙 | `EnterpriseView.tsx` |
| 신뢰 띠 | 신설(로고+칩) | 신규 소섹션 · `contact.yaml` 브랜드 |
| 통증 | 카피 재구성(근본=못 읽음) | `EnterpriseView.tsx` challenges |
| 스파인(맞춤) | **신설** | 신규 섹션 |
| Golden Case | 유지 + "맞춤 엔진" 연결 문구 | 현행 |
| 대시보드 | 유지 · 라벨 `Live Dashboard`→`본사 대시보드`(정적) | 현행 목업 |
| MasterPair | 유지 | `MasterPair.tsx` |
| 프로세스 | 유지 | 현행 |
| 반론 FAQ | 신설(공용 FAQ 컴포넌트 재사용 — feedback #8) | `FAQSection.tsx` |
| CTA + 리드 파이프라인 | 신설·강화 | `EnterpriseView.tsx` · `api/contact/route.ts` · `lib/api-utils` |

## 7. 정합·수정 이슈

1. **효과치 단일매장 톤** — `contact.yaml` "예상 효과 = 야간 인건비 월 80만원 절감"은 개별 매장 프레임. 본사 맥락으로 교체(예: "파일럿 매장 편차 −X% · 표준 적용률 +Y%", 예시·자사 시뮬레이션 표기). → **실측/시뮬레이션 수치 확보 필요.**
2. **"Live Dashboard" 라벨** — 정적 목업이므로 `본사 대시보드`로(랜딩·agent의 'Live' 뱃지 정리와 함께).
3. **카테고리 표기** — 히어로 eyebrow에 `익명화 공간 AI` 노출(SEO/AEO 정합).
4. **CTA 목적지** — `/contact?type=enterprise` 유지, 폼 필드만 개편(§5-B).

## 8. 랜딩 ↔ enterprise 역할 분담 (중복 제거)

- **랜딩 본사 섹션** = 티저 1개("가장 잘되는 매장을, 전국 표준으로" + CTA) → `/enterprise`.
- **/enterprise** = 풀 피치(통증→맞춤 약속→Golden Case→대시보드→프로세스→2트랙 CTA).
- Golden Case·benefits는 **enterprise 전용**(랜딩엔 요약도 두지 않음).

## 9. 열린 결정

1. **리드 저장 방식** — Google Sheets append(추천) vs DB(Vercel Postgres/KV) vs 이메일 다이제스트.
2. **HubSpot 연동 범위** — Forms API(단순) vs Contacts/Deals 업서트(파이프라인·스코어링). 포털·토큰 확보.
3. **히어로 H1** — 스파인 약속형(추천) vs 편차·복제형(랜딩 티저와 라임).
4. **효과 수치** — 본사 맥락 실측/시뮬레이션 확보(§7-1).
5. **FAQ 항목** — 개인정보·하드웨어·파일럿 비용·기간·계약 중 우선순위.
6. **미팅 예약 위젯** — 백로그(향후 Calendly/자체 슬롯 재검토).

---

*연계: `랜딩_전환재정렬_v2.md`(그라운딩·본사 섹션 티저) · `company_about_흐름대비_개선계획_v3.md`(MasterPair 이관) · brand-copywriting(오길비 위계) · 현행 `EnterpriseView.tsx`·`contact.yaml`·`MasterPair.tsx`.*
