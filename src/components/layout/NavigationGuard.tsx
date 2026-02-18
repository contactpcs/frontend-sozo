'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/hooks';
import { canAccessRoute, getRoleDashboardRoute } from '@/lib/auth';
import { PageLoader } from '@/components/ui';

interface NavigationGuardProps {
  children: React.ReactNode;
}

/**
 * Navigation Guard Component
 * Handles route protection and role-based access control
 */
export function NavigationGuard({ children }: NavigationGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, isAuthenticated } = useAuth();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Skip guard logic during initial load
    if (isLoading) return;

    setIsNavigating(true);

    // Not authenticated - redirect to login
    if (!isAuthenticated || !user) {
      router.push(`/login${pathname ? `?redirect=${encodeURIComponent(pathname)}` : ''}`);
      return;
    }

    // Check route access permissions
    if (!canAccessRoute(pathname, user.role)) {
      console.warn(`Access denied: User role '${user.role}' cannot access '${pathname}'`);
      
      // Redirect to role-appropriate dashboard
      const defaultRoute = getRoleDashboardRoute(user.role);
      router.push(defaultRoute);
      return;
    }

    // All checks passed
    setIsNavigating(false);
  }, [isLoading, isAuthenticated, user, pathname, router]);

  // Show loading during auth check or navigation
  if (isLoading || isNavigating || !isAuthenticated || !user) {
    return <PageLoader />;
  }

  return <>{children}</>;
}