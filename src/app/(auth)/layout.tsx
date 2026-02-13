import { type ReactNode } from 'react';
import Image from 'next/image';

/**
 * Auth Layout
 * Centered layout for authentication pages
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex w-full items-center justify-center bg-white px-6 lg:w-1/2 lg:px-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-10 flex justify-center lg:justify-start">
            <Image
              src="/logo1.png"
              alt="SOZO Brain Center"
              width={180}
              height={60}
              priority
              className="h-auto w-auto"
            />
          </div>
          
          {/* Form Content */}
          {children}
        </div>
      </div>

      {/* Right Side - Decorative Background */}
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 lg:block">
        {/* Decorative circles */}
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/10"></div>
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/5"></div>
        
        {/* Center Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/logo1.png"
            alt="SOZO"
            width={120}
            height={120}
            className="h-auto w-auto opacity-90"
          />
        </div>

        {/* Floating Cards */}
        <div className="absolute right-16 top-24 rounded-2xl bg-white/10 px-6 py-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-white">Book Appointments</span>
          </div>
        </div>

        <div className="absolute left-16 top-1/3 rounded-2xl bg-white/10 px-6 py-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-white">Buy Devices</span>
          </div>
        </div>

        <div className="absolute bottom-32 right-20 rounded-2xl bg-white/10 px-6 py-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-white">Track your Sessions</span>
          </div>
        </div>

        
        
      </div>
    </div>
  );
}
