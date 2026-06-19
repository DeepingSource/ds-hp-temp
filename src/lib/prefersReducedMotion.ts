/**
 * 모듈 스코프에서 한 번만 읽는 prefers-reduced-motion 상태.
 * 컴포넌트 애니메이션 루프 초기화 시 useEffect 안에서 반복 호출하는 대신 이 값을 사용한다.
 * (동적 변경 반응이 필요하면 usePrefersReducedMotion 훅을 사용할 것)
 */
export const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
