import axios from "axios";

// api
import AuthService from "@/api/auth/auth.service";

// utils
import { normalizeAxiosError } from "@/utils/normalizeAxiosError";

export const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as any;

    const isAuthEndpoint =
      originalRequest?.url?.includes("/auth/login") || originalRequest?.url?.includes("/auth/register");

    if (
      error?.response?.status === 401 &&
      !originalRequest?._isRetry &&
      !originalRequest?.url?.includes("/auth/refresh") &&
      !isAuthEndpoint
    ) {
      originalRequest._isRetry = true;
      try {
        await AuthService.refresh();
        return instance.request(originalRequest);
      } catch (err) {
        // try {
        //   await AuthService.logout();
        // } catch {}
        return Promise.reject(normalizeAxiosError(err));
      }
    }

    if (originalRequest?.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    return Promise.reject(normalizeAxiosError(error));
  }
);

export async function httpGet<T>(url: string, config?: any): Promise<T> {
  const { data } = await instance.get<T>(url, config);
  return data;
}
export async function httpPost<T>(url: string, body?: any, config?: any): Promise<T> {
  const { data } = await instance.post<T>(url, body, config);
  return data;
}
export async function httpPatch<T>(url: string, body?: any, config?: any): Promise<T> {
  const { data } = await instance.patch<T>(url, body, config);
  return data;
}
export async function httpDelete<T>(url: string, config?: any): Promise<T> {
  const { data } = await instance.delete<T>(url, config);
  return data;
}
