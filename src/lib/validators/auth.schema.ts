import { z } from 'zod';

/**
 * Login Schema
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

/**
 * Registration Schema
 */
export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain uppercase, lowercase, number and special character'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    firstName: z
      .string()
      .min(1, 'First name is required')
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name must not exceed 50 characters'),
    lastName: z
      .string()
      .min(1, 'Last name is required')
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name must not exceed 50 characters'),
    phone: z
      .string()
      .min(1, 'Phone number is required')
      .regex(/^[+]?[0-9\s\-()]{10,}$/, 'Phone number must be valid'),
    role: z.enum(['patient', 'clinician', 'nurse', 'admin', 'center_manager']),
    centerId: z.string().optional(),
  })
  .refine(
    (data: { password: string; confirmPassword: string }) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    }
  );

/**
 * Forgot Password Schema
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
});

/**
 * Reset Password Schema
 */
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain uppercase, lowercase, number and special character'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(
    (data: { password: string; confirmPassword: string }) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    }
  );

/**
 * Type Exports
 */
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

/**
 * Backend User Registration Request (for /users/register endpoint)
 */
export interface BackendRegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: 'patient' | 'clinician' | 'nurse' | 'admin' | 'center_manager';
}

/**
 * Backend User Response
 */
export interface BackendUserResponse {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: 'patient' | 'clinician' | 'nurse' | 'admin' | 'center_manager';
  is_active: boolean;
  verified_email: boolean;
  created_at: string;
  updated_at: string;
}
