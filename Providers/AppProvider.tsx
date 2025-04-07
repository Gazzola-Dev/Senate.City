"use client";

import IntroSlides from "@/components/Dashboard/IntroSlides";
import useSupabase from "@/hooks/useSupabase";
import { useAppStore } from "@/store/appStore";
import { User } from "@supabase/supabase-js";
import React, { createContext, ReactNode, useEffect, useState } from "react";

// Create a context for the App Provider
export const AppContext = createContext<{ store: typeof useAppStore } | null>(
  null
);

// Props for the AppProvider component
interface AppProviderProps {
  children: ReactNode;
  userId?: string; // Optional user ID for initialization
}

const Provider = ({ children }: { children: ReactNode }) => {
  const supabase = useSupabase();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const userId = session?.user.id;
      if (userId && userId !== user?.id) setUser(session.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, user?.id, setUser]);

  if (user) return <IntroSlides email={user.email ?? ""} />;

  return <div>{children}</div>;
};

// AppProvider component with hooks integration
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const store = useAppStore;

  return (
    <AppContext.Provider value={{ store }}>
      <Provider>{children}</Provider>
    </AppContext.Provider>
  );
};

export default AppProvider;
