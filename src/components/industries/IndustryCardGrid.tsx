'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { industryList, industryColorMap } from '@/data/industryList';

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export default function IndustryCardGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {industryList.map((industry) => {
        const Icon = industry.icon;
        const colors = industryColorMap[industry.color];
        return (
          <motion.div
            key={industry.slug}
            variants={itemVariants}
            id={`industry-${industry.slug}`}
          >
            <Link
              href={`/industries/${industry.slug}`}
              className={`group flex flex-col bg-white rounded-2xl border ${colors.border} shadow-sm ${colors.glow} transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer h-full relative`}
            >
              {/* hover 배경 아이콘 */}
              {!industry.heroImage && (
                <Icon
                  className={`absolute -right-4 -bottom-4 w-28 h-28 ${colors.text} opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500 pointer-events-none`}
                />
              )}

              {/* 카드 상단: 이미지 or 컬러 배경 */}
              {industry.heroImage ? (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={industry.heroImage}
                    alt={`${industry.label} 솔루션 — SAAI`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* 하단 그라디언트 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  {/* 아이콘 + 라벨 + 지표 */}
                  <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-10 flex items-end justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-white/90 flex items-center justify-center shadow-sm flex-shrink-0">
                        <Icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <h3 className="text-base font-bold text-white leading-tight">{industry.label}</h3>
                    </div>
                    <span className="text-base font-black text-white ml-2 shrink-0">{industry.metric}</span>
                  </div>
                </div>
              ) : (
                <div className={`${colors.bg} px-7 pt-7 pb-5`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/70 flex items-center justify-center shadow-sm">
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <span className={`text-2xl font-black ${colors.text}`}>{industry.metric}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{industry.label}</h3>
                </div>
              )}

              {/* 카드 하단: 설명 + 링크 */}
              <div className="px-6 py-5 flex flex-col flex-1 relative">
                <p className="text-base text-gray-600 leading-relaxed mb-4 break-keep flex-1">
                  {industry.desc}
                </p>
                <span
                  className={`inline-flex items-center gap-1 text-sm font-semibold ${colors.text} group-hover:gap-2 transition-[gap] duration-200`}
                >
                  솔루션 보기 <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
