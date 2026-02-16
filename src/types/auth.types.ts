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
 * Authentication Response - Frontend format (camelCase)
 */
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

/**
 * Token Response from Backend - Backend format (snake_case)
 */
export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user?: {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: UserRole;
    is_active: boolean;
  };
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
