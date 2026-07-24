'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import type { SolutionStep } from '@/data/solutionsData';
import { type Locale } from '@/lib/i18n';

const StoreCareMockup      = dynamic(() => import('@/components/mockups/StoreCareMockup'), { ssr: false });
const ActionCardMockup     = dynamic(() => import('@/components/mockups/ActionCardMockup'), { ssr: false });
const StoreInsightMockup   = dynamic(() => import('@/components/mockups/StoreInsightMockup'), { ssr: false });

// D2(G5 기본안·J3): 제품별 구분색 3종 폐지 — 구분은 스텝 번호+워드마크가
// 담당하고, 색은 활성/비활성 상태만 SAAI 단일 블루로 표현한다. 구분력이 부족하다고
// 판정될 때만 B안(SAAI 데이터 hue 단계 칩)을 투입한다(MM §7).

/** Display labels — the keys stay as logic identifiers (SolutionStep['product']). */
const PRODUCT_DISPLAY: Record<SolutionStep['product'], string> = {
  StoreCare:    'store care',
  StoreInsight: 'store insight',
  StoreAgent:   'store agent',
};

const C: Record<Locale, {
  eyebrow: string;
  heading: string;
  disclaimer: string;
  productLabels: Record<SolutionStep['product'], string>;
}> = {
  ko: {
    eyebrow: '실제 화면',
    heading: '이런 화면으로 확인합니다',
    disclaimer: '화면은 예시이며 실제 서비스와 다를 수 있습니다.',
    productLabels: { StoreCare: '01 감지', StoreInsight: '02 분석', StoreAgent: '03 실행' },
  },
  en: {
    eyebrow: 'Live preview',
    heading: 'This is what you actually see',
    disclaimer: 'Screens are illustrative and may differ from the actual service.',
    productLabels: { StoreCare: '01 Detect', StoreInsight: '02 Analyze', StoreAgent: '03 Act' },
  },
  jp: {
    eyebrow: '実際の画面',
    heading: 'こんな画面で確認できます',
    disclaimer: '画面は例であり、実際のサービスと異なる場合があります。',
    productLabels: { StoreCare: '01 検知', StoreInsight: '02 分析', StoreAgent: '03 実行' },
  },
};

function MockupComponent({ product, active, locale }: { product: SolutionStep['product']; active: boolean; locale: Locale }) {
  if (product === 'StoreCare')    return <StoreCareMockup active={active} locale={locale} />;
  if (product === 'StoreAgent')   return <ActionCardMockup active={active} locale={locale} />;
  return <StoreInsightMockup active={active} locale={locale} />;
}

interface Props {
  steps: SolutionStep[];
  locale?: Locale;
}

export default function SolutionMockupPreview({ steps, locale = 'en' }: Props) {
  const t = C[locale];
  // 중복 제거 — 순서 유지
  const products = steps
    .map((s) => s.product)
    .filter((p, i, arr) => arr.indexOf(p) === i);

  const [activeProduct, setActiveProduct] = useState<SolutionStep['product']>(products[0]);

  if (products.length === 0) return null;

  return (
    <div>
      <p className="text-sm font-medium text-primary mb-5 tracking-wider uppercase">{t.eyebrow}</p>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 break-keep">
        {t.heading}
      </h2>

      {/* 제품 탭 */}
      {products.length > 1 && (
        <div className="flex gap-2 mb-6 flex-wrap">
          {products.map((product) => {
            const isActive = product === activeProduct;
            return (
              <button
                key={product}
                type="button"
                onClick={() => setActiveProduct(product)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'border-primary-light bg-primary-lighter text-primary-dark'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {t.productLabels[product]} · <span className="font-semibold">{PRODUCT_DISPLAY[product]}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* 목업 표시 */}
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="w-full sm:w-auto sm:flex-shrink-0 flex justify-center">
          {/* 크기는 각 목업의 MockupViewport(phone 390×844) 소관 — 호출부는 폭만(v2 계약).
              구 aspectRatio 9/19 임의 컨테이너는 캔버스 비율과 어긋나 제거. */}
          <div className="w-full max-w-[320px]">
            <div className="grid items-start" style={{ gridTemplateAreas: '"stack"' }}>
              {products.map((product) => (
                /* min-w-0: Viewport 내부 고정폭(390)이 그리드 트랙 min-content로 전파돼
                   셀이 캔버스 폭까지 벌어지는 것을 차단 — 없으면 scale이 1로 자기고정된다. */
                <div
                  key={product}
                  style={{ gridArea: 'stack' }}
                  className={`min-w-0 transition-opacity duration-300 ${product === activeProduct ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  <MockupComponent product={product} active={product === activeProduct} locale={locale} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 현재 제품 단계 설명 */}
        <div className="flex-1 min-w-0 sm:pt-4">
          {steps
            .filter((s) => s.product === activeProduct)
            .map((step, i) => (
              <div key={i} className="p-5 rounded-2xl border border-primary-lighter bg-primary-lighter/50">
                <p className="text-xs font-bold mb-2 text-primary-dark">{step.productLabel}</p>
                <p className="font-bold text-gray-900 mb-2 break-keep">{step.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed break-keep">{step.desc}</p>
              </div>
            ))}
          <p className="text-xs text-gray-500 mt-4 flex items-start gap-1.5">
            <span className="shrink-0">ⓘ</span>
            {t.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
