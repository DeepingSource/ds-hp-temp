/**
 * 목업 애니메이션 루프 관리 훅
 *
 * 목업의 단계 순환(시나리오 전환, 탭 전환 등)을 일관되게 관리.
 * active 가드, prefersReducedMotion 처리를 내장.
 *
 * @example
 * // 3개 탭을 4초 간격으로 순환
 * const { step, isTransitioning } = useMockupLoop({
 *   steps: 3,
 *   interval: 4000,
 *   active,
 * });
 *
 * @example
 * // 커스텀 타이밍 (각 단계별 다른 간격)
 * const { step } = useMockupLoop({
 *   steps: 3,
 *   intervals: [3000, 5000, 2000],
 *   active,
 * });
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface UseMockupLoopOptions {
  /** 총 단계 수 */
  steps: number;
  /** 단계 전환 간격 (ms). intervals가 있으면 무시됨. 기본 3000. */
  interval?: number;
  /** 단계별 개별 간격 (ms). 길이는 steps와 동일해야 함. */
  intervals?: number[];
  /** false이면 루프 중지 (탭 비활성 시) */
  active?: boolean;
  /** 전환 중 트랜지션 시간 (ms). isTransitioning 상태에 사용. 기본 200. */
  transitionDuration?: number;
  /** 시작 단계. 기본 0. */
  initialStep?: number;
  /** true면 hoverProps를 스프레드한 요소에 마우스/포커스가 머무는 동안 루프 일시정지. */
  pauseOnHover?: boolean;
  /**
   * 'loop'(기본): 무한 순환 — 기존 동작.
   * 'once': 한 바퀴 재생 후 마지막 단계에서 정지(done=true). replay()로 재재생.
   * reduced-motion + once는 재생 없이 마지막 단계를 정적 표시한다.
   */
  mode?: 'loop' | 'once';
  /** mode='once'에서 재생이 끝났을 때 1회 호출 (순차 재생 체이닝용) */
  onComplete?: () => void;
}

/** pauseOnHover 사용 시 루트 요소에 스프레드할 핸들러 */
interface HoverPauseProps {
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onFocusCapture: () => void;
  onBlurCapture: () => void;
}

interface UseMockupLoopReturn {
  /** 현재 활성 단계 인덱스 (0-based) */
  step: number;
  /** 전환 직전/직후 트랜지션 상태 (fade-out 등에 활용) */
  isTransitioning: boolean;
  /** 수동으로 특정 단계로 이동 (루프 리셋) */
  goTo: (index: number) => void;
  /** 다음 단계로 수동 이동 */
  next: () => void;
  /** 루프 재시작 키 (key prop에 활용 가능) */
  loopKey: number;
  /** pauseOnHover=true일 때 루트 요소에 스프레드 (그 외엔 빈 객체) */
  hoverProps: HoverPauseProps | Record<string, never>;
  /** mode='once'에서 한 바퀴 재생이 끝나 정지한 상태 */
  done: boolean;
  /** mode='once' 정지 상태에서 처음부터 다시 재생 */
  replay: () => void;
}

export function useMockupLoop({
  steps,
  interval = 3000,
  intervals,
  active = true,
  transitionDuration = 200,
  initialStep = 0,
  pauseOnHover = false,
  mode = 'loop',
  onComplete,
}: UseMockupLoopOptions): UseMockupLoopReturn {
  const reducedMotion = usePrefersReducedMotion(); // SSR-safe, reactive
  const [step, setStep] = useState(initialStep);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loopKey, setLoopKey] = useState(0);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [done, setDone] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const cancelledRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  // goTo로 점프 시 루프를 그 step부터 재개 (기본값 initialStep → 기존 동작 동일)
  const startStepRef = useRef(initialStep);
  // intervals는 호출부에서 인라인 배열로 넘어오는 경우가 많아(렌더마다 새 참조)
  // effect 의존성에 직접 넣으면 매 렌더마다 루프가 재시작된다. 내용 기반 키로
  // 의존하고, effect 안에서는 ref로 최신 배열을 읽는다.
  const intervalsRef = useRef(intervals);
  intervalsRef.current = intervals;
  const intervalsKey = intervals ? intervals.join(',') : '';

  // pauseOnHover=false면 effectiveActive === active 이므로 기존 동작과 완전히 동일.
  const effectiveActive = active && !(pauseOnHover && isHoverPaused);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const sched = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(() => {
      if (!cancelledRef.current) fn();
    }, ms);
    timersRef.current.push(t);
  }, []);

  // 수동 이동 — 클릭한 step을 유지한 채 그 지점부터 루프 재개
  const goTo = useCallback((index: number) => {
    clearTimers();
    cancelledRef.current = true;
    const target = ((index % steps) + steps) % steps;
    startStepRef.current = target;
    setStep(target);
    setIsTransitioning(false);
    // 루프 재시작
    requestAnimationFrame(() => {
      cancelledRef.current = false;
      setLoopKey(k => k + 1);
    });
  }, [steps, clearTimers]);

  const next = useCallback(() => {
    setStep(s => (s + 1) % steps);
  }, [steps]);

  // once 정지 상태에서 처음부터 재재생
  const replay = useCallback(() => {
    clearTimers();
    cancelledRef.current = true;
    startStepRef.current = initialStep;
    setStep(initialStep);
    setDone(false);
    requestAnimationFrame(() => {
      cancelledRef.current = false;
      setLoopKey(k => k + 1);
    });
  }, [initialStep, clearTimers]);

  useEffect(() => {
    if (!effectiveActive || steps <= 1) return;
    if (mode === 'once' && done) return; // 재생 완료 — replay 전까지 정지
    if (reducedMotion) {
      // once는 '최종 결과' 프레임을 정적 표시, loop은 기존처럼 시작 프레임
      if (mode === 'once') {
        setStep(steps - 1);
        setDone(true);
      } else {
        setStep(initialStep);
      }
      return;
    }

    cancelledRef.current = false;
    clearTimers();
    const start = startStepRef.current; // goTo 점프 시 그 step, 아니면 initialStep
    setStep(start);

    const iv = intervalsRef.current;
    let elapsed = 0;

    for (let n = 0; n < steps; n++) {
      const i = (start + n) % steps; // start부터 순환
      if (n === 0) {
        // 첫 단계는 이미 설정됨
        elapsed += iv ? iv[i] : interval;
        continue;
      }

      const transitionAt = elapsed - transitionDuration;

      // 트랜지션 시작 (fade-out)
      if (transitionDuration > 0 && transitionAt > 0) {
        sched(() => setIsTransitioning(true), transitionAt);
      }

      // 단계 전환
      sched(() => {
        setStep(i);
        setIsTransitioning(false);
      }, elapsed);

      elapsed += iv ? iv[i] : interval;
    }

    if (mode === 'once') {
      // 마지막 단계에서 정지 — 최종 프레임 유지
      sched(() => {
        setDone(true);
        onCompleteRef.current?.();
      }, elapsed);
    } else {
      // 마지막 단계 후 루프 재시작 — 다음 바퀴는 initialStep부터 (자연 순환)
      sched(() => {
        startStepRef.current = initialStep;
        setLoopKey(k => k + 1);
      }, elapsed);
    }

    return () => {
      cancelledRef.current = true;
      clearTimers();
    };
  }, [effectiveActive, reducedMotion, steps, interval, intervalsKey, transitionDuration, initialStep, loopKey, mode, done, clearTimers, sched]);

  const hoverProps: HoverPauseProps | Record<string, never> = pauseOnHover
    ? {
        onPointerEnter: () => setIsHoverPaused(true),
        onPointerLeave: () => setIsHoverPaused(false),
        onFocusCapture: () => setIsHoverPaused(true),
        onBlurCapture: () => setIsHoverPaused(false),
      }
    : {};

  return { step, isTransitioning, goTo, next, loopKey, hoverProps, done, replay };
}
