"use client";

import { useEffect, useState } from "react";
import { listOpenSlots, bookSlot } from "../consultActions";
import type { BookingSlot } from "../../lib/supabase";

function dayLabel(iso: string): string {
  return new Date(iso).toLocaleDateString("ja-JP", {
    month: "long",
    day: "numeric",
    weekday: "short",
    timeZone: "Asia/Tokyo",
  });
}
function timeLabel(iso: string): string {
  return new Date(iso).toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tokyo",
  });
}

export function BookingModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState<BookingSlot[]>([]);
  const [selected, setSelected] = useState<BookingSlot | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    listOpenSlots().then((s) => {
      setSlots(s);
      setLoading(false);
    });
  }, []);

  // 日付ごとにグルーピング
  const grouped = slots.reduce<Record<string, BookingSlot[]>>((acc, s) => {
    const key = dayLabel(s.start_at);
    (acc[key] ||= []).push(s);
    return acc;
  }, {});

  async function submit() {
    if (!selected) return;
    setError(null);
    setSending(true);
    const res = await bookSlot({ slotId: selected.id, name, email, phone, note });
    setSending(false);
    if (!res.ok) {
      setError(res.error ?? "予約に失敗しました。");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[image:var(--red-grad)] text-2xl font-black text-white">
          ✓
        </div>
        <h4 className="text-lg font-black text-ink">ご予約ありがとうございます</h4>
        {selected && (
          <p className="mt-3 text-sm leading-relaxed text-ink/60">
            {dayLabel(selected.start_at)} {timeLabel(selected.start_at)} に
            <br />
            お電話します。確認メールをお送りしました。
          </p>
        )}
        <button
          type="button"
          onClick={onClose}
          className="mt-6 rounded-full border border-ink/15 px-6 py-2.5 font-bold text-ink/70 hover:border-brand-red hover:text-brand-red"
        >
          閉じる
        </button>
      </div>
    );
  }

  return (
    <div className="p-5">
      {!selected ? (
        <>
          <p className="mb-4 text-sm text-ink/60">
            電話相談が可能な日時です。ご希望の枠をお選びください。
          </p>
          {loading && <p className="py-8 text-center text-sm text-ink/40">読み込み中…</p>}
          {!loading && slots.length === 0 && (
            <p className="rounded-xl bg-pink-soft py-8 text-center text-sm text-ink/50">
              現在、空いている枠がありません。
              <br />
              「無料で集客診断」からお気軽にご連絡ください。
            </p>
          )}
          <div className="space-y-5">
            {Object.entries(grouped).map(([day, daySlots]) => (
              <div key={day}>
                <p className="mb-2 text-sm font-black text-ink">{day}</p>
                <div className="flex flex-wrap gap-2">
                  {daySlots.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelected(s)}
                      className="rounded-lg border border-brand-red/40 px-4 py-2 text-sm font-bold text-brand-red transition-colors hover:bg-brand-red hover:text-white"
                    >
                      {timeLabel(s.start_at)}〜
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="mb-3 text-sm font-bold text-ink/50 hover:text-brand-red"
          >
            ← 日時を選び直す
          </button>
          <div className="mb-4 rounded-xl bg-pink-soft px-4 py-3 text-sm font-black text-ink">
            {dayLabel(selected.start_at)} {timeLabel(selected.start_at)}〜（約{selected.duration_min}分）
          </div>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="お名前（必須）"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-3 py-2.5 text-sm outline-none focus:border-brand-red"
            />
            <input
              type="tel"
              placeholder="電話番号（必須）"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-3 py-2.5 text-sm outline-none focus:border-brand-red"
            />
            <input
              type="email"
              placeholder="メールアドレス（必須）"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-3 py-2.5 text-sm outline-none focus:border-brand-red"
            />
            <textarea
              placeholder="相談したいこと（任意）"
              value={note}
              rows={2}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-3 py-2.5 text-sm outline-none focus:border-brand-red"
            />
            {error && <p className="text-sm font-bold text-brand-reddark">{error}</p>}
            <button
              type="button"
              onClick={submit}
              disabled={sending}
              className="w-full rounded-lg bg-[image:var(--red-grad)] py-3 font-black text-white disabled:opacity-60"
            >
              {sending ? "送信中…" : "この日時で予約する"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
