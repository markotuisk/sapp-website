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
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          organization: string | null
          pages_visited: Json | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          organization?: string | null
          pages_visited?: Json | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          organization?: string | null
          pages_visited?: Json | null
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
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
      submit_contact_form: {
        Args: {
          name_input: string
          email_input: string
          organization_input: string
          message_input: string
          pages_visited_input: Json
        }
        Returns: string
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
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
