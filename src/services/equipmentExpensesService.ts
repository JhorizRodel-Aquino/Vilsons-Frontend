import api from "../utils/axiosInstance";

export const getEquipmentExpenses = async ({ year, month }: { year?: number, month?: number }) => {
  const params = {
      ...(year && { year }),
      ...(month && { month }),
    };

  try {
    const response = await api.get("/api/equipments", { params });
    console.log('Equipment Expenses:', response.data)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch equipment expenses:", error);
    throw error;
  }
};
