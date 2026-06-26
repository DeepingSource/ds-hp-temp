'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import MockupBadge from './MockupBadge';
import SaaiHeader from './SaaiHeader';
import { localeHref, type Locale } from '@/lib/i18n';

interface Props {
  active?: boolean;
  locale?: Locale;
  className?: string;
}

type Coordinate = {
  n: string;
  title: string;
  body: string;
};

type Copy = {
  eyebrow: string;
  heading: string;
  lead: string;
  coordinates: Coordinate[];
  cta: string;
  badge: string;
  axes: { anon: string; space: string; ops: string };
  origin: string;
  destinationTag: string;
};

const COPY: Record<Locale, Copy> = {
  ko: {
    eyebrow: 'Vision 2031 — 우리가 가려는 좌표',
    heading: '5년 후, 우리 자리',
    lead: "익명화 · 공간 · 운영의 교집합에서 거의 유일한 위치. 시장이 'Physical AI'를 말할 때 공간 쪽 절반에서 가장 먼저 호명되는 이름.",
    coordinates: [
      {
        n: '01',
        title: '국내 리테일',
        body: "편의점·드럭스토어·카페·무인매장의 '디지털 매장 운영 인프라'",
      },
      {
        n: '02',
        title: '공간 확장',
        body: "공장·물류·시설·병원의 '익명화 공간 AI' 표준 사업자 — 매장 외 매출 비중 30% 이상 목표 (2031)",
      },
      {
        n: '03',
        title: '글로벌',
        body: "일본 파트너십 확장·동남아 진출 완료. '익명화 공간 AI' 카테고리 글로벌 선도 상위 3사",
      },
      {
        n: '04',
        title: '기술 라이선스',
        body: "SEAL이 'Anonymization-as-a-Service' 표준의 하나로 스마트시티·교통·이벤트에 OEM 진입",
      },
      {
        n: '05',
        title: '회사 정체성',
        body: "'Physical AI'를 말할 때 공간 쪽 절반에서 가장 먼저 호명되는 이름",
      },
    ],
    cta: '5년 좌표의 상세 →',
    badge: '예시 화면',
    axes: { anon: '익명화', space: '공간', ops: '운영' },
    origin: '2025 · 오늘',
    destinationTag: '2031 · 거의 유일한 위치',
  },
  en: {
    eyebrow: "Vision 2031 — where we're heading",
    heading: 'Where We Stand, Five Years On',
    lead: "An almost singular position at the intersection of anonymization, space, and operations. When the market says 'Physical AI,' the first name called on the spatial half.",
    coordinates: [
      {
        n: '01',
        title: 'Domestic Retail',
        body: "The 'digital store operations infrastructure' for convenience stores, drugstores, cafés, and unmanned shops.",
      },
      {
        n: '02',
        title: 'Spatial Expansion',
        body: "The standard provider of 'anonymized spatial AI' for factories, logistics, facilities, and hospitals — targeting 30%+ of revenue beyond stores by 2031.",
      },
      {
        n: '03',
        title: 'Global',
        body: "Japan partnership expansion and Southeast Asia entry complete. A top-3 global leader in the 'anonymized spatial AI' category.",
      },
      {
        n: '04',
        title: 'Technology Licensing',
        body: "SEAL enters smart cities, transit, and events via OEM as one of the standards for 'Anonymization-as-a-Service.'",
      },
      {
        n: '05',
        title: 'Company Identity',
        body: "When the market says 'Physical AI,' the first name called on the spatial half.",
      },
    ],
    cta: 'The five-year coordinates in detail →',
    badge: 'Sample screen',
    axes: { anon: 'Anonymization', space: 'Space', ops: 'Operations' },
    origin: '2025 · Today',
    destinationTag: '2031 · An almost singular position',
  },
  jp: {
    eyebrow: 'Vision 2031 — 私たちが目指す座標',
    heading: '5年後、私たちの座標',
    lead: "匿名化・空間・運用の交点における、ほぼ唯一の座標。市場が「Physical AI」を語るとき、空間側の半分で最初に名指しされる名前です。",
    coordinates: [
      {
        n: '01',
        title: '国内リテール',
        body: "コンビニ・ドラッグストア・カフェ・無人店舗の「デジタル店舗運用インフラ」です。",
      },
      {
        n: '02',
        title: '空間拡張',
        body: "工場・物流・施設・病院の「匿名化空間AI」標準事業者 — 店舗外売上比率30%以上を目標 (2031)。",
      },
      {
        n: '03',
        title: 'グローバル',
        body: "日本パートナーシップ拡大・東南アジア進出完了。「匿名化空間AI」カテゴリのグローバル先導トップ3社です。",
      },
      {
        n: '04',
        title: '技術ライセンス',
        body: "SEALが「Anonymization-as-a-Service」標準の一つとして、スマートシティ・交通・イベントへOEM参入します。",
      },
      {
        n: '05',
        title: '会社のアイデンティティ',
        body: "「Physical AI」を語るとき、空間側の半分で最初に名指しされる名前です。",
      },
    ],
    cta: '5年座標の詳細 →',
    badge: 'サンプル画面',
    axes: { anon: '匿名化', space: '空間', ops: '運用' },
    origin: '2025 · 現在',
    destinationTag: '2031 · ほぼ唯一の座標',
  },
};

export default function VisionCoordinatesMockup({
  active = true,
  locale = 'en',
  className = '',
}: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const copy = COPY[locale] ?? COPY.en;
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const animate = active && isVisible && !reducedMotion;

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-surface-dark p-6 text-slate-100 sm:p-8 ${className}`}
    >
      <div className="relative">
        <SaaiHeader name="saai" tone="dark" className="mb-1.5" />
        <div className="mb-1 flex items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-light">
            {copy.eyebrow}
          </p>
          <MockupBadge label={copy.badge} />
        </div>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {copy.heading}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
          {copy.lead}
        </p>

        {/* Positioning map (left) + trajectory rail (right) — make the coordinate metaphor literal */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* PANEL A — positioning map: 익명화·공간·운영 intersection + 2025→2031 trajectory */}
          <div className="relative aspect-[5/4] overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.10]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.6) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <radialGradient id="vc-blob" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                </radialGradient>
              </defs>
              <g style={{ mixBlendMode: 'screen' }}>
                <circle cx="100" cy="72" r="56" fill="url(#vc-blob)" />
                <circle cx="70" cy="124" r="56" fill="rgba(91,134,234,0.45)" />
                <circle cx="130" cy="124" r="56" fill="rgba(255,255,255,0.16)" />
              </g>
              <motion.path
                d="M48 168 C 80 150, 92 130, 100 108"
                fill="none"
                stroke="var(--color-primary-light)"
                strokeWidth="1.5"
                strokeDasharray="3 4"
                initial={animate ? { pathLength: 0 } : false}
                animate={animate ? { pathLength: 1 } : undefined}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />
              <circle cx="48" cy="168" r="3" fill="rgba(255,255,255,0.7)" />
              {animate && (
                <motion.circle
                  cx="100"
                  cy="106"
                  r="10"
                  fill="none"
                  stroke="var(--color-primary)"
                  initial={{ scale: 0.6, opacity: 0.5 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ transformOrigin: '100px 106px' }}
                />
              )}
              <circle cx="100" cy="106" r="6" fill="var(--color-primary)" stroke="rgba(255,255,255,0.8)" />
            </svg>
            <span className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-white/10 px-2 py-0.5 text-2xs text-slate-200 break-keep">{copy.axes.anon}</span>
            <span className="absolute bottom-6 left-4 rounded-full bg-white/10 px-2 py-0.5 text-2xs text-slate-200 break-keep">{copy.axes.space}</span>
            <span className="absolute bottom-6 right-4 rounded-full bg-white/10 px-2 py-0.5 text-2xs text-slate-200 break-keep">{copy.axes.ops}</span>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-primary/15 px-2 py-1 text-2xs font-medium text-primary-light break-keep">{copy.destinationTag}</span>
            <span className="absolute bottom-2 left-4 text-2xs text-slate-400 break-keep">{copy.origin}</span>
          </div>

          {/* PANEL B — trajectory rail: 01→05 stations, 05 is the terminal destination */}
          <div className="relative">
            <div aria-hidden className="absolute bottom-2 left-[15px] top-2 w-px bg-gradient-to-b from-white/15 via-white/10 to-primary/50" />
            <ul className="space-y-5">
              {copy.coordinates.map((c, i) => {
                const last = c.n === '05';
                return (
                  <motion.li
                    key={c.n}
                    variants={cardVariants}
                    initial={animate ? 'hidden' : false}
                    animate={animate ? 'visible' : undefined}
                    transition={{ duration: 0.4, delay: animate ? i * 0.08 : 0 }}
                    className="relative flex gap-4"
                  >
                    <span
                      aria-hidden
                      className={`relative z-10 grid shrink-0 place-items-center rounded-full font-mono tabular-nums ${
                        last
                          ? 'h-9 w-9 bg-primary text-sm text-white ring-4 ring-primary/20'
                          : 'h-8 w-8 border border-white/15 bg-surface-dark text-xs text-slate-400'
                      }`}
                    >
                      {c.n}
                    </span>
                    <div className="pt-0.5">
                      <h3 className={`text-sm break-keep ${last ? 'font-bold text-primary-light' : 'font-medium text-white'}`}>{c.title}</h3>
                      <p className={`mt-1 text-sm leading-relaxed break-keep ${last ? 'text-slate-300' : 'text-slate-400'}`}>{c.body}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* CTA — subtle light/blue text link (dark surface) */}
        <div className="mt-8">
          <a
            href={localeHref(locale, '/company')}
            className="inline-flex items-center text-sm font-medium text-primary-light underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {copy.cta}
          </a>
        </div>
      </div>
    </div>
  );
}
