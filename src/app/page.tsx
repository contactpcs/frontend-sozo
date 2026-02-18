'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getRoleDashboardRoute, getAuthToken, getUserData } from '@/lib/auth';
import { PageLoader } from '@/components/ui';

/**
 * Home Page
 * Redirects to role-specific dashboard or login based on auth status
 */
export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check for auth token
    const authToken = getAuthToken();
    
    if (authToken) {
      // Get user data to determine role
      const userData = getUserData();
      
      if (userData?.role) {
        // Redirect to role-specific dashboard
        const dashboardRoute = getRoleDashboardRoute(userData.role);
        router.replace(dashboardRoute);
      } else {
        // If no role data, redirect to doctor dashboard as fallback
        router.replace('/doctor/dashboard');
      }
    } else {
      // Not authenticated, redirect to login
      router.replace('/login');
    }
  }, [router]);

  // Show loading while redirecting
  return <PageLoader />;
}
