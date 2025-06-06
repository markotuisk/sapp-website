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
          canonical_url: string | null
          category: string
          content: string
          cover_image: string | null
          created_at: string
          email_sent: boolean | null
          email_sent_at: string | null
          featured: boolean
          id: string
          meta_description: string | null
          meta_keywords: string[] | null
          og_image: string | null
          published: boolean
          published_at: string | null
          reading_time: number | null
          scheduled_at: string | null
          slug: string
          summary: string
          tags: string[] | null
          title: string
          twitter_image: string | null
          updated_at: string
          view_count: number | null
        }
        Insert: {
          author: string
          author_title?: string | null
          canonical_url?: string | null
          category: string
          content: string
          cover_image?: string | null
          created_at?: string
          email_sent?: boolean | null
          email_sent_at?: string | null
          featured?: boolean
          id?: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          og_image?: string | null
          published?: boolean
          published_at?: string | null
          reading_time?: number | null
          scheduled_at?: string | null
          slug: string
          summary: string
          tags?: string[] | null
          title: string
          twitter_image?: string | null
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          author?: string
          author_title?: string | null
          canonical_url?: string | null
          category?: string
          content?: string
          cover_image?: string | null
          created_at?: string
          email_sent?: boolean | null
          email_sent_at?: string | null
          featured?: boolean
          id?: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          og_image?: string | null
          published?: boolean
          published_at?: string | null
          reading_time?: number | null
          scheduled_at?: string | null
          slug?: string
          summary?: string
          tags?: string[] | null
          title?: string
          twitter_image?: string | null
          updated_at?: string
          view_count?: number | null
        }
        Relationships: []
      }
      news_subscribers: {
        Row: {
          confirmation_token: string | null
          confirmed_at: string | null
          created_at: string
          email: string
          id: string
          ip_address: string | null
          name: string | null
          source: string | null
          status: string
          subscribed_at: string
          subscription_preferences: Json | null
          unsubscribe_token: string | null
          unsubscribed_at: string | null
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          confirmation_token?: string | null
          confirmed_at?: string | null
          created_at?: string
          email: string
          id?: string
          ip_address?: string | null
          name?: string | null
          source?: string | null
          status?: string
          subscribed_at?: string
          subscription_preferences?: Json | null
          unsubscribe_token?: string | null
          unsubscribed_at?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          confirmation_token?: string | null
          confirmed_at?: string | null
          created_at?: string
          email?: string
          id?: string
          ip_address?: string | null
          name?: string | null
          source?: string | null
          status?: string
          subscribed_at?: string
          subscription_preferences?: Json | null
          unsubscribe_token?: string | null
          unsubscribed_at?: string | null
          updated_at?: string
          user_agent?: string | null
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
          tags?: string[] | null
          ticket_number?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
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
          tags: string[] | null
          ticket_number: number | null
          title: string
          updated_at: string
        }
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
      get_subscriber_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_subscribers: number
          active_subscribers: number
          unsubscribed: number
          recent_signups: number
        }[]
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
      subscribe_to_newsletter: {
        Args: {
          subscriber_email: string
          subscriber_name?: string
          preferences?: Json
        }
        Returns: string
      }
      unsubscribe_newsletter: {
        Args: { unsubscribe_token_param: string }
        Returns: boolean
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
