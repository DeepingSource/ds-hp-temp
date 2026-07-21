import type { Metadata } from 'next';
import AnonymizerView from '@/components/corporate/views/AnonymizerView';

export const metadata: Metadata = {
  title: 'Anonymizer — 영상 익명화 모듈 | DEEPINGSOURCE',
  description:
    'CCTV·영상 스트림에서 개인 식별 정보를 실시간으로 제거하면서 분석에 필요한 행동·동선 신호는 보존하는 익명화 모듈. 처리 메커니즘, 사양, 규제 준수를 정리합니다.',
  alternates: {
    canonical: '/ko/technology/anonymizer',
    languages: {
      'x-default': '/technology/anonymizer',
      en: '/technology/anonymizer',
      ko: '/ko/technology/anonymizer',
      ja: '/jp/technology/anonymizer',
    },
  },
  openGraph: {
    locale: 'ko_KR',
    title: 'Anonymizer — 영상 익명화 모듈 | DEEPINGSOURCE',
    description: '개인 식별 정보는 제거하고 분석 신호는 보존하는 영상 익명화 모듈의 기술 개요.',
    url: '/ko/technology/anonymizer',
  },
};

// Korean Anonymizer — /ko/technology/anonymizer (PLAN_v1.1 D6 path-prefix i18n)
export default function KoAnonymizerPage() {
  return <AnonymizerView locale="ko" />;
}
