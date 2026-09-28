# Phase 1 計測 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** どの記事・ページから資料DL・相談が生まれたかを、GA4 イベントと通知メールの両方で記録できるようにする。

**Architecture:** 純粋関数（`app/lib/attribution.ts`）でアトリビューションの判定・整形を行い、Node 標準テストで検証。クライアント側（`app/lib/analytics.ts`）が sessionStorage に流入情報を保持し、`gtag` イベントに自動付与。フォームは hidden input（`AttributionFields`）でサーバーへ渡し、通知メールに追記する。

**Tech Stack:** Next.js 15 App Router, React 19, GA4 gtag, Node 24 `node --test`（型ストリップで .ts を直接実行）

**Spec:** `docs/superpowers/specs/2026-09-28-ny33-media-renewal-design.md`（Phase 1）

## Global Constraints

- 計測は本番のみ（`window.gtag` が無ければ no-op）。計測の失敗でフォーム送信やページ表示を止めない
- storage アクセスは全て try/catch
- DB スキーマは変更しない
- イベント名: `generate_lead` / `chat_consult_submit` / `booking_submit` / `file_download` / `cta_click`
- パラメータ名: `source_page` / `landing_page` / `form_id` / `cta_id` / `file_name`

---

### Task 1: アトリビューションの純粋関数 + テスト基盤

**Files:**
- Create: `app/lib/attribution.ts`, `app/lib/attribution.test.ts`
- Modify: `package.json`（`"test": "node --test app/lib/"`）, `tsconfig.json`（`exclude` に `**/*.test.ts`）

**Interfaces — Produces:**
- `type Attribution = { landing_page: string; source_page: string; referrer: string }`
- `isArticlePath(path: string): boolean` — `/blog/x` `/news/x` `/articles/x` のみ true（一覧は false）
- `nextAttribution(prev: Attribution | null, path: string, referrer: string): Attribution` — 初回は landing と referrer を確定、以後は記事閲覧時のみ source_page を更新。source_page 未設定なら landing_page
- `readAttribution(get: (k: string) => unknown): Attribution` — FormData 等から安全に取り出す（文字列化・300文字で切る）
- `formatAttribution(a: Attribution): string` — メール追記用の複数行テキスト

- [ ] Step 1: テストを書く（上記の各振る舞い）
- [ ] Step 2: `npm test` で FAIL を確認
- [ ] Step 3: 実装
- [ ] Step 4: `npm test` で PASS
- [ ] Step 5: commit

### Task 2: クライアント計測ヘルパーと自動イベント

**Files:**
- Create: `app/lib/analytics.ts`, `app/components/AttributionFields.tsx`
- Modify: `app/components/GoogleAnalytics.tsx`

**Interfaces — Consumes:** Task 1。**Produces:**
- `track(event: string, params?: Record<string, unknown>): void`
- `recordPageView(path: string): void`
- `getAttribution(): Attribution`
- `<AttributionFields />` — hidden input 3つ（name = `landing_page` / `source_page` / `referrer`）

`GoogleAnalytics` の `PageViewTracker` で `recordPageView` を呼ぶ（本番以外でも attribution は記録するため、計測タグと分離した `AttributionTracker` をレイアウトで常時マウント）。`data-track-cta` と `.pdf` リンクのクリックを document の委譲リスナーで拾い `cta_click` / `file_download` を送る。

- [ ] 実装 → `npm run build` 成功 → commit

### Task 3: フォーム成功時のイベントとメール追記

**Files:**
- Modify: `app/contact/ContactForm.tsx`, `app/contact/actions.ts`, `app/service-lp/_components/LeadForm.tsx`, `app/service-lp/actions.ts`, `app/service-lp/_components/ConsultChat.tsx`, `app/service-lp/_components/BookingModal.tsx`, `app/service-lp/consultActions.ts`, `app/page.tsx`・`app/resource/page.tsx`（主要 CTA に `data-track-cta`）

- form 系: `<AttributionFields />` を form 内に置き、action 側で `readAttribution(k => formData.get(k))` → 通知メール末尾に `formatAttribution`
- chat / booking: payload に `attribution: getAttribution()` を追加
- 成功時 `useEffect` で1回だけ `track(...)`（`generate_lead` form_id=contact|service_lp、`chat_consult_submit`、`booking_submit`）

- [ ] 実装 → `npm run build` → 本番ビルドをローカル起動し、ブラウザで CTA クリック時に `dataLayer` へ積まれることを確認（gtag はスタブ）→ commit

### Task 4: GA4 管理画面の手順書

**Files:** Create: `docs/analytics.md`（キーイベント指定、カスタムディメンション4つ、「記事別リード」探索レポートの作り方）

- [ ] 作成 → commit
