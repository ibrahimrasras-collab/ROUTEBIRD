"use client";

import { useTranslations } from "next-intl";
import { BrandMark } from "./BrandMark";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";

export function Nav({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-transparent transition-colors nav-scrolled"
      style={{ borderColor: "var(--color-divider)" }}
    >
      <div className="container flex items-center justify-between h-16">
        <a
          href={`/${locale}`}
          className="flex items-center gap-2 font-display font-bold text-lg text-text no-underline"
          aria-label="Routebird home"
        >
          <BrandMark className="w-7 h-7 text-primary" />
          Routebird
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-text-muted" aria-label="Primary">
          <a href="#how" className="hover:text-text transition-colors">{t("how")}</a>
          <a href="#features" className="hover:text-text transition-colors">{t("features")}</a>
          <a href="#pricing" className="hover:text-text transition-colors">{t("pricing")}</a>
          <a href="#faq" className="hover:text-text transition-colors">{t("faq")}</a>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#waitlist"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-primary text-text-inverse text-sm font-semibold hover:bg-primary-hover transition-colors"
          >
            {t("waitlist")}
          </a>
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 text-text-muted"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            type="button"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="M6 6l12 12" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-divider bg-surface px-4 py-4 flex flex-col gap-3 text-sm font-medium">
          <a href="#how" onClick={() => setOpen(false)} className="py-2 text-text-muted hover:text-text">{t("how")}</a>
          <a href="#features" onClick={() => setOpen(false)} className="py-2 text-text-muted hover:text-text">{t("features")}</a>
          <a href="#pricing" onClick={() => setOpen(false)} className="py-2 text-text-muted hover:text-text">{t("pricing")}</a>
          <a href="#faq" onClick={() => setOpen(false)} className="py-2 text-text-muted hover:text-text">{t("faq")}</a>
          <a
            href="#waitlist"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center px-4 py-2.5 rounded-full bg-primary text-text-inverse text-sm font-semibold"
          >
            {t("waitlist")}
          </a>
        </div>
      )}
    </header>
  );
}
