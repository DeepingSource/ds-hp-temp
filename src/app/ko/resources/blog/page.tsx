import { blogIndexMetadata, BlogIndexPage } from '@/components/blog/blogRoutes';

export const metadata = blogIndexMetadata('ko');

export default function Page() {
  return BlogIndexPage('ko');
}
