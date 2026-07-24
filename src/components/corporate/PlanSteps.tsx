'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { Cctv, Boxes, MonitorDot, ArrowRight, type LucideIcon } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { type Locale } from '@/lib/i18n';

/**
 * PlanSteps — "복잡함 없이 3단계로 시작합니다" (A-3).
 * 기존 ①②③ 평문 3줄을 번호 뱃지 + 아이콘 + 타이틀 + 한 줄 설명의 흐름 다이어그램으로
 * 승격한다. 데스크톱은 가로 3-스텝 + 화살표 커넥터, 모바일은 세로 스택 + 아래 방향 화살표.
 * 스텝은 진입 시 좌→우로 순차 등장(reduced-motion이면 즉시 표시).
 */

type Step = { icon: LucideIcon; title: string; desc: string };

const STEPS: Record<Locale, Step[]> = {
  ko: [
    { icon: Cctv, title: '쓰던 CCTV 그대로', desc: '설치·교체 없이 기존 카메라에 바로 연결합니다.' },
    { icon: Boxes, title: '세 제품이 함께', desc: 'care·insight·agent가 매장마다 하나의 흐름으로 돌아갑니다.' },
    { icon: MonitorDot, title: '본사 한 화면에서', desc: '전 매장을 같은 지표로 묶어 한 화면에서 표준화합니다.' },
  ],
  en: [
    { icon: Cctv, title: 'Keep your CCTVs', desc: 'No new hardware — it plugs straight into the cameras you already have.' },
    { icon: Boxes, title: 'Three products, together', desc: 'care · insight · agent run as one flow in every store.' },
    { icon: MonitorDot, title: 'One HQ screen', desc: 'Every store standardized on the same metrics, on a single dashboard.' },
  ],
  jp: [
    { icon: Cctv, title: '既存のCCTVそのまま', desc: '設置・交換なしで、今あるカメラに直接つなぎます。' },
    { icon: Boxes, title: '三つの製品が一緒に', desc: 'care・insight・agent が各店舗でひとつの流れとして動きます。' },
    { icon: MonitorDot, title: '本部の一画面で', desc: '全店舗を同じ指標でまとめ、一画面で標準化します。' },
  ],
};

export default function PlanSteps({ locale }: { locale: Locale }) {
  const reduced = usePrefersReducedMotion();
  const { ref, isVisible } = useScrollAnimation<HTMLOListElement>({ threshold: 0.3 });
  const steps = STEPS[locale] ?? STEPS.en;
  const show = isVisible || reduced;

  return (
    <ol
      ref={ref}
      className="mx-auto flex max-w-4xl flex-col items-stretch sm:flex-row sm:items-start"
    >
      {steps.map((s, i) => {
        const Icon = s.icon;
        return (
          <Fragment key={s.title}>
            <motion.li
              className="flex flex-1 flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-6 text-center shadow-card"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.4, delay: reduced ? 0 : i * 0.12, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="relative">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-2xs font-bold tabular-nums text-white ring-2 ring-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-base font-bold text-gray-900 break-keep">{s.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600 break-keep">{s.desc}</p>
            </motion.li>

            {i < steps.length - 1 && (
              <div
                aria-hidden="true"
                className="flex shrink-0 items-center justify-center self-center py-1 text-primary/40 sm:px-1 sm:py-0 sm:pt-8"
              >
                <ArrowRight className="h-5 w-5 rotate-90 sm:rotate-0" />
              </div>
            )}
          </Fragment>
        );
      })}
    </ol>
  );
}
