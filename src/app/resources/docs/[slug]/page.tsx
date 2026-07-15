import { docStaticParams, docDetailMetadata, DocDetailPage } from '@/components/docs/docRoutes';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return docStaticParams('en');
}

export function generateMetadata({ params }: Props) {
  return docDetailMetadata('en', params);
}

export default function Page({ params }: Props) {
  return DocDetailPage('en', params);
}
