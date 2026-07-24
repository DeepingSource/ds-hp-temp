import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { canonicalHq, canonicalRoster } from '@/data/mockup-scenarios/canonical';
import { SAAI_COLORS } from '@/lib/mockup-tokens';

/**
 * AgentHqMiniMockup — "한 매장이 아니라, 브랜드 전체가" 밴드의 본부 롤업 미니 목업.
 * pricingSub에서 걷어낸 "방문·구매·전환율" 디테일이 이 화면의 컬럼으로 옮겨온 것.
 * 정적 재현(서버 컴포넌트, 훅 없음) — 수치는 canonical 파생(D6).
 */

// MockupViewport 예외(MM §5 1c): 정적 서버 컴포넌트 랭킹 카드 — 리플로우 안정
// 표형이라 고정 캔버스 불필요.

type Tri = { ko: string; en: string; jp: string };
const tri = (ko: string, en: string, jp: string): Tri => ({ ko, en, jp });

// D6: 매장명·방문 = canonicalRoster 파생(name·dailyVisitors — 강남역 342·홍대 298·
// 잠실 276·신촌 189). 구매(79/61/52/33)는 roster에 없어 파일 내 상수로 유지 —
// 전환율 = 구매÷방문 렌더 시 산출(23.1/20.5/18.8/17.5%), 표기와 산술이 항상 일치.
// KPI는 표시 행 합에서 파생.
const rosterStore = (slug: string) => canonicalRoster.find((s) => s.slug === slug)!;
const ROWS: { store: Tri; visits: number; purchases: number; up: boolean }[] = ([
  { slug: 'gangnam-stn', purchases: 79, up: true },
  { slug: 'hongdae', purchases: 61, up: true },
  { slug: 'jamsil', purchases: 52, up: false },
  { slug: 'sinchon', purchases: 33, up: false },
] as const).map(({ slug, purchases, up }) => {
  const s = rosterStore(slug);
  return { store: s.name, visits: s.dailyVisitors, purchases, up };
});
const convPct = (r: { visits: number; purchases: number }) =>
  `${((r.purchases / r.visits) * 100).toFixed(1)}%`;
const totalVisits = ROWS.reduce((a, r) => a + r.visits, 0); // 1,105
const totalPurchases = ROWS.reduce((a, r) => a + r.purchases, 0); // 225

const COPY = {
  brand: tri('store agent · HQ', 'store agent · HQ', 'store agent · HQ'),
  scope: tri(
    `전국 ${canonicalHq.totalStores}개 매장`,
    `${canonicalHq.totalStores} stores nationwide`,
    `全国${canonicalHq.totalStores}店舗`,
  ),
  live: 'LIVE',
  cols: {
    store: tri('매장', 'Store', '店舗'),
    visits: tri('방문', 'Visits', '来店'),
    purchases: tri('구매', 'Purchases', '購入'),
    conv: tri('전환율', 'Conv.', '転換率'),
  },
  kpis: [
    {
      label: tri('오늘 총 방문 (상위 4개점)', 'Visits today (top 4 stores)', '本日の総来店 (上位4店舗)'),
      value: totalVisits.toLocaleString('en-US'),
    },
    {
      label: tri('평균 전환율', 'Avg conversion', '平均転換率'),
      value: `${((totalPurchases / totalVisits) * 100).toFixed(1)}%`,
    },
    { label: tri('권고 실행률', 'Calls acted on', '推奨実行率'), value: '82%' },
  ],
  caption: tri('* 샘플 화면 · 데이터 예시', '* Sample screen · illustrative data', '* サンプル画面 · データは例示'),
};

export default function AgentHqMiniMockup({ locale, className }: { locale: Locale; className?: string }) {
  const T = (x: Tri) => x[locale];

  return (
    <figure
      role="img"
      aria-label={T(COPY.brand)}
      className={`overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-elevated ${className ?? ''}`}
    >
      {/* chrome header */}
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 bg-gray-900 px-5 py-3">
        <div className="flex items-center gap-2 text-white">
          <span className="text-xs font-bold tracking-wide opacity-60">saai</span>
          <span className="text-sm font-bold lowercase">{T(COPY.brand)}</span>
        </div>
        <div className="flex items-center gap-2 text-2xs font-medium text-gray-300">
          <span>{T(COPY.scope)}</span>
          {/* Viewport 예외 파일 = .saai-scope 밖(StoreAgentView) → --saai-* 변수 미해석. SAAI_COLORS 인라인 사용(D2). */}
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5"
            style={{
              backgroundColor: `color-mix(in srgb, ${SAAI_COLORS['status-success']} 15%, transparent)`,
              color: SAAI_COLORS['green-300'],
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: SAAI_COLORS['status-success'] }}
              aria-hidden="true"
            />
            {COPY.live}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-5">
        {/* KPI row */}
        <div className="grid grid-cols-3 gap-3">
          {COPY.kpis.map((k) => (
            <div key={k.label.ko} className="rounded-xl border border-gray-100 bg-gray-50 p-3">
              <p className="text-lg font-bold tabular-nums text-gray-900">{k.value}</p>
              <p className="text-2xs break-keep text-gray-500">{T(k.label)}</p>
            </div>
          ))}
        </div>

        {/* store table — 방문·구매·전환율 */}
        <div className="overflow-hidden rounded-xl border border-gray-100">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-2xs uppercase tracking-wide text-gray-400">
                <th scope="col" className="px-3 py-2 font-medium">{T(COPY.cols.store)}</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">{T(COPY.cols.visits)}</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">{T(COPY.cols.purchases)}</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">{T(COPY.cols.conv)}</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.store.ko} className="border-t border-gray-100">
                  <td className="whitespace-nowrap px-3 py-2 text-xs font-medium text-gray-900">{T(r.store)}</td>
                  <td className="px-3 py-2 text-right text-xs tabular-nums text-gray-700">{r.visits.toLocaleString('en-US')}</td>
                  <td className="px-3 py-2 text-right text-xs tabular-nums text-gray-700">{r.purchases.toLocaleString('en-US')}</td>
                  <td className="px-3 py-2 text-right">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold tabular-nums ${r.up ? 'text-primary' : 'text-gray-500'}`}>
                      {r.up ? <TrendingUp className="h-3 w-3" aria-hidden="true" /> : <TrendingDown className="h-3 w-3" aria-hidden="true" />}
                      {convPct(r)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <figcaption className="border-t border-gray-100 bg-gray-50 px-5 py-2 text-2xs text-gray-400">
        {T(COPY.caption)}
      </figcaption>
    </figure>
  );
}
