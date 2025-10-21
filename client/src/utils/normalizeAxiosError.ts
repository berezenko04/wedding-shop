import toast from "react-hot-toast";

export type AppError = { status?: number; code?: string; message: string; isNetworkError?: boolean; details?: unknown };

export const normalizeAxiosError = (error: any): AppError => {
  if (!error?.response) return { message: error?.message || "Network error", isNetworkError: true, details: error };
  const { status, data } = error.response;
  toast.error(data?.message || error.message);
  return { status, message: data?.message || data?.[0]?.message || data?.error || `Error ${status}`, details: data };
};
