import type { SeasonScenarios } from './types';
import { day } from './compose';
import {
  coldWave,
  coldWaveSevere,
  snowExpected,
  winterMild,
  winterWeekendCold,
  winterSunny,
} from './catalog/weather';
import {
  coldWaveAlert,
  coexITConference,
  yearEndPartyGangnam,
  newYearSeminar,
  lottemartClosed,
  snuExam,
  semesterEndParty,
  mtSeason,
  yearEndClubParty,
  hongdaeFleaMarket,
  hongdaeLadiesNight,
  hangoverSunday,
  studyGroupPeak,
} from './catalog/events';
import {
  coldWaveTips,
  mondayRecoveryTips,
  fridayNightTips,
  weekendBrunchTips,
  sundayRecoveryTips,
  residentialTips,
  entertainmentTips,
  officeTips,
  examSeasonTips,
  rainDayTips,
} from './catalog/tips';
import {
  coldWeatherChecks,
  fridayNightChecks,
  weeklyResetChecks,
  lunchPeakChecks,
  residentialMorningChecks,
  entertainmentNightChecks,
  examSeasonChecks,
} from './catalog/checklists';

export const winterScenarios: SeasonScenarios = {
  // ─────────────────────────────────────
  // 🏢 오피스 상권 — 강남 테헤란로
  // ─────────────────────────────────────
  office: [
    // 월요일
    day(0, '한파 속 월요 출근, 따뜻한 음료+도시락 수요', {
      weather: coldWave,
      tips: [
        mondayRecoveryTips.coffeeDemand,
        coldWaveTips.avoidOutdoorDining,
        coldWaveTips.hotpackEssential,
      ],
      events: [coldWaveAlert, newYearSeminar],
      checklist: [
        ...coldWeatherChecks.slice(0, 2),
        '도시락·삼각김밥 발주량 +28% 확인 (11시 전 냉장고 전면 세팅)',
        '보온 음료 진열대 온도 확인 (55~60°C 유지)',
      ],
      weekPreview: [
        '화: 코엑스 IT 컨퍼런스, 도시락·커피 수요 급증',
        '금: 불금+송년회 주류 2배, 안주 전면 배치',
      ],
    }),

    // 화요일
    day(1, '연말 세미나 시즌, 컨퍼런스 도시락 수요', {
      weather: winterMild,
      tips: [
        officeTips.meetingSnack,
        officeTips.seminarLunchbox,
        rainDayTips.umbrellaUrgent,
      ],
      events: [coexITConference],
      checklist: [
        ...lunchPeakChecks.slice(0, 2),
        '간식 회의용 묶음 10팩 계산대 앞 진열, 묶음 가격 POP 부착',
        '3단 우산 10개 입구 배치 (오후 눈 예보 30% 대비)',
      ],
      weekPreview: [
        '수: 주중 회식 시즌 본격화, 안주류 발주 확대',
        '목: 눈 예보, 핫음료·우산 세팅',
      ],
    }),

    // 수요일
    day(2, '주중 피크, 회식 시즌 안주류 선구매', {
      weather: winterSunny,
      tips: [
        {
          text: '수요일 도시락 주중 최대 수요일',
          action: '삼각김밥 35개·도시락 18개 냉장고 전면 세팅, 11시 전 완료',
        },
        fridayNightTips.snackPairing,
        {
          text: '건조특보 발령, 음료 수요 +23%',
          action: '생수 500ml 40개·이온음료 20개 냉장고 2번 선반 전면, 정전기 주의 POP 부착',
        },
      ],
      events: [
        {
          icon: '🍻',
          title: '송년 회식 시즌 본격화',
          detail: '12월~1월 집중 기간 · 저녁 6시~',
          impact: '저녁 주류·안주 수요 +58%',
        },
      ],
      checklist: [
        ...lunchPeakChecks.slice(0, 2),
        '마른안주 20봉·견과류 15봉 주류 냉장고 옆 크로스 진열',
        '저녁 소주 30병·맥주 40개 냉장 세팅 (6시 전 완료)',
      ],
      weekPreview: [
        '목: 오후 눈 예보 3cm, 우산·핫음료 긴급 세팅',
        '금: 불금 송년회 피크, 주류 평소 2배 확보',
      ],
    }),

    // 목요일
    day(3, '눈 예보, 우산·핫초코·간식 긴급 세팅', {
      weather: snowExpected,
      tips: [
        coldWaveTips.hotDrinkDemand,
        rainDayTips.umbrellaUrgent,
        rainDayTips.deliveryAlternative,
      ],
      events: [
        {
          icon: '🌨️',
          title: '첫눈 예보 · 퇴근길 교통 혼잡',
          detail: '오후 2시~ · 예상 적설량 3cm',
          impact: '점심 전 우산·핫음료 수요 급증',
        },
      ],
      checklist: [
        '3단 우산 15개·비닐우산 20개 입구 우산꽂이 옆 진열, 가격표 부착',
        '핫초코 20개·캔커피 30개 입구 히팅 선반 배치, 보온병 상태 점검',
        '즉석밥 15개·반찬류 10개·라면 20개 중앙 통로 진열 (배달 대체 수요)',
        '입구 미끄럼 주의 표시판 세팅, 우산 비닐 봉투 200장 보충',
      ],
      weekPreview: [
        '금: 불금 송년회 최대 피크, 주류 3배 확보',
        '주말: 한파 지속, 실내 활동 간식 패밀리팩 강화',
      ],
    }),

    // 금요일
    day(4, '불금+송년회, 주류·안주 피크', {
      weather: coldWave,
      tips: [
        fridayNightTips.alcoholSurge,
        fridayNightTips.snackPairing,
        officeTips.overtimeFood,
      ],
      events: [
        yearEndPartyGangnam,
        {
          icon: '🏢',
          title: '야근 마무리 러시',
          detail: '저녁 7시~ · 주말 전 업무 마감',
          impact: '즉석식품·커피 +78%',
        },
      ],
      checklist: [
        ...fridayNightChecks.slice(0, 2),
        '컵라면 15개·삼각김밥 10개·커피 10개 저녁 6시 세팅 (야근 수요)',
        '야간 알바 스케줄 최종 확인 (새벽 2시까지)',
      ],
      weekPreview: [
        '토: 주말 한파, 카페 대체 핫음료 수요',
        '일: 재고 정리 및 다음 주 발주 계획',
      ],
    }),

    // 토요일
    day(5, '주말 한파, 카페 대체 핫음료·간식', {
      weather: winterWeekendCold,
      tips: [
        coldWaveTips.indoorSnackFamily,
        weekendBrunchTips.brunchDemand,
        {
          text: '주말 카페 대체 수요, 프리미엄 커피 +38%',
          action: '프리미엄 캔커피 20개·RTD 라떼 15개 냉장고 1번 선반, "카페 대신 편의점" POP 부착',
        },
      ],
      events: [
        {
          icon: '❄️',
          title: '주말 한파특보 지속',
          detail: '아침 체감온도 -10°C · 외출 최소화',
          impact: '외출 감소, 근거리 편의점 수요 집중',
        },
      ],
      checklist: [
        ...coldWeatherChecks.slice(0, 2),
        '샌드위치 15개·우유 10개·주스 10개 냉장고 2번 선반 (10시 전 브런치 세팅)',
        '다음 주 월요일 도시락 25개·삼각김밥 30개 발주 확인',
      ],
      weekPreview: [
        '일: 주간 재고 정리, 유통기한 점검',
        '다음 월: 신년 업무 시작, 커피·도시락 수요 회복',
      ],
    }),

    // 일요일
    day(6, '정리의 날, 재고 정비·발주 확인', {
      weather: winterMild,
      tips: [
        mondayRecoveryTips.weekStartReset,
        sundayRecoveryTips.nextWeekPrep,
        {
          text: '일요 저녁 수요 감소, 유통기한 임박 상품 정리',
          action: '유통기한 D-3 이내 상품 확인, 할인 스티커 부착 후 입구 전면 배치',
        },
      ],
      events: [
        {
          icon: '📋',
          title: '주간 재고 정리의 날',
          detail: '일요일 오후 3시~ · 재고 점검',
          impact: '재고 회전율 점검, 폐기 최소화',
        },
      ],
      checklist: [
        ...weeklyResetChecks.slice(0, 2),
        '월요일 삼각김밥 25개·도시락 12개 발주 최종 확인',
        '보온 음료 진열대 히터 작동 점검, 핫팩 50개 입구 세팅 확인',
      ],
      weekPreview: [
        '다음 월: 기온 소폭 상승, 음료 수요 변화 대비',
        '신년 업무 재개, 세미나 시즌 커피·도시락 수요 증가',
      ],
    }),
  ],

  // ─────────────────────────────────────
  // 🏘️ 주택 상권 — 송파구 잠실동
  // ─────────────────────────────────────
  residential: [
    // 월요일
    day(0, '대형마트 휴무, 신선식품 수요 전환', {
      weather: coldWaveSevere,
      tips: [
        residentialTips.martClosed,
        coldWaveTips.avoidOutdoorDining,
        residentialTips.afterSchoolSnack,
      ],
      events: [
        lottemartClosed,
        {
          icon: '❄️',
          title: '한파특보 발령',
          detail: '아침 -5°C · 체감 -12°C · 외출 최소화',
          impact: '외출 감소, 근거리 편의점 구매 집중',
        },
      ],
      checklist: [
        ...residentialMorningChecks.slice(0, 2),
        '즉석밥 20개·반찬류 10개 중앙 통로 전면 배치 (한파 간편식 수요)',
        '핫팩 30개·손난로 20개 입구 어깨높이 진열',
      ],
      weekPreview: [
        '화: 학교 하교 시간(3~5시) 아이 간식 피크',
        '목: 설날 준비 시작, 선물세트 발주',
      ],
    }),

    // 화요일
    day(1, '학교 하교 시간, 아이 간식 피크', {
      weather: coldWave,
      tips: [
        residentialTips.afterSchoolSnack,
        residentialTips.eveningGrocery,
        {
          text: '엄마 장보기 시간대 (오후 4~6시) 신선식품 수요',
          action: '우유 10개·두부 8개·계란 5판 냉장코너 전면, "오늘의 장보기" POP 부착',
        },
      ],
      events: [
        {
          icon: '🏫',
          title: '잠실초등학교 하교',
          detail: '오후 3시 하교 · 학생 350명',
          impact: '간식·문구류 수요 집중 (3시~5시)',
        },
      ],
      checklist: [
        '초코우유 15개·요거트 20개·젤리 10봉 계산대 앞 저높이 진열 (3시 전 완료)',
        '즉석밥 20개·라면 15개·냉동식품 10개 중앙 통로 전면 배치',
        '유제품 유통기한 D-2 이내 확인, 할인 스티커 부착',
        '문구류(연필·지우개·노트) 계산대 옆 진열 확인',
      ],
      weekPreview: [
        '수: 올겨울 최강 한파, 실내 간식 패밀리팩 강화',
        '목: 설날 선물세트(스팸·참치) 눈높이 진열',
      ],
    }),

    // 수요일
    day(2, '올겨울 최강 한파, 실내 간식 집중', {
      weather: coldWaveSevere,
      tips: [
        coldWaveTips.indoorSnackFamily,
        coldWaveTips.hotDrinkDemand,
        {
          text: '실내 활동 증가, 초콜릿·사탕·젤리 소비 +48%',
          action: '초콜릿바 20개·사탕 15봉·젤리 10봉 간식 코너 눈높이 확대 진열',
        },
      ],
      events: [
        {
          icon: '❄️',
          title: '올겨울 최강 한파',
          detail: '아침 -6°C · 낮에도 영하 · 수도 동파 주의',
          impact: '외출 급감, 실내 간식 +82%',
        },
      ],
      checklist: [
        '가족용 과자 패밀리팩 8종 엔드캡 진열, 핫초코 믹스 20박스 보충',
        '핫초코 20개·캔커피 30개 입구 히팅 선반 배치, 보온병 상태 점검',
        '실내 간식류(초콜릿·사탕·젤리) 코너 2배 확대 진열',
        '수도 동파 방지 테이프·보온재 5개 생활용품 코너 배치',
      ],
      weekPreview: [
        '목: 설날 준비 본격화, 선물세트·명절 식재료 발주',
        '금: 가족 외식 대체, 즉석 피자·치킨 강화',
      ],
    }),

    // 목요일
    day(3, '설날 준비, 선물세트·명절 식재료', {
      weather: coldWave,
      tips: [
        {
          text: '설날 D-7, 선물세트 수요 시작',
          action: '스팸세트 10개·참치세트 8개 입구 엔드캡 눈높이 진열, "설날 선물 추천" POP 부착',
        },
        {
          text: '명절 음식 준비 재료 수요 시작',
          action: '식용유 10개·간장 8개·조미료 5종 조리코너 전면, 세트 묶음 할인 표시',
        },
        {
          text: '귀성 준비 간식·음료 선물용 포장',
          action: '과자 선물팩 10세트·음료 6캔팩 15개 입구 쪽 진열, 포장 리본 비치',
        },
      ],
      events: [
        {
          icon: '🎁',
          title: '설날 선물 준비 시즌',
          detail: '설날 1주일 전 · 선물세트 피크',
          impact: '선물세트 +117%, 명절 식재료 수요 급증',
        },
      ],
      checklist: [
        '선물세트(스팸·참치) 대량 진열, 재고 20세트 이상 확보',
        '명절 조미료·식용유·간장 세트 조리코너 전면 배치',
        '선물 포장재(리본·종이백) 30개 계산대 옆 비치',
        '귀성용 간식 세트 10개 구성 완료 (과자+음료 묶음)',
      ],
      weekPreview: [
        '금: 가족 외식 대체, 즉석식품·피자 강화',
        '주말: 설날 최종 준비, 신선식품 추가 발주',
      ],
    }),

    // 금요일
    day(4, '가족 외식 대체, 즉석식품 강화', {
      weather: winterMild,
      tips: [
        {
          text: '금요일 가족 외식 대체, 즉석 피자·치킨 +70%',
          action: '냉동 피자 10개·즉석 치킨 8개·떡볶이 10개 냉동코너 전면, "오늘 저녁은 집에서" POP',
        },
        residentialTips.weekendGrocery,
        residentialTips.afterSchoolSnack,
      ],
      events: [
        {
          icon: '🍕',
          title: '금요일 가족 저녁 수요',
          detail: '오후 6시~ · 외식 대체 피크',
          impact: '즉석식품·피자·치킨 +70%',
        },
      ],
      checklist: [
        '냉동 피자 10개·즉석 치킨 8개·떡볶이 10개 냉동코너 전면 세팅 (5시 전)',
        '생필품·세제 10개·간편식 15개 입구 쪽 진열, 가격 POP 부착',
        '아이 간식(초코우유 15개·젤리 10봉) 3시 전 저높이 진열',
        '주말 알바 스케줄 최종 확인',
      ],
      weekPreview: [
        '토: 한파 지속, 실내 활동 간식·브런치 강화',
        '일: 가족 브런치 피크, 빵·유제품 최대 확보',
      ],
    }),

    // 토요일
    day(5, '주말 한파, 실내 간식·브런치', {
      weather: winterWeekendCold,
      tips: [
        coldWaveTips.indoorSnackFamily,
        weekendBrunchTips.brunchDemand,
        {
          text: '가족 보드게임·영화의 날, 스낵 동반 구매 +62%',
          action: '팝콘 10개·감자칩 패밀리팩 8봉·음료 묶음 10세트 엔드캡 진열',
        },
      ],
      events: [
        {
          icon: '❄️',
          title: '주말 한파로 실내 활동 집중',
          detail: '외출 감소 · 집콕 증가',
          impact: '실내 간식 +58%, 외출용 -38%',
        },
      ],
      checklist: [
        '가족용 과자 패밀리팩 8종 엔드캡 진열, 핫초코 믹스 20박스 보충',
        '샌드위치 15개·우유 10개·주스 10개 냉장고 2번 선반 (10시 전 브런치 세팅)',
        '팝콘·감자칩·음료 묶음 가족 패키지 10세트 구성',
        '따뜻한 음료(핫초코·커피) 히팅 선반 온도 확인 (55~60°C)',
      ],
      weekPreview: [
        '일: 가족 브런치 피크, 빵·유제품 최대 확보',
        '다음 월: 마트 휴무일, 신선식품 대체 수요 대비',
      ],
    }),

    // 일요일
    day(6, '가족 브런치 피크, 유제품·빵', {
      weather: winterMild,
      tips: [
        weekendBrunchTips.brunchDemand,
        {
          text: '일요 브런치 수요 최대, 빵·계란·치즈 +90%',
          action: '식빵 10개·크루아상 15개·계란 5판·슬라이스 치즈 10개 냉장 전면 배치',
        },
        sundayRecoveryTips.nextWeekPrep,
      ],
      events: [
        {
          icon: '🥐',
          title: '일요 브런치 타임',
          detail: '오전 10시~ · 가족 단위 방문 집중',
          impact: '빵·유제품 +90%',
        },
      ],
      checklist: [
        ...residentialMorningChecks.slice(0, 2),
        '식빵·크루아상·계란·치즈 브런치 세트 냉장 전면 (9시 전 세팅)',
        '다음 주 월요 우유 20개·빵 15개·계란 10판 발주 확인 (마트 휴무 대비)',
      ],
      weekPreview: [
        '다음 월: 기온 소폭 상승, 외출 증가 예상',
        '다음 월 마트 휴무, 신선식품 대체 수요 +52%',
      ],
    }),
  ],

  // ─────────────────────────────────────
  // 🎓 대학가 상권 — 관악구 신림동
  // ─────────────────────────────────────
  university: [
    // 월요일
    day(0, '기말고사 D-5, 에너지음료+간식 폭증', {
      weather: coldWave,
      tips: [
        examSeasonTips.energyDrinkSurge,
        coldWaveTips.hotDrinkDemand,
        examSeasonTips.lateNightSnack,
      ],
      events: [
        snuExam('기말고사', 5),
        {
          icon: '❄️',
          title: '한파로 도서관·스터디카페 만석',
          detail: '신림 관악도서관 대기줄 30분',
          impact: '편의점 간식·커피 구매 빈도 +42%',
        },
      ],
      checklist: [
        ...examSeasonChecks.slice(0, 2),
        '핫초코 20개·캔커피 30개 입구 히팅 선반 배치 (한파 대비)',
        '새벽 알바 스케줄 조정 (22시~02시 1명 추가)',
      ],
      weekPreview: [
        '화: 시험 D-4, 야간 매출 +122% 대비',
        '금: 종강 파티, 주류 평소 3배 확보 필수',
      ],
    }),

    // 화요일
    day(1, '시험 기간 본격화, 야간 수요 급증', {
      weather: coldWave,
      tips: [
        examSeasonTips.energyDrinkSurge,
        examSeasonTips.midnightStaffing,
        coldWaveTips.hotpackEssential,
      ],
      events: [
        snuExam('기말고사', 4),
        studyGroupPeak,
      ],
      checklist: [
        '에너지드링크 3종(핫식스 40개·레드불 30개·몬스터 20개) 재보충 확인',
        '컵라면 40개·삼각김밥 30개 밤 9시 추가 진열, 전자레인지 옆 배치',
        '핫팩 50개·따뜻한 음료 히팅 선반 보충 (야간 한파 대비)',
        '새벽 알바 인력 확인 (22시~02시 풀배치)',
      ],
      weekPreview: [
        '수: 야식 타임 최대 피크, 라면·삼각김밥 2배',
        '목: 종강 전 마지막 스터디, 커피·간식 최종 보충',
      ],
    }),

    // 수요일
    day(2, '야식 피크, 라면·삼각김밥·스트레스 간식', {
      weather: coldWave,
      tips: [
        examSeasonTips.lateNightSnack,
        examSeasonTips.stressSweets,
        examSeasonTips.vitaminDemand,
      ],
      events: [
        {
          icon: '🍜',
          title: '야식 타임 최대 피크',
          detail: '밤 11시~새벽 2시 · 도서관 귀가 학생',
          impact: '라면 +147%, 삼각김밥 +97%',
        },
      ],
      checklist: [
        '컵라면 40개·삼각김밥 30개 밤 9시 추가 진열 (야식 최대 피크)',
        '초콜릿바 30개·젤리 20봉·사탕 15봉 계산대 옆 임펄스존 배치',
        '에너지드링크 3종 재고 확인, 소진 시 즉시 보충',
        '새벽 매출 집계 확인 후 목요 발주량 조정',
      ],
      weekPreview: [
        '목: 종강 전 마지막 스퍼트, 커피·에너지드링크 최종',
        '금: 종강 파티 주류 폭발, 맥주·소주 3배 확보',
      ],
    }),

    // 목요일
    day(3, '종강 전 마지막 스터디, 커피·간식', {
      weather: winterSunny,
      tips: [
        {
          text: '종강 D-1, 마지막 스퍼트 커피 수요 +77%',
          action: '캔커피 30개·아메리카노 20개 냉장고 전면, 에너지드링크 옆 크로스 배치',
        },
        examSeasonTips.stressSweets,
        {
          text: '내일 종강 파티 대비 주류 대량 발주',
          action: '캔맥주 100개·소주 60병·막걸리 20병 발주 확정, 냉장고 2대 풀가동 준비',
        },
      ],
      events: [
        {
          icon: '📚',
          title: '종강 전날 최종 스터디',
          detail: '도서관·스터디카페 새벽까지 만석',
          impact: '커피 +78%, 간식 +62%',
        },
      ],
      checklist: [
        '캔커피 30개·에너지드링크 3종 재고 최종 확인',
        '초콜릿바 30개·젤리 20봉 계산대 옆 임펄스존 보충',
        '내일 주류 발주 확정 (맥주 100개·소주 60병·막걸리 20병)',
        '종강 파티 대비 얼음 20봉·일회용컵 200개 확보',
      ],
      weekPreview: [
        '금: 종강 파티 주류 최대, 새벽 3시까지 수요 지속',
        '토: MT 시즌 대량 구매, 박스 단위 과자·음료',
      ],
    }),

    // 금요일
    day(4, '종강 파티, 주류 폭증', {
      weather: winterSunny,
      tips: [
        {
          text: '종강 파티 시작, 주류 평소 3배 폭증',
          action: '캔맥주 100개·소주 60병·막걸리 20병 냉장고 2대 풀가동, 5시 전 세팅',
        },
        fridayNightTips.snackPairing,
        fridayNightTips.lateNightOps,
      ],
      events: [
        semesterEndParty,
        {
          icon: '🍻',
          title: '신림동 파티 러시',
          detail: '밤 9시~ · 술집 만석 · 편의점 대체',
          impact: '편의점 주류 구매 폭증 +195%',
        },
      ],
      checklist: [
        ...fridayNightChecks.slice(0, 2),
        '얼음 20봉·일회용컵 200개 재고 확인 (파티 수요)',
        '새벽 알바 2명 추가 배치 (22시~04시)',
      ],
      weekPreview: [
        '토: MT 시즌 대량 구매, 과자·음료 박스 단위',
        '일: 방학 시작, 발주량 50%로 감축 준비',
      ],
    }),

    // 토요일
    day(5, 'MT 시즌, 과자·음료 대량 구매', {
      weather: winterSunny,
      tips: [
        {
          text: 'MT 시즌 대량 구매, 박스 단위 주문 급증',
          action: '과자 박스(10종) 매장 앞 적재, 음료 24캔팩 15박스 입구 진열',
        },
        {
          text: '단체 주류 구매, 맥주·소주 박스 할인 수요',
          action: '맥주 24캔팩 10박스·소주 20병들이 5박스 입구 쪽 진열, 묶음 할인 POP 부착',
        },
        {
          text: 'MT 준비물 일회용품·간편식 세트 동반 구매',
          action: '일회용 접시 200개·종이컵 300개·간편식(즉석밥·라면) 세트 10개 구성',
        },
      ],
      events: [mtSeason],
      checklist: [
        '과자·음료 박스 단위 대량 진열 (매장 앞 적재)',
        '맥주 24캔팩 10박스·소주 5박스 입구 쪽 묶음 할인 세팅',
        'MT 세트 상품 10개 구성 (일회용품+간편식+간식)',
        '대량 구매 포장재(대형 봉투·테이프) 30개 확보',
      ],
      weekPreview: [
        '일: 방학 시작, 유동인구 급감 대비 발주 축소',
        '다음 주: 방학 모드 전환, 최소 운영 체제',
      ],
    }),

    // 일요일
    day(6, '방학 시작, 발주 축소·재고 정리', {
      weather: winterMild,
      tips: [
        {
          text: '방학 시작, 유동인구 -57% 급감',
          action: '발주량 평소의 50%로 즉시 조정, 신선식품 최소 발주로 전환',
        },
        {
          text: 'MT 후 잔류 수요 최소화, 재고 정리 필수',
          action: '유통기한 D-3 이내 상품 할인 스티커 부착, 입구 전면 배치',
        },
        {
          text: '방학 기간 운영 계획 수립 필요',
          action: '야간 알바 축소(02시→24시), 발주 주기 주 2회로 변경 계획 작성',
        },
      ],
      events: [
        {
          icon: '🏖️',
          title: '방학 시작 · 학생 귀향',
          detail: '캠퍼스 유동인구 -57%',
          impact: '전체 수요 -57%, 발주 대폭 축소 필요',
        },
      ],
      checklist: [
        ...weeklyResetChecks.slice(0, 2),
        '방학 발주량 50% 감축 확정 (신선식품 최소화)',
        '방학 기간 야간 운영 축소 계획 수립 (24시까지로 변경)',
      ],
      weekPreview: [
        '다음 주: 방학 모드, 고시생 잔류 수요 중심 최소 운영',
        '설날: 귀성 학생 일시 복귀, 간식·음료 소폭 증가',
      ],
    }),
  ],

  // ─────────────────────────────────────
  // 🎤 유흥가 상권 — 마포구 홍대입구
  // ─────────────────────────────────────
  entertainment: [
    // 월요일
    day(0, '주말 후 재고 정리, 평일 최소 운영', {
      weather: winterMild,
      tips: [
        mondayRecoveryTips.weekStartReset,
        {
          text: '월요일 유흥 수요 최저, 발주량 30%로 축소',
          action: '주류 발주 평소의 30%로 조정, 신선 안주류 최소화, 음료·간식 소량만 진열',
        },
        {
          text: '주말 주류 소진량 점검 후 재고 보충 계획',
          action: '맥주·소주 잔여 재고 카운트, 수요일 레이디스나이트 대비 와인 10병 발주',
        },
      ],
      events: [
        {
          icon: '📦',
          title: '주말 재고 정리일',
          detail: '월요일 오전 · 주간 발주 계획',
          impact: '발주량 조정 및 유통기한 확인',
        },
      ],
      checklist: [
        '유통기한 D-3 이내 상품 확인, 할인 스티커 부착 후 전면 배치',
        '주말 주류 소진량 점검 (맥주·소주·와인 각 잔여 카운트)',
        '평일 발주 계획 수립 (수: 와인, 금: 맥주·소주 대량)',
        '매장 바닥·선반 청소 및 POP 교체',
      ],
      weekPreview: [
        '화: 소모임 시즌, 와인·맥주 소량 다품종',
        '금: 송년회 불금 피크, 주류 3배 확보 필수',
      ],
    }),

    // 화요일
    day(1, '소모임 시즌, 와인·맥주 다품종', {
      weather: winterSunny,
      tips: [
        {
          text: '화요일 소모임 시즌, 와인 다품종 수요',
          action: '와인 5종(레드 3·화이트 2) 각 3병 냉장 진열, "소모임 추천" POP 부착',
        },
        {
          text: '안주 소량 구매, 소포장 선호',
          action: '마른안주 소포장 10봉·견과류 소포장 8봉·치즈 5개 와인 옆 크로스 진열',
        },
        {
          text: '평일 배달 음식점 직원 수요',
          action: '캔커피 15개·에너지드링크 10개·간식 10봉 소량 진열',
        },
      ],
      events: [
        {
          icon: '🍷',
          title: '홍대 와인바 평일 모임',
          detail: '저녁 7시~ · 소규모 5~10명 모임',
          impact: '와인·안주 소량 다품종 수요',
        },
      ],
      checklist: [
        '와인 5종 각 3병 냉장 진열 (레드·화이트 구분)',
        '안주 소포장(마른안주·견과류·치즈) 와인 옆 크로스 진열',
        '배달용 음료·간식 소량 준비',
        '평일 알바 스케줄 확인 (24시까지)',
      ],
      weekPreview: [
        '수: 레이디스나이트, 와인·칵테일 믹서 강화',
        '목: 송년회 사전 준비, 주류 대량 발주 시작',
      ],
    }),

    // 수요일
    day(2, '레이디스나이트, 와인·칵테일 수요', {
      weather: winterSunny,
      tips: [
        {
          text: '수요일 레이디스나이트, 와인·칵테일 믹서 +58%',
          action: '와인 10병·토닉워터 15개·사이다 10개·레몬 5팩 냉장 전면, "레이디스나이트" POP',
        },
        {
          text: '여성 타겟 안주, 가벼운 스낵 선호',
          action: '과일컵 8개·초콜릿 15개·치즈 10개 와인 옆 진열, 소포장 강조',
        },
        entertainmentTips.clubPreDrink,
      ],
      events: [hongdaeLadiesNight],
      checklist: [
        '와인 10병(레드 6·화이트 4) 냉장 전면 진열',
        '칵테일 믹서(토닉 15개·사이다 10개·레몬 5팩) 주류 옆 배치',
        '여성 타겟 안주(과일컵·초콜릿·치즈) 크로스 진열',
        '매장 분위기 점검 (조명·음악·POP 세팅)',
      ],
      weekPreview: [
        '목: 송년회 사전 준비, 맥주·소주 대량 발주',
        '금: 불금 송년회 최대 피크, 주류 3배 확보',
      ],
    }),

    // 목요일
    day(3, '송년회 사전 준비, 주류 대량 발주', {
      weather: winterMild,
      tips: [
        {
          text: '금요일 송년회 대비 주류 대량 발주 시작',
          action: '캔맥주 120개·소주 80병·막걸리 20병 발주 확정, 냉장고 3대 풀가동 준비',
        },
        {
          text: '목요일 소규모 회식 수요 시작',
          action: '맥주 30개·소주 20병 냉장 세팅, 마른안주 15봉·견과류 10봉 주류 옆 배치',
        },
        {
          text: '내일 피크 대비 얼음·일회용품 대량 확보',
          action: '얼음 30봉·일회용컵 300개·비닐봉투 200장 창고 확보, 5시 전 입고 확인',
        },
      ],
      events: [
        {
          icon: '🍻',
          title: '송년회 시즌 수요 증가 시작',
          detail: '12월~1월 집중 · 목요일부터 상승',
          impact: '목요일부터 주류 수요 +38% 시작',
        },
      ],
      checklist: [
        '금요일 주류 대량 발주 확정 (맥주 120개·소주 80병·막걸리 20병)',
        '안주 재고 중량 확보 (마른안주 30봉·견과류 20봉)',
        '얼음 30봉·일회용컵 300개 입고 확인',
        '야간 알바 추가 확인 (금: 22시~04시 2명)',
      ],
      weekPreview: [
        '금: 불금 송년회 최대 피크, 주류+안주 3배',
        '토: 플리마켓+클럽, 낮 간식+밤 주류 이중 수요',
      ],
    }),

    // 금요일
    day(4, '불금+송년회 피크, 주류·안주 최대', {
      weather: winterSunny,
      tips: [
        entertainmentTips.clubPreDrink,
        fridayNightTips.snackPairing,
        fridayNightTips.lateNightOps,
      ],
      events: [
        yearEndClubParty,
        {
          icon: '🍻',
          title: '홍대 송년회 집중일',
          detail: '저녁 6시~ · 전 업종 송년회 · 술집 만석',
          impact: '편의점 주류 +243%, 안주 +178%',
        },
      ],
      checklist: [
        ...entertainmentNightChecks.slice(0, 2),
        '얼음 30봉·일회용컵 300개 최대 확보',
        '새벽 알바 2명 이상 배치 (22시~04시)',
      ],
      weekPreview: [
        '토: 플리마켓 낮 간식 +103%, 클럽 밤 주류 +117%',
        '일: 해장 수요 피크, 라면·숙취해소제 입구 세팅',
      ],
    }),

    // 토요일
    day(5, '플리마켓+클럽, 낮 간식·밤 주류 이중 수요', {
      weather: winterSunny,
      tips: [
        entertainmentTips.buskingCrowd,
        {
          text: '홍대 플리마켓 유동인구, 커피·샌드위치 +97%',
          action: '캔커피 30개·샌드위치 20개·핫도그 15개 매장 앞 야외 진열대 세팅 (12시 전)',
        },
        entertainmentTips.clubPreDrink,
      ],
      events: [
        hongdaeFleaMarket,
        {
          icon: '🎤',
          title: '클럽 이벤트 4건',
          detail: '밤 11시~ · 새벽 4시 · 동시 진행',
          impact: '야간 주류 +122%',
        },
      ],
      checklist: [
        '낮 음료·간식(캔음료 40개·과자 20봉) 매장 앞 야외 진열대 세팅 (12시 전)',
        '커피 30개·샌드위치 20개·핫도그 15개 확보',
        '야간 주류(맥주 80개·소주 50병) 냉장 풀가동, 밤 10시 전 세팅',
        '주말 알바 풀가동 확인 (낮 2명·밤 2명)',
      ],
      weekPreview: [
        '일: 해장 수요 피크, 라면·숙취해소제 입구 세팅',
        '다음 월: 재고 정리, 평일 모드 전환',
      ],
    }),

    // 일요일
    day(6, '해장 수요 피크, 라면·숙취해소제', {
      weather: winterMild,
      tips: [
        entertainmentTips.postClubHangover,
        sundayRecoveryTips.hangoverDemand,
        {
          text: '일요 브런치 수요, 샌드위치·주스 오전 피크',
          action: '샌드위치 15개·주스 10개·우유 10개 냉장고 전면 (10시 전 세팅)',
        },
      ],
      events: [hangoverSunday],
      checklist: [
        '컵라면 30개·삼각김밥 20개·이온음료 20개 새벽 2시 보충',
        '숙취해소제 15개·이온음료 20개 입구 냉장고 1번 선반, "해장 필수" POP',
        '브런치 샌드위치 15개·주스 10개 오전 10시 전 세팅',
        '주간 재고 정리 및 다음 주 발주 계획 수립',
      ],
      weekPreview: [
        '다음 월: 재고 정리, 평일 최소 운영',
        '다음 금: 송년회 시즌 지속, 주류 대량 발주',
      ],
    }),
  ],
};
