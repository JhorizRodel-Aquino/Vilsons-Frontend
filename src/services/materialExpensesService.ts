import api from "../utils/axiosInstance";

export const getMaterialExpenses = async ({ search, year, month }: { search?: string, year?: number, month?: number }) => {
  const params = {
      ...(search && { search }),
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
