/**
 * #18 PrivacyJourney 단계 카피 (MOCKUP_PROPOSALS_v5 §2)
 *
 * "원본이 시스템에 존재하지 않는 구간"의 시각 증명. 다크(D5), 회색조+블루.
 * 6 신호 카테고리는 #1 IntegratedLoopDiagram·#6 SealSdkMockup 로그와 문자열 일치해야 한다.
 */

import type { Locale } from '@/lib/i18n';

/** 공통 신호 6 카테고리 — 전 목업 공유 어휘 (변경 시 #1·#6·#18 동시 갱신) */
export const SIGNAL_CATEGORIES = ['Pattern', 'Detection', 'Priority', 'Response', 'Context', 'Outcome'] as const;

export interface PrivacyStep {
  /** 단계 라벨 */
  label: string;
  /** 단계 설명 1줄 */
  desc: string;
}

interface PrivacyCopy {
  eyebrow: string;
  heading: string;          // takeaway
  steps: [PrivacyStep, PrivacyStep, PrivacyStep, PrivacyStep, PrivacyStep];
  /** 하단 2열 표 */
  retainedTitle: string;    // 남는 것
  notRetainedTitle: string; // 남지 않는 것
  retained: string[];
  notRetained: string[];
  procChip: string;         // "0.03s" 칩 라벨
  discardLabel: string;     // ④ 원본 폐기 라벨
}

export const PRIVACY_COPY: Record<Locale, PrivacyCopy> = {
  ko: {
    eyebrow: 'Privacy by Design',
    heading: '0.03초 뒤, 원본은 없습니다',
    steps: [
      { label: '카메라 프레임', desc: '카메라가 한 프레임을 포착합니다.' },
      { label: '엣지 익명화', desc: '얼굴·번호판을 캡처 시점에 비가역 마스킹.' },
      { label: '신호 추출', desc: 'Pattern·Detection·Priority·Response·Context·Outcome 6 신호만 추출.' },
      { label: '원본 폐기', desc: '원본은 저장되지 않습니다 — 프레임이 소멸합니다.' },
      { label: '이벤트 허브 전달', desc: '익명 신호만 이벤트 허브로 전달됩니다.' },
    ],
    retainedTitle: '남는 것',
    notRetainedTitle: '남지 않는 것',
    retained: ['익명 신호 (6 카테고리)', '이벤트 메타데이터', '집계·통계 값'],
    notRetained: ['원본 영상', '얼굴·신체 이미지', '개인 식별 정보'],
    procChip: '0.03s',
    discardLabel: '원본 폐기',
  },
  en: {
    eyebrow: 'Privacy by Design',
    heading: '0.03 seconds later, the original is gone',
    steps: [
      { label: 'Camera frame', desc: 'The camera captures a single frame.' },
      { label: 'Edge anonymization', desc: 'Faces and plates masked irreversibly at capture.' },
      { label: 'Signal extraction', desc: 'Only 6 signals: Pattern · Detection · Priority · Response · Context · Outcome.' },
      { label: 'Original discarded', desc: 'The original is never stored — the frame dissolves.' },
      { label: 'To the event hub', desc: 'Only anonymized signals reach the event hub.' },
    ],
    retainedTitle: 'What remains',
    notRetainedTitle: 'What does not',
    retained: ['Anonymized signals (6 categories)', 'Event metadata', 'Aggregated statistics'],
    notRetained: ['Original video', 'Face / body images', 'Personally identifiable info'],
    procChip: '0.03s',
    discardLabel: 'Original discarded',
  },
  jp: {
    eyebrow: 'Privacy by Design',
    heading: '0.03秒後、原本はありません',
    steps: [
      { label: 'カメラフレーム', desc: 'カメラが1フレームを捉えます。' },
      { label: 'エッジ匿名化', desc: '顔・ナンバーを取得時点で不可逆にマスキング。' },
      { label: '信号抽出', desc: 'Pattern・Detection・Priority・Response・Context・Outcome の6信号のみ抽出。' },
      { label: '原本の破棄', desc: '原本は保存されません — フレームが消滅します。' },
      { label: 'イベントハブへ', desc: '匿名信号のみがイベントハブへ送られます。' },
    ],
    retainedTitle: '残るもの',
    notRetainedTitle: '残らないもの',
    retained: ['匿名信号（6カテゴリ）', 'イベントメタデータ', '集計・統計値'],
    notRetained: ['原本映像', '顔・身体の画像', '個人識別情報'],
    procChip: '0.03s',
    discardLabel: '原本の破棄',
  },
};
