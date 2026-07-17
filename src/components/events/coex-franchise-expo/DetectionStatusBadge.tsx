'use client';

import { motion } from 'framer-motion';

/**
 * 감지 셀 상태칩 — 사진 위 우상단에 상태(정상/주의/감지)를 표시하고, 스크롤 진입 시
 * 셀별 stagger로 페이드인한다(계획 §2.5-B). reduced-motion은 framer가 자동 폴백.
 */
export default function DetectionStatusBadge({ status, statusClass, index }: { status: string; statusClass: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.35, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-2xs font-bold shadow-sm backdrop-blur-sm ${statusClass}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </motion.span>
  );
}
