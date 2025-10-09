// services/apiService.ts
import api from "../utils/axiosInstance";

type getURL = {
  route: string;
  params?: Record<string, any>;
};
type postURL = {
  route: string;
  formData?: Record<string, any>;
};

export const get = async ({ route, params = {} }: getURL) => {
  try {
    const response = await api.get(route, { params });
    console.log(route, response.data)
    return response.data;
  } catch (error) {
    console.error(`Failed to get from ${route}:`, error);
    throw error;
  }
};

export const post = async ({ route, formData = {} }: postURL) => {
  try {
    const response = await api.post(route, formData);
    console.log(route, response.data)
    return response.data;
  } catch (error) {
    console.error(`Failed to get from ${route}:`, error);
    throw error;
  }
};

