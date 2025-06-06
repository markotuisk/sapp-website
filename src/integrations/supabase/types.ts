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
          organization_id: string | null
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
          organization_id?: string | null
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
          organization_id?: string | null
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
          organization_id: string | null
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
          organization_id?: string | null
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
          organization_id?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_data_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      client_documents: {
        Row: {
          category_id: string | null
          created_at: string
          custom_name: string | null
          description: string | null
          document_type: string | null
          download_count: number | null
          external_url: string | null
          file_name: string
          file_path: string
          file_size: number
          id: string
          is_confidential: boolean | null
          last_downloaded_at: string | null
          mime_type: string
          original_name: string
          tags: string[] | null
          updated_at: string
          uploaded_by: string | null
          user_id: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          custom_name?: string | null
          description?: string | null
          document_type?: string | null
          download_count?: number | null
          external_url?: string | null
          file_name: string
          file_path: string
          file_size: number
          id?: string
          is_confidential?: boolean | null
          last_downloaded_at?: string | null
          mime_type: string
          original_name: string
          tags?: string[] | null
          updated_at?: string
          uploaded_by?: string | null
          user_id: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          custom_name?: string | null
          description?: string | null
          document_type?: string | null
          download_count?: number | null
          external_url?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          id?: string
          is_confidential?: boolean | null
          last_downloaded_at?: string | null
          mime_type?: string
          original_name?: string
          tags?: string[] | null
          updated_at?: string
          uploaded_by?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_documents_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "document_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
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
      document_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      email_campaigns: {
        Row: {
          article_id: string | null
          bounce_count: number | null
          campaign_data: Json | null
          click_count: number | null
          created_at: string
          delivery_count: number | null
          id: string
          open_count: number | null
          recipient_count: number | null
          sent_at: string
          sent_by: string | null
          subject: string
          template_id: string | null
          unsubscribe_count: number | null
          updated_at: string
        }
        Insert: {
          article_id?: string | null
          bounce_count?: number | null
          campaign_data?: Json | null
          click_count?: number | null
          created_at?: string
          delivery_count?: number | null
          id?: string
          open_count?: number | null
          recipient_count?: number | null
          sent_at?: string
          sent_by?: string | null
          subject: string
          template_id?: string | null
          unsubscribe_count?: number | null
          updated_at?: string
        }
        Update: {
          article_id?: string | null
          bounce_count?: number | null
          campaign_data?: Json | null
          click_count?: number | null
          created_at?: string
          delivery_count?: number | null
          id?: string
          open_count?: number | null
          recipient_count?: number | null
          sent_at?: string
          sent_by?: string | null
          subject?: string
          template_id?: string | null
          unsubscribe_count?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_campaigns_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "news_articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_campaigns_sent_by_fkey"
            columns: ["sent_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          html_template: string
          id: string
          is_default: boolean | null
          name: string
          subject_template: string
          template_type: string
          text_template: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          html_template: string
          id?: string
          is_default?: boolean | null
          name: string
          subject_template: string
          template_type?: string
          text_template?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          html_template?: string
          id?: string
          is_default?: boolean | null
          name?: string
          subject_template?: string
          template_type?: string
          text_template?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
          organization_id: string | null
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
          organization_id?: string | null
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
          organization_id?: string | null
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
        Relationships: [
          {
            foreignKeyName: "news_articles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
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
      organization_types: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          address: Json | null
          created_at: string
          description: string | null
          id: string
          industry: string | null
          logo_url: string | null
          name: string
          phone: string | null
          status: string | null
          subscription_tier: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          name: string
          phone?: string | null
          status?: string | null
          subscription_tier?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          name?: string
          phone?: string | null
          status?: string | null
          subscription_tier?: string | null
          updated_at?: string
          website?: string | null
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
          avatar_url: string | null
          created_at: string
          department: string | null
          email: string
          first_name: string | null
          id: string
          job_title: string | null
          last_name: string | null
          organization: string | null
          organization_id: string | null
          organization_type: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email: string
          first_name?: string | null
          id: string
          job_title?: string | null
          last_name?: string | null
          organization?: string | null
          organization_id?: string | null
          organization_type?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email?: string
          first_name?: string | null
          id?: string
          job_title?: string | null
          last_name?: string | null
          organization?: string | null
          organization_id?: string | null
          organization_type?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
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
      user_activity_logs: {
        Row: {
          action: string
          changes: Json | null
          created_at: string
          id: string
          ip_address: string | null
          organization_id: string | null
          performed_by: string | null
          target_user_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          changes?: Json | null
          created_at?: string
          id?: string
          ip_address?: string | null
          organization_id?: string | null
          performed_by?: string | null
          target_user_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          changes?: Json | null
          created_at?: string
          id?: string
          ip_address?: string | null
          organization_id?: string | null
          performed_by?: string | null
          target_user_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_invitations: {
        Row: {
          accepted_at: string | null
          created_at: string
          email: string
          expires_at: string | null
          id: string
          invitation_token: string
          invited_by: string | null
          organization_id: string | null
          roles: Database["public"]["Enums"]["app_role"][] | null
          status: string | null
          updated_at: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          email: string
          expires_at?: string | null
          id?: string
          invitation_token?: string
          invited_by?: string | null
          organization_id?: string | null
          roles?: Database["public"]["Enums"]["app_role"][] | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          email?: string
          expires_at?: string | null
          id?: string
          invitation_token?: string
          invited_by?: string | null
          organization_id?: string | null
          roles?: Database["public"]["Enums"]["app_role"][] | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_invitations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          created_at: string
          document_notifications: boolean | null
          email_notifications: boolean | null
          id: string
          language: string | null
          theme: string | null
          timezone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          document_notifications?: boolean | null
          email_notifications?: boolean | null
          id?: string
          language?: string | null
          theme?: string | null
          timezone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          document_notifications?: boolean | null
          email_notifications?: boolean | null
          id?: string
          language?: string | null
          theme?: string | null
          timezone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
      accept_invitation: {
        Args: { _invitation_token: string; _user_id: string }
        Returns: boolean
      }
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
        Args: Record<PropertyKey, never> | { _email: string }
        Returns: undefined
      }
      assign_user_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
          _assigned_by?: string
        }
        Returns: undefined
      }
      can_access_organization: {
        Args: { target_org_id: string }
        Returns: boolean
      }
      check_failed_login_attempts: {
        Args: { user_email: string }
        Returns: Json
      }
      create_newsletter_campaign: {
        Args: {
          article_id_param: string
          subject_param: string
          template_id_param?: string
        }
        Returns: string
      }
      current_user_has_role: {
        Args: { _role: Database["public"]["Enums"]["app_role"] }
        Returns: boolean
      }
      current_user_is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
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
      get_subscriber_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_subscribers: number
          active_subscribers: number
          unsubscribed: number
          recent_signups: number
        }[]
      }
      get_user_organization: {
        Args: { _user_id: string }
        Returns: string
      }
      get_user_organization_safe: {
        Args: { _user_id: string }
        Returns: string
      }
      get_user_roles: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"][]
      }
      get_user_roles_safe: {
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
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_user_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
      is_user_admin_safe: {
        Args: { _user_id: string }
        Returns: boolean
      }
      log_security_event: {
        Args: {
          event_email: string
          event_action: string
          event_success: boolean
          event_ip?: string
          event_user_agent?: string
          event_error?: string
          additional_context?: Json
        }
        Returns: undefined
      }
      remove_user_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
          _removed_by?: string
        }
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
      user_has_organisation: {
        Args: { _user_id: string }
        Returns: boolean
      }
      user_in_same_organization: {
        Args: { _user_id1: string; _user_id2: string }
        Returns: boolean
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
