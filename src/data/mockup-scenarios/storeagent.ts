// ──────────────────────────────────────────────────────────────────────────────
// StoreAgent mockup scenario data
// Extracted from ActionCardMockup, ChatMockup, PushNotificationMockup
// ──────────────────────────────────────────────────────────────────────────────

// ── Action Card types & data ─────────────────────────────────────────────────

export interface ActionCardStatBadge {
  label: string;
  value: string;
  up?: boolean;
}

/** Pure data for a single action card (icon resolved by component via `iconKey`). */
export interface ActionCardData {
  iconKey: string;
  iconColor: string;
  iconBg: string;
  title: string;
  reason: string;
  priority: string;
  priorityColor: string;
  meta: string;
  statBadges?: ActionCardStatBadge[];
}

/** Action cards displayed in the briefing mockup. */
export const actionCards: ActionCardData[] = [
  {
    iconKey: 'CloudRain',
    iconColor: 'text-sky-500',
    iconBg: 'bg-sky-50',
    title: '우산·우비 발주 추가 권장',
    reason: '내일 오후 강수 70%. 비 오는 날 우산 판매 +180% (최근 3개월)',
    priority: '높음',
    priorityColor: 'text-red-600 bg-red-50',
    meta: '자동 발주 수량: 우산 15개 · 우비 8개',
    statBadges: [
      { label: '우산 판매↑', value: '+180%', up: true },
      { label: '강수확률', value: '70%' },
    ],
  },
  {
    iconKey: 'ShoppingCart',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
    title: '삼각김밥 추가 발주',
    reason: '현재 재고 12개 · 일 평균 판매 35개 · 오후 3시 품절 예상',
    priority: '보통',
    priorityColor: 'text-amber-600 bg-amber-50',
    meta: '제안 수량: 40개 (납품처 자동 선택)',
    statBadges: [
      { label: '현재 재고', value: '12개', up: false },
      { label: '일 평균', value: '35개' },
    ],
  },
  {
    iconKey: 'Users',
    iconColor: 'text-violet-600',
    iconBg: 'bg-violet-50',
    title: '피크타임 인력 추가 배치',
    reason: '토요일 16~18시 계산 대기 평균 3.2분. 목표(1.5분) 초과',
    priority: '높음',
    priorityColor: 'text-red-600 bg-red-50',
    meta: '추가 인력 1명 배치 → 대기 1.4분 예상',
    statBadges: [
      { label: '현재 대기', value: '3.2분', up: false },
      { label: '예상 단축', value: '-56%', up: true },
    ],
  },
  {
    iconKey: 'Tag',
    iconColor: 'text-rose-500',
    iconBg: 'bg-rose-50',
    title: '음료 1+1 행사 연장 제안',
    reason: '행사 구역 매출 +34%. AI가 다음 주 행사 POP 포스터를 준비했습니다.',
    priority: '새 제안',
    priorityColor: 'text-primary bg-primary/10',
    meta: 'A4 + SNS 정방형 2종 자동 완성',
    statBadges: [
      { label: '행사 효과', value: '+34%', up: true },
    ],
  },
  {
    iconKey: 'Palette',
    iconColor: 'text-pink-500',
    iconBg: 'bg-pink-50',
    title: '봄 시즌 POP 포스터 완성',
    reason: 'AI가 3월 봄 신상 포스터 디자인을 완성했습니다. 확인 후 인쇄하세요.',
    priority: '새 제안',
    priorityColor: 'text-primary bg-primary/10',
    meta: '배너·스티커·SNS 카드 3종 포함',
    statBadges: [
      { label: '준비 완료', value: '3종' },
    ],
  },
];

/** Completed-state items shown after all cards are dismissed. */
export interface CompletedItemData {
  iconKey: string;
  label: string;
  color: string;
}

export const completedItems: CompletedItemData[] = [
  { iconKey: 'CloudRain', label: '우산·우비 발주 승인', color: 'text-sky-500' },
  { iconKey: 'ShoppingCart', label: '삼각김밥 추가 발주', color: 'text-emerald-600' },
  { iconKey: 'Users', label: '인력 1명 추가 배치', color: 'text-violet-600' },
  { iconKey: 'Tag', label: '음료 1+1 행사 연장', color: 'text-rose-500' },
  { iconKey: 'Palette', label: '봄 시즌 POP 인쇄 요청', color: 'text-pink-500' },
];

// ── Chat Mockup types & data ─────────────────────────────────────────────────

export interface ChatStatChip {
  label: string;
  value: string;
  sub?: string;
  up?: boolean;
}

export interface ChatAction {
  iconKey: string;
  label: string;
  color: string;
}

/** A single chat message (icon resolved by component via `action.iconKey`). */
export interface ChatMessageData {
  role: 'ai' | 'user';
  text: string;
  time: string;
  action?: ChatAction;
  stats?: ChatStatChip[];
}

/** Scenario 1: weather & inventory ordering. */
const chatScenario1: ChatMessageData[] = [
  {
    role: 'ai',
    text: '안녕하세요, 사장님! 오늘 강남역점 브리핑입니다. 어제 매출 ₩1,243,000 (+11.2%)로 이번 주 최고 기록이에요.',
    time: '오전 6:00',
  },
  {
    role: 'ai',
    text: '내일 오후 2시부터 강수확률 70%. 지난 3개월 비 오는 날 우산 판매 +180%였어요. 우산 15개 · 우비 8개 추가 발주를 권장합니다.',
    time: '오전 6:01',
    stats: [
      { label: '우산 판매 증가', value: '+180%', up: true, sub: '비 오는 날' },
      { label: '내일 강수확률', value: '70%' },
    ],
    action: { iconKey: 'CloudRain', label: '발주 승인', color: 'bg-sky-500' },
  },
  {
    role: 'user',
    text: '좋아, 발주해줘. 그리고 오늘 저녁 인기 상품은 뭐야?',
    time: '오전 6:02',
  },
  {
    role: 'ai',
    text: '우산·우비 발주 완료! 내일 오전 10시 입고 예정이에요.\n\n저녁 6~9시 Top3: ①삼각김밥 ②컵라면 ③음료수. 삼각김밥 현재 재고 12개 — 품절 위험 있어요.',
    time: '오전 6:02',
    action: { iconKey: 'ShoppingCart', label: '삼각김밥 추가 발주', color: 'bg-emerald-500' },
  },
  {
    role: 'ai',
    text: '이번 주 음료 1+1 행사 효과: 해당 구역 매출 +34%. AI가 다음 주 행사 POP 포스터를 자동 생성했어요!',
    time: '오전 6:03',
    stats: [
      { label: '행사 구역 매출', value: '+34%', up: true },
    ],
    action: { iconKey: 'TrendingUp', label: 'POP 포스터 보기', color: 'bg-rose-500' },
  },
];

/** Scenario 2: peak-time staffing analysis. */
const chatScenario2: ChatMessageData[] = [
  {
    role: 'ai',
    text: '사장님, 지난 주 피크타임 분석 결과입니다. 토요일 오후 4-6시에 주간 최고 방문자를 기록했어요.',
    time: '오후 2:00',
    stats: [
      { label: '피크 시간대', value: '16~18시', sub: '토요일' },
      { label: '최고 방문자', value: '95명', up: true, sub: '+8.1% 전주' },
      { label: '평균 체류', value: '8.3분', up: true, sub: '+18%' },
    ],
  },
  {
    role: 'user',
    text: '피크타임에 계산 대기가 너무 길어. 어떻게 해?',
    time: '오후 2:01',
  },
  {
    role: 'ai',
    text: '16~18시 계산 대기 평균 3.2분 — 목표(1.5분) 초과. 인력 1명 추가 배치를 권장합니다.',
    time: '오후 2:01',
    stats: [
      { label: '현재 대기', value: '3.2분', up: false, sub: '목표 초과' },
      { label: '3분+ 비율', value: '12%', up: false },
    ],
    action: { iconKey: 'Users', label: '인력 배치 승인', color: 'bg-violet-500' },
  },
  {
    role: 'user',
    text: '승인. 인력 1명 추가해줘.',
    time: '오후 2:02',
  },
  {
    role: 'ai',
    text: '16~18시 추가 인력 배치 완료! 예상 대기 3.2분 → 1.4분으로 단축됩니다.',
    time: '오후 2:02',
    stats: [
      { label: '배치 완료', value: '+1명', up: true },
      { label: '예상 대기', value: '1.4분', up: true, sub: '-56%' },
    ],
  },
];

/** Scenario 3: evening inventory management. */
const chatScenario3: ChatMessageData[] = [
  {
    role: 'ai',
    text: '사장님, 오늘 저녁 피크 시간대 재고 현황입니다. 삼각김밥 재고 8개로 21시 전 품절이 예상됩니다.',
    time: '오후 5:30',
    stats: [
      { label: '삼각김밥 재고', value: '8개', up: false, sub: '품절 위험' },
      { label: '예상 소진', value: '21시', sub: '현재 추세' },
    ],
    action: { iconKey: 'ShoppingCart', label: '긴급 발주', color: 'bg-rose-500' },
  },
  {
    role: 'user',
    text: '삼각김밥 20개 긴급 발주해줘.',
    time: '오후 5:31',
  },
  {
    role: 'ai',
    text: '삼각김밥 20개 긴급 발주 완료! 예상 입고 시간: 오후 7:30입니다.\n\n참고로 컵라면도 재고 15개 남아 있어요. 오늘 추세면 22시까지 충분합니다.',
    time: '오후 5:31',
    stats: [
      { label: '발주 완료', value: '20개', up: true },
      { label: '입고 예정', value: '19:30' },
    ],
  },
  {
    role: 'ai',
    text: '저녁 매출 현황: 현재까지 ₩876,000으로 어제 동시간 대비 +8.5%입니다. 오늘 목표 ₩1,200,000 달성률 73%예요.',
    time: '오후 5:32',
    stats: [
      { label: '현재 매출', value: '₩876K', up: true, sub: '+8.5%' },
      { label: '목표 달성률', value: '73%', sub: '₩1.2M 목표' },
    ],
    action: { iconKey: 'TrendingUp', label: '매출 리포트 보기', color: 'bg-primary' },
  },
];

/** All chat scenarios cycled by ChatMockup. */
export const chatScenarios: ChatMessageData[][] = [chatScenario1, chatScenario2, chatScenario3];

/** Chat animation timing constants. */
export const CHAT_INTERVAL_MS = 700;
export const CHAT_PAUSE_MS = 4000;

// ── Push Notification types & data ───────────────────────────────────────────

/** A single push notification (icon resolved by component via `iconKey`). */
export interface PushNotificationData {
  appBg: string;
  iconKey: string;
  time: string;
  title: string;
  body: string;
  priorityBar: string;
}

/** Push notifications displayed on the lock screen mockup. */
export const pushNotifications: PushNotificationData[] = [
  {
    appBg: 'bg-red-500',
    iconKey: 'AlertTriangle',
    time: '방금 전',
    title: '긴급: 음료 냉장고 온도 이상 감지',
    body: '2번 냉장고 내부 온도 12°C → 허용 기준(5°C) 초과. 즉시 확인 필요.',
    priorityBar: 'bg-red-500',
  },
  {
    appBg: 'bg-amber-500',
    iconKey: 'BarChart2',
    time: '4분 전',
    title: '삼각김밥 재고 12개 — 오후 품절 예상',
    body: '일평균 판매 35개 기준 오후 3시 품절. 추가 발주를 권장합니다.',
    priorityBar: 'bg-amber-400',
  },
  {
    appBg: 'bg-sky-500',
    iconKey: 'CloudRain',
    time: '18분 전',
    title: '내일 강수 70% — 우산·우비 발주 제안',
    body: '비 오는 날 우산 판매 +180%. 우산 15개, 우비 8개 자동 발주 대기 중.',
    priorityBar: 'bg-gray-300',
  },
  {
    appBg: 'bg-violet-500',
    iconKey: 'TrendingUp',
    time: '1시간 전',
    title: '오늘 매출 ₩1,243,000 · 이번 주 최고',
    body: '어제 대비 +11.2%. 음료 1+1 행사 효과로 음료 구역 +34% 상승.',
    priorityBar: 'bg-gray-300',
  },
];

/** Push notification animation timing constants. */
export const PUSH_INTERVAL_MS = 900;
export const PUSH_PAUSE_MS = 3500;

// ── #17 AlertFatigueComparison — legacy CCTV noise pool ──────────────────────
/**
 * 좌패널 "Legacy CCTV alerts" 노이즈 풀 (영문 우선, D6).
 * 의미 없는 일반 알림이 반복·범람하는 모습을 보이기 위한 12종 — 의도적으로 generic.
 * 우패널의 정제된 actionCards(3장)와 대비.
 */
export const alertNoisePool: string[] = [
  'Motion detected — Zone A',
  'Camera 02 — person entered frame',
  'Loitering threshold exceeded — Aisle 3',
  'Motion detected — Entrance',
  'Object left in frame — Counter',
  'Camera 04 — person exited frame',
  'Crowd density rising — Zone B',
  'Motion detected — Storage',
  'Dwell time over 60s — Shelf 2',
  'Camera 01 — motion in restricted area',
  'Queue length changed — Register',
  'Motion detected — Zone C',
];
