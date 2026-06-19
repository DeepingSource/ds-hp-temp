import type { SeasonScenarios } from './types';
import { day } from './compose';
import { heatwave, tropicalNight, monsoon, summerEvening, summerHot } from './catalog/weather';
import {
  heatwaveAlert, summerVacationStart, summerBreakUniv,
  hongdaeBeerFest, hongdaeLadiesNight, hongdaeBusking, snuExam,
  hangoverSunday, gangnamStartupEvent,
} from './catalog/events';
import {
  heatwaveTips, rainDayTips, examSeasonTips,
  fridayNightTips, sundayRecoveryTips,
  residentialTips, entertainmentTips, officeTips,
} from './catalog/tips';
import {
  heatwaveChecks, rainDayChecks, examSeasonChecks,
  fridayNightChecks, entertainmentNightChecks, weeklyResetChecks,
} from './catalog/checklists';

export const summerScenarios: SeasonScenarios = {
  // ─────────────────────────────────────
  // 🏢 오피스 상권 (강남 테헤란로)
  // ─────────────────────────────────────
  office: [
    // 월요일
    day(0, '폭염 시작, 아이스커피+냉면', {
      weather: heatwave,
      tips: [
        heatwaveTips.iceCoffeePeak,
        heatwaveTips.coldNoodleDemand,
        heatwaveTips.waterAndIon,
      ],
      events: [
        heatwaveAlert,
        {
          icon: '🍜', title: '점심 냉면 수요 급증',
          detail: '직장인 냉면·비빔면 주문 +58%', impact: '냉장 면류 +62%, 냉장고 전면 배치',
        },
      ],
      checklist: [
        ...heatwaveChecks.slice(0, 2),
        '아이스 음료 재고 2배 확보 (아메리카노 100개·콜라 40개·이온음료 30개)',
        '냉면·비빔면 25개 냉장고 2번 선반 전면 세팅, 11시 전 완료',
      ],
      weekPreview: [
        '화: 장마 예보, 우산·실내 간식 수요',
        '목: 폭염주의보 확대, 생수·이온음료 피크',
        '금: 불금 회식, 맥주·안주 대량 준비',
      ],
    }),

    // 화요일
    day(1, '장마 예보, 우산+실내 간식', {
      weather: monsoon,
      tips: [
        rainDayTips.umbrellaUrgent,
        rainDayTips.indoorComfortFood,
        officeTips.afternoonCoffee,
      ],
      events: [
        {
          icon: '☔', title: '장마전선 북상',
          detail: '오후부터 비 예보, 습도 85%', impact: '우산 판매 +195%, 실내 간식 +38%',
        },
      ],
      checklist: [
        ...rainDayChecks.slice(0, 2),
        '실내 간식 (과자 15봉·초콜릿 20개·캔디 10봉) 눈높이 진열 확대',
        '핫커피 15개·아이스커피 20개 냉장고 전면, 온수기 정상 작동 확인',
      ],
      weekPreview: [
        '수: 열대야 시작, 밤 아이스크림 수요',
        '목: 폭염주의보, 이온음료 폭증',
      ],
    }),

    // 수요일
    day(2, '열대야, 아이스크림·냉장 음료', {
      weather: tropicalNight,
      tips: [
        heatwaveTips.iceCreamEvening,
        heatwaveTips.waterAndIon,
        heatwaveTips.heatReducedAppetite,
      ],
      events: [
        {
          icon: '🌡️', title: '열대야 시작',
          detail: '밤 최저기온 27°C, 에어컨 가동 필수', impact: '저녁 아이스크림 +147%, 냉음료 +90%',
        },
        {
          icon: '🍦', title: '야간 아이스크림 수요 급증',
          detail: '퇴근 후 직장인 아이스크림 구매 증가', impact: '저녁 7~11시 아이스크림 +152%',
        },
      ],
      checklist: [
        ...heatwaveChecks.slice(1, 3),
        '아이스크림 재고 2배 확보, 냉동고 빈칸 없이 채움, 저녁 6시 보충 알람',
        '야간 냉동식품 할인 POP 6시 부착, 바닐라·초코·과일 3종 전면 배치',
      ],
      weekPreview: [
        '목: 폭염주의보 확대, 생수·이온음료 최대 수요',
        '금: 불금 회식, 맥주·안주 대량 판매',
      ],
    }),

    // 목요일
    day(3, '폭염주의보, 생수·이온음료 피크', {
      weather: heatwave,
      tips: [
        heatwaveTips.waterAndIon,
        heatwaveTips.iceCoffeePeak,
        heatwaveTips.heatReducedAppetite,
      ],
      events: [
        heatwaveAlert,
        {
          icon: '💧', title: '수분 보충 필수',
          detail: '직장인 탈수 예방 음료 수요 폭증', impact: '냉장 음료 전체 +117%',
        },
      ],
      checklist: [
        heatwaveChecks[0],
        '생수 500ml 80개·1.5L 20개·2L 15개 전 사이즈 냉장고 전면 배치',
        '이온음료 포카리 30개·게토레이 20개 냉장고 2번 선반 전용 배정',
        '얼음컵 50개·얼음물 디스펜서 입구 세팅, 무료 제공 POP 부착',
      ],
      weekPreview: [
        '금: 불금 회식, 맥주·안주 피크',
        '토: 여행 간식 수요 (휴가 시즌)',
      ],
    }),

    // 금요일
    day(4, '불금+여름 회식, 맥주·안주', {
      weather: summerHot,
      tips: [
        fridayNightTips.alcoholSurge,
        fridayNightTips.snackPairing,
        fridayNightTips.lateNightOps,
      ],
      events: [
        {
          icon: '🍺', title: '불금 회식 시즌',
          detail: '직장인 회식·모임 증가, 주류 수요 폭증', impact: '맥주 +148%, 안주 +122%',
        },
        gangnamStartupEvent,
      ],
      checklist: [
        ...fridayNightChecks.slice(0, 2),
        '주류 냉장고 온도 4°C 세팅, 캔맥주 60개·소주 40병 저녁 5시 전 완료',
        '저녁 6시 이후 주류 할인 POP 부착, 맥주+안주 세트 묶음 진열',
      ],
      weekPreview: [
        '토: 휴가 시즌, 여행 간식 수요',
        '일: 에어컨 가동, 시원한 음료 지속',
      ],
    }),

    // 토요일
    day(5, '휴가 시즌, 여행 간식', {
      weather: summerEvening,
      tips: [
        {
          text: '주말 여행객 증가, 여행 간식 수요 폭증',
          action: '삼각김밥 30개·과자 20봉·음료 40개 입구 쪽 여행 코너, "여행 필수템" POP',
        },
        heatwaveTips.waterAndIon,
        {
          text: '휴대용 쿨팩·아이스팩 동반 구매율 45%',
          action: '쿨팩 15개·아이스팩 10개 계산대 옆 진열, 생수 옆 크로스 배치',
        },
      ],
      events: [
        {
          icon: '🏖️', title: '여름 휴가 시즌',
          detail: '주말 여행객 증가, 간식·음료 수요', impact: '여행 간식 +117%, 생수 +82%',
        },
      ],
      checklist: [
        ...heatwaveChecks.slice(0, 2),
        '여행 간식 코너 세팅 (삼각김밥 30개·과자 20봉·김밥 10개) 입구 쪽',
        '생수 대용량 1.5L 20개·2L 15개 입구 아이스박스 세팅',
      ],
      weekPreview: [
        '일: 에어컨 가동 지속, 냉음료 수요',
        '월: 새로운 주 시작, 아이스커피 수요',
      ],
    }),

    // 일요일
    day(6, '주말 마무리, 재고 정비+냉음료', {
      weather: summerHot,
      tips: [
        sundayRecoveryTips.sundayGrocery,
        heatwaveTips.iceCoffeePeak,
        sundayRecoveryTips.nextWeekPrep,
      ],
      events: [
        {
          icon: '🏠', title: '실내 활동 증가',
          detail: '에어컨 가동, 집에서 휴식하는 인원 증가', impact: '냉음료 +70%, 간식 +48%',
        },
      ],
      checklist: [
        ...weeklyResetChecks.slice(0, 2),
        '시원한 음료 (아이스 아메리카노 30개·탄산 40개) 냉장고 전면 배치',
        '다음 주 월요일 냉장 커피 100개·냉면 25개 발주 최종 확인',
      ],
      weekPreview: [
        '월: 새로운 주, 아이스커피+냉면 수요',
        '화: 장마 재개 가능성, 우산 준비',
      ],
    }),
  ],

  // ─────────────────────────────────────
  // 🏘️ 주택 상권 (송파구 잠실동)
  // ─────────────────────────────────────
  residential: [
    // 월요일
    day(0, '방학 시작, 아이 간식 수요', {
      weather: summerHot,
      tips: [
        residentialTips.afterSchoolSnack,
        heatwaveTips.iceCreamEvening,
        heatwaveTips.waterAndIon,
      ],
      events: [
        summerVacationStart,
        heatwaveAlert,
      ],
      checklist: [
        ...heatwaveChecks.slice(1, 3),
        '아이 간식 (젤리 15봉·아이스크림 40개·빙과 30개) 냉동고 전면 세팅',
        '주부 점심 간편식 (도시락 10개·김밥 15개·샌드위치 10개) 냉장고 중앙',
      ],
      weekPreview: [
        '화: 물놀이 시즌, 음료·과자 수요',
        '목: 한강 수영장 오픈, 음료 폭증',
        '토: 워터파크+한강, 매출 최대',
      ],
    }),

    // 화요일
    day(1, '물놀이 시즌, 음료·과자', {
      weather: heatwave,
      tips: [
        {
          text: '아파트 키즈풀·동네 물놀이장 오픈, 간식 폭증',
          action: '과자 25봉·젤리 15봉·음료 40개 입구 쪽 물놀이 코너 세팅',
        },
        heatwaveTips.iceCreamEvening,
        {
          text: '여름 필수템 선크림·모기약 동반 구매율 60%',
          action: '선크림 10개·모기약 8개 계산대 옆 진열, "여름 필수" POP 부착',
        },
      ],
      events: [
        {
          icon: '🏊', title: '물놀이 시즌 시작',
          detail: '아파트 키즈풀, 동네 물놀이장 오픈', impact: '음료 +97%, 과자 +78%',
        },
      ],
      checklist: [
        heatwaveChecks[1],
        '물놀이 간식 진열 (과자 25봉·음료 40개·젤리 15봉) 입구 코너',
        '선크림 10개·모기약 8개 계산대 옆 진열',
        '아이스크림·빙과 2배 재고 (70개), 냉동고 -18°C 이하 확인',
      ],
      weekPreview: [
        '수: 장마 집중호우, 실내 활동',
        '목: 한강 수영장 오픈, 음료 피크',
      ],
    }),

    // 수요일
    day(2, '장마 집중호우, 실내 활동', {
      weather: monsoon,
      tips: [
        rainDayTips.indoorComfortFood,
        rainDayTips.deliveryAlternative,
        rainDayTips.umbrellaUrgent,
      ],
      events: [
        {
          icon: '☔', title: '장마 집중호우',
          detail: '하루 종일 비, 외출 자제', impact: '실내 간식 +58%, 즉석식품 +48%',
        },
      ],
      checklist: [
        ...rainDayChecks.slice(0, 2),
        '실내 간식 (과자 20봉·초콜릿 15개·캔디 10봉) 눈높이 진열 확대',
        '라면 20개·즉석밥 15개·반찬 10개 가족용 대용량 중앙 통로 진열',
      ],
      weekPreview: [
        '목: 한강 수영장 오픈, 음료·간식 폭증',
        '금: 가족 캠핑 준비, 즉석식품 수요',
      ],
    }),

    // 목요일
    day(3, '한강 수영장 오픈, 음료·선크림', {
      weather: heatwave,
      tips: [
        heatwaveTips.waterAndIon,
        heatwaveTips.iceCreamEvening,
        {
          text: '한강 수영장 오픈일 선크림·썬스틱 수요 +203%',
          action: '선크림 15개·썬스틱 10개 계산대 옆, 음료 옆 크로스 진열',
        },
      ],
      events: [
        {
          icon: '🏊', title: '한강 수영장 오픈',
          detail: '여의도·뚝섬·잠실 수영장 오픈', impact: '음료 +178%, 선크림 +197%',
        },
        heatwaveAlert,
      ],
      checklist: [
        heatwaveChecks[2],
        '음료 대량 (생수 80개·이온음료 40개·탄산 30개) 냉장고 전면 풀세팅',
        '선크림 15개·썬스틱 10개 계산대 옆 배치',
        '아이스크림·빙과 3배 재고 (100개), 냉동고 -18°C 이하 확인',
      ],
      weekPreview: [
        '금: 가족 캠핑 준비, 즉석식품 수요',
        '토: 워터파크+한강, 매출 최대',
      ],
    }),

    // 금요일
    day(4, '가족 캠핑 준비, 즉석식품', {
      weather: summerEvening,
      tips: [
        {
          text: '주말 가족 캠핑 예약 증가, 즉석식품 수요 폭증',
          action: '라면 30개·통조림 15개·레토르트 20개 입구 쪽 캠핑 코너 세팅',
        },
        residentialTips.weekendGrocery,
        {
          text: '캠핑용 대용량 생수·음료 수요 +103%',
          action: '생수 2L 20개·음료 1.5L 15개 입구 아이스박스, "캠핑용 추천" POP',
        },
      ],
      events: [
        {
          icon: '🏕️', title: '주말 가족 캠핑',
          detail: '가족 캠핑장 예약 증가', impact: '즉석식품 +122%, 생수 +97%',
        },
      ],
      checklist: [
        ...heatwaveChecks.slice(0, 2),
        '캠핑 즉석식품 (라면 30개·통조림 15개·레토르트 20개) 입구 진열',
        '과자·음료 대용량 패키지 10세트 엔드캡 진열, "캠핑 추천" POP',
      ],
      weekPreview: [
        '토: 워터파크+한강, 음료·간식 폭증',
        '일: 더위 피로, 보양식·이온음료',
      ],
    }),

    // 토요일
    day(5, '워터파크+한강, 음료·간식 폭증', {
      weather: heatwave,
      tips: [
        heatwaveTips.waterAndIon,
        heatwaveTips.iceCreamEvening,
        {
          text: '주말 물놀이 인파로 과자·간식 수요 +195%',
          action: '과자 30봉·간식 20봉 매장 전체 엔드캡 활용, 음료 옆 크로스 배치',
        },
      ],
      events: [
        {
          icon: '🏊', title: '워터파크+한강 피크',
          detail: '주말 물놀이 인파 폭증', impact: '음료 +147%, 아이스크림 +183%',
        },
        heatwaveAlert,
      ],
      checklist: [
        heatwaveChecks[0],
        '음료 최대 재고 (생수 100개·이온음료 50개·탄산 40개·주스 20개) 냉장고 풀가동',
        '아이스크림·빙과 최대 재고 (120개) 냉동고 3대 풀가동',
        '과자·간식 대량 (30봉) 매장 전체 엔드캡 진열',
      ],
      weekPreview: [
        '일: 더위 피로, 보양식·이온음료 수요',
        '월: 새로운 주, 방학 아이 간식 지속',
      ],
    }),

    // 일요일
    day(6, '더위 피로, 보양식·이온음료', {
      weather: summerHot,
      tips: [
        sundayRecoveryTips.hangoverDemand,
        {
          text: '물놀이 후 피로 누적, 보양 간편식 수요 +62%',
          action: '삼계탕 즉석 5개·장어 즉석 3개 냉장고 중앙, "보양식 코너" POP 부착',
        },
        sundayRecoveryTips.nextWeekPrep,
      ],
      events: [
        {
          icon: '😴', title: '주말 더위 피로',
          detail: '물놀이 후 피로 누적', impact: '이온음료 +77%, 보양식 +58%',
        },
      ],
      checklist: [
        ...weeklyResetChecks.slice(0, 2),
        '이온음료 30개·비타민 음료 15개 냉장고 1번 선반 전면 배치',
        '보양 간편식 (삼계탕 5개·장어 3개) 냉장고 중앙, 다음 주 발주 확인',
      ],
      weekPreview: [
        '월: 방학 지속, 아이 간식 수요',
        '화: 물놀이 계속, 음료·과자',
      ],
    }),
  ],

  // ─────────────────────────────────────
  // 🎓 대학가 상권 (관악구 신림동)
  // ─────────────────────────────────────
  university: [
    // 월요일
    day(0, '기말고사 기간, 에너지음료+야식', {
      weather: summerHot,
      tips: [
        examSeasonTips.energyDrinkSurge,
        examSeasonTips.lateNightSnack,
        examSeasonTips.midnightStaffing,
      ],
      events: [
        snuExam('기말고사', 5),
        {
          icon: '🌙', title: '심야 매출 급증',
          detail: '밤 11시~새벽 2시 피크 타임', impact: '심야 시간대 +195%',
        },
      ],
      checklist: [
        ...examSeasonChecks.slice(0, 2),
        '심야 할인 POP 11시 부착, 삼각김밥+음료 세트 할인 구성',
        '새벽 알바 1명 추가 배치 (22시~02시), 인수인계 사항 정리',
      ],
      weekPreview: [
        '화: 시험 후 해방, 아이스 음료 수요',
        '수: 방학 시작, 자취생 즉석식품',
        '금: 방학 MT, 주류·음료 대량',
      ],
    }),

    // 화요일
    day(1, '시험 후 해방, 아이스 음료', {
      weather: heatwave,
      tips: [
        heatwaveTips.iceCoffeePeak,
        {
          text: '기말 종료 해방감, 탄산음료·주스 소비 +152%',
          action: '탄산음료 30개·주스 20개 냉장고 전면, "시험 끝 시원하게" POP 부착',
        },
        examSeasonTips.stressSweets,
      ],
      events: [
        {
          icon: '🎉', title: '시험 종료 해방감',
          detail: '기말고사 끝, 학생들 여가 활동', impact: '아이스 음료 +148%, 간식 +103%',
        },
      ],
      checklist: [
        heatwaveChecks[0],
        '아이스 아메리카노 100개 냉장고 1번 선반 전체 배정',
        '탄산음료 30개·주스 20개 냉장고 전면, 학생 할인 POP 부착',
        '간식 (과자 15봉·초콜릿 20개·젤리 10봉) 눈높이 진열 확대',
      ],
      weekPreview: [
        '수: 방학 시작, 자취생 즉석식품 수요',
        '금: 방학 MT, 주류·음료 대량',
      ],
    }),

    // 수요일
    day(2, '방학 시작, 자취생 즉석식품', {
      weather: summerHot,
      tips: [
        {
          text: '방학 시작, 자취생 집 시간 증가로 즉석식품 +117%',
          action: '라면 30개·냉동밥 15개·냉동식품 20개 중앙 통로 대용량 진열',
        },
        {
          text: '1인 간편식 수요 증가, 도시락·컵밥 선호',
          action: '도시락 10개·컵밥 15개·삼각김밥 20개 냉장고 중앙, 1인 세트 POP',
        },
        {
          text: '방학 생필품 일괄 구매 수요',
          action: '휴지 10개·세제 8개·샴푸 6개 학생용 소포장 입구 쪽 진열',
        },
      ],
      events: [
        summerBreakUniv,
      ],
      checklist: [
        '자취생 즉석식품 (라면 30개·냉동식품 20개) 중앙 통로 대용량 진열',
        '1인 간편식 (도시락 10개·컵밥 15개·삼각김밥 20개) 냉장고 중앙',
        '생필품 소포장 (휴지·세제·샴푸) 입구 쪽 학생용 코너',
        '발주량 전체 -30% 조정 (유동인구 감소 반영)',
      ],
      weekPreview: [
        '목: 여름 인턴 시작, 도시락 수요',
        '금: 방학 MT, 주류·음료 피크',
      ],
    }),

    // 목요일
    day(3, '여름 인턴 시작, 도시락 수요', {
      weather: summerEvening,
      tips: [
        {
          text: '대학생 인턴 출근 시작, 아침 도시락 수요 +97%',
          action: '삼각김밥 20개·샌드위치 10개 아침 7시 냉장고 전면, 커피 20개 옆 배치',
        },
        heatwaveTips.iceCoffeePeak,
        examSeasonTips.energyDrinkSurge,
      ],
      events: [
        {
          icon: '💼', title: '여름 인턴 시작',
          detail: '대학생 여름 인턴십, 아침 출근', impact: '도시락 +103%, 커피 +82%',
        },
      ],
      checklist: [
        '아침 도시락 (삼각김밥 20개·샌드위치 10개) 7시 냉장고 전면 세팅',
        '점심 간편식 (김밥 15개·컵밥 10개) 11시 전 냉장고 앞자리 배치',
        '냉장 커피 50개·에너지드링크 30개 냉장고 3번 선반 전용 배정',
        '냉장고 온도 2~4°C 확인, 아침 피크 대비 계산대 정리',
      ],
      weekPreview: [
        '금: 방학 MT, 주류·음료 대량 판매',
        '토: 축제 시즌, 야외 주류·간식',
      ],
    }),

    // 금요일
    day(4, '방학 MT, 주류·음료 대량', {
      weather: summerHot,
      tips: [
        fridayNightTips.alcoholSurge,
        {
          text: 'MT 단체 구매, 음료 박스 단위 수요 +203%',
          action: '탄산 30개·주스 20개·생수 2L 15개 입구 쪽 MT 코너 세팅',
        },
        fridayNightTips.snackPairing,
      ],
      events: [
        {
          icon: '🏕️', title: '방학 MT 시즌',
          detail: '학과·동아리 MT, 주류·음료 수요 폭증', impact: '주류 +197%, 음료 +147%, 과자 +97%',
        },
        {
          icon: '🌃', title: '저녁 매출 피크',
          detail: '저녁 6~11시 매출 집중', impact: '저녁 시간대 +152%',
        },
      ],
      checklist: [
        ...fridayNightChecks.slice(0, 2),
        '음료 대량 (탄산 30개·주스 20개·생수 2L 15개) MT 코너 입구 세팅',
        'MT용 패키지 할인 POP 부착, 맥주+안주+과자 세트 묶음 구성',
      ],
      weekPreview: [
        '토: 축제 시즌, 야외 주류·간식 최대',
        '일: 알바 시즌, 간편식 수요',
      ],
    }),

    // 토요일
    day(5, '축제 시즌, 야외 주류·간식', {
      weather: heatwave,
      tips: [
        entertainmentTips.clubPreDrink,
        {
          text: '대학가 야외 축제·공연으로 간식·음료 수요 +195%',
          action: '과자 25봉·음료 30개·젤리 15봉 입구 쪽 야외 축제 코너 세팅',
        },
        fridayNightTips.lateNightOps,
      ],
      events: [
        {
          icon: '🎪', title: '여름 축제 시즌',
          detail: '대학가 야외 축제·공연 집중', impact: '주류 +203%, 간식 +103%',
        },
        {
          icon: '🌙', title: '심야 매출 최대',
          detail: '밤 10시~새벽 3시 피크', impact: '심야 시간대 +197%',
        },
      ],
      checklist: [
        ...entertainmentNightChecks.slice(0, 2),
        '야외 간식 대량 (과자 25봉·음료 30개·젤리 15봉) 입구 진열',
        '냉장고 3대 풀가동 확인, 온도 2°C 이하 유지',
      ],
      weekPreview: [
        '일: 해장+회복, 이온음료·해장국',
        '월: 기말고사 재개 (일부 학과)',
      ],
    }),

    // 일요일
    day(6, '해장+회복, 이온음료·해장국', {
      weather: summerHot,
      tips: [
        sundayRecoveryTips.hangoverDemand,
        {
          text: '축제·MT 후 해장라면 수요 +97%',
          action: '컵라면 30개·삼각김밥 20개 아침 9시 진열, 전자레인지 옆 세팅',
        },
        sundayRecoveryTips.nextWeekPrep,
      ],
      events: [
        hangoverSunday,
      ],
      checklist: [
        ...weeklyResetChecks.slice(0, 2),
        '이온음료 20개·숙취해소제 15개 입구 냉장고 1번 선반 "해장 필수" POP',
        '해장 라면 30개·삼각김밥 20개 아침 시간대 전면 진열',
      ],
      weekPreview: [
        '월: 기말고사 재개 (일부), 에너지음료',
        '화: 방학 본격화, 자취생 즉석식품',
      ],
    }),
  ],

  // ─────────────────────────────────────
  // 🎤 유흥 상권 (마포구 홍대입구)
  // ─────────────────────────────────────
  entertainment: [
    // 월요일
    day(0, '주말 후 정리, 시원한 음료', {
      weather: summerHot,
      tips: [
        entertainmentTips.postClubHangover,
        {
          text: '월요일 유흥가 한산, 재고 정리·냉장고 점검 적기',
          action: '유통기한 D-3 이내 상품 할인 스티커, 냉장고 3대 온도 2°C 확인',
        },
        heatwaveTips.iceCoffeePeak,
      ],
      events: [
        {
          icon: '😴', title: '주말 후 회복',
          detail: '주말 유흥 후 해장·숙취 수요', impact: '이온음료 +78%, 숙취해소제 +97%',
        },
      ],
      checklist: [
        ...weeklyResetChecks.slice(0, 2),
        '숙취해소제 15개·이온음료 20개 입구 냉장고 1번 선반 전면 배치',
        '냉장고 3대 온도 확인 (2~4°C), 냉동고 -18°C 이하 점검',
      ],
      weekPreview: [
        '화: 맥주 페스티벌 준비',
        '수: 레이디스나이트, 칵테일·맥주',
        '금: 불금+맥주축제 피크',
      ],
    }),

    // 화요일
    day(1, '맥주 페스티벌 준비', {
      weather: summerEvening,
      tips: [
        {
          text: '홍대 맥주축제 준비, 국내·수입맥주 수요 +147%',
          action: '국내맥주 40개·수입맥주 30개 냉장고 풀세팅, 축제 POP 부착',
        },
        fridayNightTips.snackPairing,
        entertainmentTips.buskingCrowd,
      ],
      events: [
        hongdaeBeerFest,
      ],
      checklist: [
        ...entertainmentNightChecks.slice(0, 2),
        '국내맥주 40개·수입맥주 30개 냉장고 풀가동, 온도 4°C 확인',
        '페스티벌 할인 POP 부착, 맥주+안주 세트 묶음 입구 진열',
      ],
      weekPreview: [
        '수: 레이디스나이트, 칵테일·맥주 수요',
        '금: 불금+맥주축제 피크',
      ],
    }),

    // 수요일
    day(2, '레이디스나이트, 칵테일·맥주', {
      weather: summerHot,
      tips: [
        {
          text: '수요일 레이디스나이트, 와인·칵테일 재료 수요 +62%',
          action: '와인 10병·칵테일용 토닉·사이다 20개 냉장고 전면, 여성 타겟 POP',
        },
        {
          text: '여성 고객 가벼운 안주 선호, 치즈·과일 수요 +42%',
          action: '치즈 스틱 15개·과일컵 10개·초콜릿 20개 주류 옆 크로스 진열',
        },
        entertainmentTips.clubPreDrink,
      ],
      events: [
        hongdaeLadiesNight,
      ],
      checklist: [
        '와인 10병·칵테일용 믹서(토닉·사이다) 20개 냉장고 전면 배치',
        '여성 타겟 안주 (치즈 15개·과일컵 10개·초콜릿 20개) 주류 옆 진열',
        '맥주·소주 30개 냉장고 서브 배치, 일반 주류 수요 유지',
        '냉장고 온도 4°C 확인, 매장 조명·음악 레이디스나이트 분위기',
      ],
      weekPreview: [
        '목: 야외 공연 시즌, 음료 수요',
        '금: 불금+맥주축제 최대 피크',
      ],
    }),

    // 목요일
    day(3, '야외 공연 시즌, 음료 수요', {
      weather: summerEvening,
      tips: [
        entertainmentTips.buskingCrowd,
        heatwaveTips.waterAndIon,
        {
          text: '저녁 클럽데이 증가, 맥주·주류 사전 구매 +117%',
          action: '캔맥주 50개·소주 30병 냉장고 풀가동, 저녁 6시 전 세팅',
        },
      ],
      events: [
        hongdaeBusking,
        {
          icon: '🎤', title: '홍대 클럽데이 증가',
          detail: '목요일 프리파티, 저녁 8시~', impact: '맥주 +122%, 안주 +82%',
        },
      ],
      checklist: [
        ...entertainmentNightChecks.slice(0, 2),
        '음료 (생수 40개·이온음료 20개·탄산 30개) 냉장고 전면 배치',
        '야외 공연 할인 POP 부착, 음료+간식 세트 입구 진열',
      ],
      weekPreview: [
        '금: 불금+맥주축제 최대 피크',
        '토: 클럽+야외 페스티벌, 주류 최대',
      ],
    }),

    // 금요일
    day(4, '불금+맥주축제 피크', {
      weather: heatwave,
      tips: [
        entertainmentTips.clubPreDrink,
        entertainmentTips.fridayClubSeason,
        fridayNightTips.lateNightOps,
      ],
      events: [
        hongdaeBeerFest,
        {
          icon: '🌙', title: '심야 매출 최대',
          detail: '밤 10시~새벽 5시 피크', impact: '심야 시간대 +203%',
        },
      ],
      checklist: [
        ...fridayNightChecks.slice(0, 2),
        '캔맥주 80개·소주 50병·위스키 10병·칵테일 믹서 30개 냉장고 풀가동',
        '새벽 알바 2명 배치 (22시~05시), 재고 보충 체크 밤 11시·새벽 1시·3시',
      ],
      weekPreview: [
        '토: 클럽+야외 페스티벌, 주류 최대',
        '일: 해장+회복, 이온음료·해장국',
      ],
    }),

    // 토요일
    day(5, '클럽+야외 페스티벌, 주류 최대', {
      weather: heatwave,
      tips: [
        entertainmentTips.clubPreDrink,
        {
          text: '야외 EDM 페스티벌, 생수·이온음료 탈수 예방 수요 +148%',
          action: '생수 60개·이온음료 30개 매장 앞 야외 아이스박스 세팅, 입구 POP',
        },
        fridayNightTips.lateNightOps,
      ],
      events: [
        {
          icon: '🎪', title: '클럽+야외 EDM 페스티벌',
          detail: '홍대 클럽데이+야외 EDM 페스티벌', impact: '주류 +195%, 음료 +152%',
        },
        {
          icon: '🌙', title: '주말 심야 최대 피크',
          detail: '밤 11시~새벽 6시 매출 집중', impact: '심야 시간대 +243%',
        },
      ],
      checklist: [
        ...entertainmentNightChecks,
        '생수 60개·이온음료 30개·탄산 40개 매장 앞 야외 아이스박스+냉장고 풀가동',
      ],
      weekPreview: [
        '일: 해장+회복, 이온음료·해장국 폭증',
        '월: 주말 후 정리, 시원한 음료',
      ],
    }),

    // 일요일
    day(6, '해장+회복, 이온음료·해장국', {
      weather: summerHot,
      tips: [
        sundayRecoveryTips.hangoverDemand,
        entertainmentTips.postClubHangover,
        {
          text: '오후 2~6시 해장 식사 집중, 즉석 국물 수요 +147%',
          action: '컵라면 20개·즉석국 10개 온수기 옆 세팅, "해장 코너" POP 부착',
        },
      ],
      events: [
        hangoverSunday,
        {
          icon: '🌤️', title: '오후 회복 시간',
          detail: '오후 2~6시 해장 식사 집중', impact: '오후 시간대 +152%',
        },
      ],
      checklist: [
        ...weeklyResetChecks.slice(0, 2),
        '이온음료 30개·숙취해소제 20개 입구 냉장고 1번 선반, "해장 필수" POP',
        '해장 라면 30개·삼각김밥 20개 전면 진열, 다음 주 발주 확인',
      ],
      weekPreview: [
        '월: 주말 후 정리, 시원한 음료',
        '화: 맥주 페스티벌 재개 준비',
      ],
    }),
  ],
};
