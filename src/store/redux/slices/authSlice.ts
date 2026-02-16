import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RegisterFormData } from '@/lib/validators/auth.schema';

/**
 * Auth Redux Slice State
 */
interface AuthState {
  // Signup state (frontend testing)
  signupData: RegisterFormData | null;
  signupError: string | null;
  isSignupLoading: boolean;
}

/**
 * Initial state
 */
const initialState: AuthState = {
  signupData: null,
  signupError: null,
  isSignupLoading: false,
};

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
    },
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
} = authSlice.actions;

/**
 * Auth Slice Reducer
 */
export default authSlice.reducer;
