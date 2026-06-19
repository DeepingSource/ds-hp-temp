'use client';

import { AnimatePresence, motion } from 'framer-motion';
import PhoneFrame from './PhoneFrame';
import PhoneScreen from './PhoneScreen';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useMockupLoop } from '@/hooks/useMockupLoop';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { Locale } from '@/lib/i18n';

interface Props {
  active?: boolean;
  locale?: Locale;
  className?: string;
}

/** Button nature per alert. approve = genuine order/proposal; acknowledge = temp/cleanliness; review = needs human review. */
type AlertAction = 'approve' | 'acknowledge' | 'review';

interface AlertItem {
  emoji: string;
  body: string;
  time: string;
  /** null = no button (info-only); otherwise the button nature */
  action: AlertAction | null;
}

type Copy = {
  /** App chrome header title */
  appName: string;
  /** Channel / store label under app name */
  channel: string;
  /** Status chip text */
  liveLabel: string;
  /** Button labels keyed by alert nature */
  actions: Record<AlertAction, string>;
  /** Pricing card heading */
  priceTitle: string;
  /** ₩34/hour line */
  perHour: string;
  /** ₩14,900/month line */
  perMonth: string;
  /** first month free line */
  freeMonth: string;
  /** Lock-screen date line (en only) */
  lockDate: string;
  alerts: AlertItem[];
};

const COPY: Record<Locale, Copy> = {
  ko: {
    appName: '알림톡',
    channel: 'saai | store care',
    liveLabel: '실시간',
    actions: { approve: '승인', acknowledge: '확인했어요', review: '검토하기' },
    priceTitle: 'Care 요금',
    perHour: '시급 34원',
    perMonth: '월 14,900원',
    freeMonth: '첫 달 무료',
    lockDate: '',
    alerts: [
      { emoji: '☀️', body: '오늘의 브리핑이 도착했어요', time: '오전 7:50', action: null },
      { emoji: '📦', body: '삼각김밥 결품 임박, 12개 남음', time: '오전 11:40', action: 'approve' },
      { emoji: '❄️', body: '냉장고 3호 온도 7℃ 초과', time: '오후 2:05', action: 'acknowledge' },
      { emoji: '☔', body: '우산 발주 제안, 검토 요청', time: '오후 5:30', action: 'review' },
    ],
  },
  en: {
    appName: 'StoreCare',
    channel: 'saai | store care',
    liveLabel: 'Live',
    actions: { approve: 'Approve', acknowledge: 'Acknowledge', review: 'Review' },
    priceTitle: 'Care pricing',
    perHour: '₩34/hour',
    perMonth: '₩14,900/month',
    freeMonth: 'First month free',
    lockDate: 'Monday, June 8',
    alerts: [
      { emoji: '☀️', body: "Today's briefing is ready", time: '7:50 AM', action: null },
      { emoji: '📦', body: 'Rice balls low — 12 left', time: '11:40 AM', action: 'approve' },
      { emoji: '❄️', body: 'Fridge #3 over 7℃', time: '2:05 PM', action: 'acknowledge' },
      { emoji: '☔', body: 'Umbrella restock to review', time: '5:30 PM', action: 'review' },
    ],
  },
  jp: {
    appName: 'StoreCare',
    channel: 'saai | store care',
    liveLabel: 'リアルタイム',
    actions: { approve: '承認', acknowledge: '確認しました', review: '検討する' },
    priceTitle: 'Care 料金',
    perHour: '時給34ウォン',
    perMonth: '月14,900ウォン',
    freeMonth: '初月無料',
    lockDate: '',
    alerts: [
      { emoji: '☀️', body: '本日のブリーフィングが届きました', time: '7:50', action: null },
      { emoji: '📦', body: 'おにぎり残り12個、欠品間近です', time: '11:40', action: 'approve' },
      { emoji: '❄️', body: '冷蔵庫3号が7℃を超過しました', time: '14:05', action: 'acknowledge' },
      { emoji: '☔', body: '傘の発注提案、検討をお願いします', time: '17:30', action: 'review' },
    ],
  },
};

/** Locale-specific chat-app skin. ko = 알림톡, jp = LINE. (en uses the iOS lock-screen layout instead.) */
function chromeFor(locale: Locale) {
  switch (locale) {
    case 'jp':
      return {
        screenBg: 'bg-[#8aa9b8]',
        headerBg: 'bg-[#06c755]',
        headerText: 'text-white',
        avatarBg: 'bg-white',
        avatarText: 'text-[#06c755]',
        bubbleBg: 'bg-white',
        bubbleText: 'text-gray-900',
        homeBg: 'bg-[#8aa9b8]',
        statusBarBg: 'bg-[#06c755]',
      };
    default: // ko — 알림톡
      return {
        screenBg: 'bg-[#b2c7d9]',
        headerBg: 'bg-[#3a3a3a]',
        headerText: 'text-white',
        avatarBg: 'bg-[#fee500]',
        avatarText: 'text-[#3a1d1d]',
        bubbleBg: 'bg-white',
        bubbleText: 'text-gray-900',
        homeBg: 'bg-[#b2c7d9]',
        statusBarBg: 'bg-[#3a3a3a]',
      };
  }
}

/** Button styling shared across both layouts. approve = filled, others = tinted. */
function actionButtonClass(action: AlertAction) {
  return `px-4 py-1.5 rounded-lg text-xs font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-95 transition-transform ${
    action === 'approve' ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
  }`;
}

export default function KakaoAlertMockup({
  active = true,
  locale = 'en',
  className,
}: Props) {
  const t = COPY[locale] ?? COPY.en;
  const reducedMotion = usePrefersReducedMotion();
  const iosStyle = locale !== 'ko' && locale !== 'jp';
  const c = chromeFor(locale);

  const { ref: containerRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  // Reveal driven by useMockupLoop `step` so pauseOnHover actually pauses.
  // steps = alerts.length + 1: step cycles 0..N; step N holds the full feed
  // before the loop wraps to 0 (clears bubbles). reduced-motion → all shown.
  const { step, loopKey, hoverProps } = useMockupLoop({
    steps: t.alerts.length + 1,
    interval: 1400,
    active: isVisible && active,
    pauseOnHover: true,
  });

  const visibleCount = reducedMotion
    ? t.alerts.length
    : Math.min(step, t.alerts.length);

  return (
    <div ref={containerRef} className={className} {...hoverProps}>
      <PhoneFrame>
        {iosStyle ? (
          <PhoneScreen statusBarBg="" homeBg="bg-transparent" darkHomeIndicator={false}>
            {/* Full-bleed lock-screen gradient (covers PhoneScreen bg-white) */}
            <div
              className="absolute inset-0 -z-0"
              style={{ background: 'linear-gradient(170deg, #c5cfe0 0%, #b0bcce 40%, #98a8be 100%)' }}
              aria-hidden="true"
            />

            {/* Lock-screen time + date */}
            <div className="relative z-10 shrink-0 text-center pt-4 pb-5">
              <p className="text-sm text-white/80 font-medium mb-1">{t.lockDate}</p>
              <p
                className="text-[3.5rem] font-extralight text-white tracking-tight leading-none"
                style={{ textShadow: '0 2px 16px rgba(0,0,0,0.18)' }}
              >
                9:41
              </p>
            </div>

            {/* Notification stack — frosted lock-screen cards */}
            <ul
              className="relative z-10 flex-1 min-h-0 overflow-y-auto px-3 pb-4 space-y-2"
              aria-label={t.appName}
              role="log"
              aria-live="polite"
            >
              <AnimatePresence initial={false}>
                {t.alerts.slice(0, visibleCount).map((a, i) => (
                  <motion.li
                    key={`${loopKey}-${i}`}
                    className="backdrop-blur-xl rounded-2xl shadow-sm overflow-hidden text-gray-900"
                    style={{ background: 'rgba(255,255,255,0.78)' }}
                    initial={{ opacity: 0, y: -32, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.16 } }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  >
                    <div className="p-3.5">
                      <div className="flex items-start gap-2.5">
                        <div
                          className="w-8 h-8 rounded-[8px] bg-primary flex items-center justify-center text-base shrink-0"
                          aria-hidden="true"
                        >
                          {a.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-2xs font-semibold text-gray-500 truncate">{t.channel}</span>
                            <span className="text-3xs text-gray-400 shrink-0 ml-2">{a.time}</span>
                          </div>
                          <p className="text-[13px] font-medium text-gray-900 leading-snug">{a.body}</p>
                          {a.action && (
                            <div className="mt-2.5 flex justify-end">
                              <button type="button" className={actionButtonClass(a.action)}>
                                {t.actions[a.action]}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </PhoneScreen>
        ) : (
          <PhoneScreen statusBarBg={c.statusBarBg} homeBg={c.homeBg} darkStatusBar={false}>
            {/* Full-bleed chat background */}
            <div className={`absolute inset-0 -z-0 ${c.screenBg}`} aria-hidden="true" />

            {/* App header chrome */}
            <div className={`relative z-10 shrink-0 px-4 py-3 ${c.headerBg} ${c.headerText}`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full ${c.avatarBg} ${c.avatarText} flex items-center justify-center text-sm font-bold shrink-0`} aria-hidden="true">
                  S
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold leading-tight truncate">{t.appName}</p>
                  <p className="text-2xs opacity-80 leading-tight truncate">{t.channel}</p>
                </div>
                <span className="ml-auto flex items-center gap-1 text-3xs font-semibold opacity-90">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse motion-reduce:animate-none" aria-hidden="true" />
                  {t.liveLabel}
                </span>
              </div>
            </div>

            {/* Alert feed */}
            <ul
              className="relative z-10 flex-1 min-h-0 overflow-y-auto px-3 py-3 space-y-2.5"
              aria-label={t.appName}
              role="log"
              aria-live="polite"
            >
              <AnimatePresence initial={false}>
                {t.alerts.slice(0, visibleCount).map((a, i) => (
                  <motion.li
                    key={`${loopKey}-${i}`}
                    className={`${c.bubbleBg} ${c.bubbleText} rounded-2xl shadow-sm overflow-hidden`}
                    initial={{ opacity: 0, y: 16, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  >
                    <div className="p-3">
                      <div className="flex items-start gap-2">
                        <span className="text-base leading-none shrink-0 mt-0.5" aria-hidden="true">{a.emoji}</span>
                        <p className="flex-1 min-w-0 text-[13px] font-medium leading-snug">{a.body}</p>
                        <span className="text-3xs text-gray-400 shrink-0 mt-0.5">{a.time}</span>
                      </div>
                      {a.action && (
                        <div className="mt-2.5 flex justify-end">
                          <button type="button" className={actionButtonClass(a.action)}>
                            {t.actions[a.action]}
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </PhoneScreen>
        )}
      </PhoneFrame>

      {/* Pricing card — Care value. Marketing chrome, kept OUTSIDE the phone/messaging UI. */}
      <div className="mt-4">
        <div className="rounded-2xl bg-white/95 backdrop-blur-sm border border-primary/15 shadow-sm p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-900">{t.priceTitle}</span>
            <span className="text-3xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {t.freeMonth}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-primary tabular-nums leading-none">{t.perHour}</span>
            <span className="text-gray-300" aria-hidden="true">·</span>
            <span className="text-sm font-bold text-gray-700 tabular-nums leading-none">{t.perMonth}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
