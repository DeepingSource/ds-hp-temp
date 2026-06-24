import { Package, LayoutGrid, BarChart3, Megaphone } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const previews = [
  {
    icon: Package,
    color: 'text-primary bg-primary-lighter',
    title: '이번 주 발주 추천',
    description: '날씨·요일·재고 데이터를 분석해 이번 주 발주량을 제안합니다',
  },
  {
    icon: LayoutGrid,
    color: 'text-emerald-600 bg-emerald-50',
    title: '진열 배치 가이드',
    description: '카테고리별 최적 진열 위치와 페이싱 가이드를 알려드립니다',
  },
  {
    icon: BarChart3,
    color: 'text-violet-600 bg-violet-50',
    title: '주간 매출 인사이트',
    description: '요일별·시간대별 매출 패턴과 개선 포인트를 정리합니다',
  },
  {
    icon: Megaphone,
    color: 'text-amber-600 bg-amber-50',
    title: '프로모션 제안',
    description: '날씨·이벤트 연동 프로모션과 POP 문구를 추천합니다',
  },
];

export default function NewsletterPreviewSection() {
  return (
    <AnimatedSection className="py-20 lg:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-medium text-primary uppercase tracking-wide mb-3">
            스토어레터 미리보기
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight break-keep">
            매주 이런 브리핑을 받아보세요
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {previews.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex gap-4 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
