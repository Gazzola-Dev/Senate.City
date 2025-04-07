import { createClient } from "@/clients/action-client";
import {
  AcceptConnectionParams,
  AddCommentParams,
  AddConnectionParams,
  AddPostParams,
  Comment,
  GetPostParams,
  GetUserParams,
  GetUserPreferencesParams,
  NetworkData,
  Post,
  RemoveCommentParams,
  RemoveConnectionParams,
  RemovePostParams,
  RPCParamsMap,
  UpdateCommentParams,
  UpdateNetworkDataParams,
  UpdatePostParams,
  UpdateUserParams,
  UpdateUserPreferencesParams,
  User,
  UserPreferences,
} from "@/types/app.types";
import { Database, Json } from "@/types/database.types";

/**
 * Generic function to call Supabase RPC functions with proper typing
 *
 * @param functionName - The name of the RPC function to call
 * @param params - The parameters to pass to the RPC function
 * @returns A promise with the result or error
 */
const callRPC = async <
  T,
  F extends keyof Database["public"]["Functions"] = keyof Database["public"]["Functions"]
>(
  functionName: F,
  params?: RPCParamsMap[F]
): Promise<{ data: T | null; error: unknown | null }> => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.rpc(functionName, params || {});
    if (error) throw error;
    return { data: data as T, error: null };
  } catch (error) {
    console.error(`Error calling ${functionName}:`, error);
    return { data: null, error };
  }
};
/**
 * User Actions
 */
export const getUser = async ({ userId }: GetUserParams) => {
  return callRPC<User>("get_user", { user_id: userId });
};
export const getUsers = async () => {
  return callRPC<User[]>("get_users");
};
export const updateUser = async ({
  userId,
  name,
  email,
  avatar,
  bio,
  subtitle,
}: UpdateUserParams) => {
  return callRPC<User>("update_user", {
    p_user_id: userId,
    p_name: name,
    p_email: email,
    p_avatar: avatar,
    p_bio: bio,
    p_subtitle: subtitle,
  });
};
/**
 * Post Actions
 */
export const getPosts = async () => {
  return callRPC<Post[]>("get_posts");
};
export const getPost = async ({ postId }: GetPostParams) => {
  return callRPC<Post>("get_post", { post_id: postId });
};
export const addPost = async ({ content, weight, tags }: AddPostParams) => {
  return callRPC<Post>("add_post", {
    p_content: content,
    p_weight: weight,
    p_tags: tags,
  });
};
export const updatePost = async ({
  postId,
  content,
  weight,
  tags,
}: UpdatePostParams) => {
  return callRPC<Post>("update_post", {
    p_post_id: postId,
    p_content: content,
    p_weight: weight,
    p_tags: tags,
  });
};
export const removePost = async ({ postId }: RemovePostParams) => {
  const result = await callRPC<boolean>("remove_post", { p_post_id: postId });
  return {
    data: result.data !== null ? { success: result.data } : null,
    error: result.error,
  };
};
/**
 * Comment Actions
 */
export const addComment = async ({ postId, content }: AddCommentParams) => {
  return callRPC<Comment>("add_comment", {
    p_post_id: postId,
    p_content: content,
  });
};
export const updateComment = async ({
  commentId,
  content,
}: UpdateCommentParams) => {
  return callRPC<Comment>("update_comment", {
    p_comment_id: commentId,
    p_content: content,
  });
};
export const removeComment = async ({ commentId }: RemoveCommentParams) => {
  const result = await callRPC<boolean>("remove_comment", {
    p_comment_id: commentId,
  });
  return {
    data: result.data !== null ? { success: result.data } : null,
    error: result.error,
  };
};
/**
 * Network Data Actions
 */
export const getNetworkData = async () => {
  return callRPC<NetworkData>("get_network_data");
};
export const updateNetworkData = async ({
  nodes,
  edges,
}: UpdateNetworkDataParams) => {
  return callRPC<NetworkData>("update_network_data", {
    p_nodes: nodes as unknown as Json,
    p_edges: edges as unknown as Json,
  });
};
/**
 * User Preferences Actions
 */
export const getUserPreferences = async ({
  userId,
}: GetUserPreferencesParams = {}) => {
  return callRPC<UserPreferences>("get_user_preferences", {
    p_user_id: userId,
  });
};
export const updateUserPreferences = async ({
  theme,
  reduce_motion,
  high_contrast,
  email_notifications,
  push_notifications,
  profile_visibility,
}: UpdateUserPreferencesParams) => {
  return callRPC<UserPreferences>("update_user_preferences", {
    p_theme: theme,
    p_reduce_motion: reduce_motion,
    p_high_contrast: high_contrast,
    p_email_notifications: email_notifications,
    p_push_notifications: push_notifications,
    p_profile_visibility: profile_visibility,
  });
};
/**
 * User Connection Actions
 */
export const addConnection = async ({
  connectedUserId,
}: AddConnectionParams) => {
  const result = await callRPC<boolean>("add_connection", {
    p_connected_user_id: connectedUserId,
  });
  return {
    data: result.data !== null ? { success: result.data } : null,
    error: result.error,
  };
};
export const acceptConnection = async ({ userId }: AcceptConnectionParams) => {
  const result = await callRPC<boolean>("accept_connection", {
    p_user_id: userId,
  });
  return {
    data: result.data !== null ? { success: result.data } : null,
    error: result.error,
  };
};
export const removeConnection = async ({
  connectedUserId,
}: RemoveConnectionParams) => {
  const result = await callRPC<boolean>("remove_connection", {
    p_connected_user_id: connectedUserId,
  });
  return {
    data: result.data !== null ? { success: result.data } : null,
    error: result.error,
  };
};
export { callRPC };
