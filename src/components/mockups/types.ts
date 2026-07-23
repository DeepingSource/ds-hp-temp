/**
 * 목업 컴포넌트 공통 타입
 *
 * 모든 인터랙티브 목업은 BaseMockupProps를 확장.
 */

import type { Locale } from '@/lib/i18n';

/** 모든 인터랙티브 목업 컴포넌트에 공통으로 적용되는 기본 props */
export interface BaseMockupProps {
  /** false로 설정하면 내부 애니메이션 순환을 중지합니다 (탭 비활성 시 활용) */
  active?: boolean;
  /** 매장명 오버라이드 (기본: '강남역점') */
  storeName?: string;
  /** UI 문자열·날짜 포맷 로케일 (기본 ko — 미니사이트 하위호환) */
  locale?: Locale;
  /** 추가 CSS 클래스 */
  className?: string;
}

// ── 콘텐츠 오버라이드 규약 (docs/MOCKUP_SYSTEM_GUIDE.md) ────────────────────
//
// 목업은 파일을 복제하지 않고도 "같은 컴포넌트, 다른 페이지, 다른 문구/숫자"로
// 재사용 가능해야 한다. 규약:
//   1) 컴포넌트는 지금처럼 locale별 기본 콘텐츠(COPY 맵 또는 canonical 데이터
//      파생)를 유지한다 — 이게 fallback이자 SSOT다. (빈 화면 금지 원칙 유지)
//   2) 호출부에서 다른 콘텐츠가 필요하면, 그 콘텐츠와 "같은 타입"의 선택적
//      prop(예: `scenarios?: ChatMessage[][]`, `content?: DeepPartial<MyCopy>`)을
//      추가로 받아 기본값 위에 병합하거나 통째로 교체한다. 컴포넌트 내부를 고치지
//      않고 사용처에서 문구/숫자를 주입하는 것이 목표다.
//   3) 부분 병합이 필요하면 아래 mergeMockupContent()를 사용한다. 통째로 교체가
//      더 예측 가능한 경우(예: 시나리오 배열)엔 단순 `override ?? default` 패턴을
//      써도 된다 — 이 경우 mergeMockupContent는 필요 없다.
// 마이그레이션 예시(ChatMockup)와 체크리스트는 docs/MOCKUP_SYSTEM_GUIDE.md 참고.

/** T의 모든 필드를 재귀적으로 optional화 — 콘텐츠 오버라이드 prop 타입에 사용. */
export type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartial<U>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

/**
 * 기본 콘텐츠(base) 위에 부분 오버라이드(override)를 재귀 병합한다.
 * - override가 없으면 base를 그대로 반환한다(항상 유효한 기본값 보장 — 빈 화면 금지).
 * - 배열은 원소 단위로 병합하지 않고 override 쪽으로 통째로 교체한다(개수·순서가
 *   달라질 수 있어 인덱스 병합은 오히려 예측 불가능하기 때문).
 */
export function mergeMockupContent<T>(base: T, override?: DeepPartial<T>): T {
  if (override === undefined) return base;
  if (Array.isArray(base)) return override as unknown as T;
  if (base !== null && typeof base === 'object' && override !== null && typeof override === 'object') {
    const result = { ...(base as object) } as Record<string, unknown>;
    const overrideObj = override as Record<string, unknown>;
    for (const key of Object.keys(overrideObj)) {
      const overrideVal = overrideObj[key];
      const baseVal = (base as Record<string, unknown>)[key];
      result[key] =
        overrideVal !== undefined && baseVal !== null && typeof baseVal === 'object'
          ? mergeMockupContent(baseVal as never, overrideVal as never)
          : overrideVal;
    }
    return result as T;
  }
  return override as unknown as T;
}
