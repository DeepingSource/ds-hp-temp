'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { industryList } from '@/data/industryList';

export default function IndustryHeroPills() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const handleClick = (slug: string) => {
    setActiveSlug(slug);
    const el = document.getElementById(`industry-${slug}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 108;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
      {industryList.map((ind) => {
        const Icon = ind.icon;
        const isActive = activeSlug === ind.slug;
        return (
          <button
            key={ind.slug}
            type="button"
            onClick={() => handleClick(ind.slug)}
            className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm cursor-pointer transition-colors duration-200 ${
              isActive
                ? 'text-white'
                : 'bg-white/10 border border-white/15 text-white/70 hover:bg-white/20 hover:text-white/90'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="heroPillActive"
                className="absolute inset-0 rounded-full bg-white/25 border border-white/40"
                transition={{ type: 'spring', stiffness: 500, damping: 40 }}
              />
            )}
            <Icon className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">{ind.label}</span>
          </button>
        );
      })}
    </div>
  );
}
