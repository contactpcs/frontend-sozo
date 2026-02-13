import { cn } from '@/lib/utils';

/**
 * Loader Sizes
 */
type LoaderSize = 'sm' | 'md' | 'lg';

/**
 * Loader Props Interface
 */
export interface LoaderProps {
  size?: LoaderSize;
  className?: string;
}

/**
 * Loader Component
 */
export function Loader({ size = 'md', className }: LoaderProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-neutral-300 border-t-primary-600',
          sizeClasses[size],
          className
        )}
      />
    </div>
  );
}

/**
 * Full Page Loader Component
 */
export function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50">
      <Loader size="lg" />
    </div>
  );
}
