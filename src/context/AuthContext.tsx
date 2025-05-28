import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../utils/supabase';
import { Session, User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error getting session:', error.message);
        setLoading(false);
      });

    // Listen for changes on auth state
    const { data: { subscription } } = auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await db
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error.message);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        }
      }
    });

    if (error) {
      console.error('Sign-up error:', error.message);
      throw new Error(`Sign-up failed: ${error.message}`);
    }

    // Create profile in database
    if (data.user) {
      try {
        const { error: profileError } = await db
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              email: email,
              name: name,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }
          ]);

        if (profileError) {
          console.error('Error creating profile:', profileError.message);
        }
      } catch (error) {
        console.error('Error creating profile:', error);
      }
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
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      throw new Error('No user logged in');
    }

    try {
      const updatedProfile = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await db
        .from('profiles')
        .update(updatedProfile)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update profile: ${error.message}`);
      }

      setProfile(data);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    const { error } = await auth.resetPasswordForEmail(email, {
      redirectTo: 'your-app://reset-password',
    });

    if (error) {
      console.error('Reset password error:', error.message);
      throw new Error(`Failed to send reset email: ${error.message}`);
    }
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await auth.updateUser({
      password: newPassword
    });

    if (error) {
      console.error('Update password error:', error.message);
      throw new Error(`Failed to update password: ${error.message}`);
    }
  };

  const value = {
    session,
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    resetPassword,
    updatePassword,
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