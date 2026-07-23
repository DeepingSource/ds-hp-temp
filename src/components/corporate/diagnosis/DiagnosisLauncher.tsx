'use client';

import { Sparkles, ArrowRight } from 'lucide-react';
import { DIAGNOSIS_UI } from '@/data/diagnosis-i18n';
import { industryLabelI18n } from '@/data/solutions-i18n';
import type { Locale } from '@/lib/i18n';
import type { DiagnosisPreset } from './useDiagnosisEngine';
import { useDiagnosis } from './DiagnosisContext';

interface DiagnosisLauncherProps {
  variant?: 'banner' | 'button' | 'inline';
  preset?: DiagnosisPreset;
  locale?: Locale;
  className?: string;
  customTitle?: string;
  customSub?: string;
}

export default function DiagnosisLauncher({
  variant = 'banner',
  preset,
  locale = 'ko',
  className = '',
  customTitle,
  customSub,
}: DiagnosisLauncherProps) {
  const { openDiagnosis } = useDiagnosis();
  const ui = DIAGNOSIS_UI[locale];

  const handleOpen = () => {
    openDiagnosis(preset);
  };

  const industryName = preset?.industry
    ? industryLabelI18n[preset.industry]?.[locale] ?? preset.industry
    : undefined;

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={handleOpen}
        className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-all cursor-pointer shadow-2xs ${className}`}
      >
        <Sparkles className="w-4 h-4" />
        <span>{ui.launcherBanner.ctaText}</span>
      </button>
    );
  }

  if (variant === 'inline') {
    return (
      <button
        type="button"
        onClick={handleOpen}
        className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-primary-dark transition-colors cursor-pointer group ${className}`}
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>{customTitle ?? ui.launcherInline}</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </button>
    );
  }

  // Banner variant (default)
  const title =
    customTitle ??
    (industryName
      ? `지금 겪는 문제를 알려주시면, ${industryName} 사례 중 맞는 답을 찾아드립니다`
      : ui.launcherBanner.defaultTitle);

  const sub = customSub ?? ui.launcherBanner.defaultSub;

  return (
    <div
      className={`relative overflow-hidden p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary-lighter/60 via-white to-gray-50 border border-primary-light/30 shadow-2xs ${className}`}
    >
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-primary-light/40 text-2xs font-bold text-primary mb-3 shadow-2xs">
            <Sparkles className="w-3 h-3" />
            {ui.eyebrow}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 break-keep">{title}</h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-keep">{sub}</p>
        </div>

        <button
          type="button"
          onClick={handleOpen}
          className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-all cursor-pointer shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>{ui.launcherBanner.ctaText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
