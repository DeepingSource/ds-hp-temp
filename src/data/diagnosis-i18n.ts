import type { Locale } from '@/lib/i18n';

/**
 * diagnosis-i18n — copy for /solutions/diagnosis (ko/en/jp), following the SAAI brand
 * voice: conclusion first, no inflated adjectives, "diagnosis" framing rather than a
 * playful guessing-game tone (Akinator's UX shape, not its voice). Static TS data —
 * same pattern as industryList.ts / solutions-i18n.ts (not every page's copy needs to
 * round-trip through Keystatic; wiring a CMS singleton for this is a reasonable v2
 * follow-up, noted in the handoff).
 */

type Tri = Record<Locale, string>;

export const DIAGNOSIS_UI: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    sub: string;
    q1Question: string;
    q2Question: string;
    q3Question: string;
    stepLabel: (n: number, total: number) => string;
    back: string;
    restart: string;
    resultKicker: string;
    problemHeading: string;
    stepsHeading: string;
    resultsHeading: string;
    relatedSolutionsHeading: string;
    ctaPrimary: string;
    ctaSecondary: string;
    resultsNote: string;
    /** Entry-point link shown on /solutions pointing into this flow. */
    entryLinkLabel: string;
  }
> = {
  ko: {
    eyebrow: '30초 진단',
    title: '지금 겪는 문제, 어떤 답이 있을까요',
    sub: '질문 몇 개면 충분합니다. 상황을 알려주시면 맞는 사례와 제품을 바로 보여드립니다.',
    q1Question: '지금 어떤 자리에서 보고 계세요?',
    q2Question: '어떤 현장이신가요?',
    q3Question: '요즘 가장 걸리는 문제는 무엇인가요?',
    stepLabel: (n, total) => `${n} / ${total}`,
    back: '이전',
    restart: '다시 진단하기',
    resultKicker: '진단 결과',
    problemHeading: '이런 문제, 맞을까요',
    stepsHeading: '이렇게 접근합니다',
    resultsHeading: '실제 결과',
    relatedSolutionsHeading: '이런 문제도 함께 보세요',
    ctaPrimary: '무료 상담 신청',
    ctaSecondary: '자세히 보기',
    resultsNote: '* 수치는 실제 운영 사례를 설명하기 위한 예시이며, 현장 조건에 따라 달라질 수 있습니다.',
    entryLinkLabel: '질문 3개로 빠르게 찾기',
  },
  en: {
    eyebrow: '30-second diagnosis',
    title: "Whatever the problem, there's likely an answer",
    sub: "A few questions are enough. Tell us your situation and we'll show you the matching case and product right away.",
    q1Question: "What's your role here?",
    q2Question: 'What kind of place do you run?',
    q3Question: "What's the biggest problem you're facing?",
    stepLabel: (n, total) => `${n} / ${total}`,
    back: 'Back',
    restart: 'Restart diagnosis',
    resultKicker: 'Diagnosis',
    problemHeading: "Is this the problem you're facing?",
    stepsHeading: 'How we approach it',
    resultsHeading: 'Real results',
    relatedSolutionsHeading: 'You might also be facing',
    ctaPrimary: 'Request a free consultation',
    ctaSecondary: 'View detail',
    resultsNote: '* Figures are illustrative examples of real deployments; actual results vary by site.',
    entryLinkLabel: 'Find it in 3 questions',
  },
  jp: {
    eyebrow: '30秒診断',
    title: '今の課題に、どんな答えがあるか',
    sub: '質問はいくつかで十分です。状況を教えていただければ、該当する事例と製品をすぐにお見せします。',
    q1Question: '今、どのお立場でご覧ですか?',
    q2Question: 'どのような現場ですか?',
    q3Question: '今、一番引っかかっている課題は何ですか?',
    stepLabel: (n, total) => `${n} / ${total}`,
    back: '戻る',
    restart: 'もう一度診断する',
    resultKicker: '診断結果',
    problemHeading: 'この課題で合っていますか',
    stepsHeading: 'このように取り組みます',
    resultsHeading: '実際の結果',
    relatedSolutionsHeading: 'こちらの課題も合わせてご覧ください',
    ctaPrimary: '無料相談を申し込む',
    ctaSecondary: '詳しく見る',
    resultsNote: '* 数値は実際の運用事例を説明するための例であり、現場条件により異なります。',
    entryLinkLabel: '3つの質問で素早く見つける',
  },
};

export type PersonaId = 'owner' | 'hq_sv' | 'exec';

export const PERSONA_OPTIONS: { id: PersonaId; label: Tri }[] = [
  {
    id: 'owner',
    label: {
      ko: '매장을 혼자 운영하는 점주예요',
      en: 'I run a single store on my own',
      jp: '一店舗を運営するオーナーです',
    },
  },
  {
    id: 'hq_sv',
    label: {
      ko: '여러 매장을 관리하는 본사·SV예요',
      en: 'I manage multiple stores at HQ or as an SV',
      jp: '複数店舗を管理する本社・SVです',
    },
  },
  {
    id: 'exec',
    label: {
      ko: '전사 도입을 검토하는 전략·임원이에요',
      en: "I'm evaluating company-wide adoption",
      jp: '全社導入を検討する経営・戦略担当です',
    },
  },
];

export type UniversalOptionId = 'privacy' | 'unsure';

export const Q3_UNIVERSAL_OPTIONS: { id: UniversalOptionId; label: Tri }[] = [
  {
    id: 'privacy',
    label: {
      ko: '개인정보·컴플라이언스가 궁금해요',
      en: 'I have privacy/compliance questions',
      jp: '個人情報・コンプライアンスが気になります',
    },
  },
  {
    id: 'unsure',
    label: {
      ko: '아직 잘 모르겠어요, 전반적으로 궁금해요',
      en: "Not sure yet — just exploring",
      jp: 'まだよく分かりません、全体的に知りたいです',
    },
  },
];

/** Q3 cluster button labels, keyed "<industrySlug>:<clusterId>" (see diagnosisData.ts). */
export const Q3_CLUSTER_LABEL: Record<string, Tri> = {
  'convenience:theft_loss': { ko: '도난·손실 관리', en: 'Theft & loss', jp: '盗難・ロス管理' },
  'convenience:inventory': { ko: '결품·재고 관리', en: 'Stockouts & inventory', jp: '欠品・在庫管理' },
  'convenience:merchandising': { ko: '진열·동선 최적화', en: 'Layout & merchandising', jp: '陳列・動線の最適化' },
  'cafe:congestion': { ko: '혼잡·대기 관리', en: 'Crowding & wait times', jp: '混雑・待ち時間管理' },
  'cafe:merchandising': { ko: '좌석·회전율 최적화', en: 'Seating & turnover', jp: '座席・回転率の最適化' },
  'drugstore:merchandising': {
    ko: '진열·구역 성과 최적화',
    en: 'Merchandising & zone performance',
    jp: '陳列・エリア成果の最適化',
  },
  'mart:congestion': { ko: '계산대 혼잡 관리', en: 'Checkout congestion', jp: 'レジ混雑管理' },
  'mart:merchandising': {
    ko: '동선·구역 전환 최적화',
    en: 'Traffic flow & zone conversion',
    jp: '動線・エリア転換の最適化',
  },
  'exhibition:congestion': { ko: '관람객 혼잡 관리', en: 'Visitor crowding', jp: '来場者の混雑管理' },
  'exhibition:merchandising': {
    ko: '부스·전시 성과 측정',
    en: 'Booth & exhibit performance',
    jp: 'ブース・展示の成果測定',
  },
  'logistics:ops_safety': { ko: '작업 효율·안전 관리', en: 'Operational efficiency & safety', jp: '作業効率・安全管理' },
  'unmanned:security_ops': { ko: '보안·운영 관리', en: 'Security & remote operations', jp: 'セキュリティ・運営管理' },
};

/** Q4 tiebreak — only shown when a Q3 cluster resolves to 2+ candidate slugs. */
export const TIEBREAK_QUESTIONS: Record<
  string,
  { question: Tri; options: { slug: string; label: Tri }[] }
> = {
  'cafe:congestion': {
    question: { ko: '어떤 상황에 더 가까우신가요?', en: 'Which situation is closer to yours?', jp: 'どちらの状況に近いですか?' },
    options: [
      {
        slug: 'cafe-peak-hour-management',
        label: {
          ko: '점심·저녁 피크에 주문이 몰려 대기가 길어져요',
          en: 'Orders pile up at lunch/dinner peak and waits get long',
          jp: '昼・夜のピークで注文が集中し待ち時間が長くなります',
        },
      },
      {
        slug: 'cafe-customer-wait-time',
        label: {
          ko: '카운터 앞 줄을 보고 고객이 그냥 나가요',
          en: 'Customers see the counter line and just leave',
          jp: 'カウンター前の列を見て、お客様がそのまま帰ってしまいます',
        },
      },
    ],
  },
  'drugstore:merchandising': {
    question: { ko: '무엇이 가장 궁금하신가요?', en: 'What are you most curious about?', jp: '一番知りたいことは何ですか?' },
    options: [
      {
        slug: 'drugstore-vmd-optimization',
        label: {
          ko: '어떤 진열 방식이 고마진 구역 유도에 효과적인지',
          en: 'Which layout best drives customers to high-margin zones',
          jp: 'どの陳列方法が高マージン区域への誘導に効果的か',
        },
      },
      {
        slug: 'drugstore-zone-performance',
        label: {
          ko: '유독 방문이 적은 구역이 왜 그런지',
          en: 'Why certain zones get so little foot traffic',
          jp: '来客が特に少ないエリアがなぜそうなのか',
        },
      },
      {
        slug: 'drugstore-tester-interaction',
        label: {
          ko: '테스터 배치가 실제 판매에 얼마나 도움이 되는지',
          en: 'How much tester placement actually drives sales',
          jp: 'テスター配置が実際の販売にどれだけ役立つか',
        },
      },
    ],
  },
  'mart:merchandising': {
    question: { ko: '무엇이 가장 궁금하신가요?', en: 'What are you most curious about?', jp: '一番知りたいことは何ですか?' },
    options: [
      {
        slug: 'mart-cart-path-optimization',
        label: {
          ko: '고객이 어떤 경로로 이동하고 어디서 머무는지',
          en: 'What path customers take and where they linger',
          jp: '顧客がどの経路を移動し、どこに留まるか',
        },
      },
      {
        slug: 'mart-zone-conversion',
        label: {
          ko: '방문은 많은데 특정 구역 전환율이 낮은 이유',
          en: 'Why a specific zone converts poorly despite heavy traffic',
          jp: '来客は多いのに特定エリアの転換率が低い理由',
        },
      },
    ],
  },
  'exhibition:merchandising': {
    question: { ko: '무엇을 측정하고 싶으신가요?', en: 'What do you want to measure?', jp: '何を測定したいですか?' },
    options: [
      {
        slug: 'exhibition-visitor-dwell-time',
        label: {
          ko: '어떤 전시물이 인상적인지, 어디서 오래 머무는지',
          en: 'Which exhibit impresses visitors and where they linger',
          jp: 'どの展示品が印象的か、どこで長く滞在するか',
        },
      },
      {
        slug: 'exhibition-booth-performance',
        label: {
          ko: '부스별 방문객 유치 성과를 참가사에 보고해야 해요',
          en: 'I need to report booth traffic performance to exhibitors',
          jp: 'ブース別の集客成果を出展社へ報告する必要があります',
        },
      },
    ],
  },
  'logistics:ops_safety': {
    question: {
      ko: '어떤 상황에 가장 가까우신가요?',
      en: 'Which situation is closest to yours?',
      jp: 'どちらの状況に一番近いですか?',
    },
    options: [
      {
        slug: 'logistics-ppe-compliance',
        label: {
          ko: '보호구(헬멧·안전화·조끼) 착용을 일일이 확인하기 어려워요',
          en: 'Hard to check PPE compliance one by one',
          jp: '保護具（ヘルメット・安全靴・ベスト）の着用確認が難しい',
        },
      },
      {
        slug: 'logistics-worker-safety',
        label: {
          ko: '위험 구역 진입 등 안전 규정 위반을 실시간으로 못 잡아요',
          en: "Can't catch safety violations like restricted-zone entry in real time",
          jp: '危険区域への立ち入りなど、安全規定違反をリアルタイムで把握できない',
        },
      },
      {
        slug: 'logistics-efficiency-zones',
        label: {
          ko: '특정 구역에 작업이 몰리는 원인을 모르겠어요',
          en: "Not sure why work bottlenecks in certain zones",
          jp: '特定エリアに作業が集中する原因が分かりません',
        },
      },
    ],
  },
  'unmanned:security_ops': {
    question: {
      ko: '어떤 상황에 가장 가까우신가요?',
      en: 'Which situation is closest to yours?',
      jp: 'どちらの状況に一番近いですか?',
    },
    options: [
      {
        slug: 'unmanned-theft-prevention',
        label: {
          ko: '도난이 발생해도 다음 날에야 알게 돼요',
          en: 'We only find out about theft the next day',
          jp: '盗難が起きても翌日にしか気づきません',
        },
      },
      {
        slug: 'unmanned-anomaly-detection',
        label: {
          ko: '냉장고 문 열림 같은 사소한 이상이 방치돼요',
          en: 'Small issues like a fridge door left open go unnoticed',
          jp: '冷蔵庫のドアが開いたままなど、小さな異常が放置されます',
        },
      },
      {
        slug: 'unmanned-remote-monitoring',
        label: {
          ko: '여러 지점을 매번 방문해서 확인해야 해요',
          en: 'I have to visit every location just to check on it',
          jp: '複数拠点を毎回訪問して確認しないといけません',
        },
      },
    ],
  },
};

export const EXIT_OWNER: Record<Locale, { title: string; body: string; linkLabel: string; continueLabel: string }> = {
  ko: {
    title: '말씀하신 상황엔 이쪽이 더 맞을 것 같아요',
    body: '한 매장을 직접 운영하신다면, 이 사이트가 다루는 엔터프라이즈 suite보다 사장님을 위한 별도 제품이 더 맞습니다. 카메라 없이 발주부터 POP까지 챙기는 saai 사장님 스위트를 확인해보세요.',
    linkLabel: 'saai for owners 보기',
    continueLabel: '그래도 계속 진단해볼게요',
  },
  en: {
    title: 'This looks like a better fit for your situation',
    body: 'If you run a single store yourself, a dedicated owner product fits better than the enterprise suite this site covers — a camera-less suite covering everything from ordering to POP.',
    linkLabel: 'See saai for owners',
    continueLabel: 'Continue the diagnosis anyway',
  },
  jp: {
    title: 'そのご状況には、こちらの方が合いそうです',
    body: '一店舗を直接運営されているなら、このサイトが扱うエンタープライズsuiteより、店主向けの専用製品の方が合っています。カメラなしで発注からPOPまで扱う saai のオーナー向けスイートをご確認ください。',
    linkLabel: 'saai for ownersを見る',
    continueLabel: 'それでも診断を続ける',
  },
};

export const EXIT_PRIVACY: Record<Locale, { title: string; body: string; linkLabel: string }> = {
  ko: {
    title: '이 질문엔 기술로 답합니다',
    body: '얼굴을 남기지 않고도 분석이 가능한 이유는 익명화 엔진 Anonymizer(SEAL)에 있습니다. 원본 미보존·사람 미열람·재식별 불가 — 세 가지 약속으로 설계되어 있습니다.',
    linkLabel: '기술 페이지 보기',
  },
  en: {
    title: 'This one, our technology answers',
    body: 'Analysis without keeping faces comes down to our Anonymizer (SEAL) engine — built on three promises: no raw footage retained, no human viewing, no re-identification possible.',
    linkLabel: 'See the technology',
  },
  jp: {
    title: 'この質問には技術でお答えします',
    body: '顔を残さずに分析できる理由は、匿名化エンジン Anonymizer（SEAL）にあります。原本非保存・人による閲覧不可・再識別不可という3つの約束で設計されています。',
    linkLabel: '技術ページを見る',
  },
};

export const EXIT_UNSURE: Record<Locale, { title: string; body: (industryLabel: string) => string; linkLabel: string }> = {
  ko: {
    title: '우선 업종 전체를 보여드릴게요',
    body: (label) => `아직 문제를 콕 집기 어려우시다면, ${label}에서 자주 나오는 문제들을 먼저 넓게 보시는 게 좋습니다.`,
    linkLabel: '전체 솔루션 보기',
  },
  en: {
    title: "Let's start with the full picture for your industry",
    body: (label) =>
      `If it's hard to pin down one problem yet, it helps to first see the common problems in ${label} more broadly.`,
    linkLabel: 'Browse all solutions',
  },
  jp: {
    title: 'まずは業種全体をお見せします',
    body: (label) => `まだ課題を絞り込みにくい場合は、${label}でよく見られる課題を広く見ていただくのがおすすめです。`,
    linkLabel: '全ソリューションを見る',
  },
};
