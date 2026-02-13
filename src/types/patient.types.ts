/**
 * Patient Status
 */
export type PatientStatus = 'active' | 'inactive' | 'completed' | 'archived';

/**
 * Patient Type Definition
 */
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email?: string;
  phone?: string;
  address?: Address;
  medicalRecordNumber: string;
  status: PatientStatus;
  assignedDoctorId?: string;
  centerId: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Address Type
 */
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

/**
 * Patient Create/Update Payload
 */
export interface PatientPayload {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email?: string;
  phone?: string;
  address?: Address;
  assignedDoctorId?: string;
  centerId: string;
}

/**
 * Patient List Query Parameters
 */
export interface PatientListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: PatientStatus;
  centerId?: string;
  assignedDoctorId?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
