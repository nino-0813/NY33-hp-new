import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://ny33.jp";
const title = "合同会社NY33 | 尾道・福山のウェブ制作とAI活用支援";
const description =
  "合同会社NY33は、広島県尾道市を拠点に、ホームページ制作・AI活用支援・地域企業の課題解決を行うウェブ制作会社です。人と人のつながりで尾道・福山の未来をつくります。";

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
    "尾道 ホームページ制作",
    "尾道 ウェブ制作",
    "福山 ホームページ制作",
    "広島 ウェブ制作",
    "AI活用支援",
    "地域企業 Web支援"
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
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "合同会社NY33 | 人と人のつながりで、地域の未来をつくる。"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.svg"]
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
      <body>{children}</body>
    </html>
  );
}
