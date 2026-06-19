'use client';

import {
  BarChart3, TrendingUp, Users, ArrowUpRight, ArrowDownRight,
  LayoutGrid, Eye, MapPin, Calendar, Download, Settings,
  ChevronDown, Lock,
} from 'lucide-react';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useMockupLoop } from '@/hooks/useMockupLoop';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { getToday } from '@/lib/timeUtils';
import BrowserChrome from './BrowserChrome';
import MacBookFrame from './MacBookFrame';
import MockupBadge from './MockupBadge';
import type { BaseMockupProps } from './types';
import { type Locale } from '@/lib/i18n';
import { MOCKUP_SCHEME, MOCKUP_DEVICE } from '@/lib/mockup-tokens';
import {
  desktopMetrics,
  desktopColorMap as colorMap,
  desktopDefaultRankData as DEFAULT_RANK_DATA,
  desktopNavItems,
  desktopInitialHeights,
  desktopHeatmapData,
} from '@/data/mockup-scenarios/storeinsight';

const S = MOCKUP_SCHEME.light;
const D = MOCKUP_DEVICE.desktop;

const ICON_MAP = { BarChart3, TrendingUp, Users, Eye, MapPin, Calendar } as const;

const metrics = desktopMetrics.map((m) => ({
  ...m,
  icon: ICON_MAP[m.iconName as keyof typeof ICON_MAP],
}));

const navItems = desktopNavItems.map((item) => ({
  ...item,
  icon: ICON_MAP[item.iconName as keyof typeof ICON_MAP],
}));

const C: Record<Locale, {
  metricLabels: Record<string, string>;
  metricUnits: Record<string, string>;
  navLabels: Record<string, string>;
  storeNames: Record<string, string>;
  badge: string;
  proPlan: string;
  dashTitle: string;
  today: string;
  exportBtn: string;
  trafficTitle: string;
  legendVisitors: string;
  legendPrevWeek: string;
  legendForecast: string;
  hourSuffix: (h: number) => string;
  heatmapTitle: string;
  realtime: string;
  low: string;
  high: string;
  aiReportTitle: string;
  insightHead: string;
  insightBody: string;
  insightAction: string;
  rankTitle: string;
  rankTotal: string;
  vsPrevWeek: string;
}> = {
  ko: {
    metricLabels: { BarChart3: '예상 일매출', Users: '누적 방문자', Eye: '평균 체류시간', MapPin: '매대 전환율' },
    metricUnits: { BarChart3: '만', Users: '명', Eye: '분', MapPin: '%' },
    navLabels: {
      '대시보드': '대시보드', '실시간 모니터링': '실시간 모니터링', '히트맵 분석': '히트맵 분석',
      '매출 인사이트': '매출 인사이트', '고객 동선': '고객 동선', '리포트': '리포트',
    },
    storeNames: { '강남역점': '강남역점', '홍대점': '홍대점', '잠실점': '잠실점' },
    badge: 'PC 대시보드 예시 화면',
    proPlan: '프로 플랜',
    dashTitle: '매장 분석 대시보드',
    today: '오늘',
    exportBtn: '내보내기',
    trafficTitle: '오후 2~4시가 방문 피크',
    legendVisitors: '방문자',
    legendPrevWeek: '전주',
    legendForecast: 'AI 예측',
    hourSuffix: (h) => `${h}시`,
    heatmapTitle: '구역 히트맵',
    realtime: '실시간',
    low: '낮음',
    high: '높음',
    aiReportTitle: 'AI 인사이트 리포트',
    insightHead: '음료 매대',
    insightBody: ' 앞 체류 시간이 평소보다 2배입니다. 신제품 프로모션 효과 확인됨.',
    insightAction: '→ 진열 확대 액션 카드 생성됨',
    rankTitle: '매장 순위',
    rankTotal: '전체 12개 매장',
    vsPrevWeek: '전주 대비',
  },
  en: {
    metricLabels: { BarChart3: 'Est. daily sales', Users: 'Total visitors', Eye: 'Avg. dwell time', MapPin: 'Shelf conversion' },
    metricUnits: { BarChart3: 'k', Users: '', Eye: 'min', MapPin: '%' },
    navLabels: {
      '대시보드': 'Dashboard', '실시간 모니터링': 'Live monitoring', '히트맵 분석': 'Heatmap analysis',
      '매출 인사이트': 'Sales insights', '고객 동선': 'Customer flow', '리포트': 'Reports',
    },
    storeNames: { '강남역점': 'Gangnam', '홍대점': 'Hongdae', '잠실점': 'Jamsil' },
    badge: 'Example PC dashboard',
    proPlan: 'Pro plan',
    dashTitle: 'Store Analytics Dashboard',
    today: 'Today',
    exportBtn: 'Export',
    trafficTitle: 'Visits peak at 2–4 PM',
    legendVisitors: 'Visitors',
    legendPrevWeek: 'Prev week',
    legendForecast: 'AI forecast',
    hourSuffix: (h) => `${h}:00`,
    heatmapTitle: 'Zone heatmap',
    realtime: 'Live',
    low: 'Low',
    high: 'High',
    aiReportTitle: 'AI Insight Report',
    insightHead: 'Beverage shelf',
    insightBody: ' dwell time is 2x the usual. New-product promotion effect confirmed.',
    insightAction: '→ Display-expansion action card created',
    rankTitle: 'Store ranking',
    rankTotal: 'All 12 stores',
    vsPrevWeek: 'vs prev week',
  },
  jp: {
    metricLabels: { BarChart3: '予想日次売上', Users: '累計来店者', Eye: '平均滞在時間', MapPin: '棚転換率' },
    metricUnits: { BarChart3: '万', Users: '人', Eye: '分', MapPin: '%' },
    navLabels: {
      '대시보드': 'ダッシュボード', '실시간 모니터링': 'リアルタイム監視', '히트맵 분석': 'ヒートマップ分析',
      '매출 인사이트': '売上インサイト', '고객 동선': '顧客動線', '리포트': 'レポート',
    },
    storeNames: { '강남역점': '江南駅店', '홍대점': '弘大店', '잠실점': '蚕室店' },
    badge: 'PCダッシュボードの例',
    proPlan: 'プロプラン',
    dashTitle: '店舗分析ダッシュボード',
    today: '本日',
    exportBtn: 'エクスポート',
    trafficTitle: '午後2〜4時が来店ピーク',
    legendVisitors: '来店者',
    legendPrevWeek: '前週',
    legendForecast: 'AI予測',
    hourSuffix: (h) => `${h}時`,
    heatmapTitle: 'エリアヒートマップ',
    realtime: 'リアルタイム',
    low: '低',
    high: '高',
    aiReportTitle: 'AIインサイトレポート',
    insightHead: '飲料棚',
    insightBody: '前の滞在時間が通常の2倍です。新製品プロモーションの効果が確認されました。',
    insightAction: '→ 陳列拡大アクションカードを作成しました',
    rankTitle: '店舗ランキング',
    rankTotal: '全12店舗',
    vsPrevWeek: '前週比',
  },
};

export default function StoreInsightDesktopMockup({ active = true, storeName = '강남역점', className, locale = 'en' }: BaseMockupProps & { locale?: Locale }) {
  const reducedMotion = usePrefersReducedMotion();
  const t = C[locale] ?? C.en;
  const [countProgress, setCountProgress] = useState(0); // SSR-safe; reduced-motion → set to 1 in effect
  const [today, setToday] = useState('');

  const rafRef = useRef<number>(0);
  const { ref: containerRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  useEffect(() => {
    setToday(getToday(locale));
  }, [locale]);

  // 현재 시각(클라이언트 전용). 차트는 8~19시(12칸)를 표현 → 현재 칸 이후는 "예측" 구간.
  // SSR/첫 페인트에는 null → 전 구간 실측으로 렌더(하이드레이션 불일치 회피) 후 클라이언트에서 보정.
  const [nowHour, setNowHour] = useState<number | null>(null);
  useEffect(() => {
    setNowHour(new Date().getHours());
  }, []);
  const CHART_START_HOUR = 8;
  const lastIdx = desktopInitialHeights.length - 1;
  const currentIdx = nowHour == null
    ? lastIdx
    : Math.max(0, Math.min(lastIdx, nowHour - CHART_START_HOUR));

  // 사이드바 네비 하이라이트 순환 — 중앙 루프로 일원화 (reduced-motion 가드 내장)
  const { step: navActive, hoverProps } = useMockupLoop({
    steps: navItems.length,
    interval: 3000,
    active: isVisible && active && !reducedMotion,
    pauseOnHover: true,
  });

  // 차트 높이 — "현재 시각" 칸 1개만 실시간 틱업(±12% 지터). 과거(실측)·미래(예측)는 고정.
  // 실제 누적 차트의 과거 구간이 흔들리지 않도록 함 (MOCKUP_REVIEW_v1 §1-2).
  const heights = useMemo(
    () =>
      desktopInitialHeights.map((h, i) => {
        if (i !== currentIdx) return h; // 과거/미래 칸은 기준값 고정
        const seed = Math.sin((navActive + 1) * (i + 1) * 12.9898) * 43758.5453;
        const jitter = (seed - Math.floor(seed) - 0.5) * 24; // ±12
        return Math.max(15, Math.min(100, Math.round(h + jitter)));
      }),
    [navActive, currentIdx],
  );

  // 카운트-업 (easeOut cubic, 1400ms, 1회) — reduced-motion 시 초기값 1로 스킵
  useEffect(() => {
    if (!isVisible || !active) return;
    if (reducedMotion) { setCountProgress(1); return; } // reduced-motion → final value, no animation
    const startTime = Date.now();
    const DURATION = 1400;
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(elapsed / DURATION, 1);
      setCountProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isVisible, active, reducedMotion]);

  // 카운트-업 표시값 계산
  const displayMetric = (target: number, decimals: number) =>
    (target * countProgress).toFixed(decimals);

  // 순위 바 너비 (카운트-업 30% 이후 시작, 별도 easeOut)
  const rankP = Math.min(Math.max((countProgress - 0.3) / 0.7, 0), 1);

  const rankData = DEFAULT_RANK_DATA.map((d, i) => i === 0 ? { ...d, name: storeName } : d);

  return (
    <div ref={containerRef} {...hoverProps} className={className ? `w-full max-w-5xl mx-auto ${className}` : "w-full max-w-5xl mx-auto"}>
      <MacBookFrame>
      <div className="bg-white overflow-hidden relative">
      <MockupBadge label={t.badge} />

      <BrowserChrome variant="light">
        <div className="flex-1 flex items-center gap-1.5 bg-white rounded-md px-3 py-1 text-3xs text-gray-500 border border-gray-200">
          <Lock className="w-2.5 h-2.5 text-gray-400 shrink-0" aria-hidden="true" />
          app.storeinsight.ai/dashboard/gangnam
        </div>
      </BrowserChrome>

      {/* Dashboard Layout */}
      <div className="flex min-h-[400px]">
        {/* Sidebar */}
        <div className="w-48 bg-violet-950 text-white p-4 flex flex-col shrink-0">
          <div className="flex items-center gap-2 mb-6">
            <LayoutGrid className="w-5 h-5 text-violet-300" aria-hidden="true" />
            <span className="font-bold text-base lowercase tracking-tight">
              <span className="font-normal opacity-60">saai</span><span className="opacity-40 mx-1">|</span>store insight
            </span>
          </div>
          <nav className="space-y-1 text-sm flex-1" aria-hidden="true">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = navActive === idx;
              return (
                <div
                  key={item.label}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-[background-color,color] duration-300 ${
                    isActive ? 'bg-violet-700 text-white' : 'text-violet-300'
                  }`}
                >
                  {/* 활성 표시 바 */}
                  <div className={`w-1 h-3.5 rounded-full mr-0.5 shrink-0 bg-violet-300 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                  <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{t.navLabels[item.label] ?? item.label}</span>
                </div>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-violet-800 mt-auto">
            <div className="flex items-center gap-2 px-2">
              <div className="w-7 h-7 bg-violet-700 rounded-full flex items-center justify-center text-xs font-bold">GN</div>
              <div>
                <p className="text-xs font-medium">{t.storeNames[storeName] ?? storeName}</p>
                <p className="text-3xs text-violet-400">{t.proPlan}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 p-5 ${S.bodyBg} overflow-hidden`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className={`${D.headerTitle} ${S.textPrimary}`}>{t.dashTitle}</h2>
              <p className={`text-xs ${S.textSecondary}`}>{today}</p>
            </div>
            <div className="flex items-center gap-2" aria-hidden="true">
              <button type="button" tabIndex={-1} className="flex items-center gap-1 text-xs text-gray-600 bg-white border border-gray-200 px-2.5 py-1.5 rounded-lg">
                <Calendar className="w-3 h-3" aria-hidden="true" />{t.today}<ChevronDown className="w-2.5 h-2.5" aria-hidden="true" />
              </button>
              <button type="button" tabIndex={-1} className="flex items-center gap-1 text-xs text-gray-600 bg-white border border-gray-200 px-2.5 py-1.5 rounded-lg">
                <Download className="w-3 h-3" aria-hidden="true" />{t.exportBtn}
              </button>
              <button type="button" tabIndex={-1} className="text-gray-400 p-1.5 bg-white border border-gray-200 rounded-lg">
                <Settings className="w-3 h-3" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Metric Cards — 카운트-업 */}
          <div className="grid grid-cols-4 gap-3 mb-4" aria-hidden="true">
            {metrics.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className={`${S.cardClass} p-3.5`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-medium ${S.textSecondary}`}>{t.metricLabels[m.iconName] ?? m.label}</span>
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center ${colorMap[m.color]}`}>
                      <Icon className="w-3 h-3" aria-hidden="true" />
                    </div>
                  </div>
                  {/* 카운트-업 숫자 */}
                  <div className={`text-xl font-bold ${S.textPrimary} tabular-nums`}>
                    {displayMetric(m.target, m.decimals)}{t.metricUnits[m.iconName] ?? m.unit}
                  </div>
                  <div className={`flex items-center gap-0.5 text-xs font-medium mt-1 ${m.up ? 'text-emerald-600' : 'text-red-500'}`}>
                    {m.up
                      ? <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                      : <ArrowDownRight className="w-3 h-3" aria-hidden="true" />}
                    {t.vsPrevWeek} {m.trend}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts Area */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {/* Traffic Chart */}
            <div className={`col-span-2 ${S.cardClass} p-4`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-gray-800">{t.trafficTitle}</h4>
                <div className="flex gap-3">
                  <span className="text-3xs text-gray-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-sm bg-violet-500" />{t.legendVisitors}
                  </span>
                  <span className="text-3xs text-gray-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-sm bg-violet-200" />{t.legendPrevWeek}
                  </span>
                  <span className="text-3xs text-gray-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-sm border border-dashed border-violet-400/70 bg-violet-400/20" />{t.legendForecast}
                  </span>
                </div>
              </div>
              <div className="h-28 flex items-end justify-between gap-1 relative" aria-hidden="true">
                {heights.map((height, i) => {
                  const isCurrent = i === currentIdx;
                  const isFuture = i > currentIdx;
                  // 오늘 막대: 과거=violet-400, 현재=violet-500 강조, 미래=점선 저채도 예측
                  const todayBarClass = isFuture
                    ? 'bg-violet-400/20 border border-dashed border-violet-400/70'
                    : isCurrent
                      ? 'bg-violet-500'
                      : 'bg-violet-400';
                  return (
                  <div key={i} className="w-full flex flex-col items-center gap-1">
                    <div className="w-full flex gap-0.5 items-end justify-center h-24">
                      <div
                        className="w-[45%] bg-violet-200 rounded-t-sm transition-[height] duration-700"
                        style={{ height: `${Math.max(15, height - 15)}%` }}
                      />
                      <div
                        className={`w-[45%] rounded-t-sm transition-[height] duration-700 ${todayBarClass}`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <span className={`text-3xs ${isCurrent ? 'text-violet-600 font-bold' : isFuture ? 'text-gray-300' : 'text-gray-400'}`}>{t.hourSuffix(i + 8)}</span>
                  </div>
                  );
                })}
                {/* Trend line overlay */}
                <svg
                  className="absolute inset-x-0 bottom-5 h-24 pointer-events-none z-10"
                  viewBox="0 0 120 96"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {/* 실측 구간 (현재 시각까지) — 실선 */}
                  <polyline
                    points={heights.slice(0, currentIdx + 1).map((h, i) => `${i * 10 + 5},${96 - h * 0.96}`).join(' ')}
                    fill="none"
                    stroke="rgba(139,92,246,0.65)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* 예측 구간 (현재 시각 이후) — 점선 */}
                  {currentIdx < heights.length - 1 && (
                    <polyline
                      points={heights.slice(currentIdx).map((h, k) => `${(currentIdx + k) * 10 + 5},${96 - h * 0.96}`).join(' ')}
                      fill="none"
                      stroke="rgba(139,92,246,0.4)"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                  {heights.map((h, i) => (
                    <circle
                      key={i}
                      cx={i * 10 + 5}
                      cy={96 - h * 0.96}
                      r={i === currentIdx ? '2.5' : '1.5'}
                      fill={i === currentIdx ? 'rgb(139,92,246)' : i > currentIdx ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.6)'}
                    />
                  ))}
                </svg>
              </div>
            </div>

            {/* Heatmap */}
            <div className={`${S.cardClass} p-4`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-gray-800">{t.heatmapTitle}</h4>
                <span className="text-3xs text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse motion-reduce:animate-none" aria-hidden="true" />
                  {t.realtime}
                </span>
              </div>
              <div className="grid grid-cols-5 grid-rows-5 gap-0.5 h-28" aria-hidden="true">
                {desktopHeatmapData.map((v, i) => (
                  <div key={i} className="rounded-sm" style={{ backgroundColor: `rgba(139, 92, 246, ${v / 10})` }} />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-3xs text-gray-400">
                <span>{t.low}</span>
                <div className="flex gap-0.5">
                  {[0.1, 0.3, 0.5, 0.7, 0.9].map((o) => (
                    <div key={o} className="w-4 h-2 rounded-sm" style={{ backgroundColor: `rgba(139, 92, 246, ${o})` }} />
                  ))}
                </div>
                <span>{t.high}</span>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-2 gap-3">
            {/* AI Insight */}
            <div className="bg-primary/5 p-3.5 rounded-lg border border-primary/10">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-3.5 h-3.5 text-violet-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold text-violet-900 mb-0.5">{t.aiReportTitle}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <span className="font-medium text-gray-900">{t.insightHead}</span>{t.insightBody}
                    <span className="text-violet-600 font-medium ml-0.5">{t.insightAction}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Store Ranking — fill 애니메이션 */}
            <div className={`${S.cardClass} p-3.5`}>
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs font-bold text-gray-800">{t.rankTitle}</h4>
                <span className="text-3xs text-violet-600 font-medium">{t.rankTotal}</span>
              </div>
              <div className="space-y-1.5" aria-hidden="true">
                {rankData.map((s) => (
                  <div key={s.name} className="flex items-center gap-2">
                    <span className="text-3xs font-bold text-gray-400 w-4">{s.rank}</span>
                    <span className="text-xs text-gray-700 w-14 shrink-0">{t.storeNames[s.name] ?? s.name}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-violet-500 rounded-full transition-[width] duration-700 ease-out"
                        style={{ width: `${s.value * rankP}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-700 w-6 text-right tabular-nums">
                      {Math.round(s.value * rankP)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </MacBookFrame>
    </div>
  );
}
