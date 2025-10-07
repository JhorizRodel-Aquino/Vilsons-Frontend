import api from "../utils/axiosInstance";

export const getTrucks = async ({ startDate, endDate }: { startDate?: string, endDate?: string }) => {
  const params = {
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    };

  try {
    const response = await api.get("/api/trucks", { params });
    console.log('Trucks:', response.data)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch trucks:", error);
    throw error;
  }
};
