'use client';

import { useState, useEffect, useCallback } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { prefersReducedMotion } from '@/lib/prefersReducedMotion';
import { AnimatePresence, motion } from 'framer-motion';
import { springGentle } from '@/lib/spring-config';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface StepData {
  step: number;
  title: string;
  detail: string;
  highlight: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  iconBg: string;
  Visual: React.ComponentType;
}

export default function StepperShell({ steps }: { steps: StepData[] }) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(prefersReducedMotion);
  const { ref: stepperRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % steps.length);
  }, [steps.length]);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + steps.length) % steps.length);
  }, [steps.length]);

  useEffect(() => {
    if (isPaused || !isVisible) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, isVisible, next, active]);

  const current = steps[active];
  const Icon = current.icon;

  return (
    <div
      ref={stepperRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 메인 콘텐츠 */}
      <div className={`bg-white rounded-2xl border ${current.borderColor} p-8 sm:p-10 mb-8 relative overflow-hidden transition-[border-color] duration-300`}>
        {/* 배경 데코 */}
        <div className={`absolute top-0 right-0 w-72 h-72 ${current.bgColor} rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none transition-colors duration-300`} aria-hidden="true" />

        <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* 좌측: 스텝 표시 + 제목 */}
          <div className="lg:w-[42%]">
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-14 h-14 rounded-2xl ${current.iconBg} flex items-center justify-center relative transition-colors duration-300`}>
                <Icon className={`w-7 h-7 ${current.color} transition-colors duration-300`} />
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {current.step}
                </span>
              </div>
              <span className={`text-xs font-medium ${current.color} uppercase tracking-wider transition-colors duration-300`}>
                Step {current.step} / {steps.length}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                transition={prefersReducedMotion ? { duration: 0 } : springGentle}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 leading-snug break-keep">
                  {current.title}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {current.detail}
                </p>

                {/* 핵심 뱃지 */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${current.borderColor} ${current.bgColor} transition-colors duration-300`}>
                  <Zap className={`w-3 h-3 ${current.color}`} />
                  <span className={`text-xs font-bold ${current.color}`}>{current.highlight}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 우측: 시각화 패널 */}
          <div className="lg:w-[58%] w-full min-h-[360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className={`${current.bgColor} rounded-2xl p-6 sm:p-8 flex items-center justify-center min-h-[360px] transition-colors duration-300`}
                initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.97 }}
                transition={prefersReducedMotion ? { duration: 0 } : springGentle}
              >
                <current.Visual />
              </motion.div>
            </AnimatePresence>

            {/* 이전/다음 버튼 */}
            <div className="flex justify-center gap-3 mt-4">
              <button
                type="button"
                onClick={prev}
                className="w-10 h-10 bg-white rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer shadow-sm"
                aria-label="이전 단계"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                type="button"
                onClick={next}
                className="w-10 h-10 bg-white rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer shadow-sm"
                aria-label="다음 단계"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 스텝 인디케이터 */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {steps.map((s, i) => {
          const StepIcon = s.icon;
          const isActive = i === active;
          return (
            <button
              type="button"
              key={s.step}
              onClick={() => setActive(i)}
              className={`relative flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl border transition-[border-color,background-color,box-shadow] duration-300 cursor-pointer ${
                isActive
                  ? `${s.borderColor} ${s.bgColor} shadow-sm`
                  : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
              }`}
              aria-label={`Step ${s.step}: ${s.title}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-colors ${
                  isActive ? 'bg-gray-900' : 'bg-gray-100'
                }`}
              >
                <StepIcon
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    isActive ? 'text-white' : 'text-gray-500'
                  }`}
                />
              </div>
              <span
                className={`text-3xs sm:text-xs font-medium leading-tight text-center hidden sm:block ${
                  isActive ? s.color : 'text-gray-500'
                }`}
              >
                {s.title}
              </span>
              {/* 진행 바 */}
              {isActive && !isPaused && (
                <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-900 rounded-full animate-progress" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .animate-progress {
          animation: progress 5s linear;
          transform-origin: left center;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-progress {
            animation: none;
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
}
