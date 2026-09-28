"use client";

import { nextAttribution, type Attribution } from "./attribution";

/**
 * GA4 イベント送信と流入アトリビューションの保持。
 * - gtag が無い環境（開発・広告ブロッカー）では送信せず何もしない。
 * - 全イベントに source_page / landing_page を自動付与する。
 * - storage が使えない環境でも例外を外に出さない。
 */

const STORAGE_KEY = "ny33_attribution";

let memory: Attribution | null = null;

function load(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : memory;
  } catch {
    return memory;
  }
}

function save(a: Attribution) {
  memory = a;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(a));
  } catch {
    // プライベートモード等では memory のみで保持
  }
}

export function recordPageView(path: string) {
  if (typeof window === "undefined") return;
  const prev = load();
  save(nextAttribution(prev, path, prev ? "" : document.referrer));
}

export function getAttribution(): Attribution {
  const empty = { landing_page: "", source_page: "", referrer: "" };
  if (typeof window === "undefined") return empty;
  // ページ遷移の記録より先に呼ばれた場合（直接フォームに着地など）は現在地で初期化する
  if (!load()) recordPageView(window.location.pathname);
  return load() ?? empty;
}

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const { landing_page, source_page } = getAttribution();
  try {
    window.gtag("event", event, { source_page, landing_page, ...params });
  } catch {
    // 計測の失敗で画面の動作を止めない
  }
}
