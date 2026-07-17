'use client';

import { memo, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Pause, Square, Plus, Minus, Maximize } from 'lucide-react';
import PhoneFrame from './PhoneFrame';
import PhoneScreen from './PhoneScreen';
import ScanlineOverlay from './ScanlineOverlay';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useCountUp } from '@/hooks/useCountUp';
import { springSnappy } from '@/lib/spring-config';
import { type Locale } from '@/lib/i18n';
import { type BaseMockupProps } from './types';
import {
  LINE_FOOTFALL, LINE_ENTRY, VIEWBOX, footfallLines, entryLine, walkers, walkerLoopMs, countTargets, staticElapsed,
} from '@/data/mockup-scenarios/storecount';

/**
 * StoreCountCountingMockup — saai count(StoreCount) 카운팅 앱을 사이트 디자인 시스템으로
 * 재현한 다크 목업. 카메라 뷰 위에 기준선(유동인구 cyan 2 · 유입 pink 1)이 그려지고,
 * 사람 dot이 선을 가로지르며 하단 카드의 유동인구·유입·전환율이 카운트업된다.
 * ⚠️ SVG 라인은 CSS stroke-dashoffset로 드로잉(framer SVG는 이 스택에서 미하이드레이션),
 * HTML(카드·워커·칩)만 framer. reduced-motion이면 최종 상태 즉시 표시.
 */

const C: Record<Locale, {
  app: string; ready: string; measuring: string; done: string;
  footfall: string; footfallSub: string; entry: string; entrySub: string; conversion: string;
  f1: string; f2: string; entryLabel: string; note: string;
}> = {
  ko: {
    app: 'store count', ready: '측정 준비됨', measuring: '측정 중', done: '완료',
    footfall: '유동인구', footfallSub: '통과 카운팅', entry: '유입', entrySub: '진입 카운팅', conversion: '전환율',
    f1: '유동인구 1', f2: '유동인구 2', entryLabel: '유입', note: '예시 수치',
  },
  en: {
    app: 'store count', ready: 'Ready', measuring: 'Measuring', done: 'Done',
    footfall: 'Footfall', footfallSub: 'passers-by', entry: 'Entries', entrySub: 'walk-ins', conversion: 'Conv.',
    f1: 'Footfall 1', f2: 'Footfall 2', entryLabel: 'Entry', note: 'sample figures',
  },
  jp: {
    app: 'store count', ready: '測定準備', measuring: '測定中', done: '完了',
    footfall: '通行量', footfallSub: '通過カウント', entry: '入店', entrySub: '入店カウント', conversion: '転換率',
    f1: '通行 1', f2: '通行 2', entryLabel: '入店', note: '例の数値',
  },
};

const lineLen = (l: { x1: number; y1: number; x2: number; y2: number }) => Math.hypot(l.x2 - l.x1, l.y2 - l.y1);
const mid = (l: { x1: number; y1: number; x2: number; y2: number }) => ({ x: (l.x1 + l.x2) / 2, y: (l.y1 + l.y2) / 2 });

/** 경과시간 mm:ss 타이머 (cycle마다 리셋, reduced면 정적). */
function useElapsed(running: boolean, reduced: boolean, cycle: number) {
  const [s, setS] = useState(0);
  useEffect(() => {
    if (!running || reduced) return;
    setS(0);
    const t = setInterval(() => setS((v) => v + 1), 1000);
    return () => clearInterval(t);
  }, [running, reduced, cycle]);
  if (reduced) return staticElapsed;
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function StoreCountCountingMockup({ active = true, locale = 'ko', className = '' }: BaseMockupProps) {
  const t = C[locale] ?? C.ko;
  const reduced = usePrefersReducedMotion();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const running = isVisible && active;

  // 6.5s 주기로 리셋(라인 재드로잉 · 카운트업 재시작 · 타이머 리셋).
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (!running || reduced) return;
    const iv = setInterval(() => setCycle((c) => c + 1), 6500);
    return () => clearInterval(iv);
  }, [running, reduced]);

  // 라인 드로잉 트리거 (cycle마다 false→true로 CSS transition 재실행).
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    if (!running) return;
    setDrawn(false);
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setDrawn(true)));
    return () => cancelAnimationFrame(r);
  }, [running, cycle]);

  const elapsed = useElapsed(running, reduced, cycle);
  // drawn이 cycle 시작마다 false→true로 토글되므로, 이를 카운트업 active로 써서
  // 라인 재드로잉과 함께 카운트를 리셋·재시작한다(루트 리마운트 없이 부드럽게).
  const countActive = running && drawn;
  const footfall = useCountUp(countTargets.footfall, countActive, 2600);
  const entry = useCountUp(countTargets.entry, countActive, 2600);
  const conversion = footfall > 0 ? Math.round((entry / Math.max(footfall, 1)) * 100) : 0;
  const convDisplay = reduced ? countTargets.conversion : Math.min(conversion, countTargets.conversion);

  const drawStyle = (i: number, len: number) => ({
    strokeDasharray: len,
    strokeDashoffset: reduced || drawn ? 0 : len,
    transition: reduced ? 'none' : `stroke-dashoffset 0.48s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s`,
  });

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <PhoneFrame>
        <PhoneScreen statusBarBg="bg-gray-950" homeBg="bg-gray-950" badge={false}>
          <div className="flex flex-col h-full bg-gray-950 text-white px-3 pt-1 pb-2">
            {/* 헤더 */}
            <div className="flex items-center justify-between py-2">
              <span className="flex items-center gap-1.5">
                <Image src="/images/saai-symbol.svg" alt="" width={16} height={16} aria-hidden="true" className="opacity-90 invert" />
                <span className="text-sm font-bold lowercase">{t.app}</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-3xs text-white/80"><Pause className="w-2.5 h-2.5" aria-hidden="true" /></span>
                <span className="inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-3xs font-bold"><Square className="w-2.5 h-2.5" aria-hidden="true" />{t.done}</span>
              </span>
            </div>

            {/* 상태 칩 */}
            <div className="mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-3xs font-medium text-sky-300">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" aria-hidden="true" />
                {t.measuring} · <span className="tabular-nums">{elapsed}</span>
              </span>
            </div>

            {/* 카메라 뷰 + 기준선 */}
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900 aspect-[320/180]">
              <ScanlineOverlay opacity="opacity-[0.06]" />
              {/* 워커 dot (HTML, framer) */}
              {!reduced && running && walkers.map((w) => (
                <motion.span
                  key={`${w.id}-${cycle}`}
                  className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                  style={{ left: `${(w.fromX / VIEWBOX.w) * 100}%` }}
                  initial={{ top: '92%', opacity: 0 }}
                  animate={{ top: ['92%', '10%'], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: w.dur / 1000, delay: w.delay / 1000, repeat: Infinity, repeatDelay: (walkerLoopMs - w.dur) / 1000, ease: 'linear', times: [0, 0.12, 0.88, 1] }}
                  aria-hidden="true"
                />
              ))}
              {/* SVG 기준선 (CSS 드로잉) */}
              <svg viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`} className="absolute inset-0 w-full h-full" aria-hidden="true" preserveAspectRatio="none">
                <defs>
                  <marker id="count-arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill={LINE_ENTRY} />
                  </marker>
                </defs>
                {footfallLines.map((l, i) => (
                  <line key={l.id} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={LINE_FOOTFALL} strokeWidth={2.5} strokeLinecap="round" style={drawStyle(i, lineLen(l))} />
                ))}
                <line x1={entryLine.x1} y1={entryLine.y1} x2={entryLine.x2} y2={entryLine.y2} stroke={LINE_ENTRY} strokeWidth={2.5} strokeLinecap="round" markerEnd="url(#count-arrow)" style={drawStyle(2, lineLen(entryLine))} />
              </svg>
              {/* 라인 라벨 (HTML pill) */}
              {[{ l: footfallLines[0], txt: t.f1, color: 'text-sky-300' }, { l: footfallLines[1], txt: t.f2, color: 'text-sky-300' }, { l: entryLine, txt: t.entryLabel, color: 'text-pink-300' }].map((p, i) => {
                const m = mid(p.l);
                return (
                  <span key={i} className={`absolute -translate-x-1/2 -translate-y-1/2 rounded bg-black/50 px-1 py-0.5 text-[7px] font-medium ${p.color}`} style={{ left: `${(m.x / VIEWBOX.w) * 100}%`, top: `${(m.y / VIEWBOX.h) * 100}%` }}>{p.txt}</span>
                );
              })}
              {/* 줌 컨트롤 (장식) */}
              <div className="absolute bottom-1.5 right-1.5 flex gap-1 text-white/50" aria-hidden="true">
                {[Plus, Minus, Maximize].map((Ic, i) => (
                  <span key={i} className="w-5 h-5 rounded bg-white/10 flex items-center justify-center"><Ic className="w-3 h-3" /></span>
                ))}
              </div>
              {/* 예시 표기 (컴플라이언스) */}
              <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/50 backdrop-blur px-1.5 py-0.5 text-[7px] font-medium text-white/70">{t.note}</span>
            </div>

            {/* 하단 실시간 카드 */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <motion.div key={`fcard-${cycle}`} initial={reduced ? false : { scale: 0.96, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }} transition={springSnappy}
                className="rounded-xl border border-sky-400/30 bg-sky-400/10 p-2.5">
                <p className="flex items-center gap-1 text-3xs text-sky-300"><span className="w-1.5 h-1.5 rounded-full bg-sky-400" aria-hidden="true" />{t.footfall}</p>
                <p className="mt-0.5 text-xl font-bold tabular-nums leading-none">{reduced ? countTargets.footfall : footfall}</p>
                <p className="text-[8px] text-white/40 mt-0.5">{t.footfallSub}</p>
              </motion.div>
              <motion.div key={`ecard-${cycle}`} initial={reduced ? false : { scale: 0.96, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }} transition={{ ...springSnappy, delay: 0.06 }}
                className="rounded-xl border border-pink-500/30 bg-pink-500/10 p-2.5">
                <p className="flex items-center gap-1 text-3xs text-pink-300"><span className="w-1.5 h-1.5 rounded-full bg-pink-500" aria-hidden="true" />{t.entry}</p>
                <div className="mt-0.5 flex items-baseline gap-1.5">
                  <p className="text-xl font-bold tabular-nums leading-none">{reduced ? countTargets.entry : entry}</p>
                  <p className="text-3xs font-medium text-pink-300 tabular-nums">{t.conversion} {convDisplay}%</p>
                </div>
                <p className="text-[8px] text-white/40 mt-0.5">{t.entrySub}</p>
              </motion.div>
            </div>
          </div>
        </PhoneScreen>
      </PhoneFrame>
    </div>
  );
}

export default memo(StoreCountCountingMockup);
