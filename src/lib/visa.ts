import type {
  PassportNationality,
  AirportCode,
  VisaRule,
  Itinerary,
  FlightSegment,
} from "./types";
import visaRulesData from "./visa-rules.json";

const rules = visaRulesData.rules as VisaRule[];
const transitRules = visaRulesData.transitRules as Record<
  string,
  { visaFreeTransit: boolean; maxHours: number; notes: string }
>;

export type VisaStatus =
  | "visa_ok"
  | "transit_visa_required"
  | "not_eligible";

export interface VisaResult {
  status: VisaStatus;
  notes: string;
  destinationRule: VisaRule | null;
  transitIssues: string[];
}

/**
 * Look up the visa rule for a passport + destination combo.
 */
function getDestinationRule(
  passport: PassportNationality,
  destination: AirportCode,
): VisaRule | null {
  return (
    rules.find(
      (r) => r.passport === passport && r.destination === destination,
    ) ?? null
  );
}

/**
 * Check if a transit hub is safe for this passport (no transit visa needed).
 */
function checkTransit(
  passport: PassportNationality,
  hub: AirportCode,
): { safe: boolean; notes: string } {
  const hubRule = transitRules[hub];
  if (!hubRule) {
    return { safe: false, notes: `Unknown transit hub: ${hub}` };
  }

  // AU hubs always need transit visa for Asian passports
  if (["MEL", "SYD", "BNE", "PER", "ADL", "CBR"].includes(hub)) {
    // Check if there's a specific rule for this passport+hub
    const rule = getDestinationRule(passport, hub);
    if (rule?.transitVisaRequired) {
      return {
        safe: false,
        notes: `Transit visa required at ${hub}`,
      };
    }
  }

  if (!hubRule.visaFreeTransit) {
    return {
      safe: false,
      notes: hubRule.notes,
    };
  }

  return { safe: true, notes: hubRule.notes };
}

/**
 * Screen an itinerary's transit segments for visa issues.
 */
export function screenItinerary(
  passport: PassportNationality,
  itinerary: Itinerary,
): VisaResult {
  const destination = itinerary.segments[itinerary.segments.length - 1]
    .destination as AirportCode;
  const destRule = getDestinationRule(passport, destination);
  const transitIssues: string[] = [];

  // Check destination eligibility
  if (!destRule) {
    return {
      status: "not_eligible",
      notes: `No visa information available for ${passport} passport holders traveling to ${destination}.`,
      destinationRule: null,
      transitIssues: [],
    };
  }

  // Check transit hubs (all intermediate stops)
  const stops = itinerary.segments.map((s) => s.destination as AirportCode);
  const uniqueHubs = [...new Set(stops.slice(0, -1))];

  for (const hub of uniqueHubs) {
    // Skip if hub is origin or destination
    if (hub === itinerary.segments[0].origin) continue;

    const transitCheck = checkTransit(passport, hub);
    if (!transitCheck.safe) {
      transitIssues.push(`${hub}: ${transitCheck.notes}`);
    }
  }

  // Determine final status
  if (transitIssues.length > 0) {
    return {
      status: "transit_visa_required",
      notes: `Transit visa required at: ${uniqueHubs.join(", ")}. ${
        destRule.notes
      }`,
      destinationRule: destRule,
      transitIssues,
    };
  }

  return {
    status: "visa_ok",
    notes: destRule.notes,
    destinationRule: destRule,
    transitIssues: [],
  };
}

/**
 * Screen a single segment's destination for visa info.
 */
export function screenDestination(
  passport: PassportNationality,
  destination: AirportCode,
): VisaResult {
  const rule = getDestinationRule(passport, destination);
  if (!rule) {
    return {
      status: "not_eligible",
      notes: `No visa information available for ${passport} passport holders traveling to ${destination}.`,
      destinationRule: null,
      transitIssues: [],
    };
  }

  // For destinations where the user holds that passport (e.g., IN → DEL),
  // it's always visa_ok (they're going home)
  if (passport === "IN" && ["DEL", "BOM", "BLR", "MAA", "CCU", "HYD"].includes(destination)) {
    return {
      status: "visa_ok",
      notes: "Returning to home country — valid passport assumed.",
      destinationRule: rule,
      transitIssues: [],
    };
  }

  return {
    status: rule.visaFreeDays !== null || rule.eVisa ? "visa_ok" : "not_eligible",
    notes: rule.notes,
    destinationRule: rule,
    transitIssues: [],
  };
}

/**
 * Screen all itineraries and filter/sort by visa status.
 * Returns itineraries with visa status attached.
 */
export function screenFares(
  passport: PassportNationality,
  itineraries: Itinerary[],
): Itinerary[] {
  return itineraries
    .map((itin) => {
      const result = screenItinerary(passport, itin);
      return {
        ...itin,
        visaStatus: result.status,
        visaNotes: result.notes,
      };
    })
    .sort((a, b) => {
      // visa_ok first, then transit_visa_required, then not_eligible
      const order = { visa_ok: 0, transit_visa_required: 1, not_eligible: 2 };
      return order[a.visaStatus] - order[b.visaStatus];
    });
}
