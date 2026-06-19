import { Fragment } from 'react';
import { comparisonFeatures } from '@/lib/pricing-data';

function RenderValue({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? (
      <span className="text-primary" aria-label="포함">✓</span>
    ) : (
      <span className="text-gray-300" aria-label="미포함">−</span>
    );
  }
  return <span className="text-sm text-gray-700">{value}</span>;
}

export default function PlanComparison() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <caption className="sr-only">플랜별 기능 비교표</caption>
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-4 px-4 font-medium text-gray-600">
              기능
            </th>
            <th className="text-center py-4 px-4 font-medium text-gray-900">
              <span className="block text-xs text-gray-500">무료</span>
              기본형
            </th>
            <th className="text-center py-4 px-4 font-medium text-primary">
              <span className="block text-xs text-primary/60">15,000원/월</span>
              POS 연동
            </th>
            <th className="text-center py-4 px-4 font-medium text-gray-900">
              <span className="block text-xs text-gray-500">25,000원/월</span>
              AI 비서
            </th>
            <th className="text-center py-4 px-4 font-medium text-gray-900">
              <span className="block text-xs text-gray-500">별도 견적</span>
              케어·인사이트
            </th>
          </tr>
        </thead>
        <tbody>
          {comparisonFeatures.map((category, categoryIndex) => (
            <Fragment key={category.category}>
              {/* Category Header */}
              <tr className="bg-gray-50">
                <td
                  colSpan={5}
                  className="py-3 px-4 font-semibold text-gray-900"
                >
                  {category.category}
                </td>
              </tr>
              {/* Features */}
              {category.features.map((feature, featureIndex) => (
                <tr
                  key={`feature-${categoryIndex}-${featureIndex}`}
                  className="border-b border-gray-100"
                >
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {feature.name}
                  </td>
                  <td className="text-center py-3 px-4">
                    <RenderValue value={feature.free} />
                  </td>
                  <td className="text-center py-3 px-4 bg-primary-lighter/50">
                    <RenderValue value={feature.standard} />
                  </td>
                  <td className="text-center py-3 px-4">
                    <RenderValue value={feature.premium} />
                  </td>
                  <td className="text-center py-3 px-4">
                    <RenderValue value={feature.enterprise} />
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
