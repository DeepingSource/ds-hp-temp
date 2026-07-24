'use client';

import { motion } from 'framer-motion';
import MockupBadge from './MockupBadge';
import SaaiHeader from './SaaiHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useMockupLoop } from '@/hooks/useMockupLoop';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { Locale } from '@/lib/i18n';
import { CATALOG_MODELS, MODEL_STAGES, MODEL_PROMISE } from '@/data/models';
import type { ModelStage } from '@/data/models';

// Overlay kinds mirror CatalogModel.overlay in @/data/models (SOT). 'path' = trajectory.
type OverlayKind = 'mosaic' | 'plate' | 'bbox' | 'pose' | 'reid' | 'path' | 'count' | 'dwell' | 'shelf';
type Product = 'Insight' | 'Care' | 'Agent' | 'SAAI';

const STEPS = CATALOG_MODELS.length;

type Copy = {
  title: string;
  sub: string;
  caption: string;
  colModel: string;
  colStatus: string;
  colInput: string;
  colOutput: string;
  colProduct: string;
  stageLabels: Record<ModelStage, string>;
  liveLabel: string;
  overlayLabels: Record<OverlayKind, string>;
};

const COPY: Record<Locale, Copy> = {
  ko: {
    title: '비전 모델 카탈로그',
    sub: `${CATALOG_MODELS.length}개 모델 · 라이브 CCTV 오버레이`,
    caption: '모델 카탈로그와 선택된 모델의 CCTV 오버레이',
    colModel: '모델명',
    colStatus: '상태',
    colInput: '입력',
    colOutput: '출력',
    colProduct: '연결 제품',
    stageLabels: { Live: 'Live', Building: '준비 중', Planned: '예정' },
    liveLabel: '라이브 오버레이',
    overlayLabels: {
      mosaic: '얼굴 모자이크', plate: '번호판 마스킹', bbox: '사람 검출',
      pose: '자세 추정', reid: '재식별 매칭', path: '이동 경로',
      count: '인원 집계', dwell: '체류 시간', shelf: '진열 공백 감지',
    },
  },
  en: {
    title: 'Vision model catalog',
    sub: `${CATALOG_MODELS.length} models · live CCTV overlay`,
    caption: 'Model catalog and the CCTV overlay for the selected model',
    colModel: 'Model',
    colStatus: 'Status',
    colInput: 'Input',
    colOutput: 'Output',
    colProduct: 'Product',
    stageLabels: { Live: 'Live', Building: 'Coming soon', Planned: 'Planned' },
    liveLabel: 'Live overlay',
    overlayLabels: {
      mosaic: 'Face mosaic', plate: 'Plate masking', bbox: 'Person detect',
      pose: 'Pose skeleton', reid: 'Re-ID match', path: 'Trajectory path',
      count: 'People count', dwell: 'Dwell time', shelf: 'Shelf vacancy',
    },
  },
  jp: {
    title: 'ビジョンモデルカタログ',
    sub: `${CATALOG_MODELS.length}モデル · ライブCCTVオーバーレイ`,
    caption: 'モデルカタログと選択モデルのCCTVオーバーレイ',
    colModel: 'モデル名',
    colStatus: 'ステータス',
    colInput: '入力',
    colOutput: '出力',
    colProduct: '連携製品',
    stageLabels: { Live: 'Live', Building: '準備中', Planned: '予定' },
    liveLabel: 'ライブオーバーレイ',
    overlayLabels: {
      mosaic: '顔モザイク', plate: 'ナンバーマスキング', bbox: '人物検出',
      pose: '姿勢推定', reid: '再識別マッチング', path: '移動経路',
      count: '人数集計', dwell: '滞在時間', shelf: '陳列空き検出',
    },
  },
};

const productStyle: Record<Product, string> = {
  Insight: 'bg-primary-lighter text-primary',
  Care: 'bg-emerald-50 text-emerald-700',
  Agent: 'bg-amber-50 text-amber-700',
  SAAI: 'bg-violet-50 text-violet-700',
};

// Status badge (SOT: MODEL_STAGES). Two classes shown now — Live(=제공 가용) + 준비 중 —
// aligned to the catalog: Live=primary tone, Building/Planned=gray (technology_models §1·§3).
const stageStyle: Record<ModelStage, string> = {
  Live: 'bg-primary-lighter text-primary',
  Building: 'bg-gray-100 text-gray-500',
  Planned: 'bg-gray-100 text-gray-500',
};

// People figures in SVG space 0 0 100 75 (원래 AnonymizationMockup 레이아웃 미러 — 해당 목업은 D10으로 _archive).
const figures = [
  { cx: 22, cy: 32, r: 5,   bx: 18.5, by: 37.5, bw: 7, bh: 18 },
  { cx: 50, cy: 27, r: 4.5, bx: 46.5, by: 32,   bw: 7, bh: 16 },
  { cx: 76, cy: 34, r: 4,   bx: 72.5, by: 38.5, bw: 7, bh: 15 },
];

const mosaicPalette = ['#64748b', '#475569', '#94a3b8', '#cbd5e1', '#334155', '#52606d'];

/** Static dark store scene — gray SVG, no real photo. */
function StoreScene() {
  return (
    <>
      <rect width="100" height="75" fill="#0f172a" />
      <rect x="0" y="58" width="100" height="17" fill="#080d18" />
      <rect x="0" y="16" width="12" height="42" fill="#1e293b" />
      <rect x="88" y="16" width="12" height="42" fill="#1e293b" />
      {/* shelves */}
      <rect x="2" y="20" width="8" height="34" fill="#26384d" />
      <rect x="90" y="20" width="8" height="34" fill="#26384d" />
      {[24, 32, 40, 48].map((y) => (
        <line key={y} x1="2" y1={y} x2="10" y2={y} stroke="#0f172a" strokeWidth="0.6" />
      ))}
      {[24, 32, 40, 48].map((y) => (
        <line key={`r${y}`} x1="90" y1={y} x2="98" y2={y} stroke="#0f172a" strokeWidth="0.6" />
      ))}
      {/* floor perspective */}
      {[18, 36, 54, 72].map((x) => (
        <line key={x} x1={x} y1="75" x2={50} y2="58" stroke="#1e2d3d" strokeWidth="0.5" />
      ))}
    </>
  );
}

interface OverlayProps { kind: OverlayKind; label: string; }

/** Overlay swaps based on the selected model. ≥4 distinct types. */
function Overlay({ kind, label }: OverlayProps) {
  return (
    <svg viewBox="0 0 100 75" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={label}>
      <StoreScene />

      {/* people bodies (always drawn) */}
      {figures.map((f, i) => (
        <rect key={`body-${i}`} x={f.bx} y={f.by} width={f.bw} height={f.bh} rx="1.5" fill="#374151" />
      ))}

      {/* faces — mosaic only hides them */}
      {figures.map((f, i) =>
        kind === 'mosaic' ? (
          <g key={`m-${i}`}>
            {[0, 1, 2].flatMap((row) =>
              [0, 1, 2].map((col) => {
                const cell = (f.r * 2) / 3;
                return (
                  <rect
                    key={`${row}-${col}`}
                    x={f.cx - f.r + col * cell}
                    y={f.cy - f.r + row * cell}
                    width={cell - 0.25}
                    height={cell - 0.25}
                    fill={mosaicPalette[(row * 3 + col + i * 2) % mosaicPalette.length]}
                    opacity="0.9"
                  />
                );
              })
            )}
          </g>
        ) : (
          <circle key={`f-${i}`} cx={f.cx} cy={f.cy} r={f.r} fill="#9ca3af" />
        )
      )}

      {/* bbox / event detection boxes */}
      {kind === 'bbox' &&
        figures.map((f, i) => (
          <g key={`bb-${i}`}>
            <rect
              x={f.bx - 1} y={f.cy - f.r - 1.5}
              width={f.bw + 2} height={f.bh + f.r + 3}
              fill="none" stroke="#376AE2" strokeWidth="0.7"
            />
            <text x={f.bx - 1} y={f.cy - f.r - 2.4} fontSize="2.4" fill="#376AE2" fontFamily="monospace">person</text>
          </g>
        ))}

      {/* license-plate masking — a vehicle plate strip */}
      {kind === 'plate' && (
        <g>
          <rect x="34" y="49" width="32" height="9" rx="1" fill="#26384d" stroke="#3b4d63" strokeWidth="0.5" />
          <rect x="40" y="51" width="20" height="5" fill="#475569" />
          <text x="50" y="55" textAnchor="middle" fontSize="3" fill="#cbd5e1" fontFamily="monospace">▮▮▮▮</text>
          <rect x="39" y="50.5" width="22" height="6" fill="none" stroke="#376AE2" strokeWidth="0.7" strokeDasharray="2 1" />
        </g>
      )}

      {/* pose skeleton */}
      {kind === 'pose' &&
        figures.map((f, i) => {
          const hipY = f.by + f.bh;
          return (
            <g key={`p-${i}`} stroke="#376AE2" strokeWidth="0.7" fill="#376AE2">
              <line x1={f.cx} y1={f.cy + f.r} x2={f.cx} y2={f.by + f.bh * 0.55} />
              <line x1={f.cx} y1={f.by + f.bh * 0.2} x2={f.cx - f.bw * 0.7} y2={f.by + f.bh * 0.45} />
              <line x1={f.cx} y1={f.by + f.bh * 0.2} x2={f.cx + f.bw * 0.7} y2={f.by + f.bh * 0.45} />
              <line x1={f.cx} y1={f.by + f.bh * 0.55} x2={f.cx - 2} y2={hipY} />
              <line x1={f.cx} y1={f.by + f.bh * 0.55} x2={f.cx + 2} y2={hipY} />
              {[
                [f.cx, f.cy], [f.cx, f.by + f.bh * 0.2], [f.cx, f.by + f.bh * 0.55],
                [f.cx - f.bw * 0.7, f.by + f.bh * 0.45], [f.cx + f.bw * 0.7, f.by + f.bh * 0.45],
                [f.cx - 2, hipY], [f.cx + 2, hipY],
              ].map(([x, y], k) => (
                <circle key={k} cx={x} cy={y} r="0.9" />
              ))}
            </g>
          );
        })}

      {/* re-id match — link two figures with an embedding tag */}
      {kind === 'reid' && (
        <g>
          {[figures[0], figures[2]].map((f, i) => (
            <g key={`rid-${i}`}>
              <rect x={f.bx - 1} y={f.cy - f.r - 1.5} width={f.bw + 2} height={f.bh + f.r + 3} fill="none" stroke="#376AE2" strokeWidth="0.7" />
              <text x={f.bx - 1} y={f.cy - f.r - 2.4} fontSize="2.3" fill="#376AE2" fontFamily="monospace">ID#41</text>
            </g>
          ))}
          <line x1={figures[0].cx} y1={figures[0].by} x2={figures[2].cx} y2={figures[2].by} stroke="#376AE2" strokeWidth="0.5" strokeDasharray="1.5 1" />
          <text x="50" y="20" textAnchor="middle" fontSize="2.6" fill="#376AE2" fontFamily="monospace">match 0.97</text>
        </g>
      )}

      {/* trajectory dotted path */}
      {kind === 'path' && (
        <g>
          <path d="M14 70 Q35 50 50 55 T86 30" fill="none" stroke="#376AE2" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
          {[[14, 70], [33, 53], [50, 55], [68, 44], [86, 30]].map(([x, y], k) => (
            <circle key={k} cx={x} cy={y} r="1.2" fill="#376AE2" />
          ))}
          <circle cx="86" cy="30" r="2" fill="none" stroke="#376AE2" strokeWidth="0.6" />
        </g>
      )}

      {/* people count badges */}
      {kind === 'count' &&
        figures.map((f, i) => (
          <g key={`c-${i}`}>
            <rect x={f.bx - 1} y={f.cy - f.r - 1.5} width={f.bw + 2} height={f.bh + f.r + 3} fill="none" stroke="#376AE2" strokeWidth="0.6" />
            <circle cx={f.bx + f.bw + 1} cy={f.cy - f.r} r="2.2" fill="#376AE2" />
            <text x={f.bx + f.bw + 1} y={f.cy - f.r + 1} textAnchor="middle" fontSize="2.6" fill="#fff" fontFamily="monospace">{i + 1}</text>
          </g>
        ))}

      {/* dwell-time heat rings */}
      {kind === 'dwell' &&
        figures.map((f, i) => (
          <g key={`d-${i}`}>
            <ellipse cx={f.cx} cy="62" rx={5 + i * 2} ry={2 + i} fill="#376AE2" opacity={0.18 + i * 0.12} />
            <text x={f.cx} y="63" textAnchor="middle" fontSize="2.4" fill="#9dbcff" fontFamily="monospace">{[12, 48, 90][i]}s</text>
          </g>
        ))}

      {/* shelf-vacancy box on a shelf */}
      {kind === 'shelf' && (
        <g>
          <rect x="2" y="32" width="8" height="8" fill="none" stroke="#376AE2" strokeWidth="0.8" strokeDasharray="2 1" />
          <text x="12" y="37" fontSize="2.6" fill="#376AE2" fontFamily="monospace">vacancy</text>
          <rect x="90" y="40" width="8" height="8" fill="none" stroke="#376AE2" strokeWidth="0.8" strokeDasharray="2 1" />
        </g>
      )}

      {/* timestamp / cam id */}
      <text x="2" y="73" fontSize="3" fill="#22d3ee" fontFamily="monospace">2026-06-05  14:23:07</text>
      <text x="75" y="73" fontSize="3" fill="#22d3ee" fontFamily="monospace">CAM 02</text>
    </svg>
  );
}

interface Props {
  active?: boolean;
  locale?: Locale;
  className?: string;
}

export default function ModelCatalogMockup({ active = true, locale = 'en', className }: Props) {
  const t = COPY[locale] ?? COPY.en;
  const reducedMotion = usePrefersReducedMotion();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { step, hoverProps, goTo } = useMockupLoop({
    steps: STEPS,
    interval: 2500,
    active: isVisible && active,
    pauseOnHover: true,
  });

  const selected = CATALOG_MODELS[step];

  return (
    <div
      ref={ref}
      {...hoverProps}
      className={`relative bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden ${className ?? ''}`}
    >
      <MockupBadge locale={locale} />

      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 bg-slate-50">
        <SaaiHeader name="vision models" tone="light" className="mb-1.5" />
        <h3 className="text-sm font-bold text-gray-900">{t.title}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{t.sub}</p>
      </div>

      <div className="grid lg:grid-cols-[1.25fr_1fr] gap-0">
        {/* LEFT — catalog table */}
        <div className="p-3 sm:p-4 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[420px]">
            <caption className="sr-only">{t.caption}</caption>
            <thead>
              <tr className="text-3xs uppercase tracking-wide text-gray-400">
                <th scope="col" className="py-1.5 pl-2 pr-2 font-medium">{t.colModel}</th>
                <th scope="col" className="py-1.5 px-2 font-medium">{t.colStatus}</th>
                <th scope="col" className="py-1.5 px-2 font-medium">{t.colInput}</th>
                <th scope="col" className="py-1.5 px-2 font-medium">{t.colOutput}</th>
                <th scope="col" className="py-1.5 px-2 font-medium">{t.colProduct}</th>
              </tr>
            </thead>
            <tbody>
              {CATALOG_MODELS.map((m, i) => {
                const isSel = i === step;
                const stage = MODEL_STAGES[m.id];
                return (
                  <tr
                    key={m.id}
                    tabIndex={0}
                    aria-selected={isSel}
                    aria-current={isSel ? 'true' : undefined}
                    onClick={() => goTo(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        goTo(i);
                      }
                    }}
                    className={`cursor-pointer transition-colors border-t border-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${
                      isSel ? 'bg-primary-lighter' : 'hover:bg-slate-50'
                    }`}
                  >
                    <th scope="row" className="py-1.5 pl-2 pr-2 font-normal">
                      <span className="flex items-center gap-1.5">
                        {isSel && !reducedMotion && (
                          <motion.span
                            layoutId="cat-dot"
                            className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                          />
                        )}
                        <code className={`text-2xs font-mono ${isSel ? 'text-primary font-medium' : 'text-gray-800'}`}>
                          {MODEL_PROMISE[m.id][locale]}
                        </code>
                      </span>
                    </th>
                    <td className="py-1.5 px-2">
                      <span
                        className={`inline-block text-[9px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap ${stageStyle[stage]}`}
                      >
                        {t.stageLabels[stage]}
                      </span>
                    </td>
                    <td className="py-1.5 px-2 text-3xs text-gray-500 font-mono whitespace-nowrap">{m.input}</td>
                    <td className="py-1.5 px-2 text-3xs text-gray-500 font-mono whitespace-nowrap">{m.output}</td>
                    <td className="py-1.5 px-2">
                      <span className={`inline-block text-[9px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap ${productStyle[m.product]}`}>
                        {m.product}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* RIGHT — CCTV still + swapping overlay */}
        <div className="p-3 sm:p-4 lg:border-l border-gray-100 flex flex-col gap-2">
          <div className="relative rounded-xl overflow-hidden border border-gray-700 bg-gray-900" style={{ aspectRatio: '4/3' }}>
            <Overlay kind={selected.overlay} label={t.overlayLabels[selected.overlay]} />
            {/* live indicator */}
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/55 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse motion-reduce:animate-none" />
              <span className="text-[9px] font-medium text-white">{t.liveLabel}</span>
            </div>
          </div>

          {/* overlay text label, synced to selected row */}
          <div className="flex items-center justify-between rounded-lg bg-slate-50 border border-gray-100 px-3 py-2">
            <div className="min-w-0">
              <code className="text-2xs font-mono font-medium text-primary">{selected.id}</code>
              <p className="text-2xs text-gray-600 truncate">{t.overlayLabels[selected.overlay]}</p>
            </div>
            <span className={`shrink-0 text-[9px] font-medium px-1.5 py-0.5 rounded-full ${productStyle[selected.product]}`}>
              {selected.product}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
