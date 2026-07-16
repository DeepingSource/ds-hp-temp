import { type Locale } from '@/lib/i18n';
import siteContent from '@/data/generated/site-content.json';

/**
 * Translation OVERLAY for /solutions cards + detail pages (en default · ko · jp).
 *
 * Card copy (title/excerpt/impactLabel, and impact for the few cards that translate it)
 * and detail copy (backgroundHeading, cause titles, step titles, result labels) now live
 * per-solution in the Keystatic `solutionPages` collection (content/solutions/*.yaml) as
 * {ko,en,jp} triples, compiled into site-content.json. This module rebuilds the en/jp
 * overlays the views have always consumed: Korean reads straight from solutionsData;
 * missing overlay values fall back to the Korean data value.
 *
 * industryLabel is a fixed taxonomy kept here in code; step productLabel prefixes are
 * derived (uniform per product · locale — verified by scripts/migrate-solutions.mjs).
 */

export const industryLabelI18n: Record<string, Partial<Record<Locale, string>>> = {
  convenience: { en: 'Convenience stores', jp: 'コンビニ' },
  cafe: { en: 'Cafés & restaurants', jp: 'カフェ・飲食店' },
  unmanned: { en: 'Unmanned stores', jp: '無人店舗' },
  drugstore: { en: 'Drugstores', jp: 'ドラッグストア' },
  mart: { en: 'Hypermarkets', jp: '大型スーパー' },
  exhibition: { en: 'Exhibition spaces', jp: '展示空間' },
  logistics: { en: 'Logistics & warehouses', jp: '物流・倉庫' },
  fashion: { en: 'Fashion & apparel', jp: 'ファッション・アパレル' },
};

type Product = 'StoreCare' | 'StoreInsight' | 'StoreAgent';

const PRODUCT_LABEL_I18N: Record<'en' | 'jp', Record<Product, string>> = {
  en: {
    StoreCare: '01 Observe · store care',
    StoreInsight: '02 Analyze · store insight',
    StoreAgent: '03 Act · store agent',
  },
  jp: {
    StoreCare: '01 観察 · store care',
    StoreInsight: '02 分析 · store insight',
    StoreAgent: '03 実行 · store agent',
  },
};

interface Tri {
  ko: string;
  en: string;
  jp: string;
}
interface RawSolution {
  slug: string;
  title: Tri;
  excerpt: Tri;
  impact: Tri;
  impactLabel: Tri;
  background: { heading: Tri };
  causes: { title: Tri }[];
  steps: { product: Product; title: Tri }[];
  results: { label: Tri }[];
}

const raw = (siteContent as unknown as { solutionPages: RawSolution[] }).solutionPages;

type CardOverlay = { title: string; excerpt: string; impactLabel: string; impact?: string };

function cardFor(t: RawSolution, loc: 'en' | 'jp'): CardOverlay | undefined {
  if (!t.title[loc]) return undefined; // no card overlay for this locale
  const o: CardOverlay = { title: t.title[loc], excerpt: t.excerpt[loc], impactLabel: t.impactLabel[loc] };
  if (t.impact[loc]) o.impact = t.impact[loc];
  return o;
}

export const solutionCardI18n: Record<string, Partial<Record<Locale, CardOverlay>>> = Object.fromEntries(
  raw.map((t) => {
    const o: Partial<Record<Locale, CardOverlay>> = {};
    const en = cardFor(t, 'en');
    const jp = cardFor(t, 'jp');
    if (en) o.en = en;
    if (jp) o.jp = jp;
    return [t.slug, o];
  }),
);

type DetailOverlay = {
  backgroundHeading: string;
  causes: string[];
  steps: { title: string; productLabel: string }[];
  results: string[];
};

function detailFor(t: RawSolution, loc: 'en' | 'jp'): DetailOverlay | undefined {
  if (!t.background.heading[loc]) return undefined; // no detail overlay for this locale
  return {
    backgroundHeading: t.background.heading[loc],
    causes: t.causes.map((c) => c.title[loc]),
    steps: t.steps.map((st) => ({ title: st.title[loc], productLabel: PRODUCT_LABEL_I18N[loc][st.product] })),
    results: t.results.map((r) => r.label[loc]),
  };
}

export const solutionDetailI18n: Record<string, Partial<Record<Locale, DetailOverlay>>> = Object.fromEntries(
  raw.map((t) => {
    const o: Partial<Record<Locale, DetailOverlay>> = {};
    const en = detailFor(t, 'en');
    const jp = detailFor(t, 'jp');
    if (en) o.en = en;
    if (jp) o.jp = jp;
    return [t.slug, o];
  }),
);
