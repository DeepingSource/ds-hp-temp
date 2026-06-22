import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { homeCopy, localeHref, type Locale } from '@/lib/i18n';

/**
 * CtaBand — a lightweight mid-page conversion band placed at conviction peaks
 * (after the trust/capability block, and after the product depth). Closes the
 * funnel leak on a long page where the only CTAs used to be hero + footer.
 * Localized; reassurance microcopy mirrors the contact success screen.
 */

const dict: Record<Locale, { text: string; button: string }> = {
  ko: { text: '세 store를 한 흐름으로 — 우리 매장엔 어떤 조합이 맞을까요?', button: '맞는 조합 찾기' },
  en: { text: 'Three stores, one flow — which mix fits yours?', button: 'Find your fit' },
  jp: { text: '三つの store をひとつの流れに — あなたの店舗にはどの組み合わせが?', button: '最適な組み合わせを見る' },
};

const reassurance: Record<Locale, string> = {
  ko: '무료 상담 · 영업일 1–2일 내 회신',
  en: 'Free consultation · reply within 1–2 business days',
  jp: '無料相談・営業日1〜2日以内に返信',
};

export default function CtaBand({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const cta = homeCopy[locale];
  return (
    <Section variant="default" pad="compact">
      <Container>
        <div className="rounded-2xl border border-primary/20 bg-primary-lighter/60 px-6 py-7 sm:px-10 sm:py-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="break-keep">
            <p className="text-lg sm:text-xl font-bold text-gray-900">{t.text}</p>
            <p className="mt-1.5 text-sm text-gray-500">{reassurance[locale]}</p>
          </div>
          <Link
            href={localeHref(locale, '/contact')}
            className="btn-primary btn-lg shrink-0 self-start sm:self-auto inline-flex items-center gap-2"
            aria-label={`${t.button} — ${cta.ctaPrimary}`}
          >
            {t.button}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
