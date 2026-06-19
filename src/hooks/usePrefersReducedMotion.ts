import { useSyncExternalStore } from 'react';

const MQ = '(prefers-reduced-motion: reduce)';

function subscribe(cb: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia(MQ);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}

function getSnapshot() {
  return typeof window !== 'undefined' && window.matchMedia(MQ).matches;
}

function getServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
