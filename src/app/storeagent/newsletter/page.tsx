import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import { getArticlesByCategory } from '@/lib/articles';
import NewsletterForm from '@/components/ui/NewsletterForm';

export const metadata: Metadata = {
  title: '뉴스레터 아카이브 | StoreAgent',
  description:
    'AI가 정리한 편의점 운영 인사이트를 매주 이메일로 받아보세요. 지난 뉴스레터를 모아볼 수 있습니다.',
};

export default function NewsletterArchivePage() {
  const issues = getArticlesByCategory('weekly');

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Subscribe CTA */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
            Newsletter
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            매주 월요일, 편의점 운영 인사이트
          </h1>
          <p className="text-gray-600 mb-6">
            AI가 정리한 이번 주 편의점 트렌드를 매주 이메일로 받아보세요
          </p>
          <div className="max-w-sm mx-auto">
            <NewsletterForm />
          </div>
        </div>

        {/* Archive list */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">지난 뉴스레터</h2>

          {issues.length === 0 ? (
            <p className="text-gray-500 text-center py-12">
              아직 발행된 뉴스레터가 없습니다.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {issues.map((issue) => (
                <li key={issue.slug}>
                  <Link
                    href={`/blog/${issue.slug}`}
                    className="flex items-center gap-4 py-4 px-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                      <FileText className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-medium text-gray-900 truncate group-hover:text-primary transition-colors">
                        {issue.title}
                      </span>
                      {issue.excerpt && (
                        <span className="block text-xs text-gray-500 truncate mt-0.5">
                          {issue.excerpt}
                        </span>
                      )}
                    </span>
                    <time
                      dateTime={issue.date}
                      className="flex-shrink-0 text-xs text-gray-500 tabular-nums"
                    >
                      {formatDate(issue.date)}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function formatDate(dateStr: string): string {
  const parts = dateStr.split('-');
  if (parts.length < 3) return dateStr;
  return `${parseInt(parts[1])}/${parseInt(parts[2])}`;
}
