import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';
import type { RegisterFormData } from '@/lib/validators/auth.schema';

/**
 * Session Store State Interface
 */
interface SessionStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  updateUser: (updates: Partial<User>) => void;
  // Temporary signup state for frontend testing
  signupData: RegisterFormData | null;
  setSignupData: (data: RegisterFormData) => void;
  clearSignupData: () => void;
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
      // Signup testing state (NOT persisted)
      signupData: null,
      setSignupData: (data: RegisterFormData) => set({ signupData: data }),
      clearSignupData: () => set({ signupData: null }),
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
