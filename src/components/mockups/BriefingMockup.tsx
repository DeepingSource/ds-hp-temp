'use client';

import { memo, useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AlertTriangle, Lightbulb, MapPin, CheckSquare, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TapIndicator from '@/components/ui/TapIndicator';
import PhoneFrame from './PhoneFrame';
import PhoneScreen from './PhoneScreen';
import { springGentle } from '@/lib/spring-config';
import { MOCKUP_SCHEME, PRODUCT_THEME, MOCKUP_DEVICE } from '@/lib/mockup-tokens';

const S = MOCKUP_SCHEME.light;
const P = PRODUCT_THEME.StoreAgent;
const D = MOCKUP_DEVICE.phone;
import { getTimeSlot } from '@/lib/timeUtils';
import type { TimeSlot } from '@/lib/timeUtils';
import type { AreaType, BriefingScenario } from '@/data/briefingData';
import { type Locale } from '@/lib/i18n';
import { briefingMockupCopy, areaLocation } from '@/data/storeagent-briefing-i18n';

interface BriefingMockupProps {
  area: AreaType;
  scenario: BriefingScenario;
  dateOverride?: string;
  timeOverride?: string;
  locale?: Locale;
}

export const BriefingMockup = memo(function BriefingMockup({ area, scenario, dateOverride, timeOverride, locale = 'en' }: BriefingMockupProps) {
  const reducedMotion = usePrefersReducedMotion();
  const c = briefingMockupCopy[locale] ?? briefingMockupCopy.en;
  const [timeSlot, setTimeSlot] = useState<TimeSlot>('morning');
  const [today, setToday] = useState('');
  const [time, setTime] = useState(c.briefingTimes.morning);
  const [visibleCards, setVisibleCards] = useState(0);
  const [checkedCount, setCheckedCount] = useState(0);
  const { ref: containerRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  // Client-only: initialize time-based display values
  useEffect(() => {
    const ts = getTimeSlot();
    setTimeSlot(ts);
    const now = new Date();
    setToday(dateOverride ?? c.today(now.getMonth() + 1, now.getDate(), now.getDay()));
    setTime(timeOverride ?? c.briefingTimes[ts]);
  }, [dateOverride, timeOverride, c]);

  useEffect(() => {
    if (!isVisible) return;

    if (reducedMotion) {
      setVisibleCards(5);
      setCheckedCount(scenario.checklist.length);
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const sched = (fn: () => void, ms: number) => {
      const t = setTimeout(() => { if (!cancelled) fn(); }, ms);
      timers.push(t);
    };

    const N = scenario.checklist.length;
    // 5 cards stagger in, then checklist checks
    const CARD_STAGGER = 180;
    const CHECKLIST_DELAY = 5 * CARD_STAGGER + 600;
    const totalMs = CHECKLIST_DELAY + N * 1100 + 2000;

    const runLoop = () => {
      if (cancelled) return;
      timers.splice(0).forEach(clearTimeout);
      setVisibleCards(0);
      setCheckedCount(0);

      for (let c = 1; c <= 5; c++) {
        sched(() => setVisibleCards(c), c * CARD_STAGGER);
      }
      for (let i = 0; i < N; i++) {
        sched(() => setCheckedCount(i + 1), CHECKLIST_DELAY + i * 1100);
      }
      sched(runLoop, totalMs);
    };

    sched(runLoop, 400);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [isVisible, scenario]);

  return (
    <div ref={containerRef}>
    <PhoneFrame>
    <PhoneScreen statusBarBg="bg-white" homeBg="bg-gray-50">

      {/* App Header */}
      <div className={`${S.headerBg} ${D.headerPadding} border-b-2 ${P.headerBorder}`}>
        <div className="flex items-center justify-between">
          <div>
            <h4 className={`${S.textPrimary} ${D.headerTitle}`}>{dateOverride ? c.briefingTitleOverride : c.briefingTitles[timeSlot]}</h4>
            <p className={`${S.textSecondary} ${D.headerSub}`}>{today} {time}</p>
            <p className={`${S.textSecondary} text-sm mt-0.5`}>{areaLocation(area.id, area.location, locale)}</p>
          </div>
          <span className="text-3xl" role="img" aria-label={c.weatherAlt}>{scenario.weather.icon}</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className={`flex-1 min-h-0 overflow-y-auto p-4 space-y-3 ${S.bodyBg} mockup-scroll`}>
        {/* Weather Card */}
        <motion.div
          className={`${S.cardClass} ${D.cardRadius} ${D.cardPadding}`}
          initial={{ opacity: 0, y: 12 }}
          animate={visibleCards >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={springGentle}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl" aria-hidden="true">{scenario.weather.icon}</span>
            <span className="font-medium text-gray-800 text-base">{c.weatherTitle}</span>
          </div>
          <p className="text-gray-600 text-base">{scenario.weather.temp}</p>
          <div className="mt-2 flex items-start gap-1.5 bg-orange-50 text-orange-700 text-sm font-medium px-2.5 py-1.5 rounded-lg">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{scenario.weather.warning}</span>
          </div>
        </motion.div>

        {/* Tips Card */}
        <motion.div
          className={`${S.cardClass} ${D.cardRadius} ${D.cardPadding}`}
          initial={{ opacity: 0, y: 12 }}
          animate={visibleCards >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={springGentle}
        >
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-amber-500" aria-hidden="true" />
            <span className="font-medium text-gray-800 text-base">{c.tipsTitle}</span>
          </div>
          <div className="space-y-3">
            {scenario.tips.map((tip, idx) => (
              <div key={`tip-${idx}`}>
                <p className="text-gray-700 text-base">{tip.text}</p>
                <p className="text-primary text-base font-medium mt-0.5">&rarr; {tip.action}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Events Card */}
        <motion.div
          className={`${S.cardClass} ${D.cardRadius} ${D.cardPadding}`}
          initial={{ opacity: 0, y: 12 }}
          animate={visibleCards >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={springGentle}
        >
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-red-500" aria-hidden="true" />
            <span className="font-medium text-gray-800 text-base">{c.eventsTitle}</span>
          </div>
          <div className="space-y-3">
            {scenario.events.map((event, idx) => (
              <div key={`evt-${idx}`} className="border-l-2 border-primary/30 pl-3">
                <p className="text-gray-800 text-base font-medium"><span aria-hidden="true">{event.icon}</span> {event.title}</p>
                <p className="text-gray-500 text-sm">{event.detail}</p>
                <p className="text-primary text-sm font-medium mt-0.5">&rarr; {event.impact}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Checklist Card */}
        <motion.div
          className={`${S.cardClass} ${D.cardRadius} ${D.cardPadding}`}
          initial={{ opacity: 0, y: 12 }}
          animate={visibleCards >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={springGentle}
        >
          <div className="flex items-center gap-2 mb-3">
            <CheckSquare className="w-5 h-5 text-emerald-500" aria-hidden="true" />
            <span className="font-medium text-gray-800 text-base">{c.checklistTitle}</span>
          </div>
          <div className="space-y-2">
            {scenario.checklist.map((item, idx) => {
              const checked = idx < checkedCount;
              const justChecked = idx === checkedCount - 1;
              return (
                <div key={`chk-${idx}`} className="flex items-start gap-2 relative">
                  <TapIndicator visible={justChecked} x={4} y={50} size={24} />
                  {/* Checkbox — spring scale on check */}
                  <motion.div
                    className={`w-4 h-4 rounded mt-0.5 shrink-0 flex items-center justify-center border-2 ${
                      checked ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'
                    }`}
                    animate={checked ? { scale: [1, 1.35, 0.9, 1.0] } : { scale: 1 }}
                    transition={checked ? { duration: 0.4, ease: 'easeOut' } : { duration: 0 }}
                    aria-hidden="true"
                  >
                    <AnimatePresence>
                      {checked && (
                        <motion.svg
                          className="w-2.5 h-2.5 text-white"
                          viewBox="0 0 10 10"
                          fill="none"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.22, ease: 'easeOut' }}
                        >
                          <motion.path
                            d="M1.5 5l2.5 2.5 4.5-4.5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <span className={`text-base transition-colors duration-200 ${checked ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Week Preview Card */}
        <motion.div
          className={`${S.cardClass} ${D.cardRadius} ${D.cardPadding}`}
          initial={{ opacity: 0, y: 12 }}
          animate={visibleCards >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={springGentle}
        >
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
            <span className="font-medium text-gray-800 text-base">{c.weekTitle}</span>
          </div>
          <div className="space-y-1.5">
            {scenario.weekPreview.map((item, idx) => (
              <p key={`wp-${idx}`} className="text-gray-600 text-base flex items-start gap-1.5">
                <span className="text-gray-300 shrink-0" aria-hidden="true">&bull;</span>
                {item}
              </p>
            ))}
          </div>
        </motion.div>
      </div>

    </PhoneScreen>
    </PhoneFrame>
    </div>
  );
});
