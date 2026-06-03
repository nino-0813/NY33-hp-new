// 「整備の型」= NY33が提供する仕事のタイプ別ショーケース。
// /works が「実クライアント案件」、/approach が「整備の型」という位置づけ。
// 各ページはそれぞれの型について「誰のため・何を解く・何が含まれる・どんな流れ・いくら」を
// しっかり納得できる粒度で書く。

export type ApproachIncludedItem = {
  title: string;
  description: string;
};

export type ApproachProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type ApproachRelatedService = {
  slug: string;
  label: string;
};

export type Approach = {
  slug: string;
  number: string;
  title: string;
  titleJa: string;
  category: string;
  tagline: string;
  excerpt: string;
  forWho: string[];
  problem: string;
  whatWeBuild: {
    heading: string;
    description: string;
    items: ApproachIncludedItem[];
  };
  process: ApproachProcessStep[];
  pricing: {
    initial?: string;
    monthly?: string;
    durationNote: string;
    note?: string;
  };
  metrics: string[];
  relatedServices: ApproachRelatedService[];
};

export const approaches: Approach[] = [
  {
    slug: "company-renewal",
    number: "01",
    title: "Company Renewal",
    titleJa: "信頼が伝わるコーポレート整備",
    category: "サイト改修",
    tagline: "会社の今と、Webの今を、合わせる整備。",
    excerpt:
      "5年以上前のサイトを「会社の今」に合わせて整え直す、コーポレートサイトの本格的な刷新。情報設計から運用ルールまでまとめて整備します。",
    forWho: [
      "5年以上前のサイトのままで、会社の今と乖離している",
      "代替わり・新規事業など、メッセージを再整理したいタイミング",
      "取引先や採用候補者に、信頼ある会社の顔を見せたい",
      "古い情報やリンク切れが残ったまま、運用が止まっている"
    ],
    problem:
      "コーポレートサイトは、会社の名刺です。けれど放置すると、古い情報が信頼を損ねる原因にもなります。「うちの会社は今、何をしている会社なのか」「どんな価値観を持っているのか」「どんなお客様と仕事をしているのか」 ─ 訪れた人に、正しく伝わっていますか。",
    whatWeBuild: {
      heading: "整備に含まれるもの",
      description:
        "デザインを新しくするだけではなく、情報の骨格と運用の仕組みからまとめて整えるのが Company Renewal です。",
      items: [
        { title: "情報設計（IA）の再構築", description: "何をどう見せるかを構造から見直し、迷わない動線へ" },
        { title: "ブランドメッセージの整理", description: "経営者の言葉で『らしさ』を言語化し、サイト全体に通します" },
        { title: "デザイン刷新", description: "業界・時代・取引先の層に合った見え方へアップデート" },
        { title: "CMS再構築", description: "自社で更新できる仕組み（WordPress / microCMS など）を整備" },
        { title: "SEO・AIO土台整備", description: "検索エンジンと生成AIに引用される構造化を実装" },
        { title: "運用ルール作成", description: "公開後に手が止まらないよう、更新ルールと体制を一緒に設計" }
      ]
    },
    process: [
      { step: "01", title: "現状監査", description: "現サイト・流入・コンテンツの棚卸しを行います" },
      { step: "02", title: "要件整理", description: "経営方針と顧客理解から、新サイトのゴールを決めます" },
      { step: "03", title: "設計・デザイン", description: "情報設計、ワイヤー、ビジュアルを順番に組み立て" },
      { step: "04", title: "制作・実装", description: "各ページ制作、CMS構築、SEO実装、表示速度の最適化" },
      { step: "05", title: "公開・運用", description: "公開後の動作確認、運用引き継ぎ、必要に応じ月次伴走" }
    ],
    pricing: {
      initial: "¥800,000〜（ページ数・要件により変動）",
      monthly: "月次運用 ¥30,000〜（任意）",
      durationNote: "全体期間 2〜4ヶ月",
      note: "まずは Webドック診断で現在地を整理してからのご提案も可能です。"
    },
    metrics: [
      "ブランディング統一による問い合わせ『質』の向上",
      "滞在時間・ページ閲覧数の改善",
      "採用エントリー数の増加",
      "取引先から「サイト見ました」と言われる回数の増加"
    ],
    relatedServices: [
      { slug: "web-dock", label: "Webドック診断" },
      { slug: "repair", label: "修繕・改修" },
      { slug: "maintenance", label: "定期整備" }
    ]
  },
  {
    slug: "booking-flow",
    number: "02",
    title: "Booking Flow",
    titleJa: "予約・問い合わせまでの導線整備",
    category: "予約導線",
    tagline: "「来てくれているのに、申し込まれない」を、解く整備。",
    excerpt:
      "サイトには訪問があるのに、予約・問い合わせにつながっていない。離脱ポイントを特定し、迷わない一本の導線に整え直します。",
    forWho: [
      "アクセスはあるが、予約・問い合わせの件数が伸び悩んでいる",
      "フォームの離脱率が高い感覚がある",
      "電話・LINE・予約システムなど、入口がバラバラに散らかっている",
      "予約サイト（STORES予約 / RESERVA / 公式LINE）を導入したいが選び方が分からない"
    ],
    problem:
      "良いサイトでも、最後の一押しの導線が整っていなければ予約・問い合わせには至りません。「どこをクリックすれば予約できるのか」「フォームの入力項目が多すぎないか」「スマホでも快適か」 ─ 些細に見えるボトルネックの積み重ねが、機会損失を生んでいます。",
    whatWeBuild: {
      heading: "整備に含まれるもの",
      description:
        "「サイトを見た人が、迷わず予約・問い合わせに到達する」状態をつくることだけにフォーカスした整備です。",
      items: [
        { title: "離脱ポイントの特定", description: "Google Analytics・ヒートマップで、どこで離れているかを可視化" },
        { title: "フォーム改善", description: "入力項目の削減、スマホでの入力体験、エラーメッセージの最適化" },
        { title: "予約システム導入", description: "業種に合うサービス（STORES予約 / RESERVA / 公式LINE 等）の選定と設定" },
        { title: "CTA設計", description: "「予約する」「問い合わせる」ボタンの配置・色・文言を、根拠を持って整備" },
        { title: "Googleマップ・電話連携", description: "ローカルで来店してほしい業種は、地図と電話導線を強化" },
        { title: "自動返信メール整備", description: "予約後の安心感をつくる自動返信文を、ブランド口調で整える" }
      ]
    },
    process: [
      { step: "01", title: "現状解析", description: "現サイトの流入・離脱・CV経路を数値で把握" },
      { step: "02", title: "ボトルネック特定", description: "どこで離れているのか、なぜ離れるのかを言語化" },
      { step: "03", title: "改善設計", description: "優先度の高い改善から、効果を見込める順に並べる" },
      { step: "04", title: "実装", description: "フォーム改修・予約システム導入・導線変更を実施" },
      { step: "05", title: "計測・微調整", description: "公開後の数字を見て、追加の微調整" }
    ],
    pricing: {
      initial: "¥300,000〜（規模・要件により変動）",
      durationNote: "1〜2ヶ月で初期改善、数字改善は3〜6ヶ月で見えてきます",
      note: "予約システムの月額料金（数千円〜）は別途発生します。"
    },
    metrics: [
      "フォーム離脱率の改善（例: 60% → 30%）",
      "予約件数の増加（業種により2〜3倍の事例あり）",
      "電話問い合わせの減少と、Web経由の増加（業務効率化）",
      "受付対応に取られる時間の削減"
    ],
    relatedServices: [
      { slug: "repair", label: "修繕・改修" },
      { slug: "navigation", label: "集客導線整備" },
      { slug: "maintenance", label: "定期整備" }
    ]
  },
  {
    slug: "local-store",
    number: "03",
    title: "Local Store",
    titleJa: "地域で見つけてもらう店舗ページ",
    category: "店舗サイト",
    tagline: "「近くで○○」と検索する人に、まず選ばれる整備。",
    excerpt:
      "店舗の魅力を1ページに凝縮し、Googleマップ・口コミ・SNSと連動させて『瀬戸内の地域検索で見つかる』状態を整えます。",
    forWho: [
      "飲食店・美容室・サロン・小売・宿泊などの店舗事業者",
      "「地域名 + 業種」の検索で上位に出てきていない",
      "口コミやGoogleマップの運用が手付かず",
      "古いブログ型のサイトのままで、店舗の今が伝わっていない"
    ],
    problem:
      "店舗ビジネスでは、地域検索で見つかること（MEO）と、見つかった先で『行ってみたい』と思ってもらえることの両方が必要です。立派なコーポレートサイトではなく、店舗の人柄・空気感・メニューがダイレクトに届く店舗特化のページが効きます。",
    whatWeBuild: {
      heading: "整備に含まれるもの",
      description:
        "「地域検索で見つかる」「見つかった先で予約・来店に至る」両方を一気通貫で整えます。",
      items: [
        { title: "店舗特化のシングルページ", description: "1ページで魅力・メニュー・予約まで完結する設計" },
        { title: "MEO（Googleビジネスプロフィール）整備", description: "店舗情報・写真・営業時間・カテゴリの最適化" },
        { title: "写真ディレクション", description: "プロカメラマンとの連携、または撮影アドバイス" },
        { title: "口コミ運用設計", description: "口コミを増やす導線、返信のテンプレートまで整備" },
        { title: "SNS連携", description: "Instagram・LINE 公式アカウントの活用と動線設計" },
        { title: "予約・電話・地図導線", description: "スマホで迷わず予約・来店できる仕組み" }
      ]
    },
    process: [
      { step: "01", title: "店舗ヒアリング", description: "現場で大切にしていること・顧客層・課題をお伺い" },
      { step: "02", title: "ターゲット整理", description: "誰に来てほしいかを言語化し、訴求を決めます" },
      { step: "03", title: "サイト設計", description: "1ページで完結する構成・MEO設計・口コミ動線" },
      { step: "04", title: "撮影・制作", description: "必要に応じカメラマン手配、テキスト整え、コーディング" },
      { step: "05", title: "公開・MEO継続", description: "公開後はGoogleビジネスプロフィールの運用も継続支援" }
    ],
    pricing: {
      initial: "¥400,000〜（撮影費別途）",
      monthly: "MEO運用 ¥30,000〜",
      durationNote: "1〜2ヶ月で公開",
      note: "撮影が不要な場合は初期費用を圧縮できます。"
    },
    metrics: [
      "Googleマップでの表示回数・経路検索回数の増加",
      "「地域名 + 業種」検索順位の改善",
      "口コミ数・★平均評価の向上",
      "ネット予約比率の向上"
    ],
    relatedServices: [
      { slug: "navigation", label: "集客導線整備" },
      { slug: "maintenance", label: "定期整備" },
      { slug: "web-dock", label: "Webドック診断" }
    ]
  },
  {
    slug: "ai-workflow",
    number: "04",
    title: "AI Workflow",
    titleJa: "現場で効くAIの導入設計",
    category: "AI活用",
    tagline: "派手な事例ではなく、日々の仕事に効く整備。",
    excerpt:
      "AIを「触る」段階から「現場の仕事に組み込む」段階へ。経営者と現場が一緒に試して、続けられるかたちに落とし込みます。",
    forWho: [
      "AIに興味はあるが、何から始めればいいか分からない",
      "ChatGPTを試したが、業務に活かしきれていない",
      "メール対応・資料作成の時間を減らしたい",
      "属人化している社内ノウハウを整理したい"
    ],
    problem:
      "AIは『すごい技術』として語られがちですが、現場で続かなければ意味がありません。「流行のツールを契約する」のがゴールではなく、「日々の仕事に組み込まれて続いている」状態をつくることが、本当の整備です。",
    whatWeBuild: {
      heading: "整備に含まれるもの",
      description:
        "現場の仕事に組み込めるAI活用を、ツール選定から定着まで伴走します。",
      items: [
        { title: "業務の棚卸し", description: "どこに時間を取られているか、何を自動化できるかを整理" },
        { title: "AI適用領域の選定", description: "効果が出やすく続けやすい領域から優先順位をつける" },
        { title: "ツール選定", description: "ChatGPT / Gemini / Claude / Notion AI など、業務に合うツールを選ぶ" },
        { title: "プロンプト・テンプレ整備", description: "現場が再現できるよう、使いまわせる型をつくる" },
        { title: "運用ルール作成", description: "個人情報・機密の扱い、最終チェック体制まで設計" },
        { title: "社内研修", description: "経営者・スタッフ向けに、実務で使う形でレクチャー" }
      ]
    },
    process: [
      { step: "01", title: "業務分析", description: "現場の声を集め、時間がかかっている業務を特定" },
      { step: "02", title: "AI適用領域選定", description: "効果と継続のしやすさで領域を選ぶ" },
      { step: "03", title: "試験運用", description: "小さく試して効果と課題を確認" },
      { step: "04", title: "定着支援", description: "ルール化・研修・継続的な改善まで伴走" }
    ],
    pricing: {
      initial: "単発支援 ¥200,000〜",
      monthly: "月次伴走 ¥150,000/月〜",
      durationNote: "試験運用まで約1ヶ月、定着まで2〜3ヶ月",
      note: "ツール利用料（数千円〜）は別途発生します。"
    },
    metrics: [
      "メール対応・資料作成時間の削減（例: 月20時間）",
      "顧客対応の質の向上（一次対応のスピード）",
      "属人化していた業務のマニュアル化",
      "新人教育コストの削減"
    ],
    relatedServices: [
      { slug: "ai-assist", label: "AI活用支援" },
      { slug: "partnership", label: "経営伴走" },
      { slug: "web-dock", label: "Webドック診断" }
    ]
  },
  {
    slug: "brand-voice",
    number: "05",
    title: "Brand Voice",
    titleJa: "想いを言葉に整える整備",
    category: "ブランディング",
    tagline: "「うちらしさ」が、自分でも語れるようになる整備。",
    excerpt:
      "経営者の中にある想い・価値観・大切にしてきたことを引き出し、社内外で使える「自分たちの言葉」として整理します。",
    forWho: [
      "SNSやサイトで何を発信していいか分からない",
      "競合と違うのは分かっているが、それを言葉にできない",
      "代替わり・社名変更などで、ブランドを再整理したい",
      "採用面接で、自社の魅力をうまく伝えられていない"
    ],
    problem:
      "良い商品・良いサービス・良いチームがあっても、「自分たちが何者か」が言葉になっていないと、伝わるべき人に伝わりません。ブランディングとは派手なロゴを作ることではなく、自社の中にすでにあるものを、自分たちが日常的に語れる言葉として整える仕事です。",
    whatWeBuild: {
      heading: "整備に含まれるもの",
      description:
        "経営者の中にある言葉を引き出し、それが社内外で自然に流通する状態をつくります。",
      items: [
        { title: "経営者深掘りインタビュー", description: "過去・原体験・大切にしている価値観をじっくり引き出す" },
        { title: "顧客理解", description: "誰に・なぜ選ばれているのか、お客様の言葉を集める" },
        { title: "コアメッセージ整理", description: "ブランドの核を1〜2文で言える状態に" },
        { title: "トーン&マナーガイド", description: "「こう言う」「こう言わない」の判断軸を文書化" },
        { title: "サイト・SNSへの反映", description: "整理した言葉を、実際のWeb媒体に流し込む" },
        { title: "社内浸透のサポート", description: "スタッフが同じ言葉で語れる状態を一緒につくる" }
      ]
    },
    process: [
      { step: "01", title: "経営者深掘り", description: "2〜3回のインタビューで、想いを引き出す" },
      { step: "02", title: "顧客理解", description: "既存のお客様の声を集め、選ばれている理由を可視化" },
      { step: "03", title: "言葉化", description: "コアメッセージ・トーン・キーワードを整理" },
      { step: "04", title: "ガイド作成", description: "社内・外注先で共有できる形に文書化" },
      { step: "05", title: "Web・SNS整備", description: "整えた言葉を、実際の発信媒体に反映" }
    ],
    pricing: {
      initial: "¥500,000〜（規模・媒体数により変動）",
      durationNote: "2〜3ヶ月",
      note: "コーポレートサイト改修と組み合わせるとお得になります。"
    },
    metrics: [
      "経営者・スタッフが同じ言葉で会社を語れるようになる",
      "発信内容の一貫性向上、エンゲージメントの改善",
      "採用面接での自社説明がスムーズに",
      "「ブレない発信ですね」とお客様から言われるように"
    ],
    relatedServices: [
      { slug: "partnership", label: "経営伴走" },
      { slug: "navigation", label: "集客導線整備" },
      { slug: "web-dock", label: "Webドック診断" }
    ]
  },
  {
    slug: "seo-dock",
    number: "06",
    title: "SEO Dock",
    titleJa: "検索とAIに見つけられる土台",
    category: "SEO / AIO",
    tagline: "Google にも生成AI にも、引用される会社になる整備。",
    excerpt:
      "従来のSEOに加えて、ChatGPT・Gemini など生成AIに引用される構造化（AIO）を含む、検索流入の土台を整えます。",
    forWho: [
      "Google検索で自社が見つかっていない",
      "競合に検索順位で押されている",
      "ブログを書いているが、検索流入が増えない",
      "ChatGPT などに会社名を聞いても、何も答えてくれない"
    ],
    problem:
      "検索の世界はこの数年で大きく変わりました。従来のSEO対策に加えて、生成AIに引用される状態（AIO）を整えないと、これからの『検索行動』に置いていかれます。技術と継続の両方が必要で、片手間では成果が出にくい領域です。",
    whatWeBuild: {
      heading: "整備に含まれるもの",
      description:
        "検索エンジンと生成AIの両方に届くように、技術・コンテンツ・運用の三方向から整備します。",
      items: [
        { title: "技術SEO", description: "サイト速度・構造化データ・モバイル対応・内部リンクの最適化" },
        { title: "AIO（生成AI最適化）", description: "ChatGPT・Geminiが引用しやすい記述構造、E-E-A-T強化" },
        { title: "キーワード設計", description: "検索意図から逆算した、勝ち筋のキーワードマップ" },
        { title: "コンテンツSEO", description: "ブログ・記事の執筆方針、必要に応じてライターアサイン" },
        { title: "内部リンク設計", description: "サイト内の評価を集中させる設計" },
        { title: "月次レポート", description: "Search Console・Google Analyticsを毎月レビュー" }
      ]
    },
    process: [
      { step: "01", title: "現状診断", description: "順位・流入・競合の現在地を可視化" },
      { step: "02", title: "キーワード設計", description: "ビジネスゴールに直結するキーワードを選定" },
      { step: "03", title: "コンテンツ計画", description: "3〜6ヶ月分の記事計画を一緒につくる" },
      { step: "04", title: "実装", description: "技術SEO + AIO実装、必要に応じ初期記事を制作" },
      { step: "05", title: "月次運用", description: "数字を見ながら継続的に改善" }
    ],
    pricing: {
      initial: "¥400,000〜（規模により変動）",
      monthly: "月次運用 ¥80,000/月〜",
      durationNote: "初期1〜2ヶ月、効果は6ヶ月〜が目安",
      note: "SEOは継続が前提のため、最低6ヶ月の伴走をおすすめしています。"
    },
    metrics: [
      "オーガニック検索からの流入が6〜12ヶ月で倍増",
      "重要キーワードの検索順位向上",
      "ChatGPT・Geminiが会社・サービスを正しく説明できる状態",
      "問い合わせの質の改善（検索意図と合致した訪問者が増える）"
    ],
    relatedServices: [
      { slug: "navigation", label: "集客導線整備" },
      { slug: "maintenance", label: "定期整備" },
      { slug: "web-dock", label: "Webドック診断" }
    ]
  }
];

export function getApproachBySlug(slug: string): Approach | undefined {
  return approaches.find((a) => a.slug === slug);
}
