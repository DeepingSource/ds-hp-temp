import { ArrowRight } from 'lucide-react';
import { type Locale } from '@/lib/i18n';

/**
 * AdoptionJourney — numbered 01→05 adoption timeline with a metric graphic per stage
 * (솔루션 작업문서 v1 §6, V5). Frames the saai METHOD (discover → re-measure), not a
 * per-category outcome — figures are locale-invariant + labeled "대표 예시" to avoid
 * implying each industry achieved them. Numbers live once (STEPS); only labels/units
 * are per-locale, so translations can't drift the data.
 */

type Metric =
  | { kind: 'delta'; from: number; to: number; unit: 'min' | 'pct' }
  | { kind: 'value'; value: number; unit: 'stores' }
  | { kind: 'percent'; value: number }
  | { kind: 'ratio'; num: number; den: number };

const STEPS: { n: string; key: 'discover' | 'validate' | 'translate' | 'sync' | 'remeasure'; metric: Metric }[] = [
  { n: '01', key: 'discover', metric: { kind: 'delta', from: 30, to: 8, unit: 'min' } },
  { n: '02', key: 'validate', metric: { kind: 'value', value: 100, unit: 'stores' } },
  { n: '03', key: 'translate', metric: { kind: 'percent', value: 87 } },
  { n: '04', key: 'sync', metric: { kind: 'delta', from: 64, to: 100, unit: 'pct' } },
  { n: '05', key: 'remeasure', metric: { kind: 'ratio', num: 18, den: 22 } },
];

type StepLabel = { title: string; caption: string };
const L: Record<Locale, {
  eyebrow: string; heading: string; note: string;
  units: { min: string; stores: string };
  labels: Record<(typeof STEPS)[number]['key'], StepLabel>;
}> = {
  ko: {
    eyebrow: '도입 여정', heading: '발견에서 재측정까지, 다섯 단계', note: '* 대표 예시 지표',
    units: { min: '분', stores: '개 매장' },
    labels: {
      discover: { title: '발견', caption: '수동 점검 시간' },
      validate: { title: '검증', caption: '파일럿 규모' },
      translate: { title: '번역', caption: '권고 실행률' },
      sync: { title: '전파', caption: 'KPI 정합' },
      remeasure: { title: '재측정', caption: '개선 매장' },
    },
  },
  en: {
    eyebrow: 'Adoption journey', heading: 'Five stages, from discovery to re-measure', note: '* Illustrative example figures',
    units: { min: 'min', stores: 'stores' },
    labels: {
      discover: { title: 'Discover', caption: 'Manual check time' },
      validate: { title: 'Validate', caption: 'Pilot scale' },
      translate: { title: 'Translate', caption: 'Recommendation adoption' },
      sync: { title: 'Sync', caption: 'KPI alignment' },
      remeasure: { title: 'Re-measure', caption: 'Stores improved' },
    },
  },
  jp: {
    eyebrow: '導入の道のり', heading: '発見から再測定まで、五つの段階', note: '* 代表例の指標',
    units: { min: '分', stores: '店舗' },
    labels: {
      discover: { title: '発見', caption: '手動点検の時間' },
      validate: { title: '検証', caption: 'パイロット規模' },
      translate: { title: '翻訳', caption: '推奨実行率' },
      sync: { title: '展開', caption: 'KPI整合' },
      remeasure: { title: '再測定', caption: '改善店舗' },
    },
  },
};

function MetricGraphic({ metric, minUnit, storesUnit }: { metric: Metric; minUnit: string; storesUnit: string }) {
  switch (metric.kind) {
    case 'delta': {
      const u = metric.unit === 'min' ? minUnit : '%';
      return (
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm text-gray-400 line-through tabular-nums">{metric.from}{u}</span>
          <ArrowRight className="h-3.5 w-3.5 shrink-0 self-center text-primary" aria-hidden="true" />
          <span className="text-2xl font-bold tabular-nums text-gray-900">{metric.to}<span className="ml-0.5 text-sm font-medium text-gray-400">{u}</span></span>
        </div>
      );
    }
    case 'value':
      return (
        <p className="text-2xl font-bold tabular-nums text-gray-900">{metric.value}<span className="ml-1 text-sm font-medium text-gray-400">{storesUnit}</span></p>
      );
    case 'percent':
      return (
        <div>
          <p className="text-2xl font-bold tabular-nums text-gray-900">{metric.value}<span className="text-sm font-medium text-gray-400">%</span></p>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-primary" style={{ width: `${metric.value}%` }} />
          </div>
        </div>
      );
    case 'ratio':
      return (
        <div>
          <p className="text-2xl font-bold tabular-nums text-gray-900">{metric.num}<span className="text-sm font-medium text-gray-400"> / {metric.den}</span></p>
          <div className="mt-1.5 flex gap-1" aria-hidden="true">
            {Array.from({ length: metric.den }).map((_, i) => (
              <span key={i} className={`h-1.5 flex-1 rounded-full ${i < metric.num ? 'bg-primary' : 'bg-gray-100'}`} />
            ))}
          </div>
        </div>
      );
  }
}

export default function AdoptionJourney({ locale }: { locale: Locale }) {
  const t = L[locale];
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-12 text-center">
        <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.eyebrow}</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep">{t.heading}</h2>
      </div>

      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {STEPS.map((s) => {
          const label = t.labels[s.key];
          return (
            <li key={s.n} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-card">
              <span className="text-3xl font-bold text-primary/20 tabular-nums leading-none">{s.n}</span>
              <p className="mt-2 text-base font-bold text-gray-900 break-keep">{label.title}</p>
              <p className="text-xs text-gray-400 break-keep">{label.caption}</p>
              <div className="mt-auto pt-4">
                <MetricGraphic metric={s.metric} minUnit={t.units.min} storesUnit={t.units.stores} />
              </div>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-center text-xs text-gray-400">{t.note}</p>
    </div>
  );
}
