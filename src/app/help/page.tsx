import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';

/**
 * /help — the editor guide (G-1), rendered from the same content/editor/guide.mdx
 * that the Keystatic `editorGuide` singleton edits. noindex — internal onboarding
 * page shared by URL in the first access email. Static (reads the file at build).
 */

export const metadata: Metadata = {
  title: '편집 가이드 | DEEPINGSOURCE',
  robots: { index: false, follow: false },
};

function loadGuide(): string {
  const raw = fs.readFileSync(path.join(process.cwd(), 'content/editor/guide.mdx'), 'utf8');
  // 싱글톤이 프론트매터를 붙이는 경우 제거하고 본문만 렌더.
  const m = raw.match(/^---\n[\s\S]*?\n---\n?/);
  return m ? raw.slice(m[0].length) : raw;
}

const components = {
  h2: (p: React.ComponentProps<'h2'>) => (
    <h2 className="mt-12 mb-4 text-2xl font-bold text-gray-900 break-keep" {...p} />
  ),
  h3: (p: React.ComponentProps<'h3'>) => (
    <h3 className="mt-8 mb-3 text-lg font-bold text-gray-900 break-keep" {...p} />
  ),
  p: (p: React.ComponentProps<'p'>) => (
    <p className="my-4 text-gray-700 leading-relaxed break-keep" {...p} />
  ),
  ul: (p: React.ComponentProps<'ul'>) => (
    <ul className="my-4 space-y-2 list-disc pl-5 text-gray-700 break-keep" {...p} />
  ),
  ol: (p: React.ComponentProps<'ol'>) => (
    <ol className="my-4 space-y-2 list-decimal pl-5 text-gray-700 break-keep" {...p} />
  ),
  li: (p: React.ComponentProps<'li'>) => <li className="leading-relaxed" {...p} />,
  strong: (p: React.ComponentProps<'strong'>) => <strong className="font-semibold text-gray-900" {...p} />,
  hr: (p: React.ComponentProps<'hr'>) => <hr className="my-10 border-gray-200" {...p} />,
  code: (p: React.ComponentProps<'code'>) => (
    <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-gray-800" {...p} />
  ),
  a: (p: React.ComponentProps<'a'>) => <a className="text-primary hover:text-primary-dark underline" {...p} />,
};

export default function HelpPage() {
  const body = loadGuide();
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-16 lg:py-24">
      <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">Editor Guide</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 break-keep">편집 가이드</h1>
      <p className="text-gray-500 mb-10 break-keep">
        이 문서는 <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono">/keystatic</code> 의
        「편집 가이드」 문서와 동일합니다 — CMS 안에서도 같은 내용을 볼 수 있어요.
      </p>
      <MDXRemote source={body} components={components} />
    </main>
  );
}
