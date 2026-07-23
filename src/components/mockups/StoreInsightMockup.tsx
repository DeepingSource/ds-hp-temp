'use client';

import { BarChart3, TrendingUp, Users, ArrowUpRight, ArrowDownRight, LayoutGrid, Clock, Calendar, Settings, Timer, Target } from 'lucide-react';
import { useEffect, useRef, useState, memo } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AnimatePresence, motion } from 'framer-motion';
import TapIndicator from '@/components/ui/TapIndicator';
import MockupReplayButton from '@/components/ui/MockupReplayButton';
import PhoneFrame from './PhoneFrame';
import PhoneScreen from './PhoneScreen';
import IosSegmentedControl from '@/components/ui/IosSegmentedControl';
import { springGentle } from '@/lib/spring-config';
import { MOCKUP_SCHEME, PRODUCT_THEME, MOCKUP_DEVICE } from '@/lib/mockup-tokens';

const S = MOCKUP_SCHEME.light;
const P = PRODUCT_THEME.StoreInsight;
const D = MOCKUP_DEVICE.phone;
import {
  phoneBars as BARS,
  phoneHighlightIdx as HIGHLIGHT_IDX,
  phoneKpiTargets,
  type PhoneInsightTab as InsightTab,
} from '@/data/mockup-scenarios/storeinsight';
import { type Locale } from '@/lib/i18n';
import { type DeepPartial, mergeMockupContent } from './types';

/** Display strings — shared vocabulary mirrors StoreInsightDesktopMockup's dict.
 *  Numeric data (bars, targets)는 v5 원칙(canonical 데이터 우선)에 따라 데모용 실측
 *  구조를 유지 — locale-agnostic scenario 파일에 그대로 둔다(오버라이드 대상 아님). */
export interface StoreInsightMockupCopy {
  storeName: string;
  headerSub: string;
  segSales: string;
  segVisitors: string;
  kpiRevenue: string;
  kpiVisitors: string;
  kpiDwell: string;
  kpiConv: string;
  unitMan: string;
  unitName: string;
  unitMin: string;
  realtime: string;
  aiReportTitle: string;
  hourSuffix: (h: number) => string;
  chartLabel: Record<InsightTab, string>;
  insights: Record<InsightTab, string>;
  navLabels: string[];
}

const C: Record<Locale, StoreInsightMockupCopy> = {
  ko: {
    storeName: '강남역점',
    headerSub: '오늘의 매장 지표 분석',
    segSales: '매출 리포트',
    segVisitors: '방문자 동선',
    kpiRevenue: '예상 일매출',
    kpiVisitors: '방문자',
    kpiDwell: '평균 체류',
    kpiConv: '전환율',
    unitMan: '만',
    unitName: '명',
    unitMin: '분',
    realtime: '실시간',
    aiReportTitle: 'AI 인사이트 리포트',
    hourSuffix: (h) => `${h}시`,
    chartLabel: { sales: '14시, 전주 대비 +23%', visitors: '오후 2~4시 방문 집중' },
    insights: {
      sales: '14시 매출이 전주 동시간 대비 +23% 상승 중입니다. 음료 1+1 효과로 객단가가 ₩2,800 → ₩3,400으로 올랐습니다. 가설: 프로모션이 객단가를 끌어올린 것으로 보입니다 → 검증하려면 다음 주 동일 시간대 객단가를 비교하세요.',
      visitors: '오후 2~4시 방문자 집중도가 높습니다. 평균 체류 8.3분으로 전주 대비 18% 증가했습니다. 가설: 음료 코너가 전환을 견인하는 것으로 보입니다 → 검증하려면 코너 위치를 1주 바꿔 전환율을 비교하세요.',
    },
    navLabels: ['대시보드', '차트', '기록', '설정'],
  },
  en: {
    storeName: 'Gangnam',
    headerSub: "Today's store metrics",
    segSales: 'Sales report',
    segVisitors: 'Visitor flow',
    kpiRevenue: 'Est. daily sales',
    kpiVisitors: 'Visitors',
    kpiDwell: 'Avg. dwell',
    kpiConv: 'Conversion',
    unitMan: 'k',
    unitName: '',
    unitMin: 'min',
    realtime: 'Live',
    aiReportTitle: 'AI Insight Report',
    hourSuffix: (h) => `${h}`,
    chartLabel: { sales: '2 PM: +23% vs last week', visitors: 'Visits concentrate 2–4 PM' },
    insights: {
      sales: 'Sales at 2 PM are up +23% vs. the same hour last week. The 1+1 beverage promo lifted average spend from ₩2,800 to ₩3,400. Hypothesis: the promo drove the higher spend → to verify, compare next week’s same-hour average spend.',
      visitors: 'Foot traffic peaks between 2–4 PM. Average dwell is 8.3 min (+18% vs. last week). Hypothesis: the beverage corner is driving conversion → to verify, move the corner for a week and compare conversion.',
    },
    navLabels: ['Dashboard', 'Charts', 'History', 'Settings'],
  },
  jp: {
    storeName: '江南駅店',
    headerSub: '本日の店舗指標分析',
    segSales: '売上レポート',
    segVisitors: '来店者動線',
    kpiRevenue: '予想日次売上',
    kpiVisitors: '来店者',
    kpiDwell: '平均滞在',
    kpiConv: '転換率',
    unitMan: '万',
    unitName: '人',
    unitMin: '分',
    realtime: 'リアルタイム',
    aiReportTitle: 'AIインサイトレポート',
    hourSuffix: (h) => `${h}時`,
    chartLabel: { sales: '14時、前週比 +23%', visitors: '午後2〜4時に来店集中' },
    insights: {
      sales: '14時の売上が前週同時間比+23%上昇中です。ドリンク1+1効果で客単価が₩2,800→₩3,400に増加しました。仮説: プロモーションが客単価を押し上げたと見られます → 検証するには来週の同時間帯の客単価を比較してください。',
      visitors: '午後2〜4時の来店集中度が高いです。平均滞在8.3分で前週比18%増加しました。仮説: ドリンクコーナーが転換を牽引していると見られます → 検証するにはコーナー位置を1週間変えて転換率を比較してください。',
    },
    navLabels: ['ダッシュボード', 'チャート', '履歴', '設定'],
  },
};

interface Props {
  active?: boolean;
  storeName?: string;
  locale?: Locale;
  /** 문구 오버라이드 — 부분 병합(mergeMockupContent). 기본: C[locale] */
  content?: DeepPartial<StoreInsightMockupCopy>;
  /**
   * 'loop'(기본): 탭 무한 순환 — 기존 동작.
   * 'once': 카운트업 + 탭 한 바퀴(sales→visitors→sales) 후 정지 + ↻ 재생 버튼
   * (홈 모션 정책 D4 — 뷰포트당 1회 재생).
   */
  playMode?: 'loop' | 'once';
}

function StoreInsightMockup({ active = true, storeName, locale = 'en', content, playMode = 'loop' }: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const t = mergeMockupContent(C[locale] ?? C.en, content);
  const resolvedStoreName = storeName ?? t.storeName;
  const [activeTab, setActiveTab]           = useState<InsightTab>('sales');
  const [countProgress, setCountProgress]   = useState(0);
  const [insightVisible, setInsightVisible] = useState(false);
  const [done, setDone]                     = useState(false);
  const [replayKey, setReplayKey]           = useState(0);
  const doneRef = useRef(false); // done을 effect deps에 넣지 않기 위한 가드(카운트업 리셋 방지)
  // once 재생 게이트는 실제 뷰포트 진입만 신호로 — 3초 폴백이 켜져 있으면 화면 밖 소진
  const { ref: containerRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3, safetyNet: playMode === 'loop' });

  // 현재 시각(클라이언트 전용). 차트는 10~16시 → 현재 시각 이후 칸은 "예측" 구간으로 표기.
  // SSR/첫 페인트에는 null → 전 구간 실측으로 렌더(하이드레이션 안정) 후 클라이언트에서 보정.
  const [nowHour, setNowHour] = useState<number | null>(null);
  useEffect(() => { setNowHour(new Date().getHours()); }, []);
  const currentIdx = nowHour == null ? 6 : Math.max(0, Math.min(6, nowHour - 10));

  useEffect(() => {
    if (!isVisible || !active) return;
    if (playMode === 'once' && doneRef.current) return; // 재생 완료 — replay 전까지 정지
    if (reducedMotion) {
      setCountProgress(1);
      setInsightVisible(true);
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const sched = (fn: () => void, ms: number) => {
      const t = setTimeout(() => { if (!cancelled) fn(); }, ms);
      timers.push(t);
    };

    const countRaf = { id: 0 };

    // Metric count-up (once on mount)
    {
      const dur = 1200;
      const start = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        const p = Math.min((now - start) / dur, 1);
        setCountProgress(1 - Math.pow(1 - p, 3));
        if (p < 1) countRaf.id = requestAnimationFrame(tick);
      };
      countRaf.id = requestAnimationFrame(tick);
    }

    sched(() => setInsightVisible(true), 1100);

    // Tab cycling — setActiveTab은 exit 애니메이션이 시작된 후 별도 tick에 적용
    // (React 18 batching 방지)
    let tabInterval: ReturnType<typeof setInterval> | undefined;
    if (playMode === 'once') {
      // 한 바퀴만: sales(5s) → visitors(5s) → sales 복귀 후 정지 (D4 최종 프레임)
      const swapTab = (tab: InsightTab, at: number) => {
        sched(() => setInsightVisible(false), at);
        sched(() => setActiveTab(tab), at + 180);
        sched(() => setInsightVisible(true), at + 420);
      };
      swapTab('visitors', 5000);
      swapTab('sales', 10000);
      sched(() => {
        doneRef.current = true;
        setDone(true);
      }, 10800);
    } else {
      let isVisitors = false;
      tabInterval = setInterval(() => {
        if (cancelled) return;
        isVisitors = !isVisitors;
        setInsightVisible(false);
        sched(() => setActiveTab(isVisitors ? 'visitors' : 'sales'), 180);
        sched(() => setInsightVisible(true), 420);
      }, 5000);
    }

    return () => {
      cancelled = true;
      if (tabInterval) clearInterval(tabInterval);
      timers.forEach(clearTimeout);
      cancelAnimationFrame(countRaf.id);
    };
  }, [isVisible, active, reducedMotion, playMode, replayKey]);

  const revStr   = (phoneKpiTargets.revenue * countProgress).toFixed(1);
  const visitStr = Math.round(phoneKpiTargets.visitors * countProgress).toString();
  const stayStr  = (phoneKpiTargets.avgStay * countProgress).toFixed(1);
  const convStr  = Math.round(phoneKpiTargets.conversionRate * countProgress).toString();

  return (
    <div ref={containerRef} className="relative">
    <PhoneFrame>
    <PhoneScreen statusBarBg="bg-white" homeBg="bg-white">

      {/* App Header */}
      <div className={`${S.headerBg} ${D.headerPadding} border-b-2 ${P.headerBorder}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`${D.headerTitle} flex items-center gap-2 ${S.textPrimary}`}>
              <LayoutGrid className={`w-5 h-5 ${P.text}`} aria-hidden="true" />
              <span className="lowercase tracking-tight">
                <span className="font-normal opacity-50">saai</span><span className="opacity-30 mx-1">|</span>store insight
              </span>
            </h3>
            <p className={`${S.textSecondary} ${D.headerSub} mt-1`}>{resolvedStoreName} · {t.headerSub}</p>
          </div>
          <Calendar className="w-5 h-5 text-gray-700" aria-hidden="true" />
        </div>

        {/* iOS Segmented Control — spring sliding pill */}
        <div className="relative mt-3">
          <div className="relative">
            <TapIndicator visible={activeTab === 'sales'} x={25} y={50} size={32} />
            <TapIndicator visible={activeTab === 'visitors'} x={75} y={50} size={32} />
          </div>
          <IosSegmentedControl
            segments={[
              { key: 'sales', label: t.segSales },
              { key: 'visitors', label: t.segVisitors },
            ]}
            active={activeTab}
            activeTextClass="text-violet-700"
            layoutId="insight-mobile-seg"
          />
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 min-h-0 overflow-y-auto p-4 space-y-3 ${S.bodyBg}`}>
        {/* Key Metrics — 4-card grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className={`${S.cardClass} ${D.cardRadius} ${D.cardPaddingSm}`}>
            <div className="flex items-center gap-1.5 text-gray-500 mb-1">
              <BarChart3 className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-xs font-medium">{t.kpiRevenue}</span>
            </div>
            <div className="text-lg font-bold text-gray-900 tabular-nums">{revStr}{t.unitMan}</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium mt-0.5">
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
              <span>+12%</span>
            </div>
          </div>

          <div className={`${S.cardClass} ${D.cardRadius} ${D.cardPaddingSm}`}>
            <div className="flex items-center gap-1.5 text-gray-500 mb-1">
              <Users className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-xs font-medium">{t.kpiVisitors}</span>
            </div>
            <div className="text-lg font-bold text-gray-900 tabular-nums">{visitStr}{t.unitName}</div>
            <div className="flex items-center gap-1 text-xs text-red-500 font-medium mt-0.5">
              <ArrowDownRight className="w-3 h-3" aria-hidden="true" />
              <span>-5%</span>
            </div>
          </div>

          <div className={`${S.cardClass} ${D.cardRadius} ${D.cardPaddingSm}`}>
            <div className="flex items-center gap-1.5 text-gray-500 mb-1">
              <Timer className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-xs font-medium">{t.kpiDwell}</span>
            </div>
            <div className="text-lg font-bold text-gray-900 tabular-nums">{stayStr}{t.unitMin}</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium mt-0.5">
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
              <span>+18%</span>
            </div>
          </div>

          <div className={`${S.cardClass} ${D.cardRadius} ${D.cardPaddingSm}`}>
            <div className="flex items-center gap-1.5 text-gray-500 mb-1">
              <Target className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-xs font-medium">{t.kpiConv}</span>
            </div>
            <div className="text-lg font-bold text-gray-900 tabular-nums">{convStr}%</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium mt-0.5">
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
              <span>+4.2%</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className={`${S.cardClass} ${D.cardRadius} ${D.cardPadding}`}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-gray-800">
              {t.chartLabel[activeTab]}
            </h4>
            <span className={`text-xs ${P.text} ${P.bgLight} px-2 py-0.5 rounded font-medium`}>{t.realtime}</span>
          </div>

          <div className="h-28 flex items-end justify-between gap-1.5 px-1 mt-2" aria-hidden="true">
            {BARS[activeTab].map((targetH, i) => {
              const isHighlight = i === HIGHLIGHT_IDX[activeTab];
              const isFuture = i > currentIdx;
              // 강조(인사이트 대상) 우선 → 미래(예측, 점선 저채도) → 실측(violet-200)
              const barClass = isHighlight
                ? `${P.bg} shadow-[0_0_8px_rgba(139,92,246,0.3)]`
                : isFuture
                  ? 'bg-violet-300/30 border border-dashed border-violet-400/60'
                  : 'bg-violet-200';
              return (
              <div key={i} className="w-full h-full flex flex-col justify-end items-center">
                <motion.div
                  key={`${activeTab}-${i}`}
                  className={`w-full rounded-t-sm ${barClass}`}
                  initial={{ height: reducedMotion ? `${targetH}%` : 0 }}
                  animate={{ height: `${targetH}%` }}
                  transition={reducedMotion ? { duration: 0 } : { ...springGentle, delay: i * 0.04 }}
                />
                <span className={`text-3xs font-medium mt-1 shrink-0 ${isFuture && !isHighlight ? 'text-gray-300' : 'text-gray-500'}`}>{t.hourSuffix(i + 10)}</span>
              </div>
              );
            })}
          </div>
        </div>

        {/* AI Insight — AnimatePresence fade + slide */}
        <AnimatePresence>
          {insightVisible && (
            <motion.div
              key={activeTab}
              className="bg-primary/5 p-4 rounded-xl border border-primary/10"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={springGentle}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                  <TrendingUp className={`w-4 h-4 ${P.text}`} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-bold text-violet-900 mb-1">{t.aiReportTitle}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{t.insights[activeTab]}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation — iOS Tab Bar with labels */}
      <div className="shrink-0 bg-white border-t border-gray-100 px-3 py-2.5" aria-hidden="true">
        <div className="flex justify-around">
          {[
            { Icon: LayoutGrid, label: t.navLabels[0], active: true },
            { Icon: BarChart3,  label: t.navLabels[1], active: false },
            { Icon: Clock,      label: t.navLabels[2], active: false },
            { Icon: Settings,   label: t.navLabels[3], active: false },
          ].map(({ Icon, label, active }) => (
            <div key={label} className={`flex flex-col items-center gap-1 ${active ? P.text : 'text-gray-500'}`}>
              <Icon className="w-5 h-5" />
              <span className="text-3xs font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </PhoneScreen>
    </PhoneFrame>
    {playMode === 'once' && done && !reducedMotion && (
      <MockupReplayButton
        locale={locale}
        onReplay={() => {
          doneRef.current = false;
          setDone(false);
          setActiveTab('sales');
          setCountProgress(0);
          setInsightVisible(false);
          setReplayKey(k => k + 1);
        }}
      />
    )}
    </div>
  );
}

export default memo(StoreInsightMockup);
