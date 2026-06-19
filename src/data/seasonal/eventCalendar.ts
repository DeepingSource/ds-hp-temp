import type { EventBlock } from './types';
import type { AreaId } from './types';

// ===== 고정 이벤트 캘린더 (월/일 기준) =====

interface CalendarEvent {
  month: number;    // 1~12
  day: number;      // 1~31
  areas: AreaId[];  // 해당 상권
  event: EventBlock;
}

// ① 음력 명절 연도별 날짜 테이블 (양력)
// 설날·추석은 음력이라 매년 날짜가 달라지므로 연도별로 관리합니다.
const LUNAR_HOLIDAYS: Record<number, { seollal: [number, number]; chuseok: [number, number] }> = {
  2025: { seollal: [1, 29], chuseok: [10, 6] },
  2026: { seollal: [2, 17], chuseok: [9, 25] },
  2027: { seollal: [2,  7], chuseok: [10, 14] },
  2028: { seollal: [1, 27], chuseok: [10,  2] },
};

const CALENDAR_EVENTS: CalendarEvent[] = [
  // ===== 1월 =====
  {
    month: 1, day: 1, areas: ['office', 'residential', 'university', 'entertainment'],
    event: { icon: '🎆', title: '신정', detail: '새해 첫날', impact: '유동 인구 감소, 편의점 기본 수요 유지' },
  },

  // ===== 2월 =====
  {
    month: 2, day: 14, areas: ['university', 'entertainment', 'residential'],
    event: { icon: '🍫', title: '발렌타인데이', detail: '초콜릿·선물 성수기', impact: '초콜릿·과자류 매출 +35%, 카운터 충동구매 집중' },
  },

  // ===== 3월 =====
  {
    month: 3, day: 14, areas: ['university', 'entertainment', 'residential'],
    event: { icon: '🍬', title: '화이트데이', detail: '사탕·젤리 성수기', impact: '사탕·젤리·아이스크림 수요 +28%' },
  },
  {
    month: 3, day: 1, areas: ['office', 'residential'],
    event: { icon: '🇰🇷', title: '삼일절', detail: '공휴일', impact: '유동인구 감소, 편의점 기본 운영 유지' },
  },

  // ===== 4월 =====
  {
    month: 4, day: 5, areas: ['residential', 'university'],
    event: { icon: '🌸', title: '봄 나들이 시즌', detail: '식목일 전후 나들이 피크', impact: '간편식·음료 수요 +20%, 아이스크림 점진 증가' },
  },

  // ===== 5월 =====
  {
    month: 5, day: 5, areas: ['residential', 'university'],
    event: { icon: '🎠', title: '어린이날', detail: '가족 나들이 성수기', impact: '과자·음료·아이스크림 수요 폭증, 어린이 간식 전진배치' },
  },
  {
    month: 5, day: 8, areas: ['residential', 'office'],
    event: { icon: '🌹', title: '어버이날', detail: '선물 수요 증가', impact: '선물세트·꽃·음료 매출 증가' },
  },
  {
    month: 5, day: 15, areas: ['office', 'university'],
    event: { icon: '📚', title: '스승의날', detail: '감사 선물 시즌', impact: '음료·과자 선물용 수요 소폭 증가' },
  },

  // ===== 6월 =====
  {
    month: 6, day: 6, areas: ['residential', 'office'],
    event: { icon: '🇰🇷', title: '현충일', detail: '공휴일', impact: '유동인구 감소, 냉음료 수요 시작' },
  },
  {
    month: 6, day: 20, areas: ['office', 'residential', 'university', 'entertainment'],
    event: { icon: '☔', title: '장마 시작', detail: '6월 말 ~ 7월 중순 장마', impact: '우산·우의 수요 급증, 습도로 냉음료 수요 상승' },
  },

  // ===== 7월 =====
  {
    month: 7, day: 20, areas: ['university', 'residential', 'entertainment'],
    event: { icon: '🏖️', title: '여름 방학 시작', detail: '초중고대학 방학 시즌', impact: '대학가 유동 -40%, 주거지 낮 수요 증가, 아이스크림 피크' },
  },

  // ===== 8월 =====
  {
    month: 8, day: 15, areas: ['office', 'residential', 'entertainment'],
    event: { icon: '🇰🇷', title: '광복절', detail: '공휴일', impact: '유동인구 감소, 냉음료 피크 수요 유지' },
  },

  // ===== 9월 =====
  {
    month: 9, day: 5, areas: ['university'],
    event: { icon: '📚', title: '2학기 시작', detail: '개강 시즌', impact: '대학가 유동 인구 복귀, 에너지드링크·간편식 수요 급증' },
  },

  // ===== 10월 =====
  {
    month: 10, day: 3, areas: ['residential', 'university'],
    event: { icon: '🇰🇷', title: '개천절', detail: '공휴일', impact: '나들이 수요, 단풍 시즌 음료 수요 증가' },
  },
  {
    month: 10, day: 9, areas: ['office', 'residential'],
    event: { icon: '🇰🇷', title: '한글날', detail: '공휴일', impact: '유동인구 감소, 따뜻한 음료 전환 시작' },
  },
  {
    month: 10, day: 31, areas: ['entertainment', 'university'],
    event: { icon: '🎃', title: '할로윈', detail: '홍대·이태원 핼러윈 축제', impact: '유흥가 심야 트래픽 +50%, 주류·안주·음료 수요 폭증' },
  },

  // ===== 11월 =====
  // 빼빼로데이(11/14)와 수능(11/15)은 대학가 상권에서 동시 탐지됩니다.
  // 두 이벤트가 항상 최상위 2슬롯을 점유하는 것은 의도된 동작입니다.
  {
    month: 11, day: 14, areas: ['university', 'entertainment', 'residential'],
    event: { icon: '🍫', title: '빼빼로데이', detail: '빼빼로 성수기', impact: '빼빼로·과자류 매출 +40%, 카운터 전진배치 필수' },
  },
  {
    month: 11, day: 15, areas: ['university', 'office'],
    event: { icon: '📝', title: '수능 시즌', detail: '대학수학능력시험', impact: '수험생 간식·에너지드링크 수요 급증, 야간 영업 중요' },
  },

  // ===== 12월 =====
  {
    month: 12, day: 25, areas: ['entertainment', 'university', 'residential'],
    event: { icon: '🎄', title: '크리스마스', detail: '연말 시즌', impact: '케이크 예약·선물 수요 피크, 주류·안주 수요 +30%' },
  },
  {
    month: 12, day: 31, areas: ['entertainment', 'university', 'office'],
    event: { icon: '🎉', title: '연말 모임 시즌', detail: '송년회 피크', impact: '야간 주류·안주 수요 최고점, 핫팩 필수 재고' },
  },
];

const WINDOW = 14; // 탐지 범위: ±14일

/**
 * 오늘 날짜 기준 ±14일 이내의 주요 이벤트를 반환합니다.
 * areaId에 해당하는 이벤트만 필터링하며, 최대 2개를 반환합니다.
 */
export function getNearbyEvents(today: Date, areaId: AreaId): EventBlock[] {
  const year = today.getFullYear();
  const results: Array<{ dist: number; event: EventBlock }> = [];

  // 고정 이벤트 탐지
  for (const cal of CALENDAR_EVENTS) {
    if (!cal.areas.includes(areaId)) continue;
    const dist = daysBetween(today, cal.month, cal.day);
    // ③ WINDOW 상수만 사용 (rangeDays 제거로 명확화)
    if (dist <= WINDOW) {
      results.push({ dist, event: cal.event });
    }
  }

  // ① 음력 명절 탐지 (연도별 테이블)
  const lunarDates = LUNAR_HOLIDAYS[year];
  if (lunarDates) {
    const seollalAreas: AreaId[] = ['residential', 'entertainment'];
    const chuseokAreas: AreaId[] = ['residential', 'entertainment'];

    if (seollalAreas.includes(areaId)) {
      const dist = daysBetween(today, lunarDates.seollal[0], lunarDates.seollal[1]);
      if (dist <= WINDOW) {
        results.push({ dist, event: { icon: '🧧', title: '설날 연휴', detail: '민족 대이동 시기', impact: '귀성객 이동, 명절 선물세트·간식 수요 폭증' } });
      }
    }
    if (chuseokAreas.includes(areaId)) {
      const dist = daysBetween(today, lunarDates.chuseok[0], lunarDates.chuseok[1]);
      if (dist <= WINDOW) {
        results.push({ dist, event: { icon: '🌕', title: '추석 연휴', detail: '민족 대이동 시기', impact: '귀성객 이동, 명절 선물세트·간식 수요 폭증' } });
      }
    }
  }

  return results
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 2)
    .map((r) => r.event);
}

/**
 * ② 오늘로부터 특정 월/일까지의 최단 일수를 반환합니다.
 * Date 객체 기반으로 계산해 윤년을 자동으로 처리합니다.
 * 연말↔연초 경계도 올바르게 처리합니다 (예: 12/31 기준 1/2는 dist=2).
 */
function daysBetween(today: Date, month: number, day: number): number {
  const year = today.getFullYear();
  const todayMs = new Date(year, today.getMonth(), today.getDate()).getTime();
  const targetMs = new Date(year, month - 1, day).getTime();
  const diff = Math.abs(Math.round((targetMs - todayMs) / 86_400_000));

  // 연말↔연초 경계: 다음 해 or 전년도 기준으로 계산해 더 가까운 값 선택
  const daysInYear = new Date(year, 1, 29).getMonth() === 1 ? 366 : 365;
  return Math.min(diff, daysInYear - diff);
}
