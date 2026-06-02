// サービス6種の共通データ。各サービスページと一覧ページ・トップから参照される。
// すべて「会社の航海を整備する」というブランド語彙で統一。

export type ServiceProcess = {
  step: string;
  title: string;
  description: string;
};

export type Service = {
  slug: string;
  title: string;
  titleJa: string;
  tagline: string;
  lead: string;
  forWho: string[];
  whatWeDo: {
    heading: string;
    description: string;
    items: { title: string; description: string }[];
  };
  process: ServiceProcess[];
  priceNote: string;
  durationNote: string;
  nextSlug?: string;
};

export const services: Service[] = [
  {
    slug: "web-dock",
    title: "WEB DOCK",
    titleJa: "Webドック診断",
    tagline: "会社の航海の、はじめに行う点検。",
    lead: "船が安全に海へ出るためには、まずドックでの点検が欠かせません。Webドック診断は、会社のWeb・AIの「現在地」を一枚の地図のように整理する、NY33の入口サービスです。何を直すべきか・どこから始めるべきか、感覚ではなく根拠のある優先順位として、経営者の手元にお届けします。",
    forWho: [
      "ホームページはあるが、問い合わせや予約につながっていない",
      "Web・AIに不安があるが、誰に相談していいか分からない",
      "代替わりで、Web周りの状態を一度棚卸ししたい",
      "サイト制作・改修の前に、本当に必要な投資か見極めたい"
    ],
    whatWeDo: {
      heading: "見える化する7つの「現在地」",
      description: "会社の現在地は、断片では分かりません。NY33は経営・顧客・運用の視点から、7つの観点で点検し、優先順位をつけた診断レポートにまとめます。",
      items: [
        { title: "ホームページの状態", description: "デザイン・速度・スマホ対応・SEO土台の健康診断" },
        { title: "Google検索での見え方", description: "検索順位、表示回数、競合との位置関係を可視化" },
        { title: "SNS〜問い合わせの導線", description: "投稿→興味→相談までの離脱ポイントの特定" },
        { title: "予約・問い合わせのしやすさ", description: "迷わず辿り着けるか、入力の障壁はないか" },
        { title: "口コミ・評判の状態", description: "Googleマップ・SNS上の声の集約と傾向" },
        { title: "顧客データ活用の余地", description: "持っている情報を経営に活かせているか" },
        { title: "AI活用できる業務", description: "現場に組み込める具体的なAI活用領域の洗い出し" }
      ]
    },
    process: [
      { step: "01", title: "ヒアリング", description: "事業・お客様・現在の悩みをお伺いします（オンライン1〜2回）" },
      { step: "02", title: "診断・分析", description: "7観点でWeb・AIの現在地を分析（約1〜2週間）" },
      { step: "03", title: "レポート提出", description: "優先順位つきの改善提案を、対面/オンラインで解説" },
      { step: "04", title: "次の航海へ", description: "必要であれば修繕・改修・定期整備に進みます（任意）" }
    ],
    priceNote: "初回相談は無料。診断本体は事業規模に応じてお見積もり。",
    durationNote: "ヒアリングから報告書まで 約2〜3週間",
    nextSlug: "repair"
  },
  {
    slug: "repair",
    title: "REPAIR",
    titleJa: "修繕・改修",
    tagline: "見えなかった問題を、安全に直す。",
    lead: "ドック診断で見えた課題を、優先順位の高いものから順に直していく整備の仕事です。サイト全体の作り直しが必要なケースから、フォーム1つの改善まで、必要な分だけを丁寧に。「壊れていないけど、伝わっていない」状態を、伝わる状態へ整えます。",
    forWho: [
      "サイトが古く、自社の今を伝えきれていない",
      "問い合わせフォーム・予約導線がうまく機能していない",
      "スマホで見たときの体験を改善したい",
      "Googleマップや口コミからの流入を増やしたい"
    ],
    whatWeDo: {
      heading: "対応する整備領域",
      description: "見た目を整えるだけの改修ではなく、診断で見えた根拠に沿って「直すべき場所を直す」のがNY33の修繕です。",
      items: [
        { title: "サイト全体の改修・リニューアル", description: "情報設計から見直し、伝わる構造へ" },
        { title: "ランディングページ制作", description: "特定の商品・サービスに集中した訴求ページ" },
        { title: "問い合わせフォーム改修", description: "離脱しにくい・モバイルでも入力しやすい形へ" },
        { title: "予約導線整備", description: "予約システムの導入・既存ツールとの統合" },
        { title: "Googleマップ・口コミ整備", description: "MEO対応、口コミ施策の設計" },
        { title: "コンテンツ制作", description: "写真・文章・動画の素材作りから一気通貫で" }
      ]
    },
    process: [
      { step: "01", title: "Webドック診断", description: "まず現在地を整理（既に実施済みの場合はスキップ可）" },
      { step: "02", title: "改修プラン設計", description: "優先順位・予算・スケジュールを一緒に組み立て" },
      { step: "03", title: "制作・改修", description: "デザイン・実装・コンテンツ作成を進行" },
      { step: "04", title: "公開・検証", description: "公開後の数値を測り、必要なら微調整" }
    ],
    priceNote: "規模により30万円〜。診断結果に応じて段階的なご提案も可能。",
    durationNote: "小規模なフォーム改修は2〜3週間、フルリニューアルは2〜4ヶ月",
    nextSlug: "maintenance"
  },
  {
    slug: "ai-assist",
    title: "AI ASSIST",
    titleJa: "AI活用支援",
    tagline: "AIを「経営の整備士」として現場に入れる。",
    lead: "AIは魔法の杖ではなく、整備された道具です。経営者・現場・お客様の三方に効くAIの使い方を、業務に組み込める形で一緒に設計します。流行りのツールを買うのではなく、続けられる仕組みに落とし込むのがNY33のスタンスです。",
    forWho: [
      "AIに興味はあるが、何から始めればいいか分からない",
      "ChatGPTを触ってみたが、現場の仕事に活かせていない",
      "メール対応や資料作成の時間を減らしたい",
      "顧客対応の質を上げつつ、人手不足にも備えたい"
    ],
    whatWeDo: {
      heading: "経営に効くAI活用領域",
      description: "派手な事例ではなく、地方の中小企業の日々の仕事に効くAI活用を、現場と並走しながら設計します。",
      items: [
        { title: "メール・資料作成の効率化", description: "返信・見積・提案資料のテンプレ化とAI連携" },
        { title: "顧客対応の補助", description: "問い合わせの一次対応・FAQの自動化" },
        { title: "社内ナレッジの整理", description: "属人化していた情報をAIが引き出せる形に" },
        { title: "Webコンテンツ制作補助", description: "ブログ・SNS投稿の下書き・校正" },
        { title: "音声・議事録の整理", description: "会議録音から要点・タスクを自動抽出" },
        { title: "AIリテラシー研修", description: "経営者・スタッフ向けのAI研修・運用ルール作り" }
      ]
    },
    process: [
      { step: "01", title: "業務の棚卸し", description: "どこに時間を取られているか、現場の声を集めます" },
      { step: "02", title: "AI活用領域の特定", description: "効果が出やすく・続けやすい領域を選定" },
      { step: "03", title: "試験運用", description: "小さく試して効果と運用上の課題を確認" },
      { step: "04", title: "定着支援", description: "ルール化・研修・継続的な改善まで" }
    ],
    priceNote: "単発支援は10万円〜、月次伴走は15万円/月〜。",
    durationNote: "試験運用まで 約1ヶ月、定着まで含めると2〜3ヶ月",
    nextSlug: "partnership"
  },
  {
    slug: "navigation",
    title: "NAVIGATION",
    titleJa: "集客導線整備",
    tagline: "お客さんがあなたの会社にたどり着く航路を整える。",
    lead: "良い商品やサービスがあっても、たどり着いてもらえなければ航路がありません。検索・SNS・口コミ・予約 ― すべての入り口から目的地までの道のりを設計し、お客さまが自然に問い合わせ・予約へ進める動線をつくります。",
    forWho: [
      "Web集客の全体像が見えていない",
      "SNSはやっているが、来店・問い合わせに繋がらない",
      "Google検索で自社が見つけてもらえない",
      "口コミ・Googleマップを伸ばしたい"
    ],
    whatWeDo: {
      heading: "整備する集客の航路",
      description: "ばらばらに動いている入り口を、一本の航路として設計します。",
      items: [
        { title: "SEO対策", description: "検索で見つけてもらうための土台整備とコンテンツ設計" },
        { title: "AIO（生成AI最適化）", description: "ChatGPT・Geminiなど生成AIに引用される形に" },
        { title: "Googleマップ・MEO", description: "ローカル検索・口コミ・写真の継続運用" },
        { title: "SNS導線設計", description: "Instagram・LINEから問い合わせまでの流れ設計" },
        { title: "予約システム整備", description: "STORES予約・Resyなど業種に合うツール導入" },
        { title: "広告運用", description: "必要に応じてGoogle/Meta広告の少額運用支援" }
      ]
    },
    process: [
      { step: "01", title: "集客の現状把握", description: "現在の流入と離脱の地図を作成" },
      { step: "02", title: "航路設計", description: "強みと業種に合う集客チャネルを選定" },
      { step: "03", title: "実装・整備", description: "選んだチャネルを順番に整備" },
      { step: "04", title: "計測・改善", description: "数字を見ながら継続的に微調整" }
    ],
    priceNote: "単発設計は20万円〜、月次運用は10万円/月〜。",
    durationNote: "初期設計 約1ヶ月、運用は月次で継続",
    nextSlug: "maintenance"
  },
  {
    slug: "maintenance",
    title: "MAINTENANCE",
    titleJa: "定期整備",
    tagline: "船が安全に進み続けるための、月次の整備。",
    lead: "Webは作って終わりではなく、使われ続けてはじめて意味があります。月に一度のドック点検のように、アクセス・問い合わせ・予約・口コミの数字を確認し、小さな改善を続けることで、経営者が不安なく船を進められる状態を保ちます。",
    forWho: [
      "作ったWebサイトが「ただあるだけ」になっている",
      "更新を頼める相手がいなくて困っている",
      "Googleのアップデートで順位が落ちる不安がある",
      "数字を見ているけど、何をすればいいか分からない"
    ],
    whatWeDo: {
      heading: "月次の整備内容",
      description: "経営者が「Webのことは大丈夫」と思える状態を、月次のメンテナンスで維持します。",
      items: [
        { title: "月次アクセスレポート", description: "数字だけでなく『次に何をすべきか』までセットで" },
        { title: "コンテンツ更新", description: "お知らせ・ブログ・実績の追加" },
        { title: "問い合わせ・予約数の分析", description: "どこから・なぜ来ているかを言葉に" },
        { title: "改善施策の実施", description: "毎月1〜2つの小さな改善を継続" },
        { title: "サーバー・ドメインの保守", description: "セキュリティ更新・障害対応" },
        { title: "新しい変化への対応", description: "Google・AIの変化を先回りして反映" }
      ]
    },
    process: [
      { step: "01", title: "初期セットアップ", description: "計測環境・連携ツールを整備" },
      { step: "02", title: "月次レビュー", description: "Zoom1時間 × 月1回で状況確認" },
      { step: "03", title: "改善実施", description: "決まったことを翌月までに実装" },
      { step: "04", title: "四半期ごとの再診断", description: "3ヶ月に一度、全体を再点検" }
    ],
    priceNote: "月額3万円〜（規模・対応範囲に応じて）。",
    durationNote: "最低契約期間6ヶ月。以降は月単位で継続/解約可。",
    nextSlug: "partnership"
  },
  {
    slug: "partnership",
    title: "PARTNERSHIP",
    titleJa: "経営伴走",
    tagline: "整備士として、経営者の隣に立ち続ける。",
    lead: "経営の判断は、最後は経営者一人にかかっています。けれど、Web・AI・集客に関する判断を、一人で抱える必要はありません。NY33は、整備の知識と地域の事情を持ったパートナーとして、経営者の隣で判断を支える立場に立ちます。",
    forWho: [
      "Web・AIの判断を、相談しながら進めたい",
      "新しい施策の壁打ち相手がほしい",
      "他社のWeb担当者・専門家との橋渡しがほしい",
      "代替わり・新規事業など、変化のタイミングを支えてほしい"
    ],
    whatWeDo: {
      heading: "伴走としてできること",
      description: "決まった納品物を渡すのではなく、関係性そのものを提供する立場です。",
      items: [
        { title: "定例ミーティング", description: "月1〜2回、経営の現在地を一緒に確認" },
        { title: "判断のサポート", description: "新規ツール導入・採用・新規事業の壁打ち" },
        { title: "施策のレビュー", description: "進行中の取り組みへの第三者からのフィードバック" },
        { title: "専門家ネットワークの紹介", description: "必要な分野の信頼できる人を繋ぐ" },
        { title: "緊急時のWeb対応", description: "障害・トラブル時の窓口として待機" },
        { title: "経営者の話し相手", description: "Web・AIの孤独を、分かる人と話せる場として" }
      ]
    },
    process: [
      { step: "01", title: "初回ヒアリング", description: "事業・想い・現在地を深くお聞きします" },
      { step: "02", title: "契約・関係性の設計", description: "頻度・範囲・距離感をすり合わせ" },
      { step: "03", title: "継続的な並走", description: "定例と随時のやり取りで支える" },
      { step: "04", title: "節目での振り返り", description: "半年ごとに関係性そのものをアップデート" }
    ],
    priceNote: "月額10万円〜（関わり方の範囲によります）。",
    durationNote: "最低契約期間12ヶ月。長期の伴走を前提としています。",
    nextSlug: "web-dock"
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
