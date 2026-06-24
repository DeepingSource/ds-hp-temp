import { blogStaticParams, blogArticleMetadata, BlogArticlePage } from '@/components/blog/blogRoutes';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogStaticParams('jp');
}

export function generateMetadata({ params }: Props) {
  return blogArticleMetadata('jp', params);
}

export default function Page({ params }: Props) {
  return BlogArticlePage('jp', params);
}
