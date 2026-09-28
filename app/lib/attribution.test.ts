import { test } from "node:test";
import assert from "node:assert/strict";

import {
  formatAttribution,
  isArticlePath,
  nextAttribution,
  readAttribution
} from "./attribution.ts";

test("isArticlePath: 記事詳細だけを記事とみなす", () => {
  assert.equal(isArticlePath("/blog/kpi-from-action"), true);
  assert.equal(isArticlePath("/news/web-dock-launch"), true);
  assert.equal(isArticlePath("/articles/salon-meo"), true);
  assert.equal(isArticlePath("/blog"), false);
  assert.equal(isArticlePath("/articles/category/salon"), false);
  assert.equal(isArticlePath("/contact"), false);
});

test("nextAttribution: 初回はランディングと referrer を確定する", () => {
  const a = nextAttribution(null, "/service", "https://www.google.com/");
  assert.deepEqual(a, {
    landing_page: "/service",
    source_page: "/service",
    referrer: "https://www.google.com/"
  });
});

test("nextAttribution: 記事を読んだら source_page を更新、ランディングは維持", () => {
  const first = nextAttribution(null, "/", "");
  const read = nextAttribution(first, "/blog/kpi-from-action", "https://ny33.jp/");
  assert.equal(read.landing_page, "/");
  assert.equal(read.source_page, "/blog/kpi-from-action");
  assert.equal(read.referrer, "");
});

test("nextAttribution: 記事以外のページでは直前の記事を保持する", () => {
  const read = nextAttribution(null, "/blog/kpi-from-action", "");
  const contact = nextAttribution(read, "/contact", "");
  assert.equal(contact.source_page, "/blog/kpi-from-action");
});

test("readAttribution: 欠損・非文字列・長すぎる値を安全に扱う", () => {
  const data: Record<string, unknown> = {
    landing_page: "/x".repeat(400),
    source_page: null,
    referrer: 42
  };
  const a = readAttribution((k) => data[k]);
  assert.equal(a.landing_page.length, 300);
  assert.equal(a.source_page, "");
  assert.equal(a.referrer, "");
});

test("formatAttribution: メール用に空欄を（不明）で埋める", () => {
  const text = formatAttribution({
    landing_page: "/",
    source_page: "/blog/kpi-from-action",
    referrer: ""
  });
  assert.match(text, /最初のページ: \//);
  assert.match(text, /直前に読んだ記事・ページ: \/blog\/kpi-from-action/);
  assert.match(text, /流入元: （直接・不明）/);
});
