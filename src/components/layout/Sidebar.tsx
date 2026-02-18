'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  ClipboardList, 
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
 * Get role-specific navigation items
 */
const getRoleSpecificNavItems = (userRole: UserRole): NavItem[] => {
  const baseItems = [
    {
      label: 'Assessments',
      href: '/dashboard/assessments',
      icon: FileText,
      roles: ['patient', 'doctor', 'nurse', 'admin', 'center_manager'] as UserRole[],
    },
    {
      label: 'Review',
      href: '/dashboard/review',
      icon: ClipboardList,
      roles: ['doctor', 'nurse', 'admin'] as UserRole[],
    },
    {
      label: 'Admin',
      href: '/dashboard/admin',
      icon: Shield,
      roles: ['admin'] as UserRole[],
    },
    {
      label: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
      roles: ['patient', 'doctor', 'nurse', 'admin', 'center_manager'] as UserRole[],
    },
  ];

  // Add role-specific dashboard
  if (userRole === 'patient') {
    return [
      {
        label: 'Dashboard',
        href: '/patient/dashboard',
        icon: LayoutDashboard,
        roles: ['patient'],
      },
      ...baseItems
    ];
  } else if (userRole === 'doctor') {
    return [
      {
        label: 'Dashboard',
        href: '/doctor/dashboard',
        icon: LayoutDashboard,
        roles: ['doctor'],
      },
      {
        label: 'Patients',
        href: '/patient/dashboard',
        icon: Users,
        roles: ['doctor'],
      },
      ...baseItems
    ];
  } else {
    return [
      {
        label: 'Dashboard',
        href: '/doctor/dashboard',
        icon: LayoutDashboard,
        roles: ['nurse', 'admin', 'center_manager'],
      },
      {
        label: 'Patients',
        href: '/patient/dashboard',
        icon: Users,
        roles: ['nurse', 'admin', 'center_manager'],
      },
      ...baseItems
    ];
  }
};

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

  // Get role-specific navigation items
  const navItems = getRoleSpecificNavItems(userRole);
  
  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter((item) => item.roles.includes(userRole));

  // Improved active state detection
  const getIsActive = (itemHref: string) => {
    // Exact match
    if (pathname === itemHref) {
      return true;
    }
    
    // For dashboard routes, be more specific
    if (itemHref === '/patient/dashboard' || itemHref === '/doctor/dashboard') {
      return pathname === itemHref;
    }
    
    // Check if current path is a sub-route of this nav item
    if (pathname.startsWith(itemHref + '/')) {
      return true;
    }
    
    return false;
  };

  return (
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-neutral-200 bg-white">
      <nav className="h-full overflow-y-auto p-4">
        <ul className="space-y-1">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = getIsActive(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:no-underline',
                    isActive
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                  )}
                >
                  <Icon className={cn('h-5 w-5', isActive ? 'text-primary-700' : 'text-neutral-500')} />
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
