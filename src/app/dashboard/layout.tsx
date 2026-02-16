'use client';

import { type ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header, Sidebar } from '@/components/layout';
import { PageLoader } from '@/components/ui';
import { useAuth } from '@/lib/hooks';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user)) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated || !user) {
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
