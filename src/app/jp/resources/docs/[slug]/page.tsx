import { docStaticParams, docDetailMetadata, DocDetailPage } from '@/components/docs/docRoutes';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return docStaticParams('jp');
}

export function generateMetadata({ params }: Props) {
  return docDetailMetadata('jp', params);
}

export default function Page({ params }: Props) {
  return DocDetailPage('jp', params);
}
