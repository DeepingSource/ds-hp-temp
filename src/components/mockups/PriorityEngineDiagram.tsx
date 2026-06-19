'use client';

import { motion } from 'framer-motion';
import MockupBadge from './MockupBadge';
import SaaiHeader from './SaaiHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useMockupLoop } from '@/hooks/useMockupLoop';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { canonicalStore, canonicalStoreName, canonicalHq, formatWon } from '@/data/mockup-scenarios/canonical';
import type { Locale } from '@/lib/i18n';

/**
 * #3 PriorityEngineDiagram — StoreAgent 우선순위 엔진 (원리 → 결과; pairs with ActionCard).
 * Flow: Inputs → Score → Class P1–P4 → Top 3 → Human decision → Learning feedback (dotted loop).
 *
 * NOTE: priority classes use P1–P4 (distinct from the L0–L5 autonomy ladder; 'L' = autonomy only).
 *
 * DESIGN: grayscale diagram + single brand-blue (#376AE2) accent. Light bg, no gradient/shadow/3D.
 * D6 (HQ/본사-facing slot): English-FIRST technical labels in every locale; ko/jp add supporting microcopy.
 */

interface Props {
  active?: boolean;
  locale?: Locale;
  className?: string;
}

type RankedCard = { theme: string; action: string; note: string };

type PClass = 'P1' | 'P2' | 'P3' | 'P4';

type Copy = {
  title: string;
  sub: string;
  inputs: string;
  inputItems: [string, string, string, string];
  triggerLabel: string;
  score: string;
  scoreNote: string;
  klass: string;
  classNote: string;
  classLegend: string;
  top3: string;
  top3Note: string;
  human: string;
  humanNote: string;
  learning: string;
  learningNote: string;
  /** Stable card pool; scenarios re-rank these by index. */
  cards: [RankedCard, RankedCard, RankedCard];
  /** Per-locale input trigger labels, aligned 1:1 with SCENARIOS. */
  triggers: [string, string, string];
  alertsLabel: string;
  responseLabel: string;
};

/**
 * Shared (locale-agnostic) input scenarios. The engine reads each trigger,
 * scores it, lands on a priority class, and re-ranks the Top-3 — so the SAME
 * engine yields a DIFFERENT top-priority outcome per scenario (different
 * P-class highlighted + different #1 card). (MOCKUP_REVIEW_v2 §4)
 *
 * Scores are canonical-derived: each is an offset from canonicalStore.perfScore
 * (92), keeping the displayed number tied to the single source of truth.
 */
const SCENARIOS: {
  /** Engine score 0–100, derived from canonicalStore.perfScore. */
  score: number;
  /** Resulting top-priority class (highlighted P-chip). */
  topClass: PClass;
  /** Indices into `cards`, ranked #1→#3 for this scenario. */
  order: [number, number, number];
}[] = [
  // A: stockout imminent → P1, restock card (idx 2) ranked #1.
  { score: canonicalStore.perfScore + 2, topClass: 'P1', order: [2, 0, 1] },
  // B: rain forecast → P2, umbrella reorder (idx 0) ranked #1.
  { score: canonicalStore.perfScore - 11, topClass: 'P2', order: [0, 1, 2] },
  // C: peak-time wait → P1, staffing card (idx 1) ranked #1.
  { score: canonicalStore.perfScore - 4, topClass: 'P1', order: [1, 0, 2] },
];

const COPY: Record<Locale, Copy> = {
  ko: {
    title: 'Priority Engine',
    sub: '원리 → 결과 · 점주가 받는 건 정리된 우선순위뿐',
    inputs: 'Inputs',
    inputItems: ['Insight', 'Care', 'External context', 'History (이력)'],
    triggerLabel: '입력 신호',
    score: 'Score',
    scoreNote: '신호를 단일 점수로 점수화',
    klass: 'Class P1–P4',
    classNote: '점수를 우선순위 등급으로 분류',
    classLegend: 'P1 = 오늘 처리',
    top3: 'Top 3',
    top3Note: '상위 3개 액션 카드로 압축',
    human: 'Human decision',
    humanNote: '최종 판단·실행은 사람이',
    learning: 'Learning feedback',
    learningNote: '결과를 학습 되먹임으로 환류',
    cards: [
      { theme: '발주', action: '우산·우비 발주', note: '강수 70%' },
      { theme: '인력', action: '피크타임 인력 +1', note: '대기 3.2분' },
      { theme: '진열', action: '삼각김밥 진열 보강', note: '전면 30% 미만' },
    ],
    triggers: ['결품 임박 — 음료 진열', '내일 강수 70% — 우산 발주', '피크타임 대기 3.2분'],
    alertsLabel: '본부 일일 알림',
    responseLabel: '점주 평균 응답률',
  },
  en: {
    title: 'Priority Engine',
    sub: 'Principle to outcome — the owner only sees a ranked shortlist',
    inputs: 'Inputs',
    inputItems: ['Insight', 'Care', 'External context', 'History'],
    triggerLabel: 'Input signal',
    score: 'Score',
    scoreNote: 'Signals reduced to one score',
    klass: 'Class P1–P4',
    classNote: 'Score mapped to priority class',
    classLegend: 'P1 = handle today',
    top3: 'Top 3',
    top3Note: 'Compressed to three action cards',
    human: 'Human decision',
    humanNote: 'The owner makes the final call',
    learning: 'Learning feedback',
    learningNote: 'Outcomes fed back into the model',
    cards: [
      { theme: 'Ordering', action: 'Reorder umbrellas', note: '70% rain' },
      { theme: 'Staffing', action: 'Peak-time staff +1', note: '3.2 min wait' },
      { theme: 'Merch', action: 'Restock onigiri shelf', note: 'front < 30%' },
    ],
    triggers: ['Stockout imminent — drink shelf', '70% rain tomorrow — umbrellas', 'Peak-time wait 3.2 min'],
    alertsLabel: 'HQ daily alerts',
    responseLabel: 'Owner response rate',
  },
  jp: {
    title: 'Priority Engine',
    sub: '原理から結果へ — 店主が受け取るのは整理された優先順位だけです',
    inputs: 'Inputs',
    inputItems: ['Insight', 'Care', 'External context', 'History (履歴)'],
    triggerLabel: '入力シグナル',
    score: 'Score',
    scoreNote: 'シグナルを単一のスコアに集約します',
    klass: 'Class P1–P4',
    classNote: 'スコアを優先度クラスへ分類します',
    classLegend: 'P1 = 本日対応',
    top3: 'Top 3',
    top3Note: '上位3件のアクションカードに圧縮します',
    human: 'Human decision',
    humanNote: '最終判断と実行は人が担います',
    learning: 'Learning feedback',
    learningNote: '結果を学習フィードバックへ還元します',
    cards: [
      { theme: '発注', action: '傘・雨具の発注', note: '降水70%' },
      { theme: '人員', action: 'ピーク人員 +1', note: '待ち3.2分' },
      { theme: '陳列', action: 'おにぎり陳列の補充', note: '前面30%未満' },
    ],
    triggers: ['欠品間近 — 飲料陳列', '明日 降水70% — 傘の発注', 'ピーク時 待ち3.2分'],
    alertsLabel: 'HQ 日次アラート',
    responseLabel: '店主の平均応答率',
  },
};

// Flow stages in signal-travel order: Inputs → Score → Class → Top 3.
const STAGE_KEYS = ['inputs', 'score', 'class', 'top3'] as const;
const P_CLASSES = ['P1', 'P2', 'P3', 'P4'] as const;

export default function PriorityEngineDiagram({
  active = true,
  locale = 'en',
  className,
}: Props) {
  const t = COPY[locale] ?? COPY.en;
  const reducedMotion = usePrefersReducedMotion();
  const { ref: containerRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  // Outer loop: cycle the input SCENARIOS so the engine yields a different
  // top-priority outcome each pass (different P-class + #1 card). pauseOnHover
  // lives here; hover handlers are spread on the root. (MOCKUP_REVIEW_v2 §4)
  // Outer interval is aligned EXACTLY to the inner full-pass duration
  // (4 stages × 800ms = 3200ms) so each scenario lasts one inner pass and
  // both loops flip together — no mid-transition stage reset/flash.
  const { step: scenarioStep, hoverProps } = useMockupLoop({
    steps: SCENARIOS.length,
    interval: STAGE_KEYS.length * 800,
    active: isVisible && active,
    pauseOnHover: true,
  });

  // reduced-motion: lock to the first scenario (static).
  const activeScenario = reducedMotion ? 0 : scenarioStep;
  const sc = SCENARIOS[activeScenario];
  const trigger = t.triggers[activeScenario];

  // Inner loop: signal travels across the 4 core stages, one pass per scenario.
  const { step } = useMockupLoop({
    steps: STAGE_KEYS.length,
    interval: 800,
    active: isVisible && active,
  });

  // reduced-motion: show every stage lit (no traveling signal).
  const isLit = (i: number) => reducedMotion || (isVisible && active && step >= i);

  // Top-3 cards re-ranked per scenario; #1 (order[0]) is the highlighted action.
  const rankedCards = sc.order.map((idx) => t.cards[idx]);

  return (
    <div
      ref={containerRef}
      {...hoverProps}
      className={`relative rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 ${className ?? ''}`}
    >
      <MockupBadge locale={locale} />

      {/* Header */}
      <header className="mb-5 pr-20">
        <SaaiHeader name="store agent" tone="light" className="mb-1.5" />
        <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-primary" aria-hidden="true" />
          {t.title}
        </h3>
        <p className="mt-1 text-xs leading-snug text-gray-500">{t.sub}</p>
      </header>

      {/* Flow rail: horizontal on desktop, vertical stack on mobile */}
      <ol className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-0">
        {/* Stage 1 — Inputs (active trigger changes per scenario) */}
        <FlowStage index={0} lit={isLit(0)} label={t.inputs}>
          <ul className="space-y-1">
            {t.inputItems.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 text-2xs leading-tight text-gray-600"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-gray-400" aria-hidden="true" />
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 rounded-md border border-primary/30 bg-primary/5 px-1.5 py-1">
            <span className="block text-4xs font-bold uppercase tracking-wide text-primary/70">
              {t.triggerLabel}
            </span>
            <motion.span
              key={`${scenarioStep}-trigger`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="block truncate text-3xs font-medium leading-tight text-gray-800"
            >
              {trigger}
            </motion.span>
          </div>
        </FlowStage>

        <Connector lit={isLit(1)} />

        {/* Stage 2 — Score (changes per scenario; derived from perfScore) */}
        <FlowStage index={1} lit={isLit(1)} label={t.score} note={t.scoreNote}>
          <div className="flex items-baseline gap-1">
            <motion.span
              key={`${activeScenario}-score`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold tabular-nums text-gray-900"
            >
              {sc.score}
            </motion.span>
            <span className="text-3xs text-gray-400">/ 100</span>
          </div>
        </FlowStage>

        <Connector lit={isLit(2)} />

        {/* Stage 3 — Class P1–P4 (highlighted class changes per scenario) */}
        <FlowStage index={2} lit={isLit(2)} label={t.klass} note={t.classNote}>
          <div className="flex gap-1" aria-hidden="true">
            {P_CLASSES.map((lvl) => (
              <span
                key={lvl}
                className={`flex h-6 flex-1 items-center justify-center rounded text-[9px] font-bold tabular-nums transition-colors ${
                  isLit(2) && lvl === sc.topClass
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {lvl}
              </span>
            ))}
          </div>
          <p className="mt-1.5 text-[9px] leading-tight text-gray-400">{t.classLegend}</p>
        </FlowStage>

        <Connector lit={isLit(3)} />

        {/* Stage 4 — Top 3 ranked action cards (re-ranked per scenario) */}
        <FlowStage index={3} lit={isLit(3)} label={t.top3} note={t.top3Note} grow>
          <ol className="space-y-1.5">
            {rankedCards.map((card, i) => (
              <motion.li
                key={card.theme}
                layout={reducedMotion ? false : true}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-2 rounded-md border px-2 py-1 ${
                  isLit(3) && i === 0
                    ? 'border-primary/40 bg-primary/5'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold tabular-nums ${
                    isLit(3) && i === 0
                      ? 'bg-primary text-white'
                      : 'bg-gray-300 text-white'
                  }`}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-2xs font-medium leading-tight text-gray-800">
                    {card.action}
                  </span>
                  <span className="block truncate text-[9px] leading-tight text-gray-400">
                    {i === 0 ? `${sc.topClass} · ` : ''}
                    {card.theme} · {card.note}
                  </span>
                </span>
              </motion.li>
            ))}
          </ol>
        </FlowStage>
      </ol>

      {/* Downstream: Human decision → Learning feedback (dotted loop back) */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
          <p className="text-2xs font-medium text-gray-800">{t.human}</p>
          <p className="text-3xs leading-tight text-gray-500">{t.humanNote}</p>
        </div>

        {/* Dotted learning-loop arrow back into the engine */}
        <svg
          className="hidden h-8 w-16 shrink-0 sm:block"
          viewBox="0 0 64 32"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M8 24 C 8 4, 56 4, 56 24"
            stroke="#376AE2"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            fill="none"
          />
          <path d="M8 24 l3 -4 M8 24 l5 -1" stroke="#376AE2" strokeWidth="1.5" />
        </svg>

        <div className="flex-1 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2">
          <p className="text-2xs font-medium text-primary">{t.learning}</p>
          <p className="text-3xs leading-tight text-gray-500">{t.learningNote}</p>
        </div>
      </div>

      {/* HQ-facing scale footnote (canonical numbers, not invented) */}
      <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 border-t border-gray-100 pt-3 text-3xs text-gray-400">
        <div className="flex items-center gap-1.5">
          <dt>{t.alertsLabel}</dt>
          <dd className="font-medium tabular-nums text-gray-600">
            {canonicalHq.dailyAlerts.toLocaleString('en-US')}
          </dd>
        </div>
        <div className="flex items-center gap-1.5">
          <dt>{t.responseLabel}</dt>
          <dd className="font-medium tabular-nums text-gray-600">{canonicalHq.responseRate}%</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <dt>{canonicalStoreName[locale]}</dt>
          <dd className="font-medium tabular-nums text-gray-600">
            {formatWon(canonicalStore.forecastRevenueWon)}
          </dd>
        </div>
      </dl>

      {/* Accessible diagram description for SR users */}
      <svg className="sr-only" role="img" aria-labelledby="pe-title pe-desc">
        <title id="pe-title">{t.title}</title>
        <desc id="pe-desc">
          {`${t.inputs} → ${t.score} → ${t.klass} → ${t.top3} → ${t.human} → ${t.learning}.`}
        </desc>
      </svg>
    </div>
  );
}

/** One stage box on the flow rail. Lit state swaps the grayscale border for the brand accent. */
function FlowStage({
  index,
  lit,
  label,
  note,
  grow,
  children,
}: {
  index: number;
  lit: boolean;
  label: string;
  note?: string;
  grow?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.li
      className={`relative rounded-xl border bg-white p-3 transition-colors ${
        lit ? 'border-primary' : 'border-gray-200'
      } ${grow ? 'sm:flex-[1.4]' : 'sm:flex-1'}`}
      initial={false}
      animate={{ opacity: lit ? 1 : 0.55 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-2xs font-bold uppercase tracking-wide text-gray-800">
          {label}
        </span>
        <span
          className={`text-[9px] font-bold tabular-nums ${lit ? 'text-primary' : 'text-gray-300'}`}
          aria-hidden="true"
        >
          {index + 1}
        </span>
      </div>
      {children}
      {note ? <p className="mt-1.5 text-[9px] leading-tight text-gray-400">{note}</p> : null}
    </motion.li>
  );
}

/** Arrow connector between stages: → on desktop, ↓ on mobile. */
function Connector({ lit }: { lit: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center self-center sm:px-1.5"
      aria-hidden="true"
    >
      <span className={`text-sm sm:hidden ${lit ? 'text-primary' : 'text-gray-300'}`}>↓</span>
      <span className={`hidden text-sm sm:inline ${lit ? 'text-primary' : 'text-gray-300'}`}>→</span>
    </div>
  );
}
