'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { clearAuth, getRoleDashboardRoute } from '@/lib/auth';
import type { LoginCredentials, RegisterData } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/redux/hooks';
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
} from '@/store/redux/slices/authSlice';
import { useState } from 'react';

/**
 * Simple hook to get current user from Redux
 */
export function useCurrentUser() {
  const dispatch = useAppDispatch();
  const { user, isLoading, loginError: error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const refetch = useCallback(async () => {
    await dispatch(getCurrentUser());
  }, [dispatch]);

  return { data: user, isLoading, error: error ? new Error(error) : null, refetch, isAuthenticated };
}

/**
 * Hook to handle user login via Redux
 */
export function useLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, loginError, isLoginLoading } = useAppSelector(
    (state) => state.auth
  );

  const mutate = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        const result = await dispatch(loginUser(credentials));
        
        if (loginUser.fulfilled.match(result)) {
          const user = result.payload;
          const dashboardRoute = getRoleDashboardRoute(user.role);
          router.push(dashboardRoute);
          return result.payload;
        } else if (loginUser.rejected.match(result)) {
          throw new Error(result.payload as string);
        }
      } catch (error) {
        throw error;
      }
    },
    [dispatch, router]
  );

  return {
    mutate,
    isPending: isLoginLoading,
    isLoading: isLoginLoading,
    error: loginError ? new Error(loginError) : null,
    isSuccess: isAuthenticated,
  };
}

/**
 * Hook to handle user registration via Redux
 */
export function useRegister() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, loginError, isLoginLoading } = useAppSelector(
    (state) => state.auth
  );

  const mutate = useCallback(
    async (payload: RegisterData) => {
      try {
        const result = await dispatch(registerUser(payload));
        
        if (registerUser.fulfilled.match(result)) {
          const user = result.payload;
          const dashboardRoute = getRoleDashboardRoute(user.role);
          router.push(dashboardRoute);
          return result.payload;
        } else if (registerUser.rejected.match(result)) {
          throw new Error(result.payload as string);
        }
      } catch (error) {
        throw error;
      }
    },
    [dispatch, router]
  );

  return {
    mutate,
    isPending: isLoginLoading,
    isLoading: isLoginLoading,
    error: loginError ? new Error(loginError) : null,
    isSuccess: isAuthenticated,
  };
}

/**
 * Hook to handle user logout via Redux
 */
export function useLogout() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoginLoading } = useAppSelector((state) => state.auth);

  const mutate = useCallback(async () => {
    try {
      await dispatch(logoutUser());
      clearAuth();
      router.push('/login');
    } catch (error) {
      // Still clear auth even if logout fails
      clearAuth();
      router.push('/login');
      throw error;
    }
  }, [dispatch, router]);

  return { mutate, isPending: isLoginLoading };
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
