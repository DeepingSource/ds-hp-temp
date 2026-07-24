'use client';

import { useState, useEffect, useRef, memo } from 'react';
import { Check, CloudRain, ShoppingCart, Palette, TrendingUp, Bell, CheckCircle2, Users, Tag, Pause } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useSequencedLoop } from '@/hooks/useSequencedLoop';
import { AnimatePresence, motion } from 'framer-motion';
import TapIndicator from '@/components/ui/TapIndicator';
import PhoneFrame from './PhoneFrame';
import PhoneScreen from './PhoneScreen';
import MockupViewport from './MockupViewport';
import { motionEnter, motionAffordance } from '@/lib/mockup-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { MOCKUP_SCHEME, PRODUCT_THEME, MOCKUP_DEVICE } from '@/lib/mockup-tokens';

const S = MOCKUP_SCHEME.light;
const P = PRODUCT_THEME.StoreAgent;
const D = MOCKUP_DEVICE.phone;
import { actionCards as actionCardsData, completedItems as completedItemsData } from '@/data/mockup-scenarios/storeagent';
import { type Locale } from '@/lib/i18n';
import { getActionCardI18n, type ActionCardSet } from '@/data/storeagent-mock-i18n';
import { type DeepPartial, mergeMockupContent } from './types';

const iconMap: Record<string, LucideIcon> = {
  CloudRain, ShoppingCart, Palette, Users, Tag,
};

// 스와이프 퇴장 — spring 금지(D3): out_quint tween으로 밀어내는 감각만 유지.
const motionDismiss = { duration: 0.4, ease: motionEnter.ease };

type CardPhase = 'hidden' | 'visible' | 'approving' | 'pressed' | 'dismissed' | 'holding' | 'heldPressed' | 'held';

interface ActionCardMockupProps {
  active?: boolean;
  storeName?: string;
  locale?: Locale;
  /**
   * 문구 오버라이드 — 부분 병합(mergeMockupContent), 기본: getActionCardI18n(locale).
   * ⚠️ 애니메이션 스케줄(useSequencedLoop)이 정확히 5장(카드 0~2 승인 · 카드 3 보류 ·
   * 카드 4 대기)이라는 전제로 인덱스 기반 타임라인을 하드코딩하고 있다 — `cards`/
   * `completed`를 오버라이드할 때도 반드시 5개 원소를 채워야 한다(개수를 바꾸면
   * 애니메이션이 깨진다). 아이콘/색상 같은 시각 속성은 `actionCardsData`(구조 파일)
   * 에 남아 있고, 이 prop은 문구(title/reason/priority/meta/statBadges 등)만 바꾼다.
   */
  content?: DeepPartial<ActionCardSet>;
}

function ActionCardMockup({ active = true, storeName, locale = 'en', content }: ActionCardMockupProps) {
  const reducedMotion = usePrefersReducedMotion();
  const t = mergeMockupContent(getActionCardI18n(locale), content);
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
  const bodyRef = useRef<HTMLDivElement>(null);

  // Keep the card currently acting (approving / holding) scrolled into view inside the
  // phone body, so its entrance/exit beats aren't lost below the fold.
  useEffect(() => {
    const idx = phases.findIndex((p) => p === 'approving' || p === 'holding');
    const body = bodyRef.current;
    if (idx === -1 || !body) return;
    const el = body.querySelector<HTMLElement>(`[data-card="${idx}"]`);
    if (el) body.scrollTo({ top: Math.max(0, el.offsetTop - 8), behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [phases, reducedMotion]);

  // Sequenced approve/hold choreography (animation plan C10 — shared loop
  // scaffolding; cancel/timer/restart/visibility bookkeeping lives in the hook).
  // On active=false the loop freezes the current frame (it does NOT reset to all-
  // hidden, unlike the pre-C10 effect). In the tabbed showcases the panel is hidden
  // so this is invisible; under the /demo global pause it reads as freeze-on-pause,
  // which is intended. The hook replays from the reset when reactivated.
  useSequencedLoop(
    (sched) => {
      const update = (next: CardPhase[]) => setPhases(next);
      const H = 'hidden' as const;
      const V = 'visible' as const;
      const A = 'approving' as const;
      const P = 'pressed' as const;
      const DIS = 'dismissed' as const;
      const HOLD = 'holding' as const;     // pointing at the hold action
      const HP = 'heldPressed' as const;   // hold button pressed (gray flash)
      const HELD = 'held' as const;        // exits LEFT, muted

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

      return 10200;
    },
    {
      active: isVisible && active,
      reducedMotion,
      onStatic: () => setPhases(['visible', 'visible', 'visible', 'visible', 'visible']),
    },
  );

  // Cards 0–3 resolved (approved → dismissed, or held), card 4 lingers on screen.
  const reviewResolved =
    phases.slice(0, 4).every(p => p === 'dismissed' || p === 'held');

  return (
    // v2 계약: MockupViewport 크기 계약(phone 390×844) + --saai-* 토큰 + mockup-motion(no spring).
    <div ref={containerRef}>
    <MockupViewport design="phone">
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
            <div className="w-9 h-9 bg-primary-lighter rounded-xl flex items-center justify-center">
              <Bell className="w-4 h-4 text-primary" aria-hidden="true" />
            </div>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-(--saai-status-error) rounded-full text-3xs font-bold text-white flex items-center justify-center" aria-hidden="true">5</span>
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
      <div ref={bodyRef} className={`relative flex-1 min-h-0 overflow-y-auto p-4 space-y-3 ${S.bodyBg}`}>
        <AnimatePresence initial={false}>
          {/* Review summary — 3 approved · 1 hold · 1 pending */}
          {reviewResolved && (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.92, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={motionEnter}
              className="bg-white rounded-xl p-4 shadow-card border border-gray-50"
              aria-hidden="true"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-full bg-(--saai-green-50) flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-(--saai-status-success)" />
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
                          status === 'approved' ? 'bg-(--saai-green-50)' : status === 'held' ? 'bg-(--saai-yellow-50)' : 'bg-gray-100'
                        }`}
                      >
                        {status === 'approved' ? (
                          <Check className="w-3 h-3 text-(--saai-status-success)" />
                        ) : (
                          <Pause className={`w-3 h-3 ${status === 'held' ? 'text-(--saai-status-warning)' : 'text-gray-400'}`} />
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
                data-card={i}
                aria-hidden="true"
                initial={{ opacity: 0, y: 14, scale: 0.93 }}
                animate={isHidden ? { opacity: 0, y: 14, scale: 0.93 } : { opacity: 1, y: 0, scale: 1 }}
                exit={
                  isHoldFlow
                    ? { x: '-112%', rotate: -2, opacity: 0, transition: motionDismiss }
                    : { x: '112%', rotate: 2, opacity: 0, transition: motionDismiss }
                }
                transition={motionEnter}
                style={{ willChange: 'transform, opacity' }}
                className={`bg-white rounded-xl p-4 shadow-card border ${
                  isApproving
                    ? 'border-primary/30 shadow-md shadow-primary/10'
                    : isHoldFlow
                    ? 'border-gray-200 shadow-md shadow-gray-200/40'
                    : 'border-gray-50'
                } relative overflow-hidden`}
              >
                {/* Approval flash (green) */}
                <AnimatePresence>
                  {isPressed && (
                    <motion.div
                      className="absolute inset-0 bg-(--saai-green-500)/10 pointer-events-none"
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
                            ? 'bg-(--saai-green-50) text-(--saai-green-700)'
                            : badge.up === false
                            ? 'bg-(--saai-red-50) text-(--saai-red-600)'
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
                      transition={motionAffordance}
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
                      transition={motionAffordance}
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
    </MockupViewport>
    </div>
  );
}

export default memo(ActionCardMockup);
