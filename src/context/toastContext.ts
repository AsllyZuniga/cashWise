import { createContext, useContext } from "react";

export type ToastVariant = "success" | "error" | "info";

export interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void;
  confirm: (message: string) => Promise<boolean>;
}

export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined
);

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe usarse dentro de un ToastProvider");
  }
  return context;
}
