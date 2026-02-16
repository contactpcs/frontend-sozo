'use client';

import Link from 'next/link';
import { LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui';
import { useAuth } from '@/lib/hooks';
import { APP_NAME } from '@/lib/constants';

/**
 * Header Component
 */
export function Header() {
  const { user, logout, isLogoutLoading } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white font-bold">
            S
          </div>
          <span className="text-xl font-bold text-neutral-900">{APP_NAME}</span>
        </Link>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          {user && (
            <>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-neutral-500 capitalize">{user.role}</p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                isLoading={isLogoutLoading}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
