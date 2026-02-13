import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import type { ApiError, ApiResponse } from '@/types';

/**
 * API Configuration
 */
const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  TIMEOUT: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
  HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
} as const;

/**
 * Create Axios Instance
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: API_CONFIG.HEADERS,
    withCredentials: true, // Important for httpOnly cookies
  });

  return instance;
};

/**
 * Main API Client Instance
 */
export const apiClient: AxiosInstance = createAxiosInstance();

/**
 * Get Authentication Token
 * In production, this would typically come from httpOnly cookie automatically
 * This is a fallback for development or non-cookie scenarios
 */
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  // Try localStorage as fallback (not recommended for production)
  return localStorage.getItem('access_token');
};

/**
 * Request Interceptor
 * Attaches authentication token to every request
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request timestamp for debugging
    if (process.env.NODE_ENV === 'development') {
      config.headers['X-Request-Time'] = new Date().toISOString();
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles responses and errors uniformly
 */
apiClient.interceptors.response.use(
  (response) => {
    // Unwrap data if it's wrapped in ApiResponse structure
    if (response && typeof response === 'object' && 'data' in response) {
      return response;
    }
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized - Token Refresh Logic
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (refreshToken) {
          const response = await axios.post(
            `${API_CONFIG.BASE_URL}/v1/auth/refresh`,
            { refreshToken },
            { withCredentials: true }
          );

          const { accessToken } = response.data;
          
          if (accessToken) {
            localStorage.setItem('access_token', accessToken);
            
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }
            
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        // Refresh failed - redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    // Normalize error response
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      code: error.response?.data?.code || 'UNKNOWN_ERROR',
      status: error.response?.status || 500,
      errors: error.response?.data?.errors,
    };

    return Promise.reject(apiError);
  }
);

/**
 * Generic API Request Helper
 */
export const apiRequest = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  data?: unknown,
  config?: InternalAxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.request<ApiResponse<T>>({
    method,
    url,
    data,
    ...config,
  });

  return response.data.data;
};

/**
 * Convenience Methods
 */
export const api = {
  get: <T>(url: string, config?: InternalAxiosRequestConfig) =>
    apiRequest<T>('GET', url, undefined, config),

  post: <T>(url: string, data?: unknown, config?: InternalAxiosRequestConfig) =>
    apiRequest<T>('POST', url, data, config),

  put: <T>(url: string, data?: unknown, config?: InternalAxiosRequestConfig) =>
    apiRequest<T>('PUT', url, data, config),

  patch: <T>(url: string, data?: unknown, config?: InternalAxiosRequestConfig) =>
    apiRequest<T>('PATCH', url, data, config),

  delete: <T>(url: string, config?: InternalAxiosRequestConfig) =>
    apiRequest<T>('DELETE', url, undefined, config),
};

export default apiClient;
