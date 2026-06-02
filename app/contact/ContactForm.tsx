"use client";

import Link from "next/link";
import { useActionState } from "react";

import { submitContactForm, type ContactFormState } from "./actions";

const intents = [
  { value: "web-dock", label: "Webドック診断（無料）" },
  { value: "repair", label: "修繕・改修" },
  { value: "ai-assist", label: "AI活用支援" },
  { value: "navigation", label: "集客導線整備" },
  { value: "maintenance", label: "定期整備" },
  { value: "partnership", label: "経営伴走" },
  { value: "other", label: "その他・まだ言葉になっていない" }
];

const initialState: ContactFormState = { ok: false };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  if (state.ok) {
    return (
      <div className="contact-success" role="status" aria-live="polite">
        <p className="contact-success-en">RECEIVED</p>
        <h2>ご相談を受け取りました。</h2>
        <p className="contact-success-text">
          2〜3営業日以内に、二宮よりご返信いたします。
          <br />
          自動返信メールもお送りしましたので、迷惑メールフォルダもご確認ください。
        </p>
        <p className="contact-success-text contact-success-text--sub">
          お急ぎの場合は <a href="mailto:llc33.company@gmail.com">llc33.company@gmail.com</a> まで
          直接ご連絡ください。
        </p>
        <div className="contact-success-actions">
          <Link className="link-btn" href="/">
            <span>HOME へ戻る</span>
          </Link>
          <Link className="link-btn-arrow" href="/blog">
            <span className="text-wrap">
              <span className="text">READ BLOG</span>
              <span className="text mask">READ BLOG</span>
            </span>
            <span className="circle" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="contact-form" noValidate>
      {/* honeypot — 人間からは見えないbot罠 */}
      <div className="contact-honeypot" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.errors?.general && (
        <p className="contact-alert" role="alert">
          {state.errors.general}
        </p>
      )}

      <div className="contact-grid">
        {/* 氏名 */}
        <div className="contact-field">
          <label htmlFor="name">
            お名前 <span className="contact-req">必須</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="例：二宮 佑介"
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={state.errors?.name ? "err-name" : undefined}
          />
          {state.errors?.name && (
            <p id="err-name" className="contact-error">
              {state.errors.name}
            </p>
          )}
        </div>

        {/* メール */}
        <div className="contact-field">
          <label htmlFor="email">
            メールアドレス <span className="contact-req">必須</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="例：you@example.com"
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={state.errors?.email ? "err-email" : undefined}
          />
          {state.errors?.email && (
            <p id="err-email" className="contact-error">
              {state.errors.email}
            </p>
          )}
        </div>

        {/* 会社名 */}
        <div className="contact-field contact-field--full">
          <label htmlFor="company">
            会社名 <span className="contact-optional">任意</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="例：合同会社NY33"
          />
        </div>
      </div>

      {/* 相談したいこと */}
      <fieldset className="contact-fieldset">
        <legend>
          相談したいこと <span className="contact-optional">任意・複数選択可</span>
        </legend>
        <p className="contact-fieldset-hint">
          相談内容が固まっていなくても大丈夫です。気になるものをチェックしてください。
        </p>
        <ul className="contact-intent-list">
          {intents.map((intent) => (
            <li key={intent.value}>
              <label className="contact-intent">
                <input type="checkbox" name="intent" value={intent.value} />
                <span>{intent.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      {/* 詳細 */}
      <div className="contact-field contact-field--full">
        <label htmlFor="message">
          詳細・現在地 <span className="contact-optional">任意</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="例：ホームページからお問い合わせがほとんど来ません。Google検索でも見つからない気がしています。何から手をつければいいでしょうか…"
        />
        <p className="contact-field-hint">
          まとまっていなくて大丈夫です。今困っていること、知りたいことを、そのまま書いてください。
        </p>
      </div>

      {/* プライバシー同意 */}
      <div className="contact-consent">
        <label className="contact-consent-label">
          <input
            type="checkbox"
            name="consent"
            value="yes"
            aria-invalid={Boolean(state.errors?.consent)}
          />
          <span>
            <Link href="/privacy">プライバシーポリシー</Link>に同意します
            <span className="contact-req">必須</span>
          </span>
        </label>
        {state.errors?.consent && (
          <p className="contact-error">{state.errors.consent}</p>
        )}
      </div>

      {/* 送信ボタン */}
      <div className="contact-submit">
        <button type="submit" className="link-btn contact-submit-btn" disabled={pending}>
          <span>{pending ? "送信中…" : "SEND →"}</span>
        </button>
        <p className="contact-submit-note">
          営業電話・売り込みのご連絡はいたしません。
        </p>
      </div>
    </form>
  );
}
