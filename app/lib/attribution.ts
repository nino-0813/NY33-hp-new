// 流入アトリビューション（どこから来て、どの記事を読んで、行動したか）。
// サーバー・クライアント両方から使う純粋関数のみを置く。

export type Attribution = {
  /** セッションで最初に開いたページ */
  landing_page: string;
  /** 行動の直前に読んでいた記事（記事を読んでいなければ landing_page） */
  source_page: string;
  /** セッション開始時の参照元 URL */
  referrer: string;
};

export const ATTRIBUTION_KEYS = ["landing_page", "source_page", "referrer"] as const;

const MAX_LENGTH = 300;

// 記事の詳細ページ（一覧・カテゴリ一覧は除く）
const ARTICLE_PATH = /^\/(blog|news|articles)\/(?!category\/)[^/]+\/?$/;

export function isArticlePath(path: string): boolean {
  return ARTICLE_PATH.test(path);
}

export function nextAttribution(
  prev: Attribution | null,
  path: string,
  referrer: string
): Attribution {
  if (!prev) {
    return { landing_page: path, source_page: path, referrer };
  }
  if (isArticlePath(path)) {
    return { ...prev, source_page: path };
  }
  return prev;
}

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_LENGTH) : "";
}

export function readAttribution(get: (key: string) => unknown): Attribution {
  return {
    landing_page: clean(get("landing_page")),
    source_page: clean(get("source_page")),
    referrer: clean(get("referrer"))
  };
}

export function formatAttribution(a: Attribution): string {
  return [
    "【流入】",
    `最初のページ: ${a.landing_page || "（不明）"}`,
    `直前に読んだ記事・ページ: ${a.source_page || "（不明）"}`,
    `流入元: ${a.referrer || "（直接・不明）"}`
  ].join("\n");
}
