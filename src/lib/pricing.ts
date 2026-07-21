import type { Itinerary } from "./types";

/**
 * All-in pricing engine.
 * Calculates the final price including taxes, surcharges, and any markup.
 */

/** Card surcharge estimate (varies by payment method) */
const CARD_SURCHARGE_PCT = 0.015;

/** Routebird service fee */
const SERVICE_FEE_AUD = 12;

/**
 * Calculate the full breakdown for display.
 * Already computed in the mock adapter, but this re-exports
 * the canonical "all-in" calculation for real use later.
 */
export function calculateAllInPrice(itinerary: Itinerary): {
  baseFare: number;
  taxes: number;
  surcharge: number;
  serviceFee: number;
  totalAllIn: number;
} {
  const baseFare = itinerary.baseFareAUD;
  const taxes = itinerary.taxesAUD;
  const surcharge = Math.round(baseFare * CARD_SURCHARGE_PCT);
  const serviceFee = SERVICE_FEE_AUD;
  const totalAllIn = baseFare + taxes + surcharge + serviceFee;

  return {
    baseFare,
    taxes,
    surcharge,
    serviceFee,
    totalAllIn,
  };
}

/**
 * Format AUD price for display.
 */
export function formatAUD(amount: number): string {
  return `A$${amount.toLocaleString("en-AU")}`;
}

/**
 * Calculate price difference between two itineraries.
 */
export function priceDifference(a: Itinerary, b: Itinerary): number {
  return a.priceAUD - b.priceAUD;
}
