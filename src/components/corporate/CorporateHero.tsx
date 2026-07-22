import Link from 'next/link';
import { Cpu, Award, Users } from 'lucide-react';
import RotatingNoun from '@/components/ui/RotatingNoun';
import CorporateHeroFigure from '@/components/corporate/CorporateHeroFigure';
import Container from '@/components/ui/Container';
import { homeCopy, localeHref, type Locale } from '@/lib/i18n';
import { COMPANY } from '@/lib/company-data';
import { categoryKeyword, heroQuestion, saaiSpellout } from '@/lib/brand-canon';
import { technologyImages } from '@/data/siteImages';

/** Credential badges — real, hard credentials shown as proof pills (not a sentence). */
const credIcons = [Cpu, Award, Users] as const;
const credentials: Record<Locale, string[]> = {
  ko: ['NVIDIA Inception Partner', `특허 ${COMPANY.patents}건`, `파트너 브랜드 ${COMPANY.partnerBrands}개+`],
  en: ['NVIDIA Inception Partner', `${COMPANY.patents} patents`, `${COMPANY.partnerBrands}+ partner brands`],
  jp: ['NVIDIA Inception Partner', `特許 ${COMPANY.patents}件`, `パートナー ${COMPANY.partnerBrands}社+`],
};

/** Hero secondary CTA — the HQ/multi-store path (랜딩_전환재정렬_v2 §2·§8). */
const heroEnterpriseCta: Record<Locale, string> = {
  ko: '본사·다점포 도입 보기',
  en: 'For HQ & multi-store',
  jp: '本部・多店舗導入',
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
 * Home hero — grounding · question form (랜딩_전환재정렬_v2 §2).
 * BLUF: a QUESTION H1 ("지금 쓰는 AI는, 당신의 공간을 알고 있나요?") with a rotating spatial
 * noun (매장·현장·전시장·물류센터·카페·무인매장) — the grounding hook. The fixed token carries
 * SEO/SR; the rotation is a visual, aria-hidden layer (see RotatingNoun). Signal sub + the
 * SAAI spell-out, then two CTAs (도입 상담 → /contact · 본사·다점포 → /enterprise). Right rail:
 * one functional evidence visual — face-free MTMC tracking, the "공간의 신호" proof.
 */
export default function CorporateHero({ locale }: { locale: Locale }) {
  const t = homeCopy[locale];
  const q = heroQuestion[locale];
  const img = heroImg[locale];
  const pillars = saaiSpellout.linear.split(' ');
  return (
    <section className="relative overflow-hidden bg-[var(--layer-bg-hero,#FCFCFE)] border-b border-gray-100">
      <div className="absolute inset-0 bg-dot-light opacity-60 pointer-events-none" aria-hidden="true" />
      {/* ambient brand-blue glow behind the headline (decorative) */}
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute -top-32 -left-24 h-[34rem] w-[34rem] rounded-full"
        style={{ background: 'radial-gradient(circle, color-mix(in oklab, var(--color-primary) 16%, transparent), transparent 70%)' }}
      />
      <Container className="relative py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-5 max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] text-primary mb-4 animate-fade-in-up">
              {categoryKeyword[locale]} · SAAI
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-gray-900 break-keep font-display animate-fade-in-up delay-100">
              {q.prefix}
              <RotatingNoun fixed={q.fixed} words={q.words} />
              {q.suffix}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed break-keep max-w-2xl animate-fade-in-up delay-200">
              {t.heroSub}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-300">
              <Link href={localeHref(locale, '/contact')} className="btn-primary btn-lg">
                {t.ctaPrimary}
              </Link>
              <Link
                href={localeHref(locale, '/enterprise')}
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-gray-900 bg-white border border-gray-200 rounded-[14px] hover:border-primary-light hover:bg-gray-50 transition-colors"
              >
                {heroEnterpriseCta[locale]}
              </Link>
            </div>
            {/* SAAI spell-out — brand reinforcement with bold letter badges */}
            <p className="mt-7 text-xs font-medium tracking-tight text-gray-600 animate-fade-in-up delay-400 flex flex-wrap items-center gap-1.5">
              {pillars.map((w, i) => (
                <span key={w} className="inline-flex items-center gap-1">
                  {i > 0 && <span className="text-gray-300 mr-1">·</span>}
                  <span className="font-extrabold text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs">{w.charAt(0)}</span>
                  <span className="text-gray-800 font-semibold">{w.slice(1)}</span>
                </span>
              ))}
              <span className="text-gray-400 text-xs ml-1">({saaiSpellout.gloss[locale].join(' · ')})</span>
            </p>
            <ul className="mt-7 flex flex-wrap gap-2 animate-fade-in-up delay-400">
              {credentials[locale].map((c, i) => {
                const Icon = credIcons[i];
                return (
                  <li
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-card"
                  >
                    <Icon className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                    <span className="break-keep">{c}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <figure className="lg:col-span-7 animate-fade-in-up delay-200 w-full">
            <CorporateHeroFigure src={technologyImages.mtmcWide.src} alt={img.alt} trackLabel={trackChip[locale]} />
            <figcaption className="mt-3 flex items-center gap-2 text-xs text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
              <span className="break-keep">{img.caption}</span>
            </figcaption>
          </figure>
        </div>

        {/* Transition Bridge — "SAAI는 알고 있습니다" */}
        <div className="mt-16 pt-10 border-t border-gray-200/80 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-3">
            Transition · SAAI’s Answer
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 break-keep font-display">
            SAAI는 알고 있습니다.
          </h3>
          <p className="mt-2.5 text-sm sm:text-base text-gray-600 break-keep">
            이미 달린 CCTV만으로 매장의 모든 동선과 행동을 데이터와 실시간 실행으로 바꾸는 방법.
          </p>
          <div className="mt-4 flex justify-center">
            <span className="inline-block animate-bounce text-primary text-lg">↓</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
