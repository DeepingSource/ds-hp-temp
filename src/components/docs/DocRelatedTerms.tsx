import Link from 'next/link';
import { glossaryBySlug, type GlossaryTerm } from '@/data/glossaryTerms';
import { glossaryCardI18n } from '@/data/glossary-i18n';
import { localeHref, type Locale } from '@/lib/i18n';

const label: Record<Locale, string> = { ko: '관련 용어', en: 'Related terms', jp: '関連用語' };

/** Compact glossary cross-link chips for a doc's `relatedTerms` (DOCS_WIKI_PLAN IA-5). */
export default function DocRelatedTerms({ slugs, locale }: { slugs: string[]; locale: Locale }) {
  const terms = slugs.map((s) => glossaryBySlug[s]).filter((t): t is GlossaryTerm => !!t);
  if (terms.length === 0) return null;

  return (
    <div className="mt-10 border-t border-gray-100 pt-6">
      <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">{label[locale]}</p>
      <div className="flex flex-wrap gap-2">
        {terms.map((term) => {
          const overlay = glossaryCardI18n[term.slug]?.[locale];
          const title = locale === 'ko' ? term.title : (overlay?.title ?? term.title);
          return (
            <Link
              key={term.slug}
              href={localeHref(locale, `/glossary/${term.slug}`)}
              className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/10 transition-colors no-underline"
            >
              {title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
