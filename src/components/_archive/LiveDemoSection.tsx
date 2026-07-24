'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Building2, Home, GraduationCap, Music, type LucideIcon } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { getTimeSlot } from '@/lib/timeUtils';
import type { TimeSlot } from '@/lib/timeUtils';
import { areaTypes } from '@/data/briefingData';
import type { AreaType } from '@/data/briefingData';
import { getSeasonalScenario } from '@/data/seasonal';
import { BriefingMockup } from '@/components/mockups/BriefingMockup';
import { type Locale } from '@/lib/i18n';
import { liveDemoCopy, areaLabel, areaValueProps } from '@/data/storeagent-briefing-i18n';

const areaIconMap: Record<string, LucideIcon> = {
  office: Building2,
  residential: Home,
  university: GraduationCap,
  entertainment: Music,
};

function ValuePanel({ area, locale }: { area: AreaType; locale: Locale }) {
  const c = liveDemoCopy[locale] ?? liveDemoCopy.en;
  const props = areaValueProps(area.id, area.valueProps, locale);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {c.valueHeading}
        </h3>
        <p className="text-sm text-gray-500">
          {c.valueSubTemplate(areaLabel(area.id, area.label, locale))}
        </p>
      </div>

      <div className="space-y-4">
        {props.map((prop) => (
          <div key={prop.metric} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
            <div className="flex items-start gap-3 mb-2">
              <span className="text-xs font-bold text-gray-500 mt-0.5 shrink-0 uppercase tracking-wider">{c.before}</span>
              <p className="text-gray-500 text-sm line-through">{prop.before}</p>
            </div>
            <div className="flex items-start gap-3 mb-3">
              <span className="text-xs font-bold text-primary mt-0.5 shrink-0 uppercase tracking-wider">{c.after}</span>
              <p className="text-gray-800 text-sm font-medium">{prop.after}</p>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-lg w-fit">
              <span className="text-sm font-medium">{prop.metric}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LiveDemoSection({ locale = 'en' }: { locale?: Locale }) {
  const c = liveDemoCopy[locale] ?? liveDemoCopy.en;
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const [timeSlot, setTimeSlot] = useState<TimeSlot>('morning');
  useEffect(() => { setTimeSlot(getTimeSlot()); }, []);
  const activeArea = areaTypes[activeIndex];
  const activeScenario = useMemo(
    () => getSeasonalScenario(activeArea.id, timeSlot),
    [activeArea.id, timeSlot],
  );

  return (
    <section id="demo" ref={ref} className="section bg-bg-cool">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className={`text-center mb-10 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
          <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">{c.eyebrow}</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 break-keep">
            {c.heading}
          </h2>
          <p className="text-gray-500">
            {c.sub}
          </p>
        </div>

        {/* Area Type Tabs */}
        <div
          role="tablist"
          aria-label={c.tablistLabel}
          className={`flex justify-center gap-2 sm:gap-3 mb-10 ${isVisible ? 'scroll-visible delay-100' : 'scroll-hidden'}`}
        >
          {areaTypes.map((area, index) => {
            const Icon = areaIconMap[area.id];
            return (
              <button
                key={area.id}
                id={`demo-tab-${area.id}`}
                role="tab"
                aria-selected={activeIndex === index}
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    const next = (index + 1) % areaTypes.length;
                    setActiveIndex(next);
                    (e.currentTarget.parentElement?.children[next] as HTMLElement)?.focus();
                  } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const prev = (index - 1 + areaTypes.length) % areaTypes.length;
                    setActiveIndex(prev);
                    (e.currentTarget.parentElement?.children[prev] as HTMLElement)?.focus();
                  }
                }}
                aria-label={areaLabel(area.id, area.label, locale)}
                aria-controls="demo-content"
                className={`flex items-center gap-1.5 px-3 sm:px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-colors ${activeIndex === index
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
                  }`}
              >
                {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
                <span className="text-xs sm:text-sm">{areaLabel(area.id, area.label, locale)}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content: Mockup + Value Panel */}
        <div
          id="demo-content"
          role="tabpanel"
          aria-labelledby={`demo-tab-${activeArea.id}`}
          key={activeArea.id}
          className={`${isVisible ? 'animate-fade-switch' : 'scroll-hidden'}`}
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left: Full Briefing Mockup */}
            <div className="w-full lg:w-5/12">
              <BriefingMockup area={activeArea} scenario={activeScenario} locale={locale} />
            </div>

            {/* Right: Value Proposition Panel */}
            <div className="w-full lg:w-7/12 lg:pt-4">
              <ValuePanel area={activeArea} locale={locale} />
            </div>
          </div>
        </div>

        {/* 7일 브리핑 샘플 CTA */}
        <div className={`mt-10 ${isVisible ? 'scroll-visible delay-300' : 'scroll-hidden'}`}>
          <Link
            href="/storeagent/sample"
            className="block max-w-2xl mx-auto p-5 sm:p-6 bg-white rounded-2xl border border-primary/20 hover:border-primary/40 hover:shadow-lg transition-[border-color,box-shadow] group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                <span className="text-primary text-lg font-bold">7</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm sm:text-base">{c.ctaTitle}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{c.ctaDesc}</p>
              </div>
              <span className="text-primary text-sm font-medium shrink-0 hidden sm:block group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </Link>
          <p className="text-center mt-3 text-xs text-gray-500">
            {c.ctaFootTemplate(c.timeLabels[timeSlot])}
          </p>
        </div>
      </div>
    </section>
  );
}
