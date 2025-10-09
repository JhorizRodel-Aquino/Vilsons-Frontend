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

type putURL = {
  route: string;
  formData?: Record<string, any>;
};

type removeURL = {
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

export const post = async ({ route, formData }: postURL) => {
  try {
    const response = await api.post(route, formData);
    console.log(route, response.data)
    return response.data;
  } catch (error) {
    console.error(`Failed to create from ${route}:`, error);
    throw error;
  }
};

export const put = async ({ route, formData }: putURL) => {
  try {
    const response = await api.put(route, formData);
    console.log(route, response.data)
    return response.data;
  } catch (error) {
    console.error(`Failed to edit from ${route}:`, error);
    throw error;
  }
};

export const remove = async ({ route, formData }: removeURL) => {
  try {
    const response = await api.delete(route, formData);
    console.log(route, response.data)
    return response.data;
  } catch (error) {
    console.error(`Failed to delete from ${route}:`, error);
    throw error;
  }
};
