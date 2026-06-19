"use client";

import { useTransition } from "react";
import { updateChatStatus, deleteChat } from "../actions";

const STATUSES = [
  { value: "new", label: "新規" },
  { value: "contacted", label: "対応中" },
  { value: "done", label: "完了" },
];

export function ChatActions({ id, status }: { id: string; status: string }) {
  const [pending, start] = useTransition();
  return (
    <div className="flex items-center gap-2">
      <select
        defaultValue={status}
        disabled={pending}
        onChange={(e) => start(() => updateChatStatus(id, e.target.value))}
        className="rounded-md border border-ink/15 bg-white px-2 py-1 text-xs"
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (confirm("この相談を削除しますか？")) start(() => deleteChat(id));
        }}
        className="rounded-md border border-ink/15 px-2 py-1 text-xs text-ink/60 hover:border-brand-red hover:text-brand-red disabled:opacity-50"
      >
        削除
      </button>
    </div>
  );
}
