'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bell, Activity, Clock, Store, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useMockupLoop } from '@/hooks/useMockupLoop';
import { useCountUp } from '@/hooks/useCountUp';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { canonicalHq } from '@/data/mockup-scenarios/canonical';
import MockupBadge from './MockupBadge';
import SaaiHeader from './SaaiHeader';
import { homeCopy } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

type Status = 'normal' | 'warning' | 'critical';

const COPY: Record<Locale, {
  sub: string;
  kpiAlerts: string;
  kpiAlertsSub: string;
  kpiAlertsUnit: string;
  kpiResponse: string;
  kpiSaved: string;
  kpiStores: string;
  mapTitle: string;
  mapDesc: string;
  legend: Record<Status, string>;
  statusLabel: Record<Status, string>;
  cardAlerts: string;
  cardRevenue: string;
  liveLabel: string;
}> = {
  ko: {
    sub: '200개 가맹점의 상태를 본사 한 화면에서.',
    kpiAlerts: '본부 확인 필요',
    kpiAlertsSub: '전체 신호',
    kpiAlertsUnit: '건',
    kpiResponse: '응답률',
    kpiSaved: '점포당 일일 절감',
    kpiStores: '전체 매장',
    mapTitle: '전국 가맹점 상태 지도',
    mapDesc: '대한민국 전역 200개 가맹점의 실시간 상태 분포. 정상 187, 주의 9, 긴급 4.',
    legend: { normal: '정상', warning: '주의', critical: '긴급' },
    statusLabel: { normal: '정상', warning: '주의', critical: '긴급' },
    cardAlerts: '알림',
    cardRevenue: '매출 전일비',
    liveLabel: '실시간',
  },
  en: {
    sub: '200 franchise stores, one HQ view.',
    kpiAlerts: 'Needs HQ review',
    kpiAlertsSub: 'of all signals',
    kpiAlertsUnit: '',
    kpiResponse: 'Response rate',
    kpiSaved: 'Saved / store / day',
    kpiStores: 'Total stores',
    mapTitle: 'Nationwide store status map',
    mapDesc: 'Live status of 200 stores across Korea. Normal 187, warning 9, critical 4.',
    legend: { normal: 'Normal', warning: 'Warning', critical: 'Critical' },
    statusLabel: { normal: 'Normal', warning: 'Warning', critical: 'Critical' },
    cardAlerts: 'Alerts',
    cardRevenue: 'Revenue vs. prev',
    liveLabel: 'Live',
  },
  jp: {
    sub: '200店舗の状態を、本部の一画面で。',
    kpiAlerts: '本部の確認が必要',
    kpiAlertsSub: '全シグナル',
    kpiAlertsUnit: '件',
    kpiResponse: '応答率',
    kpiSaved: '店舗あたり日次削減',
    kpiStores: '全店舗',
    mapTitle: '全国店舗ステータスマップ',
    mapDesc: '韓国全域200店舗のリアルタイム状態。正常187、注意9、緊急4。',
    legend: { normal: '正常', warning: '注意', critical: '緊急' },
    statusLabel: { normal: '正常', warning: '注意', critical: '緊急' },
    cardAlerts: 'アラート',
    cardRevenue: '売上前日比',
    liveLabel: 'ライブ',
  },
};

const STATUS_COLOR: Record<Status, string> = {
  normal: '#94A3B8',
  warning: '#F59E0B',
  critical: '#EF4444',
};
const STATUS_DOT_CLASS: Record<Status, string> = {
  normal: 'bg-slate-400',
  warning: 'bg-amber-500',
  critical: 'bg-red-500',
};

// Store coordinates in the korea-map.svg coordinate space (viewBox 0 0 800 1200),
// hand-placed on real regions (수도권 cluster · 강원 · 충청 · 호남 · 영남 · 제주).
// Deterministic — no Math.random at render (SSR-safe). The first 13 slots are the
// abnormal stores (9 warning + 4 critical) and are ALWAYS rendered so the legend
// (187/9/4) matches the on-screen abnormal count. The rest are a thinned subset of
// normal stores for visual texture (a realistic west/south-weighted spread).
const INTERIOR_POINTS: { x: number; y: number }[] = [
  // --- 9 warning (rendered first), spread nationwide ---
  { x: 310, y: 235 }, { x: 260, y: 280 }, { x: 430, y: 230 },
  { x: 340, y: 430 }, { x: 210, y: 650 }, { x: 500, y: 560 },
  { x: 250, y: 760 }, { x: 470, y: 720 }, { x: 170, y: 1120 },
  // --- 4 critical (near key metros) ---
  { x: 300, y: 275 }, { x: 600, y: 740 }, { x: 360, y: 490 }, { x: 430, y: 690 },
  // --- normal stores (thinned subset for texture) ---
  { x: 285, y: 250 }, { x: 330, y: 300 }, { x: 260, y: 310 }, { x: 360, y: 255 },
  { x: 450, y: 280 }, { x: 400, y: 330 }, { x: 490, y: 340 }, { x: 540, y: 420 },
  { x: 280, y: 440 }, { x: 250, y: 520 }, { x: 330, y: 520 }, { x: 400, y: 560 },
  { x: 200, y: 700 }, { x: 170, y: 740 }, { x: 230, y: 820 }, { x: 280, y: 700 },
  { x: 560, y: 500 }, { x: 620, y: 560 }, { x: 660, y: 580 }, { x: 520, y: 640 },
  { x: 580, y: 640 }, { x: 440, y: 760 }, { x: 210, y: 1130 }, { x: 130, y: 1140 },
];

// Build pins from fixed interior coordinates. All 13 abnormal pins (9 warning +
// 4 critical) are rendered; normal pins fill the remaining interior slots.
function buildPins() {
  const dist = canonicalHq.statusDistribution;
  const seq: Status[] = [
    ...Array<Status>(dist.warning).fill('warning'),
    ...Array<Status>(dist.critical).fill('critical'),
    ...Array<Status>(Math.max(0, INTERIOR_POINTS.length - dist.warning - dist.critical)).fill('normal'),
  ];
  return INTERIOR_POINTS.map((pt, i) => ({
    x: pt.x,
    y: pt.y,
    status: seq[i],
    id: i,
  }));
}

const STORE_NAMES = ['서초중앙점', '판교테크노점', '광안리점', '둔산로점', '전대후문점', '송도국제점'];

export default function HqMapDashboardMockup({
  active = true,
  locale = 'en',
  className = '',
}: {
  active?: boolean;
  locale?: Locale;
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const t = COPY[locale] ?? COPY.en;
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  const pins = useMemo(() => buildPins(), []);
  // cycle only through the highlighted (non-normal) pins, then a few normal ones
  const cyclePins = useMemo(() => {
    const flagged = pins.filter((p) => p.status !== 'normal');
    const someNormal = pins.filter((p) => p.status === 'normal').slice(0, 3);
    return [...flagged, ...someNormal];
  }, [pins]);

  const loopActive = isVisible && active && !reducedMotion;
  const { step, hoverProps } = useMockupLoop({
    steps: cyclePins.length,
    interval: 2600,
    active: loopActive,
    pauseOnHover: true,
  });

  const activePin = cyclePins[reducedMotion ? 0 : step % cyclePins.length];
  const activeIndex = pins.findIndex((p) => p.id === activePin.id);

  const countActive = isVisible && active && !reducedMotion;
  const alerts = useCountUp(canonicalHq.dailyAlerts, countActive);
  const response = useCountUp(canonicalHq.responseRate, countActive);
  const savedX10 = useCountUp(Math.round(canonicalHq.dailyHoursSaved * 10), countActive);
  const stores = useCountUp(canonicalHq.totalStores, countActive);

  const displayAlerts = reducedMotion ? canonicalHq.dailyAlerts : alerts;
  const displayResponse = reducedMotion ? canonicalHq.responseRate : response;
  const displaySaved = reducedMotion ? canonicalHq.dailyHoursSaved : savedX10 / 10;
  const displayStores = reducedMotion ? canonicalHq.totalStores : stores;

  // deterministic per-pin mock card data
  const cardName = STORE_NAMES[activeIndex % STORE_NAMES.length];
  const cardAlertCount = 3 + ((activeIndex * 7) % 22);
  const cardRevenueDelta =
    activePin.status === 'critical' ? -18 : activePin.status === 'warning' ? -6 : 8;

  // KPI #1 is reframed: the headline number is the count that needs HQ review
  // (warning + critical = 13), with the full daily signal pool (1,247) demoted
  // to subtext — avoids glorifying alert overload (see AlertFatigueComparison).
  const needsReview =
    canonicalHq.statusDistribution.warning + canonicalHq.statusDistribution.critical;

  const kpis: {
    icon: typeof Bell;
    label: string;
    value: string;
    suffix: string;
    sub?: string;
  }[] = [
    {
      icon: Bell,
      label: t.kpiAlerts,
      value: String(needsReview),
      suffix: t.kpiAlertsUnit,
      sub: `${t.kpiAlertsSub} ${displayAlerts.toLocaleString('en-US')}${t.kpiAlertsUnit}`,
    },
    { icon: Activity, label: t.kpiResponse, value: String(displayResponse), suffix: '%' },
    { icon: Clock, label: t.kpiSaved, value: displaySaved.toFixed(1), suffix: 'h' },
    { icon: Store, label: t.kpiStores, value: String(displayStores), suffix: '' },
  ];

  const legendItems: { status: Status; count: number }[] = [
    { status: 'normal', count: canonicalHq.statusDistribution.normal },
    { status: 'warning', count: canonicalHq.statusDistribution.warning },
    { status: 'critical', count: canonicalHq.statusDistribution.critical },
  ];

  return (
    <div
      ref={ref}
      {...hoverProps}
      className={`w-full rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Store className="h-4 w-4 text-primary" aria-hidden />
          </div>
          <span className="text-sm font-medium tracking-tight">{t.mapTitle}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-2xs font-medium text-slate-500">
            <span className="relative flex h-1.5 w-1.5">
              {!reducedMotion && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              )}
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            {t.liveLabel}
          </span>
          <MockupBadge locale={locale} />
        </div>
      </div>

      {/* Master heading */}
      <div className="px-5 pt-5 pb-4">
        <SaaiHeader name="saai" tone="light" className="mb-1.5" />
        <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{homeCopy[locale].masterCompany}</h3>
        <p className="mt-1 text-sm text-slate-500">{t.sub}</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 px-5 pb-5 sm:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-3"
            >
              <div className="flex items-center gap-1.5 text-slate-400">
                <Icon className="h-3.5 w-3.5" aria-hidden />
                <span className="text-2xs font-medium">{k.label}</span>
              </div>
              <div className="mt-1.5 flex items-baseline gap-0.5">
                <span className="text-2xl font-bold tabular-nums tracking-tight">{k.value}</span>
                <span className="text-sm font-medium text-slate-400">{k.suffix}</span>
              </div>
              {k.sub && (
                <div className="mt-0.5 text-3xs font-medium tabular-nums text-slate-400">
                  {k.sub}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Map + side card */}
      <div className="grid grid-cols-1 gap-4 px-5 pb-5 lg:grid-cols-[1fr_260px]">
        {/* Map */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <div className="relative mx-auto aspect-[2/3] w-full max-w-[300px]">
            {/* Real South Korea map (regions) as the base layer */}
            <Image
              src="/images/korea-map.svg"
              alt=""
              fill
              sizes="(min-width: 1024px) 300px, 90vw"
              aria-hidden
              unoptimized
              draggable={false}
              className="pointer-events-none select-none object-contain"
            />
            {/* Store pins overlaid in the map's coordinate space (0 0 800 1200) */}
            <svg
              viewBox="0 0 800 1200"
              role="img"
              aria-labelledby="hqmap-title hqmap-desc"
              className="absolute inset-0 h-full w-full"
            >
              <title id="hqmap-title">{t.mapTitle}</title>
              <desc id="hqmap-desc">{t.mapDesc}</desc>
              {pins.map((p) => {
                const isActive = p.id === activePin.id;
                const r = p.status === 'normal' ? 9 : 12;
                return (
                  <g key={p.id}>
                    {isActive && !reducedMotion && (
                      <motion.circle
                        cx={p.x}
                        cy={p.y}
                        r={r}
                        fill="none"
                        stroke={STATUS_COLOR[p.status]}
                        strokeWidth={3}
                        initial={{ r, opacity: 0.7 }}
                        animate={{ r: r + 24, opacity: 0 }}
                        transition={{ duration: 1.3, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isActive ? r + 4 : r}
                      fill={STATUS_COLOR[p.status]}
                      fillOpacity={p.status === 'normal' && !isActive ? 0.6 : 0.95}
                      stroke="#fff"
                      strokeWidth={isActive ? 3 : 1.5}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="mt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            {legendItems.map((l) => (
              <span key={l.status} className="flex items-center gap-1.5 text-xs">
                <span
                  className={`h-2 w-2 rounded-full ${STATUS_DOT_CLASS[l.status]}`}
                  aria-hidden
                />
                <span className="font-medium text-slate-600">{t.legend[l.status]}</span>
                <span className="font-bold tabular-nums text-slate-900">{l.count}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Mini store card */}
        <motion.div
          key={activePin.id}
          initial={reducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium tracking-tight">{cardName}</span>
              <span
                className="flex items-center gap-1 rounded-full px-2 py-0.5 text-2xs font-medium"
                style={{
                  color: STATUS_COLOR[activePin.status],
                  backgroundColor: STATUS_COLOR[activePin.status] + '1A',
                }}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT_CLASS[activePin.status]}`}
                  aria-hidden
                />
                {t.statusLabel[activePin.status]}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{t.cardAlerts}</span>
                <span className="text-lg font-bold tabular-nums">{cardAlertCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{t.cardRevenue}</span>
                <span
                  className={`flex items-center gap-0.5 text-lg font-bold tabular-nums ${
                    cardRevenueDelta >= 0 ? 'text-emerald-600' : 'text-red-500'
                  }`}
                >
                  {cardRevenueDelta >= 0 ? (
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" aria-hidden />
                  )}
                  {cardRevenueDelta >= 0 ? '+' : ''}
                  {cardRevenueDelta}%
                </span>
              </div>
            </div>
          </div>

          {/* progress dots for cycle position */}
          <div className="mt-5 flex items-center gap-1" aria-hidden>
            {cyclePins.map((_, i) => (
              <span
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i === (reducedMotion ? 0 : step % cyclePins.length)
                    ? 'bg-primary'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
