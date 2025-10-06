import API_URL from "../constants/API_URL";
import axios from "axios";

export type LoginData = { 
    username: string; 
    password: string; 
}

let inMemoryAccessToken: string | null = null; // 🔐 stored only in memory

export const refresh = async () => {
  const response = await axios.get(`${API_URL}/refresh`, {
    withCredentials: true, // send cookie to backend
  });

  const { accessToken } = response.data;
  inMemoryAccessToken = accessToken;
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  return accessToken;
};