# NY33 メディア化リニューアル 設計

- 日付: 2026-09-28
- ステータス: 承認済み（方針）／Phase 1 実装中

## 1. 目的

ny33.jp を「PV を稼ぐサイト」ではなく **メディア経由で契約を生む営業装置** にする。

- コンセプト: 「島の実務者が、地方の小さな店・宿・畑の"売上の仕組み"を AI で作る。その過程を全部見せる」
- KGI: 12ヶ月後にメディア経由の新規契約 年6件
- 逆算ファネル（仮）: 訪問 20,000/年 → 登録 400（2%）→ 相談 20（5%）→ 契約 6（30%）

## 2. 決定事項

| 論点 | 決定 |
|---|---|
| ブランドの寄せ方 | **B: サイト全体をメディアのコンセプトに寄せる** |
| 既存の世界観 | **ドック／航海の比喩と診断は残す。** 対象を「店・宿・畑」に、診断を業種別の「売上の仕組み診断」に作り替える |
| 登録の受け皿 | **メール登録（Supabase + Resend）→ キット送付。登録完了画面で LINE を2段目に案内** |
| 記事管理 | **MDX ファイル（`content/articles/*.mdx`）** |
| 進め方 | **段階リリース（Phase 1 → 2 → 3）** |

## 3. フェーズ

### Phase 1: 計測（本仕様で詳細化）

目的: どの記事・ページから、資料 DL・相談が生まれたかを今日から記録する。

**3.1 計測ヘルパー `app/lib/analytics.ts`（client）**

- `track(event, params)` — `window.gtag` がなければ何もしない（開発環境・ブロッカー対策）。全イベントに `source_page`（直前に読んでいた記事/ページ）と `landing_page`（セッションの最初のページ）を自動付与する。
- `recordPageView(path)` — ページ遷移ごとに呼ぶ。`sessionStorage` に `landing_page` を初回のみ、`source_page` は記事ページ（`/blog/*` `/news/*` `/articles/*`）閲覧時に更新する。
- `getAttribution()` — フォーム送信時に hidden で送るための `{ landing_page, source_page, referrer }` を返す。
- storage アクセスはすべて try/catch（プライベートモード等で例外が出ても計測以外を止めない）。

**3.2 イベント定義**

| イベント名 | 発火箇所 | GA4 キーイベント |
|---|---|---|
| `generate_lead` | `/contact` 送信成功（`form_id: contact`）、`/service-lp` フォーム送信成功（`form_id: service_lp`） | ✅ |
| `chat_consult_submit` | service-lp チャット相談送信成功 | ✅ |
| `booking_submit` | service-lp オンライン相談予約成功 | ✅ |
| `file_download` | `/resource` PDF クリック（`file_name`） | ✅（Phase 3 で `kit_download` に置き換え） |
| `cta_click` | `data-track-cta="<id>"` を付けた要素のクリック（document への委譲リスナー） | — |
| `sign_up` | Phase 3 のキット登録成功（予約名） | ✅ |
| `line_click` | Phase 3 の LINE 友だち追加ボタン（予約名） | ✅ |

**3.3 アトリビューションのメール記録**

`/contact`・service-lp フォーム・チャット・予約の NY33 宛通知メールに `流入: landing_page / 直前の記事: source_page / referrer` を追記する。DB スキーマは Phase 1 では変更しない（Phase 3 で購読者テーブルを作るときにまとめて設計する）。

**3.4 GA4 管理画面（手作業・README に手順記載）**

- 上表の ✅ をキーイベントに指定
- カスタムディメンション（イベントスコープ）: `source_page`, `landing_page`, `form_id`, `cta_id`
- 探索レポート「記事別リード」: 行=source_page、値=キーイベント数

**テスト**: `npm run build` が通ること。本番ビルドをローカル起動し、ブラウザで `window.dataLayer` にイベントが積まれることを確認する（GA4 本体への送信は本番のみ）。

### Phase 2: メディア基盤＋全体の打ち出し変更（別仕様）

- MDX 化（`content/articles/*.mdx`, frontmatter: title, excerpt, date, category, industry[], series?, tags, ogImage）
- URL: `/articles/[slug]`、`/articles/category/[jitsuroku|salon|inn|farm|ai-research|kiso]`、`/series/[slug]`、`/author/ninomiya`。`/blog/*` → `/articles/*` を 301。`/news` はお知らせとして存続
- 既存 blog 5本を MDX に移行
- トップ・メタ情報・キーワードを新コンセプトへ（ドックの比喩は維持）
- 構造化データ: Article, Person, BreadcrumbList

### Phase 3: リード獲得（別仕様）

- `/kits/[salon|inn|farm]` 業種別スターターキット、メール登録 → Resend で DL リンク送付
- Supabase `subscribers` テーブル（email, kit, source_page, landing_page, created_at）+ 管理画面一覧
- 全記事末尾と記事内に業種に応じたキット CTA（MDX コンポーネント）
- 登録完了画面で LINE 友だち追加（URL は環境変数、未設定なら非表示）
- 業種別「売上の仕組み診断」ページ

### 並行（コード外）

カテゴリ設計の確定、最初の30記事リスト、キット3種の中身、独自調査の企画。

## 4. 範囲外

- LINE Messaging API 連携、MA（ステップメール）ツール導入
- 外部ライター向け CMS
