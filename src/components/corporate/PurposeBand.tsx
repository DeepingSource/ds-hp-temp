import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import WordRise from '@/components/ui/WordRise';
import { type Locale } from '@/lib/i18n';
import { purpose } from '@/lib/brand-canon';

/**
 * PurposeBand — the manifesto closing line as the home's emotional crescendo
 * (External Brand Brief v1.2 §4 Manifesto · §1 Purpose). Copy lifted from brand-canon.
 * Light typographic band, placed just before the dark CTA.
 */

const eyebrow: Record<Locale, string> = {
  ko: '우리가 존재하는 이유',
  en: 'Why we exist',
  jp: '私たちが存在する理由',
};

export default function PurposeBand({ locale }: { locale: Locale }) {
  const p = purpose[locale];
  return (
    <Section variant="alt" pad="none" className="py-24 lg:py-32">
      <Container size="narrow" className="text-center">
        <Eyebrow className="mb-6">{eyebrow[locale]}</Eyebrow>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug break-keep font-display">
          <WordRise text={p.closing} />
        </h2>
        <p className="mt-6 text-base sm:text-lg text-gray-500 break-keep max-w-2xl mx-auto">{p.statement}</p>
      </Container>
    </Section>
  );
}
