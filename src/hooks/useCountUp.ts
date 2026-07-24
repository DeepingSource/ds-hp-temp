import { useState, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import { easeOutQuint } from '@/lib/easing';

// count-up 이징은 SAAI Motion 재규격(MOCKUP_MASTER_PLAN §2-C `count`): out_quint
// tween, spring 금지. (기존 easeOutCubic → easeOutQuint — 같은 계열의 한 방향
// 곡선이라 시각 변화는 미세하다.)

/**
 * @param from  시작 비율(0..1). 0=기존(0→target). 목업이 뷰포트 진입 전
 *   0값을 노출하지 않도록(B-2) 예: 0.55 — idle에 target×0.55를 보이고
 *   진입 시 그 지점부터 target까지 카운트업한다.
 */
export function useCountUp(target: number, active: boolean, duration = 1000, from = 0) {
  // B-2: 0이 아니라 최종값의 from 비율에서 시작 — 진입 전에도 로딩 실패처럼 보이지 않게.
  const [value, setValue] = useState(() => Math.round(target * from));
  const rafRef = useRef<number>(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!active) return; // 진입 전 — 초기 from 비율값을 유지
    if (reduced) {
      setValue(target);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = from + (1 - from) * easeOutQuint(progress);
      setValue(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, active, duration, reduced, from]);

  return value;
}

/**
 * useCountUpGroup — KPI 여러 개를 한 훅 호출·한 rAF 루프로 카운트업 (§2-C 선행 리팩터).
 *
 * "훅은 무조건 호출" 규칙 때문에 KPI 수만큼 useCountUp을 고정 나열하던 패턴
 * (MultiStoreDashboardMockup·HqMapDashboardMockup의 고정 4회 호출)을 대체한다.
 *
 * 계약: `targets.length`(와 durations 배열 길이)는 렌더 간 불변이어야 한다 —
 * KPI 구성은 정적 데이터이므로 자연 충족. targets는 인라인 배열이어도 안전하다
 * (내용 기반 키로 의존하므로 참조가 매 렌더 새로워도 루프가 재시작되지 않는다).
 *
 * @param targets   목표값 배열 (KPI 순서 고정)
 * @param active    false면 정지 (뷰포트 게이트)
 * @param durations 공통 duration(number) 또는 KPI별 배열. 기본 1000ms.
 * @returns targets와 같은 순서의 현재 값 배열
 */
export function useCountUpGroup(
  targets: number[],
  active: boolean,
  durations: number | number[] = 1000,
  from = 0,
): number[] {
  const [values, setValues] = useState<number[]>(() => targets.map((t) => Math.round(t * from)));
  const rafRef = useRef<number>(0);
  const reduced = usePrefersReducedMotion();

  // 인라인 배열(매 렌더 새 참조)로 루프가 재시작되지 않도록 내용 기반 키로 의존
  const targetsKey = targets.join(',');
  const durationsKey = Array.isArray(durations) ? durations.join(',') : String(durations);
  const targetsRef = useRef(targets);
  targetsRef.current = targets;
  const durationsRef = useRef(durations);
  durationsRef.current = durations;

  useEffect(() => {
    const t = targetsRef.current;
    if (!active) return; // 진입 전 — 초기 from 비율값 유지(B-2: 0값 노출 방지)
    if (reduced) {
      setValues([...t]);
      return;
    }

    const d = durationsRef.current;
    const durs = t.map((_, i) => (Array.isArray(d) ? (d[i] ?? 1000) : d));
    const maxDur = Math.max(...durs, 0);
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      setValues(
        t.map((target, i) => {
          const progress = Math.min(elapsed / durs[i], 1);
          const eased = from + (1 - from) * easeOutQuint(progress);
          return Math.round(eased * target);
        }),
      );
      if (elapsed < maxDur) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [targetsKey, durationsKey, active, reduced, from]);

  return values;
}
