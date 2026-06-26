import { CalendarRange, Users, Layers } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import Card from '@/components/ui/Card';
import IconChip from '@/components/ui/IconChip';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import { type Locale } from '@/lib/i18n';

/**
 * ComparisonPrinciple — "how to read the numbers" (home, P0 per PRD saai insight).
 * The product's real differentiator: numbers are never read as absolutes. Three
 * devices make a comparison — period comparison, peer adjustment (σ), and source
 * distinction (measured / provided / estimated). Pure mechanism copy; no figures
 * or named customers. A small peer-distribution SVG anchors the idea visually.
 */

type Device = { icon: typeof CalendarRange; title: string; desc: string };

const dict: Record<
  Locale,
  { eyebrow: string; heading: string; sub: string; devices: Device[]; caption: string; svgLabel: string; peerAvg: string; thisStore: string }
> = {
  ko: {
    eyebrow: '숫자를 읽는 법',
    heading: '절대값은 비교가 아닙니다.',
    sub: '번화가 매장과 교외 몰 매장을 매출 절대값으로 줄세우는 것은 비교가 아닙니다. 세 가지 장치가 진짜 비교를 만듭니다.',
    devices: [
      {
        icon: CalendarRange,
        title: '기간 비교',
        desc: '7·14·30일을 고르면 모든 지표가 그 기간으로 다시 계산되고, 직전 같은 길이의 기간과 견줍니다. “지난 2주가 그 전 2주보다 어땠나”가 기본 질문입니다.',
      },
      {
        icon: Users,
        title: '또래 보정',
        desc: '행동이 비슷한 매장끼리 묶어, 또래 평균에서 얼마나 벗어났는지로 읽습니다. 명절·날씨로 다 같이 오르내린 것은 사라지고, 그 매장만의 움직임이 남습니다.',
      },
      {
        icon: Layers,
        title: '출처 구분',
        desc: '체류는 우리가 잰 측정값, 매출은 본사가 올린 제공값, 전환율은 추정값입니다. 화면은 이 셋을 같은 무게로 보여주지 않습니다.',
      },
    ],
    caption: '지금 보는 매장이 네트워크 전체에서 어디쯤인지.',
    svgLabel: '또래 매장 분포에서 한 매장이 평균보다 위쪽에 위치한 모습',
    peerAvg: '또래 평균',
    thisStore: '이 매장',
  },
  en: {
    eyebrow: 'How to read the numbers',
    heading: "Absolute numbers aren't a comparison.",
    sub: "Ranking a downtown store against a suburban mall by raw revenue isn't a comparison. Three devices make a real one.",
    devices: [
      {
        icon: CalendarRange,
        title: 'Period comparison',
        desc: 'Pick 7, 14, or 30 days and every metric recomputes for that window, measured against the previous window of equal length. “How did the last two weeks do versus the two before?” is the default question.',
      },
      {
        icon: Users,
        title: 'Peer adjustment',
        desc: "Stores that behave alike are grouped, and each is read by how far it sits from its peer average. Holidays and weather that lift everyone fall away; what's left is the store's own movement.",
      },
      {
        icon: Layers,
        title: 'Source distinction',
        desc: "Dwell is what we measured, revenue is what HQ provided, conversion is an estimate. The screen doesn't show these three with equal weight.",
      },
    ],
    caption: "Where the store you're viewing sits across the whole network.",
    svgLabel: 'A peer-store distribution with one store positioned above the average',
    peerAvg: 'Peer avg',
    thisStore: 'This store',
  },
  jp: {
    eyebrow: '数字の読み方',
    heading: '絶対値は、比較ではありません。',
    sub: '繁華街の店舗と郊外モールの店舗を売上の絶対値で並べるのは、比較ではありません。三つの仕掛けが、本当の比較をつくります。',
    devices: [
      {
        icon: CalendarRange,
        title: '期間比較',
        desc: '7・14・30日を選ぶと、すべての指標がその期間で再計算され、直前の同じ長さの期間と比べます。「この2週間は、その前の2週間よりどうだったか」が基本の問いです。',
      },
      {
        icon: Users,
        title: '同類補正',
        desc: '行動が似た店舗どうしをまとめ、同類平均からどれだけ離れているかで読みます。祝日や天候でみな一様に上下したぶんは消え、その店舗だけの動きが残ります。',
      },
      {
        icon: Layers,
        title: '出所の区別',
        desc: '滞在は私たちが計測した値、売上は本部が登録した提供値、転換率は推定値です。画面はこの三つを同じ重みでは見せません。',
      },
    ],
    caption: '今見ている店舗が、ネットワーク全体のどのあたりにいるか。',
    svgLabel: '同類店舗の分布の中で、ある店舗が平均より上に位置する様子',
    peerAvg: '同類平均',
    thisStore: 'この店舗',
  },
};

export default function ComparisonPrinciple({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <Section variant="default">
      <Container>
        <div className="mb-10 max-w-2xl">
          <Eyebrow tone="primary" className="mb-3">{t.eyebrow}</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep font-display mb-4">{t.heading}</h2>
          <p className="text-lg text-gray-600 leading-relaxed break-keep">{t.sub}</p>
        </div>

        <StaggerContainer className="grid sm:grid-cols-3 gap-5 mb-12">
          {t.devices.map((d) => {
            const Icon = d.icon;
            return (
              <StaggerItem key={d.title} className="h-full">
                <Card className="h-full p-6">
                  <IconChip size="md" className="mb-4">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </IconChip>
                  <h3 className="text-base font-bold text-gray-900 mb-2 break-keep">{d.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed break-keep">{d.desc}</p>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Peer-distribution visual — where one store sits in its peer group */}
        <div className="mx-auto max-w-xl">
          <svg viewBox="0 0 420 140" role="img" aria-label={t.svgLabel} className="w-full h-auto">
            {/* baseline */}
            <line x1="30" y1="110" x2="390" y2="110" stroke="#E5E7EB" strokeWidth="1.5" />
            {/* distribution curve */}
            <path
              d="M30,110 C110,110 145,40 210,40 C275,40 310,110 390,110 Z"
              fill="var(--color-primary)"
              fillOpacity="0.08"
            />
            <path
              d="M30,110 C110,110 145,40 210,40 C275,40 310,110 390,110"
              fill="none"
              stroke="var(--color-primary)"
              strokeOpacity="0.35"
              strokeWidth="2"
            />
            {/* peer average tick */}
            <line x1="210" y1="40" x2="210" y2="118" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="3 3" />
            <text x="210" y="132" textAnchor="middle" className="fill-gray-400" fontSize="11">{t.peerAvg}</text>
            {/* this store marker (above average) */}
            <line x1="312" y1="78" x2="312" y2="110" stroke="var(--color-primary)" strokeWidth="1.5" />
            <circle cx="312" cy="78" r="5" fill="var(--color-primary)" />
            <text x="312" y="68" textAnchor="middle" className="fill-primary" fontSize="11" fontWeight="700">{t.thisStore}</text>
          </svg>
          <p className="mt-3 text-xs text-gray-500 text-center break-keep">{t.caption}</p>
        </div>
      </Container>
    </Section>
  );
}
