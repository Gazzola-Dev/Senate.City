"use client";

import * as actions from "@/actions/app.actions";
import useAppData from "@/hooks/useAppData";
import { AddConnectionParams, RemoveConnectionParams } from "@/types/app.types";
import { createId } from "@paralleldrive/cuid2";
import { useCallback, useState } from "react";

/**
 * Custom hook for handling user connections with optimistic updates
 */
export const useConnections = () => {
  const {
    user,
    users,
    updateUser: updateUserInStore,
    setLoading,
    setError,
  } = useAppData();

  const [isLoadingConnections, setIsLoadingConnections] = useState(false);
  const [connectionsError, setConnectionsError] = useState<string | null>(null);

  /**
   * Add a connection with optimistic updates
   */
  const addConnection = useCallback(
    async (params: AddConnectionParams) => {
      if (!user) return null;
      setIsLoadingConnections(true);
      setConnectionsError(null);
      setLoading(true);

      // Find the user to connect with
      const connectedUser = users.find((u) => u.id === params.connectedUserId);

      if (!connectedUser) {
        setConnectionsError("User not found");
        setLoading(false);
        setIsLoadingConnections(false);
        return null;
      }

      // Create optimistic connection
      const optimisticConnection = {
        id: `temp-${createId()}`,
        user_id: user?.id,
        connected_user_id: params.connectedUserId,
        status: "pending",
        created_at: new Date().toISOString(),
      };

      // Add connection to current user
      const updatedUser = {
        ...user,
        connections: [...(user?.connections || []), optimisticConnection],
      };

      // Apply optimistic update
      updateUserInStore({ ...updatedUser, id: user?.id });

      try {
        const { data, error } = await actions.addConnection(params);
        if (error) throw error;

        if (data && data.success) {
          // Server confirmed, no need to update again
          return data;
        } else {
          // Operation failed, rollback
          throw new Error("Failed to add connection");
        }
      } catch (error) {
        // Rollback on error
        const originalConnections =
          user?.connections?.filter(
            (conn) => conn.connected_user_id !== params.connectedUserId
          ) || [];

        updateUserInStore({
          ...user,
          id: user?.id,
          connections: originalConnections,
        });

        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setConnectionsError(errorMessage);
        setError(errorMessage);
        return null;
      } finally {
        setIsLoadingConnections(false);
        setLoading(false);
      }
    },
    [user, users, updateUserInStore, setLoading, setError]
  );

  /**
   * Accept a connection with optimistic updates
   */
  const acceptConnection = useCallback(
    async (params: { userId: string }) => {
      if (!user) return null;
      setIsLoadingConnections(true);
      setConnectionsError(null);
      setLoading(true);

      // Find the pending connection
      const pendingConnection = user?.connections?.find(
        (conn) => conn.user_id === params.userId && conn.status === "pending"
      );

      if (!pendingConnection) {
        setConnectionsError("Connection request not found");
        setLoading(false);
        setIsLoadingConnections(false);
        return null;
      }

      // Store original connections for rollback
      const originalConnections = [...(user?.connections || [])];

      // Create optimistic update
      const updatedConnections =
        user?.connections?.map((conn) => {
          if (conn.user_id === params.userId && conn.status === "pending") {
            return { ...conn, status: "accepted" };
          }
          return conn;
        }) || [];

      // Apply optimistic update
      updateUserInStore({
        ...user,
        id: user?.id,
        connections: updatedConnections,
      });

      try {
        const { data, error } = await actions.acceptConnection(params);
        if (error) throw error;

        if (data && data.success) {
          // Server confirmed, no need to update again
          return data;
        } else {
          // Operation failed, rollback
          throw new Error("Failed to accept connection");
        }
      } catch (error) {
        // Rollback on error
        updateUserInStore({
          ...user,
          id: user?.id,
          connections: originalConnections,
        });

        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setConnectionsError(errorMessage);
        setError(errorMessage);
        return null;
      } finally {
        setIsLoadingConnections(false);
        setLoading(false);
      }
    },
    [user, updateUserInStore, setLoading, setError]
  );

  /**
   * Remove a connection with optimistic updates
   */
  const removeConnection = useCallback(
    async (params: RemoveConnectionParams) => {
      if (!user) return null;
      setIsLoadingConnections(true);
      setConnectionsError(null);
      setLoading(true);

      // Store original connections for rollback
      const originalConnections = [...(user?.connections || [])];

      // Apply optimistic update - remove connection
      const updatedConnections =
        user?.connections?.filter(
          (conn) => conn.connected_user_id !== params.connectedUserId
        ) || [];

      updateUserInStore({
        ...user,
        id: user?.id,
        connections: updatedConnections,
      });

      try {
        const { data, error } = await actions.removeConnection(params);
        if (error) throw error;

        if (data && data.success) {
          // Server confirmed deletion, no further action needed
          return data;
        } else {
          // Operation failed, rollback
          throw new Error("Failed to remove connection");
        }
      } catch (error) {
        // Rollback on error
        updateUserInStore({
          ...user,
          id: user?.id,
          connections: originalConnections,
        });

        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setConnectionsError(errorMessage);
        setError(errorMessage);
        return null;
      } finally {
        setIsLoadingConnections(false);
        setLoading(false);
      }
    },
    [user, updateUserInStore, setLoading, setError]
  );

  return {
    isLoadingConnections,
    connectionsError,
    addConnection,
    acceptConnection,
    removeConnection,
  };
};
