'use client';

import { useEffect, useState } from 'react';
import { List, ChevronDown } from 'lucide-react';
import { type Locale } from '@/lib/i18n';

interface Heading {
  id: string;
  text: string;
}

/** TOC heading label per locale (default ko for callers that don't pass a locale). */
const TOC_LABEL: Record<Locale, string> = { ko: '목차', en: 'Contents', jp: '目次' };
const TOC_COUNT: Record<Locale, (n: number) => string> = {
  ko: (n) => `목차 (${n}개)`,
  en: (n) => `Contents (${n})`,
  jp: (n) => `目次 (${n})`,
};

export default function TableOfContents({ headings, locale = 'ko' }: { headings: Heading[]; locale?: Locale }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return () => {};

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav className="hidden lg:block sticky top-24 w-56 shrink-0" aria-label={TOC_LABEL[locale]}>
      <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
        <List className="w-3.5 h-3.5" />
        {TOC_LABEL[locale]}
      </div>
      <ul className="space-y-1 border-l border-gray-200">
        {headings.map(({ id, text }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`block pl-4 py-1.5 text-sm transition-colors border-l-2 -ml-px ${
                activeId === id
                  ? 'text-primary border-primary font-medium'
                  : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** 모바일 전용 접이식 목차 — article 상단에 렌더 */
export function MobileTOC({ headings, locale = 'ko' }: { headings: Heading[]; locale?: Locale }) {
  const [open, setOpen] = useState(false);

  if (headings.length < 2) return null;

  return (
    <div className="lg:hidden mb-8 border border-gray-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
        aria-expanded={open}
        aria-controls="mobile-toc-list"
      >
        <span className="flex items-center gap-2">
          <List className="w-4 h-4 text-gray-500" aria-hidden="true" />
          {TOC_COUNT[locale](headings.length)}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      <ul id="mobile-toc-list" hidden={!open} className="px-4 py-2 space-y-0.5 bg-white border-t border-gray-100">
        {headings.map(({ id, text }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block py-2 text-sm text-gray-600 hover:text-primary transition-colors"
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
