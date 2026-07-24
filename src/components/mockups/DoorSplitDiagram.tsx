'use client';

import { motion } from 'framer-motion';
import { DoorOpen, ArrowRight } from 'lucide-react';
import { type Locale } from '@/lib/i18n';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ease } from '@/lib/easing';
import { CountUp } from '@/components/ui/CountUp';
import { canonicalDoorTraffic } from '@/data/mockup-scenarios/canonical';

/**
 * DoorSplitDiagram — count(outside) ↔ insight(inside) boundary (product-reorg D4, §10.5).
 * Left of the door: saai count reads footfall + capture rate (342 ÷ 1,036 = 33%).
 * Right of the door: store insight reads flow/dwell (heatmap) + the conversion
 * funnel (342→317→65). Shared on both product pages as a contrast pair. Inline
 * SVG/CSS, no raster. Sample values (caption marks it).
 * Numbers derive from canonicalDoorTraffic (MM Phase 2 2-⑥ — no local hardcoding).
 */

// canonicalDoorTraffic 파생 표기 문자열 — dict 3로케일이 공유 (수치 변경은 canonical.ts에서)
const N = {
  passersby: canonicalDoorTraffic.passersby.toLocaleString('en-US'), // '1,036'
  entered: String(canonicalDoorTraffic.entered), // '342'
  browsed: String(canonicalDoorTraffic.browsed), // '317'
  purchased: String(canonicalDoorTraffic.purchased), // '65'
};

// MockupViewport 예외(MM §5 1b): 제품 UI 재현이 아닌 순수 개념 다이어그램이라
// 고정 캔버스 대신 sm: 그리드 재배치(세로↔가로)가 설계 의도 — 강제 스케일은
// 극좁 폭에서 오히려 가독성 퇴행. 모션은 tween(outCubic)만 — spring 없음.

const dict: Record<Locale, {
  outsideTag: string; outsideTitle: string; passersby: string; passersbyN: string;
  captureLabel: string; captureRate: number; captureSub: string;
  insideTag: string; insideTitle: string; heatLabel: string;
  funnel: { label: string; n: string }[];
  boundary: string; caption: string;
}> = {
  ko: {
    outsideTag: '문 밖 · saai count', outsideTitle: '상권·통행·유입률',
    passersby: '지나감', passersbyN: N.passersby,
    captureLabel: '유입률', captureRate: canonicalDoorTraffic.captureRatePct, captureSub: `입장 ${N.entered} ÷ 지나감 ${N.passersby}`,
    insideTag: '문 안 · store insight', insideTitle: '동선·체류·전환',
    heatLabel: '체류 히트맵',
    funnel: [{ label: '입장', n: N.entered }, { label: '체류', n: N.browsed }, { label: '구매', n: N.purchased }],
    boundary: 'saai count는 문 밖의 통행을, store insight는 문 안에서 무슨 일이 왜 일어났는지를 — 유입률이 둘을 잇습니다.',
    caption: '* 수치는 설명용 예시입니다.',
  },
  en: {
    outsideTag: 'Outside · saai count', outsideTitle: 'Trade area · footfall · capture rate',
    passersby: 'Passing by', passersbyN: N.passersby,
    captureLabel: 'Inflow rate', captureRate: canonicalDoorTraffic.captureRatePct, captureSub: `Entered ${N.entered} ÷ passing ${N.passersby}`,
    insideTag: 'Inside · store insight', insideTitle: 'Flow · dwell · conversion',
    heatLabel: 'Dwell heatmap',
    funnel: [{ label: 'Entered', n: N.entered }, { label: 'Dwell', n: N.browsed }, { label: 'Bought', n: N.purchased }],
    boundary: 'saai count reads the footfall outside the door; store insight reads what happened inside, and why — capture rate is the handoff between them.',
    caption: '* Figures are illustrative.',
  },
  jp: {
    outsideTag: '店の外 · saai count', outsideTitle: '商圏・通行・流入率',
    passersby: '通行', passersbyN: N.passersby,
    captureLabel: '流入率', captureRate: canonicalDoorTraffic.captureRatePct, captureSub: `入店 ${N.entered} ÷ 通行 ${N.passersby}`,
    insideTag: '店の中 · store insight', insideTitle: '動線・滞在・転換',
    heatLabel: '滞在ヒートマップ',
    funnel: [{ label: '入店', n: N.entered }, { label: '滞在', n: N.browsed }, { label: '購入', n: N.purchased }],
    boundary: 'saai count は店の外の通行を、store insight は店の中で何がなぜ起きたかを — 流入率が両者をつなぎます。',
    caption: '* 数値は説明用の例示です。',
  },
};

// deterministic dot scatter (no Math.random — stable across renders/SSR)
const DOTS = Array.from({ length: 48 }, (_, i) => ({
  x: 6 + ((i * 37) % 88),
  y: 8 + ((i * 53) % 84),
  on: i % 3 === 0,
}));

const HEAT = [0.2, 0.5, 0.9, 0.4, 0.8, 0.6, 0.3, 0.7, 0.5];

export default function DoorSplitDiagram({ locale, ariaLabel }: { locale: Locale; ariaLabel?: string }) {
  const t = dict[locale];
  const { ref, isVisible: show } = useScrollAnimation<HTMLElement>({ threshold: 0.4 });
  const reduced = usePrefersReducedMotion();
  return (
    <figure ref={ref} role="img" aria-label={ariaLabel ?? `${t.outsideTag} ↔ ${t.insideTag}`} className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-card">
      <div className="grid items-stretch gap-4 sm:grid-cols-[1fr_auto_1fr]">
        {/* Outside — saai count */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-2xs font-bold uppercase tracking-wider text-primary mb-1">{t.outsideTag}</p>
          <p className="text-xs text-gray-500 mb-3 break-keep">{t.outsideTitle}</p>
          <div className="relative mb-3 h-24 overflow-hidden rounded-lg bg-white">
            <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
              {DOTS.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r="1.6" fill="var(--color-primary)" fillOpacity={d.on ? 0.85 : 0.2} />
              ))}
            </svg>
            <span className="absolute bottom-1 left-2 text-2xs text-gray-400">{t.passersby} {t.passersbyN}</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{t.captureLabel} <CountUp to={t.captureRate} suffix="%" /></p>
          <p className="text-2xs text-gray-500 tabular-nums">{t.captureSub}</p>
        </div>

        {/* Door divider */}
        <div className="flex flex-row items-center justify-center gap-1 sm:flex-col">
          <DoorOpen className="h-6 w-6 text-gray-400" aria-hidden="true" />
          <ArrowRight className="h-4 w-4 text-primary rotate-90 sm:rotate-0" aria-hidden="true" />
        </div>

        {/* Inside — store insight */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-2xs font-bold uppercase tracking-wider text-primary mb-1">{t.insideTag}</p>
          <p className="text-xs text-gray-500 mb-3 break-keep">{t.insideTitle}</p>
          <div className="mb-3 grid grid-cols-3 gap-1" aria-label={t.heatLabel}>
            {HEAT.map((v, i) => (
              <motion.span
                key={i}
                className="h-6 rounded"
                style={{ backgroundColor: `color-mix(in oklab, var(--color-primary) ${Math.round(v * 100)}%, white)` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: show ? 1 : 0 }}
                transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : (i % 3) * 0.05 + Math.floor(i / 3) * 0.08 }}
              />
            ))}
          </div>
          <div className="flex items-end gap-1.5">
            {t.funnel.map((f, i) => (
              <span key={f.label} className="flex-1 text-center">
                <motion.span
                  className="block origin-bottom rounded-t bg-primary/80"
                  style={{ height: `${(Number(f.n) / canonicalDoorTraffic.entered) * 36 + 8}px` }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: show ? 1 : 0 }}
                  transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.3 + i * 0.12, ease: ease.outCubic }}
                />
                <span className="mt-1 block text-2xs font-bold text-gray-900 tabular-nums">{f.n}</span>
                <span className="block text-2xs text-gray-400 break-keep">{f.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500 leading-relaxed break-keep border-l-2 border-primary pl-4">{t.boundary}</p>
      <figcaption className="mt-3 text-2xs text-gray-400">{t.caption}</figcaption>
    </figure>
  );
}
