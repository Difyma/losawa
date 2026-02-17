'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Check if Supabase env vars are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase environment variables are not set')
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()

      // Get initial session
      supabase.auth.getSession().then(({ data: { session }, error }) => {
        if (error) {
          console.error('Error getting session:', error)
        }
        setUser(session?.user ?? null)
        setLoading(false)
      }).catch((error) => {
        console.error('Error in getSession:', error)
        setLoading(false)
      })

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      })

      return () => subscription.unsubscribe()
    } catch (error) {
      console.error('Error initializing Supabase:', error)
      setLoading(false)
    }
  }, [])

  const signOut = async () => {
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const supabase = createClient()
        await supabase.auth.signOut()
      }
      setUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
