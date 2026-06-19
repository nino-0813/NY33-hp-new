"use client";

import { useTransition } from "react";
import { deleteSlot, setSlotStatus } from "../actions";

export function SlotActions({ id, status }: { id: string; status: string }) {
  const [pending, start] = useTransition();
  return (
    <div className="flex items-center gap-2">
      {status === "open" && (
        <button
          type="button"
          disabled={pending}
          onClick={() => start(() => setSlotStatus(id, "closed"))}
          className="rounded-md border border-ink/15 px-2 py-1 text-xs text-ink/60 hover:border-brand-red hover:text-brand-red disabled:opacity-50"
        >
          非公開
        </button>
      )}
      {status === "closed" && (
        <button
          type="button"
          disabled={pending}
          onClick={() => start(() => setSlotStatus(id, "open"))}
          className="rounded-md border border-ink/15 px-2 py-1 text-xs text-ink/60 hover:border-brand-red hover:text-brand-red disabled:opacity-50"
        >
          公開
        </button>
      )}
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (confirm("この枠を削除しますか？")) start(() => deleteSlot(id));
        }}
        className="rounded-md border border-ink/15 px-2 py-1 text-xs text-ink/60 hover:border-brand-red hover:text-brand-red disabled:opacity-50"
      >
        削除
      </button>
    </div>
  );
}
