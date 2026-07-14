import fs from 'node:fs';
import path from 'node:path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Locale } from '@/lib/i18n';

/**
 * LegalDoc — renders a legal document from content/legal/*.mdx (privacy · terms),
 * the same files the Keystatic `privacyDoc` / `termsDoc` singletons edit.
 * ⚠️ 법무 문서는 변경 전 법무 검토 필수 — CMS 편집도 검토를 거친 뒤 반영한다.
 * Static (reads the file at build). Blockquotes render as the gray info boxes the
 * previous hand-authored markup used.
 *
 * i18n (interim): the source doc is Korean-only and authoritative. On the en/jp
 * routes (physical /jp/legal/* mirrors + the default-locale /legal/* route) a
 * non-binding notice is shown atop the Korean body stating the Korean version is
 * authoritative and an official translation is being prepared. No fabricated legal
 * text — the body stays Korean until legal-reviewed translations exist.
 */

// Non-binding interim notice, per document kind + viewer locale (ko sees none).
const TRANSLATION_NOTICE: Record<'privacy' | 'terms', Partial<Record<Locale, string>>> = {
  privacy: {
    en: 'This Privacy Policy is currently available in Korean only. The Korean version is the authoritative text; an official English translation is being prepared.',
    jp: '本プライバシーポリシーは現在、韓国語版のみ提供しています。韓国語版が正本であり、正式な日本語訳を準備中です。',
  },
  terms: {
    en: 'These Terms of Service are currently available in Korean only. The Korean version is the authoritative text; an official English translation is being prepared.',
    jp: '本利用規約は現在、韓国語版のみ提供しています。韓国語版が正本であり、正式な日本語訳を準備中です。',
  },
};

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

export default function LegalDoc({
  title,
  file,
  locale = 'en',
  kind,
}: {
  title: string;
  file: string;
  locale?: Locale;
  kind?: 'privacy' | 'terms';
}) {
  const body = fs.readFileSync(path.join(process.cwd(), file), 'utf8');
  const notice = kind && locale !== 'ko' ? TRANSLATION_NOTICE[kind][locale] : undefined;
  return (
    <div className="pt-28 pb-16 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-8">
            {title}
          </h1>
          {notice && (
            <p className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 break-keep">
              {notice}
            </p>
          )}
          <div className="text-gray-600 leading-relaxed text-sm sm:text-base break-keep">
            <MDXRemote source={body} components={components} />
          </div>
        </div>
      </div>
    </div>
  );
}
