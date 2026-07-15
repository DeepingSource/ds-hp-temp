import { caseStudyIndexMetadata, CaseStudyIndexPage } from '@/components/case-studies/caseStudyRoutes';

export const metadata = caseStudyIndexMetadata('ko');

export default function Page() {
  return CaseStudyIndexPage('ko');
}
