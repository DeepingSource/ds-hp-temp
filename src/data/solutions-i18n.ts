import { type Locale } from '@/lib/i18n';

/**
 * Translation OVERLAY for the /solutions index cards.
 *
 * This does NOT change the shared data shape in `solutionsData.ts` / `industryList.ts`,
 * which keep their Korean values. SolutionsView reads from these maps only when
 * `locale !== 'ko'` and falls back to the Korean data value when an entry is missing.
 *
 * Product names (Store Care / Store Insight / Store Agent) and stats (e.g. `impact`
 * like "+18%") are intentionally left unchanged and are not part of this overlay.
 */

export const industryLabelI18n: Record<string, Partial<Record<Locale, string>>> = {
  convenience: { en: 'Convenience stores', jp: 'コンビニ' },
  cafe: { en: 'Cafés & restaurants', jp: 'カフェ・飲食店' },
  unmanned: { en: 'Unmanned stores', jp: '無人店舗' },
  drugstore: { en: 'Drugstores', jp: 'ドラッグストア' },
  mart: { en: 'Hypermarkets', jp: '大型スーパー' },
  exhibition: { en: 'Exhibition spaces', jp: '展示空間' },
  logistics: { en: 'Logistics & warehouses', jp: '物流・倉庫' },
  fashion: { en: 'Fashion & apparel', jp: 'ファッション・アパレル' },
};

export const solutionCardI18n: Record<
  string,
  Partial<Record<Locale, { title: string; excerpt: string; impactLabel: string }>>
> = {
  // ── Convenience stores ──
  'convenience-night-theft': {
    en: {
      title: 'Overnight theft prevention for convenience stores',
      excerpt:
        'How AI detects theft and abnormal behavior in real time during unmanned or single-staff night shifts.',
      impactLabel: 'reduction in overnight theft loss',
    },
    jp: {
      title: 'コンビニの夜間盗難防止',
      excerpt:
        '無人・1人運営の夜間に発生する盗難や異常行動を、AI がリアルタイムで検知する方法です。',
      impactLabel: '夜間盗難損失の削減',
    },
  },
  'convenience-inventory-loss': {
    en: {
      title: 'Stockout and inventory loss management for convenience stores',
      excerpt:
        'How AI cameras detect stockouts in real time to prevent lost sales and customer churn.',
      impactLabel: 'reduction in sales lost to stockouts',
    },
    jp: {
      title: 'コンビニの欠品・在庫ロス管理',
      excerpt:
        'AI カメラで欠品の発生をリアルタイムに検知し、売上ロスと顧客離れを防ぐ方法です。',
      impactLabel: '欠品による売上ロスの削減',
    },
  },
  'convenience-planogram': {
    en: {
      title: 'Convenience store display optimization (planogram)',
      excerpt:
        'How customer behavior data verifies which displays actually lift sales.',
      impactLabel: 'sales increase after display optimization',
    },
    jp: {
      title: 'コンビニの陳列最適化（プラノグラム）',
      excerpt:
        '顧客行動データをもとに、どの陳列が実際に売上を伸ばすのかを検証する方法です。',
      impactLabel: '陳列最適化後の売上増加',
    },
  },

  // ── Cafés & restaurants ──
  'cafe-low-seat-turnover': {
    en: {
      title: 'Improving low seat turnover at cafés',
      excerpt:
        'How to solve seat-turnover problems caused by long-staying customers during peak hours, with data.',
      impactLabel: 'improvement in peak-hour seat turnover',
    },
    jp: {
      title: 'カフェの低い座席回転率の改善',
      excerpt:
        'ピークタイムの長時間滞在客による座席回転率の課題を、データで解決する方法です。',
      impactLabel: 'ピークタイムの座席回転率向上',
    },
  },
  'cafe-peak-hour-management': {
    en: {
      title: 'Peak-hour operations optimization for cafés',
      excerpt:
        'How to manage lunch and dinner peak congestion and waiting in advance, based on data.',
      impactLabel: 'reduction in average peak-hour wait time',
    },
    jp: {
      title: 'カフェの混雑時間帯の運営最適化',
      excerpt:
        'ランチ・ディナーのピークタイムの混雑と待ちを、データに基づき事前に管理する方法です。',
      impactLabel: 'ピークタイムの平均待ち時間削減',
    },
  },
  'cafe-customer-wait-time': {
    en: {
      title: 'Reducing customer wait time at cafés',
      excerpt:
        'How to reduce walk-aways while waiting and optimize the flow from order to service.',
      impactLabel: 'improvement in waiting-customer conversion',
    },
    jp: {
      title: 'カフェの顧客待ち時間の短縮',
      excerpt:
        '待機中の離脱客を減らし、注文から提供までの流れを最適化する方法です。',
      impactLabel: '待機客のコンバージョン向上',
    },
  },

  // ── Unmanned stores ──
  'unmanned-theft-prevention': {
    en: {
      title: 'Theft prevention system for unmanned stores',
      excerpt:
        'A fully automated approach where AI guards the store 24/7 in a staff-free environment.',
      impactLabel: 'reduction in unmanned operation loss rate',
    },
    jp: {
      title: '無人店舗の盗難防止システム',
      excerpt:
        'スタッフ不在の環境で、AI が 24 時間店舗を守る完全自動の盗難防止アプローチです。',
      impactLabel: '無人運営の損失率削減',
    },
  },
  'unmanned-anomaly-detection': {
    en: {
      title: 'Automated anomaly detection for unmanned stores',
      excerpt:
        'How AI automatically detects every anomaly in an unmanned environment — from intrusion and damage to refrigeration faults.',
      impactLabel: 'reduction in anomaly discovery delay',
    },
    jp: {
      title: '無人店舗の異常検知の自動化',
      excerpt:
        '侵入・破損から冷蔵異常まで、無人環境のあらゆる異常状況を AI が自動で検知する方法です。',
      impactLabel: '異常発見の遅延時間削減',
    },
  },
  'unmanned-remote-monitoring': {
    en: {
      title: 'Remote management and monitoring for unmanned stores',
      excerpt:
        'How to manage multiple unmanned stores at once from a single smartphone.',
      impactLabel: 'increase in issues resolved without a site visit',
    },
    jp: {
      title: '無人店舗の遠隔管理・モニタリング',
      excerpt:
        'スマートフォン 1 台で複数の無人店舗を同時に管理する遠隔運営の方法です。',
      impactLabel: '現地訪問なしで対応可能な課題の増加',
    },
  },

  // ── Drugstores ──
  'drugstore-vmd-optimization': {
    en: {
      title: 'VMD optimization for drugstores',
      excerpt:
        'How zone-level dwell-time data raises attention to high-margin product areas.',
      impactLabel: 'increase in high-margin zone basket value',
    },
    jp: {
      title: 'ドラッグストアの VMD 最適化',
      excerpt:
        'エリア別の顧客滞在データをもとに、高利益商品エリアの注目度を高める方法です。',
      impactLabel: '高利益エリアの購入単価上昇',
    },
  },
  'drugstore-zone-performance': {
    en: {
      title: 'Zone-by-zone performance analysis for drugstores',
      excerpt:
        'How to identify which in-store zones drive sales and which are blind spots.',
      impactLabel: 'improvement in blind-spot zone visit rate',
    },
    jp: {
      title: 'ドラッグストアのエリア別成果分析',
      excerpt:
        '店内のどのエリアが売上に貢献し、どのエリアが死角なのかを把握する方法です。',
      impactLabel: '死角エリアの来訪率向上',
    },
  },
  'drugstore-tester-interaction': {
    en: {
      title: 'Tester interaction analysis for drugstores',
      excerpt:
        'How to verify with data which tester locations actually lead to purchases.',
      impactLabel: 'improvement in tester zone conversion',
    },
    jp: {
      title: 'ドラッグストアのテスター接触分析',
      excerpt:
        'どの位置のテスターが実際の購入につながるのかを、データで検証する方法です。',
      impactLabel: 'テスターエリアの購入転換率向上',
    },
  },

  // ── Hypermarkets ──
  'mart-checkout-congestion': {
    en: {
      title: 'Checkout congestion management for hypermarkets',
      excerpt:
        'How to predict and optimize checkout queues with data to prevent customer walk-aways.',
      impactLabel: 'reduction in average checkout wait time',
    },
    jp: {
      title: '大型スーパーのレジ混雑管理',
      excerpt:
        'レジ前の待ち行列をデータで予測・最適化し、顧客の離脱を防ぐ方法です。',
      impactLabel: 'レジの平均待ち時間削減',
    },
  },
  'mart-cart-path-optimization': {
    en: {
      title: 'Cart path and dwell-time optimization for hypermarkets',
      excerpt:
        'How to understand how customers move through the store and design sales-driving paths.',
      impactLabel: 'increase in average dwell time and basket value',
    },
    jp: {
      title: '大型スーパーのカート動線・滞在時間の最適化',
      excerpt:
        '顧客が店内をどう回遊するのかを把握し、売上につながる動線を設計する方法です。',
      impactLabel: '平均滞在時間と購入金額の増加',
    },
  },
  'mart-zone-conversion': {
    en: {
      title: 'Zone-by-zone conversion analysis for hypermarkets',
      excerpt:
        'How to identify which zone visits lead to purchases and optimize product placement.',
      impactLabel: 'improvement in high-margin zone conversion',
    },
    jp: {
      title: '大型スーパーのエリア別転換率分析',
      excerpt:
        'どのエリアの来訪が実際の購入につながるのかを把握し、配置を最適化する方法です。',
      impactLabel: '高利益エリアの転換率向上',
    },
  },

  // ── Exhibition spaces ──
  'exhibition-visitor-dwell-time': {
    en: {
      title: 'Visitor dwell-time analysis for exhibition spaces',
      excerpt:
        'How to measure which exhibits draw attention and how long they hold visitors.',
      impactLabel: 'improvement in visitor satisfaction',
    },
    jp: {
      title: '展示空間の来場者滞在時間分析',
      excerpt:
        'どの展示物が来場者の注目を集め、どれだけ長く滞在させるのかを測定する方法です。',
      impactLabel: '観覧満足度の向上',
    },
  },
  'exhibition-booth-performance': {
    en: {
      title: 'Booth performance analysis for exhibitions',
      excerpt:
        'How to measure each exhibitor booth’s ability to attract visitors with objective data.',
      impactLabel: 'improvement in booth performance measurement accuracy',
    },
    jp: {
      title: '展示ブースの成果分析',
      excerpt:
        '各出展企業ブースの来場者集客成果を、客観的なデータで測定する方法です。',
      impactLabel: 'ブース成果測定の精度向上',
    },
  },
  'exhibition-crowd-flow': {
    en: {
      title: 'Crowd flow management for exhibition spaces',
      excerpt:
        'How to detect overcrowding in specific zones in real time and disperse visitor flow.',
      impactLabel: 'reduction in crowding incidents',
    },
    jp: {
      title: '展示空間の人流管理',
      excerpt:
        '特定エリアへの過密集中をリアルタイムで検知し、観覧の流れを分散する方法です。',
      impactLabel: '観覧混雑の発生件数削減',
    },
  },

  // ── Logistics & warehouses ──
  'logistics-worker-safety': {
    en: {
      title: 'Worker safety monitoring for logistics',
      excerpt:
        'How AI cameras detect safety blind spots and risky behavior in warehouses in real time.',
      impactLabel: 'reduction in safety incident risk factors',
    },
    jp: {
      title: '物流作業者の安全モニタリング',
      excerpt:
        'AI カメラで倉庫内の安全上の死角や危険行動を、リアルタイムに検知する方法です。',
      impactLabel: '安全事故リスク要因の削減',
    },
  },
  'logistics-efficiency-zones': {
    en: {
      title: 'Zone-by-zone work efficiency analysis for logistics',
      excerpt:
        'How to identify where work bottlenecks occur with data and optimize logistics flow.',
      impactLabel: 'improvement in zone throughput efficiency',
    },
    jp: {
      title: '物流のエリア別作業効率分析',
      excerpt:
        'どのエリアで作業のボトルネックが発生するのかをデータで把握し、物流動線を最適化する方法です。',
      impactLabel: 'エリア別処理量の効率向上',
    },
  },
  'logistics-ppe-compliance': {
    en: {
      title: 'Automated PPE compliance for logistics',
      excerpt:
        'How AI automatically checks whether every worker is wearing their safety gear.',
      impactLabel: 'reduction in incident risk from missing PPE',
    },
    jp: {
      title: '物流の保護具着用遵守の自動化',
      excerpt:
        'すべての作業者の安全保護具の着用有無を、AI が自動で確認する方法です。',
      impactLabel: '保護具未着用による事故リスクの削減',
    },
  },
};

/**
 * Translation OVERLAY for the /solutions/[slug] DETAIL pages — SUMMARY FIELDS ONLY.
 *
 * Covers: background.heading, causes[].title, steps[].title + steps[].productLabel,
 * results[].label. Arrays are index-aligned 1:1 with the corresponding arrays in
 * `solutionsData.ts` (same order). Long-form Korean bodies (background.body,
 * causes[].desc, steps[].desc, problem) are NOT translated and render from data.
 * Stats (impact, results[].stat) are numbers and stay as-is.
 *
 * title / excerpt / impactLabel reuse `solutionCardI18n`; industryLabel reuses
 * `industryLabelI18n`. When an entry is missing the view falls back to the Korean
 * data value.
 */
export const solutionDetailI18n: Record<
  string,
  Partial<
    Record<
      Locale,
      {
        backgroundHeading: string;
        causes: string[];
        steps: { title: string; productLabel: string }[];
        results: string[];
      }
    >
  >
> = {
  // ── Convenience stores ──
  'convenience-night-theft': {
    en: {
      backgroundHeading: 'Why convenience stores are vulnerable to overnight theft',
      causes: ['No real-time monitoring', 'Blind spots of single-staff shifts', 'Hard to identify abnormal behavior'],
      steps: [
        { title: 'Real-time capture of overnight abnormal behavior', productLabel: '01 Observe · StoreCare' },
        { title: 'Theft-risk pattern analysis by time of day', productLabel: '02 Analyze · StoreInsight' },
        { title: 'Automatic alerts and response on anomalies', productLabel: '03 Act · StoreAgent' },
      ],
      results: ['Reduction in overnight theft loss', 'Anomaly detection accuracy', 'Alert delivery time'],
    },
    jp: {
      backgroundHeading: 'なぜ夜間のコンビニは盗難に弱いのか',
      causes: ['リアルタイム監視の不在', '1人運営の死角', '異常行動の識別の難しさ'],
      steps: [
        { title: '夜間の異常行動をリアルタイムに捕捉', productLabel: '01 観察 · StoreCare' },
        { title: '時間帯別の盗難リスクパターン分析', productLabel: '02 分析 · StoreInsight' },
        { title: '異常発生時の自動通知と対応', productLabel: '03 実行 · StoreAgent' },
      ],
      results: ['夜間盗難損失の削減', '異常検知の精度', '通知の所要時間'],
    },
  },
  'convenience-inventory-loss': {
    en: {
      backgroundHeading: 'The loss created by one hour of stockout',
      causes: ['Gap between POS and actual inventory', 'Restocking delays at busy hours', 'Disconnect between backroom and shelf stock'],
      steps: [
        { title: 'Automatic stockout checks on key shelves', productLabel: '01 Observe · StoreCare' },
        { title: 'Stockout frequency and loss pattern analysis', productLabel: '02 Analyze · StoreInsight' },
        { title: 'Automatic restocking notifications', productLabel: '03 Act · StoreAgent' },
      ],
      results: ['Reduction in stockout duration', 'Increase in shelf purchase conversion', 'Stockout alert delivery time'],
    },
    jp: {
      backgroundHeading: '欠品1時間が生む損失',
      causes: ['POS在庫と実在庫の乖離', '繁忙時間帯の補充遅延', 'バックヤード在庫と陳列在庫の断絶'],
      steps: [
        { title: '主要棚の欠品を自動確認', productLabel: '01 観察 · StoreCare' },
        { title: '欠品頻度と損失パターンの分析', productLabel: '02 分析 · StoreInsight' },
        { title: '補充案内の自動送信', productLabel: '03 実行 · StoreAgent' },
      ],
      results: ['欠品継続時間の削減', '棚の購入転換率の上昇', '欠品通知の送信時間'],
    },
  },
  'convenience-planogram': {
    en: {
      backgroundHeading: 'Why a standard planogram is not always the answer',
      causes: ['Unseen abandon-before-purchase behavior', 'Cannot measure display-change impact', 'Unaware of low-attention product zones'],
      steps: [
        { title: 'Recognize customer contact patterns by zone', productLabel: '01 Observe · StoreCare' },
        { title: 'Conversion and attention analysis by shelf', productLabel: '02 Analyze · StoreInsight' },
        { title: 'Automatic display-optimization suggestions', productLabel: '03 Act · StoreAgent' },
      ],
      results: ['Sales increase after display optimization', 'Conversion of items with rising pickup rate', 'Time to first insight'],
    },
    jp: {
      backgroundHeading: '標準陳列が常に正解ではない理由',
      causes: ['購入直前の断念行動を把握できない', '陳列改編の効果を測定できない', '注目度の低い商品エリアを認識できない'],
      steps: [
        { title: 'エリア別の顧客接触パターンを認識', productLabel: '01 観察 · StoreCare' },
        { title: '棚別の転換率・注目度分析', productLabel: '02 分析 · StoreInsight' },
        { title: '陳列最適化の提案を自動送信', productLabel: '03 実行 · StoreAgent' },
      ],
      results: ['陳列最適化後の売上増加', 'ピックアップ率上昇品目の転換率', '初回インサイト導出期間'],
    },
  },

  // ── Cafés & restaurants ──
  'cafe-low-seat-turnover': {
    en: {
      backgroundHeading: 'The revenue gap created by one extra seat turn',
      causes: ['Cannot track long-stay patterns', 'Cannot predict peak hours', 'Hard to grasp per-table status'],
      steps: [
        { title: 'Real-time seating detection per table', productLabel: '01 Observe · StoreCare' },
        { title: 'Seat-turnover and dwell-time analysis', productLabel: '02 Analyze · StoreInsight' },
        { title: 'Peak-hour operations guidance', productLabel: '03 Act · StoreAgent' },
      ],
      results: ['Improvement in peak-hour seat turnover', 'Reduction in average table wait time', 'Seating-detection accuracy'],
    },
    jp: {
      backgroundHeading: '座席回転1回の差が生む売上の違い',
      causes: ['長時間滞在パターンを把握できない', 'ピークタイムを予測できない', 'テーブル別の状況把握の難しさ'],
      steps: [
        { title: 'テーブル別の着席をリアルタイム認識', productLabel: '01 観察 · StoreCare' },
        { title: '座席回転率・滞在時間の分析', productLabel: '02 分析 · StoreInsight' },
        { title: 'ピークタイムの運営最適化案内', productLabel: '03 実行 · StoreAgent' },
      ],
      results: ['ピークタイムの座席回転率向上', '平均テーブル待ち時間の削減', '着席検知の精度'],
    },
  },
  'cafe-peak-hour-management': {
    en: {
      backgroundHeading: 'The limits of preparing for peak hours',
      causes: ['No visit-pattern data', 'Cannot measure walk-away customers', 'Inefficient staffing'],
      steps: [
        { title: 'Automatic visitor count by time of day', productLabel: '01 Observe · StoreCare' },
        { title: 'Visit-pattern analysis and peak prediction', productLabel: '02 Analyze · StoreInsight' },
        { title: 'Peak forecast and preparation guidance', productLabel: '03 Act · StoreAgent' },
      ],
      results: ['Average peak-hour wait time', 'Peak-hour order throughput', 'Time to complete the prediction model'],
    },
    jp: {
      backgroundHeading: 'ピークタイム準備の限界',
      causes: ['来店パターンデータの不在', '待機離脱客を測定できない', 'スタッフ配置の非効率'],
      steps: [
        { title: '時間帯別の来店客数を自動集計', productLabel: '01 観察 · StoreCare' },
        { title: '来店パターン分析とピーク予測', productLabel: '02 分析 · StoreInsight' },
        { title: 'ピーク予測の案内と準備ガイド', productLabel: '03 実行 · StoreAgent' },
      ],
      results: ['ピークタイムの平均待ち時間', 'ピーク時の注文処理量', 'パターン予測モデルの完成期間'],
    },
  },
  'cafe-customer-wait-time': {
    en: {
      backgroundHeading: 'The invisible loss of walk-away customers',
      causes: ['Cannot gauge walk-away volume', 'Hard to identify bottlenecks', 'Discomfort from congested flow'],
      steps: [
        { title: 'Real-time queue length and walk-away tracking', productLabel: '01 Observe · StoreCare' },
        { title: 'Wait-pattern analysis and bottleneck detection', productLabel: '02 Analyze · StoreInsight' },
        { title: 'Operations suggestions to minimize waiting', productLabel: '03 Act · StoreAgent' },
      ],
      results: ['Waiting-customer purchase conversion', 'Average queue length', 'Walk-away customer count'],
    },
    jp: {
      backgroundHeading: '待機離脱客の見えない損失',
      causes: ['待機離脱客の規模を把握できない', 'ボトルネック区間の識別が難しい', '動線混雑による不便'],
      steps: [
        { title: '待ち行列の長さと離脱客をリアルタイム把握', productLabel: '01 観察 · StoreCare' },
        { title: '待機パターン分析とボトルネック把握', productLabel: '02 分析 · StoreInsight' },
        { title: '待機最小化のための運営提案', productLabel: '03 実行 · StoreAgent' },
      ],
      results: ['待機客の購入転換率', '平均待ち行列の長さ', '待機離脱客数'],
    },
  },

  // ── Unmanned stores ──
  'unmanned-theft-prevention': {
    en: {
      backgroundHeading: 'The structural theft vulnerability of unmanned stores',
      causes: ['No staff for real-time monitoring', 'CCTV that only confirms after the fact', 'Quiet accumulating losses'],
      steps: [
        { title: 'Anomaly detection tuned for unmanned settings', productLabel: '01 Observe · StoreCare' },
        { title: 'Cumulative theft-risk pattern analysis', productLabel: '02 Analyze · StoreInsight' },
        { title: 'Multi-channel alerts and remote response', productLabel: '03 Act · StoreAgent' },
      ],
      results: ['Reduction in unmanned operation loss rate', 'Anomaly detection accuracy', 'Alert delivery time'],
    },
    jp: {
      backgroundHeading: '無人店舗の構造的な盗難脆弱性',
      causes: ['リアルタイム監視の人員不在', '事後確認しかできないCCTV', '静かに累積する損失'],
      steps: [
        { title: '無人環境に特化した異常行動検知', productLabel: '01 観察 · StoreCare' },
        { title: '盗難リスクパターンの累積分析', productLabel: '02 分析 · StoreInsight' },
        { title: '多重通知と遠隔対応', productLabel: '03 実行 · StoreAgent' },
      ],
      results: ['無人運営の損失率削減', '異常検知の精度', '通知の所要時間'],
    },
  },
  'unmanned-anomaly-detection': {
    en: {
      backgroundHeading: 'The range of anomalies that occur in unmanned stores',
      causes: ['Cannot handle varied anomaly types individually', 'Night and dawn blind spots'],
      steps: [
        { title: 'Simultaneous detection of multiple anomaly types', productLabel: '01 Observe · StoreCare' },
        { title: 'Anomaly event logs and statistical analysis', productLabel: '02 Analyze · StoreInsight' },
        { title: 'Automated response per anomaly type', productLabel: '03 Act · StoreAgent' },
      ],
      results: ['Anomaly discovery delay', 'Anomaly types detected simultaneously', 'Uninterrupted automatic monitoring'],
    },
    jp: {
      backgroundHeading: '無人店舗で発生する異常状況の範囲',
      causes: ['多様な異常タイプへの個別対応が困難', '夜間・早朝の死角'],
      steps: [
        { title: '多タイプの異常状況を同時検知', productLabel: '01 観察 · StoreCare' },
        { title: '異常イベントログと統計分析', productLabel: '02 分析 · StoreInsight' },
        { title: '異常タイプ別の自動対応実行', productLabel: '03 実行 · StoreAgent' },
      ],
      results: ['異常発見の遅延時間', '同時検知する異常タイプ数', '無中断の自動モニタリング'],
    },
  },
  'unmanned-remote-monitoring': {
    en: {
      backgroundHeading: 'The reality of multi-site unmanned operations',
      causes: ['Cannot monitor multiple sites at once', 'Cost of unnecessary site visits'],
      steps: [
        { title: 'Unified real-time dashboard across sites', productLabel: '01 Observe · StoreCare' },
        { title: 'Comparative performance analysis by site', productLabel: '02 Analyze · StoreInsight' },
        { title: 'Selective visit alerts only on anomalies', productLabel: '03 Act · StoreAgent' },
      ],
      results: ['Reduction in unnecessary site visits', 'Stores monitored simultaneously', 'Anomaly alert delivery time'],
    },
    jp: {
      backgroundHeading: '多店舗無人運営の現実',
      causes: ['多店舗の同時モニタリングが不可能', '不要な現地訪問のコスト'],
      steps: [
        { title: '多店舗の状態を統合リアルタイム表示', productLabel: '01 観察 · StoreCare' },
        { title: '店舗別の運営成果の比較分析', productLabel: '02 分析 · StoreInsight' },
        { title: '異常発生時のみ選択的に訪問通知', productLabel: '03 実行 · StoreAgent' },
      ],
      results: ['不要な現地訪問の削減', '同時モニタリング可能な店舗数', '異常通知の送信時間'],
    },
  },

  // ── Drugstores ──
  'drugstore-vmd-optimization': {
    en: {
      backgroundHeading: 'Why VMD data matters in drugstores',
      causes: ['No zone visit-rate data', 'Cannot measure tester impact', 'Hard to verify display-change impact'],
      steps: [
        { title: 'Capture dwell time and tester contact by zone', productLabel: '01 Observe · StoreCare' },
        { title: 'Zone performance and flow-pattern analysis', productLabel: '02 Analyze · StoreInsight' },
        { title: 'VMD suggestions and impact measurement', productLabel: '03 Act · StoreAgent' },
      ],
      results: ['Increase in high-margin zone basket value', 'Increase in tester zone dwell time', 'Time to first VMD insight'],
    },
    jp: {
      backgroundHeading: 'ドラッグストアでVMDデータが重要な理由',
      causes: ['エリア別来訪率データの不在', 'テスター効果を測定できない', '陳列改編効果の検証が難しい'],
      steps: [
        { title: 'エリア別の滞在時間とテスター接触を捕捉', productLabel: '01 観察 · StoreCare' },
        { title: 'エリア成果の比較と動線パターン分析', productLabel: '02 分析 · StoreInsight' },
        { title: 'VMD最適化提案と効果測定', productLabel: '03 実行 · StoreAgent' },
      ],
      results: ['高利益エリアの購入単価上昇', 'テスターエリアの滞在時間増加', '初回VMDインサイト導出期間'],
    },
  },
  'drugstore-zone-performance': {
    en: {
      backgroundHeading: 'Not every zone is used equally',
      causes: ['Zone visit frequency unmeasured', 'Inefficient product placement in blind spots'],
      steps: [
        { title: 'Measure visit rate and dwell time across all zones', productLabel: '01 Observe · StoreCare' },
        { title: 'Zone performance heatmap and path analysis', productLabel: '02 Analyze · StoreInsight' },
        { title: 'Blind-spot improvement suggestions', productLabel: '03 Act · StoreAgent' },
      ],
      results: ['Improvement in blind-spot zone visit rate', 'Speed of measuring layout-change impact', 'Zones analyzed simultaneously'],
    },
    jp: {
      backgroundHeading: 'すべてのエリアが等しく活用されるわけではない',
      causes: ['エリア別来訪頻度の未測定', '死角エリアの商品配置の非効率'],
      steps: [
        { title: '全エリアの来訪率と滞在時間を測定', productLabel: '01 観察 · StoreCare' },
        { title: 'エリア別成果ヒートマップと移動経路分析', productLabel: '02 分析 · StoreInsight' },
        { title: '死角エリアの改善提案', productLabel: '03 実行 · StoreAgent' },
      ],
      results: ['死角エリアの来訪率向上', 'レイアウト改編効果の測定速度', '同時分析可能なエリア数'],
    },
  },
  'drugstore-tester-interaction': {
    en: {
      backgroundHeading: 'How to measure tester impact with data',
      causes: ['Tester trial frequency unmeasured', 'No criteria for tester placement'],
      steps: [
        { title: 'Automatic recognition of tester contact behavior', productLabel: '01 Observe · StoreCare' },
        { title: 'Tester contact vs. purchase conversion analysis', productLabel: '02 Analyze · StoreInsight' },
        { title: 'Optimal tester placement suggestions', productLabel: '03 Act · StoreAgent' },
      ],
      results: ['Tester zone purchase conversion', 'Dwell time after tester contact', 'Tester ROI measurement accuracy'],
    },
    jp: {
      backgroundHeading: 'テスターの効果をデータで測定する方法',
      causes: ['テスター体験頻度の未測定', 'テスター位置最適化の基準不在'],
      steps: [
        { title: 'テスター接触行動を自動認識', productLabel: '01 観察 · StoreCare' },
        { title: 'テスター接触に対する購入転換率分析', productLabel: '02 分析 · StoreInsight' },
        { title: '最適なテスター配置の提案', productLabel: '03 実行 · StoreAgent' },
      ],
      results: ['テスターエリアの購入転換率', 'テスター接触後の滞在時間', 'テスターROI測定の精度'],
    },
  },

  // ── Hypermarkets ──
  'mart-checkout-congestion': {
    en: {
      backgroundHeading: 'The real cost of checkout walk-aways at hypermarkets',
      causes: ['Cannot forecast checkout demand', 'Cannot measure walk-away customers', 'Inefficient checkout allocation'],
      steps: [
        { title: 'Real-time queue monitoring per checkout', productLabel: '01 Observe · StoreCare' },
        { title: 'Peak-hour checkout demand forecasting', productLabel: '02 Analyze · StoreInsight' },
        { title: 'Proactive checkout operations guidance', productLabel: '03 Act · StoreAgent' },
      ],
      results: ['Average checkout wait time', 'Checkout walk-away customer count', 'Peak forecast lead time'],
    },
    jp: {
      backgroundHeading: '大型スーパーのレジ離脱の実際のコスト',
      causes: ['レジ需要を予測できない', '待機離脱客を測定できない', '非効率なレジ配分'],
      steps: [
        { title: 'レジ別の待ち行列をリアルタイム監視', productLabel: '01 観察 · StoreCare' },
        { title: 'ピークタイムのレジ需要予測', productLabel: '02 分析 · StoreInsight' },
        { title: 'レジの先制的な運営案内', productLabel: '03 実行 · StoreAgent' },
      ],
      results: ['レジの平均待ち時間', 'レジ離脱客数', 'ピーク予測の先行時間'],
    },
  },
  'mart-cart-path-optimization': {
    en: {
      backgroundHeading: 'The relationship between path design and sales',
      causes: ['No multi-camera path tracking', 'No zone visit-rate data'],
      steps: [
        { title: 'Continuous path linking across multiple cameras', productLabel: '01 Observe · StoreCare' },
        { title: 'Path-pattern and zone visit-rate analysis', productLabel: '02 Analyze · StoreInsight' },
        { title: 'Path-optimized layout suggestions', productLabel: '03 Act · StoreAgent' },
      ],
      results: ['Increase in average dwell time', 'Improved balance in zone visit rate', 'Time to complete path-pattern analysis'],
    },
    jp: {
      backgroundHeading: '動線設計と売上の関係',
      causes: ['多カメラ動線把握の不在', 'エリア別来訪率データの不在'],
      steps: [
        { title: '多カメラで連続動線を連結', productLabel: '01 観察 · StoreCare' },
        { title: '動線パターンとエリア来訪率の分析', productLabel: '02 分析 · StoreInsight' },
        { title: '動線最適化レイアウトの提案', productLabel: '03 実行 · StoreAgent' },
      ],
      results: ['平均滞在時間の増加', 'エリア別来訪率のバランス向上', '動線パターン分析の完成期間'],
    },
  },
  'mart-zone-conversion': {
    en: {
      backgroundHeading: 'What zone-by-zone conversion gaps reveal',
      causes: ['Visit and purchase data not linked by zone', 'Unclear reasons for purchase abandonment'],
      steps: [
        { title: 'Measure visitors and dwell behavior by zone', productLabel: '01 Observe · StoreCare' },
        { title: 'POS-linked conversion calculation by zone', productLabel: '02 Analyze · StoreInsight' },
        { title: 'Prioritized conversion-improvement zones', productLabel: '03 Act · StoreAgent' },
      ],
      results: ['High-margin zone conversion', 'Speed of identifying improvement tasks', 'Zones analyzed simultaneously'],
    },
    jp: {
      backgroundHeading: 'エリア別転換率の差が示すもの',
      causes: ['エリア別の来訪・購入データが未連動', '購入断念の原因が不明確'],
      steps: [
        { title: 'エリア別の来訪客数と滞在行動を測定', productLabel: '01 観察 · StoreCare' },
        { title: 'POS連動のエリア別転換率算出', productLabel: '02 分析 · StoreInsight' },
        { title: '転換率改善エリアの優先順位提案', productLabel: '03 実行 · StoreAgent' },
      ],
      results: ['高利益エリアの転換率', '改善課題の把握速度', '同時分析可能なエリア数'],
    },
  },

  // ── Exhibition spaces ──
  'exhibition-visitor-dwell-time': {
    en: {
      backgroundHeading: 'The role of data in exhibition planning',
      causes: ['Cannot quantify booth/exhibit attention', 'No visitor-flow analysis'],
      steps: [
        { title: 'Automatic dwell-time measurement per booth/exhibit', productLabel: '01 Observe · StoreCare' },
        { title: 'Visitor-flow and attention analysis', productLabel: '02 Analyze · StoreInsight' },
        { title: 'Automatic post-event insight report', productLabel: '03 Act · StoreAgent' },
      ],
      results: ['Improvement in visitor satisfaction', 'Real-time dwell measurement', 'Post-event report generation'],
    },
    jp: {
      backgroundHeading: '展示企画におけるデータの役割',
      causes: ['ブース・作品別の注目度を定量化できない', '観覧動線分析の不在'],
      steps: [
        { title: 'ブース・作品別の滞在時間を自動測定', productLabel: '01 観察 · StoreCare' },
        { title: '観覧動線と注目度の分析', productLabel: '02 分析 · StoreInsight' },
        { title: '行事終了後のインサイトレポートを自動生成', productLabel: '03 実行 · StoreAgent' },
      ],
      results: ['観覧満足度の向上', 'リアルタイム滞在時間測定', '行事終了後のレポート生成'],
    },
  },
  'exhibition-booth-performance': {
    en: {
      backgroundHeading: 'Why measuring booth performance matters',
      causes: ['Subjective performance measurement', 'Cannot grasp visitor distribution across booths'],
      steps: [
        { title: 'Automatic visitor count per booth', productLabel: '01 Observe · StoreCare' },
        { title: 'Booth performance and location-effect analysis', productLabel: '02 Analyze · StoreInsight' },
        { title: 'Automatic per-exhibitor performance reports', productLabel: '03 Act · StoreAgent' },
      ],
      results: ['Booth performance measurement accuracy', 'Automatic visitor count', 'Post-event report automation'],
    },
    jp: {
      backgroundHeading: 'ブース成果測定の重要性',
      causes: ['主観的な成果測定', 'ブース間の来場者分布を把握できない'],
      steps: [
        { title: 'ブース別の来場者数を自動集計', productLabel: '01 観察 · StoreCare' },
        { title: 'ブース成果と位置効果の分析', productLabel: '02 分析 · StoreInsight' },
        { title: '出展社別の成果レポートを自動提供', productLabel: '03 実行 · StoreAgent' },
      ],
      results: ['ブース成果測定の精度', '来場者数の自動集計', '行事終了後のレポート自動化'],
    },
  },
  'exhibition-crowd-flow': {
    en: {
      backgroundHeading: 'Two problems of exhibition crowding',
      causes: ['Cannot grasp real-time congestion', 'Dispersal measures come too late'],
      steps: [
        { title: 'Real-time congestion monitoring by zone', productLabel: '01 Observe · StoreCare' },
        { title: 'Crowd-flow pattern analysis', productLabel: '02 Analyze · StoreInsight' },
        { title: 'Early congestion capture and dispersal alerts', productLabel: '03 Act · StoreAgent' },
      ],
      results: ['Reduction in crowding incidents', 'Congestion forecast lead time', 'Real-time monitoring coverage'],
    },
    jp: {
      backgroundHeading: '展示混雑の二つの問題',
      causes: ['リアルタイム混雑度を把握できない', '分散措置のタイミングが遅い'],
      steps: [
        { title: 'エリア別のリアルタイム混雑度モニタリング', productLabel: '01 観察 · StoreCare' },
        { title: '人流パターンの分析', productLabel: '02 分析 · StoreInsight' },
        { title: '混雑の早期捕捉と分散通知', productLabel: '03 実行 · StoreAgent' },
      ],
      results: ['混雑発生件数の削減', '混雑予測の先行時間', 'リアルタイムモニタリング範囲'],
    },
  },

  // ── Logistics & warehouses ──
  'logistics-worker-safety': {
    en: {
      backgroundHeading: 'The reality of safety incidents in logistics centers',
      causes: ['Vast observation area', 'Cannot verify PPE use in real time', 'Hard to control access to hazardous zones'],
      steps: [
        { title: 'Real-time check of PPE use and hazardous-zone access', productLabel: '01 Observe · StoreCare' },
        { title: 'Zone-by-zone safety-violation pattern analysis', productLabel: '02 Analyze · StoreInsight' },
        { title: 'Real-time alarms and automatic logging', productLabel: '03 Act · StoreAgent' },
      ],
      results: ['Reduced delay in detecting safety risks', 'Uninterrupted automatic monitoring', 'Automatic logging of violation events'],
    },
    jp: {
      backgroundHeading: '物流センターの安全事故の現実',
      causes: ['広範囲な観察範囲', '保護具着用をリアルタイムで確認できない', '危険区域への接近制御が難しい'],
      steps: [
        { title: '保護具着用と危険区域接近をリアルタイム確認', productLabel: '01 観察 · StoreCare' },
        { title: 'エリア別の安全違反パターン分析', productLabel: '02 分析 · StoreInsight' },
        { title: 'リアルタイム警報と自動記録', productLabel: '03 実行 · StoreAgent' },
      ],
      results: ['安全リスク要因の検知遅延の削減', '無中断の自動モニタリング', '違反イベントの自動記録'],
    },
  },
  'logistics-efficiency-zones': {
    en: {
      backgroundHeading: 'Turning logistics efficiency into data',
      causes: ['No real-time throughput measurement by zone', 'Hard to identify work bottlenecks'],
      steps: [
        { title: 'Measure worker distribution and movement by zone', productLabel: '01 Observe · StoreCare' },
        { title: 'Bottleneck and efficiency-drop pattern analysis', productLabel: '02 Analyze · StoreInsight' },
        { title: 'Real-time work-allocation optimization alerts', productLabel: '03 Act · StoreAgent' },
      ],
      results: ['Improvement in zone throughput efficiency', 'Reduction in unnecessary travel distance', 'Real-time efficiency monitoring'],
    },
    jp: {
      backgroundHeading: '物流効率のデータ化',
      causes: ['エリア別処理量のリアルタイム測定の不在', '作業ボトルネック区間の把握が難しい'],
      steps: [
        { title: 'エリア別の作業者分布と移動パターンを測定', productLabel: '01 観察 · StoreCare' },
        { title: '作業ボトルネックと効率低下パターンの分析', productLabel: '02 分析 · StoreInsight' },
        { title: 'リアルタイム作業配分最適化の通知', productLabel: '03 実行 · StoreAgent' },
      ],
      results: ['エリア別処理量の効率向上', '不要な移動距離の削減', 'リアルタイム効率モニタリング'],
    },
  },
  'logistics-ppe-compliance': {
    en: {
      backgroundHeading: 'How PPE compliance reduces industrial accidents',
      causes: ['Cannot verify every worker in real time', 'Hard to record and trace non-compliance'],
      steps: [
        { title: 'AI auto-detection of PPE use', productLabel: '01 Observe · StoreCare' },
        { title: 'Compliance-rate analysis by zone and time', productLabel: '02 Analyze · StoreInsight' },
        { title: 'Automatic PPE compliance reports', productLabel: '03 Act · StoreAgent' },
      ],
      results: ['Reduction in PPE non-compliance events', 'PPE compliance rate achieved', 'Automatic logging of non-compliance'],
    },
    jp: {
      backgroundHeading: 'PPE遵守が産業災害を減らす方法',
      causes: ['全作業者のリアルタイム確認が不可能', '非遵守の記録と追跡が難しい'],
      steps: [
        { title: '保護具着用をAIで自動検出', productLabel: '01 観察 · StoreCare' },
        { title: 'エリア別・時間帯別の遵守率分析', productLabel: '02 分析 · StoreInsight' },
        { title: 'PPE遵守率の自動レポート', productLabel: '03 実行 · StoreAgent' },
      ],
      results: ['PPE未着用イベントの削減', 'PPE遵守率の達成', '未着用イベントの自動記録'],
    },
  },
};
