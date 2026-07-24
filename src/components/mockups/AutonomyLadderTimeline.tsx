'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import MockupBadge from './MockupBadge';
import SaaiHeader from './SaaiHeader';
import type { Locale } from '@/lib/i18n';
import { type DeepPartial, mergeMockupContent } from './types';
import { SAAI_COLORS } from '@/lib/mockup-tokens';

/*
 * 자율 주행 매장 사다리(L0→L5) 타임라인.
 *
 * v2 계약 배치 1d 메모:
 * - MockupViewport 예외: 제품 UI 재현이 아닌 순수 개념 다이어그램(인터랙티브
 *   타임라인)이라 고정 캔버스 스케일 대상이 아니다.
 * - raw hex 리터럴(#376AE2 등)은 SAAI_COLORS 참조로 토큰화(아래 nodeStyle 참고).
 */

interface Props {
  active?: boolean;
  locale?: Locale;
  className?: string;
  /** 문구 오버라이드 — 부분 병합(mergeMockupContent). 기본: COPY[locale].
   *  `steps`는 인덱스/길이에 훅이 묶여있지 않아(고정 개수 훅 호출 없음) 길이를 바꿔도
   *  안전하다 — 다만 nodeStyle의 그라데이션(회색→브랜드블루)은 total 길이에 비례해
   *  보간되므로, 단계 수를 바꾸면 그라데이션 분포도 함께 달라진다. */
  content?: DeepPartial<AutonomyLadderCopy>;
}

type Step = {
  level: string;
  label: string;
  line: string;
  category: string; // 대표 카테고리
  condition: string; // 진화 조건
};

export interface AutonomyLadderCopy {
  eyebrow: string;
  heading: string;
  lead: string;
  categoryLabel: string;
  conditionLabel: string;
  footnoteLabel: string;
  footnote: string;
  steps: Step[];
}

const COPY: Record<Locale, AutonomyLadderCopy> = {
  ko: {
    eyebrow: '자율 주행 매장 (Autonomous Store)',
    heading: 'L0에서 L5까지 — 한 칸씩 올라갑니다',
    lead:
      "처음부터 자동이 아닙니다. 카테고리별로 권고 → 승인 → 자동 → 검증 → 학습의 사다리를 한 칸씩 올라갑니다. 그러나 '결정과 책임'은 끝까지 사람의 자리입니다.",
    categoryLabel: '대표 카테고리',
    conditionLabel: '다음 단계로 가는 조건',
    footnoteLabel: '다음 단계로 올라가는 조건',
    footnote:
      '다음 단계로 올라가는 조건 — 점주 누적 승인률 80%↑, 결과 검증 데이터 30회↑, 본사·점주의 명시적 합의. 충돌 시 즉시 한 칸 롤백.',
    steps: [
      {
        level: 'L0',
        label: '관찰만',
        line: '사람이 모든 결정 (레거시 대시보드)',
        category: '레거시 대시보드 모니터링',
        condition: '점주 누적 승인률 80%↑일 때 다음 칸으로.',
      },
      {
        level: 'L1',
        label: '정보 안내',
        line: '맥락 알림 (날씨·시즌·이벤트)',
        category: '맥락 알림 (날씨·시즌·이벤트)',
        condition: '점주 누적 승인률 80%↑일 때 다음 칸으로.',
      },
      {
        level: 'L2',
        label: '우선순위 권고',
        line: '1~3순위 + 이유 (순회 동선·진열 정리)',
        category: '순회 동선·진열 정리 우선순위',
        condition: '결과 검증 데이터 30회↑일 때 다음 칸으로.',
      },
      {
        level: 'L3',
        label: '[승인] 액션',
        line: '구체 액션 + 시뮬레이션 (발주 조정·근무표)',
        category: '발주 조정·근무표 (승인 후 실행)',
        condition: '결과 검증 데이터 30회↑일 때 다음 칸으로.',
      },
      {
        level: 'L4',
        label: '저위험 자동 + 사후',
        line: '반복·저위험 자동화 (알림 임계값·반복 발주)',
        category: '알림 임계값·반복 발주 (자동 + 사후 보고)',
        condition: '본사·점주의 명시적 합의가 있을 때 다음 칸으로.',
      },
      {
        level: 'L5',
        label: '자율 주행 매장',
        line: '사람은 전략·책임·환대만',
        category: '전략·책임·환대 (사람의 영역)',
        condition: '충돌 시 즉시 한 칸 롤백 — 안전장치는 끝까지 유지됩니다.',
      },
    ],
  },
  en: {
    eyebrow: 'Autonomous Store',
    heading: 'From L0 to L5 — one rung at a time',
    lead:
      "It is not automatic from day one. Per category, you climb the ladder of recommend → approve → automate → verify → learn one rung at a time. But 'decision and accountability' stay with people to the end.",
    categoryLabel: 'Representative category',
    conditionLabel: 'Condition to advance to the next rung',
    footnoteLabel: 'Condition to climb to the next rung',
    footnote:
      'Condition to climb — owner cumulative approval rate ≥ 80%, ≥ 30 verified outcomes, explicit HQ–owner agreement. On conflict, roll back one rung immediately.',
    steps: [
      {
        level: 'L0',
        label: 'Observe only',
        line: 'People make every decision (legacy dashboard)',
        category: 'Legacy dashboard monitoring',
        condition: 'Advance once owner cumulative approval rate ≥ 80%.',
      },
      {
        level: 'L1',
        label: 'Inform',
        line: 'Context alerts (weather · season · events)',
        category: 'Context alerts (weather · season · events)',
        condition: 'Advance once owner cumulative approval rate ≥ 80%.',
      },
      {
        level: 'L2',
        label: 'Recommend priority',
        line: 'Top 1–3 + reasons (patrol route · display tidy-up)',
        category: 'Patrol route · display tidy-up priority',
        condition: 'Advance once ≥ 30 verified outcomes are recorded.',
      },
      {
        level: 'L3',
        label: '[Approve] action',
        line: 'Concrete action + simulation (order tuning · rosters)',
        category: 'Order tuning · rosters (run after approval)',
        condition: 'Advance once ≥ 30 verified outcomes are recorded.',
      },
      {
        level: 'L4',
        label: 'Low-risk auto + review',
        line: 'Repetitive, low-risk automation (alert thresholds · recurring orders)',
        category: 'Alert thresholds · recurring orders (auto + post-review)',
        condition: 'Advance with explicit HQ–owner agreement.',
      },
      {
        level: 'L5',
        label: 'Autonomous store',
        line: 'People handle only strategy, accountability, hospitality',
        category: 'Strategy · accountability · hospitality (the human domain)',
        condition: 'On conflict, roll back one rung immediately — the safeguard always holds.',
      },
    ],
  },
  jp: {
    eyebrow: '自律走行店舗 (Autonomous Store)',
    heading: 'L0からL5まで — 一段ずつ上がります',
    lead:
      '最初から自動ではありません。カテゴリーごとに推奨 → 承認 → 自動 → 検証 → 学習のはしごを一段ずつ上がります。しかし「決定と責任」は最後まで人の場所です。',
    categoryLabel: '代表カテゴリー',
    conditionLabel: '次の段階へ進む条件',
    footnoteLabel: '次の段階へ上がる条件',
    footnote:
      '次の段階へ上がる条件 — 店主の累積承認率80%以上、結果検証データ30回以上、本部・店主の明示的な合意。衝突時は直ちに一段ロールバックします。',
    steps: [
      {
        level: 'L0',
        label: '観察のみ',
        line: '人がすべての決定 (レガシーダッシュボード)',
        category: 'レガシーダッシュボードの監視',
        condition: '店主の累積承認率80%以上で次の段階へ。',
      },
      {
        level: 'L1',
        label: '情報案内',
        line: '文脈アラート (天気・シーズン・イベント)',
        category: '文脈アラート (天気・シーズン・イベント)',
        condition: '店主の累積承認率80%以上で次の段階へ。',
      },
      {
        level: 'L2',
        label: '優先順位の推奨',
        line: '1〜3位 + 理由 (巡回動線・陳列整理)',
        category: '巡回動線・陳列整理の優先順位',
        condition: '結果検証データ30回以上で次の段階へ。',
      },
      {
        level: 'L3',
        label: '[承認] アクション',
        line: '具体アクション + シミュレーション (発注調整・勤務表)',
        category: '発注調整・勤務表 (承認後に実行)',
        condition: '結果検証データ30回以上で次の段階へ。',
      },
      {
        level: 'L4',
        label: '低リスク自動 + 事後',
        line: '反復・低リスクの自動化 (アラート閾値・反復発注)',
        category: 'アラート閾値・反復発注 (自動 + 事後報告)',
        condition: '本部・店主の明示的な合意で次の段階へ。',
      },
      {
        level: 'L5',
        label: '自律走行店舗',
        line: '人は戦略・責任・おもてなしのみ',
        category: '戦略・責任・おもてなし (人の領域)',
        condition: '衝突時は直ちに一段ロールバック — 安全装置は最後まで維持されます。',
      },
    ],
  },
};

/**
 * Grayscale → brand-blue progression. LOW levels (L0~L2) render as light GRAY
 * with DARK text; HIGH levels (L3~L5) transition to solid brand-blue
 * (SAAI blue-500) with WHITE text. The background lerps from a neutral gray to
 * the brand blue, so every label stays readable (C4 fix).
 *
 * v2 계약(배치 1d): lerp 입력을 SAAI_COLORS 참조로 토큰화. blue-500(#376AE2)은
 * 기존 리터럴과 동일 값(시각 무변화). 회색 끝점·다크 텍스트는 tailwind
 * gray-200(#E5E7EB)/gray-800(#1F2937) 리터럴을 SAAI grey-100(#D9DBDD)/
 * grey-800(#2F343B) 근접값으로 정렬(미세 시각차 — 규칙 통일 목적).
 */
function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

const LADDER_GRAY_RGB = hexToRgb(SAAI_COLORS['grey-100']);
const LADDER_BLUE_RGB = hexToRgb(SAAI_COLORS['blue-500']);

function nodeStyle(index: number, total: number, selected: boolean) {
  const t = index / (total - 1); // 0 → 1
  // SAAI grey-100 → SAAI blue-500.
  const r = lerp(LADDER_GRAY_RGB[0], LADDER_BLUE_RGB[0], t);
  const g = lerp(LADDER_GRAY_RGB[1], LADDER_BLUE_RGB[1], t);
  const b = lerp(LADDER_GRAY_RGB[2], LADDER_BLUE_RGB[2], t);
  // Dark text on the light (gray) end, white text on the dark (blue) end.
  const dark = t < 0.5;
  return {
    backgroundColor: `rgb(${r}, ${g}, ${b})`,
    color: dark ? SAAI_COLORS['grey-800'] : 'white',
    borderColor: selected ? SAAI_COLORS['blue-500'] : 'transparent',
  };
}

export default function AutonomyLadderTimeline({
  active = true,
  locale = 'en',
  className,
  content,
}: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const t = mergeMockupContent(COPY[locale] ?? COPY.en, content);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  // No default selection: avoids reading as a "current position" marker (B7).
  const [selected, setSelected] = useState<number | null>(null);
  const animate = isVisible && active && !reducedMotion;

  const total = t.steps.length;
  const detail = selected !== null ? t.steps[selected] : null;

  return (
    <div
      ref={ref}
      className={`relative rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-card ${className ?? ''}`}
    >
      <MockupBadge locale={locale} />

      {/* Header */}
      <header className="mb-6 max-w-3xl">
        <SaaiHeader name="store agent" tone="light" className="mb-1.5" />
        <p className="text-xs font-bold uppercase tracking-wider text-primary">{t.eyebrow}</p>
        <h2 className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl">{t.heading}</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{t.lead}</p>
      </header>

      {/* Timeline — horizontal on md+, vertical stack on mobile.
          Connectors persist in BOTH layouts. No "you are here" marker. */}
      <ol className="relative flex flex-col gap-0 md:flex-row md:gap-0">
        {t.steps.map((step, i) => {
          const isSelected = i === selected;
          const isLast = i === total - 1;
          return (
            <li
              key={step.level}
              className="relative flex flex-1 flex-row items-start gap-3 pb-6 last:pb-0 md:flex-col md:items-center md:gap-0 md:pb-0"
            >
              {/* Connector line/arrow — vertical (mobile) */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute left-[15px] top-8 h-full w-px bg-gray-200 md:hidden"
                />
              )}
              {/* Connector line/arrow — horizontal (desktop) */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-4 hidden h-px w-full translate-x-1/2 bg-gray-200 md:block"
                />
              )}

              {/* Node — L5 (isLast) gets a TERMINUS treatment: larger circle,
                  a filled brand ring (ring + offset) and a flag marker so it
                  reads as the destination, distinct from L0–L4. */}
              <motion.button
                type="button"
                onClick={() => setSelected(i)}
                aria-pressed={isSelected}
                aria-label={`${step.level} ${step.label}`}
                initial={animate ? { opacity: 0, scale: 0.6 } : false}
                animate={animate ? { opacity: 1, scale: 1 } : undefined}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                style={nodeStyle(i, total, isSelected)}
                className={`relative z-10 flex shrink-0 items-center justify-center rounded-full border-2 font-bold shadow-none transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isLast
                    ? 'h-11 w-11 text-[13px] ring-2 ring-primary ring-offset-2 ring-offset-white'
                    : 'h-8 w-8 text-2xs'
                } ${isSelected ? 'scale-110' : 'hover:scale-105'}`}
              >
                {step.level}
                {isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white shadow-card"
                  >
                    <svg
                      width="9"
                      height="9"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </motion.button>

              {/* Label + one-liner */}
              <div className="min-w-0 flex-1 md:mt-3 md:px-2 md:text-center">
                <p
                  className={`text-sm font-bold ${
                    isSelected ? 'text-primary' : 'text-gray-800'
                  }`}
                >
                  {step.label}
                </p>
                <p className="mt-0.5 text-xs leading-snug text-gray-500">{step.line}</p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Detail card — shown only when a node is clicked (no default selection, B7) */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          {detail && (
            <motion.div
              key={selected}
              initial={animate ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={animate ? { opacity: 0, y: -8 } : undefined}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-primary/30 bg-primary/5 p-4"
            >
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-white">
                  {detail.level}
                </span>
                <span className="text-sm font-bold text-gray-900">{detail.label}</span>
              </div>
              <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-2xs font-medium uppercase tracking-wide text-primary">
                    {t.categoryLabel}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-700">{detail.category}</dd>
                </div>
                <div>
                  <dt className="text-2xs font-medium uppercase tracking-wide text-primary">
                    {t.conditionLabel}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-700">{detail.condition}</dd>
                </div>
              </dl>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footnote box — visually distinct (smaller, muted, left rule) */}
      <p className="mt-5 border-l-2 border-gray-300 bg-gray-50 px-4 py-3 text-xs leading-relaxed text-gray-500">
        {t.footnote}
      </p>
    </div>
  );
}
