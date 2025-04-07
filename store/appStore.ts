"use client";
import { AppState, Post, User } from "@/types/app.types";
import { create } from "zustand";

// Helper functions to get data by ID
export const getUserById = (id: string, users: User[]): User | undefined => {
  return users.find((user) => user.id === id);
};

export const getPostById = (id: string, posts: Post[]): Post | undefined => {
  return posts.find((post) => post.id === id);
};

// Create the store with zustand
export const useAppStore = create<AppState>((set) => ({
  // Initial state - empty placeholders that will be populated from hooks
  user: null,
  users: [],
  posts: [],
  post: null,
  currentPost: null,
  networkData: { nodes: [], edges: [] },
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
        state.user?.id === updatedUser.id
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
        commentsList: post.commentsList || [],
      })),
    }),
  setPost: (post) =>
    set({
      post: post
        ? {
            ...post,
            commentsList: post.commentsList || [],
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
          updatedPost?.user_id ||
            state.posts.find((p) => p.id === updatedPost?.id)?.user_id ||
            "",
          state.users
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
      const user = getUserById(post.user_id, state.users);
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
