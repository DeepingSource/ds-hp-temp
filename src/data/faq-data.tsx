import Link from 'next/link';
import { COMPANY } from '@/lib/company-data';

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export interface FAQCategory {
  category: string;
  items: FAQItem[];
}

/* ─── 공통 FAQ ─── */
export const commonFaqs: FAQItem[] = [
  {
    question: '도입 절차가 어떻게 되나요?',
    answer: (
      <>
        <ul className="space-y-2 mb-4">
          <li><strong>1. 상담 신청</strong></li>
          <li><strong>2. 매장 환경 파악 및 파일럿 설계</strong></li>
          <li><strong>3. 기존 CCTV/POS 환경 연동 (3~5일 소요)</strong></li>
          <li><strong>4. 첫 리포트 수신 및 운영 시작 (가입 후 D+7)</strong></li>
        </ul>
        기존 장비를 그대로 활용하므로 교체 부담 없이 빠르게 시작할 수 있습니다.<br /><br />
        <Link href="/contact" className="text-primary hover:underline font-semibold">무료 상담 신청하기 &rarr;</Link>
      </>
    ),
  },
  {
    question: '계약 기간에 제한이 있나요?',
    answer: (
      <>
        최소 계약 기간은 1개월입니다. 위약금 없이 언제든 해지할 수 있으며, 남은 기간까지는 서비스를 계속 이용하실 수 있습니다. 연간 결제 시 2개월 할인 혜택이 제공됩니다.
      </>
    ),
  },
  {
    question: '데이터 보안은 어떻게 관리되나요?',
    answer: (
      <>
        영상 원본은 매장 내 On-Device에서만 처리되고, 클라우드에는 비식별 분석 결과만 전송됩니다. 모든 데이터는 AWS 서울 리전에서 암호화 저장되며, 개인정보보호법을 철저히 준수합니다.
      </>
    ),
  },
  {
    question: '결제는 어떻게 하나요?',
    answer: (
      <>
        무료 상담 신청 후 담당자가 결제 방법을 안내드립니다. 카드 결제, 계좌이체, 세금계산서 발행 등 기업 환경에 맞는 다양한 방법을 지원합니다.<br /><br />
        <Link href="/contact" className="text-primary hover:underline font-semibold">도입 문의하기 &rarr;</Link>
      </>
    ),
  },
  {
    question: '해지는 어떻게 하나요?',
    answer: (
      <>
        설정 페이지에서 간단하게 해지하실 수 있습니다. 위약금 없이 언제든 해지 가능하며, 남은 기간 동안은 정상적으로 서비스를 이용하실 수 있습니다.
      </>
    ),
  },
  {
    question: '환불받을 수 있나요?',
    answer: (
      <>
        결제 후 7일 이내, 서비스 미사용 시 100% 환불됩니다. 사용 시에는 일할 계산하여 환불해 드립니다. 7일 이후에는 환불이 어렵지만, 해당 결제 기간 종료 시점까지는 서비스 이용이 가능합니다.
      </>
    ),
  },
  {
    question: '여러 매장을 운영하면 할인이 있나요?',
    answer: (
      <>
        네, 다점포 운영 고객님이나 프랜차이즈 본사를 위한 전용 요금제(최대 30% 시너지 할인)를 제공합니다. 하나의 계정으로 여러 매장을 통합 관리할 수도 있습니다.<br /><br />
        <Link href="/pricing/simulator" className="text-primary hover:underline font-semibold text-sm mr-4">견적 시뮬레이션 해보기 &rarr;</Link>
        <Link href="/contact" className="text-primary hover:underline font-semibold text-sm">맞춤 견적 상담하기 &rarr;</Link>
      </>
    ),
  },
  {
    question: '기존 POS나 ERP와 연동되나요?',
    answer: (
      <>
        주요 POS 시스템(코밴, 포스뱅크, 오케이포스 등)과 사내 ERP 연동을 지원합니다. 연동 방식은 API 또는 데이터 파일 업로드 방식이며, 매장 환경에 맞춰 최적의 방법을 안내해 드립니다.
      </>
    ),
  },
];

/* ─── StoreCare FAQ ─── */
export const storeCareFaqs: FAQItem[] = [
  {
    question: '우리 매장도 설치할 수 있나요?',
    answer: (
      <>인터넷(Wi-Fi 또는 유선)만 되고 CCTV가 있으면 돼요. 편의점, 카페, 무인매장 등 업종 상관없이 모두 가능합니다.</>
    ),
  },
  {
    question: 'CCTV 카메라도 새로 설치해야 하나요?',
    answer: (
      <>기존에 매장에 설치되어 있는 CCTV 카메라를 그대로 활용하므로 추가 카메라 구입 비용이 들지 않습니다.</>
    ),
  },
  {
    question: '매장 사진이나 고객 영상이 유출되지는 않나요?',
    answer: (
      <>
        영상 원본은 사람이 열람하지 않으며, 매장 밖으로 전송되지 않습니다. AI가 현장에서 분석한 뒤 숫자·상태 알림만 전달하고, 얼굴 등은 자동 익명화 처리됩니다.
      </>
    ),
  },
  {
    question: '본사에서 우리 매장 데이터를 볼 수 있나요?',
    answer: (
      <>
        아니요. 분석 데이터는 점주님 것만이에요. 본사나 다른 곳에 공유되지 않습니다.
      </>
    ),
  },
  {
    question: '설치하고 바로 사용할 수 있나요?',
    answer: (
      <>
        네, 소형 장치만 연결하면 30분~1시간이면 끝나요. 당일부터 사용할 수 있어요.
      </>
    ),
  },
  {
    question: '알림이 너무 많이 오지는 않나요?',
    answer: (
      <>
        원하는 시간대와 항목만 선택할 수 있어요. 예를 들어 심야 시간대만 받기, 온도 알림만 받기 등 직접 설정하세요. 카카오톡, 앱 푸시, 이메일 중 편한 방법으로 받아요.
      </>
    ),
  },
  {
    question: '처음에 얼마가 들어요?',
    answer: (
      <>
        AI 분석 장치 1회 비용 5만 원만 내시면 돼요. 그 뒤는 월 구독료만 납부하세요. (매장 크기에 따라 장치가 늘어날 수 있어요.)<br /><br />
        <Link href="/pricing" className="text-primary hover:underline font-semibold">StoreCare 요금제 자세히 보기 &rarr;</Link>
      </>
    ),
  },
  {
    question: '다른 매장이랑 비교도 되나요?',
    answer: (
      <>
        네, 여러 매장을 운영하시면 통합 대시보드에서 한눈에 비교할 수 있어요. 어떤 매장이 청결이 잘 되고 있는지, 어디에 집중해야 할지 바로 알 수 있어요. 다점포 할인도 있어요.<br /><br />
        <Link href="/contact" className="text-primary hover:underline font-semibold">다점포 상담하기 &rarr;</Link>
      </>
    ),
  },
];

/* ─── StoreInsight FAQ ─── */
export const storeInsightFaqs: FAQItem[] = [
  {
    question: '고객 얼굴은 어떻게 지워지나요?',
    answer: (
      <>
        AI가 영상 속 얼굴과 생체 정보를 자동으로 지우면서도 동선·체류 같은 행동 데이터는 그대로 남겨요. 딥핑소스가 개발한 특허 기술({COMPANY.patents}개)이에요.
      </>
    ),
  },
  {
    question: '다른 분석 툴과 뭐가 달라요?',
    answer: (
      <>
        여러 대의 카메라를 연동하여 비식별 객체의 이동 경로를 끊김 없이 연속적으로 연결할 수 있으며, 통합된 LLM 대시보드를 통해 자연어로 질문하면 바로 인사이트를 답변해 주는 &lsquo;대화형 분석&rsquo;을 제공합니다.
      </>
    ),
  },
  {
    question: '비용은 어떻게 되나요?',
    answer: (
      <>
        분석할 공간의 크기, 카메라 환경, 필요한 분석 유형에 따라 비용이 산정되는 엔터프라이즈 맞춤 솔루션입니다.<br /><br />
        <Link href="/pricing/simulator" className="text-primary hover:underline font-semibold mr-4 text-sm">월간 요금 시뮬레이션 &rarr;</Link>
        <Link href="/contact?product=StoreInsight" className="text-primary hover:underline font-semibold text-sm">맞춤 상담하기 &rarr;</Link>
      </>
    ),
  },
  {
    question: '매장 말고 다른 곳에도 쓸 수 있나요?',
    answer: (
      <>
        네, 전시회, 박람회, 식당, 팝업스토어, 공공시설 등 사람이 다니는 곳이면 어디든 가능해요.
      </>
    ),
  },
  {
    question: '도입하려면 뭐가 필요해요?',
    answer: (
      <>
        IP 방식의 CCTV(720p, 10fps, RTSP 지원)와 인터넷 연결만 있으면 충분합니다. 카메라 대수에 상관없이 유연하게 확장 가능합니다.
      </>
    ),
  },
  {
    question: '분석 결과는 어디서 볼 수 있나요?',
    answer: (
      <>
        웹 대시보드에서 실시간으로 확인할 수 있어요. 방문자 수, 체류 시간, 히트맵 등을 바로 볼 수 있고, PDF 리포트도 정기적으로 보내드려요.
      </>
    ),
  },
];

/* ─── StoreAgent FAQ ─── */
export const faqData: FAQCategory[] = [
  {
    category: '기능 및 사용',
    items: [
      {
        question: '본사에서 제가 사용하는 걸 알 수 있나요?',
        answer: (
          <>아니요. 전적으로 점주님의 개인 계정과 이메일로 동작하며, 본사 시스템에 사용 이력이 남지 않는 온전한 독립 비서입니다.</>
        ),
      },
      {
        question: '제가 운영하는 매장 브랜드(편의점) 상관없이 되나요?',
        answer: (
          <>네, CU, GS25, 세븐일레븐, 이마트24 등 브랜드 상호에 관계없이 오프라인 소매점이라면 어디든 유용한 상권 기반 맞춤 브리핑을 받을 수 있습니다.</>
        ),
      },
      {
        question: '이벤트나 날짜 정보가 얼마나 정확한가요?',
        answer: (
          <>기상청 실시간 API 및 지자체/대학 공공 데이터를 연동하여, 점주님 매장이 속한 특정 상권(오피스, 주택, 대학가, 유흥가 등)의 정확한 일정을 반영합니다.</>
        ),
      },
      {
        question: '브리핑 수신 시간을 바꿀 수 있나요?',
        answer: (
          <>기본형 플랜 이상부터는 오전 5시~8시 사이 점주님의 기상 시간에 맞추어 브리핑 발송 시간을 설정하실 수 있습니다.</>
        ),
      },
      {
        question: '기본형과 POS 연동 플랜의 차이는?',
        answer: (
          <>
            무료 기본형은 매일 아침 상권/날씨/이벤트 기반 브리핑과 체크리스트를 제공합니다. POS 연동 플랜(월 15,000원)은 여기에 <strong>실제 매출 데이터 분석</strong>, 발주 추천, 경쟁점 비교가 추가됩니다.
          </>
        ),
      },
      {
        question: 'AI 비서 플랜은 무엇이 다른가요?',
        answer: (
          <>
            AI 비서 플랜(월 25,000원)은 POS 연동의 모든 기능에 더해 <strong>대화형 AI 채팅</strong>으로 매장 데이터에 대해 자유롭게 질문하고 답변을 받을 수 있습니다. AI 홍보물 자동 제작, 맞춤형 액션 카드, 프로모션 효과 분석까지 지원합니다.
          </>
        ),
      },
    ],
  },
];
