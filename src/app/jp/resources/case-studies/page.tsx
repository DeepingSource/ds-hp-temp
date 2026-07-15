import { caseStudyIndexMetadata, CaseStudyIndexPage } from '@/components/case-studies/caseStudyRoutes';

export const metadata = caseStudyIndexMetadata('jp');

export default function Page() {
  return CaseStudyIndexPage('jp');
}
