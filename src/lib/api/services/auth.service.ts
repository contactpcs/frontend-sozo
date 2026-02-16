import { api } from '../axios';
import { ENDPOINTS } from '../endpoints';
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
} from '@/types/auth.types';
import type { BackendRegisterRequest, BackendUserResponse } from '@/lib/validators/auth.schema';

/**
 * Authentication API Service
 */
export const authService = {
  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return api.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, credentials);
  },

  /**
   * Register new user (DEPRECATED - use usersService.register instead)
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    return api.post<AuthResponse>(ENDPOINTS.AUTH.REGISTER, data);
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    return api.post<void>(ENDPOINTS.AUTH.LOGOUT);
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<User> => {
    return api.get<User>(ENDPOINTS.AUTH.ME);
  },

  /**
   * Refresh authentication token
   */
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    return api.post<AuthResponse>(ENDPOINTS.AUTH.REFRESH, { refreshToken });
  },

  /**
   * Verify email
   */
  verifyEmail: async (token: string): Promise<void> => {
    return api.post<void>(ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
  },

  /**
   * Request password reset
   */
  forgotPassword: async (email: string): Promise<void> => {
    return api.post<void>(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  /**
   * Reset password
   */
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    return api.post<void>(ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      newPassword,
    });
  },
};
