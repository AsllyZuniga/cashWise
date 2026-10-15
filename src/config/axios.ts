import axios, { AxiosError } from "axios";

interface ApiErrorBody {
  message?: string;
  title?: string;
  detail?: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorBody>) => {
    if (import.meta.env.DEV) {
      console.error("[api]", error.response?.status ?? "network", error.config?.url);
    }
    return Promise.reject(error);
  }
);

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    const body = error.response?.data;
    return (
      body?.message ??
      body?.title ??
      body?.detail ??
      error.message ??
      "Error de red"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Ocurrió un error inesperado";
};

export default api;
