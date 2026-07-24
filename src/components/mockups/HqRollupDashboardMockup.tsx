'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, Thermometer, Bell, MapPin } from 'lucide-react';
import { CountUp } from '@/components/ui/CountUp';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useMockupLoop } from '@/hooks/useMockupLoop';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { motionEnter, motionAffordance } from '@/lib/mockup-motion';
import { MOCKUP_STATUS_CLASS, SAAI_COLORS, type MockupStatus } from '@/lib/mockup-tokens';
import {
  alertCatalog,
  canonicalHq,
  canonicalRoster,
  type RosterStatus,
  type RosterStore,
} from '@/data/mockup-scenarios/canonical';
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

// D6(v2): 매장 랭킹 = canonicalRoster 파생 — 상태 나쁜 순(critical→warning→normal,
// 신촌 critical 우선), 동상태에선 방문 많은 순. 7일 사고 건수는 값 박제 대신
// 방문 규모·상태 기반 결정적 산식으로 파생한다:
//   incidents7d = round(dailyVisitors × INCIDENT_MULT[status] ÷ 30)
// (방문이 많고 상태가 나쁠수록 사고가 잦다는 단순 비례 —
//  신촌 13 · 안양 6 · 강남역 3 · 분당 3, Σ = RANK_TOTAL = 25)
const ROSTER_SEV: Record<RosterStatus, Sev> = { normal: 'ok', warning: 'warn', critical: 'risk' };
const INCIDENT_MULT: Record<RosterStatus, number> = { critical: 2, warning: 1.2, normal: 0.3 };
const incidents7d = (s: RosterStore): number =>
  Math.round((s.dailyVisitors * INCIDENT_MULT[s.status]) / 30);
const STATUS_RANK: Record<RosterStatus, number> = { critical: 0, warning: 1, normal: 2 };
const RANKED: RosterStore[] = [...canonicalRoster]
  .sort((a, b) => STATUS_RANK[a.status] - STATUS_RANK[b.status] || b.dailyVisitors - a.dailyVisitors)
  .slice(0, 4);
const RANK_TOTAL = RANKED.reduce((sum, s) => sum + incidents7d(s), 0);

// 유형별 바 = 랭킹 4행과 같은 사고 풀의 유형 분해 — Σ바 = Σ랭킹 = RANK_TOTAL
// (핍진성 체크리스트 2항: 화면 내 합계 산술 정합). 비중은 기존 승인 분포
// (위생 42 / 설비 28 / 도난 19 / 안전 11 %)를 유지하되 최대잔여법으로 정수 배분
// → 10/7/5/3건.
const TYPE_SHARE = [0.42, 0.28, 0.19, 0.11] as const;
const BAR_COUNTS: number[] = (() => {
  const counts = TYPE_SHARE.map((r) => Math.floor(RANK_TOTAL * r));
  const rest = RANK_TOTAL - counts.reduce((a, n) => a + n, 0);
  TYPE_SHARE
    .map((r, i) => ({ i, frac: RANK_TOTAL * r - counts[i] }))
    .sort((a, b) => b.frac - a.frac || a.i - b.i)
    .slice(0, rest)
    .forEach(({ i }) => { counts[i] += 1; });
  return counts;
})();

// 실시간 알림 피드 — 문구는 alertCatalog(SOT) 참조, 매장은 roster 참조(승인 고유명사만).
// 알림 심각도는 매장 상태와 별개다(정상 매장에도 주의 알림은 뜬다) — 단, 위험 알림은
// critical 매장(신촌)에 붙여 랭킹 연출과 정합시킨다.
const rosterStore = (slug: string): RosterStore => {
  const s = canonicalRoster.find((r) => r.slug === slug);
  if (!s) throw new Error(`[HqRollup] canonicalRoster에 없는 slug: ${slug}`);
  return s;
};
const FEED_DEF = [
  { type: alertCatalog.hqFridgeTemp, store: rosterStore('sinchon'), sev: 'risk' },
  { type: alertCatalog.hqFloorSpill, store: rosterStore('seomyeon'), sev: 'warn' },
  { type: alertCatalog.hqExitBlocked, store: rosterStore('anyang'), sev: 'warn' },
] satisfies { type: Record<Locale, string>; store: RosterStore; sev: Sev }[];

const dict: Record<Locale, {
  brand: string; scope: string; live: string;
  kpis: { label: string; value: string }[];
  rankTitle: string; colStore: string; colIncidents: string; colStatus: string;
  feedTitle: string;
  barsTitle: string; barLabels: string[]; caseUnit: string;
  sevLegend: Record<Sev, string>;
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
    feedTitle: '실시간 알림',
    barsTitle: '유형별 이상 — 상위 4개점 · 7일',
    barLabels: ['위생', '설비', '도난·이상', '안전'],
    caseUnit: '건',
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
    feedTitle: 'Live alerts',
    barsTitle: 'By type — top 4 stores · 7 days',
    barLabels: ['Hygiene', 'Equipment', 'Theft·anomaly', 'Safety'],
    caseUnit: '',
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
    feedTitle: 'リアルタイムアラート',
    barsTitle: 'タイプ別の異常 — 上位4店舗 · 7日間',
    barLabels: ['衛生', '設備', '盗難·異常', '安全'],
    caseUnit: '件',
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
  // roster·catalog 파생 뷰모델 — 수치·매장·문구는 canonical SOT, 여기서는 로케일 표기만 결합
  const rows = RANKED.map((s) => ({
    store: s.name[locale],
    n: String(incidents7d(s)),
    sev: ROSTER_SEV[s.status],
  }));
  const feedItems = FEED_DEF.map((f) => ({
    type: f.type[locale],
    store: f.store.name[locale],
    sev: f.sev,
  }));
  const bars = t.barLabels.map((label, i) => ({ label, count: BAR_COUNTS[i] }));
  const kpiIcons = [AlertTriangle, Thermometer, Bell, MapPin];
  const reduced = usePrefersReducedMotion();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.3, immediate });
  // live alert feed — rotate the newest to the top while in view (pause on hover)
  const { step: feedStep, hoverProps } = useMockupLoop({
    steps: feedItems.length,
    interval: 2800,
    active: isVisible,
    pauseOnHover: true,
  });
  const feed = [...feedItems.slice(feedStep), ...feedItems.slice(0, feedStep)];
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
                  {rows.map((r, i) => (
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
                      <td className="px-3 py-2"><Pill sev={r.sev} label={t.sevLegend[r.sev]} /></td>
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
            {bars.map((b, i) => (
              <div key={b.label} className="flex items-center gap-3">
                <span className="w-20 shrink-0 text-2xs text-gray-500 break-keep">{b.label}</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <span
                    className="block h-full rounded-full bg-primary"
                    style={{
                      /* 바 폭 = 건수 ÷ RANK_TOTAL — 유형 합이 랭킹 합과 같으므로 구성비로 안전 */
                      width: isVisible ? `${(b.count / RANK_TOTAL) * 100}%` : '0%',
                      transition: reduced ? undefined : 'width 0.7s var(--ease-out-cubic)',
                      transitionDelay: reduced ? undefined : `${0.2 + i * 0.1}s`,
                    }}
                  />
                </span>
                <span className="w-10 shrink-0 text-right text-2xs text-gray-400 tabular-nums">{b.count}{t.caseUnit}</span>
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
