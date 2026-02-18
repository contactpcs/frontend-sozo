'use client';

import { useState, useMemo } from 'react';
import { Search, Bell, HelpCircle, LogOut } from 'lucide-react';
import { Card } from '@/components/ui';
import { usePatients } from '@/lib/hooks';
import { useAuth } from '@/lib/hooks';
import { useSessionStore } from '@/store/sessionStore';

/**
 * Patient Card Component
 */
function PatientCard({ patient }: { patient: any }) {
  const getAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const statusColor = {
    new: 'bg-purple-50 text-purple-700',
    paid: 'bg-green-50 text-green-700',
    pending: 'bg-gray-100 text-gray-600',
    assessment: 'bg-blue-50 text-blue-700',
  };

  return (
    <div className="flex gap-3 items-center w-full">
      {/* Avatar */}
      <div className="relative rounded-full shrink-0 w-[52px] h-[52px] bg-gray-200 overflow-hidden flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-semibold text-sm">
          {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
        </div>
      </div>

      {/* Patient Info */}
      <div className="flex-1 flex items-center justify-between min-w-0">
        <div className="flex-1">
          <div className="flex gap-2 items-baseline">
            <h3 className="text-base font-semibold text-gray-900 truncate">
              {patient.firstName} {patient.lastName}
            </h3>
            <span className="text-sm text-gray-600 whitespace-nowrap">
              ({patient.medicalRecordNumber})
            </span>
          </div>
          <div className="flex gap-2 items-center mt-1">
            <span className="text-sm text-gray-600">{getAge(patient.dateOfBirth)} Yrs</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span className="text-sm text-gray-600 truncate">Example Condition</span>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex gap-2 items-center shrink-0 ml-4">
          <div className={`${statusColor.new} px-3 py-1 rounded-md text-sm font-medium`}>
            New
          </div>
          <div className={`${statusColor.paid} px-3 py-1 rounded-md text-sm font-medium`}>
            Paid
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Patients Dashboard Page
 */
export default function PatientsDashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  // Use session store so values mapped from backend/profile are available
  const { user, logout } = useAuth();  // ✓ FIXED: Single call to useAuth()
  const storedUser = useSessionStore((s) => s.user);

  const { data: patientsData, isLoading } = usePatients({
    search: searchQuery,
    page: 1,
    limit: 10,
  });

  // Get recently accessed patients (for demo, using first patients)
  const recentPatients = useMemo(
    () => patientsData?.data?.slice(0, 6) || [],
    [patientsData?.data]
  );

  const doctorName = (storedUser?.firstName || user?.firstName) ?? 'James';

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-end gap-4 mb-12">
        <button className="p-3 hover:bg-white rounded-full transition-colors">
          <HelpCircle className="w-6 h-6 text-gray-600" />
        </button>
        <button className="relative p-3 hover:bg-white rounded-full transition-colors">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        <button 
          onClick={handleLogout}
          className="p-3 hover:bg-red-50 rounded-full transition-colors group"
          title="Logout"
        >
          <LogOut className="w-6 h-6 text-gray-600 group-hover:text-red-600" />
        </button>
      </div>

      {/* Welcome Section */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-2">
          Welcome, Dr. {doctorName} 👋
        </h1>
        <p className="text-xl text-gray-600">
          Here's everything you need for today's clinic
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-12">
        <div className="w-full max-w-2xl">
          <div className="relative bg-white rounded-full shadow-md border border-gray-200 flex items-center px-6 py-4">
            <input
              type="text"
              placeholder="Search patients by name or ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
            />
            <Search className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Recently Searched Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recently Searched</h2>

        {/* Patient Cards Container */}
        <Card className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full"></div>
            </div>
          ) : recentPatients.length > 0 ? (
            recentPatients.map((patient) => (
              <div key={patient.id} className="pb-6 last:pb-0 last:border-b-0 border-b border-gray-100">
                <PatientCard patient={patient} />
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No patients found. Start by searching for a patient.</p>
            </div>
          )}
        </Card>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-500">
        © Copyright 2026 SOZO Brain Center
      </div>
    </div>
  );
}
