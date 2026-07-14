import Link from 'next/link';
import { Cpu, Award, Users } from 'lucide-react';
import WordRise from '@/components/ui/WordRise';
import CorporateHeroFigure from '@/components/corporate/CorporateHeroFigure';
import Container from '@/components/ui/Container';
import { homeCopy, localeHref, type Locale } from '@/lib/i18n';
import { COMPANY } from '@/lib/company-data';
import { perfectSpace } from '@/lib/brand-canon';
import { technologyImages } from '@/data/siteImages';

/** Credential badges — real, hard credentials shown as proof pills (not a sentence). */
const credIcons = [Cpu, Award, Users] as const;
const credentials: Record<Locale, string[]> = {
  ko: ['NVIDIA Inception Partner', `특허 ${COMPANY.patents}건`, `파트너 브랜드 ${COMPANY.partnerBrands}개+`],
  en: ['NVIDIA Inception Partner', `${COMPANY.patents} patents`, `${COMPANY.partnerBrands}+ partner brands`],
  jp: ['NVIDIA Inception Partner', `特許 ${COMPANY.patents}件`, `パートナー ${COMPANY.partnerBrands}社+`],
};

/**
 * Keyword subheadline (H2) — promotes the category keyword "Anonymized Spatial AI"
 * into the heading hierarchy for SEO/AEO weight. Emotional H1 stays; this carries the
 * searchable term. Derived from the eyebrow/heroSub keywords, not new master copy.
 */
const heroKeyword: Record<Locale, string> = {
  ko: '익명화 공간 AI — 얼굴 없이, CCTV 위에서',
  en: 'Anonymized Spatial AI — faceless, on the CCTV you already have',
  jp: '匿名化空間AI — 顔なしで、すでにあるCCTVの上で',
};

/** Hero evidence overlay — proves face-free tracking (our anonymization moat, shown not told). */
const trackChip: Record<Locale, string> = {
  ko: '익명 추적 · ID 없음',
  en: 'Anonymous tracking · no ID',
  jp: '匿名追跡・ID なし',
};

const heroImg: Record<Locale, { alt: string; caption: string }> = {
  ko: { alt: '이미 달린 CCTV 위에서 5명 고객의 동선을 얼굴 없이 연속 추적', caption: '5명을 얼굴 없이 연속 추적 — ID만, 신원은 없이.' },
  en: { alt: 'On the CCTV you already have — five shoppers tracked continuously, without faces', caption: 'Five shoppers tracked continuously, without faces — IDs only, no identity.' },
  jp: { alt: 'すでにあるCCTVの上で、5名の動線を顔なしで連続追跡', caption: '5名を顔なしで連続追跡 — IDのみ、身元は残さず。' },
};

/**
 * Home hero — Company layer (DESIGN_v2 §4).
 * BLUF: master company copy as h1 (conclusion), evidence sub, two CTAs.
 * Executive B/W + single blue accent. No marketing adjectives.
 * Right rail (lg+): one functional evidence visual — MTMC tracking, not decoration.
 */
export default function CorporateHero({ locale }: { locale: Locale }) {
  const t = homeCopy[locale];
  const img = heroImg[locale];
  return (
    <section className="relative overflow-hidden bg-[var(--layer-bg-hero,#FCFCFE)] border-b border-gray-100">
      <div className="absolute inset-0 bg-dot-light opacity-60 pointer-events-none" aria-hidden="true" />
      {/* ambient brand-blue glow behind the headline (decorative) */}
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute -top-32 -left-24 h-[34rem] w-[34rem] rounded-full"
        style={{ background: 'radial-gradient(circle, color-mix(in oklab, var(--color-primary) 16%, transparent), transparent 70%)' }}
      />
      <Container className="relative py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] text-primary mb-4 animate-fade-in-up">
              ANONYMIZED SPATIAL AI · SAAI
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 break-keep font-display">
              <WordRise text={perfectSpace.your[locale]} />
            </h1>
            <h2 className="mt-4 text-lg sm:text-xl font-semibold text-gray-700 break-keep max-w-2xl animate-fade-in-up delay-100">
              {heroKeyword[locale]}
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed break-keep max-w-2xl animate-fade-in-up delay-200">
              {t.heroSub}
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-300">
              <Link href={localeHref(locale, '/contact')} className="btn-primary btn-lg">
                {t.ctaPrimary}
              </Link>
              <Link
                href={localeHref(locale, '/products')}
                className="inline-flex items-center justify-center px-9 py-4 text-base font-medium text-gray-900 bg-white border border-gray-200 rounded-[14px] hover:border-primary-light hover:bg-gray-50 transition-colors"
              >
                {t.ctaSecondary}
              </Link>
            </div>
            <ul className="mt-10 flex flex-wrap gap-2.5 animate-fade-in-up delay-400">
              {credentials[locale].map((c, i) => {
                const Icon = credIcons[i];
                return (
                  <li
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-medium text-gray-700 shadow-card"
                  >
                    <Icon className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                    <span className="break-keep">{c}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <figure className="animate-fade-in-up delay-200">
            <CorporateHeroFigure src={technologyImages.mtmcWide.src} alt={img.alt} trackLabel={trackChip[locale]} />
            <figcaption className="mt-3 flex items-center gap-2 text-xs text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
              <span className="break-keep">{img.caption}</span>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
