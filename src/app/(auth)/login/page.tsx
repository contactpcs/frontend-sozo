'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useLogin } from '@/lib/hooks';
import { loginSchema, type LoginFormData } from '@/lib/validators';
import toast from 'react-hot-toast';

/**
 * Login Page
 */
export default function LoginPage() {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutate(data);
      toast.success('Login successful!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Welcome Back</h2>
        <p className="mt-1 text-sm text-gray-600">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#00A1E4] focus:outline-none focus:ring-2 focus:ring-[#00A1E4]/20"
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#00A1E4] focus:outline-none focus:ring-2 focus:ring-[#00A1E4]/20"
            {...register('password')}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-[#00A1E4] focus:ring-2 focus:ring-[#00A1E4]/20"
            />
            <span className="ml-2 text-gray-600">Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="font-medium"
            style={{ background: "linear-gradient(108deg, #00A1E4 0%, #09172E 99.51%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full rounded-lg px-4 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          style={{ background: "linear-gradient(108deg, #00A1E4 0%, #09172E 99.51%)" }}
        >
          {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
        </button>

        

        <div className="mt-6 text-center text-xs text-gray-500">
          By continuing, you agree to Neurowellness&apos;s{' '}
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
