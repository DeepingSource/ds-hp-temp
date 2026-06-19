'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getLocaleFromPath, localeHref, type Locale } from '@/lib/i18n';

/**
 * Fixed bottom CTA bar.
 *  • ?lp=1 (ad landing mode): shown immediately on any page, forwards UTM params.
 *  • Organic homepage (/, /ko, /jp): shown after the visitor scrolls past the hero,
 *    closing the long-page conversion leak. Localized per path-prefix locale.
 * (Legacy minisite product pages keep their own MobileStickyBar.)
 */

const dict: Record<Locale, { tagline: string; button: string; aria: string }> = {
  ko: { tagline: 'AI 매장 관리, 지금 바로 시작하세요', button: '무료 상담 신청', aria: '상담 신청' },
  en: { tagline: 'AI store operations — start today', button: 'Talk to us', aria: 'Contact us' },
  jp: { tagline: 'AI店舗運営、今すぐ始めましょう', button: '無料相談', aria: '相談する' },
};

const HOME_PATHS = ['/', '/ko', '/jp'];

export default function LandingStickyCta() {
  const params = useSearchParams();
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const t = dict[locale];

  const lpMode = params.get('lp') === '1';
  const isHome = HOME_PATHS.includes(pathname);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    if (lpMode || !isHome) return;
    const onScroll = () => setScrolledPastHero(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lpMode, isHome]);

  const visible = lpMode || (isHome && scrolledPastHero);
  if (!visible) return null;

  // Build contact URL, forwarding UTM params if present (lp ad traffic)
  const utmParts: string[] = [];
  const utmSource = params.get('utm_source');
  const utmMedium = params.get('utm_medium');
  const utmCampaign = params.get('utm_campaign');
  if (utmSource) utmParts.push(`utm_source=${encodeURIComponent(utmSource)}`);
  if (utmMedium) utmParts.push(`utm_medium=${encodeURIComponent(utmMedium)}`);
  if (utmCampaign) utmParts.push(`utm_campaign=${encodeURIComponent(utmCampaign)}`);
  const base = localeHref(locale, '/contact');
  const contactHref = utmParts.length ? `${base}?${utmParts.join('&')}` : base;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-[var(--z-float)] bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] safe-area-pb"
      role="complementary"
      aria-label={t.aria}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
        <p className="hidden sm:block text-sm font-semibold text-gray-900 break-keep">
          {t.tagline}
        </p>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href={contactHref}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          >
            {t.button}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
