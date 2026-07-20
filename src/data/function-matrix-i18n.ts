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
    agent:   { name: 'saai agent',   mode: 'Advise',   tense: 'Next',      question: 'What should we do next?' },
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
    count: '방문·재실 인원', census: '익명 인구통계(결)', trail: '동선', gaze: '시선 · gaze→pick',
    wait: '대기·줄', tide: '혼잡(밀물/썰물)', keep: '손실 방지', shelf: '매대·재고 상태',
    motion: '행동', fit: '트렌드 적합', pop: '판촉물(POP)', talk: '다국어 응대',
  },
  en: {
    count: 'Footfall & occupancy', census: 'Anonymous demographics', trail: 'Movement paths', gaze: 'Attention · gaze→pick',
    wait: 'Queues & waiting', tide: 'Crowding (ebb & flow)', keep: 'Loss prevention', shelf: 'Shelf & stock condition',
    motion: 'Behavior', fit: 'Trend fit', pop: 'In-store promotion (POP)', talk: 'Multilingual service',
  },
  jp: {
    count: '来店・滞在人数', census: '匿名の人口統計', trail: '動線', gaze: '視線 · gaze→pick',
    wait: '待ち・行列', tide: '混雑(満ち引き)', keep: 'ロス防止', shelf: '棚・在庫の状態',
    motion: '行動', fit: 'トレンド適合', pop: '販促物(POP)', talk: '多言語接客',
  },
};

/** The 36 cells per locale. KO = SOT verbatim; EN/JP = draft. */
export const MATRIX_COPY: Record<Locale, Record<FunctionKey, Record<ModeKey, string>>> = {
  ko: {
    count:  { care: '지금 재실 인원·혼잡도 감지, 임계 초과 알림', insight: '일·주·월 방문 시계열, 요일·시간대·전년 대비 추세', agent: '방문 예측 기반 인력 배치·영업시간·프로모션 타이밍 제안' },
    census: { care: '지금 방문객 구성(연령대·성비 추정) 파악', insight: '시간대·요일별 방문객 결(segment) 변화 분석', agent: '타깃 세그먼트 맞춤 상품 구성·시간대 운영 제안' },
    trail:  { care: '특정 구역 이상 정체·비정상 동선 감지', insight: '구역별 통과·체류 히트맵, 주요 경로 분석', agent: '진열·레이아웃·안내 동선 개선 제안' },
    gaze:   { care: '신규 진열·POP 앞 시선 반응 실시간 확인', insight: '매대·상품별 주목도(gaze→pick 전환) 분석', agent: '골든존 배치·진열 우선순위 제안' },
    wait:   { care: '계산대·대기열 임계 초과 실시간 알림', insight: '대기시간 피크·요일/시간대 분석', agent: '인력 재배치·카운터 증설·셀프 유도 제안' },
    tide:   { care: '매장 전체 혼잡 밀물/썰물 실시간 감지', insight: '혼잡 주기·피크 패턴 분석', agent: '혼잡 완화 운영(인력·프로모션 분산) 제안' },
    keep:   { care: '이상 행동·이탈·분실 위험 실시간 감지', insight: '손실 발생 구역·시간·패턴 분석', agent: '집기 배치·동선 차단·집중 관리 구역 제안' },
    shelf:  { care: '결품·흐트러짐·가격표 오류 실시간 감지', insight: '결품 빈도·회전율·매대별 성과 분석', agent: '보충 주기·페이싱·진열 우선순위 제안' },
    motion: { care: '이상 행동(넘어짐·다툼 등) 실시간 감지', insight: '매장 내 행동 유형·빈도 분석', agent: '안전·서비스 개입 지점 제안' },
    fit:    { care: '신상품 초기 반응 이상 감지', insight: '상품·매장의 트렌드 적합도 분석', agent: '발주·상품 구성·바이어 의사결정 제안' },
    pop:    { care: '게시된 POP 노출·훼손 상태 감지', insight: 'POP별 주목·전환 효과 분석', agent: 'POP 문구·위치·교체 주기 제안·생성' },
    talk:   { care: '외국어·도움 요청 상황 실시간 감지', insight: '문의 유형·언어·빈도 분석', agent: '다국어 응대·안내 문구 제안·생성' },
  },
  en: {
    count:  { care: 'Live occupancy and crowding, with alerts when a threshold is crossed', insight: 'Daily, weekly and monthly footfall trends by weekday, hour and year over year', agent: 'Staffing, opening hours and promotion timing proposed from forecast demand' },
    census: { care: 'Who is in the store right now — estimated age band and gender mix', insight: 'How the visitor mix shifts by hour and weekday', agent: 'Assortment and hour-by-hour operations tuned to the segments you actually get' },
    trail:  { care: 'Unusual congestion or abnormal paths in a specific zone', insight: 'Pass-through and dwell heatmaps, and the routes people actually take', agent: 'Layout, display and wayfinding changes proposed from the paths' },
    gaze:   { care: 'Live reaction to a new display or POP', insight: 'Attention per fixture and product, and the gaze→pick conversion', agent: 'Golden-zone placement and display priority proposed' },
    wait:   { care: 'Real-time alert when a checkout queue crosses its threshold', insight: 'Waiting-time peaks by weekday and hour', agent: 'Staff reallocation, extra counters or self-checkout routing proposed' },
    tide:   { care: 'Store-wide crowding sensed as it ebbs and flows', insight: 'Crowding cycles and peak patterns', agent: 'Ways to flatten the peak — staffing and promotion spread' },
    keep:   { care: 'Live detection of abnormal behavior, walk-outs and shrink risk', insight: 'Where, when and how loss happens', agent: 'Fixture placement, path blocking and focus zones proposed' },
    shelf:  { care: 'Out-of-stock, disarray and price-tag errors, detected live', insight: 'Out-of-stock frequency, turnover and performance per fixture', agent: 'Replenishment cadence, facing and display priority proposed' },
    motion: { care: 'Live detection of incidents — falls, altercations and the like', insight: 'What kinds of behavior occur in the store, and how often', agent: 'Where to intervene for safety and service' },
    fit:    { care: 'Early warning when a new product reacts unexpectedly', insight: 'How well products and stores fit the trend', agent: 'Ordering, assortment and buyer decisions supported' },
    pop:    { care: 'Whether posted POP is visible and intact', insight: 'Attention and conversion effect per POP', agent: 'POP wording, placement and refresh cadence proposed and generated' },
    talk:   { care: 'Live detection of foreign-language and help-needed moments', insight: 'Inquiry types, languages and frequency', agent: 'Multilingual responses and signage wording proposed and generated' },
  },
  jp: {
    count:  { care: '今の滞在人数・混雑度を検知し、閾値超過を通知', insight: '日・週・月の来店時系列、曜日・時間帯・前年比の推移', agent: '来店予測に基づく人員配置・営業時間・販促タイミングの提案' },
    census: { care: '今の来店客構成(年齢層・男女比の推定)を把握', insight: '時間帯・曜日ごとの来店客セグメントの変化を分析', agent: 'ターゲット層に合わせた商品構成・時間帯運営の提案' },
    trail:  { care: '特定エリアの異常な滞留・不自然な動線を検知', insight: 'エリア別の通過・滞在ヒートマップ、主要経路の分析', agent: '陳列・レイアウト・案内動線の改善提案' },
    gaze:   { care: '新規陳列・POP前の視線反応をリアルタイムに確認', insight: '棚・商品別の注目度(gaze→pick 転換)を分析', agent: 'ゴールデンゾーン配置・陳列優先度の提案' },
    wait:   { care: 'レジ・待機列の閾値超過をリアルタイム通知', insight: '待ち時間のピーク、曜日・時間帯の分析', agent: '人員再配置・レジ増設・セルフ誘導の提案' },
    tide:   { care: '店舗全体の混雑の満ち引きをリアルタイム検知', insight: '混雑の周期・ピークパターンを分析', agent: '混雑緩和の運営(人員・販促の分散)提案' },
    keep:   { care: '異常行動・離脱・紛失リスクをリアルタイム検知', insight: 'ロス発生のエリア・時間・パターンを分析', agent: '什器配置・動線遮断・重点管理エリアの提案' },
    shelf:  { care: '欠品・乱れ・価格表示の誤りをリアルタイム検知', insight: '欠品頻度・回転率・棚別の成果を分析', agent: '補充サイクル・フェイシング・陳列優先度の提案' },
    motion: { care: '異常行動(転倒・トラブル等)をリアルタイム検知', insight: '店内の行動タイプ・頻度を分析', agent: '安全・サービス介入ポイントの提案' },
    fit:    { care: '新商品の初期反応の異常を検知', insight: '商品・店舗のトレンド適合度を分析', agent: '発注・商品構成・バイヤーの意思決定を支援' },
    pop:    { care: '掲出中のPOPの露出・破損状態を検知', insight: 'POP別の注目・転換効果を分析', agent: 'POP文言・位置・交換サイクルの提案・生成' },
    talk:   { care: '外国語・ヘルプ要請の状況をリアルタイム検知', insight: '問い合わせの種類・言語・頻度を分析', agent: '多言語接客・案内文言の提案・生成' },
  },
};

/** Page-level copy for /products/functions. */
export const FUNCTIONS_PAGE_COPY: Record<Locale, {
  eyebrow: string; title: string; sub: string;
  readingTitle: string; reading: string;
  extensionTitle: string; extension: string;
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
    countNote: 'count は機能です — 4番目の製品ではありません。',
    cta: '詳しく見る',
    modeHeading: '縦軸 — 3つのモード',
    modeSub: '製品は3つのモードです。同じ機能をどの時間軸・目的で通すかが製品を分けます。',
  },
};
