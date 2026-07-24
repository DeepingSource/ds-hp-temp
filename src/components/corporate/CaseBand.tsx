import Image from 'next/image';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import Card from '@/components/ui/Card';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import { type Locale } from '@/lib/i18n';

/**
 * CaseBand — a compact proof band (home). Three field scenarios that show what
 * changes on the floor once the space can be read: read · alert · act. Each card
 * pairs a real screen capture with a one-line illustrative result. Results are NOT
 * attributed to any named partner; every card carries a locale-appropriate
 * "Illustrative" marker per honesty rules.
 */

type Case = { img: string; alt: string; title: string; result: string };

const dict: Record<Locale, { eyebrow: string; heading: string; note: string; cases: Case[] }> = {
  ko: {
    eyebrow: '현장 시나리오',
    heading: '현장에서 일어나는 변화',
    note: '예시',
    cases: [
      {
        img: '/images/cases/case-convenience.jpg',
        alt: '진열 동선 변경 전후 비교',
        title: '학원가 편의점, 동선 하나를 바꿨습니다',
        result: '가장 잘 팔리는 진열을 통행 많은 자리로 옮기면, 매출이 따라 움직입니다',
      },
      {
        img: '/images/cases/case-exhibition.jpg',
        alt: '전시관 관람 동선 분석 화면',
        title: '시립 전시관, 머무는 자리를 찾았습니다',
        result: '관람 동선을 다시 짜면, 머무는 시간이 늘어납니다',
      },
      {
        img: '/images/cases/case-cafe.jpg',
        alt: '매장 히트맵 분석 화면',
        title: '로드숍 카페, 사각지대를 읽었습니다',
        result: '비어 있던 구역에 좌석을 더하면, 회전이 빨라집니다',
      },
    ],
  },
  en: {
    eyebrow: 'Field scenarios',
    heading: 'What changes on the floor',
    note: 'Illustrative',
    cases: [
      {
        img: '/images/cases/case-convenience.jpg',
        alt: 'Before-and-after of a changed shelf path',
        title: 'Convenience store near campus: one path changed',
        result: 'Move the best-seller into the busiest path, and revenue follows',
      },
      {
        img: '/images/cases/case-exhibition.jpg',
        alt: 'Exhibit visitor-flow analysis screen',
        title: 'City exhibition hall: found where people linger',
        result: 'Rework the route, and people stay longer',
      },
      {
        img: '/images/cases/case-cafe.jpg',
        alt: 'Store heatmap analysis screen',
        title: 'Street-side cafe: read the blind spots',
        result: 'Add seats to the dead zones, and tables turn faster',
      },
    ],
  },
  jp: {
    eyebrow: '現場シナリオ',
    heading: '現場で起きる変化',
    note: '例',
    cases: [
      {
        img: '/images/cases/case-convenience.jpg',
        alt: '陳列動線の変更前後の比較',
        title: '学生街のコンビニ、動線を一つ変えました',
        result: '一番売れる棚を人通りの多い場所へ移すと、売上がついてきます',
      },
      {
        img: '/images/cases/case-exhibition.jpg',
        alt: '展示館の観覧動線の分析画面',
        title: '市立展示館、人が留まる場所を見つけました',
        result: '観覧動線を組み直すと、滞在が伸びます',
      },
      {
        img: '/images/cases/case-cafe.jpg',
        alt: '店舗ヒートマップの分析画面',
        title: '路面のカフェ、死角を読み取りました',
        result: '空きエリアに席を足すと、回転が速くなります',
      },
    ],
  },
};

export default function CaseBand({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <Section pad="compact" variant="alt">
      <Container>
        <div className="mb-8 max-w-2xl">
          <Eyebrow tone="primary" className="mb-3">{t.eyebrow}</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep font-display">{t.heading}</h2>
        </div>

        <StaggerContainer className="grid sm:grid-cols-3 gap-5">
          {t.cases.map((c) => (
            <StaggerItem key={c.title} className="h-full">
              <Card hover className="group h-full overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden shadow-card">
                  <Image
                    src={c.img}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-2 break-keep">{c.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed break-keep">{c.result}</p>
                  <p className="mt-3 text-3xs text-gray-400">{t.note}</p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
