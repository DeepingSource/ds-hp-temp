import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Boxes } from 'lucide-react';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import Card from '@/components/ui/Card';
import IconChip from '@/components/ui/IconChip';

/** Internal design-system reference (not indexed). Mirrors /demo's noindex. */
export const metadata: Metadata = {
  title: '디자인 시스템 스타일가이드 (내부용)',
  robots: { index: false, follow: false },
};

const SWATCH = (name: string, cls: string, hex: string) => ({ name, cls, hex });

const brand = [
  SWATCH('primary', 'bg-primary', '#376AE2'),
  SWATCH('primary-dark', 'bg-primary-dark', '#2453C4'),
  SWATCH('primary-light', 'bg-primary-light', '#5B86EA'),
  SWATCH('primary-lighter', 'bg-primary-lighter', '#E5EDFC'),
];
const grays = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].map((g) =>
  SWATCH(`gray-${g}`, `bg-gray-${g}`, `var(--gray-${g})`),
);
const status = [
  SWATCH('success', 'bg-success', '#4CAF50'),
  SWATCH('warning', 'bg-warning', '#FF9800'),
  SWATCH('error', 'bg-error', '#F44336'),
];

function Swatches({ title, items }: { title: string; items: ReturnType<typeof SWATCH>[] }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-bold text-gray-700">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {items.map((s) => (
          <div key={s.name} className="w-28">
            <div className={`h-14 w-full rounded-lg border border-gray-200 ${s.cls}`} />
            <p className="mt-1 text-2xs font-medium text-gray-700">{s.name}</p>
            <p className="text-3xs text-gray-400">{s.hex}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StyleguidePage() {
  if (process.env.NODE_ENV === 'production') notFound();
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <Eyebrow>Internal · not indexed</Eyebrow>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">디자인 시스템 스타일가이드</h1>
        <p className="mt-2 text-sm text-gray-500">
          토큰 SoT: <code className="text-gray-700">src/app/globals.css</code> ·{' '}
          <code className="text-gray-700">src/lib/tokens.ts</code>. 규칙은 <code className="text-gray-700">/DESIGN.md</code>.
        </p>

        {/* Colors */}
        <section className="mt-10 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Color</h2>
          <Swatches title="Brand" items={brand} />
          <Swatches title="Gray" items={grays} />
          <Swatches title="Status (Material)" items={status} />
        </section>

        {/* Shadows */}
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Elevation (blue-black)</h2>
          <div className="flex flex-wrap gap-6">
            {['shadow-card', 'shadow-card-hover', 'shadow-elevated'].map((s) => (
              <div key={s} className={`flex h-24 w-44 items-center justify-center rounded-2xl bg-white ${s}`}>
                <code className="text-xs text-gray-600">{s}</code>
              </div>
            ))}
          </div>
        </section>

        {/* Radius */}
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Radius</h2>
          <div className="flex flex-wrap items-end gap-4">
            {['rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl'].map((r) => (
              <div key={r} className="text-center">
                <div className={`h-16 w-16 border border-gray-300 bg-primary-lighter ${r}`} />
                <p className="mt-1 text-3xs text-gray-500">{r}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Typography</h2>
          <div className="space-y-2 text-gray-900">
            <p className="text-5xl font-bold font-display">Display 5xl</p>
            <p className="text-3xl font-bold">Heading 3xl</p>
            <p className="text-xl font-medium">Subhead xl</p>
            <p className="text-base">Body base</p>
            <p className="text-sm text-gray-600">Small sm</p>
            <p className="text-2xs text-gray-500">Micro text-2xs (11px)</p>
            <p className="text-3xs text-gray-500">Micro text-3xs (10px)</p>
            <p className="text-4xs text-gray-500">Micro text-4xs (8px)</p>
          </div>
        </section>

        {/* Primitives */}
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Primitives</h2>
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-xs text-gray-500">&lt;Eyebrow tone&gt;</p>
              <div className="space-y-1">
                <Eyebrow tone="primary">Eyebrow · primary</Eyebrow>
                <Eyebrow tone="muted">Eyebrow · muted</Eyebrow>
                <div className="rounded bg-gray-900 p-2">
                  <Eyebrow tone="light">Eyebrow · light (on dark)</Eyebrow>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs text-gray-500">&lt;Card hover&gt; + &lt;IconChip&gt;</p>
              <Card hover className="max-w-xs p-6">
                <IconChip>
                  <Boxes className="h-5 w-5 text-primary" aria-hidden="true" />
                </IconChip>
                <p className="mt-4 font-bold text-gray-900">Card title</p>
                <p className="mt-1 text-sm text-gray-600">Hover for shadow-card-hover elevation.</p>
              </Card>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
