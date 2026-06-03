"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

/**
 * Google Analytics 4 (GA4) の計測タグ。
 * - 本番環境（production）のみで動作。開発・プレビューでは送信されません。
 * - App Router の SPA 遷移を usePathname / useSearchParams で検知し、
 *   ルート変更ごとに page_view を送ります。
 * - Measurement ID は GA4 → 管理 → データストリームで取得できます。
 */
const GA_MEASUREMENT_ID = "G-JMR6XDWCXE";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer?: any[];
  }
}

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }
    const qs = searchParams?.toString();
    const url = pathname + (qs ? `?${qs}` : "");
    window.gtag("event", "page_view", {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title
    });
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalytics() {
  // 開発環境では計測しない（本番のみ）
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}
