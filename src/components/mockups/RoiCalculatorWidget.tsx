'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import {
  canonicalStore,
  canonicalRoi,
  formatWon,
} from '@/data/mockup-scenarios/canonical';
import MockupBadge from './MockupBadge';
import SaaiHeader from './SaaiHeader';
import { SAAI_COLORS } from '@/lib/mockup-tokens.gen';
import { type DeepPartial, mergeMockupContent } from './types';

// MockupViewport 예외(MM §5 1a IntegratedLoop 형식): 제품 화면 재현이 아닌
// 인터랙티브 위젯(실제 조작하는 슬라이더 입력) — 고정 캔버스 비율 스케일은
// range 썸 히트 영역을 축소해 조작성을 해친다. 반응형 카드(max-w-md)가 설계 의도.
// 색은 SAAI_COLORS 인라인(.saai-scope 밖), 수치는 canonicalRoi 파생으로 계약 충족.

/* ────────────────────────────────────────────────────────────
 * 보수적 추정 가정 (footnoted constants) — 모두 canonicalRoi에서 파생
 *   · CCTV 확인 절감 일 30분 → opHours/16 비례 (16h 기준 capped)
 *   · 시간당 인건비 ₩30,000 · 월 영업일 20일
 *   · 결품 회피 회수율 일매출의 0.5%
 *   · Care 도입 비용 점포당 월 ₩14,900 (첫 달 무료)
 * Care 단독 귀속. "믿기는 숫자가 큰 숫자를 이긴다."
 * ──────────────────────────────────────────────────────────── */
/** CCTV 절감 시간 비례 기준 (시간) — opHours가 이 값에 도달하면 절감 full */
const OP_HOURS_BASELINE = 16;

export interface RoiCalculatorCopy {
  title: string;
  subtitle: string;
  storeLabel: string;
  storeUnit: string;
  salesLabel: string;
  hoursLabel: string;
  hoursUnit: string;
  outStockout: string;
  outLabor: string;
  outPayback: string;
  perMonth: string;
  months: string;
  firstMonthFree: string;
  conservative: string;
  footTitle: string;
  foot1: string;
  foot2: string;
  foot3: string;
  foot4: string;
  foot5: string;
}

const COPY: Record<Locale, RoiCalculatorCopy> = {
  ko: {
    title: 'ROI 계산기',
    subtitle: '도입 효과를 매장 규모로 추정',
    storeLabel: '매장 수',
    storeUnit: '개',
    salesLabel: '평균 일매출',
    hoursLabel: '운영시간',
    hoursUnit: '시간/일',
    outStockout: '결품 절감',
    outLabor: '인건비 절감',
    outPayback: '회수 기간',
    perMonth: '/월',
    months: '개월',
    firstMonthFree: '첫 달 무료',
    conservative: '보수적 추정',
    footTitle: '가정 (보수적 추정)',
    foot1: 'CCTV 확인 절감 일 30분 · 운영시간 16시간 기준 비례',
    foot2: '시간당 인건비 ₩30,000 · 월 20일 영업',
    foot3: '결품 회피 회수율 일매출의 0.5%',
    foot4: 'Care 도입 비용 점포당 월 ₩14,900 (첫 달 무료)',
    foot5: '회수 기간은 점포당 일회성 도입·온보딩 비용 ₩750,000 기준',
  },
  en: {
    title: 'ROI calculator',
    subtitle: 'Estimate impact by store footprint',
    storeLabel: 'Stores',
    storeUnit: '',
    salesLabel: 'Avg daily sales',
    hoursLabel: 'Operating hours',
    hoursUnit: 'h/day',
    outStockout: 'Stock-out saved',
    outLabor: 'Labor saved',
    outPayback: 'Payback',
    perMonth: '/mo',
    months: 'mo',
    firstMonthFree: 'first month free',
    conservative: 'conservative estimate',
    footTitle: 'Assumptions (conservative estimate)',
    foot1: '30 min/day saved on CCTV checks · scaled to 16h baseline',
    foot2: '30,000 KRW/hr labor · 20 business days/mo',
    foot3: '0.5% of daily sales recovered from stock-outs',
    foot4: 'Care cost 14,900 KRW/store/mo (first month free)',
    foot5: 'Payback is based on a one-time 750,000 KRW/store setup & onboarding cost',
  },
  jp: {
    title: 'ROI計算ツール',
    subtitle: '店舗規模から導入効果を試算します',
    storeLabel: '店舗数',
    storeUnit: '店',
    salesLabel: '平均日商',
    hoursLabel: '営業時間',
    hoursUnit: '時間/日',
    outStockout: '欠品削減',
    outLabor: '人件費削減',
    outPayback: '回収期間',
    perMonth: '/月',
    months: 'ヶ月',
    firstMonthFree: '初月無料',
    conservative: '保守的な推定',
    footTitle: '前提 (保守的な推定)',
    foot1: 'CCTV確認の削減 1日30分 ・ 営業16時間を基準に比例',
    foot2: '時給 30,000 KRW ・ 月20営業日',
    foot3: '日商の0.5%を欠品から回収',
    foot4: 'Care導入費 1店舗 月14,900 KRW (初月無料)',
    foot5: '回収期間は1店舗あたり初期導入・オンボーディング費 750,000 KRWを基準',
  },
};

interface SliderProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}

function Slider({ id, label, value, min, max, step, display, onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-xs font-medium text-gray-600">
          {label}
        </label>
        <span className="text-sm font-bold tabular-nums text-gray-900">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roi-range w-full"
        style={{
          background: `linear-gradient(to right, ${SAAI_COLORS.primary} ${pct}%, ${SAAI_COLORS['border-subtle']} ${pct}%)`,
        }}
      />
    </div>
  );
}

export default function RoiCalculatorWidget({
  active = true,
  locale = 'en',
  className = '',
  content,
}: {
  active?: boolean;
  locale?: Locale;
  className?: string;
  /** 문구 오버라이드 — 부분 병합(mergeMockupContent). 기본: COPY[locale] */
  content?: DeepPartial<RoiCalculatorCopy>;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const t = mergeMockupContent(COPY[locale] ?? COPY.en, content);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  const [storeCount, setStoreCount] = useState(10);
  const [dailySales, setDailySales] = useState<number>(
    canonicalStore.forecastRevenueWon
  ); // ₩1,245,000
  const [opHours, setOpHours] = useState(16);

  const { laborSaving, stockoutSaving, paybackMonths } = useMemo(() => {
    // 인건비 절감/월 = 매장수 × (절감분/60) × min(1, opHours/16) × 시급 × 영업일
    //   ← opHours가 절감을 비례 조정 (운영시간이 길수록 CCTV 확인 절감 ↑, 16h 기준 cap)
    const hoursSavedPerDay =
      (canonicalRoi.cctvMinutesSavedPerDay / 60) *
      Math.min(1, opHours / OP_HOURS_BASELINE);
    const labor =
      storeCount *
      hoursSavedPerDay *
      canonicalRoi.wagePerHour *
      canonicalRoi.daysPerMonth;
    // 결품 절감/월 = 일매출 × 회수율 × 매장수 × 영업일
    const stockout =
      dailySales *
      canonicalRoi.stockoutRecoveryPct *
      storeCount *
      canonicalRoi.daysPerMonth;
    // 회수 기간(개월) = 일회성 도입비 ÷ 월 절감액
    //   월 구독료(₩14,900)는 절감액에 비해 작아 회수기간을 좌우하지 못한다.
    //   실제 회수는 점포당 도입·온보딩 비용(₩750,000)에서 발생한다.
    const setupCost = storeCount * canonicalRoi.setupCostPerStore;
    const monthlySaving = labor + stockout;
    const payback = monthlySaving > 0 ? setupCost / monthlySaving : 0;
    return {
      laborSaving: Math.round(labor),
      stockoutSaving: Math.round(stockout),
      paybackMonths: payback,
    };
  }, [storeCount, dailySales, opHours]);

  const paybackDisplay = paybackMonths.toFixed(1);

  // 슬라이더 드래그 중 매 틱 안내(스팸)를 피하기 위해, 멈춘 뒤 500ms 후 1회만 SR에 알림.
  const [announce, setAnnounce] = useState('');
  useEffect(() => {
    const id = setTimeout(() => {
      setAnnounce(
        `${t.outStockout} ${formatWon(stockoutSaving)}, ${t.outLabor} ${formatWon(laborSaving)}, ${t.outPayback} ${paybackDisplay} ${t.months}`,
      );
    }, 500);
    return () => clearTimeout(id);
  }, [stockoutSaving, laborSaving, paybackDisplay, t]);

  const anim = !reducedMotion && isVisible;
  const enter = reducedMotion
    ? { opacity: 1, y: 0 }
    : anim
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 16 };

  return (
    <motion.div
      ref={ref}
      role="group"
      aria-label={t.title}
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={enter}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`relative mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-card ${className}`}
    >
      <MockupBadge locale={locale} />

      <style jsx>{`
        .roi-range {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 9999px;
          outline: none;
          cursor: pointer;
        }
        .roi-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: ${SAAI_COLORS.primary};
          border: 2px solid ${SAAI_COLORS.white};
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }
        .roi-range::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: ${SAAI_COLORS.primary};
          border: 2px solid ${SAAI_COLORS.white};
        }
        .roi-range:focus-visible {
          box-shadow: 0 0 0 3px rgb(var(--primary-rgb) / 0.35);
        }
      `}</style>

      <header className="mb-5">
        <SaaiHeader name="saai" tone="light" className="mb-1.5" />
        <h3 className="text-base font-bold text-gray-900">{t.title}</h3>
        <p className="text-xs text-gray-500">{t.subtitle}</p>
      </header>

      {/* ── INPUTS ── */}
      <div className="space-y-4">
        <Slider
          id="roi-stores"
          label={t.storeLabel}
          value={storeCount}
          min={1}
          max={200}
          step={1}
          display={`${storeCount.toLocaleString('en-US')}${t.storeUnit}`}
          onChange={setStoreCount}
        />
        <Slider
          id="roi-sales"
          label={t.salesLabel}
          value={dailySales}
          min={300_000}
          max={5_000_000}
          step={5_000}
          display={formatWon(dailySales)}
          onChange={setDailySales}
        />
        <Slider
          id="roi-hours"
          label={t.hoursLabel}
          value={opHours}
          min={8}
          max={24}
          step={1}
          display={`${opHours}${t.hoursUnit ? ' ' + t.hoursUnit : ''}`}
          onChange={setOpHours}
        />
      </div>

      {/* ── OUTPUTS ── */}
      {/* 시각 출력은 즉시 갱신(라이브리전 아님); SR 안내는 아래 디바운스 영역이 담당 */}
      <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-gray-50 p-3">
        <Output label={t.outStockout} value={formatWon(stockoutSaving)} sub={t.perMonth} />
        <Output label={t.outLabor} value={formatWon(laborSaving)} sub={t.perMonth} accent />
        <Output
          label={t.outPayback}
          value={paybackDisplay}
          sub={`${t.months} · ${t.conservative}`}
        />
      </div>
      {/* 디바운스된 SR 전용 안내 — 드래그 멈춘 뒤 500ms 후 1회 */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announce}
      </div>

      {/* ── FOOTNOTES (가정 각주 공개 / D8) ── */}
      <details className="mt-4 text-2xs leading-relaxed text-gray-500">
        <summary className="cursor-pointer font-medium text-gray-600">
          {t.footTitle}
        </summary>
        <ol className="mt-2 list-decimal space-y-0.5 pl-4">
          <li>{t.foot1}</li>
          <li>{t.foot2}</li>
          <li>{t.foot3}</li>
          <li>{t.foot4}</li>
          <li>{t.foot5}</li>
        </ol>
      </details>
    </motion.div>
  );
}

function Output({
  label,
  value,
  sub,
  accent = false,
}: {
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-3xs font-medium text-gray-500">{label}</span>
      <span
        className={`mt-0.5 text-sm font-bold tabular-nums ${
          accent ? 'text-primary' : 'text-gray-900'
        }`}
      >
        {value}
      </span>
      {/* text-[9px]는 DESIGN.md 마이크로 타이포 스케일에 없음 — 가장 가까운 토큰(10px)로 정리 (FunnelDiagram과 동일 처리) */}
      <span className="mt-0.5 text-3xs text-gray-400">{sub}</span>
    </div>
  );
}
