"use client";

import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import type { PassportNationality } from "@/lib/types";

const nationalities: { code: PassportNationality; label: string; flag: string }[] = [
  { code: "IN", label: "India", flag: "\u{1F1EE}\u{1F1F3}" },
  { code: "CN", label: "China", flag: "\u{1F1E8}\u{1F1F3}" },
  { code: "VN", label: "Vietnam", flag: "\u{1F1FB}\u{1F1F3}" },
  { code: "PH", label: "Philippines", flag: "\u{1F1F5}\u{1F1ED}" },
  { code: "NP", label: "Nepal", flag: "\u{1F1F3}\u{1F1F5}" },
];

interface PassportData {
  passportNumber: string;
  nameInPassport: string;
  dateOfBirth: string;
  gender: "M" | "F" | "X";
  nationality: PassportNationality;
  issueDate: string;
  expiryDate: string;
  issuingAuthority: string;
  placeOfIssue: string;
}

function checkPassportValidity(expiryDate: string): {
  valid: boolean;
  daysUntilExpiry: number;
  message: string;
} {
  if (!expiryDate) return { valid: true, daysUntilExpiry: 999, message: "" };
  const expiry = new Date(expiryDate);
  const now = new Date();
  const diffMs = expiry.getTime() - now.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days < 0) {
    return { valid: false, daysUntilExpiry: days, message: "Passport has expired." };
  }
  if (days < 182) {
    return {
      valid: false,
      daysUntilExpiry: days,
      message: `Passport expires in ${days} days. Many countries require 6+ months validity on arrival — please renew before booking.`,
    };
  }
  return {
    valid: true,
    daysUntilExpiry: days,
    message: "Passport validity is fine for travel.",
  };
}

export default function PassportPage() {
  const t = useTranslations("passport");
  const [saved, setSaved] = useState(false);
  const [validity, setValidity] = useState<ReturnType<typeof checkPassportValidity> | null>(null);

  const [form, setForm] = useState<PassportData>({
    passportNumber: "",
    nameInPassport: "",
    dateOfBirth: "",
    gender: "M",
    nationality: "IN",
    issueDate: "",
    expiryDate: "",
    issuingAuthority: "",
    placeOfIssue: "",
  });

  function updateField<K extends keyof PassportData>(key: K, value: PassportData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "expiryDate") {
      setValidity(checkPassportValidity(value as string));
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Store in localStorage for the session
    if (typeof window !== "undefined") {
      localStorage.setItem("rb_passport", JSON.stringify(form));
      setSaved(true);
    }
  }

  return (
    <div className="section">
      <div className="container container--narrow">
        <RevealOnScroll>
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">
              Step 1 of 3
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold mb-3">
              {t("title")}
            </h1>
            <p className="text-text-muted leading-relaxed">
              {t("intro")}
            </p>
          </div>
        </RevealOnScroll>

        {saved ? (
          <RevealOnScroll>
            <div className="p-6 rounded-2xl border border-success bg-success-soft text-center">
              <svg className="w-12 h-12 text-success mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <p className="font-semibold text-success mb-4">{t("saved")}</p>
              <a
                href="/search"
                className="inline-flex items-center px-5 py-2.5 rounded-xl bg-primary text-text-inverse text-sm font-semibold hover:bg-primary-hover transition-colors"
              >
                Continue to search
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </RevealOnScroll>
        ) : (
          <RevealOnScroll delay={80}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nationality */}
              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  {t("fields.nationality")}
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {nationalities.map((nat) => (
                    <button
                      key={nat.code}
                      type="button"
                      onClick={() => updateField("nationality", nat.code)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border text-xs font-medium transition-all ${
                        form.nationality === nat.code
                          ? "border-primary bg-primary-soft text-primary shadow-sm"
                          : "border-border bg-surface text-text-muted hover:border-border-strong"
                      }`}
                    >
                      <span className="text-xl">{nat.flag}</span>
                      {nat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Passport number */}
              <div>
                <label className="block text-sm font-semibold text-text mb-1.5">
                  {t("fields.passportNumber")}
                </label>
                <input
                  type="text"
                  required
                  value={form.passportNumber}
                  onChange={(e) => updateField("passportNumber", e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm font-mono tracking-wider"
                  placeholder="A12345678"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-text mb-1.5">
                  {t("fields.nameInPassport")}
                </label>
                <input
                  type="text"
                  required
                  value={form.nameInPassport}
                  onChange={(e) => updateField("nameInPassport", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
                  placeholder="RASRAS IBRAHIM"
                />
              </div>

              {/* DOB + Gender row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text mb-1.5">
                    {t("fields.dateOfBirth")}
                  </label>
                  <input
                    type="date"
                    required
                    value={form.dateOfBirth}
                    onChange={(e) => updateField("dateOfBirth", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text mb-1.5">
                    {t("fields.gender")}
                  </label>
                  <select
                    value={form.gender}
                    onChange={(e) => updateField("gender", e.target.value as "M" | "F" | "X")}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="X">X / Other</option>
                  </select>
                </div>
              </div>

              {/* Issue + Expiry dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text mb-1.5">
                    {t("fields.issueDate")}
                  </label>
                  <input
                    type="date"
                    required
                    value={form.issueDate}
                    onChange={(e) => updateField("issueDate", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text mb-1.5">
                    {t("fields.expiryDate")}
                  </label>
                  <input
                    type="date"
                    required
                    value={form.expiryDate}
                    onChange={(e) => updateField("expiryDate", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
                  />
                </div>
              </div>

              {/* Validity warning */}
              {validity && (
                <div
                  className={`p-4 rounded-xl text-sm font-medium ${
                    validity.valid
                      ? "bg-success-soft text-success border border-success/20"
                      : "bg-warning-soft text-warning border border-warning/20"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {validity.valid ? (
                      <svg className="w-5 h-5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      </svg>
                    )}
                    {validity.message}
                  </div>
                </div>
              )}

              {/* Issuing authority + Place */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text mb-1.5">
                    {t("fields.issuingAuthority")}
                  </label>
                  <input
                    type="text"
                    value={form.issuingAuthority}
                    onChange={(e) => updateField("issuingAuthority", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
                    placeholder="Passport Authority"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text mb-1.5">
                    {t("fields.placeOfIssue")}
                  </label>
                  <input
                    type="text"
                    value={form.placeOfIssue}
                    onChange={(e) => updateField("placeOfIssue", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-text placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
                    placeholder="New Delhi"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary text-text-inverse text-sm font-semibold hover:bg-primary-hover active:bg-primary-active transition-colors"
              >
                {t("submit")}
              </button>
            </form>
          </RevealOnScroll>
        )}
      </div>
    </div>
  );
}
