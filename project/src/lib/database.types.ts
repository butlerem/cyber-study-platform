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
      challenges: {
        Row: {
          id: string
          title: string
          description: string
          content: string
          difficulty: string
          points: number
          flag: string
          server_credentials: Json
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          content: string
          difficulty: string
          points: number
          flag: string
          server_credentials?: Json
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          content?: string
          difficulty?: string
          points?: number
          flag?: string
          server_credentials?: Json
          created_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          challenge_id: string
          completed: boolean
          attempts: number
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          challenge_id: string
          completed?: boolean
          attempts?: number
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          challenge_id?: string
          completed?: boolean
          attempts?: number
          completed_at?: string | null
          created_at?: string
        }
      }
    }
  }
}