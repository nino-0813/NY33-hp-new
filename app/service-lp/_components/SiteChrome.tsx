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
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-consult"))}
            className="rounded-full bg-[image:var(--red-grad)] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.03]"
          >
            無料で集客診断
          </button>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-booking"))}
            className="rounded-full bg-[image:var(--orange-grad)] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.03]"
          >
            オンライン相談
          </button>
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
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              window.dispatchEvent(new CustomEvent("open-consult"));
            }}
            className="mt-2 rounded-full bg-[image:var(--red-grad)] px-5 py-3 text-center font-bold text-white"
          >
            無料で集客診断
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              window.dispatchEvent(new CustomEvent("open-booking"));
            }}
            className="rounded-full bg-[image:var(--orange-grad)] px-5 py-3 text-center font-bold text-white"
          >
            オンライン相談
          </button>
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

    // If observers aren't available, just show the content.
    if (typeof IntersectionObserver === "undefined") {
      ref.classList.add("is-visible");
      return;
    }

    // Arm the hide+animate behavior only now that JS is running. If this
    // effect never runs (no JS / hydration fails), the content stays visible.
    ref.dataset.armed = "true";

    const reveal = () => ref.classList.add("is-visible");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(ref);

    // Safety net: reveal anyway if the observer somehow hasn't fired.
    const t = window.setTimeout(reveal, 1200);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
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
