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
    stepLabel: (n: number, total: number) => string;
    back: string;
    restart: string;
    resultKicker: string;
    /** E3 확인 스텝(v4 §3-3·§3-4) — 수집한 답의 요약("정리하면"), 추리 연출 금지 */
    adaptiveConfirm: {
      text: (industry: string, cluster: string, symptom: string | null) => string;
      yes: string;
      no: string;
    };
    /** maxRejects 초과 closest 종결의 결과 킥커 (v4 §3-3) */
    resultClosestKicker: string;
    /** 결과 top2 병기 헤딩 — "혹시 이쪽에 더 가깝다면" */
    secondHeading: string;
    problemHeading: string;
    stepsHeading: string;
    resultsHeading: string;
    relatedSolutionsHeading: string;
    ctaPrimary: string;
    ctaSecondary: string;
    resultsNote: string;
    /** Entry-point link shown on /solutions pointing into this flow. */
    entryLinkLabel: string;
    /** 모달 닫기 버튼 aria-label. */
    modalClose: string;
    chatConnectors: {
      understanding: string;
      finalQuestion: string;
      analyzing: string;
      rewindHover: string;
      relatedContentHeading: string;
    };
    launcherBanner: {
      defaultTitle: string;
      /** 업종 프리셋이 있을 때의 헤드라인 — industryName은 로케일 라벨(슬러그 노출 금지). */
      presetTitle: (industryName: string) => string;
      defaultSub: string;
      ctaText: string;
    };
    launcherInline: string;
  }
> = {
  ko: {
    eyebrow: '30초 진단',
    title: '지금 겪는 문제, 어떤 답이 있을까요',
    sub: '질문 몇 개면 충분합니다. 상황을 알려주시면 맞는 사례와 제품을 바로 보여드립니다.',
    stepLabel: (n, total) => `${n} / ${total}`,
    back: '이전',
    restart: '다시 진단하기',
    resultKicker: '진단 결과',
    adaptiveConfirm: {
      text: (ind, cl, sym) =>
        `정리하면 — ${ind}에서 ‘${cl}’ 문제${sym ? `, 특히 “${sym}” 상황` : ''}으로 보여요. 맞을까요?`,
      yes: '네, 맞아요',
      no: '조금 달라요',
    },
    resultClosestKicker: '가장 가까운 사례',
    secondHeading: '혹시 이쪽에 더 가깝다면',
    problemHeading: '이런 문제, 맞을까요',
    stepsHeading: '이렇게 접근합니다',
    resultsHeading: '실제 결과',
    relatedSolutionsHeading: '이런 문제도 함께 보세요',
    ctaPrimary: '무료 상담 신청',
    ctaSecondary: '자세히 보기',
    resultsNote: '* 수치는 실제 운영 사례를 설명하기 위한 예시이며, 현장 조건에 따라 달라질 수 있습니다.',
    entryLinkLabel: '질문 3개로 빠르게 찾기',
    modalClose: '진단 닫기',
    chatConnectors: {
      understanding: '네, 알겠습니다.',
      finalQuestion: '마지막 질문이에요.',
      analyzing: '조건에 맞는 사례와 제품을 확인하고 있어요...',
      rewindHover: '수정',
      relatedContentHeading: '다음으로 볼 추천 콘텐츠',
    },
    launcherBanner: {
      defaultTitle: '우리 매장·공간, 어디서부터 최적화해야 할까요?',
      presetTitle: (industryName) => `지금 겪는 문제를 알려주시면, ${industryName} 사례 중 맞는 답을 찾아드립니다`,
      defaultSub: '질문 3개면 충분합니다. 내 현장에 꼭 맞는 답을 찾아드립니다.',
      ctaText: '30초 진단 시작하기',
    },
    launcherInline: '이 현장에 내 문제에 맞는 솔루션 확인하기',
  },
  en: {
    eyebrow: '30-second diagnosis',
    title: "Whatever the problem, there's likely an answer",
    sub: "A few questions are enough. Tell us your situation and we'll show you the matching case and product right away.",
    stepLabel: (n, total) => `${n} / ${total}`,
    back: 'Back',
    restart: 'Restart diagnosis',
    resultKicker: 'Diagnosis',
    adaptiveConfirm: {
      text: (ind, cl, sym) =>
        `To sum up — a ‘${cl}’ problem at your ${ind}${sym ? `, especially “${sym}”` : ''}. Did we get that right?`,
      yes: 'Yes, that’s right',
      no: 'Not quite',
    },
    resultClosestKicker: 'Closest match',
    secondHeading: 'If this feels closer',
    problemHeading: "Is this the problem you're facing?",
    stepsHeading: 'How we approach it',
    resultsHeading: 'Real results',
    relatedSolutionsHeading: 'You might also be facing',
    ctaPrimary: 'Request a free consultation',
    ctaSecondary: 'View detail',
    resultsNote: '* Figures are illustrative examples of real deployments; actual results vary by site.',
    entryLinkLabel: 'Find it in 3 questions',
    modalClose: 'Close diagnosis',
    chatConnectors: {
      understanding: 'Understood.',
      finalQuestion: 'One last question.',
      analyzing: 'Finding matching cases and products...',
      rewindHover: 'Edit',
      relatedContentHeading: 'Recommended Next Content',
    },
    launcherBanner: {
      defaultTitle: 'Where should you start optimizing your store or venue?',
      presetTitle: (industryName) => `Tell us what you're facing — we'll match it to real ${industryName.toLowerCase()} cases`,
      defaultSub: '3 questions are enough to find the right answer for your site.',
      ctaText: 'Start 30s Diagnosis',
    },
    launcherInline: 'Check if there is a solution matching your site',
  },
  jp: {
    eyebrow: '30秒診断',
    title: '今の課題に、どんな答えがあるか',
    sub: '質問はいくつかで十分です。状況を教えていただければ、該当する事例と製品をすぐにお見せします。',
    stepLabel: (n, total) => `${n} / ${total}`,
    back: '戻る',
    restart: 'もう一度診断する',
    resultKicker: '診断結果',
    adaptiveConfirm: {
      text: (ind, cl, sym) =>
        `整理すると — ${ind}で「${cl}」の課題${sym ? `、特に「${sym}」という状況` : ''}のようです。合っていますか？`,
      yes: 'はい、合っています',
      no: '少し違います',
    },
    resultClosestKicker: '最も近い事例',
    secondHeading: 'こちらに近い場合は',
    problemHeading: 'この課題で合っていますか',
    stepsHeading: 'このように取り組みます',
    resultsHeading: '実際の結果',
    relatedSolutionsHeading: 'こちらの課題も合わせてご覧ください',
    ctaPrimary: '無料相談を申し込む',
    ctaSecondary: '詳しく見る',
    resultsNote: '* 数値は実際の運用事例を説明するための例であり、現場条件により異なります。',
    entryLinkLabel: '3つの質問で素早く見つける',
    modalClose: '診断を閉じる',
    chatConnectors: {
      understanding: '承知いたしました。',
      finalQuestion: '最後の質問です。',
      analyzing: '条件に合う事例と製品を探しています...',
      rewindHover: '修正',
      relatedContentHeading: '次に見るおすすめコンテンツ',
    },
    launcherBanner: {
      defaultTitle: '店舗・空間の最適化、どこから始めるべきですか？',
      presetTitle: (industryName) => `いま抱えている課題を教えてください。${industryName}の事例から最適な答えを見つけます`,
      defaultSub: '3つの質問で、あなたの現場に合う答えを見つけます。',
      ctaText: '30秒診断を始める',
    },
    launcherInline: 'この現場に合うソリューションを確認する',
  },
};

export type PersonaId = 'owner' | 'hq_sv' | 'exec';




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
