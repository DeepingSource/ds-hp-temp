import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { solutionsBySlug, solutionsByIndustry, type SolutionPage } from '@/data/solutionsData';
import { glossaryBySlug, type GlossaryTerm } from '@/data/glossaryTerms';
import { industryList, industryColorMap } from '@/data/industryList';
import {
  industryLabelI18n,
  solutionCardI18n,
  solutionDetailI18n,
} from '@/data/solutions-i18n';
import { type Locale } from '@/lib/i18n';
import { JsonLd, breadcrumbList } from '@/lib/structured-data';
import SolutionMockupPreview from '@/components/solutions/SolutionMockupPreview';

const homeCrumb: Record<Locale, string> = { ko: '홈', en: 'Home', jp: 'ホーム' };

/**
 * SolutionDetailView — shared /solutions/[slug] detail composition.
 * Rendered by `/solutions/[slug]` (en), `/ko/solutions/[slug]`, `/jp/solutions/[slug]`
 * with the locale prop (PLAN_v1.1 D6 path-prefix i18n).
 *
 * SUMMARY FIELDS ONLY are translated via overlays when locale !== 'ko' (falling
 * back to the Korean data value): title / excerpt / impactLabel (solutionCardI18n),
 * industryLabel (industryLabelI18n), and background.heading / causes[].title /
 * steps[].title + productLabel / results[].label (solutionDetailI18n, index-aligned
 * with the data arrays). Long-form Korean bodies (background.body, causes[].desc,
 * steps[].desc, problem) render from the shared data, and stats stay as-is.
 */

const C: Record<
  Locale,
  {
    breadcrumbHome: string;
    problemEyebrow: string;
    causesEyebrow: string;
    solutionEyebrow: string;
    solutionHeading: string;
    resultsEyebrow: string;
    ctaTitle: string;
    ctaSub: string;
    ctaButton: string;
    relatedTermsEyebrow: string;
    sameIndustryEyebrow: (label: string) => string;
    relatedSolutionsEyebrow: string;
    viewDetail: string;
    backToList: string;
    industryDetailSuffix: (label: string) => string;
  }
> = {
  ko: {
    breadcrumbHome: '솔루션',
    problemEyebrow: '문제 상황',
    causesEyebrow: '원인 분석',
    solutionEyebrow: 'SAAI 솔루션',
    solutionHeading: '관찰 → 분석 → 실행 → 학습, 4단계 자동화',
    resultsEyebrow: '기대 결과',
    ctaTitle: '우리 매장에도 적용할 수 있을까요?',
    ctaSub: '현재 CCTV 환경과 매장 규모를 알려주시면 바로 확인해 드립니다.',
    ctaButton: '무료 상담 신청',
    relatedTermsEyebrow: '관련 용어',
    sameIndustryEyebrow: (label) => `${label} 다른 솔루션`,
    relatedSolutionsEyebrow: '관련 솔루션',
    viewDetail: '자세히 보기',
    backToList: '전체 솔루션 보기',
    industryDetailSuffix: (label) => `${label} 업종 상세`,
  },
  en: {
    breadcrumbHome: 'Solutions',
    problemEyebrow: 'The problem',
    causesEyebrow: 'Root causes',
    solutionEyebrow: 'SAAI solution',
    solutionHeading: 'Observe → Analyze → Act → Learn: four-step automation',
    resultsEyebrow: 'Expected results',
    ctaTitle: 'Could this work for your store too?',
    ctaSub: 'Tell us your current CCTV setup and store size, and we’ll check right away.',
    ctaButton: 'Request a free consultation',
    relatedTermsEyebrow: 'Related terms',
    sameIndustryEyebrow: (label) => `More ${label} solutions`,
    relatedSolutionsEyebrow: 'Related solutions',
    viewDetail: 'View detail',
    backToList: 'View all solutions',
    industryDetailSuffix: (label) => `${label} industry detail`,
  },
  jp: {
    breadcrumbHome: 'ソリューション',
    problemEyebrow: '課題',
    causesEyebrow: '原因分析',
    solutionEyebrow: 'SAAI ソリューション',
    solutionHeading: '観察 → 分析 → 実行 → 学習、4ステップの自動化',
    resultsEyebrow: '期待される成果',
    ctaTitle: '私たちの店舗にも適用できますか？',
    ctaSub: '現在のCCTV環境と店舗規模をお知らせいただければ、すぐに確認いたします。',
    ctaButton: '無料相談を申し込む',
    relatedTermsEyebrow: '関連用語',
    sameIndustryEyebrow: (label) => `${label}の他のソリューション`,
    relatedSolutionsEyebrow: '関連ソリューション',
    viewDetail: '詳しく見る',
    backToList: 'すべてのソリューションを見る',
    industryDetailSuffix: (label) => `${label}の業種詳細`,
  },
};

const blue = { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' };

export default function SolutionDetailView({
  sol,
  locale,
}: {
  sol: SolutionPage;
  locale: Locale;
}) {
  const t = C[locale];
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const isKo = locale === 'ko';

  // Summary-field overlays (fallback to Korean data when an entry is missing).
  const card = solutionCardI18n[sol.slug]?.[locale];
  const detail = solutionDetailI18n[sol.slug]?.[locale];

  const title = (!isKo && card?.title) || sol.title;
  const excerpt = (!isKo && card?.excerpt) || sol.excerpt;
  const impactLabel = (!isKo && card?.impactLabel) || sol.impactLabel;
  const industryLabel = (!isKo && industryLabelI18n[sol.industry]?.[locale]) || sol.industryLabel;
  const backgroundHeading = (!isKo && detail?.backgroundHeading) || sol.background.heading;

  const industryMeta = industryList.find((i) => i.slug === sol.industry);
  const industryColors = industryColorMap[industryMeta?.color ?? 'slate'] ?? industryColorMap.slate;
  const industryMetaLabel = (!isKo && industryLabelI18n[sol.industry]?.[locale]) || industryMeta?.label;

  // 같은 업종의 다른 솔루션
  const sameSolutions = (solutionsByIndustry[sol.industry] ?? []).filter((s) => s.slug !== sol.slug);

  // 관련 솔루션
  const relatedSolutionObjects = sol.relatedSolutions
    .map((s) => solutionsBySlug[s])
    .filter((x): x is SolutionPage => x !== undefined);

  // 관련 용어
  const relatedTermObjects = sol.relatedTerms
    .map((s) => glossaryBySlug[s])
    .filter((x): x is GlossaryTerm => x !== undefined);

  return (
    <div className="bg-white min-h-screen">
      <JsonLd
        data={breadcrumbList(
          [
            { name: homeCrumb[locale], path: '/' },
            { name: t.breadcrumbHome, path: '/solutions' },
            { name: title, path: `/solutions/${sol.slug}` },
          ],
          locale,
        )}
      />

      {/* ── 히어로 ── */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden bg-surface-dark">
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          {/* 브레드크럼 */}
          <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-sm text-slate-300 mb-8 flex-wrap">
            <Link href={`${prefix}/solutions`} className="hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              {t.breadcrumbHome}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-40" />
            {industryMeta && (
              <>
                <Link href={`${prefix}/industries/${sol.industry}`} className="hover:text-white transition-colors">
                  {industryMetaLabel}
                </Link>
                <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              </>
            )}
            <span className="text-slate-300" aria-current="page">{title}</span>
          </nav>

          {/* 업종 뱃지 */}
          {industryMeta && (
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold mb-5 ${industryColors.bg} ${industryColors.text}`}>
              {industryMetaLabel}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-5 break-keep">
            {title}
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl break-keep mb-8">
            {excerpt}
          </p>

          {/* 임팩트 수치 */}
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
            <span className="text-3xl font-bold text-white">{sol.impact}</span>
            <span className="text-slate-300 text-sm leading-snug">{impactLabel}</span>
          </div>
        </div>
      </section>

      {/* ── 본문 ── */}
      <article className="py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16">

          {/* 문제 배경 */}
          <div>
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.problemEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5 break-keep">
              {backgroundHeading}
            </h2>
            <p className="text-gray-600 leading-relaxed break-keep text-base sm:text-lg">
              {sol.background.body}
            </p>
          </div>

          {/* 원인 분석 */}
          <div>
            <p className="text-sm font-medium text-gray-500 mb-5 tracking-wider uppercase">{t.causesEyebrow}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {sol.causes.map((cause, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                  <span className={`flex-shrink-0 w-7 h-7 rounded-xl ${industryColors.bg} ${industryColors.text} flex items-center justify-center text-xs font-medium`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-bold text-gray-900 mb-1 text-sm break-keep">
                      {(!isKo && detail?.causes[i]) || cause.title}
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed break-keep">{cause.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SAAI 솔루션 단계 */}
          <div>
            <p className="text-sm font-medium text-primary mb-5 tracking-wider uppercase">{t.solutionEyebrow}</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 break-keep">{t.solutionHeading}</h2>
            <div className="space-y-4">
              {sol.steps.map((step, i) => {
                const productLabel = (!isKo && detail?.steps[i]?.productLabel) || step.productLabel;
                const stepTitle = (!isKo && detail?.steps[i]?.title) || step.title;
                return (
                  <div key={i} className={`flex gap-5 p-6 rounded-2xl border ${blue.border} bg-white`}>
                    <div className="flex-shrink-0">
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${blue.bg} mb-2`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${blue.dot}`} />
                        <span className={`text-xs font-bold ${blue.text}`}>{productLabel}</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 mb-1.5 break-keep">{stepTitle}</p>
                      <p className="text-sm text-gray-500 leading-relaxed break-keep">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 실제 화면 목업 프리뷰 */}
          <SolutionMockupPreview steps={sol.steps} locale={locale} />

          {/* 기대 결과 */}
          <div>
            <p className="text-sm font-medium text-gray-500 mb-5 tracking-wider uppercase">{t.resultsEyebrow}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {sol.results.map((res, i) => (
                <div key={i} className={`flex flex-col items-center text-center p-5 rounded-2xl ${industryColors.bg} border ${industryColors.border}`}>
                  <span className={`text-2xl sm:text-3xl font-bold ${industryColors.text} mb-1 tabular-nums`}>
                    {res.stat}
                  </span>
                  <span className="text-xs text-gray-500 leading-snug break-keep">
                    {(!isKo && detail?.results[i]) || res.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA 인라인 */}
          <div className="p-8 rounded-2xl bg-gray-950 text-center">
            <p className="text-white font-bold text-xl mb-2 break-keep">
              {t.ctaTitle}
            </p>
            <p className="text-slate-300 text-sm mb-6 break-keep">
              {t.ctaSub}
            </p>
            <Link
              href={`${prefix}/contact`}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-colors text-sm"
            >
              {t.ctaButton}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 관련 용어 */}
          {relatedTermObjects.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-500 mb-5 tracking-wider uppercase">{t.relatedTermsEyebrow}</p>
              <div className="flex flex-wrap gap-2">
                {relatedTermObjects.map((term) => (
                  <Link
                    key={term.slug}
                    href={`${prefix}/glossary/${term.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors"
                  >
                    {term.title}
                    <ArrowRight className="w-3 h-3 opacity-50" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 같은 업종 다른 솔루션 */}
          {(sameSolutions.length > 0 || relatedSolutionObjects.length > 0) && (
            <div>
              <p className="text-sm font-medium text-gray-500 mb-5 tracking-wider uppercase">
                {sameSolutions.length > 0 ? t.sameIndustryEyebrow(industryLabel) : t.relatedSolutionsEyebrow}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {(sameSolutions.length > 0 ? sameSolutions : relatedSolutionObjects).slice(0, 2).map((rel) => {
                  const relIndustry = industryList.find((i) => i.slug === rel.industry);
                  const relColors = industryColorMap[relIndustry?.color ?? 'slate'] ?? industryColorMap.slate;
                  const relCard = solutionCardI18n[rel.slug]?.[locale];
                  const relTitle = (!isKo && relCard?.title) || rel.title;
                  const relExcerpt = (!isKo && relCard?.excerpt) || rel.excerpt;
                  const relImpactLabel = (!isKo && relCard?.impactLabel) || rel.impactLabel;
                  return (
                    <Link
                      key={rel.slug}
                      href={`${prefix}/solutions/${rel.slug}`}
                      className="group flex flex-col gap-3 p-5 rounded-2xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-[box-shadow,border-color] duration-300"
                    >
                      <div className={`self-start px-2.5 py-1 rounded-lg text-xs font-medium ${relColors.bg} ${relColors.text}`}>
                        {rel.impact} {relImpactLabel}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-primary transition-colors text-sm break-keep">
                          {relTitle}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1 break-keep">{relExcerpt}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 group-hover:text-primary transition-colors">
                        {t.viewDetail}
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* 솔루션 목록으로 */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <Link href={`${prefix}/solutions`} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {t.backToList}
            </Link>
            {industryMeta && (
              <Link href={`${prefix}/industries/${sol.industry}`} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors">
                {t.industryDetailSuffix(industryLabel)}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
