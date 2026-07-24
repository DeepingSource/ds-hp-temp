'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';
import { canonicalHq } from '@/data/mockup-scenarios/canonical';
import { alertNoisePool, actionCards } from '@/data/mockup-scenarios/storeagent';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useMockupLoop } from '@/hooks/useMockupLoop';
import { useCountUp } from '@/hooks/useCountUp';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { SAAI_COLORS } from '@/lib/mockup-tokens.gen';
import { motionEnter, motionAffordance } from '@/lib/mockup-motion';
import MockupBadge from './MockupBadge';
import SaaiHeader from './SaaiHeader';

// MockupViewport 예외(MM Phase 3 D12): 제품 UI 재현이 아닌 비교형(legacy vs saai)
// 2패널 레이아웃이라 고정 캔버스 대신 grid-cols-1↔2 반응형 재배치가 설계 의도 —
// 강제 스케일은 극좁 폭에서 오히려 가독성 퇴행. (1a IntegratedLoop 형식)

// ── Copy (ko/en/jp), English-first per D6 ──────────────────────────────
// heading의 '1,353' 리터럴은 canonicalHq.dailyAlerts(1353)와 동일해야 한다(D6) —
// 좌측 카운터가 같은 값으로 count-up 하므로 값 변경 시 3로케일 동시 갱신.
const COPY: Record<
  Locale,
  {
    heading: string;
    legacyTitle: string;
    legacySub: string;
    alertsToday: string;
    agentTitle: string;
    agentSub: string;
    priorities: string;
  }
> = {
  en: {
    heading: '1,353 alerts a day. You need three.',
    legacyTitle: 'Legacy CCTV alerts',
    legacySub: 'unfiltered event stream',
    alertsToday: 'alerts today',
    agentTitle: 'saai | store agent',
    agentSub: 'prioritized actions',
    priorities: 'priorities',
  },
  ko: {
    heading: '하루 1,353건의 알림. 필요한 건 3장입니다.',
    legacyTitle: 'Legacy CCTV alerts',
    legacySub: '필터 없는 이벤트 스트림',
    alertsToday: 'alerts today',
    agentTitle: 'saai | store agent',
    agentSub: '우선순위 액션',
    priorities: 'priorities',
  },
  jp: {
    heading: '1日1,353件の通知。必要なのは3枚です。',
    legacyTitle: 'Legacy CCTV alerts',
    legacySub: 'フィルタなしのイベント列',
    alertsToday: 'alerts today',
    agentTitle: 'saai | store agent',
    agentSub: '優先アクション',
    priorities: 'priorities',
  },
};

// Viewport 예외 파일 = .saai-scope 밖 → --saai-* CSS 변수 미해석. SAAI_COLORS 인라인 사용(D2).
const TONE_HIGH = { color: SAAI_COLORS['red-600'], backgroundColor: SAAI_COLORS['red-50'] };
const TONE_MEDIUM = { color: SAAI_COLORS['yellow-700'], backgroundColor: SAAI_COLORS['yellow-50'] };

// English-first concise titles for the right panel (actionCards titles are Korean).
const RIGHT_CARDS = [
  { title: 'Restock umbrellas & ponchos', meta: 'Rain 70% tomorrow · sales +180%', priority: 'High', tone: TONE_HIGH },
  { title: 'Reorder onigiri', meta: 'Stock 12 · ~35/day · sells out by 3pm', priority: 'Medium', tone: TONE_MEDIUM },
  { title: 'Add peak-time staff', meta: 'Sat 4–6pm wait 3.2min over 1.5 target', priority: 'High', tone: TONE_HIGH },
].map((c, i) => ({ ...c, src: actionCards[i] }));

const MAX_ROWS = 40;

// Fake monotonous timestamp generator (descending seconds) — decorative.
function fakeTime(i: number): string {
  const base = 14 * 3600 + 23 * 60 + 7; // 14:23:07 anchor
  const t = base - i * 11;
  const s = ((t % 60) + 60) % 60;
  const m = (Math.floor(t / 60) % 60 + 60) % 60;
  const h = ((Math.floor(t / 3600) % 24) + 24) % 24;
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(h)}:${p(m)}:${p(s)}`;
}

interface NoiseRow {
  id: number;
  text: string;
  time: string;
}

export default function AlertFatigueComparison({
  active = true,
  locale = 'en',
  className = '',
}: {
  active?: boolean;
  locale?: Locale;
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const t = COPY[locale] ?? COPY.en;
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const { hoverProps, loopKey } = useMockupLoop({
    steps: 1,
    interval: 12000,
    active: isVisible && active,
    pauseOnHover: true,
  });

  const running = isVisible && active && !reducedMotion;

  // ── Left: windowed virtual stack (cap MAX_ROWS) ──────────────────────
  const [rows, setRows] = useState<NoiseRow[]>([]);
  const counterRef = useRef(0); // total emitted (drives stack recycle)

  // count-up reaches dailyAlerts over ~8s, restarts each loop via key
  const counter = useCountUp(canonicalHq.dailyAlerts, running, 8000);

  useEffect(() => {
    if (reducedMotion) {
      // static contrast: ~40 prebuilt rows, counter fixed
      const seed: NoiseRow[] = Array.from({ length: MAX_ROWS }, (_, i) => ({
        id: i,
        text: alertNoisePool[i % alertNoisePool.length],
        time: fakeTime(i),
      }));
      setRows(seed);
      return;
    }
    if (!running) {
      setRows([]);
      counterRef.current = 0;
      return;
    }

    // reset on each loop
    counterRef.current = 0;
    setRows([]);

    const startedAt = performance.now();
    let timer: ReturnType<typeof setTimeout>;

    const emit = () => {
      const elapsed = performance.now() - startedAt;
      // accelerate: ~6 rows/sec early -> ~14 rows/sec after 3s
      const rps = elapsed < 3000 ? 6 : 14;
      const delay = 1000 / rps;

      const id = counterRef.current++;
      setRows((prev) => {
        const next = [
          { id, text: alertNoisePool[id % alertNoisePool.length], time: fakeTime(id) },
          ...prev,
        ];
        // DOM windowing — never exceed MAX_ROWS
        return next.length > MAX_ROWS ? next.slice(0, MAX_ROWS) : next;
      });

      timer = setTimeout(emit, delay);
    };
    timer = setTimeout(emit, 0);
    return () => clearTimeout(timer);
  }, [running, loopKey, reducedMotion]);

  // Counter value: count-up while running; cap at dailyAlerts. Synced loosely to stack.
  const displayCount = reducedMotion ? canonicalHq.dailyAlerts : counter;

  // ── Right: 3 cards appear at ~2s, 180ms stagger, then freeze ─────────
  const [cardsIn, setCardsIn] = useState(false); // SSR-safe; effect sets true under reduced-motion
  useEffect(() => {
    if (reducedMotion) {
      setCardsIn(true);
      return;
    }
    if (!running) {
      setCardsIn(false);
      return;
    }
    setCardsIn(false);
    const tm = setTimeout(() => setCardsIn(true), 2000);
    return () => clearTimeout(tm);
  }, [running, loopKey, reducedMotion]);

  return (
    <div
      ref={ref}
      {...hoverProps}
      className={`relative w-full ${className}`}
    >
      <MockupBadge locale={locale} />

      <div className="mb-1.5 text-center">
        <SaaiHeader name="store agent" tone="light" />
      </div>

      {/* Takeaway heading — real text, conveys meaning w/o animation */}
      <h3 className="mb-4 text-center text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
        {t.heading}
      </h3>

      <div className="relative grid grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card md:grid-cols-2">
        {/* center divider (desktop only) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gray-200 md:block"
        />

        {/* ── LEFT: Legacy CCTV alerts (CHAOS) ───────────────────────── */}
        <section
          className="relative flex h-[280px] flex-col bg-gray-50 md:h-[460px]"
          aria-label={`${t.legacyTitle}: ${displayCount.toLocaleString('en-US')} ${t.alertsToday}`}
        >
          <header className="flex items-start justify-between gap-2 border-b border-gray-200 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-gray-700">{t.legacyTitle}</p>
              <p className="text-2xs text-gray-400">{t.legacySub}</p>
            </div>
            <div className="shrink-0 rounded-md bg-gray-200 px-2 py-1 text-right">
              <span className="block text-base font-bold leading-none text-gray-800 tabular-nums">
                {displayCount.toLocaleString('en-US')}
              </span>
              <span className="block text-3xs uppercase tracking-wide text-gray-500">
                {t.alertsToday}
              </span>
            </div>
          </header>

          {/* virtual stack — newest on top, max MAX_ROWS in DOM */}
          <div className="relative flex-1 overflow-hidden" aria-hidden>
            <div className="flex flex-col gap-px p-2">
              {rows.map((r) => (
                <motion.div
                  key={r.id}
                  initial={reducedMotion ? false : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={motionAffordance}
                  className="flex items-center gap-2 rounded bg-white/70 px-2 py-1 text-2xs text-gray-500"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                  <span className="flex-1 truncate">{r.text}</span>
                  <span className="shrink-0 tabular-nums text-gray-300">{r.time}</span>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ── RIGHT: saai store agent (CALM) ─────────────────────────── */}
        <section
          className="relative flex flex-col bg-white"
          aria-label={`${t.agentTitle}: 3 ${t.priorities}`}
        >
          <header className="flex items-start justify-between gap-2 border-b border-gray-200 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-primary">{t.agentTitle}</p>
              <p className="text-2xs text-gray-400">{t.agentSub}</p>
            </div>
            <div className="shrink-0 rounded-md bg-primary/10 px-2 py-1 text-right">
              <span className="block text-base font-bold leading-none text-primary tabular-nums">
                3
              </span>
              <span className="block text-3xs uppercase tracking-wide text-primary/70">
                {t.priorities}
              </span>
            </div>
          </header>

          <div className="flex flex-1 flex-col justify-center gap-3 p-4">
            {RIGHT_CARDS.map((c, i) => (
              <motion.article
                key={c.title}
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={cardsIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ ...motionEnter, delay: reducedMotion ? 0 : i * 0.18 }}
                className="rounded-xl border border-gray-200 bg-white p-3 shadow-card"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-gray-900">{c.title}</p>
                  <span style={c.tone} className="shrink-0 rounded-full px-2 py-0.5 text-3xs font-bold">
                    {c.priority}
                  </span>
                </div>
                <p className="mt-1 text-2xs leading-snug text-gray-500">{c.meta}</p>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
