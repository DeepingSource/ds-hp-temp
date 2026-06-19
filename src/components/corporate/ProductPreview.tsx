import Image from 'next/image';
import { LayoutDashboard, BellRing, TrendingUp } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import IconChip from '@/components/ui/IconChip';
import AnimatedSection from '@/components/ui/AnimatedSection';
import MultiStoreDashboardMockup from '@/components/mockups/MultiStoreDashboardMockup';
import type { Locale } from '@/lib/i18n';

/**
 * ProductPreview — "Products at a glance" showcase.
 * Two columns: value bullets + a real platform device mockup
 * (MultiStoreDashboardMockup, self-wrapped in a MacBookFrame).
 */

type Feature = { icon: typeof LayoutDashboard; title: string; desc: string };

const copy: Record<Locale, { eyebrow: string; heading: string; sub: string; isoAlt: string; note: string; features: Feature[] }> = {
  ko: {
    eyebrow: 'Products at a glance',
    heading: '보는 것을 넘어, 공간을 운영으로',
    sub: '한 매장이 아니라, 브랜드 전체가 하나같이. 방문·체류·전환·알림을 한 화면에서, 실시간으로.',
    isoAlt: '아이소메트릭 도시 — 연결된 두 매장이 브랜드 전체처럼 함께 움직입니다',
    note: '* AI 분석 예시 화면입니다.',
    features: [
      { icon: LayoutDashboard, title: '브랜드 전체가 한 화면', desc: '전국 모든 매장의 핵심 지표를 본부에서 한눈에 비교합니다.' },
      { icon: TrendingUp, title: '방문·체류·전환', desc: '지나감에서 입장, 결제까지 — 둘러보다 나간 손님까지 단계별로 읽습니다.' },
      { icon: BellRing, title: '관찰 · 분석 · 제안 · 학습', desc: '필요한 순간만 골라 알리고, 다음 한 수까지 제안합니다.' },
    ],
  },
  en: {
    eyebrow: 'Products at a glance',
    heading: 'From watching to running your space',
    sub: 'Not one store — your whole brand, moving as one. Visits, dwell, conversion and alerts on a single live screen.',
    isoAlt: 'Isometric city — two connected stores moving as one brand',
    note: '* Illustrative AI analysis preview.',
    features: [
      { icon: LayoutDashboard, title: 'Your whole brand, one screen', desc: 'Compare key metrics for every store from HQ at a glance.' },
      { icon: TrendingUp, title: 'Visits · dwell · conversion', desc: 'From passing by to entry to checkout — even the shoppers who left without buying.' },
      { icon: BellRing, title: 'Observe · Analyze · Suggest · Learn', desc: 'Surface only the moments that matter, then recommend the next move.' },
    ],
  },
  jp: {
    eyebrow: 'Products at a glance',
    heading: '見るだけでなく、空間を運営へ',
    sub: '一店舗ではなく、ブランド全体がひとつに。来店・滞在・転換・通知を、ひとつの画面でリアルタイムに。',
    isoAlt: 'アイソメトリックの街 — 連結された二つの店舗が、ブランド全体としてひとつに動く',
    note: '* AI分析のサンプル画面です。',
    features: [
      { icon: LayoutDashboard, title: 'ブランド全体をひとつの画面で', desc: '全国すべての店舗の主要指標を、本部から一目で比較。' },
      { icon: TrendingUp, title: '来店・滞在・転換', desc: '通過から入店、決済まで — 見て回って出ていった客まで段階的に読み解く。' },
      { icon: BellRing, title: '観察 · 分析 · 提案 · 学習', desc: '必要な瞬間だけを選んで通知し、次の一手まで提案。' },
    ],
  },
};

export default function ProductPreview({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <Section variant="default" className="overflow-hidden">
      <Container>
        {/* Intro — copy + features */}
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12 items-start mb-12 lg:mb-14">
          <div>
            <Eyebrow className="mb-3">{t.eyebrow}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 mb-4 break-keep">{t.heading}</h2>
            <p className="text-lg text-gray-600 leading-relaxed break-keep max-w-md">{t.sub}</p>
            {/* Brand-as-one concept visual — connected stores (nextrise) */}
            <div className="mt-8 relative aspect-[3/2] rounded-2xl overflow-hidden border border-gray-200 bg-[var(--layer-section-alt,#F7F9FC)] shadow-card">
              <Image
                src="/images/nextrise/iso-city-stores.webp"
                alt={t.isoAlt}
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <AnimatedSection>
            <ul className="grid sm:grid-cols-3 gap-5 lg:gap-6">
              {t.features.map((f) => {
                const Icon = f.icon;
                return (
                  <li key={f.title} className="stagger-child">
                    <IconChip size="sm" className="mb-3">
                      <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    </IconChip>
                    <p className="text-sm font-bold text-gray-900 mb-0.5">{f.title}</p>
                    <p className="text-sm text-gray-600 leading-relaxed break-keep">{f.desc}</p>
                  </li>
                );
              })}
            </ul>
          </AnimatedSection>
        </div>

        {/* Full-width device mockup — 13" tablet */}
        <div>
          <MultiStoreDashboardMockup locale={locale} device="tablet" />
          <p className="mt-4 text-xs text-gray-500 break-keep text-center">{t.note}</p>
        </div>
      </Container>
    </Section>
  );
}
