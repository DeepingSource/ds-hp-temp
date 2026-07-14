import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { glossaryBySlug, type GlossaryTerm } from '@/data/glossaryTerms';
import { industryList, type IndustryMeta } from '@/data/industryList';
import { glossaryCardI18n, glossaryCategoryI18n } from '@/data/glossary-i18n';
import { localeHref, type Locale } from '@/lib/i18n';
import { JsonLd, definedTerm } from '@/lib/structured-data';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';

/**
 * Industry slug → solution hub route. The per-industry pages were consolidated into
 * four solution hubs, so link related industries straight to the matching hub (a
 * keyword-anchored, locale-aware internal link) instead of /industries/* which 301-
 * redirects to the generic /solutions and drops the locale.
 */
const INDUSTRY_SOLUTION: Record<string, string> = {
  convenience: 'retail',
  mart: 'retail',
  fashion: 'retail',
  unmanned: 'retail',
  drugstore: 'drug',
  cafe: 'food-beverage',
  exhibition: 'large-space',
  logistics: 'large-space',
};

const C: Record<
  Locale,
  {
    breadcrumb: string;
    termDefinition: string;
    coreDefinition: string;
    saaiUsage: string;
    viewCase: string;
    relatedIndustries: string;
    relatedTerms: string;
    backToGlossary: string;
    ctaEyebrow: string;
    ctaHeading: (title: string) => string;
    ctaBody: string;
    ctaPrimary: string;
    ctaSecondary: string;
  }
> = {
  en: {
    breadcrumb: 'Glossary',
    termDefinition: 'Term Definition',
    coreDefinition: 'Core Definition',
    saaiUsage: 'How SAAI Uses It',
    viewCase: 'See it in action',
    relatedIndustries: 'Related Industries',
    relatedTerms: 'Related Terms Worth Knowing',
    backToGlossary: 'Back to the full glossary',
    ctaEyebrow: 'Real-World Application',
    ctaHeading: (title) => `Want to bring ${title} to your store?`,
    ctaBody:
      'A specialist consultant will walk you through an adoption plan tailored to your current store environment, free of charge.',
    ctaPrimary: 'Request a free consultation',
    ctaSecondary: 'View solution cases',
  },
  ko: {
    breadcrumb: '용어 사전',
    termDefinition: '용어 정의',
    coreDefinition: '핵심 정의',
    saaiUsage: 'SAAI에서의 활용',
    viewCase: '실제 적용 사례 보기',
    relatedIndustries: '관련 업종',
    relatedTerms: '함께 알아두면 좋은 용어',
    backToGlossary: '전체 용어 사전으로 돌아가기',
    ctaEyebrow: '실제 적용',
    ctaHeading: (title) => `${title}을(를) 우리 매장에 적용하고 싶으신가요?`,
    ctaBody: '전문 컨설턴트가 현재 매장 환경에 맞는 도입 방안을 무료로 안내해 드립니다.',
    ctaPrimary: '무료 상담 신청',
    ctaSecondary: '솔루션 사례 보기',
  },
  jp: {
    breadcrumb: '用語辞典',
    termDefinition: '用語の定義',
    coreDefinition: '基本定義',
    saaiUsage: 'SAAIでの活用',
    viewCase: '実際の活用事例を見る',
    relatedIndustries: '関連業種',
    relatedTerms: '併せて知っておきたい用語',
    backToGlossary: '用語辞典の一覧へ戻る',
    ctaEyebrow: '実際の活用',
    ctaHeading: (title) => `${title}を自店舗に導入してみませんか？`,
    ctaBody: '専門コンサルタントが、現在の店舗環境に合わせた導入プランを無料でご案内します。',
    ctaPrimary: '無料相談を申し込む',
    ctaSecondary: 'ソリューション事例を見る',
  },
};

export default function GlossaryDetailView({ term, locale }: { term: GlossaryTerm; locale: Locale }) {
  const c = C[locale];
  const overlay = glossaryCardI18n[term.slug]?.[locale];

  const title = locale === 'ko' ? term.title : (overlay?.title ?? term.title);
  const tagline = locale === 'ko' ? term.tagline : (overlay?.tagline ?? term.tagline);
  const definition = locale === 'ko' ? term.definition : (overlay?.definition ?? term.definition);
  const categoryLabel =
    locale === 'ko' ? term.categoryLabel : (glossaryCategoryI18n[term.category]?.[locale] ?? term.categoryLabel);

  const relatedTermObjects = term.relatedTerms
    .map((s) => glossaryBySlug[s])
    .filter((x): x is GlossaryTerm => x !== undefined);
  const relatedIndustryObjects = term.relatedIndustries
    .map((s) => industryList.find((i) => i.slug === s))
    .filter((x): x is IndustryMeta => x !== undefined);

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={definedTerm({ name: title, description: definition, path: `/glossary/${term.slug}`, locale })} />

      {/* ── 상단 내비 ── */}
      <div className="pt-20 pb-4 bg-slate-50 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { name: crumb('resources', locale), path: '/resources' },
              { name: crumb('glossary', locale), path: '/resources/glossary' },
              { name: title, path: `/glossary/${term.slug}` },
            ]}
            locale={locale}
            tone="light"
            className="mb-3"
          />
          <div className="mb-4">
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary-lighter text-primary-dark">
              {categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-gray-500" aria-hidden="true" />
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{c.termDefinition}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-1 break-keep">
            {title}
          </h1>
          <p className="text-base text-gray-500 font-medium mb-3">{term.englishTitle}</p>
          <p className="text-base text-gray-600 break-keep">{tagline}</p>
        </div>
      </div>

      {/* ── 본문 ── */}
      <article className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* 핵심 정의 박스 */}
          <div className="p-6 rounded-2xl bg-primary-lighter border border-primary-light mb-10">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">{c.coreDefinition}</p>
            <p className="text-base text-gray-800 leading-relaxed break-keep">{definition}</p>
          </div>

          {/* 섹션별 본문 */}
          <div className="space-y-10">
            {term.body.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-bold text-gray-900 mb-4 break-keep">{section.heading}</h2>
                <div className="space-y-4">
                  {section.paragraphs.map((para, i) => (
                    <p key={i} className="text-gray-600 leading-relaxed break-keep">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* SAAI 활용 박스 */}
          <div className="mt-12 p-6 rounded-2xl bg-gray-950 text-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <p className="text-sm font-medium text-primary uppercase tracking-wide">{c.saaiUsage}</p>
            </div>
            <p className="text-gray-300 leading-relaxed break-keep text-sm sm:text-base">{term.saaiUsage}</p>
            <Link
              href={localeHref(locale, '/contact')}
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-xl text-sm hover:bg-primary-dark transition-colors"
            >
              {c.viewCase}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 관련 업종 */}
          {relatedIndustryObjects.length > 0 && (
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">{c.relatedIndustries}</h3>
              <div className="flex flex-wrap gap-2">
                {relatedIndustryObjects.map((ind) => (
                  <Link
                    key={ind.slug}
                    href={localeHref(locale, INDUSTRY_SOLUTION[ind.slug] ? `/solutions/${INDUSTRY_SOLUTION[ind.slug]}` : '/solutions')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors"
                  >
                    {ind.label}
                    <ArrowRight className="w-3 h-3 opacity-50" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 관련 용어 */}
          {relatedTermObjects.length > 0 && (
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">{c.relatedTerms}</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {relatedTermObjects.map((rel) => {
                  const relOverlay = glossaryCardI18n[rel.slug]?.[locale];
                  const relTitle = locale === 'ko' ? rel.title : (relOverlay?.title ?? rel.title);
                  return (
                    <Link
                      key={rel.slug}
                      href={`/glossary/${rel.slug}`}
                      className="group flex items-center justify-between gap-3 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-[border-color,box-shadow]"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                          {relTitle}
                        </p>
                        <p className="text-xs text-gray-500">{rel.englishTitle}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-[color,transform] flex-shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* 용어 사전 돌아가기 */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link
              href={localeHref(locale, '/resources/glossary')}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {c.backToGlossary}
            </Link>
          </div>
        </div>
      </article>

      {/* ── CTA ── */}
      <section className="py-16 bg-slate-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{c.ctaEyebrow}</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-keep">
            {c.ctaHeading(title)}
          </h2>
          <p className="text-gray-500 mb-8 break-keep">{c.ctaBody}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={localeHref(locale, '/contact')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-colors text-sm w-full sm:w-auto"
            >
              {c.ctaPrimary}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={localeHref(locale, '/solutions')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-gray-200 text-gray-700 font-medium rounded-2xl hover:bg-gray-50 transition-colors text-sm w-full sm:w-auto"
            >
              {c.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
