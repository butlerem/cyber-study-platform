import React, { createContext, useContext } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

interface AuthContextType {
  user: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const handleSignIn = async (email: string, password: string) => {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }
  };

  const handleSignUp = async (email: string, password: string, username: string) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to register');
    }

    // After successful registration, sign in the user
    await handleSignIn(email, password);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user: session?.user || null, 
        loading, 
        signIn: handleSignIn, 
        signUp: handleSignUp, 
        signOut: handleSignOut 
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}