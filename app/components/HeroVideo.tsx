"use client";

import { useEffect, useState } from "react";

type Props = {
  desktop: string;
  mobile: string;
  poster: string;
  /** 切り替えのブレークポイント (max-width px) */
  mobileBreakpoint?: number;
};

/**
 * 画面幅でデスクトップ／スマホ用動画を出し分けるヒーロー背景動画。
 * - matchMedia でデバイスを判定し、必要な動画だけロードする
 * - 初期描画は (SSR時には decision がつかないため) デスクトップを優先
 * - 端末判定後に必要なら切り替えて再ロード（src 切替 + key 更新で video を再マウント）
 */
export function HeroVideo({ desktop, mobile, poster, mobileBreakpoint = 768 }: Props) {
  // SSR では desktop。クライアント側で初回 effect で正しい値に更新する
  const [src, setSrc] = useState<string>(desktop);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mql = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`);
    const apply = (matches: boolean) => {
      setSrc(matches ? mobile : desktop);
    };
    apply(mql.matches);

    const listener = (event: MediaQueryListEvent) => apply(event.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, [desktop, mobile, mobileBreakpoint]);

  return (
    <video
      key={src}
      className="fixed-visual-video"
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
    />
  );
}
