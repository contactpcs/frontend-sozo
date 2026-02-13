'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, ModalFooter, Button, Input } from '@/components/ui';
import { patientSchema, type PatientFormData } from '@/lib/validators';
import { useCreatePatient } from '@/lib/hooks';
import toast from 'react-hot-toast';

/**
 * Create Patient Modal Props
 */
interface CreatePatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Create Patient Modal Component
 */
export function CreatePatientModal({ isOpen, onClose }: CreatePatientModalProps) {
  const createPatientMutation = useCreatePatient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  });

  const onSubmit = (data: PatientFormData) => {
    createPatientMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Patient created successfully!');
        reset();
        onClose();
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Failed to create patient');
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Patient" size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            placeholder="John"
            error={errors.firstName?.message}
            {...register('firstName')}
          />

          <Input
            label="Last Name"
            placeholder="Doe"
            error={errors.lastName?.message}
            {...register('lastName')}
          />
        </div>

        <Input
          label="Date of Birth"
          type="date"
          error={errors.dateOfBirth?.message}
          {...register('dateOfBirth')}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="patient@example.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            error={errors.phone?.message}
            {...register('phone')}
          />
        </div>

        <Input
          label="Center ID"
          placeholder="CENTER-001"
          error={errors.centerId?.message}
          {...register('centerId')}
        />

        <ModalFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={createPatientMutation.isPending}>
            Create Patient
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
