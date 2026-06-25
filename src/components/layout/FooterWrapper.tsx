'use client';

import dynamic from 'next/dynamic';
import { useSearchParams, usePathname } from 'next/navigation';
import { useSiteMode } from '@/hooks/useSiteMode';

const Footer = dynamic(() => import('./Footer'));
const MinisiteFooter = dynamic(() => import('./MinisiteFooter'));
const MobileStickyBar = dynamic(() => import('@/components/ui/MobileStickyBar'));

/** Renders minisite footer for agent.saai.store, hides for ?lp=1, otherwise default. */
export default function FooterWrapper() {
  const params = useSearchParams();
  const pathname = usePathname();
  const siteMode = useSiteMode();

  if (pathname?.startsWith('/keystatic')) return null;
  if (params.get('lp') === '1') return null;
  if (siteMode === 'minisite') return <MinisiteFooter />;
  return (
    <>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
