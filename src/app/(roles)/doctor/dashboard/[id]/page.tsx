'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Calendar, MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Badge, PageLoader } from '@/components/ui';
import { usePatient } from '@/lib/hooks';
import { formatDate, formatPhoneNumber } from '@/lib/utils';
import { PATIENT_STATUS_LABELS } from '@/lib/constants';

/**
 * Patient Detail Page
 */
export default function PatientDetailPage() {
  const params = useParams();
  const patientId = params.id as string;

  const { data: patient, isLoading } = usePatient(patientId);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!patient) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-neutral-900">Patient not found</h1>
        <Link href="/patient/dashboard" className="mt-4 inline-block text-primary-600">
          Back to patients
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Back Button */}
      <Link
        href="/patient/dashboard"
        className="mb-6 inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Patients
      </Link>

      {/* Patient Header */}
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-2xl font-semibold">
            {patient.firstName.charAt(0)}
            {patient.lastName.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">
              {patient.firstName} {patient.lastName}
            </h1>
            <p className="mt-1 text-neutral-600">MRN: {patient.medicalRecordNumber}</p>
          </div>
        </div>
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
      </div>

      {/* Patient Details */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-neutral-400" />
                <div>
                  <dt className="text-sm text-neutral-600">Date of Birth</dt>
                  <dd className="font-medium text-neutral-900">
                    {formatDate(patient.dateOfBirth)}
                  </dd>
                </div>
              </div>

              {patient.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-neutral-400" />
                  <div>
                    <dt className="text-sm text-neutral-600">Email</dt>
                    <dd className="font-medium text-neutral-900">{patient.email}</dd>
                  </div>
                </div>
              )}

              {patient.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-neutral-400" />
                  <div>
                    <dt className="text-sm text-neutral-600">Phone</dt>
                    <dd className="font-medium text-neutral-900">
                      {formatPhoneNumber(patient.phone)}
                    </dd>
                  </div>
                </div>
              )}

              {patient.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-neutral-400" />
                  <div>
                    <dt className="text-sm text-neutral-600">Address</dt>
                    <dd className="font-medium text-neutral-900">
                      {patient.address.street}, {patient.address.city},{' '}
                      {patient.address.state} {patient.address.zipCode}
                    </dd>
                  </div>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-neutral-600">Center ID</dt>
                <dd className="mt-1 font-medium text-neutral-900">{patient.centerId}</dd>
              </div>

              {patient.assignedDoctorId && (
                <div>
                  <dt className="text-sm text-neutral-600">Assigned Doctor</dt>
                  <dd className="mt-1 font-medium text-neutral-900">
                    {patient.assignedDoctorId}
                  </dd>
                </div>
              )}

              <div>
                <dt className="text-sm text-neutral-600">Created At</dt>
                <dd className="mt-1 font-medium text-neutral-900">
                  {formatDate(patient.createdAt)}
                </dd>
              </div>

              <div>
                <dt className="text-sm text-neutral-600">Last Updated</dt>
                <dd className="mt-1 font-medium text-neutral-900">
                  {formatDate(patient.updatedAt)}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      {/* Assessments Section */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600">No assessments found for this patient.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
