import { Award, Building2, Cpu, Store } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { CountUp } from '@/components/ui/CountUp';
import type { Locale } from '@/lib/i18n';
import { COMPANY } from '@/lib/company-data';

type Dict = {
  founded: string;
  patents: string;
  patentsDetail: string;
  inception: string;
  partners: string;
};

const DICT: Record<Locale, Dict> = {
  ko: {
    founded: '설립',
    patents: '특허',
    patentsDetail: `등록 ${COMPANY.patentsRegistered} · 출원 ${COMPANY.patentsPending}`,
    inception: 'NVIDIA Inception 파트너',
    partners: '파트너 브랜드',
  },
  en: {
    founded: 'Founded',
    patents: 'Patents',
    patentsDetail: `${COMPANY.patentsRegistered} granted · ${COMPANY.patentsPending} pending`,
    inception: 'NVIDIA Inception Partner',
    partners: 'Partner brands',
  },
  jp: {
    founded: '設立',
    patents: '特許',
    patentsDetail: `登録 ${COMPANY.patentsRegistered}件 · 出願 ${COMPANY.patentsPending}件`,
    inception: 'NVIDIA Inception パートナー',
    partners: 'パートナーブランド',
  },
};

export default function MilestoneStrip({ locale }: { locale: Locale }) {
  const t = DICT[locale];
  const breakKeep = locale === 'en' ? '' : 'break-keep';

  return (
    <Section pad="compact" variant="alt">
      <Container>
        <ul className="flex flex-wrap items-stretch justify-center gap-3 sm:gap-4">
          {/* 설립 연도 */}
          <li className="flex items-center gap-3 rounded-xl border border-black/5 bg-white px-5 py-3 shadow-card">
            <Building2 className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <div className={breakKeep}>
              <div className="text-lg font-semibold leading-none text-gray-900">
                {COMPANY.foundingYear}
              </div>
              <div className="mt-1 text-2xs text-gray-500">{t.founded}</div>
            </div>
          </li>

          {/* 특허 */}
          <li className="flex items-center gap-3 rounded-xl border border-black/5 bg-white px-5 py-3 shadow-card">
            <Award className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <div className={breakKeep}>
              <div className="text-lg font-semibold leading-none text-gray-900">
                {t.patents}{' '}
                <CountUp to={COMPANY.patents} suffix={locale === 'en' ? '' : '건'} />
              </div>
              <div className="mt-1 text-2xs text-gray-500">{t.patentsDetail}</div>
            </div>
          </li>

          {/* NVIDIA Inception */}
          <li className="flex items-center gap-3 rounded-xl border border-black/5 bg-white px-5 py-3 shadow-card">
            <Cpu className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <div className={`text-sm font-semibold leading-snug text-gray-900 ${breakKeep}`}>
              {t.inception}
            </div>
          </li>

          {/* 파트너 브랜드 */}
          <li className="flex items-center gap-3 rounded-xl border border-black/5 bg-white px-5 py-3 shadow-card">
            <Store className="h-5 w-5 shrink-0 text-primary" aria-hidden />
            <div className={breakKeep}>
              <div className="text-lg font-semibold leading-none text-gray-900">
                <CountUp to={COMPANY.partnerBrands} suffix="+" />
              </div>
              <div className="mt-1 text-2xs text-gray-500">{t.partners}</div>
            </div>
          </li>
        </ul>
      </Container>
    </Section>
  );
}
