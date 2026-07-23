import type { Metadata } from 'next';
import StoreInsightView from '@/components/corporate/views/StoreInsightView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'saai insight — store insight | DEEPINGSOURCE',
  description:
    '분석가의 침착함으로 매장을 읽습니다. 동선·체류·전환을 교차 분석해 매출 변화의 원인을 짚어내는 엔터프라이즈 공간 분석. POS는 팔린 것만 압니다. store insight는 팔릴 뻔한 것도 압니다.',
  keywords: ['saai insight', 'store insight', '공간 분석', '매장 데이터', '동선 분석', '전환율', '매출 원인 분석', 'DeepingSource'],
  alternates: {
    canonical: '/ko/products/saai-insight',
    languages: {
      en: '/products/saai-insight',
      ko: '/ko/products/saai-insight',
      ja: '/jp/products/saai-insight',
    },
  },
  openGraph: {
    ...OG_BASE,
    title: 'saai insight — store insight | DEEPINGSOURCE',
    description: '분석가의 침착함으로 매장을 읽습니다. 매출 변화의 원인을 데이터로.',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Page() {
  return <StoreInsightView locale="ko" />;
}
