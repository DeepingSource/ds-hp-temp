import { type Locale } from '@/lib/i18n';

/**
 * Localized overlay for `areaTypes` (briefingData) rendered strings.
 *
 * briefingData is multi-consumer (incl. minisite) and MUST NOT be edited, so
 * this overlay carries only the area fields actually rendered by
 * POSAnalysisSection — currently just `label` — keyed by area id. The ko values
 * are verbatim. Components fall back to the original label when a key is missing.
 */
export const areaLabelI18n: Record<string, Record<Locale, string>> = {
  office: { ko: '오피스', en: 'Office', jp: 'オフィス' },
  residential: { ko: '주택', en: 'Residential', jp: '住宅' },
  university: { ko: '대학가', en: 'University', jp: '大学街' },
  entertainment: { ko: '유흥가', en: 'Nightlife', jp: '繁華街' },
};

/** Resolve a localized area label, falling back to the original. */
export function getAreaLabel(id: string, locale: Locale, fallback: string): string {
  return areaLabelI18n[id]?.[locale] ?? fallback;
}
