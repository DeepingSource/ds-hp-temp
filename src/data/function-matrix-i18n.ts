import type { Locale } from '@/lib/i18n';
import type { FunctionKey, ModeKey } from '@/lib/brand-canon';

/**
 * function-matrix-i18n — surface copy for the Function × Mode Matrix v1.0.
 *
 * SOT: brand-system/01_brand_system/SAAI_Function_Mode_Matrix_v1.0.md (🟢 확정 2026-07-20)
 * The KO strings here are LIFTED from that document verbatim — brand-canon.ts holds
 * the same KO text as the code mirror, and `npm run test` guards the two against drift.
 *
 * ⚠️ EN/JP ARE DRAFT RENDERINGS (reorg Phase 4 · 2026-07-20) — 검수 대기.
 * The SOT is Korean-only. These are functional descriptions, not brand copy, so they
 * were rendered rather than invented; still, they have NOT been through a copy round.
 * Do not lift EN/JP from here into decks, ads, or the brand book until reviewed.
 *
 * THE MODEL: products are three modes; functions cross all three. `count` is a
 * function, not a fourth product — see brand-canon `MODES` / `FUNCTION_MODE_MATRIX`.
 */

/** Mode column headers. */
export const MODE_COPY: Record<Locale, Record<ModeKey, { name: string; mode: string; tense: string; question: string }>> = {
  ko: {
    care:    { name: 'saai care',    mode: '탐지·감지',  tense: '지금', question: '지금 무슨 일이 일어나는가' },
    insight: { name: 'saai insight', mode: '분석',      tense: '어제', question: '어제까지 무엇이 있었나' },
    agent:   { name: 'saai agent',   mode: '제안·운영',  tense: '다음', question: '다음에 무엇을 할까' },
  },
  en: {
    care:    { name: 'saai care',    mode: 'Detect',   tense: 'Now',       question: 'What is happening right now?' },
    insight: { name: 'saai insight', mode: 'Analyze',  tense: 'Yesterday', question: 'What has been happening until yesterday?' },
    agent:   { name: 'saai agent',   mode: 'Act',      tense: 'Next',      question: 'What should we do next?' },
  },
  jp: {
    care:    { name: 'saai care',    mode: '検知',      tense: '今',   question: '今、何が起きているか' },
    insight: { name: 'saai insight', mode: '分析',      tense: '昨日', question: '昨日まで何があったか' },
    agent:   { name: 'saai agent',   mode: '提案・運営', tense: '次',   question: '次に何をするか' },
  },
};

/** Function name + one-line definition. The name itself is locale-invariant (lowercase verb). */
export const FUNCTION_COPY: Record<Locale, Record<FunctionKey, string>> = {
  ko: {
    count: '유입·재실', queue: '대기·혼잡', pop: '판촉물(POP)', fit: '트렌드 적합',
  },
  en: {
    count: 'Footfall & occupancy', queue: 'Queues & crowding', pop: 'In-store promotion (POP)', fit: 'Trend fit',
  },
  jp: {
    count: '来店・滞在人数', queue: '待ち・混雑', pop: '販促物(POP)', fit: 'トレンド適合',
  },
};

/** The 12 cells per locale (4 functions × 3 modes). KO = SOT verbatim; EN/JP = draft. */
export const MATRIX_COPY: Record<Locale, Record<FunctionKey, Record<ModeKey, string>>> = {
  ko: {
    count:  { care: '지금 재실 인원·혼잡도 감지, 임계 초과 알림', insight: '일·주·월 방문 시계열, 요일·시간대·전년 대비 추세', agent: '방문 예측 기반 인력 배치·영업시간·프로모션 타이밍 제안' },
    queue:  { care: '대기열·혼잡 임계 초과 실시간 알림', insight: '대기시간 피크·혼잡 주기 분석', agent: '인력 재배치·카운터 증설·셀프 유도 제안' },
    pop:    { care: '게시된 POP 노출·훼손 상태 감지', insight: 'POP별 주목·전환 효과 분석', agent: 'POP 문구·위치·교체 주기 제안·생성' },
    fit:    { care: '신상품 초기 반응 이상 감지', insight: '상품·매장의 트렌드 적합도 분석', agent: '발주·상품 구성·바이어 의사결정 제안' },
  },
  en: {
    count:  { care: 'Live occupancy and crowding, with alerts when a threshold is crossed', insight: 'Daily, weekly and monthly footfall trends by weekday, hour and year over year', agent: 'Staffing, opening hours and promotion timing proposed from forecast demand' },
    queue:  { care: 'Real-time alert when a queue or crowding crosses its threshold', insight: 'Waiting-time peaks and crowding cycles', agent: 'Staff reallocation, extra counters or self-checkout routing proposed' },
    pop:    { care: 'Whether posted POP is visible and intact', insight: 'Attention and conversion effect per POP', agent: 'POP wording, placement and refresh cadence proposed and generated' },
    fit:    { care: 'Early warning when a new product reacts unexpectedly', insight: 'How well products and stores fit the trend', agent: 'Ordering, assortment and buyer decisions supported' },
  },
  jp: {
    count:  { care: '今の滞在人数・混雑度を検知し、閾値超過を通知', insight: '日・週・月の来店時系列、曜日・時間帯・前年比の推移', agent: '来店予測に基づく人員配置・営業時間・販促タイミングの提案' },
    queue:  { care: '待機列・混雑の閾値超過をリアルタイム通知', insight: '待ち時間のピーク・混雑周期を分析', agent: '人員再配置・レジ増設・セルフ誘導の提案' },
    pop:    { care: '掲出中のPOPの露出・破損状態を検知', insight: 'POP別の注目・転換効果を分析', agent: 'POP文言・位置・交換サイクルの提案・生成' },
    fit:    { care: '新商品の初期反応の異常を検知', insight: '商品・店舗のトレンド適合度を分析', agent: '発注・商品構成・バイヤーの意思決定を支援' },
  },
};

/** Page-level copy for /products/functions. */
export const FUNCTIONS_PAGE_COPY: Record<Locale, {
  eyebrow: string; title: string; sub: string;
  readingTitle: string; reading: string;
  extensionTitle: string; extension: string; promoted: string;
  countNote: string; cta: string;
  modeHeading: string; modeSub: string;
}> = {
  ko: {
    eyebrow: '기능 라이브러리',
    title: '기능은 3모드를 가로지릅니다',
    sub: '기능은 한 제품에 속하지 않습니다. foot fall이 count가 되면, count는 care·insight·agent 셋 모두에서 쓰입니다.',
    readingTitle: '읽는 법',
    reading: '“count 하나가 care로는 실시간 감지, insight로는 추세 분석, agent로는 운영 제안이 된다.” 한 칸은 이렇게 읽습니다 — saai care가 store count를 돌린다.',
    extensionTitle: '확장은 행 하나',
    extension: '새 기능이 들어오면 행 하나만 추가하면 됩니다. 세 모드 경험이 자동으로 생기고, 새 제품도 새 이름도 필요 없습니다.',
    promoted: '예외가 하나 — 시선·주목은 사이니지·전시물이라는 별도 영역이라, 행이 아니라 독립 제품으로 승격했습니다.',
    countNote: 'count는 기능입니다 — 네 번째 제품이 아닙니다.',
    cta: '자세히 보기',
    modeHeading: '세로 — 세 개의 모드',
    modeSub: '제품은 세 개의 모드입니다. 같은 기능을 어떤 시간축·목적으로 통과시키는가가 제품을 가릅니다.',
  },
  en: {
    eyebrow: 'Function library',
    title: 'Functions cross all three modes',
    sub: 'A function does not belong to one product. Once foot fall becomes count, count is used by care, insight and agent alike.',
    readingTitle: 'How to read it',
    reading: '“One count becomes live detection in care, trend analysis in insight, and an operating proposal in agent.” A single cell reads: saai care runs store count.',
    extensionTitle: 'Extension is one row',
    extension: 'A new capability adds one row — and three product experiences appear with it. No new product, no new name.',
    promoted: 'One exception — attention (gaze) covers the distinct domain of signage and displays, so it graduated from a row to a standalone product.',
    countNote: 'count is a function — not a fourth product.',
    cta: 'See details',
    modeHeading: 'Down the side — the three modes',
    modeSub: 'The products are three modes. What separates them is the time axis and purpose you push the same function through.',
  },
  jp: {
    eyebrow: '機能ライブラリ',
    title: '機能は3つのモードを横断します',
    sub: '機能は一つの製品に属しません。foot fall が count になれば、count は care・insight・agent のすべてで使われます。',
    readingTitle: '読み方',
    reading: '「一つの count が、care ではリアルタイム検知に、insight では推移分析に、agent では運営提案になる」。一つのマスはこう読みます — saai care が store count を回す。',
    extensionTitle: '拡張は一行',
    extension: '新しい機能は一行を足すだけ。3つのモードの体験が自動で生まれ、新しい製品も新しい名前も要りません。',
    promoted: '例外が一つ — 注目（視線）はサイネージ・展示物という別領域のため、行ではなく独立製品に昇格しました。',
    countNote: 'count は機能です — 4番目の製品ではありません。',
    cta: '詳しく見る',
    modeHeading: '縦軸 — 3つのモード',
    modeSub: '製品は3つのモードです。同じ機能をどの時間軸・目的で通すかが製品を分けます。',
  },
};
