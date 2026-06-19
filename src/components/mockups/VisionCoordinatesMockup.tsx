'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import MockupBadge from './MockupBadge';
import SaaiHeader from './SaaiHeader';
import type { Locale } from '@/lib/i18n';

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
        body: "공장·물류·시설·병원의 '익명화 공간 AI' 표준 사업자 — 매장 외 매출 30%+",
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
        body: "The standard provider of 'anonymized spatial AI' for factories, logistics, facilities, and hospitals — 30%+ of revenue beyond stores.",
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
        body: "工場・物流・施設・病院の「匿名化空間AI」標準事業者 — 店舗外売上30%以上です。",
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

  // First four cards live in the grid; card 05 is the conclusion (last on mobile).
  const gridCards = copy.coordinates.slice(0, 4);
  const conclusion = copy.coordinates[4];

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c1018] p-6 text-slate-100 sm:p-8 ${className}`}
    >
      {/* Subtle coordinate-grid backdrop for the vision tone */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

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

        {/* Coordinate cards: 2x2 grid (desktop) + full-width conclusion below.
            Mobile stacks vertically with card 05 last. */}
        <ul className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {gridCards.map((c, i) => {
            const isBlue = c.n === '04';
            return (
              <motion.li
                key={c.n}
                custom={i}
                variants={cardVariants}
                initial={animate ? 'hidden' : false}
                animate={animate ? 'visible' : undefined}
                transition={{ duration: 0.45, delay: animate ? i * 0.08 : 0 }}
                className={`group relative rounded-xl border p-5 transition-colors ${
                  isBlue
                    ? 'border-primary/50 bg-primary/10'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className={`shrink-0 font-mono text-3xl font-bold leading-none tabular-nums ${
                      isBlue ? 'text-primary' : 'text-slate-600'
                    }`}
                  >
                    {c.n}
                  </span>
                  <div>
                    <h3
                      className={`text-base font-medium ${
                        isBlue ? 'text-primary-light' : 'text-white'
                      }`}
                    >
                      {c.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                      {c.body}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>

        {/* Card 05 — the conclusion. Larger visual weight; always last. */}
        <motion.div
          variants={cardVariants}
          initial={animate ? 'hidden' : false}
          animate={animate ? 'visible' : undefined}
          transition={{ duration: 0.5, delay: animate ? 0.4 : 0 }}
          className="mt-4"
        >
          <div className="relative overflow-hidden rounded-xl border border-white/15 bg-white/[0.04] p-6 sm:p-7">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <span
                aria-hidden
                className="shrink-0 font-mono text-5xl font-bold leading-none tabular-nums text-slate-500 sm:text-6xl"
              >
                {conclusion.n}
              </span>
              <div>
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  {conclusion.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-300 sm:text-lg">
                  {conclusion.body}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA — subtle light/blue text link (dark surface) */}
        <div className="mt-5">
          <a
            href="/company"
            className="inline-flex items-center text-sm font-medium text-primary-light underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {copy.cta}
          </a>
        </div>
      </div>
    </div>
  );
}
