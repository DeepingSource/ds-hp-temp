import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act, screen } from '@testing-library/react';
import React, { type FC } from 'react';
import { useScrollAnimation } from './useScrollAnimation';

// IntersectionObserver mock
let observerCallback: IntersectionObserverCallback;
const mockDisconnect = vi.fn();
const mockObserve = vi.fn();

// 기본: 요소가 below-fold(top > innerHeight)라고 가정 → observer 경로를 탄다.
// (jsdom의 getBoundingClientRect는 0을 반환해 새 above-fold 조기표시 로직에 걸리므로 mock 필요)
const belowFold = { top: 10000, bottom: 10100, left: 0, right: 0, width: 0, height: 100, x: 0, y: 10000, toJSON: () => ({}) } as DOMRect;

beforeEach(() => {
  mockDisconnect.mockClear();
  mockObserve.mockClear();

  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue(belowFold);

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

  it('마운트 시 이미 뷰포트 안(above-fold)이면 즉시 visible, observer 미등록 (R5)', () => {
    const aboveFold = { top: 100, bottom: 200, left: 0, right: 0, width: 0, height: 100, x: 0, y: 100, toJSON: () => ({}) } as DOMRect;
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue(aboveFold);

    render(<TestComponent />);

    expect(getIsVisible()).toBe(true);
    expect(mockObserve).not.toHaveBeenCalled();
  });
});
