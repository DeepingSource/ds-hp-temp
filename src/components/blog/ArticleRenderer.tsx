import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from './mdx-components';
import { toSlug } from '@/lib/slug';

export default async function ArticleRenderer({ body }: { body: string }) {
  try {
    return (
      <div className="space-y-7">
        <MDXRemote source={body} components={mdxComponents} />
      </div>
    );
  } catch {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500 text-sm">콘텐츠를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }
}

/** Extract heading slugs for TOC from raw MDX */
export function getHeadings(rawMdx: string): { id: string; text: string }[] {
  const headingRegex = /^## (.+)$/gm;
  const headings: { id: string; text: string }[] = [];
  let match;
  while ((match = headingRegex.exec(rawMdx)) !== null) {
    const text = match[1].trim();
    headings.push({ id: toSlug(text), text });
  }
  return headings;
}
