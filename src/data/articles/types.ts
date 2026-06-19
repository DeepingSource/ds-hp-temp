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
}

export type ArticleMeta = Omit<Article, 'body'>;

export const categoryMeta: Record<ArticleCategory, { label: string; color: string; bgColor: string }> = {
  guide: { label: '가이드', color: 'text-emerald-700', bgColor: 'bg-emerald-50' },
  'case-study': { label: '케이스스터디', color: 'text-blue-700', bgColor: 'bg-blue-50' },
  insight: { label: '인사이트', color: 'text-violet-700', bgColor: 'bg-violet-50' },
  weekly: { label: '주간 브리핑', color: 'text-gray-600', bgColor: 'bg-gray-50' },
};
