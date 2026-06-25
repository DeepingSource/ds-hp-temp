'use client';

import dynamic from 'next/dynamic';
import { useSearchParams, usePathname } from 'next/navigation';
import { useSiteMode } from '@/hooks/useSiteMode';

const Header = dynamic(() => import('./Header'));
const MinisiteHeader = dynamic(() => import('./MinisiteHeader'));

/** Renders minisite header for agent.saai.store, hides header for ?lp=1, otherwise default. */
export default function HeaderWrapper() {
  const params = useSearchParams();
  const pathname = usePathname();
  const siteMode = useSiteMode();

  if (pathname?.startsWith('/keystatic')) return null;
  if (params.get('lp') === '1') return null;
  if (siteMode === 'minisite') return <MinisiteHeader />;
  return <Header />;
}
