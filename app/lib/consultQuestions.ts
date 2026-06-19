// 集客相談チャットの質問テンプレ（文言はここを変えるだけで変更できます）
export type ConsultQuestion = {
  id: string;
  q: string;
  options: string[];
};

export const CONSULT_QUESTIONS: ConsultQuestion[] = [
  {
    id: "industry",
    q: "まず、業種・事業内容を教えてください。",
    options: ["サロン・美容", "宿泊・観光", "飲食", "EC・物販", "士業・教室", "その他"],
  },
  {
    id: "problem",
    q: "いま、集客で一番困っていることは？",
    options: [
      "新規のお客様が増えない",
      "リピートにつながらない",
      "何からすべきか分からない",
      "広告が成果に出ない",
      "サイトが古い／無い",
    ],
  },
  {
    id: "channel",
    q: "現在の主な集客方法はどれですか？",
    options: ["Instagram", "Googleマップ(MEO)", "紹介・口コミ", "チラシ・紙媒体", "Web広告", "特になし"],
  },
  {
    id: "site",
    q: "ホームページ・LPはありますか？",
    options: ["ある", "ない", "作りかけ・準備中"],
  },
  {
    id: "timing",
    q: "いつ頃から取り組みたいですか？",
    options: ["すぐにでも", "1〜3ヶ月以内", "まずは情報収集"],
  },
];

// 管理画面でラベル表示するための辞書
export const CONSULT_QUESTION_LABEL: Record<string, string> = Object.fromEntries(
  CONSULT_QUESTIONS.map((q) => [q.id, q.q])
);
