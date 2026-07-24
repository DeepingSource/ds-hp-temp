'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useSequencedLoop } from '@/hooks/useSequencedLoop';
import BrowserChrome from './BrowserChrome';
import MockupViewport from './MockupViewport';
import MockupReplayButton from '@/components/ui/MockupReplayButton';
import SaaiSymbol from '@/components/ui/SaaiSymbol';
import { motionEnter } from '@/lib/mockup-motion';
import { type Locale } from '@/lib/i18n';

/**
 * SpatialChatMockup — 홈 비교 섹션 우측 "공간 AI(SAAI)" 데모 (A-2).
 *
 * 좌측 GenericAiMockup과 "같은 챗 프레임"을 쓰되(대비를 형태가 아니라 능력으로),
 * 답을 텍스트가 아니라 매장 평면도 위 히트맵·익명 동선·하이라이트 구역 + 오늘의
 * 행동으로 내놓는다. "공간을 직접 본다"를 목업만 봐도 이해되게 하는 것이 목표.
 *
 * 크기 계약: MockupViewport design="card"(480 고정 캔버스) — 좌측과 동일 프레임/폭.
 * 모션: 뷰포트 진입(+ active 게이트) 시 1회 재생 → 최종 프레임 정지 + ↻.
 * reduced-motion은 최종 프레임 정적 표시.
 */

interface Copy {
  header: string;
  context: string;
  userQ: string;
  answerLead: string;
  answerRec: string;
  actionChip: string;
  hotBadge: string;
  zones: { entrance: string; checkout: string; a: string; b: string; c: string };
}

const COPY: Record<Locale, Copy> = {
  ko: {
    header: '강남역점 · SAAI',
    context: '강남역점 · 지금 14:20',
    userQ: '지금 매장 어디가 붐벼요?',
    answerLead: '입구 우측 매대 앞이 가장 붐빕니다.',
    answerRec: '이 구역 체류가 평소보다 38% 높아요. 잘 팔리는 진열을 여기로 옮기세요.',
    actionChip: '진열 이동 제안 보기',
    hotBadge: '체류 +38%',
    zones: { entrance: '입구', checkout: '계산대', a: '매대 A', b: '매대 B', c: '매대 C' },
  },
  en: {
    header: 'Gangnam · SAAI',
    context: 'Gangnam store · now 2:20 PM',
    userQ: 'Where is my store crowded right now?',
    answerLead: 'The shelf just right of the entrance is the busiest.',
    answerRec: 'Dwell here is 38% above normal. Move your best-sellers to this spot.',
    actionChip: 'See the re-layout suggestion',
    hotBadge: 'Dwell +38%',
    zones: { entrance: 'Entrance', checkout: 'Checkout', a: 'Shelf A', b: 'Shelf B', c: 'Shelf C' },
  },
  jp: {
    header: '江南店 · SAAI',
    context: '江南店 · 現在 14:20',
    userQ: '今、店内はどこが混んでいますか？',
    answerLead: '入口右の棚前が最も混んでいます。',
    answerRec: 'この区域の滞在が普段より38%高いです。売れ筋の陳列をここへ移しましょう。',
    actionChip: '陳列移動の提案を見る',
    hotBadge: '滞在 +38%',
    zones: { entrance: '入口', checkout: 'レジ', a: '棚A', b: '棚B', c: '棚C' },
  },
};

// 익명 인원 점 — 매대 C(입구 우측) 앞에 군집, 나머지는 분산 (로케일 무관 좌표)
const DOTS: { x: number; y: number; hot?: boolean }[] = [
  { x: 330, y: 120, hot: true }, { x: 344, y: 132, hot: true }, { x: 318, y: 134, hot: true },
  { x: 352, y: 118, hot: true }, { x: 336, y: 146, hot: true }, { x: 360, y: 138, hot: true },
  { x: 96, y: 66 }, { x: 210, y: 70 }, { x: 150, y: 150 }, { x: 78, y: 168 }, { x: 258, y: 150 },
];

// 리듬 (ms)
const T_USER = 600;
const T_TYPING = 1500;
const T_PLAN = 1700;
const T_ANSWER = 1500;
const T_SETTLE = 900;

interface Props {
  active?: boolean;
  locale?: Locale;
  playMode?: 'loop' | 'once';
}

export default function SpatialChatMockup({ active = true, locale = 'ko', playMode = 'once' }: Props) {
  const reduced = usePrefersReducedMotion();
  const t = COPY[locale] ?? COPY.en;
  // 0 없음 · 1 유저질문 · 2 타이핑 · 3 평면도 · 4 답변+하이라이트
  const [stage, setStage] = useState(0);
  const [replayKey, setReplayKey] = useState(0);
  const { ref: containerRef, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.4,
    safetyNet: playMode === 'loop',
  });

  useSequencedLoop(
    (sched) => {
      setStage(0);
      let cursor = T_USER;
      sched(() => setStage(1), cursor);
      cursor += T_TYPING;
      sched(() => setStage(2), cursor);
      cursor += T_PLAN;
      sched(() => setStage(3), cursor);
      cursor += T_ANSWER;
      sched(() => setStage(4), cursor);
      return cursor + T_SETTLE;
    },
    {
      active: active && isVisible,
      reducedMotion: reduced,
      onStatic: () => setStage(4),
      once: playMode === 'once',
      onComplete: () => setStage(4),
      deps: [replayKey, locale],
    },
  );

  const planShown = stage >= 3 || reduced;
  const answerShown = stage >= 4 || reduced;
  const done = stage >= 4;

  return (
    <div ref={containerRef}>
      <MockupViewport design="card">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
          <BrowserChrome variant="light" size="sm">
            <SaaiSymbol className="h-3.5 w-3.5 text-primary" />
            {t.header}
          </BrowserChrome>

          <div className="flex h-[384px] flex-col gap-3 overflow-hidden bg-slate-50 p-4" aria-hidden="true">
            {/* User question */}
            <AnimatePresence initial={false}>
              {stage >= 1 && (
                <motion.div
                  key={`q-${replayKey}`}
                  className="flex justify-end"
                  initial={reduced ? false : { opacity: 0, scale: 0.9, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={motionEnter}
                  style={{ transformOrigin: 'bottom right' }}
                >
                  <div className="max-w-[82%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm leading-relaxed text-white">
                    {t.userQ}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Typing */}
            <AnimatePresence>
              {stage === 2 && !reduced && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={motionEnter}
                >
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-2.5 shadow-card">
                    <SaaiSymbol className="h-3.5 w-3.5 text-primary/70" />
                    {[0, 0.16, 0.32].map((delay, i) => (
                      <motion.span
                        key={i}
                        className="inline-block h-1.5 w-1.5 rounded-full bg-primary/50"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.65, repeat: Infinity, delay, ease: [0.45, 0, 0.55, 1], repeatDelay: 0.12 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SAAI spatial answer */}
            <AnimatePresence initial={false}>
              {stage >= 3 && (
                <motion.div
                  key={`a-${replayKey}`}
                  className="flex justify-start"
                  initial={reduced ? false : { opacity: 0, scale: 0.95, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={motionEnter}
                  style={{ transformOrigin: 'bottom left' }}
                >
                  <div className="w-full overflow-hidden rounded-2xl rounded-bl-md border border-primary/20 bg-white shadow-card">
                    {/* context strip */}
                    <div className="flex items-center gap-1.5 border-b border-slate-100 px-3 py-2 text-2xs font-semibold text-slate-500">
                      <SaaiSymbol className="h-3 w-3 text-primary" />
                      {t.context}
                    </div>

                    {/* FLOOR PLAN + heatmap — 고정 높이로 추천 문구 자리를 확보 */}
                    <div className="flex h-[176px] items-center justify-center bg-slate-50/60 px-3 py-2">
                      <FloorPlan t={t} shown={planShown} reduced={reduced} />
                    </div>

                    {/* recommendation */}
                    <AnimatePresence initial={false}>
                      {answerShown && (
                        <motion.div
                          className="border-t border-slate-100 px-3.5 py-3"
                          initial={reduced ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={motionEnter}
                        >
                          <p className="text-sm font-semibold leading-snug text-slate-800 break-keep">
                            {t.answerLead}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-slate-500 break-keep">
                            {t.answerRec}
                          </p>
                          <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-2xs font-bold text-white">
                            {t.actionChip}
                            <ArrowRight className="h-3 w-3" aria-hidden="true" />
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* input strip — SAAI 쪽은 실행까지 이어지는 대비 */}
          <div className="flex items-center gap-2 border-t border-slate-200 bg-white px-4 py-3">
            <div className="flex-1 rounded-full bg-slate-100 px-4 py-2.5 text-sm text-slate-400">
              {locale === 'ko' ? '매장에 무엇이든 물어보세요…' : locale === 'jp' ? '店舗について何でも聞いてください…' : 'Ask anything about your store…'}
            </div>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <SaaiSymbol className="h-4 w-4 text-white" />
            </div>
          </div>

          {done && !reduced && (
            <MockupReplayButton locale={locale} onReplay={() => setReplayKey((k) => k + 1)} className="bottom-[4.25rem]" />
          )}
        </div>
      </MockupViewport>
    </div>
  );
}

/** 매장 평면도 — 히트맵 · 익명 점 · 동선 · 입구 우측 매대 하이라이트. */
function FloorPlan({ t, shown, reduced }: { t: Copy; shown: boolean; reduced: boolean }) {
  const draw = shown;
  return (
    <svg viewBox="0 0 440 220" className="mx-auto block h-full w-auto max-w-full" role="img" aria-label={t.answerLead}>
      <defs>
        <radialGradient id="heat-hot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#fb923c" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="heat-cool" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#376AE2" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#376AE2" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* store outline */}
      <rect x="8" y="8" width="424" height="204" rx="16" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />

      {/* heatmap blobs */}
      <g style={{ opacity: draw ? 1 : 0, transition: 'opacity .6s ease' }}>
        <circle cx="96" cy="60" r="46" fill="url(#heat-cool)" />
        <circle cx="212" cy="62" r="46" fill="url(#heat-cool)" />
        <circle cx="150" cy="150" r="40" fill="url(#heat-cool)" />
        <circle cx="340" cy="128" r="66" fill="url(#heat-hot)" />
      </g>

      {/* shelves */}
      <g fill="#eef2f7" stroke="#dbe2ea" strokeWidth="1.5">
        <rect x="52" y="44" width="96" height="26" rx="6" />
        <rect x="176" y="44" width="96" height="26" rx="6" />
        <rect x="300" y="112" width="98" height="30" rx="6" />
        <rect x="44" y="150" width="76" height="34" rx="6" />
      </g>
      <g fill="#94a3b8" fontSize="11" fontWeight="600" style={{ fontFamily: 'inherit' }}>
        <text x="100" y="61" textAnchor="middle">{t.zones.a}</text>
        <text x="224" y="61" textAnchor="middle">{t.zones.b}</text>
        <text x="82" y="171" textAnchor="middle">{t.zones.checkout}</text>
      </g>

      {/* entrance */}
      <line x1="176" y1="210" x2="240" y2="210" stroke="#ffffff" strokeWidth="4" />
      <path d="M176 210 a32 32 0 0 1 32 -32" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="208" y="200" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="600">{t.zones.entrance}</text>

      {/* flow path entrance → hot shelf */}
      <motion.path
        d="M208 206 C 250 190, 300 168, 342 140"
        fill="none"
        stroke="#376AE2"
        strokeWidth="2"
        strokeDasharray="4 4"
        strokeLinecap="round"
        initial={reduced ? false : { pathLength: 0, opacity: 0 }}
        animate={draw ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.9, ease: 'easeInOut' }}
      />

      {/* anonymized people dots */}
      {DOTS.map((d, i) => (
        <motion.circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.hot ? 4 : 3.4}
          fill={d.hot ? '#f97316' : '#64748b'}
          initial={reduced ? false : { opacity: 0, scale: 0 }}
          animate={draw ? { opacity: d.hot ? 0.95 : 0.6, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.3 + i * 0.045, ease: 'easeOut' }}
          style={{ transformOrigin: `${d.x}px ${d.y}px` }}
        />
      ))}

      {/* HOT shelf highlight ring + badge */}
      <motion.g
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: draw ? 1 : 0 }}
        transition={{ duration: 0.4, delay: reduced ? 0 : 0.9 }}
      >
        <motion.rect
          x="296" y="108" width="106" height="38" rx="9"
          fill="none" stroke="#f97316" strokeWidth="2.5"
          animate={reduced ? undefined : { opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <text x="349" y="131" textAnchor="middle" fill="#c2410c" fontSize="11" fontWeight="700">{t.zones.c}</text>
        <g>
          <rect x="300" y="82" width="98" height="20" rx="10" fill="#f97316" />
          <text x="349" y="96" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">{t.hotBadge}</text>
        </g>
      </motion.g>
    </svg>
  );
}
