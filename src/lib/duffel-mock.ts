import type {
  AirportCode,
  FlightSegment,
  Itinerary,
  SearchParams,
} from "./types";

/**
 * Mock Duffel search adapter.
 * Returns deterministic fixtures for MEL ⇄ DEL corridor.
 * No live API key needed — all data is synthetic.
 */

interface MockCarrier {
  code: string;
  name: string;
}

const carriers: Record<string, MockCarrier> = {
  AK: { code: "AK", name: "AirAsia" },
  TR: { code: "TR", name: "Scoot" },
  FD: { code: "FD", name: "Thai AirAsia" },
  TL: { code: "TL", name: "Thai Lion Air" },
  GA: { code: "GA", name: "Garuda Indonesia" },
  MH: { code: "MH", name: "Malaysia Airlines" },
  SQ: { code: "SQ", name: "Singapore Airlines" },
  TG: { code: "TG", name: "Thai Airways" },
  JQ: { code: "JQ", name: "Jetstar" },
  AI: { code: "AI", name: "Air India" },
  QF: { code: "QF", name: "Qantas" },
  VA: { code: "VA", name: "Virgin Australia" },
};

const airportNames: Record<string, string> = {
  MEL: "Melbourne",
  SYD: "Sydney",
  BNE: "Brisbane",
  DEL: "Delhi",
  BOM: "Mumbai",
  BLR: "Bangalore",
  KUL: "Kuala Lumpur",
  SIN: "Singapore",
  BKK: "Bangkok",
  HKT: "Phuket",
  SGN: "Ho Chi Minh City",
  HAN: "Hanoi",
  CGK: "Jakarta",
  HKG: "Hong Kong",
  PVG: "Shanghai",
  PEK: "Beijing",
  ICN: "Seoul",
  NRT: "Tokyo",
  KIX: "Osaka",
  TPE: "Taipei",
  MNL: "Manila",
  KTM: "Kathmandu",
};

function airportName(code: string): string {
  return airportNames[code] ?? code;
}

function makeSegment(
  carrier: string,
  flightNo: string,
  origin: AirportCode,
  destination: AirportCode,
  depHour: number,
  durationMin: number,
  aircraft: string,
): FlightSegment {
  const dep = new Date("2025-12-15T00:00:00Z");
  dep.setUTCHours(depHour, 0, 0, 0);
  const arr = new Date(dep.getTime() + durationMin * 60000);
  return {
    carrier,
    flightNumber: `${carrier}${flightNo}`,
    origin,
    destination,
    departureISO: dep.toISOString(),
    arrivalISO: arr.toISOString(),
    durationMinutes: durationMin,
    aircraft,
  };
}

function makeItinerary(
  id: string,
  segments: FlightSegment[],
  baseFare: number,
): Itinerary {
  if (segments.length === 0) {
    throw new Error("Itinerary must have at least one segment");
  }
  const firstDep = new Date(segments[0].departureISO).getTime();
  const lastArr = new Date(segments[segments.length - 1].arrivalISO).getTime();
  let totalDuration = lastArr - firstDep;
  // Handle overnight flights: if arrival is before departure, add 24h
  if (totalDuration < 0) {
    totalDuration += 24 * 60 * 60 * 1000;
  }
  totalDuration /= 60000;
  // Fallback: if still not positive, sum segment durations
  if (totalDuration <= 0) {
    totalDuration = segments.reduce((sum, s) => sum + s.durationMinutes, 0);
  }

  const taxes = Math.round(baseFare * 0.12);
  const surcharge = Math.round(baseFare * 0.03);

  return {
    id,
    segments,
    totalDurationMinutes: Math.round(totalDuration),
    priceAUD: baseFare + taxes + surcharge,
    baseFareAUD: baseFare,
    taxesAUD: taxes,
    surchargeAUD: surcharge,
    visaStatus: "visa_ok",
    visaNotes: "",
  };
}

/**
 * Generate mock itineraries for a search.
 * For MEL→DEL: various transit combos through KUL/SIN/BKK.
 * For DEL→MEL: reverse direction.
 */
export function searchMockFlights(
  params: SearchParams,
): Itinerary[] {
  const { origin, destination } = params;
  const dateStr = params.departDate;

  // MEL → DEL (and reverse)
  const isMelDel =
    (origin === "MEL" && destination === "DEL") ||
    (origin === "DEL" && destination === "MEL");

  if (isMelDel) {
    const dep = origin === "MEL";
    return generateMelDel(dateStr, dep);
  }

  // Fallback: generic route
  return generateGeneric(origin, destination, dateStr);
}

function generateMelDel(dateStr: string, departFromMel: boolean): Itinerary[] {
  const origin: AirportCode = departFromMel ? "MEL" : "DEL";
  const dest: AirportCode = departFromMel ? "DEL" : "MEL";

  // Parse date for segment times
  const baseDate = new Date(dateStr + "T00:00:00Z");

  function makeSeg(
    carrier: string,
    flightNo: string,
    orig: AirportCode,
    arr: AirportCode,
    depHour: number,
    durMin: number,
    aircraft: string,
  ): FlightSegment {
    const dep = new Date(baseDate);
    dep.setUTCHours(depHour, 0, 0, 0);
    const ar = new Date(dep.getTime() + durMin * 60000);
    return {
      carrier,
      flightNumber: `${carrier}${flightNo}`,
      origin: orig,
      destination: arr,
      departureISO: dep.toISOString(),
      arrivalISO: ar.toISOString(),
      durationMinutes: durMin,
      aircraft,
    };
  }

  if (departFromMel) {
    // MEL → KUL → DEL (AirAsia via KL)
    const s1 = makeSeg("AK", "46", "MEL", "KUL", 8, 190, "A320neo");
    const s2 = makeSeg("AK", "102", "KUL", "DEL", 15, 300, "A330-300");
    const itin1 = makeItinerary("mel-kul-del-1", [s1, s2], 580);

    // MEL → SIN → DEL (Scoot via Singapore)
    const s3 = makeSeg("TR", "18", "MEL", "SIN", 9, 210, "Boeing 787-9");
    const s4 = makeSeg("TR", "282", "SIN", "DEL", 16, 320, "Boeing 787-9");
    const itin2 = makeItinerary("mel-sin-del-2", [s3, s4], 620);

    // MEL → BKK → DEL (Thai AirAsia — transit visa issue for IN passport)
    const s5 = makeSeg("FD", "196", "MEL", "BKK", 22, 360, "A330-300");
    const s6 = makeSeg("FD", "3342", "BKK", "DEL", 8, 300, "A321neo");
    const itin3 = makeItinerary("mel-bkk-del-3", [s5, s6], 520);

    // MEL → KUL → DEL (Malaysia Airlines — premium)
    const s7 = makeSeg("MH", "128", "MEL", "KUL", 10, 195, "Boeing 737-800");
    const s8 = makeSeg("MH", "190", "KUL", "DEL", 18, 310, "A350-900");
    const itin4 = makeItinerary("mel-kul-del-4", [s7, s8], 890);

    // MEL → SIN → DEL (Singapore Airlines — premium)
    const s9 = makeSeg("SQ", "246", "MEL", "SIN", 14, 200, "A350-900");
    const s10 = makeSeg("SQ", "402", "SIN", "DEL", 20, 315, "A350-900");
    const itin5 = makeItinerary("mel-sin-del-5", [s9, s10], 1240);

    // MEL → BKK → DEL (Thai Airways — premium, transit visa issue)
    const s11 = makeSeg("TG", "462", "MEL", "BKK", 11, 370, "Boeing 777-300ER");
    const s12 = makeSeg("TG", "316", "BKK", "DEL", 19, 295, "Boeing 787-8");
    const itin6 = makeItinerary("mel-bkk-del-6", [s11, s12], 1080);

    // Direct-ish: MEL → DEL via SIN with short layover
    const s13 = makeSeg("JQ", "7", "MEL", "SIN", 6, 215, "Boeing 787-8");
    const s14 = makeSeg("AI", "313", "SIN", "DEL", 12, 340, "Boeing 787-8");
    const itin7 = makeItinerary("mel-sin-del-7", [s13, s14], 740);

    return [itin1, itin2, itin3, itin4, itin5, itin6, itin7];
  }

  // DEL → MEL (reverse)
  const r1s1 = makeSeg("AI", "302", "DEL", "SIN", 1, 330, "Boeing 787-8");
  const r1s2 = makeSeg("AI", "301", "SIN", "MEL", 8, 480, "Boeing 787-8");
  const r1 = makeItinerary("del-sin-mel-1", [r1s1, r1s2], 650);

  const r2s1 = makeSeg("AK", "101", "DEL", "KUL", 2, 310, "A330-300");
  const r2s2 = makeSeg("AK", "45", "KUL", "MEL", 8, 195, "A320neo");
  const r2 = makeItinerary("del-kul-mel-2", [r2s1, r2s2], 560);

  const r3s1 = makeSeg("MH", "189", "DEL", "KUL", 23, 300, "A350-900");
  const r3s2 = makeSeg("MH", "127", "KUL", "MEL", 7, 200, "Boeing 737-800");
  const r3 = makeItinerary("del-kul-mel-3", [r3s1, r3s2], 870);

  const r4s1 = makeSeg("SQ", "401", "DEL", "SIN", 0, 325, "A350-900");
  const r4s2 = makeSeg("SQ", "245", "SIN", "MEL", 7, 490, "A350-900");
  const r4 = makeItinerary("del-sin-mel-4", [r4s1, r4s2], 1200);

  const r5s1 = makeSeg("TG", "315", "DEL", "BKK", 1, 280, "Boeing 787-8");
  const r5s2 = makeSeg("TG", "461", "BKK", "MEL", 8, 380, "Boeing 777-300ER");
  const r5 = makeItinerary("del-bkk-mel-5", [r5s1, r5s2], 1050);

  return [r1, r2, r3, r4, r5];
}

function generateGeneric(
  origin: AirportCode,
  destination: AirportCode,
  dateStr: string,
): Itinerary[] {
  const baseDate = new Date(dateStr + "T00:00:00Z");

  function makeSeg(
    carrier: string,
    flightNo: string,
    orig: AirportCode,
    arr: AirportCode,
    depHour: number,
    durMin: number,
  ): FlightSegment {
    const dep = new Date(baseDate);
    dep.setUTCHours(depHour, 0, 0, 0);
    const ar = new Date(dep.getTime() + durMin * 60000);
    return {
      carrier,
      flightNumber: `${carrier}${flightNo}`,
      origin: orig,
      destination: arr,
      departureISO: dep.toISOString(),
      arrivalISO: ar.toISOString(),
      durationMinutes: durMin,
      aircraft: "A320neo",
    };
  }

  // Generate a couple of generic itineraries
  const s1 = makeSeg("AK", "100", origin, "KUL", 8, 420);
  const s2 = makeSeg("AK", "200", "KUL", destination, 14, 360);
  const itin1 = makeItinerary(`${origin}-kul-${destination}-1`, [s1, s2], 680);

  const s3 = makeSeg("TR", "10", origin, "SIN", 10, 400);
  const s4 = makeSeg("TR", "200", "SIN", destination, 16, 380);
  const itin2 = makeItinerary(`${origin}-sin-${destination}-2`, [s3, s4], 720);

  return [itin1, itin2];
}

/**
 * Get carrier display name.
 */
export function getCarrierName(code: string): string {
  return carriers[code]?.name ?? code;
}

/**
 * Get airport display name.
 */
export function getAirportName(code: string): string {
  return airportName(code);
}

/**
 * Format duration in minutes to "Xh Ym".
 */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}
