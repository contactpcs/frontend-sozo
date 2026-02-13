'use client';

import Link from 'next/link';
import { Users, FileText, Activity, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { useAuth } from '@/lib/hooks';

/**
 * Dashboard Home Page
 */
export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      label: 'Total Patients',
      value: '1,234',
      icon: Users,
      href: '/dashboard/patients',
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
    },
    {
      label: 'Active Assessments',
      value: '56',
      icon: FileText,
      href: '/dashboard/assessments',
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-100',
    },
    {
      label: 'Pending Reviews',
      value: '12',
      icon: Activity,
      href: '/dashboard/review',
      color: 'text-warning-600',
      bgColor: 'bg-warning-100',
    },
    {
      label: 'Completion Rate',
      value: '94%',
      icon: TrendingUp,
      href: '#',
      color: 'text-success-600',
      bgColor: 'bg-success-100',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="mt-2 text-neutral-600">
          Here&apos;s what&apos;s happening with your platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="transition-shadow hover:shadow-medium">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-600">{stat.label}</p>
                      <p className="mt-2 text-3xl font-bold text-neutral-900">{stat.value}</p>
                    </div>
                    <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border border-neutral-200 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-neutral-900">New assessment submitted</p>
                  <p className="text-sm text-neutral-600">Patient #1234 - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-neutral-200 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success-100 text-success-600">
                  <Activity className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-neutral-900">Assessment approved</p>
                  <p className="text-sm text-neutral-600">Patient #5678 - 5 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
