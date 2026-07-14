import type { Metadata } from 'next';
import ContactFormPage from '../../contact/ContactFormPage';

export const metadata: Metadata = {
  title: '도입 상담 | DEEPINGSOURCE',
  description: '딥핑소스 도입 상담을 신청하세요. 영업일 1-2일 내 담당자가 연락드립니다.',
  alternates: {
    canonical: '/ko/contact',
    languages: {
      en: '/contact',
      ko: '/ko/contact',
      ja: '/jp/contact',
    },
  },
  openGraph: {
    title: '도입 상담 | DEEPINGSOURCE',
    description: '딥핑소스 도입 상담을 신청하세요. 영업일 1-2일 내 담당자가 연락드립니다.',
    url: '/ko/contact',
  },
  twitter: {
    card: 'summary',
    title: '도입 상담 | DEEPINGSOURCE',
    description: '딥핑소스 도입 상담을 신청하세요. 영업일 1-2일 내 담당자가 연락드립니다.',
  },
};

export default function ContactPage() {
  return <ContactFormPage locale="ko" />;
}
