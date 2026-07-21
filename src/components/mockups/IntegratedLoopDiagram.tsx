'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useMockupLoop } from '@/hooks/useMockupLoop';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import MockupBadge from './MockupBadge';
import SaaiHeader from './SaaiHeader';
import { canonicalStore, canonicalStoreName, canonicalHq, formatWon } from '@/data/mockup-scenarios/canonical';
import { localeHref, type Locale } from '@/lib/i18n';

interface Props {
  active?: boolean;
  locale?: Locale;
  className?: string;
}

type NodeCopy = { label: string; tip: string };
type CardCopy = { no: string; title: string; body: string };

type Copy = {
  eyebrow: string;
  heading: string;
  lead: string;
  nodes: {
    cctv: NodeCopy;
    pos: NodeCopy;
    ext: NodeCopy;
    count: NodeCopy;
    seal: NodeCopy;
    hub: NodeCopy;
    insight: NodeCopy;
    care: NodeCopy;
    agent: NodeCopy;
    human: NodeCopy;
  };
  feedback: string;
  cards: [CardCopy, CardCopy, CardCopy];
  cta: string;
  svgTitle: string;
  svgDesc: string;
  scrollLabel: string;
};

const COPY: Record<Locale, Copy> = {
  ko: {
    eyebrow: '셋이 함께 서면',
    heading: '세 시간 축이 하나의 운영 루프로 닫힙니다',
    lead: '매장 안팎의 신호 — 매출·영상에 더해 밖의 유입(store count)까지 — 이 익명 허브에 모입니다. 그 위에서 Insight가 어제를 정리하고, Care가 지금을 알리고, Agent가 다음을 짚습니다. 운영자의 행동 결과가 되먹임이 되어 셋을 다 더 똑똑하게 만듭니다.',
    nodes: {
      cctv: { label: 'CCTV', tip: '매장 영상 신호 — 입력 시점에 익명화됩니다.' },
      pos: { label: 'POS', tip: '거래·매출 신호 — 개인 식별 없이 집계됩니다.' },
      ext: { label: '외부 컨텍스트', tip: '날씨·상권·이벤트 등 외부 맥락 신호.' },
      count: { label: '유입 관측', tip: 'store count가 매장 앞 유입을 익명으로 관측·집계하는 입력 신호.' },
      seal: { label: 'SEAL + Anonymizer', tip: '입력 시점 익명화 — 원본은 저장하지 않습니다.' },
      hub: { label: '익명화 이벤트 허브', tip: '세 제품이 공유하는 단일 익명 이벤트 스트림.' },
      insight: { label: 'Insight', tip: '어제 · 왜 — 지난 패턴을 정리해 원인을 설명합니다.' },
      care: { label: 'Care', tip: '지금 — 실시간 상황을 운영자에게 알립니다.' },
      agent: { label: 'Agent', tip: '다음 — 다음 행동을 제안합니다.' },
      human: { label: '사람의 결정 · 행동', tip: '결정과 책임은 끝까지 사람의 자리.' },
    },
    feedback: '행동 결과가 허브로 되먹임됩니다',
    cards: [
      {
        no: '01',
        title: '공통 신호 국제어',
        body: '세 제품이 같은 어휘를 씁니다 — Pattern · Detection · Priority · Response · Context · Outcome 6 카테고리. 변환 없이 신호가 오갑니다.',
      },
      {
        no: '02',
        title: '충돌하면 누가 이기는가',
        body: '경계선 윤리 우선순위 — 익명화 > 안전 > 점주 자율 > 실시간 > 누적 거절 > 알림 피로. 충돌 결과가 예측 가능합니다.',
      },
      {
        no: '03',
        title: '자율도 사다리',
        body: 'L1 정보 안내 → L2 권고 → L3 [승인] → L4 자동+사후 → L5 자율 주행. 카테고리별로 한 칸씩 — 결정과 책임은 끝까지 사람의 자리.',
      },
    ],
    cta: '세 제품의 통합 가이드 →',
    svgTitle: '세 제품 통합 신호 흐름 다이어그램',
    svgDesc:
      '입력(CCTV·POS·외부 컨텍스트·유입 관측 store count)이 SEAL과 Anonymizer를 거쳐 익명화 이벤트 허브로 모이고, Insight·Care·Agent 세 갈래로 흐른 뒤 사람의 결정과 행동으로 이어지며, 그 결과가 다시 허브로 되먹임되는 운영 루프.',
    scrollLabel: '통합 신호 흐름 다이어그램 — 좌우로 스크롤할 수 있습니다',
  },
  en: {
    eyebrow: 'When the three stand together',
    heading: 'Three time horizons close into one operating loop',
    lead: 'Signals from inside and outside the store — sales, video, and footfall at the door (store count) — gather in one anonymized hub. On top of it, Insight makes sense of yesterday, Care tells you what is happening now, and Agent points to what comes next. The operator’s actions feed back and make all three sharper.',
    nodes: {
      cctv: { label: 'CCTV', tip: 'In-store video signal — anonymized at the point of capture.' },
      pos: { label: 'POS', tip: 'Transaction signal — aggregated without identifying anyone.' },
      ext: { label: 'External context', tip: 'Weather, foot traffic, local events and other context.' },
      count: { label: 'Footfall sensing', tip: 'store count anonymously observes and counts footfall in front of the store.' },
      seal: { label: 'SEAL + Anonymizer', tip: 'Anonymized on capture — no raw footage is stored.' },
      hub: { label: 'Anonymized event hub', tip: 'One anonymized event stream shared by all three products.' },
      insight: { label: 'Insight', tip: 'Yesterday · why — explains the cause behind past patterns.' },
      care: { label: 'Care', tip: 'Now — alerts the operator to live situations.' },
      agent: { label: 'Agent', tip: 'Next — proposes the next action to take.' },
      human: { label: 'Human decision & action', tip: 'The decision and the accountability stay with people.' },
    },
    feedback: 'Outcomes feed back into the hub',
    cards: [
      {
        no: '01',
        title: 'A shared signal language',
        body: 'All three products use the same vocabulary — six categories: Pattern · Detection · Priority · Response · Context · Outcome. Signals pass without translation.',
      },
      {
        no: '02',
        title: 'When they conflict, who wins?',
        body: 'Boundary-ethics priority — Anonymization > Safety > Owner autonomy > Real-time > Repeated declines > Alert fatigue. Conflicts resolve predictably.',
      },
      {
        no: '03',
        title: 'A ladder of autonomy',
        body: 'L1 inform → L2 recommend → L3 [approve] → L4 auto + review → L5 autonomous. One rung at a time, per category — decisions and accountability stay with people.',
      },
    ],
    cta: 'The integrated guide to all three →',
    svgTitle: 'Integrated signal-flow diagram across the three products',
    svgDesc:
      'Inputs (CCTV, POS, external context, and footfall sensing by store count) pass through SEAL and the Anonymizer into an anonymized event hub, branch into Insight, Care and Agent, lead to human decision and action, and feed the outcome back into the hub.',
    scrollLabel: 'Integrated signal-flow diagram — scroll horizontally to explore',
  },
  jp: {
    eyebrow: '三つが揃うと',
    heading: '三つの時間軸が一つの運用ループへと閉じます',
    lead: '店舗の内外の信号 — 売上・映像に加えて店頭の流入(store count)まで — が一つの匿名ハブに集まります。その上で Insight が昨日を整理し、Care が今を知らせ、Agent が次を示します。運用者の行動の結果がフィードバックとなり、三つすべてをより賢くします。',
    nodes: {
      cctv: { label: 'CCTV', tip: '店舗映像信号 — 取得時点で匿名化されます。' },
      pos: { label: 'POS', tip: '取引・売上信号 — 個人を特定せず集計します。' },
      ext: { label: '外部コンテキスト', tip: '天候・商圏・イベントなどの外部の文脈信号です。' },
      count: { label: '流入観測', tip: 'store countが店頭の流入を匿名で観測・集計する入力信号です。' },
      seal: { label: 'SEAL + Anonymizer', tip: '取得時点で匿名化 — 原本は保存しません。' },
      hub: { label: '匿名化イベントハブ', tip: '三製品が共有する単一の匿名イベントストリームです。' },
      insight: { label: 'Insight', tip: '昨日・なぜ — 過去のパターンを整理し原因を説明します。' },
      care: { label: 'Care', tip: '今 — リアルタイムの状況を運用者に知らせます。' },
      agent: { label: 'Agent', tip: '次 — 次の行動を提案します。' },
      human: { label: '人の判断・行動', tip: '判断と責任は最後まで人の領域です。' },
    },
    feedback: '行動の結果がハブへフィードバックされます',
    cards: [
      {
        no: '01',
        title: '共通信号の国際語',
        body: '三製品が同じ語彙を使います — Pattern・Detection・Priority・Response・Context・Outcome の6カテゴリ。変換なしで信号が行き交います。',
      },
      {
        no: '02',
        title: '衝突したら、誰が勝つか',
        body: '境界線倫理の優先順位 — 匿名化 > 安全 > 店主の自律 > リアルタイム > 累積拒否 > 通知疲労。衝突の結果が予測可能です。',
      },
      {
        no: '03',
        title: '自律度のはしご',
        body: 'L1 情報提供 → L2 推奨 → L3 [承認] → L4 自動+事後 → L5 自律走行。カテゴリごとに一段ずつ — 判断と責任は最後まで人の領域です。',
      },
    ],
    cta: '3製品の統合ガイド →',
    svgTitle: '三製品を統合した信号フロー図',
    svgDesc:
      '入力（CCTV・POS・外部コンテキスト・流入観測 store count）が SEAL と Anonymizer を経て匿名化イベントハブに集まり、Insight・Care・Agent の三方向へ流れ、人の判断・行動へとつながり、その結果が再びハブへフィードバックされる運用ループです。',
    scrollLabel: '統合信号フロー図 — 左右にスクロールできます',
  },
};

// ── Single-SVG diagram layout (one coordinate space so every arrow connects box
// edges and the feedback loop truly closes Human → Hub). viewBox 0 0 1000 380. ──
const COL = { in: 6, seal: 211, hub: 416, br: 639, human: 844 };
const NW = 150; // standard node width
const HUB_W = 168;
const ROW = [80, 150, 220] as const; // triple-stack y-centers (branches: insight·care·agent)
const IN_ROW = [45, 115, 185, 255] as const; // 4-stack inputs (CCTV·POS·외부·유입관측), MID 중심 대칭
const MID = 150;

type Tone = 'plain' | 'accent' | 'hub';

/** A node box in the SVG flow diagram. Highlights while its stage is active. */
function SvgNode({
  x,
  cy,
  w = NW,
  h = 48,
  label,
  tip,
  tone = 'plain',
  active = false,
}: {
  x: number;
  cy: number;
  w?: number;
  h?: number;
  label: string;
  tip: string;
  tone?: Tone;
  active?: boolean;
}) {
  const y = cy - h / 2;
  const fill = tone === 'hub' ? 'fill-[#e1eafd]' : tone === 'accent' ? 'fill-[#eef3fe]' : 'fill-white';
  const stroke = active ? 'stroke-primary' : tone === 'plain' ? 'stroke-gray-300' : 'stroke-primary';
  const strokeWidth = active ? (tone === 'hub' ? 3 : 2.5) : tone === 'hub' ? 2 : 1.5;
  const textCls = tone === 'plain' && !active ? 'fill-gray-700' : 'fill-primary';
  return (
    <g>
      <title>{tip}</title>
      <rect x={x} y={y} width={w} height={h} rx={10} className={`${fill} ${stroke}`} strokeWidth={strokeWidth} />
      <text
        x={x + w / 2}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        className={`${textCls} ${tone === 'hub' ? 'font-bold' : 'font-medium'}`}
        fontSize={tone === 'hub' ? 15 : 14}
      >
        {label}
      </text>
    </g>
  );
}

export default function IntegratedLoopDiagram({
  active = true,
  locale = 'en',
  className = '',
}: Props) {
  const t = COPY[locale] ?? COPY.en;
  const reducedMotion = usePrefersReducedMotion();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  // Pulse travels 5 stages: inputs → seal → hub → branches → human.
  const STAGES = 5;
  const animate = isVisible && active && !reducedMotion;
  const { step, hoverProps } = useMockupLoop({
    steps: STAGES,
    interval: 900,
    active: isVisible && active,
    pauseOnHover: true,
  });
  const activeStage = animate ? step : -1;
  // The feedback loop highlights as the pulse leaves the Human node (final stage).
  const loopActive = activeStage === 4;

  const [hoverCard, setHoverCard] = useState<number | null>(null);

  return (
    <div ref={ref} className={`relative w-full ${className}`} {...hoverProps}>
      <MockupBadge locale={locale} />

      {/* Header */}
      <div className="mb-6 max-w-3xl">
        <SaaiHeader name="saai" tone="light" className="mb-1.5" />
        <p className="text-xs font-medium uppercase tracking-wide text-primary">{t.eyebrow}</p>
        <h2 className="mt-1.5 text-lg font-bold text-gray-900 sm:text-xl">{t.heading}</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{t.lead}</p>
      </div>

      {/* Diagram — a single SVG so every arrow connects box edges and the feedback
          loop closes Human → Hub. Scrolls horizontally on small screens. */}
      <div
        tabIndex={0}
        role="group"
        aria-label={t.scrollLabel}
        className="overflow-x-auto rounded-2xl border border-gray-200 bg-gray-50/60 p-4 sm:p-6"
      >
        <svg
          viewBox="0 0 1000 380"
          role="img"
          aria-labelledby="ild-title ild-desc"
          className="w-full min-w-[680px]"
        >
          <title id="ild-title">{t.svgTitle}</title>
          <desc id="ild-desc">{t.svgDesc}</desc>
          <defs>
            <marker
              id="ild-ah"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6.5"
              markerHeight="6.5"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" className="fill-gray-400" />
            </marker>
          </defs>

          {/* flow connectors (behind nodes) */}
          <g className="stroke-gray-400" fill="none" strokeWidth={1.6} markerEnd="url(#ild-ah)">
            <path d="M 156 45 C 185 45, 195 132, 211 132" />
            <path d="M 156 115 C 185 115, 200 145, 211 145" />
            <path d="M 156 185 C 185 185, 200 156, 211 156" />
            <path d="M 156 255 C 185 255, 195 168, 211 168" />
            <path d="M 361 150 L 416 150" />
            <path d="M 584 150 C 605 150, 615 80, 639 80" />
            <path d="M 584 150 L 639 150" />
            <path d="M 584 150 C 605 150, 615 220, 639 220" />
            <path d="M 789 80 C 818 80, 828 138, 844 138" />
            <path d="M 789 150 L 844 150" />
            <path d="M 789 220 C 818 220, 828 162, 844 162" />
          </g>

          {/* branches share signals (subtle vertical links) */}
          <g className="stroke-gray-300" strokeWidth={1.2} strokeDasharray="2 3">
            <path d="M 714 104 L 714 126" />
            <path d="M 714 174 L 714 196" />
          </g>

          {/* feedback loop: Human bottom → down → left → up into Hub bottom */}
          <path
            id="ild-fb"
            d="M 919 176 L 919 300 Q 919 320 899 320 L 520 320 Q 500 320 500 300 L 500 188"
            fill="none"
            strokeWidth={2}
            strokeDasharray="6 5"
            strokeLinecap="round"
            className={loopActive ? 'stroke-primary' : 'stroke-gray-400'}
          />
          <path
            d="M 491 200 L 500 186 L 509 200"
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={loopActive ? 'stroke-primary' : 'stroke-gray-400'}
          />
          {animate && (
            <circle r={5} className="fill-primary">
              <animateMotion dur="1.8s" repeatCount="indefinite">
                <mpath href="#ild-fb" />
              </animateMotion>
            </circle>
          )}
          <text x={710} y={346} textAnchor="middle" className="fill-gray-500 font-medium" fontSize={13}>
            {t.feedback}
          </text>

          {/* nodes (on top of connectors) */}
          <SvgNode x={COL.in} cy={IN_ROW[0]} label={t.nodes.cctv.label} tip={t.nodes.cctv.tip} active={activeStage === 0} />
          <SvgNode x={COL.in} cy={IN_ROW[1]} label={t.nodes.pos.label} tip={t.nodes.pos.tip} active={activeStage === 0} />
          <SvgNode x={COL.in} cy={IN_ROW[2]} label={t.nodes.ext.label} tip={t.nodes.ext.tip} active={activeStage === 0} />
          <SvgNode x={COL.in} cy={IN_ROW[3]} label={t.nodes.count.label} tip={t.nodes.count.tip} active={activeStage === 0} />
          <SvgNode x={COL.seal} cy={MID} h={52} label={t.nodes.seal.label} tip={t.nodes.seal.tip} tone="accent" active={activeStage === 1} />
          <SvgNode x={COL.hub} cy={MID} w={HUB_W} h={68} label={t.nodes.hub.label} tip={t.nodes.hub.tip} tone="hub" active={activeStage === 2} />
          <SvgNode x={COL.br} cy={ROW[0]} label={t.nodes.insight.label} tip={t.nodes.insight.tip} active={activeStage === 3} />
          <SvgNode x={COL.br} cy={ROW[1]} label={t.nodes.care.label} tip={t.nodes.care.tip} active={activeStage === 3} />
          <SvgNode x={COL.br} cy={ROW[2]} label={t.nodes.agent.label} tip={t.nodes.agent.tip} active={activeStage === 3} />
          <SvgNode x={COL.human} cy={MID} h={52} label={t.nodes.human.label} tip={t.nodes.human.tip} tone="accent" active={activeStage === 4} />
        </svg>
      </div>

      {/* Three principle cards */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {t.cards.map((card, i) => (
          <motion.div
            key={card.no}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={isVisible && !reducedMotion ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            onMouseEnter={() => setHoverCard(i)}
            onMouseLeave={() => setHoverCard(null)}
            className={`rounded-xl border bg-white p-4 transition-colors duration-200 ${
              hoverCard === i ? 'border-primary' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tabular-nums text-primary">{card.no}</span>
              <h3 className="text-sm font-medium text-gray-900">{card.title}</h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-gray-600">{card.body}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA — integrated guide to all three products */}
      <div className="mt-5">
        <a
          href={localeHref(locale, '/products')}
          className="inline-flex items-center text-sm font-medium text-primary underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {t.cta}
        </a>
      </div>

      {/* Canonical figures footnote — single source of truth (never hardcoded) */}
      <p className="mt-4 text-2xs text-gray-400">
        {canonicalStoreName[locale]} · {formatWon(canonicalStore.forecastRevenueWon)} ·{' '}
        {canonicalHq.totalStores}
        {locale === 'ko' ? '개 가맹점' : locale === 'jp' ? '店舗' : ' stores'}
      </p>
    </div>
  );
}
