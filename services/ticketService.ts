import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://ventixeticketservice-gzehf9d8cffzfwed.swedencentral-01.azurewebsites.net/api";

export interface Ticket {
  id: string;
  eventId: string;
  packageId: string;
  userId: string;
  name: string;
}

export const AddTickets = async (
  packageId: string,
  eventId: string,
  userId: string,
  names: string[]
): Promise<Ticket[]> => {
  try {
    const response = await axios.post<Ticket[]>(`${API_URL}/tickets`, {
      packageId,
      eventId,
      userId,
      names,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding tickets:", error);
    throw new Error("Failed to add tickets");
  }
};
