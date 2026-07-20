import { MODE_ORDER, FUNCTION_ORDER, type FunctionKey } from '@/lib/brand-canon';
import { MODE_COPY, FUNCTION_COPY, MATRIX_COPY } from '@/data/function-matrix-i18n';
import type { Locale } from '@/lib/i18n';

/**
 * FunctionModeMatrix — the Function × Mode Matrix v1.0 as a surface.
 *
 * SOT: brand-system/01_brand_system/SAAI_Function_Mode_Matrix_v1.0.md
 * Rows come from `FUNCTION_ORDER` and columns from `MODE_ORDER` in brand-canon, so a
 * matrix change in the code SOT shows up here without touching this file.
 *
 * Two shapes, one data source:
 *   • full table  — every function × every mode (/products/functions)
 *   • `only`      — one function's row, as three mode cards (a function's own page)
 *
 * Wide tables must scroll inside themselves, never push the page sideways.
 */

/** One function's row rendered as three mode cards — for a function's own page. */
export function FunctionModeStrip({ fn, locale }: { fn: FunctionKey; locale: Locale }) {
  const modes = MODE_COPY[locale];
  const cells = MATRIX_COPY[locale][fn];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {MODE_ORDER.map((m) => (
        <div key={m} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card">
          <p className="text-2xs font-mono font-medium uppercase tracking-wide text-gray-400">
            {modes[m].mode} · {modes[m].tense}
          </p>
          <p className="mt-1 text-base font-bold text-primary">{modes[m].name}</p>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 break-keep">{cells[m]}</p>
        </div>
      ))}
    </div>
  );
}

/** The full 12 × 3 table. */
export default function FunctionModeMatrix({
  locale,
  highlight,
}: {
  locale: Locale;
  /** Optional function row to visually anchor (its own page linking back to the library). */
  highlight?: FunctionKey;
}) {
  const modes = MODE_COPY[locale];
  const fnCopy = FUNCTION_COPY[locale];
  const cells = MATRIX_COPY[locale];

  return (
    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[48rem] border-collapse text-left">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th scope="col" className="py-4 pr-4 align-bottom text-sm font-bold text-gray-900">
              {locale === 'ko' ? '기능' : locale === 'jp' ? '機能' : 'Function'}
            </th>
            {MODE_ORDER.map((m) => (
              <th key={m} scope="col" className="py-4 px-4 align-bottom">
                <span className="block text-sm font-bold text-gray-900">{modes[m].name}</span>
                <span className="block text-2xs font-mono font-medium text-gray-400">
                  {modes[m].mode} · {modes[m].tense}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FUNCTION_ORDER.map((fn) => (
            <tr
              key={fn}
              className={`border-b border-gray-100 align-top ${highlight === fn ? 'bg-primary/5' : ''}`}
            >
              <th scope="row" className="py-4 pr-4 text-left">
                <span className="block font-mono text-sm font-bold text-gray-900">{fn}</span>
                <span className="block text-2xs text-gray-400 break-keep">{fnCopy[fn]}</span>
              </th>
              {MODE_ORDER.map((m) => (
                <td key={m} className="py-4 px-4 text-sm leading-relaxed text-gray-600 break-keep">
                  {cells[fn][m]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
