'use client';

import { useState, useEffect, useCallback } from 'react';
import { Cloud, CloudRain, Check, Pause, Sparkles, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneFrame from './PhoneFrame';
import PhoneScreen from './PhoneScreen';
import MockupBadge from './MockupBadge';
import MockupViewport from './MockupViewport';
import { motionEnter } from '@/lib/mockup-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useCountUp } from '@/hooks/useCountUp';
import {
  SIM_BASE,
  simTotal,
  simComboKey,
  SIM_COPY,
} from '@/data/mockup-scenarios/simulator';
import type { SimCardId, SimChoice } from '@/data/mockup-scenarios/simulator';
import { formatWon } from '@/data/mockup-scenarios/canonical';
import { localeHref, type Locale } from '@/lib/i18n';

const CARD_ORDER: SimCardId[] = ['umbrella', 'onigiri', 'staffing'];

type Step = 'intro' | 'decide' | 'calculating' | 'result';

interface Props {
  active?: boolean;
  locale?: Locale;
  className?: string;
}

/** +₩76,000 형태의 부호 있는 델타 포맷 */
function formatDelta(delta: number): string {
  const sign = delta >= 0 ? '+' : '−';
  return `${sign}${formatWon(Math.abs(delta))}`;
}

export default function AgentDaySimulator({
  active = true,
  locale = 'en',
  className,
}: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const t = SIM_COPY[locale] ?? SIM_COPY.en;
  const { ref: containerRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const gated = isVisible && active;

  const [step, setStep] = useState<Step>('intro');
  const [cardIndex, setCardIndex] = useState(0);
  const [choices, setChoices] = useState<Partial<Record<SimCardId, SimChoice>>>({});

  const reset = useCallback(() => {
    setChoices({});
    setCardIndex(0);
    setStep('decide');
  }, []);

  // ① intro auto-advance after ~5s (skipped under reduced-motion → stays until tap)
  useEffect(() => {
    if (!gated || step !== 'intro' || reducedMotion) return;
    const id = setTimeout(() => setStep('decide'), 5000);
    return () => clearTimeout(id);
  }, [gated, step, reducedMotion]);

  // ③ calculating → result after ~1.2s (instant under reduced-motion)
  useEffect(() => {
    if (step !== 'calculating') return;
    if (reducedMotion) {
      setStep('result');
      return;
    }
    const id = setTimeout(() => setStep('result'), 1200);
    return () => clearTimeout(id);
  }, [step, reducedMotion]);

  const handleChoice = useCallback(
    (id: SimCardId, choice: SimChoice) => {
      setChoices((prev) => ({ ...prev, [id]: choice }));
      if (cardIndex < CARD_ORDER.length - 1) {
        setCardIndex((i) => i + 1);
      } else {
        setStep('calculating');
      }
    },
    [cardIndex]
  );

  // result number (count-up; instant under reduced-motion via hook)
  const isResult = step === 'result';
  const fullChoices = (CARD_ORDER.reduce((acc, id) => {
    acc[id] = choices[id] ?? 'hold';
    return acc;
  }, {} as Record<SimCardId, SimChoice>));
  const total = simTotal(fullChoices);
  const totalCount = useCountUp(isResult ? total : 0, isResult && gated, 900);
  const delta = total - SIM_BASE;
  const comboLine = t.combos[simComboKey(fullChoices)];

  // 합계는 카운트업으로 매 프레임 바뀌므로 라이브리전에서 제외하고, 정착 후 최종값만 1회 SR에 안내.
  const [announce, setAnnounce] = useState('');
  useEffect(() => {
    if (!isResult || !gated) {
      setAnnounce('');
      return;
    }
    const id = setTimeout(
      () => setAnnounce(`${t.result.heading} ${formatWon(total)} · ${t.result.vsBase} ${formatDelta(delta)}`),
      reducedMotion ? 0 : 950,
    );
    return () => clearTimeout(id);
  }, [isResult, gated, total, delta, reducedMotion, t]);

  /* v2 모션 계약(D3): 인라인 easeOut → mockup-motion out_quint 단일 곡선 */
  const stepTransition = reducedMotion ? { duration: 0 } : motionEnter;

  return (
    <div ref={containerRef} className={className}>
      {/* 결과 최종값만 1회 안내하는 SR 전용 라이브리전 (카운트업 스팸 방지) */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announce}
      </div>
      {/* v2 크기 계약(MM Phase 3): 폰 UI 재현 → MockupViewport phone 390×844 자체 래핑
          (ChatMockup 패턴). 내부 인터랙션(승인/보류 탭)은 transform 스케일에서도 동작하며,
          .saai-scope 안이라 --saai-* 변수를 소비한다. 호출부는 폭만 지정. */}
      <MockupViewport design="phone">
      <PhoneFrame>
        <PhoneScreen statusBarBg="bg-white" homeBg="bg-white" darkStatusBar darkHomeIndicator badge={false}>
          <MockupBadge locale={locale} />

          <div className="flex-1 min-h-0 flex flex-col bg-white text-gray-900">
            <AnimatePresence mode="wait">
              {/* ① INTRO ───────────────────────────── */}
              {step === 'intro' && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={stepTransition}
                  className="flex-1 flex flex-col px-5 py-6"
                >
                  {/* morning briefing */}
                  <div className="flex items-center gap-2 text-xs font-medium text-primary">
                    <Sparkles className="w-4 h-4" aria-hidden="true" />
                    <span>AI</span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold leading-snug">{t.intro.heading}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{t.intro.sub}</p>

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 flex flex-col items-center text-center">
                      <CloudRain className="w-5 h-5 text-primary" aria-hidden="true" />
                      <span className="mt-1.5 text-2xs text-gray-600">14°C</span>
                    </div>
                    <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 flex flex-col items-center text-center">
                      <Cloud className="w-5 h-5 text-gray-400" aria-hidden="true" />
                      <span className="mt-1.5 text-2xs text-gray-600">60%</span>
                    </div>
                    <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 flex flex-col items-center text-center justify-center">
                      <span className="text-base font-bold text-primary tabular-nums">3</span>
                    </div>
                  </div>

                  <div className="flex-1" />
                  <button
                    type="button"
                    onClick={() => setStep('decide')}
                    className="w-full min-h-[44px] rounded-xl bg-primary text-white font-bold text-sm px-4 py-3 transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    {t.intro.start}
                  </button>
                </motion.div>
              )}

              {/* ② DECIDE ───────────────────────────── */}
              {step === 'decide' && (
                <motion.div
                  key="decide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={stepTransition}
                  className="flex-1 flex flex-col px-5 py-6"
                >
                  {/* progress dots */}
                  <div className="flex items-center justify-center gap-1.5" aria-hidden="true">
                    {CARD_ORDER.map((id, i) => (
                      <span
                        key={id}
                        className={`h-1.5 rounded-full transition-all ${
                          i === cardIndex ? 'w-5 bg-primary' : i < cardIndex ? 'w-1.5 bg-primary/40' : 'w-1.5 bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    <div className="relative w-full">
                      <AnimatePresence mode="wait">
                        {CARD_ORDER.map((id, i) => {
                          if (i !== cardIndex) return null;
                          const card = t.cards[id];
                          return (
                            <motion.div
                              key={id}
                              initial={reducedMotion ? false : { opacity: 0, y: 16, scale: 0.97 }}
                              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                              exit={
                                reducedMotion
                                  ? { opacity: 0 }
                                  : choices[id] === 'approve'
                                    ? { opacity: 0, x: 120, rotate: 6 }
                                    : { opacity: 0, x: -120, rotate: -6 }
                              }
                              transition={stepTransition}
                              className="w-full rounded-2xl border border-gray-100 bg-white shadow-card p-5"
                            >
                              <span className="inline-block text-2xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                                {i + 1} / {CARD_ORDER.length}
                              </span>
                              <h4 className="mt-3 text-lg font-bold leading-snug">{card.title}</h4>

                              <div className="mt-4 space-y-2">
                                <div className="flex items-start gap-2 rounded-lg bg-(--saai-green-50) px-3 py-2">
                                  <Check className="w-4 h-4 text-(--saai-chart-positive) mt-0.5 shrink-0" aria-hidden="true" />
                                  <span className="text-xs text-(--saai-green-800) leading-relaxed">{card.approveNote}</span>
                                </div>
                                <div className="flex items-start gap-2 rounded-lg bg-gray-50 px-3 py-2">
                                  <Pause className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" aria-hidden="true" />
                                  <span className="text-xs text-gray-600 leading-relaxed">{card.holdNote}</span>
                                </div>
                              </div>

                              <div className="mt-5 grid grid-cols-2 gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleChoice(id, 'hold')}
                                  className="min-h-[44px] rounded-xl border border-gray-200 bg-white text-gray-700 font-medium text-sm px-4 py-3 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                                >
                                  {t.decide.hold}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleChoice(id, 'approve')}
                                  className="min-h-[44px] rounded-xl bg-primary text-white font-bold text-sm px-4 py-3 transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                >
                                  {t.decide.approve}
                                </button>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ③ CALCULATING ──────────────────────── */}
              {step === 'calculating' && (
                <motion.div
                  key="calculating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={stepTransition}
                  className="flex-1 flex flex-col items-center justify-center px-5 py-6 gap-4"
                >
                  <Sparkles className="w-8 h-8 text-primary" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-700">{t.calculating}</p>
                  {/* v2 모션 계약: bounce 금지 → opacity 펄스 점 3개로 대체 */}
                  <div className="flex gap-1.5" aria-hidden="true">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full bg-primary/60 animate-pulse motion-reduce:animate-none"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ④ RESULT ───────────────────────────── */}
              {step === 'result' && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={stepTransition}
                  className="flex-1 min-h-0 flex flex-col"
                >
                  <div className="flex-1 min-h-0 overflow-y-auto px-5 py-6">
                    <p className="text-xs font-medium text-gray-500">{t.result.heading}</p>
                    <div className="mt-1 flex items-end gap-2 flex-wrap">
                      <span className="text-3xl font-bold text-gray-900 tabular-nums">
                        {formatWon(totalCount)}
                      </span>
                      <span
                        className={`mb-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                          delta >= 0 ? 'bg-primary/10 text-primary' : 'bg-(--saai-red-50) text-(--saai-chart-negative)'
                        }`}
                      >
                        {t.result.vsBase} {formatDelta(delta)}
                      </span>
                    </div>

                    {/* 3-row summary */}
                    <div className="mt-5 space-y-2">
                      {CARD_ORDER.map((id) => {
                        const choice = fullChoices[id];
                        const card = t.cards[id];
                        const approved = choice === 'approve';
                        return (
                          <div
                            key={id}
                            className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/60 px-3 py-2.5"
                          >
                            <span
                              className={`mt-0.5 shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full ${
                                approved ? 'bg-(--saai-green-100) text-(--saai-green-700)' : 'bg-gray-200 text-gray-500'
                              }`}
                              aria-hidden="true"
                            >
                              {approved ? <Check className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                            </span>
                            <div className="min-w-0">
                              <p className="text-xs font-medium text-gray-800">
                                {card.title}
                                <span className={`ml-1.5 font-bold ${approved ? 'text-(--saai-chart-positive)' : 'text-gray-400'}`}>
                                  · {approved ? t.decide.approve : t.decide.hold}
                                </span>
                              </p>
                              <p className="text-2xs text-gray-500 leading-relaxed mt-0.5">
                                {approved ? card.approveNote : card.holdNote}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* combo one-liner */}
                    <div className="mt-4 rounded-xl bg-primary/5 border border-primary/10 px-4 py-3">
                      <p className="text-sm text-gray-800 leading-relaxed">{comboLine}</p>
                    </div>

                    <p className="mt-3 text-3xs text-gray-400">{t.result.disclaimer}</p>
                  </div>

                  {/* footer: again + single CTA */}
                  <div className="shrink-0 border-t border-gray-100 px-5 py-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={reset}
                      className="min-h-[44px] inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium text-sm px-4 py-2.5 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                    >
                      <RotateCcw className="w-4 h-4" aria-hidden="true" />
                      {t.result.again}
                    </button>
                    <a
                      href={localeHref(locale, '/pricing')}
                      className="flex-1 min-h-[44px] inline-flex items-center justify-center rounded-xl bg-primary text-white font-bold text-sm px-4 py-2.5 transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    >
                      {t.result.cta}
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </PhoneScreen>
      </PhoneFrame>
      </MockupViewport>
    </div>
  );
}
