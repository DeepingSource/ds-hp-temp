'use client';

import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Minus } from 'lucide-react';
import { prefersReducedMotion as reducedMotion } from '@/lib/prefersReducedMotion';

const stats = [
  {
    icon: TrendingUp,
    value: 7.2,
    suffix: '%',
    prefix: '+',
    label: '평균 매출 증가',
    subtext: '3개월 사용 후 평균',
    color: 'text-success',
    bgColor: 'bg-success/10',
    decimal: true,
  },
  {
    icon: Minus,
    value: 4,
    suffix: '만원',
    label: '주간 폐기 절감',
    subtext: '1매장 주간 평균',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    decimal: false,
  },
];

function StatItem({ stat, triggered }: { stat: typeof stats[number]; triggered: boolean }) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!triggered) return;

    if (reducedMotion) {
      setProgress(1);
      return;
    }

    const dur = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      // easeOutCubic
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [triggered]);

  const animated = stat.value * progress;
  const displayValue = stat.decimal ? animated.toFixed(1) : Math.round(animated).toString();
  const Icon = stat.icon;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
      <div className={`w-14 h-14 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
        <Icon className={`w-7 h-7 ${stat.color}`} />
      </div>
      <div className={`text-3xl sm:text-4xl font-bold mb-1 tabular-nums ${stat.color}`}>
        {stat.prefix}{displayValue}{stat.suffix}
      </div>
      <div className="text-sm text-gray-500">{stat.label}</div>
      <div className="text-xs text-gray-500 mt-0.5">{stat.subtext}</div>
    </div>
  );
}

export default function StatsSection() {
  const [triggered, setTriggered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-20 bg-gradient-to-b from-white to-bg-cool">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 lg:gap-12 max-w-lg mx-auto">
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} triggered={triggered} />
          ))}
        </div>
        <p className="text-center text-xs text-gray-500 mt-6">
          * 딥핑소스 운영 매장 기준 · 편의점 32개 · 무인매장 21개 대상 (2025.12~2026.01)
        </p>
      </div>
    </section>
  );
}
