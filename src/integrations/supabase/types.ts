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
      auth_logs: {
        Row: {
          action: string
          battery_level: number | null
          browser: string | null
          city: string | null
          connection_type: string | null
          country: string | null
          device_fingerprint: string | null
          email: string
          error_message: string | null
          failed_attempts_count: number | null
          geolocation: string | null
          id: number
          ip_address: string | null
          is_mobile: boolean | null
          language: string | null
          os: string | null
          screen_resolution: string | null
          session_id: string | null
          success: boolean
          timestamp: string
          timezone: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          battery_level?: number | null
          browser?: string | null
          city?: string | null
          connection_type?: string | null
          country?: string | null
          device_fingerprint?: string | null
          email: string
          error_message?: string | null
          failed_attempts_count?: number | null
          geolocation?: string | null
          id?: number
          ip_address?: string | null
          is_mobile?: boolean | null
          language?: string | null
          os?: string | null
          screen_resolution?: string | null
          session_id?: string | null
          success?: boolean
          timestamp?: string
          timezone?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          battery_level?: number | null
          browser?: string | null
          city?: string | null
          connection_type?: string | null
          country?: string | null
          device_fingerprint?: string | null
          email?: string
          error_message?: string | null
          failed_attempts_count?: number | null
          geolocation?: string | null
          id?: number
          ip_address?: string | null
          is_mobile?: boolean | null
          language?: string | null
          os?: string | null
          screen_resolution?: string | null
          session_id?: string | null
          success?: boolean
          timestamp?: string
          timezone?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      client_data: {
        Row: {
          account_status: string | null
          company_name: string | null
          company_size: string | null
          created_at: string
          id: string
          industry: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          account_status?: string | null
          company_name?: string | null
          company_size?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          account_status?: string | null
          company_name?: string | null
          company_size?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          lead_id: string | null
          message: string
          name: string
          organization: string | null
          pages_visited: Json | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          lead_id?: string | null
          message: string
          name: string
          organization?: string | null
          pages_visited?: Json | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          lead_id?: string | null
          message?: string
          name?: string
          organization?: string | null
          pages_visited?: Json | null
        }
        Relationships: []
      }
      news_articles: {
        Row: {
          author: string
          author_title: string | null
          category: string
          content: string
          cover_image: string | null
          created_at: string
          featured: boolean
          id: string
          published: boolean
          published_at: string | null
          slug: string
          summary: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          author_title?: string | null
          category: string
          content: string
          cover_image?: string | null
          created_at?: string
          featured?: boolean
          id?: string
          published?: boolean
          published_at?: string | null
          slug: string
          summary: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          author_title?: string | null
          category?: string
          content?: string
          cover_image?: string | null
          created_at?: string
          featured?: boolean
          id?: string
          published?: boolean
          published_at?: string | null
          slug?: string
          summary?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      page_versions: {
        Row: {
          change_log: Json | null
          component_id: string
          component_name: string
          id: number
          initial_date: string
          last_update: string
          update_count: number
          version: string
        }
        Insert: {
          change_log?: Json | null
          component_id: string
          component_name: string
          id?: number
          initial_date?: string
          last_update?: string
          update_count?: number
          version: string
        }
        Update: {
          change_log?: Json | null
          component_id?: string
          component_name?: string
          id?: number
          initial_date?: string
          last_update?: string
          update_count?: number
          version?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          organization: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          organization?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          organization?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      technical_acronyms: {
        Row: {
          acronym: string
          category: string
          created_at: string | null
          description: string
          dislikes: number | null
          full_name: string
          id: string
          language: string | null
          likes: number | null
          source_country: string | null
          type: string | null
          updated_at: string | null
          url_slug: string | null
        }
        Insert: {
          acronym: string
          category: string
          created_at?: string | null
          description: string
          dislikes?: number | null
          full_name: string
          id?: string
          language?: string | null
          likes?: number | null
          source_country?: string | null
          type?: string | null
          updated_at?: string | null
          url_slug?: string | null
        }
        Update: {
          acronym?: string
          category?: string
          created_at?: string | null
          description?: string
          dislikes?: number | null
          full_name?: string
          id?: string
          language?: string | null
          likes?: number | null
          source_country?: string | null
          type?: string | null
          updated_at?: string | null
          url_slug?: string | null
        }
        Relationships: []
      }
      tickets: {
        Row: {
          assigned_to: string | null
          category: string
          completed_at: string | null
          created_at: string
          description: string
          developer_notes: string | null
          id: string
          priority: string
          reporter_name: string
          state: Database["public"]["Enums"]["ticket_state"]
          tags: string[] | null
          ticket_number: number | null
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          category: string
          completed_at?: string | null
          created_at?: string
          description: string
          developer_notes?: string | null
          id?: string
          priority?: string
          reporter_name: string
          state?: Database["public"]["Enums"]["ticket_state"]
          tags?: string[] | null
          ticket_number?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          category?: string
          completed_at?: string | null
          created_at?: string
          description?: string
          developer_notes?: string | null
          id?: string
          priority?: string
          reporter_name?: string
          state?: Database["public"]["Enums"]["ticket_state"]
          tags?: string[] | null
          ticket_number?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string
          assigned_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_ticket: {
        Args: {
          _title: string
          _description: string
          _reporter_name: string
          _category: string
          _priority?: string
          _tags?: string[]
        }
        Returns: {
          assigned_to: string | null
          category: string
          completed_at: string | null
          created_at: string
          description: string
          developer_notes: string | null
          id: string
          priority: string
          reporter_name: string
          state: Database["public"]["Enums"]["ticket_state"]
          tags: string[] | null
          ticket_number: number | null
          title: string
          updated_at: string
        }
      }
      add_ticket_with_id: {
        Args: {
          _title: string
          _description: string
          _reporter_name: string
          _category: string
          _priority?: string
        }
        Returns: {
          assigned_to: string | null
          category: string
          completed_at: string | null
          created_at: string
          description: string
          developer_notes: string | null
          id: string
          priority: string
          reporter_name: string
          state: Database["public"]["Enums"]["ticket_state"]
          tags: string[] | null
          ticket_number: number | null
          title: string
          updated_at: string
        }
      }
      assign_admin_role: {
        Args: { _email: string }
        Returns: undefined
      }
      get_all_page_versions: {
        Args: Record<PropertyKey, never>
        Returns: {
          change_log: Json | null
          component_id: string
          component_name: string
          id: number
          initial_date: string
          last_update: string
          update_count: number
          version: string
        }[]
      }
      get_all_tickets: {
        Args: Record<PropertyKey, never>
        Returns: {
          assigned_to: string | null
          category: string
          completed_at: string | null
          created_at: string
          description: string
          developer_notes: string | null
          id: string
          priority: string
          reporter_name: string
          state: Database["public"]["Enums"]["ticket_state"]
          tags: string[] | null
          ticket_number: number | null
          title: string
          updated_at: string
        }[]
      }
      get_contact_submission: {
        Args: { submission_id: string }
        Returns: {
          id: string
          lead_id: string
          name: string
          email: string
          organization: string
          message: string
          pages_visited: Json
          created_at: string
        }[]
      }
      get_days_since_creation: {
        Args: { ticket_row: Database["public"]["Tables"]["tickets"]["Row"] }
        Returns: number
      }
      get_days_to_completion: {
        Args: { ticket_row: Database["public"]["Tables"]["tickets"]["Row"] }
        Returns: number
      }
      get_page_version: {
        Args: { _component_id: string }
        Returns: {
          change_log: Json | null
          component_id: string
          component_name: string
          id: number
          initial_date: string
          last_update: string
          update_count: number
          version: string
        }[]
      }
      get_recent_failed_logins: {
        Args: { user_email: string; minutes?: number }
        Returns: {
          count: number
          first_attempt: string
          last_attempt: string
        }[]
      }
      get_user_roles: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"][]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      increment_acronym_dislikes: {
        Args: { acronym_id: string }
        Returns: undefined
      }
      increment_acronym_likes: {
        Args: { acronym_id: string }
        Returns: undefined
      }
      search_acronyms: {
        Args: {
          search_query: string
          category_filter?: string
          language_filter?: string
          type_filter?: string
        }
        Returns: {
          acronym: string
          category: string
          created_at: string | null
          description: string
          dislikes: number | null
          full_name: string
          id: string
          language: string | null
          likes: number | null
          source_country: string | null
          type: string | null
          updated_at: string | null
          url_slug: string | null
        }[]
      }
      submit_contact_form: {
        Args: {
          name_input: string
          email_input: string
          organization_input: string
          message_input: string
          pages_visited_input: Json
        }
        Returns: {
          id: string
          lead_id: string
        }[]
      }
      update_page_version: {
        Args: {
          _component_id: string
          _component_name: string
          _version: string
          _change_description: string
        }
        Returns: Json
      }
      update_ticket_state: {
        Args: {
          _ticket_id: string
          _new_state: Database["public"]["Enums"]["ticket_state"]
          _developer_notes?: string
        }
        Returns: {
          assigned_to: string | null
          category: string
          completed_at: string | null
          created_at: string
          description: string
          developer_notes: string | null
          id: string
          priority: string
          reporter_name: string
          state: Database["public"]["Enums"]["ticket_state"]
          tags: string[] | null
          ticket_number: number | null
          title: string
          updated_at: string
        }
      }
    }
    Enums: {
      app_role: "admin" | "client" | "manager" | "support"
      ticket_state:
        | "found"
        | "accepted"
        | "rejected"
        | "in_process"
        | "testing"
        | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "client", "manager", "support"],
      ticket_state: [
        "found",
        "accepted",
        "rejected",
        "in_process",
        "testing",
        "completed",
      ],
    },
  },
} as const
