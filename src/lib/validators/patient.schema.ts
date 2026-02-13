import { z } from 'zod';

/**
 * Address Schema
 */
const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State is required').max(2, 'Use state abbreviation'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  country: z.string().min(1, 'Country is required').default('USA'),
});

/**
 * Patient Create/Update Schema
 */
export const patientSchema = z.object({
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
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine(
      (date: string) => {
        const dob = new Date(date);
        const today = new Date();
        return dob < today;
      },
      'Date of birth must be in the past'
    ),
  email: z
    .string()
    .email('Invalid email address')
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .regex(/^\+?1?\d{10,14}$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
  address: addressSchema.optional(),
  assignedDoctorId: z.string().optional(),
  centerId: z.string().min(1, 'Center is required'),
});

/**
 * Type Export
 */
export type PatientFormData = z.infer<typeof patientSchema>;
