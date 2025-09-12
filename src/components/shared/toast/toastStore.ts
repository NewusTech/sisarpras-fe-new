import { create } from "zustand";

export interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

/**
 * Zustand store untuk mengelola state notifikasi global
 * Menyediakan fungsi untuk menambah, menghapus, dan membersihkan notifikasi
 */
export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],

  /**
   * Menambahkan notifikasi baru ke dalam store
   * Otomatis generate ID dan set auto-remove timer jika ada duration
   */
  addToast: (toast) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Auto remove setelah duration (default 5 detik)
    const duration = toast.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, duration);
    }
  },

  /**
   * Menghapus notifikasi berdasarkan ID
   */
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  /**
   * Menghapus semua notifikasi
   */
  clearAll: () => {
    set({ toasts: [] });
  },
}));
