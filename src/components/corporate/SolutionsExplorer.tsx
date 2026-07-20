'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { industryList, industryColorMap } from '@/data/industryList';
import { localeHref, type Locale } from '@/lib/i18n';

/**
 * SolutionsExplorer — stepwise "industry → problem → solution" browser for /solutions.
 * Picking an industry reveals only that industry's scenarios, cutting first-screen density
 * while keeping every solution one click away.
 *
 * SEO/crawlability: EVERY industry's panel (with all its solution-detail links) is rendered
 * into the server HTML; inactive panels are just `hidden`. So all links stay crawlable and
 * the `#industry-<slug>` anchor the detail pages deep-link to always exists in the DOM.
 * The `useEffect` opens the industry named in the URL hash on mount for JS visitors.
 * Icon/color/hero come from the shared industryList (by slug); copy is passed in.
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
  const rootRef = useRef<HTMLDivElement>(null);

  // Deep-link: open the industry named in the URL hash (#industry-<slug>) on mount and
  // scroll it into view. The anchors themselves live on each panel (rendered below), so
  // the hash target exists even before this runs.
  useEffect(() => {
    const m = window.location.hash.match(/^#industry-(.+)$/);
    if (m && groups.some((g) => g.slug === m[1])) {
      setActive(m[1]);
      rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [groups]);

  return (
    <div ref={rootRef} className="max-w-5xl mx-auto px-4 sm:px-6 scroll-mt-24">
      {/* flow guide (describes the path — not live progress) */}
      <p className="flex items-center justify-center gap-2.5 text-xs font-medium text-gray-400 mb-8 flex-wrap">
        <span>① {ui.step1}</span>
        <span className="text-gray-300" aria-hidden="true">→</span>
        <span>② {ui.step2}</span>
        <span className="text-gray-300" aria-hidden="true">→</span>
        <span>③ {ui.step3}</span>
      </p>

      {/* step 1 — industry selector (toggle buttons controlling the panels below) */}
      <div role="group" aria-label={ui.pick} className="flex flex-wrap gap-2 justify-center mb-10">
        {groups.map((g) => {
          const meta = industryList.find((i) => i.slug === g.slug);
          const colors = industryColorMap[meta?.color ?? 'slate'] ?? industryColorMap.slate;
          const Icon = meta?.icon;
          const isActive = g.slug === active;
          return (
            <button
              key={g.slug}
              type="button"
              aria-pressed={isActive}
              aria-controls={`industry-${g.slug}`}
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

      {/* step 2 — every industry's panel is in the DOM (all solution links crawlable);
          only the active one is visible. */}
      {groups.map((group) => {
        const meta = industryList.find((i) => i.slug === group.slug);
        const colors = industryColorMap[meta?.color ?? 'slate'] ?? industryColorMap.slate;
        const Icon = meta?.icon;
        const isActive = group.slug === active;
        return (
          <div
            key={group.slug}
            id={`industry-${group.slug}`}
            role="region"
            aria-label={group.label}
            hidden={!isActive}
            className={isActive ? 'animate-fade-in-up' : undefined}
          >
            <div className="relative mb-6 h-32 sm:h-40 overflow-hidden rounded-2xl bg-slate-900">
              {meta?.heroImage && (
                <Image src={meta.heroImage} alt="" fill sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/85 via-surface-dark/55 to-surface-dark/20" aria-hidden="true" />
              <div className="absolute inset-0 flex items-center gap-3 px-5 sm:px-7">
                <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
                  {Icon && <Icon className="w-5 h-5 text-white" aria-hidden="true" />}
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-white break-keep">{group.label}</h2>
                  {locale === 'ko' && meta?.desc && (
                    <p className="text-xs text-white/70 line-clamp-1 break-keep">{meta.desc}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.solutions.map((sol) => (
                <Link
                  key={sol.slug}
                  href={localeHref(locale, `/solutions/${sol.slug}`)}
                  className="group flex flex-col gap-3 h-full p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] hover:border-gray-200 transition-[box-shadow,border-color] duration-300"
                >
                  <div className={`self-start px-2.5 py-1 rounded-lg text-xs font-bold ${colors.bg} ${colors.text}`}>
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
        );
      })}
    </div>
  );
}
