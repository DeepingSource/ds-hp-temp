import { type Locale } from '@/lib/i18n';
import { type GlossaryCategory } from '@/data/glossaryTerms';

/**
 * Translation overlay for /resources/glossary (en default · ko · jp).
 *
 * Shared data (glossaryTerms.ts) stays Korean-canonical. This overlay supplies
 * en/jp copy for the index-card fields only: category label, term title, tagline.
 * Korean (ko) reads straight from the data; missing overlay values fall back to data.
 * Detail-only fields (definition/body/saaiUsage) and englishTitle are NOT translated.
 *
 * en = executive English (faithful) · jp = 丁寧体
 */

export const glossaryCategoryI18n: Record<GlossaryCategory, Partial<Record<Locale, string>>> = {
  ai: { en: 'AI Technology', jp: 'AI技術' },
  analytics: { en: 'Data Analytics', jp: 'データ分析' },
  retail: { en: 'Retail', jp: 'リテール' },
  operations: { en: 'Store Operations', jp: '店舗運営' },
};

export const glossaryCardI18n: Record<
  string,
  Partial<Record<Locale, { title: string; tagline: string; definition?: string }>>
> = {
  'store-heatmap': {
    en: {
      title: 'Store Heatmap',
      tagline: 'Spatial data that shows where customers lingered, visualized in color',
      definition:
        'A store heatmap is a data map that visualizes, through color intensity, how long and how often customers dwell in specific areas of a store. Red zones mark high-engagement hotspots, while blue zones indicate blind spots that customers rarely visit.',
    },
    jp: {
      title: '店舗ヒートマップ',
      tagline: '顧客がどこに長く滞在したかを色で可視化する空間データです',
      definition:
        '店舗ヒートマップとは、店舗内の特定エリアに顧客がどれだけ長く滞在し、どれだけ頻繁に訪れたかを色の濃淡で可視化したデータマップです。赤いエリアは滞在が集中するホットスポットを、青いエリアは訪問の少ない死角を示します。',
    },
  },
  'anonymized-cctv': {
    en: {
      title: 'Anonymized CCTV Analytics',
      tagline: 'AI that extracts only behavioral patterns, without faces or personal data',
      definition:
        'Anonymized CCTV analytics is a technology in which AI extracts only behavioral data — such as location, movement, and dwell — from CCTV footage, without capturing or processing personally identifiable information like faces, names, or license plates. It secures the insights needed for store analysis while remaining compliant with privacy regulations.',
    },
    jp: {
      title: '匿名化CCTV分析',
      tagline: '顔や個人情報を扱わず、行動パターンのみを抽出するAI分析技術です',
      definition:
        '匿名化CCTV分析とは、CCTV映像から顔・氏名・ナンバープレートなどの個人を特定できる情報を取得・処理せず、位置・移動・滞在といった行動パターンのデータのみを抽出する技術です。個人情報保護法を遵守しながら、店舗分析に必要なインサイトを確保できます。',
    },
  },
  'dwell-time': {
    en: {
      title: 'Dwell Time Analysis',
      tagline: 'A metric that gauges interest by how long customers stay in a given space',
      definition:
        'Dwell time refers to the total time a customer spends in a store or in a specific zone within it. Longer dwell time can be read as higher interest in that space or greater consideration to purchase, and analyzing it helps optimize store layout and merchandising strategy.',
    },
    jp: {
      title: '滞在時間分析',
      tagline: '顧客が特定の空間に滞在した時間で関心度を測る指標です',
      definition:
        '滞在時間（Dwell Time）とは、顧客が店舗または店舗内の特定エリアに滞在した合計時間を指します。滞在時間が長いほど、その空間への関心や購買検討が高いと解釈でき、これを分析することで店舗レイアウトや陳列戦略を最適化できます。',
    },
  },
  'purchase-conversion-rate': {
    en: {
      title: 'Purchase Conversion Rate',
      tagline: 'The share of visitors who actually buy — a core measure of store efficiency',
      definition:
        'Purchase conversion rate is the share of all visitors entering a store who actually complete a purchase. If 30 of every 100 visitors buy, the conversion rate is 30%. It is a metric that reflects the combined efficiency of a store’s merchandising, traffic flow, product mix, and staff service.',
    },
    jp: {
      title: '購買転換率',
      tagline: '来店した顧客のうち実際に購入した割合で、店舗効率の中核指標です',
      definition:
        '購買転換率（Purchase Conversion Rate）とは、来店したすべての顧客のうち、実際に購買（決済）に至った顧客の割合です。来店100名のうち30名が購入すれば、転換率は30%となります。店舗の陳列・動線・商品構成・接客サービスの総合的な効率を示す指標です。',
    },
  },
  'seat-turnover-rate': {
    en: {
      title: 'Seat Turnover Rate',
      tagline: 'Key to café and restaurant profitability — how many times a table turns per day',
      definition:
        'Seat turnover rate is a metric showing how many times a single seat (or table) is used by new customers over a given period. In cafés and restaurants, a low turnover rate during peak hours leads to waiting customers leaving and lost revenue.',
    },
    jp: {
      title: '席回転率',
      tagline: 'カフェ・飲食店の収益性を左右する、テーブルが1日に何回入れ替わるかの指標です',
      definition:
        '席回転率（Seat Turnover Rate）とは、一定時間内に1つの座席（テーブル）が何回新しい顧客に利用されたかを示す指標です。カフェ・飲食店では、ピークタイムの回転率が低いと待ち顧客の離脱や売上の損失につながります。',
    },
  },
  'anomaly-detection': {
    en: {
      title: 'Anomaly Detection',
      tagline: 'AI that learns normal patterns to automatically flag abnormal situations',
      definition:
        'Anomaly detection is a technology in which AI learns normal patterns and then detects, in real time, abnormal situations that deviate from those patterns, raising alerts. In a store environment, it is used to detect anomalous behavior such as intrusion during unattended hours, prolonged loitering, falls, and vandalism.',
    },
    jp: {
      title: '異常検知 (Anomaly Detection)',
      tagline: 'AIが正常なパターンを学習し、異常な状況を自動で検知する技術です',
      definition:
        '異常検知（Anomaly Detection）とは、AIが正常なパターンを学習したうえで、そのパターンから外れる異常な状況をリアルタイムで検知し、アラートを発する技術です。店舗環境では、無人時間帯の侵入、長時間の徘徊、転倒、器物破損などの異常行動の検知に活用されます。',
    },
  },
  'computer-vision': {
    en: {
      title: 'Computer Vision',
      tagline: 'The foundational technology that lets AI understand and analyze camera footage',
      definition:
        'Computer vision is a technology in which deep-learning AI analyzes images or video captured by cameras to recognize people, objects, and actions, converting them into meaningful data. In retail, it is widely applied to customer traffic analysis, inventory detection, and abnormal behavior detection.',
    },
    jp: {
      title: 'コンピュータビジョン (Computer Vision)',
      tagline: 'カメラ映像をAIが理解し分析する、中核となる基盤技術です',
      definition:
        'コンピュータビジョン（Computer Vision）とは、カメラで撮影した画像や映像をディープラーニングAIが分析し、人・物体・行動を認識して意味のあるデータへ変換する技術です。小売業では、顧客動線分析、在庫検知、異常行動検知などに幅広く活用されています。',
    },
  },
  'zone-analysis': {
    en: {
      title: 'Zone Analysis',
      tagline: 'Dividing a store into zones to measure which spaces drive sales',
      definition:
        'Zone analysis is an analytical method that divides a store into multiple zones and measures and compares each zone’s visit rate, dwell time, and conversion rate individually. By identifying which zones draw customer attention and which are blind spots, it optimizes layout and merchandising.',
    },
    jp: {
      title: 'ゾーン別分析 (Zone Analysis)',
      tagline: '店舗をゾーンに分け、どの空間が売上に貢献しているかを測定します',
      definition:
        'ゾーン別分析（Zone Analysis）とは、店舗を複数のゾーンに分け、各ゾーンの訪問率・滞在時間・転換率を個別に測定・比較する分析手法です。どのゾーンが顧客の注目を集め、どのゾーンが死角になっているかを把握し、レイアウトと陳列を最適化します。',
    },
  },
  'footfall-analysis': {
    en: {
      title: 'Footfall Analysis',
      tagline: 'Foundational analysis that precisely measures visitor flow by hour and day',
      definition:
        'Footfall analysis automatically measures the number of customers visiting a store and their timing patterns. By capturing entries, inflow by time of day, peak times, and visit frequency, it provides the foundational data to optimize staffing, restocking, and promotion timing.',
    },
    jp: {
      title: '来店客分析 (Footfall Analysis)',
      tagline: '時間帯・曜日ごとの来店客の流れを精密に測定する基礎分析です',
      definition:
        '来店客分析（Footfall Analysis）とは、店舗を訪れる顧客の数と時間パターンを自動で測定する分析です。入店人数、時間帯別の流入量、ピークタイム、訪問頻度などを把握し、人員配置・在庫補充・プロモーションのタイミングを最適化する基礎データを提供します。',
    },
  },
  'vmd-optimization': {
    en: {
      title: 'Visual Merchandising (VMD) Optimization',
      tagline: 'A data-driven, scientific approach to improving product display and store presentation',
      definition:
        'VMD (Visual Merchandising) optimization is the process of measuring, with data, how a store’s visual presentation — product display, signage placement, traffic-flow design — actually influences customer behavior, and improving it accordingly. Merchandising decisions once made on intuition and experience are validated and refined with AI analytics data.',
    },
    jp: {
      title: 'VMD最適化',
      tagline: 'データに基づき、商品陳列と店舗演出を科学的に改善する手法です',
      definition:
        'VMD（Visual Merchandising）最適化とは、商品陳列・サイン配置・動線設計など店舗の視覚的演出が実際に顧客行動へ及ぼす影響をデータで測定し、改善していくプロセスです。直感や経験に頼っていた陳列の判断を、AI分析データで検証し改善します。',
    },
  },
  'stockout-detection': {
    en: {
      title: 'Stockout Detection',
      tagline: 'AI automatically detects empty shelf space and sends real-time alerts',
      definition:
        'Stockout detection is a capability in which an AI camera automatically detects the moment a product sells out and an empty space appears on a store shelf, and sends an alert to the person in charge. It prevents the “unsellable loss” that POS data cannot reveal.',
    },
    jp: {
      title: '欠品検知 (Stockout Detection)',
      tagline: 'AIが陳列棚の空きスペースを自動検知し、リアルタイムで通知します',
      definition:
        '欠品検知（Stockout Detection）とは、店舗の陳列棚で商品が売り切れて空きスペースが生じた瞬間をAIカメラが自動で検知し、担当者へ通知する機能です。POSデータでは分からない「売れなかった損失」を防ぎます。',
    },
  },
  'behavior-analysis': {
    en: {
      title: 'Customer Behavior Analysis',
      tagline: 'An analytical method to understand, through data, what customers do in store',
      definition:
        'Customer behavior analysis is a method of collecting and analyzing, as data, the movement paths, dwell patterns, product-contact behavior, and purchase-decision process of customers who visit a store. AI cameras capture the actual in-store behavior that is difficult to grasp through surveys or POS data alone.',
    },
    jp: {
      title: '顧客行動分析',
      tagline: '顧客が店舗内で何をしているかをデータで理解する分析手法です',
      definition:
        '顧客行動分析（Customer Behavior Analysis）とは、店舗を訪れた顧客の移動経路・滞在パターン・商品への接触行動・購買決定のプロセスをデータとして収集し分析する手法です。アンケートやPOSデータだけでは把握しにくい現場での実際の行動を、AIカメラで捉えます。',
    },
  },
  'crowd-density-analysis': {
    en: {
      title: 'Crowd Density Analysis',
      tagline: 'Measuring density per space in real time to manage congestion proactively',
      definition:
        'Crowd density analysis measures, in real time, the number and density of people present simultaneously in a store or a specific zone. By detecting congestion in advance, operators can take measures such as entry limits, staff deployment, and traffic-flow dispersion.',
    },
    jp: {
      title: '混雑度分析',
      tagline: '空間ごとの人口密度をリアルタイムで測定し、混雑を事前に管理します',
      definition:
        '混雑度分析（Crowd Density Analysis）とは、店舗や特定エリアに同時に存在する人数と密度をリアルタイムで測定する分析です。混雑状況を事前に検知し、入場制限・人員配置・動線分散などの対応を取ることができます。',
    },
  },
  'retail-ai': {
    en: {
      title: 'Retail AI',
      tagline: 'An umbrella term for AI that automates and optimizes retail operations',
      definition:
        'Retail AI is an umbrella term for the artificial-intelligence technologies applied to retail store operations, inventory management, customer behavior analysis, and demand forecasting. CCTV-based computer vision, machine-learning demand forecasting, and automated ordering systems all fall within the scope of retail AI.',
    },
    jp: {
      title: 'リテールAI',
      tagline: '小売業の運営を自動化・最適化する人工知能技術の総称です',
      definition:
        'リテールAI（Retail AI）とは、小売店舗の運営・在庫管理・顧客行動分析・需要予測などに適用される人工知能技術の総称です。CCTVベースのコンピュータビジョン、機械学習による需要予測、自動発注システムなどがすべてリテールAIの範疇に含まれます。',
    },
  },
  'cctv-analytics': {
    en: {
      title: 'CCTV Analytics Solution',
      tagline: 'A solution that turns security CCTV into a tool for collecting store operations data',
      definition:
        'A CCTV analytics solution is software in which AI analyzes, in real time, footage from cameras already installed in a store to deliver operational insights such as customer behavior data, abnormal-situation detection, and space-utilization analysis. Its defining trait is that it leverages existing infrastructure without requiring new hardware.',
    },
    jp: {
      title: 'CCTV分析ソリューション',
      tagline: '防犯用CCTVを店舗運営データの収集ツールへと転換するソリューションです',
      definition:
        'CCTV分析ソリューションとは、店舗にすでに設置されたCCTVカメラの映像をAIがリアルタイムで分析し、顧客行動データ・異常状況の検知・空間活用度の分析といった運営インサイトを提供するソフトウェアソリューションです。新たなハードウェアを必要とせず、既存インフラを活用する点が特徴です。',
    },
  },
  'store-operations-automation': {
    en: {
      title: 'Store Operations Automation',
      tagline: 'An operating model in which AI automatically handles repetitive store checks and responses',
      definition:
        'Store operations automation is the use of an AI system to automatically handle the repetitive store-operations tasks that must be performed routinely — stockout checks, abnormal-situation monitoring, customer-flow analysis, and ordering suggestions. It reduces the time spent patrolling or reviewing footage in person and enables faster, data-driven decisions.',
    },
    jp: {
      title: '店舗運営自動化',
      tagline: '繰り返しの店舗点検や対応をAIが自動で処理する運営方式です',
      definition:
        '店舗運営自動化（Store Operations Automation）とは、欠品確認・異常状況のモニタリング・顧客の流れの分析・発注提案など、繰り返し行う必要のある店舗運営業務をAIシステムが自動で処理することです。人が直接巡回したり映像を確認したりする時間を減らし、データに基づく意思決定を迅速に下せます。',
    },
  },
  'night-monitoring': {
    en: {
      title: 'Night Monitoring',
      tagline: 'Detecting and responding to incidents and theft in real time during unattended night operations',
      definition:
        'Night monitoring is an operating model that uses CCTV and AI to detect theft, intrusion, abnormal behavior, and facility anomalies in real time and send immediate alerts during the nighttime hours when a store runs unattended or with minimal staff. It enables an immediate response the moment an incident occurs, rather than waiting until the next morning.',
    },
    jp: {
      title: '夜間モニタリング',
      tagline: '無人の夜間運営中の事故や盗難をリアルタイムで検知し対応します',
      definition:
        '夜間モニタリングとは、店舗が無人または最小人数で運営される夜間の時間帯に、CCTVとAIを活用して盗難・侵入・異常行動・設備異常をリアルタイムで検知し、即時にアラートを送る運営方式です。翌朝まで待たず、事件発生時にすぐ対応できます。',
    },
  },
  'pos-data-limitations': {
    en: {
      title: 'Limitations of POS Data',
      tagline: 'POS knows only what was paid for — far more data goes unrecorded',
      definition:
        'POS (Point of Sale) data includes only records of transactions that were actually completed. Customers who visited but did not buy, products picked up and put back down, and losses from shelves that sat empty and unsold are never recorded in POS. This “invisible data” is the key to store improvement.',
    },
    jp: {
      title: 'POSデータの限界',
      tagline: '決済されたものしか分からないPOSは、取りこぼすデータの方が多いのです',
      definition:
        'POS（Point of Sale）データには、実際に決済が完了した取引記録のみが含まれます。来店したが購入しなかった顧客、手に取って戻した商品、陳列棚が空いて売れなかった損失は、POSには記録されません。この「見えないデータ」こそが店舗改善の鍵です。',
    },
  },
  'store-automation-agent': {
    en: {
      title: 'Store AI Agent',
      tagline: 'An execution AI that turns analytics results into on-site action',
      definition:
        'A store AI agent is an AI system that automatically executes concrete actions — sending alerts, suggesting orders, directing staff — based on the results of analyzing store-operations data. Going beyond merely displaying data, it serves to connect analytical findings to actual on-site improvement.',
    },
    jp: {
      title: '店舗AIエージェント',
      tagline: 'データ分析の結果を現場の行動へとつなぐ自動化実行AIです',
      definition:
        '店舗AIエージェント（Store AI Agent）とは、店舗運営データを分析した結果に基づき、アラート送信・発注提案・スタッフへの指示といった具体的な行動を自動で実行するAIシステムです。単にデータを表示するだけでなく、分析結果が実際の現場改善につながるよう橋渡しする役割を担います。',
    },
  },
};
