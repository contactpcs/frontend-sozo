'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/api/services';
import { setAuthToken, clearAuth } from '@/lib/auth';
import type { LoginCredentials, RegisterData } from '@/types';
import { useSessionStore } from '@/store/sessionStore';

/**
 * Simple hook to fetch current user without React Query
 */
export function useCurrentUser() {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    authService
      .getCurrentUser()
      .then((res) => {
        if (mounted) setData(res);
      })
      .catch((err) => {
        if (mounted) setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { data, isLoading, error, refetch: async () => {
    setIsLoading(true);
    try {
      const res = await authService.getCurrentUser();
      setData(res);
      setError(null);
      return res;
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setIsLoading(false);
    }
  } };
}

/**
 * Login helper
 */
export function useLogin() {
  const router = useRouter();
  const setUser = useSessionStore((state) => state.setUser);
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback(async (credentials: LoginCredentials) => {
    setIsPending(true);
    try {
      const data = await authService.login(credentials);
      setAuthToken(data.accessToken);
      if (data.refreshToken && typeof window !== 'undefined') {
        localStorage.setItem('refresh_token', data.refreshToken);
      }
      setUser(data.user);
      router.push('/dashboard/patients');
      return data;
    } finally {
      setIsPending(false);
    }
  }, [router, setUser]);

  return { mutate, isPending };
}

export function useRegister() {
  const router = useRouter();
  const setUser = useSessionStore((state) => state.setUser);
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback(async (payload: RegisterData) => {
    setIsPending(true);
    try {
      const data = await authService.register(payload);
      setAuthToken(data.accessToken);
      if (data.refreshToken && typeof window !== 'undefined') {
        localStorage.setItem('refresh_token', data.refreshToken);
      }
      setUser(data.user);
      router.push('/dashboard/patients');
      return data;
    } finally {
      setIsPending(false);
    }
  }, [router, setUser]);

  return { mutate, isPending };
}

export function useLogout() {
  const router = useRouter();
  const clearUser = useSessionStore((s) => s.clearUser);
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback(async () => {
    setIsPending(true);
    try {
      await authService.logout();
    } catch (e) {
      // ignore error, still clear local auth
    } finally {
      clearAuth();
      clearUser();
      try { if (typeof window !== 'undefined') localStorage.removeItem('refresh_token'); } catch {}
      router.push('/login');
      setIsPending(false);
    }
  }, [router, clearUser]);

  return { mutate, isPending };
}

export function useAuth() {
  const { data: user, isLoading, error, refetch } = useCurrentUser();
  const { mutate: login, isPending: isLoginLoading } = useLogin();
  const { mutate: register, isPending: isRegisterLoading } = useRegister();
  const { mutate: logout, isPending: isLogoutLoading } = useLogout();

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    refetch,
    isLoginLoading,
    isRegisterLoading,
    isLogoutLoading,
  };
}
