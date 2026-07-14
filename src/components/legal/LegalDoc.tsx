import fs from 'node:fs';
import path from 'node:path';
import { MDXRemote } from 'next-mdx-remote/rsc';

/**
 * LegalDoc — renders a legal document from content/legal/*.mdx (privacy · terms),
 * the same files the Keystatic `privacyDoc` / `termsDoc` singletons edit.
 * ⚠️ 법무 문서는 변경 전 법무 검토 필수 — CMS 편집도 검토를 거친 뒤 반영한다.
 * Static (reads the file at build). Blockquotes render as the gray info boxes the
 * previous hand-authored markup used.
 */

const components = {
  h2: (p: React.ComponentProps<'h2'>) => (
    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4 break-keep" {...p} />
  ),
  p: (p: React.ComponentProps<'p'>) => <p className="my-4 break-keep" {...p} />,
  ul: (p: React.ComponentProps<'ul'>) => <ul className="list-disc pl-5 space-y-2 my-4" {...p} />,
  ol: (p: React.ComponentProps<'ol'>) => <ol className="list-decimal pl-5 space-y-1 my-4" {...p} />,
  li: (p: React.ComponentProps<'li'>) => <li className="break-keep" {...p} />,
  strong: (p: React.ComponentProps<'strong'>) => <strong className="font-medium text-gray-900" {...p} />,
  a: (p: React.ComponentProps<'a'>) => (
    <a className="text-primary underline" target="_blank" rel="noopener noreferrer" {...p} />
  ),
  blockquote: (p: React.ComponentProps<'blockquote'>) => (
    <blockquote className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 my-4 text-sm text-gray-500 [&>p]:my-1 [&>p]:break-keep" {...p} />
  ),
};

export default function LegalDoc({ title, file }: { title: string; file: string }) {
  const body = fs.readFileSync(path.join(process.cwd(), file), 'utf8');
  return (
    <div className="pt-28 pb-16 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-8">
            {title}
          </h1>
          <div className="text-gray-600 leading-relaxed text-sm sm:text-base break-keep">
            <MDXRemote source={body} components={components} />
          </div>
        </div>
      </div>
    </div>
  );
}
