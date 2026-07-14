# docs/ — 길잡이 (orientation)

> 📌 **2026-06-19 정리 · 2026-07-14 갱신.** 이 폴더는 **history 보존용 계획 산출물**과 **참조 스냅샷**, 그리고 **활성 운영 문서**(PHASE_C·KEYSTATIC_ENHANCEMENT·LAUNCH·ADMIN_TOOLING·STATUS)를 담는다. `_v1`/`_v2` 계획 산출물은 archive지만, 위 활성 문서는 현행이다 — **라이브 SOT 는 아래 "라이브 SOT" 절**, **작업 진행 상태는 [`STATUS.md`](./STATUS.md)**.
>
> 🚀 로컬 개발·빌드·**배포(Vercel/GitHub Pages)·환경변수**는 repo-root [`/README.md`](../README.md). 편집자용 가이드는 사이트 `/help` 또는 Keystatic 「편집 가이드」.

---

## 라이브 SOT (현행 기준 — 항상 여기를 먼저 본다)

| 영역 | 라이브 SOT |
|---|---|
| 디자인 | repo-root [`/DESIGN.md`](../DESIGN.md) + 라이브 `src/` |
| 보이스/카피 | `src/lib/brand-canon.ts` (현 보이스: **SAAI · Anonymized Spatial AI**, 마스터 카피 "모든 공간을, 완벽하게" — `SAAI_AI_Handoff.md` 기준. REINVENT OFFLINE/NEXTRISE는 **은퇴**) |
| 편집 가능 카피 | `content/site/*.yaml`(Keystatic 싱글톤) → `gen-site-content.mjs` → `src/data/generated/site-content.json` |
| 목업 데이터 | `src/data/mockup-scenarios/canonical.ts` (+ `src/data/storeagent-mock-i18n.ts`) + 라이브 `/demo` 갤러리 |
| 사이트 구현 | 라이브 `src/` 트리 |
| 작업 진행 상태 | [`STATUS.md`](./STATUS.md) (완료·잔여) |

## 활성 운영 문서 (현행 — archive 아님)

2026-06 이후의 운영·CMS·런치 문서. 진행 상태는 [`STATUS.md`](./STATUS.md)에 통합돼 있다.

- **[`STATUS.md`](./STATUS.md)** — 작업 스트림별 완료·잔여 (**여기부터 본다**)
- [`PHASE_C_github-mode-setup.md`](./PHASE_C_github-mode-setup.md) — Keystatic GitHub 모드 전환·env·검증
- [`KEYSTATIC_ENHANCEMENT_PLAN_v1.md`](./KEYSTATIC_ENHANCEMENT_PLAN_v1.md) — 편집자 루프·온보딩 고도화 (Week 1–3 완료)
- [`ADMIN_TOOLING_PLAN_v1.md`](./ADMIN_TOOLING_PLAN_v1.md) — 애널리틱스·페이지 카피 CMS화 로드맵
- [`LAUNCH_PLAN_v1.md`](./LAUNCH_PLAN_v1.md) — 런치 준비·리스크
- [`blog-keystatic-phase2-proposal.md`](./blog-keystatic-phase2-proposal.md) · [`blog-keystatic-spike-B-S-findings.md`](./blog-keystatic-spike-B-S-findings.md) — 블로그 컬렉션 제안·스파이크(GO)
- [`피드백-반영-계획-260714.md`](./피드백-반영-계획-260714.md) — 홈페이지 피드백 16항목/4배치 (배치 A·B 완료)
- [`AEO-SEO-개발계획-260714.md`](./AEO-SEO-개발계획-260714.md) — AEO/SEO 개선 (P0·P1-2/1-3·P2-1 완료 — STATUS §6)

---

## Authored docs — 계획 산출물 (history, **archive 로 취급**)

`*_v1` / `*_v2` 형태의 직접 작성 문서들. 2026-05-29 무렵 Phase 1–4 계획의 산출물이며, 사이트는 이 계획을 **지나 이미 출하**됐다. 참고·이력 용도로만 읽고, 결정의 근거로 삼지 않는다.

- 마스터 플랜 — `PLAN_v1.md`, `PLAN_v1.1.md`
- 브랜드/케이스/자산 — `BRAND_v2.md`, `CASE_STUDIES_v1.md`(DRAFT, `(가상)` 수치 포함), `ASSET_COLLECTION_v1.md`, `BRAND_REFLECTION_PLAN_v1.md`
- 디자인/코드 — `DESIGN_v2.md`, `CODE_v1.md`, `A11Y_AEO_SEO_PLAN_v1.md`
- 목업 체인 (append-only) — `MOCKUP_PROPOSALS_v1..v5.md`, `MOCKUP_REVIEW_v1.md`, `MOCKUP_REVIEW_v2.md`(최신)
- 감사 — `AUDIT_v1.md`(후속 없음 — historical)
- 카탈로그 — `INDEX.md`(Phase 1–4 계획 진입점, stale)

> 주의: `INDEX.md` 와 위 `_v1`/`_v2` 문서들이 서로를 "SOT" 로 표기하지만, 이는 **계획 당시의 SOT**다. 현행 기준은 위 "라이브 SOT" 절을 따른다.

## inventory/ — 참조 스냅샷 (**수정 금지 — do NOT edit**)

스크랩한 레퍼런스 스냅샷. 원본 외부 사이트의 캡처/인벤토리이며 손대지 않는다.

- `inventory/deepingsource.io/`, `inventory/storecare.ai/`, `inventory/saai.store/`, `inventory/local/`, `inventory/_raw/`
