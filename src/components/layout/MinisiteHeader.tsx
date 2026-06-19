'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: '서비스 소개' },
  { href: '/newsletter', label: '뉴스레터' },
  { href: '/sample', label: 'AI 브리핑 체험' },
  { href: '/blog', label: '블로그' },
];

export default function MinisiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const openMenu = useCallback(() => {
    setIsOpen(true);
    setTimeout(() => firstLinkRef.current?.focus(), 100);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    toggleRef.current?.focus();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-gray-900">STOREAGENT</span>
          <span className="text-xs text-gray-500 font-medium">by SAAI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="미니사이트 내비게이션">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? 'text-primary font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/newsletter?utm_source=minisite&utm_medium=header&utm_content=cta" className="btn-primary text-sm px-4 py-2">
            뉴스레터 구독
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-600"
          onClick={() => isOpen ? closeMenu() : openMenu()}
          aria-expanded={isOpen}
          aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1 overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 py-0 border-t-0'
        }`}
        aria-label="모바일 내비게이션"
        inert={!isOpen ? true : undefined}
        onKeyDown={(e) => { if (e.key === 'Escape') closeMenu(); }}
      >
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              ref={i === 0 ? firstLinkRef : undefined}
              href={link.href}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                pathname === link.href
                  ? 'text-primary font-semibold bg-primary/5'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/newsletter?utm_source=minisite&utm_medium=header_mobile&utm_content=cta"
            tabIndex={isOpen ? 0 : -1}
            onClick={() => setIsOpen(false)}
            className="block text-center btn-primary text-sm px-4 py-2.5 mt-2"
          >
            뉴스레터 구독
          </Link>
        </nav>
    </header>
  );
}
