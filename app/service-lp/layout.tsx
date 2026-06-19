import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./lp.css";

const sans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Webドック（Web Dock）| 集客動線設計サービス｜合同会社NY33",
  description:
    "Webドック（Web Dock）は、戦略設計・Web制作・計測・自動化を一社で行う集客動線設計サービス。因島・尾道発、地方の事業の集客を仕組みから設計します。無料相談受付中。",
  alternates: { canonical: "/service-lp" },
  robots: { index: true, follow: true },
};

export default function LpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`lp-root ${sans.variable} ${serif.variable}`}>{children}</div>
  );
}
