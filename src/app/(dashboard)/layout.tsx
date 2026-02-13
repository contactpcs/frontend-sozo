'use client';

import { type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Header, Sidebar } from '@/components/layout';
import { PageLoader } from '@/components/ui';
import { useAuth } from '@/lib/hooks';

/**
 * Dashboard Layout
 * Protected layout with sidebar and header
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  // Show loader while checking authentication
  if (isLoading) {
    return <PageLoader />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <Sidebar userRole={user.role} />
      <main className="pt-16 pl-64">
        <div className="p-6 sm:p-8">{children}</div>
      </main>
    </div>
  );
}
