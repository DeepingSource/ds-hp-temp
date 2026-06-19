import Link from 'next/link';
import InlineNewsletterForm from '@/components/ui/InlineNewsletterForm';
import { COMPANY } from '@/lib/company-data';

const minisiteLinks = [
  { href: '/', label: '서비스 소개' },
  { href: '/newsletter', label: '뉴스레터' },
  { href: '/sample', label: 'AI 브리핑 체험' },
  { href: '/blog', label: '블로그' },
  { href: '/contact', label: '상담 신청' },
];

const legalLinks = [
  { href: '/privacy', label: '개인정보 처리방침' },
  { href: '/terms', label: '이용약관' },
];

export default function MinisiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 noise-overlay">
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Newsletter CTA */}
        <div className="max-w-md mx-auto text-center mb-12">
          <p className="text-lg font-semibold text-white mb-2">
            매주 월요일, 편의점 운영 인사이트
          </p>
          <p className="text-sm text-gray-300 mb-4">
            AI가 정리한 이번 주 편의점 트렌드를 이메일로 받아보세요
          </p>
          <InlineNewsletterForm variant="dark" sampleHref="/sample?utm_source=minisite&utm_medium=footer&utm_content=newsletter" />
        </div>

        {/* Product cross-sell */}
        <div className="text-center mb-10 py-6 border-t border-b border-gray-800">
          <p className="text-sm text-gray-300">
            관찰(<Link href="/storecare" className="text-gray-300 hover:text-white hover:underline transition-colors">StoreCare</Link>)
            {' · '}
            분석(<Link href="/storeinsight" className="text-gray-300 hover:text-white hover:underline transition-colors">StoreInsight</Link>)과
            함께 쓰면 더 강력합니다
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Logo */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <span className="text-xl font-bold text-white tracking-tight">STOREAGENT</span>
              <span className="text-xs text-gray-500">by SAAI</span>
            </Link>
            <p className="text-sm text-gray-300">{COMPANY.tagline}</p>
            <a
              href="https://www.deepingsource.io"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DeepingSource 웹사이트 (새 탭에서 열림)"
              className="text-xs text-gray-300 hover:text-gray-200 transition-colors mt-1 inline-block"
            >
              by DeepingSource ↗
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-8 sm:gap-14">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">StoreAgent</p>
              <nav className="flex flex-col gap-2" aria-label="StoreAgent">
                {minisiteLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">법적 고지</p>
              <nav className="flex flex-col gap-2" aria-label="법적 고지">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-gray-800 space-y-3">
          <p className="text-xs text-gray-300">
            DeepingSource Inc. | 5F 508, Eonju-ro, Gangnam-gu, Seoul, Republic of Korea
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-3">
          <p className="text-sm text-gray-300">
            &copy; {currentYear} DeepingSource Inc. All rights reserved.
          </p>
          <a
            href="mailto:SAAI@deepingsource.io"
            className="text-sm text-gray-300 hover:text-white hover:underline transition-colors"
          >
            SAAI@deepingsource.io
          </a>
        </div>
      </div>
    </footer>
  );
}
