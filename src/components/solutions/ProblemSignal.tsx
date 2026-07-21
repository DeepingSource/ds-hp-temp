import type { LucideIcon } from 'lucide-react';
import { ArrowRight, Check } from 'lucide-react';
import { type Locale } from '@/lib/i18n';

/**
 * ProblemSignal — lightweight "detected → handled" strip for solution problem cards
 * (솔루션 작업문서 v1 §6, V4). Shared across all category views; surfaces the
 * per-scenario problem icon (previously computed but unrendered) and states the
 * site's core beat: 지켜보던 → 먼저 아는 (problem detected → saai acts).
 */

const COPY: Record<Locale, { detected: string; handled: string }> = {
  ko: { detected: '문제 감지', handled: 'saai 대응' },
  en: { detected: 'Detected', handled: 'saai acts' },
  jp: { detected: '課題を検知', handled: 'saaiが対応' },
};

export default function ProblemSignal({ icon: Icon, locale }: { icon: LucideIcon; locale: Locale }) {
  const t = COPY[locale];
  return (
    <div className="mt-1 flex items-center gap-1.5 text-2xs font-semibold">
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-amber-700">
        <Icon className="h-3 w-3" aria-hidden="true" />
        {t.detected}
      </span>
      <ArrowRight className="h-3 w-3 shrink-0 text-gray-300" aria-hidden="true" />
      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-primary">
        <Check className="h-3 w-3" aria-hidden="true" />
        {t.handled}
      </span>
    </div>
  );
}
