import { useSyncExternalStore } from 'react';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function subscribe(callback: () => void) {
  // Cookie changes don't fire events, but this covers initial hydration.
  // The cookie is set by proxy before page load, so the value is stable.
  window.addEventListener('focus', callback);
  return () => window.removeEventListener('focus', callback);
}

function getSnapshot(): string | null {
  return getCookie('x-site-mode');
}

function getServerSnapshot(): string | null {
  return null;
}

/** Reads the `x-site-mode` cookie set by proxy. Returns 'minisite' or null. */
export function useSiteMode(): string | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
