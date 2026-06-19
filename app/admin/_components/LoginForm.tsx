"use client";

import { useActionState } from "react";
import { login } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, {});

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <form
        action={action}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm"
      >
        <h1 className="text-xl font-black text-ink">NY33 管理画面</h1>
        <p className="mt-2 text-sm text-ink/60">パスワードを入力してください。</p>
        <input
          type="password"
          name="password"
          required
          autoFocus
          placeholder="パスワード"
          className="mt-6 w-full rounded-lg border border-ink/15 px-3 py-3 text-sm outline-none focus:border-brand-red"
        />
        {state.error && (
          <p className="mt-3 text-sm font-bold text-brand-reddark">{state.error}</p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="mt-5 w-full rounded-lg bg-[image:var(--red-grad)] py-3 font-black text-white disabled:opacity-60"
        >
          {pending ? "確認中…" : "ログイン"}
        </button>
      </form>
    </div>
  );
}
