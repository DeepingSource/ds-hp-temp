import Link from 'next/link';
import Image from 'next/image';
import { Cpu, Award, Users } from 'lucide-react';
import WordRise from '@/components/ui/WordRise';
import Container from '@/components/ui/Container';
import { homeCopy, localeHref, type Locale } from '@/lib/i18n';
import { COMPANY } from '@/lib/company-data';
import { reinventOffline, perfectSpace } from '@/lib/brand-canon';
import { technologyImages } from '@/data/siteImages';

/** Credential badges — real, hard credentials shown as proof pills (not a sentence). */
const credIcons = [Cpu, Award, Users] as const;
const credentials: Record<Locale, string[]> = {
  ko: ['NVIDIA Inception Partner', `특허 ${COMPANY.patents}건`, `파트너 브랜드 ${COMPANY.partnerBrands}개+`],
  en: ['NVIDIA Inception Partner', `${COMPANY.patents} patents`, `${COMPANY.partnerBrands}+ partner brands`],
  jp: ['NVIDIA Inception Partner', `特許 ${COMPANY.patents}件`, `パートナー ${COMPANY.partnerBrands}社+`],
};

/** Hero evidence overlay — proves face-free tracking (our anonymization moat, shown not told). */
const trackChip: Record<Locale, string> = {
  ko: '익명 추적 · ID 없음',
  en: 'Anonymous tracking · no ID',
  jp: '匿名追跡・ID なし',
};

const heroImg: Record<Locale, { alt: string; caption: string }> = {
  ko: { alt: '이미 달린 CCTV 위에서 5명 고객의 동선을 얼굴 없이 연속 추적', caption: '누가가 아니라, 무엇을 어떻게 — 이미 달린 CCTV 위에서' },
  en: { alt: 'On the CCTV you already have — five shoppers tracked continuously, without faces', caption: 'Not who, but what and how — on the CCTV you already have' },
  jp: { alt: 'すでにあるCCTVの上で、5名の動線を顔なしで連続追跡', caption: '誰かではなく、何をどう — すでにあるCCTVの上で' },
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
      <Container className="relative py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-primary mb-4 animate-fade-in-up">
              {reinventOffline} · ANONYMIZED SPATIAL AI
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 break-keep font-display">
              <WordRise text={perfectSpace.your[locale]} />
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-gray-600 leading-relaxed break-keep max-w-2xl animate-fade-in-up delay-200">
              {t.heroSub}
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-300">
              <Link href={localeHref(locale, '/contact')} className="btn-primary btn-lg">
                {t.ctaPrimary}
              </Link>
              <Link
                href={localeHref(locale, '/products')}
                className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold text-gray-900 bg-white border border-gray-200 rounded-[14px] hover:border-primary-light hover:bg-gray-50 transition-colors"
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
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 shadow-card"
                  >
                    <Icon className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                    <span className="break-keep">{c}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <figure className="animate-fade-in-up delay-200">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-gray-200 shadow-elevated">
              <Image
                src={technologyImages.mtmcWide.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 540px, 100vw"
                className="object-cover"
              />
              {/* Face-free detection overlay — proves anonymized tracking (shown, not told). Illustrative boxes. */}
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {[
                  { left: '25%', top: '40%', width: '13%', height: '34%', id: '01', delay: '0s' },
                  { left: '50%', top: '36%', width: '12%', height: '36%', id: '02', delay: '0.7s' },
                  { left: '70%', top: '46%', width: '11%', height: '30%', id: '03', delay: '1.4s' },
                ].map((b) => (
                  <span
                    key={b.id}
                    className="absolute rounded-md border-2 border-primary-light bg-primary-light/10 animate-pulse"
                    style={{ left: b.left, top: b.top, width: b.width, height: b.height, animationDelay: b.delay }}
                  >
                    <span className="absolute -top-[18px] left-0 rounded bg-primary px-1 py-0.5 text-[9px] font-bold leading-none text-white tabular-nums">ID·{b.id}</span>
                  </span>
                ))}
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-gray-950/70 px-2.5 py-1 text-2xs font-semibold text-white backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-light animate-pulse" />
                  {trackChip[locale]}
                </span>
              </div>
            </div>
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
