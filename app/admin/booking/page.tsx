import { getAdminClient, type BookingSlot, type Booking } from "../../lib/supabase";
import { isAuthed } from "../actions";
import { LoginForm } from "../_components/LoginForm";
import { AdminNav } from "../_components/AdminNav";
import { AddSlotForm } from "../_components/AddSlotForm";
import { SlotActions } from "../_components/SlotActions";
import { BookingActions } from "../_components/BookingActions";

export const dynamic = "force-dynamic";

function fmt(iso: string): string {
  return new Date(iso).toLocaleString("ja-JP", {
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tokyo",
  });
}

const SLOT_STATUS: Record<string, { label: string; cls: string }> = {
  open: { label: "公開中", cls: "bg-emerald-100 text-emerald-700" },
  booked: { label: "予約済", cls: "bg-brand-red text-white" },
  closed: { label: "非公開", cls: "bg-ink/10 text-ink/50" },
};

const BOOKING_STATUS: Record<string, { label: string; cls: string }> = {
  new: { label: "未対応", cls: "bg-brand-red text-white" },
  confirmed: { label: "確定", cls: "bg-amber-400 text-ink" },
  done: { label: "完了", cls: "bg-ink/10 text-ink/60" },
  canceled: { label: "キャンセル", cls: "bg-ink/10 text-ink/40 line-through" },
};

export default async function BookingAdminPage() {
  if (!(await isAuthed())) return <LoginForm />;

  let slots: BookingSlot[] = [];
  let bookings: Booking[] = [];
  let loadError: string | null = null;
  try {
    const supabase = getAdminClient();
    const [slotRes, bookRes] = await Promise.all([
      supabase.from("lp_booking_slots").select("*").order("start_at", { ascending: true }),
      supabase.from("lp_bookings").select("*").order("start_at", { ascending: true }),
    ]);
    if (slotRes.error) throw slotRes.error;
    if (bookRes.error) throw bookRes.error;
    slots = (slotRes.data as BookingSlot[]) ?? [];
    bookings = (bookRes.data as Booking[]) ?? [];
  } catch (e) {
    loadError = e instanceof Error ? e.message : "データの取得に失敗しました。";
  }

  const newBookings = bookings.filter((b) => b.status === "new").length;

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <AdminNav active="/admin/booking" />
      <h1 className="mb-1 text-2xl font-black text-ink">オンライン相談予約</h1>
      <p className="mb-6 text-sm text-ink/60">
        予約枠を登録すると、LPの「オンラインで相談する」に表示されます。
      </p>

      {loadError && (
        <p className="mb-6 rounded-lg bg-white p-4 text-sm font-bold text-brand-reddark shadow-sm">
          {loadError}
        </p>
      )}

      {/* 予約一覧 */}
      <section className="mb-12">
        <h2 className="mb-3 text-lg font-black text-ink">
          予約一覧
          {newBookings > 0 && (
            <span className="ml-2 rounded-full bg-brand-red px-2 py-0.5 text-xs font-bold text-white">
              未対応 {newBookings}
            </span>
          )}
        </h2>
        {bookings.length === 0 ? (
          <p className="rounded-2xl bg-white p-8 text-center text-ink/50 shadow-sm">
            まだ予約はありません。
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-ink/10 text-left text-xs text-ink/50">
                  <th className="p-4">相談日時</th>
                  <th className="p-4">お名前</th>
                  <th className="p-4">電話</th>
                  <th className="p-4">メール</th>
                  <th className="p-4">相談内容</th>
                  <th className="p-4">状態 / 操作</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => {
                  const s = BOOKING_STATUS[b.status] ?? BOOKING_STATUS.new;
                  return (
                    <tr key={b.id} className="border-b border-ink/5 align-top">
                      <td className="whitespace-nowrap p-4 font-bold text-ink">{fmt(b.start_at)}</td>
                      <td className="whitespace-nowrap p-4">{b.name}</td>
                      <td className="whitespace-nowrap p-4">
                        {b.phone ? (
                          <a href={`tel:${b.phone}`} className="text-brand-red underline">
                            {b.phone}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="p-4">
                        <a href={`mailto:${b.email}`} className="text-brand-red underline">
                          {b.email}
                        </a>
                      </td>
                      <td className="max-w-xs p-4 text-ink/70">
                        {b.note ? <span className="whitespace-pre-wrap">{b.note}</span> : <span className="text-ink/30">（なし）</span>}
                      </td>
                      <td className="p-4">
                        <div className="mb-2">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${s.cls}`}>
                            {s.label}
                          </span>
                        </div>
                        <BookingActions id={b.id} status={b.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 予約枠管理 */}
      <section>
        <h2 className="mb-3 text-lg font-black text-ink">予約枠の管理</h2>
        <div className="mb-4">
          <AddSlotForm />
        </div>
        {slots.length === 0 ? (
          <p className="rounded-2xl bg-white p-8 text-center text-ink/50 shadow-sm">
            まだ枠がありません。上のフォームから追加してください。
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-ink/10 text-left text-xs text-ink/50">
                  <th className="p-4">日時</th>
                  <th className="p-4">所要</th>
                  <th className="p-4">状態</th>
                  <th className="p-4">操作</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((sl) => {
                  const st = SLOT_STATUS[sl.status] ?? SLOT_STATUS.open;
                  return (
                    <tr key={sl.id} className="border-b border-ink/5">
                      <td className="whitespace-nowrap p-4 font-bold text-ink">{fmt(sl.start_at)}</td>
                      <td className="whitespace-nowrap p-4 text-ink/60">{sl.duration_min}分</td>
                      <td className="p-4">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${st.cls}`}>
                          {st.label}
                        </span>
                      </td>
                      <td className="p-4">
                        {sl.status === "booked" ? (
                          <span className="text-xs text-ink/40">（予約済み）</span>
                        ) : (
                          <SlotActions id={sl.id} status={sl.status} />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
