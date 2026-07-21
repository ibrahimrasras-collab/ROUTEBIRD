"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, type FormEvent } from "react";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { getCarrierName, formatDuration } from "@/lib/duffel-mock";
import { formatAUD } from "@/lib/pricing";
import type { Itinerary, PassengerDetails, Booking } from "@/lib/types";

function generateRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "RB-";
  for (let i = 0; i < 6; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return ref;
}

export default function BookPage() {
  const t = useTranslations("book");

  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<PassengerDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "M",
    nationality: "IN",
    passportNumber: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("rb_selected_itinerary");
      if (stored) {
        setItinerary(JSON.parse(stored));
      }
      const passport = localStorage.getItem("rb_passport");
      if (passport) {
        const p = JSON.parse(passport);
        setForm((prev) => ({
          ...prev,
          nationality: p.nationality,
          passportNumber: p.passportNumber,
          firstName: p.nameInPassport.split(" ")[0] || "",
          lastName: p.nameInPassport.split(" ").slice(1).join(" ") || "",
          dateOfBirth: p.dateOfBirth,
          gender: p.gender,
        }));
      }
    }
  }, []);

  function updateField<K extends keyof PassengerDetails>(
    key: K,
    value: PassengerDetails[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!itinerary) return;

    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const newBooking: Booking = {
        id: crypto.randomUUID?.() ?? Date.now().toString(),
        reference: generateRef(),
        itinerary,
        passenger: form,
        status: "confirmed",
        createdAtISO: new Date().toISOString(),
        totalPaidAUD: itinerary.priceAUD,
      };
      setBooking(newBooking);
      setLoading(false);
    }, 1500);
  }

  // No itinerary selected — redirect to search
  if (!itinerary && typeof window !== "undefined") {
    return (
      <div className="section">
        <div className="container container--narrow text-center">
          <svg className="w-12 h-12 text-text-faint mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.8 19.2 16 11l3.5-3.5a2.12 2.12 0 0 0-3-3L13 8 4.8 6.2a1 1 0 0 0-.6 1.9l6.3 2.1-2 3-2.5-.5a1 1 0 0 0-.9 1.7l2 1.4 1.4 2a1 1 0 0 0 1.7-.9l-.5-2.5 3-2 2.1 6.3a1 1 0 0 0 1.9-.6z" />
          </svg>
          <p className="text-text-muted mb-4">No fare selected. Search first.</p>
          <a
            href="/search"
            className="inline-flex items-center px-5 py-2.5 rounded-xl bg-primary text-text-inverse text-sm font-semibold hover:bg-primary-hover transition-colors"
          >
            Go to search
          </a>
        </div>
      </div>
    );
  }

  // Confirmed booking
  if (booking) {
    return (
      <div className="section">
        <div className="container container--narrow">
          <RevealOnScroll>
            <div className="text-center p-8 sm:p-12 rounded-3xl border border-success bg-success-soft">
              <div className="w-16 h-16 rounded-full bg-success text-white flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-text mb-2">
                {t("confirmed.title")}
              </h1>
              <p className="text-text-muted mb-6 max-w-md mx-auto">
                {t("confirmed.sub", { email: booking.passenger.email })}
              </p>

              <div className="inline-block p-5 rounded-2xl bg-surface border border-border text-left">
                <div className="text-xs text-text-faint uppercase tracking-wider mb-1">
                  {t("confirmed.reference")}
                </div>
                <div className="font-mono text-2xl font-bold text-primary tracking-wider">
                  {booking.reference}
                </div>

                <div className="mt-4 pt-4 border-t border-divider space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Passenger</span>
                    <span className="font-semibold text-text">
                      {booking.passenger.firstName} {booking.passenger.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Route</span>
                    <span className="font-semibold text-text">
                      {booking.itinerary.segments[0].origin} →{" "}
                      {booking.itinerary.segments[booking.itinerary.segments.length - 1].destination}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Total paid</span>
                    <span className="font-bold text-text">
                      {formatAUD(booking.totalPaidAUD)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="/search"
                  className="inline-flex items-center px-5 py-2.5 rounded-xl border border-border text-text text-sm font-semibold hover:bg-surface-offset transition-colors"
                >
                  {t("confirmed.back")}
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    );
  }

  // Booking form
  return (
    <div className="section section--tight">
      <div className="container container--wide">
        <RevealOnScroll>
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">
              Step 3 of 3
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">
              {t("title")}
            </h1>
            <p className="text-text-muted">{t("sub")}</p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          {/* Form */}
          <RevealOnScroll delay={80}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Passenger details */}
              <div className="p-5 rounded-2xl border border-border bg-surface">
                <h2 className="font-display font-bold text-base mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {t("passenger")}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-faint mb-1.5">
                      {t("firstName")}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-faint mb-1.5">
                      {t("lastName")}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-faint mb-1.5">
                      {t("email")}
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-faint mb-1.5">
                      {t("phone")}
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                      placeholder="+61 4XX XXX XXX"
                    />
                  </div>
                </div>
              </div>

              {/* Payment (mock) */}
              <div className="p-5 rounded-2xl border border-border bg-surface">
                <h2 className="font-display font-bold text-base mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" />
                    <path d="M1 10h22" />
                  </svg>
                  {t("payment")}
                </h2>
                <p className="text-xs text-text-faint mb-3">
                  {t("payNow")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-faint mb-1.5">
                      Card number
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-surface text-text text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40"
                      placeholder="4242 4242 4242 4242"
                      defaultValue="4242 4242 4242 4242"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-faint mb-1.5">
                        Expiry
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2.5 rounded-xl border border-border bg-surface text-text text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40"
                        placeholder="MM/YY"
                        defaultValue="12/28"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-faint mb-1.5">
                        CVC
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2.5 rounded-xl border border-border bg-surface text-text text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40"
                        placeholder="123"
                        defaultValue="123"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-primary text-text-inverse text-sm font-semibold hover:bg-primary-hover active:bg-primary-active transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                      <path d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  t("confirm")
                )}
              </button>
            </form>
          </RevealOnScroll>

          {/* Order summary sidebar */}
          {itinerary && (
            <RevealOnScroll delay={160}>
              <div className="lg:sticky lg:top-20 p-5 rounded-2xl border border-border bg-surface h-fit">
                <h3 className="font-display font-bold text-sm mb-3">{t("flight")}</h3>

                <div className="space-y-3 mb-4">
                  {itinerary.segments.map((seg, i) => (
                    <div key={i} className="text-sm">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-text">
                          {seg.flightNumber}
                        </span>
                        <span className="text-xs text-text-faint">
                          {getCarrierName(seg.carrier)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-text-muted">
                        <span>
                          {new Date(seg.departureISO).toLocaleTimeString("en-AU", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          {seg.origin}
                        </span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                        <span>
                          {new Date(seg.arrivalISO).toLocaleTimeString("en-AU", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          {seg.destination}
                        </span>
                      </div>
                      <div className="text-xs text-text-faint mt-0.5">
                        {formatDuration(seg.durationMinutes)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-divider space-y-2 text-sm">
                  <div className="flex justify-between text-text-muted">
                    <span>Base fare</span>
                    <span>{formatAUD(itinerary.baseFareAUD)}</span>
                  </div>
                  <div className="flex justify-between text-text-muted">
                    <span>Taxes</span>
                    <span>{formatAUD(itinerary.taxesAUD)}</span>
                  </div>
                  <div className="flex justify-between text-text-muted">
                    <span>Surcharge</span>
                    <span>{formatAUD(itinerary.surchargeAUD)}</span>
                  </div>
                  <div className="pt-2 border-t border-divider flex justify-between font-bold text-text">
                    <span>{t("totalDue")}</span>
                    <span className="text-primary">{formatAUD(itinerary.priceAUD)}</span>
                  </div>
                  <p className="text-xs text-text-faint">{t("allIn")}</p>
                </div>
              </div>
            </RevealOnScroll>
          )}
        </div>
      </div>
    </div>
  );
}
