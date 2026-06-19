/**
 * #19 AgentDaySimulator 분기 데이터 (MOCKUP_PROPOSALS_v5 §4)
 *
 * 결과 = SIM_BASE + Σ(선택별 delta). 8조합 모두 결산 1줄 사전 확정.
 * 모든 수치는 canonical 파생. 보류(hold)가 항상 손해는 아니게 설계 —
 * "AI가 강요하지 않는다"는 메시지(umbrella·staffing 보류는 delta 0 + 관찰 노트).
 */

import { canonicalStore } from './canonical';
import type { Locale } from '@/lib/i18n';

/** 결산 베이스 일매출 = 강남역점 예상 일매출 (₩1,245,000) */
export const SIM_BASE: number = canonicalStore.forecastRevenueWon;

export type SimCardId = 'umbrella' | 'onigiri' | 'staffing';
export type SimChoice = 'approve' | 'hold';

/** 카드별 효과 (원). approve = 승인 시 가산, holdDelta = 보류 시 가감(0이면 손해 아님) */
export const SIM_DELTAS: Record<SimCardId, { approve: number; holdDelta: number }> = {
  umbrella: { approve: 38_000, holdDelta: 0 },       // 보류해도 손해 아님 (관찰만)
  onigiri:  { approve: 21_000, holdDelta: -14_000 }, // 보류 시 품절 기회손실
  staffing: { approve: 17_000, holdDelta: 0 },       // 보류해도 손해 아님 (관찰만)
};

/** 결과 일매출 계산: BASE + 카드별 (승인 approve / 보류 holdDelta) 합산 */
export function simTotal(choices: Record<SimCardId, SimChoice>): number {
  return (Object.keys(SIM_DELTAS) as SimCardId[]).reduce<number>((sum, id) => {
    const d = SIM_DELTAS[id];
    return sum + (choices[id] === 'approve' ? d.approve : d.holdDelta);
  }, SIM_BASE);
}

/** 8조합 키: [umbrella][onigiri][staffing] 승인=1 보류=0 */
export function simComboKey(choices: Record<SimCardId, SimChoice>): string {
  return (['umbrella', 'onigiri', 'staffing'] as SimCardId[])
    .map((id) => (choices[id] === 'approve' ? '1' : '0'))
    .join('');
}

interface SimCopy {
  /** 카드 타이틀·승인효과·보류노트 */
  cards: Record<SimCardId, { title: string; approveNote: string; holdNote: string }>;
  /** 8조합 결산 1줄 (키 = simComboKey) */
  combos: Record<string, string>;
  intro: { heading: string; sub: string; start: string };
  decide: { approve: string; hold: string };
  calculating: string;
  result: { heading: string; vsBase: string; again: string; cta: string; disclaimer: string };
}

export const SIM_COPY: Record<Locale, SimCopy> = {
  ko: {
    cards: {
      umbrella: { title: '우산·우비 발주 추가', approveNote: '강수 대비 우산 매출 +₩38,000', holdNote: '오후 강수 — 우산 문의 9건 놓침 (매출 영향 없음)' },
      onigiri:  { title: '삼각김밥 추가 발주',   approveNote: '품절 방지 +₩21,000',        holdNote: '15시 품절 — 기회손실 −₩14,000' },
      staffing: { title: '피크 인력 1명 배치',   approveNote: '대기 단축 +₩17,000',        holdNote: '대기 3.2분 유지 — 이탈 2건 추정 (매출 영향 없음)' },
    },
    combos: {
      '111': '세 제안 모두 승인 — 오늘 할 수 있는 최선의 하루입니다.',
      '110': '발주는 챙겼지만 피크 대기는 그대로 — 저녁 손님이 조금 빠졌어요.',
      '101': '날씨·인력은 봤지만 삼각김밥이 15시에 품절됐습니다.',
      '100': '우산만 챙긴 하루 — 점심 기회를 일부 놓쳤습니다.',
      '011': '재고·인력은 탄탄했지만, 비 오는 오후 우산이 부족했어요.',
      '010': '삼각김밥만 — 날씨와 피크 대응은 다음 기회로.',
      '001': '인력만 배치 — 발주 2건은 보류했습니다.',
      '000': '오늘은 관망 — 강요하지 않는 게 에이전트의 자리입니다.',
    },
    intro: { heading: '오늘 에이전트가 3가지를 제안합니다', sub: '점주님이 결정하세요. 결정과 책임은 사람의 자리입니다.', start: '시작' },
    decide: { approve: '승인', hold: '보류' },
    calculating: '하루를 시뮬레이션하는 중…',
    result: { heading: '오늘의 강남역점', vsBase: '베이스 대비', again: '다시 해보기', cta: '내 매장으로 계산해보기', disclaimer: '* 이 결과는 사전 정의된 시나리오 분기입니다.' },
  },
  en: {
    cards: {
      umbrella: { title: 'Reorder umbrellas', approveNote: 'Rain-day umbrella sales +₩38,000', holdNote: 'Afternoon rain — 9 umbrella requests missed (no revenue impact)' },
      onigiri:  { title: 'Reorder rice balls', approveNote: 'Stock-out avoided +₩21,000',     holdNote: 'Sold out at 3 PM — opportunity loss −₩14,000' },
      staffing: { title: 'Add 1 peak-time staff', approveNote: 'Shorter wait +₩17,000',       holdNote: 'Wait stays at 3.2 min — est. 2 walk-offs (no revenue impact)' },
    },
    combos: {
      '111': 'All three approved — the best day you could run today.',
      '110': 'Orders covered, but peak wait stayed — a few evening guests slipped away.',
      '101': 'Weather and staffing handled, but rice balls sold out at 3 PM.',
      '100': 'Umbrellas only — part of the lunch opportunity missed.',
      '011': 'Stock and staffing solid, but short on umbrellas in the afternoon rain.',
      '010': 'Rice balls only — weather and peak left for next time.',
      '001': 'Staffing only — the two orders were held.',
      '000': 'A watch-and-wait day — not forcing it is the agent’s place.',
    },
    intro: { heading: 'The agent proposes three things today', sub: 'You decide. Decisions and accountability stay with people.', start: 'Start' },
    decide: { approve: 'Approve', hold: 'Hold' },
    calculating: 'Simulating the day…',
    result: { heading: 'Gangnam Stn. today', vsBase: 'vs base', again: 'Try again', cta: 'Estimate for my store', disclaimer: '* This result is a pre-defined scenario branch.' },
  },
  jp: {
    cards: {
      umbrella: { title: '傘・カッパの追加発注', approveNote: '降雨対応で傘売上 +₩38,000', holdNote: '午後の降雨 — 傘の問い合わせ9件を逃す（売上影響なし）' },
      onigiri:  { title: 'おにぎりの追加発注',   approveNote: '欠品防止 +₩21,000',        holdNote: '15時に欠品 — 機会損失 −₩14,000' },
      staffing: { title: 'ピーク時に人員1名',     approveNote: '待ち時間短縮 +₩17,000',    holdNote: '待ち3.2分のまま — 離脱2件と推定（売上影響なし）' },
    },
    combos: {
      '111': '三つの提案すべてを承認 — 今日できる最善の一日です。',
      '110': '発注は押さえたが、ピークの待ちはそのまま — 夜の客が少し離れました。',
      '101': '天気と人員は見たが、おにぎりが15時に欠品しました。',
      '100': '傘だけの一日 — 昼の機会を一部逃しました。',
      '011': '在庫・人員は万全でしたが、雨の午後に傘が不足しました。',
      '010': 'おにぎりだけ — 天気とピーク対応は次の機会に。',
      '001': '人員のみ配置 — 発注2件は保留しました。',
      '000': '今日は様子見 — 強要しないのがエージェントの役目です。',
    },
    intro: { heading: '本日エージェントが3つを提案します', sub: '店主が決定してください。決定と責任は人の役目です。', start: '開始' },
    decide: { approve: '承認', hold: '保留' },
    calculating: '一日をシミュレーション中…',
    result: { heading: '本日の江南駅店', vsBase: 'ベース比', again: 'もう一度', cta: '自分の店舗で計算する', disclaimer: '※ この結果は事前定義のシナリオ分岐です。' },
  },
};
