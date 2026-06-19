import { getCurrentSeason, getWeekDates, getWeekTitle } from '@/lib/timeUtils';
import type { TimeSlot } from '@/lib/timeUtils';
import type { BriefingScenario } from '../briefingData';
import type { AreaId, SeasonScenarios } from './types';
import { winterScenarios } from './winter';
import { springScenarios } from './spring';
import { summerScenarios } from './summer';
import { autumnScenarios } from './autumn';
import { getMonthlyWeather } from './catalog/weather';
import { getNearbyEvents } from './eventCalendar';

export interface DailyBriefing {
  day: string;
  date: string;
  theme: string;
  scenario: BriefingScenario;
}

export interface WeeklyAreaSample {
  areaId: string;
  weekTitle: string;
  days: DailyBriefing[];
}

const scenarioMap: Record<string, SeasonScenarios> = {
  winter: winterScenarios,
  spring: springScenarios,
  summer: summerScenarios,
  autumn: autumnScenarios,
};

const AREA_IDS: AreaId[] = ['office', 'residential', 'university', 'entertainment'];

/**
 * 시간대별로 의미 있는 시나리오 인덱스를 선택합니다.
 * 단순히 요일 인덱스를 쓰는 대신 실제 시간대 패턴을 반영합니다.
 * morning=월 (주간 시작, 발주·점검 포커스)
 * afternoon=수 (주중 오후, 피크 대응 포커스)
 * evening=금 (주말 전야, 심야·주류 포커스)
 */
const TIME_SLOT_DAY: Record<TimeSlot, number> = {
  morning: 0,    // 월요일 시나리오
  afternoon: 2,  // 수요일 시나리오
  evening: 4,    // 금요일 시나리오
};

export function buildWeeklySamples(): WeeklyAreaSample[] {
  const season = getCurrentSeason();
  const weekDates = getWeekDates();
  const weekTitle = getWeekTitle();
  const scenarios = scenarioMap[season];

  return AREA_IDS.map((areaId) => {
    const templates = scenarios[areaId];
    const days: DailyBriefing[] = templates.map((t) => {
      const dateInfo = weekDates[t.dayIndex] ?? weekDates[0];
      return {
        day: dateInfo.day,
        date: dateInfo.date,
        theme: t.theme,
        scenario: t.scenario,
      };
    });

    return { areaId, weekTitle, days };
  });
}

/**
 * 현재 날짜·시간·상권에 맞는 브리핑 시나리오를 반환합니다.
 *
 * 정적 시즌 시나리오를 기반으로:
 * 1. 현재 월에 맞는 날씨로 교체 (getMonthlyWeather)
 * 2. 오늘 기준 ±14일 내 이벤트가 있으면 상위에 주입 (getNearbyEvents)
 */
export function getSeasonalScenario(areaId: AreaId, timeSlot: TimeSlot): BriefingScenario {
  const season = getCurrentSeason();
  const scenarios = scenarioMap[season];
  const templates = scenarios[areaId] ?? scenarios.office;
  const base = templates[TIME_SLOT_DAY[timeSlot]].scenario;

  const today = new Date();
  const month = today.getMonth() + 1;

  // 1. 현재 월 날씨로 교체
  const weather = getMonthlyWeather(month);

  // 2. 가까운 이벤트 주입 (있으면 기존 events 앞에 합침, 최대 2개 유지)
  const nearbyEvents = getNearbyEvents(today, areaId);
  const events =
    nearbyEvents.length > 0
      ? [...nearbyEvents, ...base.events].slice(0, 2)
      : base.events;

  return { ...base, weather, events };
}
