import { Check } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ActionCardMockup = dynamic(() => import('@/components/mockups/ActionCardMockup'), {
  loading: () => <div className="aspect-[393/852] max-w-[320px] mx-auto rounded-[2.6rem] bg-gray-100 animate-pulse" />,
});
const InlineNewsletterForm = dynamic(() => import('@/components/ui/InlineNewsletterForm'), {
  loading: () => <div className="h-12 max-w-md bg-gray-100 rounded-xl animate-pulse" />,
});

interface HeroCopy {
  badge?: string;
  title?: string;
  subtitle?: string;
}

interface HeroSectionProps {
  copy?: HeroCopy;
  /** 'contact' (기본) = 상담 신청 버튼, 'newsletter' = 인라인 이메일 구독 폼 */
  ctaVariant?: 'contact' | 'newsletter';
}

export default function HeroSection({ copy, ctaVariant = 'contact' }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-primary-lighter">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-20 lg:pt-36 lg:pb-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-primary/10 rounded-full text-sm text-primary font-medium mb-6 animate-fade-in-up">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              {copy?.badge ?? '03 실행 — by SAAI'}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold text-gray-900 leading-[1.2] mb-6 animate-fade-in-up delay-100 tracking-tight break-keep font-display">
              {copy?.title ? (
                copy.title.split('\n').map((line, i, arr) => (
                  <span key={i}>
                    {i === arr.length - 1 ? <span className="text-primary">{line}</span> : line}
                    {i < arr.length - 1 && <br className="hidden sm:block" />}
                  </span>
                ))
              ) : (
                <>승인 한 번이면,<br className="hidden sm:block" /><span className="text-primary">현장에 바로 전달됩니다</span></>
              )}
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 mb-10 leading-relaxed animate-fade-in-up delay-200 max-w-lg mx-auto lg:mx-0 break-keep">
              {copy?.subtitle ? (
                copy.subtitle.split('\n').map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br className="hidden sm:block" />}
                  </span>
                ))
              ) : (
                <>발주부터 홍보물까지,<br className="hidden sm:block" />AI가 제안하고 사장님은 승인만 하세요.</>
              )}
            </p>

            {/* CTA */}
            <div id="hero-newsletter" className="animate-fade-in-up delay-300">
              {ctaVariant === 'newsletter' ? (
                <InlineNewsletterForm />
              ) : (
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link href="/contact" className="btn-primary btn-lg text-center">
                    무료 상담 신청
                  </Link>
                  <a href="#pricing" className="btn-secondary btn-lg text-center">
                    요금제 보기
                  </a>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 justify-center lg:justify-start animate-fade-in-up delay-500">
              {(ctaVariant === 'newsletter' ? [
                '매주 1회 무료 발송',
                '편의점 운영 특화',
                '언제든 구독 해지',
              ] : [
                '터치 한 번으로 실행',
                'AI가 정리, 사장님이 확인',
                'POS 연동 지원',
              ]).map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                  <span className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-success" />
                  </span>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Mockup */}
          <div className="flex-1 w-full max-w-md lg:max-w-none animate-fade-in-up delay-300">
            <div className="relative">
              {/* Glow effect behind mockup */}
              <div className="absolute inset-0 bg-primary/15 rounded-3xl blur-3xl scale-90" aria-hidden="true" />
              <div className="relative">
                <ActionCardMockup />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
