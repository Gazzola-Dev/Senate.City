"use client";

import useAppData from "@/hooks/useAppData";
import { useCallback } from "react";

/**
 * Hook for handling data persistence to local storage
 */
export const useLocalStorage = () => {
  const {
    user,
    posts,
    networkData,
    theme,
    reduceMotion,
    highContrast,
    emailNotifications,
    pushNotifications,
    profileVisibility,
  } = useAppData();

  // Save current state to local storage
  const saveToLocalStorage = useCallback(() => {
    try {
      const dataToSave = {
        user,
        posts,
        networkData,
        theme,
        reduceMotion,
        highContrast,
        emailNotifications,
        pushNotifications,
        profileVisibility,
        timestamp: Date.now(),
      };

      localStorage.setItem("app_cache", JSON.stringify(dataToSave));
      return true;
    } catch (error) {
      console.error("Failed to save to local storage:", error);
      return false;
    }
  }, [
    user,
    posts,
    networkData,
    theme,
    reduceMotion,
    highContrast,
    emailNotifications,
    pushNotifications,
    profileVisibility,
  ]);

  // Load state from local storage
  const loadFromLocalStorage = useCallback(() => {
    try {
      const cachedData = localStorage.getItem("app_cache");
      if (!cachedData) return null;

      const parsedData = JSON.parse(cachedData);

      // Check if cache is still valid (less than 1 hour old)
      const cacheAge = Date.now() - (parsedData.timestamp || 0);
      const maxCacheAge = 60 * 60 * 1000; // 1 hour

      if (cacheAge > maxCacheAge) {
        localStorage.removeItem("app_cache");
        return null;
      }

      return parsedData;
    } catch (error) {
      console.error("Failed to load from local storage:", error);
      return null;
    }
  }, []);

  // Clear local storage cache
  const clearLocalStorage = useCallback(() => {
    try {
      localStorage.removeItem("app_cache");
      return true;
    } catch (error) {
      console.error("Failed to clear local storage:", error);
      return false;
    }
  }, []);

  return {
    saveToLocalStorage,
    loadFromLocalStorage,
    clearLocalStorage,
  };
};
