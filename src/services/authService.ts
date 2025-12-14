// services/authService.ts
import api from "../utils/axiosInstance";

export type LoginData = {
  username: string;
  password: string;
};

// Store token in memory AND sessionStorage as backup
let inMemoryAccessToken: string | null = null;

export const login = async (loginData: LoginData): Promise<string> => {
  console.log('Login attempt with data:', loginData);
  
  try {
    const response = await api.post("/auth", loginData);
    console.log('Login response received:', response.data);
    
    const { accessToken } = response.data;
    
    if (!accessToken) {
      throw new Error('No access token received from server');
    }
    
    // Store token
    setAccessToken(accessToken);
    console.log('Access token stored:', accessToken.substring(0, 20) + '...');
    
    return accessToken;
  } catch (error: any) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export const refresh = async (): Promise<string> => {
  console.log('Attempting token refresh...');
  
  try {
    const response = await api.get("/refresh");
    console.log('Refresh response:', response.data);
    
    const { accessToken } = response.data;
    
    if (!accessToken) {
      throw new Error('No access token received from refresh');
    }
    
    // Store the new token
    setAccessToken(accessToken);
    console.log('New access token stored');
    
    return accessToken;
  } catch (error: any) {
    console.error('Refresh failed:', error.response?.data || error.message);
    // Clear token on refresh failure
    clearAccessToken();
    throw error;
  }
};

// Store token in both memory and sessionStorage
export const setAccessToken = (token: string): void => {
  inMemoryAccessToken = token;
  sessionStorage.setItem('access_token', token);
  console.log('Token stored in memory and sessionStorage');
};

export const getAccessToken = (): string | null => {
  // First check memory
  if (inMemoryAccessToken) {
    console.log('Getting token from memory');
    return inMemoryAccessToken;
  }
  
  // Fallback to sessionStorage
  const storedToken = sessionStorage.getItem('access_token');
  if (storedToken) {
    console.log('Getting token from sessionStorage');
    inMemoryAccessToken = storedToken;
    return storedToken;
  }
  
  console.log('No token found');
  return null;
};

export const clearAccessToken = (): void => {
  console.log('Clearing access token');
  inMemoryAccessToken = null;
  sessionStorage.removeItem('access_token');
};

export const logout = async (): Promise<void> => {
  try {
    await api.post("/logout");
  } catch (error) {
    console.warn("Logout API call failed");
  } finally {
    clearAccessToken();
    window.location.href = "/login";
  }
};