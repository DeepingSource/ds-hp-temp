import { isValidElement } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Languages, Lightbulb, BookOpen } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Breadcrumb from '@/components/ui/Breadcrumb';
import TableOfContents, { MobileTOC } from '@/components/blog/TableOfContents';
import { getHeadings } from '@/components/blog/ArticleRenderer';
import DocRelatedTerms from './DocRelatedTerms';
import { crumb } from '@/lib/breadcrumb-labels';
import { toSlug } from '@/lib/slug';
import { localeHref, type Locale } from '@/lib/i18n';
import { getDocForRoute, getAdjacentDocs } from '@/lib/docs';
import type { Doc } from '@/data/docs/types';
import { docSectionLabelI18n, logicalDocSlug } from '@/data/docs/types';
import DocsSidebar from './DocsSidebar';

/** Extract plain text from MDX heading children (for the anchor id). */
function extractText(node: React.ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (isValidElement(node)) return extractText((node.props as { children?: React.ReactNode }).children);
  return '';
}

const docsCrumb: Record<Locale, string> = { ko: '제품 문서', en: 'Docs', jp: '製品ドキュメント' };
const backLabel: Record<Locale, string> = { ko: '제품 문서로', en: 'Back to docs', jp: '製品ドキュメントへ' };
const relatedLabel: Record<Locale, string> = { ko: '이어서 읽기', en: 'Read next', jp: '続けて読む' };
const updatedLabel: Record<Locale, string> = { ko: '최종 수정', en: 'Updated', jp: '最終更新' };
const ctaTitle: Record<Locale, string> = {
  ko: '문서에서 답을 못 찾으셨나요?',
  en: 'Didn’t find your answer here?',
  jp: 'お探しの答えが見つかりませんでしたか？',
};
const ctaButton: Record<Locale, string> = { ko: '문의하기', en: 'Contact us', jp: 'お問い合わせ' };
const fallbackNotice: Record<'en' | 'jp', string> = {
  en: 'This document is currently available in Korean only. An English version is being prepared.',
  jp: '本ドキュメントは現在、韓国語のみで提供しています。日本語版を準備中です。',
};

const bodyComponents = {
  h2: ({ children, ...p }: React.ComponentProps<'h2'>) => (
    <h2 id={toSlug(extractText(children))} className="mt-12 mb-4 text-xl sm:text-2xl font-bold text-gray-900 scroll-mt-24 break-keep" {...p}>
      {children}
    </h2>
  ),
  h3: (p: React.ComponentProps<'h3'>) => <h3 className="mt-8 mb-3 text-lg font-bold text-gray-900 scroll-mt-24 break-keep" {...p} />,
  p: (p: React.ComponentProps<'p'>) => <p className="my-4 text-gray-600 leading-relaxed break-keep" {...p} />,
  ul: (p: React.ComponentProps<'ul'>) => <ul className="my-4 space-y-2 list-disc pl-5 text-gray-600 break-keep marker:text-primary" {...p} />,
  ol: (p: React.ComponentProps<'ol'>) => <ol className="my-4 space-y-2 list-decimal pl-5 text-gray-600 break-keep marker:text-primary" {...p} />,
  li: (p: React.ComponentProps<'li'>) => <li className="leading-relaxed" {...p} />,
  strong: (p: React.ComponentProps<'strong'>) => <strong className="font-semibold text-gray-800" {...p} />,
  a: (p: React.ComponentProps<'a'>) => <a className="text-primary underline underline-offset-2 hover:text-primary-dark" {...p} />,
  code: (p: React.ComponentProps<'code'>) => <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-gray-800" {...p} />,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  img: (p: React.ComponentProps<'img'>) => <img className="my-5 rounded-lg border border-gray-100 w-full" {...p} />,
  pre: (p: React.ComponentProps<'pre'>) => <pre className="my-5 overflow-x-auto rounded-xl bg-gray-900 p-4 text-sm text-gray-100" {...p} />,
  blockquote: (p: React.ComponentProps<'blockquote'>) => <blockquote className="my-5 border-l-4 border-primary/30 bg-gray-50 px-4 py-3 text-gray-600 [&>p]:my-1 break-keep" {...p} />,
  table: (p: React.ComponentProps<'table'>) => <div className="my-5 overflow-x-auto"><table className="w-full text-sm border-collapse" {...p} /></div>,
  th: (p: React.ComponentProps<'th'>) => <th className="border border-gray-200 bg-gray-50 px-3 py-2 text-left font-semibold text-gray-700" {...p} />,
  td: (p: React.ComponentProps<'td'>) => <td className="border border-gray-200 px-3 py-2 text-gray-600 align-top" {...p} />,
};

export default function DocDetailView({ doc, locale }: { doc: Doc; locale: Locale }) {
  const logical = logicalDocSlug(doc.slug);
  const isFallback = doc.lang !== locale && locale !== 'ko';
  const { prev, next } = getAdjacentDocs(logical, locale);
  const headings = getHeadings(doc.body);

  const related = doc.relatedSlugs
    .map((s) => getDocForRoute(logicalDocSlug(s), locale))
    .filter((d): d is Doc => !!d);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left sidebar — shared section tree */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24">
              <Link
                href={localeHref(locale, '/resources/docs')}
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary mb-6 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> {backLabel[locale]}
              </Link>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-primary" aria-hidden="true" />
                <span className="text-sm font-bold text-gray-900">{docsCrumb[locale]}</span>
              </div>
              <DocsSidebar locale={locale} currentSlug={logical} />
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            <Breadcrumb
              items={[
                { name: crumb('resources', locale), path: '/resources' },
                { name: docsCrumb[locale], path: '/resources/docs' },
                { name: doc.title, path: `/resources/docs/${logical}` },
              ]}
              locale={locale}
              tone="light"
              className="mb-5"
            />
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">
              Docs · {docSectionLabelI18n[locale][doc.section]}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3 break-keep">{doc.title}</h1>
            {doc.updated && (
              <p className="text-xs text-gray-400 mb-6">{updatedLabel[locale]} {doc.updated}</p>
            )}

            {isFallback && (
              <p className="mb-8 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-900 break-keep">
                <Languages className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                {fallbackNotice[locale as 'en' | 'jp']}
              </p>
            )}

            <MobileTOC headings={headings} />

            <div className="text-base">
              <MDXRemote
                source={doc.body}
                components={bodyComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>

            {/* Related glossary terms */}
            <DocRelatedTerms slugs={doc.relatedTerms} locale={locale} />

            {/* Related docs */}
            {related.length > 0 && (
              <div className="mt-12">
                <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">{relatedLabel[locale]}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={localeHref(locale, `/resources/docs/${logicalDocSlug(r.slug)}`)}
                      className="card p-4 block hover:border-primary-light transition-colors"
                    >
                      <h3 className="text-sm font-medium text-gray-900 mb-1">{r.title}</h3>
                      {r.excerpt && <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 break-keep">{r.excerpt}</p>}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Prev / next (auto) */}
            {(prev || next) && (
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {prev ? (
                  <Link href={localeHref(locale, `/resources/docs/${logicalDocSlug(prev.slug)}`)} className="card p-4 flex items-center gap-2 hover:border-primary-light transition-colors">
                    <ArrowLeft className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-sm text-gray-700 truncate">{prev.title}</span>
                  </Link>
                ) : <span />}
                {next ? (
                  <Link href={localeHref(locale, `/resources/docs/${logicalDocSlug(next.slug)}`)} className="card p-4 flex items-center justify-end gap-2 hover:border-primary-light transition-colors text-right">
                    <span className="text-sm text-gray-700 truncate">{next.title}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 shrink-0" />
                  </Link>
                ) : <span />}
              </div>
            )}

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-start gap-3 px-5 py-5 bg-primary/5 border border-primary/10 rounded-xl">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-2">{ctaTitle[locale]}</p>
                <Link href={localeHref(locale, '/contact')} className="btn-primary text-sm">{ctaButton[locale]}</Link>
              </div>
            </div>
          </main>

          {/* Right — in-page table of contents (auto from h2) */}
          <TableOfContents headings={headings} />
        </div>
      </div>
    </div>
  );
}
