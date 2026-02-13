import { api } from '../axios';
import { ENDPOINTS } from '../endpoints';
import type {
  Patient,
  PatientPayload,
  PatientListParams,
  PaginatedResponse,
} from '@/types';

/**
 * Patient API Service
 */
export const patientService = {
  /**
   * Get all patients with optional filters
   */
  getAll: async (params?: PatientListParams): Promise<PaginatedResponse<Patient>> => {
    const config = params ? { params } : undefined;
    return api.get<PaginatedResponse<Patient>>(ENDPOINTS.PATIENTS.BASE, config);
  },

  /**
   * Get single patient by ID
   */
  getById: async (id: string): Promise<Patient> => {
    return api.get<Patient>(ENDPOINTS.PATIENTS.BY_ID(id));
  },

  /**
   * Create new patient
   */
  create: async (data: PatientPayload): Promise<Patient> => {
    return api.post<Patient>(ENDPOINTS.PATIENTS.BASE, data);
  },

  /**
   * Update existing patient
   */
  update: async (id: string, data: Partial<PatientPayload>): Promise<Patient> => {
    return api.patch<Patient>(ENDPOINTS.PATIENTS.BY_ID(id), data);
  },

  /**
   * Delete patient
   */
  delete: async (id: string): Promise<void> => {
    return api.delete<void>(ENDPOINTS.PATIENTS.BY_ID(id));
  },

  /**
   * Get patient assessments
   */
  getAssessments: async (id: string): Promise<unknown[]> => {
    return api.get<unknown[]>(ENDPOINTS.PATIENTS.ASSESSMENTS(id));
  },

  /**
   * Get patient history
   */
  getHistory: async (id: string): Promise<unknown[]> => {
    return api.get<unknown[]>(ENDPOINTS.PATIENTS.HISTORY(id));
  },
};
