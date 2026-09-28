# 計測（GA4）の設定と見方

プロパティ: `G-JMR6XDWCXE`。コードは `app/components/GoogleAnalytics.tsx` と `app/lib/analytics.ts`。

## サイトが送るイベント

| イベント | いつ | 主なパラメータ | キーイベント |
|---|---|---|---|
| `generate_lead` | お問い合わせ（/contact）・LP フォームの送信成功 | `form_id`（contact / service_lp） | ✅ |
| `chat_consult_submit` | LP の相談チャット送信成功 | `form_id` | ✅ |
| `booking_submit` | LP のオンライン相談予約成功 | `form_id` | ✅ |
| `file_download` | PDF リンクのクリック | `file_name` | ✅ |
| `cta_click` | `data-track-cta` を付けたボタン・リンクのクリック | `cta_id` | — |

全イベントに `source_page`（行動の直前に読んでいた記事）と `landing_page`（セッション最初のページ）が付きます。問い合わせ・相談・予約の通知メールの末尾にも同じ情報が「【流入】」として載ります。

新しいボタンを計測したいときは、要素に `data-track-cta="わかる名前"` を付けるだけです。

## GA4 管理画面でやること（初回のみ・約10分）

1. **キーイベントの指定**: 管理 → データの表示 → イベント。上表の ✅ のイベントが一覧に出たら（初回送信から最大24時間）、「キーイベントとしてマーク」をオンにする。
2. **カスタムディメンション**: 管理 → データの表示 → カスタム定義 → 「カスタムディメンションを作成」を4回。範囲はすべて「イベント」。
   - `source_page`（表示名: 直前の記事）
   - `landing_page`（表示名: ランディングページ）
   - `form_id`（表示名: フォーム）
   - `cta_id`（表示名: CTA）
3. **探索レポート「記事別リード」**: 探索 → 空白。
   - ディメンション: 直前の記事、イベント名
   - 指標: キーイベント、イベント数
   - 行: 直前の記事 ／ 列: イベント名 ／ 値: イベント数
   - フィルタ: イベント名 が `generate_lead|chat_consult_submit|booking_submit|file_download` に一致（正規表現）

## 月次で見る数字（KPI ツリーとの対応）

- 転換 KPI: 上記レポートのキーイベント数を記事別に。相談（generate_lead + chat + booking）/ セッション
- 集客 KPI: レポート → 集客 → トラフィック獲得（オーガニック検索のセッション）
- Phase 3 以降: `sign_up`（キット登録）・`line_click` を追加予定
