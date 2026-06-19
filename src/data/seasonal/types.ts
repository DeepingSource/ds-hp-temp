import type { BriefingScenario } from '../briefingData';

export type AreaId = 'office' | 'residential' | 'university' | 'entertainment';

export interface DailyBriefingTemplate {
  dayIndex: number; // 0=월 ~ 6=일
  theme: string;
  scenario: BriefingScenario;
}

export type SeasonScenarios = Record<AreaId, DailyBriefingTemplate[]>;

// --- Building Block Types ---

export interface WeatherBlock {
  temp: string;
  warning: string;
  icon: string;
}

export interface EventBlock {
  icon: string;
  title: string;
  detail: string;
  impact: string;
}

export interface TipBlock {
  text: string;
  action: string;
}

export interface ScenarioInput {
  weather: WeatherBlock;
  tips: TipBlock[];
  events: EventBlock[];
  checklist: string[];
  weekPreview: string[];
}
