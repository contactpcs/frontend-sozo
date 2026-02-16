/**
 * Redux Store Index
 * Central export for Redux store, provider, and typed hooks
 */

export { store } from './store';
export type { RootState, AppDispatch } from './store';
export { ReduxProvider } from './provider';
export { useAppDispatch, useAppSelector } from './hooks';
export { setSignupData, clearSignupData, setSignupError, setSignupLoading, resetAuth } from './slices/authSlice';
