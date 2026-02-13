'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CheckSquare, 
  Settings,
  Shield 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types';

/**
 * Navigation Item Interface
 */
interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: UserRole[];
}

/**
 * Navigation Items Configuration
 */
const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['patient', 'doctor', 'reviewer', 'admin'],
  },
  {
    label: 'Patients',
    href: '/dashboard/patients',
    icon: Users,
    roles: ['doctor', 'admin'],
  },
  {
    label: 'Assessments',
    href: '/dashboard/assessments',
    icon: FileText,
    roles: ['patient', 'doctor', 'admin'],
  },
  {
    label: 'Review',
    href: '/dashboard/review',
    icon: CheckSquare,
    roles: ['reviewer', 'admin'],
  },
  {
    label: 'Admin',
    href: '/dashboard/admin',
    icon: Shield,
    roles: ['admin'],
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    roles: ['patient', 'doctor', 'reviewer', 'admin'],
  },
];

/**
 * Sidebar Props Interface
 */
interface SidebarProps {
  userRole: UserRole;
}

/**
 * Sidebar Component
 */
export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();

  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter((item) => item.roles.includes(userRole));

  return (
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-neutral-200 bg-white">
      <nav className="h-full overflow-y-auto p-4">
        <ul className="space-y-1">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
