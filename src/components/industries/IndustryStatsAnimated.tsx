'use client';

import { useEffect, useRef, useState } from 'react';
import {
  TrendingUp, TrendingDown, Zap, ShieldCheck, RotateCcw, Heart, Clock, Shield,
  Search, LayoutGrid, Star, BookOpen, Building2, Gauge, ShoppingCart, MapPin,
  Route, Target, Users, BarChart3, Eye, type LucideIcon,
} from 'lucide-react';
import { prefersReducedMotion as reducedMotion } from '@/lib/prefersReducedMotion';

const IconMap: Record<string, LucideIcon> = {
  TrendingUp, TrendingDown, Zap, ShieldCheck, RotateCcw, Heart, Clock, Shield,
  Search, LayoutGrid, Star, BookOpen, Building2, Gauge, ShoppingCart, MapPin,
  Route, Target, Users, BarChart3, Eye,
};

interface Stat {
  icon: string;
  stat: string;
  label: string;
}

function parseStat(stat: string): { prefix: string; value: number; suffix: string; decimal: boolean } {
  const match = stat.match(/^([+\-]?)(\d+\.?\d*)(.*)$/);
  if (!match) return { prefix: '', value: 0, suffix: stat, decimal: false };
  return {
    prefix: match[1],
    value: parseFloat(match[2]),
    suffix: match[3],
    decimal: match[2].includes('.'),
  };
}

function AnimatedStatItem({
  item,
  triggered,
  iconBg,
  iconText,
}: {
  item: Stat;
  triggered: boolean;
  iconBg: string;
  iconText: string;
}) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);
  const parsed = parseStat(item.stat);
  const Icon = IconMap[item.icon] ?? TrendingUp;

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

  const animated = parsed.value * progress;
  const displayValue = parsed.decimal ? animated.toFixed(1) : Math.round(animated).toString();

  return (
    <div className="flex flex-col items-center text-center px-4 sm:px-10">
      <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center mb-3`}>
        <Icon className={`w-5 h-5 ${iconText}`} />
      </div>
      <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-1 leading-none tabular-nums">
        {parsed.prefix}
        {displayValue}
        {parsed.suffix}
      </span>
      <span className="text-xs sm:text-sm text-gray-500 font-medium leading-snug break-keep mt-1">
        {item.label}
      </span>
    </div>
  );
}

export default function IndustryStatsAnimated({ stats, iconBg = 'bg-primary/10', iconText = 'text-primary' }: { stats: Stat[]; iconBg?: string; iconText?: string }) {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
    <div ref={ref} className="grid grid-cols-3 divide-x divide-gray-100">
      {stats.map((item) => (
        <AnimatedStatItem
          key={item.label}
          item={item}
          triggered={triggered}
          iconBg={iconBg}
          iconText={iconText}
        />
      ))}
    </div>
  );
}
