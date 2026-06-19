import type { TipBlock } from '../types';

// ===== 날씨 대응 =====

export const coldWaveTips = {
  hotDrinkDemand: {
    text: '한파 주의보, 따뜻한 음료 수요 급증 예상',
    action: '핫초코(20개)·캔커피(30개) 입구 히팅 선반 배치, 보온병 상태 점검',
  },
  hotpackEssential: {
    text: '출근길 체감온도 -8°C, 핫팩 필수템',
    action: '손난로 핫팩 50개 계산대 옆 어깨높이 진열, "출근길 필수" POP 부착',
  },
  avoidOutdoorDining: {
    text: '한파로 외식 기피, 도시락 대체 수요 +30%',
    action: '삼각김밥 30개·도시락 15개 추가 발주, 11시까지 냉장고 전면 세팅',
  },
  indoorSnackFamily: {
    text: '주말 한파로 나들이 취소, 실내 활동 증가',
    action: '가족용 과자 패밀리팩 8종 엔드캡 진열, 핫초코 믹스 20박스 보충',
  },
  warmSoup: {
    text: '퇴근길 한파, 따뜻한 국물 수요 증가',
    action: '컵라면 30개·즉석국 10개 온수기 옆 세팅, 전자레인지 정상 작동 확인',
  },
} satisfies Record<string, TipBlock>;

export const heatwaveTips = {
  iceCoffeePeak: {
    text: '아이스 아메리카노, 출근 시간대 매출 2배 예상',
    action: '냉장 커피 50개→100개 확대, 냉장고 1번 선반 전체 배정, 온도 2°C 확인',
  },
  coldNoodleDemand: {
    text: '직장인 냉면·비빔면 수요 급증',
    action: '냉장 면류 15개→25개 확대, 냉장고 2번 선반 전면 배치, 11시 전 세팅',
  },
  iceCreamEvening: {
    text: '열대야로 퇴근 후 아이스크림 수요 +150%',
    action: '냉동고 아이스크림 칸 2배 확장, 저녁 6시 보충 알람 세팅',
  },
  waterAndIon: {
    text: '체감온도 38°C, 탈수 예방 음료 폭증',
    action: '생수 500ml 60개·포카리 30개·게토레이 20개 냉장고 전면, 입구 POP 부착',
  },
  heatReducedAppetite: {
    text: '폭염으로 식욕 저하, 가벼운 식사 선호',
    action: '샐러드·샌드위치 15개·요거트 20개 냉장고 앞쪽, 도시락 발주 -20% 조정',
  },
} satisfies Record<string, TipBlock>;

export const rainDayTips = {
  umbrellaUrgent: {
    text: '오후 비 예보 70%, 우산 긴급 수요',
    action: '3단 우산 15개·비닐우산 20개 입구 우산꽂이 옆 진열, 가격표 부착',
  },
  indoorComfortFood: {
    text: '비 오는 날 따뜻한 간식 선호 +40%',
    action: '컵라면(20개)·핫도그(12개) 온수기 옆 세팅, 핫초코 머신 점검',
  },
  floorSafety: {
    text: '바닥 미끄럼 사고 예방 필수',
    action: '입구 미끄럼 주의 표시판 세팅, 우산 비닐 봉투 200장 보충',
  },
  deliveryAlternative: {
    text: '비로 외출 감소, 근거리 편의점 대체 수요',
    action: '즉석밥 15개·반찬류 10개·라면 20개 중앙 통로 진열',
  },
} satisfies Record<string, TipBlock>;

export const fineDustTips = {
  maskDemand: {
    text: '미세먼지 나쁨, 마스크 매출 +180%',
    action: 'KF94 마스크 30개·KF80 20개 계산대 앞 진열, "미세먼지 나쁨" POP',
  },
  indoorSnack: {
    text: '외출 기피로 실내 간식 수요 +40%',
    action: '과자(15봉)·초콜릿(20개) 눈높이 진열, 목캔디·비타민 입구 배치',
  },
  throatCare: {
    text: '미세먼지 목 건강 관리 수요',
    action: '목캔디 15개·생수 2L 10개·비타민음료 20개 입구 선반 배치',
  },
} satisfies Record<string, TipBlock>;

// ===== 시즌/이벤트 대응 =====

export const examSeasonTips = {
  energyDrinkSurge: {
    text: '시험 D-5, 에너지드링크 소비 폭증 시작',
    action: '핫식스 40개·레드불 30개·몬스터 20개 냉장고 3번 선반 전용 배정',
  },
  lateNightSnack: {
    text: '밤 10시~새벽 2시 야식 매출 +120%',
    action: '컵라면 40개·삼각김밥 30개 밤 9시 추가 진열, 전자레인지 옆 배치',
  },
  stressSweets: {
    text: '시험 스트레스로 단맛 간식 수요 +60%',
    action: '초콜릿바 30개·젤리 20봉·사탕 15봉 계산대 옆 임펄스존 배치',
  },
  midnightStaffing: {
    text: '새벽 학습 학생 급증, 야간 매출 피크',
    action: '새벽 2시까지 운영 확인, 야간 알바 1명 추가 배치 (22시~02시)',
  },
  vitaminDemand: {
    text: '시험 기간 체력 관리, 비타민 음료 수요',
    action: '비타민음료 15개·영양바 20개 에너지드링크 옆 크로스 진열',
  },
} satisfies Record<string, TipBlock>;

export const cherryBlossomTips = {
  picnicFood: {
    text: '벚꽃 나들이 피크, 도시락·간식 폭증',
    action: '삼각김밥 50개·샌드위치 30개·도시락 20개, 오전 10시까지 냉장고 풀세팅',
  },
  drinksPeak: {
    text: '야외 활동으로 음료 수요 +200%',
    action: '생수 80개·이온음료 40개·캔커피 30개 입구 아이스박스 세팅',
  },
  disposables: {
    text: '피크닉 일회용품 동반 구매율 85%',
    action: '종이컵 200개·물티슈 50개·일회용 포크 100개 도시락 옆 진열',
  },
} satisfies Record<string, TipBlock>;

// ===== 요일 패턴 =====

export const mondayRecoveryTips = {
  coffeeDemand: {
    text: '월요 블루먼데이, 커피 수요 +25%',
    action: '캔커피 20개·아메리카노 15개 추가, 입구 커피존 전면 배치',
  },
  lunchboxPeak: {
    text: '월요일 도시락 수요, 주중 두 번째로 높음',
    action: '삼각김밥 25개·도시락 12개, 11시 전 냉장고 전면 세팅',
  },
  weekStartReset: {
    text: '주말 후 재고 정리, 유통기한 점검 필수',
    action: '유통기한 D-3 이내 상품 확인, 할인 스티커 부착 후 전면 배치',
  },
} satisfies Record<string, TipBlock>;

export const fridayNightTips = {
  alcoholSurge: {
    text: '불금 퇴근 후 주류 수요 +200%',
    action: '캔맥주 60개·소주 40병 냉장고 풀가동, 저녁 5시 전 세팅 완료',
  },
  snackPairing: {
    text: '주류 구매 시 안주 동반 구매율 73%',
    action: '마른안주 20봉·견과류 15봉 주류 냉장고 옆 크로스 머천다이징',
  },
  lateNightOps: {
    text: '새벽 3시까지 주류·야식 수요 지속',
    action: '야간 재고 보충 체크 (밤 11시·새벽 1시), 얼음 20봉 추가 확보',
  },
} satisfies Record<string, TipBlock>;

export const weekendBrunchTips = {
  brunchDemand: {
    text: '늦은 아침 브런치 수요 증가',
    action: '샌드위치 15개·우유 10개·주스 10개 냉장고 2번 선반, 10시까지 세팅',
  },
  familySnack: {
    text: '주말 가족 간식 수요, 패밀리팩 선호',
    action: '과자 패밀리팩 10종·음료 묶음 8종 엔드캡 진열',
  },
} satisfies Record<string, TipBlock>;

export const sundayRecoveryTips = {
  hangoverDemand: {
    text: '일요일 아침 숙취 해소 수요 피크',
    action: '숙취해소제 15개·이온음료 20개 입구 냉장고 1번 선반, "해장 필수" POP',
  },
  sundayGrocery: {
    text: '일요일 저녁 집콕 수요 증가',
    action: '즉석밥 15개·반찬 10개·라면 20개 중앙 통로 진열',
  },
  nextWeekPrep: {
    text: '내일 월요일 준비, 도시락 발주 확인',
    action: '월요일 삼각김밥 25개·도시락 12개 발주 최종 확인',
  },
} satisfies Record<string, TipBlock>;

// ===== 상권 특화 =====

export const residentialTips = {
  martClosed: {
    text: '롯데마트 정기휴무, 대체 장보기 수요 +50%',
    action: '우유 20개·빵 15개·계란 10판 추가 확보, 입구 "오늘 마트 휴무" 안내',
  },
  afterSchoolSnack: {
    text: '하교 시간 (3시~5시) 아이 간식 피크',
    action: '초코우유 15개·요거트 20개·젤리 10봉 계산대 앞 저높이 진열',
  },
  eveningGrocery: {
    text: '저녁 장보기 피크 (6시~9시)',
    action: '즉석밥 20개·라면 15개·냉동식품 10개 중앙 통로 전면 배치',
  },
  weekendGrocery: {
    text: '금요 저녁 주말 장보기 시작',
    action: '생필품·세제 10개·간편식 15개 입구 쪽 진열, 가격 POP 부착',
  },
  childVitamin: {
    text: '환절기 아이 건강 관리 수요',
    action: '비타민 젤리 10개·유산균 음료 15개·꿀차 10개 유제품 코너 배치',
  },
} satisfies Record<string, TipBlock>;

export const entertainmentTips = {
  clubPreDrink: {
    text: '클럽 입장 전 사전 음주 수요 (프리드링크)',
    action: '캔맥주 80개·소주 50병·믹서(토닉·사이다) 30개, 밤 10시 전 풀세팅',
  },
  postClubHangover: {
    text: '클럽 후 새벽 해장 수요',
    action: '컵라면 30개·삼각김밥 20개·이온음료 20개, 새벽 2시 보충',
  },
  buskingCrowd: {
    text: '홍대 거리공연 유동인구 +80%',
    action: '캔음료 40개·간식(과자 20봉) 매장 앞 야외 진열대 세팅',
  },
  fridayClubSeason: {
    text: '불금 클럽 입장 대기줄, 간식·음료 수요',
    action: '물 30개·에너지드링크 20개·껌 15개 입구 진열, 밤 11시까지 유지',
  },
  halloweenPrep: {
    text: '할로윈 코스튬 쇼핑객 간식 구매',
    action: '할로윈 과자 20봉·캔디 30개·음료 40개, 입구 테마 진열',
  },
} satisfies Record<string, TipBlock>;

export const officeTips = {
  seminarLunchbox: {
    text: '세미나 참석자 점심 도시락 수요 급증',
    action: '삼각김밥 25개·도시락 15개 11시 전 세팅, 커피 30개 추가',
  },
  afternoonCoffee: {
    text: '오후 회의 후 커피 브레이크 수요',
    action: '아이스커피 20개·핫커피 15개 냉장고 전면, 3시 전 보충',
  },
  overtimeFood: {
    text: '야근 예상, 저녁 즉석식품 수요',
    action: '컵라면 15개·삼각김밥 10개·커피 10개 저녁 6시 세팅',
  },
  meetingSnack: {
    text: '오전 회의 시즌, 간식 대량 구매',
    action: '초콜릿·과자 회의용 10팩 계산대 앞 진열, 묶음 가격 POP',
  },
} satisfies Record<string, TipBlock>;
