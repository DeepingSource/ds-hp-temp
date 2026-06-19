import type { Metadata } from 'next';
import ContactFormPage from '../../contact/ContactFormPage';

export const metadata: Metadata = {
  title: '導入のご相談 | DeepingSource',
  description: 'DeepingSource 導入のご相談をお申し込みください。営業日1-2日以内に担当者よりご連絡いたします。',
  alternates: {
    canonical: '/jp/contact',
    languages: {
      en: '/contact',
      ko: '/ko/contact',
      ja: '/jp/contact',
    },
  },
  openGraph: {
    title: '導入のご相談 | DeepingSource',
    description: 'DeepingSource 導入のご相談をお申し込みください。営業日1-2日以内に担当者よりご連絡いたします。',
    url: '/jp/contact',
  },
  twitter: {
    card: 'summary',
    title: '導入のご相談 | DeepingSource',
    description: 'DeepingSource 導入のご相談をお申し込みください。営業日1-2日以内に担当者よりご連絡いたします。',
  },
};

export default function ContactPage() {
  return <ContactFormPage locale="jp" />;
}
