import Link from 'next/link';
import { Clock } from 'lucide-react';
import { categoryMeta, categoryLabelI18n } from '@/data/articles/types';
import type { ArticleMeta } from '@/lib/article-metadata';
import { localeHref, type Locale } from '@/lib/i18n';

/**
 * BlogCard — one article card for the /resources/blog index. Presentational and
 * client-safe (no server-only deps) so both the server-rendered first page and the
 * client "load more" island (BlogLoadMore) can render it from the same markup.
 */

const READ_TIME: Record<Locale, (n: number) => string> = {
  ko: (n) => `${n}분`,
  en: (n) => `${n} min`,
  jp: (n) => `${n}分`,
};

function formatDate(dateStr: string): string {
  const [, month, day] = dateStr.split('-');
  return `${month}/${day}`;
}

export default function BlogCard({ article, locale }: { article: ArticleMeta; locale: Locale }) {
  const meta = categoryMeta[article.category] ?? categoryMeta.insight;
  const label = categoryLabelI18n[locale][article.category];
  return (
    <Link
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
            {READ_TIME[locale](article.readTime)}
          </span>
        </div>
      </div>
    </Link>
  );
}
