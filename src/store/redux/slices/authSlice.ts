import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RegisterFormData } from '@/lib/validators/auth.schema';
import { authService } from '@/lib/api/services';
import { setAuthToken } from '@/lib/auth';
import type { User as AuthUser } from '@/types/auth.types';

/**
 * User Type (using the shared auth type)
 */
export type User = AuthUser;

/**
 * Auth Redux Slice State
 */
interface AuthState {
  // Login state
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loginError: string | null;
  isLoginLoading: boolean;

  // Signup state (frontend testing)
  signupData: RegisterFormData | null;
  signupError: string | null;
  isSignupLoading: boolean;

  // Global loading
  isLoading: boolean;
}

/**
 * Initial state
 */
const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  loginError: null,
  isLoginLoading: false,
  signupData: null,
  signupError: null,
  isSignupLoading: false,
  isLoading: false,
};

/**
 * Async Thunks for Login/Register/Logout
 */

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.login(credentials);

      // Store tokens
      setAuthToken(response.accessToken);
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', response.accessToken);
        if (response.refreshToken) {
          localStorage.setItem('refresh_token', response.refreshToken);
        }
      }

      return {
        user: response.user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken ?? null,
      };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.detail || error?.message || 'Login failed'
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data: RegisterFormData, { rejectWithValue }) => {
    try {
      const response = await authService.register(data as any);

      // Store tokens
      setAuthToken(response.accessToken);
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', response.accessToken);
        if (response.refreshToken) {
          localStorage.setItem('refresh_token', response.refreshToken);
        }
      }

      return {
        user: response.user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken ?? null,
      };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.detail || error?.message || 'Registration failed'
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      // Clear tokens
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
      return null;
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Logout failed');
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getCurrentUser() as any;

      // Map backend snake_case to frontend camelCase
      const mappedUser: User = {
        id: response.id || response.user_id || '',
        email: response.email || '',
        firstName: response.first_name || response.firstName || '',
        lastName: response.last_name || response.lastName || '',
        role: response.role || 'patient',
        centerId: response.center_id || response.centerId,
        isActive: response.is_active !== false,
        createdAt: response.created_at || new Date().toISOString(),
        updatedAt: response.updated_at || new Date().toISOString(),
      };

      return mappedUser;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.detail || error?.message || 'Failed to fetch user'
      );
    }
  }
);

/**
 * Auth Slice
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Signup actions
    setSignupData: (state, action: PayloadAction<RegisterFormData>) => {
      state.signupData = action.payload;
      state.signupError = null;
    },
    clearSignupData: (state) => {
      state.signupData = null;
    },
    setSignupError: (state, action: PayloadAction<string>) => {
      state.signupError = action.payload;
    },
    setSignupLoading: (state, action: PayloadAction<boolean>) => {
      state.isSignupLoading = action.payload;
    },
    resetAuth: (state) => {
      state.signupData = null;
      state.signupError = null;
      state.isSignupLoading = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.loginError = null;
      state.isLoginLoading = false;
    },
    // Manual login action (if needed)
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    // Login User
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoginLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoginLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken ?? null;
        state.isAuthenticated = true;
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.loginError = action.payload as string;
        state.isAuthenticated = false;
      });

    // Register User
    builder
      .addCase(registerUser.pending, (state) => {
        state.isSignupLoading = true;
        state.signupError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isSignupLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken ?? null;
        state.isAuthenticated = true;
        state.signupError = null;
        state.signupData = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isSignupLoading = false;
        state.signupError = action.payload as string;
      });

    // Logout User
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.loginError = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.loginError = action.payload as string;
      });

    // Get Current User
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        // Don't set error here, it's normal if not authenticated
      });
  },
});

/**
 * Auth Slice Actions
 */
export const {
  setSignupData,
  clearSignupData,
  setSignupError,
  setSignupLoading,
  resetAuth,
  setUser,
  clearUser,
} = authSlice.actions;

/**
 * Auth Slice Reducer
 */
export default authSlice.reducer;