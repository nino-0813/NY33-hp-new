"use server";

import { headers } from "next/headers";
import { getAdminClient } from "../lib/supabase";
import { sendMail } from "../lib/mail";

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

    // NY33宛の通知
    await sendMail({
      replyTo: email,
      subject: `[Webドック] 集客診断フォーム: ${name} さま`,
      text: [
        "service-lp フォームから送信がありました。",
        "",
        `お名前: ${name}`,
        `メール: ${email}`,
        "",
        "内容:",
        message || "（記載なし）",
      ].join("\n"),
    });
    // 送信者への自動返信
    await sendMail({
      to: email,
      subject: "【自動返信】お問い合わせを受け取りました｜合同会社NY33",
      text: [
        `${name} さま`,
        "",
        "お問い合わせありがとうございます。内容を確認のうえ、担当よりご連絡します。",
        "",
        "合同会社NY33（Webドック）",
        "https://ny33.jp/service-lp",
      ].join("\n"),
    });

    return { ok: true };
  } catch (e) {
    console.error("[service-lp] unexpected error:", e);
    return {
      ok: false,
      error: "送信中にエラーが発生しました。時間をおいて再度お試しください。",
    };
  }
}
