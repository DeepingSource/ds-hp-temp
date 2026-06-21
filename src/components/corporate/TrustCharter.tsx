import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, FileX2, EyeOff, Fingerprint } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import IconChip from '@/components/ui/IconChip';
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

const dict: Record<Locale, { eyebrow: string; heading: string; link: string; imgAlt: string; caption: string }> = {
  ko: {
    eyebrow: 'SEAL · 익명화 신뢰 헌장',
    heading: '영상은 남기지 않습니다',
    link: 'SEAL 기술 보기',
    imgAlt: '익명화 시각화 — 사람의 신원이 익명 데이터 포인트로 흩어집니다',
    caption: '누구가 아니라, 무엇을 어떻게 — 신원은 입력 시점에 지우고, 흐름만 남깁니다.',
  },
  en: {
    eyebrow: 'SEAL · Anonymization charter',
    heading: 'We never keep the footage',
    link: 'See the SEAL technology',
    imgAlt: 'Anonymization visualized — a person dissolves into anonymous data points',
    caption: 'Not who, but what and how — identity is erased the moment it enters; only the flow remains.',
  },
  jp: {
    eyebrow: 'SEAL · 匿名化の信頼憲章',
    heading: '映像は残しません',
    link: 'SEAL技術を見る',
    imgAlt: '匿名化のビジュアル — 人物が匿名のデータ点へと解けていきます',
    caption: '誰かではなく、何をどう — 身元は入力時点で消し、流れだけを残します。',
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
          <figure>
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-gray-200 shadow-card bg-gray-950">
              <Image
                src="/images/nextrise/anonymize-dissolve.webp"
                alt={t.imgAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-xs text-gray-500 break-keep">{t.caption}</figcaption>
          </figure>
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
