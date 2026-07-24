'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Grid3x3, Radar, ClipboardCheck, ArrowRight, RotateCw, Check } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';

/**
 * OperatingLoopDemo — the /products protagonist (SAAI_페이지_데모시각_설계 v1 §2).
 *
 * Interactive demo showcasing the 3 core operational loop stages:
 *   ANALYZE(insight·어제) → DETECT(care·지금) → ACT(agent·다음).
 * Numbers are illustrative examples (labeled 예시), not live data.
 */

type StageKey = 'analyze' | 'detect' | 'act';

const STAGE_STRUCT: { key: StageKey; Icon: typeof Grid3x3; href: string }[] = [
  { key: 'analyze', Icon: Grid3x3, href: '/products/saai-insight' },
  { key: 'detect', Icon: Radar, href: '/products/saai-care' },
  { key: 'act', Icon: ClipboardCheck, href: '/products/saai-agent' },
];

type StageCopy = {
  label: string;   // ANALYZE
  tag: string;     // 분석 · 어제
  product: string; // saai insight
  caption: string; // expanded tagline description
};

type DemoCopy = {
  eyebrow: string;
  title: string;
  sub: string;
  exampleTag: string;
  detailCta: string;
  loopClose: string;
  stages: Record<StageKey, StageCopy>;
  // screen strings
  analyze: { funnel: { label: string; value: string }[]; insight: string };
  detect: { totalLabel: string; total: string; actLabel: string; act: string; items: string[] };
  act: { badge: string; title: string; reason: string; approve: string };
};

const DEMO: Record<Locale, DemoCopy> = {
  ko: {
    eyebrow: '운영 루프 · 작동하는 화면',
    title: '각 단계를 눌러, 실제로 무엇을 하는지 보세요',
    sub: '분석 → 감지 → 실행, 한 바퀴. 화면 속 숫자는 예시입니다.',
    exampleTag: '예시',
    detailCta: '자세히 보기',
    loopClose: '결과가 다시 입력으로 — 한 바퀴 돌 때마다, 사람의 손은 가벼워집니다.',
    stages: {
      analyze: { label: 'ANALYZE', tag: '분석 · 어제', product: 'saai insight', caption: '어제까지의 동선과 매출 데이터를 모아, 흐름과 추세를 읽어냅니다.' },
      detect: { label: 'DETECT', tag: '감지 · 지금', product: 'saai care', caption: '매장에서 지금 일어나는 이상 신호를 실시간으로 알립니다.' },
      act: { label: 'ACT', tag: '실행 · 다음', product: 'saai agent', caption: '오늘 무엇을 옮기고 채워야 할지, 다음 행동을 먼저 제안합니다.' },
    },
    analyze: {
      funnel: [
        { label: '통행', value: '1,160' },
        { label: '입장', value: '382' },
        { label: '체류', value: '317' },
        { label: '구매', value: '65' },
      ],
      insight: '음료 매대 체류 2배',
    },
    detect: { totalLabel: '들어온 알림', total: '1,353건', actLabel: '손쓸 일', act: '3건', items: ['냉장고 문 열림', '바닥 오염', '빈 매대'] },
    act: { badge: '오늘의 액션', title: '삼각김밥 40개, 오픈 전 입고', reason: '어제 오전 품절 · 재발 확률 높음', approve: '승인' },
  },
  en: {
    eyebrow: 'The operating loop · live screens',
    title: 'Tap each step to see what it actually does',
    sub: 'Analyze → Detect → Act, one turn. The numbers on screen are examples.',
    exampleTag: 'Example',
    detailCta: 'View detail',
    loopClose: 'The result feeds back in — every turn of the loop, less falls on human hands.',
    stages: {
      analyze: { label: 'ANALYZE', tag: 'Analyze · yesterday', product: 'saai insight', caption: "Pulls together yesterday's traffic and sales data to surface patterns and trends." },
      detect: { label: 'DETECT', tag: 'Detect · now', product: 'saai care', caption: 'Flags anomalies in your store the moment they happen, in real time.' },
      act: { label: 'ACT', tag: 'Act · next', product: 'saai agent', caption: "Recommends today's one action: what to move, what to restock." },
    },
    analyze: {
      funnel: [
        { label: 'Pass', value: '1,160' },
        { label: 'Enter', value: '382' },
        { label: 'Dwell', value: '317' },
        { label: 'Buy', value: '65' },
      ],
      insight: 'Beverage aisle dwell ×2',
    },
    detect: { totalLabel: 'Alerts in', total: '1,353', actLabel: 'To act on', act: '3', items: ['Fridge door open', 'Floor spill', 'Empty shelf'] },
    act: { badge: "Today's action", title: 'Restock 40 rice balls before open', reason: 'Sold out yesterday AM · likely to recur', approve: 'Approve' },
  },
  jp: {
    eyebrow: 'オペレーションループ · 実画面',
    title: '各ステップを押して、実際に何をするか見てください',
    sub: '分析 → 検知 → 実行、一周。画面の数値は例です。',
    exampleTag: '例',
    detailCta: '詳しく見る',
    loopClose: '結果が再び入力へ — ループを一周するたび、人の手は軽くなります。',
    stages: {
      analyze: { label: 'ANALYZE', tag: '分析 · 昨日', product: 'saai insight', caption: '昨日までの来店データと売上を集め、傾向とパターンを読み取ります。' },
      detect: { label: 'DETECT', tag: '検知 · 今', product: 'saai care', caption: '店舗で今起きている異常を、リアルタイムで知らせます。' },
      act: { label: 'ACT', tag: '実行 · 次', product: 'saai agent', caption: '今日何を動かし、何を補充すべきか、次の一手を先に提案します。' },
    },
    analyze: {
      funnel: [
        { label: '通行', value: '1,160' },
        { label: '入店', value: '382' },
        { label: '滞在', value: '317' },
        { label: '購入', value: '65' },
      ],
      insight: '飲料棚の滞在2倍',
    },
    detect: { totalLabel: '受信アラート', total: '1,353件', actLabel: '対応すべき', act: '3件', items: ['冷蔵庫の扉が開放', '床の汚れ', '欠品棚'] },
    act: { badge: '本日のアクション', title: 'おにぎり40個を開店前に入荷', reason: '昨日午前に欠品 · 再発の可能性大', approve: '承認' },
  },
};

/** Each stage renders a small, honest "screen" using the example data. */
function Screen({ stage, d }: { stage: StageKey; d: DemoCopy }) {
  if (stage === 'analyze') {
    const max = 1160;
    return (
      <div>
        <div className="flex items-end gap-2 sm:gap-3">
          {d.analyze.funnel.map((f) => {
            const pct = Math.max(12, Math.round((Number(f.value.replace(/,/g, '')) / max) * 100));
            return (
              <div key={f.label} className="flex-1 text-center">
                <div className="flex h-24 items-end justify-center">
                  <div className="w-full rounded-t-md bg-primary/80" style={{ height: `${pct}%` }} />
                </div>
                <p className="mt-2 text-sm font-bold text-gray-900 font-mono">{f.value}</p>
                <p className="text-2xs text-gray-500">{f.label}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary-lighter/60 px-3 py-1.5 text-xs font-medium text-primary">
          <Grid3x3 className="h-3.5 w-3.5" aria-hidden="true" />
          {d.analyze.insight}
        </p>
      </div>
    );
  }
  if (stage === 'detect') {
    return (
      <div>
        <div className="flex items-center gap-3">
          <div className="flex-1 rounded-xl border border-gray-100 bg-slate-50 p-3 text-center">
            <p className="text-xl font-bold text-gray-400 font-mono">{d.detect.total}</p>
            <p className="text-2xs text-gray-500">{d.detect.totalLabel}</p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-gray-300" aria-hidden="true" />
          <div className="flex-1 rounded-xl border border-primary/20 bg-primary-lighter/50 p-3 text-center">
            <p className="text-xl font-bold text-primary font-mono">{d.detect.act}</p>
            <p className="text-2xs text-primary/80">{d.detect.actLabel}</p>
          </div>
        </div>
        <ul className="mt-3 space-y-2">
          {d.detect.items.map((it) => (
            <li key={it} className="flex items-center gap-2 rounded-lg border border-gray-100 bg-white px-3 py-2 text-sm text-gray-700 break-keep">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {it}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  // act
  return (
    <div className="rounded-xl border border-primary/20 bg-white p-5 shadow-card">
      <p className="text-2xs font-bold uppercase tracking-wider text-primary mb-2">{d.act.badge}</p>
      <p className="text-base font-bold text-gray-900 break-keep">{d.act.title}</p>
      <p className="mt-1 text-xs text-gray-500 break-keep">{d.act.reason}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">
        <Check className="h-4 w-4" aria-hidden="true" />
        {d.act.approve}
      </span>
    </div>
  );
}

export default function OperatingLoopDemo({ locale }: { locale: Locale }) {
  const d = DEMO[locale];
  const [active, setActive] = useState<StageKey>('analyze');
  const activeStruct = STAGE_STRUCT.find((s) => s.key === active)!;
  const activeStage = d.stages[active];
  const panelId = 'loop-demo-panel';

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <p className="text-sm font-medium text-primary mb-3 tracking-wide">{d.eyebrow}</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 break-keep mb-3">{d.title}</h2>
        <p className="text-gray-500 break-keep">{d.sub}</p>
      </div>

      {/* Stage selector — aria-pressed buttons controlling one panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {STAGE_STRUCT.map((s, i) => {
          const Icon = s.Icon;
          const st = d.stages[s.key];
          const on = s.key === active;
          return (
            <button
              key={s.key}
              type="button"
              aria-pressed={on}
              aria-controls={panelId}
              onClick={() => setActive(s.key)}
              className={`flex flex-col items-start rounded-2xl border p-4 text-left transition-colors ${
                on ? 'border-primary bg-primary text-white shadow-card' : 'border-gray-200 bg-white hover:border-primary-light'
              }`}
            >
              <span className={`flex h-9 w-9 items-center justify-center rounded-lg mb-3 ${on ? 'bg-white/15 text-white' : 'bg-primary text-white'}`}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className={`text-2xs font-mono ${on ? 'text-white/70' : 'text-gray-400'}`}>{String(i + 1).padStart(2, '0')} · {st.label}</span>
              <span className={`text-sm font-bold ${on ? 'text-white' : 'text-gray-900'}`}>{st.product}</span>
              <span className={`text-2xs ${on ? 'text-white/70' : 'text-gray-400'}`}>{st.tag}</span>
            </button>
          );
        })}
      </div>

      {/* Screen panel */}
      <div id={panelId} aria-live="polite" className="mt-4 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-card">
        <div className="mb-5 flex items-start justify-between gap-3">
          <p className="text-sm text-gray-600 leading-relaxed break-keep">{activeStage.caption}</p>
          <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-2xs font-medium text-gray-500">{d.exampleTag}</span>
        </div>
        <Screen stage={active} d={d} />
        <div className="mt-6 border-t border-gray-100 pt-4">
          <Link
            href={localeHref(locale, activeStruct.href)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors no-underline"
          >
            {activeStage.product} {d.detailCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* LEARN — loop closes */}
      <p className="mt-6 inline-flex items-center justify-center gap-2 w-full text-center text-sm text-primary break-keep">
        <RotateCw className="h-4 w-4 shrink-0" aria-hidden="true" />
        {d.loopClose}
      </p>
    </div>
  );
}
