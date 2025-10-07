import api from "../utils/axiosInstance";

export const getMaterialExpenses = async ({ year, month }: { year?: number, month?: number }) => {
  const params = {
      ...(year && { year }),
      ...(month && { month }),
    };

  try {
    const response = await api.get("/api/materials", { params });
    console.log('Material Expenses:', response.data)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch material expenses:", error);
    throw error;
  }
};
