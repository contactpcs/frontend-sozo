/**
 * API Endpoints Configuration
 * Centralized endpoint definitions for the entire application
 */

const API_VERSION = '/v1';

export const ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: `${API_VERSION}/users/login`,
    REGISTER: `${API_VERSION}/users/register`,
    LOGOUT: `${API_VERSION}/users/logout`,
    REFRESH: `${API_VERSION}/auth/refresh`,
    ME: `${API_VERSION}/auth/me`,
    VERIFY_EMAIL: `${API_VERSION}/auth/verify-email`,
    FORGOT_PASSWORD: `${API_VERSION}/auth/forgot-password`,
    RESET_PASSWORD: `${API_VERSION}/auth/reset-password`,
  },

  // Patients

  // Assessments
  ASSESSMENTS: {
    BASE: `${API_VERSION}/assessments`,
    BY_ID: (id: string) => `${API_VERSION}/assessments/${id}`,
    SUBMIT: (id: string) => `${API_VERSION}/assessments/${id}/submit`,
    REVIEW: (id: string) => `${API_VERSION}/assessments/${id}/review`,
    APPROVE: (id: string) => `${API_VERSION}/assessments/${id}/approve`,
    REJECT: (id: string) => `${API_VERSION}/assessments/${id}/reject`,
  },

  // PRS (Patient Review System)
  PRS: {
    BASE: `${API_VERSION}/prs`,
    BY_ID: (id: string) => `${API_VERSION}/prs/${id}`,
    PENDING: `${API_VERSION}/prs/pending`,
    ASSIGN: (id: string) => `${API_VERSION}/prs/${id}/assign`,
  },

  // Centers/Facilities
  CENTERS: {
    BASE: `${API_VERSION}/centers`,
    BY_ID: (id: string) => `${API_VERSION}/centers/${id}`,
    STAFF: (id: string) => `${API_VERSION}/centers/${id}/staff`,
    PATIENTS: (id: string) => `${API_VERSION}/centers/${id}/patient`,
  },

  // Users/Staff
  USERS: {
    BASE: `${API_VERSION}/users`,
    REGISTER: `${API_VERSION}/users/register`,
    ROLES: `${API_VERSION}/users/roles`,
    BY_ID: (id: string) => `${API_VERSION}/users/${id}`,
    PROFILE: `${API_VERSION}/users/profile`,
    UPDATE_ROLE: (id: string) => `${API_VERSION}/users/${id}/role`,
  },

  // Workflow
  WORKFLOW: {
    BASE: `${API_VERSION}/workflow`,
    TASKS: `${API_VERSION}/workflow/tasks`,
    TASK_BY_ID: (id: string) => `${API_VERSION}/workflow/tasks/${id}`,
    COMPLETE: (id: string) => `${API_VERSION}/workflow/tasks/${id}/complete`,
  },

  // Audit Logs
  AUDIT: {
    BASE: `${API_VERSION}/audit`,
    BY_ENTITY: (entity: string, id: string) => `${API_VERSION}/audit/${entity}/${id}`,
  },

  // Reports
  REPORTS: {
    BASE: `${API_VERSION}/reports`,
    DASHBOARD: `${API_VERSION}/reports/dashboard`,
    EXPORT: `${API_VERSION}/reports/export`,
  },
} as const;
