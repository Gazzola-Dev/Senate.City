"use client";

import { useAppData } from "@/Providers/AppProvider";
import { useCallback } from "react";

/**
 * Custom hook for handling application errors and loading states
 */
export const useAppStatus = () => {
  const { isLoading, error, setLoading, setError } = useAppData();

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  return {
    isLoading,
    error,
    setLoading,
    setError,
    clearError,
  };
};
