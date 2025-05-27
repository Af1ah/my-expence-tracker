import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../utils/supabase';
import { Session } from '@supabase/supabase-js';

type AuthContextType = {
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error getting session:', error.message);
        setLoading(false);
      });

    // Listen for changes on auth state
    const { data: { subscription } } = auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const { data, error } = await auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error('Sign-up error:', error.message);
      throw new Error(`Sign-up failed: ${error.message}`);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('Sign-in error:', error.message);
      throw new Error(`Sign-in failed: ${error.message}`);
    }
  };

 const signOut = async () => {
    const { error } = await auth.signOut();
    if (error) {
      console.error('Sign-out error:', error.message);
      throw new Error(`Sign-out failed: ${error.message}`);
    }
  };

  const value = {
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
