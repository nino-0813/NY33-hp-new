import { getAdminClient, type ContactSubmission } from "../lib/supabase";
import { isAuthed, logout } from "./actions";
import { LoginForm } from "./_components/LoginForm";
import { RowActions } from "./_components/RowActions";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, { label: string; cls: string }> = {
  new: { label: "新規", cls: "bg-brand-red text-white" },
  contacted: { label: "対応中", cls: "bg-amber-400 text-ink" },
  done: { label: "完了", cls: "bg-ink/10 text-ink/60" },
};

function fmt(iso: string): string {
  return new Date(iso).toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tokyo",
  });
}

export default async function AdminPage() {
  if (!(await isAuthed())) {
    return <LoginForm />;
  }

  let rows: ContactSubmission[] = [];
  let loadError: string | null = null;
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("lp_contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    rows = (data as ContactSubmission[]) ?? [];
  } catch (e) {
    loadError =
      e instanceof Error
        ? e.message
        : "データの取得に失敗しました（環境変数を確認してください）。";
  }

  const newCount = rows.filter((r) => r.status === "new").length;

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-ink">お問い合わせ管理</h1>
          <p className="mt-1 text-sm text-ink/60">
            service-lp（Webドック）フォーム · 全{rows.length}件
            {newCount > 0 && (
              <span className="ml-2 rounded-full bg-brand-red px-2 py-0.5 text-xs font-bold text-white">
                新規 {newCount}
              </span>
            )}
          </p>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-full border border-ink/15 px-4 py-2 text-sm font-bold text-ink/70 hover:border-brand-red hover:text-brand-red"
          >
            ログアウト
          </button>
        </form>
      </div>

      {loadError && (
        <p className="mb-6 rounded-lg bg-white p-4 text-sm font-bold text-brand-reddark shadow-sm">
          {loadError}
        </p>
      )}

      {!loadError && rows.length === 0 && (
        <p className="rounded-2xl bg-white p-10 text-center text-ink/50 shadow-sm">
          まだお問い合わせはありません。
        </p>
      )}

      {rows.length > 0 && (
        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-left text-xs text-ink/50">
                <th className="p-4">受信日時</th>
                <th className="p-4">お名前</th>
                <th className="p-4">メール</th>
                <th className="p-4">ご相談内容</th>
                <th className="p-4">状態</th>
                <th className="p-4">操作</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const s = STATUS_LABEL[r.status] ?? STATUS_LABEL.new;
                return (
                  <tr key={r.id} className="border-b border-ink/5 align-top">
                    <td className="whitespace-nowrap p-4 text-ink/60">{fmt(r.created_at)}</td>
                    <td className="whitespace-nowrap p-4 font-bold text-ink">{r.name}</td>
                    <td className="p-4">
                      <a href={`mailto:${r.email}`} className="text-brand-red underline">
                        {r.email}
                      </a>
                    </td>
                    <td className="max-w-xs p-4 text-ink/70">
                      {r.message ? (
                        <span className="whitespace-pre-wrap">{r.message}</span>
                      ) : (
                        <span className="text-ink/30">（なし）</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${s.cls}`}>
                        {s.label}
                      </span>
                    </td>
                    <td className="p-4">
                      <RowActions id={r.id} status={r.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
