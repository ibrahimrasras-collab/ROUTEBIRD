"use client";

import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";

export function WaitlistForm({ id = "waitlist" }: { id?: string }) {
  const t = useTranslations("hero.waitlist");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setStatus("error");
      setErrorMsg(t("error.required"));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMsg(t("error.invalid"));
      return;
    }
    setStatus("success");
    setEmail("");
  }

  return (
    <form className="w-full" id={id} onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          placeholder={t("placeholder")}
          aria-label="Email address"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          className="flex-1 px-4 py-3 rounded-xl border border-border bg-surface text-text placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-text-inverse text-sm font-semibold hover:bg-primary-hover active:bg-primary-active transition-colors whitespace-nowrap"
        >
          {t("submit")}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
      {status === "success" && (
        <p className="mt-2 text-sm text-success">{t("success")}</p>
      )}
      {status === "error" && (
        <p className="mt-2 text-sm text-error">{errorMsg}</p>
      )}
    </form>
  );
}
