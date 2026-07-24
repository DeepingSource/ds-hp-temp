import Link from 'next/link';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { localeHref, type Locale } from '@/lib/i18n';
import { CTA_TRACK_E, contactEnterpriseHref } from '@/lib/cta-canon';

/**
 * HubDataBand — 매출 데이터 언급 1블록 (④4-3 D4로 축소).
 * 구 형태(좌카피+스텝 3개+우측 대형 차트 밴드)는 매출 업로드가 페이지의 주인공처럼
 * 읽혔다 — 지금은 "본사 매출을 얹으면 체류와 한 축에서 만난다"는 핵심 한 문장만
 * 남기고, 템플릿 다운로드 CTA는 도입 상담(트랙 E 캐논)으로 대체한다.
 */

const dict: Record<Locale, { eyebrow: string; heading: string; punch: string }> = {
  ko: {
    eyebrow: '들어오는 데이터는 우리 것만이 아닙니다',
    heading: '매출을 끌어다 놓으면, 체류와 매출이 한 축에서 만납니다.',
    punch: '체류는 그대로인데 매출만 빠진 매장은 매장 안에서 무언가 새고 있는 것이고, 체류부터 빠진 매장은 유입과 상권의 문제입니다.',
  },
  en: {
    eyebrow: "The data coming in isn't only ours",
    heading: 'Drop in your revenue, and dwell meets sales on one axis.',
    punch: 'A store whose dwell holds but revenue drops is leaking something inside; a store whose dwell drops first has a traffic and trade-area problem.',
  },
  jp: {
    eyebrow: '入ってくるデータは、私たちのものだけではありません',
    heading: '売上を取り込めば、滞在と売上がひとつの軸で出会います。',
    punch: '滞在はそのままで売上だけが落ちた店舗は、店内で何かが漏れています。滞在から落ちた店舗は、集客と商圏の問題です。',
  },
};

export default function HubDataBand({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <Section variant="alt" pad="compact">
      <Container className="max-w-3xl text-center">
        <Eyebrow tone="primary" className="mb-3 justify-center">{t.eyebrow}</Eyebrow>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 break-keep font-display mb-4">{t.heading}</h2>
        <p className="text-base text-gray-700 leading-relaxed break-keep mb-8">{t.punch}</p>
        <Link href={localeHref(locale, contactEnterpriseHref('saai-insight'))} className="btn-primary">
          {CTA_TRACK_E[locale]}
        </Link>
      </Container>
    </Section>
  );
}
