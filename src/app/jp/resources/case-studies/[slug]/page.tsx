import {
  caseStudyStaticParams,
  caseStudyDetailMetadata,
  CaseStudyDetailPage,
} from '@/components/case-studies/caseStudyRoutes';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudyStaticParams('jp');
}

export function generateMetadata({ params }: Props) {
  return caseStudyDetailMetadata('jp', params);
}

export default function Page({ params }: Props) {
  return CaseStudyDetailPage('jp', params);
}
