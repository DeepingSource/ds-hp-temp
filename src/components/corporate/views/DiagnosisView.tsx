import Breadcrumb from '@/components/ui/Breadcrumb';
import Eyebrow from '@/components/ui/Eyebrow';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import DiagnosisGuide from '@/components/corporate/DiagnosisGuide';
import { crumb } from '@/lib/breadcrumb-labels';
import { DIAGNOSIS_UI } from '@/data/diagnosis-i18n';
import { type Locale } from '@/lib/i18n';

/**
 * DiagnosisView — shared /solutions/diagnosis composition. Rendered by /solutions/diagnosis
 * (en), /ko/solutions/diagnosis, /jp/solutions/diagnosis with the locale prop (same
 * path-prefix i18n pattern as the rest of /solutions).
 *
 * Deliberately a quiet, light hero (no dark photo background, no gradient CTA band) —
 * this is a utility/tool page, not a marketing landing page, per SAAI_AI_Handoff.md's
 * "Quiet Utility" design principle. All content below the hero lives in DiagnosisGuide.
 */
export default function DiagnosisView({ locale }: { locale: Locale }) {
  const ui = DIAGNOSIS_UI[locale];

  return (
    <div className="bg-white min-h-screen">
      <Section pad="none" className="pt-28 lg:pt-36 pb-20">
        <Container size="narrow">
          <Breadcrumb
            items={[
              { name: crumb('solutions', locale), path: '/solutions' },
              { name: crumb('diagnosis', locale), path: '/solutions/diagnosis' },
            ]}
            locale={locale}
            className="mb-6"
          />
          <Eyebrow className="mb-3">{ui.eyebrow}</Eyebrow>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{ui.title}</h1>
          <p className="text-gray-600 leading-relaxed break-keep mb-10 max-w-xl">{ui.sub}</p>

          <DiagnosisGuide locale={locale} />
        </Container>
      </Section>
    </div>
  );
}
