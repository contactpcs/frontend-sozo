'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Phone, ChevronDown, Lock, HelpCircle, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui';
import { usePatient } from '@/lib/hooks';
import { useAuth } from '@/lib/hooks';
import { useSessionStore } from '@/store/sessionStore';

/**
 * Helper function to generate initials from a name
 */
function getInitials(firstName?: string, lastName?: string): string {
  const first = (firstName || '').charAt(0).toUpperCase();
  const last = (lastName || '').charAt(0).toUpperCase();
  return `${first}${last}` || 'DR';
}

const DUMMY_PATIENTS: Record<string, any> = {
  'dummy-1': {
    id: 'dummy-1',
    firstName: 'Andrea',
    lastName: 'Mitchell',
    dateOfBirth: '1985-06-15',
    medicalRecordNumber: 'MRN-00123',
    phone: '+1 310 555 0101',
    status: 'active',
    condition: 'Cognitive Fatigue',
    nextActivity: 'Tomorrow, Brain Mapping',
    doctor: { initials: 'DJ', name: 'Dr. James', clinic: 'Seventh Adventist Clinic, LA', phone: '+1 723747 90000' },
    fnon: { score: 32, improvement: '+20%', duration: '45 mins', completedBy: 'Dr. James', completedOn: '24 Jan, 2026', activities: ['Crossword', 'Toe Touch', 'Walking', 'Sudoku', 'Balance Test'] },
  },
  'dummy-2': {
    id: 'dummy-2',
    firstName: 'Robert',
    lastName: 'Chen',
    dateOfBirth: '1972-03-22',
    medicalRecordNumber: 'MRN-00124',
    phone: '+1 213 555 0202',
    status: 'active',
    condition: 'Mild Memory Loss',
    nextActivity: 'Thursday, FNON Assessment',
    doctor: { initials: 'DJ', name: 'Dr. James', clinic: 'Seventh Adventist Clinic, LA', phone: '+1 723747 90000' },
    fnon: { score: 28, improvement: '+15%', duration: '50 mins', completedBy: 'Dr. James', completedOn: '18 Jan, 2026', activities: ['Walking', 'Sudoku', 'Memory Cards', 'Balance Test'] },
  },
  'dummy-3': {
    id: 'dummy-3',
    firstName: 'Sarah',
    lastName: 'Thompson',
    dateOfBirth: '1990-11-08',
    medicalRecordNumber: 'MRN-00125',
    phone: '+1 424 555 0303',
    status: 'active',
    condition: 'Anxiety & Focus Issues',
    nextActivity: 'Friday, Brain Mapping',
    doctor: { initials: 'DJ', name: 'Dr. James', clinic: 'Seventh Adventist Clinic, LA', phone: '+1 723747 90000' },
    fnon: { score: 41, improvement: '+28%', duration: '40 mins', completedBy: 'Dr. James', completedOn: '20 Jan, 2026', activities: ['Crossword', 'Breathing Exercises', 'Walking', 'Sudoku'] },
  },
  'dummy-4': {
    id: 'dummy-4',
    firstName: 'James',
    lastName: 'Williams',
    dateOfBirth: '1968-04-30',
    medicalRecordNumber: 'MRN-00126',
    phone: '+1 818 555 0404',
    status: 'active',
    condition: 'Post-Stroke Recovery',
    nextActivity: 'Monday, PRS Evaluation',
    doctor: { initials: 'DJ', name: 'Dr. James', clinic: 'Seventh Adventist Clinic, LA', phone: '+1 723747 90000' },
    fnon: { score: 19, improvement: '+8%', duration: '60 mins', completedBy: 'Dr. James', completedOn: '15 Jan, 2026', activities: ['Toe Touch', 'Walking', 'Balance Test', 'Speech Therapy'] },
  },
  'dummy-5': {
    id: 'dummy-5',
    firstName: 'Maria',
    lastName: 'Garcia',
    dateOfBirth: '1995-09-17',
    medicalRecordNumber: 'MRN-00127',
    phone: '+1 562 555 0505',
    status: 'active',
    condition: 'ADHD & Focus',
    nextActivity: 'Wednesday, Clinical Assessment',
    doctor: { initials: 'DJ', name: 'Dr. James', clinic: 'Seventh Adventist Clinic, LA', phone: '+1 723747 90000' },
    fnon: { score: 37, improvement: '+22%', duration: '45 mins', completedBy: 'Dr. James', completedOn: '22 Jan, 2026', activities: ['Crossword', 'Sudoku', 'Memory Cards', 'Focus Training'] },
  },
};

export default function PatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { logout, user } = useAuth();
  const storedUser = useSessionStore((s) => s.user);
  const patientId = params.id as string;

  const [selectedAssessment, setSelectedAssessment] = useState('fnon');
  const [basicExpanded, setBasicExpanded] = useState(true);

  // Try API first, fall back to dummy data
  const { data: apiPatient, isLoading } = usePatient(
    patientId.startsWith('dummy-') ? undefined : patientId
  );
  const patient = apiPatient || DUMMY_PATIENTS[patientId];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full" />
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Patient not found</h1>
          <button
            onClick={() => router.push('/doctor/dashboard')}
            className="text-purple-600 hover:underline flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  // Get logged-in doctor's information
  const doctorFirstName = storedUser?.firstName || user?.firstName || 'James';
  const doctorLastName = storedUser?.lastName || user?.lastName || '';
  const doctorEmail = storedUser?.email || user?.email || 'doctor@clinic.com';
  const doctorInitials = getInitials(doctorFirstName, doctorLastName);
  const doctorFullName = `Dr. ${doctorFirstName} ${doctorLastName}`.trim();
  
  const doc = {
    initials: doctorInitials,
    name: doctorFullName,
    clinic: 'Seventh Adventist Clinic, LA',
    phone: doctorEmail
  };
  
  // Update fnon data with logged-in doctor's name
  const fnon = {
    ...(patient.fnon || {}),
    completedBy: doctorFullName
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <div className="max-w-[1600px] mx-auto p-6">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-6 mb-8">
          {/* Left: Back button + Welcome */}
          <div className="flex-1">
            <button
              onClick={() => router.push('/doctor/dashboard')}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              {patient.firstName} {patient.lastName} 👤
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              {patient.medicalRecordNumber} &nbsp;·&nbsp; {patient.condition || 'Neurological Assessment'}
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
                <p className="text-sm font-semibold text-gray-900">{patient.nextActivity || 'Tomorrow, Brain Mapping'}</p>
              </div>
              <Button className="ml-4 btn-gradient hover:opacity-90 text-white px-6">
                Schedule
              </Button>
            </div>
          </div>

          {/* Right: Icons + Doctor Info */}
          <div className="flex items-start gap-4">
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
                {doc.initials}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{doc.name}</p>
                <p className="text-xs text-gray-500">{doc.clinic}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Phone className="w-3 h-3 text-gray-400" />
                  <p className="text-xs text-gray-600">{doc.phone}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Add Note
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
                    onClick={() => router.push(`/doctor/patients/${patientId}/anamnesis`)}
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
                      <span>completed on {fnon.completedOn || '24 Jan, 2026'}</span>
                    </div>
                  </div>
                  <Button variant="outline">View Detailed Report</Button>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">FNON Score</p>
                    <p className="text-2xl font-bold text-gray-900">{fnon.score ?? 32}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Improvement</p>
                    <p className="text-2xl font-bold text-green-700">{fnon.improvement ?? '+20%'}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Duration</p>
                    <p className="text-2xl font-bold text-blue-700">{fnon.duration ?? '45 mins'}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Completed by</p>
                    <p className="text-lg font-semibold text-purple-700">{fnon.completedBy ?? 'Dr. James'}</p>
                  </div>
                </div>

                {/* Activities */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Activities Performed</h3>
                  <div className="flex flex-wrap gap-2">
                    {(fnon.activities || ['Crossword', 'Toe Touch', 'Walking', 'Sudoku', 'Balance Test']).map((activity: string) => (
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
                    This assessment hasn&apos;t been completed yet. Schedule it for the patient&apos;s next visit.
                  </p>
                  <Button className="btn-gradient hover:opacity-90 text-white">
                    Schedule Assessment
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          © Copyright 2026 Neurowellness Brain Center
        </div>
      </div>
    </div>
  );
}
