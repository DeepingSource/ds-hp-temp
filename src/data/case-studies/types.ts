/** Golden Case stage — was a fixed slot (1 case = 1 stage); now a classifying tag
 *  (any number of cases per stage). Order = Discover→Verify→Translate→Sync→Re-measure. */
export type GoldenStep = 'discover' | 'verify' | 'translate' | 'sync' | 'remeasure';

export const goldenStepOrder: GoldenStep[] = ['discover', 'verify', 'translate', 'sync', 'remeasure'];

/** 01..05 label prefix, derived from stage order. */
export function goldenStepNo(step: GoldenStep): string {
  return String(goldenStepOrder.indexOf(step) + 1).padStart(2, '0');
}

/** Localized stage name (badge/banner) — matches the original page copy exactly
 *  (note: the Sync stage reads '전파'/'展開', not '동기화'/'同期'). Number stays in code. */
export const goldenStepLabelI18n: Record<'en' | 'ko' | 'jp', Record<GoldenStep, string>> = {
  ko: { discover: '발견', verify: '검증', translate: '번역', sync: '전파', remeasure: '재측정' },
  en: { discover: 'Discover', verify: 'Verify', translate: 'Translate', sync: 'Sync', remeasure: 'Re-measure' },
  jp: { discover: '発見', verify: '検証', translate: '翻訳', sync: '展開', remeasure: '再測定' },
};

export interface CaseMetric {
  label: string;
  value: string;
  verified: boolean;
}

export interface CaseQuote {
  text: string;
  who: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  sub: string;
  context: string;
  industry: string;
  industryIcon: string; // Lucide icon name
  audience: string;
  goldenStep: GoldenStep;
  products: string[];
  before: string;
  after: string;
  metrics: CaseMetric[];
  quotes: CaseQuote[];
  note: string;
  cover?: string;
  coverAlt?: string;
  showAdoptionChart: boolean;
  lang: 'en' | 'ko' | 'jp';
  date: string;
  featured: boolean;
  draft: boolean;
  body?: string; // optional deep-dive MDX
}

export type CaseStudyMeta = Omit<CaseStudy, 'body'>;
