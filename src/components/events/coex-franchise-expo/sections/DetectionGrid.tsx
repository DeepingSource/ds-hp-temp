import Image from 'next/image';
import { type Locale } from '@/lib/i18n';
import { care } from '../data';
import { CareMockup } from '../mockups';

/**
 * 섹션 3 — saai care. 중앙 헤더 + 2열(왼쪽 2×2 감지 사진 그리드 · 오른쪽 실시간 알림 폰).
 * 감지 사진은 리포 고해상 자산(계획 §5 대체). 배경은 옅은 회청(--layer-section-alt).
 */
export default function DetectionGrid({ locale }: { locale: Locale }) {
  return (
    <section id="care" className="section scroll-mt-20" style={{ backgroundColor: 'var(--layer-section-alt)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1.5 text-sm font-bold">
            <Image src="/images/saai-symbol.svg" alt="" width={16} height={16} aria-hidden="true" />
            {care.eyebrow}
            <span className="font-medium text-primary/70">· {care.eyebrowSub}</span>
          </span>
          <h2 className="mt-5 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-snug break-keep">
            {care.question}
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed break-keep">{care.lead}</p>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* 2×2 감지 그리드 */}
          <div className="grid grid-cols-2 gap-4">
            {care.detections.map((d) => (
              <figure key={d.label} className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                <div className="relative aspect-[4/3]">
                  <Image src={d.img} alt={d.alt} fill sizes="(max-width: 1024px) 45vw, 22vw" className="object-cover" />
                </div>
                <figcaption className="p-3">
                  <p className="text-sm font-bold text-gray-900">{d.label}</p>
                  <p className="mt-0.5 text-xs text-gray-500 break-keep">{d.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* 실시간 알림 폰 */}
          <div className="flex justify-center">
            <CareMockup locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
