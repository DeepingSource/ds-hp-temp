import type { Locale } from '@/lib/i18n';
import { productPrimary } from '@/lib/brand-canon';

export type FaqGroup = 'common' | 'store-count' | 'store-care' | 'store-insight' | 'store-agent';

/**
 * Section order on /resources/faq — 공통 → 세 모드(매트릭스 순서) → 기능.
 *
 * REORDERED 2026-07-20 (reorg Phase 4): count used to sit first, among the products.
 * Under Function × Mode Matrix v1.0 the products are the three modes and `count` is a
 * FUNCTION, so it now closes the list under a function heading.
 *
 * The GROUP KEYS ARE DELIBERATELY UNCHANGED. They are section anchor ids on
 * /resources/faq (`#store-count`) and the filename prefix of 105 content files —
 * renaming them would break existing deep links for no reader benefit. The axis is
 * carried by order and label instead.
 */
export const faqGroupOrder: FaqGroup[] = ['common', 'store-care', 'store-insight', 'store-agent', 'store-count'];

/** Sub-label placing each section on the matrix — mode (time axis) or function. */
export const faqGroupKind: Record<FaqGroup, Record<Locale, string> | null> = {
  common: null,
  'store-care': { ko: '모드 · 탐지·감지 · 지금', en: 'Mode · Detect · now', jp: 'モード · 検知 · 今' },
  'store-insight': { ko: '모드 · 분석 · 어제', en: 'Mode · Analyze · yesterday', jp: 'モード · 分析 · 昨日' },
  'store-agent': { ko: '모드 · 제안·운영 · 다음', en: 'Mode · Advise · next', jp: 'モード · 提案・運営 · 次' },
  'store-count': { ko: '기능 · 세 모드를 가로지릅니다', en: 'Function · crosses all three modes', jp: '機能 · 3つのモードを横断' },
};

/** Per-group section label + the `?product=` value used by the section CTA. */
export const faqGroupMeta: Record<FaqGroup, { product: string | null; label: Record<Locale, string> }> = {
  common: { product: null, label: { ko: '공통', en: 'Common', jp: '共通' } },
  'store-care': { product: 'StoreCare', label: { ko: productPrimary('care'), en: productPrimary('care'), jp: productPrimary('care') } },
  'store-insight': { product: 'StoreInsight', label: { ko: productPrimary('insight'), en: productPrimary('insight'), jp: productPrimary('insight') } },
  'store-agent': { product: 'StoreAgent', label: { ko: productPrimary('agent'), en: productPrimary('agent'), jp: productPrimary('agent') } },
  // count is a function — label with the function name, not the saai value brand.
  'store-count': { product: 'StoreCount', label: { ko: 'store count', en: 'store count', jp: 'store count' } },
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
