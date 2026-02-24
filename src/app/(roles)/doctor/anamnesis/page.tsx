'use client';

import { ClipboardList } from 'lucide-react';
import { AnamnesisTab } from '@/features/patients/AnamnesisTab';

export default function AnamnesisPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 flex items-center gap-3 pb-5 border-b border-neutral-200">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
          <ClipboardList className="h-5 w-5 text-orange-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">New Anamnesis Assessment</h1>
          <p className="text-sm text-neutral-500">Patient Symptoms &amp; Medical History</p>
        </div>
      </div>

      <AnamnesisTab />
    </div>
  );
}
