/**
 * User Roles in the System
 */
export type UserRole = 'patient' | 'clinician' | 'nurse' | 'admin' | 'center_manager';

/**
 * User Type Definition
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  centerId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Authentication Response
 */
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

/**
 * Login Credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration Data
 */
export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  centerId?: string;
}

/**
 * Session State
 */
export interface SessionState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
