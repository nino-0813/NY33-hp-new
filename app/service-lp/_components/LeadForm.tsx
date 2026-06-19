"use client";

import { useActionState } from "react";
import { submitLead, type LeadFormState } from "../actions";

const initial: LeadFormState = { ok: false };

export function LeadForm() {
  const [state, formAction, pending] = useActionState(submitLead, initial);

  if (state.ok) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-2xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[image:var(--red-grad)] text-2xl font-black text-white">
          ✓
        </div>
        <h2 className="text-xl font-black text-ink">送信ありがとうございます</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink/60">
          内容を確認のうえ、担当よりご連絡します。
          <br />
          少々お待ちください。
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-2xl md:p-7">
      <span className="mb-4 inline-block rounded-md bg-[image:var(--red-grad)] px-3 py-1 text-xs font-bold text-white">
        相談無料・しつこい営業なし
      </span>
      <h2 className="text-2xl font-black leading-snug text-ink">
        いまの集客の
        <br />
        伸びしろを<span className="text-brand-red">無料診断</span>。
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-ink/60">
        かんたんな入力だけで、現状の集客のどこに改善余地があるかを整理します。後日オンラインでご提案します。
      </p>

      <form action={formAction} className="mt-6 space-y-4">
        {/* honeypot（人間には見えない） */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div>
          <label className="mb-1 flex items-center gap-2 text-xs font-bold text-ink">
            お名前
            <span className="rounded bg-brand-red px-1.5 py-0.5 text-[10px] text-white">必須</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="例）山田 太郎"
            className="w-full rounded-lg border border-ink/15 px-3 py-3 text-sm outline-none focus:border-brand-red"
          />
        </div>
        <div>
          <label className="mb-1 flex items-center gap-2 text-xs font-bold text-ink">
            メールアドレス
            <span className="rounded bg-brand-red px-1.5 py-0.5 text-[10px] text-white">必須</span>
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="例）mail@example.com"
            className="w-full rounded-lg border border-ink/15 px-3 py-3 text-sm outline-none focus:border-brand-red"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold text-ink">
            ご相談内容（任意）
          </label>
          <textarea
            name="message"
            rows={3}
            placeholder="例）サロンの新規集客を相談したい"
            className="w-full rounded-lg border border-ink/15 px-3 py-3 text-sm outline-none focus:border-brand-red"
          />
        </div>

        {state.error && (
          <p className="rounded-lg bg-pink-soft px-3 py-2 text-sm font-bold text-brand-reddark">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-[image:var(--red-grad)] py-4 font-black text-white shadow-md transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "送信中…" : "無料で集客診断を受ける"}
        </button>
        <p className="text-center text-[11px] text-ink/40">
          送信によりプライバシーポリシーに同意したものとします
        </p>
      </form>
    </div>
  );
}
