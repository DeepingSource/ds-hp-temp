import { blogStaticParams, blogArticleMetadata, BlogArticlePage } from '@/components/blog/blogRoutes';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogStaticParams('ko');
}

export function generateMetadata({ params }: Props) {
  return blogArticleMetadata('ko', params);
}

export default function Page({ params }: Props) {
  return BlogArticlePage('ko', params);
}
