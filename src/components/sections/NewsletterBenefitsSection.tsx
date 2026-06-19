import { Check, ArrowUp } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const benefits = [
  { text: '완전 무료', detail: '카드 등록도, 약정도 없습니다' },
  { text: '매주 1회 발송', detail: '월요일 아침, 매장 열기 전에 도착' },
  { text: '편의점 운영 특화', detail: '일반 뉴스레터가 아닌, 현장 중심 가이드' },
  { text: '언제든 구독 해지', detail: '클릭 한 번으로 해지 가능' },
];

export default function NewsletterBenefitsSection() {
  return (
    <AnimatedSection className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Benefits list */}
          <div className="flex-1">
            <p className="text-sm font-medium text-primary uppercase tracking-wide mb-3">
              무료로 시작하세요
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-8 break-keep">
              이메일 하나면 충분합니다
            </h2>

            <ul className="space-y-5">
              {benefits.map((item) => (
                <li key={item.text} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-success/10 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-success" />
                  </span>
                  <div>
                    <span className="font-bold text-gray-900">{item.text}</span>
                    <span className="text-gray-600"> — {item.detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA card */}
          <div className="flex-1 w-full max-w-md">
            <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
              <p className="text-lg font-bold text-gray-900 mb-2">
                지금 구독하고 다음 월요일에 받아보세요
              </p>
              <p className="text-sm text-gray-500 mb-6">
                편의점 운영에 바로 쓸 수 있는 AI 브리핑
              </p>
              <a
                href="#hero-newsletter"
                aria-label="상단 구독 폼으로 이동"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-bold"
              >
                <ArrowUp className="w-4 h-4" />
                지금 구독하기
              </a>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
