import { useCallback, useRef, useState, type ReactNode } from "react";
import { UiButton, UiPanelModal } from "@asllyzuniga/react-library";
import { ToastContext, type ToastVariant } from "./toastContext";
import "./toast.scss";

interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

const TOAST_DURATION = 3500;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirmMessage, setConfirmMessage] = useState<string | null>(null);
  const confirmResolver = useRef<((value: boolean) => void) | null>(null);
  const toastId = useRef(0);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "info") => {
      const id = ++toastId.current;
      setToasts((prev) => [...prev, { id, message, variant }]);
      window.setTimeout(() => dismissToast(id), TOAST_DURATION);
    },
    [dismissToast]
  );

  const confirm = useCallback((message: string) => {
    setConfirmMessage(message);
    return new Promise<boolean>((resolve) => {
      confirmResolver.current = resolve;
    });
  }, []);

  const resolveConfirm = useCallback((value: boolean) => {
    confirmResolver.current?.(value);
    confirmResolver.current = null;
    setConfirmMessage(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, confirm }}>
      {children}

      <div className="toast-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast--${toast.variant}`}
            role="status"
          >
            <span>{toast.message}</span>
            <button
              type="button"
              className="toast__close"
              aria-label="Cerrar"
              onClick={() => dismissToast(toast.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <UiPanelModal visible={confirmMessage !== null}>
        <div className="modal-header">
          <h2>Confirmar acción</h2>
        </div>
        <div className="modal-body">
          <p>{confirmMessage}</p>
        </div>
        <div className="modal-footer">
          <UiButton className="cancel" onClick={() => resolveConfirm(false)}>
            Cancelar
          </UiButton>
          <UiButton className="save" onClick={() => resolveConfirm(true)}>
            Aceptar
          </UiButton>
        </div>
      </UiPanelModal>
    </ToastContext.Provider>
  );
}
