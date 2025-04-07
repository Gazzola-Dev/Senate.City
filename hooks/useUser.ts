"use client";

import { useAppData } from "@/Providers/AppProvider";
import * as actions from "@/actions/app.actions";
import { UpdateUserParams } from "@/types/app.types";
import { useCallback, useState } from "react";

/**
 * Custom hook for handling user-related operations with optimistic updates
 */
export const useUser = () => {
  const {
    user,
    users,
    setUser,
    setUsers,
    updateUser: updateUserInStore,
    setLoading,
    setError,
  } = useAppData();

  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);

  /**
   * Fetch current user data
   */
  const fetchUser = useCallback(
    async (userId: string) => {
      setIsLoadingUser(true);
      setUserError(null);
      setLoading(true);

      try {
        const { data, error } = await actions.getUser({ userId });
        if (error) throw error;
        if (data) {
          setUser(data);
        }
        return data;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setUserError(errorMessage);
        setError(errorMessage);
        return null;
      } finally {
        setIsLoadingUser(false);
        setLoading(false);
      }
    },
    [setUser, setLoading, setError]
  );

  /**
   * Fetch all users
   */
  const fetchUsers = useCallback(async () => {
    setIsLoadingUser(true);
    setUserError(null);
    setLoading(true);

    try {
      const { data, error } = await actions.getUsers();
      if (error) throw error;
      if (data) {
        setUsers(data);
      }
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setUserError(errorMessage);
      setError(errorMessage);
      return null;
    } finally {
      setIsLoadingUser(false);
      setLoading(false);
    }
  }, [setUsers, setLoading, setError]);

  /**
   * Update user with optimistic updates
   */
  const updateUser = useCallback(
    async (params: UpdateUserParams) => {
      setIsLoadingUser(true);
      setUserError(null);
      setLoading(true);

      // Store original user state for rollback
      const originalUser = users.find((u) => u.id === params.userId);

      if (!originalUser) {
        setUserError("User not found");
        setLoading(false);
        setIsLoadingUser(false);
        return null;
      }

      // Create optimistic update
      const optimisticUser = {
        ...originalUser,
        name: params.name ?? originalUser.name,
        email: params.email ?? originalUser.email,
        avatar: params.avatar ?? originalUser.avatar,
        bio: params.bio ?? originalUser.bio,
        subtitle: params.subtitle ?? originalUser.subtitle,
      };

      // Apply optimistic update
      updateUserInStore({ ...optimisticUser, id: params.userId });

      try {
        const { data, error } = await actions.updateUser(params);
        if (error) throw error;

        if (data) {
          // Apply confirmed update from the server
          updateUserInStore({ ...data, id: params.userId });
        }

        return data;
      } catch (error) {
        // Rollback on error
        updateUserInStore({ ...originalUser, id: params.userId });

        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setUserError(errorMessage);
        setError(errorMessage);
        return null;
      } finally {
        setIsLoadingUser(false);
        setLoading(false);
      }
    },
    [users, updateUserInStore, setLoading, setError]
  );

  return {
    user,
    users,
    isLoadingUser,
    userError,
    fetchUser,
    fetchUsers,
    updateUser,
  };
};
