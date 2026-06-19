import Link from 'next/link';
import { Store, Coffee, Pill, Warehouse, Landmark, MonitorOff, ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import Card from '@/components/ui/Card';
import IconChip from '@/components/ui/IconChip';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import { localeHref, type Locale } from '@/lib/i18n';

/**
 * SpacesShowcase — "Perfect your space → every space".
 * Proves breadth: anonymized Spatial AI works beyond retail, with the same
 * privacy promise in every space. Six space cards link to the real solution
 * routes; the two without a dedicated page point to the /solutions index.
 */

type SpaceCard = { key: string; href: string; icon: typeof Store; label: string; desc: string };

const dict: Record<Locale, { eyebrow: string; heading: string; sub: string; allLabel: string; spaces: SpaceCard[] }> = {
  ko: {
    eyebrow: 'Beyond retail',
    heading: '매장을 넘어, 모든 공간으로',
    sub: '누가가 아니라 무엇을 — 익명화는 공간을 가리지 않습니다. 같은 프라이버시 약속 그대로, 어떤 공간에서든 읽고·알리고·실행합니다.',
    allLabel: '전체 솔루션 보기',
    spaces: [
      { key: 'retail', href: '/solutions/retail', icon: Store, label: '리테일·편의점', desc: '진열·동선·결제까지, 매장 운영을 한눈에 읽습니다.' },
      { key: 'food', href: '/solutions/food-beverage', icon: Coffee, label: '카페·음식점', desc: '대기와 좌석 회전, 피크 시간의 흐름을 파악합니다.' },
      { key: 'drug', href: '/solutions/drug', icon: Pill, label: '드럭스토어', desc: '카테고리별 관심과 체류를 익명으로 분석합니다.' },
      { key: 'large', href: '/solutions/large-space', icon: Warehouse, label: '대형 공간(마트·물류)', desc: '넓은 공간의 동선과 혼잡, 안전을 함께 살핍니다.' },
      { key: 'exhibit', href: '/solutions', icon: Landmark, label: '전시·박물관', desc: '관람 동선과 인기 구역을 방문객 식별 없이 읽습니다.' },
      { key: 'unmanned', href: '/solutions', icon: MonitorOff, label: '무인매장', desc: '직원 없이도 이상 상황을 감지하고 바로 알립니다.' },
    ],
  },
  en: {
    eyebrow: 'Beyond retail',
    heading: 'Beyond the store — for every space',
    sub: 'Not who, but what — anonymization works in any space. The same privacy promise, reading, flagging, and acting wherever people move.',
    allLabel: 'View all solutions',
    spaces: [
      { key: 'retail', href: '/solutions/retail', icon: Store, label: 'Retail & convenience', desc: 'Read shelves, flow, and checkout — store operations at a glance.' },
      { key: 'food', href: '/solutions/food-beverage', icon: Coffee, label: 'Cafés & restaurants', desc: 'See waiting, seat turnover, and the flow at peak hours.' },
      { key: 'drug', href: '/solutions/drug', icon: Pill, label: 'Drugstores', desc: 'Analyze interest and dwell by category, anonymously.' },
      { key: 'large', href: '/solutions/large-space', icon: Warehouse, label: 'Large spaces (marts & logistics)', desc: 'Track flow, congestion, and safety across wide floors.' },
      { key: 'exhibit', href: '/solutions', icon: Landmark, label: 'Exhibits & museums', desc: 'Read visitor paths and popular zones without identifying anyone.' },
      { key: 'unmanned', href: '/solutions', icon: MonitorOff, label: 'Unmanned stores', desc: 'Detect anomalies and alert instantly, with no staff on site.' },
    ],
  },
  jp: {
    eyebrow: 'Beyond retail',
    heading: '店舗を超えて、すべての空間へ',
    sub: '誰かではなく、何を — 匿名化は空間を選びません。同じプライバシーの約束のまま、どんな空間でも読み、知らせ、動かします。',
    allLabel: 'すべて見る',
    spaces: [
      { key: 'retail', href: '/solutions/retail', icon: Store, label: 'リテール・コンビニ', desc: '陳列・動線・会計まで、店舗運営をひと目で読み取ります。' },
      { key: 'food', href: '/solutions/food-beverage', icon: Coffee, label: 'カフェ・飲食店', desc: '待ち時間や席の回転、ピーク時の流れを把握します。' },
      { key: 'drug', href: '/solutions/drug', icon: Pill, label: 'ドラッグストア', desc: 'カテゴリーごとの関心と滞在を匿名で分析します。' },
      { key: 'large', href: '/solutions/large-space', icon: Warehouse, label: '大型空間(スーパー・物流)', desc: '広い空間の動線や混雑、安全をまとめて見守ります。' },
      { key: 'exhibit', href: '/solutions', icon: Landmark, label: '展示・博物館', desc: '来場者を特定せずに観覧動線と人気エリアを読み取ります。' },
      { key: 'unmanned', href: '/solutions', icon: MonitorOff, label: '無人店舗', desc: 'スタッフがいなくても異常を検知し、すぐに知らせます。' },
    ],
  },
};

export default function SpacesShowcase({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <Section variant="alt">
      <Container>
        <div className="mb-12 max-w-2xl">
          <Eyebrow tone="primary" className="mb-3">{t.eyebrow}</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 break-keep">{t.heading}</h2>
          <p className="mt-4 text-base text-gray-600 leading-relaxed break-keep">{t.sub}</p>
        </div>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.spaces.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.key} className="h-full">
                <Card
                  as={Link}
                  hover
                  href={localeHref(locale, s.href)}
                  className="group relative flex h-full flex-col p-7"
                >
                  <IconChip className="mb-5">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </IconChip>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 break-keep">{s.label}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1 break-keep">{s.desc}</p>
                  <ArrowRight
                    className="mt-5 w-4 h-4 text-primary transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
        <div className="mt-10">
          <Link
            href={localeHref(locale, '/solutions')}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            {t.allLabel}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
