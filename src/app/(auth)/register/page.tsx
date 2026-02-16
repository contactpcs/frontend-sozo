"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerSchema, type RegisterFormData } from '@/lib/validators';
import { ROLE_LABELS } from '@/lib/constants';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/store/redux';
import { setSignupData } from '@/store/redux/slices/authSlice';
import { usersService } from '@/lib/api/services';
import { useState } from 'react';
import type { BackendRegisterRequest } from '@/lib/validators/auth.schema';
import { Calendar } from 'lucide-react';

/**
 * Register Page - Receptionist Onboarding
 */
export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isGuardian, setIsGuardian] = useState(false);

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      // Convert frontend camelCase to backend snake_case
      const backendData: BackendRegisterRequest = {
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        role: data.role as 'patient' | 'clinician' | 'nurse' | 'admin' | 'center_manager',
      };

      // Call backend register endpoint
      const response = await usersService.register(backendData);

      // Save to Redux state
      dispatch(setSignupData(data));

      // Log success
      console.log('User registered successfully:', response);
      toast.success('Account created successfully! Redirecting to login...');

      // Redirect to login after a short delay
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (error: any) {
      console.error('Registration error:', error);

      // Handle specific error cases
      if (error.response?.status === 409) {
        toast.error('Email already exists. Please try another.');
      } else if (error.response?.status === 400) {
        toast.error(error.response?.data?.detail || 'Invalid registration data. Please check your input.');
      } else if (error.response?.data?.detail) {
        toast.error(error.response.data.detail);
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-center text-2xl font-semibold text-zinc-950">
          Let&apos;s set up your account
        </h1>
      </div>

      {/* Guardian Checkbox */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="is-guardian"
          checked={isGuardian}
          onChange={(e) => setIsGuardian(e.target.checked)}
          className="h-6 w-6 cursor-pointer accent-orange-500"
        />
        <label htmlFor="is-guardian" className="cursor-pointer text-base font-normal text-black">
          Check if you&apos;re a relative/guardian of the patient
        </label>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name & Email in Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="Full name"
              disabled={isLoading}
              className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-950 placeholder-zinc-700 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              disabled={isLoading}
              className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-950 placeholder-zinc-700 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-normal text-zinc-600">🇺🇸</span>
              <span className="text-sm font-normal text-zinc-600">+1</span>
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              disabled={isLoading}
              className="flex-1 bg-white text-sm text-zinc-950 placeholder-zinc-700 outline-none disabled:cursor-not-allowed disabled:opacity-60"
              {...register('phone')}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <div className="relative flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5">
            <input
              type="date"
              disabled={isLoading}
              className="flex-1 bg-white text-sm text-zinc-700 placeholder-zinc-700 outline-none disabled:cursor-not-allowed disabled:opacity-60"
              {...register('phone')}
            />
            <Calendar size={20} className="pointer-events-none text-zinc-600" />
          </div>
          <p className="mt-1 text-xs text-zinc-600">Date of Birth</p>
        </div>

        {/* Country & City */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <select
              disabled={isLoading}
              className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              defaultValue=""
            >
              <option value="" disabled>
                Country
              </option>
              <option value="us">United States</option>
              <option value="ca">Canada</option>
              <option value="uk">United Kingdom</option>
            </select>
          </div>

          <div>
            <select
              disabled={isLoading}
              className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 transition-colors focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              defaultValue=""
            >
              <option value="" disabled>
                City
              </option>
              <option value="ny">New York</option>
              <option value="la">Los Angeles</option>
              <option value="chicago">Chicago</option>
            </select>
          </div>
        </div>

        {/* Next Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-[24px] bg-[#F47920] px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
>

          {isLoading ? 'Processing...' : 'Next'}
        </button>

        {/* Sign In Link */}
        <div className="text-center text-sm text-zinc-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-zinc-950 hover:underline">
            Sign in
          </Link>
        </div>

        {/* Terms Footer */}
        <div className="text-center text-xs text-zinc-600">
          <p>
            By continuing, you agree to Sozo&apos;s{' '}
            <Link href="/terms" className="text-zinc-950 underline hover:no-underline">
              Terms & conditions
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-zinc-950 underline hover:no-underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
