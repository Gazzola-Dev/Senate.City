"use client";

import { useCallback, useEffect, useState } from "react";
import { useNetworkData } from "./useNetworkData";
import { usePosts } from "./usePosts";

/**
 * Hook for handling data synchronization between clients
 * Can be extended to implement real-time features
 */
export const useDataSync = () => {
  const { fetchPosts } = usePosts();
  const { fetchNetworkData } = useNetworkData();
  const [syncInterval, setSyncInterval] = useState<NodeJS.Timeout | null>(null);
  const [syncEnabled, setSyncEnabled] = useState(false);

  // Start periodic data sync
  const startSync = useCallback(
    (intervalMs = 30000) => {
      if (syncInterval) {
        clearInterval(syncInterval);
      }

      const interval = setInterval(async () => {
        if (syncEnabled) {
          // Refresh data from the server
          await Promise.all([fetchPosts(), fetchNetworkData()]);
        }
      }, intervalMs);

      setSyncInterval(interval);
      setSyncEnabled(true);

      // Clean up on unmount
      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    },
    [syncInterval, syncEnabled, fetchPosts, fetchNetworkData]
  );

  // Stop periodic data sync
  const stopSync = useCallback(() => {
    if (syncInterval) {
      clearInterval(syncInterval);
      setSyncInterval(null);
    }
    setSyncEnabled(false);
  }, [syncInterval]);

  // Manual trigger for data sync
  const syncNow = useCallback(async () => {
    if (syncEnabled) {
      await Promise.all([fetchPosts(), fetchNetworkData()]);
    }
  }, [syncEnabled, fetchPosts, fetchNetworkData]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (syncInterval) {
        clearInterval(syncInterval);
      }
    };
  }, [syncInterval]);

  return {
    syncEnabled,
    startSync,
    stopSync,
    syncNow,
  };
};
