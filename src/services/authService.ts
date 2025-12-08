import API_URL from "../constants/API_URL";
import axios from "axios";
import { decodeBranches, getBranches } from "../utils/branchOptions";

export type LoginData = {
  username: string;
  password: string;
}

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let inMemoryAccessToken: string | null = null; // 🔐 stored only in memory

export const login = async (loginData: LoginData) => {
  const response = await axios.post(`${API_URL}/auth`, loginData, {
    withCredentials: true, // send cookie for refresh token
  });

  const { accessToken } = response.data;
  inMemoryAccessToken = accessToken;

  // while (!getBranches()) {
  //   decodeBranches();
  //   await sleep(1000);
  // }

  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  return accessToken;
};

export const getAccessToken = () => inMemoryAccessToken;
export const clearAccessToken = () => {
  inMemoryAccessToken = null;
};



// services/authService.ts (continued)
export const refresh = async () => {
  const response = await axios.get(`${API_URL}/refresh`, {
    withCredentials: true, // send cookie to backend
  });

  const { accessToken } = response.data;
  inMemoryAccessToken = accessToken;

  // while (!getBranches()) {
  //   decodeBranches();
  //   await sleep(1000);
  // }

  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  return accessToken;
};