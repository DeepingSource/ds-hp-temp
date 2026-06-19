import Link from 'next/link';
import { ArrowRight, Library } from 'lucide-react';
import { glossaryTerms, glossaryCategoryLabel, type GlossaryCategory } from '@/data/glossaryTerms';
import { glossaryCategoryI18n, glossaryCardI18n } from '@/data/glossary-i18n';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import { crumb } from '@/lib/breadcrumb-labels';
import { type Locale } from '@/lib/i18n';
import { JsonLd, definedTermSet } from '@/lib/structured-data';

const C: Record<Locale, { eyebrow: string; heading: string; sub: (n: number) => string; count: (n: number) => string; setName: string }> = {
  en: {
    eyebrow: 'Glossary',
    heading: 'Privacy AI terms, made easy to understand',
    sub: (n) => `From heatmaps to anonymized CCTV. ${n} core terms explained in plain, on-site language.`,
    count: (n) => `${n} terms`,
    setName: 'DeepingSource Privacy AI Glossary',
  },
  ko: {
    eyebrow: '용어 사전',
    heading: '프라이버시 AI 용어, 쉽게 이해하기',
    sub: (n) => `히트맵부터 익명화 CCTV까지. 총 ${n}개의 핵심 용어를 현장 언어로 설명합니다.`,
    count: (n) => `${n}개`,
    setName: 'DeepingSource 프라이버시 AI 용어 사전',
  },
  jp: {
    eyebrow: '用語集',
    heading: 'プライバシーAIの用語を、やさしく理解する',
    sub: (n) => `ヒートマップから匿名化CCTVまで。全${n}個の主要な用語を現場の言葉で説明します。`,
    count: (n) => `${n}件`,
    setName: 'DeepingSource プライバシーAI 用語集',
  },
};

const categoryColors: Record<GlossaryCategory, { bg: string; text: string; border: string }> = {
  ai: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' },
  analytics: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' },
  retail: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' },
  operations: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' },
};

const grouped = Object.entries(glossaryCategoryLabel).map(([cat, label]) => ({
  cat: cat as GlossaryCategory,
  label,
  terms: glossaryTerms.filter((t) => t.category === cat),
}));

export default function GlossaryView({ locale }: { locale: Locale }) {
  const c = C[locale];
  const setTerms = glossaryTerms.map((term) => {
    const overlay = glossaryCardI18n[term.slug]?.[locale];
    return {
      name: locale === 'ko' ? term.title : (overlay?.title ?? term.title),
      description: locale === 'ko' ? term.definition : (overlay?.definition ?? term.definition),
      path: `/glossary/${term.slug}`,
    };
  });
  return (
    <div className="bg-white min-h-screen">
      <JsonLd
        data={definedTermSet({
          name: c.setName,
          description: c.sub(glossaryTerms.length),
          locale,
          terms: setTerms,
        })}
      />
      {/* Hero */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full" aria-hidden="true" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Breadcrumb items={[{ name: crumb('resources', locale), path: '/resources' }, { name: crumb('glossary', locale), path: '/resources/glossary' }]} locale={locale} tone="dark" className="mb-6" />
          <HeroBadge tone="dark">
            <Library className="w-3.5 h-3.5" />
            {c.eyebrow}
          </HeroBadge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6 break-keep">
            {c.heading}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed break-keep">
            {c.sub(glossaryTerms.length)}
          </p>
        </div>
      </section>

      {/* Terms */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
          {grouped.map(({ cat, label, terms }) => {
            if (terms.length === 0) return null;
            const colors = categoryColors[cat];
            const catLabel = locale === 'ko' ? label : (glossaryCategoryI18n[cat]?.[locale] ?? label);
            return (
              <div key={cat} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-8">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${colors.bg} ${colors.text} border ${colors.border}`}>
                    {catLabel}
                  </span>
                  <div className="h-px flex-1 bg-gray-100" />
                  <span className="text-xs text-gray-500">{c.count(terms.length)}</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {terms.map((term) => {
                    const overlay = glossaryCardI18n[term.slug]?.[locale];
                    const title = locale === 'ko' ? term.title : (overlay?.title ?? term.title);
                    const tagline = locale === 'ko' ? term.tagline : (overlay?.tagline ?? term.tagline);
                    return (
                      <Link
                        key={term.slug}
                        href={`/glossary/${term.slug}`}
                        className="group flex flex-col gap-2 p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] hover:border-gray-200 transition-[box-shadow,border-color] duration-300"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h2 className="text-base font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors">
                            {title}
                          </h2>
                          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-[color,transform] flex-shrink-0 mt-0.5" />
                        </div>
                        <p className="text-xs text-gray-500 font-medium">{term.englishTitle}</p>
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 break-keep mt-1">
                          {tagline}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
