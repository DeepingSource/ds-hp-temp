import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { getArticlesByCategory } from '@/lib/articles';
import { categoryMeta } from '@/data/articles/types';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: '블로그 | DeepingSource',
  description:
    '프라이버시 AI, 영상 익명화, 공간 데이터 분석에 대한 DeepingSource의 인사이트와 실무 가이드를 확인하세요.',
  alternates: { canonical: '/resources/blog' },
  openGraph: {
    title: '블로그 | DeepingSource',
    description: '프라이버시 AI와 영상 익명화에 대한 인사이트와 실무 가이드.',
    url: '/resources/blog',
  },
};

// 기업 관련 카테고리(인사이트·가이드) 아티클만 노출
const articles = [
  ...getArticlesByCategory('insight'),
  ...getArticlesByCategory('guide'),
].sort((a, b) => b.date.localeCompare(a.date));

function formatDate(dateStr: string): string {
  const [, month, day] = dateStr.split('-');
  return `${month}/${day}`;
}

export default function ResourcesBlogPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-white border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-8">
          <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">Blog</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            인사이트 &amp; 가이드
          </h1>
          <p className="text-gray-500 leading-relaxed max-w-2xl break-keep">
            프라이버시 AI, 영상 익명화, 공간 데이터 분석에 대한 {articles.length}개의 아티클.
          </p>
        </div>
      </section>

      {/* Grid */}
      <AnimatedSection className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article) => {
              const meta = categoryMeta[article.category] ?? categoryMeta.insight;
              return (
                <Link
                  key={article.slug}
                  href={`/resources/blog/${article.slug}`}
                  className="group block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-[box-shadow,border-color] duration-300"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${meta.bgColor} ${meta.color}`}>
                        {meta.label}
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
                        {article.readTime}분
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
