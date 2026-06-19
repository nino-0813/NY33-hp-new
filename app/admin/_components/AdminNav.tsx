import Link from "next/link";
import { logout } from "../actions";

const TABS = [
  { href: "/admin", label: "お問い合わせ" },
  { href: "/admin/chat", label: "集客相談チャット" },
  { href: "/admin/booking", label: "オンライン相談予約" },
];

export function AdminNav({ active }: { active: string }) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <nav className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              active === t.href
                ? "bg-[image:var(--red-grad)] text-white"
                : "border border-ink/15 text-ink/70 hover:border-brand-red hover:text-brand-red"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </nav>
      <form action={logout}>
        <button
          type="submit"
          className="rounded-full border border-ink/15 px-4 py-2 text-sm font-bold text-ink/70 hover:border-brand-red hover:text-brand-red"
        >
          ログアウト
        </button>
      </form>
    </div>
  );
}
