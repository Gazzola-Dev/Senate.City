"use client";

import { useCallback, useState } from "react";

import * as actions from "@/actions/app.actions";
import useAppData from "@/hooks/useAppData";
import {
  AddPostParams,
  Post,
  RemovePostParams,
  UpdatePostParams,
} from "@/types/app.types";
import { createId } from "@paralleldrive/cuid2";

/**
 * Custom hook for handling post-related operations with optimistic updates
 */
export const usePosts = () => {
  const {
    posts,
    post,
    currentPost,
    user,
    setPosts,
    setPost,
    setCurrentPost,
    updatePost: updatePostInStore,
    addPost: addPostToStore,
    removePost: removePostFromStore,
    setLoading,
    setError,
  } = useAppData();

  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState<string | null>(null);

  /**
   * Fetch all posts
   */
  const fetchPosts = useCallback(async () => {
    setIsLoadingPosts(true);
    setPostsError(null);
    setLoading(true);

    try {
      const { data, error } = await actions.getPosts();
      if (error) throw error;

      if (data) {
        setPosts(data);
      }

      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setPostsError(errorMessage);
      setError(errorMessage);
      return null;
    } finally {
      setIsLoadingPosts(false);
      setLoading(false);
    }
  }, [setPosts, setLoading, setError]);

  /**
   * Fetch a single post by ID
   */
  const fetchPost = useCallback(
    async (postId: string) => {
      setIsLoadingPosts(true);
      setPostsError(null);
      setLoading(true);

      try {
        const { data, error } = await actions.getPost({ postId });
        if (error) throw error;

        if (data) {
          setPost(data);
          setCurrentPost(data);
        }

        return data;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setPostsError(errorMessage);
        setError(errorMessage);
        return null;
      } finally {
        setIsLoadingPosts(false);
        setLoading(false);
      }
    },
    [setPost, setCurrentPost, setLoading, setError]
  );

  /**
   * Add a new post with optimistic updates
   */
  const addPost = useCallback(
    async (params: AddPostParams) => {
      setIsLoadingPosts(true);
      setPostsError(null);
      setLoading(true);

      // Create optimistic post
      const optimisticPost: Post = {
        id: `temp-${createId()}`,
        content: params.content,
        weight: params.weight || 1,
        tags: params.tags || [],
        user_id: user?.id ?? "",
        comments: 0,
        likes: 0,
        edited: false,
        created_at: new Date().toISOString(),
        commentsList: [],
      };

      // Apply optimistic update
      addPostToStore(optimisticPost);

      try {
        const { data, error } = await actions.addPost(params);
        if (error) throw error;

        if (data) {
          // Remove optimistic post and add confirmed post from server
          removePostFromStore(optimisticPost.id);
          addPostToStore({
            ...data,
            commentsList: data.commentsList || [],
          });
        }

        return data;
      } catch (error) {
        // Rollback on error
        removePostFromStore(optimisticPost.id);

        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setPostsError(errorMessage);
        setError(errorMessage);
        return null;
      } finally {
        setIsLoadingPosts(false);
        setLoading(false);
      }
    },
    [user?.id, addPostToStore, removePostFromStore, setLoading, setError]
  );

  /**
   * Update a post with optimistic updates
   */
  const updatePost = useCallback(
    async (params: UpdatePostParams) => {
      setIsLoadingPosts(true);
      setPostsError(null);
      setLoading(true);

      // Store original post state for rollback
      const originalPost = posts.find((p) => p.id === params.postId);

      if (!originalPost) {
        setPostsError("Post not found");
        setLoading(false);
        setIsLoadingPosts(false);
        return null;
      }

      // Create optimistic update
      const optimisticPost = {
        ...originalPost,
        content: params.content ?? originalPost.content,
        weight: params.weight ?? originalPost.weight,
        tags: params.tags ?? originalPost.tags,
        edited: true,
      };

      // Apply optimistic update
      updatePostInStore({ ...optimisticPost, id: params.postId });

      try {
        const { data, error } = await actions.updatePost(params);
        if (error) throw error;

        if (data) {
          // Apply confirmed update from the server
          updatePostInStore({
            ...data,
            id: params.postId,
            commentsList: data.commentsList || originalPost.commentsList || [],
          });
        }

        return data;
      } catch (error) {
        // Rollback on error
        updatePostInStore({ ...originalPost, id: params.postId });

        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setPostsError(errorMessage);
        setError(errorMessage);
        return null;
      } finally {
        setIsLoadingPosts(false);
        setLoading(false);
      }
    },
    [posts, updatePostInStore, setLoading, setError]
  );

  /**
   * Remove a post with optimistic updates
   */
  const removePost = useCallback(
    async (params: RemovePostParams) => {
      setIsLoadingPosts(true);
      setPostsError(null);
      setLoading(true);

      // Store original post for rollback
      const originalPost = posts.find((p) => p.id === params.postId);

      if (!originalPost) {
        setPostsError("Post not found");
        setLoading(false);
        setIsLoadingPosts(false);
        return null;
      }

      // Apply optimistic update
      removePostFromStore(params.postId);

      try {
        const { data, error } = await actions.removePost(params);
        if (error) throw error;

        // Server confirmed deletion, no action needed
        return data;
      } catch (error) {
        // Rollback on error
        addPostToStore(originalPost);

        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setPostsError(errorMessage);
        setError(errorMessage);
        return null;
      } finally {
        setIsLoadingPosts(false);
        setLoading(false);
      }
    },
    [posts, addPostToStore, removePostFromStore, setLoading, setError]
  );

  return {
    posts,
    post,
    currentPost,
    isLoadingPosts,
    postsError,
    fetchPosts,
    fetchPost,
    addPost,
    updatePost,
    removePost,
  };
};
