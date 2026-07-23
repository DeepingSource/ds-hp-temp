import Link from 'next/link';
import Image from 'next/image';
import { Store, Coffee, Pill, Warehouse, Landmark, MonitorOff, ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import IconChip from '@/components/ui/IconChip';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import { localeHref, type Locale } from '@/lib/i18n';

/**
 * SpacesShowcase — "Perfect your space → every space".
 * Proves breadth: anonymized Spatial AI works beyond retail, with the same
 * privacy promise in every space. Six overlay tiles (정제계획 §8-3: 이미지 위
 * 텍스트 오버레이 + 스크림, 상시 노출 — 카드 높이 축소) link to the real solution
 * routes. HomeEnterpriseBeat 뒤에 같은 "확장" 섹션의 서브 블록으로 붙는다(§2 · B5):
 * white 배경 + compact 패딩으로 시각 연속. 공간 라벨은 ProblemBeat(§8-2)와 수미 호응.
 */

type SpaceCard = { key: string; href: string; icon: typeof Store; label: string; desc: string; alt: string };

/** 공간별 대표 사진 (로케일 무관) — industries 히어로 에셋과 매핑 */
const SPACE_IMG: Record<string, string> = {
  retail: '/images/industries/convenience-hero-interior.webp',
  food: '/images/industries/cafe-hero.webp',
  drug: '/images/industries/drugstore-hero.webp',
  large: '/images/industries/mart-hero.webp',
  exhibit: '/images/industries/exhibition-hero.webp',
  unmanned: '/images/industries/unmanned-hero-interior.webp',
};

const dict: Record<Locale, { eyebrow: string; heading: string; sub: string; allLabel: string; spaces: SpaceCard[] }> = {
  ko: {
    eyebrow: '매장 밖에서도',
    heading: '매장을 넘어, 모든 공간으로',
    sub: '익명화는 공간을 가리지 않습니다. 매장에서 지킨 약속 그대로, 어떤 공간에서든 통합니다.',
    allLabel: '전체 솔루션 보기',
    spaces: [
      { key: 'retail', href: '/solutions/retail', icon: Store, label: '리테일·편의점', desc: '진열·동선·결제까지, 매장 운영을 한눈에 읽습니다.', alt: '편의점 매장 내부' },
      { key: 'food', href: '/solutions/food-beverage', icon: Coffee, label: '카페·음식점', desc: '대기와 좌석 회전, 피크 시간의 흐름을 읽습니다.', alt: '카페 좌석 공간' },
      { key: 'drug', href: '/solutions/drug-store', icon: Pill, label: '드럭스토어', desc: '카테고리별 관심과 체류를 익명으로 분석합니다.', alt: '드럭스토어 매장 내부' },
      { key: 'large', href: '/solutions/large-space', icon: Warehouse, label: '대형마트·물류', desc: '넓은 공간의 동선·혼잡·안전을 함께 읽습니다.', alt: '대형 마트 매장 전경' },
      { key: 'exhibit', href: '/solutions', icon: Landmark, label: '전시·박물관', desc: '관람 동선과 인기 구역을 방문객 식별 없이 읽습니다.', alt: '전시관 관람 공간' },
      { key: 'unmanned', href: '/solutions', icon: MonitorOff, label: '무인매장', desc: '직원 없이도 이상 상황을 감지하고 바로 알립니다.', alt: '무인매장 내부' },
    ],
  },
  en: {
    eyebrow: 'Beyond retail',
    heading: 'Beyond the store — for every space',
    sub: 'Anonymization works in any space. The promise we keep in stores holds wherever people move.',
    allLabel: 'View all solutions',
    spaces: [
      { key: 'retail', href: '/solutions/retail', icon: Store, label: 'Retail & convenience', desc: 'Read shelves, flow, and checkout — store operations at a glance.', alt: 'Convenience store interior' },
      { key: 'food', href: '/solutions/food-beverage', icon: Coffee, label: 'Cafés & restaurants', desc: 'See waiting, seat turnover, and the flow at peak hours.', alt: 'Café seating area' },
      { key: 'drug', href: '/solutions/drug-store', icon: Pill, label: 'Drugstores', desc: 'Analyze interest and dwell by category, anonymously.', alt: 'Drugstore interior' },
      { key: 'large', href: '/solutions/large-space', icon: Warehouse, label: 'Marts & logistics', desc: 'Track flow, congestion, and safety across wide floors.', alt: 'Large mart floor' },
      { key: 'exhibit', href: '/solutions', icon: Landmark, label: 'Exhibitions & museums', desc: 'Read visitor paths and popular zones without identifying anyone.', alt: 'Exhibition hall interior' },
      { key: 'unmanned', href: '/solutions', icon: MonitorOff, label: 'Unmanned stores', desc: 'Detect anomalies and alert instantly, with no staff on site.', alt: 'Unmanned store interior' },
    ],
  },
  jp: {
    eyebrow: '店舗の外でも',
    heading: '店舗を超えて、すべての空間へ',
    sub: '匿名化は空間を選びません。店舗で守った約束のまま、どんな空間でも通用します。',
    allLabel: 'すべて見る',
    spaces: [
      { key: 'retail', href: '/solutions/retail', icon: Store, label: '小売・コンビニ', desc: '陳列・動線・会計まで、店舗運営をひと目で読み取ります。', alt: 'コンビニ店内' },
      { key: 'food', href: '/solutions/food-beverage', icon: Coffee, label: 'カフェ・飲食店', desc: '待ち時間や席の回転、ピーク時の流れを読み取ります。', alt: 'カフェの客席' },
      { key: 'drug', href: '/solutions/drug-store', icon: Pill, label: 'ドラッグストア', desc: 'カテゴリーごとの関心と滞在を匿名で分析します。', alt: 'ドラッグストア店内' },
      { key: 'large', href: '/solutions/large-space', icon: Warehouse, label: '大型マート・物流', desc: '広い空間の動線・混雑・安全をまとめて読み取ります。', alt: '大型スーパーの売り場' },
      { key: 'exhibit', href: '/solutions', icon: Landmark, label: '展示・博物館', desc: '来場者を特定せずに観覧動線と人気エリアを読み取ります。', alt: '展示館の観覧空間' },
      { key: 'unmanned', href: '/solutions', icon: MonitorOff, label: '無人店舗', desc: 'スタッフがいなくても異常を検知し、すぐに知らせます。', alt: '無人店舗の店内' },
    ],
  },
};

export default function SpacesShowcase({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <Section variant="default" pad="compact">
      <Container>
        <div className="mb-8 max-w-2xl">
          <Eyebrow tone="primary" className="mb-3">{t.eyebrow}</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-gray-900 break-keep">{t.heading}</h2>
          <p className="mt-3 text-base text-gray-600 leading-relaxed break-keep">{t.sub}</p>
        </div>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.spaces.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.key} className="h-full">
                <Link
                  href={localeHref(locale, s.href)}
                  className="group relative block h-full overflow-hidden rounded-2xl shadow-card"
                >
                  <div className="relative aspect-video w-full bg-slate-100">
                    <Image
                      src={SPACE_IMG[s.key]}
                      alt={s.alt}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Scrim — 상시 노출 텍스트의 4.5:1 대비 확보 (§8-3) */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-950/35 to-transparent"
                    />
                    <IconChip className="absolute left-4 top-4 bg-white/90 shadow-card backdrop-blur">
                      <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    </IconChip>
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <h3 className="text-base font-bold text-white break-keep">{s.label}</h3>
                      <p className="mt-1 text-xs sm:text-sm text-white/90 leading-snug break-keep">{s.desc}</p>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
        <div className="mt-8">
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
