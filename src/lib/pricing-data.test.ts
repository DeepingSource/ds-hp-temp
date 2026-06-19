import { describe, it, expect } from 'vitest';
import { plans } from './pricing-data';

describe('pricing-data', () => {
  it('4개 플랜이 존재', () => {
    expect(plans).toHaveLength(4);
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
