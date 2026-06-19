import type { SeasonScenarios } from './types';
import { day } from './compose';
import { autumnCrisp, autumnRain, autumnClear, autumnCool, halloweenClear } from './catalog/weather';
import { elementarySportsDay, hangangAutumnFestival, hongdaeHalloween, hongdaeHalloweenParty, hongdaeBusking, hongdaeLadiesNight, snuExam, studyGroupPeak, schoolReturn, hangoverSunday } from './catalog/events';
import { examSeasonTips, mondayRecoveryTips, fridayNightTips, sundayRecoveryTips, weekendBrunchTips, residentialTips, entertainmentTips, officeTips, rainDayTips } from './catalog/tips';
import { examSeasonChecks, fridayNightChecks, weeklyResetChecks, lunchPeakChecks, residentialMorningChecks, weekendOutingChecks } from './catalog/checklists';

export const autumnScenarios: SeasonScenarios = {
  // ===== 🏢 오피스 상권 (강남 테헤란로) =====
  office: [
    // 월요일: 추석 연휴 복귀
    day(0, '월요일 추석 연휴 복귀', {
      weather: autumnCrisp,
      tips: [
        mondayRecoveryTips.coffeeDemand,
        mondayRecoveryTips.lunchboxPeak,
        { text: '환절기 감기 주의, 비타민 음료 수요 급증', action: '비타민음료 15개·핫팩 20개 입구 선반 배치, 오전 8시 전 세팅' },
      ],
      events: [
        { icon: '🏢', title: '테헤란로 IT기업 복귀 출근', detail: '오전 9시~ · 유동인구 +38%', impact: '아침 도시락·커피 수요 급증' },
      ],
      checklist: [
        '도시락·삼각김밥 발주량 +33% 확인',
        ...lunchPeakChecks.slice(1, 3),
        '환절기 비타민음료 15개 입구 진열',
      ],
      weekPreview: [
        '화: 업무 정상화, 점심 수요 회복',
        '목: 강남 스타트업 채용 행사',
        '금: 불금 간식 수요 증가',
      ],
    }),

    // 화요일: 업무 본격화
    day(1, '화요일 업무 본격화', {
      weather: autumnClear,
      tips: [
        officeTips.seminarLunchbox,
        officeTips.afternoonCoffee,
        { text: '일교차 7°C, 따뜻한 음료 동시 수요', action: '핫초코 15개·차 음료 10개 온장고 세팅, 오후 2시 보충' },
      ],
      events: [
        { icon: '💼', title: '삼성동 금융권 컨퍼런스', detail: '오후 2시~ · 코엑스', impact: '오후 간식·커피 수요 +28%' },
      ],
      checklist: [
        ...lunchPeakChecks.slice(0, 2),
        '환절기 따뜻한 음료 온장고 세팅 확인',
        '유통기한 D-3 이내 상품 확인 및 할인 처리',
      ],
      weekPreview: [
        '수: 날씨 흐림, 실내 간식 수요 증가',
        '금: 주말 대비 간식·주류 강화',
      ],
    }),

    // 수요일: 주중 피크
    day(2, '수요일 주중 피크', {
      weather: autumnCool,
      tips: [
        { text: '수요일 주중 도시락 수요 최대, 점심 집중', action: '삼각김밥 30개·도시락 15개, 11시 전 냉장고 전면 세팅' },
        officeTips.overtimeFood,
        rainDayTips.umbrellaUrgent,
      ],
      events: [
        { icon: '🏢', title: '강남역 채용 설명회', detail: '오후 6시~ · 예상 500명', impact: '저녁 간식·음료 수요 +23%' },
      ],
      checklist: [
        '도시락·삼각김밥 30개 이상 재고 확보',
        '야근 대비 컵라면 15개·삼각김밥 10개 저녁 6시 세팅',
        '비닐우산 15개 입구 진열 확인',
        '저녁 알바 스케줄 최종 확인',
      ],
      weekPreview: [
        '목: 가을비 지속, 따뜻한 음료 수요',
        '금: 불금, 간식·주류 수요 폭증',
      ],
    }),

    // 목요일: 가을비
    day(3, '목요일 가을비', {
      weather: autumnRain,
      tips: [
        rainDayTips.indoorComfortFood,
        rainDayTips.deliveryAlternative,
        { text: '비 오는 날 따뜻한 커피 수요 +42%', action: '핫아메리카노 20개·핫초코 10개 온장고 전면 배치, 오전 8시 세팅' },
      ],
      events: [
        { icon: '🌧️', title: '강남 교통 정체 예상', detail: '출퇴근 시간 혼잡 · 유동인구 집중', impact: '택시 대기 중 음료·간식 구매 +20%' },
      ],
      checklist: [
        '컵라면 20개·핫도그 12개 온수기 옆 세팅',
        '입구 미끄럼 주의 표시판 세팅',
        '우산 비닐 봉투 200장 보충 확인',
        '즉석밥 15개·반찬류 10개 중앙 통로 진열',
      ],
      weekPreview: [
        '금: 비 그침, 불금 수요 회복',
        '주말: 맑음, 외출 수요 증가',
      ],
    }),

    // 금요일: 불금 시작
    day(4, '금요일 불금 시작', {
      weather: autumnClear,
      tips: [
        fridayNightTips.alcoholSurge,
        fridayNightTips.snackPairing,
        { text: '주말 대비 생필품 수요 +20%', action: '생필품·세제 10개 입구 쪽 진열, 가격 POP 부착' },
      ],
      events: [
        { icon: '🍺', title: '강남 금요일 회식 피크', detail: '오후 6시~ · 주류 수요 급증', impact: '맥주·소주·안주 +58%' },
      ],
      checklist: [
        ...fridayNightChecks.slice(0, 3),
        '주말 발주 목록 최종 정리',
      ],
      weekPreview: [
        '토: 여의도 마라톤 대회, 나들이 수요',
        '일: 남산 단풍축제',
      ],
    }),

    // 토요일: 가을 나들이
    day(5, '토요일 가을 나들이', {
      weather: autumnCrisp,
      tips: [
        weekendBrunchTips.brunchDemand,
        weekendBrunchTips.familySnack,
        { text: '저녁 홈파티 수요, 주류·안주 동반 구매율 70%', action: '캔맥주 30개·와인 5병·안주 15봉 주류 코너 크로스 진열' },
      ],
      events: [
        { icon: '🏃', title: '여의도 한강 마라톤 대회', detail: '오전 7시~ · 3,000명', impact: '아침 에너지바·음료 수요 급증' },
        { icon: '🍂', title: '남산 단풍축제 시작', detail: '오전 10시~ · 주말 내내', impact: '관광객 음료·간식 수요 +48%' },
      ],
      checklist: [
        '샌드위치 15개·우유 10개·주스 10개 냉장고 2번 선반 10시까지 세팅',
        ...weekendOutingChecks.slice(0, 2),
        '일요일 발주 최종 확인',
      ],
      weekPreview: [
        '일: 단풍축제 계속, 관광 수요',
        '다음 주: 기온 하락 예상, 따뜻한 음료 준비',
      ],
    }),

    // 일요일: 휴식
    day(6, '일요일 휴식', {
      weather: autumnClear,
      tips: [
        sundayRecoveryTips.sundayGrocery,
        sundayRecoveryTips.nextWeekPrep,
        { text: '일요일 브런치 겸 간식 수요, 늦은 아침 집중', action: '샌드위치 10개·과자 15봉·음료 20개 입구 쪽 10시까지 세팅' },
      ],
      events: [
        { icon: '🍂', title: '남산 단풍축제 마지막 날', detail: '오전 10시~ · 마감 행사', impact: '오후 귀가 음료·간식 수요' },
      ],
      checklist: [
        ...weeklyResetChecks.slice(0, 2),
        '월요일 삼각김밥 25개·도시락 12개 발주 최종 확인',
        '다음 주 알바 스케줄 확인',
      ],
      weekPreview: [
        '월: 기온 하락, 따뜻한 음료 준비',
        '수: 추석 준비 시작',
      ],
    }),
  ],

  // ===== 🏘️ 주택 상권 (송파구 잠실동) =====
  residential: [
    // 월요일: 추석 연휴 마무리
    day(0, '월요일 추석 연휴 마무리', {
      weather: autumnCrisp,
      tips: [
        residentialTips.martClosed,
        residentialTips.afterSchoolSnack,
        residentialTips.childVitamin,
      ],
      events: [
        schoolReturn,
      ],
      checklist: [
        ...residentialMorningChecks.slice(0, 2),
        '환절기 비타민 젤리 10개·유산균 음료 15개 유제품 코너 배치',
        '연휴 후 유통기한 임박 상품 확인 및 할인 처리',
      ],
      weekPreview: [
        '화: 학교 정상화, 하교 간식 수요',
        '목: 잠실초 운동회',
        '주말: 가을 나들이 수요',
      ],
    }),

    // 화요일: 일상 복귀
    day(1, '화요일 일상 복귀', {
      weather: autumnClear,
      tips: [
        residentialTips.eveningGrocery,
        residentialTips.afterSchoolSnack,
        { text: '화요일 장보기 피크, 생필품 수요 +27%', action: '세제 10개·휴지 8팩·즉석밥 15개 중앙 통로 전면 배치' },
      ],
      events: [
        { icon: '🏫', title: '잠실초 하교', detail: '오후 3시 · 정상 수업', impact: '하교 시간 간식 수요 +32%' },
      ],
      checklist: [
        ...residentialMorningChecks.slice(0, 2),
        '저녁 장보기 대비 즉석밥·반찬·라면 중앙 통로 진열',
        '유제품 유통기한 D-2 이내 확인',
      ],
      weekPreview: [
        '목: 초등학교 운동회, 간식 대량 수요',
        '주말: 가을 나들이 간식 수요',
      ],
    }),

    // 수요일: 주중 장보기
    day(2, '수요일 주중 장보기', {
      weather: autumnCool,
      tips: [
        residentialTips.eveningGrocery,
        { text: '운동회 사전 구매 시작, 김밥·음료 수요 +52%', action: '김밥 재료(김·밥·단무지) 20세트·캔음료 40개 오전 중 입고 확인' },
        { text: '쌀쌀한 날씨, 따뜻한 음료 선호', action: '핫초코 믹스 15개·차 티백 10박스 온장고 옆 진열' },
      ],
      events: [
        { icon: '🏫', title: '잠실초 운동회 준비', detail: '목요일 행사 대비 · 사전 장보기', impact: '김밥·음료·간식 사전 구매 +48%' },
      ],
      checklist: [
        '생필품·식재료 재고 최대 확보',
        '운동회 간식류(과자 20봉·음료 30개·김밥 재료) 준비',
        '따뜻한 음료 온장고 세팅 확인',
        '목요일 김밥·도시락 발주량 3배 확인',
      ],
      weekPreview: [
        '목: 운동회, 간식 수요 폭증',
        '주말: 가을 소풍 시즌',
      ],
    }),

    // 목요일: 초등학교 운동회
    day(3, '목요일 초등학교 운동회', {
      weather: autumnClear,
      tips: [
        { text: '운동회 간식 수요 폭증, 아침 일찍 구매 집중', action: '김밥 30줄·주스 40개·과자 30봉 오전 7시 전 전면 진열 완료' },
        { text: '학부모 음료 수요, 이온음료·생수 동시 폭증', action: '이온음료 30개·생수 500ml 50개 입구 아이스박스 세팅' },
        { text: '일회용품 동반 구매율 85%', action: '물티슈 30개·일회용컵 100개·종이접시 50개 김밥 옆 크로스 진열' },
      ],
      events: [
        elementarySportsDay,
      ],
      checklist: [
        '김밥·도시락 3배 발주 최종 확인',
        '음료·생수 입구 아이스박스 오전 7시 세팅',
        '일회용품(물티슈·컵·접시) 재고 확인',
        '점심 피크(11:30~13:30) 대비 계산대 2인 배치',
      ],
      weekPreview: [
        '금: 운동회 후 피로, 간편식 수요',
        '주말: 한강공원 나들이',
      ],
    }),

    // 금요일: 주말 준비
    day(4, '금요일 주말 준비', {
      weather: autumnClear,
      tips: [
        residentialTips.weekendGrocery,
        { text: '나들이 간식 사전 구매, 패밀리팩 선호', action: '과자 패밀리팩 10종·음료 묶음 8종 엔드캡 진열' },
        { text: '운동회 다음 날, 간편식으로 저녁 해결 수요', action: '즉석밥 15개·냉동식품 10개·라면 20개 중앙 통로 전면 배치' },
      ],
      events: [
        { icon: '🍂', title: '주말 한강공원 단풍축제 예고', detail: '토일 오전 10시~ · 예상 5,000명', impact: '금요일부터 간식 사전 구매 +28%' },
      ],
      checklist: [
        ...weekendOutingChecks.slice(0, 2),
        '주말 발주 최종 확인 (나들이 간식 2배)',
        '토요일 알바 스케줄 확인',
      ],
      weekPreview: [
        '토: 한강공원 단풍축제',
        '일: 가족 나들이 피크',
      ],
    }),

    // 토요일: 가족 나들이
    day(5, '토요일 가족 나들이', {
      weather: autumnCrisp,
      tips: [
        { text: '아침 나들이 준비, 김밥·샌드위치 폭증', action: '김밥 20줄·샌드위치 15개·생수 30개 오전 8시 전 냉장고 전면 세팅' },
        weekendBrunchTips.familySnack,
        { text: '저녁 가족 홈파티, 주류·안주 동반 구매', action: '캔맥주 20개·소주 10병·마른안주 10봉 주류 코너 전면 배치' },
      ],
      events: [
        hangangAutumnFestival,
      ],
      checklist: [
        '나들이 간식(김밥·샌드위치·과자) 3배 재고 확인',
        '음료·생수 입구 아이스박스 세팅',
        '가족 안주류·주류 냉장 코너 진열',
        '일요일 발주 확인',
      ],
      weekPreview: [
        '일: 축제 계속, 나들이 수요 지속',
        '다음 주: 기온 하락 예상, 따뜻한 음료 준비',
      ],
    }),

    // 일요일: 가족 휴식
    day(6, '일요일 가족 휴식', {
      weather: autumnClear,
      tips: [
        weekendBrunchTips.brunchDemand,
        residentialTips.afterSchoolSnack,
        sundayRecoveryTips.nextWeekPrep,
      ],
      events: [
        { icon: '🍂', title: '한강공원 축제 마지막 날', detail: '오전 10시~ · 마감 행사', impact: '오후 귀가 음료·간식 수요' },
      ],
      checklist: [
        ...residentialMorningChecks.slice(0, 2),
        '주말 재고 정리 및 유통기한 확인',
        '월요일 아이 간식·등교 준비물 발주 확인',
      ],
      weekPreview: [
        '월: 등교 시작, 아침 간식 수요',
        '수: 기온 하락, 따뜻한 음료 수요',
      ],
    }),
  ],

  // ===== 🎓 대학 상권 (관악구 신림동) =====
  university: [
    // 월요일: 중간고사 D-7
    day(0, '월요일 중간고사 D-7', {
      weather: autumnCrisp,
      tips: [
        examSeasonTips.vitaminDemand,
        mondayRecoveryTips.coffeeDemand,
        { text: '시험 1주 전, 도서관 입실 간식 구매 시작', action: '초콜릿바 20개·견과류 15봉 계산대 앞 임펄스존 배치' },
      ],
      events: [
        snuExam('중간고사', 7),
      ],
      checklist: [
        ...examSeasonChecks.slice(0, 2),
        '커피 음료(캔커피 20개·아메리카노 15개) 냉장고 전면 배치',
        '야간 알바 스케줄 확인 (시험 기간 연장 운영)',
      ],
      weekPreview: [
        '수: 시험 D-5, 도서관 만석 시작',
        '금: 시험 D-3, 야간 수요 급증',
        '다음 주: 시험 기간 진입',
      ],
    }),

    // 화요일: 스터디 시작
    day(1, '화요일 스터디 시작', {
      weather: autumnClear,
      tips: [
        examSeasonTips.energyDrinkSurge,
        examSeasonTips.lateNightSnack,
        { text: '스터디 그룹 대량 구매, 과자·음료 세트 수요', action: '과자 20봉·음료 20개 묶음 할인 POP 부착, 중앙 통로 진열' },
      ],
      events: [
        studyGroupPeak,
      ],
      checklist: [
        ...examSeasonChecks.slice(0, 2),
        '대량 구매 음료·과자 중앙 통로 진열 확인',
        '환절기 비타민음료 15개 에너지드링크 옆 배치',
      ],
      weekPreview: [
        '목: 시험 D-4, 야간 학습 증가',
        '주말: 스터디 합숙 수요 본격화',
      ],
    }),

    // 수요일: 중간고사 D-5
    day(2, '수요일 중간고사 D-5', {
      weather: autumnCool,
      tips: [
        examSeasonTips.energyDrinkSurge,
        examSeasonTips.lateNightSnack,
        examSeasonTips.vitaminDemand,
      ],
      events: [
        snuExam('중간고사', 5),
      ],
      checklist: [
        '에너지드링크 3종(핫식스 40개·레드불 30개·몬스터 20개) 냉장고 전용 배정',
        '야간 즉석식품(컵라면 40개·삼각김밥 30개) 밤 9시 추가 진열',
        '비타민음료 15개·영양바 20개 에너지드링크 옆 크로스 진열',
        '새벽 알바 추가 배치 확인 (22시~02시)',
      ],
      weekPreview: [
        '금: 시험 D-3, 야간 매출 폭증',
        '주말: 밤샘 스터디 피크',
      ],
    }),

    // 목요일: 중간고사 D-4
    day(3, '목요일 중간고사 D-4', {
      weather: autumnCool,
      tips: [
        examSeasonTips.energyDrinkSurge,
        examSeasonTips.stressSweets,
        examSeasonTips.midnightStaffing,
      ],
      events: [
        snuExam('중간고사', 4),
      ],
      checklist: [
        ...examSeasonChecks,
        '초콜릿바 30개·젤리 20봉·사탕 15봉 계산대 옆 임펄스존 배치',
      ],
      weekPreview: [
        '금: 시험 D-3, 최대 수요',
        '주말: 밤샘 계속, 재고 3배 확보',
      ],
    }),

    // 금요일: 중간고사 D-3
    day(4, '금요일 중간고사 D-3', {
      weather: autumnCool,
      tips: [
        examSeasonTips.energyDrinkSurge,
        examSeasonTips.lateNightSnack,
        examSeasonTips.midnightStaffing,
      ],
      events: [
        snuExam('중간고사', 3),
      ],
      checklist: [
        '에너지드링크 전 종류 최대 확보 (핫식스 60개·레드불 40개·몬스터 30개)',
        '야식(컵라면 50개·삼각김밥 40개) 밤 9시·새벽 1시 2회 보충',
        '새벽 운영 인력 확인 (새벽 5시까지)',
        '주말 대량 발주 최종 확인',
      ],
      weekPreview: [
        '토: 밤샘 스터디 계속',
        '일: 시험 D-1, 마지막 벼락치기',
      ],
    }),

    // 토요일: 주말 밤샘
    day(5, '토요일 주말 밤샘', {
      weather: autumnClear,
      tips: [
        examSeasonTips.energyDrinkSurge,
        { text: '종일 학습, 끼니 대용 식사 수요 폭증', action: '도시락 20개·삼각김밥 30개 3시간마다 보충 (9시·12시·15시·18시)' },
        examSeasonTips.vitaminDemand,
      ],
      events: [
        snuExam('중간고사', 2),
      ],
      checklist: [
        ...examSeasonChecks,
        '끼니 대용 도시락·삼각김밥 3시간 주기 보충 계획 수립',
      ],
      weekPreview: [
        '일: 시험 D-1, 최종 정리',
        '다음 주: 시험 시작',
      ],
    }),

    // 일요일: 중간고사 D-1
    day(6, '일요일 중간고사 D-1', {
      weather: autumnClear,
      tips: [
        examSeasonTips.energyDrinkSurge,
        examSeasonTips.lateNightSnack,
        examSeasonTips.stressSweets,
      ],
      events: [
        snuExam('중간고사', 1),
      ],
      checklist: [
        '에너지드링크 최종 대량 확보 (핫식스 60개·레드불 50개·몬스터 30개)',
        '간편식(도시락 25개·삼각김밥 40개·컵라면 50개) 최대 준비',
        '새벽 운영 최종 확인 (새벽 6시까지)',
        '시험 주간 일일 발주 계획 수립',
      ],
      weekPreview: [
        '월: 시험 시작, 오전 수요 집중',
        '수: 시험 계속, 야간 수요 지속',
        '금: 시험 종료 회식 수요',
      ],
    }),
  ],

  // ===== 🎤 유흥 상권 (마포구 홍대입구) =====
  entertainment: [
    // 월요일: 주말 정리
    day(0, '월요일 주말 정리', {
      weather: autumnCrisp,
      tips: [
        mondayRecoveryTips.weekStartReset,
        { text: '주말 주류 재고 소진, 기본 보충 필요', action: '캔맥주 40개·소주 20병 냉장고 풀가동 보충, 오전 중 완료' },
        { text: '월요일 한산, 저녁 소규모 모임만 대비', action: '마른안주 10봉·생맥주잔 정리, 평일 기본 세팅으로 전환' },
      ],
      events: [
        hongdaeBusking,
      ],
      checklist: [
        '주말 재고 정리 및 유통기한 확인',
        '기본 주류(맥주 40개·소주 20병) 냉장 보충',
        '평일 발주 계획 작성',
        '주중 알바 스케줄 확인',
      ],
      weekPreview: [
        '목: 홍대 거리공연 시즌 시작',
        '금: 할로윈 주간 불금',
        '주말: 할로윈 파티 대비',
      ],
    }),

    // 화요일: 평일 모임
    day(1, '화요일 평일 모임', {
      weather: autumnClear,
      tips: [
        entertainmentTips.buskingCrowd,
        { text: '화요일 소규모 모임 증가, 안주·맥주 수요', action: '캔맥주 30개·안주 15봉 주류 냉장고 옆 크로스 진열' },
        { text: '클럽 화요일 이벤트, 야간 사전 음주 수요', action: '물 20개·에너지드링크 15개 입구 진열, 밤 9시 전 보충' },
      ],
      events: [
        { icon: '🎵', title: '홍대 클럽 화요일 이벤트', detail: '오후 10시~ · 2곳 동시', impact: '야간 음료·간식 수요 +23%' },
      ],
      checklist: [
        '안주류(마른안주 15봉·견과류 10봉) 주류 옆 진열 확인',
        '음료(물·에너지드링크) 입구 냉장고 보충',
        '야간 운영 준비 (밤 10시~)',
        '주류 냉장고 온도 확인 (2~4°C)',
      ],
      weekPreview: [
        '금: 할로윈 주간 불금',
        '주말: 할로윈 파티 피크',
      ],
    }),

    // 수요일: 주중 피크
    day(2, '수요일 주중 피크', {
      weather: autumnCool,
      tips: [
        entertainmentTips.clubPreDrink,
        entertainmentTips.halloweenPrep,
        { text: '수요일 레이디스나이트 와인·칵테일 수요', action: '와인 10병·믹서(토닉·사이다) 20개·가벼운 안주 15봉 저녁 7시 세팅' },
      ],
      events: [
        hongdaeLadiesNight,
      ],
      checklist: [
        '주류(맥주 60개·소주 30병) 냉장 풀가동 확인',
        '할로윈 과자 20봉·캔디 30개 입구 테마 진열',
        '와인·칵테일 믹서 저녁 7시 전 세팅',
        '주말 대비 발주 계획 (할로윈 물량 3배)',
      ],
      weekPreview: [
        '금: 할로윈 불금 폭증',
        '주말: 할로윈 파티 피크',
      ],
    }),

    // 목요일: 할로윈 준비
    day(3, '목요일 할로윈 준비', {
      weather: autumnCool,
      tips: [
        entertainmentTips.halloweenPrep,
        entertainmentTips.clubPreDrink,
        { text: '할로윈 거리 행사, 코스튬 퍼레이드 유동인구 급증', action: '캔음료 40개·간식 30봉 매장 앞 야외 진열대 오후 5시 세팅' },
      ],
      events: [
        { icon: '🎃', title: '홍대 할로윈 거리 행사', detail: '오후 6시~ · 코스튬 퍼레이드', impact: '저녁 음료·간식 +52%' },
      ],
      checklist: [
        '주류(맥주 80개·소주 50병) +38% 냉장 풀가동 확인',
        '할로윈 상품(과자 30봉·캔디 40개·음료 50개) 대량 진열',
        '야간 운영 인력 확인 (밤 10시~ 2인 체제)',
        '금·토 최대 발주 최종 확인',
      ],
      weekPreview: [
        '금: 할로윈 불금, 매출 폭증 예상',
        '토: 할로윈 데이 본행사',
      ],
    }),

    // 금요일: 할로윈 불금
    day(4, '금요일 할로윈 불금', {
      weather: autumnCool,
      tips: [
        fridayNightTips.alcoholSurge,
        entertainmentTips.fridayClubSeason,
        entertainmentTips.halloweenPrep,
      ],
      events: [
        hongdaeHalloweenParty,
      ],
      checklist: [
        ...fridayNightChecks.slice(0, 2),
        '할로윈 상품(과자 40봉·캔디 50개) 최종 진열',
        '새벽 운영 인력 확인 (새벽 4시까지)',
      ],
      weekPreview: [
        '토: 할로윈 데이 본행사, 매출 +243%',
        '일: 해장 수요 폭증',
      ],
    }),

    // 토요일: 할로윈 데이
    day(5, '토요일 할로윈 데이', {
      weather: halloweenClear,
      tips: [
        entertainmentTips.clubPreDrink,
        { text: '할로윈 데이 오후부터 파티 시작, 안주·간식 동반 폭증', action: '안주 40봉·과자 30봉·간편식 20개 오후 3시 전 전면 진열' },
        { text: '새벽까지 매출 지속, 야간 재고 3배 확보 필수', action: '밤 11시·새벽 1시·새벽 3시 3회 재고 보충 스케줄 확정' },
      ],
      events: [
        hongdaeHalloween,
      ],
      checklist: [
        '주류(맥주 100개·소주 60병·칵테일 믹서 30개) 최대 확보',
        '안주·간식 3배(안주 40봉·과자 30봉·간편식 20개) 준비',
        '새벽 운영 최종 확인 (새벽 5시까지 · 3인 체제)',
        '일요일 해장 상품(숙취해소제 30개·라면 40개) 사전 발주',
      ],
      weekPreview: [
        '일: 해장 수요 폭증, 오전~오후 집중',
        '다음 주: 평상시 복귀',
      ],
    }),

    // 일요일: 할로윈 해장
    day(6, '일요일 할로윈 해장', {
      weather: autumnClear,
      tips: [
        sundayRecoveryTips.hangoverDemand,
        entertainmentTips.postClubHangover,
        weekendBrunchTips.brunchDemand,
      ],
      events: [
        hangoverSunday,
      ],
      checklist: [
        '숙취해소제 30개·이온음료 40개 입구 냉장고 1번 선반 "해장 필수" POP',
        '컵라면 40개·삼각김밥 25개 전자레인지 옆 세팅',
        '주말 재고 최종 정리 및 유통기한 확인',
        '월요일 평일 기본 발주 계획 수립',
      ],
      weekPreview: [
        '월: 평상시 복귀, 기본 재고',
        '다음 주말: 가을 축제 시즌 계속',
      ],
    }),
  ],
};
