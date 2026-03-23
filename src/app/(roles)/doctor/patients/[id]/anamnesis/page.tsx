'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Save, X, HelpCircle, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui';
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

interface AnamnesisFormData {
  // 1. Chief Complaint & Diagnosis
  chiefComplaint: string;
  primaryDiagnosis: string;

  // 2. Main Symptoms
  mainSymptoms: string;
  initialSymptoms: string;
  hasSymptomDiagnosis: 'yes' | 'no' | '';
  symptomDiagnosis: string;
  symptomStartDate: string;
  symptomDuration: string;
  symptomFrequency: string;
  symptomIntensity: string;
  symptomProgression: string;

  // 3. Secondary Symptoms
  secondarySymptoms: {
    sleepIssues: boolean;
    concentrationProblems: boolean;
    memoryIssues: boolean;
    gastrointestinalIssues: boolean;
    moodFluctuations: boolean;
    fatigue: boolean;
    weakness: boolean;
    pain: boolean;
    depressionAnxiety: boolean;
    bladderFunctionIssues: boolean;
  };
  secondarySymptomDetails: string;

  // 4. Operations/Surgeries
  hasOperations: 'yes' | 'no' | '';
  operationsDetails: string;

  // 5. Previous or Ongoing Treatments
  previousTreatments: string;

  // 6. Medications & Supplements
  medicationsSupplements: string;

  // 7. Brain MRI & Other Scans
  hasBrainMRI: 'yes' | 'no' | '';
  brainMRIDetails: string;
  otherScans: string;

  // 8. Neuromodulation Experience
  hasNeuromodulation: 'yes' | 'no' | '';
  neuromodulationDetails: string;
}

export default function AnamnesisPage() {
  const params = useParams();
  const router = useRouter();
  const { logout, user } = useAuth();
  const storedUser = useSessionStore((s) => s.user);
  const patientId = params.id as string;

  const [formData, setFormData] = useState<AnamnesisFormData>({
    chiefComplaint: '',
    primaryDiagnosis: '',
    mainSymptoms: '',
    initialSymptoms: '',
    hasSymptomDiagnosis: '',
    symptomDiagnosis: '',
    symptomStartDate: '',
    symptomDuration: '',
    symptomFrequency: '',
    symptomIntensity: '',
    symptomProgression: '',
    secondarySymptoms: {
      sleepIssues: false,
      concentrationProblems: false,
      memoryIssues: false,
      gastrointestinalIssues: false,
      moodFluctuations: false,
      fatigue: false,
      weakness: false,
      pain: false,
      depressionAnxiety: false,
      bladderFunctionIssues: false,
    },
    secondarySymptomDetails: '',
    hasOperations: '',
    operationsDetails: '',
    previousTreatments: '',
    medicationsSupplements: '',
    hasBrainMRI: '',
    brainMRIDetails: '',
    otherScans: '',
    hasNeuromodulation: '',
    neuromodulationDetails: '',
  });

  const [isSaved, setIsSaved] = useState(false);

  const doctorFirstName = storedUser?.firstName || user?.firstName || 'James';
  const doctorLastName = storedUser?.lastName || user?.lastName || '';
  const doctorEmail = storedUser?.email || user?.email || 'doctor@clinic.com';
  const doctorInitials = getInitials(doctorFirstName, doctorLastName);
  const doctorFullName = `Dr. ${doctorFirstName} ${doctorLastName}`.trim();

  const doc = {
    initials: doctorInitials,
    name: doctorFullName,
    clinic: 'Seventh Adventist Clinic, LA',
    phone: doctorEmail,
  };

  const handleInputChange = (field: keyof AnamnesisFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsSaved(false);
  };

  const handleSave = () => {
    // Data is not persisted as per user requirement
    console.log('Anamnesis form data (not saved to backend):', formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <div className="max-w-[1400px] mx-auto p-6">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-6 mb-8">
          {/* Left: Back button + Title */}
          <div className="flex-1">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Patient
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Anamnesis Assessment</h1>
            <p className="text-sm text-gray-600">Patient ID: {patientId}</p>
          </div>

          {/* Right: Icons + Doctor Info */}
          <div className="flex items-start gap-4">
            <button className="p-3 hover:bg-white rounded-full transition-colors">
              <HelpCircle className="w-5 h-5 text-gray-600" />
            </button>
            <button className="relative p-3 hover:bg-white rounded-full transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <button
              onClick={handleLogout}
              className="p-3 hover:bg-red-50 rounded-full transition-colors group"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
            </button>

            {/* Doctor Info Card */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center gap-4 min-w-[280px]">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {doc.initials}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{doc.name}</p>
                <p className="text-xs text-gray-500 truncate">{doc.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 px-8 py-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Patient Medical History</h2>
            <p className="text-sm text-gray-600 mt-1">
              Complete the anamnesis form below. Changes are not automatically saved.
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-8">
            {/* 1. Chief Complaint & Diagnosis */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">1. Chief Complaint & Diagnosis</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Why are you here today? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Describe the main reason for this visit and any existing diagnosis..."
                    value={formData.chiefComplaint}
                    onChange={(e) => handleInputChange('chiefComplaint', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Primary Diagnosis
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the primary diagnosis if available..."
                    value={formData.primaryDiagnosis}
                    onChange={(e) => handleInputChange('primaryDiagnosis', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* 2. Main Symptoms */}
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">2. Main Symptoms</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    What are your main symptoms? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Describe the primary symptoms you are experiencing..."
                    rows={3}
                    value={formData.mainSymptoms}
                    onChange={(e) => handleInputChange('mainSymptoms', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    What were the initial symptoms?
                  </label>
                  <textarea
                    placeholder="Describe how your symptoms first appeared..."
                    rows={3}
                    value={formData.initialSymptoms}
                    onChange={(e) => handleInputChange('initialSymptoms', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Is there a diagnosis related to the symptoms?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="symptomDiagnosis"
                        value="yes"
                        checked={formData.hasSymptomDiagnosis === 'yes'}
                        onChange={(e) => handleInputChange('hasSymptomDiagnosis', e.target.value as 'yes' | 'no')}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="symptomDiagnosis"
                        value="no"
                        checked={formData.hasSymptomDiagnosis === 'no'}
                        onChange={(e) => handleInputChange('hasSymptomDiagnosis', e.target.value as 'yes' | 'no')}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">No</span>
                    </label>
                  </div>
                </div>

                {formData.hasSymptomDiagnosis === 'yes' && (
                  <div>
                    <input
                      type="text"
                      placeholder="If yes, please specify the diagnosis..."
                      value={formData.symptomDiagnosis}
                      onChange={(e) => handleInputChange('symptomDiagnosis', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      When did the symptoms start?
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 3 months ago, January 2024..."
                      value={formData.symptomStartDate}
                      onChange={(e) => handleInputChange('symptomStartDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      For how long have you had these symptoms?
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 2 weeks, 6 months, 2 years..."
                      value={formData.symptomDuration}
                      onChange={(e) => handleInputChange('symptomDuration', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      How often do you have these symptoms?
                    </label>
                    <select
                      value={formData.symptomFrequency}
                      onChange={(e) => handleInputChange('symptomFrequency', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                    >
                      <option value="">Select frequency...</option>
                      <option value="rare">Rare/Occasional</option>
                      <option value="intermittent">Intermittent</option>
                      <option value="frequent">Frequent</option>
                      <option value="constant">Constant</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      How intense or severe are these symptoms?
                    </label>
                    <select
                      value={formData.symptomIntensity}
                      onChange={(e) => handleInputChange('symptomIntensity', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                    >
                      <option value="">Select intensity...</option>
                      <option value="mild">Mild</option>
                      <option value="moderate">Moderate</option>
                      <option value="severe">Severe</option>
                      <option value="debilitating">Debilitating</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Are the symptoms getting better, worse, or staying about the same?
                    </label>
                    <select
                      value={formData.symptomProgression}
                      onChange={(e) => handleInputChange('symptomProgression', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                    >
                      <option value="">Select progression...</option>
                      <option value="improving">Improving</option>
                      <option value="stable">Stable/Staying the same</option>
                      <option value="worsening">Worsening</option>
                      <option value="fluctuating">Fluctuating</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Secondary Symptoms */}
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">3. Secondary Symptoms</h3>
              <p className="text-sm text-gray-600 mb-4">Please check all that apply and provide details where relevant:</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  { key: 'sleepIssues', label: 'Sleep Issues' },
                  { key: 'concentrationProblems', label: 'Concentration Problems' },
                  { key: 'memoryIssues', label: 'Memory Issues' },
                  { key: 'gastrointestinalIssues', label: 'Gastrointestinal Issues' },
                  { key: 'moodFluctuations', label: 'Mood Fluctuations' },
                  { key: 'fatigue', label: 'Fatigue' },
                  { key: 'weakness', label: 'Weakness' },
                  { key: 'pain', label: 'Pain' },
                  { key: 'depressionAnxiety', label: 'Depression/Anxiety' },
                  { key: 'bladderFunctionIssues', label: 'Bladder Function Issues' },
                ].map((symptom) => (
                  <label key={symptom.key} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.secondarySymptoms[symptom.key as keyof typeof formData.secondarySymptoms]}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          secondarySymptoms: {
                            ...prev.secondarySymptoms,
                            [symptom.key]: e.target.checked,
                          },
                        }));
                        setIsSaved(false);
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{symptom.label}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Additional details about secondary symptoms:
                </label>
                <textarea
                  placeholder="Please provide more details about the checked symptoms..."
                  rows={3}
                  value={formData.secondarySymptomDetails}
                  onChange={(e) => handleInputChange('secondarySymptomDetails', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                />
              </div>
            </div>

            {/* 4. Operations/Surgeries */}
            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">4. Operations/Surgeries</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Have you had any operations or surgeries?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="operations"
                        value="yes"
                        checked={formData.hasOperations === 'yes'}
                        onChange={(e) => handleInputChange('hasOperations', e.target.value as 'yes' | 'no')}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="operations"
                        value="no"
                        checked={formData.hasOperations === 'no'}
                        onChange={(e) => handleInputChange('hasOperations', e.target.value as 'yes' | 'no')}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">No</span>
                    </label>
                  </div>
                </div>

                {formData.hasOperations === 'yes' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      If yes, please provide details:
                    </label>
                    <textarea
                      placeholder="Include: Which operations, how many, when performed, post-surgery condition/effects..."
                      rows={4}
                      value={formData.operationsDetails}
                      onChange={(e) => handleInputChange('operationsDetails', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 5. Previous or Ongoing Treatments */}
            <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">5. Previous or Ongoing Treatments</h3>
              
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Previous or ongoing treatments (physiotherapy, speech therapy, psychotherapy, etc.)
                </label>
                <textarea
                  placeholder="Include: Type of treatment, how long, how often, outcomes/improvements..."
                  rows={4}
                  value={formData.previousTreatments}
                  onChange={(e) => handleInputChange('previousTreatments', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                />
              </div>
            </div>

            {/* 6. Medications & Supplements */}
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">6. Medications & Supplements</h3>
              
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Current medications and supplements:
                </label>
                <textarea
                  placeholder="List all current medications and supplements with dosages..."
                  rows={4}
                  value={formData.medicationsSupplements}
                  onChange={(e) => handleInputChange('medicationsSupplements', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                />
              </div>
            </div>

            {/* 7. Brain MRI & Other Scans */}
            <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">7. Brain MRI & Other Scans</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Have you had a Brain MRI?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="brainMRI"
                        value="yes"
                        checked={formData.hasBrainMRI === 'yes'}
                        onChange={(e) => handleInputChange('hasBrainMRI', e.target.value as 'yes' | 'no')}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="brainMRI"
                        value="no"
                        checked={formData.hasBrainMRI === 'no'}
                        onChange={(e) => handleInputChange('hasBrainMRI', e.target.value as 'yes' | 'no')}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">No</span>
                    </label>
                  </div>
                </div>

                {formData.hasBrainMRI === 'yes' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      If yes, when was it performed and what were the results?
                    </label>
                    <textarea
                      placeholder="Include: Date of MRI, results, any other scans (CT, EEG, EMG)..."
                      rows={3}
                      value={formData.brainMRIDetails}
                      onChange={(e) => handleInputChange('brainMRIDetails', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Other scans (CT, EEG, EMG, etc.):
                  </label>
                  <textarea
                    placeholder="List any other scans or tests performed..."
                    rows={3}
                    value={formData.otherScans}
                    onChange={(e) => handleInputChange('otherScans', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 8. Neuromodulation Experience */}
            <div className="bg-cyan-50 rounded-lg p-6 border border-cyan-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">8. Neuromodulation Experience</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Have you used any neuromodulation techniques before?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="neuromodulation"
                        value="yes"
                        checked={formData.hasNeuromodulation === 'yes'}
                        onChange={(e) => handleInputChange('hasNeuromodulation', e.target.value as 'yes' | 'no')}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="neuromodulation"
                        value="no"
                        checked={formData.hasNeuromodulation === 'no'}
                        onChange={(e) => handleInputChange('hasNeuromodulation', e.target.value as 'yes' | 'no')}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">No</span>
                    </label>
                  </div>
                </div>

                {formData.hasNeuromodulation === 'yes' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      If yes, please specify devices used and experience:
                    </label>
                    <textarea
                      placeholder="Include: Device types, duration of use, effectiveness, side effects..."
                      rows={4}
                      value={formData.neuromodulationDetails}
                      onChange={(e) => handleInputChange('neuromodulationDetails', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Footer */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isSaved && (
                <div className="flex items-center gap-2 text-green-600">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">Form reviewed (not saved to database)</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Review Form
              </Button>
            </div>
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
