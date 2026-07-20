import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { solutionsData } from '@/data/solutionsData';
import { industryList } from '@/data/industryList';
import { industryLabelI18n, solutionCardI18n } from '@/data/solutions-i18n';
import { localeHref, type Locale } from '@/lib/i18n';
import RelatedGlossary from '@/components/corporate/RelatedGlossary';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import WordRise from '@/components/ui/WordRise';
import SolutionsExplorer, { type ExplorerGroup } from '@/components/corporate/SolutionsExplorer';
import { crumb } from '@/lib/breadcrumb-labels';
import siteContent from '@/data/generated/site-content.json';

/**
 * SolutionsView — shared problem-solution catalog (index) composition.
 * Rendered by `/solutions` (en), `/ko/solutions`, `/jp/solutions` with the locale
 * prop (PLAN_v1.1 D6 path-prefix i18n).
 *
 * Flow (feedback #6.1): a lighter hero + a stepwise SolutionsExplorer (industry →
 * problem → detail) that shows one industry at a time, instead of scrolling all
 * industries at once. Card content comes from shared data; only page-authored copy
 * is localized (industry labels / solution cards via the i18n overlay).
 */

type SolutionsCopy = {
  badge: string;
  heroTitle: string[];
  heroSub: string;
  viewSolution: string;
  ctaEyebrow: string;
  ctaTitle: string[];
  ctaSub: string[];
  ctaPrimary: string;
  ctaSecondary: string;
};

// Copy lives in the CMS (content/site/solutions.yaml → generated JSON).
const SOLUTIONS = siteContent.solutions as Record<Locale, SolutionsCopy>;

// 업종별 그룹핑 (structure — has solutions only)
const grouped = industryList.map((ind) => ({
  industry: ind,
  solutions: solutionsData.filter((s) => s.industry === ind.slug),
})).filter((g) => g.solutions.length > 0);

export default function SolutionsView({ locale }: { locale: Locale }) {
  const t = SOLUTIONS[locale];

  // i18n overlay: Korean uses the shared data values as-is; other locales use the
  // overlay and fall back to the Korean data value when an entry is missing.
  const indLabel = (slug: string, fallback: string) =>
    locale === 'ko' ? fallback : (industryLabelI18n[slug]?.[locale] ?? fallback);
  const card = (slug: string) =>
    locale === 'ko' ? null : solutionCardI18n[slug]?.[locale];

  // Resolve serializable groups for the client explorer (icon/color/hero are looked
  // up from industryList by slug inside the component).
  const groups: ExplorerGroup[] = grouped.map(({ industry, solutions }) => ({
    slug: industry.slug,
    label: indLabel(industry.slug, industry.label),
    solutions: solutions.map((sol) => {
      const c = card(sol.slug);
      return {
        slug: sol.slug,
        impact: c?.impact ?? sol.impact,
        impactLabel: c?.impactLabel ?? sol.impactLabel,
        title: c?.title ?? sol.title,
        excerpt: c?.excerpt ?? sol.excerpt,
      };
    }),
  }));

  return (
    <div className="bg-white min-h-screen">

      {/* ── 히어로 ── */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden bg-surface-dark">
        {/* photo background — anonymized shoppers in detection brackets (the SAAI brand visual) */}
        <Image
          src="/images/solutions-hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* dark scrim keeps the centered white text legible over the bright scene */}
        <div className="absolute inset-0 bg-surface-dark/80" aria-hidden="true" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden="true"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full" aria-hidden="true" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Breadcrumb items={[{ name: crumb('solutions', locale), path: '/solutions' }]} locale={locale} tone="dark" className="mb-6" />
          <HeroBadge tone="dark">
            <Lightbulb className="w-3.5 h-3.5" />
            {t.badge}
          </HeroBadge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6 break-keep">
            <WordRise text={t.heroTitle[0]} /><br />
            <WordRise text={t.heroTitle[1]} className="text-primary-light" />
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto break-keep">
            {t.heroSub}
          </p>
        </div>
      </section>

      {/* ── 단계적 탐색: 업종 → 문제 → 상세 ── */}
      <section className="py-14 lg:py-20">
        <SolutionsExplorer groups={groups} locale={locale} viewSolutionLabel={t.viewSolution} />
      </section>

      <RelatedGlossary
        slugs={['stockout-detection', 'dwell-time', 'footfall-analysis', 'zone-analysis', 'crowd-density-analysis', 'anomaly-detection']}
        locale={locale}
      />

      {/* ── CTA ── */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.ctaEyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 break-keep">
            {t.ctaTitle[0]}<br />{t.ctaTitle[1]}
          </h2>
          <p className="text-slate-300 text-lg mb-10 break-keep">
            {t.ctaSub[0]}<br className="hidden sm:block" />
            {t.ctaSub[1]}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={localeHref(locale, '/contact')}
              className="btn-primary-dark gap-2 w-full sm:w-auto"
            >
              {t.ctaPrimary}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={localeHref(locale, '/resources/case-studies')}
              className="btn-ghost-dark gap-2 w-full sm:w-auto"
            >
              {t.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
