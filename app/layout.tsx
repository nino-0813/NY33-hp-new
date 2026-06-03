import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "./components/GoogleAnalytics";

const siteUrl = "https://ny33.jp";
const title = "合同会社NY33 | 瀬戸内の会社を支えるWebとAIのドック";
const description =
  "合同会社NY33は、広島県尾道市を拠点に、瀬戸内の会社の航海をWebとAIで整備する『経営のドック』です。Webドック診断・修繕・定期整備・AI活用まで、経営者の隣で支え続けます。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | 合同会社NY33"
  },
  description,
  keywords: [
    "合同会社NY33",
    "NY33",
    "二宮佑介",
    "Webドック",
    "Webドック診断",
    "瀬戸内 Web制作",
    "尾道 ホームページ制作",
    "尾道 ウェブ制作",
    "福山 ホームページ制作",
    "因島 Web制作",
    "広島 ウェブ制作",
    "AI活用支援",
    "瀬戸内 AI活用",
    "地方経営 伴走"
  ],
  authors: [{ name: "合同会社NY33" }],
  creator: "合同会社NY33",
  publisher: "合同会社NY33",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "/",
    siteName: "合同会社NY33",
    title,
    description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "合同会社NY33 | 会社の航海に、Webのドックを。"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* JS が動く環境のみリビールアニメを適用するためのフラグ。JS失敗時は本文が常に見える */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');"
          }}
        />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
