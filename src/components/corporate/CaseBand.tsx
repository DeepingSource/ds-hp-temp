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
    eyebrow: 'Field scenarios',
    heading: '현장에서 일어나는 변화',
    note: '예시',
    cases: [
      {
        img: '/images/storeinsight-case1-beforeafter.webp',
        alt: '진열 동선 변경 전후 비교',
        title: '학원가 편의점 — 동선 하나 바꿔',
        result: '가장 잘 팔리는 자리를 옮겨 매출 +10%',
      },
      {
        img: '/images/storeinsight-case2-action.webp',
        alt: '전시관 관람 동선 분석 화면',
        title: '시립 전시관 — 머무는 자리를 찾아',
        result: '관람 동선을 다시 짜 평균 체류 +25%',
      },
      {
        img: '/images/storeinsight-case3-heatmap.webp',
        alt: '매장 히트맵 분석 화면',
        title: '로드숍 카페 — 사각지대를 읽어',
        result: '빈 구역에 좌석을 더해 회전 +15%',
      },
    ],
  },
  en: {
    eyebrow: 'Field scenarios',
    heading: 'What changes on the floor',
    note: 'Illustrative',
    cases: [
      {
        img: '/images/storeinsight-case1-beforeafter.webp',
        alt: 'Before-and-after of a changed shelf path',
        title: 'Convenience store near campuses — one path changed',
        result: 'Moved the best-seller, lifted revenue +10%',
      },
      {
        img: '/images/storeinsight-case2-action.webp',
        alt: 'Exhibit visitor-flow analysis screen',
        title: 'City exhibition hall — found where people linger',
        result: 'Reworked the route, dwell time +25%',
      },
      {
        img: '/images/storeinsight-case3-heatmap.webp',
        alt: 'Store heatmap analysis screen',
        title: 'Street-side cafe — read the blind spots',
        result: 'Added seats to dead zones, turnover +15%',
      },
    ],
  },
  jp: {
    eyebrow: 'Field scenarios',
    heading: '現場で起きる変化',
    note: '例',
    cases: [
      {
        img: '/images/storeinsight-case1-beforeafter.webp',
        alt: '陳列動線の変更前後の比較',
        title: '学生街のコンビニ — 動線を一つ変えて',
        result: '一番売れる棚を移し、売上 +10%',
      },
      {
        img: '/images/storeinsight-case2-action.webp',
        alt: '展示館の観覧動線の分析画面',
        title: '市立展示館 — 人が留まる場所を見つけて',
        result: '観覧動線を組み直し、平均滞在 +25%',
      },
      {
        img: '/images/storeinsight-case3-heatmap.webp',
        alt: '店舗ヒートマップの分析画面',
        title: '路面のカフェ — 死角を読み取って',
        result: '空きエリアに席を足し、回転率 +15%',
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
