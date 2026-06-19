'use client';

import { useState, useEffect, memo } from 'react';
import { Check, CloudRain, ShoppingCart, Palette, TrendingUp, Bell, CheckCircle2, Users, Tag, Pause } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AnimatePresence, motion } from 'framer-motion';
import TapIndicator from '@/components/ui/TapIndicator';
import PhoneFrame from './PhoneFrame';
import PhoneScreen from './PhoneScreen';
import { springGentle, springDismiss, springSnappy } from '@/lib/spring-config';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { MOCKUP_SCHEME, PRODUCT_THEME, MOCKUP_DEVICE } from '@/lib/mockup-tokens';

const S = MOCKUP_SCHEME.light;
const P = PRODUCT_THEME.StoreAgent;
const D = MOCKUP_DEVICE.phone;
import { actionCards as actionCardsData, completedItems as completedItemsData } from '@/data/mockup-scenarios/storeagent';
import { type Locale } from '@/lib/i18n';
import { getActionCardI18n } from '@/data/storeagent-mock-i18n';

const iconMap: Record<string, LucideIcon> = {
  CloudRain, ShoppingCart, Palette, Users, Tag,
};

type CardPhase = 'hidden' | 'visible' | 'approving' | 'pressed' | 'dismissed' | 'holding' | 'heldPressed' | 'held';

interface ActionCardMockupProps {
  active?: boolean;
  storeName?: string;
  locale?: Locale;
}

function ActionCardMockup({ active = true, storeName, locale = 'en' }: ActionCardMockupProps) {
  const reducedMotion = usePrefersReducedMotion();
  const t = getActionCardI18n(locale);
  const resolvedStoreName = storeName ?? t.storeName;
  const todayStats = t.todayStats;
  const actionCards = actionCardsData.map((card, i) => ({
    icon: iconMap[card.iconKey] ?? CloudRain,
    iconColor: card.iconColor,
    iconBg: card.iconBg,
    priorityColor: card.priorityColor,
    title: t.cards[i]?.title ?? card.title,
    reason: t.cards[i]?.reason ?? card.reason,
    priority: t.cards[i]?.priority ?? card.priority,
    meta: t.cards[i]?.meta ?? card.meta,
    statBadges: card.statBadges?.map((badge, k) => ({
      label: t.cards[i]?.statBadges?.[k]?.label ?? badge.label,
      value: t.cards[i]?.statBadges?.[k]?.value ?? badge.value,
      up: badge.up,
    })),
  }));
  const completedItems = completedItemsData.map((item, i) => ({
    icon: iconMap[item.iconKey] ?? CloudRain,
    color: item.color,
    label: t.completed[i]?.label ?? item.label,
  }));
  const [phases, setPhases] = useState<CardPhase[]>(['hidden', 'hidden', 'hidden', 'hidden', 'hidden']);
  const { ref: containerRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  useEffect(() => {
    if (!isVisible) return;
    if (!active) {
      setPhases(['hidden', 'hidden', 'hidden', 'hidden', 'hidden']);
      return;
    }
    if (reducedMotion) {
      setPhases(['visible', 'visible', 'visible', 'visible', 'visible']);
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const sched = (fn: () => void, ms: number) => {
      const t = setTimeout(() => { if (!cancelled) fn(); }, ms);
      timers.push(t);
    };

    const update = (next: CardPhase[]) => setPhases(next);
    const H = 'hidden' as const;
    const V = 'visible' as const;
    const A = 'approving' as const;
    const P = 'pressed' as const;
    const DIS = 'dismissed' as const;
    const HOLD = 'holding' as const;     // pointing at the hold action
    const HP = 'heldPressed' as const;   // hold button pressed (gray flash)
    const HELD = 'held' as const;        // exits LEFT, muted

    const runLoop = () => {
      if (cancelled) return;
      timers.splice(0).forEach(clearTimeout);
      update([H, H, H, H, H]);

      // Cards appear with stagger
      sched(() => update([V, H, H, H, H]), 150);
      sched(() => update([V, V, H, H, H]), 320);
      sched(() => update([V, V, V, H, H]), 490);
      sched(() => update([V, V, V, V, H]), 660);
      sched(() => update([V, V, V, V, V]), 830);

      // Card 0 approve (dismiss right + check)
      sched(() => update([A, V, V, V, V]), 1900);
      sched(() => update([P, V, V, V, V]), 2350);
      sched(() => update([DIS, V, V, V, V]), 2550);

      // Card 1 approve
      sched(() => update([DIS, A, V, V, V]), 3300);
      sched(() => update([DIS, P, V, V, V]), 3750);
      sched(() => update([DIS, DIS, V, V, V]), 3950);

      // Card 2 approve
      sched(() => update([DIS, DIS, A, V, V]), 4700);
      sched(() => update([DIS, DIS, P, V, V]), 5150);
      sched(() => update([DIS, DIS, DIS, V, V]), 5350);

      // Card 3 hold (declined/deferred — exits LEFT, gray)
      sched(() => update([DIS, DIS, DIS, HOLD, V]), 6100);
      sched(() => update([DIS, DIS, DIS, HP, V]), 6550);
      sched(() => update([DIS, DIS, DIS, HELD, V]), 6750);

      // Card 4 REMAINS visible — the AI proposes, it doesn't force.
      // Completed summary surfaces alongside the lingering card before reset.

      sched(runLoop, 10200);
    };

    runLoop();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [active, isVisible, reducedMotion]);

  // Cards 0–3 resolved (approved → dismissed, or held), card 4 lingers on screen.
  const reviewResolved =
    phases.slice(0, 4).every(p => p === 'dismissed' || p === 'held');

  return (
    <div ref={containerRef}>
    <PhoneFrame>
    <PhoneScreen statusBarBg="bg-white" homeBg="bg-gray-50" badge={false}>

      {/* App Header */}
      <div className={`shrink-0 ${S.headerBg} ${D.headerPadding} border-b-2 ${P.headerBorder}`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className={`${S.textPrimary} ${D.headerTitle}`}>{t.headerTitle}</h3>
            <p className={`${S.textSecondary} ${D.headerSub}`}>{resolvedStoreName} · {t.headerSub}</p>
          </div>
          <div className="relative">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
              <Bell className="w-4 h-4 text-blue-600" aria-hidden="true" />
            </div>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-3xs font-bold text-white flex items-center justify-center" aria-hidden="true">5</span>
          </div>
        </div>
        <div className="flex gap-2">
          {todayStats.map((s) => (
            <div key={s.label} className="flex-1 bg-gray-50 rounded-lg px-2 py-1.5">
              <p className={`${S.textPrimary} text-xs font-bold truncate`}>{s.value}</p>
              <p className={`${S.textSecondary} text-3xs truncate`}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Cards */}
      <div className={`flex-1 min-h-0 overflow-y-auto p-4 space-y-3 ${S.bodyBg}`}>
        <AnimatePresence initial={false}>
          {/* Review summary — 3 approved · 1 hold · 1 pending */}
          {reviewResolved && (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.92, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={springGentle}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-50"
              aria-hidden="true"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{t.emptyTitle}</p>
                  <p className="text-xs text-gray-500">{t.emptySub}</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {completedItems.map((item, i) => {
                  const Icon = item.icon;
                  // 0–2 approved · 3 held · 4 pending (card still on screen)
                  const status = i < 3 ? 'approved' : i === 3 ? 'held' : 'pending';
                  return (
                    <div key={item.label} className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                          status === 'approved' ? 'bg-emerald-50' : 'bg-gray-100'
                        }`}
                      >
                        {status === 'approved' ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Pause className="w-3 h-3 text-gray-400" />
                        )}
                      </div>
                      <Icon
                        className={`w-3 h-3 shrink-0 ${status === 'approved' ? item.color : 'text-gray-400'}`}
                        aria-hidden="true"
                      />
                      <span
                        className={`text-xs leading-tight ${
                          status === 'approved' ? 'text-gray-600' : 'text-gray-400'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {actionCards.map((card, i) => {
            const Icon = card.icon;
            const phase = phases[i];
            const isApproving = phase === 'approving';
            const isPressed   = phase === 'pressed';
            const isDismissed = phase === 'dismissed';
            const isHidden    = phase === 'hidden';
            const isHolding   = phase === 'holding';
            const isHeldPressed = phase === 'heldPressed';
            const isHeld      = phase === 'held';

            // approved cards leave (dismissed → null) and play exit-right;
            // held cards leave (held → null) and play exit-left, muted/gray.
            if (isDismissed || isHeld) return null;

            const isHoldFlow = isHolding || isHeldPressed;

            return (
              <motion.div
                key={card.title}
                aria-hidden="true"
                initial={{ opacity: 0, y: 14, scale: 0.93 }}
                animate={isHidden ? { opacity: 0, y: 14, scale: 0.93 } : { opacity: 1, y: 0, scale: 1 }}
                exit={
                  isHoldFlow
                    ? { x: '-112%', rotate: -2, opacity: 0, transition: springDismiss }
                    : { x: '112%', rotate: 2, opacity: 0, transition: springDismiss }
                }
                transition={springGentle}
                style={{ willChange: 'transform, opacity' }}
                className={`bg-white rounded-xl p-4 shadow-sm border ${
                  isApproving
                    ? 'border-primary/30 shadow-md shadow-primary/10'
                    : isHoldFlow
                    ? 'border-gray-200 shadow-md shadow-gray-200/40'
                    : 'border-gray-50'
                } relative overflow-hidden`}
              >
                {/* Approval flash (emerald) */}
                <AnimatePresence>
                  {isPressed && (
                    <motion.div
                      className="absolute inset-0 bg-emerald-400/10 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      aria-hidden="true"
                    />
                  )}
                </AnimatePresence>

                {/* Hold flash (gray — distinct from approve) */}
                <AnimatePresence>
                  {isHeldPressed && (
                    <motion.div
                      className="absolute inset-0 bg-gray-400/10 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      aria-hidden="true"
                    />
                  )}
                </AnimatePresence>

                <div className="flex items-start gap-3 mb-2">
                  <div className={`w-9 h-9 rounded-lg ${card.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${card.iconColor}`} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`text-3xs font-bold px-2 py-0.5 rounded-full ${card.priorityColor} inline-block mb-1`}>
                      {card.priority}
                    </span>
                    <h4 className="text-sm font-medium text-gray-900 leading-snug">{card.title}</h4>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-1.5 ml-12">{card.reason}</p>

                {/* Stat badges */}
                {card.statBadges && (
                  <div className="flex flex-wrap gap-1.5 mb-2 ml-12">
                    {card.statBadges.map((badge) => (
                      <span
                        key={badge.label}
                        className={`inline-flex items-center gap-1 text-3xs font-medium px-1.5 py-0.5 rounded-full ${
                          badge.up === true
                            ? 'bg-emerald-50 text-emerald-700'
                            : badge.up === false
                            ? 'bg-red-50 text-red-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {badge.label}: {badge.value}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-xs text-primary font-medium mb-3 ml-12 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" aria-hidden="true" />
                  {card.meta}
                </p>
                <div className="flex gap-2 ml-12">
                  <div className="relative">
                    <TapIndicator visible={isApproving} x={50} y={50} size={32} label="" />
                    <motion.button
                      type="button"
                      tabIndex={-1}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-lg ${
                        isApproving ? 'ring-2 ring-primary/40 ring-offset-1 shadow-md shadow-primary/30' : ''
                      }`}
                      animate={isPressed ? { scale: 0.88 } : { scale: 1 }}
                      transition={springSnappy}
                    >
                      <Check className="w-3 h-3" aria-hidden="true" /> {t.approve}
                    </motion.button>
                  </div>
                  <div className="relative">
                    <TapIndicator visible={isHolding} x={50} y={50} size={32} label="" />
                    <motion.button
                      type="button"
                      tabIndex={-1}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border ${
                        isHoldFlow
                          ? 'border-gray-400 text-gray-700 ring-2 ring-gray-300/60 ring-offset-1 shadow-md shadow-gray-300/40'
                          : 'border-gray-200 text-gray-500'
                      }`}
                      animate={isHeldPressed ? { scale: 0.88 } : { scale: 1 }}
                      transition={springSnappy}
                    >
                      {isHoldFlow && <Pause className="w-3 h-3" aria-hidden="true" />} {isHoldFlow ? t.hold : t.later}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </PhoneScreen>
    </PhoneFrame>
    </div>
  );
}

export default memo(ActionCardMockup);
