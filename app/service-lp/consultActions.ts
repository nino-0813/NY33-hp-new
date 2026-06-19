"use server";

import { getAdminClient, type BookingSlot } from "../lib/supabase";

/* ---------- 集客相談チャット ---------- */

export type ChatResult = { ok: boolean; error?: string };

export async function submitChat(payload: {
  answers: Record<string, string>;
  name: string;
  email: string;
  message?: string;
}): Promise<ChatResult> {
  const name = payload.name?.trim();
  const email = payload.email?.trim();

  if (!name) return { ok: false, error: "お名前を入力してください。" };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "メールアドレスの形式が正しくないようです。" };
  }

  try {
    const supabase = getAdminClient();
    const { error } = await supabase.from("lp_chat_consultations").insert({
      name,
      email,
      answers: payload.answers ?? {},
      message: payload.message?.trim() || null,
      source: "service-lp",
    });
    if (error) {
      console.error("[chat] insert error:", error);
      return { ok: false, error: "送信に失敗しました。時間をおいて再度お試しください。" };
    }
    return { ok: true };
  } catch (e) {
    console.error("[chat] unexpected:", e);
    return { ok: false, error: "送信に失敗しました。時間をおいて再度お試しください。" };
  }
}

/* ---------- 電話相談の予約 ---------- */

export async function listOpenSlots(): Promise<BookingSlot[]> {
  try {
    const supabase = getAdminClient();
    const nowIso = new Date().toISOString();
    const { data, error } = await supabase
      .from("lp_booking_slots")
      .select("*")
      .eq("status", "open")
      .gte("start_at", nowIso)
      .order("start_at", { ascending: true });
    if (error) {
      console.error("[booking] list slots error:", error);
      return [];
    }
    return (data as BookingSlot[]) ?? [];
  } catch (e) {
    console.error("[booking] list slots unexpected:", e);
    return [];
  }
}

export type BookResult = { ok: boolean; error?: string };

export async function bookSlot(payload: {
  slotId: string;
  name: string;
  email: string;
  phone: string;
  note?: string;
}): Promise<BookResult> {
  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const phone = payload.phone?.trim();

  if (!name) return { ok: false, error: "お名前を入力してください。" };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "メールアドレスの形式が正しくないようです。" };
  }
  if (!phone) return { ok: false, error: "電話番号を入力してください。" };

  try {
    const supabase = getAdminClient();

    // 枠がまだ空いているか確認
    const { data: slot, error: slotErr } = await supabase
      .from("lp_booking_slots")
      .select("*")
      .eq("id", payload.slotId)
      .single();

    if (slotErr || !slot) {
      return { ok: false, error: "この枠は見つかりませんでした。再度お選びください。" };
    }
    if ((slot as BookingSlot).status !== "open") {
      return { ok: false, error: "申し訳ありません、その枠はちょうど埋まりました。別の日時をお選びください。" };
    }

    const { error: bookErr } = await supabase.from("lp_bookings").insert({
      slot_id: slot.id,
      start_at: (slot as BookingSlot).start_at,
      name,
      email,
      phone,
      note: payload.note?.trim() || null,
    });
    if (bookErr) {
      console.error("[booking] insert error:", bookErr);
      return { ok: false, error: "予約に失敗しました。時間をおいて再度お試しください。" };
    }

    // 枠を予約済みにする
    await supabase.from("lp_booking_slots").update({ status: "booked" }).eq("id", slot.id);

    return { ok: true };
  } catch (e) {
    console.error("[booking] unexpected:", e);
    return { ok: false, error: "予約に失敗しました。時間をおいて再度お試しください。" };
  }
}
