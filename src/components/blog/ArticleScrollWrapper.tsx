'use client';

import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import ReadingProgress from './ReadingProgress';
import FloatingCta from './FloatingCta';
import type { Locale } from '@/lib/i18n';

/**
 * 블로그 상세 페이지 전용 스크롤 상태 관리.
 * ReadingProgress와 FloatingCta가 공유하는 단일 scroll 리스너 + RAF를 담당.
 */
export default function ArticleScrollWrapper({ locale = 'ko' }: { locale?: Locale }) {
  const [readProgress, setReadProgress] = useState(0);
  const [ctaVisible, setCtaVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const article = document.getElementById('article-content');
        if (!article) return;

        const rect = article.getBoundingClientRect();
        const articleTop = rect.top + window.scrollY;
        const articleHeight = rect.height;
        const scrolled = window.scrollY - articleTop;

        // 읽기 진행률: 콘텐츠 끝이 뷰포트 하단에 닿을 때 100%
        const denominator = articleHeight - window.innerHeight;
        const progress = denominator <= 0
          ? 100
          : Math.min(100, Math.max(0, (scrolled / denominator) * 100));
        setReadProgress(progress);

        // CTA 노출: 아티클 전체 높이 대비 25~95% 구간
        const scrollProgress = articleHeight > 0
          ? Math.max(0, Math.min(100, (scrolled / articleHeight) * 100))
          : 0;
        setCtaVisible(scrollProgress > 25 && scrollProgress < 95);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <ReadingProgress progress={readProgress} />
      <FloatingCta visible={ctaVisible} reducedMotion={reducedMotion} locale={locale} />
    </>
  );
}
