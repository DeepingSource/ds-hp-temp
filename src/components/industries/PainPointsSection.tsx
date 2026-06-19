'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { industryColorMap } from '@/data/industryList';

interface PainPoint {
  quote: string;
  description: string;
}

interface Props {
  painPoints: PainPoint[];
  color: string;
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export default function PainPointsSection({ painPoints, color }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const colors = industryColorMap[color] ?? industryColorMap.slate;

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      className="space-y-6"
    >
      {painPoints.map((pt, idx) => (
        <motion.div
          key={pt.quote}
          variants={itemVariants}
          className={`group flex gap-6 p-8 rounded-3xl bg-gray-50 hover:bg-white ${colors.glow} border border-transparent hover:border-gray-100 border-l-4 ${colors.border.split(' ')[0]} transition-[background-color,box-shadow,border-color] duration-500`}
        >
          <div className="flex-shrink-0">
            <span
              className={`flex items-center justify-center w-10 h-10 rounded-2xl ${colors.bg} ${colors.text} font-black text-sm group-hover:scale-110 transition-transform duration-300`}
            >
              {String(idx + 1).padStart(2, '0')}
            </span>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 break-keep leading-snug">
              {pt.quote}
            </h3>
            <p className="text-gray-500 leading-relaxed break-keep text-base">
              {pt.description}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
