"use client";

import { useActionState } from "react";
import { addSlot } from "../actions";

export function AddSlotForm() {
  const [state, action, pending] = useActionState(addSlot, {});

  return (
    <form
      action={action}
      className="flex flex-wrap items-end gap-3 rounded-2xl bg-white p-5 shadow-sm"
    >
      <div>
        <label className="mb-1 block text-xs font-bold text-ink/60">日時（JST）</label>
        <input
          type="datetime-local"
          name="start"
          required
          className="rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-brand-red"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-bold text-ink/60">所要(分)</label>
        <input
          type="number"
          name="duration"
          defaultValue={30}
          min={10}
          step={5}
          className="w-24 rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-brand-red"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-[image:var(--red-grad)] px-5 py-2 text-sm font-black text-white disabled:opacity-60"
      >
        {pending ? "追加中…" : "枠を追加"}
      </button>
      {state.error && (
        <p className="w-full text-sm font-bold text-brand-reddark">{state.error}</p>
      )}
    </form>
  );
}
