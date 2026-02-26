import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastProvider } from '@/lib/providers';
import { ReduxProvider } from '@/store/redux';
import { AuthInitializer } from '@/components/providers/AuthInitializer';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Sozo Healthcare Platform',
  description: 'Enterprise Healthcare SaaS Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ReduxProvider>
          <AuthInitializer>
            <ToastProvider>
              {children}
            </ToastProvider>
          </AuthInitializer>
        </ReduxProvider>
      </body>
    </html>
  );
}
