'use client';

import { useState } from 'react';
import { AlertTriangle, BarChart2, CloudRain, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useSequencedLoop } from '@/hooks/useSequencedLoop';
import { AnimatePresence, motion } from 'framer-motion';
import type { BaseMockupProps } from './types';
import PhoneFrame from './PhoneFrame';
import PhoneScreen from './PhoneScreen';
import { springNotif } from '@/lib/spring-config';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useCurrentTime } from '@/lib/mockup-time';
import {
  pushNotifications as notificationsData,
  PUSH_INTERVAL_MS as INTERVAL_MS,
  PUSH_PAUSE_MS as PAUSE_MS,
} from '@/data/mockup-scenarios/storeagent';
import { type Locale } from '@/lib/i18n';
import { getPushI18n } from '@/data/storeagent-mock-i18n';

const pushIconMap: Record<string, LucideIcon> = {
  AlertTriangle, BarChart2, CloudRain, TrendingUp,
};

interface Notification {
  appBg: string;
  icon: LucideIcon;
  time: string;
  title: string;
  body: string;
  priorityBar: string;
}

/** Merge structural data (appBg/icon/priorityBar) with localized strings by index. */
function buildNotifications(locale: Locale): Notification[] {
  const t = getPushI18n(locale);
  return notificationsData.map((n, i) => ({
    appBg: n.appBg,
    icon: pushIconMap[n.iconKey] ?? AlertTriangle,
    priorityBar: n.priorityBar,
    time: t.items[i]?.time ?? n.time,
    title: t.items[i]?.title ?? n.title,
    body: t.items[i]?.body ?? n.body,
  }));
}

interface PushNotificationMockupProps extends BaseMockupProps {
  locale?: Locale;
}

export default function PushNotificationMockup({
  active = true,
  className,
  locale = 'en',
}: PushNotificationMockupProps) {
  const reducedMotion = usePrefersReducedMotion();
  const tPush = getPushI18n(locale);
  const notifications = buildNotifications(locale);
  const [visibleCount, setVisibleCount] = useState(0);
  const [loopKey, setLoopKey] = useState(0);
  const { ref: containerRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const { raw: now } = useCurrentTime({ interval: 60000, active });

  // Lock-screen notifications slide in, then the stack clears and replays
  // (animation plan C10 — shared loop scaffolding; cancel/timer/restart/visibility
  // bookkeeping lives in the hook).
  useSequencedLoop(
    (sched) => {
      const EXIT_MS = 300;
      // Step 1: exit 애니메이션 시작
      setVisibleCount(0);
      // Step 2: exit 완료 후 loopKey 변경
      sched(() => setLoopKey(k => k + 1), EXIT_MS);
      notifications.forEach((_, i) => {
        sched(() => setVisibleCount(i + 1), EXIT_MS + (i + 1) * INTERVAL_MS);
      });
      return EXIT_MS + notifications.length * INTERVAL_MS + PAUSE_MS;
    },
    {
      active: isVisible && active,
      reducedMotion,
      onStatic: () => setVisibleCount(notifications.length),
    },
  );

  const lockDate = tPush.lockDate(tPush.weekdays[now.getDay()], now.getMonth() + 1, now.getDate());

  return (
    <div ref={containerRef} className={className}>
    <PhoneFrame>
    <PhoneScreen
      statusBarBg=""
      homeBg="bg-transparent"
      darkHomeIndicator={false}
    >
      {/* Full-bleed lock screen gradient (covers PhoneScreen bg-white) */}
      <div
        className="absolute inset-0 -z-0"
        style={{ background: 'linear-gradient(170deg, #c5cfe0 0%, #b0bcce 40%, #98a8be 100%)' }}
      />

      {/* Lock Screen Time */}
      <div className="relative z-10 shrink-0 text-center pt-4 pb-5">
        <p className="text-sm text-white/80 font-medium mb-1">{lockDate}</p>
        <p className="text-[3.5rem] font-extralight text-white tracking-tight leading-none" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.18)' }}>9:41</p>
      </div>

      {/* Notifications — spring slide from top */}
      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto px-3 pb-4 space-y-2" aria-hidden="true">
        <AnimatePresence initial={false}>
          {notifications.slice(0, visibleCount).map((notif, i) => (
            <motion.div
              key={`${loopKey}-${i}`}
              className="backdrop-blur-xl rounded-2xl shadow-sm relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.78)' }}
              initial={{ opacity: 0, y: -32, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.16 } }}
              transition={springNotif}
            >
              {/* Priority indicator bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl ${notif.priorityBar}`} aria-hidden="true" />
              <div className="p-3.5 pl-4">
              <div className="flex items-start gap-2.5">
                <div className={`w-8 h-8 rounded-[8px] ${notif.appBg} flex items-center justify-center shrink-0`} aria-hidden="true">
                  <notif.icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-medium text-gray-700 lowercase"><span className="font-normal text-gray-400">saai</span><span className="text-gray-300 mx-0.5">|</span>store agent</span>
                    <span className="text-xs text-gray-400">{notif.time}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900 leading-snug">{notif.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">{notif.body}</p>
                </div>
              </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </PhoneScreen>
    </PhoneFrame>
    </div>
  );
}
