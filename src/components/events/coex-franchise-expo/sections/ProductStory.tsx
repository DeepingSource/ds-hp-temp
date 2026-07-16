import type { ReactNode } from 'react';
import Image from 'next/image';
import type { FeatureCard } from '../data';

/**
 * 섹션 2·3·4 공용 뼈대 — pill 헤더 + 질문형 H2 + 리드 + (선택)기능 그리드 + 2열 미디어.
 * 좌우 배치는 mediaSide로 반전해 섹션 간 리듬을 만든다(계획 §7).
 */
interface ProductStoryProps {
  id?: string;
  eyebrow: string;
  eyebrowSub: string;
  question: string;
  lead: string;
  media: ReactNode;
  mediaSide?: 'left' | 'right';
  features?: FeatureCard[];
  footnote?: ReactNode;
  background?: 'white' | 'alt';
}

export default function ProductStory({
  id,
  eyebrow,
  eyebrowSub,
  question,
  lead,
  media,
  mediaSide = 'right',
  features,
  footnote,
  background = 'white',
}: ProductStoryProps) {
  const sectionStyle = background === 'alt' ? { backgroundColor: 'var(--layer-section-alt)' } : undefined;
  const mediaFirst = mediaSide === 'left';

  return (
    <section id={id} className="section scroll-mt-20" style={sectionStyle}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* 텍스트 컬럼 */}
          <div className={mediaFirst ? 'lg:order-2' : ''}>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1.5 text-sm font-bold">
              <Image src="/images/saai-symbol.svg" alt="" width={16} height={16} aria-hidden="true" />
              {eyebrow}
              <span className="font-medium text-primary/70">· {eyebrowSub}</span>
            </span>
            <h2 className="mt-5 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-snug break-keep">
              {question}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed break-keep">{lead}</p>

            {features && features.length > 0 && (
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {features.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.title} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                      <span className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-gray-900">{f.title}</h3>
                        <p className="mt-0.5 text-xs text-gray-500 leading-relaxed break-keep">{f.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {footnote && <div className="mt-6 space-y-3">{footnote}</div>}
          </div>

          {/* 미디어 컬럼 */}
          <div className={`flex justify-center ${mediaFirst ? 'lg:order-1' : ''}`}>{media}</div>
        </div>
      </div>
    </section>
  );
}
