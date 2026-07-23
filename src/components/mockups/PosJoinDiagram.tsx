import { Receipt, Route, Plus, ArrowRight, Lightbulb } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

/**
 * PosJoinDiagram — "POS는 무엇이, insight는 왜" 결합 다이어그램 (재정돈 2026-07).
 * saai insight 페이지의 POS 보완 밴드에서 텍스트 문단이 하던 설명을 시각으로 대체:
 * [POS 영수증 카드] + [insight 행동 카드] → [원인까지 완성된 답].
 * 다크 밴드(bg-slate-900) 위에 놓이는 것을 전제로 한 정적 재현 — 숫자는 예시.
 */

type Tri = { ko: string; en: string; jp: string };
const tri = (ko: string, en: string, jp: string): Tri => ({ ko, en, jp });

const COPY = {
  posTitle: tri('무엇이 · 얼마나', 'What · how much', '何が · どれだけ'),
  posRows: [
    { name: tri('도시락', 'Lunchboxes', '弁当'), val: '12' },
    { name: tri('음료', 'Drinks', '飲料'), val: '38' },
    { name: tri('스낵', 'Snacks', 'スナック'), val: '21' },
  ],
  posFoot: tri('매출 −8% · 원인은 없음', 'Sales −8% · no cause shown', '売上−8% · 原因は無し'),
  insTitle: tri('왜 · 어디서', 'Why · where', 'なぜ · どこで'),
  insFoot: tri('음료 매대 앞 체류 −40%', 'Dwell at the drinks shelf −40%', '飲料棚前の滞在 −40%'),
  outLabel: tri('한 화면에서 결합', 'Joined on one screen', '一画面で結合'),
  outTitle: tri('매출이 떨어진 날, 원인까지', 'A down day — with its cause', '売上が落ちた日、原因まで'),
  outBody: tri(
    '음료 매대 앞 체류가 줄어 매출이 빠졌습니다 — 진열을 바꿀 차례입니다.',
    'Dwell at the drinks shelf fell, and sales followed — time to change the display.',
    '飲料棚前の滞在が減り、売上が落ちました — 陳列を変える番です。',
  ),
  caption: tri('* 샘플 화면 · 데이터 예시', '* Sample screen · illustrative data', '* サンプル画面 · データは例示'),
};

/** insight 카드의 미니 히트맵 셀 강도 (0–3). */
const HEAT = [1, 2, 0, 3, 2, 1, 2, 3, 1];
const heatCls = ['bg-white/10', 'bg-primary/30', 'bg-primary/60', 'bg-primary'];

export default function PosJoinDiagram({ locale, className }: { locale: Locale; className?: string }) {
  const T = (x: Tri) => x[locale];

  return (
    <figure role="img" aria-label={T(COPY.outTitle)} className={className}>
      <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
        {/* POS 카드 — 무엇이 · 얼마나 */}
        <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Receipt className="h-4 w-4" aria-hidden="true" /> POS
            <span className="ml-auto font-normal normal-case tracking-normal text-slate-500">{T(COPY.posTitle)}</span>
          </p>
          <ul className="space-y-1.5">
            {COPY.posRows.map((r) => (
              <li key={r.name.ko} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-1.5 text-sm">
                <span className="text-slate-300">{T(r.name)}</span>
                <span className="font-mono font-bold tabular-nums text-white">{r.val}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs font-medium text-rose-300/90 break-keep">{T(COPY.posFoot)}</p>
        </div>

        <Plus className="mx-auto h-5 w-5 shrink-0 text-slate-500 lg:mx-0" aria-hidden="true" />

        {/* insight 카드 — 왜 · 어디서 */}
        <div className="flex-1 rounded-2xl border border-primary/30 bg-primary/10 p-5 text-left">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-light">
            <Route className="h-4 w-4" aria-hidden="true" /> saai insight
            <span className="ml-auto font-normal normal-case tracking-normal text-primary-light/70">{T(COPY.insTitle)}</span>
          </p>
          <div className="grid grid-cols-9 gap-1 sm:grid-cols-9" aria-hidden="true">
            {HEAT.map((v, i) => (
              <span key={i} className={`aspect-square rounded ${heatCls[v]}`} />
            ))}
          </div>
          <p className="mt-3 text-xs font-medium text-primary-light break-keep">{T(COPY.insFoot)}</p>
        </div>

        <ArrowRight className="mx-auto h-5 w-5 shrink-0 rotate-90 text-slate-500 lg:mx-0 lg:rotate-0" aria-hidden="true" />

        {/* 결과 카드 — 원인까지 완성 */}
        <div className="flex-1 rounded-2xl border border-white/15 bg-white p-5 text-left shadow-elevated">
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Lightbulb className="h-4 w-4" aria-hidden="true" /> {T(COPY.outLabel)}
          </p>
          <p className="text-sm font-bold leading-snug break-keep text-gray-900">{T(COPY.outTitle)}</p>
          <p className="mt-1.5 text-xs leading-relaxed break-keep text-gray-600">{T(COPY.outBody)}</p>
        </div>
      </div>
      <figcaption className="mt-3 text-2xs text-slate-500">{T(COPY.caption)}</figcaption>
    </figure>
  );
}
