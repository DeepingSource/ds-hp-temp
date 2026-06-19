import Link from 'next/link';
import { valueAnchors } from '@/lib/pricing-data';
import type { Plan } from '@/lib/pricing-data';

interface PricingCardProps {
  plan: Plan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  const isPopular = plan.popular;

  return (
    <div
      className={`relative rounded-2xl p-6 transition-[border-color,box-shadow] duration-300 ${
        isPopular
          ? 'bg-primary text-white border-2 border-primary shadow-xl scale-105 hover:shadow-2xl'
          : 'bg-white border border-gray-200 hover:border-primary/30 hover:shadow-lg'
      }`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 inset-x-0 flex justify-center">
          <span className="bg-yellow-400 text-gray-900 text-sm font-bold px-4 py-1 rounded-full shadow-sm">
            추천
          </span>
        </div>
      )}

      {/* Plan Name */}
      <h3
        className={`text-xl font-bold mb-2 ${
          isPopular ? 'text-white' : 'text-gray-900'
        }`}
      >
        {plan.name}
      </h3>

      {/* Price */}
      <div className="mb-1">
        <span
          className={`text-3xl font-bold ${
            isPopular ? 'text-white' : 'text-primary'
          }`}
        >
          {plan.price}
        </span>
        {plan.priceNote && (
          <span
            className={`text-sm ${
              isPopular ? 'text-white/80' : 'text-gray-500'
            }`}
          >
            {plan.priceNote}
          </span>
        )}
      </div>

      {/* Value Anchor */}
      {valueAnchors[plan.id] && (
        <p
          className={`text-xs mb-4 ${
            isPopular ? 'text-white/70' : 'text-gray-500'
          }`}
        >
          ({valueAnchors[plan.id]})
        </p>
      )}

      {/* Description */}
      <p
        className={`text-sm mb-6 ${
          isPopular ? 'text-white/80' : 'text-gray-600'
        }`}
      >
        {plan.description}
      </p>

      {/* Features */}
      <ul className="space-y-3 mb-6">
        {plan.features.map((feature) => (
          <li
            key={feature.text}
            className={`flex items-center gap-2 text-sm ${
              feature.included
                ? isPopular
                  ? 'text-white'
                  : 'text-gray-700'
                : isPopular
                ? 'text-white/40'
                : 'text-gray-500'
            }`}
          >
            <span
              className={
                feature.included
                  ? isPopular
                    ? 'text-yellow-300'
                    : 'text-primary'
                  : ''
              }
              aria-hidden="true"
            >
              {feature.included ? '✓' : '−'}
            </span>
            <span className="sr-only">{feature.included ? '포함:' : '미포함:'}</span>
            {feature.text}
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Link
        href={plan.ctaLink}
        className={`block w-full text-center py-3 rounded-lg font-medium transition-[background-color,box-shadow] ${
          isPopular
            ? 'bg-white text-primary hover:bg-gray-100 hover:shadow-md'
            : 'bg-primary text-white hover:bg-primary-dark hover:shadow-md'
        }`}
      >
        {plan.cta}
      </Link>
    </div>
  );
}
