"use server";

import { cookies } from "next/headers";
import { createHash } from "crypto";
import { revalidatePath } from "next/cache";
import { getAdminClient } from "../lib/supabase";

const COOKIE = "ny33_admin";

function token(): string {
  const pw = process.env.ADMIN_PASSWORD || "";
  return createHash("sha256").update(`ny33-admin:${pw}`).digest("hex");
}

export async function isAuthed(): Promise<boolean> {
  if (!process.env.ADMIN_PASSWORD) return false;
  const c = await cookies();
  return c.get(COOKIE)?.value === token();
}

export async function login(
  _prev: { error?: string },
  formData: FormData
): Promise<{ error?: string }> {
  const password = String(formData.get("password") || "");
  if (!process.env.ADMIN_PASSWORD) {
    return { error: "ADMIN_PASSWORD が未設定です（環境変数を設定してください）。" };
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "パスワードが違います。" };
  }
  const c = await cookies();
  c.set(COOKIE, token(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 7, // 7日
  });
  revalidatePath("/admin");
  return {};
}

export async function logout() {
  const c = await cookies();
  c.delete(COOKIE);
  revalidatePath("/admin");
}

export async function updateStatus(id: string, status: string) {
  if (!(await isAuthed())) return;
  const supabase = getAdminClient();
  await supabase.from("lp_contact_submissions").update({ status }).eq("id", id);
  revalidatePath("/admin");
}

export async function deleteSubmission(id: string) {
  if (!(await isAuthed())) return;
  const supabase = getAdminClient();
  await supabase.from("lp_contact_submissions").delete().eq("id", id);
  revalidatePath("/admin");
}

/* ---------- 集客相談チャット ---------- */

export async function updateChatStatus(id: string, status: string) {
  if (!(await isAuthed())) return;
  const supabase = getAdminClient();
  await supabase.from("lp_chat_consultations").update({ status }).eq("id", id);
  revalidatePath("/admin/chat");
}

export async function deleteChat(id: string) {
  if (!(await isAuthed())) return;
  const supabase = getAdminClient();
  await supabase.from("lp_chat_consultations").delete().eq("id", id);
  revalidatePath("/admin/chat");
}

/* ---------- 予約枠 ---------- */

export async function addSlot(
  _prev: { error?: string },
  formData: FormData
): Promise<{ error?: string }> {
  if (!(await isAuthed())) return { error: "認証が必要です。" };
  const local = String(formData.get("start") || ""); // "2026-06-20T15:00"
  const duration = Number(formData.get("duration") || 30);
  if (!local) return { error: "日時を入力してください。" };

  // datetime-local を JST(+09:00) の instant として解釈
  const startIso = new Date(`${local}:00+09:00`).toISOString();

  const supabase = getAdminClient();
  const { error } = await supabase
    .from("lp_booking_slots")
    .insert({ start_at: startIso, duration_min: duration, status: "open" });
  if (error) return { error: "登録に失敗しました。" };
  revalidatePath("/admin/booking");
  return {};
}

export async function deleteSlot(id: string) {
  if (!(await isAuthed())) return;
  const supabase = getAdminClient();
  await supabase.from("lp_booking_slots").delete().eq("id", id);
  revalidatePath("/admin/booking");
}

export async function setSlotStatus(id: string, status: string) {
  if (!(await isAuthed())) return;
  const supabase = getAdminClient();
  await supabase.from("lp_booking_slots").update({ status }).eq("id", id);
  revalidatePath("/admin/booking");
}

/* ---------- 予約 ---------- */

export async function updateBookingStatus(id: string, status: string) {
  if (!(await isAuthed())) return;
  const supabase = getAdminClient();
  await supabase.from("lp_bookings").update({ status }).eq("id", id);
  revalidatePath("/admin/booking");
}

export async function deleteBooking(id: string) {
  if (!(await isAuthed())) return;
  const supabase = getAdminClient();
  await supabase.from("lp_bookings").delete().eq("id", id);
  revalidatePath("/admin/booking");
}
