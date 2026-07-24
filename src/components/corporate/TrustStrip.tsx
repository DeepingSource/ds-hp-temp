import { BadgeCheck, FileCheck2, Landmark, Handshake } from 'lucide-react';
import { COMPANY } from '@/lib/company-data';
import type { Locale } from '@/lib/i18n';

/**
 * TrustStrip — 신뢰 수치 스트립 (MASTER Phase 1 · J4 확정 수치).
 * 상담 CTA 직전 반복 노출용(①0.5). 수치 SOT는 company 싱글톤(COMPANY) 1곳 —
 * 여기서 문구만 로케일별로 조립한다. 수치를 다른 곳에 하드코딩하지 말 것.
 *
 * `logos`: 고객사 로고 노드(선택) — 업종별 매핑은 페이지가 주입(J2 승인 완료).
 */
interface TrustStripProps {
  locale: Locale;
  tone?: 'light' | 'dark';
  className?: string;
  /** 고객사 로고 밴드(선택) — 스트립 상단에 렌더 */
  logos?: React.ReactNode;
}

const LABELS: Record<
  Locale,
  { patents: (n: number) => string; certs: (label: string) => string; funding: (n: number) => string; partners: (n: number) => string }
> = {
  ko: {
    patents: (n) => `특허 ${n}건 기술 검증`,
    certs: (label) => `${label} 인증·준수`,
    funding: (n) => `누적 투자 약 ${n}억 원`,
    partners: (n) => `전국 ${n}+ 파트너 브랜드`,
  },
  en: {
    patents: (n) => `${n} patents`,
    certs: (label) => `${label} certified`,
    funding: (n) => `~₩${n / 10}B raised`,
    partners: (n) => `${n}+ partner brands`,
  },
  jp: {
    patents: (n) => `特許${n}件の技術検証`,
    certs: (label) => `${label} 認証・遵守`,
    funding: (n) => `累計調達 約${n}億ウォン`,
    partners: (n) => `${n}+ パートナーブランド`,
  },
};

export default function TrustStrip({ locale, tone = 'light', className = '', logos }: TrustStripProps) {
  const l = LABELS[locale];
  const items = [
    { Icon: FileCheck2, text: l.patents(COMPANY.patents) },
    { Icon: BadgeCheck, text: l.certs(COMPANY.certLabel) },
    { Icon: Landmark, text: l.funding(COMPANY.fundingCumulativeBillionKrw) },
    { Icon: Handshake, text: l.partners(COMPANY.partnerBrands) },
  ];
  const itemCls =
    tone === 'dark'
      ? 'text-slate-300'
      : 'text-gray-600';
  const iconCls = tone === 'dark' ? 'text-primary-light' : 'text-primary';

  return (
    <div className={className}>
      {logos && <div className="mb-5">{logos}</div>}
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {items.map(({ Icon, text }) => (
          <li key={text} className={`inline-flex items-center gap-2 text-sm font-medium break-keep ${itemCls}`}>
            <Icon className={`w-4 h-4 shrink-0 ${iconCls}`} aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
