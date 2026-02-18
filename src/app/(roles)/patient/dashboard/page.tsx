'use client';
 
import { useState } from 'react';
import { Search, Phone, ChevronDown, Lock, HelpCircle, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui';
import { useAuth } from '@/lib/hooks';
import { useSessionStore } from '@/store/sessionStore';
 
/**
 * Patient Dashboard Page
 */
export default function PatientsDashboardPage() {
  const { user, logout } = useAuth();
  const storedUser = useSessionStore((s) => s.user);
 
  const [selectedAssessment, setSelectedAssessment] = useState('fnon');
  const [basicExpanded, setBasicExpanded] = useState(true);
 
  // Get patient name from auth
  const patientName = storedUser?.firstName || user?.firstName || 'Andrea';

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <div className="max-w-[1600px] mx-auto p-6">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-6 mb-8">
          {/* Left: Welcome & Next Activity */}
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Hello {patientName} 👋
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              Here&apos;s everything you need for your doctor&apos;s visit
            </p>
 
            {/* Next Activity Card */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm inline-flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Next Activity</p>
                <p className="text-sm font-semibold text-gray-900">Tomorrow, Brain Mapping</p>
              </div>
              <Button className="ml-4 bg-orange-500 hover:bg-orange-600 text-white px-6">
                Book Appointment
              </Button>
            </div>
          </div>
 
          {/* Right: Search & Doctor Info */}
          <div className="flex items-start gap-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search patients, schedule, courses, equipments, etc"
                className="w-[420px] pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
 
            {/* Icons */}
            <button className="p-3 hover:bg-white rounded-full transition-colors">
              <HelpCircle className="w-5 h-5 text-gray-600" />
            </button>
            <button className="relative p-3 hover:bg-white rounded-full transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">3</span>
            </button>
            <button 
              onClick={handleLogout}
              className="p-3 hover:bg-red-50 rounded-full transition-colors group"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
            </button>
 
            {/* Doctor Info Card */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center gap-4 min-w-[300px]">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                DJ
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Dr. James</p>
                <p className="text-xs text-gray-500">Seventh Adventist Clinic, LA</p>
                <div className="flex items-center gap-1 mt-1">
                  <Phone className="w-3 h-3 text-gray-400" />
                  <p className="text-xs text-gray-600">+1 723747 90000</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Make Payment
              </Button>
            </div>
          </div>
        </div>
 
        {/* Tabs */}
        <div className="flex gap-1 mb-0">
          <button className="px-6 py-3 bg-gray-900 text-white rounded-t-lg font-medium text-sm">
            Today&apos;s Activity
          </button>
          <button className="px-6 py-3 bg-white text-gray-600 rounded-t-lg font-medium text-sm hover:bg-gray-50 flex items-center gap-2">
            Clinical Assessment 1
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          </button>
          <button className="px-6 py-3 bg-gray-300 text-gray-700 rounded-t-lg font-medium text-sm">
            Follow Up Assessment 1
          </button>
        </div>
 
        {/* Main Content */}
        <div className="flex bg-white rounded-b-lg rounded-tr-lg shadow-lg overflow-hidden min-h-[650px]">
          {/* Left Sidebar */}
          <div className="w-72 border-r border-gray-200 p-4">
            {/* Basic Section */}
            <div className="mb-6">
              <button
                onClick={() => setBasicExpanded(!basicExpanded)}
                className="flex items-center justify-between w-full mb-3 text-sm font-semibold text-gray-700"
              >
                <span>Basic</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${basicExpanded ? 'rotate-180' : ''}`} />
              </button>
 
              {basicExpanded && (
                <div className="space-y-1">
                  {/* Anamnesis */}
                  <button
                    onClick={() => setSelectedAssessment('anamnesis')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      selectedAssessment === 'anamnesis' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="flex-1 text-left text-sm font-medium">Anamnesis</span>
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-md text-xs font-medium">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Done
                    </span>
                  </button>
 
                  {/* FNON */}
                  <button
                    onClick={() => setSelectedAssessment('fnon')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      selectedAssessment === 'fnon' ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="flex-1 text-left text-sm font-medium">FNON</span>
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-md text-xs font-medium">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Done
                    </span>
                  </button>
 
                  {/* Brain Mapping */}
                  <button
                    onClick={() => setSelectedAssessment('brain_mapping')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      selectedAssessment === 'brain_mapping' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span className="flex-1 text-left text-sm font-medium">Brain Mapping</span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">Pending</span>
                  </button>
 
                  {/* PRS */}
                  <button
                    onClick={() => setSelectedAssessment('prs')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      selectedAssessment === 'prs' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <span className="flex-1 text-left text-sm font-medium">PRS</span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">Pending</span>
                  </button>
                </div>
              )}
            </div>
 
            {/* Locked Sections */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400">
                <Lock className="w-4 h-4" />
                <span>Doctor&apos;s Notes</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400">
                <Lock className="w-4 h-4" />
                <span>Treatment Plan</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400">
                <Lock className="w-4 h-4" />
                <span>Final Report</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400">
                <Lock className="w-4 h-4" />
                <span>Treatment Sessions</span>
              </div>
            </div>
          </div>
 
          {/* Right Content Area */}
          <div className="flex-1 p-8">
            {selectedAssessment === 'fnon' && (
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">FNON</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>completed on 24 Jan, 2026</span>
                    </div>
                  </div>
                  <Button variant="outline">View Detailed Report</Button>
                </div>
 
                {/* Metrics Grid */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">FNON Score</p>
                    <p className="text-2xl font-bold text-gray-900">32</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Improvement</p>
                    <p className="text-2xl font-bold text-green-700">+20%</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Duration</p>
                    <p className="text-2xl font-bold text-blue-700">45 mins</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Completed by</p>
                    <p className="text-lg font-semibold text-purple-700">Dr. James</p>
                  </div>
                </div>
 
                {/* Activities */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Activities Performed</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Crossword', 'Toe Touch', 'Walking', 'Sudoku', 'Balance Test'].map((activity) => (
                      <span key={activity} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
 
            {selectedAssessment === 'anamnesis' && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Anamnesis Completed</h3>
                  <p className="text-sm text-gray-500">View detailed assessment results</p>
                </div>
              </div>
            )}
 
            {(selectedAssessment === 'brain_mapping' || selectedAssessment === 'prs') && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Assessment Pending</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    This assessment hasn&apos;t been completed yet. Your doctor will complete it during your next visit.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
 
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          © Copyright 2026 SOZO Brain Center
        </div>
      </div>
    </div>
  );
}
 