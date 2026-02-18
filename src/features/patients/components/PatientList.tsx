'use client';

import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Badge, Card } from '@/components/ui';
import { PATIENT_STATUS_LABELS } from '@/lib/constants';
import type { Patient } from '@/types';

/**
 * Patient List Props
 */
interface PatientListProps {
  patients: Patient[];
  isLoading?: boolean;
}

/**
 * Patient List Component
 */
export function PatientList({ patients, isLoading }: PatientListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-20 bg-neutral-100 rounded"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (patients.length === 0) {
    return (
      <Card>
        <div className="py-12 text-center">
          <p className="text-neutral-600">No patients found</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {patients.map((patient) => (
        <Link key={patient.id} href={`/doctor/dashboard/${patient.id}`}>
          <Card className="transition-shadow hover:shadow-medium">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-semibold">
                  {patient.firstName.charAt(0)}
                  {patient.lastName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">
                    {patient.firstName} {patient.lastName}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    MRN: {patient.medicalRecordNumber} • DOB:{' '}
                    {formatDate(patient.dateOfBirth)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  variant={
                    patient.status === 'active'
                      ? 'success'
                      : patient.status === 'completed'
                      ? 'primary'
                      : 'default'
                  }
                >
                  {PATIENT_STATUS_LABELS[patient.status]}
                </Badge>
                <div className="text-sm text-neutral-600">
                  Updated {formatDate(patient.updatedAt)}
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
