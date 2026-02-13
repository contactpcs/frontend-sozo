import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Card Props Interface
 */
export interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Card Component
 */
export function Card({ children, className, padding = 'md' }: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'rounded-lg border border-neutral-200 bg-white shadow-soft',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Card Header Component
 */
export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mb-4', className)}>{children}</div>;
}

/**
 * Card Title Component
 */
export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn('text-lg font-semibold text-neutral-900', className)}>{children}</h3>;
}

/**
 * Card Description Component
 */
export function CardDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn('mt-1 text-sm text-neutral-600', className)}>{children}</p>;
}

/**
 * Card Content Component
 */
export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(className)}>{children}</div>;
}

/**
 * Card Footer Component
 */
export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mt-6 flex items-center gap-3', className)}>{children}</div>;
}
