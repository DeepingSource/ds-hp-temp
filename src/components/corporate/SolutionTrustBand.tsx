import TrustStrip from '@/components/corporate/TrustStrip';
import { trustedBrands } from '@/components/corporate/PartnerGrid';
import type { Locale } from '@/lib/i18n';

/**
 * SolutionTrustBand — 업종 페이지 상담 CTA 직전 신뢰 스트립 (①0.5·1-8 · J2 승인 완료).
 * 수치는 TrustStrip(=COMPANY SOT), 고객사 표기는 PartnerGrid.trustedBrands 워드마크 재사용
 * (로고 스프라이트는 PR-17 대기 — 새 이미지 생성 없이 텍스트 워드마크).
 * 업종→브랜드 매핑은 J2 확정: 리테일→CU·코리아세븐 / 카페→CJ푸드빌·롯데GRS /
 * 대형공간→롯데월드·국립박물관재단 / 드럭→수치만.
 */
const BRAND_IDX: Record<string, number[]> = {
  retail: [1, 2],
  'food-beverage': [3, 4],
  'drug-store': [],
  'large-space': [6, 7],
};

export default function SolutionTrustBand({
  locale,
  industry,
  className = '',
}: {
  locale: Locale;
  industry: keyof typeof BRAND_IDX | string;
  className?: string;
}) {
  const names = (BRAND_IDX[industry] ?? []).map((i) => trustedBrands[locale][i]).filter(Boolean);
  return (
    <TrustStrip
      locale={locale}
      tone="dark"
      className={className}
      logos={
        names.length ? (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {names.map((n) => (
              <span
                key={n}
                className="px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-sm font-bold text-slate-200"
              >
                {n}
              </span>
            ))}
          </div>
        ) : undefined
      }
    />
  );
}
