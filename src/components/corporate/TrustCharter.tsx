import Link from 'next/link';
import { ShieldCheck, FileX2, EyeOff, Fingerprint } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import IconChip from '@/components/ui/IconChip';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import { localeHref, type Locale } from '@/lib/i18n';
import { sealCharter } from '@/lib/brand-canon';

/**
 * TrustCharter — SEAL anonymization trust charter (External Brand Brief v1.2 §6.2).
 * Anonymization-first is the #1 differentiator: surface the 3 promises on home,
 * shown (not just told) with the before/after evidence image — fact-first voice.
 * Tagline + 3 promises lifted from brand-canon; icons map 1:1 to each promise.
 */

const promiseIcons: Record<string, typeof ShieldCheck> = {
  'no-original': FileX2,
  'no-human': EyeOff,
  'no-reid': Fingerprint,
};

const dict: Record<Locale, { eyebrow: string; heading: string; link: string; imgAlt: string; sliderBefore: string; sliderAfter: string; caption: string }> = {
  ko: {
    eyebrow: 'SEAL · 익명화 신뢰 헌장',
    heading: '영상은 남기지 않습니다',
    link: 'SEAL 기술 보기',
    imgAlt: '같은 인물의 익명화 전과 후 비교',
    sliderBefore: '원본',
    sliderAfter: '익명화',
    caption: '손잡이를 끌어 보세요 — 첫 단계에서 익명화됩니다. 원본은 어디에도 남지 않습니다.',
  },
  en: {
    eyebrow: 'SEAL · Anonymization charter',
    heading: 'We never keep the footage',
    link: 'See the SEAL technology',
    imgAlt: 'Before-and-after comparison of the same person, anonymized',
    sliderBefore: 'Original',
    sliderAfter: 'Anonymized',
    caption: "Drag the handle — it's anonymized at the first step. The original is left nowhere.",
  },
  jp: {
    eyebrow: 'SEAL · 匿名化の信頼憲章',
    heading: '映像は残しません',
    link: 'SEAL技術を見る',
    imgAlt: '同じ人物の匿名化前と後の比較',
    sliderBefore: '原本',
    sliderAfter: '匿名化',
    caption: 'ハンドルを動かしてください——最初の段階で匿名化されます。原本はどこにも残りません。',
  },
};

export default function TrustCharter({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const charter = sealCharter[locale];
  return (
    <Section variant="default">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-12 lg:mb-14">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              {t.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep font-display">{t.heading}</h2>
            <p className="mt-5 text-lg sm:text-xl font-medium text-primary break-keep">{charter.tagline}</p>
            <Link
              href={localeHref(locale, '/technology/seal')}
              className="mt-7 inline-flex items-center gap-1.5 text-sm font-bold text-gray-900 hover:text-primary transition-colors"
            >
              {t.link}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <BeforeAfterSlider
            beforeSrc="/images/technology/tech-anon-slider-before.webp"
            afterSrc="/images/technology/tech-anon-slider-after.webp"
            beforeLabel={t.sliderBefore}
            afterLabel={t.sliderAfter}
            caption={t.caption}
            alt={t.imgAlt}
            nudge
          />
        </div>
        <ul className="grid sm:grid-cols-3 gap-5">
          {charter.promises.map((p) => {
            const Icon = promiseIcons[p.key];
            return (
              <li key={p.key} className="stagger-child p-7 rounded-2xl bg-[var(--layer-section-alt,#F7F9FC)] border border-gray-200">
                <IconChip className="mb-5">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </IconChip>
                <h3 className="text-base font-bold text-gray-900 mb-2">{p.term}</h3>
                <p className="text-sm text-gray-600 leading-relaxed break-keep">{p.line}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
