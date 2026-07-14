import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { glossaryBySlug, type GlossaryTerm } from '@/data/glossaryTerms';
import { glossaryCardI18n } from '@/data/glossary-i18n';
import { localeHref, type Locale } from '@/lib/i18n';

/**
 * RelatedGlossary — a keyword-anchored internal-link section that connects a conversion
 * page (products/solutions/technology hub) to the glossary, strengthening the topic
 * cluster (AEO plan P2-1). Each link's anchor text IS the term title (a searchable
 * keyword) pointing at /glossary/[slug]. Slugs are curated per page by the caller.
 */
const C: Record<Locale, { eyebrow: string; heading: string; all: string }> = {
  en: { eyebrow: 'Learn the terms', heading: 'Key terms, defined', all: 'Browse the full glossary' },
  ko: { eyebrow: '용어 알아보기', heading: '핵심 용어 정의', all: '전체 용어 사전 보기' },
  jp: { eyebrow: '用語を知る', heading: '主要用語の定義', all: '用語辞典をすべて見る' },
};

export default function RelatedGlossary({ slugs, locale }: { slugs: string[]; locale: Locale }) {
  const c = C[locale];
  const terms = slugs
    .map((s) => glossaryBySlug[s])
    .filter((t): t is GlossaryTerm => t !== undefined);
  if (terms.length === 0) return null;

  return (
    <section className="py-16 lg:py-20 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{c.eyebrow}</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 break-keep">{c.heading}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {terms.map((term) => {
            const overlay = glossaryCardI18n[term.slug]?.[locale];
            const title = locale === 'ko' ? term.title : (overlay?.title ?? term.title);
            const tagline = locale === 'ko' ? term.tagline : (overlay?.tagline ?? term.tagline);
            return (
              <Link
                key={term.slug}
                href={localeHref(locale, `/glossary/${term.slug}`)}
                className="group flex items-start justify-between gap-3 p-4 rounded-xl border border-gray-100 hover:border-primary-light hover:shadow-sm transition-[border-color,box-shadow]"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors break-keep">
                    {title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 break-keep line-clamp-2">{tagline}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-[color,transform] flex-shrink-0 mt-0.5" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
        <Link
          href={localeHref(locale, '/resources/glossary')}
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-[gap]"
        >
          {c.all}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
