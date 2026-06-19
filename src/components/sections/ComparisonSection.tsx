'use client';

import { Monitor, BarChart3, Server, Bot, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const comparisons = [
  {
    icon: Monitor,
    category: '기존 CCTV',
    limitation: '녹화만 가능합니다. 문제를 발견하려면 사람이 직접 봐야 합니다.',
    advantage: 'AI가 24시간 자동 감지합니다. 매대 빈 곳, 온도 이상이 생기면 바로 알림을 보냅니다.',
  },
  {
    icon: BarChart3,
    category: 'POS 기반 BI 툴',
    limitation: '"얼마 팔렸는지"만 알려줍니다. 왜 안 팔렸는지는 모릅니다.',
    advantage: '매출 + 동선 + 날씨를 교차 분석해 "왜 안 팔렸는지"를 공간 데이터로 설명합니다.',
  },
  {
    icon: Server,
    category: '기존 매장 관리 시스템',
    limitation: '집계를 보여줍니다. 현장에서 오늘 뭘 해야 하는지는 알려주지 않습니다.',
    advantage: '오늘 우리 매장에서 무엇을 해야 하는지 구체적으로 제안합니다. 실행까지 연결됩니다.',
  },
  {
    icon: Bot,
    category: '일반 AI 챗봇',
    limitation: '범용 AI는 우리 매장 데이터를 모릅니다. 일반적인 답변만 가능합니다.',
    advantage: '우리 매장의 어제 데이터를 기반으로 말합니다. 맥락을 아는 AI입니다.',
  },
];

export default function ComparisonSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-14 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
          <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">Why SAAI</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">
            기존 도구가 할 수 없는 것
          </h2>
          <p className="text-gray-500">
            기존 도구들이 놓치는 것을 SAAI가 봅니다.
          </p>
        </div>

        <div className="space-y-4">
          {comparisons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.category}
                className={`group grid md:grid-cols-[1fr_1fr] gap-0 rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-md transition-[box-shadow,border-color] duration-300 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {/* 기존 방식 */}
                <div className="relative p-6 bg-gray-50 group-hover:bg-gray-100/60 transition-colors duration-300">
                  <span className="absolute top-4 right-4 text-3xs font-bold text-gray-300 tabular-nums">0{idx + 1}</span>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-gray-500" aria-hidden="true" />
                    <span className="text-sm font-semibold text-gray-600">{item.category}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.limitation}</p>
                </div>
                {/* SAAI */}
                <div className="p-6 bg-emerald-50/40 group-hover:bg-emerald-50/60 transition-colors duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-bold text-emerald-700">SAAI</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-300" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.advantage}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
