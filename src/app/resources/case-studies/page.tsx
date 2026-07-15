import { caseStudyIndexMetadata, CaseStudyIndexPage } from '@/components/case-studies/caseStudyRoutes';

export const metadata = caseStudyIndexMetadata('en');

export default function Page() {
  return CaseStudyIndexPage('en');
}
