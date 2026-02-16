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

/**
 * Register Page
 */
export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

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

  const roleOptions = Object.entries(ROLE_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  return (
    <div className="w-full rounded-3xl bg-white p-8 shadow-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Let&apos;s set up your account</h2>
        <p className="mt-1 text-sm text-gray-600">Get started with Sozo Healthcare</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="First Name"
              disabled={isLoading}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Last Name"
              disabled={isLoading}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              {...register('lastName')}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            disabled={isLoading}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            disabled={isLoading}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            {...register('phone')}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <select
            disabled={isLoading}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            {...register('role')}
          >
            <option value="">Select Role</option>
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            disabled={isLoading}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            {...register('password')}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            disabled={isLoading}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-orange-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold text-orange-500 hover:text-orange-600"
          >
            Sign in
          </Link>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          By continuing, you agree to Sozo&apos;s{' '}
          <Link href="/terms" className="underline hover:text-gray-700">
            Terms & conditions
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline hover:text-gray-700">
            Privacy Policy
          </Link>
        </div>
      </form>
    </div>
  );
}
