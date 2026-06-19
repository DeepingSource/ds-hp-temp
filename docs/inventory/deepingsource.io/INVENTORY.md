# deepingsource.io 라이브 사이트 인벤토리

> 이 문서는 새 홈페이지를 짓는 사람이 "deepingsource.io의 모든 것을 알 수 있다"고 느끼도록 만든 단일 통합 문서다.
> 데이터 소스: `extract.json`(23 페이지) · `pages/*.md`(휴먼리더블 추출본) · `urls.txt`(163 URL) · `paths_unique.txt`(58 고유 경로) · `assets/inventory/deepingsource.io/`(138 다운로드 이미지).
> 모든 추측은 **(추정)** 로 표기. 인용은 15단어 이내 직접 인용, 그 이상은 의역.

---

## 1. 사이트 개요

### 도메인·언어·규모
- **도메인:** `www.deepingsource.io`
- **언어:** `en` (기본, prefix 없음) · `ko` (`/ko/...`) · `jp` (`/jp/...`) — 3개 로케일
- **총 크롤된 URL:** 163개 (en 55 + ko 55 + jp 53, 일부 페이지는 ko 전용)
- **언어-스트립 고유 경로:** 58개
- **추출 완료 페이지(휴먼리더블):** 24개 (`pages/*.md`)
- **다운로드된 이미지 자산:** 138개 (`assets/inventory/deepingsource.io/`)

### 주요 섹션 (Top-level IA)
GNB 카피(영문): `Store Insight | Store Agent | SEAL | Tech Anonymizer | Spatial AI | Store Care AI | Company [About Us · News · Career · Blog] | Contact Us`
GNB 카피(한글): `Store Insight | Store Agent | SEAL 솔루션 | 익명화 | 공간 AI | 스토어케어 AI | 기업정보 [회사소개·뉴스·채용정보·블로그] | 문의하기`

5개 축으로 정리:
1. **마케팅 홈** — `/` (en/ko/jp)
2. **제품(Product)** — `/store-insight`, `/storeagent`
3. **기술(Tech/Solution)** — `/seal`, `/tech-anonymizer`, `/tech-spatial-ai`, `/tech-store-care-ai`
4. **회사(Company)** — `/about-us`, `/news`, `/career`, `/blog`, `/contact`
5. **제품 매뉴얼 / 시스템** — `/pi-docs`, `/pi-manual/*`, `/log-in`, `/sign-up`, `/reset-password`, `/update-password`, `/user-account`, `/access-denied`, `/search`, `/privacy`

### 빌더 / 운영 도구 (CDN·HTML 흔적으로 추정)
- **CMS·빌더(확정):** **Webflow** — 모든 이미지 URL이 `cdn.prod.website-files.com/6233f3cb451d8d0d981f973a/...` 패턴. 폼 마크업(`Thank you! Your submission has been received! / Oops! Something went wrong while submitting the form.`)도 Webflow 기본 카피.
- **호스팅:** Webflow Cloud (추정 — 자체 도메인 매핑)
- **로컬라이제이션:** Webflow 멀티사이트 또는 `/ko`·`/jp` 폴더 분리 (추정 — 각 로케일이 별도 페이지 인스턴스로 보임)
- **블로그 / 뉴스:** Webflow Collections (`/post/*`, `/news` 의 카드형 리스트와 카테고리 필터)
- **매뉴얼(`/pi-docs`, `/pi-manual/*`):** 같은 Webflow CDN 사용 — 자체 Webflow 페이지로 운영 (추정 — 별도 docs.* 서브도메인 분리 안 됨)
- **외부 도메인 연결:** `https://www.storecare.ai/` (Store Care 별도 사이트), `https://sun-ds.com/` (관계사 추정), `https://kr.linkedin.com/company/deepingsource`, `https://www.youtube.com/channel/UCmztsussv8Romt-V73wnklg`
- **폼 제공자:** Webflow 폼 (확정 — `Thank you!` / `Oops!` 표준 메시지)
- **개인정보 처리방침 운영:** `catchsecu.com` (확정 — `https://app.catchsecu.com/document/P/0f90059276203b8` 외부 링크)
- **분석/태그(추정):** 메타 추출본에 GA·GTM 흔적은 캡처되지 않음 — HTML head 재검증 필요

### 글로벌 fact
- **법인명·주소·연락처:** 서울 강남구 언주로 508 5층 딥핑소스 · `+82-2-6956-2255` · `contact@deepingsource.io`
- **저작권:** ©2018-2026 Deeping Source Inc.
- **수상 배지(글로벌 푸터/히어로):** NextRise Awards 2024 Top Innovator Prize
- **대표:** 김태훈 (Privacy Officer, CEO — Privacy 페이지에서 노출)
- **시행일(개인정보처리방침):** 2022-08-26

---

## 2. IA 매트릭스

58 고유 경로를 그룹별로 묶음. 컬럼: 경로 / 목적(추정) / 본문 분량(en 기준 chars) / 다국어(en·ko·jp) / 그룹.

### 2.1 마케팅 홈 (1)
| 경로 | 목적(추정) | en chars | 다국어 | 그룹 |
|---|---|---|---|---|
| `/` | 최상위 마케팅 랜딩 · 제품·기술 전체 진입점 · 파트너 그리드 · Contact form | 4,325 | en·ko·jp | 마케팅 |

### 2.2 제품 페이지 (2)
| 경로 | 목적(추정) | en chars | 다국어 | 그룹 |
|---|---|---|---|---|
| `/store-insight` | Store Insight (구 PLUS INSIGHT) 대시보드 제품 소개 | 4,896 | en·ko·jp | 제품 |
| `/storeagent` | Store Agent — AI 매장운영 에이전트 (신규/Hero) | 4,913 | en·ko·jp | 제품 |

### 2.3 기술 페이지 (4)
| 경로 | 목적(추정) | en chars | 다국어 | 그룹 |
|---|---|---|---|---|
| `/seal` | SEAL — 얼굴·번호판 익명화 SDK (FAQ 포함, 헤비) | 5,049 | en·ko·jp | 기술 |
| `/tech-anonymizer` | Anonymizer — 비식별화 원천 기술 | 2,780 | en·ko·jp | 기술 |
| `/tech-spatial-ai` | Spatial AI — MTMC 다중 카메라 추적 | 2,543 | en·ko·jp | 기술 |
| `/tech-store-care-ai` | Store Care AI — 매장 상황 모니터링·재고·위험 감지 (외부 `storecare.ai` 연결) | 3,718 | en·ko·jp | 기술 |

### 2.4 회사·법무 (5)
| 경로 | 목적(추정) | en chars | 다국어 | 그룹 |
|---|---|---|---|---|
| `/about-us` | REINVENT OFFLINE · Vision/Mission · 연혁 · Key Differentiators | 4,107 | en·ko·jp | 회사 |
| `/career` | 채용 — 컬처/복지/포지션 (현재 채용 없음) | 1,535 | en·ko·jp | 회사 |
| `/contact` | 미팅 요청 · 폼 + 주소·전화·이메일 | 873 | en·ko·jp | 회사 |
| `/news` | 미디어 노출 모음 (88개+ 외부 링크, 2020-2026) | 9,502 | en·ko·jp | 회사 |
| `/privacy` | 개인정보 처리방침 (한국어 단일) | 4,169 | ko only (en·jp도 동일 한글) | 법무 |

### 2.5 콘텐츠 — 블로그 & 뉴스 (1 hub + 19 posts)
| 경로 | 목적(추정) | en chars | 다국어 | 그룹 |
|---|---|---|---|---|
| `/blog` | 블로그 허브 · 카테고리 필터(All/Tech/Company/Product/Trend) | 12,698 | en·ko·jp | 콘텐츠 |
| `/post/*` 19개 | 개별 블로그 글 (제목 목록은 §6 참조) | n/a (수집 안 됨) | en·ko·jp 부분 | 콘텐츠 |

### 2.6 제품 매뉴얼 — pi-docs (1 + 9)
| 경로 | 목적(추정) | en chars | 다국어 | 그룹 |
|---|---|---|---|---|
| `/pi-docs` | Store Insight 사용 매뉴얼 홈 (사이드바 + intro) | 752 | en·ko·jp | 매뉴얼 |
| `/pi-manual/heatmap-analysis` | 히트맵 분석 매뉴얼 | n/a | ko only | 매뉴얼 |
| `/pi-manual/heatmap-by-time-analysis` | 시간대별 히트맵 매뉴얼 | n/a | en·ko·jp | 매뉴얼 |
| `/pi-manual/heatmapbytime-analysis` | (중복/별칭, slug 변형) | n/a | ko only | 매뉴얼 |
| `/pi-manual/inter-zone-traffic-analysis` | 구역간 통행량 분석 | n/a | en·ko·jp | 매뉴얼 |
| `/pi-manual/line-analysis` | 라인 분석 | n/a | en·ko·jp | 매뉴얼 |
| `/pi-manual/login` | (매뉴얼) 로그인 가이드 | n/a | en·ko·jp | 매뉴얼 |
| `/pi-manual/main-path-analysis` | 대표 동선 분석 | n/a | en·ko·jp | 매뉴얼 |
| `/pi-manual/seoljeong-kategori-teseuteu` | "설정 카테고리 테스트" — 발음 slug, 테스트 잔재(추정) | n/a | en·ko·jp | 매뉴얼 |
| `/pi-manual/visitor-analysis` | 방문자 분석 | n/a | en·ko·jp | 매뉴얼 |
| `/pi-manual/visitor-path-analysis` | 방문자 동선 분석 | n/a | en·ko·jp | 매뉴얼 |
| `/pi-manual/zone-analysis` | 구역별 분석 | n/a | en·ko·jp | 매뉴얼 |

### 2.7 인증·계정·시스템 (8)
| 경로 | 목적(추정) | en chars | 다국어 | 그룹 |
|---|---|---|---|---|
| `/log-in` | 로그인 (Store Insight 대시보드 진입) | n/a | en·ko·jp | 시스템 |
| `/sign-up` | 회원가입 | n/a | en·ko·jp | 시스템 |
| `/reset-password` | 비밀번호 재설정 요청 | n/a | en·ko·jp | 시스템 |
| `/update-password` | 비밀번호 변경 | n/a | en·ko·jp | 시스템 |
| `/user-account` | 계정 페이지 | n/a | en·ko·jp | 시스템 |
| `/access-denied` | 권한 없음 페이지 | n/a | en·ko·jp | 시스템 |
| `/search` | 사이트 검색 결과 페이지 | n/a | en·ko·jp | 시스템 |
| `/untitled/untitled-2` | 미공개/잔재 페이지(추정 — 정리 누락) | n/a | en·ko·jp | 기타 |

### 2.8 IA 한눈에
- 마케팅 홈 1 + 제품 2 + 기술 4 + 회사·법무 5 + 콘텐츠 허브 1 + 블로그 글 19 + 매뉴얼 1+10 + 시스템 8 + 기타 1 = **52 정상 + 6 변형/시스템 = 58 경로**.
- 사이트 골격은 "**마케팅 + 제품/기술 + 회사 + 사용자 대시보드(인증) + 매뉴얼 + 콘텐츠**" 라는 **B2B SaaS + Marketing site 하이브리드** 구조 (추정).

---

## 3. 페이지별 핵심 카피 카드 (13장)

각 카드는 다음 키로 구성: URL · title · meta · 한 줄 목적 · 주요 헤더 · 핵심 카피 인용 (en·ko 비교) · 기능 요소 · 핵심 이미지 매핑.

### 3.1 Home — `/` (en) / `/ko` (ko)
- **title:** *Deeping Source: Privacy-preserving AI Video Agents for Brick-and-Mortar* / *딥핑소스: 개인정보 걱정없는 오프라인 공간 분석 및 최적화 AI*
- **meta:** "From store management to analysis and optimization, our AI Manager ushers in the future of physical/offline businesses with real-time, vision-based agentic AI..."
- **목적:** 오프라인 공간을 위한 비전 AI · 에이전틱 AI 종합 플랫폼의 진입점. 4개 제품/기술(SI / Store Agent / Spatial AI / 20+ 모듈)을 한 화면에 묶는다.
- **주요 헤더:**
  - H1: `Perfect Every Space` · `Our Partners`
  - H2: `Uncover Hidden Revenue Growth in Offline Business with Deeping Source AI` / `Safely collect Pre-Purchase Data` / `Transform all of those data into actionable insights` / `Actionable insights to drive sales` / `Redefine retail operations with Store Agent` / `Innovative Technology Differentiator` / `Transform everything in space into data and insight with video AI` / `More than 20 types of video analytics AI` / `YOUR BUSINESS + INSIGHT = BUSINESS SUCCESS` / `Contact Us`
- **핵심 카피 인용:**
  - en: "AI Driven Actionable Insight for Offline Space" · "Pre-Purchase Data contains numerous insights." · "Store Agent goes beyond dashboards" · "Know exactly where to go next."
  - ko: "오프라인 공간을 위한 AI 기반의 실행 가능한 인사이트 도입" · "구매 전 데이터에는 다양한 인사이트가 숨어 있습니다." · "Store Agent로 매장 운영의 기준을 바꾸세요" · "감에 의존하는 운영은 그만. 데이터가 정확히 다음 행동을 알려줍니다."
  - 20+ 모듈 상태 라벨(공통): `Available Now` · `Final Testing` · `Development` (ko: `지금 사용 가능` · `최종 테스트 진행 중` · `개발 진행 중`)
  - 모듈 카드 12개: Anonymization / People Counting / People Attribute / Intrusion Detection / Queue Monitoring / Attention Monitoring / Parking lot Vacancies / Crowdedness / Customer Journey / Loss Prevention / Behavior Analysis / Inventory Monitoring
- **기능 요소:**
  - 상단 GNB · 언어 스위처(English/Korean/Japanese) · CTA `Talk to Sales` / `문의하기`
  - 4-blade 섹션(SI → SA → Differentiator → 20+ 모듈)
  - 파트너 로고 그리드 ("Our Partners")
  - 푸터 Contact 폼 (이름·이메일·회사·전화·부서·메시지)
  - 비디오 플레이 아이콘(`play-icon.svg`) — 비디오 임베드 (추정)
  - SNS: LinkedIn · YouTube
  - 외부 링크: `sun-ds.com` (관계사), `kddi.com` (파트너 일본 통신사)
- **핵심 이미지(downloaded):**
  - 로고: `659cbd53ce1405a068486806_company_logo.svg`
  - 메인 히어로 일러스트(en/ko 다른 파일): `66176565...indeximg001.webp` (en) · `661767f5...koindeximg001.webp` (ko)
  - 카드 UI 목업: `6618d935...eng1.webp` / `6618d957...kor1.webp`, `6618e4b2...3actionableinsightstodrivesales.webp` (en), `6618e572...kor3actionableinsightstodrivesales.webp` (ko)
  - Store Agent 히어로(공통): `69a015aa...SA-00.jpg`, `69a00705...SA-00.jpg`
  - 4개 차별화 아이콘 SVG: `icon-data.svg`, `icon-privacy.svg`, `icon-AI.svg`, `icon-space.svg`, `icon-vision.svg`, `icon-time.svg`
  - 모듈 4개 SVG: `anony'.svg` (Anonymization), `People Counting.svg`, `E estimation.svg` (Age/Gender), `Queue Monitoring.svg`
  - 카드 UI(공통/한국어 변형): `card_ui_img_1.webp` / `ko_card_ui_img_1.webp`, `carduiimg2.webp` / `kocarduiimg2.webp`, `carduiimg3.webp` / `kocarduiimg3.webp`
  - 비디오 썸네일: `video tumb.webp`, `video tumb mo.webp`, `play-icon.svg`
  - 언어 스위처 Frame: `Frame.svg`, `Frame-1.svg`, `Leaf.svg`, `Leaf_left.svg`

### 3.2 About Us — `/about-us` / `/ko/about-us`
- **title:** *Deeping Source: REINVENT OFFLINE*
- **meta:** "Revolutionizing brick-and-mortar analytics with Vision AI..." / "비전 AI로 오프라인 매장 분석을 혁신합니다..."
- **목적:** 회사 비전·미션·연혁·차별화·채용 모집 메시지를 한 페이지에 집약.
- **주요 헤더:**
  - H1: `REINVENT OFFLINE` · `Our History` · `Join Deeping Source`
  - H2: `Our Vision` / `Our Mission` / `Meeting Customer Challenges Head-On` (ko: `오프라인 비즈니스 혁신`) / `Key Differentiators` / `Tailored AI Solution`
  - H3 연혁: `2019` · `2020` · 차별화 3개 `Privacy Protection` / `Highly Scalable AI` / `Intelligent Analytics + Operations` · 솔루션 타깃 `For Data/Operation Experts` / `For Site Operators`
- **핵심 카피 인용:**
  - en: "REINVENT OFFLINE" · "Pioneering the most advanced data anonymization to offer industry-leading, privacy-conscious AI solutions."
  - ko: "딥핑소스는 비전 AI 기술을 활용하여 다양한 오프라인 산업 전반에 걸쳐 영상분석 혁신을 선도하고 있습니다."
- **연혁(공통 영문 그대로 노출):**
  - 2018.06 Founded in South Korea
  - 2018.08 Seed funded by Future Play
  - 2018.10 Selected for TIPS
  - 2019.09 Anonymization 특허 등록
  - 2019.11 KData Data Solution Innovator 대상
  - 2019.11 Samsung C-Lab Outside
  - 2019.12 Series A
  - 2020.02 nVidia Inception
  - 2020.04 Series A1
  - 2020.08 Launched Nachos, a Data Sharing platform
  - 2020.11 과기정통부 우수 정보보호 기술 선정
- **기능 요소:** "Go to Apply" → Saramin 외부 채용공고 링크. 두 영역 (개인/팀/회사 → 데이터/운영 전문가용·공간 운영자용) 캐러셀 또는 토글 UI(추정).
- **핵심 이미지:** `66694811...Leaf.svg`, `66694979...Leaf_left.svg` (장식), `62466bc8...Untitled-3_linkedin.png`, `..._youtube.png` (SNS 아이콘)

### 3.3 Career — `/career`
- **title:** *Career | Deeping Source*
- **목적:** 채용 안내 — 컬처(개인/팀/회사) + 핵심 가치 3개 + 복지 6개 + 오픈 포지션. (현재 페이지 상태: "진행 중인 채용이 없습니다")
- **주요 헤더:**
  - H1: `딥핑소스에서 일한다는 것은` · `딥핑소스는 이런 곳이에요` · `복지 및 혜택` · `재택 근무제` · `자유로운 휴가 사용` · `아낌없는 지원` · `라운지 이용` · `건강 케어` · `업무 외 지원` · `채용 중인 포지션`
  - H3: `개인` · `팀` · `회사`
- **핵심 카피 인용(한글):**
  - "딥핑소스는 개인의 영역을 존중하고 함께 성장하는 미래 지향적인 곳이에요."
  - 3가지 가치: `Grow together` / `Active communication` / `Enjoy new challenges`
  - "혼자 고민하기보다 팀원들과 활발히 소통하며 영감을 얻습니다."
- **복지 6개:** 재택 근무제 · 유급 sick leave · 식대/도서/IT 장비 지원 · 사내 라운지 · 종합 건강검진+상해보험 · 문화생활비/명절/경조사비
- **특이사항:** 본문 H1 라벨이 한국어다 — 영어 페이지에서도 한글 카피가 그대로 노출 (확정: extract.json 상의 `/career` 본문이 한국어로만 채워짐). **개선 필요(en/jp 미번역)**.
- **기능 요소:** 채용 포지션 카드 컴포넌트(현재 비어있음). LinkedIn/YouTube 푸터.
- **핵심 이미지:** 사내 분위기 사진 3장 `dsc054592.webp`, `dsc057091.webp`, `image98.webp` · 복지 아이콘 6개 SVG (URL-encoded 한글 파일명: 재택근무/자유로운 휴가사용/아낌없는 지원/라운지 사용/건강 케어/업무 외 지원)

### 3.4 Contact — `/contact` / `/ko/contact`
- **title:** *Contact: Take a step toward growth with Deeping Source*
- **목적:** 영업/도입 문의 진입점. 폼 + 회사 연락처.
- **주요 헤더:** H1 `Contact Us` (단일)
- **핵심 카피 인용:**
  - en: "Want to get insights into your business? Request a meeting today." · "Take a Step Toward Growth with Deeping Source"
  - ko: "비즈니스에 인사이트 더해 더욱 큰 매출 성장을 이뤄내길 원하시나요? 지금 바로 미팅을 요청하세요!"
- **기능 요소:**
  - 폼 필드: First Name *, Last Name *, Company Email *, Company Name *, Phone Number *, Department / Job Title, Message (성공: `Thank you! Your submission has been received!` / 실패: `Oops! Something went wrong while submitting the form.`)
  - 직접 연락처: `contact@deepingsource.io`, `+82 2-6956-2255`, `5F 508, Eonju-ro, Gangnam-gu, Seoul`
- **핵심 이미지:** 푸터 SNS 아이콘만 (전용 일러스트 없음)

### 3.5 Store Insight — `/store-insight` / `/ko/store-insight`
- **title:** *StoreInsight: Privacy-preserving AI Video Analytics | Deeping Source*
- **meta:** "Real-time Video Analytics based on Data Anonymization. High-accuracy computer vision for large-scale spaces: hypermarkets, shopping malls, convention centers, hospitals, logistics warehouses, construction sites, etc."
- **목적:** 매장 데이터 분석 제품의 메인 랜딩. 5가지 가치 + FAQ + Contact.
- **주요 헤더:**
  - H1(en/ko): "Enhance your offline space with Store Insight" / "STORE INSIGHT와 함께 매장을 최적화하고 매출 성장을 극대화 하세요"
  - H2: `Stop Guessing, Start Knowing — Uncover Hidden Opportunities` (ko `숨겨진 기회 발견하기`) / `Privacy First, Insights Delivered: Leverage Ethical AI` / `Amplify Your Success with Authentic Insights` / `Optimize Your Store Layout with Actionable Insights` / `Optimize Every Step of the Customer Journey` / `FAQ` / `Contact Us`
  - H3: `Valuable Decision by Profitable Insights` / `Faster Decisions by Real-Time Insights` / `Scalable Decision by Flexible Insights`
- **핵심 카피 인용:**
  - en: "STORE INSIGHT goes beyond sales & inventory." · "See where visitors go, what catches their eye, and what they almost buy."
  - ko: "방문자가 어디로 이동하는지, 무엇이 눈길을 끄는지, 무엇을 구매하려고 했는지 확인하세요."
- **분석 3축:** Traffic Patterns · Engagement Zones (dwell/gaze) · Product Interaction (pick points)
- **퍼널/구역 2축:** Funnel Analysis · Zone Optimization
- **FAQ 항목:** 비식별화란? · STORE INSIGHT 차별점? · 요금제? · 리테일 외에도? (산업 한정 없음 — 건설/전시/공공시설)
- **기능 요소:** `Optimize Now` / `도입 문의하기` CTA, FAQ 아코디언(아래 화살표 `down-arrow.png` 다수), Contact 폼.
- **핵심 이미지:**
  - PI landing graphic 3장: `624a8d78...PI landingpage_graphic_graphic.png` (and `_2`, `_3`)
  - 1actionableinsights.webp(en) / kor1actionableinsights.webp
  - 2customerjourney.webp(en) / kor2customerjourney.webp
  - 분석 5종 아이콘 SVG: `Traffic Patterns.svg`, `Engagement Zones.svg`, `Product Interaction.svg`, `Funnel Analysis.svg`, `Zone Optimization.svg`
- **참고:** 상단 `NextRise Awards 2024 Top Innovator Prize` 배지 노출.

### 3.6 Store Agent — `/storeagent` / `/ko/storeagent`
- **title:** *Store Agent: AI-Powered Retail Field Intelligence | Deeping Source*
- **meta:** "Store Agent goes beyond dashboards — surfacing which stores need attention, how conditions affect performance, and exactly where to focus next."
- **목적:** 매장 운영용 AI 에이전트(신규 라인업) — 대시보드 다음 단계로 "행동을 제시"하는 제품.
- **주요 헤더:**
  - H1: `Redefine retail operations with` · `Store Agent`
  - H2: `Know what to do next — before you ask` / `All the Context. None of the Guesswork.` / `Optimize Field Operations with Precise Actions` / `Every Field Conversation, Backed by Evidence` / `FAQ` / `Contact Us`
  - H3 (3개 가치 + 5개 기능): `Faster Decisions. Immediate Action.` · `Every Decision, Backed by Data.` · `Consistent Action, Across Every Store.` · `Automated Operational Prioritization` · `Environment-Linked Operational Recommendations` · `Real-Time Staffing Gap Detection` · `Data-Backed Field Recommendations` · `Case-Based Decision Support`
- **핵심 카피 인용:**
  - en: "See which store has an issue right now, how today's weather will affect your orders, and where a staffing gap is about to hit."
  - en: "A standard dashboard shows you numbers. Store Agent tells you what to do with them."
  - ko: "기존 대시보드는 숫자를 보여줍니다. Store Agent는 그 숫자로 무엇을 해야 하는지를 알려줍니다."
  - ko: "어떤 매장을 먼저 가야 할지 더 이상 감으로 결정하지 마세요 — 데이터가 정확히 알려줍니다."
- **차별화 메시지:** prompt-button UI · 운영 컨텍스트(날씨/스케줄/판촉) 연결 · 케이스 베이스(검증 outcomes) 기반 추천.
- **FAQ:** What is Store Agent? · How different from dashboard? · Data sources (POS, 방문객 분석, 날씨 API, 인력 스케줄, 판촉 캘린더) · 도입 규모 맞춤 가능?
- **기능 요소:** `Get Started` CTA, FAQ 아코디언, Contact 폼.
- **핵심 이미지(en):** `69a1760a...sa-value-03.jpg`, `69a175a4...sa-value-01.jpg`, `69a17589...sa-value-02.jpg`, `69a015aa...SA-00.jpg`, `699fe480...SA-03.jpg`, `699ff2e9...SA-04.jpg`, `69a01552...SA-03-035.jpg`, `69a637e8...SA-06.jpg`, `699fffdf...SA-07.jpg`
- **핵심 이미지(ko):** `69a65e07...SA-03-kr.jpg`, `SA-03-kr-1.jpg`, `SA-06-kr.jpg`, `SA-07-kr.jpg` (한국어 UI 스크린샷 별도)

### 3.7 SEAL — `/seal` / `/ko/seal`
- **title:** *SEAL: Privacy-preserving AI Video Analytics | Deeping Source*
- **meta:** "Empower your AI with secure, compliant, and efficient image/video anonymization. Real-time processing with enhanced data quality and privacy."
- **목적:** SEAL — 얼굴·번호판 자동 익명화 SDK. PII 완전 제거 + AI 학습 유용성 보존. 가장 카피 분량 큰 페이지(5,049자).
- **주요 헤더:**
  - H1: `Perfectly Protect Privacy, But AI Still Understands Data` / `SEAL Anonymizes Faces and License Plates from Visual Data without Missing` / `SEAL can Preserve the AI Data Utility` / `Proven with Mainstream Vision Tasks` / `How SEAL Works?` / `Competitive Comparison` / `SEAL is Being Actively Used for` / `AI Model Development` / `Ethical AI` / `Leveraging Real-world Data` / `Data Sharing` / `FAQ` / `Contact Us`
  - H2: `Do you ensure all PII is removed from your AI training datasets?`
- **핵심 카피 인용:**
  - en: "Perfectly Protect Privacy, But AI Still Understands Data"
  - en: "Anonymizer preserves data quality that is equivalent to the original."
  - en: "Data becomes invisible to the human eye but visible to the AI."
  - ko: "개인 식별 정보 삭제, 필수 AI 기능 유지"
  - ko: "데이터가 비식별화되면 사람의 눈에는 보이지 않지만 AI에는 보이므로..."
- **경쟁 비교표 (5×5):** SEAL / Face Replacement / Blur / Mask / De-identification × Speed · Data integrity · Validation
- **검증된 비전 태스크 (8개):** Action Recognition · Car Detection · Semantic Segmentation · Depth Estimation · Face Landmark Detection · Person Attribute · Pose Estimation · Gender/Young Classification
- **FAQ:** Video 처리 가능? · Free trial(10,000 images) · 요금제? · SEAL 후 라벨링 가능?
- **기능 요소:** GUI/Script 업로드 (3-step flow), 비교표, FAQ 아코디언, `Talk to Sales` CTA, Contact 폼.
- **핵심 이미지:**
  - 히어로: `65f932ec...eng tech-img-seal-01.png` (en), `65f932a2...kortechimgseal01.webp` (ko)
  - 비교 데모: `solution_01_1_face_original.webp` ↔ `solution_01_2_face_seal.webp` (얼굴 원본/SEAL), `solution_02_1_plate_original.webp` ↔ `_2_plate_seal.webp` (번호판)
  - 한국어 변형: `korsolution011faceoriginal.webp`, `korsolution012faceseal.webp`, `korsolution021plate...`, `korsolution022plateseal.webp`
  - 비전 태스크 썸네일 6장: `task_vision_01.webp` ~ `task_vision_010.webp` (한국어 동일 파일 재사용)
  - 3-step flow 다이어그램: `flow_01.jpg`, `flow_02.jpg`, `flow_03.jpg` (+ 모바일 `flow 1(mo).jpg` 등)
  - check-blue.svg (체크 마크)
  - down-arrow.png (FAQ)

### 3.8 Tech Anonymizer — `/tech-anonymizer` / `/ko/tech-anonymizer`
- **title:** *Anonymizer: Privacy-preserving AI Video Analytics | Deeping Source*
- **목적:** Anonymizer 원천 비식별화 기술 설명 — SEAL의 기반 기술. ML 모델 학습 가능한 anonymized data 생성.
- **주요 헤더:**
  - H1: `Revitalize Valuable but Unavailable Data` · `Anonymizer achieves both — and this what that makes the big difference` · `The Innovation Process — Building a new ML model without using original data` · `Contact Us`
  - H2: `The Long Unsolved Trade off — Data Utility vs. Privacy`
  - H3: `Meet privacy regulations through De-identified data` · `Legacy techniques make data unusable`
- **핵심 카피 인용:**
  - en: "Anonymizer obfuscates data task-specifically for users."
  - en: "Develop machine learning models without using original data."
  - ko: "데이터의 가치를 안전하게 보존하는 방법"
- **3-step Innovation Process:** ① Anonymize original data (task-specific) → ② Train new model G → ③ Deploy in actual environments
- **기능 요소:** Contact 폼.
- **핵심 이미지:** `65b9dfc4...tech_img_anonymizer.webp` (en hero), `65f9344a...kortechimganonymizer01.webp` (ko), `65c1d4a6...tech_img_anonymizer_02.webp`, 프로세스 3컷 `tech_img_anonymizer_process_01.webp/02/03` (한국어: `kortechimganonymizerprocess02.webp`, `03.webp`)

### 3.9 Tech Spatial AI — `/tech-spatial-ai` / `/ko/tech-spatial-ai`
- **title:** *Spatial AI: Privacy-preserving AI Video Analytics | Deeping Source*
- **목적:** MTMC (Multi-Target Multi-Camera) 추적 기술 소개 — 대규모 공간 객체 추적.
- **주요 헤더:**
  - H1: `Retail AI, Space Analytics` · `Spatial AI: A New Era in Space Analytics and Retail AI` · `Space Analytics for Any Environment` · `Space Analytics for Every Environment` · `Data-driven Insights in Real-Time` · `Step Into the Future with Deeping Source` · `Contact Us`
  - H3: `Our Advanced Approach` (ko `차별화된 공간 분석 기술`)
- **핵심 카피 인용:**
  - en: "Deeping Source is pioneering in the realm of AI-driven space monitoring with our MTMC Tracking technology."
  - ko: "Spatial AI: 오프라인 공간을 위한 다중 카메라 기반 AI"
- **기능 요소:** Contact 폼. (단순 설명형 페이지)
- **핵심 이미지:** GIF 히어로 `628ca480...최종.gif` (애니메이션), `65d57c29...tech_img_mtmc_02.webp`, en 전용 `ENG techimgmtmc03.webp`, `ENG techimgmtmc04.webp`; ko 전용 `kortechimgmtmc02/03/04.webp`

### 3.10 Tech Store Care AI — `/tech-store-care-ai` / `/ko/tech-store-care-ai`
- **title:** *Store Care AI | Deeping Source*
- **목적:** 매장 케어 AI — 매장 상황(청결·도어)/선반 재고/위험 행동 모니터링. (외부 사이트 `storecare.ai`로 별도 운영)
- **주요 헤더:**
  - H1: `Harnessing Advanced AI for Retail Management Innovation` · `Real-Time Data Processing` · `Space Analytics for Every Environment`(×2 중복) · `Privacy Assurance through Anonymization` · `Store Situation Monitoring AI`(×2 중복) · `Shelf Inventory Analysis AI` · `Customer Behavior Monitoring AI for Detecting Hazardous Situations`(×2 중복) · `Contact Us`
  - H2: `Core Technologies of Store Care AI`
- **핵심 카피 인용:**
  - en: "Store Care AI is built on a framework capable of processing large volumes of data in real time."
  - en: "Monitors conditions such as inadequate cleanliness or open doors in refrigeration units."
  - ko: "첨단 AI를 활용한 매장 관리 혁신"
- **핵심 기능 4개:** Real-time Data Processing · MTMC Space Analytics · Privacy(Anonymization) · 상황 모니터링(청결/문열림) · 선반 재고(부족·결품·위치오류) · 위험 행동 감지(도난 알림)
- **이슈:** H1·H3에 동일 헤더 중복(Webflow CMS 빈 슬롯 — 확정). **콘텐츠 정리 필요**.
- **외부 연결:** `https://www.storecare.ai/`
- **핵심 이미지(en/ko 변형):** `66306c63...storecareai01.webp` ↔ `66306c7a...KOstorecareai01.webp`, `662f111f...storecareai02.webp` ↔ `66306dd0...kostorecareai02.webp`, `663095...storecareai03.webp` (공용), `66304593...storecareai04.webp` (공용), `66306b77...storecareai05.webp` ↔ `663073fe...korstorecareai05.webp`

### 3.11 Blog — `/blog` / `/ko/blog` / `/jp/blog`
- **title:** *Blog | Deeping Source*
- **목적:** 블로그 허브. 19개 글의 카드 그리드 + 카테고리 탭.
- **카테고리 필터(탭):** `All` · `Tech` · `Company` · `Product` · `Trend`
- **카드 구조:** 카테고리 라벨 → 글 제목 → 본문 발췌 → `Author | Date` 메타.
- **저자 풀:** Eunyoung Park, Youngseob Lee, Pete Kim, Jamin Park, Sumin Lee.
- **기능 요소:** 카테고리 필터 (Webflow Collection list 필터), 검색은 별도 `/search` 페이지 사용.
- **핵심 이미지:** 카드 썸네일은 메타에서 캡처되지 않음 (대부분 본문 첫 이미지를 OG 자동 추출). 푸터 표준.

### 3.12 News — `/news` / `/ko/news` / `/jp/news`
- **title:** *News | Deeping Source*
- **목적:** 미디어 노출(언론보도) 모음. 본문 분량 9,502자 = 가장 무거운 페이지 중 하나.
- **주요 헤더:** H1 `Deeping Source in Media`
- **포맷:** 헤드라인 + 일자 + `Read More` 외부 링크. (정렬: 최신순)
- **노출 매체 (대표 외부 도메인):** byline.network · it.chosun.com · it.donga.com · m.asiatime.co.kr · n.news.naver.com (조선/매경/이데일리 등) · kr.aving.net · wsobi.com · itdaily.kr · spo.go.kr 등 30+ 매체
- **기간 커버리지:** 2020년 ~ 2026년 1월 (88+ 이미지 = 매체 로고/썸네일)
- **2025-2026 주요 기사 헤드라인(추출):**
  - 2026-01-20: "DeepingSource Proclaims 2026 as the Launch Year for Full-Scale Autonomous Store Operations"
  - 2025-12-15: "[Rising Tech] DeepingSource Leverages Anonymization Patent to Expand in Retail"
  - 2025-12-12: "DeepingSource Unveils AI Store Management Solution 'StoreCare' at COMEUP 2025"
  - 2025-12-11: "DeepingSource Broadens AI Store Management Analysis from Customers to Products and Cleanliness"
  - 2025-12-10: "StoreCare claims Up to 30% Sales Growth"
  - 2025-12-10: "CCTV Evolved into a Capable Store Manager — DeepingSource at COMEUP"
  - 2025-11-26: "Kim Tae-hoon, CEO: Expanding Collaboration with KDDI"
  - 2025-11-04: "Changing the store layout alone can boost sales by up to 40%"
- **기능 요소:** 외부 링크만, 내부 상세 페이지 없음. 페이지네이션/필터 부재(추정).
- **핵심 이미지:** 카드 thumbnail은 `65cebc60...Icon Guideline(24).svg` 다수 (default 아이콘 — 매체 로고 미세팅 상태일 가능성).

### 3.13 pi-docs — `/pi-docs` / `/ko/pi-docs`
- **title:** *pi-docs* (메타 정비 미흡 — title이 slug 그대로)
- **목적:** Store Insight 제품 사용 매뉴얼 허브. 10개 매뉴얼 페이지로 분기.
- **주요 헤더:** H1 `Welcome to STORE INSIGHT` · `Start Here`
- **사이드바(좌측 nav):** Home / Basic / Login / Report (구역간 통행량 · 대표 동선 · 방문자 동선 · 시간대별 히트맵 · 방문자 분석 · 구역별 분석 · 라인 분석) / Setting (설정 카테고리 테스트)
- **핵심 카피 인용(한글, 메인 본문):**
  - "스토어인사이트는 고객의 '방문 → 탐색 → 고려 → 구매' 과정을 분석해, 매장의 발걸음을 매출로 바꾸는 데 도움을 주는 데이터 분석 도구입니다."
  - "직원은 자동으로 제외되며, 고객의 나이·성별 같은 정보도 함께 분석됩니다."
  - 활용 3축: "효율적인 운영 / 성과 높은 마케팅 / 고객 경험 향상"
- **기능 요소:** 좌측 사이드 nav · 화살표 forward 아이콘 (`arrow_forward_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg`) · `Login` 버튼 푸터 · `PLUS INSIGHT` 푸터 (구버전 브랜드 잔재 — **개선 필요**).
- **메타 카피 이슈:** title=`pi-docs`, description=`None`, OG 이미지 없음 — SEO/SNS 카드 미설정.
- **푸터 저작권:** `©2018-2025` (메인 사이트는 `©2018-2026`) — **연도 불일치(확정)**.
- **핵심 이미지:** `store-insight.svg` (제품 로고), `intro-img-3.jpg` (히어로), arrow icon 다수.

---

## 4. 기능 인벤토리 (사이트 전체)

| 컴포넌트 | 위치 | 구현 흔적 | 비고 |
|---|---|---|---|
| GNB / 1depth 메뉴 | 모든 페이지 상단 | 제품 2 + 기술 4 + 회사 4 + Contact | en/ko/jp 카피 모두 정의됨 |
| 언어 스위처 | 모든 페이지 우상단 | English / Korean / Japanese 텍스트 | `/`, `/ko`, `/jp` 라우팅 |
| 글로벌 CTA `Contact Us` / `Talk to Sales` / `문의하기` | 모든 페이지 우상단 + 푸터 | 동일 폼으로 연결 (`/contact` 또는 페이지 내 폼 섹션) | 마케팅·제품·기술 페이지 모두 폼 내장 |
| 풋터 Contact 폼 (lead capture) | 마케팅·제품·기술·회사 페이지 끝단 | Webflow 폼 — 6 필드 + Success/Error 메시지 | (en/ko/jp 카피 분리) |
| 파트너 로고 그리드 | `/`, `/ko`, `/jp` 푸터 위 | "Our Partners" H1 | 로고 자산은 별도(외부 링크 sun-ds, kddi, …) |
| 비디오 임베드 | `/`, `/ko`, `/jp` 어딘가 (추정) | `play-icon.svg` + `video tumb.webp` | YouTube 채널 임베드 가능성 |
| 캐러셀 / 토글(About 차별화·솔루션 대상) | `/about-us`, `/ko/about-us` | 같은 H2 반복 노출(`Safely collect Pre-Purchase Data` 등) | Webflow Tabs 또는 Slider |
| 캐러셀(Store Agent value 카드) | `/storeagent`, `/ko/storeagent` | sa-value-01/02/03.jpg | 3장 회전 |
| FAQ 아코디언 | `/seal`, `/store-insight`, `/storeagent` | down-arrow.png 다수 = 펼침 토글 | 토글당 1 Q/A |
| 비교표 (5 컬럼) | `/seal` | SEAL vs Face Replacement vs Blur vs Mask vs De-id | 텍스트 테이블 |
| 카테고리 필터(블로그) | `/blog` | All/Tech/Company/Product/Trend 탭 | Webflow Collection filter |
| 외부 링크 리스트(뉴스) | `/news` | 80+ Read More 링크 → 외부 매체 | 정렬: 시간순 |
| 매뉴얼 사이드바 nav | `/pi-docs` 영역 | 좌측 트리 (Home/Basic/Login/Report/Setting) | 자체 매뉴얼 시스템 |
| 사이트 검색 | `/search` | 검색 결과 페이지 (콘텐츠 미수집) | Webflow native search 가능성 |
| 로그인 | `/log-in` (en/ko/jp) | Store Insight 대시보드 진입 | 사용자 인증(추정) |
| 회원가입 | `/sign-up` | 무료 trial 신청용(추정) | SEAL/SI 트라이얼 연계 가능 |
| 비밀번호 재설정 / 변경 | `/reset-password`, `/update-password` | 2개 페이지 분리 | 메일 트리거 + 신규 비번 입력 |
| 사용자 계정 페이지 | `/user-account` | 계정 정보·구독·API 키 (추정) | |
| 접근 거부 페이지 | `/access-denied` | 권한 부족 시 리다이렉트 | |
| SNS 푸터 | LinkedIn(kr) · YouTube(`UCmztsussv8Romt-V73wnklg`) | 모든 페이지 | 아이콘: `Untitled-3_linkedin.png`, `_youtube.png` |
| 외부 채용 링크 | About / Career → Saramin 회사 페이지 | "Go to Apply" CTA | KO 잡 마켓 통합 |
| 외부 제품 사이트 | `/tech-store-care-ai` → `storecare.ai` | "Explore More" CTA | 별도 호스팅 |
| 푸터 정보 | 주소·전화·저작권·`Privacy Policy` 링크·NextRise 배지 | 모든 페이지 | en도 한국 주소만 노출 |
| 개인정보 처리방침 | `/privacy` (한국어 단일) · 외부 catchsecu 링크 | catchsecu.com 운영 | en/jp 별도 번역 없음 |

---

## 5. 에셋 카탈로그 (138 이미지)

### 5.1 분류 요약
| 카테고리 | 추정 수량 | 대표 파일명 패턴 | 비고 |
|---|---|---|---|
| 로고 (브랜드) | 1 SVG + 1 product SVG | `company_logo.svg`, `store-insight.svg` | `logo-2.jpg`도 있음 (legacy?) |
| UI 아이콘·SVG | ~30 | `check-blue.svg`, `down-arrow.png`, `arrow_forward_24dp...svg`, `play-icon.svg`, `Frame.svg`/`Frame-1.svg`, `Leaf.svg`/`Leaf_left.svg` | 화살표·체크·재생 |
| 차별화/기능 아이콘 SVG | 6 (`icon-data` 등) + 5 (분석) | `icon-data.svg`, `icon-privacy.svg`, `icon-AI.svg`, `icon-space.svg`, `icon-vision.svg`, `icon-time.svg` · `Traffic Patterns.svg`, `Engagement Zones.svg`, `Product Interaction.svg`, `Funnel Analysis.svg`, `Zone Optimization.svg` | 홈/SI 페이지에서 재사용 |
| 모듈 아이콘(홈 20+ 그리드) | 4 SVG 추출됨 | `anony'.svg` (Anonymization), `People Counting.svg`, `E estimation.svg` (Age/Gender), `Queue Monitoring.svg` | 나머지 8개는 다운로드 누락(추정) |
| SNS 아이콘 | 2 PNG | `Untitled-3_linkedin.png`, `Untitled-3_youtube.png` | 푸터 |
| 복지 아이콘 SVG (Career) | 6 | URL-encoded 한글 파일명 (재택근무/자유로운 휴가/아낌없는 지원/라운지/건강케어/업무외) | Career 페이지만 사용 |
| 제품 UI 카드 webp | ~12 | `card_ui_img_1.webp` · `carduiimg2/3.webp` (+ko 변형) · `1actionableinsights.webp` · `2customerjourney.webp` · `3actionableinsightstodrivesales.webp` (+kor 변형) | 홈·SI 페이지 |
| 히어로 메인 이미지 | 2 (en/ko 변형) | `indeximg001.webp` (en), `koindeximg001.webp` (ko) | 홈 최상단 |
| Store Agent 스크린샷 (en) | 9 | `SA-00.jpg`(2 hash) · `SA-03.jpg`/`SA-03-035.jpg` · `SA-04.jpg` · `SA-06.jpg` · `SA-07.jpg` · `sa-value-01/02/03.jpg` | `/storeagent` 전용 |
| Store Agent 스크린샷 (ko) | 4 | `SA-03-kr.jpg`, `SA-03-kr-1.jpg`, `SA-06-kr.jpg`, `SA-07-kr.jpg` | `/ko/storeagent` 전용 |
| SEAL 데모 webp (en) | 4 | `solution_01_1_face_original/seal.webp`, `solution_02_1_plate_original/seal.webp` | 비포/애프터 비교 |
| SEAL 데모 webp (ko) | 4 | `korsolution011faceoriginal/seal.webp`, `korsolution021plate...` | ko 별도 자산 |
| SEAL 비전 태스크 썸네일 | 6 | `task_vision_01/02/04/05/09/010/10.webp` | 8 vision tasks 중 일부 (재사용 가능) |
| SEAL 프로세스 flow | 6 | `flow_01/02/03.jpg` + 모바일 변형 3 | 데스크탑 + 모바일 |
| SEAL hero/section img | en `eng tech-img-seal-01.png`, `tech_img_seal_02.webp`, `tech_img_seal_04.webp` · ko `kortechimgseal01/02/04.webp` | 6 |
| Anonymizer hero | en `tech_img_anonymizer.webp`, `tech_img_anonymizer_02.webp` + 프로세스 3컷 · ko `kortechimganonymizer01/012.webp` + 프로세스 ko 2 | 7 |
| MTMC / Spatial AI | hero GIF `최종.gif`, `tech_img_mtmc_02.webp`, en `ENG techimgmtmc03/04.webp`, ko `kortechimgmtmc02/03/04.webp` | 7 |
| Store Care AI | en `storecareai01/02/03/04/05.webp`, ko `KOstorecareai01.webp`, `kostorecareai02.webp`, `korstorecareai05.webp` | 8 |
| PI landingpage 그래픽 | 3 PNG `PI landingpage_graphic_graphic.png` (+2/3) | Store Insight |
| Video AI 이미지(legacy) | 3 PNG en `video-ai-img-01/02/03.png` + ko 3 webp `ko_video_ai_img_01/02/03.webp` | 홈 또는 SI 페이지 |
| Video 썸네일(intro/play) | 3 | `video tumb.webp`, `video tumb mo.webp`, `play-icon.svg` | |
| 인물·문화 사진(Career) | 3 webp | `dsc054592.webp`, `dsc057091.webp`, `image98.webp` | 사내 분위기 |
| 매뉴얼 인트로 사진 | 1 jpg | `intro-img-3.jpg` | pi-docs |
| 매뉴얼 forward arrow | 1 SVG (다수 사용) | `arrow_forward_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg` | Material Symbols |
| Privacy 스크린샷 (legacy) | 4 PNG | `630c7a1c...png` (한글 파일명 인코딩) | privacy 페이지 본문 |
| News 카드 아이콘 | 1 SVG ×다수 | `Icon Guideline(24).svg` | 88회 재사용 (placeholder?) |
| Legacy/미사용 | `logo-2.jpg`, `intro-img-3.jpg` | | 정리 후보 |

### 5.2 재사용 가능 핵심 자산 (Top 7)
1. **company_logo.svg** (`659cbd53...`) — 브랜드 로고. 모든 페이지에서 헤더·푸터에 사용.
2. **6개 differentiator SVG 아이콘** (`icon-data/privacy/AI/space/vision/time.svg`) — 차별화 카드 4개 + 부속 2개. 홈·About에서 재사용.
3. **5개 분석 SVG 아이콘** (`Traffic Patterns / Engagement Zones / Product Interaction / Funnel Analysis / Zone Optimization.svg`) — Store Insight 핵심 분석 모듈 아이콘.
4. **4개 SEAL flow 모듈 아이콘** (`anony'.svg`, `People Counting.svg`, `E estimation.svg`, `Queue Monitoring.svg`) — 홈 hero 모듈 카드.
5. **check-blue.svg / down-arrow.png / play-icon.svg / arrow_forward...svg** — 범용 UI 아이콘 4종.
6. **Leaf.svg / Leaf_left.svg / Frame.svg / Frame-1.svg** — 데코·언어 스위처 프레임.
7. **NextRise Awards 2024 Top Innovator Prize 배지** — 푸터 + 일부 페이지 상단 노출 (자산 파일은 별도 다운로드 안 됨 — 추정 텍스트 기반).

### 5.3 자산 결핍 노트
- 파트너 로고(Our Partners 그리드): 외부 도메인(`sun-ds.com`, `kddi.com`)만 확인 가능. **로고 이미지는 크롤되지 않음(추정 — webp 외부 호스팅 또는 CMS 컬렉션)**.
- 20+ 영상 분석 모듈 중 다운로드된 SVG는 4개뿐. 나머지 모듈(`People Attribute`, `Intrusion Detection`, `Attention Monitoring`, `Parking lot Vacancies`, `Crowdedness`, `Customer Journey`, `Loss Prevention`, `Behavior Analysis`, `Inventory Monitoring`)의 아이콘 누락.
- News 페이지의 매체 로고는 모두 placeholder(`Icon Guideline(24).svg`) — 실제 매체 로고 부재(확정).

---

## 6. 콘텐츠 인벤토리

### 6.1 블로그 19개 포스트
URL prefix `/post/`. 카테고리는 블로그 허브의 카드 라벨 기반(추정).

| # | Slug | 카테고리 | 한 줄 요약(추정 또는 발췌) |
|---|---|---|---|
| 1 | `2024-nextrise-awards-deepingsource` | Company (en 미공개) | 2024 NextRise Top Innovator 수상 발표 |
| 2 | `2024-nextrise-awards-deepingsource-2` | Company (en 미공개) | 동일 이벤트 후속(중복/별도 글) |
| 3 | `adapting-to-ai-company-work-as-a-new-employee` | Company | 신입 인턴들의 입사 후기 (Youngseob Lee, 2024-10-14) |
| 4 | `all-products-are-experience-goods` | Trend | 오프라인 리테일의 생존 — EMart 사례 (Jamin Park, 2024-06-27) |
| 5 | `deeping-source-pioneering-privacy-centric-retail-optimization-in-the-age-of-ai` | Company | 회사 비전 — privacy-centric AI |
| 6 | `deeping-source-story-about-deeping-source-not-dipping-source` | Company (ko 전용) | "딥핑소스(딥핑 ≠ Dipping)" 사명의 유래 |
| 7 | `deeping-sources-commitment-to-safe-ai-achieving-soc2-type-2-certification` | Company | SOC 2 Type 2 인증 획득 |
| 8 | `diving-deeper-how-heatmaps-dwell-time-and-attention-maps-revolutionize-retail-insights` | Product | 히트맵·체류·관심도 맵 활용 |
| 9 | `enhancing-holiday-retail-strategy-with-advanced-vision-ai-technology` | Trend/Product | 시즌 리테일 전략 |
| 10 | `enhancing-retail-strategy-with-ab-test` | Product | A/B 테스트로 리테일 최적화 |
| 11 | `how-ai-discovers-my-preferences-the-rise-of-intelligent-retail-systems` | Trend | AI가 어떻게 선호를 발견하나 (Pete Kim, 2024-09-10) |
| 12 | `how-we-measure-the-experience-of-a-visiting-customer-in-a-store-visit-pass-stay-analysis` | Product | Visit-Pass-Stay 분석 (Jamin Park, 2024-08-16) |
| 13 | `innovative-anonymization-how-deeping-source-enhances-ml-model-performance-2` | Tech | 익명화로 ML 모델 성능 향상 |
| 14 | `introducing-store-care-ai-revolutionizing-store-management-with-artificial-intelligence` | Tech | Store Care AI 소개 (Sumin Lee, 2024-05-28) |
| 15 | `knowledge-assembly` | Company/Tech | 회사 내부 지식 어셈블리(추정) |
| 16 | `navigating-the-privacy-ai-paradox-with-seal` | Tech | SEAL 사례 |
| 17 | `plus-insight-dashboard-zone-interest-analysis` | Product | Zone Interest 대시보드 분석 (Eunyoung Park, 2024-11-11) |
| 18 | `privacy-in-machine-learning-applications-how-deeping-source-tackles-privacy-while-preserving-utility` | Tech | ML 프라이버시 vs Utility |
| 19 | `seal-a-solution-for-compliance-with-the-eu-ai-act-and-gdpr` | Trend | EU AI Act/GDPR 대응 SEAL (Sumin Lee, 2024-07-19) |
| 20 | `setting-ourselves-apart-actionable-insights-redefining-retail-with-computer-vision-ai` | Tech/Product | 차별화 메시지 |
| 21 | `the-birth-of-deeping-source` | Company | 창업 스토리 |
| 22 | `the-key-to-pleasant-brick-and-mortar-experiences` | Trend | 오프라인 매장 경험 |
| 23 | `vision-ai-the-secret-ingredient-to-recapturing-missed-sales-opportunities-in-hypermarkets` | Product | 비전 AI로 매출 회수 |
| 24 | `why-anonymized-ai` | Tech | 익명화 AI 사용 이유 |
| 25 | `why-plus-insight-is-the-plus-your-business-needs-transforming-data-into-decisions` | Product | PLUS INSIGHT 가치 (구브랜드명 잔재) |

> **노트:** 카운트 일치 — 23개 slug × 다국어 인스턴스. ko 전용 글 3개(`2024-nextrise-awards-deepingsource`, `..._-2`, `deeping-source-story-...not-dipping-source`)와 jp 누락 글이 존재 (§7 참조). 카테고리는 블로그 카드 메타에 직접 표기되어 있고, 본 카탈로그는 발췌 본문에서 추정.

### 6.2 뉴스(언론 보도) 30+ 항목 — `/news`
대표 항목 (시간 역순). 전체 88+ Read More 링크 중 메이저만 추림. URL은 모두 외부.

| 일자 | 헤드라인 | 매체(추정 도메인) |
|---|---|---|
| 2026-01-20 | "DeepingSource Proclaims 2026 as the Launch Year for Full-Scale Autonomous Store Operations" | (외부) |
| 2025-12-15 | "[Rising Tech] DeepingSource Leverages Anonymization Patent to Expand in Retail" | (외부) |
| 2025-12-12 | "DeepingSource Unveils AI Store Management Solution 'StoreCare' at COMEUP 2025" | byline.network |
| 2025-12-11 | "DeepingSource Broadens AI Store Management Analysis from Customers to Products and Cleanliness" | |
| 2025-12-10 | "DeepingSource Showcases Store Management AI 'StoreCare' at COMEUP 2025, Claiming Up to 30% Sales Growth" | |
| 2025-12-10 | "CCTV Evolved into a Capable Store Manager — DeepingSource at COMEUP" | |
| 2025-11-26 | "Kim Tae-hoon, CEO: Expanding Collaboration with KDDI, Achieving Tangible Results in Japan's Retail Market" | byline.network |
| 2025-11-25 | "DeepingSource: All Customer Behavior in Offline Stores Should Be Fully Data-Driven" | |
| 2025-11-24 | "SBA and AUMOVIO: Ultra-Gap Startup Link-Up to Serve as a Catalyst for Mobility Innovation" | |
| 2025-11-07 | "Aumovio Korea Hosts 'Innovation Day'" | |
| 2025-11-04 | "[Interview] Changing the store layout alone can boost sales by up to 40%" | |
| 2024-03-18 | "Deeping Source launches Store Caring Solution… Contribute to improving small business sales through data" | |
| 2023-05-12 | "Deeping Source CEO Kim Tae-hoon: CCTV footage can be analyzed with AI without violating personal information" | |
| 2023-05-12 | "[AI Revolution] (32) Deeping Source — We make all the data in the world safe to use" | |
| 2023-04-12 | "Unione Communications X Deeping Source, AI video analysis safety management solution" | |
| 2022-12-28 | "Proven by Intel — Responsible AI creates safe data" | |
| 2022-11-12 | "Deeping Source introduces AI anonymization SEAL at COMEUP 2022" | |
| 2022-05-02 | "Deeping Source attracts KRW 16 billion in pre-B investment from overseas VCs" | |
| 2020-01-08 | "AI startup Deeping Source attracts 5.5 billion won Series A investment" | |

External 매체 도메인 풀(중복 제거 후 일부): `byline.network`, `n.news.naver.com` (매경/조선/이데일리 등), `it.chosun.com`, `it.donga.com`, `kr.aving.net`, `itdaily.kr`, `wsobi.com`, `m.asiatime.co.kr`, `spo.go.kr`.

### 6.3 pi-manual (10 페이지)
모두 Store Insight 대시보드 사용 매뉴얼. 사이드바 그룹: **Basic** (Login) · **Report** (구역간 통행량/대표 동선/방문자 동선/시간대별 히트맵/방문자 분석/구역별 분석/라인 분석) · **Setting** (설정 카테고리 테스트).

| Slug | 한글 명칭 | 그룹 |
|---|---|---|
| `heatmap-analysis` | 히트맵 분석 | Report (ko only) |
| `heatmap-by-time-analysis` | 시간대별 히트맵 분석 | Report |
| `heatmapbytime-analysis` | (variant duplicate) | Report (ko only) |
| `inter-zone-traffic-analysis` | 구역간 통행량 | Report |
| `line-analysis` | 라인 분석 | Report |
| `login` | 로그인 (매뉴얼) | Basic |
| `main-path-analysis` | 대표 동선 | Report |
| `seoljeong-kategori-teseuteu` | 설정 카테고리 테스트 (발음 slug 잔재) | Setting |
| `visitor-analysis` | 방문자 분석 | Report |
| `visitor-path-analysis` | 방문자 동선 | Report |
| `zone-analysis` | 구역별 분석 | Report |

> **노트:** `heatmap-analysis` 와 `heatmapbytime-analysis` 는 ko 전용 — 영문/일문에는 미존재(slug 정리 누락). `seoljeong-kategori-teseuteu`는 한국어 발음 그대로 slug화되어 다국어 부적합.

---

## 7. 다국어 일관성 노트

### 7.1 페이지 카운트 매트릭스 (urls.txt 기반)
| 그룹 | en | ko | jp | 비고 |
|---|---|---|---|---|
| Top-level (home + 5 product/tech + 5 회사) | 11 | 11 | 11 | 동등 |
| Blog posts | 19 | 22 | 17 | ko 가장 많음(KO 전용 3개), jp 일부 글 미번역 |
| pi-manual | 9 | 11 | 9 | ko 전용 2개(`heatmap-analysis`, `heatmapbytime-analysis`) |
| 시스템(log-in/sign-up 등) | 8 | 8 | 8 | 동등 |
| 합계 | **47** | **52** | **45** | jp가 가장 적음 — ko 단일 글 5개·jp 누락 8개 (확정) |

### 7.2 jp에 없는 페이지 (ko·en에는 있는데)
- `/jp/post/2024-nextrise-awards-deepingsource` — 부재
- `/jp/post/2024-nextrise-awards-deepingsource-2` — 부재
- `/jp/post/deeping-source-story-about-deeping-source-not-dipping-source` — 부재 (ko 전용)
- `/jp/post/introducing-store-care-ai-...` — 부재
- `/jp/pi-manual/heatmap-analysis` — 부재
- `/jp/pi-manual/heatmapbytime-analysis` — 부재

### 7.3 ko 전용 페이지
- 3개 KO 전용 블로그 글 (위 참조)
- 2개 KO 전용 pi-manual 페이지 (변형/잔재 slug)
- `/privacy` — 한국어 단일 (en·jp에서도 같은 한글 본문 노출, 확정)

### 7.4 카피 톤 차이 관찰
- **EN:** 동사 강한 명령형 헤드라인 ("Stop Guessing, Start Knowing", "Know what to do next — before you ask"). PII·GDPR·EU AI Act 등 글로벌 컴플라이언스 키워드 직접 노출.
- **KO:** 정중한 격식체 + 일부 영문 그대로 ("STORE INSIGHT", "Store Agent", "MTMC", "PLUS INSIGHT" 혼용). 슬로건 `Perfect Every Space`는 ko에서도 영문 그대로. `Stop Guessing, Start Knowing:` 같은 영문 H2를 남기고 본문만 한국어 ("숨겨진 기회 발견하기").
- **혼재 신호:** 홈 페이지에 `STORE INSIGHT` ↔ `PLUS INSIGHT` 두 브랜드명이 같은 페이지 내에 공존. PLUS INSIGHT가 구브랜드로 보임(추정), 마이그레이션 미완료. ko 본문 후반부에 `"Store Insight는 구매 전 데이터에서 실행 가능한 인사이트를 추출하는 가장 간단한 방법입니다."` 다음 단락에서 `Plus Insight`로 다시 표기되는 등 일관성 문제.
- **카피 분량 비대칭:** en 본문 4,325자(home) → ko 2,749자, en seal 5,049자 → ko 2,919자. ko가 평균 40-50% 더 짧음 — 메뉴 항목 본문 미번역/요약 가능성(확정).
- **Career page:** EN URL이지만 본문은 100% 한국어. 다른 회사 페이지(About/Contact)는 EN 카피 정상.
- **푸터 주소:** EN 페이지도 `5F 508, Eonju-ro, Gangnam-gu, Seoul, Republic of Korea` 한국 주소 단일 — 글로벌 페이지에 글로벌 representation 부재(확정).
- **메타 description 불일치:** Spatial AI / Anonymizer / Store Care AI 페이지 meta는 모두 동일한 "Real-time Video Analytics based on Data Anonymization. High-accuracy computer vision for large-scale spaces..." (확정 — 페이지 차별화 없음, SEO 누수).
- **pi-docs 푸터 연도:** `©2018-2025` (메인은 2026) — **확정 불일치**.

---

## 8. 새 홈페이지로 가져갈 자산 — 우선순위

### 8.1 가져갈 것 (Keep & Port)
| 자산 | 사유 |
|---|---|
| **브랜드 로고 SVG** (`company_logo.svg`) | 그대로 사용 |
| **6개 차별화 아이콘 SVG** (icon-data/privacy/AI/space/vision/time) | 라인 일러스트 양식 일관, 홈 + About 둘 다 사용 가능 |
| **5개 분석 아이콘 SVG** (Traffic/Engagement/Product/Funnel/Zone) | Store Insight 모듈 아이콘 재사용 |
| **3-step Innovation Process 다이어그램** (`flow_01/02/03.jpg`) | SEAL 핵심 설명 자산 |
| **3개 가치 카드 카피(Store Agent)** "Faster Decisions" / "Every Decision Backed by Data" / "Consistent Action" | 신규 SA 메시지 — 그대로 또는 다듬어 사용 |
| **연혁(About) 2018-2020 마일스톤** | 회사 신뢰도 자산, 확장(2021-2026) 필요 |
| **NextRise Awards 2024 배지** | 글로벌 신뢰 신호 |
| **20+ 영상 분석 AI 모듈 목록 + 상태(Available/Final Testing/Development)** | 제품 깊이를 보여주는 강력한 신호 |
| **8개 SEAL 비전 태스크 검증** | B2B 기술 신뢰 자료 |
| **블로그 19개 글** (특히 Trend·Tech 카테고리) | SEO 자산, 마이그레이션 권장 |
| **뉴스(미디어 노출) 88+ 링크** | 사회적 증거(social proof) — `/news` 페이지는 골격 유지 |
| **외부 파트너 링크**(sun-ds, kddi) | 파트너 그리드 재구성용 |
| **연락처 fact**(주소·전화·이메일) | 그대로 |

### 8.2 재해석할 것 (Rework)
| 자산 | 사유 |
|---|---|
| **메인 히어로 카피 `Perfect Every Space`** | 강하지만 모호 — Store Agent 신규 시대 메시지에 맞춰 재정의 (예: "From Insight to Action") |
| **PLUS INSIGHT ↔ STORE INSIGHT 브랜드명 혼재** | 단일 브랜드(STORE INSIGHT)로 통일 → 카피·이미지·매뉴얼 푸터 일괄 교체 |
| **Anonymizer ↔ SEAL 관계 설명** | 별도 2 페이지로 분리되어 중복 큼 — 1차 페이지(SEAL=제품)·2차(Anonymizer=tech) 또는 통합 권장 |
| **Career 페이지** | 한국어 단일 → en/jp 번역 + 채용 포지션 비어있는 상태 활성화 |
| **회사 연혁(2018-2020 stopped)** | 2021-2026 마일스톤 추가 (Series B 16B, SOC 2 Type 2, KDDI/Aumovio, COMEUP 2025, StoreCare 등 뉴스에서 회수) |
| **3개 기술 페이지(Anonymizer/Spatial AI/Store Care AI)의 동일 meta description** | 페이지별 차별화 — SEO + SNS 카드 |
| **Store Care AI 페이지 H1/H3 중복** | 구조 정리 — 외부 storecare.ai 와의 역할 분담 명확화 |
| **pi-docs UI** | 정식 product docs 사이트(예: `docs.deepingsource.io`)로 분리하거나, 사이드 nav 디자인 업그레이드 |
| **20+ 모듈 아이콘 누락 8개** | 디자인 시스템에서 일괄 제작 |
| **파트너 그리드** | 현재 로고 자산 없음 — 파트너 로고 일괄 수집·표준화 |
| **News 카드 placeholder 아이콘** | 매체 로고 / 카드 썸네일 실제 자산 채우기 |
| **푸터 한국 주소 단일** | en에서는 글로벌 표기(서울 본사 + 글로벌 contact)로 |
| **언어 스위처** | 라벨(English/Korean/Japanese) → 깃발 + 코드(EN/KO/JA) 형식 검토 |

### 8.3 버릴 것 (Drop)
| 자산 | 사유 |
|---|---|
| **`/untitled/untitled-2`** | 미공개 잔재 페이지 |
| **`/pi-manual/heatmapbytime-analysis`** | `/heatmap-by-time-analysis` 와 중복 slug |
| **`/pi-manual/seoljeong-kategori-teseuteu`** | 한국어 발음 그대로 slug — 비전문적 |
| **`logo-2.jpg`** | legacy 로고, 미사용 (추정) |
| **`Icon Guideline(24).svg` (News placeholder)** | 디폴트 아이콘 — 매체 로고로 교체 |
| **`PLUS INSIGHT` 브랜드명 잔재** | 모든 카피·푸터·이미지에서 제거 |
| **`©2018-2025` (pi-docs 푸터)** | 연도 통일(`©2018-{current}`) |
| **반복되는 동일 meta description** | 페이지별 unique meta 작성 |
| **About 페이지 2018 이전 history 블록(있다면)** | (현재 데이터엔 없음) |
| **중복 H2/H3 (Store Care AI 페이지 등)** | CMS 정리 |
| **`access-denied` 페이지의 디폴트 카피(추정)** | 브랜드 톤으로 재작성 |
| **`Saramin` 외부 채용 페이지 단방향 의존** | 채용 페이지를 자체적으로 유지(외부는 보조) |

---

## 부록 A. 핵심 fact 한 줄 요약 (영업/소개 카피용)

- **창업:** 2018년 6월 한국. Future Play seed → Series A(2019.12) → Series A1(2020.04) → Pre-B 16B KRW(2022.05).
- **핵심 IP:** Anonymization 특허(2019.09 등록). SOC 2 Type 2 인증.
- **수상:** KData Data Solution Innovator 대상(2019), Samsung C-Lab Outside(2019), 과기정통부 우수 정보보호 기술(2020), NextRise Awards 2024 Top Innovator.
- **파트너:** nVidia Inception, Intel(검증 케이스), KDDI(일본 전개), Aumovio(모빌리티), KT(차세대 협력) — 뉴스 헤드라인에서 도출.
- **제품 라인업(2026 기준):**
  1. **SEAL** — 익명화 SDK (얼굴/번호판)
  2. **Store Insight** (구 PLUS INSIGHT) — 매장 분석 대시보드
  3. **Store Agent** — 매장 운영 AI 에이전트 (2025-2026 신규 hero)
  4. **Store Care AI** — 매장 케어(청결/재고/안전), 외부 storecare.ai 운영
  5. **20+ Vision AI 모듈** — Anonymization, People Counting, People Attribute, Intrusion, Queue, Attention, Parking lot, Crowdedness, Customer Journey, Loss Prevention, Behavior Analysis, Inventory Monitoring
- **2026 전략(뉴스 헤드라인):** "Full-Scale Autonomous Store Operations 발표" — 단순 분석 → 자율 매장 운영으로 포지셔닝 이동.

---

## 부록 B. 새 홈페이지 IA 설계 시 참고할 5가지 핵심 관찰

1. **하이브리드 진입점:** deepingsource.io는 마케팅 사이트 + 사용자 대시보드(로그인/계정) + 제품 매뉴얼(pi-docs)이 한 도메인에 묶여 있다. 새 사이트는 마케팅 / app(login 너머) / docs 의 3-도메인 분리 vs 단일 도메인 + path 분리 결정이 필요.
2. **제품 4개의 관계 정리 필요:** SEAL · Store Insight · Store Agent · Store Care AI 4개가 모두 hero 격으로 노출되지만, 실제 가치 사슬은 "Anonymizer(원천 기술) → SEAL(SDK) → Store Insight(분석 대시보드) → Store Agent(행동 에이전트) / Store Care AI(매장 운영)" 의 스택 구조다. 새 사이트는 스택 시각화가 필요.
3. **다국어 전략 재정의:** 현재 ko 본문이 en 대비 40-50% 짧고 일부 헤더는 영문 잔존. jp는 8개 페이지가 누락. 새 사이트는 ko-first → en/jp 동등 번역 워크플로(또는 i18n 시스템) 필요.
4. **콘텐츠 자산은 살아있다:** 블로그 19+개, 뉴스 88+개, 매뉴얼 10개로 SEO·신뢰 자산이 충분. 새 사이트 IA에서 `Resources`(blog/news/case studies/docs) 허브를 1depth로 격상 권장.
5. **브랜드 마이그레이션 잔재:** PLUS INSIGHT → STORE INSIGHT 리브랜딩 미완료 흔적이 홈/매뉴얼에서 다수 발견됨. 새 사이트 런치 = 이 이전 마이그레이션을 깔끔하게 마치는 기회.

---

*End of INVENTORY.md*
