"use client";

import { useAppData } from "@/Providers/AppProvider";
import * as actions from "@/actions/app.actions";
import {
  UpdateUserPreferencesParams,
  UserPreferences,
} from "@/types/app.types";
import { useCallback, useState } from "react";

/**
 * Custom hook for handling user preferences with optimistic updates
 */
export const useUserPreferences = () => {
  const {
    theme,
    reduceMotion,
    highContrast,
    emailNotifications,
    pushNotifications,
    profileVisibility,
    setTheme,
    setReduceMotion,
    setHighContrast,
    setEmailNotifications,
    setPushNotifications,
    setProfileVisibility,
    setLoading,
    setError,
  } = useAppData();

  const [isLoadingPreferences, setIsLoadingPreferences] = useState(false);
  const [preferencesError, setPreferencesError] = useState<string | null>(null);

  /**
   * Fetch user preferences
   */
  const fetchUserPreferences = useCallback(
    async (userId?: string) => {
      setIsLoadingPreferences(true);
      setPreferencesError(null);
      setLoading(true);

      try {
        const { data, error } = await actions.getUserPreferences({ userId });
        if (error) throw error;

        if (data) {
          // Update all preferences in store
          setTheme(data.theme as "light" | "dark" | "system");
          setReduceMotion(data.reduce_motion);
          setHighContrast(data.high_contrast);
          setEmailNotifications(data.email_notifications);
          setPushNotifications(data.push_notifications);
          setProfileVisibility(data.profile_visibility);
        }

        return data;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setPreferencesError(errorMessage);
        setError(errorMessage);
        return null;
      } finally {
        setIsLoadingPreferences(false);
        setLoading(false);
      }
    },
    [
      setTheme,
      setReduceMotion,
      setHighContrast,
      setEmailNotifications,
      setPushNotifications,
      setProfileVisibility,
      setLoading,
      setError,
    ]
  );

  /**
   * Update user preferences with optimistic updates
   */
  const updateUserPreferences = useCallback(
    async (params: UpdateUserPreferencesParams) => {
      setIsLoadingPreferences(true);
      setPreferencesError(null);
      setLoading(true);

      // Store original preferences for rollback
      const originalPreferences: UserPreferences = {
        theme,
        reduce_motion: reduceMotion,
        high_contrast: highContrast,
        email_notifications: emailNotifications,
        push_notifications: pushNotifications,
        profile_visibility: profileVisibility,
        user_id: "", // Not needed for rollback
      };

      // Apply optimistic updates
      if (params.theme !== undefined) {
        setTheme(params.theme as "light" | "dark" | "system");
      }
      if (params.reduceMotion !== undefined) {
        setReduceMotion(params.reduceMotion);
      }
      if (params.highContrast !== undefined) {
        setHighContrast(params.highContrast);
      }
      if (params.emailNotifications !== undefined) {
        setEmailNotifications(params.emailNotifications);
      }
      if (params.pushNotifications !== undefined) {
        setPushNotifications(params.pushNotifications);
      }
      if (params.profileVisibility !== undefined) {
        setProfileVisibility(params.profileVisibility);
      }

      try {
        const { data, error } = await actions.updateUserPreferences(params);
        if (error) throw error;

        if (data) {
          // Apply confirmed updates from server
          setTheme(data.theme as "light" | "dark" | "system");
          setReduceMotion(data.reduce_motion);
          setHighContrast(data.high_contrast);
          setEmailNotifications(data.email_notifications);
          setPushNotifications(data.push_notifications);
          setProfileVisibility(data.profile_visibility);
        }

        return data;
      } catch (error) {
        // Rollback on error
        setTheme(originalPreferences.theme as "light" | "dark" | "system");
        setReduceMotion(originalPreferences.reduce_motion);
        setHighContrast(originalPreferences.high_contrast);
        setEmailNotifications(originalPreferences.email_notifications);
        setPushNotifications(originalPreferences.push_notifications);
        setProfileVisibility(originalPreferences.profile_visibility);

        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setPreferencesError(errorMessage);
        setError(errorMessage);
        return null;
      } finally {
        setIsLoadingPreferences(false);
        setLoading(false);
      }
    },
    [
      theme,
      reduceMotion,
      highContrast,
      emailNotifications,
      pushNotifications,
      profileVisibility,
      setTheme,
      setReduceMotion,
      setHighContrast,
      setEmailNotifications,
      setPushNotifications,
      setProfileVisibility,
      setLoading,
      setError,
    ]
  );

  return {
    theme,
    reduceMotion,
    highContrast,
    emailNotifications,
    pushNotifications,
    profileVisibility,
    isLoadingPreferences,
    preferencesError,
    fetchUserPreferences,
    updateUserPreferences,
  };
};
