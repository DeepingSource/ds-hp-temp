'use client';

import { AlertTriangle, Lightbulb, MapPin, ClipboardCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneFrame from './PhoneFrame';
import PhoneScreen from './PhoneScreen';
import { springGentle } from '@/lib/spring-config';
import { MOCKUP_SCHEME, MOCKUP_DEVICE } from '@/lib/mockup-tokens';

const S = MOCKUP_SCHEME.light;
const D = MOCKUP_DEVICE.phone;
import { getTimeSlot, getBriefingTitle, getBriefingTime, getToday } from '@/lib/timeUtils';
import type { TimeSlot } from '@/lib/timeUtils';

const contentByTime = {
  morning: {
    weather: { temp: '서울 5°C → 12°C', warning: '오후 5시 이후 기온 급락, 영하권 진입' },
    tip: { text: '오늘 화요일, 도시락 수요 증가', action: '삼각김밥·도시락 진열 강화' },
    event: { text: '강남역 채용박람회 (오전 10시~)', impact: '점심 도시락·음료 수요 급증' },
    checklist: ['유통기한 임박 상품 확인', '도시락·삼각김밥 재고 확인', '우유류 선입선출'],
  },
  afternoon: {
    weather: { temp: '현재 11°C · 최고 도달', warning: '3시 이후 기온 하락, 저녁 영하' },
    tip: { text: '오후 간식 타임, 회의 후 수요', action: '초콜릿·과자류 눈에 띄게 배치' },
    event: { text: '삼성동 컨퍼런스 진행 중', impact: '퇴근 시간 음료·간식 수요' },
    checklist: ['간식류 진열 보충', '야근 대비 즉석식품 확인', '냉장고 온도 체크'],
  },
  evening: {
    weather: { temp: '현재 4°C · 최저 -2°C', warning: '내일 아침 영하 3°C, 출근길 체감 -8°C' },
    tip: { text: '야근 수요 피크 (7시~10시)', action: '컵라면·커피 전면 배치' },
    event: { text: '강남 야근 밀집 시간대', impact: '즉석식품·커피 수요 +60%' },
    checklist: ['내일 발주 목록 확인', '야근용 즉석식품 재고', '내일 알바 스케줄 확인'],
  },
} as const;

const WEATHER_EMOJI: Record<TimeSlot, string> = {
  morning: '☀️',
  afternoon: '⛅',
  evening: '🌙',
};

// Card stagger entry: 200ms gap, exit: 350ms head start before re-entry
const CARD_STAGGER = 220;
const EXIT_BUFFER  = 380;
const CHECKLIST_START = 1200; // ms after last card appears
const CHECKLIST_GAP   = 850;
const PAUSE_AFTER  = 1800;

export default function MockupImage({ active = true }: { active?: boolean }) {
  const reducedMotion = usePrefersReducedMotion();
  const [timeSlot, setTimeSlot] = useState<TimeSlot>('morning');
  const [today,    setToday]    = useState('');
  const [visibleCards,  setVisibleCards]  = useState(0);
  const [checkedCount,  setCheckedCount]  = useState(0);
  const { ref: containerRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  // Client-only: init time-based display values
  useEffect(() => {
    setTimeSlot(getTimeSlot());
    setToday(getToday());
  }, []);

  useEffect(() => {
    if (!isVisible || !active) return;

    if (reducedMotion) {
      setVisibleCards(4);
      setCheckedCount(3);
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const sched = (fn: () => void, ms: number) => {
      const t = setTimeout(() => { if (!cancelled) fn(); }, ms);
      timers.push(t);
    };

    const N = 3; // checklist items
    const totalMs = EXIT_BUFFER + 4 * CARD_STAGGER + CHECKLIST_START + N * CHECKLIST_GAP + PAUSE_AFTER;

    const runLoop = () => {
      if (cancelled) return;
      timers.splice(0).forEach(clearTimeout);

      // Exit all cards
      setVisibleCards(0);
      setCheckedCount(0);

      // Re-enter cards after exit buffer
      sched(() => setVisibleCards(1), EXIT_BUFFER);
      sched(() => setVisibleCards(2), EXIT_BUFFER + CARD_STAGGER);
      sched(() => setVisibleCards(3), EXIT_BUFFER + CARD_STAGGER * 2);
      sched(() => setVisibleCards(4), EXIT_BUFFER + CARD_STAGGER * 3);

      // Checklist checks in
      const checkBase = EXIT_BUFFER + CARD_STAGGER * 3 + CHECKLIST_START;
      for (let i = 0; i < N; i++) {
        sched(() => setCheckedCount(i + 1), checkBase + i * CHECKLIST_GAP);
      }

      sched(runLoop, totalMs);
    };

    runLoop();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [isVisible, active, reducedMotion]);

  const content = contentByTime[timeSlot];

  return (
    <div ref={containerRef}>
    <PhoneFrame>
    <PhoneScreen statusBarBg="bg-primary" homeBg="bg-gray-50" darkHomeIndicator>

      {/* App Header */}
      <div className="bg-primary px-5 py-4 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-white ${D.headerTitle}`}>{getBriefingTitle(timeSlot)}</h3>
            <p className={`text-white/80 ${D.headerSub}`}>{today} {getBriefingTime(timeSlot)}</p>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-xl" role="img" aria-label="날씨">{WEATHER_EMOJI[timeSlot]}</span>
          </div>
        </div>
      </div>

      {/* Content Cards */}
      <div className={`flex-1 min-h-0 overflow-y-auto p-4 space-y-3 ${S.bodyBg}`} aria-hidden="true">

        {/* Weather Card */}
        <AnimatePresence initial={false}>
          {visibleCards >= 1 && (
            <motion.div
              key="weather"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              transition={springGentle}
              className={`${S.cardClass} ${D.cardRadius} ${D.cardPadding}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" aria-hidden="true" />
                <span className={`font-medium text-gray-800 ${D.body}`}>오늘 날씨</span>
              </div>
              <p className={`text-gray-600 ${D.body}`}>{content.weather.temp}</p>
              <div className="mt-2 flex items-start gap-1.5 bg-orange-50 text-orange-700 text-sm font-medium px-2.5 py-1.5 rounded-lg">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{content.weather.warning}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tip Card */}
        <AnimatePresence initial={false}>
          {visibleCards >= 2 && (
            <motion.div
              key="tip"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              transition={springGentle}
              className={`${S.cardClass} ${D.cardRadius} ${D.cardPadding}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-amber-500" aria-hidden="true" />
                <span className={`font-medium text-gray-800 ${D.body}`}>오늘의 팁</span>
              </div>
              <p className={`text-gray-600 ${D.body}`}>{content.tip.text}</p>
              <p className={`text-primary ${D.body} font-medium mt-1`}>&rarr; {content.tip.action}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Event Card */}
        <AnimatePresence initial={false}>
          {visibleCards >= 3 && (
            <motion.div
              key="event"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              transition={springGentle}
              className={`${S.cardClass} ${D.cardRadius} ${D.cardPadding}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-blue-500" aria-hidden="true" />
                <span className={`font-medium text-gray-800 ${D.body}`}>주변 이벤트</span>
              </div>
              <p className={`text-gray-600 ${D.body}`}>{content.event.text}</p>
              <p className={`text-primary ${D.body} font-medium mt-1`}>&rarr; {content.event.impact}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Checklist Card */}
        <AnimatePresence initial={false}>
          {visibleCards >= 4 && (
            <motion.div
              key="checklist"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              transition={springGentle}
              className={`${S.cardClass} ${D.cardRadius} ${D.cardPadding}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                <span className={`font-medium text-gray-800 ${D.body}`}>오늘 체크리스트</span>
              </div>
              <div className="space-y-2">
                {content.checklist.map((item, idx) => {
                  const checked = idx < checkedCount;
                  return (
                    <div key={item} className="flex items-center gap-2">
                      <motion.div
                        className={`w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center ${
                          checked ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'
                        }`}
                        animate={checked && !reducedMotion ? { scale: [1, 1.35, 0.9, 1.0] } : { scale: 1 }}
                        transition={checked && !reducedMotion ? { duration: 0.4, ease: 'easeOut' } : { duration: 0 }}
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
                      <span className={`text-base transition-colors duration-200 ${
                        checked ? 'line-through text-gray-400' : 'text-gray-600'
                      }`}>
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </PhoneScreen>
    </PhoneFrame>
    </div>
  );
}
