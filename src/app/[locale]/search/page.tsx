"use client";

import { useTranslations } from "next-intl";
import { useState, useMemo, type FormEvent } from "react";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { searchMockFlights, getCarrierName, formatDuration } from "@/lib/duffel-mock";
import { screenFares } from "@/lib/visa";
import { formatAUD } from "@/lib/pricing";
import type { AirportCode, Itinerary, PassportNationality } from "@/lib/types";

const AU_ORIGINS: { code: AirportCode; label: string }[] = [
  { code: "MEL", label: "Melbourne MEL" },
  { code: "SYD", label: "Sydney SYD" },
  { code: "BNE", label: "Brisbane BNE" },
];

const DESTINATIONS: { code: AirportCode; label: string }[] = [
  { code: "DEL", label: "Delhi DEL" },
  { code: "BOM", label: "Mumbai BOM" },
  { code: "BLR", label: "Bangalore BLR" },
  { code: "MAA", label: "Chennai MAA" },
  { code: "HYD", label: "Hyderabad HYD" },
  { code: "KUL", label: "Kuala Lumpur KUL" },
  { code: "SIN", label: "Singapore SIN" },
  { code: "BKK", label: "Bangkok BKK" },
  { code: "SGN", label: "Ho Chi Minh City SGN" },
  { code: "HAN", label: "Hanoi HAN" },
  { code: "KTM", label: "Kathmandu KTM" },
  { code: "MNL", label: "Manila MNL" },
];

type SortMode = "cheapest" | "fastest" | "earliest";

export default function SearchPage() {
  const t = useTranslations("search");
  const tR = useTranslations("results");

  const [origin, setOrigin] = useState<AirportCode>("MEL");
  const [destination, setDestination] = useState<AirportCode>("DEL");
  const [departDate, setDepartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split("T")[0];
  });
  const [passengers, setPassengers] = useState(1);
  const [passport, setPassport] = useState<PassportNationality>("IN");
  const [results, setResults] = useState<Itinerary[]>([]);
  const [searched, setSearched] = useState(false);
  const [sort, setSort] = useState<SortMode>("cheapest");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const raw = searchMockFlights({
      origin,
      destination,
      departDate,
      passengers,
      passport,
      tripType: "one_way",
    });
    const screened = screenFares(passport, raw);
    setResults(screened);
    setSearched(true);
    setSelectedId(null);
  }

  const sorted = useMemo(() => {
    const copy = [...results];
    switch (sort) {
      case "cheapest":
        return copy.sort((a, b) => a.priceAUD - b.priceAUD);
      case "fastest":
        return copy.sort(
          (a, b) => a.totalDurationMinutes - b.totalDurationMinutes,
        );
      case "earliest":
        return copy.sort(
          (a, b) =>
            new Date(a.segments[0].departureISO).getTime() -
            new Date(b.segments[0].departureISO).getTime(),
        );
    }
  }, [results, sort]);

  function selectFare(itin: Itinerary) {
    setSelectedId(itin.id);
    // Store in sessionStorage for booking page
    if (typeof window !== "undefined") {
      sessionStorage.setItem("rb_selected_itinerary", JSON.stringify(itin));
      sessionStorage.setItem(
        "rb_search_params",
        JSON.stringify({ origin, destination, departDate, passengers, passport }),
      );
    }
    window.location.href = "/book";
  }

  return (
    <div className="section section--tight">
      <div className="container container--wide">
        {/* Search form */}
        <RevealOnScroll>
          <form
            onSubmit={handleSearch}
            className="mb-8 p-5 rounded-2xl border border-border bg-surface shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto_auto_auto] gap-4 items-end">
              {/* Passport */}
              <div>
                <label className="block text-xs font-semibold text-text-faint uppercase tracking-wider mb-1.5">
                  Passport
                </label>
                <select
                  value={passport}
                  onChange={(e) => setPassport(e.target.value as PassportNationality)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="IN">IN India</option>
                  <option value="CN">CN China</option>
                  <option value="VN">VN Vietnam</option>
                  <option value="PH">PH Philippines</option>
                  <option value="NP">NP Nepal</option>
                </select>
              </div>

              {/* Origin */}
              <div>
                <label className="block text-xs font-semibold text-text-faint uppercase tracking-wider mb-1.5">
                  {t("origin")}
                </label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value as AirportCode)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  {AU_ORIGINS.map((a) => (
                    <option key={a.code} value={a.code}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-end pb-1 text-text-faint">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </div>

              {/* Destination */}
              <div>
                <label className="block text-xs font-semibold text-text-faint uppercase tracking-wider mb-1.5">
                  {t("destination")}
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value as AirportCode)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  {DESTINATIONS.map((a) => (
                    <option key={a.code} value={a.code}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-semibold text-text-faint uppercase tracking-wider mb-1.5">
                  {t("depart")}
                </label>
                <input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-surface text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-primary text-text-inverse text-sm font-semibold hover:bg-primary-hover transition-colors"
              >
                {t("submit")}
              </button>
              <span className="text-xs text-text-faint">{t("flexibility")}</span>
            </div>
          </form>
        </RevealOnScroll>

        {/* Results */}
        {searched && (
          <>
            <RevealOnScroll>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-display text-lg font-bold text-text">
                    {tR("title")}
                  </h2>
                  <p className="text-sm text-text-muted">
                    {results.length === 0
                      ? t("noResults")
                      : `${results.length} fare${results.length !== 1 ? "s" : ""} found`}
                  </p>
                </div>
                {results.length > 0 && (
                  <div className="flex gap-1 p-1 rounded-xl bg-surface-offset border border-border">
                    {(["cheapest", "fastest", "earliest"] as SortMode[]).map(
                      (s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSort(s)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            sort === s
                              ? "bg-primary text-text-inverse shadow-sm"
                              : "text-text-muted hover:text-text"
                          }`}
                        >
                          {tR(`sort.${s}`)}
                        </button>
                      ),
                    )}
                  </div>
                )}
              </div>
            </RevealOnScroll>

            {sorted.length === 0 ? (
              <RevealOnScroll delay={100}>
                <div className="p-10 rounded-2xl border border-border bg-surface text-center">
                  <svg className="w-12 h-12 text-text-faint mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.8 19.2 16 11l3.5-3.5a2.12 2.12 0 0 0-3-3L13 8 4.8 6.2a1 1 0 0 0-.6 1.9l6.3 2.1-2 3-2.5-.5a1 1 0 0 0-.9 1.7l2 1.4 1.4 2a1 1 0 0 0 1.7-.9l-.5-2.5 3-2 2.1 6.3a1 1 0 0 0 1.9-.6z" />
                  </svg>
                  <p className="text-text-muted">{t("noResults")}</p>
                </div>
              </RevealOnScroll>
            ) : (
              <div className="space-y-3">
                {sorted.map((itin, i) => {
                  const route = itin.segments
                    .map((s) => s.origin)
                    .concat(itin.segments[itin.segments.length - 1].destination)
                    .join(" → ");

                  const depTime = new Date(
                    itin.segments[0].departureISO,
                  ).toLocaleTimeString("en-AU", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  });
                  const arrTime = new Date(
                    itin.segments[itin.segments.length - 1].arrivalISO,
                  ).toLocaleTimeString("en-AU", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  });

                  const visaOk = itin.visaStatus === "visa_ok";
                  const transitIssue = itin.visaStatus === "transit_visa_required";
                  const notEligible = itin.visaStatus === "not_eligible";

                  return (
                    <RevealOnScroll key={itin.id} delay={i * 50}>
                      <div
                        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                          notEligible
                            ? "border-error/20 bg-error-soft/30 opacity-50"
                            : transitIssue
                              ? "border-warning/30 bg-warning-soft/30"
                              : selectedId === itin.id
                                ? "border-primary bg-primary-soft/30 shadow-teal"
                                : "border-border bg-surface hover:shadow-md cursor-pointer"
                        }`}
                        onClick={() => {
                          if (!notEligible) selectFare(itin);
                        }}
                        role={!notEligible ? "button" : undefined}
                        tabIndex={!notEligible ? 0 : undefined}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          {/* Route + times */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-bold text-text truncate">
                                {route}
                              </span>
                              <span className="text-xs text-text-faint">
                                {itin.segments.length === 1
                                  ? tR("nonstop")
                                  : `${itin.segments.length - 1} stop${itin.segments.length > 2 ? "s" : ""}`}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-text-muted">
                              <span>
                                {depTime} - {arrTime}
                              </span>
                              <span>{formatDuration(itin.totalDurationMinutes)}</span>
                              <span>
                                {itin.segments
                                  .map((s) => getCarrierName(s.carrier))
                                  .join(" / ")}
                              </span>
                            </div>
                          </div>

                          {/* Visa badge */}
                          <div className="flex items-center gap-2">
                            {visaOk && (
                              <span className="px-2.5 py-1 rounded-lg bg-success-soft text-success text-xs font-semibold">
                                {tR("visaOk")}
                              </span>
                            )}
                            {transitIssue && (
                              <span className="px-2.5 py-1 rounded-lg bg-warning-soft text-warning text-xs font-semibold">
                                {tR("visaTransit")}
                              </span>
                            )}
                            {notEligible && (
                              <span className="px-2.5 py-1 rounded-lg bg-error-soft text-error text-xs font-semibold">
                                {tR("visaBlocked")}
                              </span>
                            )}
                          </div>

                          {/* Price */}
                          <div className="text-right sm:min-w-[100px]">
                            <div className="text-lg font-bold text-text">
                              {formatAUD(itin.priceAUD)}
                            </div>
                            <div className="text-xs text-text-faint">
                              {tR("allIn")} &middot; {tR("perPassenger")}
                            </div>
                          </div>
                        </div>

                        {/* Segment details on expand */}
                        {selectedId === itin.id && (
                          <div className="mt-4 pt-4 border-t border-divider space-y-2">
                            {itin.segments.map((seg, si) => (
                              <div
                                key={si}
                                className="flex items-center gap-3 text-xs text-text-muted"
                              >
                                <span className="font-semibold text-text">
                                  {seg.flightNumber}
                                </span>
                                <span>
                                  {seg.origin} → {seg.destination}
                                </span>
                                <span>
                                  {new Date(
                                    seg.departureISO,
                                  ).toLocaleTimeString("en-AU", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}{" "}
                                  -{" "}
                                  {new Date(
                                    seg.arrivalISO,
                                  ).toLocaleTimeString("en-AU", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                                <span>{formatDuration(seg.durationMinutes)}</span>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                selectFare(itin);
                              }}
                              className="mt-2 px-5 py-2 rounded-xl bg-primary text-text-inverse text-sm font-semibold hover:bg-primary-hover transition-colors"
                            >
                              {tR("select")}
                            </button>
                          </div>
                        )}
                      </div>
                    </RevealOnScroll>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
