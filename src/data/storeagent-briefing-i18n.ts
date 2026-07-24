// ──────────────────────────────────────────────────────────────────────────────
// i18n overlay for StoreAgent BriefingMockup (+ 구 LiveDemoSection — 미사용으로 _archive, MM 1-⑩).
//
// briefingData.ts and seasonal/* are multi-consumer (the /storeagent/sample
// minisite depends on them) and MUST NOT be edited. This overlay re-localizes
// only the strings those two components actually RENDER, keyed by area id, with
// a fallback to the original data value when no override exists.
//
// Stable, area-keyed strings (label / location / valueProps) are fully covered.
// Seasonal briefing scenario text is runtime-combinatorial (season + month +
// nearby events) and is intentionally left to fall back to the data value.
// ──────────────────────────────────────────────────────────────────────────────

import { type Locale } from '@/lib/i18n';

interface ValuePropI18n {
  before: string;
  after: string;
  metric: string;
}

interface AreaI18n {
  label: string;
  location: string;
  valueProps: ValuePropI18n[];
}

// Keyed by area id. ko = verbatim from briefingData; en = concise; jp = 丁寧体.
const AREA_I18N: Record<Locale, Record<string, AreaI18n>> = {
  ko: {
    office: {
      label: '오피스',
      location: '서울 강남구 테헤란로',
      valueProps: [
        { before: '매일 같은 양을 준비하다 보니 피크 요일에 재고가 부족', after: '요일별 패턴 분석으로 전날 수량을 다르게 제안받습니다.', metric: '점심 품절 주 1회 이하' },
        { before: '결산·마감 시즌 야근 수요를 미리 알 방법이 없음', after: '인근 특정 기업 일정 기반으로 야근 피크를 알림 받습니다.', metric: '저녁 매출 월 +12만원' },
        { before: '안주가 떨어져 있어 주류와 동반 구매 연결이 안 됨', after: '안주 크로스 진열 위치와 품목을 매일 최적화합니다.', metric: '객단가 상승 +1,800원' },
      ],
    },
    residential: {
      label: '주택',
      location: '서울 송파구 잠실동',
      valueProps: [
        { before: '한파·우천 때 음료·간식 재고가 속수무책으로 떨어집니다.', after: '날씨 예보 기반으로 품목별 보충 시점을 추천합니다.', metric: '폐기·품절 손실 -18%' },
        { before: '하교 시간에 간식이 품절되어 고객이 발길을 돌립니다.', after: '시간대별 수요 패턴으로 1~2시간 전 사전 진열을 준비합니다.', metric: '오후~저녁 매출 +15%' },
        { before: '마트 휴무일·명절 특수 수요를 당일에야 파악합니다.', after: '주변 이벤트·일정 기반으로 항상 하루 전 미리 준비합니다.', metric: '특수 기간 매출 +12%' },
      ],
    },
    university: {
      label: '대학가',
      location: '서울 관악구 신림동',
      valueProps: [
        { before: '에너지드링크품절 반복, 당일 대처가 늦어집니다.', after: '학사 일정 기반 수요를 분석해 이틀 전 발주를 제안합니다.', metric: '품절 손실 -40%' },
        { before: '야식 피크 타이밍을 몰라 사전 진열 타이밍을 놓칩니다.', after: '근처 도서관 마감 기반으로 사전 진열 일정을 알림 받습니다.', metric: '야간 매출 +25%' },
        { before: '방학이 시작돼도 수요 하락을 모르고 평소대로 발주합니다.', after: '방학 진입 변동을 즉각 계산하여 권장 발주량을 축소합니다.', metric: '폐기 손실 -25%' },
      ],
    },
    entertainment: {
      label: '유흥가',
      location: '서울 마포구 홍대입구',
      valueProps: [
        { before: '금요일 밤 인기 맥주 품절로, 심야 고객이 대거 이탈합니다.', after: '금토 피크 시간대 수요를 사전에 계산해 부족분을 경고합니다.', metric: '주말 주류 매출 +18%' },
        { before: '클럽 행사를 몰라서, 와인이 밤 10시에 모두 소진됩니다.', after: '레이디스나이트 등 주변 이벤트를 연동하여 재고를 예측합니다.', metric: '이벤트 매출 +24%' },
        { before: '심야 결제 대기가 길어져, 고객 불만과 무단 이탈이 발생합니다.', after: '혼잡 예상 시뮬레이션을 통해 추가 근무 배치를 추천합니다.', metric: '계산 대기시간 -35%' },
      ],
    },
  },
  en: {
    office: {
      label: 'Office',
      location: 'Teheran-ro, Gangnam, Seoul',
      valueProps: [
        { before: 'Prepping the same amount daily leaves you short on peak weekdays', after: 'Get day-of-week pattern analysis and a tailored next-day quantity.', metric: 'Lunch sell-outs once a week or less' },
        { before: 'No way to anticipate overtime demand during close-out season', after: 'Get alerts on overtime peaks based on nearby companies’ schedules.', metric: '+₩120K monthly evening sales' },
        { before: 'Snacks run out, breaking the alcohol cross-sell', after: 'Snack cross-merchandising spots and items optimized daily.', metric: '+₩1,800 average basket' },
      ],
    },
    residential: {
      label: 'Residential',
      location: 'Jamsil-dong, Songpa, Seoul',
      valueProps: [
        { before: 'Cold snaps and rain drain drink and snack stock with no warning.', after: 'Weather-based restock timing recommended per item.', metric: 'Waste and stockout loss -18%' },
        { before: 'Snacks sell out at school dismissal and customers walk away.', after: 'Hourly demand patterns prep displays 1–2 hours ahead.', metric: '+15% afternoon–evening sales' },
        { before: 'You learn of mart closures and holiday demand only same-day.', after: 'Nearby events and schedules let you prep a day ahead, always.', metric: '+12% sales during peaks' },
      ],
    },
    university: {
      label: 'Campus',
      location: 'Sillim-dong, Gwanak, Seoul',
      valueProps: [
        { before: 'Energy drinks keep selling out, with slow same-day response.', after: 'Academic-calendar demand analysis proposes orders two days ahead.', metric: 'Stockout loss -40%' },
        { before: 'Missing the late-night peak means missing display timing.', after: 'Get display schedules based on the nearby library’s closing time.', metric: '+25% late-night sales' },
        { before: 'Break starts but you keep ordering as usual despite the drop.', after: 'Break-onset shifts are factored in to trim recommended orders.', metric: 'Waste loss -25%' },
      ],
    },
    entertainment: {
      label: 'Nightlife',
      location: 'Hongdae, Mapo, Seoul',
      valueProps: [
        { before: 'Popular beer sells out Friday night and late customers leave en masse.', after: 'Fri–Sat peak demand is calculated ahead and shortfalls flagged.', metric: '+18% weekend alcohol sales' },
        { before: 'Unaware of club events, wine sells out by 10 PM.', after: 'Nearby events like ladies’ night are linked to forecast stock.', metric: '+24% event-night sales' },
        { before: 'Long late-night checkout lines cause complaints and walk-offs.', after: 'Congestion simulations recommend extra staffing.', metric: 'Checkout wait time -35%' },
      ],
    },
  },
  jp: {
    office: {
      label: 'オフィス',
      location: 'ソウル 江南区 テヘラン路',
      valueProps: [
        { before: '毎日同じ量を準備するため、ピーク曜日に在庫が不足します', after: '曜日別パターン分析で、前日の数量を変えてご提案します。', metric: 'ランチ品切れ 週1回以下' },
        { before: '決算・締めシーズンの残業需要を事前に知る手段がありません', after: '近隣企業の予定をもとに残業ピークをお知らせします。', metric: '夜の売上 月 +12万ウォン' },
        { before: 'おつまみが切れて、酒類との同時購入につながりません', after: 'おつまみのクロス陳列の位置と品目を毎日最適化します。', metric: '客単価 +1,800ウォン' },
      ],
    },
    residential: {
      label: '住宅街',
      location: 'ソウル 松坡区 蚕室洞',
      valueProps: [
        { before: '寒波・雨天時に飲料・軽食の在庫がなすすべなく切れます。', after: '天気予報をもとに品目別の補充タイミングをご提案します。', metric: '廃棄・品切れ損失 -18%' },
        { before: '下校時間に軽食が品切れし、お客様が引き返します。', after: '時間帯別の需要パターンで1〜2時間前に事前陳列を準備します。', metric: '午後〜夜の売上 +15%' },
        { before: 'スーパー休業日・連休の特需を当日になって把握します。', after: '周辺のイベント・予定をもとに常に前日に準備します。', metric: '特需期間の売上 +12%' },
      ],
    },
    university: {
      label: '大学街',
      location: 'ソウル 冠岳区 新林洞',
      valueProps: [
        { before: 'エナジードリンクの品切れが繰り返し、当日対応が遅れます。', after: '学事日程をもとに需要を分析し、2日前の発注をご提案します。', metric: '品切れ損失 -40%' },
        { before: '夜食ピークのタイミングがわからず、事前陳列を逃します。', after: '近くの図書館の閉館時間をもとに事前陳列の予定をお知らせします。', metric: '夜間の売上 +25%' },
        { before: '休暇が始まっても需要の低下に気づかず通常通り発注します。', after: '休暇入りの変動を即座に計算し、推奨発注量を縮小します。', metric: '廃棄損失 -25%' },
      ],
    },
    entertainment: {
      label: '繁華街',
      location: 'ソウル 麻浦区 弘大入口',
      valueProps: [
        { before: '金曜の夜に人気ビールが品切れし、深夜のお客様が大量に離脱します。', after: '金土のピーク時間帯の需要を事前に計算し、不足分を警告します。', metric: '週末の酒類売上 +18%' },
        { before: 'クラブのイベントを知らず、ワインが夜10時に売り切れます。', after: 'レディースナイトなど周辺イベントを連携し、在庫を予測します。', metric: 'イベント売上 +24%' },
        { before: '深夜の会計待ちが長くなり、不満や無断離脱が発生します。', after: '混雑予測シミュレーションで追加の人員配置をご提案します。', metric: '会計待ち時間 -35%' },
      ],
    },
  },
};

/** Localized area label, with fallback to the data value. */
export function areaLabel(id: string, fallback: string, locale: Locale): string {
  return AREA_I18N[locale]?.[id]?.label ?? fallback;
}

/** Localized area location, with fallback to the data value. */
export function areaLocation(id: string, fallback: string, locale: Locale): string {
  return AREA_I18N[locale]?.[id]?.location ?? fallback;
}

/** Localized value props, with fallback to the data array. */
export function areaValueProps<T extends ValuePropI18n>(id: string, fallback: T[], locale: Locale): ValuePropI18n[] {
  return AREA_I18N[locale]?.[id]?.valueProps ?? fallback;
}

// ── In-component string labels rendered by BriefingMockup (구 LiveDemoSection 포함) ──

export const liveDemoCopy: Record<Locale, {
  eyebrow: string;
  heading: string;
  sub: string;
  tablistLabel: string;
  valueHeading: string;
  valueSubTemplate: (label: string) => string;
  before: string;
  after: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaFootTemplate: (timeLabel: string) => string;
  timeLabels: Record<string, string>;
}> = {
  ko: {
    eyebrow: '라이브 데모',
    heading: '우리 매장에선 이런 액션 제안을 받습니다',
    sub: '상권마다 다른 AI 제안을 확인하세요',
    tablistLabel: '상권 유형 선택',
    valueHeading: '이 브리핑을 받으면...',
    valueSubTemplate: (label) => `${label} 상권 점주님에게 이런 변화가 생깁니다`,
    before: 'Before',
    after: 'After',
    ctaTitle: '7일간의 브리핑을 미리 확인해 보세요',
    ctaDesc: '7일치 실제 운영 제안을 미리 볼 수 있습니다',
    ctaFootTemplate: (timeLabel) => `지금 ${timeLabel} 시각 기준 브리핑입니다 · 시간대마다 내용이 달라져요`,
    timeLabels: { morning: '오전', afternoon: '오후', evening: '저녁' },
  },
  en: {
    eyebrow: 'Live Demo',
    heading: 'Here are the action proposals your store would get',
    sub: 'See how AI proposals differ by trade area',
    tablistLabel: 'Select trade area type',
    valueHeading: 'With this briefing...',
    valueSubTemplate: (label) => `Here’s what changes for a ${label} trade-area owner`,
    before: 'Before',
    after: 'After',
    ctaTitle: 'Preview seven days of briefings',
    ctaDesc: 'See seven days of real operating proposals in advance',
    ctaFootTemplate: (timeLabel) => `Briefing as of the current ${timeLabel} hour · content changes by time of day`,
    timeLabels: { morning: 'morning', afternoon: 'afternoon', evening: 'evening' },
  },
  jp: {
    eyebrow: 'Live Demo',
    heading: '当店ではこのようなアクション提案を受け取ります',
    sub: '商圏ごとに異なるAI提案をご確認ください',
    tablistLabel: '商圏タイプの選択',
    valueHeading: 'このブリーフィングを受け取ると…',
    valueSubTemplate: (label) => `${label}商圏の店主様にこのような変化が生まれます`,
    before: 'Before',
    after: 'After',
    ctaTitle: '7日間のブリーフィングを先にご確認ください',
    ctaDesc: '7日分の実際の運営提案を事前にご覧いただけます',
    ctaFootTemplate: (timeLabel) => `現在 ${timeLabel} 時点のブリーフィングです · 時間帯ごとに内容が変わります`,
    timeLabels: { morning: '午前', afternoon: '午後', evening: '夜' },
  },
};

// ── BriefingMockup in-component card labels ──

export const briefingMockupCopy: Record<Locale, {
  briefingTitleOverride: string;
  briefingTitles: { morning: string; afternoon: string; evening: string };
  briefingTimes: { morning: string; afternoon: string; evening: string };
  weatherTitle: string;
  tipsTitle: string;
  eventsTitle: string;
  checklistTitle: string;
  weekTitle: string;
  weatherAlt: string;
  today: (month: number, date: number, dayIndex: number) => string;
}> = {
  ko: {
    briefingTitleOverride: 'SA 오늘의 브리핑',
    briefingTitles: { morning: 'SA 모닝 브리핑', afternoon: 'SA 오후 체크', evening: 'SA 내일 준비' },
    briefingTimes: { morning: '오전 6:00', afternoon: '오후 12:30', evening: '오후 6:00' },
    weatherTitle: '오늘 날씨',
    tipsTitle: '오늘의 준비 팁',
    eventsTitle: '주변 이벤트 (반경 1km)',
    checklistTitle: '오늘 체크리스트',
    weekTitle: '이번 주 미리보기',
    weatherAlt: '날씨',
    today: (m, d, di) => `${m}월 ${d}일 (${['일', '월', '화', '수', '목', '금', '토'][di]})`,
  },
  en: {
    briefingTitleOverride: 'SA Today’s Briefing',
    briefingTitles: { morning: 'SA Morning Briefing', afternoon: 'SA Afternoon Check', evening: 'SA Tomorrow Prep' },
    briefingTimes: { morning: '6:00 AM', afternoon: '12:30 PM', evening: '6:00 PM' },
    weatherTitle: 'Today’s Weather',
    tipsTitle: 'Today’s Prep Tips',
    eventsTitle: 'Nearby Events (within 1km)',
    checklistTitle: 'Today’s Checklist',
    weekTitle: 'This Week’s Preview',
    weatherAlt: 'Weather',
    today: (m, d, di) => `${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][di]}, ${m}/${d}`,
  },
  jp: {
    briefingTitleOverride: 'SA 今日のブリーフィング',
    briefingTitles: { morning: 'SA モーニングブリーフィング', afternoon: 'SA 午後チェック', evening: 'SA 明日の準備' },
    briefingTimes: { morning: '午前 6:00', afternoon: '午後 12:30', evening: '午後 6:00' },
    weatherTitle: '今日の天気',
    tipsTitle: '今日の準備のヒント',
    eventsTitle: '周辺イベント（半径1km）',
    checklistTitle: '今日のチェックリスト',
    weekTitle: '今週のプレビュー',
    weatherAlt: '天気',
    today: (m, d, di) => `${m}月${d}日 (${['日', '月', '火', '水', '木', '金', '土'][di]})`,
  },
};
