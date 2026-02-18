'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type NavigationState = 'idle' | 'navigating' | 'error';

interface UseNavigationResult {
  state: NavigationState;
  currentPath: string;
  isNavigating: boolean;
  navigate: (path: string) => void;
  resetError: () => void;
}

/**
 * Hook for managing navigation state
 */
export function useNavigation(): UseNavigationResult {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<NavigationState>('idle');

  const navigate = (path: string) => {
    setState('navigating');

    try {
      router.push(path);

      // Reset state after a short delay to allow navigation to complete
      setTimeout(() => {
        setState('idle');
      }, 100);
    } catch (error) {
      console.error('Navigation error:', error);
      setState('error');
    }
  };

  const resetError = () => {
    setState('idle');
  };

  useEffect(() => {
    // Reset navigation state when pathname changes
    setState('idle');
  }, [pathname]);

  return {
    state,
    currentPath: pathname,
    isNavigating: state === 'navigating',
    navigate,
    resetError,
  };
}
