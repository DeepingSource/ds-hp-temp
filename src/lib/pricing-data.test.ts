import { describe, it, expect } from 'vitest';
import { plans } from './pricing-data';

describe('pricing-data', () => {
  it('3개 플랜이 존재', () => {
    // 현재 출시된 플랜은 free/standard/premium 3종.
    // 'enterprise'는 PlanTier 타입과 comparisonFeatures 비교표에만 남아 있는
    // 유령 티어로, 별도 제품 결정 사항(플랜 카드 추가 여부)으로 분리됨.
    expect(plans).toHaveLength(3);
  });

  it('각 플랜에 필수 필드 존재', () => {
    for (const plan of plans) {
      expect(plan.id).toBeTruthy();
      expect(plan.name).toBeTruthy();
      expect(plan.features).toBeDefined();
      expect(Array.isArray(plan.features)).toBe(true);
      expect(plan.cta).toBeTruthy();
      expect(plan.ctaLink).toBeTruthy();
    }
  });

  it('popular 플랜이 정확히 1개', () => {
    const popularPlans = plans.filter((p) => p.popular);
    expect(popularPlans).toHaveLength(1);
  });
});
