'use client';

import { memo, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, LayoutGrid, Thermometer, Sparkles, FileCheck2 } from 'lucide-react';
import PhoneFrame from './PhoneFrame';
import PhoneScreen from './PhoneScreen';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useCountUp } from '@/hooks/useCountUp';
import { useMockupLoop } from '@/hooks/useMockupLoop';
import { springGentle, springNotif, springDismiss } from '@/lib/spring-config';
import { type Locale } from '@/lib/i18n';
import { type BaseMockupProps } from './types';
import { careScore, statusChips, alertSequence, tempGauge, stateClass, type CareState } from '@/data/mockup-scenarios/storecare';

/**
 * StoreCareStatusMockup — saai care(StoreCare) 상태 홈을 사이트 디자인 시스템으로 재현한
 * 라이트 목업. 종합 점수 카운트업 + 4기능 상태칩(온도는 데모 중 좋음→주의로 전환) +
 * 상단 푸시 알림 슬라이드다운 + 감지 알림 카드 순환 + 냉장 온도 게이지 틱업.
 * reduced-motion이면 최종 상태 즉시(순환·슬라이드 없이 대표 알림 1개 정적).
 */

const STATE_LABEL: Record<Locale, Record<CareState, string>> = {
  ko: { good: '좋음', warning: '주의', error: '나쁨', perfect: '완벽' },
  en: { good: 'Good', warning: 'Watch', error: 'Bad', perfect: 'Perfect' },
  jp: { good: '良好', warning: '注意', error: '不良', perfect: '完璧' },
};

const CHIP_ICON: Record<string, typeof LayoutGrid> = { display: LayoutGrid, temp: Thermometer, clean: Sparkles, report: FileCheck2 };

const C: Record<Locale, {
  app: string; today: string; scoreTitle: string; scoreUnit: string;
  chips: Record<string, string>; alerts: Record<string, { title: string; where: string }>; now: string; tempTitle: string; note: string;
}> = {
  ko: {
    app: '스토어케어', today: '오늘 09:41', scoreTitle: '오늘 매장 상태', scoreUnit: '점',
    chips: { display: '진열', temp: '온도', clean: '청결', report: '리포트' },
    alerts: {
      display: { title: '진열이 흐트러졌어요', where: '3번 매대 · 방금' },
      temp: { title: '냉장 온도가 올랐어요', where: '음료 냉장고 · 방금' },
      clean: { title: '바닥 오염이 감지됐어요', where: '입구 · 방금' },
    },
    now: '방금', tempTitle: '냉장 온도', note: '예시 화면',
  },
  en: {
    app: 'store care', today: 'Today 09:41', scoreTitle: "Today's store status", scoreUnit: '',
    chips: { display: 'Display', temp: 'Temp', clean: 'Clean', report: 'Report' },
    alerts: {
      display: { title: 'Display looks messy', where: 'Shelf 3 · just now' },
      temp: { title: 'Fridge is warming up', where: 'Beverage fridge · just now' },
      clean: { title: 'Floor spill detected', where: 'Entrance · just now' },
    },
    now: 'just now', tempTitle: 'Fridge temp', note: 'sample screen',
  },
  jp: {
    app: 'store care', today: '本日 09:41', scoreTitle: '本日の店舗状態', scoreUnit: '点',
    chips: { display: '陳列', temp: '温度', clean: '清潔', report: 'レポート' },
    alerts: {
      display: { title: '陳列が乱れています', where: '棚3 · たった今' },
      temp: { title: '冷蔵温度が上がりました', where: '飲料冷蔵庫 · たった今' },
      clean: { title: '床の汚れを検知', where: '入口 · たった今' },
    },
    now: 'たった今', tempTitle: '冷蔵温度', note: '例の画面',
  },
};

function StoreCareStatusMockup({ active = true, locale = 'ko', className = '' }: BaseMockupProps) {
  const t = C[locale] ?? C.ko;
  const sl = STATE_LABEL[locale] ?? STATE_LABEL.ko;
  const reduced = usePrefersReducedMotion();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const running = isVisible && active;

  const score = useCountUp(careScore, running, 1100);
  const { step: alertStep } = useMockupLoop({ steps: alertSequence.length, interval: 2600, active: running });

  // 온도 틱업(3.2→7.8) + 임계 초과 시 온도칩 주의. 8s 주기로 리셋.
  const [temp, setTemp] = useState(tempGauge.start);
  const [showPush, setShowPush] = useState(false);
  useEffect(() => {
    if (!running) return;
    if (reduced) { setTemp(tempGauge.end); setShowPush(false); return; }
    let raf = 0; const timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setTemp(tempGauge.start);
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / 4000, 1);
        setTemp(tempGauge.start + (tempGauge.end - tempGauge.start) * p);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      timers.push(setTimeout(() => setShowPush(true), 1300));
      timers.push(setTimeout(() => setShowPush(false), 4200));
    };
    run();
    const loop = setInterval(run, 8000);
    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); clearInterval(loop); };
  }, [running, reduced]);

  const tempWarning = temp >= tempGauge.threshold;
  const chipState = (c: { key: string; state: CareState; flipTo?: CareState }): CareState =>
    c.key === 'temp' && c.flipTo && (reduced || tempWarning) ? c.flipTo : c.state;
  const alertKey = reduced ? alertSequence[0] : alertSequence[alertStep];
  const alert = t.alerts[alertKey];
  const tempPct = Math.min(Math.max((temp - tempGauge.min) / (tempGauge.max - tempGauge.min), 0), 1) * 100;

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <PhoneFrame>
        <PhoneScreen statusBarBg="bg-white" darkStatusBar homeBg="bg-white" darkHomeIndicator badge={false}>
          <div className="relative flex flex-col h-full bg-white text-gray-900 px-3.5 pt-1.5 pb-2">
            {/* 헤더 */}
            <div className="flex items-center justify-between py-1.5">
              <span className="flex items-center gap-1.5">
                <Image src="/images/saai-symbol.svg" alt="" width={15} height={15} aria-hidden="true" />
                <span className="text-sm font-bold">{t.app}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-3xs text-gray-400">{t.today}</span>
                <span className="rounded-full bg-gray-900/80 px-1.5 py-0.5 text-[8px] font-medium text-white/90">{t.note}</span>
              </span>
            </div>

            {/* 종합 점수 */}
            <div className="flex items-end justify-between mt-1 mb-3">
              <div>
                <p className="text-xs text-gray-500">{t.scoreTitle}</p>
                <p className="mt-0.5 text-3xl font-bold tabular-nums leading-none">
                  {reduced ? careScore : score}<span className="text-base font-medium text-gray-400 ml-0.5">{t.scoreUnit}</span>
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-2xs font-bold text-primary mb-1">{sl.perfect}</span>
            </div>

            {/* 4기능 상태칩 */}
            <div className="grid grid-cols-4 gap-1.5 mb-3">
              {statusChips.map((c, i) => {
                const st = chipState(c); const cls = stateClass[st]; const Icon = CHIP_ICON[c.key];
                return (
                  <motion.div
                    key={c.key}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={running ? { opacity: 1, y: 0 } : {}}
                    transition={{ ...springGentle, delay: reduced ? 0 : 0.3 + i * 0.07 }}
                    className={`rounded-xl ${cls.chip} p-2 flex flex-col items-center gap-1`}
                  >
                    <Icon className={`w-4 h-4 ${cls.text}`} aria-hidden="true" />
                    <span className="text-3xs font-medium text-gray-600">{t.chips[c.key]}</span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={st}
                        initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`text-3xs font-bold ${cls.text}`}
                      >
                        {sl[st]}
                      </motion.span>
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* 냉장 온도 게이지 */}
            <div className={`rounded-xl border p-2.5 mb-2 transition-colors ${tempWarning ? 'border-warning/30 bg-warning/5' : 'border-gray-100 bg-gray-50'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="flex items-center gap-1 text-2xs font-medium text-gray-600"><Thermometer className={`w-3.5 h-3.5 ${tempWarning ? 'text-warning' : 'text-gray-400'}`} aria-hidden="true" />{t.tempTitle}</span>
                <span className={`text-xs font-bold tabular-nums ${tempWarning ? 'text-warning' : 'text-gray-700'}`}>{temp.toFixed(1)}℃</span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                <div className={`h-full rounded-full ${tempWarning ? 'bg-warning' : 'bg-success'}`} style={{ width: `${tempPct}%`, transition: reduced ? 'none' : 'width 0.2s linear' }} />
              </div>
            </div>

            {/* 감지 알림 카드 (순환) */}
            <div className="mt-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={alertKey}
                  initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? {} : { opacity: 0, y: -10 }}
                  transition={springGentle}
                  className="flex items-start gap-2.5 rounded-xl border border-gray-100 bg-white shadow-sm p-2.5"
                >
                  <span className="w-7 h-7 rounded-lg bg-warning/10 flex items-center justify-center shrink-0"><Bell className="w-3.5 h-3.5 text-warning" aria-hidden="true" /></span>
                  <div className="min-w-0">
                    <p className="text-2xs font-bold text-gray-900 truncate">{alert.title}</p>
                    <p className="text-3xs text-gray-400">{alert.where}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 상단 푸시 알림 슬라이드다운 */}
            <AnimatePresence>
              {showPush && !reduced && (
                <motion.div
                  initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -60, opacity: 0 }}
                  transition={showPush ? springNotif : springDismiss}
                  className="absolute top-2 left-3 right-3 flex items-center gap-2 rounded-xl bg-gray-900/95 backdrop-blur px-3 py-2 shadow-lg"
                >
                  <Bell className="w-3.5 h-3.5 text-warning shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-2xs font-bold text-white truncate">{t.alerts.display.title}</p>
                    <p className="text-3xs text-white/60">{t.alerts.display.where}</p>
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

export default memo(StoreCareStatusMockup);
