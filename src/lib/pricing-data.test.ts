import { describe, it, expect } from 'vitest';
import { plans, B2C_PRICING, B2B_PRICING } from './pricing-data';

describe('pricing-data', () => {
  it('4개 플랜이 존재', () => {
    // free/standard/premium/enterprise. enterprise는 '맞춤 견적'으로
    // /contact?plan=enterprise를 통해 문의받는 최상위 티어.
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

describe('B2C_PRICING', () => {
  it('매장 단위 가격이 정확', () => {
    expect(B2C_PRICING.storeCare.basic).toBe(14900);
    expect(B2C_PRICING.storeCare.plus).toBe(24500);
    expect(B2C_PRICING.tempMonitoring.base).toBe(10000);
    expect(B2C_PRICING.tempMonitoring.extraPer5).toBe(5000);
    expect(B2C_PRICING.deviceCost).toBe(50000);
    expect(B2C_PRICING.storeInsight.base).toBe(29000);
    expect(B2C_PRICING.storeInsight.perCamera).toBe(15000);
    expect(B2C_PRICING.storeAgent.standard).toBe(15000);
    expect(B2C_PRICING.storeAgent.premium).toBe(25000);
  });
});

describe('B2B_PRICING', () => {
  it('카메라당 환산 단가가 정확', () => {
    expect(B2B_PRICING.perCamera).toBe(6125);
  });

  it('할인 구간이 50/20/10/5/4 매장에서 30/20/15/10/0%', () => {
    const getDiscount = (count: number) =>
      B2B_PRICING.discountTiers.find(tg => count >= tg.minStores)?.percent ?? 0;
    expect(getDiscount(50)).toBe(30);
    expect(getDiscount(20)).toBe(20);
    expect(getDiscount(10)).toBe(15);
    expect(getDiscount(5)).toBe(10);
    expect(getDiscount(4)).toBe(0);
  });
});
