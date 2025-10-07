import api from "../utils/axiosInstance";

export const getOtherIncomes = async ({ year, month }: { year?: number, month?: number }) => {
  const params = {
      ...(year && { year }),
      ...(month && { month }),
    };

  try {
    const response = await api.get("/api/other-incomes", { params });
    console.log('Other Income:', response.data)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch other incomes:", error);
    throw error;
  }
};
