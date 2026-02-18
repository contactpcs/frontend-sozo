import Cookies from 'js-cookie';
import type { User, UserRole } from '@/types';
import { STORAGE_KEYS } from '@/lib/constants';

/**
 * Cookie Configuration
 */
const COOKIE_CONFIG = {
  AUTH_TOKEN: process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME || 'sozo_auth_token',
  EXPIRES_IN_DAYS: 7,
  SECURE: process.env.NODE_ENV === 'production',
  SAME_SITE: 'strict' as const,
};

/**
 * Store authentication token in cookie
 */
export function setAuthToken(token: string): void {
  Cookies.set(COOKIE_CONFIG.AUTH_TOKEN, token, {
    expires: COOKIE_CONFIG.EXPIRES_IN_DAYS,
    secure: COOKIE_CONFIG.SECURE,
    sameSite: COOKIE_CONFIG.SAME_SITE,
  });

  // Fallback to localStorage for non-cookie scenarios
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  }
}

/**
 * Get authentication token from cookie
 */
export function getAuthToken(): string | null {
  const cookieToken = Cookies.get(COOKIE_CONFIG.AUTH_TOKEN);
  
  if (cookieToken) return cookieToken;

  // Fallback to localStorage
  if (typeof window !== 'undefined') {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  return null;
}

/**
 * Remove authentication token
 */
export function removeAuthToken(): void {
  Cookies.remove(COOKIE_CONFIG.AUTH_TOKEN);
  
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }
}

/**
 * Store user data
 */
export function setUserData(user: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

/**
 * Get user data
 */
export function getUserData(): User | null {
  if (typeof window === 'undefined') return null;

  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
}

/**
 * Remove user data
 */
export function removeUserData(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

/**
 * Check if user has specific role
 */
export function hasRole(role: UserRole): boolean {
  const user = getUserData();
  return user?.role === role;
}

/**
 * Check if user has any of the specified roles
 */
export function hasAnyRole(roles: UserRole[]): boolean {
  const user = getUserData();
  return user ? roles.includes(user.role) : false;
}

/**
 * Check if route is accessible by user role
 */
export function canAccessRoute(path: string, userRole: UserRole): boolean {
  // Public routes are accessible to everyone
  const publicRoutes = ['/', '/login', '/register', '/forgot-password'];
  if (publicRoutes.includes(path)) return true;

  // Role-based access control - more specific matching
  const roleRoutes: Record<UserRole, string[]> = {
    patient: ['/patient/dashboard', '/patient/assessments', '/patient/settings'],
    doctor: [
      '/doctor/dashboard',
      '/doctor/assessments',
      '/doctor/settings',
    ],
    nurse: [
      '/doctor/dashboard',
      '/patient/dashboard',
      '/doctor/assessments',
      '/patient/assessments',
      '/dashboard/settings',
    ],
    admin: [
      '/doctor/dashboard',
      '/patient/dashboard',
      '/doctor/assessments',
      '/patient/assessments',
      '/dashboard/review',
      '/dashboard/admin',
      '/dashboard/settings',
    ],
    center_manager: [
      '/doctor/dashboard',
      '/patient/dashboard',
      '/doctor/assessments',
      '/patient/assessments',
      '/dashboard/settings',
    ],
  };

  const allowedRoutes = roleRoutes[userRole] || [];
  
  // Check exact match first
  if (allowedRoutes.includes(path)) {
    return true;
  }
  
  // Check if path is a sub-route of any allowed route
  return allowedRoutes.some((route) => {
    if (route === '/dashboard') {
      // Special handling for dashboard root - only allow exact match or approved sub-routes
      return path === '/dashboard' || allowedRoutes.some(r => r !== '/dashboard' && path.startsWith(r));
    }
    return path.startsWith(route + '/');
  });
}

/**
 * Get role-specific dashboard route
 */
export function getRoleDashboardRoute(userRole: UserRole): string {
  const roleDashboardRoutes: Record<UserRole, string> = {
    patient: '/patient/dashboard',
    doctor: '/doctor/dashboard',
    nurse: '/doctor/dashboard',
    admin: '/doctor/dashboard',
    center_manager: '/doctor/dashboard',
  };

  return roleDashboardRoutes[userRole] || '/doctor/dashboard';
}

/**
 * Clear all authentication data
 */
export function clearAuth(): void {
  removeAuthToken();
  removeUserData();
}
