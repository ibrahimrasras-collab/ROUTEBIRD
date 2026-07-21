export type PassportNationality = "IN" | "CN" | "VN" | "PH" | "NP";

export type AirportCode =
  | "MEL"
  | "SYD"
  | "BNE"
  | "PER"
  | "ADL"
  | "CBR"
  | "DEL"
  | "BOM"
  | "BLR"
  | "MAA"
  | "CCU"
  | "HYD"
  | "KUL"
  | "SIN"
  | "BKK"
  | "HKT"
  | "SGN"
  | "HAN"
  | "MNL"
  | "KTM"
  | "CGK"
  | "TPE"
  | "HKG"
  | "SZX"
  | "CAN"
  | "PVG"
  | "PEK"
  | "ICN"
  | "NRT"
  | "KIX";

export interface VisaRule {
  passport: PassportNationality;
  destination: AirportCode;
  /** Visa-free days on arrival; null = visa required before travel */
  visaFreeDays: number | null;
  /** E-visa available? */
  eVisa: boolean;
  /** Transit without visa allowed at this hub? */
  transitWithoutVisa: boolean;
  /** Max transit hours without visa */
  transitMaxHours: number;
  /** Transit visa required even for short layovers */
  transitVisaRequired: boolean;
  /** Notes for user-facing display */
  notes: string;
}

export interface FlightSegment {
  carrier: string;
  flightNumber: string;
  origin: AirportCode;
  destination: AirportCode;
  departureISO: string;
  arrivalISO: string;
  durationMinutes: number;
  aircraft: string;
}

export interface Itinerary {
  id: string;
  segments: FlightSegment[];
  totalDurationMinutes: number;
  priceAUD: number;
  /** Breakdown */
  baseFareAUD: number;
  taxesAUD: number;
  surchargeAUD: number;
  /** Visa status after screening */
  visaStatus: "visa_ok" | "transit_visa_required" | "not_eligible";
  visaNotes: string;
}

export interface SearchParams {
  origin: AirportCode;
  destination: AirportCode;
  departDate: string; // YYYY-MM-DD
  returnDate?: string;
  passengers: number;
  passport: PassportNationality;
  tripType: "one_way" | "round_trip";
}

export interface PassengerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: "M" | "F" | "X";
  nationality: PassportNationality;
  passportNumber: string;
}

export interface Booking {
  id: string;
  reference: string;
  itinerary: Itinerary;
  passenger: PassengerDetails;
  status: "confirmed" | "pending" | "cancelled";
  createdAtISO: string;
  totalPaidAUD: number;
}
