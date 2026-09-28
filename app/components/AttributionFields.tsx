"use client";

import { useEffect, useState } from "react";

import { getAttribution } from "../lib/analytics";
import type { Attribution } from "../lib/attribution";

/** フォームに流入情報を hidden で載せる。サーバー側は readAttribution で受け取る。 */
export function AttributionFields() {
  const [a, setA] = useState<Attribution | null>(null);

  useEffect(() => {
    setA(getAttribution());
  }, []);

  return (
    <>
      <input type="hidden" name="landing_page" value={a?.landing_page ?? ""} />
      <input type="hidden" name="source_page" value={a?.source_page ?? ""} />
      <input type="hidden" name="referrer" value={a?.referrer ?? ""} />
    </>
  );
}
