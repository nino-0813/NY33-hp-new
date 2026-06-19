import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;

/**
 * 公開（anon / publishable）キーを使うクライアント。
 * RLS により lp_contact_submissions への INSERT のみ許可されている。
 * フォーム送信に使用する。
 */
export function getPublicClient() {
  const anon = process.env.SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error("SUPABASE_URL / SUPABASE_ANON_KEY が設定されていません。");
  }
  return createClient(url, anon, { auth: { persistSession: false } });
}

/**
 * service role キーを使うクライアント（RLS をバイパス）。
 * 管理画面での閲覧・更新・削除に使用する。サーバー側でのみ利用すること。
 */
export function getAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY が設定されていません。"
    );
  }
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

export type ContactSubmission = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string | null;
  source: string;
  status: string;
  user_agent: string | null;
};
