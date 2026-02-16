'use client';

import Link from 'next/link';
import { useAppSelector } from '@/store/redux';

export default function DummyLanding() {
  const signupData = useAppSelector((state) => state.auth.signupData);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-6">
      <div className="max-w-2xl w-full rounded-lg bg-white p-8 shadow">
        <h1 className="text-2xl font-bold">Signup Complete (Frontend Test)</h1>
        <p className="mt-2 text-sm text-neutral-600">This is a dummy landing page for testing the frontend signup flow.</p>

        <div className="mt-6">
          <h2 className="font-medium">Captured Signup Data</h2>
          <pre className="mt-2 max-h-64 overflow-auto rounded bg-neutral-100 p-4 text-xs">{JSON.stringify(signupData, null, 2)}</pre>
        </div>

        <div className="mt-6">
          <Link href="/" className="text-sm text-orange-500">Return to Home</Link>
        </div>
      </div>
    </div>
  );
}
