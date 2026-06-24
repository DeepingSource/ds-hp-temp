import { blogIndexMetadata, BlogIndexPage } from '@/components/blog/blogRoutes';

export const metadata = blogIndexMetadata('jp');

export default function Page() {
  return BlogIndexPage('jp');
}
