'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileText, Package, Calculator, ShieldCheck, Sparkles } from 'lucide-react';
import { solutionsBySlug, type SolutionPage } from '@/data/solutionsData';
import { solutionCardI18n, solutionDetailI18n } from '@/data/solutions-i18n';
import { DIAGNOSIS_UI, type PersonaId } from '@/data/diagnosis-i18n';
import { localeHref, type Locale } from '@/lib/i18n';
import RelatedGlossary from '@/components/corporate/RelatedGlossary';
import { getDiagnosisRoutes, type RouteCard } from './routing';

interface ResultPanelProps {
  slug: string;
  industry: string | null;
  persona: PersonaId | null;
  privacySelected?: boolean;
  /** 규모·목표 신호 (v3 §5 · Stage 4) — 허브 카드 재정렬·프리셋 쿼리·CTA 처리 */
  scale?: string | null;
  goal?: string | null;
  /** symptom 되받기 문장 — 결과 도입부에서 사용자의 답을 되받는다 (v3 §5) */
  reflectLine?: string | null;
  /** E3 closest 종결(v4 §3-3) — 킥커를 "가장 가까운 사례" 톤으로 */
  closest?: boolean;
  /** E3 결과 top2 병기 — "혹시 이쪽에 더 가깝다면" (adaptive에서만 전달) */
  secondSlug?: string | null;
  locale: Locale;
  onRestart: () => void;
}

export default function ResultPanel({
  slug,
  industry,
  persona,
  privacySelected,
  scale,
  goal,
  reflectLine,
  closest = false,
  secondSlug = null,
  locale,
  onRestart,
}: ResultPanelProps) {
  const ui = DIAGNOSIS_UI[locale];
  const isKo = locale === 'ko';
  const sol: SolutionPage | undefined = solutionsBySlug[slug];

  const routeCards = useMemo(
    () =>
      getDiagnosisRoutes({
        resultSlug: slug,
        industry,
        persona,
        privacySelected,
        scale,
        goal,
        locale,
      }),
    [slug, industry, persona, privacySelected, scale, goal, locale],
  );

  if (!sol) return null;

  const card = solutionCardI18n[slug]?.[locale];
  const detail = solutionDetailI18n[slug]?.[locale];
  const title = (!isKo && card?.title) || sol.title;
  const excerpt = (!isKo && card?.excerpt) || sol.excerpt;
  const impactLabel = (!isKo && card?.impactLabel) || sol.impactLabel;

  const relatedSolutionObjects = sol.relatedSolutions
    .map((s) => solutionsBySlug[s])
    .filter((x): x is SolutionPage => x !== undefined)
    .slice(0, 3);

  const getRouteIcon = (type: RouteCard['type']) => {
    switch (type) {
      case 'case-study':
        return FileText;
      case 'product':
        return Package;
      case 'pricing':
        return Calculator;
      case 'technology':
        return ShieldCheck;
      default:
        return Sparkles;
    }
  };

  // §6-3(v3 diagnosis 페이싱): 결과는 위에서부터 읽는 문서 — 패널 통 등장 대신
  // 섹션 순차 공개(헤더 0 → 접근 350 → 수치 600 → 허브 850 → 관련·CTA 1050ms).
  // fill-mode-both라 자리는 처음부터 확보(레이아웃 시프트 없음), reduced-motion은 즉시.
  const REVEAL = 'animate-in fade-in slide-in-from-bottom-1 fill-mode-both duration-300 motion-reduce:animate-none';

  return (
    <div>
      {/* 진단 헤더 + 문제 확인 — 0ms */}
      <div className={REVEAL}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {closest ? ui.resultClosestKicker : ui.resultKicker}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-primary-lighter text-primary-dark">
            {sol.impact} {impactLabel}
          </span>
        </div>

        <p className="text-xs font-medium text-gray-400 mb-1 break-keep">{ui.problemHeading}</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">{title}</h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed break-keep mb-8">{excerpt}</p>
      </div>

      {/* symptom 되받기 — 150ms (§6-3 슬롯 · v3 §5): 사용자의 답을 결과와 연결 */}
      {reflectLine && (
        <div className={REVEAL} style={{ animationDelay: '150ms' }}>
          <p className="mb-8 -mt-4 rounded-xl border border-primary/15 bg-primary-lighter/40 px-4 py-3 text-sm font-medium text-primary-dark break-keep">
            {reflectLine}
          </p>
        </div>
      )}

      {/* 3-Step Approach — 350ms */}
      <div className={REVEAL} style={{ animationDelay: '350ms' }}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">{ui.stepsHeading}</p>
      <div className="space-y-3 mb-8">
        {sol.steps.map((step, i) => {
          const stepTitle = (!isKo && detail?.steps[i]?.title) || step.title;
          const productLabel = (!isKo && detail?.steps[i]?.productLabel) || step.productLabel;
          return (
            <div key={i} className="flex gap-3.5 p-4 rounded-xl border border-gray-100 bg-gray-50/70">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold text-primary mb-0.5">{productLabel}</p>
                <p className="font-bold text-gray-900 text-sm mb-1 break-keep">{stepTitle}</p>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed break-keep">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
      </div>

      {/* Actual Stats — 600ms */}
      <div className={REVEAL} style={{ animationDelay: '600ms' }}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">{ui.resultsHeading}</p>
      <div className="grid grid-cols-3 gap-3 mb-2">
        {sol.results.map((r, i) => {
          const label = (!isKo && detail?.results[i]) || r.label;
          return (
            <div key={i} className="p-3.5 rounded-xl bg-gray-50 text-center">
              <p className="text-lg sm:text-xl font-bold text-primary mb-0.5">{r.stat}</p>
              <p className="text-2xs text-gray-500 leading-snug break-keep">{label}</p>
            </div>
          );
        })}
      </div>
      <p className="text-2xs text-gray-400 mb-8">{ui.resultsNote}</p>
      </div>

      {/* Related Content Routing Hub — 850ms */}
      {routeCards.length > 0 && (
        <div className={`mb-8 pt-6 border-t border-gray-100 ${REVEAL}`} style={{ animationDelay: '850ms' }}>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-4">
            {ui.chatConnectors.relatedContentHeading}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {routeCards.map((card) => {
              const Icon = getRouteIcon(card.type);
              return (
                <Link
                  key={card.id}
                  href={card.href}
                  className="group flex flex-col justify-between p-4 rounded-xl border border-gray-150 bg-white hover:border-primary-light hover:shadow-sm transition-all text-left cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                        <Icon className="w-3.5 h-3.5" />
                        {card.badge}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="font-bold text-sm text-gray-900 mb-1 break-keep group-hover:text-primary transition-colors">
                      {card.title}
                    </p>
                    <p className="text-2xs text-gray-500 line-clamp-2 leading-relaxed break-keep">
                      {card.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Related solutions · glossary · CTA — 1050ms */}
      <div className={REVEAL} style={{ animationDelay: '1050ms' }}>
      {/* E3 top2 병기(v4 §3-3) — relatedSolutions 슬롯 재사용, 확인을 거친 결과의 보조 제안 */}
      {secondSlug && solutionsBySlug[secondSlug] && (
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">
            {ui.secondHeading}
          </p>
          <Link
            href={localeHref(locale, `/solutions/${secondSlug}`)}
            className="flex items-center justify-between gap-3 p-3 rounded-lg border border-primary/20 bg-primary-lighter/30 hover:border-primary-light transition-colors text-xs sm:text-sm font-bold text-primary-dark"
          >
            <span className="break-keep">
              {(locale !== 'ko' && solutionCardI18n[secondSlug]?.[locale]?.title) || solutionsBySlug[secondSlug].title}
            </span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          </Link>
        </div>
      )}
      {relatedSolutionObjects.length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">
            {ui.relatedSolutionsHeading}
          </p>
          <div className="flex flex-col gap-2">
            {relatedSolutionObjects.map((rs) => {
              const rsCard = solutionCardI18n[rs.slug]?.[locale];
              const rsTitle = (!isKo && rsCard?.title) || rs.title;
              return (
                <Link
                  key={rs.slug}
                  href={localeHref(locale, `/solutions/${rs.slug}`)}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg border border-gray-100 hover:border-primary-light transition-colors text-xs sm:text-sm font-medium text-gray-700 hover:text-primary"
                >
                  <span className="break-keep">{rsTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Glossary Terms */}
      <div className="mb-8">
        <RelatedGlossary slugs={sol.relatedTerms} locale={locale} />
      </div>

      {/* CTA Band */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-gray-100">
        <Link
          href={localeHref(locale, `/contact?solution=${slug}`)}
          className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors cursor-pointer text-center"
        >
          {ui.ctaPrimary}
          <ArrowRight className="w-4 h-4" />
        </Link>
        {/* goal=research: 부 CTA(자세히 보기)를 시각적으로 동급 처리 (v3 §5) —
            지금은 팔리는 것보다 이해가 목적인 방문자의 다음 걸음을 존중한다 */}
        <Link
          href={localeHref(locale, `/solutions/${slug}`)}
          className={`inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl text-sm font-bold transition-colors text-center ${
            goal === 'research'
              ? 'border border-primary text-primary hover:bg-primary-lighter/40'
              : 'border border-gray-200 text-gray-700 hover:border-primary-light'
          }`}
        >
          {ui.ctaSecondary}
        </Link>
        <button
          type="button"
          onClick={onRestart}
          className="text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors cursor-pointer sm:ml-auto text-center py-2"
        >
          {ui.restart}
        </button>
      </div>
      </div>
    </div>
  );
}
