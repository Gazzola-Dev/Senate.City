import { Database, Json, Tables } from "./database.types";

/**
 * User type mapped directly from the database tables
 */
export type User = Tables<"users"> & {
  // Extended properties
  connections?: UserConnection[];
  posts?: Post[];
  preferences?: UserPreferences;
  roles?: UserRole[];
};

/**
 * Post type mapped directly from the database tables
 */
export type Post = Tables<"posts"> & {
  // Extended properties
  tags?: string[];
  author?: User;
  commentsList?: Comment[];
};

/**
 * Comment type mapped directly from the database tables
 */
export type Comment = Tables<"comments"> & {
  // Extended properties
  author?: User;
};

/**
 * User connection type mapped directly from the database tables
 */
export type UserConnection = Tables<"user_connections">;

/**
 * User role type mapped directly from the database tables
 */
export type UserRole = Tables<"user_roles">;

/**
 * User preferences type mapped directly from the database tables
 */
export type UserPreferences = Tables<"user_preferences">;

/**
 * Network node for visualization
 */
export interface NetworkNode {
  id: string;
  label: string;
  value?: number;
  title?: string;
  group?: string;
  x?: number;
  y?: number;
}

/**
 * Network edge for visualization
 */
export interface NetworkEdge {
  id: string;
  from: string;
  to: string;
  value?: number;
  title?: string;
  label?: string;
}

/**
 * Container for network visualization data
 */
export interface NetworkData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}

/**
 * Profile visibility type
 */
export type ProfileVisibility = Database["public"]["Enums"]["visibility_type"];

/**
 * Application role type
 */
export type AppRole = Database["public"]["Enums"]["app_role"];

/**
 * Application permission type
 */
export type AppPermission = Database["public"]["Enums"]["app_permission"];

/**
 * State interface defining the structure of the application state
 * Central state management for the entire application
 */
export interface AppState {
  // User data
  user: User | null; // Current logged-in user
  users: User[]; // All users in the system for reference

  // Post data
  posts: Post[]; // All posts in the system
  post: Post | null; // Currently selected/viewed post (detail view)
  currentPost: Post | null; // Currently selected/viewed post (alternative reference)

  // Network visualization data
  networkData: NetworkData; // Data for network visualization graph

  // UI state
  isLoading: boolean; // Global loading state for async operations
  error: string | null; // Global error message for error handling

  // UI preferences
  theme: "light" | "dark" | "system"; // User's theme preference
  reduceMotion: boolean; // Accessibility preference for reduced animations
  highContrast: boolean; // Accessibility preference for increased visual contrast
  emailNotifications: boolean; // Preference for email notification delivery
  pushNotifications: boolean; // Preference for push notification delivery
  profileVisibility: Database["public"]["Enums"]["visibility_type"]; // Profile privacy setting

  // Action methods - User management
  setUser: (user: User | null) => void; // Set the current user
  setUsers: (users: User[]) => void; // Set all users in the system
  updateUser: (updatedUser: Partial<User> & { id: string }) => void; // Update a specific user

  // Action methods - Post management
  setPosts: (posts: Post[]) => void; // Set all posts in the system
  setPost: (post: Post | null) => void; // Set the currently selected post
  setCurrentPost: (post: Post | null) => void; // Set the currently selected post (alternative)
  updatePost: (updatedPost: Partial<Post> & { id: string }) => void; // Update a specific post
  addPost: (post: Post) => void; // Add a new post to the system
  removePost: (postId: string) => void; // Remove a post from the system

  // Action methods - Comment management
  addComment: (postId: string, comment: Comment) => void; // Add a new comment to a post
  updateComment: (
    postId: string,
    commentId: string,
    updatedComment: Partial<Comment>
  ) => void; // Update an existing comment
  removeComment: (postId: string, commentId: string) => void; // Remove a comment from a post

  // Action methods - Application state
  setNetworkData: (data: NetworkData) => void; // Update network visualization data
  setLoading: (isLoading: boolean) => void; // Set global loading state
  setError: (error: string | null) => void; // Set global error message

  // UI preference actions
  setTheme: (theme: "light" | "dark" | "system") => void; // Update theme preference
  setReduceMotion: (reduceMotion: boolean) => void; // Update motion preference
  setHighContrast: (highContrast: boolean) => void; // Update contrast preference
  setEmailNotifications: (enabled: boolean) => void; // Update email notification preference
  setPushNotifications: (enabled: boolean) => void; // Update push notification preference
  setProfileVisibility: (
    visibility: Database["public"]["Enums"]["visibility_type"]
  ) => void; // Update profile visibility
}

/**
 * Cache interface for managing data persistence
 * Used for storing application state between sessions
 */
export interface DataCache {
  user: User; // Cached current user data
  users: User[]; // Cached users collection
  posts: Post[]; // Cached posts collection
  post: Post | null; // Cached current post
  networkData: NetworkData; // Cached network visualization data
  // UI preferences
  theme: "light" | "dark" | "system"; // Cached theme setting
  reduceMotion: boolean; // Cached motion preference
  highContrast: boolean; // Cached contrast preference
  emailNotifications: boolean; // Cached email notification preference
  pushNotifications: boolean; // Cached push notification preference
  profileVisibility: Database["public"]["Enums"]["visibility_type"]; // Cached profile visibility
}

/**
 * Type for accessing app data through the useAppData hook
 * Provides type-safe access to the application state
 */
export type AppData = AppState;

/**
 * Parameters for getting a user by ID
 */
export interface GetUserParams {
  userId: string;
}

/**
 * Parameters for getting user preferences
 */
export interface GetUserPreferencesParams {
  userId?: string;
}

/**
 * Parameters for updating a user
 */
export interface UpdateUserParams {
  userId: string;
  name?: string;
  email?: string;
  avatar?: string | null;
  bio?: string | null;
  subtitle?: string | null;
}

/**
 * Parameters for getting a post by ID
 */
export interface GetPostParams {
  postId: string;
}

/**
 * Parameters for adding a new post
 */
export interface AddPostParams {
  content: string;
  weight?: number;
  tags?: string[];
}

/**
 * Parameters for updating a post
 */
export interface UpdatePostParams
  extends Omit<Database["public"]["Tables"]["posts"]["Update"], "id"> {
  postId: string;
  tags?: string[];
}

/**
 * Parameters for removing a post
 */
export interface RemovePostParams {
  postId: string;
}

/**
 * Parameters for adding a comment to a post
 */
export interface AddCommentParams {
  postId: string;
  content: string;
}

/**
 * Parameters for updating a comment
 */
export interface UpdateCommentParams
  extends Omit<
    Database["public"]["Tables"]["comments"]["Update"],
    "id" | "post_id" | "user_id"
  > {
  commentId: string;
}

/**
 * Parameters for removing a comment
 */
export interface RemoveCommentParams {
  commentId: string;
}

/**
 * Parameters for updating network data
 */
export interface UpdateNetworkDataParams {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}

/**
 * Parameters for updating user preferences
 */
export interface UpdateUserPreferencesParams {
  theme?: string;
  reduce_motion?: boolean;
  high_contrast?: boolean;
  email_notifications?: boolean;
  push_notifications?: boolean;
  profile_visibility?: Database["public"]["Enums"]["visibility_type"];
}

/**
 * Parameters for adding a connection between users
 */
export interface AddConnectionParams {
  connectedUserId: string;
}

/**
 * Parameters for accepting a connection request
 */
export interface AcceptConnectionParams {
  userId: string;
}

/**
 * Parameters for removing a connection between users
 */
export interface RemoveConnectionParams {
  connectedUserId: string;
}

export type RPCParamsMap = {
  accept_connection: { p_user_id: string };
  add_comment: { p_post_id: string; p_content: string };
  add_connection: { p_connected_user_id: string };
  add_post: { p_content: string; p_weight?: number; p_tags?: string[] };
  are_users_connected: { user_id1: string; user_id2: string };
  authorize: {
    requested_permission: Database["public"]["Enums"]["app_permission"];
  };
  can_view_user_profile: { profile_user_id: string };
  custom_access_token_hook: { event: Json };
  get_network_data: Record<string, never>;
  get_post: { post_id: string };
  get_posts: Record<string, never>;
  get_user: { user_id: string };
  get_user_preferences: { p_user_id?: string };
  get_users: Record<string, never>;
  remove_comment: { p_comment_id: string };
  remove_connection: { p_connected_user_id: string };
  remove_post: { p_post_id: string };
  setup_initial_admin: { admin_email: string };
  update_comment: { p_comment_id: string; p_content: string };
  update_network_data: { p_nodes: Json; p_edges: Json };
  update_post: {
    p_post_id: string;
    p_content?: string;
    p_weight?: number;
    p_tags?: string[];
  };
  update_user: {
    p_user_id: string;
    p_name?: string;
    p_email?: string;
    p_avatar?: string | null;
    p_bio?: string | null;
    p_subtitle?: string | null;
  };
  update_user_preferences: {
    p_theme?: string;
    p_reduce_motion?: boolean;
    p_high_contrast?: boolean;
    p_email_notifications?: boolean;
    p_push_notifications?: boolean;
    p_profile_visibility?: Database["public"]["Enums"]["visibility_type"];
  };
};
