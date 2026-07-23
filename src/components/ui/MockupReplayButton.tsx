'use client';

import { RotateCcw } from 'lucide-react';
import { type Locale } from '@/lib/i18n';

/**
 * 목업 1회 재생(once) 정지 후 우하단에 뜨는 ↻ 재재생 버튼 오버레이.
 * 부모는 relative 컨테이너여야 하며, 재생 완료(done) 상태에서만 렌더한다.
 * (홈 모션 정책 D4: 뷰포트 진입 시 1회 재생 → 최종 프레임 정지 + 재생 버튼)
 */

const LABEL: Record<Locale, string> = {
  ko: '애니메이션 다시 재생',
  en: 'Replay animation',
  jp: 'アニメーションをもう一度再生',
};

interface MockupReplayButtonProps {
  locale?: Locale;
  onReplay: () => void;
  /** 다크 목업 위에 올릴 때 'dark' (밝은 버튼), 기본 'light' */
  tone?: 'light' | 'dark';
  className?: string;
}

export default function MockupReplayButton({
  locale = 'ko',
  onReplay,
  tone = 'light',
  className = '',
}: MockupReplayButtonProps) {
  return (
    <button
      type="button"
      onClick={onReplay}
      aria-label={LABEL[locale]}
      title={LABEL[locale]}
      className={`absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full shadow-card transition-colors ${
        tone === 'dark'
          ? 'bg-white/90 text-gray-700 hover:bg-white'
          : 'bg-gray-900/80 text-white hover:bg-gray-900'
      } ${className}`}
    >
      <RotateCcw className="h-4 w-4" aria-hidden />
    </button>
  );
}
