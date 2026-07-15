// migrate-case-studies — one-time migration of the 5 hardcoded case studies
// (formerly in src/components/corporate/views/CaseStudiesView.tsx) into the
// Keystatic-managed `caseStudies` collection: content/case-studies/{slug}[-ko|-jp].mdx.
//
// Structure (icon/stage/products/verified) is locale-invariant; text is per-locale.
// After this runs, the MDX files are the source of truth (edited via /keystatic).
// Re-running OVERWRITES the 15 files — do not re-run after editors have changed them.
//
//   node scripts/migrate-case-studies.mjs
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(import.meta.dirname, '..', 'content', 'case-studies');
const DATE = '2026-01-15';

// ── locale-invariant structure ──
const STRUCTURE = [
  { slug: 'smb-53', industryIcon: 'Store', goldenStep: 'discover',
    products: ['store care Anomaly', 'store care Clean', 'store care Refrig', 'store care Shelf'],
    verified: [true, true, true, true], showAdoptionChart: true, featured: true },
  { slug: 'cvs-100', industryIcon: 'Building2', goldenStep: 'verify',
    products: ['store insight', 'store agent', 'store care'],
    verified: [false, false, false, true], showAdoptionChart: false, featured: false },
  { slug: 'drug-translate', industryIcon: 'Pill', goldenStep: 'translate',
    products: ['store insight', 'store agent'],
    verified: [false, false, false, false], showAdoptionChart: false, featured: false },
  { slug: 'cafe-sync', industryIcon: 'Coffee', goldenStep: 'sync',
    products: ['store care (Clean)', 'store insight'],
    verified: [false, false, false, true], showAdoptionChart: false, featured: false },
  { slug: 'space-remeasure', industryIcon: 'Landmark', goldenStep: 'remeasure',
    products: ['Anonymizer (SEAL)', 'Spatial AI (MTMC)', 'store insight'],
    verified: [false, false, false, false], showAdoptionChart: false, featured: false },
];

// ── per-locale text (index 0..4 aligned with STRUCTURE) ──
const TEXT = {
  ko: [
    { industry: '편의점 · 무인매장', audience: '점주 (본사 보강)',
      headline: '53개 매장이 증명한 변화',
      sub: '약속이 아니라 측정. 편의점 32곳·무인매장 21곳, 두 달의 기록.',
      context: '53명 점주의 하루는 CCTV를 반복해 들여다보는 일에서 시작됐습니다. store care 4개 모듈을 전수 도입해, 매장에 없어도 이상·청결·냉장·진열을 알림으로 먼저 받도록 바꿨습니다.',
      before: '하루 종일 CCTV를 직접 확인 · 문제는 늘 사후 대응',
      after: '이상 상황을 알림으로 먼저 인지 · 즉시 대응',
      metrics: [
        { label: 'CCTV 확인 시간', value: '30분 → 8분 (약 73% 단축)' },
        { label: 'CCTV 확인 횟수', value: '6회 → 3회 (약 50% 감소)' },
        { label: '대응 시점', value: '사후 → 즉시' },
        { label: '실측 표본', value: '53개 매장 (편의점 32 · 무인 21)' },
      ],
      quotes: [
        { text: '매장에 없어도 알림이 오니까 마음이 편해요.', who: '서초구 편의점 조OO' },
        { text: '새벽에 바로 알았어요. 폐기 손실을 막았습니다.', who: '홍대 무인문구점 권OO' },
      ],
      note: 'Golden Case의 출발점. 53개 매장의 실측이 이후 사례들의 근거 자산이 됩니다.' },
    { industry: '편의점 본사', audience: '본사 임원 (운영·SV 본부)',
      headline: '100개 매장이 한 호흡으로',
      sub: '하루 수백 개 알림 중 오늘 봐야 할 한 줄을, 본사가 같은 기준으로.',
      context: '편의점 프랜차이즈 본사 운영 본부의 화면에는 매일 수백 개의 알림과 KPI가 쌓입니다. store insight가 가설 한 줄로 묶고, store agent가 우선순위를 권고해 “왜 그런가”를 확인하는 검증 사이클을 만듭니다.',
      before: '매장별 제각각 운영 · 무엇부터 볼지 판단 불가',
      after: '가설 카드로 우선순위 한 줄 도출 · 100점포 동일 기준',
      metrics: [
        { label: '동시 도입 매장', value: '100개 매장' },
        { label: '일일 확인 KPI 수', value: '예시: 1,000 → 12 수준으로 압축' },
        { label: 'SV 출장 일정', value: '예시: 약 40% 감소' },
        { label: '점주 알림 KPI', value: '실측 4종은 Case 1에서 인용' },
      ],
      quotes: [
        { text: '여러 매장이 한 매장처럼 운영됩니다.', who: 'A편의점 본사 운영 본부장 (예시 인용)' },
        { text: '우리 점주들이 먼저 도입을 요청합니다.', who: 'A편의점 가맹사업본부장 (예시 인용)' },
      ],
      note: '본사 마스터 “모든 공간을, 완벽하게”가 헤드라인에 박히는 검증 단계의 원형.' },
    { industry: '드럭스토어 본사', audience: '본사 임원 (MD·운영)',
      headline: `'옮기세요'가 아니라 '옮기면 객단가 +8%'`,
      sub: '결품 응답의 본사 한 줄이 점주의 언어로 번역되는 순간.',
      context: '본사 MD의 결품 알림은 점주에게 잘 도달하지 않았습니다. 점주는 “왜 옮겨야 하는지”를 몰랐기 때문입니다. store insight의 가설을 store agent가 점주 언어로 옮겨, “왜”가 “얼마”로 바뀝니다.',
      before: `본사 권고가 점주에게 '왜'로만 남음`,
      after: `권고가 점주 언어 '옮기면 +8%'로 번역되어 실행률 상승`,
      metrics: [
        { label: '점주 권고 실행률', value: '예시: 약 87% 수준' },
        { label: '권고 → 실행 시간', value: '예시: 약 4.5일 → 1.7일' },
        { label: '매장 평균 객단가', value: '예시: 약 +8%' },
        { label: 'MD 1인 담당 매장', value: '예시: 12 → 30 수준' },
      ],
      quotes: [
        { text: `점주가 '왜'를 묻지 않게 됐어요.`, who: 'B드럭스토어 MD 팀장 (예시 인용)' },
        { text: '옮기라 하면 안 옮기던 분들이 +8%라고 하면 옮깁니다.', who: 'B드럭스토어 운영팀장 (예시 인용)' },
      ],
      note: '본사 도구만으로 깊이를 보여주는 사례. 본사와 점주 사이의 언어 격차를 메우는 번역 단계의 원형.' },
    { industry: '카페 체인', audience: '본사 · 점주 양시각',
      headline: '본사가 본 청결, 점주가 받은 청결',
      sub: '본사 대시보드의 KPI와 점주 모바일 알림이 같은 한 자리를 보는 주.',
      context: '본사의 “주간 청결 점수”와 점주의 “테이블 어지러움 알림”은 서로 다른 단어였습니다. store insight의 청결 KPI 임계값을 store care 알림 임계값과 동기화해, 본사가 한 줄만 조정하면 전 매장이 같은 주부터 같은 자리를 봅니다.',
      before: '본사 KPI와 점주 알림이 다른 언어로 분리',
      after: '임계값 동기화로 전 매장이 같은 기준의 청결을 봄',
      metrics: [
        { label: '본사 ↔ 점주 KPI 정합률', value: '예시: 64% → 100%' },
        { label: '청결 알림 노이즈', value: '예시: 38% → 9%' },
        { label: '점주 알림 실행률', value: '예시: 71% → 92%' },
        { label: '청결 모듈 점주 KPI', value: '실측 4종은 Case 1에서 인용' },
      ],
      quotes: [
        { text: '본사 화면이 점주 폰과 같은 말을 합니다.', who: 'C카페 가맹사업본부장 (예시 인용)' },
        { text: '알림이 줄었는데 매장은 더 깨끗합니다.', who: 'C카페 점주 김OO · 강남 매장 (예시 인용)' },
      ],
      note: '두 마스터 카피가 한 페이지의 다른 면에 박히는 사례 — 상단 본사 “모든 공간을, 완벽하게”, 하단 점주 “우리 매장이 대표 매장처럼”.' },
    { industry: '대형 공간 (전시·박물관)', audience: '기술 의사결정자 (CTO·CISO)',
      headline: '얼굴 없이도 동선을 봅니다',
      sub: '익명화 위에서 6개월간 운영. 효과 미달 자리는 다시 번역으로 되돌린 기록.',
      context: '전시 공간의 동선 분석은 얼굴 인식 없이는 불가능하다고 여겨졌습니다. Anonymizer와 Spatial AI 위에서 얼굴 없이 동선을 6개월간 운영하고, 재측정 시점에 효과 미달 자리는 정직하게 다시 번역 단계로 되돌립니다.',
      before: '개인정보·보안 부담으로 영상 동선 분석 도입 보류',
      after: '실시간 익명화 위에서 동선 운영 · 재측정으로 효과 검증',
      metrics: [
        { label: '효과 입증 자리', value: '예시: 22개 중 18개 (약 82%)' },
        { label: '효과 미달 자리', value: '예시: 4개 → 다시 번역(3단계)으로' },
        { label: '얼굴 인식', value: '0건 (SEAL 익명화 보장)' },
        { label: 'MTMC 트래킹', value: '예시: 정확도 약 94%' },
      ],
      quotes: [
        { text: '얼굴 없이도 동선이 보입니다.', who: 'D 시설 운영 본부장 (예시 인용)' },
        { text: '효과 미달을 숨기지 않는 데이터입니다.', who: 'D 시설 보안 책임자 (예시 인용)' },
      ],
      note: '5건 중 유일한 비-리테일 사례. “효과 미달도 숨기지 않는다”는 재측정 단계의 원형이자 Beyond Retail의 첫 증명.' },
  ],
  en: [
    { industry: 'Convenience · Unmanned stores', audience: 'Owners (HQ-reinforced)',
      headline: 'The change 53 stores proved',
      sub: 'Measured, not promised. 32 convenience stores and 21 unmanned stores, over two months.',
      context: 'For 53 owners, the day began with scanning CCTV over and over. We deployed all four store care modules across every store, so anomalies, cleanliness, refrigeration, and shelves arrive as alerts first — even when the owner is away.',
      before: 'Checking CCTV all day · always reacting after the fact',
      after: 'Anomalies recognized first via alerts · acting immediately',
      metrics: [
        { label: 'CCTV review time', value: '30 min → 8 min (about 73% less)' },
        { label: 'CCTV review frequency', value: '6× → 3× (about 50% fewer)' },
        { label: 'Response timing', value: 'After the fact → immediate' },
        { label: 'Measured sample', value: '53 stores (32 convenience · 21 unmanned)' },
      ],
      quotes: [
        { text: 'Alerts come even when I’m not at the store, so I feel at ease.', who: 'Cho, convenience store, Seocho-gu' },
        { text: 'I knew at dawn, right away. It prevented disposal losses.', who: 'Kwon, unmanned stationery store, Hongdae' },
      ],
      note: 'The starting point of the Golden Case. Measurements from 53 stores become the evidence base for every case that follows.' },
    { industry: 'Convenience-store HQ', audience: 'HQ executives (Operations · SV division)',
      headline: '100 stores, in one breath',
      sub: 'Out of hundreds of daily alerts, the one line to act on today — held to the same standard by HQ.',
      context: 'Each day, hundreds of alerts and KPIs scroll across the screens of a convenience franchise’s HQ operations division. store insight binds them into a single hypothesis line, and store agent recommends priorities, creating a verification cycle that confirms the “why.”',
      before: 'Each store run differently · no way to judge what to look at first',
      after: 'A single priority line drawn from hypothesis cards · one standard across 100 stores',
      metrics: [
        { label: 'Stores deployed at once', value: '100 stores' },
        { label: 'Daily KPIs to review', value: 'Illustrative: compressed from ~1,000 to ~12' },
        { label: 'SV field-visit schedule', value: 'Illustrative: about 40% fewer' },
        { label: 'Owner alert KPIs', value: 'The 4 measured metrics are cited from Case 1' },
      ],
      quotes: [
        { text: 'Multiple stores run like one store.', who: 'HQ Operations Director, Convenience Chain A (illustrative)' },
        { text: 'Our owners are the ones asking us to adopt it first.', who: 'Franchise Business Head, Convenience Chain A (illustrative)' },
      ],
      note: 'The archetype of the verification stage, where the HQ master copy “Perfect every space” lands in the headline.' },
    { industry: 'Drugstore HQ', audience: 'HQ executives (MD · Operations)',
      headline: 'Not “move it” but “move it for +8% per ticket”',
      sub: 'The moment HQ’s one-line stockout response is translated into the owner’s language.',
      context: 'HQ MD’s stockout alerts rarely reached owners, because owners didn’t know “why they should move it.” store agent translates store insight’s hypothesis into the owner’s language, turning the “why” into a “how much.”',
      before: 'HQ recommendations remain only a “why” to owners',
      after: 'Recommendations translated into the owner’s language — “move it for +8%” — lifting execution',
      metrics: [
        { label: 'Owner recommendation execution', value: 'Illustrative: about 87%' },
        { label: 'Recommendation → execution time', value: 'Illustrative: about 4.5 days → 1.7 days' },
        { label: 'Avg. ticket per store', value: 'Illustrative: about +8%' },
        { label: 'Stores per MD', value: 'Illustrative: from ~12 to ~30' },
      ],
      quotes: [
        { text: 'Owners stopped asking “why.”', who: 'MD Team Lead, Drugstore B (illustrative)' },
        { text: 'People who wouldn’t move it when told to, move it when they hear +8%.', who: 'Operations Lead, Drugstore B (illustrative)' },
      ],
      note: 'A case that shows depth with HQ tools alone — the archetype of the translation stage that bridges the language gap between HQ and owners.' },
    { industry: 'Cafe chain', audience: 'HQ · owners, both views',
      headline: 'Cleanliness as HQ saw it, as owners received it',
      sub: 'The week HQ dashboard KPIs and owner mobile alerts watch the very same spot.',
      context: 'HQ’s “weekly cleanliness score” and owners’ “table-clutter alert” were different words. By syncing store insight’s cleanliness KPI thresholds with store care alert thresholds, one adjustment by HQ means every store sees the same spot from the same week.',
      before: 'HQ KPIs and owner alerts split into different languages',
      after: 'Threshold sync lets every store see cleanliness by one standard',
      metrics: [
        { label: 'HQ ↔ owner KPI alignment', value: 'Illustrative: 64% → 100%' },
        { label: 'Cleanliness alert noise', value: 'Illustrative: 38% → 9%' },
        { label: 'Owner alert execution', value: 'Illustrative: 71% → 92%' },
        { label: 'Cleanliness module owner KPIs', value: 'The 4 measured metrics are cited from Case 1' },
      ],
      quotes: [
        { text: 'The HQ screen speaks the same language as the owner’s phone.', who: 'Franchise Business Head, Cafe C (illustrative)' },
        { text: 'Alerts dropped, yet the stores are cleaner.', who: 'Kim, owner · Gangnam store, Cafe C (illustrative)' },
      ],
      note: 'A case where both master copies land on different sides of one page — HQ’s “Perfect every space” above, owner’s “Our store, like the best” below.' },
    { industry: 'Large venues (exhibitions · museums)', audience: 'Technical decision-makers (CTO · CISO)',
      headline: 'Reading flow without faces',
      sub: 'Six months of operation atop anonymization. A record of returning underperforming spots back to translation.',
      context: 'Flow analysis in exhibition spaces was thought impossible without facial recognition. We ran flow without faces for six months atop Anonymizer and Spatial AI, and at re-measurement, honestly returned underperforming spots back to the translation stage.',
      before: 'Video flow analysis shelved over privacy and security concerns',
      after: 'Flow operated atop real-time anonymization · effectiveness verified by re-measurement',
      metrics: [
        { label: 'Spots proven effective', value: 'Illustrative: 18 of 22 (about 82%)' },
        { label: 'Underperforming spots', value: 'Illustrative: 4 → back to translation (stage 3)' },
        { label: 'Facial recognition', value: '0 cases (guaranteed by SEAL anonymization)' },
        { label: 'MTMC tracking', value: 'Illustrative: about 94% accuracy' },
      ],
      quotes: [
        { text: 'We can see flow without faces.', who: 'Facility Operations Director, Venue D (illustrative)' },
        { text: 'It’s data that doesn’t hide what underperforms.', who: 'Facility Security Lead, Venue D (illustrative)' },
      ],
      note: 'The only non-retail case of the five. The archetype of the re-measurement stage — “we don’t hide what underperforms” — and the first proof of Beyond Retail.' },
  ],
  jp: [
    { industry: 'コンビニ · 無人店舗', audience: '店主（本社が補強）',
      headline: '53店舗が証明した変化',
      sub: '約束ではなく、測定。コンビニ32店・無人店舗21店、2か月の記録。',
      context: '53名の店主の一日は、CCTVを繰り返し見続けることから始まっていました。store careの4モジュールを全店に導入し、店舗にいなくても異常・清潔・冷蔵・陳列をまず通知で受け取れるように変えました。',
      before: '一日中CCTVを直接確認 · 問題は常に事後対応',
      after: '異常をまず通知で把握 · 即時に対応',
      metrics: [
        { label: 'CCTV確認時間', value: '30分 → 8分（約73%短縮）' },
        { label: 'CCTV確認回数', value: '6回 → 3回（約50%減少）' },
        { label: '対応のタイミング', value: '事後 → 即時' },
        { label: '実測サンプル', value: '53店舗（コンビニ32 · 無人21）' },
      ],
      quotes: [
        { text: '店舗にいなくても通知が来るので、気持ちが楽です。', who: 'ソウル瑞草区のコンビニ チョ氏' },
        { text: '明け方すぐにわかりました。廃棄ロスを防げました。', who: '弘大の無人文具店 クォン氏' },
      ],
      note: 'Golden Caseの出発点。53店舗の実測が、以降の事例の根拠となる資産になります。' },
    { industry: 'コンビニ本社', audience: '本社幹部（運営 · SV本部）',
      headline: '100店舗が、ひとつの呼吸で',
      sub: '一日数百件の通知の中から、今日見るべき一行を、本社が同じ基準で。',
      context: 'コンビニフランチャイズ本社の運営本部の画面には、毎日数百件の通知とKPIが流れていきます。store insightが仮説の一行にまとめ、store agentが優先順位を提案し、「なぜそうなのか」を確認する検証サイクルをつくります。',
      before: '店舗ごとにばらばらの運営 · 何から見るべきか判断できない',
      after: '仮説カードから優先順位の一行を導出 · 100店舗で同一基準',
      metrics: [
        { label: '同時導入店舗', value: '100店舗' },
        { label: '日次確認KPI数', value: '例：1,000 → 12程度に圧縮' },
        { label: 'SV出張スケジュール', value: '例：約40%減少' },
        { label: '店主向け通知KPI', value: '実測4種はCase 1から引用' },
      ],
      quotes: [
        { text: '複数の店舗がひとつの店舗のように運営されます。', who: 'Aコンビニ本社 運営本部長（例として引用）' },
        { text: '当社の店主たちが、自ら導入を求めてきます。', who: 'Aコンビニ 加盟事業本部長（例として引用）' },
      ],
      note: '本社のマスターコピー「すべての空間を、完璧に。」が見出しに刻まれる、検証段階の原型。' },
    { industry: 'ドラッグストア本社', audience: '本社幹部（MD · 運営）',
      headline: '「移してください」ではなく「移せば客単価+8%」',
      sub: '欠品対応の本社の一行が、店主の言葉へと翻訳される瞬間。',
      context: '本社MDの欠品通知は、店主になかなか届きませんでした。店主は「なぜ移すべきか」を知らなかったからです。store insightの仮説をstore agentが店主の言葉へと翻訳し、「なぜ」が「いくら」に変わります。',
      before: '本社の提案が店主には「なぜ」のままで残る',
      after: '提案が店主の言葉「移せば+8%」に翻訳され、実行率が上昇',
      metrics: [
        { label: '店主の提案実行率', value: '例：約87%程度' },
        { label: '提案 → 実行までの時間', value: '例：約4.5日 → 1.7日' },
        { label: '店舗平均客単価', value: '例：約+8%' },
        { label: 'MD1人あたり担当店舗', value: '例：12 → 30程度' },
      ],
      quotes: [
        { text: '店主が「なぜ」と尋ねなくなりました。', who: 'Bドラッグストア MDチーム長（例として引用）' },
        { text: '移せと言っても動かなかった人が、+8%と言えば動きます。', who: 'Bドラッグストア 運営チーム長（例として引用）' },
      ],
      note: '本社ツールだけで深さを示す事例。本社と店主の間の言葉の隔たりを埋める、翻訳段階の原型。' },
    { industry: 'カフェチェーン', audience: '本社 · 店主の両視点',
      headline: '本社が見た清潔、店主が受け取った清潔',
      sub: '本社ダッシュボードのKPIと店主のモバイル通知が、同じ一点を見る週。',
      context: '本社の「週間清潔スコア」と店主の「テーブルの乱れ通知」は、別々の言葉でした。store insightの清潔KPIしきい値をstore careの通知しきい値と同期させ、本社が一行を調整するだけで、全店舗が同じ週から同じ一点を見ます。',
      before: '本社KPIと店主通知が別々の言葉に分かれていた',
      after: 'しきい値の同期で、全店舗が同一基準の清潔を見る',
      metrics: [
        { label: '本社 ↔ 店主 KPI整合率', value: '例：64% → 100%' },
        { label: '清潔通知のノイズ', value: '例：38% → 9%' },
        { label: '店主の通知実行率', value: '例：71% → 92%' },
        { label: '清潔モジュールの店主KPI', value: '実測4種はCase 1から引用' },
      ],
      quotes: [
        { text: '本社の画面が、店主のスマホと同じ言葉を話します。', who: 'Cカフェ 加盟事業本部長（例として引用）' },
        { text: '通知は減ったのに、店舗はもっと清潔です。', who: 'Cカフェ 店主 キム氏 · 江南店（例として引用）' },
      ],
      note: '2つのマスターコピーが1ページの表裏に刻まれる事例 — 上部に本社「すべての空間を、完璧に。」、下部に店主「私たちの店が、代表店のように。」。' },
    { industry: '大型空間（展示 · 博物館）', audience: '技術意思決定者（CTO · CISO）',
      headline: '顔がなくても、動線が見えます',
      sub: '匿名化の上で6か月間運用。効果が及ばなかった箇所は、再び翻訳へ戻した記録。',
      context: '展示空間の動線分析は、顔認識なしには不可能だと考えられていました。AnonymizerとSpatial AIの上で、顔なしの動線を6か月間運用し、再測定の時点で効果が及ばなかった箇所は、正直に再び翻訳段階へ戻します。',
      before: '個人情報・セキュリティの負担から、映像動線分析の導入を保留',
      after: 'リアルタイム匿名化の上で動線を運用 · 再測定で効果を検証',
      metrics: [
        { label: '効果を実証した箇所', value: '例：22か所中18か所（約82%）' },
        { label: '効果が及ばなかった箇所', value: '例：4か所 → 再び翻訳（第3段階）へ' },
        { label: '顔認識', value: '0件（SEAL匿名化で保証）' },
        { label: 'MTMCトラッキング', value: '例：精度 約94%' },
      ],
      quotes: [
        { text: '顔がなくても、動線が見えます。', who: 'D施設 運営本部長（例として引用）' },
        { text: '効果不足を隠さないデータです。', who: 'D施設 セキュリティ責任者（例として引用）' },
      ],
      note: '5件のうち唯一の非リテール事例。「効果不足も隠さない」という再測定段階の原型であり、Beyond Retailの最初の証明。' },
  ],
};

// ── minimal YAML emitter for our exact shapes (double-quoted scalars) ──
const q = (s) => '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';

function frontmatter(st, t, lang, fullSlug) {
  const lines = [];
  // slug field = filename (Keystatic slugField convention); ko/jp carry the suffix.
  lines.push(`slug: ${q(fullSlug)}`);
  lines.push(`title: ${q(t.headline)}`);
  lines.push(`sub: ${q(t.sub)}`);
  lines.push(`context: ${q(t.context)}`);
  lines.push(`industry: ${q(t.industry)}`);
  lines.push(`industryIcon: ${q(st.industryIcon)}`);
  lines.push(`audience: ${q(t.audience)}`);
  lines.push(`goldenStep: ${q(st.goldenStep)}`);
  lines.push('products:');
  for (const p of st.products) lines.push(`  - ${q(p)}`);
  lines.push(`before: ${q(t.before)}`);
  lines.push(`after: ${q(t.after)}`);
  lines.push('metrics:');
  t.metrics.forEach((m, i) => {
    lines.push(`  - label: ${q(m.label)}`);
    lines.push(`    value: ${q(m.value)}`);
    lines.push(`    verified: ${st.verified[i] ? 'true' : 'false'}`);
  });
  lines.push('quotes:');
  for (const qu of t.quotes) {
    lines.push(`  - text: ${q(qu.text)}`);
    lines.push(`    who: ${q(qu.who)}`);
  }
  lines.push(`note: ${q(t.note)}`);
  lines.push(`showAdoptionChart: ${st.showAdoptionChart ? 'true' : 'false'}`);
  lines.push(`lang: ${q(lang)}`);
  lines.push(`date: ${q(DATE)}`);
  lines.push(`featured: ${st.featured ? 'true' : 'false'}`);
  lines.push('draft: false');
  return `---\n${lines.join('\n')}\n---\n`;
}

fs.mkdirSync(OUT, { recursive: true });
let n = 0;
for (const lang of ['en', 'ko', 'jp']) {
  STRUCTURE.forEach((st, i) => {
    const fullSlug = lang === 'en' ? st.slug : `${st.slug}-${lang}`;
    fs.writeFileSync(path.join(OUT, `${fullSlug}.mdx`), frontmatter(st, TEXT[lang][i], lang, fullSlug), 'utf8');
    n++;
  });
}
console.log(`migrate-case-studies: wrote ${n} files to content/case-studies/`);
