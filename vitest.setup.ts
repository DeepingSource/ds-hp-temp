import '@testing-library/jest-dom';

// jsdom does not implement matchMedia; stub it so hooks that read motion
// preferences (usePrefersReducedMotion / useScrollAnimation) work under test.
// Use a plain function (not vi.fn) so per-test vi.restoreAllMocks() can't strip it.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList,
});
