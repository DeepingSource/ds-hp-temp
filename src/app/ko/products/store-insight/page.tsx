import type { Metadata } from 'next';
import StoreInsightView from '@/components/corporate/views/StoreInsightView';

export const metadata: Metadata = {
  title: 'saai insight — store insight | DeepingSource — 매장을 읽는 공간 분석',
  description:
    '분석가의 침착함으로 매장을 읽습니다. 동선·체류·전환을 교차 분석해 매출 변화의 원인을 짚어내는 엔터프라이즈 공간 분석. POS는 팔린 것만 압니다. store insight는 팔릴 뻔한 것도 압니다.',
  keywords: ['saai insight', 'store insight', '공간 분석', '매장 데이터', '동선 분석', '전환율', '매출 원인 분석', 'DeepingSource'],
  alternates: {
    canonical: '/ko/products/store-insight',
    languages: {
      en: '/products/store-insight',
      ko: '/ko/products/store-insight',
      ja: '/jp/products/store-insight',
    },
  },
  openGraph: {
    title: 'saai insight — store insight | DeepingSource',
    description: '분석가의 침착함으로 매장을 읽습니다. 매출 변화의 원인을 데이터로.',
    type: 'website',
  },
};

export default function Page() {
  return <StoreInsightView locale="ko" />;
}
