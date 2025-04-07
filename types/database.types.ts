export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      network_data: {
        Row: {
          edges: Json
          id: string
          last_updated: string | null
          nodes: Json
        }
        Insert: {
          edges?: Json
          id?: string
          last_updated?: string | null
          nodes?: Json
        }
        Update: {
          edges?: Json
          id?: string
          last_updated?: string | null
          nodes?: Json
        }
        Relationships: []
      }
      post_tags: {
        Row: {
          id: string
          post_id: string
          tag: string
        }
        Insert: {
          id?: string
          post_id: string
          tag: string
        }
        Update: {
          id?: string
          post_id?: string
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          comments: number
          content: string
          created_at: string | null
          edited: boolean
          id: string
          likes: number
          user_id: string
          weight: number
        }
        Insert: {
          comments?: number
          content: string
          created_at?: string | null
          edited?: boolean
          id?: string
          likes?: number
          user_id: string
          weight?: number
        }
        Update: {
          comments?: number
          content?: string
          created_at?: string | null
          edited?: boolean
          id?: string
          likes?: number
          user_id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          id: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          id?: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          id?: number
          permission?: Database["public"]["Enums"]["app_permission"]
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
      user_connections: {
        Row: {
          connected_user_id: string
          created_at: string | null
          id: string
          status: string
          user_id: string
        }
        Insert: {
          connected_user_id: string
          created_at?: string | null
          id?: string
          status?: string
          user_id: string
        }
        Update: {
          connected_user_id?: string
          created_at?: string | null
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_connections_connected_user_id_fkey"
            columns: ["connected_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_connections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          email_notifications: boolean
          high_contrast: boolean
          profile_visibility: Database["public"]["Enums"]["visibility_type"]
          push_notifications: boolean
          reduce_motion: boolean
          theme: string
          user_id: string
        }
        Insert: {
          email_notifications?: boolean
          high_contrast?: boolean
          profile_visibility?: Database["public"]["Enums"]["visibility_type"]
          push_notifications?: boolean
          reduce_motion?: boolean
          theme?: string
          user_id: string
        }
        Update: {
          email_notifications?: boolean
          high_contrast?: boolean
          profile_visibility?: Database["public"]["Enums"]["visibility_type"]
          push_notifications?: boolean
          reduce_motion?: boolean
          theme?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar: string | null
          bio: string | null
          created_at: string | null
          email: string
          id: string
          join_date: string | null
          name: string
          role: string
          subtitle: string | null
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          created_at?: string | null
          email: string
          id: string
          join_date?: string | null
          name: string
          role?: string
          subtitle?: string | null
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string
          id?: string
          join_date?: string | null
          name?: string
          role?: string
          subtitle?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_connection: {
        Args: {
          p_user_id: string
        }
        Returns: boolean
      }
      add_comment: {
        Args: {
          p_post_id: string
          p_content: string
        }
        Returns: Json
      }
      add_connection: {
        Args: {
          p_connected_user_id: string
        }
        Returns: boolean
      }
      add_post: {
        Args: {
          p_content: string
          p_weight?: number
          p_tags?: string[]
        }
        Returns: Json
      }
      are_users_connected: {
        Args: {
          user_id1: string
          user_id2: string
        }
        Returns: boolean
      }
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["app_permission"]
        }
        Returns: boolean
      }
      can_view_user_profile: {
        Args: {
          profile_user_id: string
        }
        Returns: boolean
      }
      custom_access_token_hook: {
        Args: {
          event: Json
        }
        Returns: Json
      }
      get_network_data: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_post: {
        Args: {
          post_id: string
        }
        Returns: Json
      }
      get_posts: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_user: {
        Args: {
          user_id: string
        }
        Returns: Json
      }
      get_user_preferences: {
        Args: {
          p_user_id?: string
        }
        Returns: Json
      }
      get_users: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      remove_comment: {
        Args: {
          p_comment_id: string
        }
        Returns: boolean
      }
      remove_connection: {
        Args: {
          p_connected_user_id: string
        }
        Returns: boolean
      }
      remove_post: {
        Args: {
          p_post_id: string
        }
        Returns: boolean
      }
      setup_initial_admin: {
        Args: {
          admin_email: string
        }
        Returns: boolean
      }
      update_comment: {
        Args: {
          p_comment_id: string
          p_content: string
        }
        Returns: Json
      }
      update_network_data: {
        Args: {
          p_nodes: Json
          p_edges: Json
        }
        Returns: Json
      }
      update_post: {
        Args: {
          p_post_id: string
          p_content?: string
          p_weight?: number
          p_tags?: string[]
        }
        Returns: Json
      }
      update_user: {
        Args: {
          p_user_id: string
          p_name?: string
          p_email?: string
          p_avatar?: string
          p_bio?: string
          p_subtitle?: string
        }
        Returns: Json
      }
      update_user_preferences: {
        Args: {
          p_theme?: string
          p_reduce_motion?: boolean
          p_high_contrast?: boolean
          p_email_notifications?: boolean
          p_push_notifications?: boolean
          p_profile_visibility?: Database["public"]["Enums"]["visibility_type"]
        }
        Returns: Json
      }
    }
    Enums: {
      app_permission:
        | "user.read"
        | "user.write"
        | "user.delete"
        | "post.read"
        | "post.write"
        | "post.delete"
        | "comment.read"
        | "comment.write"
        | "comment.delete"
        | "network.read"
        | "network.write"
        | "settings.manage"
      app_role: "admin" | "moderator" | "regular"
      visibility_type: "public" | "contacts" | "private"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
