'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, Grid3x3 } from 'lucide-react';
import SaaiHeader from '@/components/mockups/SaaiHeader';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { Locale } from '@/lib/i18n';

/**
 * FeatureScreens — FeatureCarousel 우측 패널의 미니 제품 화면 4종 (care·insight·agent·count).
 * /products OperatingLoopDemo의 Screen 문법(관찰→분석→감지→실행 예시 화면)을 홈 다크
 * 캐러셀 톤으로 고도화한 버전 — 정적 스크린샷 대신 제품이 "실제로 무엇을 하는지" 보여준다.
 * 숫자는 OperatingLoopDemo와 동일한 예시 값(정합) — 실데이터가 아니므로 예시 배지를 단다.
 */

export type FeatureScreenKey = 'care' | 'insight' | 'agent' | 'count';

type Copy = {
  example: string;
  count: { labels: [string, string, string]; values: [string, string, string] };
  insight: { funnel: { label: string; value: string }[]; chip: string };
  care: { totalLabel: string; total: string; actLabel: string; act: string; items: string[] };
  agent: { badge: string; title: string; reason: string; approve: string };
};

const COPY: Record<Locale, Copy> = {
  ko: {
    example: '예시 화면',
    count: { labels: ['문 밖 통행', '입장', '유입률'], values: ['1,160', '382', '33%'] },
    insight: {
      funnel: [
        { label: '통행', value: '1,160' },
        { label: '입장', value: '382' },
        { label: '체류', value: '317' },
        { label: '구매', value: '65' },
      ],
      chip: '음료 매대 체류 2배',
    },
    care: { totalLabel: '들어온 알림', total: '1,353건', actLabel: '손쓸 일', act: '3건', items: ['냉장고 문 열림', '바닥 오염', '빈 매대'] },
    agent: { badge: '오늘의 액션', title: '삼각김밥 40개, 오픈 전 입고', reason: '어제 오전 품절 · 재발 확률 높음', approve: '승인' },
  },
  en: {
    example: 'Example',
    count: { labels: ['Passersby', 'Entered', 'Capture rate'], values: ['1,160', '382', '33%'] },
    insight: {
      funnel: [
        { label: 'Pass', value: '1,160' },
        { label: 'Enter', value: '382' },
        { label: 'Dwell', value: '317' },
        { label: 'Buy', value: '65' },
      ],
      chip: 'Beverage aisle dwell ×2',
    },
    care: { totalLabel: 'Alerts in', total: '1,353', actLabel: 'To act on', act: '3', items: ['Fridge door open', 'Floor spill', 'Empty shelf'] },
    agent: { badge: "Today's action", title: 'Restock 40 rice balls before open', reason: 'Sold out yesterday AM · likely to recur', approve: 'Approve' },
  },
  jp: {
    example: 'サンプル画面',
    // 流入率: 사이트 캐논 JP 용어(glossary·StoreCountView·캐러셀 태그라인과 정합)
    count: { labels: ['通行', '入店', '流入率'], values: ['1,160', '382', '33%'] },
    insight: {
      funnel: [
        { label: '通行', value: '1,160' },
        { label: '入店', value: '382' },
        { label: '滞在', value: '317' },
        { label: '購入', value: '65' },
      ],
      chip: '飲料棚の滞在2倍',
    },
    care: { totalLabel: '受信アラート', total: '1,353件', actLabel: '対応すべき', act: '3件', items: ['冷蔵庫の扉が開放', '床の汚れ', '欠品棚'] },
    agent: { badge: '本日のアクション', title: 'おにぎり40個を開店前に入荷', reason: '昨日午前に欠品 · 再発の可能性大', approve: '承認' },
  },
};

// 캐러셀 전환(AnimatePresence remount)마다 재생되는 내부 스태거 — no-spring(D3) tween.
const rise = (reduced: boolean, i = 0) => ({
  initial: reduced ? false : ({ opacity: 0, y: 10 } as const),
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay: 0.12 + i * 0.09, ease: [0.23, 1, 0.32, 1] as const },
});

function CountScreen({ t, reduced }: { t: Copy; reduced: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {t.count.labels.map((label, i) => {
        const emph = i === 2; // 유입률 — count의 핵심 지표
        return (
          <motion.div
            key={label}
            {...rise(reduced, i)}
            className={`rounded-xl p-3 text-center ring-1 ${
              emph ? 'bg-primary/10 ring-primary/50' : 'bg-white/[0.04] ring-white/10'
            }`}
          >
            <p className={`font-mono text-xl font-bold leading-none sm:text-2xl ${emph ? 'text-primary-light' : 'text-white'}`}>
              {t.count.values[i]}
            </p>
            <p className="mt-2 text-2xs text-gray-400 break-keep">{label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

function InsightScreen({ t, reduced }: { t: Copy; reduced: boolean }) {
  const max = 1160;
  return (
    <div>
      <div className="flex items-end gap-2 sm:gap-3">
        {t.insight.funnel.map((f, i) => {
          const pct = Math.max(12, Math.round((Number(f.value.replace(/,/g, '')) / max) * 100));
          return (
            <div key={f.label} className="flex-1 text-center">
              <div className="flex h-20 items-end justify-center sm:h-24">
                <motion.div
                  initial={reduced ? false : { height: 0 }}
                  animate={{ height: `${pct}%` }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.09, ease: [0.23, 1, 0.32, 1] }}
                  className="w-full rounded-t-md bg-gradient-to-t from-primary to-primary/60"
                />
              </div>
              <p className="mt-2 font-mono text-sm font-bold text-white">{f.value}</p>
              <p className="text-2xs text-gray-400">{f.label}</p>
            </div>
          );
        })}
      </div>
      <motion.p
        {...rise(reduced, 4)}
        className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-primary/15 px-3 py-1.5 text-xs font-medium text-primary-light"
      >
        <Grid3x3 className="h-3.5 w-3.5" aria-hidden="true" />
        {t.insight.chip}
      </motion.p>
    </div>
  );
}

function CareScreen({ t, reduced }: { t: Copy; reduced: boolean }) {
  return (
    <div>
      <motion.div {...rise(reduced, 0)} className="flex items-center gap-2.5 sm:gap-3">
        <div className="flex-1 rounded-xl bg-white/[0.04] p-3 text-center ring-1 ring-white/10">
          <p className="font-mono text-lg font-bold text-gray-400 sm:text-xl">{t.care.total}</p>
          <p className="text-2xs text-gray-400">{t.care.totalLabel}</p>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-gray-500" aria-hidden="true" />
        <div className="flex-1 rounded-xl bg-primary/10 p-3 text-center ring-1 ring-primary/50">
          <p className="font-mono text-lg font-bold text-primary-light sm:text-xl">{t.care.act}</p>
          <p className="text-2xs text-primary-light/80">{t.care.actLabel}</p>
        </div>
      </motion.div>
      <ul className="mt-3 space-y-2">
        {t.care.items.map((it, i) => (
          <motion.li
            key={it}
            {...rise(reduced, i + 1)}
            className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2 text-sm text-gray-200 ring-1 ring-white/10 break-keep"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            {it}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function AgentScreen({ t, reduced }: { t: Copy; reduced: boolean }) {
  return (
    <motion.div {...rise(reduced, 0)} className="rounded-xl bg-white/[0.05] p-4 ring-1 ring-primary/40 sm:p-5">
      <p className="mb-2 text-2xs font-bold uppercase tracking-wider text-primary-light">{t.agent.badge}</p>
      <p className="text-base font-bold text-white break-keep">{t.agent.title}</p>
      <p className="mt-1 text-xs text-gray-400 break-keep">{t.agent.reason}</p>
      <motion.span
        {...rise(reduced, 2)}
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white"
      >
        <Check className="h-4 w-4" aria-hidden="true" />
        {t.agent.approve}
      </motion.span>
    </motion.div>
  );
}

export default function ProductMiniScreen({ product, locale }: { product: FeatureScreenKey; locale: Locale }) {
  const reduced = usePrefersReducedMotion();
  const t = COPY[locale] ?? COPY.ko;
  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-gray-950/70 shadow-card">
      {/* 앱 창 크롬 — saai | {product} 워드마크 + 예시 배지(컴플라이언스) */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <SaaiHeader name={product} tone="dark" />
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-3xs font-bold text-gray-300">{t.example}</span>
      </div>
      <div className="p-4 sm:p-5">
        {product === 'count' && <CountScreen t={t} reduced={reduced} />}
        {product === 'insight' && <InsightScreen t={t} reduced={reduced} />}
        {product === 'care' && <CareScreen t={t} reduced={reduced} />}
        {product === 'agent' && <AgentScreen t={t} reduced={reduced} />}
      </div>
    </div>
  );
}
