import Link from 'next/link';
import { Clock } from 'lucide-react';
import { getBlogArticles } from '@/lib/articles';
import { categoryMeta, categoryLabelI18n } from '@/data/articles/types';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { localeHref, type Locale } from '@/lib/i18n';

/**
 * BlogIndexView — locale-scoped corporate blog index.
 * Each locale renders only its own `lang` articles (no cross-locale fallback);
 * en/jp show an empty "coming soon" state until their content is authored.
 */

const C: Record<Locale, {
  eyebrow: string;
  heading: string;
  sub: (n: number) => string;
  readTime: (n: number) => string;
  emptyTitle: string;
  emptyBody: string;
}> = {
  ko: {
    eyebrow: 'Blog',
    heading: '인사이트 & 가이드',
    sub: (n) => `프라이버시 AI, 영상 익명화, 공간 데이터 분석에 대한 ${n}개의 아티클.`,
    readTime: (n) => `${n}분`,
    emptyTitle: '콘텐츠를 준비하고 있습니다',
    emptyBody: '곧 새로운 인사이트와 가이드로 찾아뵙겠습니다.',
  },
  en: {
    eyebrow: 'Blog',
    heading: 'Insights & Guides',
    sub: (n) => `${n} articles on privacy AI, video anonymization, and spatial data.`,
    readTime: (n) => `${n} min`,
    emptyTitle: 'Content is on the way',
    emptyBody: 'New insights and guides are coming soon.',
  },
  jp: {
    eyebrow: 'Blog',
    heading: 'インサイト＆ガイド',
    sub: (n) => `プライバシーAI・映像の匿名化・空間データ分析に関する${n}件の記事。`,
    readTime: (n) => `${n}分`,
    emptyTitle: 'コンテンツを準備中です',
    emptyBody: '新しいインサイトとガイドをまもなくお届けします。',
  },
};

function formatDate(dateStr: string): string {
  const [, month, day] = dateStr.split('-');
  return `${month}/${day}`;
}

export default function BlogIndexView({ locale }: { locale: Locale }) {
  const t = C[locale];
  const articles = getBlogArticles(locale);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-white border-b border-gray-100">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-8">
          <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.eyebrow}</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            {t.heading}
          </h1>
          <p className="text-gray-500 leading-relaxed max-w-2xl break-keep">
            {t.sub(articles.length)}
          </p>
        </div>
      </section>

      {/* Grid / empty state */}
      <AnimatedSection className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {articles.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-16">
              <h2 className="text-lg font-bold text-gray-900 mb-2 break-keep">{t.emptyTitle}</h2>
              <p className="text-sm text-gray-500 leading-relaxed break-keep">{t.emptyBody}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((article) => {
                const meta = categoryMeta[article.category] ?? categoryMeta.insight;
                const label = categoryLabelI18n[locale][article.category];
                return (
                  <Link
                    key={article.slug}
                    href={localeHref(locale, `/resources/blog/${article.slug}`)}
                    className="group block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-[box-shadow,border-color] duration-300"
                  >
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${meta.bgColor} ${meta.color}`}>
                          {label}
                        </span>
                        <span className="text-xs text-gray-500">{formatDate(article.date)}</span>
                      </div>
                      <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug break-keep">
                        {article.title}
                      </h2>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2 break-keep">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 overflow-hidden">
                          {article.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md truncate">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <span className="flex items-center gap-1 text-xs text-gray-500 shrink-0 ml-2">
                          <Clock className="w-3 h-3" />
                          {t.readTime(article.readTime)}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}
