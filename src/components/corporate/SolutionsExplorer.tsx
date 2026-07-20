'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { industryList, industryColorMap } from '@/data/industryList';
import { localeHref, type Locale } from '@/lib/i18n';

/**
 * SolutionsExplorer — stepwise "industry → problem → solution" browser for /solutions.
 * Replaces the long all-industries scroll: pick an industry (step 1) to reveal only that
 * industry's scenarios (step 2), each linking to the solution detail (step 3). Cuts the
 * first-screen density while keeping every solution one click away. Icon/color/hero come
 * from the shared industryList (by slug); copy is resolved server-side and passed in.
 */

export type ExplorerSolution = {
  slug: string;
  impact: string;
  impactLabel: string;
  title: string;
  excerpt: string;
};
export type ExplorerGroup = { slug: string; label: string; solutions: ExplorerSolution[] };

const UI: Record<Locale, { step1: string; step2: string; step3: string; pick: string }> = {
  ko: { step1: '업종 선택', step2: '문제 선택', step3: '해결책 확인', pick: '업종을 선택하세요' },
  en: { step1: 'Pick industry', step2: 'Pick problem', step3: 'See solution', pick: 'Choose an industry' },
  jp: { step1: '業種を選ぶ', step2: '課題を選ぶ', step3: '解決策を見る', pick: '業種を選択' },
};

export default function SolutionsExplorer({
  groups,
  locale,
  viewSolutionLabel,
}: {
  groups: ExplorerGroup[];
  locale: Locale;
  viewSolutionLabel: string;
}) {
  const ui = UI[locale];
  const [active, setActive] = useState(groups[0]?.slug ?? '');
  const activeGroup = groups.find((g) => g.slug === active) ?? groups[0];
  const activeMeta = industryList.find((i) => i.slug === active);
  const activeColors = industryColorMap[activeMeta?.color ?? 'slate'] ?? industryColorMap.slate;
  const ActiveIcon = activeMeta?.icon;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      {/* step indicator */}
      <ol className="flex items-center justify-center gap-2.5 text-xs font-medium mb-8 flex-wrap">
        <li className="text-primary">① {ui.step1}</li>
        <li className="text-gray-300" aria-hidden="true">→</li>
        <li className="text-gray-400">② {ui.step2}</li>
        <li className="text-gray-300" aria-hidden="true">→</li>
        <li className="text-gray-400">③ {ui.step3}</li>
      </ol>

      {/* step 1 — industry selector */}
      <div role="tablist" aria-label={ui.pick} className="flex flex-wrap gap-2 justify-center mb-10">
        {groups.map((g) => {
          const meta = industryList.find((i) => i.slug === g.slug);
          const colors = industryColorMap[meta?.color ?? 'slate'] ?? industryColorMap.slate;
          const Icon = meta?.icon;
          const isActive = g.slug === active;
          return (
            <button
              key={g.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(g.slug)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                isActive ? 'bg-primary text-white border-primary' : `${colors.bg} ${colors.text} ${colors.border} hover:opacity-80`
              }`}
            >
              {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
              {g.label}
              <span className={`text-2xs tabular-nums ${isActive ? 'text-white/70' : 'opacity-60'}`}>{g.solutions.length}</span>
            </button>
          );
        })}
      </div>

      {/* step 2 — active industry banner + scenario cards */}
      {activeGroup && (
        <div key={activeGroup.slug} className="animate-fade-in-up">
          <div className="relative mb-6 h-32 sm:h-40 overflow-hidden rounded-2xl bg-slate-900">
            {activeMeta?.heroImage && (
              <Image src={activeMeta.heroImage} alt="" fill sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/85 via-surface-dark/55 to-surface-dark/20" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center gap-3 px-5 sm:px-7">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
                {ActiveIcon && <ActiveIcon className="w-5 h-5 text-white" aria-hidden="true" />}
              </div>
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-white break-keep">{activeGroup.label}</h2>
                {locale === 'ko' && activeMeta?.desc && (
                  <p className="text-xs text-white/70 line-clamp-1 break-keep">{activeMeta.desc}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeGroup.solutions.map((sol) => (
              <Link
                key={sol.slug}
                href={localeHref(locale, `/solutions/${sol.slug}`)}
                className="group flex flex-col gap-3 h-full p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] hover:border-gray-200 transition-[box-shadow,border-color] duration-300"
              >
                <div className={`self-start px-2.5 py-1 rounded-lg text-xs font-bold ${activeColors.bg} ${activeColors.text}`}>
                  {sol.impact} {sol.impactLabel}
                </div>
                <h3 className="text-base font-bold text-gray-900 leading-snug break-keep group-hover:text-primary transition-colors">
                  {sol.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 break-keep flex-1">{sol.excerpt}</p>
                <div className="flex items-center gap-1 text-xs font-medium text-gray-500 group-hover:text-primary transition-colors mt-1">
                  {viewSolutionLabel}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
