import type { EventBlock } from '../types';

// ===== 🏢 오피스 상권 (강남 테헤란로) =====

export const coldWaveAlert: EventBlock = {
  icon: '❄️', title: '한파특보 발령 중',
  detail: '아침 체감온도 -8°C · 3일간 지속', impact: '따뜻한 음료 +80%, 핫팩 +150%',
};
export const coexITConference: EventBlock = {
  icon: '💼', title: '코엑스 IT 컨퍼런스',
  detail: '오전 10시~ · 예상 1,500명', impact: '점심 도시락·음료 수요 +40%',
};
export const yearEndPartyGangnam: EventBlock = {
  icon: '🍻', title: '강남 송년회 집중일',
  detail: '오후 6시~ · 주변 음식점 만석', impact: '주류 +150%, 마른안주 +120%',
};
export const newYearSeminar: EventBlock = {
  icon: '🏢', title: '테헤란로 신년 세미나 시즌',
  detail: '1~2월 집중 기간', impact: '점심 도시락 수요 분산',
};
export const heatwaveAlert: EventBlock = {
  icon: '🔥', title: '서울 폭염주의보 발령',
  detail: '낮 최고 35°C · 3일간 지속', impact: '냉음료 +80%, 아이스크림 +120%',
};
export const gangnamStartupEvent: EventBlock = {
  icon: '💼', title: '강남 스타트업 채용 행사',
  detail: '오후 2시~ · 역삼동', impact: '오후 간식·커피 수요 증가',
};

// ===== 🏘️ 주택 상권 (송파구 잠실동) =====

export const lottemartClosed: EventBlock = {
  icon: '🛒', title: '잠실 롯데마트 정기 휴무',
  detail: '매주 월 정기 휴무', impact: '우유·빵·계란 대체 수요 +50%',
};
export const elementarySportsDay: EventBlock = {
  icon: '🏃', title: '잠실초 가을 운동회',
  detail: '오전 9시~ · 학생 600명', impact: '아침 김밥·음료·간식 +150%',
};
export const hangangCherryBlossom: EventBlock = {
  icon: '🌸', title: '한강 벚꽃축제 피크',
  detail: '잠실 한강공원 · 예상 50,000명', impact: '도시락 +250%, 음료 +200%',
};
export const hangangAutumnFestival: EventBlock = {
  icon: '🍂', title: '잠실 한강공원 단풍축제',
  detail: '오전 10시~ · 예상 5,000명', impact: '나들이 간식·음료 +100%',
};
export const summerVacationStart: EventBlock = {
  icon: '🏫', title: '여름방학 시작',
  detail: '7~8월 · 8주간', impact: '아이 간식 +60%, 아이스크림 +80%',
};
export const schoolReturn: EventBlock = {
  icon: '🏫', title: '잠실초 등교 재개',
  detail: '오전 8시 등교', impact: '아침 간식·음료 수요 회복',
};

// ===== 🎓 대학 상권 (관악구 신림동) =====

export function snuExam(label: string, dDay: number): EventBlock {
  return {
    icon: '📚', title: `서울대 ${label} ${dDay > 0 ? `D-${dDay}` : '시작'}`,
    detail: dDay > 3 ? '시험 준비 본격화' : '도서관·스터디카페 새벽까지 만석',
    impact: `에너지드링크 +${Math.min(50 + (7 - dDay) * 30, 200)}%, 야간 매출 +${Math.min(40 + (7 - dDay) * 20, 150)}%`,
  };
}
export const semesterEndParty: EventBlock = {
  icon: '🎉', title: '서울대 종강 파티',
  detail: '저녁 6시~ · 전 동아리 파티', impact: '주류 +200%, 안주 +150%',
};
export const mtSeason: EventBlock = {
  icon: '🏕️', title: 'MT 시즌 본격화',
  detail: '주말 집중 · 단체 구매', impact: '과자 +100%, 음료 +120%, 주류 +80%',
};
export const semesterStart: EventBlock = {
  icon: '🎓', title: '서울대 개강',
  detail: '3월 첫째 주 · 신입생 OT 동시', impact: '도시락 +220%, 간식세트 +150%',
};
export const summerBreakUniv: EventBlock = {
  icon: '🏫', title: '여름방학 (학생 -70%)',
  detail: '6~8월 · 고시생만 잔류', impact: '전체 수요 -70%, 발주 대폭 축소',
};
export const studyGroupPeak: EventBlock = {
  icon: '📚', title: '신림동 고시촌 스터디 피크',
  detail: '오후 6시~ · 스터디카페 만석', impact: '야간 음료·간식 +40%',
};

// ===== 🎤 유흥 상권 (마포구 홍대입구) =====

export const hongdaeHalloween: EventBlock = {
  icon: '🎃', title: '홍대 할로윈 페스티벌',
  detail: '오후 6시~ · 예상 20,000명', impact: '하루종일 매출 +250%',
};
export const hongdaeHalloweenParty: EventBlock = {
  icon: '🎃', title: '홍대 할로윈 파티 5곳',
  detail: '오후 10시~ · 새벽 4시', impact: '주류 +200%, 안주 +150%',
};
export const hongdaeFleaMarket: EventBlock = {
  icon: '🎪', title: '홍대 플리마켓',
  detail: '오후 1시~ · 걷고싶은거리', impact: '낮 음료·간식 +100%',
};
export const hongdaeLadiesNight: EventBlock = {
  icon: '💃', title: '홍대 레이디스나이트',
  detail: '수요일 여성 할인 · 저녁 8시~', impact: '와인·칵테일 +60%, 가벼운 안주 +40%',
};
export const hongdaeBeerFest: EventBlock = {
  icon: '🍺', title: '홍대 맥주축제',
  detail: '금~일 · 거리 축제', impact: '주말 맥주 +200%, 안주 +150%',
};
export const hongdaeBusking: EventBlock = {
  icon: '🎸', title: '홍대 거리공연 시즌',
  detail: '오후 6시~ · 걷고싶은거리', impact: '저녁 음료·간식 +80%',
};
export const yearEndClubParty: EventBlock = {
  icon: '🎵', title: '홍대 연말 클럽 파티',
  detail: '오후 10시~ · 새벽 5시 · 5곳 동시', impact: '주류 +250%, 안주 +180%',
};
export const hangoverSunday: EventBlock = {
  icon: '🍜', title: '홍대 해장 수요 피크',
  detail: '오전 10시~ · 오후 2시', impact: '라면·숙취해소제 +100%',
};
