import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, CheckCircle2, MailOpen, Sun, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: '구독 완료 | DeepingSource',
  description: '뉴스레터 구독이 완료되었습니다. 매주 유용한 매장 운영 인사이트를 보내드립니다.',
};

const nextSteps: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: MailOpen,
    title: '이메일함 확인',
    description: '스팸함에 들어갔을 수 있으니 확인해 주세요.',
  },
  {
    icon: Sun,
    title: '첫 뉴스레터',
    description: '이번 주 내로 첫 번째 뉴스레터가 발송됩니다.',
  },
  {
    icon: TrendingUp,
    title: '업그레이드',
    description: '매일 브리핑이 필요하면 언제든 플랜을 변경하세요.',
  },
];

export default function ThankYouPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="mb-6 animate-checkmark flex justify-center">
          <CheckCircle2 className="w-20 h-20 text-success" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up delay-100">
          구독해 주셔서 감사합니다!
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-10 leading-relaxed animate-fade-in-up delay-200">
          매주 유용한 운영 인사이트를 보내드릴게요.
        </p>

        {/* Next Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 animate-fade-in-up delay-300">
          {nextSteps.map((step) => {
            const StepIcon = step.icon;
            return (
            <div
              key={step.title}
              className="bg-gray-50 rounded-xl p-5 text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-lighter flex items-center justify-center mx-auto mb-2" aria-hidden="true">
                <StepIcon className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-semibold text-gray-900 text-sm mb-1">
                {step.title}
              </h2>
              <p className="text-xs text-gray-500">{step.description}</p>
            </div>
            );
          })}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up delay-400">
          <Link
            href="/"
            className="btn-secondary text-center"
          >
            <ArrowLeft className="w-4 h-4" /> 메인으로
          </Link>
          <Link
            href="/storeagent/pricing"
            className="btn-primary text-center"
          >
            플랜 둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
}
