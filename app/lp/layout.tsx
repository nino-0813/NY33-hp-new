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
  title: "集客動線設計 | 合同会社NY33",
  description:
    "戦略設計・Web実装・計測・自動化を一社で。因島・尾道発、地方の事業を伸ばす集客動線設計のパートナー。無料相談受付中。",
  alternates: { canonical: "/lp" },
  // 広告用の独立LP。本サイトのSEOと切り離すため検索結果には出さない。
  robots: { index: false, follow: false },
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
