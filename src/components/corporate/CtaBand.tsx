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

type Kind = 'trust' | 'product';

const dict: Record<Kind, Record<Locale, { text: string; button: string }>> = {
  trust: {
    ko: { text: '안전하게 보고, 정확하게 읽습니다 — 영상은 남기지 않고, 누가가 아니라 무엇을 어떻게.', button: '도입 상담 신청' },
    en: { text: 'Safe to watch, precise to read — no footage kept, not who but what and how.', button: 'Talk to us' },
    jp: { text: '安全に見て、正確に読む — 映像は残さず、誰かではなく何をどう。', button: '導入のご相談' },
  },
  product: {
    ko: { text: '어제를 읽고, 지금을 알리고, 다음을 실행합니다 — 보는 것을 넘어, 매장을 운영하는 AI.', button: '맞는 조합 찾기' },
    en: { text: 'Read yesterday, alert on now, act on next — AI that runs your space, not just watches it.', button: 'Find your fit' },
    jp: { text: '昨日を読み、今を知らせ、次を実行する — 見るだけでなく、空間を運営するAI。', button: '最適な組み合わせを見る' },
  },
};

const reassurance: Record<Locale, string> = {
  ko: '무료 상담 · 영업일 1–2일 내 회신',
  en: 'Free consultation · reply within 1–2 business days',
  jp: '無料相談・営業日1〜2日以内に返信',
};

export default function CtaBand({ locale, kind }: { locale: Locale; kind: Kind }) {
  const t = dict[kind][locale];
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
