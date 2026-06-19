'use client';

import { Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  speaker: string;
  metric?: string;
}

interface Props {
  items: Testimonial[];
}

export default function IndustryTestimonialSection({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {items.map((t, i) => (
        <figure
          key={i}
          className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
        >
          <Quote className="absolute top-6 left-6 w-6 h-6 text-primary/15" aria-hidden="true" />

          <blockquote className="relative z-10 text-gray-700 text-sm leading-relaxed mb-5 break-keep pl-4">
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          <figcaption className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
            <span className="text-xs font-semibold text-gray-500">{t.speaker}</span>
            {t.metric && (
              <span className="inline-flex px-2.5 py-1 rounded-full bg-primary/5 text-xs font-bold text-primary whitespace-nowrap">
                {t.metric}
              </span>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
