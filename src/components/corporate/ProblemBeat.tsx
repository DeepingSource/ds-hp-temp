'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import { localeHref, type Locale } from '@/lib/i18n';

/**
 * ProblemBeat — 공감·실증 (home #2, 홈 정제계획 §8-2 재구성).
 * Hero가 주장(범용 AI는 공간을 못 본다)을 선언한 뒤, 여러 공간이 실제로 겪는 문제를
 * 나열해 공감을 만든다. 예전의 리테일 퍼널(382→65·−317)은 saai insight 페이지로
 * 이식했다(InsightFunnelBlock — 리테일 편중 해소). 마무리 한 줄이 공통 원인
 * ("공간을 읽는 눈이 없습니다")으로 수렴해 GuideIntro(해결자 자격)로 넘긴다.
 * 공간 라벨은 SpacesShowcase(7번 섹션)와 수미 호응.
 */

type SpaceProblem = { label: string; problem: string; href: string };

const dict: Record<Locale, {
  leakEyebrow: string; leakTitle: string; leakSub: string;
  spaces: SpaceProblem[]; linkLabel: string;
  convergePre: string; convergeStrong: string;
}> = {
  ko: {
    leakEyebrow: '신호가 새는 곳',
    leakTitle: '공간의 신호는 \'사이\'에서 샙니다',
    leakSub: '카메라와 결정 사이, 감과 데이터 사이, 본사와 매장 사이.\n신호는 늘 그 틈에서 사라집니다.',
    spaces: [
      { label: '리테일·편의점', problem: '들어온 손님 10명 중 8명이 결제 없이 나갑니다.\n어디서 놓쳤는지는 아무도 모릅니다.', href: '/solutions#industry-convenience' },
      { label: '카페·음식점', problem: '피크타임 대기에 지친 손님이 돌아섭니다.\n몇 명을 놓쳤는지 세는 사람이 없습니다.', href: '/solutions#industry-cafe' },
      { label: '대형마트·물류', problem: '혼잡과 안전사고는 늘 일이 터진 뒤에야 알게 됩니다.', href: '/solutions#industry-mart' },
      { label: '전시·박물관', problem: '어느 전시 앞에 사람이 머무는지, 여전히 감으로 판단합니다.', href: '/solutions#industry-exhibition' },
      { label: '무인매장', problem: '이상 상황을 알아챌 사람이 현장에 없습니다.', href: '/solutions#industry-unmanned' },
      { label: '본사 · 다점포', problem: '지점이 100개면 편차도 100개.\n원인이 한 화면에 모이지 않습니다.', href: '/enterprise' },
    ],
    linkLabel: '해결 방법 보기',
    convergePre: '문제는 제각각이지만 원인은 하나.',
    convergeStrong: '공간을 읽는 눈이 없습니다.',
  },
  en: {
    leakEyebrow: 'Where signals leak',
    leakTitle: 'Signals leak in the space between',
    leakSub: 'Between camera and decision, intuition and data, HQ and store.\nSignals vanish in that gap.',
    spaces: [
      { label: 'Retail & convenience', problem: 'Eight of every ten visitors leave without paying.\nNo one knows where you lost them.', href: '/solutions#industry-convenience' },
      { label: 'Cafés & restaurants', problem: 'Guests tired of the peak-time wait walk away.\nNo one counts how many.', href: '/solutions#industry-cafe' },
      { label: 'Marts & logistics', problem: 'Congestion and safety incidents surface only after something happens.', href: '/solutions#industry-mart' },
      { label: 'Exhibitions & museums', problem: 'Which exhibit holds people is still judged by gut feel.', href: '/solutions#industry-exhibition' },
      { label: 'Unmanned stores', problem: 'No one is on site to notice when something goes wrong.', href: '/solutions#industry-unmanned' },
      { label: 'HQ · multi-store', problem: '100 locations mean 100 variances.\nThe causes never meet on one screen.', href: '/enterprise' },
    ],
    linkLabel: 'See the solution',
    convergePre: 'The problems differ, but the cause is one.',
    convergeStrong: 'No eyes that read the space.',
  },
  jp: {
    leakEyebrow: '信号が漏れる場所',
    leakTitle: '空間の信号は「隙間」で漏れています',
    leakSub: 'カメラと決断の間、勘とデータの間、本部と店舗の間。\n信号は常にその隙目で消えていきます。',
    spaces: [
      { label: '小売・コンビニ', problem: '入店した10人のうち8人が、決済せずに出ていきます。\nどこで逃したのか、誰にも分かりません。', href: '/solutions#industry-convenience' },
      { label: 'カフェ・飲食店', problem: 'ピークタイムの行列に疲れた客が引き返します。\n何人逃したか、数える人がいません。', href: '/solutions#industry-cafe' },
      { label: '大型マート・物流', problem: '混雑や安全事故は、いつも起きた後にしか分かりません。', href: '/solutions#industry-mart' },
      { label: '展示・博物館', problem: 'どの展示の前に人が留まるのか、いまだに勘で判断しています。', href: '/solutions#industry-exhibition' },
      { label: '無人店舗', problem: '異常に気づける人が現場にいません。', href: '/solutions#industry-unmanned' },
      { label: '本部・多店舗', problem: '拠点が100あれば、ばらつきも100。\n原因がひとつの画面に集まりません。', href: '/enterprise' },
    ],
    linkLabel: '解決方法を見る',
    convergePre: '問題はそれぞれでも、原因はひとつ。',
    convergeStrong: '空間を読む目がないのです。',
  },
};

export default function ProblemBeat({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <Section variant="alt">
      <Container>
        <div className="mb-12 max-w-3xl">
          <Eyebrow tone="primary" className="mb-3">{t.leakEyebrow}</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep font-display mb-4">
            {t.leakTitle}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed break-keep">
            {t.leakSub}
          </p>
        </div>

        {/* 공간 유형별 실제 문제 — [라벨 + 문제 1문장 + 해당 솔루션 링크] × 6 */}
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.spaces.map((s) => (
            <StaggerItem key={s.label} className="flex">
              <Link
                href={localeHref(locale, s.href)}
                className="group flex flex-1 flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-card transition-colors hover:border-primary/40"
              >
                <div>
                  <h3 className="text-sm font-bold text-gray-900 break-keep">{s.label}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed break-keep">{s.problem}</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-80 transition-opacity group-hover:opacity-100">
                  {t.linkLabel} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* 공통 원인 수렴 → GuideIntro(해결자 자격)로 전환 */}
        <p className="mt-12 text-2xl sm:text-3xl font-bold text-gray-900 break-keep font-display tracking-tight">
          {t.convergePre} <span className="text-primary">{t.convergeStrong}</span>
        </p>
      </Container>
    </Section>
  );
}
