'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@/store/redux/hooks';
import { getCurrentUser } from '@/store/redux/slices/authSlice';
import { useSessionStore } from '@/store/sessionStore';
import { getAuthToken } from '@/lib/auth';

/**
 * AuthInitializer Component
 * Restores user session from backend on app initialization
 */
export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const setSessionUser = useSessionStore((state) => state.setUser);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only run once on mount
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initializeAuth = async () => {
      const token = getAuthToken();
      
      if (token) {
        try {
          const result = await dispatch(getCurrentUser());
          
          if (getCurrentUser.fulfilled.match(result)) {
            const user = result.payload;
            // Update sessionStore to persist user data
            setSessionUser(user);
          }
        } catch (error) {
          // Silent fail - user will be redirected to login if needed
        }
      }
    };

    initializeAuth();
  }, [dispatch, setSessionUser]);

  return <>{children}</>;
}
