import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

/**
 * AgentHqMiniMockup — "한 매장이 아니라, 브랜드 전체가" 밴드의 본부 롤업 미니 목업.
 * pricingSub에서 걷어낸 "방문·구매·전환율" 디테일이 이 화면의 컬럼으로 옮겨온 것.
 * 정적 재현(서버 컴포넌트, 훅 없음) — 숫자는 예시 데이터.
 */

type Tri = { ko: string; en: string; jp: string };
const tri = (ko: string, en: string, jp: string): Tri => ({ ko, en, jp });

const COPY = {
  brand: tri('store agent · HQ', 'store agent · HQ', 'store agent · HQ'),
  scope: tri('전국 128개 매장', '128 stores nationwide', '全国128店舗'),
  live: 'LIVE',
  cols: {
    store: tri('매장', 'Store', '店舗'),
    visits: tri('방문', 'Visits', '来店'),
    purchases: tri('구매', 'Purchases', '購入'),
    conv: tri('전환율', 'Conv.', '転換率'),
  },
  rows: [
    { store: tri('강남역점', 'Gangnam Station', '江南駅店'), visits: '1,204', purchases: '342', conv: '6.2%', up: true },
    { store: tri('판교점', 'Pangyo', '板橋店'), visits: '1,411', purchases: '388', conv: '5.5%', up: true },
    { store: tri('홍대입구점', 'Hongdae', '弘大入口店'), visits: '987', purchases: '231', conv: '4.8%', up: false },
    { store: tri('부산 서면점', 'Busan Seomyeon', '釜山西面店'), visits: '1,092', purchases: '246', conv: '4.1%', up: false },
  ],
  kpis: [
    { label: tri('오늘 총 방문', 'Visits today', '本日の総来店'), value: '12,940' },
    { label: tri('평균 전환율', 'Avg conversion', '平均転換率'), value: '5.1%' },
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
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
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
              {COPY.rows.map((r) => (
                <tr key={r.store.ko} className="border-t border-gray-100">
                  <td className="whitespace-nowrap px-3 py-2 text-xs font-medium text-gray-900">{T(r.store)}</td>
                  <td className="px-3 py-2 text-right text-xs tabular-nums text-gray-700">{r.visits}</td>
                  <td className="px-3 py-2 text-right text-xs tabular-nums text-gray-700">{r.purchases}</td>
                  <td className="px-3 py-2 text-right">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold tabular-nums ${r.up ? 'text-primary' : 'text-gray-500'}`}>
                      {r.up ? <TrendingUp className="h-3 w-3" aria-hidden="true" /> : <TrendingDown className="h-3 w-3" aria-hidden="true" />}
                      {r.conv}
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
