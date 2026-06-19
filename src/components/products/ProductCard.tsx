import Link from 'next/link';
import { ArrowRight, ArrowUpRight, type LucideIcon } from 'lucide-react';

export interface ProductCardProps {
  icon: LucideIcon;
  name: string;
  tagline: string;
  desc: string;
  href: string;
  external?: boolean;
  badge?: string;
  kicker?: string;
}

export default function ProductCard({
  icon: Icon,
  name,
  tagline,
  desc,
  href,
  external = false,
  badge,
  kicker,
}: ProductCardProps) {
  const cardInner = (
    <>
      <div className="flex items-start justify-between mb-5">
        <div className="w-12 h-12 rounded-xl bg-primary-lighter flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        {badge && (
          <span className="text-xs font-medium text-primary bg-primary-lighter px-2.5 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>
      {kicker && (
        <p className="text-2xs font-bold uppercase tracking-[0.18em] text-gray-500 mb-1">{kicker}</p>
      )}
      <h3 className="text-xl font-bold text-gray-900 mb-1.5">{name}</h3>
      <p className="text-sm font-medium text-primary mb-3 break-keep">{tagline}</p>
      <p className="text-base text-gray-500 leading-relaxed mb-6 break-keep">{desc}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        {external ? '바로가기' : '자세히 보기'}
        {external ? (
          <ArrowUpRight className="w-4 h-4" />
        ) : (
          <ArrowRight className="w-4 h-4" />
        )}
      </span>
    </>
  );

  const className =
    'card glow-ring flex flex-col h-full no-underline';

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {cardInner}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {cardInner}
    </Link>
  );
}
