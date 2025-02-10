// client/src/services/api.service.ts
import axios, { AxiosError } from "axios";
import { API_URL } from "../constants/config";
import * as SecureStore from "expo-secure-store";
import { TOKEN_KEY } from "../constants/config";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for handling auth errors
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear token from secure storage
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      // Clear token from headers
      setAuthToken(null);
    }
    return Promise.reject(error);
  }
);

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
