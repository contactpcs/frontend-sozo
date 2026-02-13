/**
 * Application Constants
 */

export const APP_NAME = 'Sozo Healthcare Platform';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Enterprise Healthcare SaaS Platform';

/**
 * User Roles
 */
export const USER_ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  REVIEWER: 'reviewer',
  ADMIN: 'admin',
} as const;

/**
 * Role Labels
 */
export const ROLE_LABELS: Record<string, string> = {
  patient: 'Patient',
  doctor: 'Doctor',
  reviewer: 'Reviewer',
  admin: 'Administrator',
};

/**
 * Patient Status
 */
export const PATIENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
} as const;

/**
 * Status Labels
 */
export const PATIENT_STATUS_LABELS: Record<string, string> = {
  active: 'Active',
  inactive: 'Inactive',
  completed: 'Completed',
  archived: 'Archived',
};

/**
 * Status Colors (Tailwind classes)
 */
export const PATIENT_STATUS_COLORS: Record<string, string> = {
  active: 'bg-success-100 text-success-700',
  inactive: 'bg-neutral-100 text-neutral-700',
  completed: 'bg-primary-100 text-primary-700',
  archived: 'bg-neutral-200 text-neutral-600',
};

/**
 * Assessment Status
 */
export const ASSESSMENT_STATUS = {
  DRAFT: 'draft',
  IN_PROGRESS: 'in_progress',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

/**
 * Assessment Status Labels
 */
export const ASSESSMENT_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  in_progress: 'In Progress',
  submitted: 'Submitted',
  under_review: 'Under Review',
  approved: 'Approved',
  rejected: 'Rejected',
};

/**
 * Assessment Status Colors
 */
export const ASSESSMENT_STATUS_COLORS: Record<string, string> = {
  draft: 'bg-neutral-100 text-neutral-700',
  in_progress: 'bg-warning-100 text-warning-700',
  submitted: 'bg-primary-100 text-primary-700',
  under_review: 'bg-secondary-100 text-secondary-700',
  approved: 'bg-success-100 text-success-700',
  rejected: 'bg-error-100 text-error-700',
};

/**
 * Pagination Defaults
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

/**
 * Date Formats
 */
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  FULL: 'MMMM dd, yyyy',
  SHORT: 'MM/dd/yyyy',
  TIME: 'hh:mm a',
  DATETIME: 'MMM dd, yyyy hh:mm a',
  ISO: "yyyy-MM-dd'T'HH:mm:ss'Z'",
} as const;

/**
 * API Configuration
 */
export const API_CONFIG = {
  REQUEST_TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  SIDEBAR_STATE: 'sidebar_state',
} as const;

/**
 * Route Paths
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PATIENTS: '/dashboard/patients',
  ASSESSMENTS: '/dashboard/assessments',
  REVIEW: '/dashboard/review',
  ADMIN: '/dashboard/admin',
  SETTINGS: '/dashboard/settings',
  PROFILE: '/dashboard/profile',
} as const;

/**
 * Protected Routes (require authentication)
 */
export const PROTECTED_ROUTES = [
  '/dashboard',
  '/dashboard/patients',
  '/dashboard/assessments',
  '/dashboard/review',
  '/dashboard/admin',
  '/dashboard/settings',
];

/**
 * Public Routes (no authentication required)
 */
export const PUBLIC_ROUTES = ['/', '/login', '/register', '/forgot-password'];

/**
 * Role-based Route Access
 */
export const ROLE_ROUTES: Record<string, string[]> = {
  patient: ['/dashboard', '/dashboard/assessments', '/dashboard/settings'],
  doctor: [
    '/dashboard',
    '/dashboard/patients',
    '/dashboard/assessments',
    '/dashboard/settings',
  ],
  reviewer: ['/dashboard', '/dashboard/review', '/dashboard/settings'],
  admin: [
    '/dashboard',
    '/dashboard/patients',
    '/dashboard/assessments',
    '/dashboard/review',
    '/dashboard/admin',
    '/dashboard/settings',
  ],
};
