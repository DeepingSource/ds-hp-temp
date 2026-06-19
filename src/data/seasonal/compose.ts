import type { BriefingScenario } from '../briefingData';
import type { DailyBriefingTemplate, ScenarioInput } from './types';

export function composeBriefing(input: ScenarioInput): BriefingScenario {
  return {
    weather: input.weather,
    tips: input.tips.slice(0, 3),
    events: input.events.slice(0, 2),
    checklist: input.checklist.slice(0, 4),
    weekPreview: input.weekPreview.slice(0, 3),
  };
}

export function day(
  dayIndex: number,
  theme: string,
  input: ScenarioInput,
): DailyBriefingTemplate {
  return { dayIndex, theme, scenario: composeBriefing(input) };
}
