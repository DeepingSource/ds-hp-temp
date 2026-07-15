import {
  caseStudyStaticParams,
  caseStudyDetailMetadata,
  CaseStudyDetailPage,
} from '@/components/case-studies/caseStudyRoutes';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudyStaticParams('ko');
}

export function generateMetadata({ params }: Props) {
  return caseStudyDetailMetadata('ko', params);
}

export default function Page({ params }: Props) {
  return CaseStudyDetailPage('ko', params);
}
