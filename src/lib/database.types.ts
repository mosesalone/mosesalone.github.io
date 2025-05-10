export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          email: string
          is_admin: boolean
          is_middleman: boolean
          is_available: boolean
          created_at: string
        }
        Insert: {
          id?: string
          username: string
          email: string
          is_admin?: boolean
          is_middleman?: boolean
          is_available?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          email?: string
          is_admin?: boolean
          is_middleman?: boolean
          is_available?: boolean
          created_at?: string
        }
      }
      tickets: {
        Row: {
          id: string
          title: string
          description: string | null
          client_id: string
          counterparty_id: string | null
          middleman_id: string | null
          status: 'open' | 'in-progress' | 'completed' | 'cancelled'
          amount: number
          payment_method: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          title: string
          description?: string | null
          client_id: string
          counterparty_id?: string | null
          middleman_id?: string | null
          status: 'open' | 'in-progress' | 'completed' | 'cancelled'
          amount: number
          payment_method: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          client_id?: string
          counterparty_id?: string | null
          middleman_id?: string | null
          status?: 'open' | 'in-progress' | 'completed' | 'cancelled'
          amount?: number
          payment_method?: string
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          ticket_id: string
          sender_id: string
          content: string
          is_system: boolean
          created_at: string
        }
        Insert: {
          id?: string
          ticket_id: string
          sender_id: string
          content: string
          is_system?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          ticket_id?: string
          sender_id?: string
          content?: string
          is_system?: boolean
          created_at?: string
        }
      }
    }
  }
}