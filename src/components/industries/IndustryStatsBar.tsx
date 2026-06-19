'use client';

import { useEffect, useRef, useState } from 'react';
import { Building2, Store, Clock, ShieldCheck } from 'lucide-react';
import { prefersReducedMotion as reducedMotion } from '@/lib/prefersReducedMotion';

const stats = [
  { icon: Building2, value: 7, suffix: '개', label: '지원 업종' },
  { icon: Store, value: 300, suffix: '+', label: '도입 매장' },
  { icon: Clock, value: 3, suffix: '일', label: '이내 도입' },
  { icon: ShieldCheck, value: 100, suffix: '%', label: '익명화' },
] as const;

function CountUpItem({
  stat,
  triggered,
}: {
  stat: (typeof stats)[number];
  triggered: boolean;
}) {
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
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [triggered]);

  const displayValue = Math.round(stat.value * progress).toString();
  const Icon = stat.icon;

  return (
    <div className="flex flex-col items-center text-center px-6 py-8">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <span className="text-3xl sm:text-4xl font-black text-gray-900 tabular-nums leading-none mb-1">
        {displayValue}
        {stat.suffix}
      </span>
      <span className="text-sm text-gray-500 font-medium">{stat.label}</span>
    </div>
  );
}

export default function IndustryStatsBar() {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
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
    <section ref={ref} className="bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100">
          {stats.map((stat) => (
            <CountUpItem key={stat.label} stat={stat} triggered={triggered} />
          ))}
        </div>
      </div>
    </section>
  );
}
