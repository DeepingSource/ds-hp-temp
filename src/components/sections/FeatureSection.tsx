'use client';

import { ClipboardCheck, Palette, CloudRain, Users, Shield } from 'lucide-react';
import Image from 'next/image';
import { productImages } from '@/data/siteImages';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const popTags = ['프로모션 포스터', 'POP 배너', '메뉴판', 'SNS 이미지'];

const features = [
  {
    icon: ClipboardCheck,
    title: '오늘 할 일 액션 카드',
    description: '오늘 할 일을 AI가 정리합니다. 확인만 하면 끝.',
  },
  {
    icon: Palette,
    title: 'AI 홍보물(POP) 자동 제작',
    description: '행사·신상품 포스터를 AI가 즉시 제작합니다.',
    badge: '곧 출시',
  },
  {
    icon: CloudRain,
    title: '날씨·행사 연동 발주 제안',
    description: '내일 비? 근처 축제? 매출 예측에 맞춰 발주량을 제안합니다.',
  },
  {
    icon: Users,
    title: '근무 스케줄 최적화',
    description: '방문자 패턴에 맞춰 최적 근무 배치를 제안합니다.',
  },
];

export default function FeatureSection({ heading, hidePop }: { heading?: string; hidePop?: boolean } = {}) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section id="features" ref={ref} className="section bg-bg-cool">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className={`text-center mb-14 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
          <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">Features</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 break-keep">
            {heading ?? '매일 이렇게 운영이 달라집니다'}
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group bg-white rounded-2xl p-7 border border-gray-100 shadow-sm overflow-hidden group-hover:border-primary/20 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                {/* Color accent bar */}
                <div className="h-[3px] bg-primary -mx-[29px] -mt-[29px] mb-5" aria-hidden="true" />
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 transition-shadow duration-200 group-hover:shadow-md">
                  <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium text-gray-900 text-sm">
                    {feature.title}
                  </h3>
                  {feature.badge && (
                    <span className="px-2 py-0.5 bg-rose-100 text-rose-600 text-xs font-bold rounded-full shrink-0">
                      {feature.badge}
                    </span>
                  )}
                </div>
                <p className="text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {!hidePop && <div className={`mt-12 mb-12 bg-white rounded-3xl border border-rose-100 overflow-hidden shadow-sm ${isVisible ? 'scroll-visible delay-400' : 'scroll-hidden'}`}>
          <div className="flex flex-col lg:flex-row items-center">
            <div className="p-8 lg:p-12 lg:w-5/12 flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-bold mb-4">
                <Palette className="w-3.5 h-3.5" /> 곧 출시 예정
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-snug">
                텍스트 한 줄이면,<br className="hidden sm:block" />AI가 홍보물을 완성합니다
              </h3>
              <p className="text-base text-gray-600 leading-relaxed mb-4">
                &ldquo;1+1 여름 행사 포스터 만들어줘&rdquo; — 한 줄이면 AI가 상권에 딱 맞는 디자인을 완성합니다. 디자이너 없이도 고퀄리티 홍보물을 바로 출력할 수 있습니다.
              </p>
              <div className="flex flex-wrap gap-2">
                {popTags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-rose-50 text-rose-600 text-xs font-medium rounded-lg">{tag}</span>
                ))}
              </div>
            </div>
            <div className="lg:w-7/12 w-full bg-gray-50 relative flex-shrink-0 overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <Image
                src={productImages.storeagentMockup.src}
                fill
                alt="AI 홍보물 생성 단말기 목업"
                className="object-cover"
                style={{ objectPosition: '50% 40%', transform: 'scale(1.12)' }}
                sizes="(max-width: 768px) 100vw, 60vw"
                loading="lazy"
              />
            </div>
          </div>
        </div>}

        {/* Additional Message */}
        <div className={`text-center ${isVisible ? 'scroll-visible delay-500' : 'scroll-hidden'}`}>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 text-gray-600 rounded-full text-sm font-medium shadow-sm">
            <Shield className="w-4 h-4 text-primary" />
            AI가 정리하고, 사장님이 확인합니다
          </span>
        </div>
      </div>
    </section>
  );
}
