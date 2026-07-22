# /technology/models 콘텐츠 개발 스펙 v1 — 모델↔용도 매핑 · 스테이지 정정

작업일: 2026-07-21 · 대상: `/ko/technology/models`(`ModelsView.tsx`)
근거: 현행 소스 감사 + 메모(모델별 용도·제품 연결, 장면 설명만 준비 중) + `제품_모듈체계_v2`(모델=SEED 엔진).

## 0. 현황 & 과제

- **현황:** 19개 Vision Model을 5그룹(익명화·인식·공간·흐름/변화·이해/생성)으로 카탈로그. 각 모델 = 한 줄 기술 설명 + Live/Building/Planned + 이미지. 상단에 인터랙티브 목업, face-anon before/after(정직성), 모델 요청 CTA.
- **과제(메모):** ① 모델별 **"왜 필요/어디에 쓰이나"(제품·솔루션 연결)** 부재 ② **스테이지 정정** — 장면 설명 생성만 준비 중, 나머지 Live ③ 모델 **이미지·데모 에셋** 확보(MODEL_DEMOS 빈 상태) ④ 카탈로그 표현 정제.

## 1. 스테이지 정정 (확정 · 메모)

**규칙: `scene-caption`(장면 설명 생성)만 "준비 중", 나머지 18개 전부 "Live".**
- 뱃지 3분류(Live/Building/Planned)를 **2분류로 단순화** 권장: **Live · 준비 중**. (Building/Planned → 대부분 Live, scene-caption만 준비 중)
- 라벨(3로케일): Live = `Live`/`Live`/`Live` · 준비 중 = `준비 중`/`Coming soon`/`準備中`.
- ⚠ Live는 실제 프로덕션 가용을 뜻하니, 최종 배포 전 각 모델의 실가용 교차확인 권장(신뢰·표기 리스크).

## 2. 모델 ↔ 용도·제품/솔루션 매핑 ★콘텐츠 개발 핵심

각 모델에 **"무엇을/왜"(용도) + "어디에"(제품·기능·솔루션 연결)**를 부여. 카드의 기술 한 줄 아래에 '쓰임' 줄로 노출. (모델=SEED 엔진 → 모듈을 구동)

### 01 익명화 — 전 제품의 첫 단계 (SEAL·anonymizer)
| 모델 | 무엇/왜 | 쓰임(연결) | 스테이지 |
|---|---|---|---|
| face-anon | 얼굴 영역을 촬영 순간 익명화 — 규제·프라이버시 | 전 제품 1단계 · SEAL | Live |
| body-anon | 체형 등 얼굴 밖 재식별 신호 제거 | 전 제품 1단계 · SEAL | Live |
| plate-anon | 차량 번호판 익명화 | 주차장·차량 공간 · SEAL | Live |

### 02 인식 — 검출·추적의 토대
| 모델 | 무엇/왜 | 쓰임(연결) | 스테이지 |
|---|---|---|---|
| person-detect | 사람 영역 검출 — 유입·재실·동선의 시작 | store count · saai care · saai insight | Live |
| object-detect | 상품·집기·POP 등 객체 검출 | store pop · store fit · saai agent(발주) | Live |
| pose-estimate | 자세·키포인트 — 이상행동·쓰러짐·손동작 | saai care(이상 감지) | Live |
| reid-embed | 얼굴 없이 같은 사람 연속 인식(재식별 임베딩) | mtmc · saai insight(동선) · store count(재실) | Live |
| person-attribute | 연령대·성비 추정(신원 식별 아님) — 방문객 층 | saai insight · saai ads insight(대상층) | Live |
| mtmc-track | 다중 카메라 연속 추적 — 넓은 공간 한 사람 동선 | spatial AI · saai insight · /solutions/large-space | Live |

### 03 공간 — 화면을 실제 지도 위로
| 모델 | 무엇/왜 | 쓰임(연결) | 스테이지 |
|---|---|---|---|
| cam-calibrate | 카메라 좌표 보정 — 화면→실제 위치 정확도 | spatial AI 기반 | Live |
| floor-project | 화면 좌표를 평면(매장 지도)에 사상 | saai insight 히트맵 · spatial AI | Live |

### 04 흐름·변화 — 혼잡·체류·이상
| 모델 | 무엇/왜 | 쓰임(연결) | 스테이지 |
|---|---|---|---|
| flow-density | 공간 단위 밀도·흐름 집계 — 혼잡·인파 | saai insight · store queue · large-space | Live |
| dwell-estimate | 구역별 체류 시간 — 관심·머무름 | saai insight · saai ads insight(주목) | Live |
| queue-detect | 대기열 형성·길이 감지 | store queue · saai care | Live |
| change-detect | 장면 변화·이상 영역 감지 | saai care(이상·손실·위생 감지) | Live |
| shelf-state | 진열·재고 상태 변화 — 결품·흐트러짐 | saai care(감지 항목) · saai agent(발주) | Live |

### 05 이해·생성 — 요약·학습
| 모델 | 무엇/왜 | 쓰임(연결) | 스테이지 |
|---|---|---|---|
| event-classify | 관심 이벤트 분류 — 상황 자동 분류·알림 | saai care · saai agent | Live |
| **scene-caption** | 장면을 말로 요약(알림·리포트 설명) | saai care 알림 · saai agent 리포트 | **준비 중** |
| synth-frame | 학습용 합성 프레임 생성 — 모델 품질 향상 | 내부(모델 개선) · 제품 직접 노출 아님 | Live |

> EN/JP '쓰임' 줄은 KO 확정 후 동시 번역(현행 promise 줄과 같은 dict).

## 3. 페이지 반영

1. **카드 '쓰임' 줄 추가** — 기술 설명(promise) 아래에 제품·솔루션 연결 한 줄. 모델명→해당 제품/솔루션 페이지 **딥링크**(가능 시).
2. **그룹 설명 유지·정제** — 현행 5그룹 desc는 양호(“~할 때”). 그룹 상단에 "이 그룹이 구동하는 제품" 요약 한 줄 추가 검토.
3. **스테이지 2분류** — Live/준비 중. scene-caption만 준비 중. 뱃지 스타일 정리(amber/gray → Live 톤 + 준비 중 1종).
4. **히어로/카테고리 노트** — "모델은 공간을 읽는 엔진 — 익명화 위에서 제품(saai)·기능(store)을 구동" 한 줄로 모듈 체계와 연결(그라운딩 정합).
5. **CTA 유지** — "읽어야 할 것이 목록에 없나요? → 모델 요청"(맞춤 설계, 좋음).

## 4. 이미지·데모 에셋

- 카드 이미지: `/images/models/<name>.webp` 참조. **누락분 확보 필요**(19종). 통일된 시각(익명화 오버레이·바운딩·히트맵 등 모델 성격별).
- 데모 영상: `MODEL_DEMOS` 셋에 이름 추가 시 `public/videos/models/<name>.mp4` 자동 재생(포스터=webp). **현재 빈 상태** → Live 대표 모델부터 3~5개 우선 확보(feedback #9.1).
- before/after 슬라이더(face-anon)는 실제 출력 — 유지·모범.

## 5. 파일·작업 매핑

| 작업 | 파일 |
|---|---|
| 스테이지 정정·2분류 | `ModelsView.tsx`(`models[].stage`·`stageStyle`·라벨) |
| 모델 '쓰임' 줄 + 딥링크 | `ModelsView.tsx`(ModelCopy에 `use`/`links` 필드) |
| 이미지·데모 | `public/images/models/*` · `public/videos/models/*` · `MODEL_DEMOS` |
| 모듈 정합 문구 | 히어로/카테고리 노트 |

## 6. 열린 결정

1. **Live 표기 검증** — 18개 Live 실가용 최종 확인(신뢰 리스크).
2. **synth-frame 노출** — 내부용이라 카탈로그에서 숨길지 vs Live로 노출.
3. **'쓰임' 딥링크 범위** — 제품 페이지까지 vs 솔루션까지.
4. **데모 영상 우선순위** — 어느 Live 모델부터(대표성 높은 face-anon·mtmc-track·pose-estimate 등).

---

*연계: `제품_모듈체계_네이밍_v2.md`(모델=SEED 엔진 → 모듈 구동) · `랜딩_전환재정렬_v2.md`(그라운딩: 공간을 읽는 AI) · `기능페이지_작업문서_v1.md`(trail·census→기술 이관). 현행: `ModelsView.tsx`.*
