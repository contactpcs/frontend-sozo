'use client';

import { useEffect, useState, useCallback } from 'react';
import { patientService } from '@/lib/api/services';
import type { PatientPayload, PatientListParams } from '@/types';

/**
 * Simple list fetcher hook
 */
export function usePatients(params?: PatientListParams) {
  const [data, setData] = useState<any[] | null>(null);
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
