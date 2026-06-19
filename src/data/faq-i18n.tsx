import Link from 'next/link';
import { COMPANY } from '@/lib/company-data';
import { localeHref, type Locale } from '@/lib/i18n';
import { type FAQItem } from '@/data/faq-data';

/**
 * faq-i18n — translation OVERLAY for /resources/faq (en, jp).
 *
 * The Korean source lives in faq-data.tsx; this file mirrors that order
 * per section for English (executive, faithful) and Japanese (丁寧体).
 * Answer JSX structure (lists, <strong>, links, COMPANY refs) is preserved.
 */

export const faqI18n: Record<
  'common' | 'storecare' | 'storeinsight' | 'storeagent',
  Partial<Record<Locale, FAQItem[]>>
> = {
  /* ─── 공통 / Common / 共通 ─── */
  common: {
    en: [
      {
        question: 'What does the onboarding process look like?',
        answer: (locale) => (
          <>
            <ul className="space-y-2 mb-4">
              <li><strong>1. Request a consultation</strong></li>
              <li><strong>2. Store assessment and pilot design</strong></li>
              <li><strong>3. Integration with your existing CCTV/POS setup (3–5 days)</strong></li>
              <li><strong>4. First report delivered and operations begin (D+7 after sign-up)</strong></li>
            </ul>
            Because we use your existing equipment, you can start quickly with no replacement burden.<br /><br />
            <Link href={localeHref(locale, '/contact')} className="text-primary hover:underline font-semibold">Request a free consultation &rarr;</Link>
          </>
        ),
      },
      {
        question: 'Is there a minimum contract term?',
        answer: (
          <>
            The minimum term is one month. You can cancel anytime with no penalty and continue using the service through the remaining period. Annual billing includes a two-month discount.
          </>
        ),
      },
      {
        question: 'How is data security managed?',
        answer: (
          <>
            Original footage is processed only on-device within the store, and only de-identified analysis results are sent to the cloud. All data is stored encrypted in the AWS Seoul region, in full compliance with the Personal Information Protection Act.
          </>
        ),
      },
      {
        question: 'How does payment work?',
        answer: (locale) => (
          <>
            After you request a free consultation, your representative will walk you through the payment options. We support card payment, bank transfer, tax-invoice issuance, and other methods suited to your business.<br /><br />
            <Link href={localeHref(locale, '/contact')} className="text-primary hover:underline font-semibold">Inquire about adoption &rarr;</Link>
          </>
        ),
      },
      {
        question: 'How do I cancel?',
        answer: (
          <>
            You can cancel easily from the settings page. Cancellation is available anytime with no penalty, and you can keep using the service normally through the remaining period.
          </>
        ),
      },
      {
        question: 'Can I get a refund?',
        answer: (
          <>
            Within 7 days of payment, you receive a 100% refund if the service is unused. If used, the refund is prorated. After 7 days a refund is not available, but you can continue using the service until the end of the paid period.
          </>
        ),
      },
      {
        question: 'Is there a discount for running multiple stores?',
        answer: (locale) => (
          <>
            Yes. We offer dedicated plans for multi-store operators and franchise headquarters (up to a 30% synergy discount). You can also manage multiple stores from a single account.<br /><br />
            <Link href={localeHref(locale, '/pricing/simulator')} className="text-primary hover:underline font-semibold text-sm mr-4">Run a quote simulation &rarr;</Link>
            <Link href={localeHref(locale, '/contact')} className="text-primary hover:underline font-semibold text-sm">Get a custom quote &rarr;</Link>
          </>
        ),
      },
      {
        question: 'Does it integrate with our existing POS or ERP?',
        answer: (
          <>
            We support integration with major POS systems (KOVAN, POSBANK, OKPOS, etc.) and in-house ERP. Integration is via API or data-file upload, and we will recommend the optimal method for your store environment.
          </>
        ),
      },
    ],
    jp: [
      {
        question: '導入の流れはどうなりますか？',
        answer: (locale) => (
          <>
            <ul className="space-y-2 mb-4">
              <li><strong>1. ご相談のお申し込み</strong></li>
              <li><strong>2. 店舗環境の把握とパイロット設計</strong></li>
              <li><strong>3. 既存のCCTV/POS環境との連携（3〜5日程度）</strong></li>
              <li><strong>4. 初回レポートの受信と運用開始（お申し込み後 D+7）</strong></li>
            </ul>
            既存の機器をそのまま活用するため、入れ替えの負担なくすぐに始められます。<br /><br />
            <Link href={localeHref(locale, '/contact')} className="text-primary hover:underline font-semibold">無料相談を申し込む &rarr;</Link>
          </>
        ),
      },
      {
        question: '契約期間に制限はありますか？',
        answer: (
          <>
            最低契約期間は1か月です。違約金なしでいつでも解約でき、残りの期間まではサービスを引き続きご利用いただけます。年額のお支払いの場合は2か月分の割引が適用されます。
          </>
        ),
      },
      {
        question: 'データのセキュリティはどのように管理されますか？',
        answer: (
          <>
            映像の原本は店舗内のオンデバイスでのみ処理され、クラウドには非識別化された分析結果のみが送信されます。すべてのデータはAWSソウルリージョンで暗号化して保存され、個人情報保護法を徹底して遵守します。
          </>
        ),
      },
      {
        question: 'お支払いはどのようにしますか？',
        answer: (locale) => (
          <>
            無料相談のお申し込み後、担当者がお支払い方法をご案内します。カード決済、口座振込、適格請求書の発行など、企業環境に合わせたさまざまな方法に対応しています。<br /><br />
            <Link href={localeHref(locale, '/contact')} className="text-primary hover:underline font-semibold">導入について問い合わせる &rarr;</Link>
          </>
        ),
      },
      {
        question: '解約はどのようにしますか？',
        answer: (
          <>
            設定ページから簡単に解約できます。違約金なしでいつでも解約でき、残りの期間中は通常どおりサービスをご利用いただけます。
          </>
        ),
      },
      {
        question: '返金は受けられますか？',
        answer: (
          <>
            お支払いから7日以内で、サービス未使用の場合は100%返金されます。ご利用済みの場合は日割り計算で返金します。7日経過後の返金は難しいですが、当該お支払い期間の終了時点まではサービスをご利用いただけます。
          </>
        ),
      },
      {
        question: '複数店舗を運営すると割引はありますか？',
        answer: (locale) => (
          <>
            はい、多店舗運営のお客様やフランチャイズ本部向けの専用プラン（最大30%のシナジー割引）をご用意しています。一つのアカウントで複数店舗をまとめて管理することも可能です。<br /><br />
            <Link href={localeHref(locale, '/pricing/simulator')} className="text-primary hover:underline font-semibold text-sm mr-4">見積もりシミュレーションを試す &rarr;</Link>
            <Link href={localeHref(locale, '/contact')} className="text-primary hover:underline font-semibold text-sm">カスタム見積もりを相談する &rarr;</Link>
          </>
        ),
      },
      {
        question: '既存のPOSやERPと連携できますか？',
        answer: (
          <>
            主要なPOSシステム（KOVAN、POSBANK、OKPOSなど）および社内ERPとの連携に対応しています。連携方式はAPIまたはデータファイルのアップロード方式で、店舗環境に合わせて最適な方法をご案内します。
          </>
        ),
      },
    ],
  },

  /* ─── StoreCare ─── */
  storecare: {
    en: [
      {
        question: 'Can it be installed in my store too?',
        answer: (
          <>All you need is internet (Wi-Fi or wired) and an existing CCTV camera. It works for any business — convenience stores, cafés, unmanned stores, and more.</>
        ),
      },
      {
        question: 'Do I need to install new CCTV cameras?',
        answer: (
          <>It uses the CCTV cameras already installed in your store, so there is no additional camera purchase cost.</>
        ),
      },
      {
        question: 'Could store photos or customer footage be leaked?',
        answer: (
          <>
            No one reviews the original footage, and it is never sent outside the store. The AI analyzes on-site and sends only numbers and status alerts, with faces and similar details automatically anonymized.
          </>
        ),
      },
      {
        question: 'Can headquarters see my store data?',
        answer: (
          <>
            No. The analysis data belongs only to you, the store owner. It is not shared with headquarters or anyone else.
          </>
        ),
      },
      {
        question: 'Can I use it right after installation?',
        answer: (
          <>
            Yes. Just connect the small device — it takes 30 minutes to an hour. You can start using it the same day.
          </>
        ),
      },
      {
        question: "Won't I get too many alerts?",
        answer: (
          <>
            You can choose only the time slots and items you want. For example, set it to receive alerts only during late-night hours, or only temperature alerts. Receive them however is convenient — KakaoTalk, app push, or email.
          </>
        ),
      },
      {
        question: 'How much does it cost to get started?',
        answer: (locale) => (
          <>
            You pay a one-time fee of 50,000 KRW for the AI analysis device. After that, you only pay the monthly subscription. (More devices may be needed depending on store size.)<br /><br />
            <Link href={localeHref(locale, '/pricing')} className="text-primary hover:underline font-semibold">See StoreCare pricing in detail &rarr;</Link>
          </>
        ),
      },
      {
        question: 'Can I compare with other stores?',
        answer: (locale) => (
          <>
            Yes. If you run multiple stores, you can compare them at a glance on the integrated dashboard. You can immediately see which stores keep cleanliness well and where to focus. Multi-store discounts are available too.<br /><br />
            <Link href={localeHref(locale, '/contact')} className="text-primary hover:underline font-semibold">Consult about multiple stores &rarr;</Link>
          </>
        ),
      },
    ],
    jp: [
      {
        question: 'うちの店舗にも設置できますか？',
        answer: (
          <>インターネット（Wi-Fiまたは有線）が使えてCCTVがあれば大丈夫です。コンビニ、カフェ、無人店舗など、業種を問わずすべて対応可能です。</>
        ),
      },
      {
        question: 'CCTVカメラも新しく設置する必要がありますか？',
        answer: (
          <>すでに店舗に設置されているCCTVカメラをそのまま活用するため、追加のカメラ購入費用はかかりません。</>
        ),
      },
      {
        question: '店舗の写真や顧客の映像が流出することはありませんか？',
        answer: (
          <>
            映像の原本は人が閲覧することはなく、店舗の外に送信されることもありません。AIが現場で分析したうえで数値・状態の通知のみをお伝えし、顔などは自動的に匿名化処理されます。
          </>
        ),
      },
      {
        question: '本部がうちの店舗のデータを見ることはできますか？',
        answer: (
          <>
            いいえ。分析データは店主様だけのものです。本部や他の場所に共有されることはありません。
          </>
        ),
      },
      {
        question: '設置してすぐに使えますか？',
        answer: (
          <>
            はい、小型の装置を接続するだけで30分〜1時間で完了します。当日からご利用いただけます。
          </>
        ),
      },
      {
        question: '通知が多すぎることはありませんか？',
        answer: (
          <>
            希望する時間帯と項目だけを選べます。たとえば深夜の時間帯だけ受け取る、温度の通知だけ受け取る、など自由に設定してください。LINE、アプリのプッシュ通知、メールのうち、便利な方法で受け取れます。
          </>
        ),
      },
      {
        question: '最初にいくらかかりますか？',
        answer: (locale) => (
          <>
            AI分析装置の初回費用5万ウォンだけお支払いいただければ大丈夫です。その後は月額の利用料のみお支払いください。（店舗の広さに応じて装置が増えることがあります。）<br /><br />
            <Link href={localeHref(locale, '/pricing')} className="text-primary hover:underline font-semibold">StoreCareの料金プランを詳しく見る &rarr;</Link>
          </>
        ),
      },
      {
        question: '他の店舗と比較もできますか？',
        answer: (locale) => (
          <>
            はい、複数の店舗を運営されている場合は、統合ダッシュボードで一目で比較できます。どの店舗が清潔さをよく保てているか、どこに注力すべきかがすぐに分かります。多店舗割引もあります。<br /><br />
            <Link href={localeHref(locale, '/contact')} className="text-primary hover:underline font-semibold">多店舗について相談する &rarr;</Link>
          </>
        ),
      },
    ],
  },

  /* ─── StoreInsight ─── */
  storeinsight: {
    en: [
      {
        question: 'How are customer faces erased?',
        answer: (
          <>
            The AI automatically erases faces and biometric information from the footage while keeping behavioral data such as movement paths and dwell time intact. It is a patented technology developed by DeepingSource ({COMPANY.patents} patents).
          </>
        ),
      },
      {
        question: 'How is it different from other analytics tools?',
        answer: (
          <>
            It links multiple cameras to seamlessly and continuously connect the movement paths of de-identified objects, and through an integrated LLM dashboard it offers “conversational analytics” — ask in natural language and get insights answered right away.
          </>
        ),
      },
      {
        question: 'How much does it cost?',
        answer: (locale) => (
          <>
            It is an enterprise custom solution priced according to the size of the space being analyzed, the camera environment, and the types of analysis required.<br /><br />
            <Link href={localeHref(locale, '/pricing/simulator')} className="text-primary hover:underline font-semibold mr-4 text-sm">Monthly pricing simulation &rarr;</Link>
            <Link href={localeHref(locale, '/contact') + '?product=StoreInsight'} className="text-primary hover:underline font-semibold text-sm">Get a custom consultation &rarr;</Link>
          </>
        ),
      },
      {
        question: 'Can it be used somewhere other than stores?',
        answer: (
          <>
            Yes. It works anywhere people move through — exhibitions, expos, restaurants, pop-up stores, public facilities, and more.
          </>
        ),
      },
      {
        question: 'What do I need to adopt it?',
        answer: (
          <>
            An IP-based CCTV (720p, 10fps, RTSP support) and an internet connection are all you need. It scales flexibly regardless of the number of cameras.
          </>
        ),
      },
      {
        question: 'Where can I see the analysis results?',
        answer: (
          <>
            You can check them in real time on the web dashboard. Visitor counts, dwell time, heatmaps, and more are available immediately, and we also send PDF reports regularly.
          </>
        ),
      },
    ],
    jp: [
      {
        question: '顧客の顔はどのように消されますか？',
        answer: (
          <>
            AIが映像内の顔や生体情報を自動的に消しながら、動線・滞留といった行動データはそのまま残します。DeepingSourceが開発した特許技術（{COMPANY.patents}件）です。
          </>
        ),
      },
      {
        question: '他の分析ツールと何が違いますか？',
        answer: (
          <>
            複数台のカメラを連携し、非識別化された対象の移動経路を途切れることなく連続的につなぐことができ、統合されたLLMダッシュボードを通じて自然言語で質問すると、すぐにインサイトを回答する「対話型分析」を提供します。
          </>
        ),
      },
      {
        question: '費用はどうなりますか？',
        answer: (locale) => (
          <>
            分析する空間の広さ、カメラ環境、必要な分析の種類に応じて費用が算定される、エンタープライズ向けのカスタムソリューションです。<br /><br />
            <Link href={localeHref(locale, '/pricing/simulator')} className="text-primary hover:underline font-semibold mr-4 text-sm">月額料金シミュレーション &rarr;</Link>
            <Link href={localeHref(locale, '/contact') + '?product=StoreInsight'} className="text-primary hover:underline font-semibold text-sm">カスタム相談をする &rarr;</Link>
          </>
        ),
      },
      {
        question: '店舗以外の場所でも使えますか？',
        answer: (
          <>
            はい、展示会、博覧会、飲食店、ポップアップストア、公共施設など、人が行き交う場所であればどこでも対応可能です。
          </>
        ),
      },
      {
        question: '導入するには何が必要ですか？',
        answer: (
          <>
            IP方式のCCTV（720p、10fps、RTSP対応）とインターネット接続があれば十分です。カメラの台数にかかわらず柔軟に拡張できます。
          </>
        ),
      },
      {
        question: '分析結果はどこで見られますか？',
        answer: (
          <>
            Webダッシュボードでリアルタイムに確認できます。来訪者数、滞留時間、ヒートマップなどをすぐに確認でき、PDFレポートも定期的にお送りします。
          </>
        ),
      },
    ],
  },

  /* ─── StoreAgent ─── */
  storeagent: {
    en: [
      {
        question: 'Can headquarters tell that I am using it?',
        answer: (
          <>No. It runs entirely on your personal account and email, leaving no usage history in the headquarters system — a fully independent assistant.</>
        ),
      },
      {
        question: 'Does it work regardless of my store brand (convenience store)?',
        answer: (
          <>Yes. Regardless of the brand — CU, GS25, 7-Eleven, emart24, and others — any offline retail store can receive useful trade-area-based tailored briefings.</>
        ),
      },
      {
        question: 'How accurate is the event and date information?',
        answer: (
          <>By integrating the Korea Meteorological Administration’s real-time API and public data from local governments and universities, it reflects the precise schedule of the specific trade area your store belongs to (office, residential, university district, nightlife district, etc.).</>
        ),
      },
      {
        question: 'Can I change the briefing delivery time?',
        answer: (
          <>From the Basic plan and above, you can set the briefing delivery time to match your wake-up time, between 5 AM and 8 AM.</>
        ),
      },
      {
        question: "What is the difference between the Basic and POS-integrated plans?",
        answer: (
          <>
            The free Basic plan provides a daily morning briefing and checklist based on trade area, weather, and events. The POS-integrated plan (15,000 KRW/month) adds <strong>actual sales data analysis</strong>, ordering recommendations, and competitor comparisons.
          </>
        ),
      },
      {
        question: 'What makes the AI Assistant plan different?',
        answer: (
          <>
            The AI Assistant plan (25,000 KRW/month) includes everything in the POS-integrated plan plus <strong>conversational AI chat</strong>, letting you freely ask questions about your store data and get answers. It also supports automatic AI promotional material creation, tailored action cards, and promotion-effect analysis.
          </>
        ),
      },
    ],
    jp: [
      {
        question: '本部に私が使っていることが分かりますか？',
        answer: (
          <>いいえ。完全に店主様の個人アカウントとメールで動作し、本部システムに使用履歴が残らない、完全に独立したアシスタントです。</>
        ),
      },
      {
        question: '運営している店舗のブランド（コンビニ）に関係なく使えますか？',
        answer: (
          <>はい、CU、GS25、セブンイレブン、emart24など、ブランドの屋号に関係なく、オフラインの小売店であればどこでも役立つ商圏ベースのカスタムブリーフィングを受け取れます。</>
        ),
      },
      {
        question: 'イベントや日付の情報はどれくらい正確ですか？',
        answer: (
          <>気象庁のリアルタイムAPIおよび自治体・大学の公共データを連携し、店主様の店舗が属する特定の商圏（オフィス、住宅、大学街、繁華街など）の正確なスケジュールを反映します。</>
        ),
      },
      {
        question: 'ブリーフィングの受信時間を変えられますか？',
        answer: (
          <>ベーシックプラン以上では、午前5時〜8時の間で店主様の起床時間に合わせてブリーフィングの送信時間を設定できます。</>
        ),
      },
      {
        question: 'ベーシックとPOS連携プランの違いは？',
        answer: (
          <>
            無料のベーシックは、毎朝の商圏／天気／イベントに基づくブリーフィングとチェックリストを提供します。POS連携プラン（月15,000ウォン）は、これに<strong>実際の売上データ分析</strong>、発注の推奨、競合店との比較が加わります。
          </>
        ),
      },
      {
        question: 'AIアシスタントプランは何が違いますか？',
        answer: (
          <>
            AIアシスタントプラン（月25,000ウォン）は、POS連携のすべての機能に加えて<strong>対話型AIチャット</strong>で店舗データについて自由に質問し、回答を受け取れます。AI販促物の自動作成、カスタムアクションカード、プロモーション効果分析まで対応します。
          </>
        ),
      },
    ],
  },
};
