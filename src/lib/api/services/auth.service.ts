import { api } from '../axios';
import { ENDPOINTS } from '../endpoints';
import type {
  AuthResponse,
  TokenResponse,
  LoginCredentials,
  RegisterData,
  User,
} from '@/types/auth.types';
import type { BackendRegisterRequest, BackendUserResponse } from '@/lib/validators/auth.schema';

/**
 * Transform backend response (snake_case) to frontend format (camelCase)
 */
const transformTokenResponse = (response: any): AuthResponse => {
  const tokenData = response as TokenResponse;
  let userData = tokenData?.user;
  
  console.log('transformTokenResponse - Full response:', JSON.stringify(response, null, 2));
  console.log('transformTokenResponse - Token data:', tokenData);
  console.log('transformTokenResponse - User data:', userData);
    // If user data is missing, try to extract basic info from access token
  if (!userData) {
    console.warn('transformTokenResponse - No user data in response, attempting to decode from JWT');
    try {
      // Decode JWT to extract claims
      const tokenParts = tokenData?.access_token?.split('.');
      if (tokenParts && tokenParts.length === 3) {
        const decoded = JSON.parse(atob(tokenParts[1]));
        console.log('transformTokenResponse - Decoded JWT claims:', decoded);
        userData = {
          user_id: decoded.user_id || 'unknown',
          email: decoded.email || 'unknown',
          first_name: '',
          last_name: '',
          role: decoded.roles?.[0] || 'patient',
          is_active: true,
        };
        console.log('transformTokenResponse - Extracted user from JWT:', userData);
      }
    } catch (e) {
      console.error('transformTokenResponse - Failed to decode JWT:', e);
    }
  }
    if (!userData) {
    console.error('transformTokenResponse - Response structure:', Object.keys(response || {}));
    throw new Error(`No user data in login response. Response keys: ${Object.keys(response || {}).join(', ')}`);
  }

  // Create user object with fallback defaults
  const user: User = {
    id: userData.user_id || '',
    email: userData.email || '',
    firstName: userData.first_name || 'User',
    lastName: userData.last_name || '',
    role: userData.role || 'patient',
    isActive: userData.is_active !== false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Ensure we have access token
  const accessToken = tokenData?.access_token;
  if (!accessToken) {
    throw new Error('No access token in response');
  }

  // Transform to frontend format (camelCase)
  return {
    user,
    accessToken,
    refreshToken: tokenData?.refresh_token,
    expiresIn: tokenData?.expires_in || 3600,
  };
};

/**
 * Authentication API Service
 */
export const authService = {
  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      console.log('Login request:', { email: credentials.email });
      const response = await api.post<TokenResponse>(ENDPOINTS.AUTH.LOGIN, credentials);
      console.log('Login response:', response);
      
      if (!response) {
        throw new Error('Empty response from login endpoint');
      }
      
      return transformTokenResponse(response);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Register new user (DEPRECATED - use usersService.register instead)
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      console.log('Register request:', { email: data.email });
      const response = await api.post<TokenResponse>(ENDPOINTS.AUTH.REGISTER, data);
      console.log('Register response:', response);
      
      if (!response) {
        throw new Error('Empty response from register endpoint');
      }
      
      return transformTokenResponse(response);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
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
    return api.get<User>(ENDPOINTS.USERS.PROFILE);
  },

  /**
   * Refresh authentication token
   */
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await api.post<TokenResponse>(ENDPOINTS.AUTH.REFRESH, { refresh_token: refreshToken });
    return transformTokenResponse(response);
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
