'use client';

import { useState } from 'react';
import {
  ClipboardList,
  AlertTriangle,
  List,
  Stethoscope,
  Activity,
  Pill,
  Brain,
  Zap,
  Save,
} from 'lucide-react';

// ─── Reusable Field Components ───────────────────────────────────────────────

function SectionTitle({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 pb-3 mb-5 border-b-2 border-orange-500">
      <span className="text-orange-500">{icon}</span>
      <h3 className="text-base font-bold text-neutral-900">{children}</h3>
    </div>
  );
}

function FormGroup({
  label,
  helper,
  children,
}: {
  label?: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      {label && (
        <label className="block text-sm font-semibold text-neutral-700 mb-2">{label}</label>
      )}
      {children}
      {helper && <p className="mt-1 text-xs text-neutral-500">{helper}</p>}
    </div>
  );
}

const inputCls =
  'w-full px-3 py-2.5 text-sm border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-colors';

const textareaCls = `${inputCls} resize-y min-h-[90px]`;

function RadioGroup({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-6 mt-1">
      {['Yes', 'No'].map((opt) => (
        <label key={opt} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt.toLowerCase()}
            checked={value === opt.toLowerCase()}
            onChange={() => onChange(opt.toLowerCase())}
            className="w-4 h-4 accent-orange-500"
          />
          <span className="text-sm text-neutral-700">{opt}</span>
        </label>
      ))}
    </div>
  );
}

// ─── Anamnesis Form State ─────────────────────────────────────────────────────

interface AnamnesisFormData {
  chiefComplaint: string;
  mainSymptoms: string;
  initialSymptoms: string;
  diagnosisRelated: string;
  diagnosisDetails: string;
  symptomsStart: string;
  symptomsDuration: string;
  symptomsFrequency: string;
  symptomsIntensity: string;
  symptomsProgression: string;
  secondarySymptoms: string[];
  secondaryDetails: string;
  hasOperations: string;
  operationsDetails: string;
  treatments: string;
  medications: string;
  brainMRI: string;
  mriDetails: string;
  otherScans: string;
  neuromodulation: string;
  neuromodulationDetails: string;
}

const defaultForm: AnamnesisFormData = {
  chiefComplaint: '',
  mainSymptoms: '',
  initialSymptoms: '',
  diagnosisRelated: '',
  diagnosisDetails: '',
  symptomsStart: '',
  symptomsDuration: '',
  symptomsFrequency: '',
  symptomsIntensity: '',
  symptomsProgression: '',
  secondarySymptoms: [],
  secondaryDetails: '',
  hasOperations: '',
  operationsDetails: '',
  treatments: '',
  medications: '',
  brainMRI: '',
  mriDetails: '',
  otherScans: '',
  neuromodulation: '',
  neuromodulationDetails: '',
};

const SECONDARY_SYMPTOMS = [
  { value: 'sleep', label: 'Sleep Issues' },
  { value: 'concentration', label: 'Concentration Problems' },
  { value: 'memory', label: 'Memory Issues' },
  { value: 'gastrointestinal', label: 'Gastrointestinal Issues' },
  { value: 'mood', label: 'Mood Fluctuations' },
  { value: 'fatigue', label: 'Fatigue' },
  { value: 'weakness', label: 'Weakness' },
  { value: 'pain', label: 'Pain' },
  { value: 'depression', label: 'Depression/Anxiety' },
  { value: 'bladder', label: 'Bladder Function Issues' },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export function AnamnesisTab({ patientName }: { patientName?: string }) {
  const [form, setForm] = useState<AnamnesisFormData>(defaultForm);
  const [saved, setSaved] = useState(false);

  const set = (field: keyof AnamnesisFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setSaved(false);
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const setRadio = (field: keyof AnamnesisFormData) => (v: string) => {
    setSaved(false);
    setForm((prev) => ({ ...prev, [field]: v }));
  };

  const toggleSecondary = (value: string) => {
    setSaved(false);
    setForm((prev) => ({
      ...prev,
      secondarySymptoms: prev.secondarySymptoms.includes(value)
        ? prev.secondarySymptoms.filter((s) => s !== value)
        : [...prev.secondarySymptoms, value],
    }));
  };

  const handleSave = () => {
    // In production this would call an API; for now persist to localStorage
    const key = `anamnesisData_${patientName ?? 'unknown'}`;
    localStorage.setItem(
      key,
      JSON.stringify({ ...form, completedAt: new Date().toISOString() })
    );
    setSaved(true);
  };

  const cardCls = 'bg-white rounded-xl p-6 mb-5 shadow-sm border border-neutral-100';

  return (
    <div className="max-w-3xl mx-auto">
      {/* Section 1 – Chief Complaint */}
      <div className={cardCls}>
        <SectionTitle icon={<ClipboardList className="w-5 h-5" />}>
          1. Chief Complaint &amp; Diagnosis
        </SectionTitle>
        <FormGroup label="Why are you here today? / Primary Diagnosis">
          <textarea
            className={textareaCls}
            placeholder="Describe the main reason for this visit and any existing diagnosis..."
            value={form.chiefComplaint}
            onChange={set('chiefComplaint')}
          />
        </FormGroup>
      </div>

      {/* Section 2 – Main Symptoms */}
      <div className={cardCls}>
        <SectionTitle icon={<AlertTriangle className="w-5 h-5" />}>
          2. Main Symptoms
        </SectionTitle>

        <FormGroup label="What are your main symptoms?">
          <textarea
            className={textareaCls}
            placeholder="Describe the primary symptoms you are experiencing..."
            value={form.mainSymptoms}
            onChange={set('mainSymptoms')}
          />
        </FormGroup>

        <FormGroup label="What were the initial symptoms?">
          <textarea
            className={textareaCls}
            placeholder="Describe how your symptoms first appeared..."
            value={form.initialSymptoms}
            onChange={set('initialSymptoms')}
          />
        </FormGroup>

        <FormGroup label="Is there a diagnosis related to the symptoms?">
          <RadioGroup
            name="diagnosisRelated"
            value={form.diagnosisRelated}
            onChange={setRadio('diagnosisRelated')}
          />
          <input
            className={`${inputCls} mt-3`}
            placeholder="If yes, please specify the diagnosis..."
            value={form.diagnosisDetails}
            onChange={set('diagnosisDetails')}
          />
        </FormGroup>

        <FormGroup label="When did the symptoms start?">
          <input
            className={inputCls}
            placeholder="e.g., 3 months ago, January 2024..."
            value={form.symptomsStart}
            onChange={set('symptomsStart')}
          />
        </FormGroup>

        <FormGroup label="For how long have you had these symptoms?">
          <input
            className={inputCls}
            placeholder="e.g., 2 weeks, 6 months, 2 years..."
            value={form.symptomsDuration}
            onChange={set('symptomsDuration')}
          />
        </FormGroup>

        <FormGroup label="How often do you have these symptoms?">
          <select
            className={inputCls}
            value={form.symptomsFrequency}
            onChange={set('symptomsFrequency')}
          >
            <option value="">Select frequency...</option>
            <option value="daily">Daily</option>
            <option value="several-times-week">Several times a week</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="occasionally">Occasionally</option>
          </select>
        </FormGroup>

        <FormGroup label="How intense or severe are these symptoms?">
          <select
            className={inputCls}
            value={form.symptomsIntensity}
            onChange={set('symptomsIntensity')}
          >
            <option value="">Select intensity...</option>
            <option value="mild">Mild</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
            <option value="very-severe">Very Severe</option>
          </select>
        </FormGroup>

        <FormGroup label="Are the symptoms getting better, worse, or staying about the same?">
          <select
            className={inputCls}
            value={form.symptomsProgression}
            onChange={set('symptomsProgression')}
          >
            <option value="">Select progression...</option>
            <option value="better">Getting better</option>
            <option value="worse">Getting worse</option>
            <option value="same">Staying about the same</option>
            <option value="fluctuating">Fluctuating</option>
          </select>
        </FormGroup>
      </div>

      {/* Section 3 – Secondary Symptoms */}
      <div className={cardCls}>
        <SectionTitle icon={<List className="w-5 h-5" />}>
          3. Secondary Symptoms
        </SectionTitle>
        <p className="text-xs text-neutral-500 mb-4">
          Please check all that apply and provide details where relevant:
        </p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {SECONDARY_SYMPTOMS.map((s) => (
            <label key={s.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.secondarySymptoms.includes(s.value)}
                onChange={() => toggleSecondary(s.value)}
                className="w-4 h-4 accent-orange-500"
              />
              <span className="text-sm text-neutral-700">{s.label}</span>
            </label>
          ))}
        </div>

        <FormGroup label="Additional details about secondary symptoms:">
          <textarea
            className={textareaCls}
            placeholder="Please provide more details about the checked symptoms..."
            value={form.secondaryDetails}
            onChange={set('secondaryDetails')}
          />
        </FormGroup>
      </div>

      {/* Section 4 – Operations/Surgeries */}
      <div className={cardCls}>
        <SectionTitle icon={<Stethoscope className="w-5 h-5" />}>
          4. Operations / Surgeries
        </SectionTitle>

        <FormGroup label="Have you had any operations or surgeries?">
          <RadioGroup
            name="hasOperations"
            value={form.hasOperations}
            onChange={setRadio('hasOperations')}
          />
        </FormGroup>

        <FormGroup label="If yes, please provide details:">
          <textarea
            className={textareaCls}
            placeholder="Include: Which operations, how many, when performed, post-surgery condition/effects..."
            value={form.operationsDetails}
            onChange={set('operationsDetails')}
          />
        </FormGroup>
      </div>

      {/* Section 5 – Treatments */}
      <div className={cardCls}>
        <SectionTitle icon={<Activity className="w-5 h-5" />}>
          5. Previous or Ongoing Treatments
        </SectionTitle>

        <FormGroup label="Previous or ongoing treatments (physiotherapy, speech therapy, psychotherapy, etc.)">
          <textarea
            className={textareaCls}
            placeholder="Include: Type of treatment, how long, how often, outcomes/improvements..."
            value={form.treatments}
            onChange={set('treatments')}
          />
        </FormGroup>
      </div>

      {/* Section 6 – Medications */}
      <div className={cardCls}>
        <SectionTitle icon={<Pill className="w-5 h-5" />}>
          6. Medications &amp; Supplements
        </SectionTitle>

        <FormGroup label="Current medications and supplements:">
          <textarea
            className={textareaCls}
            placeholder="List all current medications and supplements with dosages..."
            value={form.medications}
            onChange={set('medications')}
          />
        </FormGroup>
      </div>

      {/* Section 7 – Brain MRI */}
      <div className={cardCls}>
        <SectionTitle icon={<Brain className="w-5 h-5" />}>
          7. Brain MRI &amp; Other Scans
        </SectionTitle>

        <FormGroup label="Have you had a Brain MRI?">
          <RadioGroup
            name="brainMRI"
            value={form.brainMRI}
            onChange={setRadio('brainMRI')}
          />
        </FormGroup>

        <FormGroup label="If yes, when was it performed and what were the results?">
          <textarea
            className={textareaCls}
            placeholder="Include: Date of MRI, results, any other scans (CT, EEG, EMG)..."
            value={form.mriDetails}
            onChange={set('mriDetails')}
          />
        </FormGroup>

        <FormGroup label="Other scans (CT, EEG, EMG, etc.):">
          <textarea
            className={textareaCls}
            placeholder="List any other scans or tests performed..."
            value={form.otherScans}
            onChange={set('otherScans')}
          />
        </FormGroup>
      </div>

      {/* Section 8 – Neuromodulation */}
      <div className={cardCls}>
        <SectionTitle icon={<Zap className="w-5 h-5" />}>
          8. Neuromodulation Experience
        </SectionTitle>

        <FormGroup label="Have you used any neuromodulation techniques before?">
          <RadioGroup
            name="neuromodulation"
            value={form.neuromodulation}
            onChange={setRadio('neuromodulation')}
          />
        </FormGroup>

        <FormGroup label="If yes, please specify devices used and experience:">
          <textarea
            className={textareaCls}
            placeholder="Include: Type of device, duration of use, effectiveness, any side effects..."
            value={form.neuromodulationDetails}
            onChange={set('neuromodulationDetails')}
          />
        </FormGroup>
      </div>

      {/* Save Button */}
      <div className="flex justify-center mt-2 mb-8">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold px-8 py-3.5 rounded-lg transition-all shadow-sm"
        >
          <Save className="w-5 h-5" />
          {saved ? 'Saved!' : 'Save Anamnesis Form'}
        </button>
      </div>
    </div>
  );
}
