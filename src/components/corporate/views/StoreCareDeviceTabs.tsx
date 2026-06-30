'use client';

import { useState, useCallback } from 'react';
import { Eye, Bell } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useMockupLoop } from '@/hooks/useMockupLoop';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import SlidingIndicator from '@/components/ui/SlidingIndicator';
import StoreCareMockup from '@/components/mockups/StoreCareMockup';
import { KakaoAlertMockup } from '@/components/mockups';
import { type Locale } from '@/lib/i18n';

/**
 * StoreCareDeviceTabs — one device, two faces (store-care §G).
 * Replaces the two back-to-back phone mockups with a single segmented-toggle
 * device that crossfades between "what the store sees" (the many raw signals)
 * and "what reaches you" (the three distilled alerts) — making the section's own
 * 1,247 → 3 funnel literal. Auto-toggles while in view; a click pins the choice.
 * StoreCareMockup / KakaoAlertMockup keep their own internal loops (gated by `active`).
 */

const TABS = [
  { key: 'store', icon: Eye, count: '1,247' },
  { key: 'phone', icon: Bell, count: '3' },
] as const;

export default function StoreCareDeviceTabs({
  locale,
  labels,
}: {
  locale: Locale;
  labels: { store: string; phone: string };
}) {
  const reduced = usePrefersReducedMotion();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const [manual, setManual] = useState<number | null>(null);
  const { step, goTo, hoverProps } = useMockupLoop({ steps: 2, interval: 5200, active: isVisible, pauseOnHover: true });
  const active = manual ?? step;

  const select = useCallback(
    (i: number) => {
      setManual(i);
      goTo(i);
    },
    [goTo],
  );

  return (
    <div ref={ref} {...hoverProps}>
      <div role="tablist" aria-label={labels.store} className="mx-auto mb-8 flex w-fit gap-1 rounded-full bg-gray-100 p-1">
        {TABS.map((tab, i) => {
          const Icon = tab.icon;
          const on = active === i;
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={on}
              tabIndex={on ? 0 : -1}
              aria-controls={`care-panel-${tab.key}`}
              onClick={() => select(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                  e.preventDefault();
                  select((i + 1) % TABS.length);
                }
              }}
              className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold break-keep transition-colors ${
                on ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {on && <SlidingIndicator layoutId="care-tab-pill" className="absolute inset-0 rounded-full bg-white shadow-sm" />}
              <Icon className="relative z-10 w-4 h-4" aria-hidden="true" />
              <span className="relative z-10">{labels[tab.key]}</span>
              <span className={`relative z-10 text-2xs font-mono tabular-nums ${on ? 'text-primary' : 'text-gray-400'}`}>{tab.count}</span>
            </button>
          );
        })}
      </div>

      <div className="relative mx-auto max-w-[320px]">
        <div className="grid items-start" style={{ gridTemplateAreas: '"stack"' }}>
          <div
            id="care-panel-store"
            role="tabpanel"
            aria-hidden={active !== 0}
            style={{ gridArea: 'stack' }}
            className={`${reduced ? '' : 'transition-opacity duration-300'} ${active === 0 ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          >
            <StoreCareMockup locale={locale} active={active === 0} />
          </div>
          <div
            id="care-panel-phone"
            role="tabpanel"
            aria-hidden={active !== 1}
            style={{ gridArea: 'stack' }}
            className={`${reduced ? '' : 'transition-opacity duration-300'} ${active === 1 ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          >
            <KakaoAlertMockup locale={locale} active={active === 1} />
          </div>
        </div>
      </div>
    </div>
  );
}
