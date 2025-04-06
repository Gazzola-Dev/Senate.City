/**
 * Core user interface representing a platform member
 * Stores essential user information and profile details
 */
export interface User {
  id: string; // Unique identifier for the user
  name: string; // Full name of the user
  email: string; // Email address used for login and notifications
  avatar?: string; // Optional URL path to user's profile picture
  bio?: string; // Optional user biography or description
  subtitle?: string; // Optional short professional title or role description
  joinDate?: string; // Optional date when user joined the platform
  role: string; // User role in the system (admin, moderator, regular user, etc.)
  createdAt: string; // ISO timestamp of when the user was created
}

/**
 * Comment interface representing user feedback on posts
 * Contains the comment content and metadata for traceability
 */
export interface Comment {
  id: string; // Unique identifier for each comment
  userId: string; // Reference to the user who created the comment
  postId: string; // Reference to the post being commented on
  content: string; // Text content of the comment
  createdAt: string; // ISO timestamp when comment was created
}

/**
 * Post interface representing user-generated content
 * Contains the post content and metadata for engagement metrics
 */
export interface Post {
  id: string; // Unique identifier for the post
  userId: string; // ID of the user who created the post
  content: string; // Main text content of the post
  createdAt: string; // ISO timestamp of when the post was created
  likes: number; // Count of likes/upvotes received
  comments: number; // Count of comments received
  commentsList?: Comment[]; // Optional array of actual comment objects for expanded view
  weight: number; // Numerical weight used for network visualization importance
  tags?: string[]; // Optional array of topic tags for categorization and filtering
  edited?: boolean; // Optional flag indicating if post was edited after creation
}

/**
 * Network node interface used for visualization
 * Represents a post in the network graph for visual data representation
 */
export interface NetworkNode {
  id: string; // Unique identifier matching a post ID
  label: string; // Display label (typically user name)
  value: number; // Size value for visualization (based on weight)
  group?: string; // Optional grouping category for visual clustering
}

/**
 * Network edge interface used for visualization
 * Represents a connection between posts in the network visualization
 */
export interface NetworkEdge {
  from: string; // ID of the source post (origin of connection)
  to: string; // ID of the target post connected to the source
  value: number; // Strength/width of the connection for visual emphasis
  title?: string; // Optional hover text describing the connection relationship
}

/**
 * Container for network visualization data
 * Combines nodes and edges for complete graph representation
 */
export interface NetworkData {
  nodes: NetworkNode[]; // Collection of all nodes in the network
  edges: NetworkEdge[]; // Collection of all connections between nodes
}

/**
 * State interface defining the structure of the application state
 * Central state management for the entire application
 */
export interface AppState {
  // User data
  user: User; // Current logged-in user
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
  profileVisibility: "public" | "contacts" | "private"; // Profile privacy setting

  // Action methods - User management
  setUser: (user: User) => void; // Set the current user
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
  setProfileVisibility: (visibility: "public" | "contacts" | "private") => void; // Update profile visibility
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
  profileVisibility: "public" | "contacts" | "private"; // Cached profile visibility
}

/**
 * Type for accessing app data through the useAppData hook
 * Provides type-safe access to the application state
 */
export type AppData = AppState;
