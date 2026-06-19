import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "llc33.company@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "NY33 <onboarding@resend.dev>";

/**
 * メール送信の共通ヘルパー。
 * RESEND_API_KEY が無い・送信失敗でも例外は投げない（保存処理を止めないため）。
 */
export async function sendMail(opts: {
  to?: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[mail] RESEND_API_KEY 未設定のため送信スキップ");
    return;
  }
  try {
    const resend = new Resend(key);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: opts.to || TO_EMAIL,
      replyTo: opts.replyTo,
      subject: opts.subject,
      text: opts.text,
    });
  } catch (e) {
    console.warn("[mail] 送信失敗:", e);
  }
}

export const ADMIN_TO_EMAIL = TO_EMAIL;
