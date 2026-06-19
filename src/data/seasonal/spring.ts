import type { SeasonScenarios } from './types';
import { day } from './compose';
import { fineDustBad, springRain, cherryBlossomPerfect, springMild, springWindy } from './catalog/weather';
import {
  lottemartClosed,
  hangangCherryBlossom,
  semesterStart,
  mtSeason,
  hongdaeFleaMarket,
  hongdaeBusking,
  hongdaeLadiesNight,
} from './catalog/events';
import {
  fineDustTips,
  rainDayTips,
  cherryBlossomTips,
  mondayRecoveryTips,
  fridayNightTips,
  weekendBrunchTips,
  residentialTips,
  entertainmentTips,
  officeTips,
} from './catalog/tips';
import {
  fineDustChecks,
  rainDayChecks,
  cherryBlossomChecks,
  lunchPeakChecks,
  weeklyResetChecks,
  weekendOutingChecks,
} from './catalog/checklists';

export const springScenarios: SeasonScenarios = {
  // ─────────────────────────────────────
  // 🏢 오피스 상권 (강남 테헤란로)
  // ─────────────────────────────────────
  office: [
    day(0, '미세먼지 나쁨 - 실내 근무 대응', {
      weather: fineDustBad,
      tips: [
        fineDustTips.maskDemand,
        fineDustTips.indoorSnack,
        fineDustTips.throatCare,
      ],
      events: [
        { icon: '😷', title: '미세먼지 주의보', detail: 'PM2.5 농도 68μg/m³ (나쁨)', impact: '마스크 매출 +178%, 외출 간식 -38%' },
        { icon: '💼', title: '월초 업무 집중', detail: '점심시간 분산 경향 (11:30~14:00)', impact: '샐러드·샌드위치 수요 분산, 도시락 +28%' },
      ],
      checklist: [
        ...fineDustChecks.slice(0, 2),
        '점심 도시락(삼각김밥 25개·샌드위치 15개) 11시 전 냉장고 전면 세팅',
        '실내 간식(초콜릿 20개·과자 15봉) 눈높이 진열',
      ],
      weekPreview: [
        '화: 신입사원 OT 시즌, 도시락·간식 수요 증가',
        '수: 봄비 예보 70%, 우산·따뜻한 음료 준비',
      ],
    }),

    day(1, '신입사원 OT 시즌 - 도시락 수요', {
      weather: springMild,
      tips: [
        officeTips.seminarLunchbox,
        { text: '신입사원 환영 간식 대량 구매 시즌', action: '커피믹스 20박스·과자 선물세트 10개 입구 엔드캡 진열, "신입사원 환영" POP 부착' },
        mondayRecoveryTips.lunchboxPeak,
      ],
      events: [
        semesterStart,
      ],
      checklist: [
        ...lunchPeakChecks.slice(0, 2),
        '커피믹스 20박스·과자 선물세트 10개 입구 배치',
        '점심 피크(11:30~13:00) 계산대 2명 배치',
      ],
      weekPreview: [
        '수: 봄비 예보 (70%), 우산·비옷·따뜻한 음료 준비',
        '목: 날씨 회복, 샐러드·샌드위치 수요 급증',
      ],
    }),

    day(2, '봄비 예보 - 우산·따뜻한 음료 수요', {
      weather: springRain,
      tips: [
        rainDayTips.umbrellaUrgent,
        rainDayTips.indoorComfortFood,
        rainDayTips.floorSafety,
      ],
      events: [
        { icon: '☔', title: '오후 봄비 예보', detail: '14:00~18:00 강수확률 70%', impact: '우산 매출 +147%, 따뜻한 음료 +78%' },
        { icon: '💧', title: '습도 상승', detail: '실내 냉방 가동 시작', impact: '냉장 음료 소폭 증가 +20%' },
      ],
      checklist: [
        ...rainDayChecks.slice(0, 2),
        '컵라면 20개·핫도그 12개 온수기 옆 세팅, 핫초코 머신 점검',
        '입구 우산꽂이 설치, 우산 비닐봉투 200장 보충',
      ],
      weekPreview: [
        '목: 날씨 맑음, 샐러드·샌드위치 수요 폭증 예상',
        '금: 불금 + 봄 나들이 준비, 간편식·주류 수요',
      ],
    }),

    day(3, '맑은 봄날 - 샐러드·샌드위치 수요', {
      weather: cherryBlossomPerfect,
      tips: [
        { text: '신선식품 재고 대폭 확대, 건강식 선호', action: '샐러드 20개·샌드위치 15개·과일컵 10개 냉장고 전면 2열 배치, 11시 전 세팅' },
        { text: '야외 테이크아웃 음료 수요 +152%', action: '아이스 아메리카노 30개·생수 40개·이온음료 20개 냉장고 1번 선반 전면' },
        { text: '삼각김밥·주먹밥 야외 간식 선호도 증가', action: '삼각김밥 30개·주먹밥 15개 냉장고 전면, "봄 나들이 도시락" POP 부착' },
      ],
      events: [
        { icon: '🥗', title: '화창한 봄날 건강식 수요', detail: '날씨 좋은 목요일, 테라스·공원 점심 인파', impact: '샐러드 +148%, 샌드위치 +117%' },
        { icon: '☕', title: '야외 식사 증가', detail: '점심 테이크아웃 피크 (11:30~13:30)', impact: '테이크아웃 음료 +147%' },
      ],
      checklist: [
        '샐러드 20개·샌드위치 15개 냉장고 전면 2열 세팅 (11시 전)',
        '아이스 아메리카노 원두·얼음 충분히 확보 (오후 3시 보충)',
        '생수 40개·이온음료 20개 냉장고 만재',
        '테이크아웃 봉투 100장·포크 50개 재고 점검',
      ],
      weekPreview: [
        '금: 불금 + 봄 나들이 준비, 간편식·주류 수요',
        '토: 벚꽃 피크닉 시즌, 도시락·음료 대량 준비',
      ],
    }),

    day(4, '불금 + 봄 나들이 준비 - 간편식·주류 수요', {
      weather: springWindy,
      tips: [
        fridayNightTips.alcoholSurge,
        fridayNightTips.snackPairing,
        { text: '주말 나들이 간편식 사전 구매 시작', action: '도시락 15개·김밥 20개·샌드위치 15개 냉장고 전면, "주말 피크닉" POP 부착' },
      ],
      events: [
        { icon: '🍻', title: '불금 회식 시즌', detail: '저녁 7시 이후 주류·안주 수요 폭증', impact: '맥주 +183%, 안주 +152%' },
        { icon: '🌸', title: '주말 벚꽃 나들이 준비', detail: '도시락·음료 사전 구매', impact: '도시락 +148%, 음료 +122%' },
      ],
      checklist: [
        '캔맥주 60개·소주 40병 냉장고 풀가동, 저녁 5시 전 세팅',
        '마른안주 20봉·견과류 15봉 주류 냉장고 옆 크로스 머천다이징',
        '도시락 15개·김밥 20개·샌드위치 15개 주말 대비 확보',
        '저녁 7~10시 계산대 2명 배치',
      ],
      weekPreview: [
        '토: 벚꽃축제 피크, 도시락·음료·간식 폭발 수요',
        '일: 봄 대청소 시즌, 생활용품 수요 증가',
      ],
    }),

    day(5, '벚꽃 피크닉 - 도시락·음료 폭증', {
      weather: cherryBlossomPerfect,
      tips: [
        cherryBlossomTips.picnicFood,
        cherryBlossomTips.drinksPeak,
        cherryBlossomTips.disposables,
      ],
      events: [
        { icon: '🌸', title: '벚꽃축제 피크', detail: '한강·서울숲 일대 인파 몰림', impact: '도시락 +176%, 음료 +147%, 간식 +117%' },
        { icon: '🧺', title: '피크닉 용품 수요 폭발', detail: '일회용품·물티슈 완판 위험', impact: '종이컵·접시 +178%, 물티슈 +152%' },
      ],
      checklist: [
        ...cherryBlossomChecks.slice(0, 3),
        '09:00~20:00 인력 2명 배치, 12시·15시 재고 보충 체크',
      ],
      weekPreview: [
        '일: 봄 대청소 시즌, 세제·청소용품 수요',
      ],
    }),

    day(6, '봄 대청소 - 생활용품·브런치 수요', {
      weather: springMild,
      tips: [
        weekendBrunchTips.brunchDemand,
        { text: '봄 환절기 집안 대청소 시즌', action: '세제 10개·쓰레기봉투 20롤·청소용 물티슈 15개 입구 "봄 대청소" 테마 진열' },
        { text: '주중 대비 장보기 수요 증가', action: '즉석밥 20개·라면 15개·냉동식품 10개 중앙 통로 전면 배치' },
      ],
      events: [
        { icon: '🧹', title: '봄 대청소 시즌', detail: '환절기 집안 정리·겨울옷 정리', impact: '세제 +148%, 쓰레기봉투 +122%' },
      ],
      checklist: [
        ...weeklyResetChecks.slice(0, 2),
        '세제 10개·쓰레기봉투 20롤·청소용품 입구 진열',
        '월요일 도시락(삼각김밥 25개·도시락 12개) 발주 최종 확인',
      ],
      weekPreview: [
        '월: 미세먼지 재유입 예상, 마스크 재고 점검',
      ],
    }),
  ],

  // ─────────────────────────────────────
  // 🏘️ 주택 상권 (송파구 잠실동)
  // ─────────────────────────────────────
  residential: [
    day(0, '개학 시즌 + 롯데마트 휴무 - 대체 장보기', {
      weather: springMild,
      tips: [
        residentialTips.martClosed,
        residentialTips.afterSchoolSnack,
        { text: '개학 시즌 아침 등교 준비 수요 폭증', action: '빵 15개·우유 20개·주스 10개 입구 냉장고 전면, 07시 전 세팅 완료' },
      ],
      events: [
        lottemartClosed,
        { icon: '🎒', title: '개학 시즌 본격화', detail: '초중고 신학기 등교 시작', impact: '아침 간식 +147%, 문구류 +195%' },
      ],
      checklist: [
        '우유 20개·빵 15개·계란 10판 추가 확보 (마트 휴무 대비)',
        '초코우유 15개·요거트 20개·젤리 10봉 계산대 앞 저높이 진열',
        '빵 15개·우유 20개·주스 10개 입구 냉장고, 07시 전 세팅',
        '07:00~08:30 아침 피크 계산대 2명 배치',
      ],
      weekPreview: [
        '화: 학부모 모임 증가, 커피·디저트 수요',
        '수: 미세먼지 매우나쁨 예보, 아동용 마스크 준비',
      ],
    }),

    day(1, '학부모 모임 - 커피·디저트 수요', {
      weather: springMild,
      tips: [
        { text: '신학기 학급 간담회 시즌, 커피 수요 +183%', action: '아메리카노 15개·라떼 10개·녹차 10개 냉장고 전면, 10시 전 세팅' },
        { text: '학부모 디저트 동반 구매율 65%', action: '케이크 5개·마카롱 10개·쿠키 15봉 커피 옆 크로스 진열' },
        residentialTips.eveningGrocery,
      ],
      events: [
        { icon: '☕', title: '학부모 모임 시즌', detail: '신학기 학급 간담회 (오전 10~12시)', impact: '커피 +176%, 디저트 +152%' },
      ],
      checklist: [
        '아메리카노 15개·라떼 10개 냉장고 전면, 10시 전 세팅',
        '케이크 5개·마카롱 10개·쿠키 15봉 커피 옆 배치',
        '테이크아웃 컵 100개·홀더 50개 충분히 준비',
        '10~12시 계산대 2명 배치',
      ],
      weekPreview: [
        '수: 미세먼지 매우나쁨, 마스크·실내 놀이용품 필수',
        '목: 한강 벚꽃 D-2, 피크닉 사전 준비 수요',
      ],
    }),

    day(2, '미세먼지 매우나쁨 - 아동 마스크·실내 간식', {
      weather: fineDustBad,
      tips: [
        fineDustTips.maskDemand,
        fineDustTips.indoorSnack,
        residentialTips.childVitamin,
      ],
      events: [
        { icon: '😷', title: '미세먼지 매우나쁨', detail: 'PM2.5 농도 151μg/m³ (매우나쁨)', impact: '마스크 +203%, 실내 놀이용품 +148%' },
        { icon: '🏠', title: '실내 활동 증가', detail: '야외활동 취소, 집콕 수요 급증', impact: '간식 +147%, 음료 +117%' },
      ],
      checklist: [
        ...fineDustChecks.slice(0, 2),
        'KF94 아동용 마스크 20개 계산대 앞 저높이 진열',
        '비타민 젤리 10개·유산균 음료 15개 유제품 코너 배치',
      ],
      weekPreview: [
        '목: 날씨 회복, 한강 벚꽃 D-2 준비',
        '금: 주말 나들이 장보기 수요 시작',
      ],
    }),

    day(3, '한강 벚꽃 D-2 - 피크닉 사전 준비', {
      weather: cherryBlossomPerfect,
      tips: [
        cherryBlossomTips.picnicFood,
        cherryBlossomTips.disposables,
        { text: '가족 간식 대용량 사전 구매 시작', action: '과자 패밀리팩 10종·아이스크림 박스 5개 엔드캡 진열, "주말 피크닉" POP 부착' },
      ],
      events: [
        { icon: '🌸', title: '한강 벚꽃 D-2', detail: '주말 피크닉 사전 준비 시작', impact: '도시락 +178%, 일회용품 +197%' },
      ],
      checklist: [
        ...cherryBlossomChecks.slice(0, 2),
        '과자 패밀리팩 10종·아이스크림 박스 5개 엔드캡 배치',
        '냉장 음료(생수 60개·주스 20개·이온음료 30개) 확보',
      ],
      weekPreview: [
        '금: 주말 장보기 피크, 식재료·간편식 수요',
        '토: 벚꽃축제 피크, 도시락·음료 폭발 수요',
      ],
    }),

    day(4, '주말 장보기 피크 - 간편식 수요', {
      weather: springMild,
      tips: [
        residentialTips.weekendGrocery,
        residentialTips.eveningGrocery,
        { text: '가족 외출 간식 사전 확보 수요', action: '과자 20봉·음료 30개·아이스크림 15개 냉장고 전면, "주말 나들이" POP 부착' },
      ],
      events: [
        { icon: '🛒', title: '주말 장보기 피크', detail: '금요일 저녁 가족 장보기 (17~20시)', impact: '식재료 +152%, 간편식 +122%' },
      ],
      checklist: [
        ...weekendOutingChecks.slice(0, 2),
        '즉석밥 20개·라면 15개·냉동식품 10개 중앙 통로 진열',
        '17~20시 계산대 2명 배치',
      ],
      weekPreview: [
        '토: 벚꽃축제 + 한강 피크닉, 음료·간식 폭증',
        '일: 가족 산책 수요, 아이스크림·음료 지속',
      ],
    }),

    day(5, '벚꽃축제 + 가족 피크닉 - 음료·간식 폭증', {
      weather: cherryBlossomPerfect,
      tips: [
        cherryBlossomTips.picnicFood,
        cherryBlossomTips.drinksPeak,
        { text: '유모차 동반 가족 증가, 아이 간식 폭증', action: '아이스크림(콘·바·컵) 30개·요거트 20개·주스 15개 냉장고 전면 저높이 배치' },
      ],
      events: [
        hangangCherryBlossom,
        { icon: '🧺', title: '가족 피크닉', detail: '유모차 동반 가족 대거 방문', impact: '아이스크림 +148%, 과자 +117%' },
      ],
      checklist: [
        ...cherryBlossomChecks.slice(0, 3),
        '09:00~20:00 인력 2명 배치, 12시·15시 재고 보충',
      ],
      weekPreview: [
        '일: 가족 산책 수요, 아이스크림·음료 지속',
      ],
    }),

    day(6, '가족 산책 - 아이스크림·브런치 수요', {
      weather: springMild,
      tips: [
        weekendBrunchTips.brunchDemand,
        { text: '오후 한강 산책 가족 아이스크림 수요 +147%', action: '아이스크림(콘 15개·바 15개·컵 10개) 냉동고 전면, 14시 보충 알람 세팅' },
        { text: '내일 개학 대비 주중 장보기 수요', action: '즉석밥 15개·라면 10개·냉동식품 10개 중앙 통로, 우유 20개·빵 15개 입구 배치' },
      ],
      events: [
        { icon: '🍦', title: '가족 산책 시즌', detail: '오후 2~6시 한강 산책 인파', impact: '아이스크림 +152%, 음료 +130%' },
      ],
      checklist: [
        '아이스크림(콘 15개·바 15개·컵 10개) 냉동고 전면 배치',
        '생수 40개·주스 20개·이온음료 20개 냉장고 채우기',
        '샌드위치 15개·샐러드 10개 브런치 메뉴 10시까지 세팅',
        '월요일 우유 20개·빵 15개 발주 최종 확인',
      ],
      weekPreview: [
        '월: 개학 일상화, 아침 간식·문구류 수요 지속',
      ],
    }),
  ],

  // ─────────────────────────────────────
  // 🎓 대학가 상권 (관악구 신림동)
  // ─────────────────────────────────────
  university: [
    day(0, '개강 첫 주 - 에너지음료·커피 수요', {
      weather: springMild,
      tips: [
        { text: '개강 첫 주, 에너지음료 수요 폭증', action: '핫식스 40개·레드불 30개·몬스터 20개 냉장고 3번 선반 전용 배정' },
        officeTips.afternoonCoffee,
        mondayRecoveryTips.lunchboxPeak,
      ],
      events: [
        semesterStart,
      ],
      checklist: [
        '에너지드링크 3종(핫식스 40개·레드불 30개·몬스터 20개) 냉장고 배정',
        '아메리카노 20개·라떼 15개 냉장고 전면 세팅',
        '삼각김밥 25개·샌드위치 15개 아침 재고 확보 (08시 전)',
        '08:00~09:30 아침 피크 계산대 2명 배치',
      ],
      weekPreview: [
        '화: 동아리 모집 기간, 간식·음료 대량 수요',
        '수: 봄비 + 수업, 우산·따뜻한 간식 준비',
      ],
    }),

    day(1, '동아리 모집 - 간식 대량 수요', {
      weather: springMild,
      tips: [
        { text: '동아리 신입생 환영 간식 박스 구매 증가', action: '과자 박스(포카칩·새우깡·오레오) 10박스·음료 2+1 행사 진열, 입구 "동아리 환영" POP' },
        { text: '동아리방 컵라면 박스 단위 수요', action: '컵라면 5박스(60개)·종이컵 200개 중앙 통로 박스째 진열' },
        mondayRecoveryTips.lunchboxPeak,
      ],
      events: [
        { icon: '🎭', title: '동아리 모집 기간', detail: '신입생 환영 간식 대량 구매', impact: '과자 +217%, 음료 +183%' },
      ],
      checklist: [
        '과자 박스(포카칩·새우깡·오레오) 10박스 중앙 통로 진열',
        '음료 2+1 행사 POP 부착, 콜라·사이다 30개씩 확보',
        '삼각김밥 25개·샌드위치 15개 점심 재고 확보',
        '11:30~13:00 점심 피크 계산대 2명 배치',
      ],
      weekPreview: [
        '수: 봄비 예보, 우산·따뜻한 음료 필수',
        '목: MT 준비 시작, 과자·음료 박스 단위 수요',
      ],
    }),

    day(2, '봄비 + 수업 - 우산·따뜻한 간식', {
      weather: springRain,
      tips: [
        rainDayTips.umbrellaUrgent,
        rainDayTips.indoorComfortFood,
        { text: '비 오는 날 실내 간식 선호도 +38%', action: '과자 15봉·초콜릿 20개·사탕 10봉 계산대 옆 임펄스존 배치' },
      ],
      events: [
        { icon: '☔', title: '오후 봄비 예보', detail: '14:00 이후 강수확률 80%', impact: '우산 +176%, 따뜻한 음료 +122%' },
      ],
      checklist: [
        ...rainDayChecks.slice(0, 2),
        '컵라면 20개·핫도그 12개 온수기 옆 세팅, 핫초코 머신 점검',
        '14~18시 계산대 인력 배치',
      ],
      weekPreview: [
        '목: MT 준비 본격화, 과자·음료 박스 단위 수요',
        '금: 개강 파티, 주류·안주 폭발',
      ],
    }),

    day(3, 'MT 준비 - 과자·음료 대량 수요', {
      weather: springMild,
      tips: [
        { text: 'MT 시즌 과자 박스 단위 구매 폭증', action: '포카칩·새우깡·허니버터칩 각 5박스 중앙 통로 박스째 진열, 가격표 부착' },
        { text: 'MT 음료·생수 대량 구매', action: '콜라·사이다 각 3박스·생수 5박스 매장 앞 적재, "MT 세트" POP 부착' },
        { text: 'MT 일회용품 동반 구매율 75%', action: '일회용 컵 300개·접시 100개·물티슈 50개 과자 옆 크로스 진열' },
      ],
      events: [
        mtSeason,
      ],
      checklist: [
        '과자 박스(포카칩·새우깡·허니버터칩) 각 5박스 진열',
        '음료 박스(콜라·사이다·생수) 각 3~5박스 확보',
        '일회용 컵 300개·접시 100개·물티슈 50개 대량 준비',
        '18~21시 대량 구매 대비 계산대 2명 배치',
      ],
      weekPreview: [
        '금: 개강 파티, 주류·안주 피크',
        '토: 대학교 축제 준비, 소모품·간식 수요',
      ],
    }),

    day(4, '개강 파티 - 주류·안주 폭발', {
      weather: springMild,
      tips: [
        fridayNightTips.alcoholSurge,
        fridayNightTips.snackPairing,
        fridayNightTips.lateNightOps,
      ],
      events: [
        { icon: '🍻', title: '개강 파티', detail: '금요일 밤 신입생 환영회 (저녁 7시~)', impact: '맥주 +148%, 소주 +117%, 안주 +97%' },
        { icon: '🎉', title: '동아리 환영회', detail: '캠퍼스 일대 파티 분위기', impact: '주류 심야 매출 +178%' },
      ],
      checklist: [
        '캔맥주 80개·소주 50병 냉장고 풀가동, 저녁 5시 전 세팅',
        '마른안주 20봉·견과류 15봉·과자 30봉 주류 옆 크로스 머천다이징',
        '얼음 20봉·일회용컵 200개 확보',
        '20~02시 심야 인력 2명 교대 배치',
      ],
      weekPreview: [
        '토: 대학교 축제 준비, 소모품·간식 수요',
        '일: 과제 시즌 시작, 카페 수요',
      ],
    }),

    day(5, '대학교 축제 준비 - 소모품·간식 수요', {
      weather: cherryBlossomPerfect,
      tips: [
        { text: '축제 부스 준비물 대량 구매 시작', action: '종이컵 500개·접시 200개·물티슈 100개 매장 앞 박스 적재, "축제 준비" POP' },
        { text: '축제 간식·음료 대량 준비 필요', action: '과자 20박스·음료 15박스·아이스크림 10박스 냉장고·중앙 통로 풀세팅' },
        cherryBlossomTips.drinksPeak,
      ],
      events: [
        { icon: '🎊', title: '대학교 축제 준비', detail: '부스 운영 준비물 대량 구매', impact: '일회용품 +183%, 간식 +122%' },
      ],
      checklist: [
        '종이컵 500개·접시 200개·물티슈 100개 대량 발주',
        '과자 20박스·음료 15박스 중앙 통로 박스 진열',
        '아이스크림 10박스 냉동고 풀가동 확인',
        '10~22시 인력 2명 배치',
      ],
      weekPreview: [
        '일: 과제 시즌 시작, 카페·에너지음료 수요',
      ],
    }),

    day(6, '과제 시즌 - 카페·에너지음료 수요', {
      weather: springMild,
      tips: [
        { text: '일요일 과제 몰아하기, 커피 수요 +147%', action: '아메리카노 20개·라떼 15개 냉장고 전면, 14시 보충 알람 세팅' },
        { text: '심야 스터디 에너지음료 수요 지속', action: '핫식스 20개·레드불 15개·몬스터 10개 냉장고 3번 선반 배정' },
        { text: '과제 스트레스 단맛 간식 수요 +58%', action: '초콜릿바 20개·젤리 15봉·사탕 10봉 계산대 옆 임펄스존 배치' },
      ],
      events: [
        { icon: '📝', title: '과제 시즌 시작', detail: '일요일 카페·도서관 만석', impact: '커피 +152%, 에너지음료 +117%' },
      ],
      checklist: [
        '아메리카노 20개·라떼 15개 냉장고 전면 세팅',
        '에너지드링크 3종(핫식스·레드불·몬스터) 45개 확보',
        '초콜릿바 20개·젤리 15봉 계산대 옆 진열',
        '컵라면 20개·삼각김밥 15개 심야 재고 확보',
      ],
      weekPreview: [
        '월: 개강 2주차, 수업 본격화·에너지음료 지속 수요',
      ],
    }),
  ],

  // ─────────────────────────────────────
  // 🎤 유흥 상권 (마포구 홍대입구)
  // ─────────────────────────────────────
  entertainment: [
    day(0, '봄 시즌 오픈 - 재고 정비·주간 리셋', {
      weather: springMild,
      tips: [
        mondayRecoveryTips.weekStartReset,
        { text: '봄 시즌 신상품 입고, 매대 리뉴얼', action: '신상 음료 10종·과자 8종 입구 "봄 신상" 코너 세팅, 가격 POP 부착' },
        { text: '평일 저녁 소규모 모임 기본 수요', action: '캔맥주 30개·소주 20병·안주 10봉 냉장고 기본 세팅, 18시 전 완료' },
      ],
      events: [
        { icon: '🔄', title: '주말 마무리 정리', detail: '재고 정리 및 주간 발주', impact: '일반 운영 수준' },
      ],
      checklist: [
        ...weeklyResetChecks.slice(0, 2),
        '신상품(음료 10종·과자 8종) 입구 진열',
        '주류·안주 기본 재고 확보 (캔맥주 30개·소주 20병)',
      ],
      weekPreview: [
        '화: 소모임 증가, 간단한 주류·안주 수요',
        '수: 레이디스나이트, 와인·칵테일 준비',
      ],
    }),

    day(1, '소모임 + 꽃놀이 준비', {
      weather: springMild,
      tips: [
        { text: '평일 저녁 소모임 주류 수요 +122%', action: '캔맥주 40개·와인 10병·과자 안주 15봉 냉장고 세팅, 19시 전 완료' },
        { text: '주말 꽃놀이 사전 준비 수요 시작', action: '도시락 10개·삼각김밥 15개·음료 20개 냉장고 확인, 재고 부족 시 발주' },
        entertainmentTips.buskingCrowd,
      ],
      events: [
        { icon: '🍷', title: '소모임 시즌', detail: '평일 저녁 소규모 모임 (19~23시)', impact: '맥주 +117%, 와인 +103%' },
      ],
      checklist: [
        '캔맥주 40개·와인 10병 냉장고 세팅',
        '과자·치즈 안주류 15봉 주류 옆 크로스 진열',
        '도시락·음료 주말 대비 재고 점검, 부족 시 발주',
        '19~23시 계산대 1명 배치',
      ],
      weekPreview: [
        '수: 레이디스나이트, 와인·칵테일 수요 증가',
        '목: 버스킹 시즌 시작, 야외 음료·간식 수요',
      ],
    }),

    day(2, '레이디스나이트 - 와인·칵테일 수요', {
      weather: springMild,
      tips: [
        entertainmentTips.clubPreDrink,
        { text: '레이디스나이트 여성 선호 안주 수요 +42%', action: '치즈 10개·과일컵 8개·초콜릿 15개 와인 옆 크로스 진열' },
        { text: '와인·칵테일 베이스 수요 폭증', action: '화이트와인 8병·레드와인 8병·토닉워터 15개·사이다 20개 냉장고 풀세팅' },
      ],
      events: [
        hongdaeLadiesNight,
      ],
      checklist: [
        '와인(화이트 8병·레드 8병) 냉장고 전면 배치',
        '칵테일 베이스(토닉워터 15개·사이다 20개) 확보',
        '치즈 10개·과일컵 8개·초콜릿 15개 안주 진열',
        '20~02시 계산대 1명 배치',
      ],
      weekPreview: [
        '목: 버스킹 시즌 시작, 야외 음료·간식 수요',
        '금: 불금 + 봄밤, 주류·안주 피크',
      ],
    }),

    day(3, '버스킹 시즌 - 야외 음료·간식 수요', {
      weather: cherryBlossomPerfect,
      tips: [
        entertainmentTips.buskingCrowd,
        { text: '야외 공연 관람객 캔맥주 수요 +176%', action: '캔맥주 50개·사이다 20개·생수 30개 입구 아이스박스 세팅' },
        { text: '간편 안주 동반 구매율 65%', action: '과자 20봉·건어물 10봉·육포 10봉 캔맥주 옆 크로스 진열' },
      ],
      events: [
        hongdaeBusking,
      ],
      checklist: [
        '캔맥주 50개·사이다 20개·생수 30개 입구 아이스박스 세팅',
        '과자 20봉·건어물 10봉·육포 10봉 안주 진열',
        '일회용 컵 100개·얼음 10봉 준비',
        '18~02시 계산대 1명 배치',
      ],
      weekPreview: [
        '금: 불금 + 봄밤, 주류·안주 폭발',
        '토: 벚꽃 거리 + 플리마켓, 종일 테이크아웃 수요',
      ],
    }),

    day(4, '불금 + 봄밤 - 주류·안주 피크', {
      weather: cherryBlossomPerfect,
      tips: [
        entertainmentTips.clubPreDrink,
        entertainmentTips.fridayClubSeason,
        fridayNightTips.lateNightOps,
      ],
      events: [
        { icon: '🍻', title: '불금 피크', detail: '홍대 거리 인파 폭증 (저녁 7시~)', impact: '맥주 +148%, 소주 +122%, 안주 +97%' },
        { icon: '🎉', title: '클럽 오픈', detail: '클럽 라인업 대기줄 형성 (밤 10시~)', impact: '에너지음료 +178%, 간편 안주 +147%' },
      ],
      checklist: [
        '캔맥주 80개·소주 50병·믹서(토닉·사이다) 30개 냉장고 풀가동',
        '마른안주 20봉·견과류 15봉·과자 30봉 주류 옆 크로스 머천다이징',
        '에너지음료 20개·숙취해소제 15개 입구 진열',
        '19~04시 2명 교대 근무, 새벽 1시 재고 보충',
      ],
      weekPreview: [
        '토: 벚꽃 거리 + 플리마켓, 종일 수요',
        '일: 브런치 + 해장 수요, 샌드위치·숙취해소제',
      ],
    }),

    day(5, '벚꽃 거리 + 플리마켓 - 종일 테이크아웃', {
      weather: cherryBlossomPerfect,
      tips: [
        cherryBlossomTips.drinksPeak,
        entertainmentTips.buskingCrowd,
        entertainmentTips.clubPreDrink,
      ],
      events: [
        hongdaeFleaMarket,
        { icon: '🌸', title: '벚꽃 거리 축제', detail: '홍대 거리 벚꽃 구경 인파 (종일)', impact: '음료 +152%, 간식 +117%' },
      ],
      checklist: [
        '캔커피 30개·생수 60개·주스 20개 냉장고 만재, 12시·16시 보충',
        '삼각김밥 30개·샌드위치 20개 종일 재고 유지',
        '과자 30봉·아이스크림 20개 매장 앞 야외 진열대 세팅',
        '10~04시 2명 교대 근무',
      ],
      weekPreview: [
        '일: 브런치 수요 + 해장 수요, 샌드위치·숙취해소제',
      ],
    }),

    day(6, '브런치 + 해장 수요 - 샌드위치·숙취해소제', {
      weather: springMild,
      tips: [
        weekendBrunchTips.brunchDemand,
        entertainmentTips.postClubHangover,
        { text: '오후 나들이 간식·음료 수요 지속', action: '아이스크림 15개·캔음료 30개·과자 15봉 냉장고 보충, 14시 재세팅' },
      ],
      events: [
        { icon: '🍜', title: '홍대 해장 수요 피크', detail: '오전 10시~오후 2시 해장 집중', impact: '라면·숙취해소제 +103%' },
      ],
      checklist: [
        '샌드위치 15개·우유 10개·주스 10개 냉장고 2번 선반, 10시까지 세팅',
        '컵라면 30개·삼각김밥 20개·숙취해소제 15개 입구 배치',
        '아이스크림 15개·캔음료 30개 오후 재고 확보',
        '월요일 발주 계획 수립 (주류·안주·신상품)',
      ],
      weekPreview: [
        '월: 평일 복귀, 재고 정리·주간 리셋',
      ],
    }),
  ],
};
