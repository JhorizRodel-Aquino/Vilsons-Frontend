import api from "../utils/axiosInstance";

export const getOverheadExpenses = async ({ year, month }: { year?: number, month?: number }) => {
  const params = {
      ...(year && { year }),
      ...(month && { month }),
    };

  try {
    const response = await api.get("/api/overheads", { params });
    console.log('Overhead Expenses:', response.data)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch overhead expenses:", error);
    throw error;
  }
};
