import { type Locale } from './i18n';

/**
 * brand-canon.ts — single source for brand copy lifted from the brand-system SOT.
 *
 * SOT: SAAI_AI_Handoff.md
 *      — Function_Mode_Matrix_v1.0 (제품=3모드 · 기능=가로축 12 — 정렬 중심)
 *      — Voice_v2.5 (messaging spine · two master copies)
 *      — Architecture_v4 (SEED·SOURCE·SOLUTION)
 *      — Copy_Decision_v1 (두 마스터)
 *
 * MODEL (Function × Mode Matrix v1.0 · 2026-07-20): the products are exactly three
 * modes — care(탐지·감지) · insight(분석) · agent(제안·운영). Capabilities such as
 * `count` are FUNCTIONS that cross all three; `count` is not a fourth product.
 * See `MODES`, `FunctionKey`, `FUNCTION_MODE_MATRIX` below.
 *
 * RULE: do not invent copy here — only lift from the SOT. The two master copies
 * (모든 공간을, 완벽하게 / 우리 매장이 대표 매장처럼) live in i18n.ts homeCopy;
 * this file holds the *texture* lines the site was missing.
 *
 * NOTE (jp): the SOT copy spine is ko/en authoritative. Japanese renderings below
 * are FINALIZED (2026-05-29).
 *
 * WORDMARK RULE (2026-07-14): the brand wordmark is written **DEEPINGSOURCE**
 * (all-caps, matching the header logo) wherever it appears as a brand/title
 * reference — page titles, OG/twitter titles, badges, headings. Exceptions kept
 * as mixed-case "DeepingSource": (1) the legal entity name in structured data
 * (JSON-LD name/legalName), (2) the etymology line "DeepingSource = Deep Learning
 * + Source" where the mixed case carries the wordplay. Use COMPANY_WORDMARK below
 * rather than hardcoding the string.
 */
/** Canonical brand wordmark for display (all-caps, matches the header logo). */
export const COMPANY_WORDMARK = 'DEEPINGSOURCE';

/**
 * 시그니처 — 마스터 카피를 받치는 카테고리 정의 (SAAI_AI_Handoff.md · Voice_v2.5).
 */
export const signature: Record<Locale, string> = {
  ko: '보는 AI를 넘어, 매장을 운영하는 AI.',
  en: 'Beyond seeing — AI that operates space.',
  jp: '見るAIを超え、空間を運営するAI。',
};

/**
 * Brand signature (5자) — SAAI_AI_Handoff.md · A2.
 *
 * ⚠️ WEAVING RETIRED (Naming Grammar v1.5 결정 18 · Architecture v4.0 §0-3):
 * the Weaving 카피 서사 and the Seam·Thread·Knot·Weave engine names are retired,
 * and the clover carries no assigned meaning (pure visual identifier now).
 * The KO signature 「사이를 메웁니다」 SURVIVES — v4.0 keeps it explicitly.
 *
 * What still leans on the retired frame, and is NOT fixed here:
 *   • the export name `seam` (renaming breaks consumers — reorg Phase 4)
 *   • the EN rendering "We weave the in-between" / JP 「間を紡ぐ」
 * This file's rule is to LIFT copy from the SOT, never invent it — so replacement
 * EN/JP signatures must come from a copy round, not from this edit.
 * Tracked as an open issue in brand-system `_current/INDEX.md`.
 */
export const seam: Record<Locale, string> = {
  ko: '사이를 메웁니다.',
  en: 'We weave the in-between.',
  jp: '間を紡ぐ。',
};

/**
 * Perfect Space — the two-level promise (launch film 00:0 / 09:5).
 * your = SAAI(당신의 공간) · every = DeepingSource(모든 공간).
 */
export const perfectSpace: { your: Record<Locale, string>; every: Record<Locale, string> } = {
  your: { ko: '당신의 공간을, 완벽하게', en: 'Perfect your space.', jp: 'あなたの空間を、完璧に。' },
  every: { ko: '모든 공간을, 완벽하게', en: 'Perfect every space.', jp: 'すべての空間を、完璧に。' },
};

/** Category definition — the recurring thesis. */
export const categoryLine: Record<Locale, string> = {
  ko: '이미 달린 CCTV 위에서, 누구가 아니라 무엇을 어떻게. 익명으로 관찰하고, 분석하고, 제안하고, 학습하는 AI.',
  en: 'On the CCTV you already have — not who, but what and how. AI that observes, analyzes, suggests, and learns, anonymously.',
  jp: 'すでにあるCCTVの上で、誰かではなく、何をどう。匿名で観察し、分析し、提案し、学習するAI。',
};

/**
 * Category keyword (SEO/AEO SOT) — the traffic-hub keyword, spelled identically on
 * every surface so search/answer engines resolve ONE entity. Use this for headings,
 * eyebrows, meta, and JSON-LD; free prose may lowercase ("offline spatial AI") where
 * grammar calls for it.
 *
 * ROLE SEPARATION (naming reorg §14/§15 · AEO plan P1-2/1-3):
 *   • categoryKeyword ("Anonymized Spatial AI / 익명화 공간 AI / 匿名化空間AI") = the
 *     CATEGORY we sell — the searchable term. Front-load it in Title/H1–H2/first paragraph.
 *   • SAAI = the UMBRELLA BRAND (Spatial·Anonymized·Agentic·Intelligence — see
 *     `saaiPromiseLayer`). A brand, not a search term.
 *   • `saai {insight·care·agent}` / `store {…}` = PRODUCT names (see `productNaming`):
 *     saai = primary value brand, store = domain implementation. Not category keywords.
 */
export const categoryKeyword: Record<Locale, string> = {
  ko: '익명화 공간 AI',
  en: 'Anonymized Spatial AI',
  jp: '匿名化空間AI',
};

/**
 * Operating loop — Analyze · Detect · Act · Learn (제품체계_saai_suite_재설계_v1 §3).
 * Replaces the retired 3-step Read·Alert·Act. phase = the time axis, read 어제→지금→다음→다시.
 *
 * LOOP ↔ MODE (제품체계 재설계 v1 §3 표준 — 2026-07-21):
 *   분석/Analyze → saai insight · 어제 (분석 — "어제까지 무엇이 있었나")
 *   감지/Detect  → saai care    · 지금 (탐지·감지 — "지금 무슨 일이 일어나는가")
 *   실행/Act     → saai agent   · 다음 (제안·실행 — "다음에 무엇을 할까", 권고는 AI·결정은 사람)
 *   학습/Learn   → (모드 없음)  · 다시 (루프 복귀 — 결과가 다음 분석의 입력이 된다)
 *
 * The loop is the *time story*; the three modes are the *products* that live on it.
 * The fourth step has no product — learning is what closes the loop, not a thing to sell.
 *
 * ⚠️ RELABELED 2026-07-21 (제품체계 재설계 v1 §3·§6): care Observe→**Detect**,
 * agent Suggest→**Act** — the labels now agree with the landing STAGE_LABEL and the
 * suite standard. OBSERVE no longer belongs to care; it moves to `store count`, the
 * SOURCE entry tool (유입을 세는 첫 걸음 → insight). Order is temporal: insight·care·agent·learn.
 * `mode` is the machine-readable link — see `MODES` / `FUNCTION_MODE_MATRIX` below.
 */
export const operatingLoop: Record<Locale, { label: string; phase: string; mode: ModeKey | null }[]> = {
  ko: [
    { label: '분석', phase: '어제', mode: 'insight' },
    { label: '감지', phase: '지금', mode: 'care' },
    { label: '실행', phase: '다음', mode: 'agent' },
    { label: '학습', phase: '다시', mode: null },
  ],
  en: [
    { label: 'Analyze', phase: 'Yesterday', mode: 'insight' },
    { label: 'Detect', phase: 'Now', mode: 'care' },
    { label: 'Act', phase: 'Next', mode: 'agent' },
    { label: 'Learn', phase: 'Again', mode: null },
  ],
  jp: [
    { label: '分析', phase: '昨日', mode: 'insight' },
    { label: '検知', phase: '今', mode: 'care' },
    { label: '実行', phase: '次', mode: 'agent' },
    { label: '学習', phase: '再び', mode: null },
  ],
};

/**
 * 약속 층 — SAAI 네 기둥 (제품 라인업 재정비안 §4·§8). Spatial·Anonymized·Agentic·
 * Intelligence = 우산 브랜드 SAAI의 네 글자 = 모든 제품이 딛는 공통 토대(무순서 병렬,
 * 운영 루프와는 성격이 다른 "자산 지도"). 각 기둥은 이를 증명하는 tech(SEED) 페이지로
 * 연결된다(§13). anonymized-first: 익명화가 "먼저 서는 자리"임을 sub에 명시(§4.1).
 * SIGN-OFF STATUS (rechecked 2026-07-20 · reorg Phase 3): 🟡 STILL PENDING.
 * 카피는 재정비안 §8 초안이고 브랜드 카운슬 사인오프가 아직 없다. 풀어쓰기 표기(§9-1)도
 * 미확정이라 선형 "Spatial Anonymized Agentic Intelligence"는 노출하지 않고 4-up으로만
 * 스펠아웃한다. jp = KO/EN 기준 렌더(검수 대상).
 *
 * This layer is orthogonal to the Function × Mode Matrix: the four pillars are the
 * shared FOUNDATION every product stands on (무순서 병렬 자산 지도), while the matrix
 * describes what the three modes DO. Do not present the pillars as a product list or
 * as loop stages — see `MODES` / `FUNCTION_MODE_MATRIX` for those.
 */
export type SaaiPillar = {
  key: 'spatial' | 'anonymized' | 'agentic' | 'intelligence';
  letter: string;
  label: string;
  promise: string;
  tech: string;
};

export const saaiPromiseLayer: Record<Locale, {
  eyebrow: string;
  heading: string;
  sub: string;
  pillars: SaaiPillar[];
  bridge: string;
}> = {
  ko: {
    eyebrow: 'SAAI',
    heading: '네 글자에 담은 약속',
    sub: '익명화 공간 AI — 모든 것은 익명화에서 시작합니다.',
    pillars: [
      { key: 'spatial', letter: 'S', label: 'Spatial', promise: '공간을 읽습니다. POS 너머 흐름까지.', tech: '/technology/spatial-ai' },
      { key: 'anonymized', letter: 'A', label: 'Anonymized', promise: '누구인지 남기지 않습니다. 모든 것의 시작.', tech: '/technology/seal' },
      { key: 'agentic', letter: 'A', label: 'Agentic', promise: '무엇을 바꿀지 짚어줍니다. 결정은 사람이.', tech: '/technology/models' },
      { key: 'intelligence', letter: 'I', label: 'Intelligence', promise: '쓸수록 정확해집니다. 매장에 맞춰 학습하며.', tech: '/technology' },
    ],
    bridge: '네 개의 근거가, 하나의 루프로 돌아갑니다.',
  },
  en: {
    eyebrow: 'SAAI',
    heading: 'Four letters, one promise',
    sub: 'Anonymized Spatial AI — everything begins on anonymization.',
    pillars: [
      { key: 'spatial', letter: 'S', label: 'Spatial', promise: 'Reads the space, beyond the POS.', tech: '/technology/spatial-ai' },
      { key: 'anonymized', letter: 'A', label: 'Anonymized', promise: 'Leaves no one identifiable. Where everything begins.', tech: '/technology/seal' },
      { key: 'agentic', letter: 'A', label: 'Agentic', promise: 'Points to what to change. People decide.', tech: '/technology/models' },
      { key: 'intelligence', letter: 'I', label: 'Intelligence', promise: 'Gets sharper the more you use it.', tech: '/technology' },
    ],
    bridge: 'Four foundations, one loop.',
  },
  jp: {
    eyebrow: 'SAAI',
    heading: '四文字に込めた約束',
    sub: '匿名化空間AI — すべては匿名化の上から始まります。',
    pillars: [
      { key: 'spatial', letter: 'S', label: 'Spatial', promise: '空間を読みます。POSの先の流れまで。', tech: '/technology/spatial-ai' },
      { key: 'anonymized', letter: 'A', label: 'Anonymized', promise: '誰かを残しません。すべての始まり。', tech: '/technology/seal' },
      { key: 'agentic', letter: 'A', label: 'Agentic', promise: '何を変えるかを示します。決めるのは人。', tech: '/technology/models' },
      { key: 'intelligence', letter: 'I', label: 'Intelligence', promise: '使うほど正確になります。店舗に合わせて学習し。', tech: '/technology' },
    ],
    bridge: '四つの根拠が、ひとつのループへ。',
  },
};

/** 회사 한 줄 — 창업 서사 (SAAI_AI_Handoff.md · Copy_Decision_v1 회사 한 줄). */
export const companyLine: Record<Locale, string> = {
  ko: '2018년부터 영상의 익명화를 깎아 온 회사.',
  en: 'Honing video anonymization since 2018.',
  jp: '2018年から、映像の匿名化を磨いてきた会社。',
};

/** 이름 유래 — DeepingSource = Deep Learning + Source (Architecture §1 Layer 0). */
export const nameOrigin: Record<Locale, string> = {
  ko: 'DeepingSource = Deep Learning + Source — 깊은 학습과 source code 위에 선 회사.',
  en: 'DeepingSource = Deep Learning + Source — built on deep learning and source code.',
  jp: 'DeepingSource = Deep Learning + Source — 深い学習とソースコードの上に立つ会社。',
};

/**
 * 3 SOLUTION 시간축 태그라인 — read·alert·act (SAAI_AI_Handoff.md · Copy_Decision_v1).
 * store insight 어제를 읽다 / store care 지금을 알리다 / store agent 다음을 실행하다.
 */
export const solutionTaglines: Record<'insight' | 'care' | 'agent', Record<Locale, string>> = {
  insight: { ko: '어제를 읽다', en: 'Reads yesterday', jp: '昨日を読む' },
  care: { ko: '지금을 알리다', en: 'Flags the now', jp: '今を知らせる' },
  agent: { ko: '다음을 실행하다', en: 'Acts on next', jp: '次を動かす' },
};

/**
 * Glanceable function-category label per product — so a cold visitor knows the
 * category in one glance (benchmark gap vs competitors). Privacy-safe framing:
 * store care = anomaly detection, NOT "safety/surveillance".
 */
export const productFunction: Record<'insight' | 'care' | 'agent', Record<Locale, string>> = {
  insight: { ko: '공간 분석 AI', en: 'Spatial Analytics AI', jp: '空間分析AI' },
  care: { ko: '이상 감지 AI', en: 'Anomaly Detection AI', jp: '異常検知AI' },
  agent: { ko: '운영 제안 AI', en: 'Operations Copilot AI', jp: '運営提案AI' },
};

/**
 * Product naming — single source for how the four products are named on the surface
 * (naming reorg §14/§15, option B). `saai` = value brand = the PRIMARY public label;
 * `store` = domain implementation (the URL slug's name) = the secondary.
 * 2026-07-16 결정: saai 전면 확정 — count 포함 (콘텐츠_수정확장_실행계획 §7 #2;
 * §12.B의 "count = SOURCE 도구라 store 유지"는 이 결정으로 대체).
 * Names are locale-invariant (lowercase). URLs are /products/saai-* (P1-3);
 * the old /products/store-* paths 301-redirect to them (see next.config.ts).
 */
/**
 * SURFACE KEY — the four page/route surfaces the site currently ships.
 *
 * ⚠️ `count` is in this union because it OWNS A PAGE (/products/saai-count),
 * NOT because it is a product. Under Function × Mode Matrix v1.0 the products are
 * exactly three modes (`ModeKey`) and `count` is one of four functions
 * (`FunctionKey`) that cross all three. Do not read this type as "the product list".
 *
 * @deprecated as a *product* type. For product logic use `ModeKey`; for capability
 * logic use `FunctionKey`. This alias stays so existing surfaces keep compiling
 * while the page information architecture is reworked (reorg Phase 4).
 */
export type ProductKey = 'count' | 'insight' | 'care' | 'agent';
export const productNaming: Record<ProductKey, { store: string; saai?: string }> = {
  count: { store: 'store count' },
  insight: { store: 'store insight', saai: 'saai insight' },
  care: { store: 'store care', saai: 'saai care' },
  agent: { store: 'store agent', saai: 'saai agent' },
};
/** Primary public label — the value brand where it exists, else the store name. */
export const productPrimary = (k: ProductKey): string => productNaming[k].saai ?? productNaming[k].store;
/** Secondary (store) label — null when the primary already IS the store name. */
export const productSecondary = (k: ProductKey): string | null =>
  productNaming[k].saai ? productNaming[k].store : null;

/* ────────────────────────────────────────────────────────────────────────────
 * FUNCTION × MODE MATRIX v1.0 — the code mirror of the brand SOT.
 *
 * SOT: brand-system/01_brand_system/SAAI_Function_Mode_Matrix_v1.0.md (🟢 확정 2026-07-20)
 *
 * THE MODEL IN ONE LINE:
 *   제품은 세 개의 모드다 (care · insight · agent).
 *   기능은 그 위를 가로지르는 도구다 — 한 제품에 속하지 않는다.
 *
 * This inverts the earlier model ("each tool has one home product"). A function is a
 * neutral verb; a mode is the time axis and purpose you push it through. So
 * `count` is not a fourth product — it is one row that all three modes read.
 *
 * EXTENSION RULE: a new capability adds ONE ROW and three mode experiences appear
 * for free. No new product, no new name (Naming Grammar 확장 문법과 정합).
 *
 * NAMING: functions are lowercase verbs, spaced when prefixed — `store count`.
 * One cell reads: "saai care가 store count를 돌린다".
 * ──────────────────────────────────────────────────────────────────────────── */

/** The three products. These — and only these — are products. */
export type ModeKey = 'care' | 'insight' | 'agent';

/** Mode definitions — matrix §1 (제품 · 고정). */
export const MODES: Record<ModeKey, {
  /** Public label, lowercase (naming reorg). */
  name: string;
  /** 모드 — what this product does to a function. */
  mode: string;
  /** The question this mode answers. */
  question: string;
  /** Time axis. */
  tense: string;
  /** What it hands the operator. */
  output: string;
}> = {
  care:    { name: 'saai care',    mode: '탐지·감지',  question: '지금 무슨 일이 일어나는가',  tense: '지금', output: '실시간 감지 · 알림' },
  insight: { name: 'saai insight', mode: '분석',      question: '어제까지 무엇이 있었나',    tense: '과거', output: '시계열 · 패턴 · 가설' },
  agent:   { name: 'saai agent',   mode: '제안·운영',  question: '다음에 무엇을 할까',       tense: '미래', output: '우선순위 · 실행 제안' },
};

/**
 * Mode order — care(감지) → insight(분석) → agent(제안·운영).
 * The signal starts on the left; each step moves closer to a human decision.
 * 결정과 책임은 사람의 자리 — agent는 제안까지, 실행 결정은 사람.
 */
export const MODE_ORDER: readonly ModeKey[] = ['care', 'insight', 'agent'] as const;

/** The four library capabilities (기능페이지 작업문서 v1 §0). */
export type FunctionKey = 'count' | 'queue' | 'pop' | 'fit';

/** Matrix row order — matches the SOT document (기능페이지 작업문서 v1 §0). */
export const FUNCTION_ORDER: readonly FunctionKey[] = [
  'count', 'queue', 'pop', 'fit',
] as const;

/**
 * Function inventory — the library that crosses all three modes (기능페이지 작업문서 v1 §0).
 * Reduced 2026-07-21 to four: count · queue(대기+혼잡) · pop · fit. Reassigned rows —
 * gaze→saai ads insight, keep·shelf→store care 감지 항목, trail·census→기술, talk→숨김 —
 * no longer live in the matrix.
 */
export const FUNCTIONS: Record<FunctionKey, { label: string; note?: string }> = {
  count: { label: '유입·재실' },
  queue: { label: '대기·혼잡' },
  pop:   { label: '판촉물(POP)' },
  fit:   { label: '트렌드 적합' },
};

/**
 * The 12 cells (4 functions × 3 modes) — every cell is filled: each function has a
 * real job in every mode. queue merges the old wait + tide (대기 + 혼잡).
 */
export const FUNCTION_MODE_MATRIX: Record<FunctionKey, Record<ModeKey, string>> = {
  count: {
    care:    '지금 재실 인원·혼잡도 감지, 임계 초과 알림',
    insight: '일·주·월 방문 시계열, 요일·시간대·전년 대비 추세',
    agent:   '방문 예측 기반 인력 배치·영업시간·프로모션 타이밍 제안',
  },
  queue: {
    care:    '대기열·혼잡 임계 초과 실시간 알림',
    insight: '대기시간 피크·혼잡 주기 분석',
    agent:   '인력 재배치·카운터 증설·셀프 유도 제안',
  },
  pop: {
    care:    '게시된 POP 노출·훼손 상태 감지',
    insight: 'POP별 주목·전환 효과 분석',
    agent:   'POP 문구·위치·교체 주기 제안·생성',
  },
  fit: {
    care:    '신상품 초기 반응 이상 감지',
    insight: '상품·매장의 트렌드 적합도 분석',
    agent:   '발주·상품 구성·바이어 의사결정 제안',
  },
};

/** One cell — "what does {mode} do with {fn}?" */
export const matrixCell = (fn: FunctionKey, mode: ModeKey): string => FUNCTION_MODE_MATRIX[fn][mode];

/** Function name as written on a surface — lowercase, spaced. `store count`. */
export const functionName = (fn: FunctionKey, prefix: 'store' | 'space' | 'saai' = 'store'): string =>
  `${prefix} ${fn}`;

/** One matrix cell as a sentence — "saai care가 store count를 돌린다". */
export const matrixSentence = (fn: FunctionKey, mode: ModeKey): string =>
  `${MODES[mode].name}가 ${functionName(fn)}를 돌린다`;

/**
 * 점주/SMB 척추 CTA (Master Copy Decision §7 · D4).
 * D4=(b): 본문 중립 CTA 유지, 점주 섹션에만 사용.
 */
export const ownerCta: Record<Locale, string> = {
  ko: '첫 달 무료로 받기',
  en: 'Start your first month free',
  jp: '初月無料で受け取る',
};

/**
 * SEAL 익명화 신뢰 헌장 (External Brand Brief v1.2 §6.2).
 * tagline = KR/EN authoritative (SOT). 3약속 line = SOT 그대로.
 * jp = 위 파일 규칙대로의 finalized 렌더링(검수 대상): 신원만 제거하는 익명화 결을 유지.
 */
export type SealPromise = { key: 'no-original' | 'no-human' | 'no-reid'; term: string; line: string };

export const sealCharter: Record<Locale, { tagline: string; promises: SealPromise[] }> = {
  ko: {
    tagline: '누구인지가 아니라, 무슨 일인지를 봅니다.',
    promises: [
      { key: 'no-original', term: '원본 미보존', line: '첫 단계에서 익명화. 원본은 시스템 어디에도 남지 않습니다.' },
      { key: 'no-human', term: '사람 미열람', line: '사람의 눈은 닿지 않습니다. 기계가 봅니다.' },
      { key: 'no-reid', term: '재식별 불가', line: '익명화된 데이터로부터 신원을 되찾을 수 없습니다.' },
    ],
  },
  en: {
    tagline: 'We see what is happening, not who is there.',
    promises: [
      { key: 'no-original', term: 'No original kept', line: 'Anonymized at the first step. The original is left nowhere in the system.' },
      { key: 'no-human', term: 'No human viewing', line: 'No human eye reaches it. The machine sees.' },
      { key: 'no-reid', term: 'No re-identification', line: 'Identity cannot be recovered from anonymized data.' },
    ],
  },
  jp: {
    tagline: '誰かではなく、何が起きているかを見ます。',
    promises: [
      { key: 'no-original', term: '原本を残さない', line: '最初の段階で匿名化。原本はシステムのどこにも残しません。' },
      { key: 'no-human', term: '人が見ない', line: '人の目は触れません。機械が見ます。' },
      { key: 'no-reid', term: '再識別できない', line: '匿名化されたデータから身元を復元できません。' },
    ],
  },
};

/**
 * Purpose 결구 (External Brand Brief v1.2 §4 Manifesto · §1 Purpose).
 * closing = 매니페스토 결구(선언형 하라 → 웹 밴드용 평서 결로 정리), statement = Purpose 한 줄.
 * KR/EN = SOT. jp = finalized 렌더링(검수 대상).
 */
export const purpose: Record<Locale, { closing: string; statement: string }> = {
  ko: {
    closing: '측정할 수 있으면, 나아질 수 있습니다.',
    statement: '온라인을 바꾼 그 힘으로 — 사람이 일하고, 사람이 사는 모든 공간을 다시 만듭니다.',
  },
  en: {
    closing: 'If you can measure it, you can improve it.',
    statement: 'The force that remade online — now for every space where people work and live.',
  },
  jp: {
    closing: '測定できれば、よくできます。',
    statement: 'オンラインを変えたその力で — 人が働き、人が暮らす、すべての空間を作り直します。',
  },
};
