"use client";

import * as actions from "@/actions/app.actions";
import useAppData from "@/hooks/useAppData";
import { NetworkData, UpdateNetworkDataParams } from "@/types/app.types";
import { useCallback, useState } from "react";

/**
 * Custom hook for handling network data operations with optimistic updates
 */
export const useNetworkData = () => {
  const {
    networkData,
    setNetworkData: setNetworkDataInStore,
    setLoading,
    setError,
  } = useAppData();

  const [isLoadingNetwork, setIsLoadingNetwork] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);

  /**
   * Fetch network data
   */
  const fetchNetworkData = useCallback(async () => {
    setIsLoadingNetwork(true);
    setNetworkError(null);
    setLoading(true);

    try {
      const { data, error } = await actions.getNetworkData();
      if (error) throw error;

      if (data) {
        setNetworkDataInStore(data);
      }

      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setNetworkError(errorMessage);
      setError(errorMessage);
      return null;
    } finally {
      setIsLoadingNetwork(false);
      setLoading(false);
    }
  }, [setNetworkDataInStore, setLoading, setError]);

  /**
   * Update network data with optimistic updates
   */
  const updateNetworkData = useCallback(
    async (params: UpdateNetworkDataParams) => {
      setIsLoadingNetwork(true);
      setNetworkError(null);
      setLoading(true);

      // Store original network data for rollback
      const originalNetworkData = { ...networkData };

      // Create optimistic update
      const optimisticNetworkData: NetworkData = {
        nodes: params.nodes,
        edges: params.edges,
      };

      // Apply optimistic update
      setNetworkDataInStore(optimisticNetworkData);

      try {
        const { data, error } = await actions.updateNetworkData(params);
        if (error) throw error;

        if (data) {
          // Apply confirmed update from the server
          setNetworkDataInStore(data);
        }

        return data;
      } catch (error) {
        // Rollback on error
        setNetworkDataInStore(originalNetworkData);

        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setNetworkError(errorMessage);
        setError(errorMessage);
        return null;
      } finally {
        setIsLoadingNetwork(false);
        setLoading(false);
      }
    },
    [networkData, setNetworkDataInStore, setLoading, setError]
  );

  return {
    networkData,
    isLoadingNetwork,
    networkError,
    fetchNetworkData,
    updateNetworkData,
  };
};
