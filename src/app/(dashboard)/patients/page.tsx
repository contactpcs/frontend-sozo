'use client';

import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button, Input, Card } from '@/components/ui';
import { usePatients } from '@/lib/hooks';
import { CreatePatientModal, PatientList } from '@/features/patients';

/**
 * Patients Page
 */
export default function PatientsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: patientsData, isLoading } = usePatients({
    search: searchQuery,
    page: 1,
    limit: 20,
  });

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Patients</h1>
          <p className="mt-1 text-neutral-600">Manage and view all patients</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="Search patients by name, MRN, or email..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Patient List */}
      <PatientList patients={patientsData?.data || []} isLoading={isLoading} />

      {/* Pagination Info */}
      {patientsData?.meta && (
        <div className="mt-6 flex items-center justify-between text-sm text-neutral-600">
          <p>
            Showing {patientsData.data.length} of {patientsData.meta.total} patients
          </p>
          <p>
            Page {patientsData.meta.page} of {patientsData.meta.totalPages}
          </p>
        </div>
      )}

      {/* Create Patient Modal */}
      <CreatePatientModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
