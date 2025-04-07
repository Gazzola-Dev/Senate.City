"use client";

import * as actions from "@/actions/app.actions";
import useAppData from "@/hooks/useAppData";
import {
  AddCommentParams,
  Comment,
  RemoveCommentParams,
  UpdateCommentParams,
} from "@/types/app.types";
import { createId } from "@paralleldrive/cuid2";
import { useCallback, useState } from "react";

/**
 * Custom hook for handling comment-related operations with optimistic updates
 */
export const useComments = () => {
  const {
    posts,
    user,
    addComment: addCommentToStore,
    updateComment: updateCommentInStore,
    removeComment: removeCommentFromStore,
    setLoading,
    setError,
  } = useAppData();

  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);

  /**
   * Add a comment with optimistic updates
   */
  const addComment = useCallback(
    async (params: AddCommentParams) => {
      if (!user) return null;
      setIsLoadingComments(true);
      setCommentsError(null);
      setLoading(true);

      // Create optimistic comment
      const optimisticComment: Comment = {
        id: `temp-${createId()}`,
        content: params.content,
        post_id: params.postId,
        user_id: user.id,
        created_at: new Date().toISOString(),
        author: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          created_at: user.created_at,
          join_date: user.join_date,
          bio: user.bio,
          subtitle: user.subtitle,
        },
      };

      // Apply optimistic update
      addCommentToStore(params.postId, optimisticComment);

      try {
        const { data, error } = await actions.addComment(params);
        if (error) throw error;

        if (data) {
          // Remove optimistic comment and add confirmed comment from server
          removeCommentFromStore(params.postId, optimisticComment.id);
          addCommentToStore(params.postId, {
            ...data,
            author: data.author || {
              id: user.id,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
              role: user.role,
              created_at: user.created_at,
              join_date: user.join_date,
              bio: user.bio,
              subtitle: user.subtitle,
            },
          });
        }

        return data;
      } catch (error) {
        // Rollback on error
        removeCommentFromStore(params.postId, optimisticComment.id);

        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setCommentsError(errorMessage);
        setError(errorMessage);
        return null;
      } finally {
        setIsLoadingComments(false);
        setLoading(false);
      }
    },
    [user, addCommentToStore, removeCommentFromStore, setLoading, setError]
  );

  /**
   * Update a comment with optimistic updates
   */
  const updateComment = useCallback(
    async (params: UpdateCommentParams) => {
      setIsLoadingComments(true);
      setCommentsError(null);
      setLoading(true);

      // Find post containing the comment
      const postWithComment = posts.find((p) =>
        p.commentsList?.some((c) => c.id === params.commentId)
      );

      if (!postWithComment) {
        setCommentsError("Comment not found");
        setLoading(false);
        setIsLoadingComments(false);
        return null;
      }

      // Store original comment for rollback
      const originalComment = postWithComment.commentsList?.find(
        (c) => c.id === params.commentId
      );

      if (!originalComment) {
        setCommentsError("Comment not found");
        setLoading(false);
        setIsLoadingComments(false);
        return null;
      }

      // Create optimistic update
      const optimisticComment = {
        ...originalComment,
        content: params.content,
      };

      // Apply optimistic update
      updateCommentInStore(
        postWithComment.id,
        params.commentId,
        optimisticComment
      );

      try {
        const { data, error } = await actions.updateComment(params);
        if (error) throw error;

        if (data) {
          // Apply confirmed update from the server
          updateCommentInStore(postWithComment.id, params.commentId, data);
        }

        return data;
      } catch (error) {
        // Rollback on error
        updateCommentInStore(
          postWithComment.id,
          params.commentId,
          originalComment
        );

        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setCommentsError(errorMessage);
        setError(errorMessage);
        return null;
      } finally {
        setIsLoadingComments(false);
        setLoading(false);
      }
    },
    [posts, updateCommentInStore, setLoading, setError]
  );

  /**
   * Remove a comment with optimistic updates
   */
  const removeComment = useCallback(
    async (params: RemoveCommentParams) => {
      setIsLoadingComments(true);
      setCommentsError(null);
      setLoading(true);

      // Find post containing the comment
      const postWithComment = posts.find((p) =>
        p.commentsList?.some((c) => c.id === params.commentId)
      );

      if (!postWithComment) {
        setCommentsError("Comment not found");
        setLoading(false);
        setIsLoadingComments(false);
        return null;
      }

      // Store original comment for rollback
      const originalComment = postWithComment.commentsList?.find(
        (c) => c.id === params.commentId
      );

      if (!originalComment) {
        setCommentsError("Comment not found");
        setLoading(false);
        setIsLoadingComments(false);
        return null;
      }

      // Apply optimistic update
      removeCommentFromStore(postWithComment.id, params.commentId);

      try {
        const { data, error } = await actions.removeComment(params);
        if (error) throw error;

        // Server confirmed deletion, no action needed
        return data;
      } catch (error) {
        // Rollback on error
        addCommentToStore(postWithComment.id, originalComment);

        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setCommentsError(errorMessage);
        setError(errorMessage);
        return null;
      } finally {
        setIsLoadingComments(false);
        setLoading(false);
      }
    },
    [posts, addCommentToStore, removeCommentFromStore, setLoading, setError]
  );

  return {
    isLoadingComments,
    commentsError,
    addComment,
    updateComment,
    removeComment,
  };
};
