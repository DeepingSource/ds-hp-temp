'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useMockupLoop } from '@/hooks/useMockupLoop';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import MockupBadge from './MockupBadge';
import SaaiHeader from './SaaiHeader';
import LoopVideo from '@/components/ui/LoopVideo';
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
  videoAlt: string;
  cards: [PromiseCard, PromiseCard, PromiseCard];
  emphasized: string;
};

const COPY: Record<Locale, Copy> = {
  ko: {
    eyebrow: 'Spatial AI · MTMC Tracking',
    heading: '카메라가 여러 대여도, 같은 사람을 연속 추적합니다 — 얼굴 없이',
    lead: '대형마트·쇼핑몰·물류 센터에서 한 사람의 동선을 여러 카메라에 걸쳐 추적해야 합니다. 그러나 얼굴 인식 없이. MTMC가 이 두 요구를 동시에 풉니다.',
    steps: ['픽셀', '카메라', '공간 좌표'],
    videoAlt: '여러 대의 카메라에 걸쳐 같은 사람을 얼굴 없이 하나의 ID로 연속 추적하는 MTMC 실제 영상',
    cards: [
      { n: '01', title: 'Multi-Target Multi-Camera', body: '여러 카메라가 같은 사람을 연속으로 인식 — 공간 크기에 무관하게 작동합니다' },
      { n: '02', title: 'Re-Identification — 얼굴이 아니라, 특징으로', body: '자세·옷·동선 패턴의 익명화 특징으로 매칭 — 개인을 식별하지 않고도 같은 사람임을 인식합니다' },
      { n: '03', title: 'Any Environment', body: '작은 부티크부터 대형 물류 창고까지 — 카메라 수·공간 크기·레이아웃에 관계없이 같은 골격이 작동합니다' },
    ],
    emphasized: '핵심 차별점',
  },
  en: {
    eyebrow: 'Spatial AI · MTMC Tracking',
    heading: 'Track the same person across many cameras — without faces',
    lead: 'In hypermarkets, malls, and logistics centers, one person must be tracked across many cameras — yet without face recognition. MTMC solves both at once.',
    steps: ['Pixel', 'Camera', 'Spatial coords'],
    videoAlt: 'Real MTMC footage tracking the same person across multiple cameras with a single ID, without faces',
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
    videoAlt: '複数のカメラにまたがって同一人物を顔なしで一つのIDで連続追跡するMTMCの実映像',
    cards: [
      { n: '01', title: 'Multi-Target Multi-Camera', body: '複数のカメラが同一人物を連続して認識します — 空間の大きさに左右されません' },
      { n: '02', title: 'Re-Identification (顔ではありません)', body: '姿勢・服装・動線パターンの匿名化特徴で照合します — 個人を特定せずに同一人物だと認識します' },
      { n: '03', title: 'Any Environment', body: '小さなブティックから大型物流倉庫まで — カメラ数・空間の広さ・レイアウトを問わず同じ骨格が機能します' },
    ],
    emphasized: '核心的な差別化点',
  },
};

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

      {/* Real MTMC tracking footage — one person, one ID, across multiple cameras (no faces) */}
      <div className="relative rounded-xl overflow-hidden bg-black/40 ring-1 ring-white/10">
        <LoopVideo
          mp4="/videos/mtmc-tracking.mp4"
          poster="/images/technology/spatial-ai/mtmc-tracking-poster.webp"
          ariaLabel={t.videoAlt}
          className="block h-auto w-full"
        />
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
