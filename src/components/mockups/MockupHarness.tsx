'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';
import { DEMOS } from './MockupGallery';

/**
 * MockupHarness — /demo/harness 검증 하네스 (MOCKUP_MASTER_PLAN_v1 0-6).
 *
 * 각 데모를 3폭(320/480/768px) × 3로케일(ko/en/jp) = 9셀로 동시 렌더해
 * 깨짐·줄바꿈 편차를 시각 검증한다. 셀은 **고정폭 래퍼** — 갤러리의 max-w 유동
 * 래퍼와 달리 고정폭이어야 줄바꿈 편차가 결정적으로 재현된다(§2-B의 검증 도구).
 * MockupViewport 마이그레이션이 끝난 목업은 세 폭에서 scale만 변하고 내부
 * 줄바꿈이 0이어야 한다 (Phase 0 Acceptance).
 *
 * `?id=<demoId>`로 단일 데모 모드 — Playwright 스크린샷 diff(Phase 4)용.
 */

const WIDTHS = [320, 480, 768] as const;

function HarnessBody() {
  const params = useSearchParams();
  const only = params.get('id');
  const demos = only ? DEMOS.filter((d) => d.id === only) : DEMOS;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8 max-w-4xl">
        <h1 className="text-xl font-bold text-gray-900 mb-1">목업 검증 하네스 (내부용)</h1>
        <p className="text-sm text-gray-600 break-keep">
          3폭(320/480/768) × 3로케일 동시 렌더 — 폭이 달라져도 내부 줄바꿈이 변하지 않아야
          한다(MockupViewport 계약). <code className="text-xs bg-gray-200 px-1 rounded">?id=…</code>로
          단일 데모 모드.
        </p>
        {!only && (
          <nav className="mt-3 flex flex-wrap gap-1.5">
            {DEMOS.map((d) => (
              <Link
                key={d.id}
                href={`?id=${d.id}`}
                className="px-2 py-0.5 rounded bg-white border border-gray-200 text-xs text-gray-600 hover:border-gray-400"
              >
                {d.id}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <div className="space-y-14">
        {demos.map((demo) => (
          <section key={demo.id} id={demo.id}>
            <h2 className="text-base font-bold text-gray-900 mb-1">
              {demo.label}{' '}
              <code className="text-xs font-normal text-gray-400">?id={demo.id}</code>
            </h2>
            <p className="text-xs text-gray-500 mb-4 break-keep max-w-3xl">{demo.description}</p>
            <div className="space-y-8">
              {WIDTHS.map((w) => (
                <div key={w}>
                  <p className="text-xs font-mono font-bold text-gray-400 mb-2">{w}px</p>
                  <div className="flex gap-6 overflow-x-auto pb-2">
                    {(locales as readonly Locale[]).map((loc) => (
                      <div key={loc} className="shrink-0" style={{ width: w }}>
                        <p className="text-2xs font-mono text-gray-400 mb-1 uppercase">{loc}</p>
                        {/* 고정폭 셀 — 목업은 이 폭을 계약대로 스케일로만 소화해야 한다 */}
                        <div className="rounded-xl border border-dashed border-gray-300 bg-white/60 p-2 overflow-hidden">
                          {demo.render({ active: true, locale: loc })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

export default function MockupHarness() {
  return (
    <Suspense fallback={null}>
      <HarnessBody />
    </Suspense>
  );
}
