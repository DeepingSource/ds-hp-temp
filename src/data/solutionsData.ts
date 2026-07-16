import siteContent from '@/data/generated/site-content.json';

export interface SolutionCause {
  title: string;
  desc: string;
}

export interface SolutionStep {
  product: 'StoreCare' | 'StoreInsight' | 'StoreAgent';
  productLabel: string;
  productColor: 'emerald' | 'violet' | 'blue';
  title: string;
  desc: string;
}

export interface SolutionResult {
  stat: string;
  label: string;
}

export interface SolutionPage {
  slug: string;
  industry: string;
  industryLabel: string;
  title: string;
  excerpt: string;
  impact: string;
  impactLabel: string;
  problem: string;
  background: {
    heading: string;
    body: string;
  };
  causes: SolutionCause[];
  steps: SolutionStep[];
  results: SolutionResult[];
  relatedTerms: string[];
  relatedSolutions: string[];
  metaDescription: string;
}

type Product = SolutionStep['product'];

/**
 * Source of truth = the Keystatic `solutionPages` collection (content/solutions/*.yaml),
 * compiled into site-content.json by gen-site-content. This module derives the
 * ko-canonical SolutionPage[] the app has always consumed; en/jp card+detail copy lives
 * in the same entries and is surfaced via solutions-i18n.ts. Views/routes/JSON-LD are
 * unchanged. productLabel/productColor (per product) and industryLabel(KO) (per industry)
 * are uniform, so they are recomputed here — verified against the pre-migration data by
 * scripts/migrate-solutions.mjs (deepStrictEqual gate).
 */
const PRODUCT_LABEL_KO: Record<Product, string> = {
  StoreCare: '01 관찰 · store care',
  StoreInsight: '02 분석 · store insight',
  StoreAgent: '03 실행 · store agent',
};
const PRODUCT_COLOR: Record<Product, SolutionStep['productColor']> = {
  StoreCare: 'emerald',
  StoreInsight: 'violet',
  StoreAgent: 'blue',
};
const INDUSTRY_LABEL_KO: Record<string, string> = {
  convenience: '편의점',
  cafe: '카페·음식점',
  unmanned: '무인매장',
  drugstore: '드럭스토어',
  mart: '대형마트',
  exhibition: '전시 공간',
  logistics: '물류·창고',
  fashion: '패션·의류',
};

interface Tri {
  ko: string;
  en: string;
  jp: string;
}
interface RawSolution {
  slug: string;
  order: number;
  industry: string;
  title: Tri;
  excerpt: Tri;
  impact: Tri;
  impactLabel: Tri;
  problem: string;
  background: { heading: Tri; body: string };
  causes: { title: Tri; desc: string }[];
  steps: { product: Product; title: Tri; desc: string }[];
  results: { stat: string; label: Tri }[];
  metaDescription: string;
  relatedTerms: string[];
  relatedSolutions: string[];
}

const raw = (siteContent as unknown as { solutionPages: RawSolution[] }).solutionPages;

export const solutionsData: SolutionPage[] = raw.map((s) => ({
  slug: s.slug,
  industry: s.industry,
  industryLabel: INDUSTRY_LABEL_KO[s.industry] ?? s.industry,
  title: s.title.ko,
  excerpt: s.excerpt.ko,
  impact: s.impact.ko,
  impactLabel: s.impactLabel.ko,
  problem: s.problem,
  background: { heading: s.background.heading.ko, body: s.background.body },
  causes: s.causes.map((c) => ({ title: c.title.ko, desc: c.desc })),
  steps: s.steps.map((st) => ({
    product: st.product,
    productLabel: PRODUCT_LABEL_KO[st.product],
    productColor: PRODUCT_COLOR[st.product],
    title: st.title.ko,
    desc: st.desc,
  })),
  results: s.results.map((r) => ({ stat: r.stat, label: r.label.ko })),
  relatedTerms: s.relatedTerms,
  relatedSolutions: s.relatedSolutions,
  metaDescription: s.metaDescription,
}));

export const solutionsBySlug: Record<string, SolutionPage> = Object.fromEntries(
  solutionsData.map((s) => [s.slug, s]),
);

export const solutionsByIndustry: Record<string, SolutionPage[]> = solutionsData.reduce(
  (acc, s) => {
    if (!acc[s.industry]) acc[s.industry] = [];
    acc[s.industry].push(s);
    return acc;
  },
  {} as Record<string, SolutionPage[]>,
);
