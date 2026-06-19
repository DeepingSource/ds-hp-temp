import Link from 'next/link';
import { Eye, LayoutGrid, Zap, ArrowRight, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { products } from '@/lib/products-data';
import AnimatedSection from '@/components/ui/AnimatedSection';

const iconMap: Record<string, LucideIcon> = { Eye, LayoutGrid, Zap };

const colorMap: Record<string, {
  bg: string; iconBg: string; icon: string; border: string;
  cta: string; check: string; gradient: string;
}> = {
  emerald: {
    bg: 'bg-white', iconBg: 'bg-emerald-50', icon: 'text-emerald-600',
    border: 'border-emerald-100', cta: 'text-emerald-600 hover:text-emerald-700',
    check: 'text-emerald-500', gradient: 'from-emerald-500/15 via-emerald-500/5 to-transparent',
  },
  violet: {
    bg: 'bg-white', iconBg: 'bg-violet-50', icon: 'text-violet-600',
    border: 'border-violet-100', cta: 'text-violet-600 hover:text-violet-700',
    check: 'text-violet-500', gradient: 'from-violet-500/15 via-violet-500/5 to-transparent',
  },
  blue: {
    bg: 'bg-white', iconBg: 'bg-blue-50', icon: 'text-blue-600',
    border: 'border-blue-100', cta: 'text-blue-600 hover:text-blue-700',
    check: 'text-blue-500', gradient: 'from-blue-500/15 via-blue-500/5 to-transparent',
  },
};

export default function ProductScrollStory() {
  return (
    <AnimatedSection className="py-20 lg:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">
            Solution
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">
            관찰하고, 분석하고, 실행하고, 학습합니다
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            CCTV 영상을 AI가 분석해 공간의 문제를 발견하고, 해결 방법까지 제안합니다.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {products.map((p) => {
            const Icon = iconMap[p.icon] ?? Eye;
            const c = colorMap[p.color] ?? colorMap.emerald;
            return (
              <Link
                key={p.id}
                href={p.href}
                className={`group relative flex flex-col rounded-2xl border ${c.border} ${c.bg} overflow-hidden hover:shadow-md hover:border-gray-200 transition-[box-shadow,border-color] duration-300 cursor-pointer`}
              >
                {/* Top — gradient + icon + decorative backdrop */}
                <div className={`relative px-6 pt-8 pb-6 bg-gradient-to-b ${c.gradient} overflow-hidden`}>
                  {/* Decorative large icon */}
                  <Icon className={`absolute -top-3 -right-3 w-28 h-28 ${c.icon} opacity-[0.06] pointer-events-none`} aria-hidden="true" />
                  <span className="relative text-3xs font-bold text-gray-500 uppercase tracking-widest">
                    {p.step}
                  </span>
                  <div className={`relative mt-3 w-14 h-14 rounded-2xl ${c.iconBg} flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 ${c.icon}`} />
                  </div>
                </div>

                {/* Bottom — text + features + CTA */}
                <div className="flex flex-col flex-1 px-6 pb-7">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {p.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    {p.tagline}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {p.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${c.check}`} />
                        <span className="text-sm text-gray-700">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${c.cta} transition-colors`}>
                    자세히 보기
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
