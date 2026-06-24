import { blogIndexMetadata, BlogIndexPage } from '@/components/blog/blogRoutes';

export const metadata = blogIndexMetadata('en');

export default function Page() {
  return BlogIndexPage('en');
}
