import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Events Utility Functions
export function getEventStatus(ticketSalesStart?: Date, end?: Date) {
  if (ticketSalesStart && end) {
    const now = new Date();
    if (now < ticketSalesStart) {
      return "Draft";
    } else if (now > end) {
      return "Past";
    } else {
      return "Active";
    }
  }
}

export function getEventSalesProcent(
  ticketsSold?: number,
  totalTickets?: number
) {
  if (ticketsSold && totalTickets) {
    return Math.round((ticketsSold / totalTickets) * 100);
  }
  return 0;
}

export function getEventLocation(
  venue: string,
  city?: string,
  state?: string,
  country?: string
) {
  let locationParts = [venue, city, country].filter(Boolean);
  if (state) {
    state = state.toUpperCase();
    locationParts = [venue, city, state].filter(Boolean);
  }
  return locationParts.join(", ");
}
