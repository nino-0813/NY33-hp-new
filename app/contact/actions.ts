"use server";

import { Resend } from "resend";

// 受信先（Vercel環境変数で上書き可）。デフォルトは llc33.company@gmail.com
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "llc33.company@gmail.com";

// 送信元
// 初期は Resend のサンドボックス用 onboarding@resend.dev を使用。
// 本番運用時は ny33.jp ドメインを Resend で検証し、
// noreply@ny33.jp 等に切り替えるとスパム判定されにくくなる。
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "NY33 <onboarding@resend.dev>";

export type ContactFormState = {
  ok: boolean;
  errors?: {
    name?: string;
    email?: string;
    consent?: string;
    general?: string;
  };
};

const INTENT_LABELS: Record<string, string> = {
  "web-dock": "Webドック診断（無料）",
  repair: "修繕・改修",
  "ai-assist": "AI活用支援",
  navigation: "集客導線整備",
  maintenance: "定期整備",
  partnership: "経営伴走",
  other: "その他・まだ言葉になっていない"
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // ───── 入力取得 ─────
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const intentValues = formData
    .getAll("intent")
    .map((v) => String(v))
    .filter(Boolean);
  const message = String(formData.get("message") || "").trim();
  const consent = formData.get("consent");
  const honeypot = String(formData.get("website") || "");

  // ───── スパム対策（ハニーポット）─────
  if (honeypot) {
    // bot とみなして握りつぶす（成功扱い）
    return { ok: true };
  }

  // ───── バリデーション ─────
  const errors: ContactFormState["errors"] = {};
  if (!name) errors.name = "お名前を入力してください";
  if (!email) {
    errors.email = "メールアドレスを入力してください";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "メールアドレスの形式が正しくないようです";
  }
  if (!consent) errors.consent = "プライバシーポリシーへの同意が必要です";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  // ───── Resend 設定確認 ─────
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[Contact] RESEND_API_KEY is not set");
    return {
      ok: false,
      errors: {
        general:
          "メール送信の設定が完了していません。お手数ですが llc33.company@gmail.com まで直接ご連絡ください。"
      }
    };
  }

  const resend = new Resend(apiKey);

  // ───── 通知メール本文（NY33宛て）─────
  const intentsList =
    intentValues.length > 0
      ? intentValues.map((v) => `- ${INTENT_LABELS[v] || v}`).join("\n")
      : "（未選択）";

  const notificationText = [
    "新しいお問い合わせが届きました。",
    "",
    "─────────────────────────────",
    `お名前: ${name}`,
    `メール: ${email}`,
    `会社名: ${company || "（未入力）"}`,
    "",
    "相談したいこと:",
    intentsList,
    "",
    "詳細・現在地:",
    message || "（記載なし）",
    "─────────────────────────────",
    "",
    "返信は Reply-To 経由でそのまま相手に届きます。",
    "合同会社NY33 お問い合わせフォーム"
  ].join("\n");

  // ───── 自動返信本文（送信者宛て）─────
  const autoReplyText = [
    `${name} さま`,
    "",
    "合同会社NY33の二宮です。",
    "お問い合わせをお預かりしました。",
    "",
    "通常2〜3営業日以内に、二宮よりご返信いたします。",
    "お急ぎの場合は llc33.company@gmail.com まで直接ご連絡ください。",
    "",
    "NY33は、瀬戸内の会社の航海をWebとAIで支える「経営のドック」です。",
    "「分からないことを、分からないままにしない」を大切にしています。",
    "どうぞよろしくお願いします。",
    "",
    "─────────────────────────────",
    "以下、お送りいただいた内容です。",
    "",
    `お名前: ${name}`,
    `会社名: ${company || "（未入力）"}`,
    "",
    "相談したいこと:",
    intentsList,
    "",
    "詳細・現在地:",
    message || "（記載なし）",
    "─────────────────────────────",
    "",
    "合同会社NY33",
    "https://ny33.jp/"
  ].join("\n");

  // ───── 送信 ─────
  try {
    // 1) NY33宛ての通知
    const notifyResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[NY33 お問い合わせ] ${name} さま${company ? `（${company}）` : ""}`,
      text: notificationText
    });

    if (notifyResult.error) {
      console.error("[Contact] notification send error:", notifyResult.error);
      return {
        ok: false,
        errors: {
          general:
            "送信中にエラーが発生しました。お手数ですが llc33.company@gmail.com まで直接ご連絡ください。"
        }
      };
    }

    // 2) 送信者宛ての自動返信（失敗してもメイン通知は届いている前提で握りつぶす）
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        replyTo: TO_EMAIL,
        subject: "【自動返信】お問い合わせを受け取りました｜合同会社NY33",
        text: autoReplyText
      });
    } catch (autoReplyError) {
      console.warn("[Contact] auto-reply send warning:", autoReplyError);
    }

    return { ok: true };
  } catch (error) {
    console.error("[Contact] unexpected error:", error);
    return {
      ok: false,
      errors: {
        general:
          "送信中にエラーが発生しました。お手数ですが llc33.company@gmail.com まで直接ご連絡ください。"
      }
    };
  }
}
