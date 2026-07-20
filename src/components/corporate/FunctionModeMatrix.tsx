import { MODE_ORDER, FUNCTION_ORDER, type FunctionKey, type ModeKey } from '@/lib/brand-canon';
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

/**
 * One MODE's column — all twelve functions seen through a single mode.
 *
 * This is what a product page is: "how does this mode put every function to work?"
 * It is the matrix read vertically instead of horizontally.
 */
export function FunctionModeColumn({ mode, locale }: { mode: ModeKey; locale: Locale }) {
  const fnCopy = FUNCTION_COPY[locale];
  const cells = MATRIX_COPY[locale];

  return (
    <ul className="grid gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 sm:grid-cols-2">
      {FUNCTION_ORDER.map((fn) => (
        <li key={fn} className="bg-white p-5">
          <p className="font-mono text-sm font-bold text-gray-900">
            store {fn}
            <span className="ml-2 font-sans text-2xs font-medium text-gray-400">{fnCopy[fn]}</span>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-gray-600 break-keep">{cells[fn][mode]}</p>
        </li>
      ))}
    </ul>
  );
}

/** Section copy for the per-product matrix column. */
export const MODE_COLUMN_COPY: Record<Locale, { eyebrow: string; title: (mode: string) => string; sub: string; cta: string }> = {
  ko: {
    eyebrow: '기능 × 이 모드',
    title: (m) => `${m}는 12개 기능을 이렇게 통과시킵니다`,
    sub: '기능은 한 제품의 것이 아닙니다. 같은 기능을 이 모드가 어떤 시간축·목적으로 읽는지가 이 제품입니다.',
    cta: '기능 라이브러리 전체 보기',
  },
  en: {
    eyebrow: 'Functions × this mode',
    title: (m) => `How ${m} puts all twelve functions to work`,
    sub: 'Functions belong to no single product. What this product IS, is the time axis and purpose this mode reads them through.',
    cta: 'See the whole function library',
  },
  jp: {
    eyebrow: '機能 × このモード',
    title: (m) => `${m} は12の機能をこう通します`,
    sub: '機能は一つの製品のものではありません。同じ機能をこのモードがどの時間軸・目的で読むか — それがこの製品です。',
    cta: '機能ライブラリをすべて見る',
  },
};

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
