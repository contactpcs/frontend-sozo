import { type ReactNode } from 'react';
import Image from 'next/image';

/**
 * Auth Layout
 * Centered layout for authentication pages
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen gap-2.5 p-5" style={{ backgroundImage: "linear-gradient(119.97deg, rgb(0, 164, 234) 0%, rgb(255, 112, 0) 99.51%)" }}>
      {/* Left Side - Form */}
      <div className="flex w-full items-center justify-center rounded-3xl bg-white px-6 lg:w-1/2 lg:px-12 lg:py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/logo1.png"
              alt="SOZO Brain Center"
              width={171}
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
      <div className="relative hidden w-1/2 overflow-hidden rounded-3xl lg:flex lg:flex-col lg:items-center lg:justify-center">
        {/* Decorative circles */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/10" style={{ width: '664px', height: '664px', left: '50%', top: '50%' }}></div>
        <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/5" style={{ width: '524px', height: '524px', left: '50%', top: '50%' }}></div>
        <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/5" style={{ width: '359px', height: '359px', left: '50%', top: '50%' }}></div>
        <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/5" style={{ width: '217px', height: '217px', left: '50%', top: '50%' }}></div>
        
        {/* Center Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/logo1.png"
            alt="SOZO"
            width={89}
            height={89}
            className="h-auto w-auto opacity-90"
          />
        </div>

        {/* Top Right - Book Appointments */}
        <div className="absolute right-20 top-28 flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 backdrop-blur-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-lg font-normal text-white">Book Appointments</span>
        </div>

        {/* Left Middle - Buy Devices */}
        <div className="absolute left-12 top-1/3 flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 backdrop-blur-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <span className="text-lg font-normal text-white">Buy Devices</span>
        </div>

        {/* Bottom Right - Track your Sessions */}
        <div className="absolute bottom-1/3 right-12 flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 backdrop-blur-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className="text-lg font-normal text-white">Track your Sessions</span>
        </div>
      </div>
    </div>
  );
}
