import { docStaticParams, docDetailMetadata, DocDetailPage } from '@/components/docs/docRoutes';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return docStaticParams('ko');
}

export function generateMetadata({ params }: Props) {
  return docDetailMetadata('ko', params);
}

export default function Page({ params }: Props) {
  return DocDetailPage('ko', params);
}
