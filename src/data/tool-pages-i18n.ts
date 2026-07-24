import { type Locale } from '@/lib/i18n';
import { type FunctionKey } from '@/lib/brand-canon';

/**
 * Copy for the individual function-tool pages (기능페이지 작업문서 v1 §3–§5).
 * Standard skeleton: hero → limits(②) → solution(③) → what(④) → 3-mode(⑤, from
 * MATRIX_COPY) → mockup(⑥) → connect·CTA(⑧). No accuracy/install section (not
 * hardware-specific). The ⑤ 3-mode strip pulls from function-matrix MATRIX_COPY so it
 * never drifts from the library matrix. Numbers on the mockups are examples (예시).
 */

export type ToolKey = Extract<FunctionKey, 'queue' | 'pop' | 'fit'>;

export type ToolCopy = {
  eyebrow: string;
  h1: string;
  sub: string;
  privacy: string;
  limits: string;
  solution: string;
  what: string[];
  connect: { label: string; href: string }[];
};

/** Shared section labels per locale. */
export const TOOL_SECTIONS: Record<Locale, {
  limits: string; solution: string; what: string; modes: string; modesSub: string;
  demo: string; connect: string; cta: string; backToLibrary: string; example: string;
}> = {
  ko: {
    limits: '지금까지의 한계', solution: '이렇게 해결합니다', what: '무엇을 알 수 있나',
    modes: '세 모드로 통과합니다', modesSub: '같은 기능을 care는 지금으로, insight는 어제로, agent는 다음으로.',
    demo: '이런 화면으로', connect: '이어지는 제품', cta: '도입 상담', backToLibrary: '기능 라이브러리',
    example: '예시',
  },
  en: {
    limits: 'The limit until now', solution: 'How it works', what: 'What you learn',
    modes: 'Through the three modes', modesSub: 'The same function — care reads it as now, insight as yesterday, agent as next.',
    demo: 'What it looks like', connect: 'Where it leads', cta: 'Talk to us', backToLibrary: 'Function library',
    example: 'Example',
  },
  jp: {
    limits: 'これまでの限界', solution: 'こう解決します', what: '何がわかるか',
    modes: '3つのモードを通します', modesSub: '同じ機能を care は「今」、insight は「昨日」、agent は「次」として。',
    demo: 'こんな画面で', connect: 'つながる製品', cta: '導入のご相談', backToLibrary: '機能ライブラリ',
    example: '例',
  },
};

const CONTACT = { ko: '도입 상담', en: 'Talk to us', jp: '導入のご相談' };

export const TOOL_COPY: Record<ToolKey, Record<Locale, ToolCopy>> = {
  queue: {
    ko: {
      eyebrow: '기능 · store queue · 대기·혼잡',
      h1: '줄이 길어지는 순간, 손님은 말없이 나갑니다',
      sub: '계산대 대기(시간·인원)와 매장 혼잡을 실시간으로 보여줍니다. 붐비기 전에, 인력을 옮길 수 있게.',
      privacy: '개인 식별 없이, 대기·혼잡만',
      limits: '줄은 길어진 뒤에야 눈에 띕니다. 언제 붐빌지 미리 알면 인력을 옮길 수 있는데, 그 예측이 없었습니다.',
      solution: '대기열(시간·인원)과 매장 혼잡을 실시간으로 측정해, 임계를 넘기 전에 알립니다.',
      what: ['대기시간 — 지금 몇 분', '대기 인원 — 몇 명', '혼잡 주기 — 밀물·썰물', '피크 — 요일·시간대'],
      connect: [
        { label: 'store count', href: '/products/store-count' },
        { label: 'saai care', href: '/products/saai-care' },
        { label: 'saai agent', href: '/products/saai-agent' },
        { label: CONTACT.ko, href: '/contact' },
      ],
    },
    en: {
      eyebrow: 'Function · store queue · queues & crowding',
      h1: 'The moment the line grows, customers leave without a word',
      sub: 'Checkout waiting (time and people) and store crowding, measured live — so you can move staff before it gets busy.',
      privacy: 'No identity — only queues and crowding',
      limits: 'A line is only noticed once it is long. Knowing when it will get busy lets you move staff — but that forecast was missing.',
      solution: 'Queue (time and headcount) and store crowding measured live, with an alert before the threshold is crossed.',
      what: ['Waiting time — how many minutes now', 'People waiting — how many', 'Crowding cycle — ebb and flow', 'Peak — by weekday and hour'],
      connect: [
        { label: 'store count', href: '/products/store-count' },
        { label: 'saai care', href: '/products/saai-care' },
        { label: 'saai agent', href: '/products/saai-agent' },
        { label: CONTACT.en, href: '/contact' },
      ],
    },
    jp: {
      eyebrow: '機能 · store queue · 待ち・混雑',
      h1: '列が伸びた瞬間、お客様は何も言わずに去ります',
      sub: 'レジの待ち(時間・人数)と店内の混雑をリアルタイムに可視化 — 混む前に人員を動かせるように。',
      privacy: '個人を識別せず、待ち・混雑だけ',
      limits: '列は長くなってから気づきます。いつ混むか先にわかれば人員を動かせるのに、その予測がありませんでした。',
      solution: '待機列(時間・人数)と店内の混雑をリアルタイムに測り、閾値を超える前に通知します。',
      what: ['待ち時間 — 今、何分', '待ち人数 — 何人', '混雑の周期 — 満ち引き', 'ピーク — 曜日・時間帯'],
      connect: [
        { label: 'store count', href: '/products/store-count' },
        { label: 'saai care', href: '/products/saai-care' },
        { label: 'saai agent', href: '/products/saai-agent' },
        { label: CONTACT.jp, href: '/contact' },
      ],
    },
  },
  pop: {
    ko: {
      eyebrow: '기능 · store pop · 판촉물(POP)',
      h1: '붙여둔 POP이, 정말 보이고 있나요?',
      sub: '붙여둔 판촉물의 노출·주목·전환을 측정하고, 문구·위치·교체 시점까지 제안합니다.',
      privacy: '개인 식별 없이, 반응만',
      limits: 'POP은 붙이고 나면 효과를 모릅니다. 제대로 붙었는지, 눈에 들었는지, 매출로 이어졌는지 확인할 방법이 없었습니다.',
      solution: '게시 상태(노출·훼손)부터 시선·전환까지 측정해, POP 한 장의 실제 효과를 숫자로.',
      what: ['게시 상태 — 붙었나·가려졌나·훼손', '주목 — 본 비율', '전환 — 구매로 이어진 비율'],
      connect: [
        { label: 'saai ads insight', href: '/products/saai-ads-insight' },
        { label: 'saai agent', href: '/products/saai-agent' },
        { label: 'saai insight', href: '/products/saai-insight' },
        { label: CONTACT.ko, href: '/contact' },
      ],
    },
    en: {
      eyebrow: 'Function · store pop · in-store promotion (POP)',
      h1: 'That POP you put up — is it actually being seen?',
      sub: 'Measure the visibility, attention and conversion of posted promotions — down to wording, placement and refresh timing.',
      privacy: 'No identity — only reaction',
      limits: 'Once a POP is up, its effect is unknown. Whether it went up right, drew any eyes, or led to a sale — there was no way to tell.',
      solution: 'From posting state (visible, damaged) to attention and conversion — the real effect of one POP, as numbers.',
      what: ['Posting state — up, hidden or damaged', 'Attention — share who saw it', 'Conversion — share that led to a purchase'],
      connect: [
        { label: 'saai ads insight', href: '/products/saai-ads-insight' },
        { label: 'saai agent', href: '/products/saai-agent' },
        { label: 'saai insight', href: '/products/saai-insight' },
        { label: CONTACT.en, href: '/contact' },
      ],
    },
    jp: {
      eyebrow: '機能 · store pop · 販促物(POP)',
      h1: '貼ったPOP、本当に見られていますか?',
      sub: '掲出した販促物の露出・注目・転換を測り — 文言・位置・交換時期まで提案します。',
      privacy: '個人を識別せず、反応だけ',
      limits: 'POPは貼った後の効果がわかりません。ちゃんと貼れたか、目に入ったか、売上につながったか — 確かめる術がありませんでした。',
      solution: '掲出状態(露出・破損)から視線・転換まで測り、POP1枚の実際の効果を数字に。',
      what: ['掲出状態 — 貼れたか・隠れたか・破損', '注目 — 見た割合', '転換 — 購入につながった割合'],
      connect: [
        { label: 'saai ads insight', href: '/products/saai-ads-insight' },
        { label: 'saai agent', href: '/products/saai-agent' },
        { label: 'saai insight', href: '/products/saai-insight' },
        { label: CONTACT.jp, href: '/contact' },
      ],
    },
  },
  fit: {
    ko: {
      eyebrow: '기능 · store fit · 트렌드 적합',
      h1: '잘 나갈 상품인지, 진열 첫 주에 압니다',
      sub: '신상품이 이 매장에 맞는지 — 시선·집어듦·재방문으로 트렌드 적합도를. 감이 아니라 첫 주 데이터로.',
      privacy: '개인 식별 없이, 상품 반응만',
      limits: '신상품의 운명은 보통 한 달 뒤에 압니다. 왜 안 팔렸는지 — 안 보여서·안 끌려서·집었다 놓아서 — 는 POS에 없습니다.',
      solution: '진열 첫날부터 상품 앞 시선·집어듦·재방문을 익명으로 측정해, 이 매장·손님층에 맞는지 점수로.',
      what: ['관심도 — 본 비율', 'gaze→pick — 집은 비율', '매장 적합 — 또래 대비'],
      connect: [
        { label: 'saai ads insight', href: '/products/saai-ads-insight' },
        { label: 'saai insight', href: '/products/saai-insight' },
        { label: 'saai agent', href: '/products/saai-agent' },
        { label: CONTACT.ko, href: '/contact' },
      ],
    },
    en: {
      eyebrow: 'Function · store fit · trend fit',
      h1: 'Whether a product will sell — you know in its first week on the shelf',
      sub: 'Whether a new product fits this store — from attention, pickup and return visits. Not gut feel, but first-week data.',
      privacy: 'No identity — only product reaction',
      limits: "A new product's fate is usually known a month later. Why it did not sell — unseen, unappealing, or picked up and put back — is not in the POS.",
      solution: 'From day one on the shelf, attention, pickup and return visits measured anonymously — scored for fit to this store and its shoppers.',
      what: ['Interest — share who looked', 'gaze→pick — share who picked it up', 'Store fit — versus peers'],
      connect: [
        { label: 'saai ads insight', href: '/products/saai-ads-insight' },
        { label: 'saai insight', href: '/products/saai-insight' },
        { label: 'saai agent', href: '/products/saai-agent' },
        { label: CONTACT.en, href: '/contact' },
      ],
    },
    jp: {
      eyebrow: '機能 · store fit · トレンド適合',
      h1: '売れる商品かどうか、陳列の初週にわかります',
      sub: '新商品がこの店に合うか — 視線・手に取る・再来店からトレンド適合度を。勘ではなく初週のデータで。',
      privacy: '個人を識別せず、商品への反応だけ',
      limits: '新商品の運命はたいてい一か月後にわかります。なぜ売れなかったか — 見えない・惹かれない・手に取って戻した — はPOSにありません。',
      solution: '陳列初日から商品前の視線・手に取る・再来店を匿名で測り、この店・客層に合うかを点数に。',
      what: ['関心度 — 見た割合', 'gaze→pick — 手に取った割合', '店舗適合 — 同世代比'],
      connect: [
        { label: 'saai ads insight', href: '/products/saai-ads-insight' },
        { label: 'saai insight', href: '/products/saai-insight' },
        { label: 'saai agent', href: '/products/saai-agent' },
        { label: CONTACT.jp, href: '/contact' },
      ],
    },
  },
};

/**
 * 페이지별 핵심 블록(③2-1·3-1·4-1 신규 카피) — 승격 서사의 골자.
 * queue=의사결정 지원·고객 경험 / pop=만들기→측정 루프·리테일 미디어 /
 * fit=두 개의 신호원(외부 트렌드는 roadmap 톤)·agentic 발주 제안.
 */
export const TOOL_EXTRA: Record<
  ToolKey,
  Record<Locale, { title: string; body: string; badge?: string; links?: { label: string; href: string }[] }[]>
> = {
  queue: {
    ko: [
      { title: '의사결정 지원', body: '계산대를 더 열까, 셀프 체크아웃을 도입할까 — 지금 붐비는 정도로 정합니다.' },
      { title: '고객 경험', body: '"예상 대기 6분" 한 줄이, 이탈 대신 기다림을 만듭니다.' },
    ],
    en: [
      { title: 'Decision support', body: 'Open another till, or add self-checkout? Decide by how busy it is right now.' },
      { title: 'Customer experience', body: 'One line — "about 6 minutes" — turns walk-outs into waiting.' },
    ],
    jp: [
      { title: '意思決定支援', body: 'レジをもう一台開けるか、セルフレジを導入するか — 今の混み具合で決めます。' },
      { title: '顧客体験', body: '「予想待ち6分」の一行が、離脱を待つ行動に変えます。' },
    ],
  },
  pop: {
    // ③3-1: '만들기(saai.store) → 측정(store pop)' 루프에 교차 링크 2개(제작 도구·박람회)
    ko: [
      {
        title: '만들고 → 붙이고 → 측정합니다',
        body: 'saai.store로 1분에 만들고, store pop으로 효과를 측정합니다 — 붙인 뒤가 진짜입니다.',
        links: [
          { label: 'saai.store에서 만들기', href: 'https://saai.store' },
          { label: '프랜차이즈 박람회에서 보기', href: '/events/coex-franchise-expo-84' },
        ],
      },
      { title: '리테일 미디어로', body: '측정이 쌓이면 매대 앞은 광고 지면이 됩니다 — saai ads insight로 이어집니다.' },
    ],
    en: [
      {
        title: 'Make it → post it → measure it',
        body: 'Make it in a minute on saai.store, then measure it with store pop — what happens after you post it is what counts.',
        links: [
          { label: 'Make one on saai.store', href: 'https://saai.store' },
          { label: 'See it at the franchise expo', href: '/events/coex-franchise-expo-84' },
        ],
      },
      { title: 'Toward retail media', body: 'As measurement accumulates, the shelf front becomes ad inventory — leading into saai ads insight.' },
    ],
    jp: [
      {
        title: '作る → 貼る → 測る',
        body: 'saai.storeで1分で作り、store popで効果を計測します — 貼った後が本番です。',
        links: [
          { label: 'saai.storeで作る', href: 'https://saai.store' },
          { label: 'フランチャイズ博覧会で見る', href: '/events/coex-franchise-expo-84' },
        ],
      },
      { title: 'リテールメディアへ', body: '計測が積み重なると、棚の前は広告面になります — saai ads insight につながります。' },
    ],
  },
  fit: {
    ko: [
      { title: '두 개의 신호원', body: '밖에서 뜨는 트렌드와, 우리 매장 안의 반응 — 둘을 겹쳐 봅니다.', badge: '외부 트렌드 감지 · 로드맵' },
      { title: 'agentic 발주 제안', body: '"이 상품, 발주할까요?" — 적합/보류를 근거와 함께 답합니다.' },
    ],
    en: [
      { title: 'Two signal sources', body: 'The trend rising outside, and how your own store reacts — read together.', badge: 'External trend sensing · roadmap' },
      { title: 'Agentic ordering', body: '"Order this one?" — fit or hold, answered with the evidence.' },
    ],
    jp: [
      { title: '二つのシグナル源', body: '外で伸びるトレンドと、自店の中の反応 — 重ねて見ます。', badge: '外部トレンド検知 · ロードマップ' },
      { title: 'エージェント発注提案', body: '「この商品、発注しますか？」 — 適合/保留を根拠とともに答えます。' },
    ],
  },
};

/** 페이지별 맥락형 CTA(③7.5 · D4) — 라벨은 맥락형, 목적지는 트랙 규칙(§2-1). */
export const TOOL_CTA: Record<ToolKey, {
  mainHref: string;
  main: Record<Locale, string>;
  secondary?: { href: string; label: Record<Locale, string> };
}> = {
  queue: {
    mainHref: '/contact?type=enterprise&product=store-queue',
    main: { ko: '대기·혼잡 진단 문의', en: 'Ask for a queue & crowding review', jp: '待機・混雑診断のご相談' },
  },
  pop: {
    // 두 갈래(ⓐ 제작=사장님 1순위 / ⓑ 측정=브랜드·본사)
    mainHref: 'https://saai.store',
    main: { ko: 'POP 만들어보기', en: 'Make a POP on saai.store', jp: 'POPを作ってみる' },
    secondary: {
      href: '/contact?type=enterprise&product=store-pop',
      label: { ko: 'POP 효과 측정 문의', en: 'Ask about POP measurement', jp: 'POP効果測定のご相談' },
    },
  },
  fit: {
    mainHref: '/contact?type=enterprise&product=store-fit',
    main: { ko: '발주 판단 상담', en: 'Talk through an ordering decision', jp: '発注判断のご相談' },
  },
};
