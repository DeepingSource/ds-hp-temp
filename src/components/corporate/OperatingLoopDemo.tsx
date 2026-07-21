'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, Grid3x3, Radar, ClipboardCheck, ArrowRight, RotateCw, Check } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';

/**
 * OperatingLoopDemo — the /products protagonist (SAAI_페이지_데모시각_설계 v1 §2).
 *
 * Replaces the static ring graphic with an interactive demo: tap a loop stage and
 * a representative "screen" appears, so the page shows what SAAI actually does
 * instead of only describing it. Four stages —
 *   OBSERVE(count·입문) → ANALYZE(insight·어제) → DETECT(care·지금) → ACT(agent·다음).
 * Numbers are illustrative examples (labeled 예시), not live data.
 * Screens are lightweight and self-contained (no live mockup wiring) so the copy
 * stays honest and the component has no data dependency.
 */

type StageKey = 'observe' | 'analyze' | 'detect' | 'act';

const STAGE_STRUCT: { key: StageKey; Icon: typeof Eye; href: string }[] = [
  { key: 'observe', Icon: Eye, href: '/products/store-count' },
  { key: 'analyze', Icon: Grid3x3, href: '/products/saai-insight' },
  { key: 'detect', Icon: Radar, href: '/products/saai-care' },
  { key: 'act', Icon: ClipboardCheck, href: '/products/saai-agent' },
];

type StageCopy = {
  label: string;   // OBSERVE
  tag: string;     // 관찰 · 입문
  product: string; // store count
  caption: string; // one-line what-this-screen-is
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
  observe: { labels: [string, string, string]; values: [string, string, string] };
  analyze: { funnel: { label: string; value: string }[]; insight: string };
  detect: { totalLabel: string; total: string; actLabel: string; act: string; items: string[] };
  act: { badge: string; title: string; reason: string; approve: string };
};

const DEMO: Record<Locale, DemoCopy> = {
  ko: {
    eyebrow: '운영 루프 · 작동하는 화면',
    title: '각 단계를 눌러, 실제로 무엇을 하는지 보세요',
    sub: '관찰 → 분석 → 감지 → 실행, 한 바퀴. 화면 속 숫자는 예시입니다.',
    exampleTag: '예시',
    detailCta: '자세히 보기',
    loopClose: '결과가 다시 입력으로 — 한 바퀴 돌 때마다, 사람의 손은 가벼워집니다.',
    stages: {
      observe: { label: 'OBSERVE', tag: '관찰 · 입문', product: 'store count', caption: '문 앞을 지난 사람과 들어온 사람 — 유입의 시작점.' },
      analyze: { label: 'ANALYZE', tag: '분석 · 어제', product: 'saai insight', caption: '어제의 흐름을 퍼널로 — 어디서 놓쳤는지 짚어냅니다.' },
      detect: { label: 'DETECT', tag: '감지 · 지금', product: 'saai care', caption: '쏟아지는 알림 대신, 지금 손쓸 순간만.' },
      act: { label: 'ACT', tag: '실행 · 다음', product: 'saai agent', caption: '다음에 할 일을 발주서까지 — 결정은 사람이.' },
    },
    observe: { labels: ['문 밖 통행', '입장', '유입률'], values: ['1,160', '382', '33%'] },
    analyze: {
      funnel: [
        { label: '통행', value: '1,160' },
        { label: '입장', value: '382' },
        { label: '체류', value: '317' },
        { label: '구매', value: '65' },
      ],
      insight: '음료 매대 체류 2배',
    },
    detect: { totalLabel: '들어온 알림', total: '1,247건', actLabel: '손쓸 일', act: '3건', items: ['냉장고 문 열림', '바닥 오염', '빈 매대'] },
    act: { badge: '오늘의 액션', title: '삼각김밥 40개, 오픈 전 입고', reason: '어제 오전 품절 · 재발 확률 높음', approve: '승인' },
  },
  en: {
    eyebrow: 'The operating loop · live screens',
    title: 'Tap each step to see what it actually does',
    sub: 'Observe → Analyze → Detect → Act, one turn. The numbers on screen are examples.',
    exampleTag: 'Example',
    detailCta: 'View detail',
    loopClose: 'The result feeds back in — every turn of the loop, less falls on human hands.',
    stages: {
      observe: { label: 'OBSERVE', tag: 'Observe · entry', product: 'store count', caption: 'Who passed the door and who came in — where footfall begins.' },
      analyze: { label: 'ANALYZE', tag: 'Analyze · yesterday', product: 'saai insight', caption: "Yesterday's flow as a funnel — pinpointing where you lost them." },
      detect: { label: 'DETECT', tag: 'Detect · now', product: 'saai care', caption: 'Not a flood of alerts — only the moments to act, now.' },
      act: { label: 'ACT', tag: 'Act · next', product: 'saai agent', caption: 'The next task, down to the order sheet — the person decides.' },
    },
    observe: { labels: ['Passersby', 'Entered', 'Capture rate'], values: ['1,160', '382', '33%'] },
    analyze: {
      funnel: [
        { label: 'Pass', value: '1,160' },
        { label: 'Enter', value: '382' },
        { label: 'Dwell', value: '317' },
        { label: 'Buy', value: '65' },
      ],
      insight: 'Beverage aisle dwell ×2',
    },
    detect: { totalLabel: 'Alerts in', total: '1,247', actLabel: 'To act on', act: '3', items: ['Fridge door open', 'Floor spill', 'Empty shelf'] },
    act: { badge: "Today's action", title: 'Restock 40 rice balls before open', reason: 'Sold out yesterday AM · likely to recur', approve: 'Approve' },
  },
  jp: {
    eyebrow: 'オペレーションループ · 実画面',
    title: '各ステップを押して、実際に何をするか見てください',
    sub: '観察 → 分析 → 検知 → 実行、一周。画面の数値は例です。',
    exampleTag: '例',
    detailCta: '詳しく見る',
    loopClose: '結果が再び入力へ — ループを一周するたび、人の手は軽くなります。',
    stages: {
      observe: { label: 'OBSERVE', tag: '観察 · 入門', product: 'store count', caption: '扉の前を通った人と入った人 — 集客の起点。' },
      analyze: { label: 'ANALYZE', tag: '分析 · 昨日', product: 'saai insight', caption: '昨日の流れをファネルで — どこで逃したかを特定。' },
      detect: { label: 'DETECT', tag: '検知 · 今', product: 'saai care', caption: 'あふれる通知ではなく、今手を打つ瞬間だけ。' },
      act: { label: 'ACT', tag: '実行 · 次', product: 'saai agent', caption: '次にやることを発注書まで — 決めるのは人。' },
    },
    observe: { labels: ['通行', '入店', '入店率'], values: ['1,160', '382', '33%'] },
    analyze: {
      funnel: [
        { label: '通行', value: '1,160' },
        { label: '入店', value: '382' },
        { label: '滞在', value: '317' },
        { label: '購入', value: '65' },
      ],
      insight: '飲料棚の滞在2倍',
    },
    detect: { totalLabel: '受信アラート', total: '1,247件', actLabel: '対応すべき', act: '3件', items: ['冷蔵庫の扉が開放', '床の汚れ', '欠品棚'] },
    act: { badge: '本日のアクション', title: 'おにぎり40個を開店前に入荷', reason: '昨日午前に欠品 · 再発の可能性大', approve: '承認' },
  },
};

/** Each stage renders a small, honest "screen" using the example data. */
function Screen({ stage, d }: { stage: StageKey; d: DemoCopy }) {
  if (stage === 'observe') {
    return (
      <div className="grid grid-cols-3 gap-3">
        {d.observe.labels.map((label, i) => (
          <div key={label} className="rounded-xl border border-gray-100 bg-slate-50 p-4 text-center">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 font-mono leading-none">{d.observe.values[i]}</p>
            <p className="mt-2 text-2xs text-gray-500 break-keep">{label}</p>
          </div>
        ))}
      </div>
    );
  }
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
  const [active, setActive] = useState<StageKey>('observe');
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
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
