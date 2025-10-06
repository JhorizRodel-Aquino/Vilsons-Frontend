import api from "../utils/axiosInstance";

export const getOtherIncome = async () => {
  try {
    const response = await api.get("/api/other-incomes");
    console.log('Other Income:', response.data)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch other incomes:", error);
    throw error;
  }
};
