import { getAdminClient, type ChatConsultation } from "../../lib/supabase";
import { CONSULT_QUESTION_LABEL } from "../../lib/consultQuestions";
import { isAuthed } from "../actions";
import { LoginForm } from "../_components/LoginForm";
import { AdminNav } from "../_components/AdminNav";
import { ChatActions } from "../_components/ChatActions";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, { label: string; cls: string }> = {
  new: { label: "新規", cls: "bg-brand-red text-white" },
  contacted: { label: "対応中", cls: "bg-amber-400 text-ink" },
  done: { label: "完了", cls: "bg-ink/10 text-ink/60" },
};

function fmt(iso: string): string {
  return new Date(iso).toLocaleString("ja-JP", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tokyo",
  });
}

export default async function ChatAdminPage() {
  if (!(await isAuthed())) return <LoginForm />;

  let rows: ChatConsultation[] = [];
  let loadError: string | null = null;
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("lp_chat_consultations")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    rows = (data as ChatConsultation[]) ?? [];
  } catch (e) {
    loadError = e instanceof Error ? e.message : "データの取得に失敗しました。";
  }

  const newCount = rows.filter((r) => r.status === "new").length;

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <AdminNav active="/admin/chat" />
      <div className="mb-6">
        <h1 className="text-2xl font-black text-ink">集客相談チャット</h1>
        <p className="mt-1 text-sm text-ink/60">
          全{rows.length}件
          {newCount > 0 && (
            <span className="ml-2 rounded-full bg-brand-red px-2 py-0.5 text-xs font-bold text-white">
              新規 {newCount}
            </span>
          )}
        </p>
      </div>

      {loadError && (
        <p className="mb-6 rounded-lg bg-white p-4 text-sm font-bold text-brand-reddark shadow-sm">
          {loadError}
        </p>
      )}

      {!loadError && rows.length === 0 && (
        <p className="rounded-2xl bg-white p-10 text-center text-ink/50 shadow-sm">
          まだ相談はありません。
        </p>
      )}

      <div className="space-y-4">
        {rows.map((r) => {
          const s = STATUS_LABEL[r.status] ?? STATUS_LABEL.new;
          return (
            <div key={r.id} className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${s.cls}`}>
                    {s.label}
                  </span>
                  <span className="font-black text-ink">{r.name || "（無記名）"}</span>
                  {r.email && (
                    <a href={`mailto:${r.email}`} className="text-sm text-brand-red underline">
                      {r.email}
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-ink/40">{fmt(r.created_at)}</span>
                  <ChatActions id={r.id} status={r.status} />
                </div>
              </div>

              <dl className="grid gap-2 rounded-xl bg-pink-soft p-4 text-sm sm:grid-cols-2">
                {Object.entries(r.answers || {}).map(([k, v]) => (
                  <div key={k} className="flex flex-col">
                    <dt className="text-[11px] font-bold text-ink/45">
                      {CONSULT_QUESTION_LABEL[k] ?? k}
                    </dt>
                    <dd className="font-bold text-ink">{v}</dd>
                  </div>
                ))}
              </dl>

              {r.message && (
                <p className="mt-3 whitespace-pre-wrap text-sm text-ink/70">
                  <span className="font-bold text-ink/45">補足: </span>
                  {r.message}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
