'use client';

import { useEffect, useState, useCallback } from 'react';
import { patientService, usersService } from '@/lib/api/services';
import { useAuth } from './useAuth';
import type { PatientPayload, PatientListParams, PaginatedResponse, Patient, User } from '@/types';

/**
 * Simple list fetcher hook
 */
export function usePatients(params?: PatientListParams) {
  const [data, setData] = useState<PaginatedResponse<Patient> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    patientService
      .getAll(params)
      .then((res) => { if (mounted) setData(res); })
      .catch((err) => { if (mounted) setError(err instanceof Error ? err : new Error(String(err))); })
      .finally(() => { if (mounted) setIsLoading(false); });
    return () => { mounted = false; };
  }, [JSON.stringify(params)]);

  return {
    data,
    isLoading,
    error,
    refetch: async () => {
      setIsLoading(true);
      try {
        const res = await patientService.getAll(params);
        setData(res);
        setError(null);
        return res;
      } catch (e) {
        setError(e as Error);
        throw e;
      } finally { setIsLoading(false); }
    }
  };
}

export function usePatient(id?: string) {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setIsLoading(true);
    patientService.getById(id)
      .then((res) => { if (mounted) setData(res); })
      .catch((err) => { if (mounted) setError(err instanceof Error ? err : new Error(String(err))); })
      .finally(() => { if (mounted) setIsLoading(false); });
    return () => { mounted = false; };
  }, [id]);

  return {
    data,
    isLoading,
    error,
    refetch: async () => {
      if (!id) return null;
      setIsLoading(true);
      try {
        const res = await patientService.getById(id);
        setData(res);
        setError(null);
        return res;
      } catch (e) {
        setError(e as Error);
        throw e;
      } finally { setIsLoading(false); }
    }
  };
}

export function useCreatePatient() {
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback(async (data: PatientPayload, onSuccess?: () => void) => {
    setIsPending(true);
    try {
      const res = await patientService.create(data);
      if (onSuccess) onSuccess();
      return res;
    } finally { setIsPending(false); }
  }, []);

  return { mutate, isPending };
}

export function useUpdatePatient() {
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback(async ({ id, data }: { id: string; data: Partial<PatientPayload> }, onSuccess?: () => void) => {
    setIsPending(true);
    try {
      const res = await patientService.update(id, data);
      if (onSuccess) onSuccess();
      return res;
    } finally { setIsPending(false); }
  }, []);

  return { mutate, isPending };
}

export function useDeletePatient() {
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback(async (id: string, onSuccess?: () => void) => {
    setIsPending(true);
    try {
      const res = await patientService.delete(id);
      if (onSuccess) onSuccess();
      return res;
    } finally { setIsPending(false); }
  }, []);

  return { mutate, isPending };
}

export function usePatientAssessments(id?: string) {
  const [data, setData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setIsLoading(true);
    patientService.getAssessments(id)
      .then((res) => { if (mounted) setData(res); })
      .catch((err) => { if (mounted) setError(err instanceof Error ? err : new Error(String(err))); })
      .finally(() => { if (mounted) setIsLoading(false); });
    return () => { mounted = false; };
  }, [id]);

  return { data, isLoading, error, refetch: async () => {
    if (!id) return null;
    setIsLoading(true);
    try {
      const res = await patientService.getAssessments(id);
      setData(res);
      setError(null);
      return res;
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally { setIsLoading(false); }
  } };
}

/**
 * Hook to fetch the current patient's assigned doctor
 */
export function useAssignedDoctor() {
  const [doctor, setDoctor] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;
    
    // Only attempt to fetch if user is a patient
    const isPatient = user?.role === 'patient';
    
    if (!isPatient) {
      if (mounted) {
        setIsLoading(false);
        setDoctor(null);
        setError(null);
      }
      return;
    }

    setIsLoading(true);

    const fetchAssignedDoctor = async () => {
      try {
        // Fetch current patient's profile
        const patient = await patientService.getMyProfile();
        
        if (!patient.assignedDoctorId) {
          if (mounted) {
            setDoctor(null);
            setError(null);
          }
          return;
        }

        // Fetch doctor details using assigned doctor ID
        const doctorData = await usersService.getUserProfile(patient.assignedDoctorId);
        if (mounted) {
          setDoctor(doctorData as any as User);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setDoctor(null);
        }
      }
    };

    fetchAssignedDoctor().finally(() => {
      if (mounted) setIsLoading(false);
    });

    return () => { mounted = false; };
  }, []);

  return {
    doctor,
    isLoading,
    error,
    refetch: async () => {
      setIsLoading(true);
      try {
        const patient = await patientService.getMyProfile();
        if (patient.assignedDoctorId) {
          const doctorData = await usersService.getUserProfile(patient.assignedDoctorId);
          setDoctor(doctorData as any as User);
          setError(null);
        } else {
          setDoctor(null);
        }
        return patient.assignedDoctorId ? (doctor as User) : null;
      } catch (e) {
        setError(e as Error);
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
  };
}
