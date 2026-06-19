'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, TrendingDown, ArrowRight, ShoppingCart, CalendarCheck, AlertCircle, CheckCircle2, BarChart3, Zap } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { areaTypes } from '@/data/briefingData';
import { posAnalysisData } from '@/data/posAnalysisData';
import type { AreaId } from '@/data/posAnalysisData';
import { getAreaLabel } from '@/data/area-i18n';
import { getPOSCopy } from '@/data/pos-analysis-i18n';
import { localeHref, type Locale } from '@/lib/i18n';
import BrowserChrome from '@/components/mockups/BrowserChrome';
import MockupBadge from '@/components/mockups/MockupBadge';

const urgencyStyle = {
  high: 'bg-red-500/15 text-red-400 border-red-500/30',
  medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  low: 'bg-gray-500/15 text-gray-500 border-gray-500/30',
} as const;

const UI: Record<Locale, {
  urgencyLabel: { high: string; medium: string; low: string };
  mockupBadge: string;
  heading: string;
  sub: string;
  tabsAria: string;
  briefingSuffix: string;
  kpiWeekSales: string;
  kpiWeekForecast: string;
  kpiOrder: string;
  kpiRank: string;
  orderCountSuffix: (n: number) => string;
  savingPrefix: string;
  rankValue: (n: number) => string;
  ofStores: (n: number) => string;
  categorySales: string;
  last7Days: string;
  amountSuffix: string;
  weekForecast: string;
  peakPrefix: string;
  today: string;
  todayActions: string;
  urgentCount: (n: number) => string;
  stock: (n: number) => string;
  orderQty: (n: number) => string;
  areaCompare: string;
  avgPrefix: string;
  aiInsight: string;
  insightBody: (peak: string, saving: string) => string;
  posLive: string;
  asOf: (date: string) => string;
  ctaInquire: string;
  pricingNote: string;
  dateLocale: string;
}> = {
  en: {
    urgencyLabel: { high: 'Urgent', medium: 'Advised', low: 'Note' },
    mockupBadge: 'AI briefing dashboard — sample screen',
    heading: 'AI sorts out what you should do today',
    sub: 'It analyzes and summarizes POS sales data, then recommends today’s tasks',
    tabsAria: 'Select area type',
    briefingSuffix: ' area briefing',
    kpiWeekSales: 'Weekly sales',
    kpiWeekForecast: 'Weekly forecast',
    kpiOrder: 'Recommended orders',
    kpiRank: 'Area rank',
    orderCountSuffix: (n) => `${n} items`,
    savingPrefix: 'Save ',
    rankValue: (n) => `#${n}`,
    ofStores: (n) => `of ${n} stores`,
    categorySales: 'Sales by category',
    last7Days: 'Last 7 days',
    amountSuffix: '0K₩',
    weekForecast: 'Weekly sales forecast',
    peakPrefix: 'Peak: ',
    today: 'Today',
    todayActions: 'Recommended actions today',
    urgentCount: (n) => `${n} urgent`,
    stock: (n) => `Stock ${n}`,
    orderQty: (n) => `Order ${n}`,
    areaCompare: 'Area comparison',
    avgPrefix: 'Avg ',
    aiInsight: 'AI insight',
    insightBody: (peak) => ` · Stocking ahead of the ${peak} peak saves an estimated `,
    posLive: 'POS live sync',
    asOf: (date) => `As of ${date}`,
    ctaInquire: 'Request a consultation',
    pricingNote: 'From $11/mo · Cancel anytime',
    dateLocale: 'en-US',
  },
  ko: {
    urgencyLabel: { high: '긴급', medium: '권장', low: '참고' },
    mockupBadge: 'AI 브리핑 대시보드 예시 화면',
    heading: '오늘 뭘 해야 하는지, AI가 정리합니다',
    sub: 'POS 매출 데이터를 분석해 요약하고, 오늘 해야 할 일을 추천합니다',
    tabsAria: '상권 유형 선택',
    briefingSuffix: ' 상권 브리핑',
    kpiWeekSales: '주간 매출',
    kpiWeekForecast: '주간 예측',
    kpiOrder: '추천 발주',
    kpiRank: '상권 순위',
    orderCountSuffix: (n) => `${n}건`,
    savingPrefix: '절감 ',
    rankValue: (n) => `${n}위`,
    ofStores: (n) => `${n}개 매장 중`,
    categorySales: '카테고리별 매출',
    last7Days: '최근 7일',
    amountSuffix: '만',
    weekForecast: '주간 매출 예측',
    peakPrefix: '피크: ',
    today: '오늘',
    todayActions: '오늘의 추천 액션',
    urgentCount: (n) => `${n} 긴급`,
    stock: (n) => `재고 ${n}개`,
    orderQty: (n) => `${n}개 발주`,
    areaCompare: '상권 비교',
    avgPrefix: '평균 ',
    aiInsight: 'AI 인사이트',
    insightBody: (peak) => ` · ${peak} 피크 대비 재고를 확보하면 예상 절감 `,
    posLive: 'POS 실시간 연동',
    asOf: (date) => `${date} 기준`,
    ctaInquire: '도입 문의하기',
    pricingNote: '월 15,000원부터 · 언제든 해지 가능',
    dateLocale: 'ko-KR',
  },
  jp: {
    urgencyLabel: { high: '緊急', medium: '推奨', low: '参考' },
    mockupBadge: 'AIブリーフィング ダッシュボードのサンプル画面',
    heading: '今日すべきことを、AIが整理します',
    sub: 'POS売上データを分析・要約し、今日やるべきことをご提案します',
    tabsAria: '商圏タイプの選択',
    briefingSuffix: ' 商圏ブリーフィング',
    kpiWeekSales: '週間売上',
    kpiWeekForecast: '週間予測',
    kpiOrder: '推奨発注',
    kpiRank: '商圏順位',
    orderCountSuffix: (n) => `${n}件`,
    savingPrefix: '削減 ',
    rankValue: (n) => `${n}位`,
    ofStores: (n) => `${n}店舗中`,
    categorySales: 'カテゴリ別売上',
    last7Days: '直近7日',
    amountSuffix: '万',
    weekForecast: '週間売上予測',
    peakPrefix: 'ピーク: ',
    today: '今日',
    todayActions: '今日の推奨アクション',
    urgentCount: (n) => `${n} 緊急`,
    stock: (n) => `在庫 ${n}個`,
    orderQty: (n) => `${n}個 発注`,
    areaCompare: '商圏比較',
    avgPrefix: '平均 ',
    aiInsight: 'AIインサイト',
    insightBody: (peak) => ` · ${peak} ピークに備えて在庫を確保すると、想定削減 `,
    posLive: 'POSリアルタイム連携',
    asOf: (date) => `${date} 時点`,
    ctaInquire: '導入のお問い合わせ',
    pricingNote: '月15,000ウォンから · いつでも解約可能',
    dateLocale: 'ja-JP',
  },
};

export default function POSAnalysisSection({ locale = 'en' }: { locale?: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const t = UI[locale];
  const activeArea = areaTypes[activeIndex];
  const areaId = activeArea.id as AreaId;
  const data = posAnalysisData[areaId];
  const copy = getPOSCopy(areaId, locale);
  const activeLabel = getAreaLabel(activeArea.id, locale, activeArea.label);

  const [today, setToday] = useState({ dayIndex: 0, label: '' });

  useEffect(() => {
    const d = new Date();
    const koreaDate = new Date(d.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
    setToday({
      dayIndex: (koreaDate.getDay() + 6) % 7,
      label: koreaDate.toLocaleDateString(t.dateLocale, { timeZone: 'Asia/Seoul', month: 'numeric', day: 'numeric' }),
    });
  }, [t.dateLocale]);

  const dynamicForecast = useMemo(() => ({
    ...data.salesForecast,
    days: data.salesForecast.days.map((day, idx) => ({
      ...day,
      isToday: idx === today.dayIndex,
    })),
  }), [data.salesForecast, today.dayIndex]);

  // Top 2 urgent order items for action panel
  const topActions = data.orderRecommend.items
    .map((item, idx) => ({ ...item, _idx: idx }))
    .filter(i => i.urgency === 'high' || i.urgency === 'medium')
    .slice(0, 3);

  return (
    <section id="pos-analysis" ref={ref} className="section bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className={`text-center mb-10 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
          <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">POS Intelligence</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 break-keep">
            {t.heading}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            {t.sub}
          </p>
        </div>

        {/* Area Type Tabs */}
        <div
          role="tablist"
          aria-label={t.tabsAria}
          className={`flex justify-center gap-2 sm:gap-3 mb-6 ${isVisible ? 'scroll-visible delay-100' : 'scroll-hidden'}`}
        >
          {areaTypes.map((area, index) => (
            <button
              key={area.id}
              id={`pos-tab-${area.id}`}
              role="tab"
              type="button"
              aria-selected={activeIndex === index}
              tabIndex={activeIndex === index ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  const next = (index + 1) % areaTypes.length;
                  setActiveIndex(next);
                  (e.currentTarget.parentElement?.children[next] as HTMLElement)?.focus();
                } else if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  const prev = (index - 1 + areaTypes.length) % areaTypes.length;
                  setActiveIndex(prev);
                  (e.currentTarget.parentElement?.children[prev] as HTMLElement)?.focus();
                }
              }}
              className={`flex items-center gap-1.5 px-3 sm:px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-colors ${
                activeIndex === index
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
              }`}
            >
              <span aria-hidden="true">{area.icon}</span>
              <span className="text-xs sm:text-sm">{getAreaLabel(area.id, locale, area.label)}</span>
            </button>
          ))}
        </div>

        {/* Desktop Dashboard Mockup */}
        <div className={`${isVisible ? 'scroll-visible delay-200' : 'scroll-hidden'}`}>
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/30">

            <MockupBadge label={t.mockupBadge} />

            <BrowserChrome
              trailing={
                <div className="flex items-center gap-1.5 text-sm text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </div>
              }
            >
              <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center">
                <BarChart3 className="w-3.5 h-3.5 text-primary" />
              </div>
              <span>STOREAGENT · {activeLabel}{t.briefingSuffix}</span>
            </BrowserChrome>

            {/* Dashboard body */}
            <div
              id="pos-analysis-content"
              role="tabpanel"
              aria-labelledby={`pos-tab-${activeArea.id}`}
              className="bg-gray-950 p-4 sm:p-6 space-y-4"
            >
              {/* Row 1: KPI Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <KpiCard
                  label={t.kpiWeekSales}
                  value={copy.totalSales}
                  change={data.salesTrend.totalChange}
                  icon={<BarChart3 className="w-4 h-4 text-emerald-400" />}
                />
                <KpiCard
                  label={t.kpiWeekForecast}
                  value={copy.weekTotal}
                  change={dynamicForecast.weekChange}
                  icon={<TrendingUp className="w-4 h-4 text-sky-400" />}
                />
                <KpiCard
                  label={t.kpiOrder}
                  value={t.orderCountSuffix(data.orderRecommend.totalItems)}
                  sub={`${t.savingPrefix}${copy.estimatedSaving}`}
                  icon={<ShoppingCart className="w-4 h-4 text-amber-400" />}
                />
                <KpiCard
                  label={t.kpiRank}
                  value={t.rankValue(data.competitor.myRank)}
                  sub={t.ofStores(data.competitor.totalStores)}
                  icon={<Zap className="w-4 h-4 text-violet-400" />}
                />
              </div>

              {/* Row 2: Main content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

                {/* Left: Category Sales + Forecast */}
                <div className="lg:col-span-2 space-y-3">
                  {/* Category Sales Bar */}
                  <div className="bg-gray-900/70 border border-gray-800/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.categorySales}</p>
                      <span className="text-3xs text-gray-600">{t.last7Days}</span>
                    </div>
                    <div className="space-y-2.5">
                      {data.salesTrend.items.map((item, idx) => (
                        <div key={item.category} className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 w-28 sm:w-32 truncate shrink-0">{copy.categories[idx]}</span>
                          <div className="flex-1 h-5 bg-gray-800/60 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full transition-[width] duration-700"
                              style={{ width: `${item.barPercent}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-14 text-right tabular-nums">{item.amount}{t.amountSuffix}</span>
                          <span className={`text-3xs font-bold w-10 text-right tabular-nums ${item.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {item.change >= 0 ? '+' : ''}{item.change}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Weekly Forecast */}
                  <div className="bg-gray-900/70 border border-gray-800/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.weekForecast}</p>
                      <span className="text-3xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-bold">
                        {t.peakPrefix}{copy.peakDay}
                      </span>
                    </div>
                    <div className="flex items-end gap-2 h-28">
                      {dynamicForecast.days.map((day, idx) => (
                        <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-3xs text-gray-500 tabular-nums">{day.predicted}</span>
                          <div className="w-full flex-1 flex items-end">
                            <div
                              className={`w-full rounded-t transition-[height,background-color,box-shadow] duration-500 ${
                                day.isToday
                                  ? 'bg-primary shadow-[0_0_12px_rgb(var(--primary-rgb)_/_0.4)]'
                                  : day.isPeak
                                    ? 'bg-amber-500/80'
                                    : 'bg-gray-700'
                              }`}
                              style={{ height: `${day.barPercent}%` }}
                            />
                          </div>
                          <span className={`text-3xs font-bold ${
                            day.isToday ? 'text-primary' : day.isPeak ? 'text-amber-400' : 'text-gray-500'
                          }`}>
                            {copy.days[idx]}
                            {day.isToday && <span className="block text-4xs text-primary/70">{t.today}</span>}
                          </span>
                        </div>
                      ))}
                    </div>
                    {dynamicForecast.peakReason && (
                      <p className="text-3xs text-gray-500 mt-2 flex items-center gap-1">
                        <CalendarCheck className="w-3 h-3 text-amber-400/60 shrink-0" />
                        {copy.peakReason}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Today's Actions */}
                <div className="lg:col-span-1 space-y-3">
                  {/* Action Panel */}
                  <div className="bg-gray-900/70 border border-gray-800/50 rounded-xl p-4 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.todayActions}</p>
                      <span className="text-3xs font-bold text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded">
                        {t.urgentCount(topActions.filter(a => a.urgency === 'high').length)}
                      </span>
                    </div>
                    <div className="space-y-2 flex-1">
                      {topActions.map((action) => (
                        <div
                          key={action.product}
                          className={`p-3 rounded-lg border ${urgencyStyle[action.urgency]}`}
                        >
                          <div className="flex items-start gap-2">
                            {action.urgency === 'high' ? (
                              <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-400" />
                            ) : (
                              <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-400" />
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-gray-200 leading-snug">{copy.products[action._idx]}</p>
                              <p className="text-3xs text-gray-500 mt-0.5">{copy.reasons[action._idx]}</p>
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-3xs text-gray-500">{t.stock(action.currentStock)}</span>
                                <ArrowRight className="w-2.5 h-2.5 text-gray-600" />
                                <span className="text-3xs font-bold text-emerald-400">{t.orderQty(action.recommended)}</span>
                              </div>
                            </div>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${urgencyStyle[action.urgency]} shrink-0`}>
                              {t.urgencyLabel[action.urgency]}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Competitor summary */}
                    <div className="mt-3 pt-3 border-t border-gray-800/50">
                      <p className="text-3xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t.areaCompare}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {data.competitor.metrics.slice(0, 2).map((m, idx) => {
                          const better = m.isHigherBetter ? m.myValue > m.avgValue : m.myValue < m.avgValue;
                          return (
                            <div key={m.label} className="text-center">
                              <p className="text-3xs text-gray-500">{copy.metricLabels[idx]}</p>
                              <p className={`text-sm font-bold ${better ? 'text-emerald-400' : 'text-red-400'}`}>
                                {m.myValue.toLocaleString()}<span className="text-[9px] text-gray-500 font-normal">{copy.metricUnits[idx]}</span>
                              </p>
                              <p className="text-[9px] text-gray-600">
                                {t.avgPrefix}{m.avgValue.toLocaleString()}{copy.metricUnits[idx]}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom insight bar */}
              <div className="bg-gray-900/60 rounded-lg px-4 py-3 border border-gray-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-gray-300 text-xs">
                    <span className="font-bold text-white">{t.aiInsight}</span>{t.insightBody(copy.peakDay, copy.estimatedSaving)}<span className="text-emerald-400 font-bold">{copy.estimatedSaving}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-3xs text-gray-500 shrink-0">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {t.posLive}
                  </span>
                  <span suppressHydrationWarning>{t.asOf(today.label)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center mt-10 ${isVisible ? 'scroll-visible delay-300' : 'scroll-hidden'}`}>
          <Link
            href={localeHref(locale, '/contact') + '?plan=standard'}
            className="btn-primary inline-flex items-center gap-2"
          >
            {t.ctaInquire}
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <p className="text-xs text-gray-500 mt-3">
            {t.pricingNote}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Sub-components ─── */

function KpiCard({ label, value, change, sub, icon }: {
  label: string;
  value: string;
  change?: number;
  sub?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-gray-900/70 border border-gray-800/50 rounded-lg px-3 py-3 flex items-center gap-3">
      <div className="shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-3xs text-gray-500 leading-none mb-1">{label}</p>
        <div className="flex items-baseline gap-1.5">
          <p className="text-sm font-bold text-white leading-none">{value}</p>
          {change !== undefined && (
            <span className={`text-3xs font-bold flex items-center gap-0.5 ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {change >= 0 ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
              {change >= 0 ? '+' : ''}{change}%
            </span>
          )}
          {sub && <span className="text-3xs text-gray-500">{sub}</span>}
        </div>
      </div>
    </div>
  );
}
