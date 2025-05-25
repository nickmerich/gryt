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
      calendar_integrations: {
        Row: {
          access_token: string | null
          calendar_id: string | null
          created_at: string
          id: string
          is_active: boolean
          provider: string
          refresh_token: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          calendar_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          provider: string
          refresh_token?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          calendar_id?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          provider?: string
          refresh_token?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      calendar_syncs: {
        Row: {
          calendar_id: string | null
          created_at: string
          goal_id: string
          id: string
          last_sync: string | null
          sync_data: Json | null
          updated_at: string
        }
        Insert: {
          calendar_id?: string | null
          created_at?: string
          goal_id: string
          id?: string
          last_sync?: string | null
          sync_data?: Json | null
          updated_at?: string
        }
        Update: {
          calendar_id?: string | null
          created_at?: string
          goal_id?: string
          id?: string
          last_sync?: string | null
          sync_data?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_syncs_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      goal_predictions: {
        Row: {
          calculation_date: string
          completion_probability: number
          confidence_score: number
          created_at: string
          goal_id: string
          id: string
          predicted_completion_date: string | null
          risk_factors: Json | null
        }
        Insert: {
          calculation_date?: string
          completion_probability: number
          confidence_score: number
          created_at?: string
          goal_id: string
          id?: string
          predicted_completion_date?: string | null
          risk_factors?: Json | null
        }
        Update: {
          calculation_date?: string
          completion_probability?: number
          confidence_score?: number
          created_at?: string
          goal_id?: string
          id?: string
          predicted_completion_date?: string | null
          risk_factors?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "goal_predictions_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      goals: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          progress: number
          target_date: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          progress?: number
          target_date?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          progress?: number
          target_date?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      habit_stacks: {
        Row: {
          anchor_routine: string
          created_at: string
          id: string
          is_active: boolean
          new_goal_id: string
          success_rate: number | null
          trigger_context: string | null
          trigger_time: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          anchor_routine: string
          created_at?: string
          id?: string
          is_active?: boolean
          new_goal_id: string
          success_rate?: number | null
          trigger_context?: string | null
          trigger_time?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          anchor_routine?: string
          created_at?: string
          id?: string
          is_active?: boolean
          new_goal_id?: string
          success_rate?: number | null
          trigger_context?: string | null
          trigger_time?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "habit_stacks_new_goal_id_fkey"
            columns: ["new_goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      milestones: {
        Row: {
          created_at: string
          goal_id: string
          id: string
          is_completed: boolean
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          goal_id: string
          id?: string
          is_completed?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          goal_id?: string
          id?: string
          is_completed?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "milestones_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      mood_checkins: {
        Row: {
          checkin_date: string
          created_at: string
          energy_level: number
          goal_id: string | null
          id: string
          mood_score: number
          notes: string | null
          stress_level: number
          updated_at: string
          user_id: string
        }
        Insert: {
          checkin_date?: string
          created_at?: string
          energy_level: number
          goal_id?: string | null
          id?: string
          mood_score: number
          notes?: string | null
          stress_level: number
          updated_at?: string
          user_id: string
        }
        Update: {
          checkin_date?: string
          created_at?: string
          energy_level?: number
          goal_id?: string | null
          id?: string
          mood_score?: number
          notes?: string | null
          stress_level?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mood_checkins_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      progress_logs: {
        Row: {
          goal_id: string
          id: string
          logged_at: string
          new_progress: number
          previous_progress: number
        }
        Insert: {
          goal_id: string
          id?: string
          logged_at?: string
          new_progress: number
          previous_progress: number
        }
        Update: {
          goal_id?: string
          id?: string
          logged_at?: string
          new_progress?: number
          previous_progress?: number
        }
        Relationships: [
          {
            foreignKeyName: "progress_logs_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      recovery_interventions: {
        Row: {
          created_at: string
          goal_id: string
          id: string
          intervention_data: Json | null
          intervention_type: string
          resolved_at: string | null
          trigger_type: string
          user_id: string
          was_accepted: boolean | null
          was_effective: boolean | null
        }
        Insert: {
          created_at?: string
          goal_id: string
          id?: string
          intervention_data?: Json | null
          intervention_type: string
          resolved_at?: string | null
          trigger_type: string
          user_id: string
          was_accepted?: boolean | null
          was_effective?: boolean | null
        }
        Update: {
          created_at?: string
          goal_id?: string
          id?: string
          intervention_data?: Json | null
          intervention_type?: string
          resolved_at?: string | null
          trigger_type?: string
          user_id?: string
          was_accepted?: boolean | null
          was_effective?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "recovery_interventions_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      streaks: {
        Row: {
          created_at: string
          goal_id: string
          id: string
          streak_date: string
          user_id: string
        }
        Insert: {
          created_at?: string
          goal_id: string
          id?: string
          streak_date: string
          user_id: string
        }
        Update: {
          created_at?: string
          goal_id?: string
          id?: string
          streak_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "streaks_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      todos: {
        Row: {
          created_at: string
          due_date: string | null
          id: string
          is_completed: boolean
          milestone_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          due_date?: string | null
          id?: string
          is_completed?: boolean
          milestone_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          due_date?: string | null
          id?: string
          is_completed?: boolean
          milestone_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "todos_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "milestones"
            referencedColumns: ["id"]
          },
        ]
      }
      user_integrations: {
        Row: {
          access_token: string | null
          created_at: string
          id: string
          last_synced: string | null
          metadata: Json | null
          provider_id: string
          provider_user_id: string | null
          refresh_token: string | null
          status: string
          token_expires_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string
          id?: string
          last_synced?: string | null
          metadata?: Json | null
          provider_id: string
          provider_user_id?: string | null
          refresh_token?: string | null
          status?: string
          token_expires_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          created_at?: string
          id?: string
          last_synced?: string | null
          metadata?: Json | null
          provider_id?: string
          provider_user_id?: string | null
          refresh_token?: string | null
          status?: string
          token_expires_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
