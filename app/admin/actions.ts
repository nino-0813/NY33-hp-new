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
