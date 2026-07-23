import Link from 'next/link';
import { ShieldCheck, FileX2, EyeOff, Fingerprint } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { localeHref, type Locale } from '@/lib/i18n';
import { sealCharter } from '@/lib/brand-canon';

/**
 * TrustCharter — 컴팩트 신뢰 밴드 (홈 정제계획 §8-4 · D13).
 * 익명화는 고객사 입장에선 당연한 전제(table stakes) — 홈에서는 헤딩 + 태그라인 +
 * 약속 3개 한 줄 뱃지 + anonymizer 링크의 밴드 1개로 줄인다. Before/After 슬라이더와
 * 상세 증명은 /technology/anonymizer(AnonymizerView)의 역할. Beat 8에서 MTMC
 * (SpatialTrajectoryMockup)와 한 섹션 두 블록 — alt 배경으로 시각 연속.
 * Tagline + 3 promises lifted from brand-canon; icons map 1:1 to each promise.
 */

const promiseIcons: Record<string, typeof ShieldCheck> = {
  'no-original': FileX2,
  'no-human': EyeOff,
  'no-reid': Fingerprint,
};

const dict: Record<Locale, { eyebrow: string; heading: string; link: string }> = {
  ko: {
    eyebrow: 'SEAL · 익명화 신뢰 헌장',
    heading: '영상은 남기지 않습니다',
    link: '어떻게 가능한지 보기',
  },
  en: {
    eyebrow: 'SEAL · Anonymization charter',
    heading: 'We never keep the footage',
    link: 'See how this is possible',
  },
  jp: {
    eyebrow: 'SEAL · 匿名化の信頼憲章',
    heading: '映像は残しません',
    link: 'その仕組みを見る',
  },
};

export default function TrustCharter({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const charter = sealCharter[locale];
  return (
    <Section variant="alt" pad="compact">
      <Container>
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-card lg:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                {t.eyebrow}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 break-keep font-display">{t.heading}</h2>
              <p className="mt-3 text-base sm:text-lg font-medium text-primary break-keep">{charter.tagline}</p>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <ul className="flex flex-wrap gap-2">
                {charter.promises.map((p) => {
                  const Icon = promiseIcons[p.key];
                  return (
                    <li
                      key={p.key}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-xs font-semibold text-gray-800"
                    >
                      <Icon className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                      <span className="break-keep">{p.term}</span>
                    </li>
                  );
                })}
              </ul>
              <Link
                href={localeHref(locale, '/technology/anonymizer')}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-900 hover:text-primary transition-colors"
              >
                {t.link}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
