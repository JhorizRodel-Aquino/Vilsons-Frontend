import api from "../utils/axiosInstance";

export const getOtherIncomes = async ({ search, year, month }: { search?: string, year?: number, month?: number }) => {
  const params = {
      ...(search && { search }),
      ...(year && { year }),
      ...(month && { month }),
    };

  try {
    const response = await api.get("/api/other-incomes", { params });
    console.log('Other Incomes:', response.data)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch other incomes:", error);
    throw error;
  }
};
