import { useAppInitialization } from "@/hooks/useAppInit";
import { useAppStatus } from "@/hooks/useAppStatus";
import { useComments } from "@/hooks/useComments";
import { useConnections } from "@/hooks/useConnections";
import { useDataSync } from "@/hooks/useDataSync";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useNetworkData } from "./useNetworkData";
import { usePosts } from "./usePosts";
import { useUser } from "./useUser";
import { useUserPreferences } from "./useUserPreferences";

/**
 * Main hook that combines all functionality for easier access
 */
export const useApp = () => {
  const user = useUser();
  const posts = usePosts();
  const comments = useComments();
  const networkData = useNetworkData();
  const preferences = useUserPreferences();
  const connections = useConnections();
  const status = useAppStatus();
  const initialization = useAppInitialization();
  const dataSync = useDataSync();
  const storage = useLocalStorage();

  return {
    user,
    posts,
    comments,
    networkData,
    preferences,
    connections,
    status,
    initialization,
    dataSync,
    storage,
  };
};
