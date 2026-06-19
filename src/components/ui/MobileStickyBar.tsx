'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Legacy minisite product pages only. The corporate home (/, /ko, /jp) now uses
// the localized LandingStickyCta instead (avoids mobile duplication + KR-on-EN bug).
const VISIBLE_PATHS = ['/storeagent', '/storecare', '/storeinsight', '/pricing', '/about'];

export default function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  const shouldShow = VISIBLE_PATHS.includes(pathname);

  useEffect(() => {
    if (!shouldShow) return;

    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shouldShow]);

  if (!shouldShow) return null;

  // 제품 페이지에서는 해당 제품 컨택으로 연결
  const contactHref =
    pathname === '/storecare' ? '/contact?product=StoreCare'
    : pathname === '/storeinsight' ? '/contact?product=StoreInsight'
    : pathname.startsWith('/storeagent') ? '/contact?product=StoreAgent'
    : '/contact';

  const secondaryLabel = pathname === '/' ? '제품 보기' : '둘러보기';
  const secondaryHref = pathname === '/' ? '/storeagent' : '/storeagent/blog';

  return (
    <nav
      aria-label="빠른 액션"
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-transform duration-300 ${
        isVisible
          ? 'translate-y-0'
          : 'translate-y-full'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 safe-area-pb">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link
            href={secondaryHref}
            className="flex-shrink-0 px-4 py-3 text-sm font-medium text-gray-600 hover:text-primary cursor-pointer transition-colors"
          >
            {secondaryLabel}
          </Link>
          <Link
            href={contactHref}
            className="flex-1 py-3.5 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors text-center"
          >
            무료 상담 신청
          </Link>
        </div>
      </div>
    </nav>
  );
}
