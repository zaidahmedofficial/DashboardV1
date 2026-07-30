"use client";

import { useState, useCallback } from "react";

type ToastType = "success" | "error" | "default";

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: ToastType;
}

const TOAST_LIMIT = 5;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    setToasts((prev) => {
      const next = [...prev, { ...toast, id: crypto.randomUUID() }];
      return next.slice(-TOAST_LIMIT);
    });
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
