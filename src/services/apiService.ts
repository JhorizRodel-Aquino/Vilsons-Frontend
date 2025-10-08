// services/apiService.ts
import api from "../utils/axiosInstance";

type URL = {
  route: string;
  params?: Record<string, any>;
};

export const getData = async ({ route, params = {} }: URL) => {
  try {
    const response = await api.get(route, { params });
    console.log(route, response.data)
    return response.data;
  } catch (error) {
    console.error(`Failed to get from ${route}:`, error);
    throw error;
  }
};


