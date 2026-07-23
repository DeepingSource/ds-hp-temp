import Link from 'next/link';
import RotatingNoun from '@/components/ui/RotatingNoun';
import CorporateHeroFigure from '@/components/corporate/CorporateHeroFigure';
import { HeroRotationProvider } from '@/components/ui/HeroRotation';
import Container from '@/components/ui/Container';
import { homeCopy, localeHref, type Locale } from '@/lib/i18n';
import { categoryKeyword, heroQuestion } from '@/lib/brand-canon';
import { heroSpaceImages } from '@/data/siteImages';

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

/** Fixed (non-rotating) alt/caption — the rotating frames are decorative, like the noun layer. */
const heroImg: Record<Locale, { alt: string; caption: string }> = {
  ko: {
    alt: '여섯 공간 — 매장·현장·전시장·물류센터·카페·무인매장 — 같은 CCTV 위에서 얼굴 없이 동선을 추적',
    caption: '여섯 공간, 같은 약속 — 누구인지는 묻지 않습니다.',
  },
  en: {
    alt: 'Six spaces — store, industrial floor, showroom, warehouse, café, unmanned store — tracked on the same CCTV, without faces',
    caption: 'Six spaces, one promise — we never ask who you are.',
  },
  jp: {
    alt: '6つの空間 — 店舗・現場・展示場・物流センター・カフェ・無人店舗 — 同じCCTVの上で顔なしで動線を追跡',
    caption: '6つの空間、同じ約束 — 誰なのかは問いません。',
  },
};

/**
 * Hero sub — the hero carries the claim (홈 정제계획 §8-1): generic AI cannot see
 * physical space → that is the job of Spatial AI → existing CCTVs, faces erased.
 * 경쟁사 실명은 히어로급에서 쓰지 않는다 — 실명 언급은 비교 섹션 카드 타이틀의
 * 작은 표기("범용 AI (ChatGPT · Claude 등)")로만 한정.
 */
const heroSub: Record<Locale, string> = {
  ko: '일반적인 AI는 화면 밖 공간을 보지 못합니다. 공간을 읽는 건 Spatial AI의 일 — 쓰던 CCTV 그대로, 얼굴은 지우고 흐름만.',
  en: "Generic AI can't see beyond the screen. Reading space is the work of Spatial AI — your existing CCTVs, faces erased, flow only.",
  jp: '一般的なAIは、画面の外の空間が見えません。空間を読むのはSpatial AIの仕事 — 既存のCCTVのまま、顔は消して流れだけ。',
};

/**
 * Home hero — grounding · question form (랜딩_전환재정렬_v2 §2 · 정제계획 §8-1 diet).
 * BLUF: a QUESTION H1 ("지금 쓰는 AI는, 당신의 공간을 알고 있나요?") with a rotating spatial
 * noun (매장·현장·전시장·물류센터·카페·무인매장) — the grounding hook. The fixed token carries
 * SEO/SR; the rotation is a visual, aria-hidden layer (see RotatingNoun). The sub carries the
 * claim (generic AI can't see space → Spatial AI can), then two CTAs (도입 상담 → /contact ·
 * 본사·다점포 → /enterprise). Right rail: one functional evidence visual that ROTATES IN SYNC
 * with the noun — six spaces, one anonymized-tracking language (HERO_SPACES_PLAN_v1).
 * SAAI spell-out pills and credential pills were removed (§8-1) — the spell-out lives in the
 * comparison section's pillars; credentials live in GuideIntro's metric cards.
 * HeroRotationProvider is the shared clock; the hero itself stays a server component.
 */
export default function CorporateHero({ locale }: { locale: Locale }) {
  const t = homeCopy[locale];
  const q = heroQuestion[locale];
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
      <Container className="relative py-20 lg:py-28">
        <HeroRotationProvider length={q.words.length}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5 max-w-2xl">
              <p className="text-xs font-medium tracking-[0.2em] text-primary mb-4 animate-fade-in-up">
                {categoryKeyword[locale]} · SAAI
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-gray-900 break-keep font-display animate-fade-in-up delay-100">
                {/* Line 1: lead phrase — block on mobile, inline on desktop */}
                <span className="block sm:inline">{q.lead}</span>
                {/* Line 2: "당신의 {매장을} 알고 있나요?" — noun + suffix flow together without artificial sizer gaps */}
                <span className="inline-flex flex-wrap items-baseline gap-x-1 sm:inline">
                  <span>{q.your}</span>
                  <RotatingNoun fixed={q.fixed} words={q.words} suffix={locale !== 'en' ? q.suffix : undefined} />
                  {locale === 'en' && <span className="whitespace-nowrap">{q.suffix}</span>}
                </span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-gray-600 font-medium leading-relaxed break-keep max-w-2xl animate-fade-in-up delay-200">
                {heroSub[locale]}
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
            </div>
            <figure className="lg:col-span-7 animate-fade-in-up delay-200 w-full">
              <CorporateHeroFigure images={heroSpaceImages} alt={img.alt} trackLabel={trackChip[locale]} />
              <figcaption className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                <span className="break-keep">{img.caption}</span>
              </figcaption>
            </figure>
          </div>
        </HeroRotationProvider>
      </Container>
    </section>
  );
}
