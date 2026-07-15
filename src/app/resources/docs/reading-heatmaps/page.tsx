import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, ArrowLeft, Palette, Clock, Lightbulb, HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '히트맵 읽는 법 | DEEPINGSOURCE',
  description:
    '매장 히트맵에서 색과 농담이 의미하는 것, 시간대별 히트맵을 비교하는 법, 히트맵을 매대 배치에 활용하는 법을 안내합니다.',
  alternates: { canonical: '/resources/docs/reading-heatmaps' },
  openGraph: {
    title: '히트맵 읽는 법 | DEEPINGSOURCE',
    description: '히트맵의 색이 의미하는 것과 활용법을 안내합니다.',
    url: '/resources/docs/reading-heatmaps',
  },
};

type Sub = { id: string; title: string };
type Section = { id: string; icon: typeof BookOpen; title: string; subs: Sub[] };

const sections: Section[] = [
  { id: 'about', icon: BookOpen, title: '개요', subs: [{ id: 'about', title: '히트맵이란' }] },
  { id: 'color', icon: Palette, title: '색 읽는 법', subs: [{ id: 'color', title: '농담이 의미하는 것' }] },
  { id: 'time', icon: Clock, title: '시간대별 비교', subs: [{ id: 'time', title: '오전·점심·저녁' }] },
  { id: 'use', icon: HelpCircle, title: '활용법', subs: [{ id: 'use', title: '매대 배치에 반영하기' }] },
  { id: 'faq', icon: HelpCircle, title: 'FAQ', subs: [{ id: 'faq', title: '자주 묻는 질문' }] },
];

export default function ReadingHeatmapsDoc() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24">
              <Link href="/resources/docs" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> 제품 문서로
              </Link>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold text-gray-900">히트맵 읽는 법</span>
              </div>
              <nav className="space-y-5">
                {sections.map((section) => (
                  <div key={section.id}>
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">{section.title}</p>
                    <ul className="space-y-1 border-l border-gray-100 pl-3">
                      {section.subs.map((sub) => (
                        <li key={sub.id}>
                          <a href={`#${sub.id}`} className="block text-sm text-gray-500 hover:text-primary py-1 transition-colors">
                            {sub.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">Docs · Using Analytics</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              히트맵 읽는 법
            </h1>
            <p className="text-gray-500 leading-relaxed max-w-2xl mb-12 break-keep">
              매장 히트맵에서 색이 의미하는 것과, 이를 매대·진열 배치에 활용하는 법을 안내합니다.
              실제 화면은 store insight 사용자 매뉴얼의 히트맵 분석 섹션에서 확인할 수 있습니다.
            </p>

            {/* 개요 */}
            <section id="about" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><BookOpen className="w-5 h-5 text-primary" /></span>
                히트맵이란
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                히트맵은 고객의 이동·체류가 매장의 어느 위치에 집중되는지를 색의 농담으로 시각화한 리포트입니다.
                숫자로 된 표보다 매장 도면 위에서 한눈에 흐름을 파악할 수 있다는 점이 특징입니다.
              </p>
            </section>

            {/* 색 읽는 법 */}
            <section id="color" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Palette className="w-5 h-5 text-primary" /></span>
                색 읽는 법
              </h2>
              <ul className="space-y-2.5 text-sm text-gray-600 break-keep list-disc list-inside marker:text-primary">
                <li><strong className="text-gray-700">진한 색(뜨거운 영역)</strong> — 고객의 이동·체류가 많이 몰린 곳입니다.</li>
                <li><strong className="text-gray-700">옅은 색(차가운 영역)</strong> — 상대적으로 고객이 적게 지나가거나 머무는 곳입니다.</li>
                <li>색 자체의 절대적인 진하기보다, <strong className="text-gray-700">같은 매장 안에서 구역 간 상대적인 차이</strong>를 비교하는 것이 더 유용합니다.</li>
              </ul>
            </section>

            {/* 시간대별 비교 */}
            <section id="time" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Clock className="w-5 h-5 text-primary" /></span>
                시간대별 비교
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                오전·점심·저녁처럼 시간대를 나눠 히트맵을 비교하면, 하루 중 언제 어느 구역이 붐비는지 알 수 있습니다.
                예를 들어 점심시간에는 계산대 주변이, 저녁에는 특정 매대가 진하게 나타날 수 있습니다. 이런 차이를 발견하면
                시간대별로 인력 배치나 프로모션 위치를 다르게 가져가는 근거로 쓸 수 있습니다.
              </p>
            </section>

            {/* 활용법 */}
            <section id="use" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Lightbulb className="w-5 h-5 text-primary" /></span>
                활용법
              </h2>
              <ul className="space-y-2.5 text-sm text-gray-600 break-keep list-disc list-inside marker:text-primary">
                <li>진한 영역에 신제품이나 마진이 높은 상품을 배치하면 노출 효과를 높일 수 있습니다.</li>
                <li>옅은 영역은 동선이나 진열을 바꿔 고객을 유도할 여지가 있는지 살펴봅니다.</li>
                <li>구역별 관심도, 구매 전환율 등 다른 리포트와 함께 보면 &ldquo;사람이 많이 온다&rdquo;와 &ldquo;실제로 관심을 보인다&rdquo;를 구분할 수 있습니다.</li>
              </ul>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><HelpCircle className="w-5 h-5 text-primary" /></span>
                자주 묻는 질문
              </h2>
              <div className="space-y-3">
                {[
                  ['히트맵과 구역별 분석의 차이는 무엇인가요?', '구역별 분석은 미리 설정한 구역 단위로 숫자를 비교하는 리포트이고, 히트맵은 구역 구분 없이 매장 전체의 흐름을 시각적으로 보여줍니다. 함께 보면 더 정확합니다.'],
                  ['특정 날짜만 골라 히트맵을 볼 수 있나요?', '네. 상단의 기간 선택으로 원하는 날짜·기간을 지정해 확인할 수 있습니다.'],
                  ['매장 도면이 실제와 다르게 보여요.', '도면·라인·구역 설정이 실제 매장과 다를 수 있습니다. 대시보드 설정에서 확인하거나 담당 매니저에게 문의하세요.'],
                ].map(([q, a]) => (
                  <details key={q} className="card p-5 group">
                    <summary className="text-sm font-medium text-gray-900 cursor-pointer list-none flex items-center justify-between">
                      {q}
                      <span className="text-gray-400 group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="text-sm text-gray-600 leading-relaxed mt-3 break-keep">{a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* 다음 단계 */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              <Link href="/resources/docs/store-insight#space" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">store insight 매뉴얼: 공간 가치 발견 →</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">실제 히트맵 화면과 구역별 분석을 확인하세요.</p>
              </Link>
              <Link href="/resources/docs#analytics" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">체류·전환 지표 →</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">히트맵과 함께 보면 좋은 핵심 지표들입니다.</p>
              </Link>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-3 px-5 py-5 bg-primary/5 border border-primary/10 rounded-xl">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">우리 매장 히트맵 해석이 어려우신가요?</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3 break-keep">
                  화면을 캡처해 문의해 주시면 함께 해석해 드립니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/contact" className="btn-primary text-sm">문의하기</Link>
                  <Link href="/resources/docs" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-xl hover:border-primary-light transition-colors">제품 문서로 돌아가기</Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
