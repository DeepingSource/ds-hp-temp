import type { Locale } from '@/lib/i18n';
import type { FunctionKey, ModeKey } from '@/lib/brand-canon';

/**
 * function-matrix-i18n — surface copy for the Function × Mode Matrix v1.0.
 *
 * SOT: brand-system/01_brand_system/SAAI_Function_Mode_Matrix_v1.0.md (🟢 확정 2026-07-20)
 * The KO strings here are LIFTED from that document verbatim — brand-canon.ts holds
 * the same KO text as the code mirror, and `npm run test` guards the two against drift.
 *
 * EN/JP: functional descriptions rendered from the Korean SOT and REVIEWED for accuracy
 * and cross-locale consistency (copy round 2026-07-21) — every cell checked against the
 * KO source, terms aligned to FUNCTION_COPY, and the fit·agent cells corrected to the
 * 제안/proposed model. These are safe for on-site use (not raw drafts). A final human
 * brand sign-off before lifting into decks/ads/the brand book is still recommended.
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
    count: '유동인구·유입 카운팅', queue: '대기열·혼잡도 분석', pop: '매장 POP·홍보물 효과', fit: '상품·트렌드 적합도',
  },
  en: {
    count: 'Footfall & occupancy', queue: 'Queues & crowding', pop: 'In-store promotion (POP)', fit: 'Trend fit',
  },
  jp: {
    count: '来店・滞在人数', queue: '待ち・混雑', pop: '販促物(POP)', fit: 'トレンド適合',
  },
};

/** The 12 cells per locale (4 functions × 3 modes). KO = SOT verbatim; EN/JP reviewed 2026-07-21. */
export const MATRIX_COPY: Record<Locale, Record<FunctionKey, Record<ModeKey, string>>> = {
  ko: {
    count:  { care: '지금 재실 인원·혼잡도 감지, 임계 초과 실시간 알림', insight: '일·주·월 방문 시계열, 요일·시간대·전년 대비 추세 분석', agent: '방문 예측 기반 인력 배치·영업시간·프로모션 타이밍 제안' },
    queue:  { care: '대기열 및 혼잡 임계 초과 시 실시간 알림', insight: '대기시간 피크 및 시간대별 혼잡 주기 분석', agent: '인력 재배치·카운터 증설·셀프 계산대 유도 제안' },
    pop:    { care: '게시된 POP 노출 및 훼손 상태 감지', insight: 'POP별 고객 주목도 및 구매 전환 효과 분석', agent: 'POP 문구·설치 위치·교체 주기 최적화 제안' },
    fit:    { care: '신상품 초기 반응 이상 및 주목도 감지', insight: '상품 및 매장별 트렌드 적합도 다각도 분석', agent: '발주량·상품 구성 및 바이어 의사결정 가이드 제안' },
  },
  en: {
    count:  { care: 'Live occupancy and crowding, with alerts when a threshold is crossed', insight: 'Daily, weekly and monthly footfall trends by weekday, hour and year over year', agent: 'Staffing, opening hours and promotion timing proposed from forecast demand' },
    queue:  { care: 'Real-time alert when a queue or crowding crosses its threshold', insight: 'Waiting-time peaks and crowding cycles', agent: 'Staff reallocation, extra counters or self-checkout routing proposed' },
    pop:    { care: 'Whether posted POP is visible and intact', insight: 'Attention and conversion effect per POP', agent: 'POP wording, placement and refresh cadence proposed and generated' },
    fit:    { care: 'Early warning when a new product reacts unexpectedly', insight: 'How well products and stores fit the trend', agent: 'Ordering, assortment and buyer decisions proposed' },
  },
  jp: {
    count:  { care: '今の滞在人数・混雑度を検知し、閾値超過を通知', insight: '日・週・月の来店時系列、曜日・時間帯・前年比の推移', agent: '来店予測に基づく人員配置・営業時間・販促タイミングの提案' },
    queue:  { care: '待機列・混雑の閾値超過をリアルタイム通知', insight: '待ち時間のピーク・混雑周期を分析', agent: '人員再配置・レジ増設・セルフ誘導の提案' },
    pop:    { care: '掲出中のPOPの露出・破損状態を検知', insight: 'POP別の注目・転換効果を分析', agent: 'POP文言・位置・交換サイクルの提案・生成' },
    fit:    { care: '新商品の初期反応の異常を検知', insight: '商品・店舗のトレンド適合度を分析', agent: '発注・商品構成・バイヤーの意思決定を提案' },
  },
};

/** Page-level copy for /products/functions. */
export const FUNCTIONS_PAGE_COPY: Record<Locale, {
  eyebrow: string; title: string; sub: string;
  readingTitle: string; reading: string;
  extensionTitle: string; extension: string; promoted: string;
  countNote: string; cta: string;
  /** 카탈로그 그리드(③1-4) — 허브의 중심 */
  catalogTitle: string; comingSoon: string;
  /** 매트릭스 보조 섹션(하단 이동) + 모드별 보기 링크 리드 */
  matrixTitle: string; modesLink: string;
  /** 하단 상담 CTA(§2-1 — dead-end 해소, 1개만) */
  consultLead: string; consultLabel: string;
}> = {
  ko: {
    eyebrow: '기능 라이브러리',
    title: '사람이 매장에서 하던 일을, AI가 대신 봅니다',
    sub: '세는 일, 줄을 보는 일, 판촉을 확인하는 일, 잘 팔릴지 가늠하는 일 — 매장에서 눈으로 하던 일을 기능으로 엽니다.\n그리고 이 목록은 계속 늘어납니다.',
    readingTitle: '매트릭스 읽는 법',
    reading: '“유동인구 분석 기능 하나가 saai care에서는 실시간 감지, saai insight에서는 추세 분석, saai agent에서는 인력/영업시간 추천으로 작동합니다.”',
    extensionTitle: '쉽고 유연한 확장성',
    extension: '새로운 분석 기능이 추가되면 별도 제품을 구매할 필요 없이 3가지 모드(감지·분석·실행) 경험이 자동으로 확장 적용됩니다.',
    promoted: '시선·주목도 분석 등 특정 영역은 독립적인 전문 제품(saai ads insight)으로 제공됩니다.',
    countNote: '유동인구·유입 카운팅(saai count)은 독립 제품을 넘어 모든 모드를 지원하는 핵심 기능입니다.',
    cta: '모드별 자세히 보기',
    catalogTitle: 'AI가 공간에서 하는 일',
    comingSoon: '준비 중',
    matrixTitle: '기능이 3모드를 지나는 법',
    modesLink: '모드별로 보기',
    consultLead: '우리 매장엔 어떤 기능이 먼저 필요할까요?',
    consultLabel: '어떤 기능이 필요한지 상담하기',
  },
  en: {
    eyebrow: 'Function library',
    title: 'The jobs you did by eye — AI now watches for you',
    sub: 'Counting, watching the line, checking the promo, gauging what will sell — the jobs done by eye become functions.\nAnd the list keeps growing.',
    readingTitle: 'How to read it',
    reading: '“One count becomes live detection in care, trend analysis in insight, and an operating proposal in agent.” A single cell reads: saai care runs saai count.',
    extensionTitle: 'Extension is one row',
    extension: 'A new capability adds one row — and three product experiences appear with it. No new product, no new name.',
    promoted: 'One exception — attention (gaze) covers the distinct domain of signage and displays, so it graduated from a row to a standalone product.',
    countNote: 'count is a function — not a fourth product.',
    cta: 'See details',
    catalogTitle: 'What the AI does in your space',
    comingSoon: 'Coming soon',
    matrixTitle: 'How a function crosses the three modes',
    modesLink: 'Browse by mode',
    consultLead: 'Which function does your store need first?',
    consultLabel: 'Talk through which function you need',
  },
  jp: {
    eyebrow: '機能ライブラリ',
    title: '機能は3つのモードを横断します',
    sub: '機能は一つの製品に属しません。foot fall が count になれば、count は care・insight・agent のすべてで使われます。',
    readingTitle: '読み方',
    reading: '「一つの count が、care ではリアルタイム検知に、insight では推移分析に、agent では運営提案になる」。一つのマスはこう読みます — saai care が saai count を回す。',
    extensionTitle: '拡張は一行',
    extension: '新しい機能は一行を足すだけ。3つのモードの体験が自動で生まれ、新しい製品も新しい名前も要りません。',
    promoted: '例外が一つ — 注目（視線）はサイネージ・展示物という別領域のため、行ではなく独立製品に昇格しました。',
    countNote: 'count は機能です — 4番目の製品ではありません。',
    cta: '詳しく見る',
    catalogTitle: 'AIが空間で行う仕事',
    comingSoon: '準備中',
    matrixTitle: '機能が3つのモードを横断する仕組み',
    modesLink: 'モード別に見る',
    consultLead: 'あなたの店舗には、どの機能が先に必要でしょうか？',
    consultLabel: 'どの機能が必要かご相談',
  },
};
