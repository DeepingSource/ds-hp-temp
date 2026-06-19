import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act, screen } from '@testing-library/react';
import React, { type FC } from 'react';
import { useScrollAnimation } from './useScrollAnimation';

// IntersectionObserver mock
let observerCallback: IntersectionObserverCallback;
const mockDisconnect = vi.fn();
const mockObserve = vi.fn();

beforeEach(() => {
  mockDisconnect.mockClear();
  mockObserve.mockClear();

  vi.stubGlobal(
    'IntersectionObserver',
    vi.fn((callback: IntersectionObserverCallback) => {
      observerCallback = callback;
      return {
        observe: mockObserve,
        disconnect: mockDisconnect,
        unobserve: vi.fn(),
      };
    }),
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

// hook을 실제 DOM에 연결하는 테스트 컴포넌트
const TestComponent: FC<{ once?: boolean; threshold?: number }> = ({ once, threshold }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ once, threshold });
  return <div ref={ref} data-testid="target" data-visible={String(isVisible)} />;
};

function getIsVisible(): boolean {
  return screen.getByTestId('target').getAttribute('data-visible') === 'true';
}

describe('useScrollAnimation', () => {
  it('초기 isVisible은 false (observer 트리거 전)', () => {
    render(<TestComponent />);
    // observer.observe가 호출되었지만 아직 intersecting하지 않음
    expect(mockObserve).toHaveBeenCalled();
    expect(getIsVisible()).toBe(false);
  });

  it('IntersectionObserver 트리거 시 isVisible = true', () => {
    render(<TestComponent />);

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(getIsVisible()).toBe(true);
  });

  it('once: true일 때 트리거 후 disconnect 호출', () => {
    render(<TestComponent once={true} />);

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('3초 타임아웃 safety net', () => {
    vi.useFakeTimers();

    render(<TestComponent />);
    expect(getIsVisible()).toBe(false);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(getIsVisible()).toBe(true);

    vi.useRealTimers();
  });
});
