import Link from 'next/link';
import { Building2, Boxes, Cpu, Grid3x3, ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import Card from '@/components/ui/Card';
import IconChip from '@/components/ui/IconChip';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import { localeHref, type Locale } from '@/lib/i18n';

/**
 * DomainShowcase — 4 layer cards (Company · Products · Technologies · Vision Models).
 * The umbrella IA made visible: one company, three discovery layers.
 * (DESIGN_v2 §4 · PLAN_v1.1 §1.3 3-layer stack)
 */

type Card = { key: string; href: string; icon: typeof Building2; label: string; title: string; desc: string };

const dict: Record<Locale, { eyebrow: string; heading: string; cards: Card[] }> = {
  ko: {
    eyebrow: 'The Umbrella',
    heading: '하나의 우산, 네 개의 입구',
    cards: [
      { key: 'company', href: '/company/about', icon: Building2, label: 'Company', title: '회사', desc: '익명화 AI로 모든 오프라인 공간을 안전하게 이해하는 기업.' },
      { key: 'products', href: '/products', icon: Boxes, label: 'Products', title: '제품', desc: 'Store Insight · StoreCare · StoreAgent · SAAI — 네 자리의 진열대.' },
      { key: 'tech', href: '/technology', icon: Cpu, label: 'Technologies', title: '기술', desc: 'Anonymizer · SEAL · Spatial AI — 사이를 메우는 세 기술.' },
      { key: 'models', href: '/technology/models', icon: Grid3x3, label: 'Vision Models', title: '비전 모델', desc: '익명화·인식·공간·흐름 — 20여 개 비전 AI 카탈로그.' },
    ],
  },
  en: {
    eyebrow: 'The Umbrella',
    heading: 'One umbrella, four ways in',
    cards: [
      { key: 'company', href: '/company/about', icon: Building2, label: 'Company', title: 'Company', desc: 'An AI company that understands every offline space, safely.' },
      { key: 'products', href: '/products', icon: Boxes, label: 'Products', title: 'Products', desc: 'Store Insight · StoreCare · StoreAgent · SAAI — four shelves.' },
      { key: 'tech', href: '/technology', icon: Cpu, label: 'Technologies', title: 'Technologies', desc: 'Anonymizer · SEAL · Spatial AI — the three that fill the gaps.' },
      { key: 'models', href: '/technology/models', icon: Grid3x3, label: 'Vision Models', title: 'Vision Models', desc: 'Anonymize · detect · space · flow — 20+ vision AI catalog.' },
    ],
  },
  jp: {
    eyebrow: 'The Umbrella',
    heading: 'ひとつの傘、四つの入口',
    cards: [
      { key: 'company', href: '/company/about', icon: Building2, label: 'Company', title: '会社', desc: '匿名化AIで、すべてのオフライン空間を安全に理解する企業。' },
      { key: 'products', href: '/products', icon: Boxes, label: 'Products', title: '製品', desc: 'Store Insight · StoreCare · StoreAgent · SAAI の四つの棚。' },
      { key: 'tech', href: '/technology', icon: Cpu, label: 'Technologies', title: '技術', desc: 'Anonymizer · SEAL · Spatial AI — 隙間を埋める三つの技術。' },
      { key: 'models', href: '/technology/models', icon: Grid3x3, label: 'Vision Models', title: 'ビジョンモデル', desc: '匿名化・認識・空間・流れ — 20以上のビジョンAIカタログ。' },
    ],
  },
};

const moreLabel: Record<Locale, string> = { ko: '자세히 보기', en: 'Explore', jp: '詳しく見る' };

export default function DomainShowcase({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <Section>
      <Container>
        <div className="mb-12">
          <Eyebrow className="mb-3">{t.eyebrow}</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep">{t.heading}</h2>
        </div>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.cards.map((c) => {
            const Icon = c.icon;
            return (
              <StaggerItem key={c.key} className="h-full">
                <Card
                  as={Link}
                  hover
                  href={localeHref(locale, c.href)}
                  className="group relative flex h-full flex-col p-7"
                >
                  <IconChip className="mb-5">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </IconChip>
                  <p className="text-2xs font-bold uppercase tracking-wider text-gray-500 mb-1">{c.label}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{c.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1 break-keep">{c.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    {moreLabel[locale]}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
