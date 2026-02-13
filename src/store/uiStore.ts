import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeMode, Toast, ModalState, SidebarState } from '@/types';
import { generateId } from '@/lib/utils';

/**
 * UI Store State Interface
 */
interface UIStore {
  // Theme
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;

  // Sidebar
  sidebar: SidebarState;
  toggleSidebar: () => void;
  collapseSidebar: () => void;
  expandSidebar: () => void;

  // Toasts
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;

  // Modal
  modal: ModalState;
  openModal: (type: string, data?: unknown) => void;
  closeModal: () => void;

  // Loading
  isGlobalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
}

/**
 * UI Store
 * Manages global UI state - NO SERVER DATA
 */
export const useUIStore = create<UIStore>()(
  persist(
    (set: (partial: Partial<UIStore> | ((state: UIStore) => Partial<UIStore>)) => void) => ({
      // Theme state
      theme: 'light' as ThemeMode,
      setTheme: (theme: ThemeMode) => set({ theme }),

      // Sidebar state
      sidebar: {
        isOpen: true,
        isCollapsed: false,
      },
      toggleSidebar: () =>
        set((state: UIStore) => ({
          sidebar: {
            ...state.sidebar,
            isOpen: !state.sidebar.isOpen,
          },
        })),
      collapseSidebar: () =>
        set((state: UIStore) => ({
          sidebar: {
            ...state.sidebar,
            isCollapsed: true,
          },
        })),
      expandSidebar: () =>
        set((state: UIStore) => ({
          sidebar: {
            ...state.sidebar,
            isCollapsed: false,
          },
        })),

      // Toast state
      toasts: [],
      addToast: (toast: Omit<Toast, 'id'>) =>
        set((state: UIStore) => ({
          toasts: [
            ...state.toasts,
            {
              ...toast,
              id: generateId(),
              duration: toast.duration || 5000,
            },
          ],
        })),
      removeToast: (id: string) =>
        set((state: UIStore) => ({
          toasts: state.toasts.filter((toast: Toast) => toast.id !== id),
        })),
      clearToasts: () => set({ toasts: [] }),

      // Modal state
      modal: {
        isOpen: false,
      },
      openModal: (type: string, data?: unknown) =>
        set({
          modal: {
            isOpen: true,
            type,
            data,
          },
        }),
      closeModal: () =>
        set({
          modal: {
            isOpen: false,
            type: undefined,
            data: undefined,
          },
        }),

      // Global loading state
      isGlobalLoading: false,
      setGlobalLoading: (loading: boolean) => set({ isGlobalLoading: loading }),
    }),
    {
      name: 'sozo-ui-storage',
      partialize: (state: UIStore) => ({
        theme: state.theme,
        sidebar: state.sidebar,
      }),
    }
  )
);

/**
 * Toast Helper Hook
 */
export const useToast = () => {
  const { addToast, removeToast } = useUIStore();

  return {
    success: (message: string, duration?: number) =>
      addToast({ type: 'success', message, duration }),
    error: (message: string, duration?: number) =>
      addToast({ type: 'error', message, duration }),
    warning: (message: string, duration?: number) =>
      addToast({ type: 'warning', message, duration }),
    info: (message: string, duration?: number) =>
      addToast({ type: 'info', message, duration }),
    remove: removeToast,
  };
};
