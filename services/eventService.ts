import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://ventixeeventservice2-ctebdcb6cbb2dybe.swedencentral-01.azurewebsites.net/api";

export interface Benefit {
  id?: number;
  description: string;
}

export interface Packages {
  id?: string;
  eventId?: string;
  name: string;
  price: number;
  description: string;
  seated: boolean;
  placement: string;
  benefits: Benefit[];
}

export interface EventProps {
  id?: string;
  eventName: string;
  eventDescription: string;
  venue: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  startDate: string;
  endDate: string;
  ticketSalesStart: string;
  eventImageUrl: string;
  maxAttendees: number;
  attendeesCount: number;
  packages: Packages[];
}

export const getAllEvents = async (): Promise<EventProps[]> => {
  const response = await axios.get(`${API_URL}/events`);
  return await response.data;
};

export const getEvent = async (id: string): Promise<EventProps> => {
  const response = await axios.get(`${API_URL}/events/${id}`);
  return await response.data;
};

export const AddEvent = async (
  event: Omit<EventProps, "id" | "attendeesCount">
): Promise<EventProps> => {
  // Create a copy with formatted prices
  const eventWithFormattedPrices = {
    ...event,
    packages: event.packages.map((pkg) => ({
      ...pkg,
      price: parseFloat(Number(pkg.price).toFixed(2)),
    })),
  };

  console.log("Adding event:", eventWithFormattedPrices);
  const response = await axios.post(
    `${API_URL}/events`,
    eventWithFormattedPrices
  );
  return await response.data;
};
