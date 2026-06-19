import type { Metadata } from 'next';
import Link from 'next/link';
import { Radio, Bot, Search, Mail, MapPin, CloudSun, CheckSquare, Calendar, Lock, Clock, Store, Sunrise, Timer } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import MockupImage from '@/components/mockups/MockupImage';

export const metadata: Metadata = {
  title: '서비스 소개 | STOREAGENT',
  description:
    '이메일과 매장 위치만 입력하면 끝. AI 에이전트가 매일 새벽 당신의 매장을 위해 일합니다.',
  alternates: {
    canonical: '/storeagent/how-it-works',
  },
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'STOREAGENT AI 브리핑 시작하기',
  description: '이메일과 매장 위치만 입력하면 AI 에이전트가 매일 새벽 브리핑을 준비합니다.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '30초 가입',
      text: '이메일과 매장 위치를 입력합니다. 본사 연동 없이 개인 이메일만으로 시작합니다.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'AI 에이전트 자동 분석',
      text: '새벽 5시, AI가 날씨 API, 이벤트 DB, 캘린더에서 정보를 수집하고 매장에 맞게 분석합니다.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '아침 6시 브리핑 도착',
      text: '날씨 대비 팁, 주변 이벤트, 체크리스트가 이메일로 도착합니다.',
    },
  ],
};

const aiTimeline: { time: string; icon: LucideIcon; title: string; description: string }[] = [
  {
    time: '05:00',
    icon: Radio,
    title: '데이터 수집',
    description: '날씨 API, 이벤트 DB, 캘린더에서 최신 정보 수집',
  },
  {
    time: '05:30',
    icon: Bot,
    title: 'AI 분석·개인화',
    description: '매장 반경 1km 필터링, 우선순위 정렬, 브리핑 문장 생성',
  },
  {
    time: '05:55',
    icon: Search,
    title: '최종 검수',
    description: '실시간 날씨 데이터 반영, 최종 품질 확인',
  },
  {
    time: '06:00',
    icon: Mail,
    title: '브리핑 발송',
    description: '개인화된 모닝 브리핑이 이메일로 도착',
  },
];

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: CloudSun,
    title: '날씨 정보',
    description: '기온 변화, 비/눈 예보를 미리 알려드려요',
  },
  {
    icon: MapPin,
    title: '주변 이벤트',
    description: '반경 1km 내 콘서트, 행사, 경기 일정',
  },
  {
    icon: CheckSquare,
    title: '체크리스트',
    description: '유통기한, 청소, 발주 등 매일 점검 항목',
  },
  {
    icon: Calendar,
    title: '시즌 캘린더',
    description: '다가오는 명절, 시험, 행사 미리보기',
  },
];

export default function HowItWorksPage() {
  return (
    <main className="pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd).replace(/</g, '\\u003c') }}
      />
      {/* Hero Section */}
      <section className="text-center mb-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          어떻게 작동하나요?
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          가입 30초, 나머지는 AI 에이전트가 알아서 합니다.
        </p>
      </section>

      {/* Steps Section */}
      <section className="max-w-5xl mx-auto px-4 mb-24">
        <div className="space-y-20">
          {/* Step 01 */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">01</span>
                <span className="text-sm font-bold text-primary bg-primary-lighter px-3 py-1 rounded-full">STEP 01</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                30초 가입
              </h2>
              <p className="text-lg text-gray-700 mb-2">이메일과 매장 위치, 그게 끝입니다.</p>
              <p className="text-gray-600 mb-4">
                본사 연동 없이, 개인 이메일만으로 시작하세요.<br className="hidden sm:block" />
                가입하는 순간 AI 에이전트가 활성화됩니다.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1"><span className="text-success" aria-hidden="true">✓</span> 설치 불필요</span>
                <span className="flex items-center gap-1"><span className="text-success" aria-hidden="true">✓</span> 본사 연동 없음</span>
                <span className="flex items-center gap-1"><span className="text-success" aria-hidden="true">✓</span> 30초 완료</span>
              </div>
            </div>
            <div className="flex-1 w-full max-w-sm">
              {/* Mini Signup Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-center">무료 상담 신청</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Mail className="w-3 h-3" aria-hidden="true" />이메일</p>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-500">
                      store@example.com
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" aria-hidden="true" />매장 위치</p>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 flex items-center justify-between">
                      서울 강남구 역삼동
                      <span className="text-primary text-xs">변경</span>
                    </div>
                  </div>
                  <div className="bg-primary text-white text-center py-3 rounded-lg font-medium text-sm mt-2">
                    AI 에이전트 활성화
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-3">가입하면 내일 아침 첫 브리핑 발송</p>
              </div>
            </div>
          </div>

          {/* Step Connector */}
          <div className="flex justify-center" aria-hidden="true">
            <div className="flex flex-col items-center gap-1 text-gray-300">
              <div className="w-px h-8 bg-gray-200" />
              <span className="text-lg">↓</span>
              <div className="w-px h-8 bg-gray-200" />
            </div>
          </div>

          {/* Step 02 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="flex-1 lg:text-right">
              <div className="inline-flex items-center gap-3 mb-4 lg:flex-row-reverse">
                <span className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">02</span>
                <span className="text-sm font-bold text-primary bg-primary-lighter px-3 py-1 rounded-full">STEP 02</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                AI 에이전트가 밤새 일합니다
              </h2>
              <p className="text-lg text-gray-700 mb-2">새벽 5시, 당신의 매장을 위해.</p>
              <p className="text-gray-600 mb-4">
                기상청 날씨, 주변 행사, 시즌 캘린더를 자동으로 수집하고<br className="hidden sm:block" />
                매장 반경 1km에 맞게 필터링·분석·개인화합니다.
              </p>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {['날씨 API', '이벤트 DB', '캘린더', '뉴스'].map((source) => (
                  <span key={source} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                    {source}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full max-w-sm">
              <div className="scale-90">
                <MockupImage />
              </div>
            </div>
          </div>

          {/* Step Connector */}
          <div className="flex justify-center" aria-hidden="true">
            <div className="flex flex-col items-center gap-1 text-gray-300">
              <div className="w-px h-8 bg-gray-200" />
              <span className="text-lg">↓</span>
              <div className="w-px h-8 bg-gray-200" />
            </div>
          </div>

          {/* Step 03 */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">03</span>
                <span className="text-sm font-bold text-primary bg-primary-lighter px-3 py-1 rounded-full">STEP 03</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                아침 6시, 브리핑 도착
              </h2>
              <p className="text-lg text-gray-700 mb-2">발주 전 3분이면 오늘 할 일 파악.</p>
              <p className="text-gray-600">
                날씨 대비 팁, 주변 이벤트 알림, 오늘의 체크리스트까지<br className="hidden sm:block" />
                한 화면에서 확인하고 바로 행동으로 옮기세요.
              </p>
            </div>
            <div className="flex-1 w-full max-w-sm">
              {/* Result Summary Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Sunrise className="w-7 h-7 text-amber-500" aria-hidden="true" />
                  <h3 className="font-bold text-gray-900">오늘의 준비 완료</h3>
                </div>
                <div className="space-y-3 mb-5">
                  {[
                    { label: '날씨 대비 팁 확인', done: true },
                    { label: '주변 이벤트 2건 파악', done: true },
                    { label: '체크리스트 4항목 준비', done: true },
                    { label: '시즌 캘린더 확인', done: true },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-success text-xs">✓</span>
                      </div>
                      <span className="text-sm text-gray-700">{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-primary-lighter rounded-xl p-3 text-center">
                  <p className="text-sm text-primary font-medium">
                    <Timer className="w-4 h-4 inline mr-1" aria-hidden="true" />예상 확인 시간: <span className="font-bold">3분</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agent Timeline Section */}
      <section className="bg-gray-900 noise-overlay bg-grid-pattern py-20 px-4 mb-20 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary-light text-sm font-medium mb-2 tracking-wider uppercase">Behind the scenes</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              당신이 자는 동안
            </h2>
            <p className="text-gray-300">
              AI 에이전트의 새벽 루틴을 소개합니다
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiTimeline.map((step, index) => (
              <div key={step.time} className="relative">
                {/* Connector (desktop) */}
                {index < aiTimeline.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[60%] w-[80%] border-t border-dashed border-gray-600" aria-hidden="true" />
                )}
                <div className="bg-gray-800 rounded-xl p-5 relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center" aria-hidden="true">
                      <step.icon className="w-5 h-5 text-primary-light" />
                    </div>
                    <span className="text-primary-light font-mono font-bold text-lg">{step.time}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            이 모든 과정이 자동으로, 매일 반복됩니다.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gray-50 py-20 px-4 mb-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">
            브리핑에 포함되는 것들
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            매일 아침, 오늘 필요한 정보만 쏙쏙 골라서 보내드립니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-[box-shadow] duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary-lighter flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-4xl mx-auto px-4 mb-20">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            왜 STOREAGENT인가요?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {([
              { icon: Lock, title: '본사 연동 불필요', desc: '개인 이메일로 구독하며, 본사 시스템과 연동되지 않습니다.' },
              { icon: Clock, title: '매일 아침 6시', desc: '출근 전에 확인하고, 준비된 상태로 영업을 시작하세요.' },
              { icon: Store, title: '모든 브랜드 OK', desc: 'CU, GS25, 세븐일레븐, 이마트24 등 모든 편의점에서 사용 가능합니다.' },
            ] as const).map((item) => {
              const ItemIcon = item.icon;
              return (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 bg-primary-lighter rounded-full flex items-center justify-center mx-auto mb-4">
                  <ItemIcon className="w-7 h-7 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          지금 바로 시작하세요
        </h2>
        <p className="text-gray-600 mb-8">
          무료 뉴스레터로 먼저 경험해 보세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="btn-primary btn-lg text-center"
          >
            무료 상담 신청
          </Link>
          <Link
            href="/storeagent/pricing"
            className="btn-secondary btn-lg text-center"
          >
            플랜 비교하기
          </Link>
        </div>
      </section>
    </main>
  );
}
