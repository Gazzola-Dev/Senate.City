"use client";
import { AppState, Comment, DataCache, Post, User } from "@/types/app.types";
import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { create } from "zustand";
// Import mock data
import { currentUser, generateNetworkData, posts, users } from "@/lib/mockData";

// Helper functions to get data by ID
const getUserById = (id: string): User | undefined => {
  return users.find((user) => user.id === id);
};

const getPostById = (id: string): Post | undefined => {
  return posts.find((post) => post.id === id);
};

// Create the store with zustand
const useAppStore = create<AppState>((set) => ({
  // Initial state from the complete mock data
  user: currentUser,
  users: users,
  posts: posts.map((post) => {
    // Find any comments in the mock data that belong to this post
    const postComments =
      posts.find((p) => p.id === post.id)?.commentsList || [];

    return {
      ...post,
      commentsList: postComments, // Initialize with comments from mock data instead of empty array
    };
  }),
  post: null,
  currentPost: null,
  networkData: generateNetworkData(),
  isLoading: false,
  error: null,
  // UI preferences with default values
  theme: "system",
  reduceMotion: false,
  highContrast: false,
  emailNotifications: true,
  pushNotifications: true,
  profileVisibility: "public",
  // User actions
  setUser: (user) => set({ user }),
  setUsers: (users) => set({ users }),
  updateUser: (updatedUser) =>
    set((state) => {
      // Update the user in the users array
      const updatedUsers = state.users.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      );
      // If the updated user is the current user, update that too
      const updatedCurrentUser =
        state.user.id === updatedUser.id
          ? { ...state.user, ...updatedUser }
          : state.user;
      return {
        users: updatedUsers,
        user: updatedCurrentUser,
      };
    }),
  // Post actions
  setPosts: (posts) =>
    set({
      posts: posts.map((post) => ({
        ...post,
        commentsList: post.commentsList || [], // Ensure commentsList exists
      })),
    }),
  setPost: (post) =>
    set({
      post: post
        ? {
            ...post,
            commentsList: post.commentsList || [], // Ensure commentsList exists
          }
        : null,
    }),
  setCurrentPost: (post) =>
    set((state) => {
      const postVar = state.posts.find((p) => p?.id === post?.id) || null;
      return { currentPost: postVar, post: postVar };
    }),
  updatePost: (updatedPostVar) =>
    set((state) => {
      // Ensure commentsList exists in the updated post
      const updatedPostWithComments = {
        ...updatedPostVar,
        commentsList:
          updatedPostVar.commentsList ||
          state.posts.find((p) => p.id === updatedPostVar.id)?.commentsList ||
          [],
      };
      // Update the post in the posts array
      const updatedPosts = state.posts.map((post) =>
        post.id === updatedPostWithComments.id
          ? { ...post, ...updatedPostWithComments }
          : post
      );
      // If the updated post is the current post or the post, update those too
      const updatedCurrentPost =
        state.currentPost && state.currentPost.id === updatedPostWithComments.id
          ? { ...state.currentPost, ...updatedPostWithComments }
          : state.currentPost;
      const updatedPost =
        state.post && state.post.id === updatedPostWithComments.id
          ? { ...state.post, ...updatedPostWithComments }
          : state.post;
      // Update network data if needed
      const updatedNetworkData = { ...state.networkData };
      const postNode = updatedNetworkData.nodes.find(
        (node) => node.id === updatedPost?.id
      );
      if (postNode) {
        // Update node properties if they're based on post data
        const user = getUserById(
          updatedPost?.userId ||
            state.posts.find((p) => p.id === updatedPost?.id)?.userId ||
            ""
        );
        if (updatedPost && user && "label" in updatedPost) {
          postNode.label = user.name;
        }
        if (updatedPost && "weight" in updatedPost) {
          postNode.value = updatedPost.weight || 0;
        }
      }
      return {
        posts: updatedPosts,
        currentPost: updatedCurrentPost,
        post: updatedPost,
        networkData: updatedNetworkData,
      };
    }),
  addPost: (post) =>
    set((state) => {
      // Ensure new post has commentsList
      const postWithComments = {
        ...post,
        commentsList: post.commentsList || [],
      };
      const newPosts = [...state.posts, postWithComments];
      // Update network data with new post
      const updatedNetworkData = { ...state.networkData };
      const user = getUserById(post.userId);
      updatedNetworkData.nodes = [
        ...updatedNetworkData.nodes,
        {
          id: post.id,
          label: user?.name || "Unknown",
          value: post.weight,
          group: post.tags && post.tags.length > 0 ? post.tags[0] : undefined,
        },
      ];
      return {
        posts: newPosts,
        networkData: updatedNetworkData,
      };
    }),
  removePost: (postId) =>
    set((state) => {
      const newPosts = state.posts.filter((post) => post.id !== postId);
      // Remove post from network data
      const updatedNetworkData = { ...state.networkData };
      updatedNetworkData.nodes = updatedNetworkData.nodes.filter(
        (node) => node.id !== postId
      );
      updatedNetworkData.edges = updatedNetworkData.edges.filter(
        (edge) => edge.from !== postId && edge.to !== postId
      );
      // Update current post and post if they were removed
      const updatedCurrentPost =
        state.currentPost && state.currentPost.id === postId
          ? null
          : state.currentPost;
      const updatedPost =
        state.post && state.post.id === postId ? null : state.post;
      return {
        posts: newPosts,
        currentPost: updatedCurrentPost,
        post: updatedPost,
        networkData: updatedNetworkData,
      };
    }),
  // Comment-related actions
  addComment: (postId, comment) =>
    set((state) => {
      // Add comment to the post's commentsList
      const updatedPosts = state.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            commentsList: [...(post.commentsList || []), comment],
            comments: (post.comments || 0) + 1, // Increment comments count
          };
        }
        return post;
      });
      // Update current post and post if they were affected
      const updatedCurrentPost =
        state.currentPost && state.currentPost.id === postId
          ? {
              ...state.currentPost,
              commentsList: [
                ...(state.currentPost.commentsList || []),
                comment,
              ],
              comments: (state.currentPost.comments || 0) + 1,
            }
          : state.currentPost;
      const updatedPost =
        state.post && state.post.id === postId
          ? {
              ...state.post,
              commentsList: [...(state.post.commentsList || []), comment],
              comments: (state.post.comments || 0) + 1,
            }
          : state.post;
      return {
        posts: updatedPosts,
        currentPost: updatedCurrentPost,
        post: updatedPost,
      };
    }),
  updateComment: (postId, commentId, updatedComment) =>
    set((state) => {
      // Update comment in the post's commentsList
      const updatedPosts = state.posts.map((post) => {
        if (post.id === postId) {
          const updatedCommentsList = (post.commentsList || []).map((comment) =>
            comment.id === commentId
              ? { ...comment, ...updatedComment }
              : comment
          );
          return {
            ...post,
            commentsList: updatedCommentsList,
          };
        }
        return post;
      });
      // Update current post and post if they were affected
      const updatedCurrentPost =
        state.currentPost && state.currentPost.id === postId
          ? {
              ...state.currentPost,
              commentsList: (state.currentPost.commentsList || []).map(
                (comment) =>
                  comment.id === commentId
                    ? { ...comment, ...updatedComment }
                    : comment
              ),
            }
          : state.currentPost;
      const updatedPost =
        state.post && state.post.id === postId
          ? {
              ...state.post,
              commentsList: (state.post.commentsList || []).map((comment) =>
                comment.id === commentId
                  ? { ...comment, ...updatedComment }
                  : comment
              ),
            }
          : state.post;
      return {
        posts: updatedPosts,
        currentPost: updatedCurrentPost,
        post: updatedPost,
      };
    }),
  removeComment: (postId, commentId) =>
    set((state) => {
      // Remove comment from the post's commentsList
      const updatedPosts = state.posts.map((post) => {
        if (post.id === postId) {
          const updatedCommentsList = (post.commentsList || []).filter(
            (comment) => comment.id !== commentId
          );
          return {
            ...post,
            commentsList: updatedCommentsList,
            comments: Math.max(0, (post.comments || 0) - 1), // Decrement comments count
          };
        }
        return post;
      });
      // Update current post and post if they were affected
      const updatedCurrentPost =
        state.currentPost && state.currentPost.id === postId
          ? {
              ...state.currentPost,
              commentsList: (state.currentPost.commentsList || []).filter(
                (comment) => comment.id !== commentId
              ),
              comments: Math.max(0, (state.currentPost.comments || 0) - 1),
            }
          : state.currentPost;
      const updatedPost =
        state.post && state.post.id === postId
          ? {
              ...state.post,
              commentsList: (state.post.commentsList || []).filter(
                (comment) => comment.id !== commentId
              ),
              comments: Math.max(0, (state.post.comments || 0) - 1),
            }
          : state.post;
      return {
        posts: updatedPosts,
        currentPost: updatedCurrentPost,
        post: updatedPost,
      };
    }),
  // Network data actions
  setNetworkData: (data) => set({ networkData: data }),
  // UI state actions
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  // UI preference actions
  setTheme: (theme) => set({ theme }),
  setReduceMotion: (reduceMotion) => set({ reduceMotion }),
  setHighContrast: (highContrast) => set({ highContrast }),
  setEmailNotifications: (enabled) => set({ emailNotifications: enabled }),
  setPushNotifications: (enabled) => set({ pushNotifications: enabled }),
  setProfileVisibility: (visibility) => set({ profileVisibility: visibility }),
}));

// Create a data cache class for managing data persistence
class AppDataCache {
  private cache: DataCache | null = null;

  // Initialize cache with data
  initialize(data: DataCache) {
    this.cache = data;
  }

  // Get cache data
  getData(): DataCache | null {
    return this.cache;
  }

  // Update user in cache
  updateUser(user: Partial<User> & { id: string }) {
    if (!this.cache) return;
    // Update in users array
    this.cache.users = this.cache.users.map((u) =>
      u.id === user.id ? { ...u, ...user } : u
    );
    // Update current user if it matches
    if (this.cache.user.id === user.id) {
      this.cache.user = { ...this.cache.user, ...user };
    }
  }

  // Update post in cache
  updatePost(post: Partial<Post> & { id: string }) {
    if (!this.cache) return;
    // Ensure we maintain the commentsList in the cache
    const existingPost = this.cache.posts.find((p) => p.id === post.id);
    const postWithComments = {
      ...post,
      commentsList:
        post.commentsList || (existingPost ? existingPost.commentsList : []),
    };
    // Update in posts array
    this.cache.posts = this.cache.posts.map((p) =>
      p.id === post.id ? { ...p, ...postWithComments } : p
    );
    // Update current post if it matches
    if (this.cache.post && this.cache.post.id === post.id) {
      this.cache.post = { ...this.cache.post, ...postWithComments };
    }
    // Update network data if needed
    const nodeIndex = this.cache.networkData.nodes.findIndex(
      (node) => node.id === post.id
    );
    if (nodeIndex >= 0) {
      const originalPost = getPostById(post.id);
      if (originalPost) {
        const user = getUserById(post.userId || originalPost.userId);
        this.cache.networkData.nodes[nodeIndex] = {
          ...this.cache.networkData.nodes[nodeIndex],
          label: user?.name || "Unknown",
          value: post.weight || originalPost.weight,
          group:
            post.tags && Array.isArray(post.tags) && post.tags.length > 0
              ? post.tags[0]
              : originalPost.tags && originalPost.tags.length > 0
              ? originalPost.tags[0]
              : undefined,
        };
      }
    }
  }

  // Add post to cache
  addPost(post: Post) {
    if (!this.cache) return;
    // Ensure the post has a commentsList
    const postWithComments = {
      ...post,
      commentsList: post.commentsList || [],
    };
    this.cache.posts = [...this.cache.posts, postWithComments];
    // Add to network data
    const user = getUserById(post.userId);
    this.cache.networkData.nodes = [
      ...this.cache.networkData.nodes,
      {
        id: post.id,
        label: user?.name || "Unknown",
        value: post.weight,
        group: post.tags && post.tags.length > 0 ? post.tags[0] : undefined,
      },
    ];
  }

  // Remove post from cache
  removePost(postId: string) {
    if (!this.cache) return;
    this.cache.posts = this.cache.posts.filter((p) => p.id !== postId);
    // Clear post if it was the one removed
    if (this.cache.post && this.cache.post.id === postId) {
      this.cache.post = null;
    }
    // Remove from network data
    this.cache.networkData.nodes = this.cache.networkData.nodes.filter(
      (node) => node.id !== postId
    );
    this.cache.networkData.edges = this.cache.networkData.edges.filter(
      (edge) => edge.from !== postId && edge.to !== postId
    );
  }

  // Add comment to post in cache
  addComment(postId: string, comment: Comment) {
    if (!this.cache) return;
    // Update in posts array
    this.cache.posts = this.cache.posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          commentsList: [...(p.commentsList || []), comment],
          comments: (p.comments || 0) + 1, // Increment comments count
        };
      }
      return p;
    });
    // Update current post if it matches
    if (this.cache.post && this.cache.post.id === postId) {
      this.cache.post = {
        ...this.cache.post,
        commentsList: [...(this.cache.post.commentsList || []), comment],
        comments: (this.cache.post.comments || 0) + 1,
      };
    }
  }

  // Update comment in post cache
  updateComment(
    postId: string,
    commentId: string,
    updatedComment: Partial<Comment>
  ) {
    if (!this.cache) return;
    // Update in posts array
    this.cache.posts = this.cache.posts.map((p) => {
      if (p.id === postId) {
        const updatedCommentsList = (p.commentsList || []).map((c) =>
          c.id === commentId ? { ...c, ...updatedComment } : c
        );
        return {
          ...p,
          commentsList: updatedCommentsList,
        };
      }
      return p;
    });
    // Update current post if it matches
    if (this.cache.post && this.cache.post.id === postId) {
      this.cache.post = {
        ...this.cache.post,
        commentsList: (this.cache.post.commentsList || []).map((c) =>
          c.id === commentId ? { ...c, ...updatedComment } : c
        ),
      };
    }
  }

  // Remove comment from post cache
  removeComment(postId: string, commentId: string) {
    if (!this.cache) return;
    // Update in posts array
    this.cache.posts = this.cache.posts.map((p) => {
      if (p.id === postId) {
        const updatedCommentsList = (p.commentsList || []).filter(
          (c) => c.id !== commentId
        );
        return {
          ...p,
          commentsList: updatedCommentsList,
          comments: Math.max(0, (p.comments || 0) - 1), // Decrement comments count
        };
      }
      return p;
    });
    // Update current post if it matches
    if (this.cache.post && this.cache.post.id === postId) {
      this.cache.post = {
        ...this.cache.post,
        commentsList: (this.cache.post.commentsList || []).filter(
          (c) => c.id !== commentId
        ),
        comments: Math.max(0, (this.cache.post.comments || 0) - 1),
      };
    }
  }

  // Update UI preferences
  updateUIPreferences(
    preferences: Partial<{
      theme: "light" | "dark" | "system";
      reduceMotion: boolean;
      highContrast: boolean;
      emailNotifications: boolean;
      pushNotifications: boolean;
      profileVisibility: "public" | "contacts" | "private";
    }>
  ) {
    if (!this.cache) return;
    this.cache = {
      ...this.cache,
      ...preferences,
    };
  }
}

// Create data cache instance
const dataCache = new AppDataCache();

// Initialize mock comments for posts if they don't already have them
// This would typically come from your actual mock data, but we're adding it here for demonstration
const initializePostCommentsIfNeeded = () => {
  // For each post, ensure it has a commentsList that matches its comments count
  return posts.map((post) => {
    // If the post already has a commentsList, use it
    if (post.commentsList && post.commentsList.length > 0) {
      return post;
    }

    // Otherwise, create mock comments based on the comments count
    const mockCommentsList: Comment[] = [];
    for (let i = 0; i < post.comments; i++) {
      // Create a mock comment with data from a random user
      const randomUserIndex = Math.floor(Math.random() * users.length);
      const randomUser = users[randomUserIndex];

      mockCommentsList.push({
        id: `comment-${post.id}-${i}`,
        userId: randomUser.id,
        postId: post.id,
        content: `This is a sample comment ${i + 1} on this post.`,
        createdAt: new Date(
          new Date(post.createdAt).getTime() + (i + 1) * 60000
        ).toISOString(),
      });
    }

    // Return the post with the generated comments
    return {
      ...post,
      commentsList: mockCommentsList,
    };
  });
};

// Prepare posts data with proper commentsList
const postsWithComments = initializePostCommentsIfNeeded();

// Initialize the cache with complete mock data
dataCache.initialize({
  user: currentUser,
  users: users,
  posts: postsWithComments,
  post: null,
  networkData: generateNetworkData(),
  theme: "system",
  reduceMotion: false,
  highContrast: false,
  emailNotifications: true,
  pushNotifications: true,
  profileVisibility: "public",
});

// Create a context for the App Provider
const AppContext = createContext<{ useAppData: typeof useAppStore } | null>(
  null
);

// Export a hook to use the app data
export const useAppData = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppData must be used within an AppProvider");
  }
  return context.useAppData();
};

// Props for the AppProvider component
interface AppProviderProps {
  children: ReactNode;
}

// AppProvider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Sync store with cache when mounted
  useEffect(() => {
    const cache = dataCache.getData();
    if (cache) {
      // Update the store with cached data
      useAppStore.setState({
        user: cache.user,
        users: cache.users,
        posts: cache.posts,
        post: cache.post,
        networkData: cache.networkData,
        theme: cache.theme,
        reduceMotion: cache.reduceMotion,
        highContrast: cache.highContrast,
        emailNotifications: cache.emailNotifications,
        pushNotifications: cache.pushNotifications,
        profileVisibility: cache.profileVisibility,
      });
    }

    // Subscribe to store changes to update cache
    const unsubscribe = useAppStore.subscribe((state, prevState) => {
      // Update user cache when user or users change
      if (state.user !== prevState.user) {
        dataCache.updateUser(state.user);
      }

      // Update UI preferences when they change
      if (
        state.theme !== prevState.theme ||
        state.reduceMotion !== prevState.reduceMotion ||
        state.highContrast !== prevState.highContrast ||
        state.emailNotifications !== prevState.emailNotifications ||
        state.pushNotifications !== prevState.pushNotifications ||
        state.profileVisibility !== prevState.profileVisibility
      ) {
        dataCache.updateUIPreferences({
          theme: state.theme,
          reduceMotion: state.reduceMotion,
          highContrast: state.highContrast,
          emailNotifications: state.emailNotifications,
          pushNotifications: state.pushNotifications,
          profileVisibility: state.profileVisibility,
        });
      }

      // Update posts and post cache when posts change
      if (state.posts !== prevState.posts) {
        // Find added posts
        const addedPosts = state.posts.filter(
          (post) => !prevState.posts.some((p) => p.id === post.id)
        );
        // Find removed posts
        const removedPostIds = prevState.posts
          .filter((post) => !state.posts.some((p) => p.id === post.id))
          .map((post) => post.id);
        // Find updated posts
        const updatedPosts = state.posts.filter((post) => {
          const prevPost = prevState.posts.find((p) => p.id === post.id);
          return prevPost && JSON.stringify(post) !== JSON.stringify(prevPost);
        });
        // Update cache
        addedPosts.forEach((post) => dataCache.addPost(post));
        removedPostIds.forEach((id) => dataCache.removePost(id));
        updatedPosts.forEach((post) => dataCache.updatePost(post));
      }

      // Update post cache when post changes
      if (state.post !== prevState.post && state.post) {
        dataCache.updatePost(state.post);
      }
    });

    // Cleanup subscription
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AppContext.Provider value={{ useAppData: useAppStore }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
export { getPostById, getUserById };
