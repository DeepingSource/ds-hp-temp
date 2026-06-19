import { MessageSquareText, FileEdit, Link2, BarChart3, RefreshCw, ChevronRight } from 'lucide-react';

const steps = [
  {
    step: 1,
    title: '상담 신청',
    duration: '5분',
    description: '온라인 폼으로 매장 상황을 간단히 공유해주세요.',
    icon: MessageSquareText,
  },
  {
    step: 2,
    title: '도입 계획 수립',
    duration: '1~2일',
    description: '담당자가 매장 환경에 맞는 도입 범위와 일정을 제안합니다.',
    icon: FileEdit,
  },
  {
    step: 3,
    title: '연동 시작',
    duration: '3~5일',
    description: '기존 CCTV·POS에 SW 연동. 대부분의 장비를 그대로 활용할 수 있습니다.',
    icon: Link2,
  },
  {
    step: 4,
    title: '첫 리포트 수신',
    duration: 'D+7',
    description: '설치 후 일주일이면 첫 분석 리포트를 받아볼 수 있습니다.',
    icon: BarChart3,
  },
];

export default function OnboardingStepsSection() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">How to Start</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">
            7일 만에 첫 리포트
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            상담 신청부터 첫 리포트까지, 빠르고 간편합니다.
          </p>
        </div>

        {/* Desktop: 4-column grid with connectors */}
        <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-0">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="contents">
                <div className="group relative p-6 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-[box-shadow,border-color] duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
                      {item.duration}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-primary-lighter flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex items-center justify-center px-2">
                    <ChevronRight className="w-5 h-5 text-gray-300" aria-hidden="true" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden space-y-4">
          {steps.map((item) => (
              <div key={item.step} className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100">
                <div className="flex flex-col items-center flex-shrink-0">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
          ))}
        </div>

        {/* Callout */}
        <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-gray-200 mt-8 max-w-2xl mx-auto">
          <RefreshCw className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-gray-600 leading-relaxed">
            기존 CCTV를 그대로 활용합니다. 소프트웨어 연동과 소형 분석 장치만 추가하면 바로 시작할 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
