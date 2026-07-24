'use client';

import { useState } from 'react';
import { Armchair, MapPin, Cctv, Sparkles } from 'lucide-react';
import { type Locale } from '@/lib/i18n';

/**
 * CategoryHeroDemo — per-category interactive "hero demo" (솔루션 작업문서 v1 §6, V3).
 * One dispatcher, three self-contained visuals — no CMS coupling, no external libs:
 *   food-beverage → 좌석·대기 게이지 (한산 ↔ 피크)
 *   drug-store    → 구역 관심 히트맵 (구역 선택)
 *   large-space   → MTMC 멀티캠 → 하나의 좌표 (분리 ↔ 통합)
 * Interactions use aria-pressed buttons (site convention, not fake ARIA tabs).
 * Figures are illustrative — every demo carries a "예시" caption.
 */

type Head = { eyebrow: string; heading: string };

const CAPTION: Record<Locale, string> = { ko: '* 대표 예시 화면', en: '* Illustrative example', jp: '* 代表例の画面' };

function Frame({ head, children }: { head: Head; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <p className="text-sm font-medium text-primary mb-3 tracking-wide">{head.eyebrow}</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 break-keep">{head.heading}</h2>
      </div>
      {children}
    </div>
  );
}

/* ─────────────────────────── food-beverage ─────────────────────────── */

const FB: Record<Locale, Head & {
  quiet: string; peak: string;
  congestion: string; waiting: string; waitUnit: string; turnover: string;
  quietTurn: string; peakTurn: string;
}> = {
  ko: {
    eyebrow: '실시간 좌석 · 대기', heading: '붐비기 전에, 좌석을 돌립니다',
    quiet: '한산', peak: '피크 임박',
    congestion: '혼잡도', waiting: '대기 인원', waitUnit: '명', turnover: '회전 예측',
    quietTurn: '여유 · 대기 없음', peakTurn: '약 35분 후 만석 예상 · 좌석 회전 유도',
  },
  en: {
    eyebrow: 'Live seats · queue', heading: 'Turn seats before it gets busy',
    quiet: 'Quiet', peak: 'Peak nearing',
    congestion: 'Congestion', waiting: 'Waiting', waitUnit: '', turnover: 'Turnover',
    quietTurn: 'Room to spare · no wait', peakTurn: 'Full in ~35 min · nudge seat turnover',
  },
  jp: {
    eyebrow: 'リアルタイム座席 · 待ち', heading: '混む前に、席を回します',
    quiet: '空いている', peak: 'ピーク間近',
    congestion: '混雑度', waiting: '待ち人数', waitUnit: '人', turnover: '回転予測',
    quietTurn: '余裕 · 待ちなし', peakTurn: '約35分で満席予想 · 席の回転を促す',
  },
};

function FoodBeverageDemo({ locale }: { locale: Locale }) {
  const t = FB[locale];
  const [peak, setPeak] = useState(true);
  const pct = peak ? 78 : 32;
  const wait = peak ? 12 : 2;
  const filled = peak ? 10 : 4;

  return (
    <Frame head={t}>
      <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-card">
        <div className="mx-auto mb-6 inline-flex rounded-full border border-gray-200 bg-gray-50 p-1 w-full max-w-xs">
          {([[false, t.quiet], [true, t.peak]] as const).map(([v, label]) => (
            <button
              key={label}
              type="button"
              aria-pressed={peak === v}
              onClick={() => setPeak(v)}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                peak === v ? (v ? 'bg-primary text-white shadow-sm' : 'bg-white text-gray-900 shadow-sm') : 'text-gray-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-[1.4fr_1fr] items-center">
          {/* congestion gauge + seats */}
          <div>
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="text-sm font-medium text-gray-500">{t.congestion}</span>
              <span className={`text-2xl font-bold tabular-nums ${peak ? 'text-primary' : 'text-gray-900'}`}>{pct}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-5 grid grid-cols-6 gap-2" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex aspect-square items-center justify-center rounded-lg border transition-colors ${
                    i < filled ? 'border-primary/30 bg-primary/10 text-primary' : 'border-gray-100 bg-gray-50 text-gray-300'
                  }`}
                >
                  <Armchair className="h-4 w-4" />
                </div>
              ))}
            </div>
          </div>

          {/* readouts */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-500">{t.waiting}</p>
              <p className="text-3xl font-bold tabular-nums text-gray-900">{wait}<span className="ml-0.5 text-base font-medium text-gray-400">{t.waitUnit}</span></p>
            </div>
            <div className={`rounded-2xl p-4 transition-colors ${peak ? 'bg-primary/5' : 'bg-gray-50'}`}>
              <p className="text-xs font-medium text-gray-500">{t.turnover}</p>
              <p className={`mt-1 text-sm font-semibold break-keep ${peak ? 'text-primary' : 'text-gray-600'}`}>
                {peak ? t.peakTurn : t.quietTurn}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-gray-400">{CAPTION[locale]}</p>
    </Frame>
  );
}

/* ─────────────────────────── drug-store ─────────────────────────── */

type Zone = { label: string; heat: number; metric: string };
const DRUG: Record<Locale, Head & { zones: Zone[]; metricLabel: string; hot: string; door: string; legendLow: string; legendHigh: string }> = {
  ko: {
    eyebrow: '구역별 관심 히트맵', heading: '어느 매대가 팔리는지, 바닥이 말해줍니다',
    metricLabel: '관심도 (접근 · 체류)', hot: 'HOT', door: '입구', legendLow: '낮음', legendHigh: '높음',
    zones: [
      { label: '진입부', heat: 0.45, metric: '통과 62% · 평균 체류 8초' },
      { label: '헬스 · 뷰티', heat: 0.95, metric: '접근 41% · 평균 체류 34초 — 최다 관심' },
      { label: '카운터', heat: 0.6, metric: '접근 28% · 평균 체류 19초' },
      { label: '안쪽 매대', heat: 0.25, metric: '접근 9% · 평균 체류 6초 — 사각지대' },
    ],
  },
  en: {
    eyebrow: 'Zone interest heatmap', heading: 'The floor shows which aisle sells',
    metricLabel: 'Interest (approach · dwell)', hot: 'HOT', door: 'Entrance', legendLow: 'Low', legendHigh: 'High',
    zones: [
      { label: 'Entrance', heat: 0.45, metric: '62% pass-by · 8s avg dwell' },
      { label: 'Health · beauty', heat: 0.95, metric: '41% approach · 34s avg dwell — top interest' },
      { label: 'Counter', heat: 0.6, metric: '28% approach · 19s avg dwell' },
      { label: 'Back aisle', heat: 0.25, metric: '9% approach · 6s avg dwell — blind spot' },
    ],
  },
  jp: {
    eyebrow: 'ゾーン別関心ヒートマップ', heading: 'どの棚が売れるか、フロアが教える',
    metricLabel: '関心度 (接近 · 滞在)', hot: 'HOT', door: '入口', legendLow: '低', legendHigh: '高',
    zones: [
      { label: '入口部', heat: 0.45, metric: '通過62% · 平均滞在8秒' },
      { label: 'ヘルス · ビューティ', heat: 0.95, metric: '接近41% · 平均滞在34秒 — 最多関心' },
      { label: 'カウンター', heat: 0.6, metric: '接近28% · 平均滞在19秒' },
      { label: '奥の棚', heat: 0.25, metric: '接近9% · 平均滞在6秒 — 死角' },
    ],
  },
};

// Top-down floor-plan geometry (viewBox 320×252). Index order matches DRUG[].zones:
// [진입부(입구 앞 스트립), 헬스·뷰티(중앙 대형 = HOT), 카운터(전면 우측), 안쪽 매대(후면 사각지대)]
const DRUG_GEO = [
  { x: 20, y: 196, w: 148, h: 28 }, // 0 진입부
  { x: 20, y: 84, w: 132, h: 98 },  // 1 헬스·뷰티 (HOT)
  { x: 208, y: 140, w: 92, h: 64 }, // 2 카운터
  { x: 176, y: 22, w: 124, h: 82 }, // 3 안쪽 매대
] as const;

function DrugStoreDemo({ locale }: { locale: Locale }) {
  const t = DRUG[locale];
  const hottest = t.zones.reduce((m, z, i) => (z.heat > t.zones[m].heat ? i : m), 0);
  const [sel, setSel] = useState(hottest);
  const zone = t.zones[sel];

  return (
    <Frame head={t}>
      <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-card">
        {/* ①6-2: 추상 존 버튼 → 매장 평면도(top-down) + 구역별 발열 오버레이 */}
        <div className="grid gap-6 sm:grid-cols-[1.5fr_1fr] sm:items-center">
          {/* floor-plan heatmap */}
          <div>
            <svg viewBox="0 0 320 252" className="w-full h-auto" role="group" aria-label={t.metricLabel}>
              {/* store outline */}
              <rect x="8" y="8" width="304" height="224" rx="14" fill="white" stroke="#e5e7eb" strokeWidth="2" />
              {/* floor grid */}
              <g stroke="#f1f5f9" strokeWidth="1" aria-hidden="true">
                {[48, 88, 128, 168, 208, 248, 288].map((x) => (
                  <line key={`v${x}`} x1={x} y1="10" x2={x} y2="230" />
                ))}
                {[48, 88, 128, 168, 208].map((y) => (
                  <line key={`h${y}`} x1="10" y1={y} x2="310" y2={y} />
                ))}
              </g>
              {/* door opening on the bottom wall + inward marker */}
              <rect x="94" y="226" width="48" height="12" fill="white" aria-hidden="true" />
              <line x1="94" y1="232" x2="94" y2="240" stroke="#cbd5e1" strokeWidth="2" aria-hidden="true" />
              <line x1="142" y1="232" x2="142" y2="240" stroke="#cbd5e1" strokeWidth="2" aria-hidden="true" />
              <path d="M112 220 l6 8 l6 -8" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" />
              <text x="118" y="248" textAnchor="middle" fontSize="10" fontWeight={600} fill="#94a3b8" aria-hidden="true">{t.door}</text>

              {/* zones — heat by fill opacity, keyboard-accessible */}
              {t.zones.map((z, i) => {
                const g = DRUG_GEO[i];
                const op = 0.12 + z.heat * 0.7;
                const seld = sel === i;
                const cx = g.x + g.w / 2;
                const cy = g.y + g.h / 2;
                return (
                  <g
                    key={z.label}
                    role="button"
                    tabIndex={0}
                    aria-pressed={seld}
                    aria-label={`${z.label}: ${z.metric}`}
                    onClick={() => setSel(i)}
                    onFocus={() => setSel(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(i); }
                    }}
                    className="cursor-pointer"
                  >
                    <rect
                      x={g.x}
                      y={g.y}
                      width={g.w}
                      height={g.h}
                      rx="10"
                      fill={`rgb(var(--primary-rgb) / ${op})`}
                      stroke={seld ? 'rgb(var(--primary-rgb))' : 'rgb(var(--primary-rgb) / 0.25)'}
                      strokeWidth={seld ? 3 : 1}
                      className="transition-all duration-300 motion-reduce:transition-none"
                    />
                    {/* 지도 라벨 기법: 어두운 글자 + 흰 후광(paint-order stroke) — 발열도(옅은 흰~중간 파랑)
                        전 구간에서 대비 확보. 흰 글자는 가장 진한 존(op≈0.79)에서도 AA 미달이라 폐기. */}
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={g.h < 40 ? 12 : 13}
                      fontWeight={700}
                      fill="#1f2937"
                      stroke="#ffffff"
                      strokeWidth={3}
                      paintOrder="stroke"
                      strokeLinejoin="round"
                      className="pointer-events-none select-none"
                    >
                      {z.label}
                    </text>
                    {i === hottest && (
                      <g pointerEvents="none" aria-hidden="true">
                        <rect x={g.x + g.w - 40} y={g.y + 7} width="32" height="15" rx="7" fill="#ffffff" opacity="0.92" />
                        <text x={g.x + g.w - 24} y={g.y + 15} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontWeight={800} fill="rgb(var(--primary-rgb))">{t.hot}</text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* heat legend */}
            <div className="mt-3 flex items-center gap-2 text-2xs font-medium text-gray-500">
              <span>{t.legendLow}</span>
              <span
                className="h-2 flex-1 rounded-full"
                style={{ background: 'linear-gradient(90deg, rgb(var(--primary-rgb) / 0.12), rgb(var(--primary-rgb) / 0.85))' }}
                aria-hidden="true"
              />
              <span>{t.legendHigh}</span>
            </div>
          </div>

          {/* readout */}
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {zone.label}
            </div>
            <p className="text-xs font-medium text-gray-500">{t.metricLabel}</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 leading-relaxed break-keep">{zone.metric}</p>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-gray-400">{CAPTION[locale]}</p>
    </Frame>
  );
}

/* ─────────────────────────── large-space (MTMC) ─────────────────────────── */

const LARGE: Record<Locale, Head & {
  separate: string; merged: string;
  separateNote: string; mergedNote: string;
  camLabel: string; coordLabel: string; unknown: string;
  assembledLabel: string; brokenTag: string; oneTag: string;
}> = {
  ko: {
    eyebrow: 'MTMC 멀티카메라 추적', heading: '여러 대의 카메라가, 하나의 동선이 됩니다',
    separate: '카메라별', merged: 'MTMC 통합',
    separateNote: '카메라마다 동선이 끊겨, 같은 사람인지 알 수 없습니다',
    mergedNote: '끊긴 세 조각이 한 좌표로 — 매장 전체를 관통하는 하나의 동선',
    camLabel: '카메라', coordLabel: '동일인 · 통합 좌표', unknown: '동일인 여부 불명',
    assembledLabel: '매장 전체 좌표계', brokenTag: '끊긴 동선 3개', oneTag: '이어진 동선 1개',
  },
  en: {
    eyebrow: 'MTMC multi-camera tracking', heading: 'Many cameras become one path',
    separate: 'Per camera', merged: 'MTMC merged',
    separateNote: 'The path breaks at each camera — same person unknown',
    mergedNote: 'Three broken fragments into one coordinate — a single path across the store',
    camLabel: 'Camera', coordLabel: 'Same person · merged coord', unknown: 'Identity unresolved',
    assembledLabel: 'Store-wide coordinate', brokenTag: '3 broken paths', oneTag: '1 continuous path',
  },
  jp: {
    eyebrow: 'MTMCマルチカメラ追跡', heading: '複数のカメラが、一つの動線に',
    separate: 'カメラ別', merged: 'MTMC統合',
    separateNote: 'カメラごとに動線が途切れ、同一人物か不明',
    mergedNote: '途切れた三つの断片が一座標に — 店舗全体を貫く一つの動線',
    camLabel: 'カメラ', coordLabel: '同一人物 · 統合座標', unknown: '同一人物か不明',
    assembledLabel: '店舗全体の座標系', brokenTag: '途切れた動線3本', oneTag: 'つながった動線1本',
  },
};

// ①7-1: 카메라별로 잡히는 동선 '조각'(polyline) — 점(dot)이 아니라 궤적. 각 카메라 로컬 %좌표.
const CAM_FRAG = ['18,68 44,38 74,56', '22,58 52,30 82,52', '26,54 56,74 84,40'];

// 조립된 매장 전체 동선(viewBox 360×120). 분리 모드=끊긴 3조각(간격+?), 통합 모드=이어진 1궤적.
const BROKEN_SEGS = [
  '24,86 58,52 90,71',
  '102,73 142,42 190,64 222,46',
  '234,45 276,70 312,40 340,62',
];
const ONE_PATH = '24,86 58,52 96,72 142,42 190,64 228,45 276,70 312,40 340,62';
const GAP_MARKS = [{ x: 96, y: 60 }, { x: 228, y: 34 }]; // '?' at the two disconnections

function LargeSpaceDemo({ locale }: { locale: Locale }) {
  const t = LARGE[locale];
  const [merged, setMerged] = useState(true);

  return (
    <Frame head={t}>
      <div className="rounded-3xl border border-white/10 bg-slate-950 p-6 sm:p-8">
        <div className="mx-auto mb-6 inline-flex rounded-full border border-white/15 bg-white/5 p-1 w-full max-w-xs">
          {([[false, t.separate], [true, t.merged]] as const).map(([v, label]) => (
            <button
              key={label}
              type="button"
              aria-pressed={merged === v}
              onClick={() => setMerged(v)}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                merged === v ? (v ? 'bg-primary text-white shadow-sm' : 'bg-white text-slate-900 shadow-sm') : 'text-slate-400'
              }`}
            >
              {v && <Sparkles className="h-4 w-4" aria-hidden="true" />}
              {label}
            </button>
          ))}
        </div>

        {/* per-camera views — each holds ITS fragment of the path (not a single dot) */}
        <div className="grid gap-3 sm:grid-cols-3">
          {CAM_FRAG.map((pts, i) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-slate-900">
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '24px 24px' }}
                aria-hidden="true"
              />
              <span className="absolute left-2 top-2 z-10 inline-flex items-center gap-1 rounded bg-black/40 px-1.5 py-0.5 text-2xs font-medium text-white/70">
                <Cctv className="h-3 w-3" aria-hidden="true" />
                {t.camLabel} {i + 1}
              </span>
              {/* this camera's captured trajectory fragment */}
              <svg viewBox="0 0 100 75" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <polyline
                  points={pts}
                  fill="none"
                  stroke={merged ? 'rgb(var(--primary-rgb))' : '#fbbf24'}
                  strokeWidth={merged ? 3 : 3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={merged ? undefined : '5 5'}
                  className="transition-colors duration-300 motion-reduce:transition-none"
                />
              </svg>
              {merged && (
                <span className="absolute bottom-2 right-2 z-10 rounded bg-primary/20 px-1.5 py-0.5 text-2xs font-semibold text-primary-light">#1</span>
              )}
            </div>
          ))}
        </div>

        {/* ①7-1 핵심 증명: 조립된 매장 전체 동선 — 끊긴 3조각 → 이어진 1궤적 */}
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <span className="text-2xs font-semibold uppercase tracking-wider text-slate-400">{t.assembledLabel}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-2xs font-bold ${merged ? 'bg-primary/20 text-primary-light' : 'bg-amber-400/15 text-amber-300'}`}>
              {merged ? t.oneTag : t.brokenTag}
            </span>
          </div>
          <svg viewBox="0 0 360 120" className="w-full h-auto" role="img" aria-label={merged ? t.mergedNote : t.separateNote}>
            <defs>
              <marker id="mtmc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill="rgb(var(--primary-rgb))" />
              </marker>
            </defs>
            {merged ? (
              <>
                <polyline
                  points={ONE_PATH}
                  fill="none"
                  stroke="rgb(var(--primary-rgb))"
                  strokeWidth={3.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  markerEnd="url(#mtmc-arrow)"
                />
                <circle cx="24" cy="86" r="4.5" fill="rgb(var(--primary-rgb))" />
              </>
            ) : (
              <>
                {BROKEN_SEGS.map((seg, i) => (
                  <polyline
                    key={i}
                    points={seg}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth={3.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="6 6"
                    opacity={0.9}
                  />
                ))}
                {GAP_MARKS.map((g, i) => (
                  <text key={i} x={g.x} y={g.y} textAnchor="middle" fontSize="16" fontWeight={800} fill="#fcd34d">?</text>
                ))}
              </>
            )}
          </svg>
        </div>

        {/* verdict strip */}
        <div className={`mt-4 rounded-2xl border p-4 transition-colors ${merged ? 'border-primary/30 bg-primary/10' : 'border-white/10 bg-white/5'}`}>
          {merged ? (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {t.coordLabel} (x, y)
              </span>
              <span className="text-sm text-slate-200 break-keep">{t.mergedNote}</span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="rounded-full bg-amber-400/15 px-3 py-1 text-xs font-bold text-amber-300">? {t.unknown}</span>
              <span className="text-sm text-slate-300 break-keep">{t.separateNote}</span>
            </div>
          )}
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-gray-400">{CAPTION[locale]}</p>
    </Frame>
  );
}

/* ─────────────────────────── dispatcher ─────────────────────────── */

export default function CategoryHeroDemo({ category, locale }: { category: string; locale: Locale }) {
  switch (category) {
    case 'food-beverage':
      return <FoodBeverageDemo locale={locale} />;
    case 'drug-store':
      return <DrugStoreDemo locale={locale} />;
    case 'large-space':
      return <LargeSpaceDemo locale={locale} />;
    default:
      return null;
  }
}
