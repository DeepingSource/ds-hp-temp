import Link from 'next/link';
import dynamic from 'next/dynamic';
import AnimatedSection from '@/components/ui/AnimatedSection';
import CorporateHero from './CorporateHero';
import GuideIntroBeat from './GuideIntroBeat';
import ProblemBeat from './ProblemBeat';
import SpaceAiAnswerBeat from './SpaceAiAnswerBeat';
import FeatureCarousel from './FeatureCarousel';
import CaseBand from './CaseBand';
import HomeEnterpriseBeat from './HomeEnterpriseBeat';
import SpacesShowcase from './SpacesShowcase';
import TrustCharter from './TrustCharter';
import ParallaxWatermark from './ParallaxWatermark';
import { homeCopy, localeHref, type Locale } from '@/lib/i18n';
import { seam, purpose, productPrimary, productSecondary, type ProductKey } from '@/lib/brand-canon';
import { JsonLd, itemList, softwareApplication } from '@/lib/structured-data';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

const SpatialTrajectoryMockup = dynamic(() => import('@/components/mockups/SpatialTrajectoryMockup'), {
  loading: () => <div className="h-[400px] animate-pulse rounded-2xl bg-gray-100" />,
});

const ctaDict: Record<
  Locale,
  { kicker: string; heading: string; sub: string; close: string; reassure: string; revealLead?: string; revealSign?: string }
> = {
  ko: {
    kicker: 'REINVENT OFFLINE · 오프라인을, 다시.',
    heading: '당신의 공간을 완벽하게.',
    sub: '한 매장이 바뀌면, 운영 전체가 바뀝니다. 도입 상담으로 가장 빠른 길을 함께 찾습니다.',
    close: '도입 상담',
    reassure: '무료 상담 · 영업일 1–2일 내 회신',
    revealLead: '본사와 매장, 사장과 손님 — 보이지 않던',
    revealSign: '사이를 메웁니다. 그게, SAAI (Spatial·Anonymized·Agentic·Intelligence).',
  },
  en: {
    kicker: 'REINVENT OFFLINE',
    heading: 'Perfect your space — and every space.',
    sub: 'Change one store, and the whole operation changes. Talk to us and we’ll map the fastest path.',
    close: 'Map your fastest path',
    reassure: 'Free consultation · reply within 1–2 business days',
    revealLead: 'Connecting stores, staff, and customers — filling the gap.',
    revealSign: 'That is SAAI (Spatial·Anonymized·Agentic·Intelligence).',
  },
  jp: {
    kicker: 'REINVENT OFFLINE · オフラインを、もう一度。',
    heading: 'あなたの空間を、完璧に — 그리고 모든 공간을.',
    sub: '一店舗が変われば、運営全体が変わります。導入のご相談で、最短の道を見つけます。',
    close: '最短の道を見つける',
    reassure: '無料相談・営業日1〜2日以内に返信',
    revealLead: '本部と店舗、店主とお客様 — 見えなかった',
    revealSign: '隙間を埋めます。それが、SAAI (Spatial·Anonymized·Agentic·Intelligence)。',
  },
};

const productDict: Record<Locale, { key: ProductKey; description: string; path: string }[]> = {
  ko: [
    { key: 'insight', description: '매장에서 일어나는 일을 데이터로 읽습니다. 동선·체류·전환을 교차 분석해, 결제 데이터가 놓치는 구매 전 행동까지 짚어냅니다.', path: '/products/saai-insight' },
    { key: 'care', description: '작은 매장에도 든든한 눈 하나. 진열·온도·청결을 대신 지켜보고, 필요한 순간에만 알립니다.', path: '/products/saai-care' },
    { key: 'agent', description: '데이터에서 의사결정으로. POS와 비전을 하나로 — 무엇을, 얼마나, 어디에 둘지 물으면 답과 실행안까지.', path: '/products/saai-agent' },
    { key: 'count', description: '카메라 1대로 매장 밖 유동인구와 입문 고객을 비교해 유입률을 읽습니다. 상권 문제인지 매장 문제인지 구분해 드립니다.', path: '/products/store-count' },
  ],
  en: [
    { key: 'insight', description: 'Read what happens in your stores as data. Cross-analyzing flow, dwell, and conversion, it captures the pre-purchase behavior payment data misses.', path: '/products/saai-insight' },
    { key: 'care', description: 'A reliable extra eye, even for small stores. It watches displays, temperature, and cleanliness for you — and alerts you only when it matters.', path: '/products/saai-care' },
    { key: 'agent', description: 'Beyond data, to decisions. POS and vision in one engine — ask what to stock, how much, and where, and get the answer with an action plan.', path: '/products/saai-agent' },
    { key: 'count', description: 'One camera reads the footfall outside against the customers who walk in — your capture rate. It tells a location problem from a store problem.', path: '/products/store-count' },
  ],
  jp: [
    { key: 'insight', description: '店舗で起きていることをデータで読み解きます。動線・滞在・転換を掛け合わせ、決済データが見落とす購入前の行動まで捉えます。', path: '/products/saai-insight' },
    { key: 'care', description: '小さな店舗にも頼れる目をひとつ。陳列・温度・清潔さを代わりに見守り、必要な瞬間だけお知らせします。', path: '/products/saai-care' },
    { key: 'agent', description: 'データから意思決定へ。POSもビジョンもひとつのエンジンで — 何を、どれだけ、どこに置くか、聞けば答えと実行案まで。', path: '/products/saai-agent' },
    { key: 'count', description: 'カメラ1台で、店の外の通行と入店を見比べて流入率を読みます。立地の問題か、店舗の問題かを見極めます。', path: '/products/store-count' },
  ],
};

export default function HomeView({ locale }: { locale: Locale }) {
  const t = homeCopy[locale];
  const cta = ctaDict[locale];
  return (
    <div className={`snap-home lang-${locale}`}>
      <JsonLd
        data={itemList(
          productDict[locale].map((p) =>
            softwareApplication({
              name: productPrimary(p.key),
              alternateName: productSecondary(p.key) ?? undefined,
              description: p.description,
              path: p.path,
              locale,
            }),
          ),
        )}
      />

      {/* Beat 1 — Hero (Question H1 + 1-line sub + single primary CTA) */}
      <CorporateHero locale={locale} />

      {/* Beat 2 — Guide Introduction (Who we are + early proof & credentials) */}
      <GuideIntroBeat locale={locale} />

      {/* Beat 3 — Problem Empathy (The leak & invisible majority) */}
      <ProblemBeat locale={locale} />

      {/* Beat 4 — Spatial AI Answer ("For spaces, spatial AI.") */}
      <SpaceAiAnswerBeat locale={locale} />

      {/* Beat 5 — Plan & Operation Loop (3-step loop + 1-time product showcase) */}
      <FeatureCarousel locale={locale} />
      <CaseBand locale={locale} />

      {/* Beat 6 — Scale & HQ Vision ("Every store, like one store.") */}
      <HomeEnterpriseBeat locale={locale} />
      <SpacesShowcase locale={locale} />

      {/* Beat 7 — Trust & Safety (SEAL Anonymization + MTMC Face-free tracking) */}
      <TrustCharter locale={locale} />
      <AnimatedSection className="py-20 lg:py-28 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SpatialTrajectoryMockup locale={locale} />
        </div>
      </AnimatedSection>

      {/* Beat 8 — Closing CTA & SAAI Spellout Reveal */}
      <AnimatedSection className="relative py-20 lg:py-28 section-dark noise-overlay overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${BASE}/images/nextrise/funnel-floor-projection.webp)` }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-surface-dark/80" />
        <ParallaxWatermark src={`${BASE}/images/saai-symbol.svg`} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-2xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-6">{cta.kicker}</p>
          <p className="text-base sm:text-lg text-gray-400 mb-2 max-w-xl mx-auto break-keep">
            {cta.revealLead ?? purpose[locale].statement}
          </p>
          <p className="text-sm font-bold tracking-[0.15em] text-primary-light mb-8 font-brand">
            {cta.revealSign ?? seam[locale]}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight font-display break-keep">
            {cta.heading}
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto break-keep">{cta.sub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={localeHref(locale, '/contact')} className="btn-primary btn-lg">
              {cta.close}
            </Link>
            <Link
              href={localeHref(locale, '/products')}
              className="inline-flex items-center justify-center px-9 py-4 text-base font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
            >
              {t.ctaSecondary}
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-400 break-keep">{cta.reassure}</p>
        </div>
      </AnimatedSection>
    </div>
  );
}
