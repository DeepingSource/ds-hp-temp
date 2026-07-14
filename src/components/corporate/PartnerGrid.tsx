import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { CountUp } from '@/components/ui/CountUp';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import { COMPANY } from '@/lib/company-data';
import { type Locale } from '@/lib/i18n';

/**
 * PartnerGrid — trust metrics + partner names (PR-17 will swap to logo sprite).
 */

const trustedBrands: Record<Locale, string[]> = {
  ko: ['올리브영', 'BGF CU', '코리아세븐', 'CJ푸드빌', '롯데GRS', '현대자동차', '롯데월드', '국립박물관재단'],
  en: ['Olive Young', 'BGF CU', 'Korea Seven', 'CJ Foodville', 'Lotte GRS', 'Hyundai Motor', 'Lotte World', 'National Museum Foundation'],
  jp: ['オリーブヤング', 'BGF CU', 'コリアセブン', 'CJフードビル', 'ロッテGRS', '現代自動車', 'ロッテワールド', '国立博物館財団'],
};

type Units = { patents: string; brands: string; industries: string };
const dict: Record<Locale, { heading: string; partners: string; metrics: Units; units: Units }> = {
  ko: { heading: '신뢰하는 파트너', partners: '신뢰하는 파트너', metrics: { patents: '국내외 특허', brands: '파트너 브랜드', industries: '적용 업종' }, units: { patents: '건', brands: '개+', industries: '개+' } },
  en: { heading: 'Trusted by', partners: 'Trusted partners', metrics: { patents: 'Patents', brands: 'Partner brands', industries: 'Industries' }, units: { patents: '', brands: '+', industries: '+' } },
  jp: { heading: '信頼されるパートナー', partners: '信頼されるパートナー', metrics: { patents: '国内外の特許', brands: 'パートナーブランド', industries: '適用業種' }, units: { patents: '件', brands: '社+', industries: '+' } },
};

export default function PartnerGrid({ locale }: { locale: Locale }) {
  const d = dict[locale];
  return (
    <Section variant="default" pad="compact" className="border-t border-gray-100">
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center mb-14">
          <div>
            <CountUp to={COMPANY.patents} suffix={d.units.patents} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 tabular-nums block" />
            <p className="text-xs text-gray-500 font-medium">{d.metrics.patents}</p>
          </div>
          <div>
            <CountUp to={COMPANY.partnerBrands} suffix={d.units.brands} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 tabular-nums block" />
            <p className="text-xs text-gray-500 font-medium">{d.metrics.brands}</p>
          </div>
          <div>
            <CountUp to={COMPANY.industries} suffix={d.units.industries} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 tabular-nums block" />
            <p className="text-xs text-gray-500 font-medium">{d.metrics.industries}</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">NVIDIA</p>
            <p className="text-xs text-gray-500 font-medium">Inception Partner</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gray-200" />
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500 shrink-0">{d.partners}</p>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <StaggerContainer className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {trustedBrands[locale].map((brand) => (
            <StaggerItem key={brand}>
              <span className="inline-flex items-center px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 select-none">
                {brand}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
