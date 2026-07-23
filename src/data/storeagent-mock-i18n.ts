// ──────────────────────────────────────────────────────────────────────────────
// i18n overlay for the 3 StoreAgent agent mockups (ActionCard / Chat / Push).
//
// mockup-scenarios/storeagent.ts keeps its shape (icons/colors/timing resolved
// there). This overlay supplies only the RENDERED strings per locale, keyed by
// index, with a fallback to the data value. ko = verbatim; en = concise;
// jp = 丁寧体.
// ──────────────────────────────────────────────────────────────────────────────

import { type Locale } from '@/lib/i18n';
import { canonicalStore, formatWon } from './mockup-scenarios/canonical';

// ── Action Card mockup ──────────────────────────────────────────────────────

interface TodayStatI18n { label: string; value: string }
interface ActionCardI18n {
  title: string;
  reason: string;
  priority: string;
  meta: string;
  statBadges?: { label: string; value: string }[];
}
interface CompletedItemI18n { label: string }

/** export: ActionCardMockup의 content override prop 타입(DeepPartial<ActionCardSet>)이
 *  참조한다 — 컴포넌트가 이 셋을 오버라이드할 수 있게 하려면 타입이 밖에서 보여야 한다. */
export interface ActionCardSet {
  storeName: string;
  headerTitle: string;
  headerSub: string;
  emptyTitle: string;
  emptySub: string;
  hold: string;
  approve: string;
  later: string;
  todayStats: TodayStatI18n[];
  cards: ActionCardI18n[];
  completed: CompletedItemI18n[];
}

const ACTION: Record<Locale, ActionCardSet> = {
  ko: {
    storeName: '강남역점',
    headerTitle: '오늘의 액션 카드',
    headerSub: '목요일 브리핑',
    emptyTitle: '오늘의 검토 완료',
    emptySub: '3건 승인 · 1건 보류 · 1건 대기',
    hold: '보류',
    approve: '승인',
    later: '나중에',
    todayStats: [
      { label: '예상 매출', value: formatWon(canonicalStore.forecastRevenueWon) },
      { label: '미확인 카드', value: '5건' },
      { label: '재고 주의', value: '2종' },
    ],
    cards: [
      { title: '우산·우비 발주 추가 권장', reason: '내일 오후 강수 70%. 비 오는 날 우산 판매 +180% (최근 3개월)', priority: '높음', meta: '자동 발주 수량: 우산 15개 · 우비 8개', statBadges: [{ label: '우산 판매↑', value: '+180%' }, { label: '강수확률', value: '70%' }] },
      { title: '삼각김밥 추가 발주', reason: '현재 재고 12개 · 일 평균 판매 35개 · 오후 3시 품절 예상', priority: '보통', meta: '제안 수량: 40개 (납품처 자동 선택)', statBadges: [{ label: '현재 재고', value: '12개' }, { label: '일 평균', value: '35개' }] },
      { title: '피크타임 인력 추가 배치', reason: '토요일 16~18시 계산 대기 평균 3.2분. 목표(1.5분) 초과', priority: '높음', meta: '추가 인력 1명 배치 → 대기 1.4분 예상', statBadges: [{ label: '현재 대기', value: '3.2분' }, { label: '예상 단축', value: '-56%' }] },
      { title: '음료 1+1 행사 연장 제안', reason: '행사 구역 매출 +34%. AI가 다음 주 행사 POP 포스터를 준비했습니다.', priority: '새 제안', meta: 'A4 + SNS 정방형 2종 자동 완성', statBadges: [{ label: '행사 효과', value: '+34%' }] },
      { title: '봄 시즌 POP 포스터 완성', reason: 'AI가 3월 봄 신상 포스터 디자인을 완성했습니다. 확인 후 인쇄하세요.', priority: '새 제안', meta: '배너·스티커·SNS 카드 3종 포함', statBadges: [{ label: '준비 완료', value: '3종' }] },
    ],
    completed: [
      { label: '우산·우비 발주 승인' },
      { label: '삼각김밥 추가 발주' },
      { label: '인력 1명 추가 배치' },
      { label: '음료 1+1 행사 연장' },
      { label: '봄 시즌 POP 인쇄 요청' },
    ],
  },
  en: {
    storeName: 'Gangnam Stn.',
    headerTitle: 'Today’s action cards',
    headerSub: 'Thursday briefing',
    emptyTitle: 'Today’s review done',
    emptySub: '3 approved · 1 on hold · 1 pending',
    hold: 'Hold',
    approve: 'Approve',
    later: 'Later',
    todayStats: [
      { label: 'Est. sales', value: formatWon(canonicalStore.forecastRevenueWon) },
      { label: 'Open cards', value: '5' },
      { label: 'Low stock', value: '2 items' },
    ],
    cards: [
      { title: 'Order more umbrellas & ponchos', reason: '70% rain tomorrow afternoon. Umbrella sales +180% on rainy days (last 3 months)', priority: 'High', meta: 'Auto order: 15 umbrellas · 8 ponchos', statBadges: [{ label: 'Umbrella sales↑', value: '+180%' }, { label: 'Rain chance', value: '70%' }] },
      { title: 'Reorder rice balls', reason: '12 in stock · 35 sold/day avg · sell-out expected by 3 PM', priority: 'Medium', meta: 'Suggested: 40 (supplier auto-picked)', statBadges: [{ label: 'In stock', value: '12' }, { label: 'Daily avg', value: '35' }] },
      { title: 'Add peak-time staff', reason: 'Sat 4–6 PM checkout wait avg 3.2 min. Over target (1.5 min)', priority: 'High', meta: '+1 staff → 1.4 min expected wait', statBadges: [{ label: 'Current wait', value: '3.2 min' }, { label: 'Est. cut', value: '-56%' }] },
      { title: 'Extend drink 1+1 promo', reason: 'Promo zone sales +34%. AI prepared next week’s promo POP posters.', priority: 'New', meta: 'A4 + 2 square SNS auto-generated', statBadges: [{ label: 'Promo lift', value: '+34%' }] },
      { title: 'Spring POP poster ready', reason: 'AI finished the March spring poster design. Review and print.', priority: 'New', meta: 'Includes banner, sticker, SNS card', statBadges: [{ label: 'Ready', value: '3 types' }] },
    ],
    completed: [
      { label: 'Umbrella & poncho order approved' },
      { label: 'Rice ball reorder' },
      { label: '+1 staff added' },
      { label: 'Drink 1+1 promo extended' },
      { label: 'Spring POP print requested' },
    ],
  },
  jp: {
    storeName: '江南駅店',
    headerTitle: '今日のアクションカード',
    headerSub: '木曜日のブリーフィング',
    emptyTitle: '本日の確認完了',
    emptySub: '3件承認 · 1件保留 · 1件未対応',
    hold: '保留',
    approve: '承認',
    later: '後で',
    todayStats: [
      { label: '予想売上', value: formatWon(canonicalStore.forecastRevenueWon) },
      { label: '未確認カード', value: '5件' },
      { label: '在庫注意', value: '2種' },
    ],
    cards: [
      { title: '傘・レインコートの追加発注を推奨', reason: '明日午後の降水70%。雨の日は傘の販売 +180%（直近3か月）', priority: '高', meta: '自動発注数: 傘15本 · レインコート8着', statBadges: [{ label: '傘販売↑', value: '+180%' }, { label: '降水確率', value: '70%' }] },
      { title: 'おにぎりの追加発注', reason: '現在在庫12個 · 1日平均販売35個 · 午後3時に品切れ見込み', priority: '中', meta: '提案数: 40個（納品先を自動選択）', statBadges: [{ label: '現在在庫', value: '12個' }, { label: '1日平均', value: '35個' }] },
      { title: 'ピーク時の人員追加配置', reason: '土曜16〜18時の会計待ち平均3.2分。目標(1.5分)超過', priority: '高', meta: '人員1名追加 → 待ち時間1.4分の見込み', statBadges: [{ label: '現在の待ち', value: '3.2分' }, { label: '短縮見込み', value: '-56%' }] },
      { title: 'ドリンク1+1キャンペーン延長のご提案', reason: 'キャンペーン区域の売上 +34%。AIが来週のPOPポスターを準備しました。', priority: '新提案', meta: 'A4 + SNS正方形2種を自動作成', statBadges: [{ label: '販促効果', value: '+34%' }] },
      { title: '春シーズンPOPポスター完成', reason: 'AIが3月の春新商品ポスターを完成しました。ご確認のうえ印刷してください。', priority: '新提案', meta: 'バナー・ステッカー・SNSカード3種を含む', statBadges: [{ label: '準備完了', value: '3種' }] },
    ],
    completed: [
      { label: '傘・レインコート発注を承認' },
      { label: 'おにぎりの追加発注' },
      { label: '人員1名を追加配置' },
      { label: 'ドリンク1+1キャンペーン延長' },
      { label: '春シーズンPOP印刷依頼' },
    ],
  },
};

export function getActionCardI18n(locale: Locale): ActionCardSet {
  return ACTION[locale] ?? ACTION.en;
}

// ── Chat mockup ─────────────────────────────────────────────────────────────

interface ChatMsgI18n {
  text: string;
  time: string;
  actionLabel?: string;
  stats?: { label: string; value: string; sub?: string }[];
}

interface ChatSet {
  storeName: string;
  assistant: string;
  subBriefing: string;
  subPeak: string;
  subEvening: string;
  inputPlaceholder: string;
  later: string;
  sendLabel: string;
  scenarios: ChatMsgI18n[][];
}

const CHAT: Record<Locale, ChatSet> = {
  ko: {
    storeName: '강남역점',
    assistant: 'SAAI 어시스턴트',
    subBriefing: '오늘의 브리핑',
    subPeak: '피크타임 분석',
    subEvening: '저녁 재고 점검',
    inputPlaceholder: '사장님, 무엇이 궁금하세요?',
    later: '나중에',
    sendLabel: '메시지 전송',
    scenarios: [
      [
        { text: '안녕하세요, 사장님! 오늘 강남역점 브리핑입니다. 어제 매출 ₩1,243,000 (+11.2%)로 이번 주 최고 기록이에요.', time: '오전 6:00' },
        { text: '내일 오후 2시부터 강수확률 70%. 지난 3개월 비 오는 날 우산 판매 +180%였어요. 우산 15개 · 우비 8개 추가 발주를 권장합니다.', time: '오전 6:01', stats: [{ label: '우산 판매 증가', value: '+180%', sub: '비 오는 날' }, { label: '내일 강수확률', value: '70%' }], actionLabel: '발주 승인' },
        { text: '좋아, 발주해줘. 그리고 오늘 저녁 인기 상품은 뭐야?', time: '오전 6:02' },
        { text: '우산·우비 발주 완료! 내일 오전 10시 입고 예정이에요.\n\n저녁 6~9시 Top3: ①삼각김밥 ②컵라면 ③음료수. 삼각김밥 현재 재고 12개 — 품절 위험 있어요.', time: '오전 6:02', actionLabel: '삼각김밥 추가 발주' },
        { text: '이번 주 음료 1+1 행사 효과: 해당 구역 매출 +34%. AI가 다음 주 행사 POP 포스터를 자동 생성했어요!', time: '오전 6:03', stats: [{ label: '행사 구역 매출', value: '+34%' }], actionLabel: 'POP 포스터 보기' },
      ],
      [
        { text: '사장님, 지난 주 피크타임 분석 결과입니다. 토요일 오후 4-6시에 주간 최고 방문자를 기록했어요.', time: '오후 2:00', stats: [{ label: '피크 시간대', value: '16~18시', sub: '토요일' }, { label: '최고 방문자', value: '95명', sub: '+8.1% 전주' }, { label: '평균 체류', value: '8.3분', sub: '+18%' }] },
        { text: '피크타임에 계산 대기가 너무 길어. 어떻게 해?', time: '오후 2:01' },
        { text: '16~18시 계산 대기 평균 3.2분 — 목표(1.5분) 초과. 인력 1명 추가 배치를 권장합니다.', time: '오후 2:01', stats: [{ label: '현재 대기', value: '3.2분', sub: '목표 초과' }, { label: '3분+ 비율', value: '12%' }], actionLabel: '인력 배치 승인' },
        { text: '승인. 인력 1명 추가해줘.', time: '오후 2:02' },
        { text: '16~18시 추가 인력 배치 완료! 예상 대기 3.2분 → 1.4분으로 단축됩니다.', time: '오후 2:02', stats: [{ label: '배치 완료', value: '+1명' }, { label: '예상 대기', value: '1.4분', sub: '-56%' }] },
      ],
      [
        { text: '사장님, 오늘 저녁 피크 시간대 재고 현황입니다. 삼각김밥 재고 8개로 21시 전 품절이 예상됩니다.', time: '오후 5:30', stats: [{ label: '삼각김밥 재고', value: '8개', sub: '품절 위험' }, { label: '예상 소진', value: '21시', sub: '현재 추세' }], actionLabel: '긴급 발주' },
        { text: '삼각김밥 20개 긴급 발주해줘.', time: '오후 5:31' },
        { text: '삼각김밥 20개 긴급 발주 완료! 예상 입고 시간: 오후 7:30입니다.\n\n참고로 컵라면도 재고 15개 남아 있어요. 오늘 추세면 22시까지 충분합니다.', time: '오후 5:31', stats: [{ label: '발주 완료', value: '20개' }, { label: '입고 예정', value: '19:30' }] },
        { text: '저녁 매출 현황: 현재까지 ₩876,000으로 어제 동시간 대비 +8.5%입니다. 오늘 목표 ₩1,200,000 달성률 73%예요.', time: '오후 5:32', stats: [{ label: '현재 매출', value: '₩876K', sub: '+8.5%' }, { label: '목표 달성률', value: '73%', sub: '₩1.2M 목표' }], actionLabel: '매출 리포트 보기' },
      ],
    ],
  },
  en: {
    storeName: 'Gangnam Stn.',
    assistant: 'SAAI Assistant',
    subBriefing: 'today’s briefing',
    subPeak: 'peak-time analysis',
    subEvening: 'evening stock check',
    inputPlaceholder: 'What can I help you with?',
    later: 'Later',
    sendLabel: 'Send message',
    scenarios: [
      [
        { text: 'Good morning! Here’s today’s Gangnam Stn. briefing. Yesterday’s sales hit ₩1,243,000 (+11.2%) — a weekly high.', time: '6:00 AM' },
        { text: '70% chance of rain from 2 PM tomorrow. Umbrella sales ran +180% on rainy days over the last 3 months. I recommend ordering 15 umbrellas and 8 ponchos.', time: '6:01 AM', stats: [{ label: 'Umbrella sales', value: '+180%', sub: 'rainy days' }, { label: 'Rain tomorrow', value: '70%' }], actionLabel: 'Approve order' },
        { text: 'Sounds good, place the order. And what sells best tonight?', time: '6:02 AM' },
        { text: 'Umbrella & poncho order placed! Arriving 10 AM tomorrow.\n\nTop 3 for 6–9 PM: ①rice balls ②cup noodles ③drinks. Rice balls at 12 in stock — sell-out risk.', time: '6:02 AM', actionLabel: 'Reorder rice balls' },
        { text: 'Drink 1+1 promo this week lifted that zone’s sales +34%. I auto-generated next week’s promo POP posters!', time: '6:03 AM', stats: [{ label: 'Promo zone sales', value: '+34%' }], actionLabel: 'View POP poster' },
      ],
      [
        { text: 'Here’s last week’s peak-time analysis. Saturday 4–6 PM set the weekly visitor high.', time: '2:00 PM', stats: [{ label: 'Peak window', value: '4–6 PM', sub: 'Saturday' }, { label: 'Peak visitors', value: '95', sub: '+8.1% w/w' }, { label: 'Avg. dwell', value: '8.3 min', sub: '+18%' }] },
        { text: 'Checkout lines are too long at peak. What do I do?', time: '2:01 PM' },
        { text: 'Checkout wait at 4–6 PM averages 3.2 min — over the 1.5 min target. I recommend adding 1 staff member.', time: '2:01 PM', stats: [{ label: 'Current wait', value: '3.2 min', sub: 'over target' }, { label: '3 min+ share', value: '12%' }], actionLabel: 'Approve staffing' },
        { text: 'Approved. Add 1 staff.', time: '2:02 PM' },
        { text: 'Extra staff added for 4–6 PM! Expected wait drops 3.2 min → 1.4 min.', time: '2:02 PM', stats: [{ label: 'Staffing', value: '+1' }, { label: 'Est. wait', value: '1.4 min', sub: '-56%' }] },
      ],
      [
        { text: 'Here’s tonight’s peak-hour stock. Rice balls at 8 — sell-out expected before 9 PM.', time: '5:30 PM', stats: [{ label: 'Rice ball stock', value: '8', sub: 'sell-out risk' }, { label: 'Est. sell-out', value: '9 PM', sub: 'current pace' }], actionLabel: 'Urgent order' },
        { text: 'Place an urgent order for 20 rice balls.', time: '5:31 PM' },
        { text: 'Urgent order for 20 rice balls placed! Estimated arrival: 7:30 PM.\n\nFYI cup noodles also at 15 — enough until 10 PM at today’s pace.', time: '5:31 PM', stats: [{ label: 'Ordered', value: '20' }, { label: 'Arrival', value: '7:30 PM' }] },
        { text: 'Evening sales so far: ₩876,000, +8.5% vs. same time yesterday. 73% toward today’s ₩1,200,000 goal.', time: '5:32 PM', stats: [{ label: 'Current sales', value: '₩876K', sub: '+8.5%' }, { label: 'Goal progress', value: '73%', sub: '₩1.2M goal' }], actionLabel: 'View sales report' },
      ],
    ],
  },
  jp: {
    storeName: '江南駅店',
    assistant: 'SAAI アシスタント',
    subBriefing: '今日のブリーフィング',
    subPeak: 'ピーク時間分析',
    subEvening: '夜の在庫チェック',
    inputPlaceholder: 'どのようなことをお探しですか？',
    later: '後で',
    sendLabel: 'メッセージを送信',
    scenarios: [
      [
        { text: 'おはようございます！本日の江南駅店ブリーフィングです。昨日の売上は ₩1,243,000（+11.2%）で今週最高記録でした。', time: '午前 6:00' },
        { text: '明日午後2時から降水確率70%。直近3か月、雨の日は傘の販売が +180% でした。傘15本・レインコート8着の追加発注を推奨します。', time: '午前 6:01', stats: [{ label: '傘販売の増加', value: '+180%', sub: '雨の日' }, { label: '明日の降水確率', value: '70%' }], actionLabel: '発注を承認' },
        { text: 'いいね、発注して。それと今夜の人気商品は？', time: '午前 6:02' },
        { text: '傘・レインコートの発注完了！明日午前10時入荷予定です。\n\n夜6〜9時のTop3: ①おにぎり ②カップ麺 ③飲料。おにぎりは現在在庫12個 — 品切れの恐れがあります。', time: '午前 6:02', actionLabel: 'おにぎりの追加発注' },
        { text: '今週のドリンク1+1キャンペーン効果: 該当区域の売上 +34%。AIが来週のPOPポスターを自動生成しました！', time: '午前 6:03', stats: [{ label: 'キャンペーン区域売上', value: '+34%' }], actionLabel: 'POPポスターを見る' },
      ],
      [
        { text: '先週のピーク時間分析の結果です。土曜午後4〜6時に週間最多来店を記録しました。', time: '午後 2:00', stats: [{ label: 'ピーク時間帯', value: '16〜18時', sub: '土曜日' }, { label: '最多来店', value: '95名', sub: '+8.1% 前週' }, { label: '平均滞在', value: '8.3分', sub: '+18%' }] },
        { text: 'ピーク時の会計待ちが長すぎる。どうすればいい？', time: '午後 2:01' },
        { text: '16〜18時の会計待ちは平均3.2分 — 目標(1.5分)超過。人員1名の追加配置を推奨します。', time: '午後 2:01', stats: [{ label: '現在の待ち', value: '3.2分', sub: '目標超過' }, { label: '3分+の割合', value: '12%' }], actionLabel: '人員配置を承認' },
        { text: '承認。人員を1名追加して。', time: '午後 2:02' },
        { text: '16〜18時の人員追加配置が完了！予想待ち時間が3.2分 → 1.4分に短縮されます。', time: '午後 2:02', stats: [{ label: '配置完了', value: '+1名' }, { label: '予想待ち', value: '1.4分', sub: '-56%' }] },
      ],
      [
        { text: '今夜のピーク時間帯の在庫状況です。おにぎりは在庫8個で、21時前に品切れの見込みです。', time: '午後 5:30', stats: [{ label: 'おにぎり在庫', value: '8個', sub: '品切れの恐れ' }, { label: '消化見込み', value: '21時', sub: '現在の傾向' }], actionLabel: '緊急発注' },
        { text: 'おにぎり20個を緊急発注して。', time: '午後 5:31' },
        { text: 'おにぎり20個の緊急発注が完了！入荷予定時刻: 午後7:30です。\n\nなお、カップ麺も在庫15個あります。今日の傾向なら22時まで十分です。', time: '午後 5:31', stats: [{ label: '発注完了', value: '20個' }, { label: '入荷予定', value: '19:30' }] },
        { text: '夜の売上状況: 現在まで ₩876,000、昨日同時刻比 +8.5%です。本日目標 ₩1,200,000 の達成率73%です。', time: '午後 5:32', stats: [{ label: '現在売上', value: '₩876K', sub: '+8.5%' }, { label: '目標達成率', value: '73%', sub: '₩1.2M 目標' }], actionLabel: '売上レポートを見る' },
      ],
    ],
  },
};

export function getChatI18n(locale: Locale): ChatSet {
  return CHAT[locale] ?? CHAT.en;
}

// ── Push notification mockup ────────────────────────────────────────────────

interface PushI18n { time: string; title: string; body: string }
interface PushSet {
  weekdays: string[];
  lockDate: (weekday: string, month: number, date: number) => string;
  items: PushI18n[];
}

const PUSH: Record<Locale, PushSet> = {
  ko: {
    weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    lockDate: (w, m, d) => `${w}, ${m}월 ${d}일`,
    items: [
      { time: '방금 전', title: '긴급: 음료 냉장고 온도 이상 감지', body: '2번 냉장고 12°C, 기준 초과 — 즉시 확인.' },
      { time: '4분 전', title: '삼각김밥 재고 12개 — 오후 품절 예상', body: '오후 3시 품절 예상. 40개 추가 발주 권장.' },
      { time: '18분 전', title: '내일 강수 70% — 우산·우비 발주 제안', body: '비 오면 우산 +180%. 우산·우비 자동 발주 대기.' },
      { time: '1시간 전', title: '오늘 매출 ₩1,243,000 · 이번 주 최고', body: '어제 대비 +11.2% — 이번 주 최고 매출.' },
    ],
  },
  en: {
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    lockDate: (w, m, d) => `${w}, ${m}/${d}`,
    items: [
      { time: 'now', title: 'Urgent: drink fridge temperature anomaly', body: 'Fridge #2 internal temp 12°C → over the 5°C limit. Check immediately.' },
      { time: '4 min ago', title: 'Rice balls at 12 — afternoon sell-out expected', body: 'At 35 sold/day avg, sell-out by 3 PM. Reorder recommended.' },
      { time: '18 min ago', title: '70% rain tomorrow — order umbrellas & ponchos', body: 'Umbrella sales +180% on rainy days. 15 umbrellas, 8 ponchos queued for auto-order.' },
      { time: '1 hr ago', title: 'Today’s sales ₩1,243,000 · weekly high', body: '+11.2% vs. yesterday. Drink 1+1 promo lifted the drink zone +34%.' },
    ],
  },
  jp: {
    weekdays: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    lockDate: (w, m, d) => `${m}月${d}日 ${w}`,
    items: [
      { time: 'たった今', title: '緊急: 飲料冷蔵庫の温度異常を検知', body: '2番冷蔵庫の内部温度12°C → 許容基準(5°C)超過。直ちにご確認ください。' },
      { time: '4分前', title: 'おにぎり在庫12個 — 午後に品切れ見込み', body: '1日平均販売35個で午後3時に品切れ。追加発注を推奨します。' },
      { time: '18分前', title: '明日の降水70% — 傘・レインコート発注のご提案', body: '雨の日は傘の販売 +180%。傘15本、レインコート8着が自動発注待機中です。' },
      { time: '1時間前', title: '本日の売上 ₩1,243,000 · 今週最高', body: '昨日比 +11.2%。ドリンク1+1キャンペーン効果で飲料区域 +34% 上昇。' },
    ],
  },
};

export function getPushI18n(locale: Locale): PushSet {
  return PUSH[locale] ?? PUSH.en;
}

// ── AgentMockupShowcase section copy ────────────────────────────────────────

export const showcaseCopy: Record<Locale, {
  eyebrow: string;
  heading: string;
  sub: string;
  tablistLabel: string;
  disclaimer: string;
  tabs: { key: 'action' | 'chat' | 'push'; label: string; tagline: string; features: string[] }[];
}> = {
  ko: {
    eyebrow: 'Mobile',
    heading: '모바일에서도 — 손 안의 매장 요약',
    sub: '웹앱의 판단을 그대로 폰에서 — 액션 카드, AI 채팅, 푸시 알림으로.',
    tablistLabel: '인터페이스 유형 선택',
    disclaimer: '* 화면은 예시이며, 실제 서비스와 다를 수 있습니다.',
    tabs: [
      { key: 'action', label: '액션 카드', tagline: 'AI가 오늘 할 일을 정리합니다', features: ['발주 자동 제안 (재고 기반)', '진열 정리·청소 알림 카드', '냉장고 온도 이상 경고'] },
      { key: 'chat', label: 'AI 채팅', tagline: '말하면 바로 실행합니다', features: ['“우산 20개 발주해줘” → 바로 접수', '재고·매출 데이터 바로 조회', '브리핑 요약·날씨 연계 제안'] },
      { key: 'push', label: '푸시 알림', tagline: '이상 상황 감지 시 실시간 알림을 제공합니다', features: ['냉동고 온도 이탈 실시간 알림', '야간 이상 체류 감지 경보', '일일 브리핑 자동 발송'] },
    ],
  },
  en: {
    eyebrow: 'Mobile',
    heading: 'On mobile, too — the store in your hand',
    sub: 'The same calls as the web app, on your phone — action cards, AI chat, push alerts.',
    tablistLabel: 'Select interface type',
    disclaimer: '* Screens are illustrative and may differ from the actual service.',
    tabs: [
      { key: 'action', label: 'Action cards', tagline: 'AI lays out today’s to-dos', features: ['Auto order suggestions (stock-based)', 'Display & cleaning reminder cards', 'Fridge temperature anomaly alerts'] },
      { key: 'chat', label: 'AI chat', tagline: 'Say it, and it’s done', features: ['“Order 20 umbrellas” → taken instantly', 'Instant stock & sales lookups', 'Briefing summaries & weather-linked tips'] },
      { key: 'push', label: 'Push alerts', tagline: 'Real-time alerts when anomalies are detected', features: ['Real-time freezer temperature alerts', 'After-hours anomaly detection', 'Automatic daily briefing delivery'] },
    ],
  },
  jp: {
    eyebrow: 'Mobile',
    heading: 'モバイルでも — 手元の店舗サマリー',
    sub: 'ウェブアプリの判断をそのまま、スマホで — アクションカード、AIチャット、プッシュ通知で。',
    tablistLabel: 'インターフェースタイプの選択',
    disclaimer: '※ 画面はイメージであり、実際のサービスと異なる場合があります。',
    tabs: [
      { key: 'action', label: 'アクションカード', tagline: 'AIが今日のタスクを整理します', features: ['発注の自動提案（在庫ベース）', '陳列整理・清掃のお知らせカード', '冷蔵庫の温度異常を警告'] },
      { key: 'chat', label: 'AIチャット', tagline: '話せばすぐに実行します', features: ['「傘を20本発注して」→ 即受付', '在庫・売上データを即照会', 'ブリーフィング要約・天気連携のご提案'] },
      { key: 'push', label: 'プッシュ通知', tagline: '異常検知時にリアルタイムで通知します', features: ['冷凍庫の温度逸脱をリアルタイム通知', '夜間の異常滞在を検知して警報', '日次ブリーフィングを自動送信'] },
    ],
  },
};
