import Link from 'next/link';
import { Newspaper, Building2, BookOpen, Library, HelpCircle, ArrowRight, BarChart3 } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WordRise from '@/components/ui/WordRise';
import { crumb } from '@/lib/breadcrumb-labels';
import { type Locale, localeHref } from '@/lib/i18n';
import siteContent from '@/data/generated/site-content.json';

/**
 * ResourcesView — shared resources hub composition.
 * Rendered by `/resources` (en), `/ko/resources`, `/jp/resources` with the locale prop
 * (PLAN_v1.1 D6 path-prefix i18n). Copy is edited in Keystatic (content/site/resources.yaml);
 * card hrefs/icons stay in code and map to the cards by index — do not reorder.
 */

type Copy = {
  eyebrow: string;
  heroTitle: string;
  heroSub: string;
  featuredLabel: string;
  featuredTitle: string;
  featuredDesc: string;
  featuredCta: string;
  cardCta: string;
  resources: { title: string; description: string; label: string }[];
};

const CMS = siteContent.resources as unknown as Record<Locale, Copy>;

const icons = [Newspaper, Building2, BookOpen, Library, HelpCircle];
const cardHrefs = [
  '/resources/blog',
  '/resources/case-studies',
  '/resources/docs',
  '/resources/glossary',
  '/resources/faq',
];

export default function ResourcesView({ locale }: { locale: Locale }) {
  const t = CMS[locale];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 bg-surface-dark overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full" aria-hidden="true" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Breadcrumb items={[{ name: crumb('resources', locale), path: '/resources' }]} locale={locale} tone="dark" className="mb-6" />
          <p className="text-sm font-medium text-primary mb-4 tracking-wider uppercase">{t.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6 break-keep">
            <WordRise text={t.heroTitle} />
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed break-keep">
            {t.heroSub}
          </p>
        </div>
      </section>

      {/* Featured — store insight 사용자 매뉴얼 */}
      <AnimatedSection className="pt-16 lg:pt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{t.featuredLabel}</p>
          <Link
            href={localeHref(locale, '/resources/docs/store-insight')}
            className="group flex flex-col sm:flex-row items-start gap-5 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8 hover:bg-primary/10 transition-colors"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <BarChart3 className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors break-keep">
                {t.featuredTitle}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed break-keep">
                {t.featuredDesc}
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                {t.featuredCta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </AnimatedSection>

      {/* Cards */}
      <AnimatedSection className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.resources.map(({ title, description, label }, i) => {
              const Icon = icons[i];
              const href = cardHrefs[i];
              return (
                <Link
                  key={href}
                  href={localeHref(locale, href)}
                  className="group card flex flex-col gap-4 p-7 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:border-primary/30 transition-[box-shadow,border-color] duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-primary mb-2 uppercase tracking-wide">{label}</p>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {title}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed break-keep">{description}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    {t.cardCta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
