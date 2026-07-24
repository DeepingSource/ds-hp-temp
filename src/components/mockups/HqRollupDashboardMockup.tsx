'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, Thermometer, Bell, MapPin } from 'lucide-react';
import { CountUp } from '@/components/ui/CountUp';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useMockupLoop } from '@/hooks/useMockupLoop';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { motionEnter, motionAffordance } from '@/lib/mockup-motion';
import { MOCKUP_STATUS_CLASS, SAAI_COLORS, type MockupStatus } from '@/lib/mockup-tokens';
import { canonicalHq } from '@/data/mockup-scenarios/canonical';
import { type Locale } from '@/lib/i18n';

/**
 * HqRollupDashboardMockup — store care HQ roll-up dashboard (product-reorg D3, §10.5).
 * A fleet-wide "every store, one screen" mock for the enterprise section: KPI row,
 * store-ranking table, live alert feed, per-type bars + SEAL badge. Sample data only
 * (caption says so). Brand blue = product chrome; status colors (ok/warn/risk) are
 * used ONLY for severity, always paired with a text label (no color-only signal).
 * Viewport 전환 이연(MM A8 단기 패치 적용) — .saai-scope 부재라 색은 SAAI_COLORS import.
 */

/** 심각도는 공용 MOCKUP_STATUS_CLASS 를 그대로 쓴다 — 목업마다 로컬 색 맵을
 *  새로 선언하지 않는다(mockup-tokens.ts 주석 참고). ok/warn/risk 는 이 목업의
 *  도메인 어휘라 유지하고, 색만 normal/warning/critical 로 매핑한다. */
type Sev = 'ok' | 'warn' | 'risk';
const SEV_STATUS: Record<Sev, MockupStatus> = { ok: 'normal', warn: 'warning', risk: 'critical' };
const sevCls = (sev: Sev): string => {
  const s = MOCKUP_STATUS_CLASS[SEV_STATUS[sev]];
  return `${s.text} ${s.bg} ring-current/20`;
};

// D6: KPI·scope 수치는 canonicalHq 파생 — 미해결=warning+critical, 방문 필요=critical
const HQ = {
  stores: canonicalHq.totalStores,
  anomalies: String(canonicalHq.todayAnomalies),
  hygiene: `${canonicalHq.hygieneOkPct}%`,
  openAlerts: String(canonicalHq.statusDistribution.warning + canonicalHq.statusDistribution.critical),
  visitNeeded: String(canonicalHq.statusDistribution.critical),
} as const;

const dict: Record<Locale, {
  brand: string; scope: string; live: string;
  kpis: { label: string; value: string }[];
  rankTitle: string; colStore: string; colIncidents: string; colStatus: string;
  rows: { store: string; n: string; sev: Sev; status: string }[];
  feedTitle: string;
  feed: { type: string; store: string; sev: Sev }[];
  barsTitle: string;
  bars: { label: string; pct: number }[];
  sevLegend: { ok: string; warn: string; risk: string };
  seal: string; caption: string;
}> = {
  ko: {
    brand: 'store care · HQ', scope: `전국 ${HQ.stores}개 매장`, live: 'LIVE',
    kpis: [
      { label: '오늘 이상 감지', value: HQ.anomalies },
      { label: '위생·온도 충족', value: HQ.hygiene },
      { label: '미해결 알림', value: HQ.openAlerts },
      { label: '방문 필요', value: HQ.visitNeeded },
    ],
    rankTitle: '매장 랭킹 — 사고 건수', colStore: '매장', colIncidents: '7일 건수', colStatus: '상태',
    rows: [
      { store: '강남 2호점', n: '12', sev: 'risk', status: '위험' },
      { store: '판교 테크원점', n: '7', sev: 'warn', status: '주의' },
      { store: '홍대입구점', n: '5', sev: 'warn', status: '주의' },
      { store: '잠실 롯데점', n: '1', sev: 'ok', status: '정상' },
    ],
    feedTitle: '실시간 알림',
    feed: [
      { type: '냉장 온도 초과', store: '강남 2호점', sev: 'risk' },
      { type: '바닥 오염 감지', store: '서면점', sev: 'warn' },
      { type: '비상구 적치', store: '판교 테크원점', sev: 'warn' },
    ],
    barsTitle: '유형별 이상 (이번 주)',
    bars: [
      { label: '위생', pct: 42 },
      { label: '설비', pct: 28 },
      { label: '도난·이상', pct: 19 },
      { label: '안전', pct: 11 },
    ],
    sevLegend: { ok: '정상', warn: '주의', risk: '위험' },
    seal: 'SEAL 익명화 — 원본 미보존', caption: '* 샘플 화면 · 데이터 예시',
  },
  en: {
    brand: 'store care · HQ', scope: `${HQ.stores} stores nationwide`, live: 'LIVE',
    kpis: [
      { label: 'Anomalies today', value: HQ.anomalies },
      { label: 'Hygiene·temp met', value: HQ.hygiene },
      { label: 'Open alerts', value: HQ.openAlerts },
      { label: 'Visit needed', value: HQ.visitNeeded },
    ],
    rankTitle: 'Store ranking — incidents', colStore: 'Store', colIncidents: '7-day', colStatus: 'Status',
    rows: [
      { store: 'Gangnam #2', n: '12', sev: 'risk', status: 'At risk' },
      { store: 'Pangyo TechOne', n: '7', sev: 'warn', status: 'Watch' },
      { store: 'Hongdae', n: '5', sev: 'warn', status: 'Watch' },
      { store: 'Jamsil Lotte', n: '1', sev: 'ok', status: 'OK' },
    ],
    feedTitle: 'Live alerts',
    feed: [
      { type: 'Fridge temp exceeded', store: 'Gangnam #2', sev: 'risk' },
      { type: 'Floor spill detected', store: 'Seomyeon', sev: 'warn' },
      { type: 'Exit blocked', store: 'Pangyo TechOne', sev: 'warn' },
    ],
    barsTitle: 'Anomalies by type (this week)',
    bars: [
      { label: 'Hygiene', pct: 42 },
      { label: 'Equipment', pct: 28 },
      { label: 'Theft·anomaly', pct: 19 },
      { label: 'Safety', pct: 11 },
    ],
    sevLegend: { ok: 'OK', warn: 'Watch', risk: 'At risk' },
    seal: 'Anonymized by SEAL — no footage stored', caption: '* Sample screen · illustrative data',
  },
  jp: {
    brand: 'store care · HQ', scope: `全国${HQ.stores}店舗`, live: 'LIVE',
    kpis: [
      { label: '本日の異常検知', value: HQ.anomalies },
      { label: '衛生·温度の充足', value: HQ.hygiene },
      { label: '未解決アラート', value: HQ.openAlerts },
      { label: '訪問が必要', value: HQ.visitNeeded },
    ],
    rankTitle: '店舗ランキング — 事故件数', colStore: '店舗', colIncidents: '7日間', colStatus: '状態',
    rows: [
      { store: '江南2号店', n: '12', sev: 'risk', status: '危険' },
      { store: '板橋テックワン店', n: '7', sev: 'warn', status: '注意' },
      { store: '弘大入口店', n: '5', sev: 'warn', status: '注意' },
      { store: '蚕室ロッテ店', n: '1', sev: 'ok', status: '正常' },
    ],
    feedTitle: 'リアルタイムアラート',
    feed: [
      { type: '冷蔵温度の超過', store: '江南2号店', sev: 'risk' },
      { type: '床の汚れを検知', store: '西面店', sev: 'warn' },
      { type: '非常口の物品', store: '板橋テックワン店', sev: 'warn' },
    ],
    barsTitle: 'タイプ別の異常（今週）',
    bars: [
      { label: '衛生', pct: 42 },
      { label: '設備', pct: 28 },
      { label: '盗難·異常', pct: 19 },
      { label: '安全', pct: 11 },
    ],
    sevLegend: { ok: '正常', warn: '注意', risk: '危険' },
    seal: 'SEALで匿名化 — 原本は保存しません', caption: '* サンプル画面 · データは例示',
  },
};

function Pill({ sev, label }: { sev: Sev; label: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-2xs font-bold ring-1 ring-inset ${sevCls(sev)}`}>
      {label}
    </span>
  );
}

export default function HqRollupDashboardMockup({
  locale,
  ariaLabel,
  immediate = false,
}: {
  locale: Locale;
  ariaLabel?: string;
  /** Hero처럼 최초 뷰포트에 놓일 때 `true` — 표/그래프를 스크롤-리빌 게이팅에서 빼
   *  서버 HTML부터 보이게 한다(하이드레이션 대기 중 빈 대시보드 방지). */
  immediate?: boolean;
}) {
  const t = dict[locale];
  const kpiIcons = [AlertTriangle, Thermometer, Bell, MapPin];
  const reduced = usePrefersReducedMotion();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.3, immediate });
  // live alert feed — rotate the newest to the top while in view (pause on hover)
  const { step: feedStep, hoverProps } = useMockupLoop({
    steps: t.feed.length,
    interval: 2800,
    active: isVisible,
    pauseOnHover: true,
  });
  const feed = [...t.feed.slice(feedStep), ...t.feed.slice(0, feedStep)];
  return (
    <figure ref={ref} {...hoverProps} role="img" aria-label={ariaLabel ?? t.brand} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-elevated">
      {/* chrome header */}
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 bg-gray-900 px-5 py-3">
        <div className="flex items-center gap-2 text-white">
          <span className="text-xs font-bold tracking-wide opacity-60">saai</span>
          <span className="text-sm font-bold">{t.brand}</span>
        </div>
        <div className="flex items-center gap-2 text-2xs font-medium text-gray-300">
          <span>{t.scope}</span>
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5"
            /* .saai-scope 밖 — SAAI_COLORS import 경로, /15는 color-mix */
            style={{
              backgroundColor: `color-mix(in srgb, ${SAAI_COLORS['status-success']} 15%, transparent)`,
              color: SAAI_COLORS['status-success'],
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: SAAI_COLORS['status-success'] }} aria-hidden="true" />
            {t.live}
          </span>
        </div>
      </div>

      <div className="space-y-5 p-5">
        {/* KPI row */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {t.kpis.map((k, i) => {
            const Icon = kpiIcons[i];
            const m = k.value.match(/^(\d+)(.*)$/);
            return (
              <div key={k.label} className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                <Icon className="mb-2 h-4 w-4 text-primary" aria-hidden="true" />
                <p className="text-xl font-bold text-gray-900 tabular-nums">
                  {m ? <CountUp to={Number(m[1])} suffix={m[2]} /> : k.value}
                </p>
                <p className="text-2xs text-gray-500 break-keep">{k.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* store ranking table */}
          <div>
            <p className="mb-2 text-xs font-bold text-gray-700">{t.rankTitle}</p>
            <div className="overflow-hidden rounded-xl border border-gray-100">
              <table className="w-full table-fixed text-left">
                <thead>
                  <tr className="bg-gray-50 text-2xs uppercase tracking-wide text-gray-400">
                    <th scope="col" className="px-3 py-2 font-medium">{t.colStore}</th>
                    <th scope="col" className="px-3 py-2 font-medium tabular-nums">{t.colIncidents}</th>
                    <th scope="col" className="px-3 py-2 font-medium">{t.colStatus}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((r, i) => (
                    <tr
                      key={r.store}
                      className="border-t border-gray-100"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateX(0)' : 'translateX(-8px)',
                        transition: reduced ? undefined : 'opacity 0.4s var(--ease-out-cubic), transform 0.4s var(--ease-out-cubic)',
                        transitionDelay: reduced ? undefined : `${0.15 + i * 0.1}s`,
                      }}
                    >
                      <td className="truncate px-3 py-2 text-xs font-medium text-gray-900">{r.store}</td>
                      <td className="px-3 py-2 text-xs text-gray-700 tabular-nums">{r.n}</td>
                      <td className="px-3 py-2"><Pill sev={r.sev} label={r.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* live alert feed */}
          <div>
            <p className="mb-2 text-xs font-bold text-gray-700">{t.feedTitle}</p>
            <ul className="space-y-2">
              <AnimatePresence initial={false} mode="popLayout">
                {feed.map((f) => (
                  <motion.li
                    key={f.type}
                    layout={!reduced}
                    initial={reduced ? false : { opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                    transition={reduced ? motionAffordance : motionEnter}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-3 py-2.5"
                  >
                    <span className={`h-8 w-1 rounded-full ${MOCKUP_STATUS_CLASS[SEV_STATUS[f.sev]].dot}`} aria-hidden="true" />
                    <span className="flex-1">
                      <span className="block text-xs font-medium text-gray-900 break-keep">{f.type}</span>
                      <span className="block text-2xs text-gray-500">{f.store}</span>
                    </span>
                    <Pill sev={f.sev} label={t.sevLegend[f.sev]} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>

        {/* per-type bars */}
        <div>
          <p className="mb-2 text-xs font-bold text-gray-700">{t.barsTitle}</p>
          <div className="space-y-2">
            {t.bars.map((b, i) => (
              <div key={b.label} className="flex items-center gap-3">
                <span className="w-20 shrink-0 text-2xs text-gray-500 break-keep">{b.label}</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <span
                    className="block h-full rounded-full bg-primary"
                    style={{
                      width: isVisible ? `${b.pct}%` : '0%',
                      transition: reduced ? undefined : 'width 0.7s var(--ease-out-cubic)',
                      transitionDelay: reduced ? undefined : `${0.2 + i * 0.1}s`,
                    }}
                  />
                </span>
                <span className="w-8 shrink-0 text-right text-2xs text-gray-400 tabular-nums">{b.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* footer — legend + SEAL */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3">
          <div className="flex items-center gap-3 text-2xs text-gray-400">
            <span className="inline-flex items-center gap-1"><span className={`h-2 w-2 rounded-full ${MOCKUP_STATUS_CLASS.normal.dot}`} aria-hidden="true" />{t.sevLegend.ok}</span>
            <span className="inline-flex items-center gap-1"><span className={`h-2 w-2 rounded-full ${MOCKUP_STATUS_CLASS.warning.dot}`} aria-hidden="true" />{t.sevLegend.warn}</span>
            <span className="inline-flex items-center gap-1"><span className={`h-2 w-2 rounded-full ${MOCKUP_STATUS_CLASS.critical.dot}`} aria-hidden="true" />{t.sevLegend.risk}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-2xs font-medium text-primary">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            {t.seal}
          </span>
        </div>
      </div>

      <figcaption className="border-t border-gray-100 bg-gray-50 px-5 py-2 text-2xs text-gray-400">{t.caption}</figcaption>
    </figure>
  );
}
