import api from "../utils/axiosInstance";

export const getLaborExpenses = async ({ year, month }: { year?: number, month?: number }) => {
  const params = {
      ...(year && { year }),
      ...(month && { month }),
    };

  try {
    const response = await api.get("/api/labors", { params });
    console.log('Labor Expenses:', response.data)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch labor expenses:", error);
    throw error;
  }
};
