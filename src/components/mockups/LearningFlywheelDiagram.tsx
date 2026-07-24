'use client';

import { Sparkles, RefreshCw, ArrowRight } from 'lucide-react';
import { type Locale } from '@/lib/i18n';
import { type DeepPartial, mergeMockupContent } from './types';
import { MOCKUP_SCHEME } from '@/lib/mockup-tokens';
import { cn } from '@/lib/cn';

/*
 * 선순환(플라이휠) 다이어그램.
 *
 * v2 계약 배치 1d 메모:
 * - MockupViewport 예외: 제품 UI 재현이 아닌 순수 개념 다이어그램(헤딩+카드 그리드)
 *   이라 고정 캔버스 스케일 대상이 아니다.
 * - 다크 축은 로컬 slate 계열 대신 MOCKUP_SCHEME.dark("SAAI grey 역전 + blue 유지"
 *   파생 규칙)에서 가져온다. 스킴에 슬롯이 없는 자리(배지 bg, hover 보더)만
 *   같은 gray 축의 리터럴 클래스를 쓴다.
 * - framer-motion 미사용(정적 렌더 + CSS 애니메이션만).
 */

export interface FlywheelNode {
  n: string;
  title: string;
  desc: string;
}

export interface LearningFlywheelCopy {
  eyebrow: string;
  heading: string;
  lead: string;
  nodes: [FlywheelNode, FlywheelNode, FlywheelNode, FlywheelNode];
  centerLabel: { big: string; small: string };
}

export interface LearningFlywheelDiagramProps {
  active?: boolean;
  locale?: Locale;
  className?: string;
  content?: DeepPartial<LearningFlywheelCopy>;
}

const defaultCopy: Record<Locale, LearningFlywheelCopy> = {
  ko: {
    eyebrow: 'COMPOUNDING LOOP · 선순환 구조',
    heading: '한 매장에서 배운 건, 모든 매장이 씁니다',
    lead: '공간을 읽고(이해) → 판단을 다듬고(학습) → 매장이 나아지고(최적화) → 그 배움이 다른 공간으로 퍼집니다(전파). 공간이 늘수록 다음 이해는 더 정확해집니다.',
    nodes: [
      { n: '01', title: '공간을 읽습니다 (이해)', desc: '익명화 CCTV + MTMC로 동선·체류·밀도를 좌표계에 기록합니다.' },
      { n: '02', title: '판단을 다듬습니다 (학습)', desc: '권고 → 승인/반려 → 실행. 사람이 물리친 제안도 데이터가 됩니다.' },
      { n: '03', title: '매장이 나아집니다 (최적화)', desc: '레이아웃·인력·진열 판단이 실측 근거를 갖고 정밀해집니다.' },
      { n: '04', title: '다른 공간으로 퍼집니다 (전파)', desc: '단 1개 매장에서 검증된 성공 패턴이 전 매장으로 즉시 전파됩니다.' },
    ],
    centerLabel: { big: '지속 성장 루프', small: '공간이 늘수록 지능도 깊어집니다' },
  },
  en: {
    eyebrow: 'COMPOUNDING LOOP',
    heading: 'What one store learns, all stores use',
    lead: 'Read space (Understand) → Refine decisions (Learn) → Store improves (Optimize) → Spread to other spaces (Propagate). More stores mean deeper accuracy.',
    nodes: [
      { n: '01', title: 'Read the Space (Understand)', desc: 'Records traffic, dwell, and density on spatial coordinates via CCTV + MTMC.' },
      { n: '02', title: 'Refine Decisions (Learn)', desc: 'Recommendation → Approval/Rejection. Rejected advice also becomes learning data.' },
      { n: '03', title: 'Store Improves (Optimize)', desc: 'Layout, staffing, and display choices gain empirical precision.' },
      { n: '04', title: 'Spread to Fleet (Propagate)', desc: 'Proven patterns from a single store immediately propagate across all stores.' },
    ],
    centerLabel: { big: 'Compounding Loop', small: 'More stores, deeper intelligence' },
  },
  jp: {
    eyebrow: 'COMPOUNDING LOOP',
    heading: '一店舗での学びは、全店舗へ',
    lead: '空間の理解 → 判断の学習 → 店舗の最適化 → 他店舗への波及。店舗が増えるほど理解はより正確になります。',
    nodes: [
      { n: '01', title: '空間を読み取る (理解)', desc: 'CCTV + MTMCで動線・滞在・密度を座標系に記録します。' },
      { n: '02', title: '判断を学習する (学習)', desc: '推奨 → 承認/脚下 → 実行。人が見送った提案も学びになります。' },
      { n: '03', title: '店舗を最適化する (最適化)', desc: 'レイアウト・人員・陳列判断がデータ根拠を持ち正確になります。' },
      { n: '04', title: '他店舗へ波及させる (波及)', desc: '一店舗の検証済みパターンが全店舗へ即座に伝播します。' },
    ],
    centerLabel: { big: '継続成長ループ', small: '店舗が増えるほど知能も深まります' },
  },
};

export default function LearningFlywheelDiagram({
  locale = 'ko',
  className,
  content,
}: LearningFlywheelDiagramProps) {
  const merged = mergeMockupContent(defaultCopy[locale], content);

  return (
    <div className={cn('rounded-3xl border', MOCKUP_SCHEME.dark.border, MOCKUP_SCHEME.dark.bodyBg, 'p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden', className)}>
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-bold uppercase tracking-wider text-primary-light mb-3">
          <Sparkles className="w-3.5 h-3.5 text-primary-light" />
          {merged.eyebrow}
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3 break-keep">
          {merged.heading}
        </h3>
        <p className={cn('text-sm sm:text-base leading-relaxed break-keep', MOCKUP_SCHEME.dark.textSecondary)}>
          {merged.lead}
        </p>
      </div>

      {/* Flywheel Nodes Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {merged.nodes.map((node, i) => {
          const isPropagate = i === 3;
          return (
            <div
              key={node.n}
              className={cn(
                'rounded-2xl p-6 border transition-colors relative flex flex-col justify-between',
                isPropagate
                  ? 'bg-primary/15 border-primary/60 shadow-lg shadow-primary/10'
                  : cn(MOCKUP_SCHEME.dark.cardBg, MOCKUP_SCHEME.dark.border, 'hover:border-gray-700')
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={cn('font-mono text-xs font-extrabold px-2 py-0.5 rounded', isPropagate ? 'bg-primary text-white' : cn('bg-gray-800', MOCKUP_SCHEME.dark.textSecondary))}>
                    {node.n}
                  </span>
                  {isPropagate && (
                    <span className="text-2xs font-bold uppercase tracking-widest text-primary-light bg-primary/20 px-2 py-0.5 rounded-full">
                      Core Multiplier
                    </span>
                  )}
                </div>
                <h4 className="text-base font-bold text-white mb-2 break-keep">{node.title}</h4>
                <p className={cn('text-xs sm:text-sm leading-relaxed break-keep', MOCKUP_SCHEME.dark.textSecondary)}>{node.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Loop Footer Indicator */}
      <div className={cn('relative z-10 mt-8 pt-6 border-t', MOCKUP_SCHEME.dark.border, 'flex flex-col sm:flex-row items-center justify-between gap-4 text-xs')}>
        <div className="flex items-center gap-2 text-primary-light font-bold">
          <RefreshCw className="w-4 h-4 text-primary animate-spin-slow" />
          <span>{merged.centerLabel.big}</span>
        </div>
        <p className={cn(MOCKUP_SCHEME.dark.textSecondary, 'text-2xs sm:text-xs')}>{merged.centerLabel.small}</p>
      </div>
    </div>
  );
}
