'use client';

import Card from '@/components/ui/Card';
import { type Locale } from '@/lib/i18n';
import DiagnosisConversation from './diagnosis/DiagnosisConversation';

/**
 * DiagnosisGuide — the interactive Q&A for /solutions/diagnosis.
 * Refactored in Diagnosis v2 to consume the conversational engine and presentation.
 */
export default function DiagnosisGuide({ locale }: { locale: Locale }) {
  return (
    <Card className="p-6 sm:p-10">
      <DiagnosisConversation locale={locale} />
    </Card>
  );
}
