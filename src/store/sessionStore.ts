import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

/**
 * Session Store State Interface
 */
interface SessionStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  updateUser: (updates: Partial<User>) => void;
}

/**
 * Session Store
 * Manages user session state
 * NOTE: This is a minimal store. Primary auth state comes from React Query
 */
export const useSessionStore = create<SessionStore>()(
  persist(
    (set: (partial: Partial<SessionStore> | ((state: SessionStore) => Partial<SessionStore>)) => void) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user: User) =>
        set({
          user,
          isAuthenticated: true,
        }),

      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),

      updateUser: (updates: Partial<User>) =>
        set((state: SessionStore) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: 'sozo-session-storage',
      partialize: (state: SessionStore) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
