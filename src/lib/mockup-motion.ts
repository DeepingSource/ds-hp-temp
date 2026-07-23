import type { Transition, Variants } from 'framer-motion';
import { ease } from './easing';
import { SAAI_MOTION } from './mockup-tokens.gen';

/**
 * mockup-motion — 목업 "내부" 모션 계약 (MOCKUP_MASTER_PLAN_v1 §2-C · D3).
 *
 * SAAI Motion 스펙: 기본 이징은 out_quint 한 방향 곡선, **bounce·spring·overshoot
 * 금지** (분석 도구의 정보 톤). 목업 내부 요소는 여기 정의된 variants/transition만
 * 쓴다 — spring-config.ts(springGentle 등)는 사이트 모션 전용이며 목업 내부 침투
 * 금지. 경계: 목업의 "등장"(스크롤 리빌·AnimatedSection)은 사이트 모션 소관,
 * 목업 "화면 안"의 움직임이 이 파일 소관이다.
 *
 * duration은 gen 산출물 SAAI_MOTION(durationMs)에서 소비 — SSOT 드리프트 방지.
 */

const MS = SAAI_MOTION.durationMs;
const sec = (ms: number) => ms / 1000;

/** out_quint 300ms — 목업 내부 요소 등장의 기본 transition */
export const motionEnter: Transition = {
  duration: sec(MS.base),
  ease: ease.outQuint,
};

/** 목업 내부 요소 등장 — y 8px→0 + opacity (framer variants) */
export const enterVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: motionEnter },
};

/** useMockupLoop 시나리오/탭 전환 — 크로스페이드 300ms */
export const swapVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: sec(MS.base), ease: ease.outQuint } },
  exit: { opacity: 0, transition: { duration: sec(MS.fast), ease: ease.outQuint } },
};

/** 리스트/카드 순차 등장 — 60ms 간격, enter 파생. 컨테이너에 부여. */
export const listStaggerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

/** listStagger의 자식 항목 — enterVariants를 그대로 쓴다 */
export const listItemVariants: Variants = enterVariants;

/** useCountUp 재규격 파라미터 — out_quint tween, spring 금지 (§2-C count) */
export const countMotion = {
  durationMs: 1000,
  /** 스칼라 이징은 @/lib/easing의 easeOutQuint — useCountUp/useCountUpGroup이 사용 */
} as const;

/** 버튼 프레스 등 즉각 affordance 피드백 — 150ms (spring 프레스 대체) */
export const motionAffordance: Transition = {
  duration: sec(MS.fast),
  ease: ease.outQuint,
};

/** 대시보드 패널 리사이즈 — 480ms transform+opacity */
export const panelTransition: Transition = {
  duration: sec(MS.pane),
  ease: ease.outQuint,
};

/** 하이라이트·알림 도착 — 800ms fade */
export const pulseTransition: Transition = {
  duration: sec(MS.pulse),
  ease: ease.outQuint,
};

/**
 * 챗 봇 응답 스트리밍 신호 — 흐르는 그라데이션(타자기 캐럿·스피너 금지).
 * framer가 아니라 CSS로 구현한다: 텍스트에 아래 클래스 문자열을 부여하고
 * globals.css의 `.saai-streaming` 규칙(배경 그라데이션 + background-clip: text,
 * --saai-dur-shimmer 주기)이 렌더한다. reduced-motion 시 애니메이션 없음.
 */
export const streamingTextClass = 'saai-streaming';
