'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';

/**
 * DocsAccessView — code-entry gate for `access: gated` docs (DOCS_WIKI_PLAN Phase 4).
 * Posts the code to /api/docs-access; on success the signed cookie is set and we do a
 * full navigation back to the originally requested doc so the proxy re-evaluates.
 */

const C: Record<Locale, {
  eyebrow: string; title: string; sub: string; placeholder: string;
  submit: string; submitting: string; genericErr: string; back: string;
}> = {
  en: {
    eyebrow: 'Protected document',
    title: 'This document is access-protected',
    sub: 'Enter the access code you were given to view it.',
    placeholder: 'Access code',
    submit: 'Unlock',
    submitting: 'Checking…',
    genericErr: 'Something went wrong. Please try again.',
    back: 'Back to docs',
  },
  ko: {
    eyebrow: '접근 제한 문서',
    title: '접근 코드가 필요한 문서입니다',
    sub: '공유받으신 접근 코드를 입력하시면 열람할 수 있습니다.',
    placeholder: '접근 코드',
    submit: '열람하기',
    submitting: '확인 중…',
    genericErr: '문제가 발생했습니다. 다시 시도해주세요.',
    back: '문서 목록으로',
  },
  jp: {
    eyebrow: 'アクセス制限ドキュメント',
    title: 'アクセスコードが必要なドキュメントです',
    sub: '共有されたアクセスコードを入力すると閲覧できます。',
    placeholder: 'アクセスコード',
    submit: '閲覧する',
    submitting: '確認中…',
    genericErr: '問題が発生しました。もう一度お試しください。',
    back: 'ドキュメント一覧へ',
  },
};

/** Only allow same-origin absolute paths (block //host and external). */
function safeFrom(from: string | null): string {
  if (from && from.startsWith('/') && !from.startsWith('//')) return from;
  return '/resources/docs';
}

export default function DocsAccessView({ locale }: { locale: Locale }) {
  const c = C[locale];
  const params = useSearchParams();
  const from = safeFrom(params.get('from'));
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim() || loading) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/docs-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim() }),
      });
      if (res.ok) {
        window.location.assign(from); // full nav so the proxy sees the new cookie
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError((data as { error?: string }).error || c.genericErr);
    } catch {
      setError(c.genericErr);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-surface-dark min-h-screen flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
          <Lock className="w-6 h-6 text-primary" aria-hidden="true" />
        </div>
        <p className="text-xs font-medium text-primary uppercase tracking-wider mb-3">{c.eyebrow}</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 break-keep">{c.title}</h1>
        <p className="text-slate-300 mb-8 break-keep">{c.sub}</p>

        <form onSubmit={submit} className="space-y-3">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={c.placeholder}
            autoComplete="off"
            autoFocus
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {error && <p className="text-sm text-red-400 text-left px-1">{error}</p>}
          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="btn-primary w-full gap-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? c.submitting : c.submit}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <Link
          href={localeHref(locale, '/resources/docs')}
          className="mt-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {c.back}
        </Link>
      </div>
    </div>
  );
}
