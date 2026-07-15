import {
  caseStudyStaticParams,
  caseStudyDetailMetadata,
  CaseStudyDetailPage,
} from '@/components/case-studies/caseStudyRoutes';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudyStaticParams('en');
}

export function generateMetadata({ params }: Props) {
  return caseStudyDetailMetadata('en', params);
}

export default function Page({ params }: Props) {
  return CaseStudyDetailPage('en', params);
}
