import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "../service-lp/lp.css";

const sans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "管理画面 | NY33",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`lp-root min-h-screen bg-pink-soft ${sans.variable}`}>
      {children}
    </div>
  );
}
