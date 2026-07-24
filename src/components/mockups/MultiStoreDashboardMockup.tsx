'use client';

import { useState } from 'react';
import { useSequencedLoop } from '@/hooks/useSequencedLoop';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Users, Bell, TrendingUp, Sparkles, Store, Lock, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import MacBookFrame from './MacBookFrame';
import TabletFrame from './TabletFrame';
import BrowserChrome from './BrowserChrome';
import MockupBadge from './MockupBadge';
import MockupViewport from './MockupViewport';
import { motionEnter } from '@/lib/mockup-motion';
import { MOCKUP_SCHEME, MOCKUP_DEVICE } from '@/lib/mockup-tokens';
import { type DeepPartial, mergeMockupContent } from './types';

const S = MOCKUP_SCHEME.light;
const D = MOCKUP_DEVICE.desktop;
import { useCountUpGroup } from '@/hooks/useCountUp';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { stores, chartSets, statusMeta, kpiConfigs } from '@/data/mockup-scenarios/enterprise';
import type { KpiConfig, StoreStatus } from '@/data/mockup-scenarios/enterprise';
import { type Locale } from '@/lib/i18n';

const kpiIconMap: Record<KpiConfig['iconName'], LucideIcon> = {
  BarChart3, Users, Bell, TrendingUp,
};

/**
 * 문구 오버라이드 단위 — 부분 병합(mergeMockupContent). 기본: C[locale].
 *
 * ⚠️ 아직 오버라이드 안 되는 것: `stores`/`chartSets`/`kpiConfigs`(숫자 데이터,
 * data/mockup-scenarios/enterprise.ts). KPI 카운트업은 useCountUpGroup(배열형,
 * MM §2-C 리팩터)으로 kpiConfigs 길이를 따라가므로 훅 규칙 제약은 해소됐지만,
 * 구조분해 변수·필드 매핑이 4개 KPI 구성을 전제하므로 여전히 "문구만"
 * 오버라이드 가능한 상태다.
 */
export interface MultiStoreDashboardCopy {
  storeNames: Record<number, string>;
  statusText: Record<StoreStatus, string>;
  kpiLabels: Record<KpiConfig['field'], string>;
  kpiUnits: Record<KpiConfig['field'], string>;
  sidebarTitle: string;
  badgeLabel: string;
  storesConnected: (n: number) => string;
  realtimeSync: string;
  aiAnalysis: string;
  chartVisitors: string;
  storePerformance: string;
  updatedLabel: string;
  insightCritical: (name: string, alerts: number) => string;
  insightWarning: (name: string, alerts: number) => string;
  insightNormal: (name: string, perf: number) => string;
}

const C: Record<Locale, MultiStoreDashboardCopy> = {
  ko: {
    storeNames: { 1: '강남역점', 2: '홍대점', 3: '잠실점', 4: '신촌점', 5: '건대점' },
    statusText: { normal: '정상', warning: '주의', critical: '긴급' },
    kpiLabels: { revenue: '일 매출', visitors: '방문자', alerts: '알림', perf: '성과점수' },
    kpiUnits: { revenue: '만', visitors: '명', alerts: '건', perf: '점' },
    sidebarTitle: '전체 매장 관리',
    badgeLabel: '예시 화면',
    storesConnected: (n) => `예시 ${n}개 매장`,
    realtimeSync: '실시간 동기화',
    aiAnalysis: 'AI 분석',
    chartVisitors: '방문이 두 차례 몰림 — 두 번째 피크가 가장 높음',
    storePerformance: '매장 성과',
    updatedLabel: '방금 업데이트',
    insightCritical: (name, alerts) => `${name}: 알림 ${alerts}건 미처리. 즉시 확인이 필요합니다.`,
    insightWarning: (name, alerts) => `${name}: 알림 ${alerts}건 확인 필요 — 발주 검토를 권장합니다.`,
    insightNormal: (name, perf) => `${name}: 정상 운영 중. 오늘 성과 ${perf}점 달성.`,
  },
  en: {
    storeNames: { 1: 'Gangnam', 2: 'Hongdae', 3: 'Jamsil', 4: 'Sinchon', 5: 'Konkuk' },
    statusText: { normal: 'Normal', warning: 'Warning', critical: 'Critical' },
    kpiLabels: { revenue: 'Daily Sales', visitors: 'Visitors', alerts: 'Alerts', perf: 'Performance' },
    kpiUnits: { revenue: 'k', visitors: '', alerts: '', perf: 'pts' },
    sidebarTitle: 'All Stores',
    badgeLabel: 'Example dashboard',
    storesConnected: (n) => `${n} example stores`,
    realtimeSync: 'Live sync',
    aiAnalysis: 'AI analysis',
    chartVisitors: 'Two visit surges — the later peak is highest',
    storePerformance: 'Store performance',
    updatedLabel: 'Updated just now',
    insightCritical: (name, alerts) => `${name}: ${alerts} alerts unresolved. Immediate review required.`,
    insightWarning: (name, alerts) => `${name}: ${alerts} alerts need review — reorder check recommended.`,
    insightNormal: (name, perf) => `${name}: operating normally. Performance ${perf} pts today.`,
  },
  jp: {
    storeNames: { 1: '江南駅店', 2: '弘大店', 3: '蚕室店', 4: '新村店', 5: '建大店' },
    statusText: { normal: '正常', warning: '注意', critical: '緊急' },
    kpiLabels: { revenue: '日次売上', visitors: '来店者', alerts: 'アラート', perf: '成果スコア' },
    kpiUnits: { revenue: '万', visitors: '人', alerts: '件', perf: '点' },
    sidebarTitle: '全店舗管理',
    badgeLabel: 'サンプル画面',
    storesConnected: (n) => `サンプル${n}店舗`,
    realtimeSync: 'リアルタイム同期',
    aiAnalysis: 'AI分析',
    chartVisitors: '来店は二度のピーク — 後半のピークが最も高い',
    storePerformance: '店舗成果',
    updatedLabel: '更新したばかり',
    insightCritical: (name, alerts) => `${name}：アラート${alerts}件が未処理です。直ちに確認が必要です。`,
    insightWarning: (name, alerts) => `${name}：アラート${alerts}件の確認が必要です — 発注の見直しを推奨します。`,
    insightNormal: (name, perf) => `${name}：正常に稼働中です。本日の成果${perf}点を達成しました。`,
  },
};

interface Props {
  active?: boolean;
  locale?: Locale;
  device?: 'macbook' | 'tablet';
  /** 문구 오버라이드 — 부분 병합. 기본: C[locale]. 숫자 데이터는 아직 오버라이드 불가(위 주석 참고) */
  content?: DeepPartial<MultiStoreDashboardCopy>;
}

export default function MultiStoreDashboardMockup({ active = true, locale = 'en', device = 'macbook', content }: Props) {
  const t = mergeMockupContent(C[locale] ?? C.en, content);
  const reducedMotion = usePrefersReducedMotion();
  const isTablet = device === 'tablet';
  const Frame = isTablet ? TabletFrame : MacBookFrame;
  const [selIdx, setSelIdx] = useState(0);
  const [kpiActive, setKpiActive] = useState(false);
  const [barsKey, setBarsKey] = useState(0);
  const { ref: containerRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  // Cycle through stores, replaying KPIs/bars per store (animation plan C10 —
  // shared loop scaffolding; cancel/timer/restart/visibility bookkeeping lives in
  // the hook, which also replaces the old loopKey-driven restart).
  useSequencedLoop(
    (sched) => {
      setSelIdx(0);
      setKpiActive(false);
      setBarsKey(0);

      sched(() => { setKpiActive(true); setBarsKey(k => k + 1); }, 300);

      stores.forEach((_, i) => {
        if (i === 0) return;
        const ms = 300 + i * 2200;
        sched(() => setKpiActive(false), ms - 180);
        sched(() => { setSelIdx(i); setKpiActive(true); setBarsKey(k => k + 1); }, ms);
      });

      return 300 + stores.length * 2200 + 1200;
    },
    {
      active: isVisible && active,
      reducedMotion,
      onStatic: () => { setSelIdx(0); setKpiActive(true); },
    },
  );

  const store = stores[selIdx] ?? stores[0];
  const chartData = chartSets[store.id];
  const chartMax = Math.max(...chartData);
  const sm = statusMeta[store.status];

  // KPI 카운트업 — 고정 4회 useCountUp 나열을 그룹 훅 한 번으로 (MM §2-C 리팩터)
  const [revenue, visitors, alrtCnt, perf] = useCountUpGroup(
    [store.revenue, store.visitors, store.alerts, store.perf],
    kpiActive,
    kpiConfigs.map((c) => c.countUpDuration),
  );

  const kpiValuesByField: Record<string, number> = { revenue, visitors, alerts: alrtCnt, perf };

  const kpis = kpiConfigs.map((cfg) => ({
    icon: kpiIconMap[cfg.iconName],
    label: t.kpiLabels[cfg.field],
    value: kpiValuesByField[cfg.field],
    unit: t.kpiUnits[cfg.field],
    color: cfg.color,
    bg: cfg.bg,
    delta: store.deltas[cfg.field],
    deltaSuffix: cfg.deltaType === 'pct' ? '%' : cfg.deltaType === 'pts' ? t.kpiUnits.perf : '',
    invert: cfg.invert ?? false,
  }));

  return (
    // v2 크기 계약: desktop 1280×800 고정 캔버스. 프레임 포함 800 근접 —
    // macbook은 프레임 크롬(노치·힌지·베이스 등 ~110px)만큼 스크린을 줄인다.
    <div ref={containerRef}>
      {/* minScale 0.25: 홈 2열 컬럼(~490px = 0.38×)처럼 좁은 호출부에서 기본 0.4 클램프가
          걸리면 캔버스가 컨테이너보다 넓어져 우측이 잘린다 — 데스크톱 캔버스는 하한을 낮춘다. */}
      <MockupViewport design="desktop" minScale={0.25}>
      <Frame className="max-w-none!">
        <MockupBadge label={t.badgeLabel} />
        <div className={`flex flex-col overflow-hidden ${isTablet ? 'h-[790px] rounded-[1rem]' : 'h-[740px]'}`}>
        <BrowserChrome variant="light">
          <div className="flex-1 flex items-center gap-1.5 bg-white rounded-md px-3 py-1 text-xs text-gray-500 border border-gray-200">
            <Lock className="w-3 h-3 text-gray-400 shrink-0" aria-hidden="true" />
            app.saai.ai/enterprise/stores
          </div>
        </BrowserChrome>

        {/* App layout */}
        <div className={`flex ${S.bodyBg} flex-1 min-h-0`}>
          {/* Sidebar */}
          <div className="w-44 bg-gray-900 text-white shrink-0 flex flex-col">
            <div className="px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Store className="w-3.5 h-3.5 text-(--saai-blue-300)" aria-hidden="true" />
                <span className="text-sm font-bold">{t.sidebarTitle}</span>
              </div>
              <p className="text-2xs text-gray-400 mt-0.5">{t.storesConnected(stores.length)}</p>
            </div>
            <nav className="flex-1 py-2" aria-hidden="true">
              {stores.map((s, i) => {
                const dot = statusMeta[s.status].dot;
                return (
                  <div
                    key={s.id}
                    className={`px-4 py-2.5 flex items-center gap-2.5 border-l-2 transition-colors duration-300 ${selIdx === i ? 'bg-white/10 border-(--saai-blue-300)' : 'border-transparent'}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
                    <span className={`text-xs transition-colors duration-300 ${selIdx === i ? 'text-white font-medium' : 'text-gray-400'}`}>
                      {t.storeNames[s.id]}
                    </span>
                    {s.alerts > 0 && (
                      <span className="ml-auto text-3xs font-bold bg-(--saai-status-error) text-white w-4 h-4 rounded-full flex items-center justify-center shrink-0">
                        {s.alerts}
                      </span>
                    )}
                  </div>
                );
              })}
            </nav>
            <div className="px-4 py-3 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-(--saai-status-success) animate-pulse motion-reduce:animate-none" />
                <span className="text-2xs text-gray-400">{t.realtimeSync}</span>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 overflow-hidden flex flex-col">
            {/* Header — min-height prevents row collapse during the name swap (AnimatePresence) */}
            <div className="flex items-center justify-between mb-3 min-h-[1.75rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={store.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={motionEnter}
                  className="flex items-center gap-2"
                >
                  <h2 className={`${D.headerTitle} ${S.textPrimary}`}>{t.storeNames[store.id]}</h2>
                  <span className={`text-2xs font-bold px-1.5 py-0.5 rounded-full ${sm.badge}`}>
                    {t.statusText[store.status]}
                  </span>
                </motion.div>
              </AnimatePresence>
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="flex items-center gap-1 text-2xs text-gray-400">
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  {t.updatedLabel}
                </span>
                <span className="flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3 text-primary" aria-hidden="true" />
                  <span className="text-2xs text-primary font-medium">{t.aiAnalysis}</span>
                </span>
              </div>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-4 gap-2 mb-3" aria-hidden="true">
              {kpis.map((kpi) => {
                const Icon = kpi.icon;
                return (
                  <div key={kpi.label} className={`${S.cardClass} ${D.cardPadding}`}>
                    <div className={`w-6 h-6 rounded-md ${kpi.bg} flex items-center justify-center mb-1.5`}>
                      <Icon className={`w-3 h-3 ${kpi.color}`} aria-hidden="true" />
                    </div>
                    <p className="text-2xs text-gray-400 mb-0.5">{kpi.label}</p>
                    <div className="flex items-end justify-between gap-1">
                      <p className={`text-base font-bold ${S.textPrimary} tabular-nums leading-none`}>
                        {kpi.value.toLocaleString('en-US')}
                        <span className="text-2xs font-medium text-gray-400 ml-0.5">{kpi.unit}</span>
                      </p>
                      {(() => {
                        const d = kpi.delta;
                        const cls = `text-2xs font-bold tabular-nums shrink-0 transition-opacity duration-300 ${kpiActive ? 'opacity-100' : 'opacity-0'}`;
                        if (d === 0) return <span className={`${cls} text-gray-300`}>—</span>;
                        const bad = kpi.invert ? d > 0 : d < 0;
                        return (
                          <span className={`${cls} ${bad ? 'text-(--saai-chart-negative)' : 'text-(--saai-chart-positive)'}`}>
                            {d > 0 ? '▲' : '▼'}{Math.abs(d)}{kpi.deltaSuffix}
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-5 gap-2 mb-2 flex-1 min-h-0">
              {/* Visitor bar chart */}
              <div className={`col-span-3 ${S.cardClass} p-3 flex flex-col`}>
                <p className="text-2xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.chartVisitors}</p>
                <div className="flex items-end gap-0.5 flex-1 min-h-0" aria-hidden="true">
                  {chartData.map((v, i) => (
                    <motion.div
                      key={`${barsKey}-${i}`}
                      className={`flex-1 rounded-t-sm ${i === 3 || i === 4 ? 'bg-primary' : 'bg-primary/35'}`}
                      initial={{ height: reducedMotion ? `${(v / chartMax) * 100}%` : 0 }}
                      animate={{ height: kpiActive ? `${(v / chartMax) * 100}%` : 0 }}
                      transition={reducedMotion ? { duration: 0 } : { ...motionEnter, delay: i * 0.04 }}
                    />
                  ))}
                </div>
              </div>

              {/* Store ranking */}
              <div className={`col-span-2 ${S.cardClass} p-3`}>
                <p className="text-2xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.storePerformance}</p>
                <div className="space-y-1.5" aria-hidden="true">
                  {stores.slice(0, 4).map((s, i) => (
                    <div key={s.id} className="flex items-center gap-1">
                      <span className={`text-2xs w-12 shrink-0 truncate ${s.id === store.id ? 'font-bold text-primary' : 'text-gray-500'}`}>
                        {t.storeNames[s.id]}
                      </span>
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${s.id === store.id ? 'bg-primary' : 'bg-gray-300'}`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: kpiActive ? s.perf / 100 : 0 }}
                          transition={{ ...motionEnter, delay: i * 0.1 + 0.3 }}
                          style={{ originX: 0 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI insight — fixed-height wrapper keeps the container stable across
                store swaps (AnimatePresence) and varying text length */}
            <div className="h-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`insight-${store.id}`}
                  className="h-full bg-primary/5 rounded-lg px-3 py-2 border border-primary/10 flex items-start gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles className="w-3 h-3 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-xs text-gray-700 leading-relaxed line-clamp-2">
                    {store.status === 'critical'
                      ? t.insightCritical(t.storeNames[store.id], store.alerts)
                      : store.status === 'warning'
                      ? t.insightWarning(t.storeNames[store.id], store.alerts)
                      : t.insightNormal(t.storeNames[store.id], store.perf)
                    }
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        </div>
      </Frame>
      </MockupViewport>
    </div>
  );
}
