import { apiClient } from '../axios';
import { ENDPOINTS } from '../endpoints';
import type { BackendRegisterRequest, BackendUserResponse } from '@/lib/validators/auth.schema';

/**
 * Users API Service
 * Handles user registration, profile management, and role management
 */
export const usersService = {
  /**
   * Register new user with the backend
   * Maps frontend camelCase fields to backend snake_case
   */
  register: async (data: BackendRegisterRequest): Promise<BackendUserResponse> => {
    const response = await apiClient.post<BackendUserResponse>(
      ENDPOINTS.USERS.REGISTER,
      data
    );
    // Backend returns UserResponse directly in response.data
    return response.data;
  },

  /**
   * Get all available roles for role selection
   */
  getRoles: async (): Promise<any> => {
    const response = await apiClient.get(ENDPOINTS.USERS.ROLES);
    return response.data;
  },

  /**
   * Get user profile by ID
   */
  getUserProfile: async (userId: string): Promise<BackendUserResponse> => {
    const response = await apiClient.get<BackendUserResponse>(
      ENDPOINTS.USERS.BY_ID(userId)
    );
    return response.data;
  },

  /**
   * Update user role
   */
  updateUserRole: async (userId: string, roleId: string): Promise<any> => {
    const response = await apiClient.put(
      ENDPOINTS.USERS.UPDATE_ROLE(userId),
      { roleId }
    );
    return response.data;
  },
};
