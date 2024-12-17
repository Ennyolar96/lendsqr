import axios from "axios";

interface FetcherMethods {
  get: (uri: string, params?: {}) => Promise<any>;
  post: (uri: string, data?: {}) => Promise<any>;
  put: (uri: string, data?: {}) => Promise<any>;
  delete: (uri: string) => Promise<any>;
}

export const Fetcher = (method: keyof FetcherMethods, token?: string) => {
  return async (uri: string, payload?: {}) => {
    try {
      const headers: Record<string, string> = token
        ? { Authorization: `Bearer ${token}` }
        : {};

      const response = await axios({
        method,
        url: uri,
        headers,
        ...(method === "get" || method === "delete"
          ? { params: payload }
          : { data: payload }),
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };
};
