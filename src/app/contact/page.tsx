import type { Metadata } from 'next';
import ContactFormPage from './ContactFormPage';

export const metadata: Metadata = {
  title: 'Request a Consultation | DeepingSource',
  description: 'Request a DeepingSource consultation. Our team will get in touch within 1-2 business days.',
  alternates: {
    canonical: '/contact',
    languages: {
      en: '/contact',
      ko: '/ko/contact',
      ja: '/jp/contact',
    },
  },
  openGraph: {
    title: 'Request a Consultation | DeepingSource',
    description: 'Request a DeepingSource consultation. Our team will get in touch within 1-2 business days.',
    url: '/contact',
  },
  twitter: {
    card: 'summary',
    title: 'Request a Consultation | DeepingSource',
    description: 'Request a DeepingSource consultation. Our team will get in touch within 1-2 business days.',
  },
};

export default function ContactPage() {
  return <ContactFormPage locale="en" />;
}
