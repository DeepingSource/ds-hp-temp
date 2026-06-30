import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { solutionsData } from '@/data/solutionsData';
import { industryList, industryColorMap } from '@/data/industryList';
import { industryLabelI18n, solutionCardI18n } from '@/data/solutions-i18n';
import { localeHref, type Locale } from '@/lib/i18n';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import WordRise from '@/components/ui/WordRise';
import { crumb } from '@/lib/breadcrumb-labels';

/**
 * SolutionsView — shared problem-solution catalog (index) composition.
 * Rendered by `/solutions` (en), `/ko/solutions`, `/jp/solutions` with the locale
 * prop (PLAN_v1.1 D6 path-prefix i18n).
 *
 * NOTE: card content (industry labels, solution titles/excerpts/impact) comes from
 * the shared `solutionsData` / `industryList` data files, which carry internal
 * Korean and are left as-is per the i18n plan. Only page-authored copy is localized.
 */

const C: Record<Locale, {
  badge: string;
  heroTitle: [string, string];
  heroSub: string;
  total: (n: number) => string;
  perIndustry: (label: string, n: number) => string;
  industryDetail: string;
  viewSolution: string;
  ctaEyebrow: string;
  ctaTitle: [string, string];
  ctaSub: [string, string];
  ctaPrimary: string;
  ctaSecondary: string;
}> = {
  ko: {
    badge: '문제-해결 가이드',
    heroTitle: ['현장 문제에', '검증된 해결책'],
    heroSub: '매장 야간 도난부터 물류센터 위험 감지까지. 업종별 실제 문제를 SAAI가 어떻게 해결하는지 확인하세요.',
    total: (n) => `총 ${n}개 문제-해결 가이드`,
    perIndustry: (label, n) => `${label} ${n}건`,
    industryDetail: '업종 상세',
    viewSolution: '솔루션 보기',
    ctaEyebrow: '무료 상담',
    ctaTitle: ['우리 매장의 문제도', '해결할 수 있을까요?'],
    ctaSub: ['업종과 현황을 알려주시면', '맞춤 해결 방안을 안내해 드립니다.'],
    ctaPrimary: '무료 상담 신청',
    ctaSecondary: '업종별 솔루션 보기',
  },
  en: {
    badge: 'Problem–solution guide',
    heroTitle: ['Proven answers', 'to on-site problems'],
    heroSub: 'From overnight theft at retail stores to hazard detection in logistics centers. See how SAAI solves the real problems of each industry.',
    total: (n) => `${n} problem–solution guides`,
    perIndustry: (label, n) => `${label} ${n}`,
    industryDetail: 'Industry detail',
    viewSolution: 'View solution',
    ctaEyebrow: 'Free consultation',
    ctaTitle: ['Could it solve', 'your store’s problem too?'],
    ctaSub: ['Tell us your industry and situation, and we’ll guide you', 'to a tailored solution — free of charge.'],
    ctaPrimary: 'Request a free consultation',
    ctaSecondary: 'View solutions by industry',
  },
  jp: {
    badge: '課題解決ガイド',
    heroTitle: ['現場の課題に', '実証された解決策'],
    heroSub: '店舗の夜間盗難から物流センターの危険検知まで。業種ごとの実際の課題を SAAI がどう解決するのかをご確認ください。',
    total: (n) => `全 ${n} 件の課題解決ガイド`,
    perIndustry: (label, n) => `${label} ${n} 件`,
    industryDetail: '業種の詳細',
    viewSolution: 'ソリューションを見る',
    ctaEyebrow: '無料相談',
    ctaTitle: ['あなたの店舗の課題も', '解決できるでしょうか?'],
    ctaSub: ['業種と状況をお知らせいただければ、最適な解決策を', '無料でご案内します。'],
    ctaPrimary: '無料相談を申し込む',
    ctaSecondary: '業種別ソリューションを見る',
  },
};

// 업종별 그룹핑
const grouped = industryList.map((ind) => ({
  industry: ind,
  solutions: solutionsData.filter((s) => s.industry === ind.slug),
})).filter((g) => g.solutions.length > 0);

export default function SolutionsView({ locale }: { locale: Locale }) {
  const t = C[locale];

  // i18n overlay: Korean uses the shared data values as-is; other locales use the
  // overlay and fall back to the Korean data value when an entry is missing.
  const indLabel = (slug: string, fallback: string) =>
    locale === 'ko' ? fallback : (industryLabelI18n[slug]?.[locale] ?? fallback);
  const card = (slug: string) =>
    locale === 'ko' ? null : solutionCardI18n[slug]?.[locale];

  return (
    <div className="bg-white min-h-screen">

      {/* ── 히어로 ── */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-surface-dark">
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

          <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto break-keep">
            {t.heroSub}
          </p>

          {/* 업종 필터 pill */}
          <div className="flex flex-wrap gap-2 justify-center">
            {grouped.map(({ industry }) => {
              const colors = industryColorMap[industry.color] ?? industryColorMap.slate;
              return (
                <a
                  key={industry.slug}
                  href={`#industry-${industry.slug}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${colors.bg} ${colors.text} border ${colors.border} hover:opacity-80 transition-[opacity,border-color] duration-200`}
                >
                  {indLabel(industry.slug, industry.label)}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 총계 ── */}
      <div className="border-b border-gray-100 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex items-center gap-3 text-sm text-gray-500">
          <span>
            <strong className="text-gray-900">{t.total(solutionsData.length)}</strong> ·&nbsp;
            {grouped.map((g, i) => (
              <span key={g.industry.slug}>
                {t.perIndustry(indLabel(g.industry.slug, g.industry.label), g.solutions.length)}{i < grouped.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* ── 업종별 솔루션 목록 ── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
          {grouped.map(({ industry, solutions }) => {
            const colors = industryColorMap[industry.color] ?? industryColorMap.slate;
            const Icon = industry.icon;
            return (
              <div key={industry.slug} id={`industry-${industry.slug}`} className="scroll-mt-24">
                {/* 업종 헤더 — 사진 배너 */}
                <div className="relative mb-8 h-36 sm:h-44 overflow-hidden rounded-2xl bg-slate-900">
                  {industry.heroImage && (
                    <Image
                      src={industry.heroImage}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 1024px, 100vw"
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/85 via-surface-dark/55 to-surface-dark/20" aria-hidden="true" />
                  <div className="absolute inset-0 flex items-center justify-between gap-3 px-5 sm:px-7">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white break-keep">{indLabel(industry.slug, industry.label)}</h3>
                    </div>
                    <Link
                      href={`/industries/${industry.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-white/90 hover:text-white transition-colors shrink-0"
                    >
                      {t.industryDetail} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* 솔루션 카드 */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {solutions.map((sol) => {
                    const c = card(sol.slug);
                    return (
                    <Link
                      key={sol.slug}
                      href={`/solutions/${sol.slug}`}
                      className="group flex flex-col gap-3 p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] hover:border-gray-200 transition-[box-shadow,border-color] duration-300"
                    >
                      {/* 임팩트 수치 */}
                      <div className={`self-start px-2.5 py-1 rounded-lg text-xs font-bold ${colors.bg} ${colors.text}`}>
                        {sol.impact} {c?.impactLabel ?? sol.impactLabel}
                      </div>

                      <h3 className="text-base font-bold text-gray-900 leading-snug break-keep group-hover:text-primary transition-colors">
                        {c?.title ?? sol.title}
                      </h3>

                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 break-keep flex-1">
                        {c?.excerpt ?? sol.excerpt}
                      </p>

                      <div className="flex items-center gap-1 text-xs font-medium text-gray-500 group-hover:text-primary transition-colors mt-1">
                        {t.viewSolution}
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

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
              href="/industries"
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
