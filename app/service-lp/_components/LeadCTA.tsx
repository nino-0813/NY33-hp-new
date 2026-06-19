"use client";

import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { ConsultChat } from "./ConsultChat";
import { BookingModal } from "./BookingModal";

type Which = null | "consult" | "booking";

export function LeadCTA() {
  const [open, setOpen] = useState<Which>(null);

  // ヘッダー等からのイベントでも開けるようにする
  useEffect(() => {
    const openConsult = () => setOpen("consult");
    const openBooking = () => setOpen("booking");
    window.addEventListener("open-consult", openConsult);
    window.addEventListener("open-booking", openBooking);
    return () => {
      window.removeEventListener("open-consult", openConsult);
      window.removeEventListener("open-booking", openBooking);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <button
          type="button"
          onClick={() => setOpen("consult")}
          className="group flex flex-col items-center"
        >
          <span className="mb-1.5 rounded-full bg-ink px-3 py-0.5 text-[10px] font-bold text-white">
            相談無料・営業なし
          </span>
          <span className="rounded-full bg-[image:var(--red-grad)] px-10 py-4 font-black text-white shadow-lg transition-transform group-hover:scale-[1.03]">
            無料で集客診断
          </span>
        </button>
        <button
          type="button"
          onClick={() => setOpen("booking")}
          className="group flex flex-col items-center"
        >
          <span className="mb-1.5 rounded-full bg-ink px-3 py-0.5 text-[10px] font-bold text-white">
            情報収集だけでもOK
          </span>
          <span className="rounded-full bg-[image:var(--orange-grad)] px-10 py-4 font-black text-white shadow-lg transition-transform group-hover:scale-[1.03]">
            オンラインで相談する
          </span>
        </button>
      </div>

      <Modal open={open === "consult"} onClose={() => setOpen(null)} title="集客のご相談">
        <ConsultChat onClose={() => setOpen(null)} />
      </Modal>
      <Modal open={open === "booking"} onClose={() => setOpen(null)} title="オンライン相談の予約">
        <BookingModal onClose={() => setOpen(null)} />
      </Modal>
    </>
  );
}
