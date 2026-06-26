import { type Locale } from './i18n';

/**
 * leadership.ts — 경영진 단일 출처(SOT).
 *
 * About(필수)·Career(선택, 팀 섹션)에서 공유. 실명 공개 확정(2026-06).
 * photo는 추후 실제 이미지 경로로 교체. 미지정 시 initials 플레이스홀더 렌더.
 *
 * 근거: 공개 보도 — 김태훈(올라웍스 공동창업·CTO→인텔 인수, 인텔 수석엔지니어 / 2018 딥핑소스 공동창업),
 * 금상호(SK브로드밴드 26년 B2B 사업전략·신사업, CloudCam 연매출 100억 / 창업 후 첫 외부 C-레벨, 2025 영입),
 * 고봉경(VP of Engineering — 상세 약력 내부 확인 후 보강).
 */

export type Leader = {
  key: string;
  name: string;
  role: string;
  /** 한 줄 책임 영역 */
  focus: string;
  /** 1~2문장 약력 */
  bio: string;
  /** 사진 미지정 시 아바타에 표시할 이니셜 */
  initials: string;
  /** 추후 실제 사진 경로 (선택) */
  photo?: string;
};

export const leadership: Record<Locale, Leader[]> = {
  ko: [
    {
      key: 'ceo',
      name: '김태훈',
      role: '공동창업자 · 대표 (CEO)',
      focus: '비전 · 전략 · 사업 전반',
      bio: '이미지 인식 스타트업 올라웍스를 공동창업·CTO로 이끌어 인텔에 매각한 뒤, 인텔 수석 엔지니어를 거쳐 2018년 딥핑소스를 공동창업했습니다. 익명화에서 출발한 공간 AI의 방향을 이끕니다.',
      initials: '김',
    },
    {
      key: 'cbo',
      name: '금상호',
      role: '최고사업책임자 (CBO)',
      focus: '사업 전략 · 글로벌 파트너십',
      bio: 'SK브로드밴드에서 26년간 B2B 사업 전략·영업·신사업을 총괄했습니다. 클라우드 CCTV 서비스를 4년 만에 연매출 100억 규모로 키운 경험으로 딥핑소스의 국내외 사업 확장을 이끕니다.',
      initials: '금',
    },
    {
      key: 'vpe',
      name: '고봉경',
      role: 'VP of Engineering',
      focus: '엔지니어링 · 플랫폼',
      bio: '딥핑소스 엔지니어링 조직을 총괄하며, 익명화·공간 지능·에이전트 AI를 안정적인 제품으로 구현합니다.',
      initials: '고',
    },
  ],
  en: [
    {
      key: 'ceo',
      name: 'Tae-Hoon Kim',
      role: 'Co-founder · CEO',
      focus: 'Vision · strategy · overall business',
      bio: 'Co-founded and served as CTO of the image-recognition startup Olaworks, acquired by Intel, then worked as a senior engineer at Intel before co-founding DeepingSource in 2018. He steers the direction of spatial AI built on anonymization.',
      initials: 'TK',
    },
    {
      key: 'cbo',
      name: 'Sang-ho Kim',
      role: 'Chief Business Officer (CBO)',
      focus: 'Business strategy · global partnerships',
      bio: 'Led B2B business strategy, sales, and new ventures at SK Broadband for 26 years, scaling a cloud CCTV service to ₩10B in annual revenue within four years. He drives DeepingSource’s domestic and global expansion.',
      initials: 'SK',
    },
    {
      key: 'vpe',
      name: 'Bong-kyung Ko',
      role: 'VP of Engineering',
      focus: 'Engineering · platform',
      bio: 'Leads DeepingSource’s engineering organization, turning anonymization, spatial intelligence, and agentic AI into reliable products.',
      initials: 'BK',
    },
  ],
  jp: [
    {
      key: 'ceo',
      name: 'Tae-Hoon Kim (キム・テフン)',
      role: '共同創業者 · 代表 (CEO)',
      focus: 'ビジョン · 戦略 · 事業全般',
      bio: '画像認識スタートアップOlaworksを共同創業・CTOとして率いてインテルに売却後、インテルのシニアエンジニアを経て2018年にディーピングソースを共同創業。匿名化から始まる空間AIの方向を導きます。',
      initials: 'TK',
    },
    {
      key: 'cbo',
      name: 'Sang-ho Kim (クム・サンホ)',
      role: '最高事業責任者 (CBO)',
      focus: '事業戦略 · グローバルパートナーシップ',
      bio: 'SKブロードバンドで26年間、B2Bの事業戦略・営業・新規事業を統括。クラウドCCTVサービスを4年で年商100億ウォン規模に成長させた経験で、国内外の事業拡大を導きます。',
      initials: 'SK',
    },
    {
      key: 'vpe',
      name: 'Bong-kyung Ko (コ・ボンギョン)',
      role: 'VP of Engineering',
      focus: 'エンジニアリング · プラットフォーム',
      bio: 'ディーピングソースのエンジニアリング組織を統括し、匿名化・空間知能・エージェントAIを安定した製品として実装します。',
      initials: 'BK',
    },
  ],
};
