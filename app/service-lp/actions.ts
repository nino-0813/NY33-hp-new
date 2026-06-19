"use server";

import { headers } from "next/headers";
import { getAdminClient } from "../lib/supabase";

export type LeadFormState = {
  ok: boolean;
  error?: string;
};

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const honeypot = String(formData.get("website") || "");

  // スパム対策（ハニーポット）：bot は成功扱いで握りつぶす
  if (honeypot) return { ok: true };

  if (!name) return { ok: false, error: "お名前を入力してください。" };
  if (!email) return { ok: false, error: "メールアドレスを入力してください。" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "メールアドレスの形式が正しくないようです。" };
  }

  try {
    const ua = (await headers()).get("user-agent");
    const supabase = getAdminClient();
    const { error } = await supabase.from("lp_contact_submissions").insert({
      name,
      email,
      message: message || null,
      source: "service-lp",
      user_agent: ua,
    });

    if (error) {
      console.error("[service-lp] insert error:", error);
      return {
        ok: false,
        error: "送信中にエラーが発生しました。時間をおいて再度お試しください。",
      };
    }

    return { ok: true };
  } catch (e) {
    console.error("[service-lp] unexpected error:", e);
    return {
      ok: false,
      error: "送信中にエラーが発生しました。時間をおいて再度お試しください。",
    };
  }
}
