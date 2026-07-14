import type { Metadata } from 'next';
import CaseStudiesView from '@/components/corporate/views/CaseStudiesView';

export const metadata: Metadata = {
  title: '케이스 스터디 | DEEPINGSOURCE',
  description:
    '편의점 53개 매장 실측부터 본사 100점포 전파, 드럭스토어 결품 표준화, 카페 청결 KPI 동기화, 대형 공간 익명화까지. Golden Case 5단계로 읽는 DeepingSource 도입 사례.',
  alternates: {
    canonical: '/ko/resources/case-studies',
    languages: {
      en: '/resources/case-studies',
      ko: '/ko/resources/case-studies',
      ja: '/jp/resources/case-studies',
    },
  },
  openGraph: {
    title: '케이스 스터디 | DEEPINGSOURCE',
    description: 'Golden Case 5단계로 읽는 도입 사례 — 발견·검증·번역·전파·재측정.',
    url: '/ko/resources/case-studies',
  },
};

export default function Page() {
  return <CaseStudiesView locale="ko" />;
}
