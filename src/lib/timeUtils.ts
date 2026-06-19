import type { Locale } from '@/lib/i18n';

export type TimeSlot = 'morning' | 'afternoon' | 'evening';

export function getTimeSlot(): TimeSlot {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  return 'evening';
}

export function getTimeLabel(slot: TimeSlot): string {
  const labels: Record<TimeSlot, string> = {
    morning: '오전',
    afternoon: '오후',
    evening: '저녁',
  };
  return labels[slot];
}

export function getBriefingTitle(slot: TimeSlot): string {
  const titles: Record<TimeSlot, string> = {
    morning: 'SA 모닝 브리핑',
    afternoon: 'SA 오후 체크',
    evening: 'SA 내일 준비',
  };
  return titles[slot];
}

export function getBriefingTime(slot: TimeSlot): string {
  const times: Record<TimeSlot, string> = {
    morning: '오전 6:00',
    afternoon: '오후 12:30',
    evening: '오후 6:00',
  };
  return times[slot];
}

export function getToday(locale: Locale = 'ko'): string {
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const WD: Record<Locale, string[]> = {
    ko: ['일', '월', '화', '수', '목', '금', '토'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    jp: ['日', '月', '火', '水', '木', '金', '土'],
  };
  const day = WD[locale][now.getDay()];
  if (locale === 'en') {
    const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day}, ${MON[now.getMonth()]} ${date}`;
  }
  if (locale === 'jp') return `${month}月${date}日(${day})`;
  return `${month}월 ${date}일 (${day})`;
}

// --- Season & Week Utilities ---

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export function getCurrentSeason(): Season {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

export interface WeekDateInfo {
  date: string;
  day: string;
  dayIndex: number;
}

export function getWeekDates(): WeekDateInfo[] {
  const now = new Date();
  const currentDay = now.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);

  const dayLabels = ['월', '화', '수', '목', '금', '토', '일'];

  return dayLabels.map((label, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return {
      date: `${d.getMonth() + 1}/${d.getDate()} (${label})`,
      day: label,
      dayIndex: i,
    };
  });
}

export function getWeekTitle(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  // 월요일 기준 주차 계산: 해당 월 1일의 요일 오프셋을 반영
  const firstDayOfWeek = new Date(year, now.getMonth(), 1).getDay();
  const offset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // 월요일=0
  const weekNum = Math.ceil((now.getDate() + offset) / 7);
  const weekLabels = ['첫째', '둘째', '셋째', '넷째', '다섯째'];
  return `${year}년 ${month}월 ${weekLabels[weekNum - 1] || `${weekNum}째`} 주`;
}
