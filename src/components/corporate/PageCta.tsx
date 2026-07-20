import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';

/**
 * PageCta — 공용 하단 상담 CTA(F-7 CTA 감사). CTA가 없던 페이지(문서·용어·이벤트 등)에
 * 일관된 Contact 진입점을 제공한다. 카피는 기능성(사이트 표준 '도입 상담' 라벨 재사용).
 */
const COPY: Record<Locale, { eyebrow: string; heading: string; sub: string; cta: string }> = {
  ko: { eyebrow: '도움이 필요하신가요?', heading: '우리 매장에 맞는 도입, 상담으로 확인하세요', sub: '매장 환경과 목표에 맞는 구성을 전문가와 함께 잡아드립니다.', cta: '도입 상담' },
  en: { eyebrow: 'Need a hand?', heading: 'Find the right setup for your store — talk to us', sub: 'Our team will shape a configuration around your store’s environment and goals.', cta: 'Talk to us' },
  jp: { eyebrow: 'お困りですか?', heading: '店舗に合った導入を、ご相談で', sub: '店舗環境と目標に合わせた構成を専門家と一緒に設計します。', cta: '導入のご相談' },
};

export default function PageCta({ locale, product }: { locale: Locale; product?: string }) {
  const c = COPY[locale];
  const href = localeHref(locale, '/contact') + (product ? `?product=${product}` : '');
  return (
    <section className="section-dark relative overflow-hidden py-20">
      <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary-light">{c.eyebrow}</p>
        <h2 className="mb-4 text-2xl font-bold text-white break-keep sm:text-3xl">{c.heading}</h2>
        <p className="mb-8 text-slate-300 break-keep">{c.sub}</p>
        <Link href={href} className="btn-primary btn-lg inline-flex items-center gap-2">
          {c.cta}
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
