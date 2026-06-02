// ポートフォリオ（制作実績）の共通データ。
// 現在は実例 1 社（イケベジさま）のみ。
// 新しい実例を追加するときは works 配列に追加するだけで /works と /works/[slug] が更新される。

export type WorkScope = string;

export type Work = {
  slug: string;
  client: string;
  clientHonor?: string; // "さま" / "様" 等
  industry: string;
  year: string;
  scope: WorkScope[];
  /** 一行コピー（カード・ヒーローで使用） */
  tagline: string;
  /** 1〜2文の概要（カードの説明・OG description で使用） */
  excerpt: string;
  /** 課題（公開後に実態に合わせて書き換えてください） */
  challenge: string;
  /** アプローチ（同上） */
  approach: string;
  /** 結果・成果（同上） */
  outcome: string;
  /** お客様の声（任意） */
  testimonial?: {
    quote: string;
    person: string;
    position?: string;
  };
  /** 公開サイトURL（任意） */
  externalUrl?: string;
};

export const works: Work[] = [
  {
    slug: "ikebeji",
    client: "イケベジ",
    clientHonor: "さま",
    industry: "瀬戸内 / 食・農産",
    year: "2026",
    scope: ["コーポレートサイト制作", "ブランド整備", "集客導線設計"],
    tagline: "想いを言葉に整える整備。",
    excerpt:
      "地域の食を支える事業者の「らしさ」を整理し、伝わる形のWebへ整備しました。問い合わせまでの導線も、迷わない一本道に。",
    challenge:
      "「地元の野菜を、もっと多くの食卓へ届けたい」という想いがありながら、Webやデジタルでの発信が後手に回り、店頭や知人経由の販売が中心になっていました。瀬戸内エリアの食意識の高いお客様に、ブランドとしての姿を正しく届ける入口が整っていない状態でした。",
    approach:
      "まずはイケベジさまが日々大切にされている「らしさ」をヒアリングを通じて言葉に整理。野菜の選び方、こだわりの伝え方、誰に・どう食べてもらいたいかの解像度を上げ、それが画面の隅々から伝わるコーポレートサイトとして再設計しました。問い合わせや購入までの導線も、迷わない一本道として整えています。",
    outcome:
      "公開後、「ブランドとしてのイケベジ」が初めて目に見える形になり、地元だけでなく瀬戸内全体からの認知・お問い合わせが少しずつ増え始めています。今後の更新運用にも対応した、長く育てていける土台になりました。",
    // testimonial: { quote: "...", person: "代表 ○○さま" }, // ←公開許諾があれば
    externalUrl: undefined // ←公開サイトURLが決まったら入れてください
  }
];

export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}

export function getRelatedWorks(work: Work, limit = 2): Work[] {
  return works.filter((w) => w.slug !== work.slug).slice(0, limit);
}
