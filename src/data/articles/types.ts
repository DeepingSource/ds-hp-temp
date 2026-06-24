export type ArticleCategory = 'guide' | 'case-study' | 'insight' | 'weekly';

/** Categories shown in blog UI (weekly excluded — newsletter only) */
export const blogCategories: ArticleCategory[] = ['guide', 'case-study', 'insight'];

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  date: string;
  readTime: number;
  tags: string[];
  icon: string; // Lucide icon name
  body: string; // raw MDX content
  relatedSlugs?: string[];
  lang: 'en' | 'ko' | 'jp'; // content language (Velite frontmatter, default 'ko')
  target?: 'company' | 'saai'; // distribution target (Velite frontmatter)
}

export type ArticleMeta = Omit<Article, 'body'>;

export const categoryMeta: Record<ArticleCategory, { label: string; color: string; bgColor: string }> = {
  guide: { label: '가이드', color: 'text-emerald-700', bgColor: 'bg-emerald-50' },
  'case-study': { label: '케이스스터디', color: 'text-primary-dark', bgColor: 'bg-primary-lighter' },
  insight: { label: '인사이트', color: 'text-violet-700', bgColor: 'bg-violet-50' },
  weekly: { label: '주간 브리핑', color: 'text-gray-600', bgColor: 'bg-gray-50' },
};

/** Localized category labels (colors stay in categoryMeta). */
export const categoryLabelI18n: Record<'en' | 'ko' | 'jp', Record<ArticleCategory, string>> = {
  ko: { guide: '가이드', 'case-study': '케이스스터디', insight: '인사이트', weekly: '주간 브리핑' },
  en: { guide: 'Guide', 'case-study': 'Case study', insight: 'Insight', weekly: 'Weekly' },
  jp: { guide: 'ガイド', 'case-study': 'ケーススタディ', insight: 'インサイト', weekly: 'ウィークリー' },
};
