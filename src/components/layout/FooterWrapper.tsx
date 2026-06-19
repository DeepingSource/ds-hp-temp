'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useSiteMode } from '@/hooks/useSiteMode';

const Footer = dynamic(() => import('./Footer'));
const MinisiteFooter = dynamic(() => import('./MinisiteFooter'));
const MobileStickyBar = dynamic(() => import('@/components/ui/MobileStickyBar'));

/** Renders minisite footer for agent.saai.store, hides for ?lp=1, otherwise default. */
export default function FooterWrapper() {
  const params = useSearchParams();
  const siteMode = useSiteMode();

  if (params.get('lp') === '1') return null;
  if (siteMode === 'minisite') return <MinisiteFooter />;
  return (
    <>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
