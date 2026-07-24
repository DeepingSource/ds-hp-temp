import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { CTA_TRACK_E, contactEnterpriseHref } from '@/lib/cta-canon';

/**
 * MidCta — 본문 중간 인라인 전환 앵커 (MASTER Phase 1 · ②A-3 · ④8-0 ②지점).
 * 긴 페이지의 스크롤 이탈을 잡는 한 줄짜리 CTA. 가장 강한 증거/반론해소 섹션
 * 직후에 배치한다. 라벨 기본값은 트랙 E 캐논, 맥락형 라벨은 label로 주입.
 */
interface MidCtaProps {
  locale: Locale;
  /** 맥락 문장 (예: "지금 있는 CCTV로 되는지 먼저 확인해 보세요") */
  lead?: string;
  label?: string;
  href?: string;
  product?: string;
  tone?: 'light' | 'dark';
  className?: string;
}

export default function MidCta({
  locale,
  lead,
  label,
  href,
  product,
  tone = 'light',
  className = '',
}: MidCtaProps) {
  const finalLabel = label ?? CTA_TRACK_E[locale];
  const finalHref = href ?? contactEnterpriseHref(product);
  const leadCls = tone === 'dark' ? 'text-slate-300' : 'text-gray-600';

  return (
    <div className={`text-center ${className}`}>
      {lead && <p className={`text-sm mb-2 break-keep ${leadCls}`}>{lead}</p>}
      <Link
        href={finalHref.startsWith('http') ? finalHref : localeHref(locale, finalHref)}
        className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-dark transition-colors group"
      >
        {finalLabel}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
      </Link>
    </div>
  );
}
