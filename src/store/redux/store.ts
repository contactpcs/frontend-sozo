import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

/**
 * Redux Store Configuration
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

/**
 * Type exports for TypeScript support
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
