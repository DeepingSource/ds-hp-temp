/**
 * STORECARE 감지 시나리오 데이터
 *
 * StoreCareMockup이 자동 순환하는 감지 이벤트 목록.
 * 시나리오를 추가/수정하려면 이 파일만 편집하면 됩니다.
 */

import { cctvImages } from './cctvImages';
import type { CctvImage } from './cctvImages';

export type AlertIcon = 'temperature' | 'display' | 'contamination' | 'intrusion';

export interface StoreCareScenario {
  id: string;
  /** 카메라 라벨 (목업 하단 그리드 표시) */
  cameraLabel: string;
  /** CCTV 이미지 */
  cctv: CctvImage;
  /** 감지 아이콘 타입 */
  alertIcon: AlertIcon;
  /** 정상 상태 메시지 */
  calmMsg: string;
  /** 감지 중 제목 */
  detectingTitle: string;
  /** 감지 중 설명 */
  detectingDesc: string;
  /** 알림 제목 */
  alertTitle: string;
  /** 알림 설명 */
  alertDesc: string;
  /** 해결 설명 */
  resolvedDesc: string;
}

export const storeCareScenarios: StoreCareScenario[] = [
  {
    id: 'fridge-open',
    cameraLabel: '음료 냉장고',
    cctv: cctvImages.heroFridgeOpen,
    alertIcon: 'temperature',
    calmMsg: '4개 카메라 모두 정상 모니터링 중입니다.',
    detectingTitle: '음료 냉장고 이상 감지 중',
    detectingDesc: '냉장고 문 열림 패턴 분석 중. 잠시 후 알림이 발생할 수 있습니다.',
    alertTitle: '음료 냉장고 문 열림 감지',
    alertDesc: '3분 이상 냉장고 문이 열려있습니다. 내부 온도(12°C)가 상승 중입니다.',
    resolvedDesc: '내부 온도가 정상 범위로 복구됐습니다. 이벤트가 기록되었습니다.',
  },
  {
    id: 'shelf-empty',
    cameraLabel: '음료 진열대',
    cctv: cctvImages.heroShelfEmpty,
    alertIcon: 'display',
    calmMsg: '매대 진열 상태 정상, 4개 구역 모니터링 중입니다.',
    detectingTitle: '진열대 결품 패턴 분석 중',
    detectingDesc: '음료 진열대 빈 공간이 감지됩니다. 재고 보충이 필요할 수 있습니다.',
    alertTitle: '음료 진열대 결품 감지',
    alertDesc: '1시간째 음료 진열대 재고 보충이 필요합니다. 전면 진열이 30% 미만입니다.',
    resolvedDesc: '진열 보충 완료 확인. 정상 재고 수준으로 복구됐습니다.',
  },
  {
    id: 'contamination',
    cameraLabel: '쓰레기통',
    cctv: cctvImages.contamTrashOverflow,
    alertIcon: 'contamination',
    calmMsg: '청결 상태 양호, 전 구역 정상입니다.',
    detectingTitle: '청결 이상 패턴 감지 중',
    detectingDesc: '쓰레기통 주변 오염이 감지됩니다. 청소 담당자 확인이 필요할 수 있습니다.',
    alertTitle: '쓰레기통 과적 감지',
    alertDesc: '50분째 쓰레기통 청결이 확인되지 않았습니다. 즉시 정리가 필요합니다.',
    resolvedDesc: '청결 처리 완료. 해당 구역이 정상 상태로 복구됐습니다.',
  },
  {
    id: 'intrusion',
    cameraLabel: '야간 IR',
    cctv: cctvImages.intrusionNightIr,
    alertIcon: 'intrusion',
    calmMsg: '야간 무인 모드 정상 작동 중입니다.',
    detectingTitle: '야간 이상 동선 분석 중',
    detectingDesc: '야간 무인 구역에서 이상 체류 패턴이 감지됩니다. 확인 중입니다.',
    alertTitle: '야간 이상 체류 감지',
    alertDesc: '야간 무인 구역에 20분 이상 체류가 확인됩니다. 즉시 확인하세요.',
    resolvedDesc: '체류 종료 확인. 야간 무인 모드 정상 복귀됐습니다.',
  },
];
