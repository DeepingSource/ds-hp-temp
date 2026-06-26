import { DoorOpen, Grid3x3, Radar, ClipboardCheck, RotateCw } from 'lucide-react';
import { type Locale } from '@/lib/i18n';

/**
 * OperatingLoopGraphic — the /products hero visual (product-reorg D2, §10.5).
 * The four Tier-1 products as a clockwise cycle around the SAAI hub —
 * count(Measure)→insight(Analyze)→care(Detect)→agent(Act), output feeding back
 * to input. Brand-blue single color + stage icons (no rainbow), Act emphasized.
 * Desktop = circular; mobile = vertical stack. Inline SVG ring, no raster.
 */

type Stage = { no: string; stage: string; name: string; Icon: typeof DoorOpen; emphasis?: boolean };
const STAGES: Stage[] = [
  { no: '01', stage: 'Measure', name: 'store count', Icon: DoorOpen },
  { no: '02', stage: 'Analyze', name: 'store insight', Icon: Grid3x3 },
  { no: '03', stage: 'Detect', name: 'store care', Icon: Radar },
  { no: '04', stage: 'Act', name: 'store agent', Icon: ClipboardCheck, emphasis: true },
];
// desktop ring positions: top → right → bottom → left (clockwise)
const POS = [
  'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'top-1/2 right-0 translate-x-1/2 -translate-y-1/2',
  'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
  'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2',
];

function Node({ s }: { s: Stage }) {
  const { Icon } = s;
  return (
    <div className="flex flex-col items-center gap-1.5 w-32 text-center">
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-card ${
          s.emphasis ? 'ring-2 ring-primary/30 ring-offset-2' : ''
        }`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="text-2xs font-mono font-medium text-gray-400">{s.no} · {s.stage}</span>
      <span className="text-sm font-bold text-gray-900">{s.name}</span>
    </div>
  );
}

export default function OperatingLoopGraphic({ locale, hub, feedback }: { locale: Locale; hub: string; feedback: string }) {
  const label = locale === 'ko'
    ? 'store count·insight·care·agent가 SAAI 허브를 중심으로 시계방향 순환을 이루는 운영 루프'
    : locale === 'jp'
    ? 'store count・insight・care・agentがSAAIハブを中心に時計回りに循環するオペレーションループ'
    : 'DeepingSource operating loop: store count, insight, care and agent as a clockwise cycle around the SAAI hub';

  return (
    <div role="img" aria-label={label}>
      {/* Desktop — circular cycle */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-xl sm:block">
        <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx="50" cy="50" r="33" fill="none" stroke="var(--color-primary, #376AE2)" strokeOpacity="0.25" strokeWidth="0.5" strokeDasharray="1.5 2" />
          {/* clockwise chevrons at the 4 diagonals (tangent direction) */}
          {[
            { x: 73.3, y: 26.7, r: 45 },
            { x: 73.3, y: 73.3, r: 135 },
            { x: 26.7, y: 73.3, r: 225 },
            { x: 26.7, y: 26.7, r: 315 },
          ].map((c, i) => (
            <path
              key={i}
              d="M -2 -2 L 0 0 L -2 2"
              fill="none"
              stroke="var(--color-primary, #376AE2)"
              strokeOpacity="0.5"
              strokeWidth="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform={`translate(${c.x} ${c.y}) rotate(${c.r})`}
            />
          ))}
        </svg>

        {/* center hub */}
        <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-full border border-primary/15 bg-primary-lighter/50 px-4 text-center">
          <p className="text-sm font-bold leading-snug text-gray-900 break-keep">{hub}</p>
          <p className="inline-flex items-center gap-1 text-2xs text-primary break-keep">
            <RotateCw className="h-3 w-3" aria-hidden="true" />
            {feedback}
          </p>
        </div>

        {/* 4 nodes */}
        {STAGES.map((s, i) => (
          <div key={s.name} className={`absolute ${POS[i]}`}>
            <Node s={s} />
          </div>
        ))}
      </div>

      {/* Mobile — vertical stack */}
      <ol className="mx-auto flex max-w-xs flex-col gap-2 sm:hidden">
        {STAGES.map((s) => (
          <li key={s.name} className="flex items-center gap-3 rounded-xl border border-primary/15 bg-primary-lighter/40 px-4 py-3">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white ${s.emphasis ? 'ring-2 ring-primary/30 ring-offset-1' : ''}`}>
              <s.Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-2xs font-mono font-medium text-gray-400">{s.no} · {s.stage}</span>
              <span className="block text-sm font-bold text-gray-900">{s.name}</span>
            </span>
          </li>
        ))}
        <li className="inline-flex items-center justify-center gap-1 pt-1 text-2xs text-primary break-keep">
          <RotateCw className="h-3 w-3" aria-hidden="true" />
          {feedback}
        </li>
      </ol>
    </div>
  );
}
