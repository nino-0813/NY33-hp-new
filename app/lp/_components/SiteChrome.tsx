"use client";

import { useEffect, useState } from "react";

const NAV = [
  { href: "#top", label: "TOP" },
  { href: "#services", label: "サービス一覧" },
  { href: "#works", label: "実績" },
  { href: "#company", label: "会社情報" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/95 shadow-sm backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between md:h-[72px]">
        <a href="#top" className="flex items-center gap-1.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[image:var(--red-grad)] text-sm font-black text-white">
            N
          </span>
          <span className="text-xl font-black tracking-tight text-ink">
            NY<span className="text-brand-red">33</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-bold text-ink transition-colors hover:text-brand-red"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-[image:var(--red-grad)] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.03]"
          >
            無料デモサイト依頼
          </a>
          <a
            href="#contact"
            className="rounded-full bg-[image:var(--orange-grad)] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.03]"
          >
            オンライン無料相談
          </a>
        </nav>

        <button
          aria-label="メニュー"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-ink lg:hidden"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-current transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      <div
        className={`overflow-hidden bg-white transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="container-x flex flex-col gap-1 py-4">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 font-bold text-ink hover:bg-pink-soft"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-[image:var(--red-grad)] px-5 py-3 text-center font-bold text-white"
          >
            無料デモサイト依頼
          </a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="rounded-full bg-[image:var(--orange-grad)] px-5 py-3 text-center font-bold text-white"
          >
            オンライン無料相談
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(ref);
    return () => io.disconnect();
  }, [ref]);

  return (
    <div
      ref={setRef}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
