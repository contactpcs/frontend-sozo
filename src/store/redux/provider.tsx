'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

/**
 * Redux Provider Component
 * Wraps the app with Redux store provider
 */
export function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
