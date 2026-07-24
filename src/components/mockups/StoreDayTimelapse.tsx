'use client';

/**
 * #16 StoreDayTimelapse — "강남역점의 하루" master demo.
 * Single source of truth = scrub time `t` (minutes, 360=06:00 … 1440=24:00).
 * State machine: playing ↔ scrubbing ↔ paused. Auto-play = 30s per full day loop.
 * Chart / heatmap / KPIs are PURE FUNCTIONS of `t` (memoized); only `t` (+ play state) is state.
 */

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import MockupBadge from './MockupBadge';
import SaaiHeader from './SaaiHeader';
import { SAAI_COLORS } from '@/lib/mockup-tokens.gen';
import { motionEnter } from '@/lib/mockup-motion';
import { canonicalDay, canonicalStore, formatWon } from '@/data/mockup-scenarios/canonical';
import type { DayHour, DayEvent, DayEventKind } from '@/data/mockup-scenarios/canonical';
import type { Locale } from '@/lib/i18n';

// MockupViewport 예외(MM §5 Phase 3, 1a IntegratedLoop 형식): 스크러버·재생 컨트롤을
// 가진 인터랙티브 위젯 + lg 3컬럼 반응형 레이아웃 — 고정 캔버스 비율 스케일은 슬라이더
// 히트 타깃을 축소시키므로 유동 폭을 유지한다. 색은 .saai-scope 밖이라 SAAI_COLORS 인라인.

// ── Time domain constants ────────────────────────────────────────────────────
const T_START = 360; // 06:00
const T_END = 1440; // 24:00
const T_SPAN = T_END - T_START;
const LOOP_MS = 30_000; // 30s per full day

// ── Kind → color (v2: 제품 구분 emerald/violet 폐지 D2 → SAAI hue 파생) ──────
const KIND_COLOR: Record<DayEventKind, string> = {
  care: SAAI_COLORS['status-success'],
  agent: SAAI_COLORS['primary'],
  insight: SAAI_COLORS['chart-cat-3'],
};

// ── Localized COPY ───────────────────────────────────────────────────────────
interface CopyShape {
  badge: string;
  title: string;
  subtitle: string;
  play: string;
  pause: string;
  timeOf: (t: number) => string; // aria-valuetext like "오후 2시 30분" / "2:30 PM"
  metricSeriesSales: string;
  metricSeriesVisitors: string;
  feedTitle: string;
  feedEmpty: string;
  heatmapTitle: string;
  heatmapToggle: string;
  kpi: { sales: string; visitors: string; dwell: string; conversion: string };
  unitMin: string;
  /** event refId → summary */
  events: Record<string, string>;
}

const COPY: Record<Locale, CopyShape> = {
  ko: {
    badge: '예시 화면',
    title: '강남역점의 하루',
    subtitle: '하나의 화면에서 펼쳐지는 매장의 하루 — 케어·에이전트·인사이트',
    play: '재생',
    pause: '일시정지',
    timeOf: (t) => {
      const h = Math.floor(t / 60) % 24;
      const m = t % 60;
      const ampm = h < 12 ? '오전' : '오후';
      const h12 = h % 12 === 0 ? 12 : h % 12;
      return m === 0 ? `${ampm} ${h12}시` : `${ampm} ${h12}시 ${m}분`;
    },
    metricSeriesSales: '시간대별 매출',
    metricSeriesVisitors: '시간대별 방문',
    feedTitle: '이벤트 피드',
    feedEmpty: '아직 발생한 이벤트가 없습니다.',
    heatmapTitle: '구역 히트맵',
    heatmapToggle: '히트맵',
    kpi: { sales: '누적 매출', visitors: '누적 방문', dwell: '평균 체류', conversion: '전환율' },
    unitMin: '분',
    events: Object.fromEntries(canonicalDay.events.map((e) => [e.refId, e.summary])),
  },
  en: {
    badge: 'Sample screen',
    title: 'A Day at Gangnam Station',
    subtitle: 'A store’s whole day on one screen — Care, Agent, Insight',
    play: 'Play',
    pause: 'Pause',
    timeOf: (t) => {
      const h = Math.floor(t / 60) % 24;
      const m = t % 60;
      const ampm = h < 12 ? 'AM' : 'PM';
      const h12 = h % 12 === 0 ? 12 : h % 12;
      return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
    },
    metricSeriesSales: 'Hourly sales',
    metricSeriesVisitors: 'Hourly visitors',
    feedTitle: 'Event feed',
    feedEmpty: 'No events yet.',
    heatmapTitle: 'Zone heatmap',
    heatmapToggle: 'Heatmap',
    kpi: { sales: 'Cumulative sales', visitors: 'Visitors', dwell: 'Avg. dwell', conversion: 'Conversion' },
    unitMin: 'min',
    events: {
      'morning-briefing': 'Morning briefing — 3 prep tips for today',
      'shelf-empty': 'Beverage shelf low for 1h. Frontage under 30%.',
      'umbrella-order': '70% rain tomorrow — suggest ordering umbrellas',
      'sales-peak': '2PM sales +23% — likely promotion effect',
      'peak-staffing': '4–6PM wait 3.2min — suggest +1 staff',
      'fridge-open': 'Fridge door open 3min. Interior +12°C.',
      'intrusion': 'Night unmanned mode — anomaly dwell watch',
    },
  },
  jp: {
    badge: 'サンプル画面',
    title: '江南駅店の一日',
    subtitle: '一画面で広がる店舗の一日 — ケア・エージェント・インサイト',
    play: '再生',
    pause: '一時停止',
    timeOf: (t) => {
      const h = Math.floor(t / 60) % 24;
      const m = t % 60;
      const ampm = h < 12 ? '午前' : '午後';
      const h12 = h % 12 === 0 ? 12 : h % 12;
      return m === 0 ? `${ampm}${h12}時` : `${ampm}${h12}時${m}分`;
    },
    metricSeriesSales: '時間帯別売上',
    metricSeriesVisitors: '時間帯別来店',
    feedTitle: 'イベントフィード',
    feedEmpty: 'まだイベントはありません。',
    heatmapTitle: 'ゾーンヒートマップ',
    heatmapToggle: 'ヒートマップ',
    kpi: { sales: '累計売上', visitors: '累計来店', dwell: '平均滞在', conversion: '転換率' },
    unitMin: '分',
    events: {
      'morning-briefing': '朝のブリーフィング — 今日の準備のヒント3つ',
      'shelf-empty': '飲料の陳列が1時間補充必要。前面30%未満。',
      'umbrella-order': '明日の降水70% — 傘・雨具の発注を提案',
      'sales-peak': '14時の売上+23% — プロモ効果と推定',
      'peak-staffing': '16〜18時の待ち3.2分 — 人員1名を提案',
      'fridge-open': '冷蔵庫の扉が3分開放。庫内12°C上昇中。',
      'intrusion': '夜間無人モードへ切替 — 異常滞在を監視',
    },
  },
};

// ── Pure helpers (functions of t) ────────────────────────────────────────────
const clampT = (t: number) => Math.max(T_START, Math.min(T_END, t));

/** HH:MM digital clock from t */
function clockOf(t: number): string {
  const h = Math.floor(t / 60) % 24;
  const m = Math.floor(t % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/** Cumulative sales/visitors up to t: full elapsed hours + linear partial current hour. */
function cumulativeOf(hours: DayHour[], t: number): { sales: number; visitors: number } {
  let sales = 0;
  let visitors = 0;
  for (const hr of hours) {
    const hourStart = hr.h * 60;
    const hourEnd = hourStart + 60;
    if (t >= hourEnd) {
      sales += hr.sales;
      visitors += hr.visitors;
    } else if (t > hourStart) {
      const frac = (t - hourStart) / 60;
      sales += hr.sales * frac;
      visitors += hr.visitors * frac;
    }
  }
  return { sales: Math.round(sales), visitors: Math.round(visitors) };
}

/** Day progress 0..1 used to ease dwell/conversion toward canonical targets. */
function dayProgress(t: number): number {
  return Math.max(0, Math.min(1, (t - T_START) / T_SPAN));
}

/** Bracket the two hours surrounding t and interpolate their heat[] arrays. */
function interpolatedHeat(hours: DayHour[], t: number): number[] {
  const minH = hours[0].h;
  const maxH = hours[hours.length - 1].h;
  // hour center = h:30; interpolate between centers for smoothness
  const tc = t / 60 - 0.5;
  if (tc <= minH) return hours[0].heat;
  if (tc >= maxH) return hours[hours.length - 1].heat;
  const lowH = Math.floor(tc);
  const frac = tc - lowH;
  const a = hours.find((h) => h.h === lowH) ?? hours[0];
  const b = hours.find((h) => h.h === lowH + 1) ?? a;
  return a.heat.map((v, i) => v + (b.heat[i] - v) * frac);
}

// heat endpoints — SAAI 시퀀셜 양끝(blue-25 → blue-500) 토큰 파생, raw hex 없음
const hexRgb = (hex: string): [number, number, number] => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
];
const HEAT_LOW = hexRgb(SAAI_COLORS['blue-25']);
const HEAT_HIGH = hexRgb(SAAI_COLORS['blue-500']);

function heatColor(v: number): string {
  // 0..10 → light → brand blue (SAAI sequential endpoints interpolation)
  const tNorm = Math.max(0, Math.min(1, v / 10));
  const [r, g, b] = HEAT_LOW.map((lo, i) => Math.round(lo + (HEAT_HIGH[i] - lo) * tNorm));
  return `rgb(${r},${g},${b})`;
}

interface Props {
  active?: boolean;
  locale?: Locale;
  className?: string;
  kiosk?: boolean;
}

export default function StoreDayTimelapse({
  active = true,
  locale = 'en',
  className = '',
  kiosk = false,
}: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const copy = COPY[locale] ?? COPY.en;
  const hours = canonicalDay.hours;
  const events = canonicalDay.events;

  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  // ── DEV SOT assertion (on mount) ──────────────────────────────────────────
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      const sumSales = hours.reduce((a, h) => a + h.sales, 0);
      const sumVisitors = hours.reduce((a, h) => a + h.visitors, 0);
      if (sumSales !== canonicalStore.forecastRevenueWon) {
        console.warn(
          `[StoreDayTimelapse] SOT mismatch: Σsales=${sumSales} ≠ forecastRevenueWon=${canonicalStore.forecastRevenueWon}`,
        );
      }
      if (sumVisitors !== canonicalStore.visitorsToday) {
        console.warn(
          `[StoreDayTimelapse] SOT mismatch: Σvisitors=${sumVisitors} ≠ visitorsToday=${canonicalStore.visitorsToday}`,
        );
      }
    }
  }, [hours]);

  // ── State machine: single source of truth = t (+ playing) ─────────────────
  // SSR-safe inits (server snapshot: reducedMotion=false). reduced-motion 스냅샷은
  // 하이드레이션 후 effect에서 적용 → #418 미스매치 방지.
  const [t, setT] = useState<number>(T_START);
  const [playing, setPlaying] = useState<boolean>(true);
  const [series, setSeries] = useState<'sales' | 'visitors'>('sales');
  const [heatOpen, setHeatOpen] = useState<boolean>(true);
  const [highlightRef, setHighlightRef] = useState<string | null>(null);

  // reduced-motion: 현재 시각 스냅샷으로 점프 + 자동재생 중지 (마운트 후 1회/토글 시)
  useEffect(() => {
    if (!reducedMotion) return;
    const now = new Date();
    setT(clampT(now.getHours() * 60 + now.getMinutes()));
    setPlaying(false);
  }, [reducedMotion]);

  const playEnabled = active && isVisible && !reducedMotion;

  // ── Auto-play loop (30s/day) via rAF, time-based for stable speed ─────────
  const rafRef = useRef<number>(0);
  const lastTsRef = useRef<number>(0);
  useEffect(() => {
    if (!playing || !playEnabled) {
      lastTsRef.current = 0;
      return;
    }
    const tick = (ts: number) => {
      if (lastTsRef.current === 0) lastTsRef.current = ts;
      const dt = ts - lastTsRef.current;
      lastTsRef.current = ts;
      setT((prev) => {
        const next = prev + (dt / LOOP_MS) * T_SPAN;
        return next >= T_END ? T_START : next; // loop
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, playEnabled]);

  // ── Kiosk: auto-reset to t=06:00 after 90s of no interaction ──────────────
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bumpIdle = useCallback(() => {
    if (!kiosk) return;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setT(T_START);
      if (!reducedMotion) setPlaying(true);
    }, 90_000);
  }, [kiosk, reducedMotion]);
  useEffect(() => {
    bumpIdle();
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [bumpIdle]);

  // ── Interaction: pause on user input, stay paused on release ──────────────
  const pauseForUser = useCallback(() => {
    setPlaying(false);
    bumpIdle();
  }, [bumpIdle]);

  const setTByUser = useCallback(
    (next: number) => {
      setT(clampT(next));
      pauseForUser();
    },
    [pauseForUser],
  );

  const togglePlay = useCallback(() => {
    if (reducedMotion) return;
    setPlaying((p) => !p);
    bumpIdle();
  }, [bumpIdle, reducedMotion]);

  // ── Keyboard on slider ────────────────────────────────────────────────────
  const onSliderKey = useCallback(
    (e: React.KeyboardEvent) => {
      let next: number | null = null;
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          next = t - 30;
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          next = t + 30;
          break;
        case 'PageUp':
          next = t + 120;
          break;
        case 'PageDown':
          next = t - 120;
          break;
        case 'Home':
          next = T_START;
          break;
        case 'End':
          next = T_END;
          break;
        default:
          return;
      }
      e.preventDefault();
      setTByUser(next);
    },
    [t, setTByUser],
  );

  // ── rAF-throttled heat snapshot (interpolation only updates per frame) ────
  const [heat, setHeat] = useState<number[]>(() => interpolatedHeat(hours, T_START));
  const heatRafRef = useRef<number>(0);
  const pendingHeatRef = useRef(false);
  useEffect(() => {
    if (pendingHeatRef.current) return;
    pendingHeatRef.current = true;
    let cancelled = false;
    heatRafRef.current = requestAnimationFrame(() => {
      pendingHeatRef.current = false;
      if (!cancelled) setHeat(interpolatedHeat(hours, t));
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(heatRafRef.current);
    };
  }, [t, hours]);

  // ── Pure derived values (memoized on t) ───────────────────────────────────
  const cumulative = useMemo(() => cumulativeOf(hours, t), [hours, t]);
  const prog = useMemo(() => dayProgress(t), [t]);
  const dwell = useMemo(() => (canonicalStore.avgStayMin * (0.55 + 0.45 * prog)).toFixed(1), [prog]);
  const conversion = useMemo(() => Math.round(canonicalStore.conversionRate * (0.5 + 0.5 * prog)), [prog]);

  const maxVal = useMemo(
    () => Math.max(...hours.map((h) => (series === 'sales' ? h.sales : h.visitors))),
    [hours, series],
  );
  const currentHour = Math.floor(t / 60);

  // visible events (t ≤ scrub), newest on top
  const visibleEvents = useMemo(
    () => events.filter((e) => e.t <= t).slice().sort((a, b) => b.t - a.t),
    [events, t],
  );

  const sliderPct = ((t - T_START) / T_SPAN) * 100;

  // Jump to an event time + highlight its feed card
  const highlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const jumpToEvent = useCallback(
    (e: DayEvent) => {
      if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
      setT(clampT(e.t));
      pauseForUser();
      setHighlightRef(e.refId);
      highlightTimerRef.current = setTimeout(
        () => setHighlightRef((cur) => (cur === e.refId ? null : cur)),
        2200,
      );
    },
    [pauseForUser],
  );
  useEffect(() => () => {
    if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
  }, []);

  const containerCls = kiosk
    ? 'w-full h-full bg-white text-slate-900'
    : 'w-full rounded-2xl bg-white text-slate-900 shadow-card ring-1 ring-slate-200';

  return (
    <div
      ref={ref}
      className={`relative ${containerCls} ${className}`}
      onPointerDown={bumpIdle}
      onWheel={bumpIdle}
    >
      <MockupBadge label={copy.badge} />

      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={isVisible ? { opacity: 1, y: 0 } : undefined}
        transition={motionEnter}
        className={kiosk ? 'p-6 md:p-10' : 'p-4 md:p-6'}
      >
        {/* Header */}
        <header className="mb-4">
          <SaaiHeader name="saai" tone="light" className="mb-1.5" />
          <h3 className="text-lg md:text-xl font-bold tracking-tight">{copy.title}</h3>
          <p className="text-xs md:text-sm text-slate-500">{copy.subtitle}</p>
        </header>

        {/* TOP BAR: clock + play/pause + slider w/ event markers */}
        <div className="mb-5 flex items-center gap-3">
          <div className="font-mono text-2xl md:text-3xl font-bold text-primary tabular-nums select-none">
            {clockOf(t)}
          </div>
          <button
            type="button"
            onClick={togglePlay}
            disabled={reducedMotion}
            aria-label={playing ? copy.pause : copy.play}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white disabled:opacity-40 hover:opacity-90 transition"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>

          {/* Slider */}
          <div className="relative flex-1 h-9">
            {/* track */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-slate-200" />
            {/* filled */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-primary"
              style={{ width: `${sliderPct}%` }}
            />
            {/* event markers */}
            {events.map((e) => {
              const left = ((e.t - T_START) / T_SPAN) * 100;
              return (
                <button
                  key={e.refId}
                  type="button"
                  onClick={() => jumpToEvent(e)}
                  aria-label={`${COPY[locale]?.events[e.refId] ?? e.summary} (${clockOf(e.t)})`}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full ring-2 ring-white shadow"
                  style={{ left: `${left}%`, backgroundColor: KIND_COLOR[e.kind] }}
                />
              );
            })}
            {/* native range for keyboard + a11y */}
            <input
              type="range"
              min={T_START}
              max={T_END}
              step={1}
              value={Math.round(t)}
              aria-label={copy.title}
              aria-valuetext={copy.timeOf(Math.round(t))}
              onChange={(e) => setTByUser(Number(e.target.value))}
              onKeyDown={onSliderKey}
              onPointerDown={pauseForUser}
              className="absolute inset-0 w-full cursor-pointer opacity-0"
            />
            {/* thumb */}
            <div
              className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white ring-2 ring-primary shadow"
              style={{ left: `${sliderPct}%` }}
            />
          </div>
        </div>

        {/* BODY: 3 columns desktop / vertical stack mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* ① Hourly chart */}
          <section className="rounded-xl ring-1 ring-slate-100 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">
                {series === 'sales' ? copy.metricSeriesSales : copy.metricSeriesVisitors}
              </span>
              <div className="flex rounded-md bg-slate-100 p-0.5 text-3xs font-medium">
                <button
                  type="button"
                  onClick={() => { setSeries('sales'); bumpIdle(); }}
                  className={`px-2 py-0.5 rounded ${series === 'sales' ? 'bg-white text-primary shadow-sm' : 'text-slate-500'}`}
                >
                  {copy.kpi.sales.split(' ')[0]}
                </button>
                <button
                  type="button"
                  onClick={() => { setSeries('visitors'); bumpIdle(); }}
                  className={`px-2 py-0.5 rounded ${series === 'visitors' ? 'bg-white text-primary shadow-sm' : 'text-slate-500'}`}
                >
                  {copy.kpi.visitors}
                </button>
              </div>
            </div>
            <div className="flex h-36 items-end gap-[3px]" aria-hidden="true">
              {hours.map((h) => {
                const val = series === 'sales' ? h.sales : h.visitors;
                const hPct = (val / maxVal) * 100;
                const isPast = h.h < currentHour;
                const isCurrent = h.h === currentHour;
                return (
                  <div key={h.h} className="flex flex-1 flex-col items-center justify-end h-full">
                    <div
                      className={`w-full rounded-t-sm transition-colors ${
                        isCurrent
                          ? 'bg-primary'
                          : isPast
                            ? 'bg-primary/60'
                            : 'bg-primary/15 border border-dashed border-primary/30'
                      }`}
                      style={{ height: `${Math.max(hPct, 2)}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-1 flex justify-between text-[9px] text-slate-400 tabular-nums">
              <span>06</span>
              <span>12</span>
              <span>18</span>
              <span>24</span>
            </div>
          </section>

          {/* ② Zone heatmap (collapsible on mobile) */}
          <section className="rounded-xl ring-1 ring-slate-100 p-3">
            <button
              type="button"
              onClick={() => setHeatOpen((o) => !o)}
              className="mb-2 flex w-full items-center justify-between lg:cursor-default"
              aria-expanded={heatOpen}
            >
              <span className="text-xs font-medium text-slate-600">{copy.heatmapTitle}</span>
              <span className="text-3xs text-slate-400 lg:hidden">{heatOpen ? '–' : '+'}</span>
            </button>
            <div className={`${heatOpen ? 'grid' : 'hidden'} lg:grid grid-cols-5 gap-1 aspect-square`}>
              {heat.map((v, i) => (
                <div
                  key={i}
                  className="rounded-sm"
                  style={{ backgroundColor: heatColor(v) }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </section>

          {/* ③ Event feed */}
          <section className="rounded-xl ring-1 ring-slate-100 p-3">
            <span className="mb-2 block text-xs font-medium text-slate-600">{copy.feedTitle}</span>
            <div
              className="flex max-h-48 flex-col gap-2 overflow-y-auto"
              role="log"
              aria-live="polite"
              aria-label={copy.feedTitle}
            >
              {visibleEvents.length === 0 && (
                <p className="text-2xs text-slate-400">{copy.feedEmpty}</p>
              )}
              {visibleEvents.map((e) => {
                const isHi = highlightRef === e.refId;
                return (
                  <div
                    key={e.refId}
                    className={`flex gap-2 rounded-lg p-2 text-2xs ring-1 transition ${
                      isHi ? 'bg-slate-50 ring-2' : 'ring-slate-100'
                    }`}
                    style={isHi ? ({ '--tw-ring-color': KIND_COLOR[e.kind] } as React.CSSProperties) : undefined}
                  >
                    <span
                      className="mt-0.5 h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: KIND_COLOR[e.kind] }}
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="leading-snug text-slate-700">
                        <span className="sr-only">{e.kind}: </span>
                        {copy.events[e.refId] ?? e.summary}
                      </p>
                      <span className="font-mono text-[9px] text-slate-400">{clockOf(e.t)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* BOTTOM: 4 KPIs (cumulative to t) */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <Kpi label={copy.kpi.sales} value={formatWon(cumulative.sales)} />
          <Kpi label={copy.kpi.visitors} value={`${cumulative.visitors}`} />
          <Kpi label={copy.kpi.dwell} value={`${dwell} ${copy.unitMin}`} />
          <Kpi label={copy.kpi.conversion} value={`${conversion}%`} />
        </div>
      </motion.div>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-100">
      <p className="text-3xs font-medium text-slate-500">{label}</p>
      <p className="mt-0.5 text-base md:text-lg font-bold tabular-nums text-slate-900">{value}</p>
    </div>
  );
}
