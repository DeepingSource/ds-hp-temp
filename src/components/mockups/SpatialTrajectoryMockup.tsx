'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useMockupLoop } from '@/hooks/useMockupLoop';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import MockupBadge from './MockupBadge';
import SaaiHeader from './SaaiHeader';
import type { Locale } from '@/lib/i18n';

interface Props {
  active?: boolean;
  locale?: Locale;
  className?: string;
}

type PromiseCard = { n: string; title: string; body: string };

type Copy = {
  eyebrow: string;
  heading: string;
  lead: string;
  steps: [string, string, string];
  idLabel: string;
  cams: [string, string, string];
  cards: [PromiseCard, PromiseCard, PromiseCard];
  emphasized: string;
};

const COPY: Record<Locale, Copy> = {
  ko: {
    eyebrow: 'Spatial AI · MTMC Tracking',
    heading: '카메라가 여러 대여도, 같은 사람을 연속 추적합니다 — 얼굴 없이',
    lead: '대형마트·쇼핑몰·물류 센터에서 한 사람의 동선을 여러 카메라에 걸쳐 추적해야 합니다. 그러나 얼굴 인식 없이. MTMC가 이 두 요구를 동시에 풉니다.',
    steps: ['픽셀', '카메라', '공간 좌표'],
    idLabel: 'ID 7',
    cams: ['CAM 01', 'CAM 02', 'CAM 03'],
    cards: [
      { n: '01', title: 'Multi-Target Multi-Camera', body: '여러 카메라가 같은 사람을 연속으로 인식 — 공간 크기에 무관하게 작동합니다' },
      { n: '02', title: 'Re-Identification (얼굴 아님)', body: '자세·옷·동선 패턴의 익명화 특징으로 매칭 — 개인을 식별하지 않고도 같은 사람임을 인식합니다' },
      { n: '03', title: 'Any Environment', body: '작은 부티크부터 대형 물류 창고까지 — 카메라 수·공간 크기·레이아웃에 관계없이 같은 골격이 작동합니다' },
    ],
    emphasized: '핵심 차별점',
  },
  en: {
    eyebrow: 'Spatial AI · MTMC Tracking',
    heading: 'Track the same person across many cameras — without faces',
    lead: 'In hypermarkets, malls, and logistics centers, one person must be tracked across many cameras — yet without face recognition. MTMC solves both at once.',
    steps: ['Pixel', 'Camera', 'Spatial coords'],
    idLabel: 'ID 7',
    cams: ['CAM 01', 'CAM 02', 'CAM 03'],
    cards: [
      { n: '01', title: 'Multi-Target Multi-Camera', body: 'Many cameras recognize the same person continuously — regardless of space size' },
      { n: '02', title: 'Re-Identification (not faces)', body: 'Matched on anonymized cues — pose, clothing, motion — recognizing the same person without identifying them' },
      { n: '03', title: 'Any Environment', body: 'From a small boutique to a vast warehouse — the same skeleton works across any camera count, size, or layout' },
    ],
    emphasized: 'Key differentiator',
  },
  jp: {
    eyebrow: 'Spatial AI · MTMC Tracking',
    heading: 'カメラが複数あっても、同一人物を連続追跡します — 顔なしで',
    lead: '大型スーパー・ショッピングモール・物流センターでは、一人の動線を複数のカメラにまたがって追跡する必要があります。しかし顔認識なしで。MTMCがこの二つを同時に解決します。',
    steps: ['ピクセル', 'カメラ', '空間座標'],
    idLabel: 'ID 7',
    cams: ['CAM 01', 'CAM 02', 'CAM 03'],
    cards: [
      { n: '01', title: 'Multi-Target Multi-Camera', body: '複数のカメラが同一人物を連続して認識します — 空間の大きさに左右されません' },
      { n: '02', title: 'Re-Identification (顔ではありません)', body: '姿勢・服装・動線パターンの匿名化特徴で照合します — 個人を特定せずに同一人物だと認識します' },
      { n: '03', title: 'Any Environment', body: '小さなブティックから大型物流倉庫まで — カメラ数・空間の広さ・レイアウトを問わず同じ骨格が機能します' },
    ],
    emphasized: '核心的な差別化点',
  },
};

// Trajectory: a single dotted path running across all three camera tiles.
// SVG space 0 0 300 70 (matches the 3-tile row). The point moves left→right.
const PATH_POINTS = [
  { x: 18, y: 46 },
  { x: 50, y: 30 },
  { x: 82, y: 40 }, // CAM 01 region (0–100)
  { x: 120, y: 34 },
  { x: 150, y: 48 },
  { x: 182, y: 30 }, // CAM 02 region (100–200)
  { x: 220, y: 42 },
  { x: 252, y: 30 },
  { x: 282, y: 44 }, // CAM 03 region (200–300)
];

const PATH_D = PATH_POINTS.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ');

// Vertical mobile variant: same person walks top→bottom through 3 stacked tiles.
// SVG space 0 0 100 230. Tiles occupy y: 0–70, 80–150, 160–230 (10-unit gaps).
// One point per PATH_POINTS index so the two layouts stay in lockstep.
const VPATH_POINTS = [
  { x: 46, y: 18 },
  { x: 30, y: 50 },
  { x: 40, y: 64 }, // CAM 01 region (0–76)
  { x: 34, y: 100 },
  { x: 48, y: 118 },
  { x: 30, y: 142 }, // CAM 02 region (77–153)
  { x: 42, y: 178 },
  { x: 30, y: 200 },
  { x: 44, y: 222 }, // CAM 03 region (154–230)
];

const VPATH_D = VPATH_POINTS.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ');

// Vertical crowd (static gray blobs) seeded across the three stacked tiles.
const VCROWD = [
  { cx: 58, cy: 30 },
  { cx: 24, cy: 56 },
  { cx: 62, cy: 108 },
  { cx: 26, cy: 134 },
  { cx: 58, cy: 188 },
  { cx: 24, cy: 210 },
];

// Resting frame index (used for reduced-motion / non-visible) — middle camera.
const RESTING = 4;

function camOfIndex(i: number) {
  return Math.min(2, Math.floor(PATH_POINTS[i].x / 100));
}

// One anonymized "person" — a rounded gray abstract shape (mosaic tone). No face.
function AnonFigure({ cx, cy, dim }: { cx: number; cy: number; dim?: boolean }) {
  const op = dim ? 0.4 : 0.9;
  return (
    <g aria-hidden="true" opacity={op}>
      {/* head: rounded gray blob */}
      <circle cx={cx} cy={cy} r="6.5" fill="#4b5563" />
      {/* mosaic cells over head (grays only — no color, no features) */}
      {[0, 1, 2].flatMap((row) =>
        [0, 1, 2].map((col) => {
          const cell = (6.5 * 2) / 3;
          const px = cx - 6.5 + col * cell;
          const py = cy - 6.5 + row * cell;
          const shade = ['#374151', '#4b5563', '#6b7280'][(row + col) % 3];
          return (
            <rect
              key={`${row}-${col}`}
              x={px}
              y={py}
              width={cell - 0.5}
              height={cell - 0.5}
              rx="1"
              fill={shade}
              opacity="0.85"
            />
          );
        })
      )}
      {/* body: rounded gray rect */}
      <rect x={cx - 5} y={cy + 6} width="10" height="14" rx="4" fill="#374151" />
    </g>
  );
}

// Static anonymized figures seeded across the three tiles (the "crowd").
const CROWD = [
  { cx: 35, cy: 50 },
  { cx: 70, cy: 44 },
  { cx: 135, cy: 52 },
  { cx: 170, cy: 42 },
  { cx: 235, cy: 50 },
  { cx: 270, cy: 44 },
];

export default function SpatialTrajectoryMockup({
  active = true,
  locale = 'en',
  className = '',
}: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const t = COPY[locale] ?? COPY.en;
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  // 3-step label loop: Pixel → Camera → Spatial coords
  const { step: labelStep, hoverProps } = useMockupLoop({
    steps: 3,
    interval: 1600,
    active: isVisible && active,
    pauseOnHover: true,
  });

  // The tracked point walks along the 9 path points (loops). One step ≈ a hop.
  const { step: pathStep } = useMockupLoop({
    steps: PATH_POINTS.length,
    interval: 900,
    active: isVisible && active,
    pauseOnHover: true,
  });

  const animate = isVisible && active && !reducedMotion;
  const idx = animate ? pathStep : RESTING;
  const point = PATH_POINTS[idx];
  const vpoint = VPATH_POINTS[idx];
  const activeCam = camOfIndex(idx);
  const activeLabel = reducedMotion ? 1 : labelStep;

  return (
    <div
      ref={ref}
      {...hoverProps}
      className={`relative rounded-2xl bg-slate-950 ring-1 ring-white/10 p-5 sm:p-7 text-gray-200 overflow-hidden ${className}`}
    >
      <MockupBadge locale={locale} />

      {/* Header */}
      <SaaiHeader name="spatial ai" tone="dark" className="mb-1.5" />
      <p className="font-mono text-2xs tracking-wider text-primary-light/90 uppercase mb-2">
        {t.eyebrow}
      </p>
      <h2 className="text-lg sm:text-xl font-bold text-white leading-snug mb-2">
        {t.heading}
      </h2>
      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-5 max-w-2xl">
        {t.lead}
      </p>

      {/* Step pipeline: Pixel → Camera → Spatial coords */}
      <div className="flex items-center gap-2 mb-4" aria-hidden="true">
        {t.steps.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <motion.span
              animate={{
                color: activeLabel === i ? '#376AE2' : '#94a3b8',
                opacity: activeLabel === i ? 1 : 0.6,
              }}
              transition={{ duration: 0.3 }}
              className={`font-mono text-2xs sm:text-xs px-2 py-1 rounded-md border ${
                activeLabel === i
                  ? 'border-primary/60 bg-primary/10'
                  : 'border-white/10 bg-white/[0.02]'
              }`}
            >
              {label}
            </motion.span>
            {i < t.steps.length - 1 && (
              <span className="text-gray-600 text-xs">→</span>
            )}
          </div>
        ))}
      </div>

      {/* Camera row with continuous trajectory */}
      <div className="relative rounded-xl bg-black/40 ring-1 ring-white/10 p-3">
        {/* Camera tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {t.cams.map((cam, i) => (
            <div
              key={cam}
              className={`relative aspect-[10/7] rounded-lg overflow-hidden bg-slate-900 ring-1 transition-colors duration-300 ${
                activeCam === i ? 'ring-primary/70' : 'ring-white/10'
              }`}
            >
              {/* faint scanlines */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 4px)',
                }}
              />
              <span className="absolute top-1 left-1.5 font-mono text-[9px] text-primary-light/90">
                {cam}
              </span>
              <span className="absolute top-1 right-1.5 font-mono text-[9px] text-gray-500">
                14:23:0{i + 5}
              </span>
              {/* live dot when active */}
              {activeCam === i && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 right-1.5 flex items-center gap-1 font-mono text-4xs text-gray-400"
                >
                  <span className="w-1 h-1 rounded-full bg-gray-400 animate-pulse motion-reduce:animate-none" />
                  REC
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Trajectory overlay — single SVG spanning the whole row (desktop, horizontal) */}
        <svg
          viewBox="0 0 300 70"
          preserveAspectRatio="xMidYMid meet"
          className="pointer-events-none absolute inset-3 hidden sm:block"
          style={{ width: 'calc(100% - 1.5rem)', height: 'calc(100% - 1.5rem)' }}
          role="img"
          aria-labelledby="st-title st-desc"
        >
          <title id="st-title">
            Multi-camera trajectory tracking
          </title>
          <desc id="st-desc">
            One anonymized person, shown as a gray abstract shape, is tracked by a
            shared ID along a dotted path crossing three camera views without using
            facial recognition.
          </desc>

          {/* anonymized crowd (static gray blobs) */}
          {CROWD.map((c, i) => (
            <AnonFigure key={i} cx={c.cx} cy={c.cy} dim />
          ))}

          {/* dotted trajectory across all three cams */}
          <path
            d={PATH_D}
            fill="none"
            stroke="#376AE2"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* the tracked person at current position (anonymized, highlighted) */}
          <AnonFigure cx={point.x} cy={point.y} />

          {/* tracking ring + shared ID label traveling with the point */}
          <g aria-hidden="true">
            <rect
              x={point.x - 9}
              y={point.y - 11}
              width="18"
              height="32"
              rx="3"
              fill="none"
              stroke="#376AE2"
              strokeWidth="1"
              strokeDasharray="2 1.5"
            />
            <rect
              x={point.x - 8}
              y={point.y - 18}
              width="16"
              height="6"
              rx="1.5"
              fill="#376AE2"
            />
            <text
              x={point.x}
              y={point.y - 13.5}
              textAnchor="middle"
              fontSize="4"
              fontFamily="monospace"
              fill="#ffffff"
            >
              {t.idLabel}
            </text>
          </g>
        </svg>

        {/* Trajectory overlay — vertical SVG for mobile (stacked tiles) */}
        <svg
          viewBox="0 0 100 230"
          preserveAspectRatio="xMidYMid meet"
          className="pointer-events-none absolute inset-3 block sm:hidden"
          style={{ width: 'calc(100% - 1.5rem)', height: 'calc(100% - 1.5rem)' }}
          role="img"
          aria-labelledby="stv-title stv-desc"
        >
          <title id="stv-title">Multi-camera trajectory tracking</title>
          <desc id="stv-desc">
            One anonymized person, shown as a gray abstract shape, is tracked by a
            shared ID along a dotted path crossing three stacked camera views without
            using facial recognition.
          </desc>

          {/* anonymized crowd (static gray blobs) */}
          {VCROWD.map((c, i) => (
            <AnonFigure key={i} cx={c.cx} cy={c.cy} dim />
          ))}

          {/* dotted trajectory down all three cams */}
          <path
            d={VPATH_D}
            fill="none"
            stroke="#376AE2"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* the tracked person at current position (anonymized, highlighted) */}
          <AnonFigure cx={vpoint.x} cy={vpoint.y} />

          {/* tracking ring + shared ID label traveling with the point */}
          <g aria-hidden="true">
            <rect
              x={vpoint.x - 9}
              y={vpoint.y - 11}
              width="18"
              height="32"
              rx="3"
              fill="none"
              stroke="#376AE2"
              strokeWidth="1"
              strokeDasharray="2 1.5"
            />
            <rect
              x={vpoint.x - 8}
              y={vpoint.y - 18}
              width="16"
              height="6"
              rx="1.5"
              fill="#376AE2"
            />
            <text
              x={vpoint.x}
              y={vpoint.y - 13.5}
              textAnchor="middle"
              fontSize="4"
              fontFamily="monospace"
              fill="#ffffff"
            >
              {t.idLabel}
            </text>
          </g>
        </svg>
      </div>

      {/* Promise cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
        {t.cards.map((card, i) => {
          const emph = i === 1; // card 02 — key differentiator
          return (
            <div
              key={card.n}
              className={`relative rounded-xl p-4 transition-colors ${
                emph
                  ? 'bg-primary/10 ring-2 ring-primary/60 shadow-[0_0_24px_-6px_rgba(55,106,226,0.5)]'
                  : 'bg-white/[0.03] ring-1 ring-white/10'
              }`}
            >
              {emph && (
                <span className="absolute -top-2 left-3 text-[9px] font-bold uppercase tracking-wide bg-primary text-white px-1.5 py-0.5 rounded">
                  {t.emphasized}
                </span>
              )}
              <div className="flex items-baseline gap-2 mb-1.5">
                <span
                  className={`font-mono text-xs ${emph ? 'text-primary-light' : 'text-gray-500'}`}
                >
                  {card.n}
                </span>
                <h3
                  className={`text-sm font-medium leading-tight ${
                    emph ? 'text-white' : 'text-gray-200'
                  }`}
                >
                  {card.title}
                </h3>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  emph ? 'text-gray-300' : 'text-gray-400'
                }`}
              >
                {card.body}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
