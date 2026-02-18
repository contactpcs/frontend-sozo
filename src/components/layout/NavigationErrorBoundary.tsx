'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary for Navigation Issues
 */
export class NavigationErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Navigation error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });

    // Force refresh to reset app state
    window.location.href = '/dashboard';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Navigation Error
            </h2>

            <p className="text-neutral-600 mb-6">
              Something went wrong with navigation. Please try again.
            </p>

            {this.state.error && (
              <details className="mb-6 p-3 bg-neutral-100 rounded text-left text-sm">
                <summary className="cursor-pointer font-medium mb-2">
                  Error Details
                </summary>
                <pre className="whitespace-pre-wrap text-xs text-neutral-700">
                  {this.state.error.message}
                </pre>
              </details>
            )}

            <div className="space-y-3">
              <Button onClick={this.handleReset} className="w-full">
                Return to Dashboard
              </Button>

              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="w-full"
              >
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
