'use client';

import { type ReactNode } from 'react';
import { Header, Sidebar, NavigationGuard, NavigationErrorBoundary } from '@/components/layout';
import { useAuth } from '@/lib/hooks';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  return (
    <NavigationErrorBoundary>
      <NavigationGuard>
        <div className="min-h-screen bg-neutral-50">
          <Header />
          {user && <Sidebar userRole={user.role} />}
          <main className="pt-16 pl-64">
            <div className="p-6 sm:p-8">{children}</div>
          </main>
        </div>
      </NavigationGuard>
    </NavigationErrorBoundary>
  );
}
