import api from "../utils/axiosInstance";

export const getRevenueAndProfit = async ({ year, month }: { year?: number, month?: number }) => {
  try {
    const params = {
      ...(year && { year }),
      ...(month && { month }),
    };

    const response = await api.get("/api/finances", { params });
    console.log("Finances:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch finances:", error);
    throw error;
  }
};
