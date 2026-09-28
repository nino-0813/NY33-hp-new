"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

import { recordPageView, track } from "../lib/analytics";

/**
 * Google Analytics 4 (GA4) の計測タグ。
 * - 本番環境（production）のみで動作。開発・プレビューでは送信されません。
 * - App Router の SPA 遷移を usePathname / useSearchParams で検知し、
 *   ルート変更ごとに page_view を送ります。
 * - Measurement ID は GA4 → 管理 → データストリームで取得できます。
 * - 流入アトリビューションの記録と CTA / PDF クリック計測もここで行います
 *   （イベント定義は docs/analytics.md）。
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
    // アトリビューションは gtag の有無に関係なく記録する（フォームの通知メールで使う）
    recordPageView(pathname);
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

/**
 * クリック計測（document への委譲リスナー）。
 * - data-track-cta="<id>" を付けた要素 → cta_click
 * - .pdf へのリンク → file_download
 */
function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      if (!target) return;

      const cta = target.closest<HTMLElement>("[data-track-cta]");
      if (cta) {
        track("cta_click", {
          cta_id: cta.dataset.trackCta,
          link_url: cta instanceof HTMLAnchorElement ? cta.href : undefined
        });
      }

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (link && /\.pdf($|\?)/i.test(link.pathname)) {
        track("file_download", {
          file_name: link.pathname.split("/").pop(),
          link_url: link.href
        });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}

export function GoogleAnalytics() {
  const tracker = (
    <Suspense fallback={null}>
      <PageViewTracker />
    </Suspense>
  );

  // 開発環境では GA4 に送信しない（アトリビューションの記録のみ行う）
  if (process.env.NODE_ENV !== "production") {
    return tracker;
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
      {tracker}
      <ClickTracker />
    </>
  );
}
