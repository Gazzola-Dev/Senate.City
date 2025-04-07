"use client";

import { useAppStatus } from "@/hooks/useAppStatus";
import { useCallback, useState } from "react";
import { useNetworkData } from "./useNetworkData";
import { usePosts } from "./usePosts";
import { useUser } from "./useUser";
import { useUserPreferences } from "./useUserPreferences";

/**
 * Custom hook for initializing app data when the application loads
 */
export const useAppInitialization = () => {
  const { fetchUser } = useUser();
  const { fetchPosts } = usePosts();
  const { fetchNetworkData } = useNetworkData();
  const { fetchUserPreferences } = useUserPreferences();
  const { setError } = useAppStatus();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  const initialize = useCallback(
    async (userId: string) => {
      if (isInitializing || isInitialized) return;

      setIsInitializing(true);

      try {
        // Fetch initial data in parallel for better performance
        const res = await Promise.all([
          fetchUser(userId),
          fetchPosts(),
          fetchNetworkData(),
          fetchUserPreferences(userId),
        ]);
        const [userData, postsData, networkData, preferencesData] = res;
        console.log({
          userData,
          postsData,
          networkData,
          preferencesData,
        });

        setIsInitialized(true);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setError(errorMessage);
      } finally {
        setIsInitializing(false);
      }
    },
    [
      isInitializing,
      isInitialized,
      fetchUser,
      fetchPosts,
      fetchNetworkData,
      fetchUserPreferences,
      setError,
    ]
  );

  return {
    isInitialized,
    isInitializing,
    initialize,
  };
};
