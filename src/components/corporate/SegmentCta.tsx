import Link from 'next/link';
import { ArrowRight, Building2, Store } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import {
  CTA_TRACK_E,
  CTA_TRACK_O,
  contactEnterpriseHref,
  OWNER_START_URL,
} from '@/lib/cta-canon';

/**
 * SegmentCta — 세그먼트 2트랙 CTA (⑤1-3 · MASTER §2-1 Phase 1 인프라).
 * saai-care 히어로의 2분기 버튼 패턴을 재사용 컴포넌트화한 것.
 *
 * - variant="buttons": 히어로/클로징용 버튼 쌍. `primary` 트랙이 채움 버튼,
 *   반대 트랙은 보조(텍스트/외곽선)로 강등.
 * - variant="switch": 혼재 페이지(products 인덱스·contact·pricing)용 2분기 카드 스위치 —
 *   방문자가 자기 트랙을 선택.
 *
 * 라벨·목적지는 cta-canon이 기본값(하드코딩 금지). 페이지 맥락형 CTA(functions 레인 등)는
 * label/href 오버라이드로 주입한다.
 */
interface SegmentCtaProps {
  locale: Locale;
  /** 어느 트랙이 주(primary)인가 — 페이지 성향. switch에서는 카드 순서만 좌우한다. */
  primary?: 'enterprise' | 'owner';
  variant?: 'buttons' | 'switch';
  /** 트랙 E 상담 경로에 병기할 product 컨텍스트 (예: 'saai-care'). */
  product?: string;
  tone?: 'light' | 'dark';
  className?: string;
  /** 맥락형 오버라이드 — 미지정 시 캐논 라벨·경로. */
  enterpriseLabel?: string;
  ownerLabel?: string;
  enterpriseHref?: string;
  /** 외부 URL(https://…) 또는 내부 경로 모두 허용. */
  ownerHref?: string;
}

const SWITCH_NOTE: Record<Locale, { enterprise: string; owner: string }> = {
  ko: { enterprise: '여러 매장 · 본사 도입', owner: '내 매장 하나로 시작' },
  en: { enterprise: 'Multi-store & HQ adoption', owner: 'Start with one store' },
  jp: { enterprise: '複数店舗・本部導入', owner: '1店舗から始める' },
};

function TrackLink({
  href,
  external,
  className,
  children,
}: {
  href: string;
  external: boolean;
  className: string;
  children: React.ReactNode;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function SegmentCta({
  locale,
  primary = 'enterprise',
  variant = 'buttons',
  product,
  tone = 'light',
  className = '',
  enterpriseLabel,
  ownerLabel,
  enterpriseHref,
  ownerHref,
}: SegmentCtaProps) {
  const eLabel = enterpriseLabel ?? CTA_TRACK_E[locale];
  const oLabel = ownerLabel ?? CTA_TRACK_O[locale];
  const eHrefRaw = enterpriseHref ?? contactEnterpriseHref(product);
  const oHrefRaw = ownerHref ?? OWNER_START_URL;
  const eExternal = eHrefRaw.startsWith('http');
  const oExternal = oHrefRaw.startsWith('http');
  const eHref = eExternal ? eHrefRaw : localeHref(locale, eHrefRaw);
  const oHref = oExternal ? oHrefRaw : localeHref(locale, oHrefRaw);

  if (variant === 'switch') {
    const note = SWITCH_NOTE[locale];
    const cardBase =
      tone === 'dark'
        ? 'border-white/15 bg-white/5 hover:bg-white/10 text-white'
        : 'border-gray-200 bg-white hover:border-primary-light text-gray-900';
    const subCls = tone === 'dark' ? 'text-slate-400' : 'text-gray-500';
    const cards = [
      {
        key: 'enterprise' as const,
        Icon: Building2,
        note: note.enterprise,
        label: eLabel,
        href: eHref,
        external: eExternal,
      },
      {
        key: 'owner' as const,
        Icon: Store,
        note: note.owner,
        label: oLabel,
        href: oHref,
        external: oExternal,
      },
    ];
    if (primary === 'owner') cards.reverse();
    return (
      <div className={`grid sm:grid-cols-2 gap-4 ${className}`}>
        {cards.map(({ key, Icon, note: n, label, href, external }) => (
          <TrackLink
            key={key}
            href={href}
            external={external}
            className={`group flex items-center justify-between gap-4 rounded-2xl border p-5 transition-colors ${cardBase}`}
          >
            <span className="flex items-center gap-3 min-w-0">
              <Icon className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
              <span className="min-w-0">
                <span className={`block text-2xs font-semibold ${subCls}`}>{n}</span>
                <span className="block text-sm font-bold break-keep">{label}</span>
              </span>
            </span>
            <ArrowRight
              className="w-4 h-4 shrink-0 opacity-60 group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </TrackLink>
        ))}
      </div>
    );
  }

  // variant="buttons" — 히어로/클로징 버튼 쌍
  const primaryCls = 'btn-primary btn-lg inline-flex items-center justify-center gap-2';
  const secondaryCls =
    tone === 'dark'
      ? 'inline-flex items-center justify-center gap-1.5 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white transition-colors'
      : 'inline-flex items-center justify-center gap-1.5 px-6 py-3.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors';

  const pair =
    primary === 'enterprise'
      ? [
          { label: eLabel, href: eHref, external: eExternal, cls: primaryCls, arrow: true },
          { label: oLabel, href: oHref, external: oExternal, cls: secondaryCls, arrow: false },
        ]
      : [
          { label: oLabel, href: oHref, external: oExternal, cls: primaryCls, arrow: true },
          { label: eLabel, href: eHref, external: eExternal, cls: secondaryCls, arrow: false },
        ];

  return (
    <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 ${className}`}>
      {pair.map(({ label, href, external, cls, arrow }) => (
        <TrackLink key={label} href={href} external={external} className={cls}>
          <span>{label}</span>
          {arrow && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
        </TrackLink>
      ))}
    </div>
  );
}
