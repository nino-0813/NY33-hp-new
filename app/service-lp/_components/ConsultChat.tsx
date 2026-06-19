"use client";

import { useEffect, useRef, useState } from "react";
import { CONSULT_QUESTIONS } from "../../lib/consultQuestions";
import { submitChat } from "../consultActions";

type Msg = { role: "bot" | "user"; text: string };

export function ConsultChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "こんにちは！集客のご相談ですね。いくつか質問させてください（30秒ほどで終わります）。" },
    { role: "bot", text: CONSULT_QUESTIONS[0].q },
  ]);
  const [step, setStep] = useState(0); // 0..(N-1)=質問, N=連絡先入力
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, step, done]);

  const total = CONSULT_QUESTIONS.length;

  function choose(option: string) {
    const q = CONSULT_QUESTIONS[step];
    setAnswers((a) => ({ ...a, [q.id]: option }));
    setMessages((m) => [...m, { role: "user", text: option }]);

    const next = step + 1;
    setStep(next);

    setTimeout(() => {
      if (next < total) {
        setMessages((m) => [...m, { role: "bot", text: CONSULT_QUESTIONS[next].q }]);
      } else {
        setMessages((m) => [
          ...m,
          {
            role: "bot",
            text: "ありがとうございます！最後に、ご連絡先を教えてください。後日この内容をもとにご提案します。",
          },
        ]);
      }
    }, 250);
  }

  async function send() {
    setError(null);
    setSending(true);
    const res = await submitChat({ answers, name, email, message });
    setSending(false);
    if (!res.ok) {
      setError(res.error ?? "送信に失敗しました。");
      return;
    }
    setDone(true);
    setMessages((m) => [
      ...m,
      { role: "bot", text: "送信ありがとうございます！担当より折り返しご連絡します。" },
    ]);
  }

  return (
    <div className="flex h-[70vh] max-h-[560px] flex-col">
      {/* messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-pink-soft px-4 py-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "rounded-br-sm bg-[image:var(--red-grad)] text-white"
                  : "rounded-bl-sm bg-white text-ink shadow-sm"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* input area */}
      <div className="border-t border-ink/10 bg-white p-4">
        {!done && step < total && (
          <>
            <p className="mb-2 text-[11px] font-bold text-ink/40">
              質問 {step + 1} / {total}・タップで回答
            </p>
            <div className="flex flex-wrap gap-2">
              {CONSULT_QUESTIONS[step].options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => choose(opt)}
                  className="rounded-full border border-brand-red/40 px-3 py-2 text-sm font-bold text-brand-red transition-colors hover:bg-brand-red hover:text-white"
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        )}

        {!done && step >= total && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="お名前（必須）"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-3 py-2.5 text-sm outline-none focus:border-brand-red"
            />
            <input
              type="email"
              placeholder="メールアドレス（必須）"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-3 py-2.5 text-sm outline-none focus:border-brand-red"
            />
            <textarea
              placeholder="補足があればご記入ください（任意）"
              value={message}
              rows={2}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-3 py-2.5 text-sm outline-none focus:border-brand-red"
            />
            {error && <p className="text-sm font-bold text-brand-reddark">{error}</p>}
            <button
              type="button"
              onClick={send}
              disabled={sending}
              className="w-full rounded-lg bg-[image:var(--red-grad)] py-3 font-black text-white disabled:opacity-60"
            >
              {sending ? "送信中…" : "この内容で相談する"}
            </button>
          </div>
        )}

        {done && (
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border border-ink/15 py-3 font-bold text-ink/70 hover:border-brand-red hover:text-brand-red"
          >
            閉じる
          </button>
        )}
      </div>
    </div>
  );
}
