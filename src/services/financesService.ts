import api from "../utils/axiosInstance";

export const getFinances = async ({ year, month }: {year?: number, month?: number}) => {
  try {
    // Build query params dynamically
    const params: Record<string, number> = {};
    if (month !== undefined) params.month = month;
    if (year !== undefined) params.year = year;

    const response = await api.get("/api/finances", { params });
    console.log("Finances:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch finances:", error);
    throw error;
  }
};
