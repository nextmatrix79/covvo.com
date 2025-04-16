import axios from "axios";

import { store } from "@/store";

const APIInstances: { [key: string]: any } = {};

const createAPIInstance = (key: string, baseURL: string, prefix?: string) => {
  const api = prefix ? `${baseURL}/${prefix}` : baseURL;

  if (!APIInstances[key]) {
    const instance = axios.create({
      baseURL: `${api}`,
      withCredentials: false,
    });

    instance.interceptors.request.use(
      (config: any) => {
        const state: any = store.getState();
        const token = state.auth?.token;

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
      },
      (error: any) => Promise.reject(error)
    );

    APIInstances[key] = instance;
  }

  return APIInstances[key];
};

// Usage examples:
const API = (prefix?: string) =>
  createAPIInstance("API", process.env.NEXT_PUBLIC_API_BASE_URL || "", prefix);

const setContentType = (type: string) => {
  const APIInstance = API();

  APIInstance.defaults.headers.common["Content-Type"] = type || "application/json";
};

export { API, setContentType };
