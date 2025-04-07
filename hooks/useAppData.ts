"use client";
import { AppContext } from "@/Providers/AppProvider";
import { useContext } from "react";

/**
 * Custom hook to access app data from the Zustand store
 * Must be used within an AppProvider component
 */
export const useAppData = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppData must be used within an AppProvider");
  }

  // Return the store's state and actions
  return context.store();
};

export default useAppData;
