import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle2, Clock, Sparkles, Mail,
} from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import HeroSection from '@/components/sections/HeroSection';
import FeatureSection from '@/components/sections/FeatureSection';

const AgentMockupShowcase = dynamic(
  () => import('@/components/sections/AgentMockupShowcase'),
  { loading: () => <div className="min-h-[600px] bg-gray-50 animate-pulse rounded-2xl" /> }
);
const NewsletterPreviewSection = dynamic(
  () => import('@/components/sections/NewsletterPreviewSection'),
  { loading: () => <div className="min-h-[400px] bg-white animate-pulse" /> }
);
const NewsletterBenefitsSection = dynamic(
  () => import('@/components/sections/NewsletterBenefitsSection'),
  { loading: () => <div className="min-h-[400px] bg-gray-50 animate-pulse" /> }
);
const InlineNewsletterForm = dynamic(
  () => import('@/components/ui/InlineNewsletterForm'),
  { loading: () => <div className="h-12 max-w-md bg-white/10 rounded-xl animate-pulse" /> }
);
const PricingSection = dynamic(
  () => import('@/components/sections/PricingSection'),
  { loading: () => <div className="min-h-[500px] bg-gray-50 animate-pulse rounded-2xl" /> }
);
const FAQSection = dynamic(
  () => import('@/components/sections/FAQSection'),
  { loading: () => <div className="min-h-[400px] bg-gray-50 animate-pulse rounded-2xl" /> }
);

/* ─── 로드맵 데이터 ─── */
const roadmap = [
  {
    stage: '알림/추천',
    status: '현재',
    statusIcon: CheckCircle2,
    statusColor: 'text-emerald-600 bg-emerald-50',
    description: '매일 아침 액션 카드로 발주·진열·프로모션을 제안합니다',
  },
  {
    stage: '반자동 실행',
    status: '곧',
    statusIcon: Clock,
    statusColor: 'text-blue-600 bg-blue-50',
    description: '승인 한 번으로 최적화된 운영 가이드가 현장 담당자에게 바로 전달',
  },
  {
    stage: '자율 최적화',
    status: '미래',
    statusIcon: Sparkles,
    statusColor: 'text-violet-600 bg-violet-50',
    description: '설정한 규칙 안에서 AI가 실행까지 자동 처리',
  },
];

function buildJsonLd(canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'STOREAGENT',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    description: '발주, 진열, 프로모션까지 자동 제안하는 AI 매장 운영 에이전트. 승인 한 번이면 현장에 바로 전달됩니다.',
    url: canonicalUrl,
    offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', url: 'https://storeagent.kr/contact' },
    provider: { '@type': 'Organization', name: 'DeepingSource', url: 'https://www.deepingsource.io' },
  };
}

/* ─── Props ─── */
interface StoreAgentContentProps {
  heroCopy?: { badge?: string; title?: string; subtitle?: string };
  featureHeading?: string;
  ctaCopy?: { title: string; subtitle: string };
  /** Sample page href — '/sample' on minisite, '/storeagent/sample' on main site */
  sampleHref?: string;
  /** Canonical URL for JSON-LD */
  canonicalUrl?: string;
  /** 'contact' (기본) = 상담 CTA, 'newsletter' = 뉴스레터 구독 CTA */
  ctaVariant?: 'contact' | 'newsletter';
}

export default function StoreAgentContent({
  heroCopy,
  featureHeading,
  ctaCopy,
  sampleHref = '/storeagent/sample',
  canonicalUrl = 'https://storeagent.kr/storeagent',
  ctaVariant = 'contact',
}: StoreAgentContentProps) {
  const ctaTitle = ctaCopy?.title ?? '승인 한 번이면, 현장에 바로 전달됩니다';
  const ctaSubtitle = ctaCopy?.subtitle ?? '사장님의 승인 한 번으로 최적화된 운영 가이드가 현장에 바로 전달되어 실행을 돕습니다';
  const storeAgentJsonLd = buildJsonLd(canonicalUrl);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storeAgentJsonLd).replace(/</g, '\\u003c') }} />

      {/* ── S1 · Hero ── */}
      <HeroSection copy={heroCopy} ctaVariant={ctaVariant} />

      {/* ── S2 · 핵심 기능 ── */}
      <FeatureSection heading={featureHeading} hidePop={ctaVariant === 'newsletter'} />

      {/* ── S3 · 목업 쇼케이스 (뉴스레터 variant에서는 숨김) ── */}
      {ctaVariant !== 'newsletter' && <AgentMockupShowcase />}

      {ctaVariant === 'newsletter' ? (
        <>
          {/* ── S4 · 뉴스레터 미리보기 ── */}
          <NewsletterPreviewSection />

          {/* ── S5 · 구독 혜택 + 중간 CTA ── */}
          <NewsletterBenefitsSection />
        </>
      ) : (
        <>
          {/* ── S4 · 로드맵 — 리테일 OS ── */}
          <AnimatedSection className="py-20 lg:py-28 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight break-keep">
                  매장 운영의 자율 주행,
                  <br className="hidden sm:block" />
                  <span className="text-blue-600">리테일 OS로 진화합니다</span>
                </h2>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                  지금은 알림·추천부터, 곧 운영 전체를 자동화합니다
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-8 relative items-stretch">
                <div className="hidden sm:block absolute top-[4.5rem] left-0 w-full h-0.5 bg-gray-200 -z-0" />

                {roadmap.map((item, idx) => {
                  const StatusIcon = item.statusIcon;
                  return (
                    <div key={item.stage} className="relative z-10 group flex flex-col">
                      <div className="p-8 bg-white rounded-[32px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-[box-shadow,transform] duration-500 hover:-translate-y-2 flex flex-col h-full">
                        <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold mb-6 ${item.statusColor} shadow-sm`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {item.status}
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold">
                            0{idx + 1}
                          </span>
                          <h3 className="text-xl font-bold text-gray-900 tracking-tight">{item.stage}</h3>
                        </div>

                        <p className="text-base text-gray-600 leading-relaxed font-medium">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>

          {/* ── S5 · 요금 ── */}
          <PricingSection />
        </>
      )}

      {/* ── S6 · FAQ ── */}
      <FAQSection />

      {/* ── S7 · CTA ── */}
      <AnimatedSection className="relative py-20 lg:py-28 bg-slate-900 noise-overlay overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-blue-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {ctaVariant === 'newsletter' ? (
            <>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-400 font-medium mb-8">
                <Mail className="w-4 h-4" />
                매주 무료 발송
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight break-keep">
                {ctaTitle}
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed break-keep">
                {ctaSubtitle}
              </p>
              <div className="max-w-md mx-auto">
                <InlineNewsletterForm variant="dark" sampleHref={sampleHref} />
              </div>
              <p className="mt-6 text-xs text-gray-300">
                스팸 없이, 언제든 구독 해지 가능합니다
              </p>
            </>
          ) : (
            <>
              {/* 시너지 배너 */}
              <div className="inline-block mb-10 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-sm sm:text-base text-gray-300 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">STORECARE</span> 가 관찰하고,
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 font-bold">STOREINSIGHT</span> 가 분석하고,
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold">STOREAGENT</span> 가 실행합니다
                </p>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight break-keep">
                {ctaTitle}
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed break-keep">
                {ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact?product=StoreAgent"
                  className="inline-flex items-center justify-center gap-2 px-9 py-4 text-base font-bold text-slate-900 bg-blue-500 hover:bg-blue-400 rounded-xl btn-shimmer shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-[background-color,box-shadow] cursor-pointer"
                >
                  무료 상담 신청
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
                <Link
                  href={sampleHref}
                  className="inline-flex items-center justify-center gap-1 px-9 py-4 text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl backdrop-blur-sm transition-colors cursor-pointer"
                >
                  <Sparkles className="w-5 h-5" />
                  AI 브리핑 샘플
                </Link>
              </div>

              <p className="mt-8 text-xs text-gray-300">
                <Link href="/storecare" className="underline hover:text-gray-300 transition-colors">STORECARE</Link>
                {' · '}
                <Link href="/storeinsight" className="underline hover:text-gray-300 transition-colors">STOREINSIGHT</Link>
                와 연결하면 더 강력합니다
              </p>
            </>
          )}
        </div>
      </AnimatedSection>
    </>
  );
}
