import { api } from '../axios';
import { ENDPOINTS } from '../endpoints';
import type {
  Assessment,
  AssessmentCreatePayload,
  AssessmentUpdatePayload,
  PaginatedResponse,
} from '@/types';

/**
 * Assessment API Service
 */
export const assessmentService = {
  /**
   * Get all assessments
   */
  getAll: async (params?: Record<string, unknown>): Promise<PaginatedResponse<Assessment>> => {
    return api.get<PaginatedResponse<Assessment>>(ENDPOINTS.ASSESSMENTS.BASE, { params });
  },

  /**
   * Get single assessment by ID
   */
  getById: async (id: string): Promise<Assessment> => {
    return api.get<Assessment>(ENDPOINTS.ASSESSMENTS.BY_ID(id));
  },

  /**
   * Create new assessment
   */
  create: async (data: AssessmentCreatePayload): Promise<Assessment> => {
    return api.post<Assessment>(ENDPOINTS.ASSESSMENTS.BASE, data);
  },

  /**
   * Update assessment
   */
  update: async (id: string, data: AssessmentUpdatePayload): Promise<Assessment> => {
    return api.patch<Assessment>(ENDPOINTS.ASSESSMENTS.BY_ID(id), data);
  },

  /**
   * Submit assessment for review
   */
  submit: async (id: string): Promise<Assessment> => {
    return api.post<Assessment>(ENDPOINTS.ASSESSMENTS.SUBMIT(id));
  },

  /**
   * Review assessment
   */
  review: async (id: string, notes: string): Promise<Assessment> => {
    return api.post<Assessment>(ENDPOINTS.ASSESSMENTS.REVIEW(id), { notes });
  },

  /**
   * Approve assessment
   */
  approve: async (id: string, notes?: string): Promise<Assessment> => {
    return api.post<Assessment>(ENDPOINTS.ASSESSMENTS.APPROVE(id), { notes });
  },

  /**
   * Reject assessment
   */
  reject: async (id: string, reason: string): Promise<Assessment> => {
    return api.post<Assessment>(ENDPOINTS.ASSESSMENTS.REJECT(id), { reason });
  },

  /**
   * Delete assessment
   */
  delete: async (id: string): Promise<void> => {
    return api.delete<void>(ENDPOINTS.ASSESSMENTS.BY_ID(id));
  },
};
