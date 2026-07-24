/**
 * saai care(StoreCare) 상태 목업 시나리오 — 로케일 무관 수치·상태.
 * 표시 문자열은 컴포넌트 내 C: Record<Locale,…>. 상태 색은 사이트 상태 토큰 매핑.
 */
import { canonicalStore } from './canonical';

/** 상태 → 사이트 토큰 (좋음=success, 주의=warning, 나쁨=error, 완벽=primary) */
export type CareState = 'good' | 'warning' | 'error' | 'perfect';

/** 종합 점수 (카운트업 타깃) — canonical perfScore 파생(값 일치·드리프트 방지, MM 2-②) */
export const careScore = canonicalStore.perfScore;

/**
 * 4개 기능 상태칩. `state`는 기본, `flipTo`가 있으면 데모 중 한 번 상태가 바뀜(온도).
 */
export const statusChips: { key: string; state: CareState; flipTo?: CareState }[] = [
  { key: 'display', state: 'good' },
  { key: 'temp', state: 'good', flipTo: 'warning' },
  { key: 'clean', state: 'good' },
  { key: 'report', state: 'perfect' },
];

/** 감지 알림 순환 시퀀스 (컴포넌트에서 라벨을 로케일별로 매핑) */
export const alertSequence = ['display', 'temp', 'clean'];

/** 냉장 온도 게이지 (틱업 start→end, 임계 초과 시 온도칩 주의) */
export const tempGauge = { start: 3.2, end: 7.8, threshold: 5.0, min: 0, max: 10 };

/** 상태 → Tailwind 클래스 (칩 배경 tint + 텍스트) */
export const stateClass: Record<CareState, { chip: string; dot: string; text: string }> = {
  good: { chip: 'bg-success/10', dot: 'bg-success', text: 'text-success' },
  warning: { chip: 'bg-warning/10', dot: 'bg-warning', text: 'text-warning' },
  error: { chip: 'bg-error/10', dot: 'bg-error', text: 'text-error' },
  perfect: { chip: 'bg-primary/10', dot: 'bg-primary', text: 'text-primary' },
};
