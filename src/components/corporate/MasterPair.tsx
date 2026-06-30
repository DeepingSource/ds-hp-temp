import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { homeCopy, localeHref, type Locale } from '@/lib/i18n';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import MasterPairCards from '@/components/corporate/MasterPairCards';
import { ownerCta } from '@/lib/brand-canon';

/**
 * MasterPair — symmetric mirror of the two master copies (BRAND_v2 §3).
 * Company promise ↔ store-owner promise: the same idea seen from both sides.
 */

const dict: Record<Locale, { companyLabel: string; ownerLabel: string; bridge: string; newTab: string }> = {
  ko: { companyLabel: '본부에서는', ownerLabel: '매장에서는', bridge: '한 매장이 아니라, 브랜드 전체가 하나같이', newTab: '(새 탭에서 열림)' },
  en: { companyLabel: 'At HQ', ownerLabel: 'In your store', bridge: 'Not one store — the whole brand, moving as one', newTab: '(opens in a new tab)' },
  jp: { companyLabel: '本部では', ownerLabel: '店舗では', bridge: '一店舗ではなく、ブランド全体が一つになって', newTab: '(新しいタブで開く)' },
};

export default function MasterPair({ locale }: { locale: Locale }) {
  const t = homeCopy[locale];
  const d = dict[locale];
  return (
    <Section variant="dark" className="relative overflow-hidden">
      {/* Cinematic depth — store at night, kept legible by the solid scrim */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image src="/images/nextrise/bg-film00-night-cvs.webp" alt="" fill className="object-cover opacity-30" sizes="100vw" />
        <div className="absolute inset-0 bg-surface-dark/85" />
      </div>
      <Container size="medium" className="relative text-center">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light mb-10">{d.bridge}</h2>
        <MasterPairCards
          left={
            <>
              <p className="text-2xs font-bold uppercase tracking-wider text-gray-400 mb-4">{d.companyLabel}</p>
              <p className="text-2xl sm:text-3xl font-bold text-white break-keep font-display">{t.masterCompany}</p>
              <a
                href={localeHref(locale, '/contact')}
                className="mt-6 inline-flex items-center justify-center gap-1.5 self-center px-6 py-3 text-sm font-bold text-white border border-white/20 hover:bg-white/10 rounded-xl transition-colors"
              >
                {t.ctaPrimary}
              </a>
            </>
          }
          right={
            <>
              <p className="text-2xs font-bold uppercase tracking-wider text-primary-light mb-4">{d.ownerLabel}</p>
              <p className="text-2xl sm:text-3xl font-bold text-white break-keep font-display">{t.masterOwner}</p>
              <a
                href="https://storecare.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-1.5 self-center px-6 py-3 text-sm font-bold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors"
              >
                {ownerCta[locale]}
                <span className="sr-only">{d.newTab}</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </>
          }
        />
      </Container>
    </Section>
  );
}
