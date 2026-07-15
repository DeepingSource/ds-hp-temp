import type { Locale } from '@/lib/i18n';

export type FaqGroup = 'common' | 'store-care' | 'store-insight' | 'store-agent';

/** Section order on /resources/faq. */
export const faqGroupOrder: FaqGroup[] = ['common', 'store-care', 'store-insight', 'store-agent'];

/** Per-group section label + the `?product=` value used by the section CTA. */
export const faqGroupMeta: Record<FaqGroup, { product: string | null; label: Record<Locale, string> }> = {
  common: { product: null, label: { ko: '공통', en: 'Common', jp: '共通' } },
  'store-care': { product: 'StoreCare', label: { ko: 'store care', en: 'store care', jp: 'store care' } },
  'store-insight': { product: 'StoreInsight', label: { ko: 'store insight', en: 'store insight', jp: 'store insight' } },
  'store-agent': { product: 'StoreAgent', label: { ko: 'store agent', en: 'store agent', jp: 'store agent' } },
};

export interface Faq {
  slug: string;
  question: string;
  group: FaqGroup;
  order: number;
  lang: Locale;
  draft: boolean;
  body: string; // answer MDX
}

export type FaqMeta = Omit<Faq, 'body'>;

/** URL/logical slug shared across locales (strips the -en/-jp file suffix). */
export function logicalFaqSlug(fileSlug: string): string {
  return fileSlug.replace(/-(en|jp)$/, '');
}
