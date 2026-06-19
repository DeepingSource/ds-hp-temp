import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Props {
  visible: boolean;
  reducedMotion: boolean;
}

/**
 * 블로그 상세 페이지 전용 floating CTA.
 * - 데스크탑(lg+)에서만 노출 — 모바일은 MobileStickyBar가 담당
 * - 스크롤 진행도는 ArticleScrollWrapper에서 계산하여 props로 전달
 * - enter: ease-out / exit: ease-in
 */
export default function FloatingCta({ visible, reducedMotion }: Props) {
  const transitionClass = reducedMotion
    ? 'transition-none'
    : 'transition-[opacity,transform] duration-300 ease-out';

  const visibilityClass = visible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-2 pointer-events-none';

  return (
    <div
      className={`hidden lg:flex fixed bottom-8 right-8 z-[var(--z-float)] ${transitionClass} ${visibilityClass}`}
      {...(!visible && { 'aria-hidden': true })}
    >
      <Link
        href="/contact"
        tabIndex={visible ? 0 : -1}
        className="inline-flex items-center gap-2 px-5 py-3 bg-gray-900 text-white text-sm font-bold rounded-full shadow-lg cursor-pointer hover:bg-primary hover:shadow-xl transition-[background-color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
      >
        무료 상담 신청
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
